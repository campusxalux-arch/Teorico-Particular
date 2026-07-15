# Evaluación Teórica para Conductores 🚗💨

Aplicación web móvil-primero profesional para realizar exámenes teóricos de conducción, con registro de usuarios, selección aleatoria de 30 preguntas no repetitivas y sincronización automática de resultados con Google Sheets mediante un servicio seguro de Google Apps Script.

---

## 🚀 Características del Proyecto
*   **Diseño Móvil-Primero (Mobile-First):** Interfaz adaptada con apariencia nativa de aplicación para Android y iPhone, con tarjetas modernas, sombras suaves y botones táctiles amplios.
*   **Banco de Preguntas Profesional:** Banco integrado de 40 preguntas de tránsito de alta calidad sobre señales de tránsito, límites de velocidad, normas de adelantamiento, grado de alcoholemia, seguridad pasiva y mecánica preventiva.
*   **Selección Aleatoria e Inteligente:** Cada examen selecciona 30 preguntas aleatorias no repetitivas, garantizando un examen único para cada postulante.
*   **Calificación Interactiva Inmediata:** Respuestas validadas al instante con colores intuitivos (verde ✅ para correctas, rojo ❌ para incorrectas) con justificación técnica detallada.
*   **Sincronización Segura sin Exposición:** Servidor backend intermedio Express que realiza proxy seguro de los datos hacia Google Apps Script, protegiendo credenciales y evitando bloqueos de políticas CORS en el navegador.
*   **Doble Persistencia de Seguridad:** Los resultados se sincronizan automáticamente en segundo plano. En caso de caídas de red, se dispone de indicadores de estado visuales y reintentos manuales.

---

## 🗄️ Configuración de Google Sheets (Base de Datos)

Para que los resultados se registren automáticamente, siga estos pasos:

1.  **Crear Hoja de Cálculo:**
    Cree una nueva hoja de cálculo en su cuenta de Google Drive.
2.  **Configurar Nombre de la Hoja:**
    Cambie el nombre de la pestaña inferior (Sheet/Hoja) a exactamente `Resultados`.
3.  **Encabezados de Columnas:**
    Establezca los siguientes títulos en la primera fila (Fila 1, Columnas de la A a la O) para asegurar la correcta alineación de los registros:
    *   **A:** Fecha
    *   **B:** Hora
    *   **C:** Tipo de ID
    *   **D:** Número de ID
    *   **E:** Nombre Completo
    *   **F:** Edad
    *   **G:** Empresa
    *   **H:** Antigüedad
    *   **I:** Tipo de Licencia
    *   **J:** Correctas
    *   **K:** Incorrectas
    *   **L:** Puntaje
    *   **M:** Resultado
    *   **N:** Tiempo Empleado
    *   **O:** Detalle de Preguntas

---

## ✍️ Código de Google Apps Script

1.  En su Google Sheet, acceda al menú superior **Extensiones > Apps Script**.
2.  Borre cualquier función existente y pegue el siguiente script:

```javascript
/**
 * Google Apps Script Web App para Registro de Evaluaciones Teóricas de Conducción.
 * Procesa peticiones POST e inserta registros ordenados en la hoja de cálculo.
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Resultados");
    if (!sheet) {
      sheet = ss.getActiveSheet();
    }
    
    // Parsear el cuerpo de la solicitud JSON enviada por la app
    var data = JSON.parse(e.postData.contents);
    
    // Insertar nueva fila al final de la hoja con los campos ordenados
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
    
    // Responder exitosamente al proxy de la aplicación
    return ContentService.createTextOutput(JSON.stringify({
      "status": "success",
      "message": "Resultados de " + data.nombreCompleto + " archivados con éxito."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error",
      "message": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "success",
    "message": "La API de Evaluación de Conductores está activa y lista para recibir solicitudes POST."
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3.  Haga clic en **Guardar** (icono de disquete).
4.  Haga clic en el botón azul **Implementar > Nueva implementación**.
5.  Seleccione el tipo de implementación **Aplicación web** (icono de engranaje).
6.  Configure las opciones:
    *   **Descripción:** `API Sincronización Exámenes v1`
    *   **Ejecutar como:** `Yo (tu_correo@gmail.com)`
    *   **Quién tiene acceso:** Seleccione obligatoriamente **Cualquier persona** (Anyone).
7.  Haga clic en **Implementar**.
8.  Autorice los permisos de su cuenta de Google.
9.  Copie la **URL de la aplicación web** generada (termina en `/exec`).

---

## ☁️ Instrucciones de Despliegue en Vercel

Siga estos sencillos pasos para publicar su aplicación teórica a producción en Vercel de manera gratuita:

### Método 1: Despliegue con el botón Vercel CLI (Recomendado)
1. Instale la utilidad Vercel en su terminal si no la tiene:
   ```bash
   npm install -g vercel
   ```
2. Ejecute el comando de inicio en la raíz de este proyecto:
   ```bash
   vercel
   ```
3. Siga las instrucciones interactivas del asistente en pantalla para loguearse y vincular el proyecto.
4. Cuando el asistente pregunte por variables de entorno o configuraciones del Framework, verifique añadir:
   *   **`APPS_SCRIPT_URL`:** Coloque la URL de Google Apps Script copiada en la sección anterior.
5. Vercel desplegará y compilará automáticamente los scripts del servidor.

### Método 2: Integración con GitHub (Flujo Continuo)
1. Suba este código a un repositorio privado o público en su cuenta de **GitHub**, **GitLab** o **Bitbucket**.
2. Inicie sesión en [Vercel](https://vercel.com/) y haga clic en **Add New > Project**.
3. Importe su repositorio de conducción recién subido.
4. Despliegue la pestaña **Environment Variables** y agregue:
   *   **Key:** `APPS_SCRIPT_URL`
   *   **Value:** `https://script.google.com/macros/s/.../exec` (tu url generada)
5. Presione **Deploy**. Cada vez que realice un cambio y haga `git push`, Vercel actualizará la aplicación de forma automática sin interrumpir el servicio.

---

## 📱 Acceso mediante Código QR
Una vez finalizado el despliegue en Vercel, usted obtendrá un enlace público (por ejemplo, `https://evaluacion-teorica.vercel.app`).
1. Copie el enlace generado.
2. Diríjase a un generador gratuito de códigos QR como [QR Code Generator](https://www.qr-code-generator.com/) o [QRCode Monkey](https://www.qrcode-monkey.com/).
3. Pegue su enlace de Vercel y genere una imagen QR de alta resolución.
4. Imprima este código QR y colóquelo en las zonas comunes de conductores o en los vehículos de entrenamiento. Los conductores podrán escanearlo con la cámara de su móvil y realizar la evaluación de inmediato, disfrutando de una experiencia responsiva idéntica a una aplicación nativa.
