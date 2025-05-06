import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3003;



app.get("/", (_req, res) => {
  res.send("🚀 Dubra API funcionando correctamente");
});

// Solo escuchá si no estás en test
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  });
}

// Exportá la app para usarla en los tests
export default app;