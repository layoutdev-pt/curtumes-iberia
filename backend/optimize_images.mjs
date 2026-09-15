import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../frontend/public/Curtumes_antigo');
const outputDir = path.resolve(__dirname, '../frontend/public/tour');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.JPG') || f.endsWith('.jpeg'));
  console.log(`Encontradas ${files.length} imagens para otimizar.`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.[^/.]+$/, "") + '.webp');

    try {
      // Cria imagem otimizada para web (largura max 1600px para uso livre no site)
      await sharp(inputPath)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(outputPath);
      
      console.log(`✅ Otimizada: ${file}`);
    } catch (err) {
      console.error(`❌ Erro ao otimizar ${file}:`, err);
    }
  }

  console.log('🎉 Otimização concluída!');
}

optimizeImages();
