import express from "express";

const app = express();
const PORT = process.env.APP_PORT || 3003;

app.get("/", (_req, res) => {
  res.send("🚀 Dubra API funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});