import express from 'express';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração Básica
app.use(cors());
app.use(express.json());

// Inicializar Supabase com a chave de serviço (Service Role) para acesso administrativo
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// 1. Interceção do ficheiro: Multer configurado para guardar na memória RAM (não no disco)
const upload = multer({ storage: multer.memoryStorage() });

/**
 * Normaliza um nome (referência de artigo, nome de cor) para ser usado como
 * segmento de caminho no Storage: sem acentos, sem espaços, em minúsculas.
 */
function slugify(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

// ============================================================================
// ENDPOINT 1: UPLOAD DE IMAGENS DO CATÁLOGO
// ----------------------------------------------------------------------------
// Aceita um campo opcional `pasta` (ex.: "castanho-escuro") para arrumar as
// fotografias das variantes em subpastas por cor, em vez de ficarem todas
// à mistura em public/.
// ============================================================================
app.post('/api/upload-catalogo', upload.single('imagem'), async (req, res): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum ficheiro intercetado.' });
    }

    const nomeOriginal = req.file.originalname.split('.')[0];
    const nomeFicheiroWebp = `${slugify(nomeOriginal)}-${Date.now()}.webp`;

    // Segmentos opcionais de pasta: artigo e/ou cor
    const segmentos = ['public'];
    if (typeof req.body.artigo === 'string' && req.body.artigo.trim()) {
      segmentos.push(slugify(req.body.artigo));
    }
    if (typeof req.body.pasta === 'string' && req.body.pasta.trim()) {
      segmentos.push(slugify(req.body.pasta));
    }
    const caminho = `${segmentos.join('/')}/${nomeFicheiroWebp}`;

    console.log(`A processar imagem: ${nomeOriginal} -> ${caminho}`);

    // Processamento com Sharp: Conversão para WebP, redimensionamento e compressão
    const bufferOtimizado = await sharp(req.file.buffer)
      .resize({ 
        width: 1200, 
        height: 1200, 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 80 }) // Compressão e conversão automática
      .toBuffer();

    // Exportação para o serviço de Object Storage nativo (Supabase Storage)
    const { error: uploadError } = await supabase
      .storage
      .from('catalogo-imagens')
      .upload(caminho, bufferOtimizado, {
        contentType: 'image/webp',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Gerar o URL público do ficheiro físico otimizado
    const { data: publicUrlData } = supabase
      .storage
      .from('catalogo-imagens')
      .getPublicUrl(caminho);

    return res.status(200).json({ 
      mensagem: 'Pipeline executado com sucesso',
      urlImagem: publicUrlData.publicUrl 
    });

  } catch (error) {
    console.error('Erro no pipeline de processamento:', error);
    return res.status(500).json({ error: 'Falha no processamento da imagem.' });
  }
});

// ============================================================================
// ENDPOINT 2: INTEGRAÇÃO COM NEWSLETTER (CLOSUM)
// ============================================================================
app.post('/api/newsletter', async (req, res): Promise<any> => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'O e-mail é obrigatório.' });
    }

    const CLOSUM_API_KEY = process.env.CLOSUM_API_KEY;

    if (!CLOSUM_API_KEY) {
      console.error('ERRO: CLOSUM_API_KEY não está definida no .env.');
      return res.status(500).json({ error: 'Erro interno de configuração do servidor.' });
    }

    // Chamada à API Oficial do Closum
    const response = await fetch(`https://api.closum.com/v2/lead/add?api-key=${CLOSUM_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        lead_opt_in: true,
        consent_email: true,
        tags: ["Newsletter Site"] // <-- ADICIONADO: Tag exata que criámos na Audiência!
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro reportado pelo Closum:", data);
      return res.status(response.status).json({ error: data.message || 'Erro ao subscrever.' });
    }

    return res.status(200).json({ success: true, message: 'Subscrito com sucesso!' });

  } catch (error) {
    console.error("Falha na subscrição da newsletter:", error);
    return res.status(500).json({ error: 'Ocorreu um erro no servidor de newsletter.' });
  }
});

app.listen(port, () => {
  console.log(`Backend isolado a correr na porta ${port}`);
});