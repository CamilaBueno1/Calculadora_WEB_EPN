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
## Instalación
```bash
npm install
```
## Ejecución
```bash
npm start 
```
## Capturas

### Aprueba
<img width="456" height="590" alt="Pantalla de aprobado" src="https://github.com/user-attachments/assets/bade510f-5d63-4a7e-8338-ba6e03ccde98" />

### Supletorio
<img width="420" height="657" alt="Pantalla de supletorio" src="https://github.com/user-attachments/assets/ed553f2e-ca5e-405f-aee6-37f50d4ce839" />

### Reprueba
<img width="426" height="587" alt="Pantalla de reprobado" src="https://github.com/user-attachments/assets/9b67c472-4f46-44c1-8ac5-0e5dce7bc026" />




