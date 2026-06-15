# 📦 Automatización de Repomix para la IA

Este documento contiene los métodos para generar rápidamente el archivo de contexto `repomix.xml` necesario para que la IA (Antigravity) entienda la estructura completa del proyecto consumiendo el mínimo número de tokens.

El comando base que se ejecuta es:
`npx repomix --output repomix.xml --style xml`

---

## 🛠️ Método 1: Automatización con Node.js (`package.json`)

Si prefieres ejecutarlo de forma nativa desde la terminal de VS Code utilizando los scripts de Node, sigue estos pasos:

1. Abre el archivo `package.json` en la raíz del proyecto.
2. Añade la siguiente línea dentro del objeto `"scripts"`:

```json
"scripts": {
  "context": "npx repomix --output repomix.xml --style xml"
}

Cómo usarlo: Cada vez que quieras actualizar el contexto para la IA, abre tu terminal y escribe:

Bash
   npm run context


   💻 Método 2: Automatización con un ejecutable de Windows (.bat)
Si prefieres crear un archivo independiente en el que solo tengas que hacer doble clic o ejecutarlo directamente por su nombre sin escribir comandos largos:

Crea un archivo en la raíz del proyecto llamado generar-contexto.bat.

Pega el siguiente código en su interior:

@echo off
title Generador de Contexto - Repomix
echo ==========================================
echo    Generando nuevo repomix.xml...
echo ==========================================
npx repomix --output repomix.xml --style xml
echo.
echo [OK] ¡Contexto actualizado con éxito para Antigravity!
echo ==========================================
pause

Cómo usarlo: Haz doble clic sobre el archivo generar-contexto.bat desde el explorador de archivos, o escribe .\generar-contexto.bat en tu terminal de PowerShell. La ventana se mantendrá abierta al final para confirmarte que se ha creado correctamente.