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

Si quedas en supletorio, la página muestra la nota mínima del examen (sobre 40) que necesitas para llegar a 24.

## Estructura

```
CalculadoraWeb-EPN/
├── index.html      # Interfaz + mini cargador que compila src/app.ts
├── css/styles.css  # Estilos y colores por estado
└── src/app.ts      # Toda la lógica (validación y cálculo)
```

## Cómo ejecutar

El navegador bloquea la lectura de archivos locales, así que se necesita un servidor:

```bash
npx serve .        # o: npm start
```
