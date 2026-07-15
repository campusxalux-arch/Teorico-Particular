export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const QUESTION_POOL: Question[] = [
  {
    id: 1,
    text: "¿Qué indica una línea doble continua amarilla en el centro de la vía?",
    options: [
      "Permite adelantar en ambos sentidos con precaución",
      "Prohíbe adelantar en ambos sentidos y divide los flujos opuestos de tránsito",
      "Indica carril exclusivo para transporte público y bicicletas",
      "Es una zona segura para el estacionamiento temporal de vehículos"
    ],
    correctAnswerIndex: 1,
    explanation: "La línea doble amarilla continua prohíbe el adelantamiento en ambos sentidos de circulación y delimita sentidos opuestos de tránsito."
  },
  {
    id: 2,
    text: "¿Cuál es el límite máximo de velocidad permitido en zonas urbanas para vehículos de servicio particular (según la normativa general vigente)?",
    options: [
      "30 km/h",
      "50 km/h",
      "60 km/h",
      "80 km/h"
    ],
    correctAnswerIndex: 1,
    explanation: "La ley Julián Esteban (Ley 2251 de 2022 en Colombia) estableció que el límite máximo de velocidad en zonas urbanas es de 50 km/h para vehículos particulares."
  },
  {
    id: 3,
    text: "¿Cuál es el límite máximo de velocidad en zonas escolares, residenciales y de concentración de peatones?",
    options: [
      "10 km/h",
      "20 km/h",
      "30 km/h",
      "40 km/h"
    ],
    correctAnswerIndex: 2,
    explanation: "En zonas residenciales, escolares y con alta presencia de peatones, el límite máximo de velocidad es siempre de 30 km/h por seguridad vial."
  },
  {
    id: 4,
    text: "¿Qué significan las señales de tránsito que tienen un color de fondo naranja?",
    options: [
      "Señales de advertencia preventivas de carácter fijo",
      "Señales reglamentarias de obligatorio cumplimiento inmediato",
      "Señales transitorias debido a trabajos u obras en la vía",
      "Señales informativas de servicios generales y turismo"
    ],
    correctAnswerIndex: 2,
    explanation: "El color naranja está reservado para señales transitorias, que advierten sobre condiciones temporales u obras en la calzada."
  },
  {
    id: 5,
    text: "Al enfrentar una señal reglamentaria de 'PARE', ¿cuál es la conducta correcta del conductor?",
    options: [
      "Disminuir la velocidad y continuar si no se observa peligro inmediato",
      "Detener el vehículo por completo, verificar la vía de cruce y avanzar con seguridad",
      "Tocar la bocina repetidamente para avisar paso y cruzar rápido",
      "Cambiar de carril para esquivar la intersección sin detenerse"
    ],
    correctAnswerIndex: 1,
    explanation: "La señal de PARE exige detener el vehículo por completo a cero km/h antes de la línea de pare, verificar el tráfico y luego reanudar la marcha."
  },
  {
    id: 6,
    text: "¿Qué distancia mínima de seguridad se debe mantener con el vehículo precedente a velocidades medias?",
    options: [
      "5 metros en cualquier velocidad",
      "La distancia correspondiente a la regla de los 3 segundos",
      "10 metros sin importar el clima",
      "No existe una distancia mínima regulada por las leyes"
    ],
    correctAnswerIndex: 1,
    explanation: "La regla de los 3 segundos proporciona un margen seguro de tiempo para reaccionar y frenar ante emergencias del vehículo de adelante."
  },
  {
    id: 7,
    text: "¿Qué ampara principalmente el Seguro Obligatorio de Accidentes de Tránsito (SOAT)?",
    options: [
      "Daños materiales causados al vehículo propio y de terceros",
      "Pérdidas parciales o totales por robo del vehículo",
      "Daños corporales y muertes causados a todas las personas en un accidente de tránsito",
      "Responsabilidad civil contractual por daños estructurales"
    ],
    correctAnswerIndex: 2,
    explanation: "El SOAT cubre la atención médica inmediata, incapacidades y gastos de transporte de todas las personas lesionadas (conductores, pasajeros y peatones)."
  },
  {
    id: 8,
    text: "¿Qué tipo de señal es un círculo con borde rojo, fondo blanco y un símbolo negro?",
    options: [
      "Señal preventiva de peligro",
      "Señal reglamentaria o de prohibición/restricción",
      "Señal informativa de ruta nacional",
      "Señal transitoria de desvío"
    ],
    correctAnswerIndex: 1,
    explanation: "Las señales circulares con borde rojo y fondo blanco son reglamentarias. Indican limitaciones, prohibiciones o restricciones en la vía."
  },
  {
    id: 9,
    text: "¿Con qué frecuencia se debe realizar la primera revisión tecnicomecánica para un vehículo particular nuevo?",
    options: [
      "Al cumplir 1 año desde la fecha de matrícula",
      "Al cumplir 5 años desde la fecha de matrícula",
      "Cada 2 años obligatoriamente",
      "Al cumplir 10 años desde su fabricación"
    ],
    correctAnswerIndex: 1,
    explanation: "En Colombia, de acuerdo con la normatividad vigente (Ley de Plan de Desarrollo), los carros particulares nuevos realizan su primera revisión tecnicomecánica al cumplir 5 años desde la fecha de matrícula."
  },
  {
    id: 10,
    text: "¿Cuál es la sanción por conducir en estado de embriaguez grado 1 por primera vez?",
    options: [
      "Amonestación verbal y llamado de atención educativo",
      "Suspensión de la licencia por 1 a 3 años, multa monetaria y retención del vehículo",
      "Prisión preventiva obligatoria de 5 a 10 años",
      "Cancelación definitiva de la cédula de ciudadanía"
    ],
    correctAnswerIndex: 1,
    explanation: "Conducir bajo efectos del alcohol acarrea la suspensión temporal de la licencia (que aumenta según el grado), multas económicas sustanciales e inmovilización del vehículo."
  },
  {
    id: 11,
    text: "Al ingresar a una rotonda o glorieta, ¿quién tiene la prelación o derecho de paso?",
    options: [
      "El vehículo que se aproxima y va a ingresar a la rotonda",
      "El vehículo que ya circula dentro de la rotonda",
      "El vehículo que tenga el mayor tamaño o peso",
      "El vehículo que circule por el carril exterior de la derecha"
    ],
    correctAnswerIndex: 1,
    explanation: "Los vehículos que ya están girando dentro de la glorieta tienen prelación sobre aquellos que pretenden incorporarse a ella."
  },
  {
    id: 12,
    text: "¿Qué significa la luz amarilla intermitente o parpadeante en un semáforo?",
    options: [
      "Detención absoluta obligatoria e inmediata",
      "Acelerar la marcha para cruzar antes del cambio a luz roja",
      "Disminuir la velocidad y cruzar con extrema precaución",
      "Que el semáforo está fuera de servicio y rige la ley del más fuerte"
    ],
    correctAnswerIndex: 2,
    explanation: "La luz amarilla intermitente advierte peligro. Indica que se debe aminorar la marcha y avanzar solo tras comprobar que no hay riesgo de colisión."
  },
  {
    id: 13,
    text: "¿Por qué lado de la vía está permitido adelantar reglamentariamente a otro vehículo en movimiento?",
    options: [
      "Por el lado derecho únicamente",
      "Por el lado izquierdo únicamente",
      "Por cualquier lado, siempre que haya espacio suficiente",
      "Por la berma o zona peatonal lateral"
    ],
    correctAnswerIndex: 1,
    explanation: "Salvo contadas excepciones específicas (como vehículos girando a la izquierda), el adelantamiento debe realizarse siempre por el carril izquierdo."
  },
  {
    id: 14,
    text: "¿Qué indica una señal circular con flecha a la derecha y una diagonal roja cruzándola?",
    options: [
      "Giro permitido a la derecha con precaución",
      "Prohibición de girar a la derecha",
      "Desvío obligatorio hacia la izquierda por obras",
      "Vía de sentido único hacia la derecha"
    ],
    correctAnswerIndex: 1,
    explanation: "La diagonal roja sobre un círculo reglamentario indica siempre una prohibición; en este caso, prohíbe realizar giros a la derecha."
  },
  {
    id: 15,
    text: "¿Qué luces se deben mantener encendidas al transitar por carreteras intermunicipales o nacionales durante el día?",
    options: [
      "Luces altas o plenas para máxima visibilidad",
      "Luces de posición o cocuyos únicamente",
      "Luces medias obligatoriamente",
      "No es obligatorio usar ninguna luz si hay plena luz del sol"
    ],
    correctAnswerIndex: 2,
    explanation: "Las luces medias son obligatorias en carreteras nacionales las 24 horas del día para aumentar la visibilidad del vehículo ante otros conductores."
  },
  {
    id: 16,
    text: "Si la parte trasera del vehículo patina (derrapa) hacia la derecha en suelo mojado, ¿cómo se debe reaccionar?",
    options: [
      "Frenar a fondo inmediatamente y halar el freno de mano",
      "Girar el volante suavemente hacia la derecha (mismo sentido del derrape) y soltar el acelerador",
      "Girar el volante bruscamente hacia la izquierda",
      "Acelerar a fondo para contrarrestar la inercia"
    ],
    correctAnswerIndex: 1,
    explanation: "Se debe contravirar con suavidad hacia el mismo lado a donde se desplaza la parte trasera del auto para recuperar el control, evitando frenar bruscamente."
  },
  {
    id: 17,
    text: "¿Cuál es la edad mínima establecida para obtener una licencia de conducción de servicio público?",
    options: [
      "16 años",
      "18 años",
      "21 años",
      "25 años"
    ],
    correctAnswerIndex: 1,
    explanation: "Para conducir vehículos de servicio público la edad mínima exigida es de 18 años, mientras que para vehículos particulares es de 16 años."
  },
  {
    id: 18,
    text: "¿Cuál es la profundidad mínima permitida de labrado en las llantas de un automóvil particular?",
    options: [
      "0.5 mm",
      "1.6 mm",
      "3.0 mm",
      "No hay mínimo, las llantas lisas tienen mejor tracción"
    ],
    correctAnswerIndex: 1,
    explanation: "El límite legal de desgaste de los neumáticos es de 1.6 mm en la profundidad de la banda de rodadura; por debajo de esto, pierde tracción y adherencia."
  },
  {
    id: 19,
    text: "¿Cuál es la función principal del sistema de frenado antibloqueo (ABS)?",
    options: [
      "Reducir el desgaste de las pastillas y el consumo de combustible",
      "Evitar que las ruedas se bloqueen en una frenada fuerte, permitiendo dirigir el auto",
      "Hacer que el pedal de freno sea más suave y fácil de presionar",
      "Encender de manera automática las luces de estacionamiento"
    ],
    correctAnswerIndex: 1,
    explanation: "El ABS evita el bloqueo de los neumáticos bajo frenadas extremas, lo que previene el deslizamiento incontrolable y permite maniobrar la dirección."
  },
  {
    id: 20,
    text: "Si un policía de tránsito se encuentra de espaldas o de frente hacia su flujo vehicular, ¿qué indica?",
    options: [
      "Vía libre, puede continuar su marcha",
      "Detención absoluta o Pare obligatorio",
      "Que debe disminuir la velocidad pero puede pasar",
      "Que debe cambiar inmediatamente de carril"
    ],
    correctAnswerIndex: 1,
    explanation: "El agente de tránsito de espaldas o de frente equivale a una señal de PARE o luz roja de semáforo. De perfil indica vía libre."
  },
  {
    id: 21,
    text: "¿Cuándo se deben utilizar obligatoriamente las luces direccionales?",
    options: [
      "Solamente para estacionar el carro en reversa",
      "Con suficiente anticipación antes de girar, cambiar de carril o incorporarse a una vía",
      "Únicamente durante la noche o bajo lluvias densas",
      "No son necesarias si no se observan otros vehículos en la cercanía"
    ],
    correctAnswerIndex: 1,
    explanation: "Las luces direccionales son fundamentales para comunicar de forma anticipada las maniobras de giro o cambio de carril a los demás actores viales."
  },
  {
    id: 22,
    text: "¿Está permitido el uso de dispositivos celulares o móviles mientras se conduce?",
    options: [
      "Sí, siempre y cuando se sostenga el dispositivo con una sola mano",
      "Sí, exclusivamente para leer o redactar mensajes rápidos de texto",
      "No, salvo si se utiliza mediante accesorios de manos libres que eviten la distracción física",
      "Sí, la ley no establece ninguna restricción para el uso del celular"
    ],
    correctAnswerIndex: 2,
    explanation: "Manipular el celular con las manos mientras se conduce está prohibido debido al alto riesgo de distracción visual y cognitiva. Se permite manos libres."
  },
  {
    id: 23,
    text: "¿Qué indica la línea central discontinua de color blanco en una calzada?",
    options: [
      "Vía de doble sentido donde está permitido adelantar con precaución",
      "Vía de un solo sentido donde se permite cambiar de carril con precaución",
      "Delimitación de carril exclusivo para transporte masivo",
      "Advertencia de que la vía está en mal estado o en reparación"
    ],
    correctAnswerIndex: 1,
    explanation: "La línea blanca central divide carriles del mismo sentido de circulación. Al ser discontinua, autoriza el cambio de carril de forma segura."
  },
  {
    id: 24,
    text: "¿Qué indica una señal de tránsito triangular invertida con bordes rojos y fondo blanco?",
    options: [
      "Ceda el paso",
      "Sentido obligatorio de circulación",
      "Zona inestable de derrumbes",
      "Disminución del ancho de calzada"
    ],
    correctAnswerIndex: 0,
    explanation: "El triángulo con vértice hacia abajo indica 'Ceda el paso', obligando a dar prioridad a los vehículos que transitan por la vía a la que ingresa."
  },
  {
    id: 25,
    text: "Si se revienta un neumático delantero circulando a alta velocidad, ¿cuál es la acción correcta?",
    options: [
      "Pisar el pedal de freno a fondo con fuerza para detener el auto de inmediato",
      "Sujetar el volante firmemente con ambas manos, soltar el acelerador gradualmente y frenar muy suavemente",
      "Apagar el motor de inmediato para cortar el movimiento de las ruedas",
      "Halar el volante de forma brusca hacia el lado opuesto del pinchazo"
    ],
    correctAnswerIndex: 1,
    explanation: "Frenar bruscamente desestabilizaría el auto. Se debe sujetar con firmeza el volante para mantener la trayectoria recta y desacelerar de forma progresiva."
  },
  {
    id: 26,
    text: "¿A qué distancia mínima antes de un cruce ferroviario o intersección está prohibido adelantar a otro vehículo?",
    options: [
      "10 metros",
      "30 metros",
      "60 metros",
      "100 metros"
    ],
    correctAnswerIndex: 2,
    explanation: "Las normas generales prohíben adelantar en bocacalles, intersecciones, curvas o cruces ferroviarios dentro de una distancia mínima de 60 metros."
  },
  {
    id: 27,
    text: "¿Qué indica una señal reglamentaria circular con borde rojo y el número '80' en el centro?",
    options: [
      "Distancia mínima requerida de 80 metros con otros autos",
      "Velocidad máxima permitida de 80 km/h en ese tramo",
      "Peso máximo autorizado de 8.0 toneladas para camiones",
      "Límite mínimo obligatorio de velocidad de 80 km/h"
    ],
    correctAnswerIndex: 1,
    explanation: "Es una señal reglamentaria de velocidad máxima permitida, lo que prohíbe circular a una velocidad superior a los 80 km/h."
  },
  {
    id: 28,
    text: "¿Qué elemento de seguridad pasiva protege la columna cervical en caso de una colisión trasera?",
    options: [
      "El cinturón de seguridad de tres puntos",
      "El apoyacabezas ajustado correctamente a la altura de los ojos",
      "Las bolsas de aire frontales (airbags)",
      "El sistema de carrocería deformable"
    ],
    correctAnswerIndex: 1,
    explanation: "El apoyacabezas detiene el movimiento violento de la cabeza hacia atrás (efecto latigazo) en colisiones traseras, reduciendo lesiones cervicales."
  },
  {
    id: 29,
    text: "¿Qué indica una señal preventiva amarilla con la silueta de dos niños corriendo?",
    options: [
      "Zona de juegos y parques recreativos infantiles",
      "Zona escolar adelante, reduzca la velocidad y esté atento",
      "Paso prohibido para peatones y menores de edad",
      "Cruces de vías férreas de uso peatonal"
    ],
    correctAnswerIndex: 1,
    explanation: "Esta señal indica 'Zona Escolar', advirtiendo la proximidad de colegios o instituciones donde se debe extremar la precaución y reducir velocidad."
  },
  {
    id: 30,
    text: "Si se ve involucrado en un accidente 'solo daños' y los carros obstruyen la vía, ¿cuál es el procedimiento según la ley actual?",
    options: [
      "Dejar los autos quietos y esperar al agente de tránsito o aseguradoras sin mover nada",
      "Tomar fotos o videos como evidencia y retirar de inmediato los vehículos para liberar la vía",
      "Abandonar el vehículo en la vía y retirarse para evitar responsabilidades",
      "Pelear con el otro conductor en la calzada para definir culpabilidad"
    ],
    correctAnswerIndex: 1,
    explanation: "La normatividad actual (como la Ley 2161 de 2021 en Colombia) exige retirar los vehículos implicados en colisiones de solo daños materiales una vez recopiladas las pruebas fotográficas, bajo pena de multa por obstrucción."
  },
  {
    id: 31,
    text: "¿Cuál es la función principal del líquido de frenos en un vehículo automotor?",
    options: [
      "Refrigerar los discos de freno para que no se quemen",
      "Lubricar el pistón del motor durante el encendido",
      "Transmitir la fuerza hidráulica del pedal de freno hacia los cilindros y mordazas de las llantas",
      "Limpiar las impurezas y polvo metálico que despiden las pastillas de freno"
    ],
    correctAnswerIndex: 2,
    explanation: "El líquido de frenos es el fluido incompresible que transmite la presión hidráulica ejercida por el conductor al presionar el pedal hasta las pastillas de freno."
  },
  {
    id: 32,
    text: "¿Qué indica una línea continua amarilla paralela a una línea discontinua amarilla en el centro?",
    options: [
      "Que ambos sentidos de circulación tienen permitido adelantar",
      "Que solo los vehículos del lado de la línea discontinua pueden adelantar con precaución",
      "Que la calzada se convertirá en vía de sentido único pronto",
      "Que está estrictamente prohibido circular a más de 30 km/h"
    ],
    correctAnswerIndex: 1,
    explanation: "La regla indica que el conductor debe guiarse por la línea que está más cerca de su carril. Si es discontinua, puede adelantar; si es continua, no."
  },
  {
    id: 33,
    text: "¿Qué indica una señal rectangular azul con una letra 'P' blanca en el centro?",
    options: [
      "Parada autorizada de bus de transporte público",
      "Zona de estacionamiento o parqueadero permitido",
      "Peaje obligatorio adelante en la vía",
      "Puesto de policía de carreteras a corta distancia"
    ],
    correctAnswerIndex: 1,
    explanation: "Es una señal informativa que indica un espacio autorizado o área destinada para el estacionamiento de vehículos."
  },
  {
    id: 34,
    text: "Al sobrepasar o adelantar a un ciclista en la calzada, ¿qué distancia lateral mínima debe conservar con él?",
    options: [
      "0.5 metros para no perder velocidad",
      "1.0 metro si el clima es despejado",
      "1.5 metros de separación lateral para proteger su estabilidad",
      "No hay distancia fija, depende de la habilidad del conductor"
    ],
    correctAnswerIndex: 2,
    explanation: "Por ley, para salvaguardar la vida y estabilidad del ciclista ante corrientes de viento, se debe dejar al menos 1.5 metros de separación lateral al adelantarlo."
  },
  {
    id: 35,
    text: "¿Cuál de los siguientes factores aumenta de forma peligrosa el tiempo de reacción de un conductor?",
    options: [
      "Llevar las manos sobre las posiciones 10 y 2 del volante",
      "Haber descansado correctamente de 7 a 8 horas antes del viaje",
      "El cansancio, la fatiga, el consumo de alcohol o medicamentos sedantes",
      "Utilizar lentes formulados antirreflejo durante la noche"
    ],
    correctAnswerIndex: 2,
    explanation: "La fatiga, alcohol y psicotrópicos retardan las respuestas cerebrales y motrices, aumentando los metros recorridos antes de pisar el freno."
  },
  {
    id: 36,
    text: "¿Qué debe hacer un conductor al aproximarse a un cruce peatonal demarcado ('cebra') donde hay peatones cruzando?",
    options: [
      "Aumentar la velocidad para pasar antes de que crucen",
      "Tocar la bocina de forma insistente para obligar al peatón a correr",
      "Detener por completo la marcha de forma segura y ceder la prelación al peatón",
      "Esquivar a los peatones cambiando de carril continuamente"
    ],
    correctAnswerIndex: 2,
    explanation: "El peatón siempre tiene la prelación de paso sobre las franjas peatonales (cebra); los vehículos deben detenerse antes de la línea de parada."
  },
  {
    id: 37,
    text: "¿Qué tipo de sanción legal se aplica al transitar con el Seguro Obligatorio (SOAT) vencido?",
    options: [
      "Una amonestación escrita y llamado de atención",
      "Multa equivalente a 30 salarios mínimos legales diarios vigentes e inmovilización inmediata del vehículo",
      "Ninguna multa, siempre y cuando no ocurra un accidente de tránsito",
      "Multa leve pagadera únicamente de forma virtual en un año"
    ],
    correctAnswerIndex: 1,
    explanation: "Transitar sin el SOAT vigente o tenerlo vencido genera una multa severa y el traslado inmediato del vehículo a los patios (inmovilización)."
  },
  {
    id: 38,
    text: "¿Qué prohíbe una señal reglamentaria con la silueta de un camión negro tachada con una franja roja?",
    options: [
      "La circulación de camiones articulados únicamente",
      "La circulación y tránsito de todo tipo de vehículo de carga pesada",
      "Estacionarse en zonas de descarga nocturnas",
      "Superar los 30 km/h circulando en camión"
    ],
    correctAnswerIndex: 1,
    explanation: "Esta señal prohíbe la circulación de vehículos de carga por esa vía debido a restricciones de peso, dimensiones o normativas locales de movilidad."
  },
  {
    id: 39,
    text: "¿Por qué es de vital importancia el buen estado y la presión correcta de aire en las llantas?",
    options: [
      "Exclusivamente para que el vehículo se vea estético y deportivo",
      "Para garantizar el agarre, reducir la distancia de frenado y evitar el hidroplaneo (aquaplaning)",
      "Para aumentar la potencia total en caballos de fuerza del motor",
      "Para desactivar de manera automática el sistema de frenado ABS"
    ],
    correctAnswerIndex: 1,
    explanation: "Las llantas son el único punto de contacto del auto con el asfalto. Una correcta presión y labrado evacúan agua, aseguran dirección y reducen metros de frenado."
  },
  {
    id: 40,
    text: "Al descender por una pendiente prolongada y empinada, ¿cuál es el método más seguro para controlar la velocidad?",
    options: [
      "Colocar el carro en Neutro (punto muerto) y frenar de forma continua con el pedal",
      "Engranar una marcha baja (compresión de motor) y dar frenadas cortas e intermitentes",
      "Apagar el motor de inmediato y descender sosteniendo el freno de mano",
      "Acelerar constantemente y realizar giros rápidos en zig-zag para reducir la inercia"
    ],
    correctAnswerIndex: 1,
    explanation: "Usar la compresión de la caja de cambios evita que los frenos se recalienten y dejen de funcionar (pérdida de frenos por sobrecalentamiento)."
  }
];
