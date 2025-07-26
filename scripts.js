const malla = {
  "Semestre 1": [
    "Bases de la comunicación humana",
    "Psicología aplicada a la salud",
    "Fonoaudiología e identidad profesional",
    "Habilidades comunicativas",
    "Antropología"
  ],
  "Semestre 2": [
    "Biología celular",
    "Morfología aplicada a la fonoaudiología",
    "Fonética, fonología y morfosintaxis",
    "Desarrollo psicológico y social en el curso de vida",
    "Fonoaudiología en salud, educación y comunidad",
    "Ética"
  ],
  "Semestre 3": [
    "Integrado fisiología - fisiopatología I",
    "Neurociencias y neurodesarrollo",
    "Salud digital",
    "Semántica y pragmática",
    "Acústica para la voz, el habla y la audición",
    "Persona y sociedad"
  ],
  "Semestre 4": [
    "Salud poblacional",
    "Psicolingüística",
    "Fonoaudiología y práctica basada en la evidencia",
    "Fonoestomatología",
    "Bases del diagnóstico e intervención comunitaria"
  ],
  "Semestre 5": [
    "Epidemiología",
    "Neurología y neurolingüística",
    "Producción vocal y eufonía",
    "Audiología y equilibrio I",
    "Electivo I: Formación e identidad"
  ],
  "Semestre 6": [
    "Bioética",
    "Alteraciones del neurodesarrollo",
    "Alteraciones de la voz",
    "Audiología y equilibrio II",
    "Motricidad orofacial y alimentación",
    "Envejecimiento y fonoaudiología"
  ],
  "Semestre 7": [
    "Metodología de la investigación",
    "Abordaje de la comunicación infantojuvenil",
    "Intervención vocal",
    "Rehabilitación auditiva y del equilibrio",
    "Intervención miofuncional orofacial",
    "Comunicación y deglución en el adulto y la persona mayor"
  ],
  "Semestre 8": [
    "Fonoaudiología en la comunidad educativa",
    "Proyectos en ciencias de la fonoaudiología",
    "Abordaje fonoaudiológico en el adulto y la persona mayor",
    "Electivo II: Formación e identidad",
    "Gestión de carrera y desarrollo profesional"
  ],
  "Semestre 9": [
    "Práctica profesional en educación y comunidad",
    "Práctica profesional en áreas de especialidad",
    "Electivo I",
    "Electivo III: Formación e identidad"
  ],
  "Semestre 10": [
    "Práctica profesional infantojuvenil",
    "Práctica profesional en el adulto y persona mayor",
    "Electivo II"
  ]
};

const container = document.getElementById('malla');

Object.entries(malla).forEach(([semestre, ramos], sIndex) => {
  const box = document.createElement('div');
  box.classList.add('semestre');
  const title = document.createElement('h2');
  title.textContent = semestre;
  const list = document.createElement('div');
  list.classList.add('ramos');

  ramos.forEach((ramo, i) => {
    const div = document.createElement('div');
    const id = `s${sIndex}r${i}`;
    div.classList.add('ramo');
    div.textContent = ramo;
    div.dataset.id = id;

    if (localStorage.getItem(id) === 'true') {
      div.classList.add('aprobado');
    }

    div.addEventListener('click', () => {
      div.classList.toggle('aprobado');
      localStorage.setItem(id, div.classList.contains('aprobado'));
      actualizarProgreso();
    });

    list.appendChild(div);
  });

  box.appendChild(title);
  box.appendChild(list);
  container.appendChild(box);
});

function actualizarProgreso() {
  const total = document.querySelectorAll('.ramo').length;
  const aprobados = document.querySelectorAll('.ramo.aprobado').length;
  document.getElementById('progreso').textContent = `Ramos aprobados: ${aprobados} / ${total}`;
}

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm("¿Estás segura/o de reiniciar la malla? Se perderá tu progreso.")) {
    document.querySelectorAll('.ramo').forEach(ramo => {
      ramo.classList.remove('aprobado');
      localStorage.removeItem(ramo.dataset.id);
    });
    actualizarProgreso();
  }
});

actualizarProgreso();
