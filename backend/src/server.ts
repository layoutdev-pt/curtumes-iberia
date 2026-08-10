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

// Endpoint do Pipeline de Imagens
app.post('/api/upload-catalogo', upload.single('imagem'), async (req, res): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum ficheiro intercetado.' });
    }

    const nomeOriginal = req.file.originalname.split('.')[0];
    const nomeFicheiroWebp = `${nomeOriginal}-${Date.now()}.webp`;

    console.log(`A processar imagem: ${nomeOriginal}`);

    // 2 e 3. Processamento com Sharp: Conversão para WebP, redimensionamento e compressão
    const bufferOtimizado = await sharp(req.file.buffer)
      .resize({ 
        width: 1200, 
        height: 1200, 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 80 }) // Compressão e conversão automática
      .toBuffer();

    // 4. Exportação para o serviço de Object Storage nativo (Supabase Storage)
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('catalogo-imagens') // NOTA: Tens de criar este bucket no painel do Supabase
      .upload(`public/${nomeFicheiroWebp}`, bufferOtimizado, {
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
      .getPublicUrl(`public/${nomeFicheiroWebp}`);

    // 5. Devolvemos apenas a string de texto com o URL público para o Frontend guardar na base de dados relacional
    return res.status(200).json({ 
      mensagem: 'Pipeline executado com sucesso',
      urlImagem: publicUrlData.publicUrl 
    });

  } catch (error) {
    console.error('Erro no pipeline de processamento:', error);
    return res.status(500).json({ error: 'Falha no processamento da imagem.' });
  }
});

app.listen(port, () => {
  console.log(`Backend isolado a correr na porta ${port}`);
});