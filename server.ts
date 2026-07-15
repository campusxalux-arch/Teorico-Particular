import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON payloads
  app.use(express.json());

  // API endpoint to proxy results securely to Google Apps Script (and Sheets)
  app.post("/api/submit", async (req, res) => {
    try {
      const payload = req.body;
      console.log("Recibida solicitud de guardado de resultados:", payload);
      
      const appsScriptUrl = process.env.APPS_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyGNxQ7d4lOKlN1N3V2CfexOuimKC7O5xl11QBsjBH8yxf1ZL03KhxBBaa5_w55Mq5sgA/exec";
      
      console.log("Reenviando datos a Google Apps Script:", appsScriptUrl);
      
      const response = await fetch(appsScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const responseText = await response.text();
      console.log("Respuesta cruda de Google Apps Script:", responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { status: "raw", message: responseText };
      }
      
      if (response.ok) {
        res.status(response.status).json(responseData);
      } else {
        res.status(response.status).json({
          status: "error",
          message: "El servidor de Google Apps Script retornó un estado de error",
          details: responseData
        });
      }
    } catch (error: any) {
      console.error("Error al sincronizar con Google Sheets:", error);
      res.status(500).json({
        status: "error",
        message: "No se pudo establecer conexión con el servicio de Google Sheets. Los datos se guardarán localmente para evitar pérdidas.",
        details: error.message || error
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Serve static assets or use Vite dev server
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
