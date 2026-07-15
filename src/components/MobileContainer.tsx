import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] font-sans flex items-center justify-center p-0 sm:p-6 md:p-10 select-none overflow-x-hidden">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto lg:h-[750px] gap-8 lg:gap-12 items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Preview Mockup */}
        <div className="relative w-full max-w-[380px] h-[700px] bg-white rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-[#1e293b] flex flex-col overflow-hidden shrink-0 transition-all duration-300">
          
          {/* Mobile Status Bar */}
          <div className="w-full h-8 flex justify-between items-center px-8 pt-4 shrink-0 select-none bg-white">
            <span className="text-xs font-bold text-slate-900">9:41</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-4 h-2.5 rounded-sm bg-slate-900/20 relative">
                <div className="absolute left-0 top-0 h-full w-[80%] bg-slate-900 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Actual Scrollable Screen Content */}
          <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative h-full bg-slate-50">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="w-full bg-slate-50 py-2 shrink-0">
            <div className="w-32 h-1.5 bg-slate-900/15 rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Content Side (visible on large screens) */}
        <div className="hidden lg:flex flex-1 flex-col py-6 select-text">
          <div className="inline-block self-start px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-5 uppercase tracking-wider">
            Solución Corporativa
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tighter">
            Infraestructura de <br/>
            <span className="text-blue-600">Evaluación Digital</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center mb-3">
                <span className="text-blue-600 text-lg font-bold">30</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Reactivo Dinámico</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cada examen selecciona 30 preguntas aleatorias no repetitivas para máxima seguridad.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center mb-3">
                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Google Sync</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Resultados exportados de forma segura a su planilla de Google Sheets en tiempo real.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 shrink-0">
                <div className="w-5 h-5 border-2 border-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm leading-tight">Resultados Instantáneos</h4>
                <p className="text-slate-500 text-xs">Cálculo inmediato de puntaje y justificación pedagógica detallada.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100 shrink-0">
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-sm leading-tight">Acceso Directo vía QR</h4>
                <p className="text-slate-500 text-xs">Despliegue ágil en móviles para flotas de transporte e instructores.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-1 bg-slate-200/50 rounded-xl inline-flex self-start">
            <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-xs font-bold text-slate-900">
              Vercel Deploy Ready
            </div>
            <div className="px-3 py-1.5 text-xs font-bold text-slate-500">
              TypeScript v5
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
