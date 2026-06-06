export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const adminPass = req.headers['authorization'];
  if (adminPass !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Password salah!' });
  }

  const { products } = req.body;
  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Data tidak valid' });
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const FILE_PATH = 'products.json';

  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!getRes.ok) {
      const err = await getRes.json();
      return res.status(500).json({ error: 'Gagal ambil file dari GitHub', detail: err });
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    const content = Buffer.from(JSON.stringify(products, null, 2)).toString('base64');

    const updateRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update products via admin panel',
          content,
          sha,
        }),
      }
    );

    if (!updateRes.ok) {
      const err = await updateRes.json();
      return res.status(500).json({ error: 'Gagal update GitHub', detail: err });
    }

    return res.status(200).json({ success: true, message: 'Produk berhasil disimpan!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
