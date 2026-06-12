# Plan de Implementación: Grimorio del Ciclo Místico (Prototipo Pixel Art)

Este documento detalla el diseño, la estructura y la implementación de un prototipo de registro menstrual y ciclicidad mística en un solo archivo HTML. El diseño recreará la estética de un pergamino o grimorio digital medieval utilizando fuentes retro y gráficos pixelados vectoriales interactivos.

## User Review Required

> [!IMPORTANT]
> **Ajustes Estéticos Clave:**
> 1. **Paleta de Colores Dual:** Se implementará un selector de tema en la esquina superior para alternar entre "Modo Pergamino Cozy" (colores cálidos, crema y marrón cuero) y "Modo Piedra Arcana" (colores oscuros, morados profundos y dorados brillantes).
> 2. **Audio Sintetizado Retro:** Para potenciar el efecto retro de videojuego, utilizaremos la Web Audio API para generar efectos de sonido analógicos ("blips" y "shimmers" mágicos) al hacer clic en botones y eventos.
> 3. **Estructura Grimoire:** La pantalla principal se dividirá en dos secciones en pantallas grandes (diseño de libro abierto): a la izquierda, la vista del calendario seleccionado; a la derecha, el "Diario del Grimorio", un panel dinámico que muestra los detalles del elemento seleccionado (Sabbats, fases lunares o registro diario).

---

## Propuestos Cambios

### [Core Prototype]

#### [NEW] [index.html](file:///c:/Users/arcoi/Desktop/RUBI/pixel-art-version/index.html)
Archivo único que contendrá toda la estructura HTML5, estilos CSS3 estructurados con variables, y código JavaScript para controlar las vistas, la interactividad de arrastrar y seleccionar, los efectos de sonido y la renderización de gráficos pixel art SVG.

##### Estructura HTML:
- **Cabecera**: Título en estilo medieval, subtexto cozy y selector de tema ("Pergamino" vs "Piedra Arcana").
- **Libro Principal (`.grimoire-book`)**:
  - **Pestañas Laterales/Superiores (`.grimoire-tabs`)**: Pestañas de madera o pergamino pixeladas para cambiar de vista.
  - **Página Izquierda (`.calendar-page`)**: Contenedor dinámico que renderiza:
    1. *Vista de Estaciones (Rueda del Año)*: Representación circular interactiva de las estaciones y los 8 Sabbats con nodos interactivos.
    2. *Vista del Anillo de 28 Días*: Un Ouroboros o anillo de gemas mágicas de colores según la fase (menstrual, folicular, ovulatoria, lútea).
    3. *Vista Lunar (Lunación)*: Una cuadrícula de fases de 29.5 días con lunas animadas pixel art.
    4. *Vista Libre (Cuadrícula del Ritual)*: Un grid interactivo de 35 días estilo "painting grid" para arrastrar y registrar síntomas, sangrado y rituales.
  - **Página Derecha (`.journal-page`)**: El diario mágico que muestra consejos místicos, detalles del día/fase/Sabbat seleccionado, y permite guardar notas simuladas en el almacenamiento local (`localStorage`).

##### Estilos CSS:
- Uso de variables personalizadas (`--bg-primary`, `--border-color`, `--accent-gold`, etc.) para soportar los dos temas visuales.
- Fuentes pixeladas cargadas de Google Fonts (`VT323` para el texto general del grimorio y `Press Start 2P` para encabezados y botones).
- Bordes simulados de 4px pixelados (`box-shadow` e interpolaciones de bordes).
- Propiedad `image-rendering: pixelated` para que los SVGs pixelados se vean nítidos y con estética de 8/16 bits.
- Animaciones de parpadeo mágico y flotación retro (`keyframes`).

##### Lógica JavaScript (Vanilla):
- **Web Audio Synth**: Inicializador de audio para reproducir sonidos retro al hacer clics, cambiar de vista o guardar registros.
- **Rueda del Año (Estaciones)**: Dibujado de la rueda pagana con SVG interactivo y posicionamiento polar de los Sabbats.
- **Anillo de 28 Días**: Renderizado interactivo y cálculo de las fases biológicas basadas en el día seleccionado.
- **Calendario Lunar**: Algoritmo simplificado de lunación que calcula y muestra fases lunares personalizadas con SVGs pixel art.
- **Selector Libre con Drag-to-Paint**: Lógica de eventos (`mousedown`, `mouseenter`, `mouseup`) que permite seleccionar múltiples días y pintar estados (Sangrado 🩸, Dolor 🔥, Ritual 🕯️, Energía 🌟).
- **Persistencia**: Uso de `localStorage` para guardar el estado del calendario de selección libre y notas del diario.

---

## Plan de Verificación

### Manual Verification
1. **Comprobar Temas**: Probar que el cambio entre el tema de Pergamino Claro y Piedra Oscura actualiza todos los componentes de forma cohesiva.
2. **Navegación de Pestañas**: Verificar el cambio fluido entre las 4 vistas con animaciones retro.
3. **Interacción de Sabbats**: Hacer clic en Yule, Samhain, Beltane, etc., y verificar que el diario de la derecha se actualiza con la descripción mística y reproduce el sonido de campana/shimmer.
4. **Interacción del Anillo Menstrual**: Hacer clic en los diferentes días del anillo para ver el cambio de fase y los textos asociados.
5. **Comportamiento Drag-to-Paint**: Pintar estados en la Vista Libre arrastrando el ratón y comprobar que se guardan correctamente.
6. **Efectos de Sonido**: Probar los audios retro en distintos navegadores (Chrome, Firefox, Edge).
