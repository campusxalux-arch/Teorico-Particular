import React, { useState } from "react";
import { 
  UserRegistration, 
  TipoIdentificacion, 
  TipoLicencia 
} from "../types";
import { 
  User, 
  IdCard, 
  Calendar, 
  Briefcase, 
  Clock, 
  Car, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { motion } from "motion/react";

interface RegistrationFormProps {
  onRegister: (data: UserRegistration) => void;
}

const TIPOS_IDENTIFICACION: TipoIdentificacion[] = [
  "Cédula de ciudadanía",
  "Cédula de extranjería",
  "Pasaporte",
  "Permiso Especial"
];

const TIPOS_LICENCIA: TipoLicencia[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "B3",
  "C1",
  "C2",
  "C3"
];

export default function RegistrationForm({ onRegister }: RegistrationFormProps) {
  const [formData, setFormData] = useState<UserRegistration>({
    tipoIdentificacion: "Cédula de ciudadanía",
    numeroIdentificacion: "",
    nombreCompleto: "",
    edad: "",
    empresa: "",
    antiguedad: "",
    tipoLicencia: "B1"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: keyof UserRegistration, value: any): string => {
    switch (name) {
      case "nombreCompleto":
        if (!value || value.trim().length < 4) {
          return "Mínimo 4 caracteres obligatorios.";
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          return "Solo se permiten letras.";
        }
        return "";
      case "numeroIdentificacion":
        if (!value || value.trim().length < 5) {
          return "Identificación inválida (mín. 5 caracteres).";
        }
        if (!/^[a-zA-Z0-9-]+$/.test(value)) {
          return "Use números y letras únicamente.";
        }
        return "";
      case "edad":
        if (value === "") return "La edad es requerida.";
        const numEdad = Number(value);
        if (isNaN(numEdad) || numEdad < 16 || numEdad > 99) {
          return "Debe estar entre 16 y 99 años.";
        }
        return "";
      case "empresa":
        if (!value || value.trim().length < 2) {
          return "Ingrese el nombre de la empresa.";
        }
        return "";
      case "antiguedad":
        if (value === "") return "La antigüedad es requerida.";
        const numAntiguedad = Number(value);
        if (isNaN(numAntiguedad) || numAntiguedad < 0 || numAntiguedad > 60) {
          return "Debe ingresar de 0 a 60 años.";
        }
        if (formData.edad !== "" && numAntiguedad >= Number(formData.edad) - 15) {
          return "Antigüedad incoherente con la edad.";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Convert numeric fields
    let processedValue: any = value;
    if (name === "edad" || name === "antiguedad") {
      processedValue = value === "" ? "" : Number(value);
    }

    const updatedFormData = {
      ...formData,
      [name]: processedValue
    };

    setFormData(updatedFormData);

    // Dynamic error checking
    const err = validateField(name as keyof UserRegistration, processedValue);
    setErrors(prev => ({
      ...prev,
      [name]: err
    }));
  };

  const handleBlur = (name: keyof UserRegistration) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const isFormValid = () => {
    // Check all fields are not empty
    const { 
      numeroIdentificacion, 
      nombreCompleto, 
      edad, 
      empresa, 
      antiguedad 
    } = formData;

    if (!numeroIdentificacion || !nombreCompleto || edad === "" || !empresa || antiguedad === "") {
      return false;
    }

    // Check no errors exist
    const currentErrors = {
      nombreCompleto: validateField("nombreCompleto", nombreCompleto),
      numeroIdentificacion: validateField("numeroIdentificacion", numeroIdentificacion),
      edad: validateField("edad", edad),
      empresa: validateField("empresa", empresa),
      antiguedad: validateField("antiguedad", antiguedad)
    };

    return !Object.values(currentErrors).some(err => err !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onRegister(formData);
    } else {
      // Touch all to trigger messages
      const allTouched = Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouched(allTouched);

      // Gather errors
      const allErrors: Record<string, string> = {};
      (Object.keys(formData) as Array<keyof UserRegistration>).forEach(key => {
        const err = validateField(key, formData[key]);
        if (err) allErrors[key] = err;
      });
      setErrors(allErrors);
    }
  };

  return (
    <div className="flex-1 px-6 py-5 flex flex-col justify-between" id="form-registration-view">
      {/* App Header */}
      <div className="pt-2 pb-4 shrink-0">
        <div className="w-12 h-12 bg-blue-600 rounded-xl mb-4 flex items-center justify-center shadow-lg shadow-blue-100">
          <Car className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 leading-tight uppercase tracking-tight">
          Evaluación Teórica<br/><span className="text-blue-600">para Conductores</span>
        </h1>
        <p className="text-xs text-slate-500 mt-2">Complete su registro para iniciar el examen.</p>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-3 overflow-y-auto pr-1">
        {/* Nombre completo */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1">
            Nombre completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleInputChange}
            onBlur={() => handleBlur("nombreCompleto")}
            placeholder="Ej: Juan Pérez"
            className={`w-full h-10 px-3 text-xs bg-slate-50 border rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              touched.nombreCompleto && errors.nombreCompleto
                ? "border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
            }`}
          />
          {touched.nombreCompleto && errors.nombreCompleto && (
            <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1 ml-1">
              <ShieldAlert className="w-3 h-3 shrink-0" /> {errors.nombreCompleto}
            </p>
          )}
        </div>

        {/* Tipo de identificación & Número */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1">
              Tipo ID <span className="text-red-500">*</span>
            </label>
            <select
              name="tipoIdentificacion"
              value={formData.tipoIdentificacion}
              onChange={handleInputChange}
              className="w-full h-10 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            >
              {TIPOS_IDENTIFICACION.map(opt => (
                <option key={opt} value={opt}>
                  {opt.replace("de ciudadanía", "").replace("de extranjería", "")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1">
              Número ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="numeroIdentificacion"
              value={formData.numeroIdentificacion}
              onChange={handleInputChange}
              onBlur={() => handleBlur("numeroIdentificacion")}
              placeholder="1032485..."
              className={`w-full h-10 px-3 text-xs bg-slate-50 border rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                touched.numeroIdentificacion && errors.numeroIdentificacion
                  ? "border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            {touched.numeroIdentificacion && errors.numeroIdentificacion && (
              <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1 ml-1">
                <ShieldAlert className="w-3 h-3 shrink-0" /> {errors.numeroIdentificacion}
              </p>
            )}
          </div>
        </div>

        {/* Edad & Tipo de licencia */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1">
              Edad <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="edad"
              min="16"
              max="99"
              value={formData.edad}
              onChange={handleInputChange}
              onBlur={() => handleBlur("edad")}
              placeholder="32"
              className={`w-full h-10 px-3 text-xs bg-slate-50 border rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                touched.edad && errors.edad
                  ? "border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            {touched.edad && errors.edad && (
              <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1 ml-1">
                <ShieldAlert className="w-3 h-3 shrink-0" /> {errors.edad}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1">
              Licencia <span className="text-red-500">*</span>
            </label>
            <select
              name="tipoLicencia"
              value={formData.tipoLicencia}
              onChange={handleInputChange}
              className="w-full h-10 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            >
              {TIPOS_LICENCIA.map(lic => (
                <option key={lic} value={lic}>
                  Categoría {lic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Empresa donde labora */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1">
            Empresa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleInputChange}
            onBlur={() => handleBlur("empresa")}
            placeholder="Transportes S.A."
            className={`w-full h-10 px-3 text-xs bg-slate-50 border rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              touched.empresa && errors.empresa
                ? "border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
            }`}
          />
          {touched.empresa && errors.empresa && (
            <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1 ml-1">
              <ShieldAlert className="w-3 h-3 shrink-0" /> {errors.empresa}
            </p>
          )}
        </div>

        {/* Años de antigüedad */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 ml-1 mb-1">
            Antigüedad (Años) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="antiguedad"
            min="0"
            max="60"
            value={formData.antiguedad}
            onChange={handleInputChange}
            onBlur={() => handleBlur("antiguedad")}
            placeholder="5"
            className={`w-full h-10 px-3 text-xs bg-slate-50 border rounded-lg text-slate-700 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
              touched.antiguedad && errors.antiguedad
                ? "border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:ring-blue-100 focus:border-blue-500"
            }`}
          />
          {touched.antiguedad && errors.antiguedad && (
            <p className="text-[10px] text-red-500 mt-0.5 flex items-center gap-1 ml-1">
              <ShieldAlert className="w-3 h-3 shrink-0" /> {errors.antiguedad}
            </p>
          )}
        </div>
      </form>

      {/* Sticky Footer */}
      <div className="pt-3 pb-1 border-t border-slate-100 shrink-0">
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className={`w-full h-12 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all ${
            isFormValid()
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100 cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          id="btn-start-exam"
        >
          <span>INICIAR EXAMEN</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        <p className="text-[9px] text-center text-slate-400 mt-2.5">
          v1.0.4 • Sincronización Automática Activa
        </p>
      </div>
    </div>
  );
}
