/* ===================================
   STUDY OS — script.js  v2.0
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
  getAsignaturas() {
    return JSON.parse(localStorage.getItem('asignaturas') || '[]');
  },
  saveAsignaturas(arr) {
    localStorage.setItem('asignaturas', JSON.stringify(arr));
  },
  getAsignatura(id) {
    return this.getAsignaturas().find(a => a.id === id) || null;
  },
  updateAsignatura(updated) {
    const all = this.getAsignaturas().map(a => a.id === updated.id ? updated : a);
    this.saveAsignaturas(all);
  },
  getHorario() {
    const saved = localStorage.getItem('horario');
    if (saved) return JSON.parse(saved);
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
  saveHorario(data) {
    localStorage.setItem('horario', JSON.stringify(data));
  },
  getAccentColor() {
    return localStorage.getItem('accentColor') || '#ffffff';
  },
  saveAccentColor(color) {
    localStorage.setItem('accentColor', color);
  }
};

// ============================================================
// UTILITIES
// ============================================================

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2200);
}

function notaClass(nota) {
  if (nota === null || nota === undefined || nota === '') return 'none';
  const n = parseFloat(nota);
  if (n >= 7) return 'good';
  if (n >= 5) return 'warn';
  return 'bad';
}

function calcularMedia(asignatura) {
  const acts = asignatura.actividades || [];
  const withNota = acts.filter(a => a.nota !== '' && a.nota !== null && a.nota !== undefined);
  if (withNota.length === 0) return null;
  let sumPesos = 0, sumNotas = 0;
  withNota.forEach(a => {
    const pct = parseFloat(a.porcentaje) || 0;
    sumNotas += (parseFloat(a.nota) || 0) * pct;
    sumPesos += pct;
  });
  if (sumPesos === 0) return null;
  return (sumNotas / sumPesos).toFixed(2);
}

function calcularPctTotal(asignatura) {
  return (asignatura.actividades || []).reduce((acc, a) => acc + (parseFloat(a.porcentaje) || 0), 0);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// ============================================================
// COLOR ACCENT SYSTEM
// ============================================================

const ACCENT_COLORS = [
  { name: 'Blanco',    value: '#ffffff' },
  { name: 'Azul',      value: '#3a9bdc' },
  { name: 'Verde',     value: '#30d158' },
  { name: 'Lila',      value: '#bf5af2' },
  { name: 'Naranja',   value: '#ff9f0a' },
  { name: 'Rosa',      value: '#ff375f' },
  { name: 'Cyan',      value: '#5ac8fa' },
  { name: 'Rojo',      value: '#ff453a' },
];

function applyAccentColor(color) {
  const root = document.documentElement;
  root.style.setProperty('--accent', color);
  root.style.setProperty('--btn-primary-bg', color);
  // Adaptar color de texto del botón primario según luminosidad
  const r = parseInt(color.slice(1,3),16);
  const g = parseInt(color.slice(3,5),16);
  const b = parseInt(color.slice(5,7),16);
  const lum = (0.299*r + 0.587*g + 0.114*b) / 255;
  root.style.setProperty('--btn-primary-text', lum > 0.5 ? '#000000' : '#ffffff');
  // Actualizar el indicador activo del nav
  root.style.setProperty('--nav-active-color', color);
}

function loadAccentColor() {
  applyAccentColor(DB.getAccentColor());
}

// ============================================================
// NAVIGATION
// ============================================================

function navigate(view, asignaturaId = null) {
  const prev = document.getElementById(`view-${currentView}`);
  const next = document.getElementById(`view-${view}`);
  if (!next) return;

  if (prev && prev !== next) {
    prev.classList.add('exit');
    prev.classList.remove('active');
    setTimeout(() => prev.classList.remove('exit'), 300);
  }

  currentView = view;
  if (asignaturaId) currentAsignaturaId = asignaturaId;

  next.classList.add('active');
  next.classList.remove('exit');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active',
      btn.dataset.view === view ||
      (view === 'asignatura' && btn.dataset.view === 'notas')
    );
  });

  const titles = { home:'STUDY OS', notas:'ASIGNATURAS', horario:'HORARIO', ajustes:'AJUSTES', asignatura:'DETALLE' };
  document.getElementById('topbar-title').textContent = titles[view] || 'STUDY OS';

  const renders = { notas: renderNotas, horario: renderHorario, ajustes: renderAjustes, asignatura: renderAsignatura };
  if (renders[view]) renders[view]();
}

// ============================================================
// MODALS — versión sin bug de doble listener
// ============================================================

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
  });
});

// Confirmar acción — callback único sin listeners duplicados
let _confirmarCallback = null;

function confirmarAccion(texto, callback) {
  document.getElementById('confirmar-texto').textContent = texto;
  _confirmarCallback = callback;
  openModal('modal-confirmar');
}

function ejecutarConfirmacion() {
  closeModal('modal-confirmar');
  if (typeof _confirmarCallback === 'function') {
    _confirmarCallback();
    _confirmarCallback = null;
  }
}

// ============================================================
// VIEW: NOTAS — lista de asignaturas con botón eliminar
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
      <div class="asig-info" data-id="${asig.id}">
        <p class="asig-nombre">${escapeHtml(asig.nombre)}</p>
        <p class="asig-meta">${asig.actividades?.length || 0} actividad(es)</p>
      </div>
      <span class="asig-media ${mClass}">${mediaText}</span>
      <button class="act-btn del asig-del-btn" title="Eliminar asignatura" data-id="${asig.id}">✕</button>
    `;

    // Tap en info → entrar al detalle
    card.querySelector('.asig-info').addEventListener('click', () => navigate('asignatura', asig.id));

    // Tap en media → entrar al detalle
    card.querySelector('.asig-media').addEventListener('click', () => navigate('asignatura', asig.id));

    // Tap en botón eliminar
    card.querySelector('.asig-del-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      confirmarAccion(
        `¿Eliminar "${asig.nombre}"? Se borrarán todas sus actividades.`,
        () => {
          const updated = DB.getAsignaturas().filter(a => a.id !== asig.id);
          DB.saveAsignaturas(updated);
          showToast('Asignatura eliminada');
          renderNotas();
        }
      );
    });

    list.appendChild(card);
  });
}

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

  const media = calcularMedia(asig);
  const mediaEl = document.getElementById('media-valor');
  mediaEl.textContent = media !== null ? media : '—';
  mediaEl.className = `media-value ${media !== null ? notaClass(media) : ''}`;

  const pctTotal = calcularPctTotal(asig);
  const pctWithNota = (asig.actividades || [])
    .filter(a => a.nota !== '' && a.nota !== null)
    .reduce((acc, a) => acc + (parseFloat(a.porcentaje) || 0), 0);
  document.getElementById('media-pct-info').textContent =
    `${pctWithNota}% evaluado · ${pctTotal}% configurado`;

  // Botón eliminar asignatura desde detalle
  const btnDel = document.getElementById('btn-delete-asignatura');
  btnDel.onclick = () => confirmarAccion(
    `¿Eliminar "${asig.nombre}"?`,
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
      ? parseFloat(act.nota).toFixed(1) : '—';
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
        <button class="act-btn edit" title="Editar">✎</button>
        <button class="act-btn del" title="Eliminar">✕</button>
      </div>
    `;

    card.querySelector('.act-btn.edit').addEventListener('click', () => abrirEdicionActividad(act.id));
    card.querySelector('.act-btn.del').addEventListener('click', () => eliminarActividad(act.id));
    list.appendChild(card);
  });
}

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
    id: uid(), nombre, tipo,
    porcentaje: parseFloat(porcentaje),
    nota: nota !== '' ? parseFloat(nota) : ''
  });

  DB.updateAsignatura(asig);
  document.getElementById('input-actividad-nombre').value = '';
  document.getElementById('input-actividad-porcentaje').value = '';
  document.getElementById('input-actividad-nota').value = '';
  closeModal('modal-nueva-actividad');
  renderAsignatura();
  showToast('Actividad añadida');
}

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
    return { ...a, nombre, tipo, porcentaje: parseFloat(porcentaje) || a.porcentaje, nota: nota !== '' ? parseFloat(nota) : '' };
  });

  DB.updateAsignatura(asig);
  closeModal('modal-editar-actividad');
  renderAsignatura();
  showToast('Guardado ✓');
}

// FIX: eliminar actividad — usa el callback correcto
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
// VIEW: HORARIO — celdas y cabeceras editables
// ============================================================

function renderHorario() {
  const data = DB.getHorario();
  const table = document.getElementById('horario-table');
  table.innerHTML = '';

  // THEAD — días editables
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  // Celda esquina: botones añadir fila/columna
  const thCorner = document.createElement('th');
  thCorner.className = 'th-corner';
  thCorner.innerHTML = '';
  headRow.appendChild(thCorner);

  data.dias.forEach((dia, di) => {
    const th = document.createElement('th');
    th.innerHTML = `
      <div class="th-dia-wrap">
        <input class="horario-header-input" value="${escapeHtml(dia)}" data-col="${di}" placeholder="Día" />
        <button class="del-col-btn" data-col="${di}" title="Eliminar columna">✕</button>
      </div>
    `;
    headRow.appendChild(th);
  });

  // Botón añadir columna
  const thAdd = document.createElement('th');
  thAdd.innerHTML = `<button class="add-col-btn" title="Añadir día">+</button>`;
  headRow.appendChild(thAdd);

  thead.appendChild(headRow);
  table.appendChild(thead);

  // TBODY — filas con hora editable
  const tbody = document.createElement('tbody');
  data.rows.forEach((row, ri) => {
    const tr = document.createElement('tr');

    // Celda hora editable
    const tdHora = document.createElement('td');
    tdHora.className = 'td-hora';
    tdHora.innerHTML = `
      <div class="hora-wrap">
        <input class="horario-hora-input" value="${escapeHtml(row.hora)}" data-row="${ri}" placeholder="Hora" />
        <button class="del-row-btn" data-row="${ri}" title="Eliminar fila">✕</button>
      </div>
    `;
    tr.appendChild(tdHora);

    // Celdas contenido
    data.dias.forEach((dia, di) => {
      const td = document.createElement('td');
      const textarea = document.createElement('textarea');
      textarea.className = 'horario-cell';
      textarea.value = row.celdas[dia] || '';
      textarea.rows = 2;
      textarea.placeholder = '···';
      textarea.setAttribute('data-row', ri);
      textarea.setAttribute('data-col', di);
      td.appendChild(textarea);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Fila añadir fila
  const trAdd = document.createElement('tr');
  const tdAdd = document.createElement('td');
  tdAdd.colSpan = data.dias.length + 2;
  tdAdd.innerHTML = `<button class="add-row-btn">+ Añadir franja horaria</button>`;
  trAdd.appendChild(tdAdd);
  tbody.appendChild(trAdd);

  // ---- Eventos horario ----

  // Editar nombre de día
  table.querySelectorAll('.horario-header-input').forEach(input => {
    input.addEventListener('change', () => {
      const col = parseInt(input.dataset.col);
      const oldName = data.dias[col];
      const newName = input.value.trim() || oldName;
      data.dias[col] = newName;
      data.rows.forEach(r => {
        r.celdas[newName] = r.celdas[oldName] || '';
        if (newName !== oldName) delete r.celdas[oldName];
      });
      DB.saveHorario(data);
      renderHorario();
    });
  });

  // Eliminar columna
  table.querySelectorAll('.del-col-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = parseInt(btn.dataset.col);
      if (data.dias.length <= 1) { showToast('Mínimo 1 día'); return; }
      confirmarAccion(`¿Eliminar la columna "${data.dias[col]}"?`, () => {
        const name = data.dias.splice(col, 1)[0];
        data.rows.forEach(r => delete r.celdas[name]);
        DB.saveHorario(data);
        renderHorario();
      });
    });
  });

  // Añadir columna
  table.querySelector('.add-col-btn').addEventListener('click', () => {
    const newDia = `Día ${data.dias.length + 1}`;
    data.dias.push(newDia);
    data.rows.forEach(r => { r.celdas[newDia] = ''; });
    DB.saveHorario(data);
    renderHorario();
    showToast('Columna añadida');
  });

  // Editar hora
  table.querySelectorAll('.horario-hora-input').forEach(input => {
    input.addEventListener('change', () => {
      const ri = parseInt(input.dataset.row);
      data.rows[ri].hora = input.value.trim() || data.rows[ri].hora;
      DB.saveHorario(data);
    });
  });

  // Eliminar fila
  table.querySelectorAll('.del-row-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ri = parseInt(btn.dataset.row);
      if (data.rows.length <= 1) { showToast('Mínimo 1 franja'); return; }
      confirmarAccion(`¿Eliminar la fila "${data.rows[ri].hora}"?`, () => {
        data.rows.splice(ri, 1);
        DB.saveHorario(data);
        renderHorario();
      });
    });
  });

  // Añadir fila
  table.querySelector('.add-row-btn').addEventListener('click', () => {
    const newHora = `${data.rows.length + 8}:00`;
    const newRow = { hora: newHora, celdas: {} };
    data.dias.forEach(d => { newRow.celdas[d] = ''; });
    data.rows.push(newRow);
    DB.saveHorario(data);
    renderHorario();
    showToast('Franja añadida');
  });

  // Autoguardado al editar celdas
  table.querySelectorAll('.horario-cell').forEach(cell => {
    cell.addEventListener('input', () => {
      const ri = parseInt(cell.dataset.row);
      const di = parseInt(cell.dataset.col);
      data.rows[ri].celdas[data.dias[di]] = cell.value;
      // Guardado con debounce
      clearTimeout(cell._saveTimer);
      cell._saveTimer = setTimeout(() => DB.saveHorario(data), 600);
    });
  });
}

function saveHorario() {
  // Lee el estado actual del DOM y lo persiste
  const data = DB.getHorario();
  document.querySelectorAll('.horario-cell').forEach(cell => {
    const ri = parseInt(cell.dataset.row);
    const di = parseInt(cell.dataset.col);
    if (data.rows[ri] && data.dias[di]) {
      data.rows[ri].celdas[data.dias[di]] = cell.value;
    }
  });
  DB.saveHorario(data);
  showToast('Horario guardado ✓');
}

// ============================================================
// VIEW: AJUSTES — con selector de color de acento
// ============================================================

function renderAjustes() {
  let size = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      size += (localStorage[key].length + key.length) * 2;
    }
  }
  const kb = (size / 1024).toFixed(1);
  document.getElementById('storage-size').textContent = `${kb} KB utilizados`;

  // Renderizar paleta de colores
  const palette = document.getElementById('color-palette');
  palette.innerHTML = '';
  const current = DB.getAccentColor();

  ACCENT_COLORS.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'color-swatch' + (c.value === current ? ' active' : '');
    btn.style.background = c.value;
    btn.title = c.name;
    btn.setAttribute('aria-label', c.name);
    if (c.value === current) btn.innerHTML = `<span class="swatch-check">✓</span>`;
    btn.addEventListener('click', () => {
      DB.saveAccentColor(c.value);
      applyAccentColor(c.value);
      renderAjustes(); // Re-render para actualizar activo
      showToast(`Color: ${c.name}`);
    });
    palette.appendChild(btn);
  });
}

function confirmarBorrado() {
  confirmarAccion('Se borrarán todas las asignaturas, notas y el horario.', () => {
    localStorage.clear();
    showToast('Datos eliminados');
    navigate('home');
  });
}

// ============================================================
// KEYBOARD
// ============================================================

document.getElementById('input-asignatura-nombre').addEventListener('keydown', e => {
  if (e.key === 'Enter') crearAsignatura();
});

// ============================================================
// INIT
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  loadAccentColor();

  setTimeout(() => {
    const splash = document.getElementById('splash');
    const app = document.getElementById('app');
    splash.style.pointerEvents = 'none';
    app.classList.remove('hidden');
    app.classList.add('visible');
  }, 1600);
});
