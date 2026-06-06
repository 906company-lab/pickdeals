export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    const r = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/products.json`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const file = await r.json();
    const content = JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'));
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membaca produk', detail: err.message });
  }
}
