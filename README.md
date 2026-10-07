# Calculadora de Notas - EPN

Calculadora web para estudiantes de la Escuela Politécnica Nacional: ingresa dos notas y te dice si apruebas, vas a supletorio o repruebas, mostrándote además la nota mínima que necesitas en el examen de supletorio.

## Reglas

- Cada nota se ingresa en el rango **0 a 20** (validada en el formulario).
- **Promedio = nota1 + nota2**, sobre **40**.

| Promedio (0–40) | Resultado    |
|-----------------|--------------|
| 28 – 40         | Aprueba      |
| 18 – 27.99      | Supletorio   |
| 0 – 17.99       | Reprueba     |

Si quedas en supletorio, debes obtener **al menos 24/40** en el examen y sumar **48 puntos o más** entre tus dos notas y el examen. La página muestra la nota mínima necesaria, calculada como el mayor valor entre **24** y **48 menos la suma de tus notas**. Si obtienes menos de 24 en el examen, repruebas el supletorio.

## Instalación y ejecución

Instala las dependencias una vez:

```bash
npm install
```

Luego inicia la aplicación:

```bash
npm start
```

El comando compila `src/app.ts` a `app.js` y levanta un servidor local (`npx serve .`); la primera ejecución lo descarga, así que necesita red. Abre la URL que imprime en la consola.

Si editas `src/app.ts`, vuelve a compilar con `npm run build` para que el navegador ejecute la lógica nueva.

## Capturas

<p align="center">
  <img src="docs/img/calculadora-aprueba.png" width="440" alt="Calculadora EPN mostrando un resultado de 34 sobre 40: aprueba" />
</p>

| | |
|:--:|:--:|
| <img src="docs/img/calculadora-inicio.png" width="380" alt="Vista inicial con las reglas de aprobación y el formulario vacío" /><br><sub>Vista inicial</sub> | <img src="docs/img/calculadora-validacion.png" width="380" alt="Validación de una nota mayor a 20 con mensaje de error en español" /><br><sub>Nota fuera de rango (0 – 20)</sub> |
| <img src="docs/img/calculadora-supletorio.png" width="380" alt="Resultado supletorio con la nota mínima del examen: 29 sobre 40" /><br><sub>Supletorio (10 + 9 = 19 → pide 29/40)</sub> | <img src="docs/img/calculadora-reprueba.png" width="380" alt="Resultado de 14 sobre 40: reprueba" /><br><sub>Reprueba (8 + 6 = 14)</sub> |

### Diseño responsive

En pantallas menores a 460 px las reglas se apilan en una sola columna y la tarjeta ocupa todo el ancho disponible.

<p align="center">
  <img src="docs/img/calculadora-movil.png" width="240" alt="Calculadora EPN en un teléfono, con las reglas apiladas verticalmente" />
</p>
