import React, { useState } from "react";
import MobileContainer from "./components/MobileContainer";
import RegistrationForm from "./components/RegistrationForm";
import QuizSection from "./components/QuizSection";
import ResultsSection from "./components/ResultsSection";
import { UserRegistration, UserAnswer } from "./types";
import { 
  HelpCircle, 
  X, 
  Settings, 
  FileSpreadsheet, 
  Code, 
  Compass, 
  Smartphone,
  Eye,
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [stage, setStage] = useState<"register" | "quiz" | "results">("register");
  const [user, setUser] = useState<UserRegistration | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [timeElapsedSeconds, setTimeElapsedSeconds] = useState(0);
  
  // Interactive Modal state for setup guide
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleRegister = (data: UserRegistration) => {
    setUser(data);
    setStage("quiz");
  };

  const handleFinishQuiz = (quizAnswers: UserAnswer[], seconds: number) => {
    setAnswers(quizAnswers);
    setTimeElapsedSeconds(seconds);
    setStage("results");
  };

  const handleRestart = () => {
    setAnswers([]);
    setTimeElapsedSeconds(0);
    setStage("register");
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full relative">
        
        {/* Dynamic Inner Viewport with Animation Transitions */}
        <AnimatePresence mode="wait">
          {stage === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <RegistrationForm onRegister={handleRegister} />

              {/* Floating Trigger to open Setup and Apps Script guide */}
              <div className="px-5 pb-4">
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(true)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all border border-slate-200"
                >
                  <Settings className="w-4 h-4 text-blue-700" />
                  <span>Guía de Conexión y Código Apps Script</span>
                </button>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && user && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col h-full"
            >
              <QuizSection user={user} onFinish={handleFinishQuiz} />
            </motion.div>
          )}

          {stage === "results" && user && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <ResultsSection 
                user={user} 
                answers={answers} 
                timeElapsedSeconds={timeElapsedSeconds} 
                onRestart={handleRestart} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slide-Up Setup / README Panel */}
        <AnimatePresence>
          {isGuideOpen && (
            <>
              {/* Dark overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsGuideOpen(false)}
                className="absolute inset-0 bg-black z-40"
              />

              {/* Guide Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 max-h-[85%] bg-white rounded-t-[32px] shadow-2xl z-50 flex flex-col overflow-hidden border-t border-slate-200"
              >
                {/* Header */}
                <div className="px-5 py-4.5 bg-blue-900 text-white flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-blue-300" />
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                      Manual de Conexión & Apps Script
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsGuideOpen(false)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white focus:outline-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content body (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-600 leading-relaxed">
                  
                  {/* Step 1 */}
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">1</span>
                      Estructura de Google Sheets
                    </h4>
                    <p>
                      Cree una hoja de cálculo en su Google Drive. Cambie el nombre de la hoja inferior a <strong className="text-slate-800">"Resultados"</strong> y configure la primera fila con los siguientes encabezados (Columnas de la A a la O):
                    </p>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[9px] overflow-x-auto whitespace-nowrap text-slate-700">
                      Fecha | Hora | Tipo de ID | Número de ID | Nombre | Edad | Empresa | Antigüedad | Licencia | Correctas | Incorrectas | Puntaje | Resultado | Tiempo | Detalle
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">2</span>
                      Código de Google Apps Script
                    </h4>
                    <p>
                      En su Google Sheet, vaya a <strong className="text-slate-800">Extensiones &gt; Apps Script</strong>, borre todo el código existente y pegue el siguiente programa:
                    </p>
                    
                    <div className="relative">
                      <pre className="bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-[9.5px] overflow-x-auto max-h-[160px] leading-normal select-all">
{`function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Resultados");
    if (!sheet) {
      sheet = ss.getActiveSheet();
    }
    
    // Leer el payload JSON enviado por la app
    var data = JSON.parse(e.postData.contents);
    
    // Escribir los campos en una nueva fila
    sheet.appendRow([
      data.fecha,
      data.hora,
      data.tipoIdentificacion,
      data.numeroIdentificacion,
      data.nombreCompleto,
      Number(data.edad),
      data.empresa,
      Number(data.antiguedad),
      data.tipoLicencia,
      Number(data.respuestasCorrectas),
      Number(data.respuestasIncorrectas),
      Number(data.puntaje),
      data.resultado,
      data.tiempoEmpleado,
      data.detallePreguntas
    ]);
    
    // Retornar respuesta de éxito
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Fila insertada correctamente."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`}
                      </pre>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">3</span>
                      Publicación de la Web App
                    </h4>
                    <p>
                      Haga clic en <strong className="text-slate-800">Implementar &gt; Nueva implementación</strong>. Seleccione tipo <strong className="text-slate-800">"Aplicación web"</strong>. 
                      En <strong>"Quién tiene acceso"</strong> seleccione obligatoriamente <strong className="text-blue-700">"Cualquier persona"</strong> (Anyone). Luego pulse Implementar y autorice los permisos. 
                      Copie la <em className="not-italic font-bold">URL de la aplicación web</em> generada.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">4</span>
                      Configuración de la URL en Vercel
                    </h4>
                    <p>
                      Al desplegar esta aplicación en Vercel o en su entorno preferido, añada la siguiente variable de entorno:
                    </p>
                    <div className="bg-slate-900 text-slate-100 p-2.5 rounded-xl font-mono text-[10px] space-y-1">
                      <p className="text-blue-300">APPS_SCRIPT_URL=</p>
                      <p className="text-emerald-400 break-all text-[9.5px]">"URL_DE_SU_APPS_SCRIPT_COPIADO"</p>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      * Nota: Si no se define, la aplicación utiliza por defecto la URL de integración de producción suministrada en el requerimiento.
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="space-y-1.5 pb-4">
                    <h4 className="font-extrabold text-blue-900 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">5</span>
                      Acceso Móvil QR
                    </h4>
                    <p>
                      Una vez finalizado el deploy en Vercel, tome la URL pública del proyecto (ej: <code>https://evaluacion-conductores.vercel.app</code>) y genere un código QR gratuito. Colóquelo en las oficinas o tableros de control para que los conductores realicen su examen de forma inmediata en sus celulares sin instalar aplicaciones extras.
                    </p>
                  </div>

                </div>

                {/* Footer close bar */}
                <div className="p-3 bg-slate-100 border-t border-slate-200 text-center shrink-0">
                  <button
                    onClick={() => setIsGuideOpen(false)}
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all focus:outline-none"
                  >
                    Entendido, Volver
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </MobileContainer>
  );
}
