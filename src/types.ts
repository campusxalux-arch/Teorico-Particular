export type TipoIdentificacion = 
  | "Cédula de ciudadanía"
  | "Cédula de extranjería"
  | "Pasaporte"
  | "Permiso Especial";

export type TipoLicencia = 
  | "A1"
  | "A2"
  | "B1"
  | "B2"
  | "B3"
  | "C1"
  | "C2"
  | "C3";

export interface UserRegistration {
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  nombreCompleto: string;
  edad: number | "";
  empresa: string;
  antiguedad: number | "";
  tipoLicencia: TipoLicencia;
}

export interface UserAnswer {
  questionId: number;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  isCorrect: boolean;
  correctOptionIndex: number;
  correctOptionText: string;
}

export interface ExamResult {
  user: UserRegistration;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  timeElapsedSeconds: number;
  answers: UserAnswer[];
  correctCount: number;
  incorrectCount: number;
  score: number; // 0 to 100
  isApproved: boolean;
}
