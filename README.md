# Calculadora de Notas - EPN

Calculadora web para estudiantes de la Escuela Politécnica Nacional: ingresa dos notas y te dice si apruebas, vas a supletorio o repruebas.

## Reglas

- Cada nota se ingresa en el rango **0 a 20** (validada en el formulario).
- **Promedio = nota1 + nota2**, sobre **40**.

| Promedio (0–40) | Resultado    |
|-----------------|--------------|
| 28 – 40         | Aprueba      |
| 18 – 27.99      | Supletorio   |
| 0 – 17.99       | Reprueba     |

Si quedas en supletorio, debes obtener **al menos 24/40** en el examen y sumar **48 puntos o más** entre tus dos notas y el examen. La página muestra la nota mínima necesaria, calculada como el mayor valor entre **24** y **48 menos la suma de tus notas**. Si obtienes menos de 24 en el examen, repruebas el supletorio.

## Estructura

```
CalculadoraWeb-EPN/
├── index.html      # Interfaz y carga de app.js
├── app.js          # JavaScript generado para el navegador
├── css/styles.css  # Estilos y colores por estado
└── src/app.ts      # Toda la lógica (validación y cálculo)
```

## Cómo ejecutar

Instala las dependencias una vez con `npm install`. Luego inicia la aplicación:

```bash
npm start
```

El comando compila `src/app.ts` a `app.js` y levanta un servidor local. La página ya no necesita descargar TypeScript desde internet ni leer archivos `.ts` desde el navegador.
