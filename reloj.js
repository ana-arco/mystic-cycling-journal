// Variable para rastrear el día actual y detectar cambios
let ultimoDia = new Date().getDate();

// Variables globales para simulación temporal (Hito B)
let fechaActiva = new Date();
let esTiempoSimulado = false;

// Inicializar reloj y detector de cambio de día
function iniciarReloj() {
  // Inicializar inputs con hora del sistema al cargar
  inicializarInputsSimulados();

  actualizarReloj();
  setInterval(() => {
    if (!esTiempoSimulado) {
      fechaActiva = new Date();
    } else {
      fechaActiva = new Date(fechaActiva.getTime() + 1000);
    }
    actualizarReloj();
  }, 1000);
}

// Establecer valores reales de fecha y hora al cargar
function inicializarInputsSimulados() {
  const dateInput = document.getElementById('inputFechaSimulada');
  const timeInput = document.getElementById('inputHoraSimulada');

  if (dateInput && timeInput) {
    const ahora = new Date();
    const yyyy = ahora.getFullYear();
    const mm = String(ahora.getMonth() + 1).padStart(2, '0');
    const dd = String(ahora.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;

    const hh = String(ahora.getHours()).padStart(2, '0');
    const min = String(ahora.getMinutes()).padStart(2, '0');
    timeInput.value = `${hh}:${min}`;
  }
}

// Activar viaje en el tiempo basado en inputs
function iniciarViajeTemporal() {
  const dateInput = document.getElementById('inputFechaSimulada');
  const timeInput = document.getElementById('inputHoraSimulada');

  if (dateInput && timeInput && dateInput.value && timeInput.value) {
    const [year, month, day] = dateInput.value.split('-').map(Number);
    const [hours, minutes] = timeInput.value.split(':').map(Number);

    fechaActiva = new Date(year, month - 1, day, hours, minutes, 0);
    esTiempoSimulado = true;

    // Actualizar inmediatamente
    actualizarReloj();
  }
}

// Determinar Sabbat activo o más cercano de la Rueda del Año
function obtenerSabbatActivo(ahora) {
  const m = ahora.getMonth() + 1; // 1-12
  const d = ahora.getDate();
  const val = m * 100 + d;

  // Sabbats mayores o astronómicos activos en fechas exactas
  if (val === 201 || val === 202) return { name: "Imbolc", icon: "🕯️", isActive: true };
  if (val === 320 || val === 321) return { name: "Equinoccio de Ostara", icon: "🌱", isActive: true };
  if (val === 430 || val === 501 || val === 502) return { name: "Beltane", icon: "🌸", isActive: true };
  if (val === 621 || val === 622) return { name: "Solsticio de Litha", icon: "☀️", isActive: true };
  if (val === 801 || val === 802) return { name: "Lammas", icon: "🌾", isActive: true };
  if (val >= 921 && val <= 923) return { name: "Equinoccio de Mabon", icon: "🍎", isActive: true };
  if (val === 1031 || val === 1101) return { name: "Samhain", icon: "🎃", isActive: true };
  if (val === 1221 || val === 1222) return { name: "Solsticio de Yule", icon: "❄️", isActive: true };

  // Calendario aproximado de días del año para buscar el más cercano
  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayOfYear = getDayOfYear(ahora);

  const sabbatDays = [
    { name: "Imbolc", day: 32, icon: "🕯️" },
    { name: "Ostara", day: 79, icon: "🌱" },
    { name: "Beltane", day: 120, icon: "🌸" },
    { name: "Litha", day: 172, icon: "☀️" },
    { name: "Lammas", day: 213, icon: "🌾" },
    { name: "Mabon", day: 265, icon: "🍎" },
    { name: "Samhain", day: 304, icon: "🎃" },
    { name: "Yule", day: 355, icon: "❄️" }
  ];

  let closest = sabbatDays[0];
  let minDiff = 365 * 100;

  sabbatDays.forEach(s => {
    let diff = s.day - dayOfYear;
    if (diff < -182) diff += 365;
    if (diff > 182) diff -= 365;

    if (Math.abs(diff) < Math.abs(minDiff)) {
      minDiff = diff;
      closest = s;
    }
  });

  return { name: closest.name, icon: closest.icon, isNearby: true };
}

// Actualizar el diorama de fondo según la hora
function actualizarDiorama(fecha) {
  const horas = fecha.getHours();
  let claseCielo = 'cielo-noche';

  if (horas >= 6 && horas < 9) {
    claseCielo = 'cielo-amanecer';
  } else if (horas >= 9 && horas < 18) {
    claseCielo = 'cielo-dia';
  } else if (horas >= 18 && horas < 21) {
    claseCielo = 'cielo-atardecer';
  }

  // Quitar clases anteriores del body y aplicar la nueva
  document.body.classList.remove('cielo-amanecer', 'cielo-dia', 'cielo-atardecer', 'cielo-noche');
  document.body.classList.add(claseCielo);
  document.body.classList.add('litha-verano');
}

function actualizarReloj() {
  const ahora = fechaActiva;

  // Actualizar el diorama de fondo
  actualizarDiorama(ahora);

  // 1. Reloj digital
  const relojEl = document.getElementById('relojDigital');
  if (relojEl) {
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    relojEl.innerText = `${horas}:${minutos}:${segundos}`;
  }

  // 2. Estación del año según el mes y día exacto (Hemisferio Norte)
  const mes = ahora.getMonth() + 1; // 1-12
  const dia = ahora.getDate();
  const val = mes * 100 + dia;

  // FORZADO DE ESTADO: Verano / Litha de forma fija para visualización inmediata
  let estacion = "Verano";
  let icono = "☀️";
  const sabbatInfo = { name: "Solsticio de Litha", icon: "☀️", isActive: true };

  const cicloTierraEl = document.getElementById('cicloTierra');
  if (cicloTierraEl) {
    cicloTierraEl.innerText = `${estacion} (${sabbatInfo.name})`;
  }

  // 3. Calendario sobremesa: calMes, calDia, calSemana
  const calMes = document.getElementById('calMes');
  const calDia = document.getElementById('calDia');
  const calSemana = document.getElementById('calSemana');

  const mesesNom = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const diasSemanaNom = [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ];

  if (calMes) calMes.innerText = mesesNom[ahora.getMonth()].toUpperCase();
  if (calDia) calDia.innerText = ahora.getDate();
  if (calSemana) calSemana.innerText = diasSemanaNom[ahora.getDay()].toUpperCase();

  // 4. Validación cambio de día para animación automática
  const diaActual = ahora.getDate();
  if (diaActual !== ultimoDia) {
    ultimoDia = diaActual;
    pasarPaginaAnimacion();
  }
}

// Simular el pasar de página
function pasarPaginaAnimacion() {
  const contenedorHoja = document.getElementById('contenedorHoja');
  if (contenedorHoja) {
    // Evitar acumulaciones de clases si se pulsa repetidamente
    if (contenedorHoja.classList.contains('pasar-pagina')) return;

    contenedorHoja.classList.add('pasar-pagina');

    // Reproducir un sutil sonido de página si la Web Audio API está disponible
    // (Opcional, utiliza un tono suave analógico)
    reproducirSonidoHoja();

    setTimeout(() => {
      contenedorHoja.classList.remove('pasar-pagina');
    }, 1000); // Coincide con la duración del CSS @keyframes
  }
}

// Efecto de sonido retro sintetizado al pasar página
let audioCtx = null;
function reproducirSonidoHoja() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (e) {
    // Ignorar si el navegador bloquea audio sin interacción previa
  }
}

// Geolocalización nativa
function obtenerUbicacion() {
  const ubicacionEl = document.getElementById('datosUbicacion');
  if (!ubicacionEl) return;

  ubicacionEl.innerText = "Buscando señales astrales...";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lon = position.coords.longitude.toFixed(4);
        ubicacionEl.innerText = `Lat: ${lat}° | Lon: ${lon}°`;

        // Agregar un sutil brillo de éxito
        ubicacionEl.style.color = 'var(--accent-gold)';
        setTimeout(() => {
          ubicacionEl.style.color = '';
        }, 1500);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            ubicacionEl.innerText = "Acceso denegado al GPS";
            break;
          case error.POSITION_UNAVAILABLE:
            ubicacionEl.innerText = "Señales GPS no disponibles";
            break;
          case error.TIMEOUT:
            ubicacionEl.innerText = "Tiempo de conexión agotado";
            break;
          default:
            ubicacionEl.innerText = "Error al alinear coordenadas";
        }
      },
      { timeout: 5000, maximumAge: 60000 }
    );
  } else {
    ubicacionEl.innerText = "Navegador incompatible con GPS";
  }
}

// Inicializar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  iniciarReloj();

  // Permitir pasar página haciendo clic directo sobre la libreta
  const contenedorHoja = document.getElementById('contenedorHoja');
  if (contenedorHoja) {
    contenedorHoja.addEventListener('click', pasarPaginaAnimacion);
  }
});
