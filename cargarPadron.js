// cargarPadron.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Ruta segura
const PDF_PATH = path.join(__dirname, 'src', 'Kifa Padron Imprimible.pdf');

console.log("Ruta completa del PDF:", PDF_PATH);

// Verificar existencia del archivo
if (!fs.existsSync(PDF_PATH)) {
  console.error("❌ No se encontró el archivo PDF.");
  process.exit(1);
}

const dataBuffer = fs.readFileSync(PDF_PATH);
console.log("Tamaño del buffer del PDF:", dataBuffer.length);
if (dataBuffer.length === 0) {
  console.error("❌ El PDF está vacío o no es válido.");
  process.exit(1);
}

function parseLine(line) {
  // Ajusta según el formato real del PDF
  const match = line.match(/^(\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\s+(.+)$/);
  if (!match) return null;
  return {
    up: parseInt(match[1], 10),
    cat: parseInt(match[2], 10),
    crv: parseInt(match[3], 10),
    leg: parseFloat(match[4]),
    apellido_nombre: match[5].trim(),
  };
}

async function main() {
  try {
    const data = await pdf(dataBuffer);
    const lines = data.text.split('\n').map(l => l.trim()).filter(Boolean);
    const registros = lines.map(parseLine).filter(Boolean);

    let insertados = 0;
    for (const reg of registros) {
      const { error } = await supabase.from('padron').insert([reg]);
      if (!error) insertados++;
      else console.error('Error al insertar:', reg, error.message);
    }
    console.log(`✅ Registros insertados con éxito: ${insertados}`);
  } catch (err) {
    console.error('Error general:', err.message);
  }
}

main();
