"use strict";
/**
 * Calculadora de promedios - Escuela Politécnica Nacional (EPN)
 *
 *   promedio = nota1 + nota2          (notas 0-20, promedio sobre 40)
 *   28 - 40    -> aprueba
 *   18 - 27.99 -> supletorio: examen >= 24 y promedio + examen >= 48
 *   0  - 17.99 -> reprueba
 */
const MIN = 0;
const MAX = 20;
const APROBAR = 28;
const SUPLETORIO = 18;
const MIN_TOTAL_SUPLETORIO = 48;
const MIN_EXAMEN_SUPLETORIO = 24;
const MSG_NUMERO = "Ingrese un número válido (use el punto: 15.5).";
const $ = (id) => document.getElementById(id);
const form = $("form-calculadora");
const campos = [$("nota1"), $("nota2")];
const errores = [$("error-nota1"), $("error-nota2")];
const caja = $("resultado");
const cajaExamen = $("caja-supletorio");
// ---------- Validación ----------
function validarNota(valorCrudo) {
    const texto = valorCrudo.trim();
    const valor = Number(texto);
    let mensaje = "";
    if (texto === "")
        mensaje = "Este campo es obligatorio.";
    else if (Number.isNaN(valor))
        mensaje = "Ingrese un número válido.";
    else if (valor < MIN)
        mensaje = `La nota no puede ser menor a ${MIN}.`;
    else if (valor > MAX)
        mensaje = `La nota no puede superar ${MAX}.`;
    return { esValido: !mensaje, mensaje, valor };
}
/** Valida el campo, pinta sus errores y devuelve la nota, o null si es inválida. */
function revisarCampo(indice, vacioOk = false) {
    const input = campos[indice];
    const r = validarNota(input.value);
    const vacio = input.value.trim() === "";
    const mensaje = input.validity.badInput ? MSG_NUMERO : vacio && vacioOk ? "" : r.mensaje;
    errores[indice].textContent = mensaje;
    input.classList.toggle("invalido", !!mensaje);
    input.classList.toggle("valido", !mensaje && !vacio);
    return mensaje || Number.isNaN(r.valor) ? null : r.valor;
}
// ---------- Cálculo ----------
const determinarEstado = (p) => p >= APROBAR ? "aprueba" : p >= SUPLETORIO ? "supletorio" : "reprueba";
function calcular(nota1, nota2) {
    const promedio = nota1 + nota2;
    const estado = determinarEstado(promedio);
    // Se redondea hacia arriba a 2 decimales para cumplir ambos mínimos.
    const notaExamenMinima = estado === "supletorio"
        ? Math.ceil(Math.max(MIN_EXAMEN_SUPLETORIO, MIN_TOTAL_SUPLETORIO - promedio) * 100) / 100
        : null;
    return { promedio, estado, notaExamenMinima };
}
const num = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(2));
const ETIQUETAS = {
    aprueba: "Aprueba",
    supletorio: "Supletorio",
    reprueba: "Reprueba",
};
const DETALLES = {
    aprueba: "Felicitaciones, alcanzaste la nota mínima aprobatoria (28/40).",
    supletorio: "Para aprobar el supletorio, necesitas obtener al menos 24/40 y sumar 48 puntos entre tus notas y el examen.",
    reprueba: "No alcanzaste la nota mínima (18/40). Reprobaste el período.",
};
// ---------- Resultado ----------
function mostrar({ promedio, estado, notaExamenMinima }) {
    caja.className = `resultado resultado--${estado}`;
    $("txt-promedio").textContent = num(promedio);
    $("txt-estado").textContent = ETIQUETAS[estado];
    $("txt-detalle").textContent = DETALLES[estado];
    cajaExamen.classList.toggle("oculto", notaExamenMinima === null);
    if (notaExamenMinima !== null)
        $("txt-examen").textContent = num(notaExamenMinima);
}
function ocultar() {
    caja.className = "resultado oculto";
    cajaExamen.classList.add("oculto");
}
// ---------- Eventos ----------
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nota1 = revisarCampo(0);
    const nota2 = revisarCampo(1);
    if (nota1 === null || nota2 === null) {
        ocultar();
        campos[nota1 === null ? 0 : 1].focus();
        return;
    }
    mostrar(calcular(nota1, nota2));
});
$("#btn-limpiar").addEventListener("click", () => {
    form.reset();
    campos.forEach((_, i) => revisarCampo(i, true));
    ocultar();
    campos[0].focus();
});
campos.forEach((input, i) => input.addEventListener("input", () => revisarCampo(i, true)));
