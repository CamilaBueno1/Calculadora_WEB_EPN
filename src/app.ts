/**
 * Calculadora de promedios - Escuela Politécnica Nacional (EPN)
 *
 *   promedio = nota1 + nota2          (notas 0-20, promedio sobre 40)
 *   28 - 40    -> aprueba
 *   18 - 27.99 -> supletorio:  (promedio + examen) / 2 >= 24  =>  examen >= 48 - promedio
 *   0  - 17.99 -> reprueba
 */

type Estado = "aprueba" | "supletorio" | "reprueba";
type Validacion = { esValido: boolean; mensaje: string; valor: number };

const MIN = 0;
const MAX = 20;
const APROBAR = 28;
const SUPLETORIO = 18;
const META_SUPLETORIO = 24;
const MSG_NUMERO = "Ingrese un número válido (use el punto: 15.5).";

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

const form = $<HTMLFormElement>("form-calculadora");
const campos = [$<HTMLInputElement>("nota1"), $<HTMLInputElement>("nota2")];
const errores = [$<HTMLElement>("error-nota1"), $<HTMLElement>("error-nota2")];
const caja = $<HTMLElement>("resultado");
const cajaExamen = $<HTMLElement>("caja-supletorio");

// ---------- Validación ----------
function validarNota(valorCrudo: string): Validacion {
  const texto = valorCrudo.trim();
  const valor = Number(texto);
  let mensaje = "";

  if (texto === "") mensaje = "Este campo es obligatorio.";
  else if (Number.isNaN(valor)) mensaje = "Ingrese un número válido.";
  else if (valor < MIN) mensaje = `La nota no puede ser menor a ${MIN}.`;
  else if (valor > MAX) mensaje = `La nota no puede superar ${MAX}.`;

  return { esValido: !mensaje, mensaje, valor };
}

/** Valida el campo, pinta sus errores y devuelve la nota, o null si es inválida. */
function revisarCampo(indice: number, vacioOk = false): number | null {
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
const determinarEstado = (p: number): Estado =>
  p >= APROBAR ? "aprueba" : p >= SUPLETORIO ? "supletorio" : "reprueba";

function calcular(nota1: number, nota2: number) {
  const promedio = nota1 + nota2;
  const estado = determinarEstado(promedio);
  // Nota mínima del examen (sobre 40), redondeada hacia arriba a 2 decimales.
  const notaExamenMinima =
    estado === "supletorio" ? Math.ceil((2 * META_SUPLETORIO - promedio) * 100) / 100 : null;
  return { promedio, estado, notaExamenMinima };
}

const num = (v: number): string => (Number.isInteger(v) ? String(v) : v.toFixed(2));

const ETIQUETAS: Record<Estado, string> = {
  aprueba: "Aprueba",
  supletorio: "Supletorio",
  reprueba: "Reprueba",
};

const DETALLES: Record<Estado, string> = {
  aprueba: "Felicitaciones, alcanzaste la nota mínima aprobatoria (28/40).",
  supletorio: "Debes presentar el examen de supletorio para pasar el período.",
  reprueba: "No alcanzaste la nota mínima (18/40). Reprobaste el período.",
};

// ---------- Resultado ----------
function mostrar({ promedio, estado, notaExamenMinima }: ReturnType<typeof calcular>): void {
  caja.className = `resultado resultado--${estado}`;
  $("txt-promedio").textContent = num(promedio);
  $("txt-estado").textContent = ETIQUETAS[estado];
  $("txt-detalle").textContent = DETALLES[estado];
  cajaExamen.classList.toggle("oculto", notaExamenMinima === null);
  if (notaExamenMinima !== null) $("txt-examen").textContent = num(notaExamenMinima);
}

function ocultar(): void {
  caja.className = "resultado oculto";
  cajaExamen.classList.add("oculto");
}

// ---------- Eventos ----------
form.addEventListener("submit", (evento: Event): void => {
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

$("#btn-limpiar").addEventListener("click", (): void => {
  form.reset();
  campos.forEach((_, i) => revisarCampo(i, true));
  ocultar();
  campos[0].focus();
});

campos.forEach((input, i) =>
  input.addEventListener("input", () => revisarCampo(i, true))
);
