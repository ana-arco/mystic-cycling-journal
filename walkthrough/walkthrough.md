# Recorrido del Proyecto: Reestructuración Modular y Portal del Grimorio

Este documento resume la migración de un archivo monolítico (`index.html`) a una arquitectura de componentes web modular y desacoplada, añadiendo una nueva interfaz de portal ("Portal de Ingreso").

## Cambios Realizados

Se ha transformado la estructura del proyecto en las siguientes partes:

1. **`grimorio-activo.html`**: Archivo histórico completo que contiene las visualizaciones de Rueda del Año, Anillo de Ciclo Menstrual, Lunación y Tablón de Síntomas. Se inyectó el botón de regreso morado (`🏰 Ir al Portal`) en la fila superior de herramientas.
2. **[reloj.js](file:///c:/Users/arcoi/Desktop/RUBI/pixel-art-version/reloj.js)**: Script externo con la lógica del reloj digital, cálculo aproximado de las estaciones terrestres y alineación de latitud/longitud por geolocalización. Además, gestiona el disparador de animación de cambio de hoja.
3. **[estilos-dashboard.css](file:///c:/Users/arcoi/Desktop/RUBI/pixel-art-version/estilos-dashboard.css)**: Nueva hoja de estilos centrada en el portal. Maqueta un soporte de cuero medieval para una libreta con tres anillas metálicas y una hoja de pergamino tridimensional que rota en su eje superior al pasar la fecha.
4. **[index.html](file:///c:/Users/arcoi/Desktop/RUBI/pixel-art-version/index.html)**: Entrada limpia del portal con la libreta de sobremesa, el reloj del reino, y los enlaces directos tanto al grimorio de registro como al manifiesto conceptual.

---

## Verificación Visual y de Navegación

El subagente de navegación web verificó el despliegue del portal local en `http://localhost:8000/index.html` bajo Chrome, registrando las siguientes capturas:

### 1. El Portal de Ingreso (`index.html`)
Muestra el bloc de sobremesa tridimensional (en papel de pergamino claro) integrado con las anillas de metal y el panel lateral oscuro estilo runa.

![Portal de Ingreso](/C:/Users/arcoi/.gemini/antigravity-ide/brain/948bd663-cd4d-4012-bb03-e6031010c841/portal_layout_1781283386064.png)

### 2. Sincronización de Coordenadas (GPS)
La geolocalización detecta un entorno simulado de satélites y aplica un *timeout* controlado de 5 segundos, evitando cualquier congelación de la pantalla del usuario.

![Timeout del GPS](/C:/Users/arcoi/.gemini/antigravity-ide/brain/948bd663-cd4d-4012-bb03-e6031010c841/gps_timeout_1781283441756.png)

### 3. El Grimorio Interactivo (`grimorio-activo.html`)
Se accede pulsando el botón dorado "Abrir Grimorio". Se aprecia el botón morado de regreso al portal en el extremo izquierdo.

![Grimorio Activo](/C:/Users/arcoi/.gemini/antigravity-ide/brain/948bd663-cd4d-4012-bb03-e6031010c841/grimorio_activo_layout_1781283455456.png)

---

## Mejoras Técnicas Clave
- **Seguridad en APIs**: La geolocalización ahora cuenta con `{ timeout: 5000, maximumAge: 60000 }` para prevenir bloqueos en hilos cuando no se otorga acceso o no se dispone de sensor GPS físico.
- **Audio Sintetizado Coherente**: Se incorporó un oscilador de Audio Context en `reloj.js` que emula el "sonido de viento/papel" al voltear la hoja del calendario.
- **Acoplamiento Limpio**: Se separaron las tipografías mágicas en el nuevo CSS común del Dashboard para no sobrecargar el renderizado inicial del DOM.

---

## Expansión del Manifiesto y Hoja de Ruta Mística

Se ha modificado e instrumentalizado por completo **`documentacion.html`** con los siguientes pilares de diseño estratégico:

*   **Pestaña 1: Manifiesto y Visión**
    *   *Soberanía Ginecológica y Tecnológica*: Un texto profundo que contrapone el registro local encriptado frente a la mercantilización de datos de las corporaciones centralizadas.
    *   *API Ginecológica Soberana (Gynae-JSON Schema)*: Estándar para asegurar la portabilidad de datos clínicos y científicos en formato JSON sin ataduras propietarias.
    *   *Compás Espacio-Temporal*: Integración del Microcosmos (cuerpo), Mesocosmos (estaciones de la Tierra) y Macrocosmos (fases de la Luna).
*   **Pestaña 4: Compás Dinámico y Roadmap**
    *   *Daff Moon Simulation Engine*: Hoja de ruta para el fondo de capas dinámico basado en una variable global reactiva `fechaActiva`.
    *   *Hitos Detallados*:
        *   **Hito A (Capas)**: Estructuración del sándwich de planos visuales (Cielo de 24h, astros móviles, bosque pixel art, partículas de clima).
        *   **Hito B (JavaScript)**: Desvinculación del reloj en favor del simulador temporal activo.
        *   **Hito C (Fetch Clima)**: Integración de la API abierta Open-Meteo usando coordenadas locales.
        *   **Hito D (Astronomía)**: Aplicación de fórmulas trigonométricas de efemérides para mover los astros en su altura y fase real.
*   **Refactorización de Eventos**:
    *   Se actualizó la firma de `switchPage(pageId, tabEl)` y las llamadas inline para pasar el elemento de pestaña de forma explícita (`this`), eliminando la dependencia del objeto global obsoleto `window.event` para una compatibilidad perfecta con estándares de navegadores modernos.

---

## Hito A Completado: El Escenario de Capas (Diorama Vivo)

Se ha implementado el primer gran hito técnico para construir el **Compás Dinámico** en el Portal de Ingreso, añadiendo profundidad visual y reactividad horaria:

1.  **Estructura del Diorama (`index.html`)**:
    *   Se inyectó el sándwich de capas `#skyBg` (cielo), `#starsBg` (estrellas), `#horizonBg` (horizonte/bosque) y `#weatherBg` (clima) con posicionamiento fijo ocupando el 100% de la ventana.
    *   Se envolvió la interfaz de la libreta y el panel en `.interfaz-bloque` con un `z-index: 10` para flotar limpiamente encima del fondo.
2.  **Paletas de Color de las 24 Horas (`estilos-dashboard.css`)**:
    *   **Amanecer (`.cielo-amanecer`)**: Púrpura cósmico (#2c1b4d) a naranja místico (#e28743).
    *   **Día (`.cielo-dia`)**: Azul cielo profundo (#1d2b53) a celeste mágico (#29adff).
    *   **Atardecer (`.cielo-atardecer`)**: Violeta oscuro (#4c1c5c) a granate/dorado (#ab5236).
    *   **Noche (`.cielo-noche`)**: Negro cósmico absoluto (#0b0711).
3.  **Firma Gráfica Pixel Art**:
    *   **Estrellas (`.capa-estrellas`)**: Patrón procedural de estrellas doradas y blancas que parpadean con animación steps `.tintinearEstrellas` visible solo en horarios de amanecer y noche.
    *   **Silueta del Bosque (`.capa-horizonte`)**: Dos capas de árboles de pino pixel art repetidos mediante patrones SVG embebidos de color negro forestal (`#080c14`) y morado profundo (`#1b1428`), simulando una atmósfera de bosque de fantasía cozy.
4.  **Lógica Integradora (`reloj.js`)**:
    *   La función `actualizarReloj()` evalúa la hora decimal del sistema de manera reactiva cada segundo y aplica al body las clases de cielo, provocando transiciones fluidas de color.

### Evidencias de la Simulación Horaria

El subagente verificó que al cargar la página en la hora de atardecer (**20:47**), el cielo cambió correctamente a tonos violetas y cobres:

![Cielo en Atardecer](/C:/Users/arcoi/.gemini/antigravity-ide/brain/948bd663-cd4d-4012-bb03-e6031010c841/diorama_initial_check_1781293599236.png)

Al clickear la libreta de sobremesa, las transiciones visuales y los efectos 3D de voltear página se ejecutan perfectamente sobre el fondo de pinos:

![Volteo sobre el Diorama](/C:/Users/arcoi/.gemini/antigravity-ide/brain/948bd663-cd4d-4012-bb03-e6031010c841/diorama_post_click_check_1781293627436.png)

---

## Hito B Completado: Refinamiento Temporal, Estaciones Convencionales y Sincronización de Sabbats

Se ha perfeccionado la simulación temporal en el Portal de Ingreso:

1. **Lógica de Estaciones Astronómicas Exactas (Hemisferio Norte)**:
   - 🌱 **Primavera**: 20 de Marzo al 20 de Junio.
   - ☀️ **Verano**: 21 de Junio al 21 de Septiembre.
   - 🍂 **Otoño**: 22 de Septiembre al 20 de Diciembre.
   - ❄️ **Invierno**: 21 de Diciembre al 19 de Marzo.
2. **Sincronización del Marcador de Sabbats**:
   - Muestra el Sabbat activo en las ventanas clave (p. ej. "Solsticio de Yule" el 21-22 de Diciembre, "Samhain" del 31 de Octubre al 1 de Noviembre, "Beltane" del 30 de Abril al 2 de Mayo, etc.).
   - Cuando no hay Sabbat activo, indica automáticamente el Sabbat más cercano con su respectivo icono místico.
3. **Flujo del Tiempo y Reactividad del Diorama**:
   - Al viajar temporalmente, el motor mantiene un avance continuo añadiendo 1000ms cada segundo a la fecha simulada (`fechaActiva`).
   - El fondo del cielo (`#skyBg`) y la capa de estrellas (`#starsBg`) se actualizan dinámicamente en tiempo real según la hora activa:
     * **Amanecer** (06:00 - 08:59)
     * **Día** (09:00 - 17:59)
     * **Atardecer** (18:00 - 20:59)
     * **Noche** (21:00 - 05:59)

### Evidencias de Verificación en Navegador
- **Solsticio de Invierno (Yule)**: Viajando al 21 de Diciembre a las 23:00h, el marcador indica con precisión `Invierno (Solsticio de Yule)` y el cielo transiciona instantáneamente al modo noche estrellado.
  
  ![Verificación Solsticio de Yule](/C:/Users/arcoi/.gemini/antigravity-ide/brain/948bd663-cd4d-4012-bb03-e6031010c841/winter_yule_final_1781296648094.png)

- **Samhain**: Viajando al 31 de Octubre a las 23:30h, el marcador refleja `Otoño (Samhain)` bajo el cielo estrellado.
  
  ![Verificación Samhain](/C:/Users/arcoi/.gemini/antigravity-ide/brain/948bd663-cd4d-4012-bb03-e6031010c841/autumn_samhain_1781296704922.png)


