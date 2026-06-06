import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const filePath = join(process.cwd(), 'products.json');
    const data = readFileSync(filePath, 'utf8');
    const products = JSON.parse(data);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membaca produk' });
  }
}
