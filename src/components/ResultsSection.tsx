import React, { useState, useEffect } from "react";
import { UserAnswer, UserRegistration } from "../types";
import { 
  Check, 
  X, 
  RefreshCw, 
  FileCheck, 
  AlertTriangle, 
  User, 
  Building, 
  Award, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  CloudLightning,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { motion } from "motion/react";

interface ResultsSectionProps {
  user: UserRegistration;
  answers: UserAnswer[];
  timeElapsedSeconds: number;
  onRestart: () => void;
}

export default function ResultsSection({ 
  user, 
  answers, 
  timeElapsedSeconds, 
  onRestart 
}: ResultsSectionProps) {
  // Constants
  const PASS_SCORE_THRESHOLD = 80; // 80 points out of 100 (24/30 correct answers)
  const totalQuestions = 30;
  
  // Calculate results
  const correctCount = answers.filter(a => a.isCorrect).length;
  const incorrectCount = totalQuestions - correctCount;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const isApproved = score >= PASS_SCORE_THRESHOLD;

  // Timestamps
  const [dateTime] = useState(() => {
    const now = new Date();
    return {
      fecha: now.toLocaleDateString("es-CO", { year: 'numeric', month: '2-digit', day: '2-digit' }),
      hora: now.toLocaleTimeString("es-CO", { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  });

  // Time elapsed formatted
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs}s`;
  };

  // State
  const [syncStatus, setSyncStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [syncMessage, setSyncMessage] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  // Sync results with Google Sheets automatically on mount
  useEffect(() => {
    if (!hasSynced) {
      submitToGoogleSheets();
    }
  }, []);

  const submitToGoogleSheets = async () => {
    if (hasSynced) return;
    
    setSyncStatus("loading");
    setSyncMessage("Sincronizando con planilla corporativa...");

    try {
      // Create flattened string representation of question details for easy column view
      const detailSummary = answers.map((ans, idx) => {
        return `P${idx + 1}: ${ans.isCorrect ? "Correcto" : "Incorrecto"} (Eligió: "${ans.selectedOptionText.substring(0, 35)}..." | Correcta: "${ans.correctOptionText.substring(0, 35)}...")`;
      }).join("\n");

      // Structured payload matching the requirements
      const payload = {
        fecha: dateTime.fecha,
        hora: dateTime.hora,
        tipoIdentificacion: user.tipoIdentificacion,
        numeroIdentificacion: user.numeroIdentificacion,
        nombreCompleto: user.nombreCompleto,
        edad: user.edad,
        empresa: user.empresa,
        antiguedad: user.antiguedad,
        tipoLicencia: user.tipoLicencia,
        respuestasCorrectas: correctCount,
        respuestasIncorrectas: incorrectCount,
        puntaje: score,
        resultado: isApproved ? "Aprobado" : "No aprobado",
        tiempoEmpleado: formatTime(timeElapsedSeconds),
        detallePreguntas: detailSummary,
        rawAnswers: answers
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && (data.status === "success" || data.result === "success" || data.status === "raw")) {
        setSyncStatus("success");
        setSyncMessage("Resultados sincronizados de forma exitosa.");
        setHasSynced(true);
      } else {
        console.error("Respuesta fallida del proxy:", data);
        setSyncStatus("error");
        setSyncMessage(data.message || "Fallo al registrar fila en la planilla.");
      }
    } catch (err: any) {
      console.error("Error al enviar resultados:", err);
      setSyncStatus("error");
      setSyncMessage(err.message || "Error de red al conectar.");
    }
  };

  if (isFinalized) {
    return (
      <div className="flex-1 px-6 py-6 flex flex-col justify-between bg-white h-full" id="finalized-view">
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Check className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">
            ¡Evaluación Archivada!
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6 leading-relaxed">
            La prueba de <span className="font-semibold text-slate-800">{user.nombreCompleto}</span> ha sido registrada de forma permanente y segura en la planilla de control de conducción.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left max-w-xs mx-auto w-full space-y-2.5">
            <div className="border-b border-slate-200/60 pb-2">
              <span className="block text-[9px] uppercase font-bold text-slate-400">Participante</span>
              <span className="text-xs font-bold text-slate-800 truncate block">{user.nombreCompleto}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Puntaje</span>
                <span className={`text-xs font-black ${isApproved ? "text-emerald-600" : "text-rose-600"}`}>{score} / 100</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold text-slate-400">Resultado</span>
                <span className={`text-xs font-bold uppercase ${isApproved ? "text-emerald-600" : "text-rose-600"}`}>
                  {isApproved ? "Aprobado" : "Reprobado"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 shrink-0">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-100 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
            <span>NUEVO EXAMEN</span>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-5 py-4 flex flex-col justify-between bg-slate-50 h-full" id="results-view">
      
      {/* Scrollable Results Content */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-0.5">
        
        {/* Sync Status Toast */}
        <div className={`p-2.5 rounded-lg border text-[11px] flex items-center justify-between gap-3 transition-all ${
          syncStatus === "loading" ? "bg-amber-50 border-amber-200 text-amber-800" :
          syncStatus === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
          "bg-rose-50 border-rose-200 text-rose-800"
        }`}>
          <div className="flex items-center gap-2">
            {syncStatus === "loading" && <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />}
            {syncStatus === "success" && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />}
            {syncStatus === "error" && <CloudLightning className="w-3.5 h-3.5 text-rose-600" />}
            
            <p className="font-semibold leading-tight text-[10px]">
              {syncMessage}
            </p>
          </div>
          
          {syncStatus === "error" && (
            <button 
              onClick={submitToGoogleSheets}
              className="px-2 py-0.5 bg-rose-600 text-white rounded text-[9px] font-bold hover:bg-rose-700 flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="w-2.5 h-2.5" /> Reintentar
            </button>
          )}
        </div>

        {/* Big Certificate Card */}
        <div className={`p-4.5 rounded-2xl shadow-md border relative overflow-hidden ${
          isApproved 
            ? "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border-emerald-800" 
            : "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border-rose-800"
        }`}>
          {/* Certificate Header Badge */}
          <div className="text-center mb-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner ${
              isApproved ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
            }`}>
              <FileCheck className="w-6 h-6" />
            </div>
            
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-widest bg-white/10 mb-1">
              Evaluación Finalizada
            </div>
            
            <h3 className={`text-base font-black tracking-tight leading-tight ${isApproved ? "text-emerald-400" : "text-rose-400"}`}>
              {isApproved ? "APROBADO" : "NO APROBADO"}
            </h3>
            <p className="text-[9px] text-white/50 mt-0.5 leading-normal max-w-[240px] mx-auto">
              {isApproved 
                ? "Ha superado exitosamente el examen teórico de tránsito obligatorio." 
                : "No ha alcanzado el puntaje mínimo de aprobación (80/100)."}
            </p>
          </div>

          {/* Core Score Badge */}
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10 mb-3">
            <div className="text-3xl font-extrabold tracking-tight font-mono text-white flex items-center justify-center gap-1">
              <span className={isApproved ? "text-emerald-400" : "text-rose-400"}>{score}</span>
              <span className="text-xs text-white/40">/ 100 PTS</span>
            </div>
            <div className="grid grid-cols-3 gap-1 mt-2.5 text-center border-t border-white/10 pt-2 text-[9px] text-white/70">
              <div>
                <span className="block font-bold text-emerald-400">{correctCount}</span>
                <span>Correctas</span>
              </div>
              <div>
                <span className="block font-bold text-rose-400">{incorrectCount}</span>
                <span>Incorrectas</span>
              </div>
              <div>
                <span className="block font-bold text-blue-400">{formatTime(timeElapsedSeconds)}</span>
                <span>Tiempo</span>
              </div>
            </div>
          </div>

          {/* Participant Credentials Details */}
          <div className="space-y-1.5 text-[11px] border-t border-white/10 pt-3 text-white/90">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-white/50 shrink-0" />
              <div className="truncate">
                <span className="text-white/50">Participante: </span>
                <span className="font-bold">{user.nombreCompleto}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-white/50 shrink-0" />
              <div>
                <span className="text-white/50">Licencia: </span>
                <span className="font-bold">Categoría {user.tipoLicencia}</span>
                <span className="text-white/40 text-[9px] ml-1">({user.tipoIdentificacion}: {user.numeroIdentificacion})</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-white/50 shrink-0" />
              <div className="truncate">
                <span className="text-white/50">Empresa: </span>
                <span className="font-bold">{user.empresa}</span>
                <span className="text-white/40 text-[9px] ml-1">({user.antiguedad} años antg.)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/5 text-[9px] text-white/50">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 shrink-0" />
                <span>Fecha: {dateTime.fecha}</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3 shrink-0" />
                <span>Hora: {dateTime.hora}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion List to Expand Detailed Questions Review */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full p-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Ver revisión ({answers.length} respuestas)</span>
            </div>
            {showReview ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {showReview && (
            <div className="p-2 border-t border-slate-100 bg-slate-50/50 space-y-2 max-h-[220px] overflow-y-auto">
              {answers.map((ans, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-lg border bg-white shadow-xs ${
                    ans.isCorrect ? "border-emerald-200" : "border-rose-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`w-4.5 h-4.5 rounded flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5 ${
                      ans.isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <p className="text-[11px] font-bold text-slate-800 leading-snug">
                        {ans.questionText}
                      </p>
                      
                      <div className="text-[10px] space-y-0.5 text-slate-600">
                        <div className="flex items-center gap-1 wrap">
                          <span className="font-semibold text-slate-400 shrink-0">Su elección:</span>
                          <span className={ans.isCorrect ? "text-emerald-700 font-medium truncate" : "text-rose-700 font-medium truncate"}>
                            {ans.selectedOptionText}
                          </span>
                        </div>

                        {!ans.isCorrect && (
                          <div className="flex items-center gap-1 bg-emerald-50 p-1 rounded border border-emerald-100 text-emerald-800 text-[9px] mt-1">
                            <span className="font-bold shrink-0">Correcta:</span>
                            <span className="truncate">{ans.correctOptionText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Action buttons at bottom */}
      <div className="pt-3 border-t border-slate-200/60 mt-2 flex gap-3 shrink-0">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="flex-1 h-11 bg-slate-200/60 text-slate-700 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-slate-200 cursor-pointer flex items-center justify-center gap-1.5 border border-slate-300/40"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Nuevo Examen</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFinalized(true)}
          disabled={syncStatus === "loading"}
          className={`flex-1 h-11 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
            syncStatus === "loading"
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100 cursor-pointer"
          }`}
          id="btn-finish-test"
        >
          <span>Finalizar</span>
          <Check className="w-3.5 h-3.5" />
        </motion.button>
      </div>

    </div>
  );
}
