/* ===================================
   STUDY OS — script.js
   localStorage-based, no backend
   =================================== */

// ============================================================
// STATE
// ============================================================

let currentView = 'home';
let currentAsignaturaId = null;

// ============================================================
// DATA LAYER — localStorage helpers
// ============================================================

const DB = {
  /** Obtiene el array de asignaturas */
  getAsignaturas() {
    return JSON.parse(localStorage.getItem('asignaturas') || '[]');
  },
  /** Guarda el array de asignaturas */
  saveAsignaturas(arr) {
    localStorage.setItem('asignaturas', JSON.stringify(arr));
  },
  /** Obtiene una asignatura por id */
  getAsignatura(id) {
    return this.getAsignaturas().find(a => a.id === id) || null;
  },
  /** Actualiza una asignatura */
  updateAsignatura(updated) {
    const all = this.getAsignaturas().map(a => a.id === updated.id ? updated : a);
    this.saveAsignaturas(all);
  },
  /** Obtiene el horario */
  getHorario() {
    const saved = localStorage.getItem('horario');
    if (saved) return JSON.parse(saved);
    // Horario por defecto: 6 horas × 5 días
    const dias = ['Lunes','Martes','Miérc.','Jueves','Viernes'];
    const horas = ['8:00','9:00','10:00','11:00','12:00','13:00'];
    const rows = [];
    horas.forEach(h => {
      const row = { hora: h, celdas: {} };
      dias.forEach(d => { row.celdas[d] = ''; });
      rows.push(row);
    });
    return { dias, rows };
  },
  /** Guarda el horario */
  saveHorario(data) {
    localStorage.setItem('horario', JSON.stringify(data));
  }
};

// ============================================================
// UTILITIES
// ============================================================

/** Genera un id único */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Muestra un toast */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2200);
}

/** Devuelve clase CSS según nota */
function notaClass(nota) {
  if (nota === null || nota === undefined || nota === '') return 'none';
  const n = parseFloat(nota);
  if (n >= 7) return 'good';
  if (n >= 5) return 'warn';
  return 'bad';
}

/** Calcula la media ponderada de una asignatura */
function calcularMedia(asignatura) {
  const acts = asignatura.actividades || [];
  const withNota = acts.filter(a => a.nota !== '' && a.nota !== null && a.nota !== undefined);
  if (withNota.length === 0) return null;

  let sumPesos = 0;
  let sumNotas = 0;
  withNota.forEach(a => {
    const pct = parseFloat(a.porcentaje) || 0;
    const nota = parseFloat(a.nota) || 0;
    sumNotas += nota * pct;
    sumPesos += pct;
  });

  if (sumPesos === 0) return null;
  return (sumNotas / sumPesos).toFixed(2);
}

/** Calcula la suma de porcentajes */
function calcularPctTotal(asignatura) {
  return (asignatura.actividades || []).reduce((acc, a) => acc + (parseFloat(a.porcentaje) || 0), 0);
}

// ============================================================
// NAVIGATION
// ============================================================

function navigate(view, asignaturaId = null) {
  const prev = document.getElementById(`view-${currentView}`);
  const next = document.getElementById(`view-${view}`);

  if (!next) return;

  // Exit animation en la vista actual
  if (prev && prev !== next) {
    prev.classList.add('exit');
    prev.classList.remove('active');
    setTimeout(() => prev.classList.remove('exit'), 300);
  }

  // Actualizar estado
  currentView = view;
  if (asignaturaId) currentAsignaturaId = asignaturaId;

  // Activar nueva vista
  next.classList.add('active');
  next.classList.remove('exit');

  // Actualizar nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view || (view === 'asignatura' && btn.dataset.view === 'notas'));
  });

  // Actualizar topbar
  const titles = { home: 'STUDY OS', notas: 'ASIGNATURAS', horario: 'HORARIO', ajustes: 'AJUSTES', asignatura: 'DETALLE' };
  document.getElementById('topbar-title').textContent = titles[view] || 'STUDY OS';

  // Renderizar vista correspondiente
  const renders = { notas: renderNotas, horario: renderHorario, ajustes: renderAjustes, asignatura: renderAsignatura };
  if (renders[view]) renders[view]();
}

// ============================================================
// MODALS
// ============================================================

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Cerrar modal al tocar el overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
  });
});

// ============================================================
// VIEW: NOTAS
// ============================================================

function renderNotas() {
  const asignaturas = DB.getAsignaturas();
  const list = document.getElementById('asignaturas-list');
  const empty = document.getElementById('empty-notas');

  list.innerHTML = '';

  if (asignaturas.length === 0) {
    empty.classList.add('visible');
    return;
  }
  empty.classList.remove('visible');

  asignaturas.forEach((asig, i) => {
    const media = calcularMedia(asig);
    const mediaText = media !== null ? media : '—';
    const mClass = media !== null ? notaClass(media) : 'none';

    const card = document.createElement('div');
    card.className = 'asignatura-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="asig-info">
        <p class="asig-nombre">${escapeHtml(asig.nombre)}</p>
        <p class="asig-meta">${asig.actividades?.length || 0} actividad(es)</p>
      </div>
      <span class="asig-media ${mClass}">${mediaText}</span>
    `;
    card.addEventListener('click', () => navigate('asignatura', asig.id));
    list.appendChild(card);
  });
}

// Crear asignatura
function crearAsignatura() {
  const input = document.getElementById('input-asignatura-nombre');
  const nombre = input.value.trim();
  if (!nombre) { showToast('Escribe un nombre'); return; }

  const asignaturas = DB.getAsignaturas();
  asignaturas.push({ id: uid(), nombre, actividades: [] });
  DB.saveAsignaturas(asignaturas);

  input.value = '';
  closeModal('modal-nueva-asignatura');
  renderNotas();
  showToast('Asignatura creada');
}

// ============================================================
// VIEW: ASIGNATURA DETALLE
// ============================================================

function renderAsignatura() {
  const asig = DB.getAsignatura(currentAsignaturaId);
  if (!asig) { navigate('notas'); return; }

  document.getElementById('detalle-title').textContent = asig.nombre;

  // Media
  const media = calcularMedia(asig);
  const mediaEl = document.getElementById('media-valor');
  mediaEl.textContent = media !== null ? media : '—';
  mediaEl.className = `media-value ${media !== null ? notaClass(media) : ''}`;

  // Info porcentajes
  const pctTotal = calcularPctTotal(asig);
  const pctWithNota = (asig.actividades || [])
    .filter(a => a.nota !== '' && a.nota !== null)
    .reduce((acc, a) => acc + (parseFloat(a.porcentaje) || 0), 0);
  document.getElementById('media-pct-info').textContent =
    `${pctWithNota}% evaluado · ${pctTotal}% configurado`;

  // Botón eliminar asignatura
  const btnDel = document.getElementById('btn-delete-asignatura');
  btnDel.onclick = () => confirmarAccion(
    `¿Eliminar "${asig.nombre}"? Se borrarán todas sus actividades.`,
    () => {
      const updated = DB.getAsignaturas().filter(a => a.id !== currentAsignaturaId);
      DB.saveAsignaturas(updated);
      showToast('Asignatura eliminada');
      navigate('notas');
    }
  );

  // Actividades
  const list = document.getElementById('actividades-list');
  list.innerHTML = '';

  (asig.actividades || []).forEach((act, i) => {
    const notaText = (act.nota !== '' && act.nota !== null && act.nota !== undefined)
      ? parseFloat(act.nota).toFixed(1)
      : '—';
    const nClass = (act.nota !== '' && act.nota !== null) ? notaClass(act.nota) : 'none';

    const card = document.createElement('div');
    card.className = 'actividad-card';
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      <span class="actividad-tipo-badge">${escapeHtml(act.tipo || 'otro')}</span>
      <div class="actividad-info">
        <p class="actividad-nombre">${escapeHtml(act.nombre)}</p>
        <p class="actividad-pct">${act.porcentaje}%</p>
      </div>
      <span class="actividad-nota ${nClass}">${notaText}</span>
      <div class="actividad-actions">
        <button class="act-btn edit" title="Editar" onclick="abrirEdicionActividad('${act.id}')">✎</button>
        <button class="act-btn del" title="Eliminar" onclick="eliminarActividad('${act.id}')">✕</button>
      </div>
    `;
    list.appendChild(card);
  });
}

// Crear actividad
function crearActividad() {
  const nombre = document.getElementById('input-actividad-nombre').value.trim();
  const tipo = document.getElementById('input-actividad-tipo').value;
  const porcentaje = document.getElementById('input-actividad-porcentaje').value;
  const nota = document.getElementById('input-actividad-nota').value;

  if (!nombre) { showToast('Escribe un nombre'); return; }
  if (!porcentaje || isNaN(parseFloat(porcentaje))) { showToast('Define el porcentaje'); return; }

  const asig = DB.getAsignatura(currentAsignaturaId);
  if (!asig) return;

  asig.actividades.push({
    id: uid(),
    nombre,
    tipo,
    porcentaje: parseFloat(porcentaje),
    nota: nota !== '' ? parseFloat(nota) : ''
  });

  DB.updateAsignatura(asig);

  // Limpiar campos
  document.getElementById('input-actividad-nombre').value = '';
  document.getElementById('input-actividad-porcentaje').value = '';
  document.getElementById('input-actividad-nota').value = '';
  closeModal('modal-nueva-actividad');
  renderAsignatura();
  showToast('Actividad añadida');
}

// Abrir modal de edición de actividad
function abrirEdicionActividad(actId) {
  const asig = DB.getAsignatura(currentAsignaturaId);
  if (!asig) return;
  const act = asig.actividades.find(a => a.id === actId);
  if (!act) return;

  document.getElementById('edit-actividad-id').value = actId;
  document.getElementById('edit-actividad-nombre').value = act.nombre;
  document.getElementById('edit-actividad-tipo').value = act.tipo || 'otro';
  document.getElementById('edit-actividad-porcentaje').value = act.porcentaje;
  document.getElementById('edit-actividad-nota').value = act.nota !== '' ? act.nota : '';

  openModal('modal-editar-actividad');
}

// Guardar edición de actividad
function guardarEdicionActividad() {
  const actId = document.getElementById('edit-actividad-id').value;
  const nombre = document.getElementById('edit-actividad-nombre').value.trim();
  const tipo = document.getElementById('edit-actividad-tipo').value;
  const porcentaje = document.getElementById('edit-actividad-porcentaje').value;
  const nota = document.getElementById('edit-actividad-nota').value;

  if (!nombre) { showToast('Escribe un nombre'); return; }

  const asig = DB.getAsignatura(currentAsignaturaId);
  if (!asig) return;

  asig.actividades = asig.actividades.map(a => {
    if (a.id !== actId) return a;
    return {
      ...a,
      nombre,
      tipo,
      porcentaje: parseFloat(porcentaje) || a.porcentaje,
      nota: nota !== '' ? parseFloat(nota) : ''
    };
  });

  DB.updateAsignatura(asig);
  closeModal('modal-editar-actividad');
  renderAsignatura();
  showToast('Guardado');
}

// Eliminar actividad
function eliminarActividad(actId) {
  confirmarAccion('¿Eliminar esta actividad?', () => {
    const asig = DB.getAsignatura(currentAsignaturaId);
    if (!asig) return;
    asig.actividades = asig.actividades.filter(a => a.id !== actId);
    DB.updateAsignatura(asig);
    renderAsignatura();
    showToast('Actividad eliminada');
  });
}

// ============================================================
// VIEW: HORARIO
// ============================================================

function renderHorario() {
  const data = DB.getHorario();
  const table = document.getElementById('horario-table');
  table.innerHTML = '';

  // Cabecera
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.innerHTML = `<th></th>${data.dias.map(d => `<th>${d}</th>`).join('')}`;
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Cuerpo
  const tbody = document.createElement('tbody');
  data.rows.forEach(row => {
    const tr = document.createElement('tr');
    // Celda hora
    const tdHora = document.createElement('td');
    tdHora.textContent = row.hora;
    tr.appendChild(tdHora);

    // Celdas días
    data.dias.forEach(dia => {
      const td = document.createElement('td');
      const textarea = document.createElement('textarea');
      textarea.className = 'horario-cell';
      textarea.value = row.celdas[dia] || '';
      textarea.rows = 2;
      textarea.placeholder = '···';
      textarea.setAttribute('data-hora', row.hora);
      textarea.setAttribute('data-dia', dia);
      td.appendChild(textarea);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

function saveHorario() {
  const data = DB.getHorario();
  const cells = document.querySelectorAll('.horario-cell');
  cells.forEach(cell => {
    const hora = cell.dataset.hora;
    const dia = cell.dataset.dia;
    const row = data.rows.find(r => r.hora === hora);
    if (row) row.celdas[dia] = cell.value;
  });
  DB.saveHorario(data);
  showToast('Horario guardado ✓');
}

// ============================================================
// VIEW: AJUSTES
// ============================================================

function renderAjustes() {
  // Calcular tamaño aproximado del localStorage
  let size = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      size += (localStorage[key].length + key.length) * 2; // UTF-16
    }
  }
  const kb = (size / 1024).toFixed(1);
  document.getElementById('storage-size').textContent = `${kb} KB utilizados`;
}

function confirmarBorrado() {
  confirmarAccion('Se borrarán todas las asignaturas, notas y el horario.', () => {
    localStorage.clear();
    showToast('Datos eliminados');
    navigate('home');
  });
}

// ============================================================
// MODAL: CONFIRMAR ACCIÓN
// ============================================================

function confirmarAccion(texto, callback) {
  document.getElementById('confirmar-texto').textContent = texto;
  const btn = document.getElementById('confirmar-btn');
  // Clonar para eliminar listeners previos
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, newBtn);
  newBtn.addEventListener('click', () => {
    closeModal('modal-confirmar');
    callback();
  });
  // Re-asignar el btn correcto
  document.getElementById('confirmar-btn').addEventListener('click', () => {
    closeModal('modal-confirmar');
    callback();
  });
  openModal('modal-confirmar');
}

// ============================================================
// SECURITY: escapeHtml
// ============================================================

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// KEYBOARD: Enter en inputs de modales
// ============================================================

document.getElementById('input-asignatura-nombre').addEventListener('keydown', e => {
  if (e.key === 'Enter') crearAsignatura();
});

// ============================================================
// INIT
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  // Animación splash → app
  setTimeout(() => {
    const splash = document.getElementById('splash');
    const app = document.getElementById('app');
    splash.style.pointerEvents = 'none';
    app.classList.remove('hidden');
    app.classList.add('visible');
  }, 1600);
});
