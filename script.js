/* ===================================
   STUDY OS — script.js  v3.0
   ================================= */

// ============================================================
// i18n — Traducciones
// ============================================================
const TRANSLATIONS = {
  es: {
    nav_home:'Inicio', nav_notas:'Asignaturas', nav_tareas:'Tareas', nav_horario:'Horario', nav_ajustes:'Ajustes',
    hero_sub:'Tu web de estudio favorita,\nby HEnricVR',
    empty_notas:'Sin asignaturas aún.', crear_asignatura:'Crear asignatura',
    empty_tareas:'Sin tareas aún.', crear_tarea:'Crear tarea',
    tareas_hint:'Arrastra las tarjetas para reorganizarlas',
    media_label:'MEDIA FINAL',
    nueva_actividad:'+ Nueva actividad',
    modal_nueva_asig:'Nueva asignatura', modal_nueva_act:'Nueva actividad',
    modal_editar_act:'Editar actividad', modal_nueva_tarea:'Nueva tarea', modal_editar_tarea:'Editar tarea',
    label_nombre:'Nombre', label_nombre_act:'Nombre de la actividad', label_tipo:'Tipo',
    label_pct:'Porcentaje (%)', label_nota:'Nota (opcional)',
    label_tarea_titulo:'Título', label_tarea_desc:'Descripción (opcional)', label_tarea_fecha:'Fecha de entrega', label_tarea_color:'Color de tarjeta',
    label_tarea_hora:'Hora de entrega',
    placeholder_asig:'Ej: Matemáticas', placeholder_act:'Ej: Examen parcial',
    placeholder_tarea_titulo:'Ej: Entregar trabajo de historia', placeholder_tarea_desc:'Notas adicionales...',
    tipo_examen:'Examen', tipo_trabajo:'Trabajo', tipo_proyecto:'Proyecto', tipo_practica:'Práctica', tipo_otro:'Otro',
    cancelar:'Cancelar', crear:'Crear', guardar:'Guardar', añadir:'Añadir', borrar:'Borrar', confirmar:'Confirmar',
    confirmar_titulo:'¿Confirmar?',
    ajuste_idioma:'Idioma', ajuste_idioma_desc:'Cambia el idioma de la app',
    ajuste_color:'Color de acento', ajuste_color_desc:'Personaliza el color principal de la app.',
    ajuste_version:'Versión', ajuste_datos:'Datos guardados',
    ajuste_borrar:'Borrar todos los datos', ajuste_borrar_desc:'Esta acción no se puede deshacer.',
    horario_hint:'Toca las cabeceras o horas para editarlas.',
    toast_asig_creada:'Asignatura creada', toast_asig_eliminada:'Asignatura eliminada',
    toast_act_añadida:'Actividad añadida', toast_act_eliminada:'Actividad eliminada',
    toast_tarea_creada:'Tarea creada', toast_tarea_eliminada:'Tarea eliminada',
    toast_guardado:'Guardado ✓', toast_horario_guardado:'Horario guardado ✓',
    toast_datos_eliminados:'Datos eliminados', toast_col_añadida:'Columna añadida', toast_fila_añadida:'Franja añadida',
    toast_min_dias:'Mínimo 1 día', toast_min_filas:'Mínimo 1 franja',
    toast_nombre_requerido:'Escribe un nombre', toast_pct_requerido:'Define el porcentaje',
    toast_pct_max:'El porcentaje no puede superar 100%',
    toast_color:'Color: ',
    confirm_elim_asig:'¿Eliminar esta asignatura? Se borrarán todas sus actividades.',
    confirm_elim_act:'¿Eliminar esta actividad?',
    confirm_elim_tarea:'¿Eliminar esta tarea?',
    confirm_elim_col:'¿Eliminar la columna',
    confirm_elim_fila:'¿Eliminar la fila',
    confirm_borrar_todo:'Se borrarán todas las asignaturas, notas, tareas y el horario.',
    vence_hoy:'Vence hoy', vencida:'Vencida', sin_fecha:'Sin fecha',
    evaluado:'evaluado', configurado:'configurado',
  },
  en: {
    nav_home:'Home', nav_notas:'Subjects', nav_tareas:'Tasks', nav_horario:'Schedule', nav_ajustes:'Settings',
    hero_sub:'Your favorite study web,\nby HEnricVR',
    empty_notas:'No subjects yet.', crear_asignatura:'Create subject',
    empty_tareas:'No tasks yet.', crear_tarea:'Create task',
    tareas_hint:'Drag cards to rearrange them',
    media_label:'FINAL GRADE',
    nueva_actividad:'+ New activity',
    modal_nueva_asig:'New subject', modal_nueva_act:'New activity',
    modal_editar_act:'Edit activity', modal_nueva_tarea:'New task', modal_editar_tarea:'Edit task',
    label_nombre:'Name', label_nombre_act:'Activity name', label_tipo:'Type',
    label_pct:'Percentage (%)', label_nota:'Grade (optional)',
    label_tarea_titulo:'Title', label_tarea_desc:'Description (optional)', label_tarea_fecha:'Due date', label_tarea_color:'Card color',
    label_tarea_hora:'Due time',
    placeholder_asig:'E.g.: Mathematics', placeholder_act:'E.g.: Midterm exam',
    placeholder_tarea_titulo:'E.g.: Submit history paper', placeholder_tarea_desc:'Additional notes...',
    tipo_examen:'Exam', tipo_trabajo:'Assignment', tipo_proyecto:'Project', tipo_practica:'Practice', tipo_otro:'Other',
    cancelar:'Cancel', crear:'Create', guardar:'Save', añadir:'Add', borrar:'Delete', confirmar:'Confirm',
    confirmar_titulo:'Confirm?',
    ajuste_idioma:'Language', ajuste_idioma_desc:'Change the app language',
    ajuste_color:'Accent color', ajuste_color_desc:'Customize the main color of the app.',
    ajuste_version:'Version', ajuste_datos:'Saved data',
    ajuste_borrar:'Delete all data', ajuste_borrar_desc:'This action cannot be undone.',
    horario_hint:'Tap headers or times to edit them.',
    toast_asig_creada:'Subject created', toast_asig_eliminada:'Subject deleted',
    toast_act_añadida:'Activity added', toast_act_eliminada:'Activity deleted',
    toast_tarea_creada:'Task created', toast_tarea_eliminada:'Task deleted',
    toast_guardado:'Saved ✓', toast_horario_guardado:'Schedule saved ✓',
    toast_datos_eliminados:'Data deleted', toast_col_añadida:'Column added', toast_fila_añadida:'Row added',
    toast_min_dias:'Minimum 1 day', toast_min_filas:'Minimum 1 row',
    toast_nombre_requerido:'Enter a name', toast_pct_requerido:'Set the percentage',
    toast_pct_max:'Percentage cannot exceed 100%',
    toast_color:'Color: ',
    confirm_elim_asig:'Delete this subject? All activities will be removed.',
    confirm_elim_act:'Delete this activity?',
    confirm_elim_tarea:'Delete this task?',
    confirm_elim_col:'Delete column',
    confirm_elim_fila:'Delete row',
    confirm_borrar_todo:'All subjects, grades, tasks and schedule will be deleted.',
    vence_hoy:'Due today', vencida:'Overdue', sin_fecha:'No date',
    evaluado:'evaluated', configurado:'configured',
  },
  fr: {
    nav_home:'Accueil', nav_notas:'Matières', nav_tareas:'Tâches', nav_horario:'Emploi du temps', nav_ajustes:'Paramètres',
    hero_sub:'Votre web d\'étude préféré,\nby HEnricVR',
    empty_notas:'Aucune matière.', crear_asignatura:'Créer une matière',
    empty_tareas:'Aucune tâche.', crear_tarea:'Créer une tâche',
    tareas_hint:'Faites glisser les cartes pour les réorganiser',
    media_label:'MOYENNE FINALE',
    nueva_actividad:'+ Nouvelle activité',
    modal_nueva_asig:'Nouvelle matière', modal_nueva_act:'Nouvelle activité',
    modal_editar_act:'Modifier l\'activité', modal_nueva_tarea:'Nouvelle tâche', modal_editar_tarea:'Modifier la tâche',
    label_nombre:'Nom', label_nombre_act:'Nom de l\'activité', label_tipo:'Type',
    label_pct:'Pourcentage (%)', label_nota:'Note (optionnel)',
    label_tarea_titulo:'Titre', label_tarea_desc:'Description (optionnel)', label_tarea_fecha:'Date limite', label_tarea_color:'Couleur de la carte',
    label_tarea_hora:'Heure limite',
    placeholder_asig:'Ex: Mathématiques', placeholder_act:'Ex: Examen partiel',
    placeholder_tarea_titulo:'Ex: Remettre le devoir d\'histoire', placeholder_tarea_desc:'Notes supplémentaires...',
    tipo_examen:'Examen', tipo_trabajo:'Devoir', tipo_proyecto:'Projet', tipo_practica:'TP', tipo_otro:'Autre',
    cancelar:'Annuler', crear:'Créer', guardar:'Sauvegarder', añadir:'Ajouter', borrar:'Supprimer', confirmar:'Confirmer',
    confirmar_titulo:'Confirmer ?',
    ajuste_idioma:'Langue', ajuste_idioma_desc:'Changer la langue de l\'app',
    ajuste_color:'Couleur d\'accent', ajuste_color_desc:'Personnalisez la couleur principale.',
    ajuste_version:'Version', ajuste_datos:'Données sauvegardées',
    ajuste_borrar:'Supprimer toutes les données', ajuste_borrar_desc:'Cette action est irréversible.',
    horario_hint:'Touchez les en-têtes ou les heures pour les modifier.',
    toast_asig_creada:'Matière créée', toast_asig_eliminada:'Matière supprimée',
    toast_act_añadida:'Activité ajoutée', toast_act_eliminada:'Activité supprimée',
    toast_tarea_creada:'Tâche créée', toast_tarea_eliminada:'Tâche supprimée',
    toast_guardado:'Sauvegardé ✓', toast_horario_guardado:'Emploi du temps sauvegardé ✓',
    toast_datos_eliminados:'Données supprimées', toast_col_añadida:'Colonne ajoutée', toast_fila_añadida:'Ligne ajoutée',
    toast_min_dias:'Minimum 1 jour', toast_min_filas:'Minimum 1 ligne',
    toast_nombre_requerido:'Entrez un nom', toast_pct_requerido:'Définissez le pourcentage',
    toast_pct_max:'Le pourcentage ne peut pas dépasser 100%',
    toast_color:'Couleur : ',
    confirm_elim_asig:'Supprimer cette matière ? Toutes les activités seront supprimées.',
    confirm_elim_act:'Supprimer cette activité ?',
    confirm_elim_tarea:'Supprimer cette tâche ?',
    confirm_elim_col:'Supprimer la colonne',
    confirm_elim_fila:'Supprimer la ligne',
    confirm_borrar_todo:'Toutes les matières, notes, tâches et l\'emploi du temps seront supprimés.',
    vence_hoy:'Dû aujourd\'hui', vencida:'En retard', sin_fecha:'Sans date',
    evaluado:'évalué', configurado:'configuré',
  },
  de: {
    nav_home:'Start', nav_notas:'Fächer', nav_tareas:'Aufgaben', nav_horario:'Stundenplan', nav_ajustes:'Einstellungen',
    hero_sub:'Deine liebste Lernseite,\nby HEnricVR',
    empty_notas:'Noch keine Fächer.', crear_asignatura:'Fach erstellen',
    empty_tareas:'Noch keine Aufgaben.', crear_tarea:'Aufgabe erstellen',
    tareas_hint:'Karten ziehen zum Neuanordnen',
    media_label:'ENDNOTE',
    nueva_actividad:'+ Neue Aktivität',
    modal_nueva_asig:'Neues Fach', modal_nueva_act:'Neue Aktivität',
    modal_editar_act:'Aktivität bearbeiten', modal_nueva_tarea:'Neue Aufgabe', modal_editar_tarea:'Aufgabe bearbeiten',
    label_nombre:'Name', label_nombre_act:'Name der Aktivität', label_tipo:'Typ',
    label_pct:'Prozentsatz (%)', label_nota:'Note (optional)',
    label_tarea_titulo:'Titel', label_tarea_desc:'Beschreibung (optional)', label_tarea_fecha:'Fälligkeitsdatum', label_tarea_color:'Kartenfarbe',
    label_tarea_hora:'Abgabezeit',
    placeholder_asig:'z.B.: Mathematik', placeholder_act:'z.B.: Zwischenprüfung',
    placeholder_tarea_titulo:'z.B.: Geschichtsarbeit abgeben', placeholder_tarea_desc:'Zusätzliche Notizen...',
    tipo_examen:'Prüfung', tipo_trabajo:'Hausarbeit', tipo_proyecto:'Projekt', tipo_practica:'Übung', tipo_otro:'Sonstiges',
    cancelar:'Abbrechen', crear:'Erstellen', guardar:'Speichern', añadir:'Hinzufügen', borrar:'Löschen', confirmar:'Bestätigen',
    confirmar_titulo:'Bestätigen?',
    ajuste_idioma:'Sprache', ajuste_idioma_desc:'App-Sprache ändern',
    ajuste_color:'Akzentfarbe', ajuste_color_desc:'Hauptfarbe der App anpassen.',
    ajuste_version:'Version', ajuste_datos:'Gespeicherte Daten',
    ajuste_borrar:'Alle Daten löschen', ajuste_borrar_desc:'Diese Aktion kann nicht rückgängig gemacht werden.',
    horario_hint:'Tippe auf Kopfzeilen oder Zeiten zum Bearbeiten.',
    toast_asig_creada:'Fach erstellt', toast_asig_eliminada:'Fach gelöscht',
    toast_act_añadida:'Aktivität hinzugefügt', toast_act_eliminada:'Aktivität gelöscht',
    toast_tarea_creada:'Aufgabe erstellt', toast_tarea_eliminada:'Aufgabe gelöscht',
    toast_guardado:'Gespeichert ✓', toast_horario_guardado:'Stundenplan gespeichert ✓',
    toast_datos_eliminados:'Daten gelöscht', toast_col_añadida:'Spalte hinzugefügt', toast_fila_añadida:'Zeile hinzugefügt',
    toast_min_dias:'Mindestens 1 Tag', toast_min_filas:'Mindestens 1 Zeile',
    toast_nombre_requerido:'Bitte Namen eingeben', toast_pct_requerido:'Prozentsatz festlegen',
    toast_pct_max:'Prozentsatz darf 100% nicht überschreiten',
    toast_color:'Farbe: ',
    confirm_elim_asig:'Dieses Fach löschen? Alle Aktivitäten werden entfernt.',
    confirm_elim_act:'Diese Aktivität löschen?',
    confirm_elim_tarea:'Diese Aufgabe löschen?',
    confirm_elim_col:'Spalte löschen',
    confirm_elim_fila:'Zeile löschen',
    confirm_borrar_todo:'Alle Fächer, Noten, Aufgaben und der Stundenplan werden gelöscht.',
    vence_hoy:'Heute fällig', vencida:'Überfällig', sin_fecha:'Kein Datum',
    evaluado:'bewertet', configurado:'konfiguriert',
  },
  pt: {
    nav_home:'Início', nav_notas:'Disciplinas', nav_tareas:'Tarefas', nav_horario:'Horário', nav_ajustes:'Definições',
    hero_sub:'O teu site de estudo favorito,\nby HEnricVR',
    empty_notas:'Sem disciplinas ainda.', crear_asignatura:'Criar disciplina',
    empty_tareas:'Sem tarefas ainda.', crear_tarea:'Criar tarefa',
    tareas_hint:'Arrasta os cartões para os reorganizar',
    media_label:'MÉDIA FINAL',
    nueva_actividad:'+ Nova atividade',
    modal_nueva_asig:'Nova disciplina', modal_nueva_act:'Nova atividade',
    modal_editar_act:'Editar atividade', modal_nueva_tarea:'Nova tarefa', modal_editar_tarea:'Editar tarefa',
    label_nombre:'Nome', label_nombre_act:'Nome da atividade', label_tipo:'Tipo',
    label_pct:'Percentagem (%)', label_nota:'Nota (opcional)',
    label_tarea_titulo:'Título', label_tarea_desc:'Descrição (opcional)', label_tarea_fecha:'Data de entrega', label_tarea_color:'Cor do cartão',
    label_tarea_hora:'Hora de entrega',
    placeholder_asig:'Ex: Matemática', placeholder_act:'Ex: Exame parcial',
    placeholder_tarea_titulo:'Ex: Entregar trabalho de história', placeholder_tarea_desc:'Notas adicionais...',
    tipo_examen:'Exame', tipo_trabajo:'Trabalho', tipo_proyecto:'Projeto', tipo_practica:'Prática', tipo_otro:'Outro',
    cancelar:'Cancelar', crear:'Criar', guardar:'Guardar', añadir:'Adicionar', borrar:'Apagar', confirmar:'Confirmar',
    confirmar_titulo:'Confirmar?',
    ajuste_idioma:'Idioma', ajuste_idioma_desc:'Muda o idioma da app',
    ajuste_color:'Cor de destaque', ajuste_color_desc:'Personaliza a cor principal da app.',
    ajuste_version:'Versão', ajuste_datos:'Dados guardados',
    ajuste_borrar:'Apagar todos os dados', ajuste_borrar_desc:'Esta ação não pode ser desfeita.',
    horario_hint:'Toca nos cabeçalhos ou horas para editar.',
    toast_asig_creada:'Disciplina criada', toast_asig_eliminada:'Disciplina apagada',
    toast_act_añadida:'Atividade adicionada', toast_act_eliminada:'Atividade apagada',
    toast_tarea_creada:'Tarefa criada', toast_tarea_eliminada:'Tarefa apagada',
    toast_guardado:'Guardado ✓', toast_horario_guardado:'Horário guardado ✓',
    toast_datos_eliminados:'Dados apagados', toast_col_añadida:'Coluna adicionada', toast_fila_añadida:'Linha adicionada',
    toast_min_dias:'Mínimo 1 dia', toast_min_filas:'Mínimo 1 linha',
    toast_nombre_requerido:'Escreve um nome', toast_pct_requerido:'Define a percentagem',
    toast_pct_max:'A percentagem não pode ultrapassar 100%',
    toast_color:'Cor: ',
    confirm_elim_asig:'Eliminar esta disciplina? Todas as atividades serão removidas.',
    confirm_elim_act:'Eliminar esta atividade?',
    confirm_elim_tarea:'Eliminar esta tarefa?',
    confirm_elim_col:'Eliminar coluna',
    confirm_elim_fila:'Eliminar linha',
    confirm_borrar_todo:'Todas as disciplinas, notas, tarefas e horário serão apagados.',
    vence_hoy:'Vence hoje', vencida:'Atrasada', sin_fecha:'Sem data',
    evaluado:'avaliado', configurado:'configurado',
  },
  zh: {
    nav_home:'主页', nav_notas:'科目', nav_tareas:'任务', nav_horario:'课程表', nav_ajustes:'设置',
    hero_sub:'你最喜欢的学习网站，\nby HEnricVR',
    empty_notas:'暂无科目。', crear_asignatura:'创建科目',
    empty_tareas:'暂无任务。', crear_tarea:'创建任务',
    tareas_hint:'拖动卡片重新排列',
    media_label:'最终成绩',
    nueva_actividad:'+ 新活动',
    modal_nueva_asig:'新科目', modal_nueva_act:'新活动',
    modal_editar_act:'编辑活动', modal_nueva_tarea:'新任务', modal_editar_tarea:'编辑任务',
    label_nombre:'名称', label_nombre_act:'活动名称', label_tipo:'类型',
    label_pct:'百分比 (%)', label_nota:'成绩 (可选)',
    label_tarea_titulo:'标题', label_tarea_desc:'描述 (可选)', label_tarea_fecha:'截止日期', label_tarea_color:'卡片颜色',
    label_tarea_hora:'截止时间',
    placeholder_asig:'例：数学', placeholder_act:'例：期中考试',
    placeholder_tarea_titulo:'例：提交历史作业', placeholder_tarea_desc:'附加说明...',
    tipo_examen:'考试', tipo_trabajo:'作业', tipo_proyecto:'项目', tipo_practica:'实践', tipo_otro:'其他',
    cancelar:'取消', crear:'创建', guardar:'保存', añadir:'添加', borrar:'删除', confirmar:'确认',
    confirmar_titulo:'确认？',
    ajuste_idioma:'语言', ajuste_idioma_desc:'更改应用语言',
    ajuste_color:'强调色', ajuste_color_desc:'自定义应用的主色调。',
    ajuste_version:'版本', ajuste_datos:'已保存数据',
    ajuste_borrar:'删除所有数据', ajuste_borrar_desc:'此操作无法撤销。',
    horario_hint:'点击标题或时间进行编辑。',
    toast_asig_creada:'科目已创建', toast_asig_eliminada:'科目已删除',
    toast_act_añadida:'活动已添加', toast_act_eliminada:'活动已删除',
    toast_tarea_creada:'任务已创建', toast_tarea_eliminada:'任务已删除',
    toast_guardado:'已保存 ✓', toast_horario_guardado:'课程表已保存 ✓',
    toast_datos_eliminados:'数据已删除', toast_col_añadida:'列已添加', toast_fila_añadida:'行已添加',
    toast_min_dias:'最少1天', toast_min_filas:'最少1行',
    toast_nombre_requerido:'请输入名称', toast_pct_requerido:'请设置百分比',
    toast_pct_max:'百分比不能超过100%',
    toast_color:'颜色：',
    confirm_elim_asig:'删除此科目？所有活动将被删除。',
    confirm_elim_act:'删除此活动？',
    confirm_elim_tarea:'删除此任务？',
    confirm_elim_col:'删除列',
    confirm_elim_fila:'删除行',
    confirm_borrar_todo:'所有科目、成绩、任务和课程表将被删除。',
    vence_hoy:'今天到期', vencida:'已逾期', sin_fecha:'无日期',
    evaluado:'已评估', configurado:'已配置',
  },
  ru: {
    nav_home:'Главная', nav_notas:'Предметы', nav_tareas:'Задачи', nav_horario:'Расписание', nav_ajustes:'Настройки',
    hero_sub:'Твой любимый учебный сайт,\nby HEnricVR',
    empty_notas:'Предметов пока нет.', crear_asignatura:'Создать предмет',
    empty_tareas:'Задач пока нет.', crear_tarea:'Создать задачу',
    tareas_hint:'Перетаскивайте карточки для перестановки',
    media_label:'ИТОГОВАЯ ОЦЕНКА',
    nueva_actividad:'+ Новое задание',
    modal_nueva_asig:'Новый предмет', modal_nueva_act:'Новое задание',
    modal_editar_act:'Редактировать задание', modal_nueva_tarea:'Новая задача', modal_editar_tarea:'Редактировать задачу',
    label_nombre:'Название', label_nombre_act:'Название задания', label_tipo:'Тип',
    label_pct:'Процент (%)', label_nota:'Оценка (необязательно)',
    label_tarea_titulo:'Заголовок', label_tarea_desc:'Описание (необязательно)', label_tarea_fecha:'Дата сдачи', label_tarea_color:'Цвет карточки',
    label_tarea_hora:'Время сдачи',
    placeholder_asig:'Напр: Математика', placeholder_act:'Напр: Промежуточный экзамен',
    placeholder_tarea_titulo:'Напр: Сдать работу по истории', placeholder_tarea_desc:'Дополнительные заметки...',
    tipo_examen:'Экзамен', tipo_trabajo:'Работа', tipo_proyecto:'Проект', tipo_practica:'Практика', tipo_otro:'Другое',
    cancelar:'Отмена', crear:'Создать', guardar:'Сохранить', añadir:'Добавить', borrar:'Удалить', confirmar:'Подтвердить',
    confirmar_titulo:'Подтвердить?',
    ajuste_idioma:'Язык', ajuste_idioma_desc:'Изменить язык приложения',
    ajuste_color:'Акцентный цвет', ajuste_color_desc:'Настройте основной цвет приложения.',
    ajuste_version:'Версия', ajuste_datos:'Сохранённые данные',
    ajuste_borrar:'Удалить все данные', ajuste_borrar_desc:'Это действие нельзя отменить.',
    horario_hint:'Нажмите на заголовки или время для редактирования.',
    toast_asig_creada:'Предмет создан', toast_asig_eliminada:'Предмет удалён',
    toast_act_añadida:'Задание добавлено', toast_act_eliminada:'Задание удалено',
    toast_tarea_creada:'Задача создана', toast_tarea_eliminada:'Задача удалена',
    toast_guardado:'Сохранено ✓', toast_horario_guardado:'Расписание сохранено ✓',
    toast_datos_eliminados:'Данные удалены', toast_col_añadida:'Столбец добавлен', toast_fila_añadida:'Строка добавлена',
    toast_min_dias:'Минимум 1 день', toast_min_filas:'Минимум 1 строка',
    toast_nombre_requerido:'Введите название', toast_pct_requerido:'Укажите процент',
    toast_pct_max:'Процент не может превышать 100%',
    toast_color:'Цвет: ',
    confirm_elim_asig:'Удалить этот предмет? Все задания будут удалены.',
    confirm_elim_act:'Удалить это задание?',
    confirm_elim_tarea:'Удалить эту задачу?',
    confirm_elim_col:'Удалить столбец',
    confirm_elim_fila:'Удалить строку',
    confirm_borrar_todo:'Все предметы, оценки, задачи и расписание будут удалены.',
    vence_hoy:'Срок сегодня', vencida:'Просрочено', sin_fecha:'Без даты',
    evaluado:'оценено', configurado:'настроено',
  },
  hi: {
    nav_home:'होम', nav_notas:'विषय', nav_tareas:'कार्य', nav_horario:'समय-सारणी', nav_ajustes:'सेटिंग्स',
    hero_sub:'आपकी पसंदीदा अध्ययन वेबसाइट,\nby HEnricVR',
    empty_notas:'अभी कोई विषय नहीं।', crear_asignatura:'विषय बनाएं',
    empty_tareas:'अभी कोई कार्य नहीं।', crear_tarea:'कार्य बनाएं',
    tareas_hint:'कार्डों को पुनर्व्यवस्थित करने के लिए खींचें',
    media_label:'अंतिम औसत',
    nueva_actividad:'+ नई गतिविधि',
    modal_nueva_asig:'नया विषय', modal_nueva_act:'नई गतिविधि',
    modal_editar_act:'गतिविधि संपादित करें', modal_nueva_tarea:'नया कार्य', modal_editar_tarea:'कार्य संपादित करें',
    label_nombre:'नाम', label_nombre_act:'गतिविधि का नाम', label_tipo:'प्रकार',
    label_pct:'प्रतिशत (%)', label_nota:'अंक (वैकल्पिक)',
    label_tarea_titulo:'शीर्षक', label_tarea_desc:'विवरण (वैकल्पिक)', label_tarea_fecha:'नियत तारीख', label_tarea_color:'कार्ड रंग',
    label_tarea_hora:'जमा करने का समय',
    placeholder_asig:'उदा: गणित', placeholder_act:'उदा: मध्यावधि परीक्षा',
    placeholder_tarea_titulo:'उदा: इतिहास कार्य जमा करें', placeholder_tarea_desc:'अतिरिक्त नोट्स...',
    tipo_examen:'परीक्षा', tipo_trabajo:'कार्य', tipo_proyecto:'परियोजना', tipo_practica:'अभ्यास', tipo_otro:'अन्य',
    cancelar:'रद्द करें', crear:'बनाएं', guardar:'सहेजें', añadir:'जोड़ें', borrar:'हटाएं', confirmar:'पुष्टि करें',
    confirmar_titulo:'पुष्टि करें?',
    ajuste_idioma:'भाषा', ajuste_idioma_desc:'ऐप की भाषा बदलें',
    ajuste_color:'एक्सेंट रंग', ajuste_color_desc:'ऐप का मुख्य रंग अनुकूलित करें।',
    ajuste_version:'संस्करण', ajuste_datos:'सहेजा गया डेटा',
    ajuste_borrar:'सभी डेटा हटाएं', ajuste_borrar_desc:'यह क्रिया पूर्ववत नहीं की जा सकती।',
    horario_hint:'संपादित करने के लिए शीर्षकों या समय पर टैप करें।',
    toast_asig_creada:'विषय बनाया गया', toast_asig_eliminada:'विषय हटाया गया',
    toast_act_añadida:'गतिविधि जोड़ी गई', toast_act_eliminada:'गतिविधि हटाई गई',
    toast_tarea_creada:'कार्य बनाया गया', toast_tarea_eliminada:'कार्य हटाया गया',
    toast_guardado:'सहेजा गया ✓', toast_horario_guardado:'समय-सारणी सहेजी गई ✓',
    toast_datos_eliminados:'डेटा हटाया गया', toast_col_añadida:'कॉलम जोड़ा गया', toast_fila_añadida:'पंक्ति जोड़ी गई',
    toast_min_dias:'न्यूनतम 1 दिन', toast_min_filas:'न्यूनतम 1 पंक्ति',
    toast_nombre_requerido:'नाम लिखें', toast_pct_requerido:'प्रतिशत निर्धारित करें',
    toast_pct_max:'प्रतिशत 100% से अधिक नहीं हो सकता',
    toast_color:'रंग: ',
    confirm_elim_asig:'यह विषय हटाएं? सभी गतिविधियां हटा दी जाएंगी।',
    confirm_elim_act:'यह गतिविधि हटाएं?',
    confirm_elim_tarea:'यह कार्य हटाएं?',
    confirm_elim_col:'कॉलम हटाएं',
    confirm_elim_fila:'पंक्ति हटाएं',
    confirm_borrar_todo:'सभी विषय, अंक, कार्य और समय-सारणी हटा दी जाएगी।',
    vence_hoy:'आज देय', vencida:'अतिदेय', sin_fecha:'कोई तारीख नहीं',
    evaluado:'मूल्यांकित', configurado:'कॉन्फ़िगर किया गया',
  },
};

let currentLang = 'es';
function t(key) { return (TRANSLATIONS[currentLang] || TRANSLATIONS.es)[key] || key; }

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = val;
    else el.innerHTML = val.replace(/\n/g, '<br/>');
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  // Select options
  document.querySelectorAll('option[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
}

function cambiarIdioma(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  // Re-render vistas activas
  const renders = { notas: renderNotas, horario: renderHorario, ajustes: renderAjustes, asignatura: renderAsignatura, tareas: renderTareas };
  if (renders[currentView]) renders[currentView]();
}

// ============================================================
// STATE
// ============================================================
let currentView = 'home';
let currentAsignaturaId = null;
let _confirmarCallback = null;

// ============================================================
// DATA LAYER
// ============================================================
const DB = {
  getAsignaturas() { return JSON.parse(localStorage.getItem('asignaturas') || '[]'); },
  saveAsignaturas(arr) { localStorage.setItem('asignaturas', JSON.stringify(arr)); },
  getAsignatura(id) { return this.getAsignaturas().find(a => a.id === id) || null; },
  updateAsignatura(u) { this.saveAsignaturas(this.getAsignaturas().map(a => a.id === u.id ? u : a)); },
  getTareas() { return JSON.parse(localStorage.getItem('tareas') || '[]'); },
  saveTareas(arr) { localStorage.setItem('tareas', JSON.stringify(arr)); },
  getHorario() {
    const s = localStorage.getItem('horario');
    if (s) return JSON.parse(s);
    const dias = ['Lunes','Martes','Miérc.','Jueves','Viernes'];
    const horas = ['8:00','9:00','10:00','11:00','12:00','13:00'];
    const rows = horas.map(h => ({ hora: h, celdas: Object.fromEntries(dias.map(d => [d,''])) }));
    return { dias, rows };
  },
  saveHorario(d) { localStorage.setItem('horario', JSON.stringify(d)); },
  getAccentColor() { return localStorage.getItem('accentColor') || '#ffffff'; },
  saveAccentColor(c) { localStorage.setItem('accentColor', c); },
};

// ============================================================
// UTILITIES
// ============================================================
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2300);
}

function notaClass(n) {
  if (n===null||n===undefined||n==='') return 'none';
  return parseFloat(n)>=7?'good':parseFloat(n)>=5?'warn':'bad';
}

function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

// ============================================================
// MEDIA PONDERADA — agrupada por porcentaje
// ============================================================
function calcularMedia(asig) {
  const withNota = (asig.actividades||[]).filter(a => a.nota!==''&&a.nota!==null&&a.nota!==undefined);
  if (!withNota.length) return null;
  const grupos = {};
  withNota.forEach(a => {
    const k = (parseFloat(a.porcentaje)||0).toString();
    if (!grupos[k]) grupos[k] = { pct: parseFloat(a.porcentaje)||0, notas:[] };
    grupos[k].notas.push(parseFloat(a.nota)||0);
  });
  let notaFinal=0, pctAcum=0;
  Object.values(grupos).forEach(g => {
    const media = g.notas.reduce((s,n)=>s+n,0)/g.notas.length;
    notaFinal += media*(g.pct/100);
    pctAcum += g.pct;
  });
  if (!pctAcum) return null;
  return (notaFinal/(pctAcum/100)).toFixed(2);
}

function calcularPctTotal(asig) {
  const unicos = new Set((asig.actividades||[]).map(a=>parseFloat(a.porcentaje)||0));
  return [...unicos].reduce((a,p)=>a+p,0);
}

// ============================================================
// COLOR ACCENT
// ============================================================
const TAREA_COLORS = ['#ffffff','#3a9bdc','#30d158','#bf5af2','#ff9f0a','#ff375f','#5ac8fa','#ff453a','#ffd60a'];

const ACCENT_COLORS = [
  {name:'Blanco',value:'#ffffff'},{name:'Azul',value:'#3a9bdc'},
  {name:'Verde',value:'#30d158'},{name:'Lila',value:'#bf5af2'},
  {name:'Naranja',value:'#ff9f0a'},{name:'Rosa',value:'#ff375f'},
  {name:'Cyan',value:'#5ac8fa'},{name:'Rojo',value:'#ff453a'},
];


function applyAccentColor(color) {
  const r=parseInt(color.slice(1,3),16),g=parseInt(color.slice(3,5),16),b=parseInt(color.slice(5,7),16);
  const lum=(0.299*r+0.587*g+0.114*b)/255;
  document.documentElement.style.setProperty('--accent',color);
  document.documentElement.style.setProperty('--btn-primary-bg',color);
  document.documentElement.style.setProperty('--btn-primary-text',lum>0.5?'#000':'#fff');
  document.documentElement.style.setProperty('--nav-active-color',color);
}
function loadAccentColor() { applyAccentColor(DB.getAccentColor()); }

// ============================================================
// NAVIGATION
// ============================================================
function navigate(view, asigId=null) {
  const prev = document.getElementById(`view-${currentView}`);
  const next = document.getElementById(`view-${view}`);
  if (!next) return;
  if (prev&&prev!==next) { prev.classList.add('exit'); prev.classList.remove('active'); setTimeout(()=>prev.classList.remove('exit'),300); }
  currentView = view;
  if (asigId) currentAsignaturaId = asigId;
  next.classList.add('active'); next.classList.remove('exit');

  // Sidebar + bottom nav activo
  document.querySelectorAll('.sidebar-btn, .nav-btn').forEach(btn => {
    const v = btn.dataset.view;
    btn.classList.toggle('active', v===view||(view==='asignatura'&&v==='notas'));
  });

  const titleKeys = {home:'nav_home',notas:'nav_notas',tareas:'nav_tareas',horario:'nav_horario',ajustes:'nav_ajustes',asignatura:'nav_notas'};
  document.getElementById('topbar-title').textContent = t(titleKeys[view]||'nav_home').toUpperCase();

  const renders={notas:renderNotas,horario:renderHorario,ajustes:renderAjustes,asignatura:renderAsignatura,tareas:renderTareas};
  if (renders[view]) renders[view]();

  // Cerrar sidebar en móvil al navegar
  if (window.innerWidth < 768) closeSidebar();
}

// ============================================================
// MODALS
// ============================================================
function openModal(id) {
  const el = document.getElementById(id);
  el.classList.add('open');
  // Re-aplicar traducciones dentro del modal por si acaso
  el.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    const val = t(key);
    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') node.value = val;
    else node.innerHTML = val.replace(/\n/g, '<br/>');
  });
  if (id === 'modal-nueva-tarea') {
    selectedTareaColor = selectedTareaColor || TAREA_COLORS[0];
    renderColorPicker('tarea-color-picker', selectedTareaColor, c => { selectedTareaColor = c; });
  }
  if (id === 'modal-editar-tarea') {
    renderColorPicker('edit-tarea-color-picker', editTareaColor, c => { editTareaColor = c; });
  }
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); }));

function confirmarAccion(texto, cb) { document.getElementById('confirmar-texto').textContent=texto; _confirmarCallback=cb; openModal('modal-confirmar'); }
function ejecutarConfirmacion() { closeModal('modal-confirmar'); if(typeof _confirmarCallback==='function'){_confirmarCallback();_confirmarCallback=null;} }

// ============================================================
// VIEW: NOTAS
// ============================================================
function renderNotas() {
  const asigs = DB.getAsignaturas();
  const list = document.getElementById('asignaturas-list');
  const empty = document.getElementById('empty-notas');
  list.innerHTML = '';
  if (!asigs.length) { empty.classList.add('visible'); return; }
  empty.classList.remove('visible');
  asigs.forEach((asig,i) => {
    const media = calcularMedia(asig);
    const mTxt = media!==null?media:'—';
    const mCls = media!==null?notaClass(media):'none';
    const card = document.createElement('div');
    card.className='asignatura-card'; card.style.animationDelay=`${i*0.05}s`;
    card.innerHTML=`
      <div class="asig-info"><p class="asig-nombre">${escapeHtml(asig.nombre)}</p><p class="asig-meta">${asig.actividades?.length||0} ${t('label_tipo').toLowerCase()}s</p></div>
      <span class="asig-media ${mCls}">${mTxt}</span>
      <button class="act-btn del asig-del-btn" title="Eliminar">✕</button>`;
    card.querySelector('.asig-info').onclick = ()=>navigate('asignatura',asig.id);
    card.querySelector('.asig-media').onclick = ()=>navigate('asignatura',asig.id);
    card.querySelector('.asig-del-btn').onclick = (e)=>{ e.stopPropagation(); confirmarAccion(t('confirm_elim_asig'),()=>{ DB.saveAsignaturas(DB.getAsignaturas().filter(a=>a.id!==asig.id)); showToast(t('toast_asig_eliminada')); renderNotas(); }); };
    list.appendChild(card);
  });
}

function crearAsignatura() {
  const nombre = document.getElementById('input-asignatura-nombre').value.trim();
  if (!nombre) { showToast(t('toast_nombre_requerido')); return; }
  const asigs = DB.getAsignaturas();
  asigs.push({id:uid(),nombre,actividades:[]});
  DB.saveAsignaturas(asigs);
  document.getElementById('input-asignatura-nombre').value='';
  closeModal('modal-nueva-asignatura');
  renderNotas();
  showToast(t('toast_asig_creada'));
}

// ============================================================
// VIEW: ASIGNATURA DETALLE
// ============================================================
function renderAsignatura() {
  const asig = DB.getAsignatura(currentAsignaturaId);
  if (!asig) { navigate('notas'); return; }
  document.getElementById('detalle-title').textContent = asig.nombre;
  const media = calcularMedia(asig);
  const mEl = document.getElementById('media-valor');
  mEl.textContent = media!==null?media:'—';
  mEl.className = `media-value ${media!==null?notaClass(media):''}`;
  const pctTotal = calcularPctTotal(asig);
  const pctConNota = [...new Set((asig.actividades||[]).filter(a=>a.nota!==''&&a.nota!==null).map(a=>parseFloat(a.porcentaje)||0))].reduce((s,p)=>s+p,0);
  document.getElementById('media-pct-info').textContent = `${pctConNota}% ${t('evaluado')} · ${pctTotal}% ${t('configurado')}`;

  document.getElementById('btn-delete-asignatura').onclick = ()=>confirmarAccion(`${t('confirm_elim_asig')}`,()=>{ DB.saveAsignaturas(DB.getAsignaturas().filter(a=>a.id!==currentAsignaturaId)); showToast(t('toast_asig_eliminada')); navigate('notas'); });

  const list = document.getElementById('actividades-list');
  list.innerHTML='';
  (asig.actividades||[]).forEach((act,i)=>{
    const nTxt=(act.nota!==''&&act.nota!==null&&act.nota!==undefined)?parseFloat(act.nota).toFixed(1):'—';
    const nCls=(act.nota!==''&&act.nota!==null)?notaClass(act.nota):'none';
    const card=document.createElement('div');
    card.className='actividad-card'; card.style.animationDelay=`${i*0.04}s`;
    card.innerHTML=`
      <span class="actividad-tipo-badge">${escapeHtml(t('tipo_'+act.tipo)||act.tipo)}</span>
      <div class="actividad-info"><p class="actividad-nombre">${escapeHtml(act.nombre)}</p><p class="actividad-pct">${act.porcentaje}%</p></div>
      <span class="actividad-nota ${nCls}">${nTxt}</span>
      <div class="actividad-actions">
        <button class="act-btn edit" title="Editar">✎</button>
        <button class="act-btn del" title="Eliminar">✕</button>
      </div>`;
    card.querySelector('.edit').onclick=()=>abrirEdicionActividad(act.id);
    card.querySelector('.del').onclick=()=>eliminarActividad(act.id);
    list.appendChild(card);
  });
}

function crearActividad() {
  const nombre=document.getElementById('input-actividad-nombre').value.trim();
  const tipo=document.getElementById('input-actividad-tipo').value;
  const pctVal=parseFloat(document.getElementById('input-actividad-porcentaje').value);
  const notaVal=document.getElementById('input-actividad-nota').value;
  if (!nombre){showToast(t('toast_nombre_requerido'));return;}
  if (isNaN(pctVal)){showToast(t('toast_pct_requerido'));return;}
  if (pctVal>100){showToast(t('toast_pct_max'));return;}
  const asig=DB.getAsignatura(currentAsignaturaId); if(!asig)return;
  asig.actividades.push({id:uid(),nombre,tipo,porcentaje:pctVal,nota:notaVal!==''?parseFloat(notaVal):''});
  DB.updateAsignatura(asig);
  document.getElementById('input-actividad-nombre').value='';
  document.getElementById('input-actividad-porcentaje').value='';
  document.getElementById('input-actividad-nota').value='';
  closeModal('modal-nueva-actividad');
  renderAsignatura();
  showToast(t('toast_act_añadida'));
}

function abrirEdicionActividad(actId) {
  const asig=DB.getAsignatura(currentAsignaturaId); if(!asig)return;
  const act=asig.actividades.find(a=>a.id===actId); if(!act)return;
  document.getElementById('edit-actividad-id').value=actId;
  document.getElementById('edit-actividad-nombre').value=act.nombre;
  document.getElementById('edit-actividad-tipo').value=act.tipo||'otro';
  document.getElementById('edit-actividad-porcentaje').value=act.porcentaje;
  document.getElementById('edit-actividad-nota').value=act.nota!==''?act.nota:'';
  openModal('modal-editar-actividad');
}

function guardarEdicionActividad() {
  const actId=document.getElementById('edit-actividad-id').value;
  const nombre=document.getElementById('edit-actividad-nombre').value.trim();
  const tipo=document.getElementById('edit-actividad-tipo').value;
  const pctVal=parseFloat(document.getElementById('edit-actividad-porcentaje').value);
  const notaVal=document.getElementById('edit-actividad-nota').value;
  if (!nombre){showToast(t('toast_nombre_requerido'));return;}
  if (pctVal>100){showToast(t('toast_pct_max'));return;}
  const asig=DB.getAsignatura(currentAsignaturaId); if(!asig)return;
  asig.actividades=asig.actividades.map(a=>a.id!==actId?a:{...a,nombre,tipo,porcentaje:pctVal||a.porcentaje,nota:notaVal!==''?parseFloat(notaVal):''});
  DB.updateAsignatura(asig);
  closeModal('modal-editar-actividad');
  renderAsignatura();
  showToast(t('toast_guardado'));
}

function eliminarActividad(actId) {
  confirmarAccion(t('confirm_elim_act'),()=>{
    const asig=DB.getAsignatura(currentAsignaturaId); if(!asig)return;
    asig.actividades=asig.actividades.filter(a=>a.id!==actId);
    DB.updateAsignatura(asig); renderAsignatura(); showToast(t('toast_act_eliminada'));
  });
}

// ============================================================
// VIEW: TAREAS — drag & drop
// ============================================================
let selectedTareaColor = TAREA_COLORS[0];
let editTareaColor = TAREA_COLORS[0];




function renderColorPicker(containerId, selectedColor, onSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  TAREA_COLORS.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'tarea-color-swatch' + (c === selectedColor ? ' active' : '');
    btn.style.background = c;
    btn.type = 'button';
    btn.onclick = () => {
      onSelect(c);
      container.querySelectorAll('.tarea-color-swatch').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
    };
    container.appendChild(btn);
  });
}

function renderTareas() {
  const tareas = DB.getTareas();
  const board = document.getElementById('tareas-board');
  const empty = document.getElementById('empty-tareas');
  board.innerHTML = '';
  if (!tareas.length) { empty.classList.add('visible'); return; }
  empty.classList.remove('visible');

  const today = new Date(); today.setHours(0,0,0,0);

  tareas.forEach(tarea => {
    const card = document.createElement('div');
    card.className = 'tarea-card';
    card.style.left = (tarea.x||20)+'px';
    card.style.top  = (tarea.y||20)+'px';
    card.dataset.id = tarea.id;

    let fechaHtml = '';
    let fechaClass = '';
    if (tarea.fecha) {
      const d = new Date(tarea.fecha+'T00:00:00');
      const diff = Math.round((d-today)/(1000*60*60*24));
      if (diff===0){ fechaHtml=t('vence_hoy'); fechaClass='vence-hoy'; }
      else if(diff<0){ fechaHtml=t('vencida'); fechaClass='vencida'; }
      else { fechaHtml=tarea.fecha; }
    } else {
      fechaHtml = t('sin_fecha');
    }
    if (tarea.hora) fechaHtml += ' · ' + tarea.hora;

    card.innerHTML = `
      <div class="tarea-card-accent" style="background:${tarea.color||'#fff'}"></div>
      <p class="tarea-card-titulo">${escapeHtml(tarea.titulo)}</p>
      ${tarea.desc?`<p class="tarea-card-desc">${escapeHtml(tarea.desc)}</p>`:''}
      <p class="tarea-card-fecha ${fechaClass}">${fechaHtml}</p>
      <div class="tarea-card-actions">
        <button class="act-btn edit" title="Editar">✎</button>
        <button class="act-btn del" title="Eliminar">✕</button>
      </div>`;

    card.querySelector('.edit').onclick = e => { e.stopPropagation(); abrirEdicionTarea(tarea.id); };
    card.querySelector('.del').onclick  = e => { e.stopPropagation(); eliminarTarea(tarea.id); };

    makeDraggable(card, tarea);
    board.appendChild(card);
  });

  // Ajustar altura del board
  adjustBoardHeight();
}

function adjustBoardHeight() {
  const board = document.getElementById('tareas-board');
  const cards = board.querySelectorAll('.tarea-card');
  let maxBottom = 500;
  cards.forEach(c => {
    const bottom = parseInt(c.style.top||0) + c.offsetHeight + 40;
    if (bottom>maxBottom) maxBottom=bottom;
  });
  board.style.minHeight = maxBottom+'px';
}

// Drag & Drop — funciona en móvil (touch) y desktop (mouse)
function makeDraggable(card, tarea) {
  let startX, startY, startLeft, startTop, isDragging=false;

  function onStart(clientX, clientY) {
    isDragging = false;
    startX=clientX; startY=clientY;
    startLeft=parseInt(card.style.left||0);
    startTop=parseInt(card.style.top||0);
    card.style.zIndex=99;
  }
  function onMove(clientX, clientY) {
    const dx=clientX-startX, dy=clientY-startY;
    if (!isDragging && Math.abs(dx)<4 && Math.abs(dy)<4) return;
    isDragging=true;
    card.classList.add('dragging');
    const board=document.getElementById('tareas-board');
    const rect=board.getBoundingClientRect();
    let newLeft=startLeft+dx, newTop=startTop+dy;
    newLeft=Math.max(0,Math.min(newLeft,board.offsetWidth-card.offsetWidth));
    newTop=Math.max(0,newTop);
    card.style.left=newLeft+'px'; card.style.top=newTop+'px';
  }
  function onEnd() {
    card.classList.remove('dragging');
    card.style.zIndex='';
    if (isDragging) {
      const tareas=DB.getTareas().map(t2=>t2.id===tarea.id?{...t2,x:parseInt(card.style.left),y:parseInt(card.style.top)}:t2);
      DB.saveTareas(tareas);
      adjustBoardHeight();
    }
    isDragging=false;
  }

  // Mouse
  card.addEventListener('mousedown',e=>{
    if(e.target.closest('.act-btn')) return;
    e.preventDefault(); onStart(e.clientX,e.clientY);
    function mm(ev){onMove(ev.clientX,ev.clientY);}
    function mu(){onEnd();window.removeEventListener('mousemove',mm);window.removeEventListener('mouseup',mu);}
    window.addEventListener('mousemove',mm); window.addEventListener('mouseup',mu);
  });

  // Touch
  card.addEventListener('touchstart',e=>{
    if(e.target.closest('.act-btn')) return;
    const t0=e.touches[0]; onStart(t0.clientX,t0.clientY);
  },{passive:true});
  card.addEventListener('touchmove',e=>{
    const t0=e.touches[0]; onMove(t0.clientX,t0.clientY);
    if(isDragging) e.preventDefault();
  },{passive:false});
  card.addEventListener('touchend',()=>onEnd());
}

function crearTarea() {
  const titulo=document.getElementById('input-tarea-titulo').value.trim();
  const desc=document.getElementById('input-tarea-desc').value.trim();
  const fecha=document.getElementById('input-tarea-fecha').value;
  const hora=document.getElementById('input-tarea-hora').value;
  if (!titulo){showToast(t('toast_nombre_requerido'));return;}
  const tareas=DB.getTareas();
  // Posición escalonada para que no se amontonen
  const offset=(tareas.length%5)*30;
  tareas.push({id:uid(),titulo,desc,fecha,hora,color:selectedTareaColor,x:20+offset,y:20+offset});
  DB.saveTareas(tareas);
  document.getElementById('input-tarea-titulo').value='';
  document.getElementById('input-tarea-desc').value='';
  document.getElementById('input-tarea-fecha').value='';
  document.getElementById('input-tarea-hora').value='';
  selectedTareaColor = TAREA_COLORS[0];
  closeModal('modal-nueva-tarea');
  renderTareas();
  showToast(t('toast_tarea_creada'));
}

function abrirEdicionTarea(id) {
  const tarea=DB.getTareas().find(t2=>t2.id===id); if(!tarea)return;
  document.getElementById('edit-tarea-id').value=id;
  document.getElementById('edit-tarea-titulo').value=tarea.titulo;
  document.getElementById('edit-tarea-desc').value=tarea.desc||'';
  document.getElementById('edit-tarea-fecha').value=tarea.fecha||'';
  document.getElementById('edit-tarea-hora').value=tarea.hora||'';
  editTareaColor = tarea.color || TAREA_COLORS[0];
  renderColorPicker('edit-tarea-color-picker', editTareaColor, c => editTareaColor = c);
  openModal('modal-editar-tarea');
}

function guardarEdicionTarea() {
  const id=document.getElementById('edit-tarea-id').value;
  const titulo=document.getElementById('edit-tarea-titulo').value.trim();
  const desc=document.getElementById('edit-tarea-desc').value.trim();
  const fecha=document.getElementById('edit-tarea-fecha').value;
  const hora=document.getElementById('edit-tarea-hora').value;
  if (!titulo){showToast(t('toast_nombre_requerido'));return;}
  const tareas=DB.getTareas().map(t2=>t2.id!==id?t2:{...t2,titulo,desc,fecha,hora,color:editTareaColor});
  DB.saveTareas(tareas);
  closeModal('modal-editar-tarea');
  renderTareas();
  showToast(t('toast_guardado'));
}

function eliminarTarea(id) {
  confirmarAccion(t('confirm_elim_tarea'),()=>{
    DB.saveTareas(DB.getTareas().filter(t2=>t2.id!==id));
    renderTareas(); showToast(t('toast_tarea_eliminada'));
  });
}



// ============================================================
// VIEW: HORARIO
// ============================================================
function renderHorario() {
  const data=DB.getHorario();
  const table=document.getElementById('horario-table');
  table.innerHTML='';
  const thead=document.createElement('thead');
  const hr=document.createElement('tr');
  const thC=document.createElement('th'); thC.className='th-corner'; hr.appendChild(thC);
  data.dias.forEach((dia,di)=>{
    const th=document.createElement('th');
    th.innerHTML=`<div class="th-dia-wrap"><input class="horario-header-input" value="${escapeHtml(dia)}" data-col="${di}" /><button class="del-col-btn" data-col="${di}">✕</button></div>`;
    hr.appendChild(th);
  });
  const thAdd=document.createElement('th');
  thAdd.innerHTML=`<button class="add-col-btn">+</button>`;
  hr.appendChild(thAdd);
  thead.appendChild(hr); table.appendChild(thead);

  const tbody=document.createElement('tbody');
  data.rows.forEach((row,ri)=>{
    const tr=document.createElement('tr');
    const tdH=document.createElement('td'); tdH.className='td-hora';
    tdH.innerHTML=`<div class="hora-wrap"><input class="horario-hora-input" value="${escapeHtml(row.hora)}" data-row="${ri}" /><button class="del-row-btn" data-row="${ri}">✕</button></div>`;
    tr.appendChild(tdH);
    data.dias.forEach((dia,di)=>{
      const td=document.createElement('td');
      const ta=document.createElement('textarea');
      ta.className='horario-cell'; ta.value=row.celdas[dia]||''; ta.rows=2; ta.placeholder='···';
      ta.dataset.row=ri; ta.dataset.col=di;
      td.appendChild(ta); tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  const trAdd=document.createElement('tr');
  const tdAdd=document.createElement('td'); tdAdd.colSpan=data.dias.length+2;
  tdAdd.innerHTML=`<button class="add-row-btn">+ ${t('nav_horario')}</button>`;
  trAdd.appendChild(tdAdd); tbody.appendChild(trAdd);
  table.appendChild(tbody);

  table.querySelectorAll('.horario-header-input').forEach(inp=>{
    inp.addEventListener('change',()=>{
      const col=parseInt(inp.dataset.col),old=data.dias[col],nw=inp.value.trim()||old;
      data.dias[col]=nw; data.rows.forEach(r=>{r.celdas[nw]=r.celdas[old]||'';if(nw!==old)delete r.celdas[old];});
      DB.saveHorario(data); renderHorario();
    });
  });
  table.querySelectorAll('.del-col-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const col=parseInt(btn.dataset.col);
      if(data.dias.length<=1){showToast(t('toast_min_dias'));return;}
      confirmarAccion(`${t('confirm_elim_col')} "${data.dias[col]}"?`,()=>{
        const name=data.dias.splice(col,1)[0];
        data.rows.forEach(r=>delete r.celdas[name]);
        DB.saveHorario(data); renderHorario();
      });
    });
  });
  table.querySelector('.add-col-btn').addEventListener('click',()=>{
    const nd=`Día ${data.dias.length+1}`; data.dias.push(nd);
    data.rows.forEach(r=>{r.celdas[nd]='';});
    DB.saveHorario(data); renderHorario(); showToast(t('toast_col_añadida'));
  });
  table.querySelectorAll('.horario-hora-input').forEach(inp=>{
    inp.addEventListener('change',()=>{data.rows[parseInt(inp.dataset.row)].hora=inp.value.trim()||data.rows[parseInt(inp.dataset.row)].hora;DB.saveHorario(data);});
  });
  table.querySelectorAll('.del-row-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const ri=parseInt(btn.dataset.row);
      if(data.rows.length<=1){showToast(t('toast_min_filas'));return;}
      confirmarAccion(`${t('confirm_elim_fila')} "${data.rows[ri].hora}"?`,()=>{data.rows.splice(ri,1);DB.saveHorario(data);renderHorario();});
    });
  });
  table.querySelector('.add-row-btn').addEventListener('click',()=>{
    const nh=`${data.rows.length+8}:00`; const nr={hora:nh,celdas:{}};
    data.dias.forEach(d=>{nr.celdas[d]='';});
    data.rows.push(nr); DB.saveHorario(data); renderHorario(); showToast(t('toast_fila_añadida'));
  });
  table.querySelectorAll('.horario-cell').forEach(cell=>{
    cell.addEventListener('input',()=>{
      const ri=parseInt(cell.dataset.row),di=parseInt(cell.dataset.col);
      data.rows[ri].celdas[data.dias[di]]=cell.value;
      clearTimeout(cell._t); cell._t=setTimeout(()=>DB.saveHorario(data),600);
    });
  });
}

function saveHorario() {
  const data=DB.getHorario();
  document.querySelectorAll('.horario-cell').forEach(cell=>{
    const ri=parseInt(cell.dataset.row),di=parseInt(cell.dataset.col);
    if(data.rows[ri]&&data.dias[di]) data.rows[ri].celdas[data.dias[di]]=cell.value;
  });
  DB.saveHorario(data); showToast(t('toast_horario_guardado'));
}

// ============================================================
// VIEW: AJUSTES
// ============================================================
function renderAjustes() {
  let size=0;
  for(let k in localStorage){if(localStorage.hasOwnProperty(k))size+=(localStorage[k].length+k.length)*2;}
  document.getElementById('storage-size').textContent=`${(size/1024).toFixed(1)} KB`;

  // Color palette
  const palette=document.getElementById('color-palette');
  palette.innerHTML='';
  const current=DB.getAccentColor();
  ACCENT_COLORS.forEach(c=>{
    const btn=document.createElement('button');
    btn.className='color-swatch'+(c.value===current?' active':'');
    btn.style.background=c.value; btn.title=c.name;
    if(c.value===current) btn.innerHTML=`<span class="swatch-check">✓</span>`;
    btn.onclick=()=>{DB.saveAccentColor(c.value);applyAccentColor(c.value);renderAjustes();showToast(t('toast_color')+c.name);};
    palette.appendChild(btn);
  });

  // Lang selector
  document.getElementById('lang-select').value=currentLang;
}

function confirmarBorrado() {
  confirmarAccion(t('confirm_borrar_todo'),()=>{
    localStorage.clear(); showToast(t('toast_datos_eliminados')); navigate('home');
  });
}

// ============================================================
// KEYBOARD shortcuts
// ============================================================
document.getElementById('input-asignatura-nombre').addEventListener('keydown',e=>{if(e.key==='Enter')crearAsignatura();});

// ============================================================
// SIDEBAR toggle (móvil)
// ============================================================
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  if (sb.classList.contains('open')) {
    sb.classList.remove('open');
    ov.classList.remove('show');
  } else {
    sb.classList.add('open');
    ov.classList.add('show');
  }
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'es';
  currentLang = savedLang;
  document.getElementById('lang-select').value = savedLang;
  applyTranslations();
  loadAccentColor();

  // App visible desde el inicio, splash encima como overlay
  const splash = document.getElementById('splash');
  const app = document.getElementById('app');
  app.classList.remove('hidden');

  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => { splash.style.display = 'none'; }, 450);
  }, 1400);

  
});
