// The System — private "Self-Saving System" overlay for SillyTavern.
// Only the user sees it. Nothing is added to the chat or to the character's prompt.
(() => {
'use strict';

const MODULE = 'scum_system';
const ctx = () => SillyTavern.getContext();

/* ------------------------------------------------------------------ i18n */
const I18N = {
en: {
  title: 'System', tab_status: 'Status', tab_missions: 'Missions', tab_shop: 'Shop', tab_world: 'World', tab_settings: 'Settings',
  no_world: 'No world profile is bound to this chat. Open the World tab to create or pick one.',
  bound_to: 'Bound to', evaluate: 'Evaluate last message', thinking: 'The System is thinking…',
  ask_ph: 'Ask the System…', ask_btn: 'Ask', log_empty: 'No notifications yet.',
  reset_state: 'Reset points and log', confirm_reset: 'Reset points, log, missions and inventory for this chat?',
  m_active: 'Active missions', m_history: 'History', no_missions: 'No active missions.', reward: 'Reward',
  complete: 'Complete', abandon: 'Abandon', m_ai: 'Ask for a mission', m_add: 'Add', m_title_ph: 'Mission title', m_reward_ph: 'Reward',
  shop_empty: 'The shop is empty. Add items in the World tab.', buy: 'Buy', inventory: 'Inventory', inv_empty: 'Nothing owned yet.', use: 'Use',
  not_enough: 'Not enough points.', used_item: 'Item used: {item}', bought_item: 'Purchased: {item}',
  active_world: 'World profile for this chat', world_none: '— none (System off for this chat) —',
  new: 'New', dup: 'Save as copy', del: 'Delete', export: 'Export', export_all: 'Export all', import: 'Import',
  confirm_del: 'Delete this world profile?',
  f_name: 'Profile name', f_fandom: 'Fandom / universe', f_character: 'Character you are bound to',
  f_wiki: 'Fandom wiki page URLs (optional, one per line)', f_lore: 'Lorebook source (optional)',
  f_notes: 'Your own notes / description of the world', f_world: 'World & setting',
  f_persona: 'Character persona & canon behaviour', f_plot: 'Original storyline / System goals',
  f_voice: 'System voice & style', f_points: 'Points name',
  f_shop: 'Shop — one per line: name | description | cost', f_missions: 'Starter missions — one per line: title | description | reward',
  fill_ai: 'Fill with AI', overwrite: 'Overwrite fields that are already filled', lore_none: '— none —', refresh: 'Refresh',
  filling: 'Filling profile…', fill_done: 'Profile filled.', fill_unknown: 'The model does not seem to know this franchise reliably. Check the result or add wiki URLs / notes.',
  fill_fail: 'Could not fill the profile: {err}', wiki_fail: 'Could not read wiki page: {url}',
  import_ok: 'Imported {n} profile(s).', import_fail: 'Import failed: invalid file.',
  s_enabled: 'Enable The System', s_lang: 'Interface language', s_outlang: 'System speaks',
  out_ui: 'Same as interface', out_chat: 'Match the chat language', s_opacity: 'Opacity',
  s_profile: 'Connection profile', profile_current: 'Current connection', profile_reload: 'Reload profile list',
  profile_none: 'Connection Manager has no profiles (or is disabled). The current connection is used.',
  profile_reloaded: 'Profiles reloaded: {n}', s_auto: 'Auto-evaluate after each character reply',
  s_ctx: 'Messages sent as context', s_strict: 'Strictness', gentle: 'Gentle', normal: 'Normal', harsh: 'Harsh',
  s_fab: 'Show floating button', s_toast: 'Show pop-up notifications', open_btn: 'Open System',
  welcome: 'Ding! Binding complete. Host is bound to "{char}". Starting balance: {pts} {pn}. Deviating from the setting will be punished.',
  zero: '{pn} reached 0. Penalty protocol engaged. Return to the setting immediately.',
  err: 'System error: {err}', need_msg: 'There is no player message to evaluate yet.',
  asked: 'You', default_voice: 'cold, mechanical, slightly sarcastic game-system narrator',
  def_pn: 'B-Points', new_world: 'New world',
  diag: 'Diagnostics', diag_run: 'Run diagnostics', diag_copy: 'Copy report', diag_copied: 'Report copied.', diag_running: 'Running checks…',
  diag_hint: 'Run the checks, then copy the report and send it to whoever helps you debug.', diag_reset_fab: 'Reset button position',
  sec_source: 'Sources', sec_profile: 'Profile', sec_shop: 'Shop & missions', st_missions: 'Missions', st_items: 'Items', st_last: 'Last verdict',
  v_in_character: 'In character', v_ooc: 'OOC', v_none: '—', parse_fallback: 'The model did not return valid JSON; showing its raw reply.',
  no_world_dot: 'No world bound to this chat', s_fabsize: 'Button size',
  online: 'System online', foot_wait: 'Awaiting binding', save_note: 'Changes save automatically. Points, missions and items are kept separately for each profile in this chat.',
  mode_label: 'Role', mode_canon: 'Canon character', mode_oc: 'Original character', bound_to_oc: 'Playing as (original character)',
  f_character_oc: 'Your original character (name)', f_persona_oc: 'OC personality, background & behaviour', f_plot_oc: "The OC's own story & goals in this fandom",
  f_notes_oc: 'Describe your OC (appearance, past, traits, secrets)', f_entry: 'Entry point in the canon timeline (when / where they appear)',
  welcome_oc: 'Ding! Binding complete. Host is inserted as the original character "{char}". Starting balance: {pts} {pn}. Stay true to this character and the world.',
  sec_chat: 'In-chat popup', s_chatpop: 'Show System popups in the chat', s_chatplace: 'Popup placement', place_top: 'Top of the message',
  place_middle: 'Middle of the message', place_bottom: 'Bottom of the message', s_chattarget: 'Attach popup to', target_reply: 'Character reply', target_mine: 'My message',
  s_chatopen: 'Expanded by default', profiles_label: 'Profiles',
  sec_look: 'Appearance', s_blur: 'Background blur', s_round: 'Rounded corners', foot_active: 'System activated',
  sec_avatar: 'Avatar', s_avatar: 'Avatar source', av_persona: 'My persona (active chat)', av_char: 'Chat character', av_custom: 'Custom image',
  av_choose: 'Choose image', av_remove: 'Remove', fab_reset_done: 'Floating button reset.', av_fail: 'Could not load that image.'
},
ru: {
  title: 'Система', tab_status: 'Статус', tab_missions: 'Задания', tab_shop: 'Магазин', tab_world: 'Мир', tab_settings: 'Настройки',
  no_world: 'К этому чату не привязан профиль мира. Откройте вкладку «Мир», чтобы создать или выбрать его.',
  bound_to: 'Привязан к', evaluate: 'Оценить последнее сообщение', thinking: 'Система думает…',
  ask_ph: 'Спросить Систему…', ask_btn: 'Спросить', log_empty: 'Уведомлений пока нет.',
  reset_state: 'Сбросить очки и журнал', confirm_reset: 'Сбросить очки, журнал, задания и инвентарь для этого чата?',
  m_active: 'Активные задания', m_history: 'История', no_missions: 'Активных заданий нет.', reward: 'Награда',
  complete: 'Выполнено', abandon: 'Отказаться', m_ai: 'Запросить задание', m_add: 'Добавить', m_title_ph: 'Название задания', m_reward_ph: 'Награда',
  shop_empty: 'Магазин пуст. Добавьте товары на вкладке «Мир».', buy: 'Купить', inventory: 'Инвентарь', inv_empty: 'Пока ничего нет.', use: 'Применить',
  not_enough: 'Недостаточно очков.', used_item: 'Предмет применён: {item}', bought_item: 'Куплено: {item}',
  active_world: 'Профиль мира для этого чата', world_none: '— нет (Система выключена в этом чате) —',
  new: 'Новый', dup: 'Сохранить копией', del: 'Удалить', export: 'Экспорт', export_all: 'Экспорт всех', import: 'Импорт',
  confirm_del: 'Удалить этот профиль мира?',
  f_name: 'Название профиля', f_fandom: 'Фандом / вселенная', f_character: 'Персонаж, к которому вы привязаны',
  f_wiki: 'Ссылки на страницы вики Fandom (необязательно, по одной в строке)', f_lore: 'Источник — лорбук (необязательно)',
  f_notes: 'Ваши заметки / описание мира', f_world: 'Мир и сеттинг',
  f_persona: 'Характер персонажа и поведение по канону', f_plot: 'Оригинальный сюжет / цели Системы',
  f_voice: 'Голос и стиль Системы', f_points: 'Название очков',
  f_shop: 'Магазин — по одному в строке: название | описание | цена', f_missions: 'Стартовые задания — по одному в строке: название | описание | награда',
  fill_ai: 'Заполнить через ИИ', overwrite: 'Перезаписывать уже заполненные поля', lore_none: '— нет —', refresh: 'Обновить',
  filling: 'Заполняю профиль…', fill_done: 'Профиль заполнен.', fill_unknown: 'Похоже, модель плохо знает эту вселенную. Проверьте результат или добавьте ссылки на вики / заметки.',
  fill_fail: 'Не удалось заполнить профиль: {err}', wiki_fail: 'Не удалось прочитать страницу вики: {url}',
  import_ok: 'Импортировано профилей: {n}.', import_fail: 'Ошибка импорта: неверный файл.',
  s_enabled: 'Включить Систему', s_lang: 'Язык интерфейса', s_outlang: 'Система говорит на языке',
  out_ui: 'Как интерфейс', out_chat: 'Как в чате', s_opacity: 'Прозрачность',
  s_profile: 'Профиль подключения', profile_current: 'Текущее подключение', profile_reload: 'Обновить список профилей',
  profile_none: 'В Connection Manager нет профилей (или он выключен). Используется текущее подключение.',
  profile_reloaded: 'Профилей загружено: {n}', s_auto: 'Оценивать автоматически после ответа персонажа',
  s_ctx: 'Сообщений в контексте', s_strict: 'Строгость', gentle: 'Мягкая', normal: 'Обычная', harsh: 'Жёсткая',
  s_fab: 'Показывать плавающую кнопку', s_toast: 'Показывать всплывающие уведомления', open_btn: 'Открыть Систему',
  welcome: 'Дзынь! Привязка завершена. Хост привязан к «{char}». Стартовый баланс: {pts} {pn}. Отклонения от сеттинга будут караться.',
  zero: '{pn} упали до 0. Запущен протокол наказания. Немедленно вернитесь к сеттингу.',
  err: 'Ошибка Системы: {err}', need_msg: 'Пока нет сообщения игрока для оценки.',
  asked: 'Вы', default_voice: 'холодный, механический, слегка саркастичный голос игровой системы',
  def_pn: 'B-очки', new_world: 'Новый мир',
  diag: 'Диагностика', diag_run: 'Запустить диагностику', diag_copy: 'Копировать отчёт', diag_copied: 'Отчёт скопирован.', diag_running: 'Выполняю проверки…',
  diag_hint: 'Запустите проверки, скопируйте отчёт и отправьте тому, кто помогает с отладкой.', diag_reset_fab: 'Сбросить позицию кнопки',
  sec_source: 'Источники', sec_profile: 'Профиль', sec_shop: 'Магазин и задания', st_missions: 'Задания', st_items: 'Предметы', st_last: 'Последний вердикт',
  v_in_character: 'В образе', v_ooc: 'OOC', v_none: '—', parse_fallback: 'Модель не вернула корректный JSON; показан её сырой ответ.',
  no_world_dot: 'К чату не привязан мир', s_fabsize: 'Размер кнопки',
  online: 'Система активна', foot_wait: 'Ожидание привязки', save_note: 'Изменения сохраняются автоматически. Очки, задания и предметы хранятся отдельно для каждого профиля в этом чате.',
  mode_label: 'Роль', mode_canon: 'Канонный персонаж', mode_oc: 'Оригинальный персонаж', bound_to_oc: 'Играете за (оригинального персонажа)',
  f_character_oc: 'Ваш оригинальный персонаж (имя)', f_persona_oc: 'Характер, прошлое и поведение ОП', f_plot_oc: 'Собственная история и цели ОП в этом фандоме',
  f_notes_oc: 'Опишите вашего ОП (внешность, прошлое, черты, тайны)', f_entry: 'Точка входа в канонный сюжет (когда / где появляется)',
  welcome_oc: 'Дзынь! Привязка завершена. Хост внедрён как оригинальный персонаж «{char}». Стартовый баланс: {pts} {pn}. Оставайтесь верны этому персонажу и миру.',
  sec_chat: 'Окно в чате', s_chatpop: 'Показывать окна Системы в чате', s_chatplace: 'Расположение окна', place_top: 'Сверху сообщения',
  place_middle: 'В середине сообщения', place_bottom: 'Снизу сообщения', s_chattarget: 'Прикреплять окно к', target_reply: 'Ответу персонажа', target_mine: 'Моему сообщению',
  s_chatopen: 'Развёрнуто по умолчанию', profiles_label: 'Профили',
  sec_look: 'Оформление', s_blur: 'Размытие фона', s_round: 'Скруглённые углы', foot_active: 'Система активирована',
  sec_avatar: 'Аватар', s_avatar: 'Источник аватара', av_persona: 'Моя персона (активный чат)', av_char: 'Персонаж чата', av_custom: 'Своё изображение',
  av_choose: 'Выбрать изображение', av_remove: 'Удалить', fab_reset_done: 'Плавающая кнопка сброшена.', av_fail: 'Не удалось загрузить изображение.'
}
};
function t(k, v) {
  const l = S().lang;
  let s = (I18N[l] && I18N[l][k]) ?? I18N.en[k] ?? k;
  if (v) for (const x in v) s = s.replaceAll('{' + x + '}', v[x]);
  return s;
}

/* ------------------------------------------------------------ debug store */
const VERSION = '1.3.0';
const dbg = { events: {}, errors: [], lastSkip: '', lastRaw: '', lastRawAt: 0, listeners: false, buildSteps: [] };
function logErr(where, e) {
  const msg = (e && (e.stack || e.message)) || String(e);
  dbg.errors.push({ time: Date.now(), where, msg: String(msg).slice(0, 600) });
  if (dbg.errors.length > 30) dbg.errors.shift();
  console.error('[System]', where, e);
}
const hit = (name) => { dbg.events[name] = { n: (dbg.events[name]?.n || 0) + 1, last: Date.now() }; };

/* -------------------------------------------------------------- settings */
const DEFAULTS = {
  enabled: true, lang: 'en', outLang: 'ui', opacity: 0.95, profileId: '', autoEval: true,
  ctxMessages: 6, strict: 'normal', showFab: true, toasts: true, open: false, tab: 'status',
  fabPos: null, fabSize: 38, chatPopup: true, chatPlace: 'bottom', chatTarget: 'reply', chatOpen: false, blur: 8, rounded: false, avatarMode: 'persona', avatarCustom: '', worlds: []
};
function S() {
  const { extensionSettings } = ctx();
  if (!extensionSettings[MODULE]) extensionSettings[MODULE] = {};
  const s = extensionSettings[MODULE];
  for (const k in DEFAULTS) if (s[k] === undefined) s[k] = structuredClone(DEFAULTS[k]);
  return s;
}
const save = () => { try { ctx().saveSettingsDebounced(); } catch (e) { logErr('saveSettings', e); } };

const blankState = () => ({ points: 100, log: [], missions: [], inventory: [], lastUserIdx: -1 });
/* Chat metadata root: { worldId, states: { [worldId]: progress } } — every profile keeps its own progress in this chat. */
function META() {
  const md = ctx().chatMetadata;
  if (!md) return null;
  let m = md[MODULE];
  if (!m) m = md[MODULE] = { worldId: '', states: {} };
  if (!m.states) { // migrate the old flat format
    const old = { points: m.points ?? 100, log: m.log || [], missions: m.missions || [], inventory: m.inventory || [], lastUserIdx: m.lastUserIdx ?? -1 };
    md[MODULE] = m = { worldId: m.worldId || '', states: m.worldId ? { [m.worldId]: old } : {} };
  }
  return m;
}
/* Progress of the currently bound profile in this chat (null when none is bound). */
function CS() {
  const m = META();
  if (!m || !m.worldId) return null;
  return m.states[m.worldId] || (m.states[m.worldId] = blankState());
}
function saveChat() {
  const c = ctx();
  try { (c.saveMetadataDebounced || c.saveMetadata)(); } catch (e) { console.warn('[System] save failed', e); }
}
const uid = (p = 'x') => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

function newWorld(over = {}) {
  return Object.assign({
    id: uid('w'), name: t('new_world'), mode: 'canon', entry: '', fandom: '', character: '', wikiUrls: '', lorebook: '', notes: '',
    world: '', persona: '', plot: '', systemVoice: '', pointName: t('def_pn'), shopText: '', missionsText: ''
  }, over);
}
function currentWorld() {
  const m = META();
  if (!m || !m.worldId) return null;
  return S().worlds.find((w) => w.id === m.worldId) || null;
}

/* ------------------------------------------------------------ text utils */
const parseLines = (txt) => String(txt || '').split('\n').map((l) => l.trim()).filter(Boolean).map((l) => l.split('|').map((x) => x.trim()));
const parseShop = (txt) => parseLines(txt).map((p) => ({ name: p[0], desc: p[1] || '', cost: parseInt(p[2]) || 50 }));
const parseMissions = (txt) => parseLines(txt).map((p) => ({ title: p[0], desc: p[1] || '', reward: parseInt(p[2]) || 50 }));

function cleanText(s) {
  return String(s ?? '').replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<thinking>[\s\S]*?<\/thinking>/gi, '').trim();
}
function extractJSON(text) {
  let s = cleanText(text).replace(/```json|```/gi, '');
  const a = s.indexOf('{'), b = s.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  try { return JSON.parse(s.slice(a, b + 1)); } catch { return null; }
}
function langInstruction() {
  const s = S();
  if (s.outLang === 'en') return 'Write all text in English.';
  if (s.outLang === 'ru') return 'Write all text in Russian.';
  if (s.outLang === 'chat') return 'Write all text in the same language as the recent chat messages.';
  return s.lang === 'ru' ? 'Write all text in Russian.' : 'Write all text in English.';
}

/* ------------------------------------------------------------------- LLM */
function getProfiles() {
  const p = ctx().extensionSettings?.connectionManager?.profiles;
  return Array.isArray(p) ? p : [];
}
async function llm(system, user, maxTokens = 900) {
  const out = await llmInner(system, user, maxTokens);
  dbg.lastRaw = out; dbg.lastRawAt = Date.now();
  return out;
}
async function llmInner(system, user, maxTokens) {
  const c = ctx(), s = S();
  if (s.profileId && c.ConnectionManagerRequestService && getProfiles().some((p) => p.id === s.profileId)) {
    const r = await c.ConnectionManagerRequestService.sendRequest(
      s.profileId, [{ role: 'system', content: system }, { role: 'user', content: user }], maxTokens);
    return cleanText(r?.content);
  }
  let r = '';
  try { r = await c.generateRaw({ prompt: user, systemPrompt: system, responseLength: maxTokens }); }
  catch (e) { logErr('generateRaw(object form)', e); }
  if (!r) r = await c.generateRaw(user, null, false, false, system, maxTokens); // legacy signature
  return cleanText(r);
}

/* ----------------------------------------------------------- sources */
function getLorebookNames() {
  const c = ctx();
  if (Array.isArray(c.world_names) && c.world_names.length) return c.world_names;
  const names = [];
  $('#world_editor_select option').each(function () { const v = $(this).text().trim(); if ($(this).val() !== '' && v) names.push(v); });
  return names;
}
async function readLorebook(name) {
  if (!name) return '';
  try {
    const data = await ctx().loadWorldInfo(name);
    const entries = Object.values(data?.entries || {}).filter((e) => !e.disable);
    let out = '';
    for (const e of entries) {
      const key = (e.comment || (e.key || []).join(', ') || '').trim();
      out += `[${key}] ${String(e.content || '').trim()}\n`;
      if (out.length > 9000) break;
    }
    return out.slice(0, 9000);
  } catch (e) { console.warn('[System] lorebook read failed', e); return ''; }
}
async function readWiki(urls) {
  let out = '';
  for (const raw of String(urls || '').split('\n').map((x) => x.trim()).filter(Boolean)) {
    try {
      const u = new URL(raw);
      const m = u.pathname.match(/^(\/[a-z-]{2,5})?\/wiki\/(.+)$/i);
      if (!u.hostname.endsWith('fandom.com') || !m) throw new Error('bad url');
      const api = `${u.origin}${m[1] || ''}/api.php?action=parse&page=${encodeURIComponent(decodeURIComponent(m[2]))}&prop=text&format=json&redirects=1&origin=*`;
      const j = await (await fetch(api)).json();
      const html = j?.parse?.text?.['*'];
      if (!html) throw new Error('empty');
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('script,style,table,.toc,.reference,sup').forEach((n) => n.remove());
      const text = [...doc.querySelectorAll('h2,h3,p,li')].map((n) => n.textContent.trim()).filter(Boolean).join('\n');
      out += `--- ${decodeURIComponent(m[2])} ---\n${text.slice(0, 5000)}\n`;
    } catch (e) {
      window.toastr?.warning(t('wiki_fail', { url: raw }));
    }
    if (out.length > 10000) break;
  }
  return out.slice(0, 10000);
}

/* --------------------------------------------------------- chat context */
function lastUserIndex() {
  const chat = ctx().chat || [];
  for (let i = chat.length - 1; i >= 0; i--) if (chat[i].is_user && !chat[i].is_system) return i;
  return -1;
}
function transcript() {
  const c = ctx();
  const chat = (c.chat || []).map((m, i) => ({ m, i })).filter((x) => !x.m.is_system);
  const lastU = lastUserIndex();
  return chat.slice(-S().ctxMessages).map(({ m, i }) =>
    `${i === lastU ? '>>> ' : ''}${m.name}: ${String(m.mes).replace(/<[^>]+>/g, '').slice(0, 1500)}`).join('\n\n');
}
function systemPrompt(w) {
  const c = ctx(), pn = w.pointName, oc = w.mode === 'oc';
  const strict = {
    gentle: 'Be lenient: small deviations cost little (about -5 to -15) and rewards are modest.',
    normal: 'Be fair: clear OOC acts cost about -15 to -40, good in-character or plot-advancing acts earn about +10 to +40.',
    harsh: 'Be strict: any OOC act costs -20 to -60; rewards are rare and small unless the act is excellent.'
  }[S().strict];
  const job = oc
    ? `Your job, in the manner of the System from "Scum Villain's Self-Saving System": the player is an ORIGINAL CHARACTER, "${w.character}", inserted into this fandom${w.entry ? ' (entry point: ' + w.entry + ')' : ''}. Keep the player consistent with this character's established personality and own story. Reward in-character behaviour and choices that advance the character's own storyline and respect the logic of the world with ${pn}; punish out-of-character (OOC) behaviour for THIS character and actions that break the world's rules or logic by deducting ${pn}; hand out missions that move the original character's story and let it intersect with canon characters and events. Canon characters and events are real constraints, but the character may change them with believable consequences.`
    : `Your job, in the manner of the System from "Scum Villain's Self-Saving System": make the player behave as the bound character "${w.character}" would. Reward in-character behaviour and advancing the original storyline with ${pn}; punish out-of-character (OOC) behaviour and plot deviations by deducting ${pn}; hand out missions.`;
  return `You are THE SYSTEM, an invisible game-like interface bound to the player ("${c.name1}") in a roleplay. Only the player can perceive you. Characters in the story are completely unaware of you: never address them and never write as if they could hear you.
${job}
Fandom / universe: ${w.fandom || 'original world'}
World & setting: ${w.world || 'n/a'}
${oc ? 'Original character persona, background & behaviour' : 'Character persona & canon behaviour'}: ${w.persona || 'n/a'}
${oc ? "The original character's own story & goals" : 'Original storyline / System goals'}: ${w.plot || 'n/a'}
Your voice: ${w.systemVoice || t('default_voice')}. Notices are short (1-2 sentences), like 【 ... 】 system notices, but write the text WITHOUT the brackets.
Scoring: ${strict}
${langInstruction()}`;
}

/* ---------------------------------------------------------------- state */
let busy = false, askDraft = '', overwrite = false;

let attachIdx = -1; // chat message index that new notices belong to (set while evaluating)
function pushLog(cs, e) {
  if (attachIdx >= 0 && e.kind !== 'ask' && e.mes === undefined) e.mes = attachIdx;
  cs.log.push(Object.assign({ time: Date.now() }, e));
  if (cs.log.length > 200) cs.log.splice(0, cs.log.length - 200);
}
function notify(text, delta) {
  const s = S();
  $('#svs_fab').addClass('svs-pulse'); setTimeout(() => $('#svs_fab').removeClass('svs-pulse'), 1800);
  if (s.toasts && !s.open && window.toastr) {
    const d = delta ? ` (${delta > 0 ? '+' : ''}${delta})` : '';
    window.toastr.info(`【 ${text} 】${d}`, t('title'));
  }
}
function bindWorld(id) {
  const m = META(); if (!m) return;
  m.worldId = S().worlds.some((x) => x.id === id) ? id : '';
  const w = currentWorld(), cs = CS();
  if (w && cs && cs.log.length === 0) {
    pushLog(cs, { kind: 'info', text: t(w.mode === 'oc' ? 'welcome_oc' : 'welcome', { char: w.character || w.name, pts: cs.points, pn: w.pointName }) });
    if (!cs.missions.length) parseMissions(w.missionsText).forEach((x) => cs.missions.push({ id: uid('m'), status: 'active', ...x }));
  }
  openMap.clear();
  saveChat(); render();
}

/* ------------------------------------------------------------- evaluate */
function applyResult(w, cs, r) {
  const prev = cs.points;
  const verdict = ['in_character', 'ooc', 'neutral'].includes(r.verdict) ? r.verdict : 'neutral';
  let delta = clamp(Math.round(Number(r.delta) || 0), -100, 100);
  if (verdict === 'ooc' && delta > 0) delta = -delta;
  if (verdict === 'in_character' && delta < 0) delta = -delta;
  if (verdict === 'neutral') delta = 0;
  cs.points = Math.max(0, cs.points + delta);
  if (r.message) { pushLog(cs, { kind: verdict, text: String(r.message), delta }); notify(String(r.message), delta); }
  for (const u of Array.isArray(r.missions) ? r.missions : []) {
    const m = cs.missions.find((x) => x.id === u.id && x.status === 'active');
    if (!m) continue;
    if (u.status === 'done') completeMission(m, true);
    else if (u.status === 'failed') m.status = 'failed';
  }
  const nm = r.new_mission;
  if (nm && nm.title) addMission(cs, nm);
  if (cs.points === 0 && prev > 0) pushLog(cs, { kind: 'ooc', text: t('zero', { pn: w.pointName }) });
}
function addMission(cs, nm) {
  const m = { id: uid('m'), status: 'active', title: String(nm.title), desc: String(nm.desc || ''), reward: parseInt(nm.reward) || 50 };
  cs.missions.push(m);
  pushLog(cs, { kind: 'info', text: `${m.title}${m.desc ? ' — ' + m.desc : ''}` });
  notify(m.title);
}
function completeMission(m, silent) {
  const cs = CS(), w = currentWorld();
  m.status = 'done';
  cs.points += m.reward;
  pushLog(cs, { kind: 'reward', text: `${m.title}`, delta: m.reward });
  if (silent) notify(m.title, m.reward);
}

async function evaluate(manual) {
  const s = S(), w = currentWorld(), cs = CS();
  if (!s.enabled) { dbg.lastSkip = 'extension disabled'; return; }
  if (busy) { dbg.lastSkip = 'already busy'; return; }
  if (!META()) { dbg.lastSkip = 'no chat metadata (no chat open?)'; return; }
  if (!w || !cs) { dbg.lastSkip = 'no world profile bound to this chat'; return; }
  const idx = lastUserIndex();
  if (idx < 0) { dbg.lastSkip = 'no user message in chat'; if (manual) window.toastr?.warning(t('need_msg')); return; }
  if (!manual && cs.lastUserIdx === idx) { dbg.lastSkip = 'this user message was already evaluated'; return; }
  dbg.lastSkip = '';
  busy = true; render();
  try {
    const missions = cs.missions.filter((m) => m.status === 'active')
      .map((m) => `- [${m.id}] ${m.title}: ${m.desc} (${t('reward')} ${m.reward})`).join('\n') || '(none)';
    const user = `Current ${w.pointName}: ${cs.points}
Active missions:
${missions}

Recent chat (the player's latest message is marked with >>>):
${transcript()}

Evaluate ONLY the player's latest message (>>>), using the character's reply as context. Respond with ONLY a JSON object, no markdown:
{"verdict":"in_character"|"ooc"|"neutral","delta":<integer -60..60>,"message":"<system notice>","missions":[{"id":"<mission id>","status":"done"|"failed"}],"new_mission":null or {"title":"","desc":"","reward":<integer>}}
delta must be 0 for neutral. Offer new_mission only if there are no active missions or the story clearly opens an opportunity.`;
    const raw = await llm(systemPrompt(w), user, 700);
    const r = extractJSON(raw);
    attachIdx = S().chatTarget === 'mine' ? idx : Math.max(0, (ctx().chat || []).length - 1);
    if (!r) {
      if (!raw) throw new Error('empty reply from the model');
      window.toastr?.warning(t('parse_fallback'));
      applyResult(w, cs, { verdict: 'neutral', delta: 0, message: raw.slice(0, 400) });
    } else applyResult(w, cs, r);
    cs.lastUserIdx = idx;
    saveChat();
  } catch (e) {
    logErr('evaluate', e);
    window.toastr?.error(t('err', { err: e.message || e }));
  } finally { attachIdx = -1; busy = false; render(); }
}

async function askSystem() {
  const w = currentWorld(), cs = CS(), q = askDraft.trim();
  if (!w || !cs || !q || busy) return;
  busy = true; askDraft = ''; render();
  try {
    const user = `Current ${w.pointName}: ${cs.points}
Recent chat:
${transcript()}

The player asks you privately: "${q}"
Answer in your voice in at most 3 sentences. You may hint at how the bound character would act. Plain text only.`;
    const a = await llm(systemPrompt(w), user, 400);
    pushLog(cs, { kind: 'ask', q, text: a });
    saveChat();
  } catch (e) { logErr('ask', e); window.toastr?.error(t('err', { err: e.message || e })); }
  finally { busy = false; render(); }
}

async function aiMission() {
  const w = currentWorld(), cs = CS();
  if (!w || !cs || busy) return;
  busy = true; render();
  try {
    const have = cs.missions.filter((m) => m.status === 'active').map((m) => m.title).join('; ') || '(none)';
    const user = `Recent chat:\n${transcript()}\n\nExisting active missions: ${have}\nIssue ONE new mission fitting the story and the bound character. Respond with ONLY JSON: {"title":"","desc":"","reward":<integer 20..200>}`;
    const r = extractJSON(await llm(systemPrompt(w), user, 400));
    if (!r || !r.title) throw new Error('bad JSON from model');
    addMission(cs, r); saveChat();
  } catch (e) { logErr('aiMission', e); window.toastr?.error(t('err', { err: e.message || e })); }
  finally { busy = false; render(); }
}

/* -------------------------------------------------------- AI profile fill */
async function fillWorld() {
  const w = currentWorld();
  if (!w || busy) return;
  busy = true; render();
  window.toastr?.info(t('filling'));
  try {
    const [wiki, lore] = await Promise.all([readWiki(w.wikiUrls), readLorebook(w.lorebook)]);
    const system = 'You are a worldbuilding assistant that prepares a profile for a roleplay overlay. Output ONLY one valid JSON object, no markdown, no commentary.';
    const oc = w.mode === 'oc';
    const roleLine = oc
      ? `The player creates an ORIGINAL CHARACTER (not a canon character) who is inserted into this fandom.\nOC name: ${w.character || '(invent a fitting name)'}\nEntry point in the canon timeline: ${w.entry || '(choose a fitting point)'}`
      : `Canon character the player is bound to: ${w.character || '(choose the most fitting protagonist of this universe)'}`;
    const worldHint = oc ? 'setting, factions, rules of the world and the relevant canon timeline around the entry point (max 150 words)' : 'setting, factions, rules of the world (max 150 words)';
    const personaHint = oc ? "the original character's personality, background, speech style, habits, do's and don'ts, built from the user's notes (max 150 words)" : "the character's canon personality, speech style, habits, do's and don'ts (max 150 words)";
    const plotHint = oc ? "the original character's OWN storyline inside this fandom: goals, secrets, conflicts, 3-5 arc beats and how they intersect with key canon events and characters (max 180 words)" : 'key canon storyline beats and what the System wants the player to preserve or achieve (max 150 words)';
    const user = `Fandom / universe: ${w.fandom || '(not given)'}
${roleLine}
User notes: ${w.notes || '(none)'}
${wiki ? `\nWiki excerpts:\n${wiki}\n` : ''}${lore ? `\nLorebook excerpts:\n${lore}\n` : ''}
Use the supplied material first, then your own knowledge. If you do not reliably know this franchise and no material was given, set "known": false and keep fields short and based only on the notes. Do not invent canon facts.
${langInstruction()}
Return JSON with these keys:
{"known":true|false,"character":"","world":"${worldHint}","persona":"${personaHint}","plot":"${plotHint}",${oc ? '"entry":"where and when in the canon timeline the character enters (1-2 sentences)",' : ''}"systemVoice":"how the System talks (one sentence)","pointName":"short name for the points","shop":[{"name":"","desc":"","cost":<int>}],"missions":[{"title":"","desc":"","reward":<int>}]}
Give 4-6 shop items and 3 starter missions.`;
    const r = extractJSON(await llm(system, user, 1800));
    if (!r) throw new Error('bad JSON from model');
    const put = (k, v) => { if (v && (overwrite || !String(w[k] || '').trim())) w[k] = String(v); };
    put('character', r.character); put('entry', r.entry); put('world', r.world); put('persona', r.persona); put('plot', r.plot);
    put('systemVoice', r.systemVoice);
    if (r.pointName && (overwrite || !w.pointName || w.pointName === I18N.en.def_pn || w.pointName === I18N.ru.def_pn)) w.pointName = String(r.pointName);
    if (Array.isArray(r.shop)) put('shopText', r.shop.map((x) => `${x.name} | ${x.desc || ''} | ${parseInt(x.cost) || 50}`).join('\n'));
    if (Array.isArray(r.missions)) put('missionsText', r.missions.map((x) => `${x.title} | ${x.desc || ''} | ${parseInt(x.reward) || 50}`).join('\n'));
    save();
    if (r.known === false) window.toastr?.warning(t('fill_unknown')); else window.toastr?.success(t('fill_done'));
  } catch (e) {
    logErr('fillWorld', e);
    window.toastr?.error(t('fill_fail', { err: e.message || e }));
  } finally { busy = false; render(); }
}

/* ---------------------------------------------------------- import/export */
function download(name, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
}
function importWorlds(text) {
  try {
    const j = JSON.parse(text);
    const list = Array.isArray(j) ? j : Array.isArray(j.worlds) ? j.worlds : (j && typeof j === 'object' ? [j] : []);
    const ok = list.filter((x) => x && typeof x === 'object' && ('character' in x || 'world' in x || 'name' in x));
    if (!ok.length) throw new Error('empty');
    ok.forEach((x) => S().worlds.push(newWorld({ ...x, id: uid('w') })));
    save();
    window.toastr?.success(t('import_ok', { n: ok.length }));
    render();
  } catch { window.toastr?.error(t('import_fail')); }
}
async function confirmBox(msg) {
  const c = ctx();
  if (c.callGenericPopup && c.POPUP_TYPE) return !!(await c.callGenericPopup(msg, c.POPUP_TYPE.CONFIRM));
  return confirm(msg);
}

/* ------------------------------------------------------------------ views */
const openSecs = { src: true, prof: true, shop: false };
const ICON = { in_character: 'fa-circle-check', ooc: 'fa-triangle-exclamation', reward: 'fa-gift', info: 'fa-circle-info', ask: 'fa-comment-dots', neutral: 'fa-minus' };
const TAB_ICON = { status: 'fa-gauge-high', missions: 'fa-list-check', shop: 'fa-store', world: 'fa-globe', settings: 'fa-sliders', diag: 'fa-stethoscope' };
const hhmm = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function opSlider() {
  return `<input type="range" class="svs-op" min="25" max="100" value="${Math.round(S().opacity * 100)}" aria-label="${t('s_opacity')}">`;
}
function chipsHtml() {
  const s = S(), m = META();
  if (!s.worlds.length) return '';
  return `<div class="svs-chips" aria-label="${t('profiles_label')}">${s.worlds.map((x) => {
    const st = m && m.states && m.states[x.id];
    return `<button class="svs-chip-btn ${m && x.id === m.worldId ? 'on' : ''}" data-act="w-switch" data-id="${x.id}"><span>${esc(x.name)}</span>${st ? `<em>${st.points}</em>` : ''}</button>`;
  }).join('')}<button class="svs-chip-btn add" data-act="w-new" aria-label="${t('new')}"><i class="fa-solid fa-plus"></i></button></div>`;
}
function ring(points) {
  const C = 2 * Math.PI * 52, ratio = clamp(points / Math.max(200, points), 0, 1);
  const tone = points < 20 ? 'low' : points < 60 ? 'mid' : 'hi';
  return `<div class="svs-ring ${tone}"><svg viewBox="0 0 120 120"><circle class="rb" cx="60" cy="60" r="52"/><circle class="rf" cx="60" cy="60" r="52" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - ratio)).toFixed(1)}" transform="rotate(-90 60 60)"/></svg><div class="svs-ringnum">${points}</div></div>`;
}
const noWorld = () => `${chipsHtml()}<div class="svs-empty big"><i class="fa-solid fa-link-slash"></i><p>${t('no_world')}</p>
  <button class="svs-btn svs-primary" data-act="tab" data-tab="world"><i class="fa-solid fa-globe"></i> ${t('tab_world')}</button></div>`;

function viewStatus() {
  const w = currentWorld(), cs = CS();
  if (!w || !cs) return noWorld();
  const log = [...cs.log].reverse().map((e) => {
    const k = ICON[e.kind] ? e.kind : 'info';
    const d = e.delta ? `<span class="svs-delta ${e.delta > 0 ? 'pos' : 'neg'}">${e.delta > 0 ? '+' : ''}${e.delta}</span>` : '';
    const q = e.kind === 'ask' ? `<div class="svs-q">${t('asked')}: ${esc(e.q)}</div>` : '';
    return `<div class="svs-note k-${k}"><div class="svs-ni"><i class="fa-solid ${ICON[k]}"></i></div>
      <div class="svs-nb">${q}<div class="svs-msg">【 ${esc(e.text)} 】</div><div class="svs-time">${hhmm(e.time)}</div></div>${d}</div>`;
  }).join('') || `<div class="svs-empty"><p>${t('log_empty')}</p></div>`;
  const last = [...cs.log].reverse().find((e) => e.kind === 'in_character' || e.kind === 'ooc');
  const lastTxt = last ? (last.kind === 'ooc' ? t('v_ooc') : t('v_in_character')) : t('v_none');
  const nAct = cs.missions.filter((m) => m.status === 'active').length;
  return `
  ${chipsHtml()}<div class="svs-hero">
    <div class="svs-badge"><b>${esc((w.character || w.name || '?').trim().charAt(0).toUpperCase())}</b>${avatarUrl() ? `<img src="${esc(avatarUrl())}" alt="" onerror="this.style.display='none'">` : ''}</div>
    <div class="svs-herotxt"><small>${t(w.mode === 'oc' ? 'bound_to_oc' : 'bound_to')}</small><b>${esc(w.character || w.name)}</b><small>${esc(w.fandom)}</small></div>
  </div>
  <div class="svs-dash">
    ${ring(cs.points)}
    <div class="svs-stats">
      <div class="svs-unit">${esc(w.pointName)}</div>
      <div class="svs-stat"><span>${t('st_missions')}</span><b>${nAct}</b></div>
      <div class="svs-stat"><span>${t('st_items')}</span><b>${cs.inventory.length}</b></div>
      <div class="svs-stat"><span>${t('st_last')}</span><b class="${last ? (last.kind === 'ooc' ? 'neg' : 'pos') : ''}">${lastTxt}</b></div>
    </div>
  </div>
  <button class="svs-btn svs-primary wide" data-act="eval" ${busy ? 'disabled' : ''}><i class="fa-solid ${busy ? 'fa-circle-notch fa-spin' : 'fa-bolt'}"></i> ${busy ? t('thinking') : t('evaluate')}</button>
  <div class="svs-ask"><input id="svs_ask" type="text" placeholder="${t('ask_ph')}" value="${esc(askDraft)}"><button class="svs-btn icon" data-act="ask" ${busy ? 'disabled' : ''} aria-label="${t('ask_btn')}"><i class="fa-solid fa-paper-plane"></i></button></div>
  <div class="svs-log">${log}</div>
  <button class="svs-btn ghost svs-danger wide" data-act="reset"><i class="fa-solid fa-rotate-left"></i> ${t('reset_state')}</button>`;
}
function viewMissions() {
  const w = currentWorld(), cs = CS();
  if (!w || !cs) return noWorld();
  const act = cs.missions.filter((m) => m.status === 'active');
  const hist = cs.missions.filter((m) => m.status !== 'active').reverse();
  const card = (m, a) => `<div class="svs-card ${a ? '' : 'dim'}"><div class="svs-cardhead"><b>${esc(m.title)}</b>
      <span class="svs-chip gold"><i class="fa-solid fa-coins"></i> ${m.reward}</span></div>
      ${m.desc ? `<p>${esc(m.desc)}</p>` : ''}
      <div class="svs-cardrow">${a ? `<button class="svs-btn sm" data-act="m-done" data-id="${m.id}"><i class="fa-solid fa-check"></i> ${t('complete')}</button>
      <button class="svs-btn sm ghost svs-danger" data-act="m-drop" data-id="${m.id}">${t('abandon')}</button>`
        : `<span class="svs-st-${m.status}"><i class="fa-solid ${m.status === 'done' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i></span>`}</div></div>`;
  return `
  <div class="svs-h">${t('m_active')} <span class="svs-count">${act.length}</span></div>
  ${act.map((m) => card(m, true)).join('') || `<div class="svs-empty"><i class="fa-regular fa-flag"></i><p>${t('no_missions')}</p></div>`}
  <button class="svs-btn svs-primary wide" data-act="m-ai" ${busy ? 'disabled' : ''}><i class="fa-solid ${busy ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'}"></i> ${busy ? t('thinking') : t('m_ai')}</button>
  <div class="svs-ask"><input id="svs_mt" type="text" placeholder="${t('m_title_ph')}"><input id="svs_mr" type="number" class="svs-narrow" placeholder="${t('m_reward_ph')}"><button class="svs-btn icon" data-act="m-add" aria-label="${t('m_add')}"><i class="fa-solid fa-plus"></i></button></div>
  ${hist.length ? `<div class="svs-h">${t('m_history')} <span class="svs-count">${hist.length}</span></div>${hist.map((m) => card(m, false)).join('')}` : ''}`;
}
function viewShop() {
  const w = currentWorld(), cs = CS();
  if (!w || !cs) return noWorld();
  const items = parseShop(w.shopText);
  const shop = items.map((it, i) => `<div class="svs-card"><div class="svs-cardhead"><b>${esc(it.name)}</b>
    <span class="svs-chip gold"><i class="fa-solid fa-coins"></i> ${it.cost}</span></div>${it.desc ? `<p>${esc(it.desc)}</p>` : ''}
    <div class="svs-cardrow"><button class="svs-btn sm" data-act="buy" data-i="${i}" ${cs.points < it.cost ? 'disabled' : ''}><i class="fa-solid fa-cart-shopping"></i> ${t('buy')}</button></div></div>`).join('')
    || `<div class="svs-empty"><i class="fa-solid fa-store-slash"></i><p>${t('shop_empty')}</p></div>`;
  const inv = cs.inventory.map((it, i) => `<div class="svs-card"><div class="svs-cardhead"><b>${esc(it.name)}</b></div>${it.desc ? `<p>${esc(it.desc)}</p>` : ''}
    <div class="svs-cardrow"><button class="svs-btn sm ghost" data-act="use" data-i="${i}">${t('use')}</button></div></div>`).join('')
    || `<div class="svs-empty"><i class="fa-solid fa-box-open"></i><p>${t('inv_empty')}</p></div>`;
  return `<div class="svs-wallet"><i class="fa-solid fa-coins"></i><b>${cs.points}</b><span>${esc(w.pointName)}</span></div>${shop}
    <div class="svs-h">${t('inventory')} <span class="svs-count">${cs.inventory.length}</span></div>${inv}`;
}
function viewWorld() {
  const s = S(), cs = CS(), w = currentWorld();
  const opts = `<option value="">${t('world_none')}</option>` + s.worlds.map((x) => `<option value="${x.id}" ${META() && x.id === META().worldId ? 'selected' : ''}>${esc(x.name)}</option>`).join('');
  const lore = `<option value="">${t('lore_none')}</option>` + getLorebookNames().map((n) => `<option ${w && w.lorebook === n ? 'selected' : ''}>${esc(n)}</option>`).join('');
  const inp = (f, label, ph = '') => `<label>${label}<input type="text" data-field="${f}" value="${esc(w[f])}" placeholder="${ph}"></label>`;
  const ta = (f, label, rows = 3) => `<label>${label}<textarea data-field="${f}" rows="${rows}">${esc(w[f])}</textarea></label>`;
  const oc = !!(w && w.mode === 'oc');
  const sec = (k, icon, title, body) => `<details class="svs-sec" data-sec="${k}" ${openSecs[k] ? 'open' : ''}><summary><i class="fa-solid ${icon}"></i> ${title}</summary><div class="svs-secbody">${body}</div></details>`;
  const editor = w ? `
    ${sec('src', 'fa-book-open', t('sec_source'), `
      <div class="svs-seg" role="radiogroup" aria-label="${t('mode_label')}">
        <button class="${oc ? '' : 'on'}" data-act="w-mode" data-mode="canon"><i class="fa-solid fa-user-check"></i> ${t('mode_canon')}</button>
        <button class="${oc ? 'on' : ''}" data-act="w-mode" data-mode="oc"><i class="fa-solid fa-user-plus"></i> ${t('mode_oc')}</button>
      </div>
      ${inp('fandom', t('f_fandom'), 'Scum Villain, Naruto, Harry Potter…')}
      ${inp('character', oc ? t('f_character_oc') : t('f_character'))}
      ${oc ? inp('entry', t('f_entry')) : ''}
      ${ta('wikiUrls', t('f_wiki'), 2)}
      <label>${t('f_lore')}<span class="svs-inline"><select data-field="lorebook">${lore}</select><button class="svs-btn icon sm" data-act="refresh" title="${t('refresh')}"><i class="fa-solid fa-rotate"></i></button></span></label>
      ${ta('notes', oc ? t('f_notes_oc') : t('f_notes'), oc ? 5 : 3)}
      <label class="svs-switch"><input type="checkbox" id="svs_over" ${overwrite ? 'checked' : ''}><i></i><span>${t('overwrite')}</span></label>
      <button class="svs-btn svs-primary wide" data-act="fill" ${busy ? 'disabled' : ''}><i class="fa-solid ${busy ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'}"></i> ${busy ? t('filling') : t('fill_ai')}</button>`)}
    ${sec('prof', 'fa-id-card', t('sec_profile'), `
      ${inp('name', t('f_name'))}
      ${ta('world', t('f_world'), 4)}
      ${ta('persona', oc ? t('f_persona_oc') : t('f_persona'), 4)}
      ${ta('plot', oc ? t('f_plot_oc') : t('f_plot'), 5)}
      ${inp('systemVoice', t('f_voice'))}
      ${inp('pointName', t('f_points'))}`)}
    ${sec('shop', 'fa-store', t('sec_shop'), `${ta('shopText', t('f_shop'), 4)}${ta('missionsText', t('f_missions'), 4)}`)}` : '';
  return `
  <label>${t('active_world')}<select id="svs_world">${opts}</select></label>
  <div class="svs-btnrow">
    <button class="svs-btn sm" data-act="w-new"><i class="fa-solid fa-plus"></i> ${t('new')}</button>
    <button class="svs-btn sm" data-act="w-dup" ${w ? '' : 'disabled'}><i class="fa-regular fa-copy"></i> ${t('dup')}</button>
    <button class="svs-btn sm" data-act="w-exp" ${w ? '' : 'disabled'}><i class="fa-solid fa-file-export"></i> ${t('export')}</button>
    <button class="svs-btn sm" data-act="w-expall" ${s.worlds.length ? '' : 'disabled'}><i class="fa-solid fa-boxes-packing"></i> ${t('export_all')}</button>
    <button class="svs-btn sm" data-act="w-imp"><i class="fa-solid fa-file-import"></i> ${t('import')}</button>
    <button class="svs-btn sm ghost svs-danger" data-act="w-del" ${w ? '' : 'disabled'}><i class="fa-regular fa-trash-can"></i> ${t('del')}</button>
  </div>
  <small class="svs-hint">${t('save_note')}</small>
  <input type="file" id="svs_file" accept=".json,application/json" hidden>
  ${editor}`;
}
function viewSettings() {
  const s = S(), profiles = getProfiles();
  const popt = `<option value="">${t('profile_current')}</option>` + profiles.map((p) => `<option value="${esc(p.id)}" ${p.id === s.profileId ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
  const sel = (id, val, items) => `<select id="${id}">${items.map(([v, l]) => `<option value="${v}" ${v === val ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const sw = (id, v, l) => `<label class="svs-switch"><input type="checkbox" id="${id}" ${v ? 'checked' : ''}><i></i><span>${l}</span></label>`;
  const av = avatarUrl();
  return `
  ${sw('svs_en', s.enabled, t('s_enabled'))}
  <div class="svs-group">
    <label>${t('s_lang')}${sel('svs_lang', s.lang, [['en', 'English'], ['ru', 'Русский']])}</label>
    <label>${t('s_outlang')}${sel('svs_outlang', s.outLang, [['ui', t('out_ui')], ['en', 'English'], ['ru', 'Русский'], ['chat', t('out_chat')]])}</label>
  </div>
  <div class="svs-group">
    <div class="svs-gh"><i class="fa-solid fa-palette"></i> ${t('sec_look')}</div>
    <label>${t('s_opacity')} <b class="svs-opval">${Math.round(s.opacity * 100)}%</b>${opSlider()}</label>
    <label>${t('s_blur')} <b class="svs-blurval">${s.blur}px</b><input type="range" id="svs_blur" min="0" max="30" value="${s.blur}"></label>
    ${sw('svs_round', s.rounded, t('s_round'))}
    ${sw('svs_fabchk', s.showFab, t('s_fab'))}
    <label>${t('s_fabsize')} <b class="svs-fabval">${s.fabSize}px</b><input type="range" id="svs_fabsize" min="28" max="64" value="${s.fabSize}"></label>
  </div>
  <div class="svs-group">
    <div class="svs-gh"><i class="fa-regular fa-circle-user"></i> ${t('sec_avatar')}</div>
    <label>${t('s_avatar')}${sel('svs_avmode', s.avatarMode, [['persona', t('av_persona')], ['character', t('av_char')], ['custom', t('av_custom')]])}</label>
    <div class="svs-avrow">
      <div class="svs-badge sm"><b>?</b>${av ? `<img src="${esc(av)}" alt="" onerror="this.style.display='none'">` : ''}</div>
      <button class="svs-btn sm" data-act="avatar-pick"><i class="fa-solid fa-image"></i> ${t('av_choose')}</button>
      <button class="svs-btn sm ghost svs-danger" data-act="avatar-clear" ${s.avatarCustom ? '' : 'disabled'}><i class="fa-regular fa-trash-can"></i> ${t('av_remove')}</button>
    </div>
    <input type="file" id="svs_avatar_file" accept="image/*" hidden>
  </div>
  <div class="svs-group">
    <label>${t('s_profile')}<span class="svs-inline"><select id="svs_profile">${popt}</select><button class="svs-btn icon sm" data-act="profiles" title="${t('profile_reload')}"><i class="fa-solid fa-rotate"></i></button></span></label>
    <button class="svs-btn wide" data-act="profiles"><i class="fa-solid fa-rotate"></i> ${t('profile_reload')}</button>
    ${profiles.length ? '' : `<small class="svs-hint">${t('profile_none')}</small>`}
  </div>
  <div class="svs-group">
    ${sw('svs_auto', s.autoEval, t('s_auto'))}
    <label>${t('s_ctx')}<input type="number" id="svs_ctxn" min="2" max="30" value="${s.ctxMessages}"></label>
    <label>${t('s_strict')}${sel('svs_strict', s.strict, [['gentle', t('gentle')], ['normal', t('normal')], ['harsh', t('harsh')]])}</label>
    ${sw('svs_toast', s.toasts, t('s_toast'))}
  </div>
  <div class="svs-group">
    <div class="svs-gh"><i class="fa-regular fa-message"></i> ${t('sec_chat')}</div>
    ${sw('svs_chatpop', s.chatPopup, t('s_chatpop'))}
    <label>${t('s_chatplace')}${sel('svs_chatplace', s.chatPlace, [['top', t('place_top')], ['middle', t('place_middle')], ['bottom', t('place_bottom')]])}</label>
    <label>${t('s_chattarget')}${sel('svs_chattarget', s.chatTarget, [['reply', t('target_reply')], ['mine', t('target_mine')]])}</label>
    ${sw('svs_chatopen', s.chatOpen, t('s_chatopen'))}
  </div>
  <button class="svs-btn wide" data-act="tab" data-tab="diag"><i class="fa-solid fa-stethoscope"></i> ${t('diag')}</button>
  <button class="svs-btn ghost wide" data-act="reset-fab"><i class="fa-solid fa-location-crosshairs"></i> ${t('diag_reset_fab')}</button>`;
}

/* ------------------------------------------------------------ diagnostics */
const diag = { running: false, items: [], at: 0 };
const withTimeout = (p, ms, what) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(what + ' timed out after ' + ms / 1000 + 's')), ms))]);

async function runDiag() {
  if (diag.running) return;
  diag.running = true; diag.items = []; render();
  const items = [];
  const add = (ok, label, detail = '') => items.push({ ok, label, detail });
  const safe = async (label, fn) => { try { await fn(); } catch (e) { add(false, label, String(e?.message || e)); logErr('diag:' + label, e); } };

  await safe('Environment', async () => {
    add(true, 'Extension', `The System v${VERSION} is loaded`);
    add(typeof SillyTavern !== 'undefined' && !!SillyTavern.getContext, 'SillyTavern.getContext()', typeof SillyTavern);
    add(typeof jQuery !== 'undefined', 'jQuery', typeof jQuery);
    add(window.toastr ? true : 'warn', 'toastr (pop-ups)', window.toastr ? 'available' : 'missing');
    add(true, 'Browser', navigator.userAgent.slice(0, 110) + ` · ${innerWidth}×${innerHeight}`);
  });
  await safe('Context', async () => {
    const c = ctx();
    const need = ['eventSource', 'event_types', 'extensionSettings', 'saveSettingsDebounced', 'generateRaw', 'chat', 'name1'];
    const miss = need.filter((k) => c[k] === undefined);
    add(miss.length === 0, 'Context API', miss.length ? 'missing: ' + miss.join(', ') : 'all required members present');
    add(!!(c.saveMetadataDebounced || c.saveMetadata), 'saveMetadata', c.saveMetadataDebounced ? 'debounced' : c.saveMetadata ? 'plain' : 'missing');
    add(!!c.event_types?.CHARACTER_MESSAGE_RENDERED, 'Event CHARACTER_MESSAGE_RENDERED', String(c.event_types?.CHARACTER_MESSAGE_RENDERED));
  });
  await safe('UI', async () => {
    const fab = document.getElementById('svs_fab'), panel = document.getElementById('svs_panel');
    if (!fab) add(false, 'Floating button element', 'not in DOM — buildUI failed (see errors below)');
    else {
      const r = fab.getBoundingClientRect(), cssd = getComputedStyle(fab);
      const inView = r.width > 0 && r.right > 0 && r.bottom > 0 && r.left < innerWidth && r.top < innerHeight;
      add(cssd.display !== 'none' && inView ? true : 'warn', 'Floating button', `display:${cssd.display}, rect ${Math.round(r.left)},${Math.round(r.top)} ${Math.round(r.width)}×${Math.round(r.height)}, z:${cssd.zIndex}${inView ? '' : ' — OFF SCREEN, use "Reset button position"'}`);
    }
    add(!!panel, 'Panel element', panel ? `display:${getComputedStyle(panel).display}` : 'missing');
    add($('#svs_drawer_body').length ? true : 'warn', 'Extensions drawer entry', $('#svs_drawer_body').length ? 'present' : 'missing');
    add($('#svs_wand').length ? true : 'warn', 'Wand menu entry', $('#svs_wand').length ? 'present' : 'missing');
    const hb = getComputedStyle(document.body), hh = getComputedStyle(document.documentElement), pc = panel ? getComputedStyle(panel) : null;
    add(true, 'Layout', `${geom()}; dpr ${devicePixelRatio}; popover ${typeof panel?.showPopover === 'function' ? 'supported' : 'unsupported'}; panel position ${pc?.position}, h ${pc?.height}; body transform ${hb.transform}, zoom ${hb.zoom}/${hh.zoom}; panel parent ${panel?.parentElement?.tagName}`);
    const fr = fab ? fab.getBoundingClientRect() : null;
    const covering = fr ? document.elementFromPoint(fr.left + fr.width / 2, fr.top + fr.height / 2) : null;
    add(fab && covering && (fab === covering || fab.contains(covering)) ? true : fab && getComputedStyle(fab).display === 'none' ? 'warn' : false, 'Floating button hit-test', fab ? (getComputedStyle(fab).display === 'none' ? 'hidden by setting' : (covering && (fab === covering || fab.contains(covering)) ? 'visible and tappable' : 'covered by ' + (covering ? covering.tagName + (covering.id ? '#' + covering.id : '') : 'nothing/off-screen'))) + (dbg.fabFix ? ' · ' + dbg.fabFix : '') : 'missing');
    add(true, 'Look', `blur ${S().blur}px (backdrop-filter ${typeof CSS !== 'undefined' && CSS.supports && CSS.supports('backdrop-filter', 'blur(2px)') ? 'supported' : 'NOT supported'}), rounded ${S().rounded}, avatar ${S().avatarMode} → ${avatarUrl() ? 'found' : 'none'}`);
    const h = hitTest();
    add(h.ok === true ? true : h.ok === null ? 'warn' : false, 'Hit-test (is the panel tappable?)', h.info + (dbg.hitFix ? ' · ' + dbg.hitFix : ''));
    const ev = dbg.events, f = (k) => (ev[k] ? ev[k].n : 0);
    add(f('panel_pointerdown') > 0 ? true : 'warn', 'Taps received by panel', `pointerdown ${f('panel_pointerdown')}, pointerup ${f('panel_pointerup')}, click ${f('panel_click')}, actions fired ${f('action')}`);
    add(dbg.buildSteps.every((x) => x.ok) ? true : false, 'UI build steps', dbg.buildSteps.map((x) => (x.ok ? '✓' : '✗') + x.name).join(' '));
  });
  await safe('Settings', async () => {
    const s = S();
    add(true, 'Settings', `enabled=${s.enabled}, lang=${s.lang}, opacity=${s.opacity}, autoEval=${s.autoEval}, ctx=${s.ctxMessages}, worlds=${s.worlds.length}`);
  });
  await safe('Chat', async () => {
    const c = ctx(), cs = CS(), w = currentWorld();
    add(Array.isArray(c.chat), 'Chat', `${c.chat?.length ?? '?'} messages, user "${c.name1}", character "${c.name2 ?? '?'}"${c.groupId ? ', group chat' : ''}`);
    add(!!META(), 'Chat metadata', META() ? 'available' : 'unavailable — open a chat first');
    add(w ? true : 'warn', 'World bound to this chat', w ? `"${w.name}" · character "${w.character || '(empty)'}" · ${cs.points} ${w.pointName}` : 'NONE — the System stays silent until you pick/create one in the World tab');
    add(true, 'In-chat popups', `${document.querySelectorAll('.' + POP).length} in the DOM · placement ${S().chatPlace} · attach to ${S().chatTarget} · enabled ${S().chatPopup}`);
    add(lastUserIndex() >= 0 ? true : 'warn', 'Player message to evaluate', lastUserIndex() >= 0 ? `index ${lastUserIndex()}, last evaluated ${cs?.lastUserIdx}` : 'no user message yet');
  });
  await safe('Events', async () => {
    const ev = dbg.events, fmt = (k) => ev[k] ? `${ev[k].n}× (last ${hhmm(ev[k].last)})` : 'never fired';
    add(dbg.listeners, 'Event listeners registered', String(dbg.listeners));
    add(true, 'CHARACTER_MESSAGE_RENDERED', fmt('rendered'));
    add(true, 'GENERATION_ENDED', fmt('gen_ended'));
    add(true, 'CHAT_CHANGED', fmt('chat_changed'));
    add(dbg.lastSkip ? 'warn' : true, 'Last auto-evaluation skip reason', dbg.lastSkip || 'none');
  });
  await safe('Connection', async () => {
    const c = ctx(), s = S(), profiles = getProfiles();
    add(!!c.generateRaw, 'generateRaw', typeof c.generateRaw);
    add(c.ConnectionManagerRequestService ? true : 'warn', 'ConnectionManagerRequestService', c.ConnectionManagerRequestService ? 'available' : 'missing (enable the Connection Manager extension)');
    add(profiles.length ? true : 'warn', 'Connection profiles', `${profiles.length} found${profiles.length ? ': ' + profiles.map((p) => p.name).join(', ') : ''}`);
    if (s.profileId) add(profiles.some((p) => p.id === s.profileId) ? true : false, 'Selected profile', profiles.find((p) => p.id === s.profileId)?.name || 'selected profile no longer exists — falls back to current connection');
    else add(true, 'Selected profile', 'current connection');
    add(true, 'Lorebooks visible', String(getLorebookNames().length));
  });
  await safe('Model', async () => {
    const t0 = performance.now();
    try {
      const raw = await withTimeout(llm('You are a connection test endpoint. Output ONLY JSON.', 'Reply with exactly this JSON and nothing else: {"ok":true}', 300), 60000, 'model call');
      const j = extractJSON(raw);
      add(raw ? (j && j.ok ? true : 'warn') : false, 'Model call', `${Math.round(performance.now() - t0)} ms · ${raw ? (j && j.ok ? 'valid JSON' : 'reply is not the expected JSON') : 'EMPTY reply'} · raw: ${JSON.stringify(raw.slice(0, 160))}`);
    } catch (e) { add(false, 'Model call', String(e?.message || e)); logErr('diag:model', e); }
  });
  await safe('Wiki', async () => {
    try {
      const j = await withTimeout(fetch('https://scumvillain.fandom.com/api.php?action=query&meta=siteinfo&format=json&origin=*').then((r) => r.json()), 10000, 'wiki request');
      add(!!j?.query ? true : 'warn', 'Fandom API (CORS)', j?.query ? 'reachable' : 'unexpected response');
    } catch (e) { add('warn', 'Fandom API (CORS)', 'not reachable: ' + (e?.message || e) + ' — wiki URLs will not work; use notes/lorebook instead'); }
  });

  items.push({ ok: dbg.errors.length ? 'warn' : true, label: 'Recorded errors', detail: dbg.errors.length ? dbg.errors.map((e) => `[${hhmm(e.time)}] ${e.where}: ${e.msg.split('\n')[0]}`).join('\n') : 'none' });
  if (dbg.lastRaw) items.push({ ok: true, label: `Last raw model reply (${hhmm(dbg.lastRawAt)})`, detail: dbg.lastRaw.slice(0, 600) });
  diag.items = items; diag.at = Date.now(); diag.running = false; render();
}
function diagText() {
  const mark = (o) => (o === true ? 'OK  ' : o === 'warn' ? 'WARN' : 'FAIL');
  return `The System v${VERSION} diagnostics — ${new Date(diag.at).toISOString()}\n` + diag.items.map((i) => `[${mark(i.ok)}] ${i.label}${i.detail ? ' — ' + i.detail : ''}`).join('\n');
}
function viewDiag() {
  const list = diag.items.map((i) => {
    const k = i.ok === true ? 'ok' : i.ok === 'warn' ? 'warn' : 'fail';
    const ic = { ok: 'fa-circle-check', warn: 'fa-triangle-exclamation', fail: 'fa-circle-xmark' }[k];
    return `<div class="svs-dg ${k}"><i class="fa-solid ${ic}"></i><div><b>${esc(i.label)}</b>${i.detail ? `<pre>${esc(i.detail)}</pre>` : ''}</div></div>`;
  }).join('');
  const nf = diag.items.filter((i) => i.ok === false).length, nw = diag.items.filter((i) => i.ok === 'warn').length;
  return `
  <p class="svs-hint">${t('diag_hint')}</p>
  <button class="svs-btn svs-primary wide" data-act="diag-run" ${diag.running ? 'disabled' : ''}><i class="fa-solid ${diag.running ? 'fa-circle-notch fa-spin' : 'fa-stethoscope'}"></i> ${diag.running ? t('diag_running') : t('diag_run')}</button>
  ${diag.items.length ? `<div class="svs-sum"><span class="fail">${nf} fail</span><span class="warn">${nw} warn</span><span class="ok">${diag.items.length - nf - nw} ok</span></div>
  <div class="svs-dglist">${list}</div>
  <button class="svs-btn wide" data-act="diag-copy"><i class="fa-regular fa-copy"></i> ${t('diag_copy')}</button>` : ''}`;
}
async function copyText(txt) {
  try { await navigator.clipboard.writeText(txt); }
  catch {
    const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
  }
  window.toastr?.success(t('diag_copied'));
}
window.__svsDiag = async () => { await runDiag(); console.log(diagText()); return diagText(); };

/* ------------------------------------------------------------ in-chat popups */
/* Purely visual: nodes are drawn into the chat DOM from the saved log. Nothing is written to the chat or the prompt. */
const POP = 'svs-chatpop';
const openMap = new Map();
let injT = 0;
function scheduleInject() { clearTimeout(injT); injT = setTimeout(injectAll, 120); }
function popEntries() {
  const map = new Map(), cs = CS();
  if (!cs) return map;
  for (const e of cs.log) {
    if (e.mes === undefined || e.kind === 'ask') continue;
    if (!map.has(e.mes)) map.set(e.mes, []);
    map.get(e.mes).push(e);
  }
  return map;
}
const popSig = (list) => `${list.length}:${list[list.length - 1].time}:${S().lang}`;
function popHtml(list) {
  const total = list.reduce((a, e) => a + (e.delta || 0), 0);
  const last = list[list.length - 1];
  const k = ICON[last.kind] ? last.kind : 'info';
  const pill = total ? `<span class="svs-delta ${total > 0 ? 'pos' : 'neg'}">${total > 0 ? '+' : ''}${total}</span>` : '';
  const rows = list.map((e) => {
    const kk = ICON[e.kind] ? e.kind : 'info';
    const d = e.delta ? `<span class="svs-delta ${e.delta > 0 ? 'pos' : 'neg'}">${e.delta > 0 ? '+' : ''}${e.delta}</span>` : '';
    return `<div class="svs-pe k-${kk}"><i class="fa-solid ${ICON[kk]}"></i><span class="svs-pt">【 ${esc(e.text)} 】</span>${d}</div>`;
  }).join('');
  return `<summary>${popAvatar()}<b>${esc(t('title'))}</b><span class="svs-ps-text k-${k}">${esc(last.text)}</span>${pill}<i class="fa-solid fa-chevron-down svs-chev"></i></summary><div class="svs-pbody">${rows}</div>`;
}
function injectAll() {
  try {
    const chatEl = document.getElementById('chat');
    if (!chatEl) return;
    const s = S(), w = currentWorld();
    const map = (s.enabled && s.chatPopup && w) ? popEntries() : new Map();
    chatEl.querySelectorAll('.' + POP).forEach((n) => {
      const list = map.get(Number(n.dataset.mes));
      if (!list || n.dataset.place !== s.chatPlace || n.dataset.sig !== popSig(list)) n.remove();
    });
    for (const [idx, list] of map) {
      const msg = chatEl.querySelector(`.mes[mesid="${idx}"]`);
      if (!msg || msg.querySelector('.' + POP)) continue;
      const text = msg.querySelector('.mes_text');
      if (!text) continue;
      const node = document.createElement('details');
      node.className = POP; node.dataset.mes = String(idx); node.dataset.place = s.chatPlace; node.dataset.sig = popSig(list);
      node.open = openMap.has(idx) ? openMap.get(idx) : !!s.chatOpen;
      node.innerHTML = popHtml(list);
      if (s.chatPlace === 'top') text.before(node);
      else if (s.chatPlace === 'middle') {
        const kids = [...text.children];
        if (kids.length >= 2) kids[Math.ceil(kids.length / 2) - 1].after(node); else text.after(node);
      } else text.after(node);
    }
  } catch (e) { logErr('injectAll', e); }
}

/* ------------------------------------------------- placement helpers */
/* Put an element in the browser top layer (above every page element, immune to odd ancestors). */
function syncTop(el, visible) {
  try {
    if (!el || typeof el.showPopover !== 'function') return;
    const open = el.matches(':popover-open');
    if (visible && !open) el.showPopover();
    else if (!visible && open) el.hidePopover();
  } catch (e) { logErr('popover', e); }
}
/* Opacity is applied to the frame + glass only (never to #svs_panel itself), so backdrop blur keeps seeing the page behind. */
function applyLook() {
  const s = S(), p = document.getElementById('svs_panel');
  if (p) { p.style.setProperty('--svs-op', String(s.opacity)); p.style.setProperty('--svs-blur', clamp(Number(s.blur) || 0, 0, 30) + 'px'); }
  document.documentElement.style.setProperty('--svs-blur', clamp(Number(s.blur) || 0, 0, 30) + 'px');
  document.body.classList.toggle('svs-round', !!s.rounded);
  const f = document.getElementById('svs_fab'); if (f) f.style.opacity = String(Math.max(0.5, s.opacity));
}
function avatarUrl() {
  const s = S(), c = ctx();
  try {
    if (s.avatarMode === 'custom') return s.avatarCustom || '';
    const last = (sel) => { const a = [...document.querySelectorAll(sel)]; return a.length ? a[a.length - 1].src : ''; };
    if (s.avatarMode === 'character') {
      const u = last('#chat .mes:not([is_user="true"]) .avatar img'); if (u) return u;
      const ch = c.characters && c.characters[c.characterId];
      if (ch && ch.avatar && ch.avatar !== 'none') return c.getThumbnailUrl ? c.getThumbnailUrl('avatar', ch.avatar) : `/thumbnail?type=avatar&file=${encodeURIComponent(ch.avatar)}`;
      return '';
    }
    const u = last('#chat .mes[is_user="true"] .avatar img'); if (u) return u;
    const sel = document.querySelector('#user_avatar_block .avatar-container.selected img, #user_avatar_block .avatar.selected img');
    return sel ? sel.src : '';
  } catch (e) { return ''; }
}
const popAvatar = () => { const u = avatarUrl(); return u ? `<img class="svs-pav" src="${esc(u)}" alt="" onerror="this.style.display='none'">` : ''; };
async function loadAvatarFile(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const sz = 160, cv = document.createElement('canvas'); cv.width = cv.height = sz;
    const m = Math.min(img.width, img.height);
    cv.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, sz, sz);
    S().avatarCustom = cv.toDataURL('image/webp', 0.85); S().avatarMode = 'custom';
    save(); render();
  } catch (e) { logErr('avatar', e); window.toastr?.error(t('av_fail')); }
  finally { URL.revokeObjectURL(url); }
}

/* ---- floating button: always placed in explicit pixels inside the visible screen ---- */
function placeFab() {
  const f = document.getElementById('svs_fab'); if (!f) return;
  const s = S(), vv = window.visualViewport;
  const W = Math.round(vv?.width || innerWidth), H = Math.round(vv?.height || innerHeight);
  const ox = vv?.offsetLeft || 0, oy = vv?.offsetTop || 0;
  const z = f.offsetWidth || clamp(Number(s.fabSize) || 38, 28, 64);
  let left = s.fabPos ? parseFloat(s.fabPos.left) : NaN, top = s.fabPos ? parseFloat(s.fabPos.top) : NaN;
  if (!isFinite(left) || !isFinite(top)) { left = ox + W - z - 10; top = oy + H - z - (W <= 640 ? 150 : 120); }
  left = clamp(left, ox, Math.max(ox, ox + W - z)); top = clamp(top, oy, Math.max(oy, oy + H - z));
  Object.assign(f.style, { left: Math.round(left) + 'px', top: Math.round(top) + 'px', right: 'auto', bottom: 'auto' });
}
function renderFab() {
  try {
    const s = S(), show = !!(s.showFab && s.enabled);
    $('#svs_fab').toggleClass('svs-hidden', !show).toggleClass('svs-nobind', !currentWorld());
    applyFab();
    if (show) placeFab();
  } catch (e) { logErr('renderFab', e); }
}
/* If something sits on top of the button, lift the button above it. */
function ensureFab() {
  try {
    const f = document.getElementById('svs_fab');
    if (!f || f.classList.contains('svs-hidden')) return;
    const r = f.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (top && !f.contains(top) && top !== f) {
      f.style.zIndex = '2147483000';
      dbg.fabFix = `button was covered by <${top.tagName.toLowerCase()}${top.id ? '#' + top.id : ''}>; z-index raised`;
    }
  } catch (e) { logErr('ensureFab', e); }
}
function applyFab() {
  const f = document.getElementById('svs_fab'); if (!f) return;
  const z = clamp(Number(S().fabSize) || 38, 28, 64);
  f.style.width = z + 'px'; f.style.height = z + 'px';
  const sp = f.querySelector('span'); if (sp) sp.style.fontSize = Math.round(z * 0.52) + 'px';
}
/* Close SillyTavern's own open side drawers so they don't sit on top of the System. */
function closeStDrawers() {
  try {
    document.querySelectorAll('.drawer-content.openDrawer:not(.pinnedOpen)').forEach((d) => {
      const tg = d.closest('.drawer')?.querySelector('.drawer-toggle'); if (tg) tg.click();
    });
  } catch (e) { logErr('closeStDrawers', e); }
}
/* Size and place the panel in explicit pixels from the REAL visible viewport. */
function layoutPanel() {
  const p = document.getElementById('svs_panel');
  if (!p) return;
  const vv = window.visualViewport;
  const W = Math.round(vv?.width || innerWidth), H = Math.round(vv?.height || innerHeight);
  const ox = vv?.offsetLeft || 0, oy = vv?.offsetTop || 0;
  const mobile = W <= 640;
  const w = mobile ? W : Math.min(420, W - 32);
  const h = Math.round(Math.max(260, Math.min(mobile ? H * 0.78 : 690, H - (mobile ? 40 : 32))));
  Object.assign(p.style, {
    width: w + 'px', height: h + 'px', maxHeight: (H - 8) + 'px', maxWidth: W + 'px',
    left: Math.round(ox + (mobile ? 0 : W - w - 16)) + 'px',
    top: Math.round(oy + H - h - (mobile ? 0 : 16)) + 'px',
    right: 'auto', bottom: 'auto'
  });
}

/* ---------------------------------------------------------------- render */
function render() {
  try {
    const s = S();
    renderFab();
    applyLook();
    if (!$('#svs_panel').length) return;
    const tabs = ['status', 'missions', 'shop', 'world', 'settings'];
    $('#svs_tabs').html(tabs.map((k) => `<button class="svs-tab ${s.tab === k ? 'on' : ''}" data-act="tab" data-tab="${k}" title="${t('tab_' + k)}"><i class="fa-solid ${TAB_ICON[k]}"></i><span>${t('tab_' + k)}</span></button>`).join(''));
    $('#svs_title').text(t('title'));
    const cs = CS(), w = currentWorld();
    $('#svs_foot').html(`<span class="svs-led"></span><span>${t('online')}</span><span class="svs-foot-c">${t('foot_active')}</span><span class="svs-foot-w">${w ? esc(w.name) : t('foot_wait')}</span>`);
    $('#svs_pts').html(w && cs ? `<i class="fa-solid fa-coins"></i> ${cs.points}` : '');
    const views = { status: viewStatus, missions: viewMissions, shop: viewShop, world: viewWorld, settings: viewSettings, diag: viewDiag };
    const body = document.getElementById('svs_body');
    const top = body.scrollTop;
    body.innerHTML = (views[s.tab] || viewStatus)();
    body.scrollTop = top;
    $('#svs_diagbtn').toggleClass('on', s.tab === 'diag');
    const showPanel = s.open && (s.enabled || s.tab === 'diag'), showFab = s.showFab && s.enabled;
    $('#svs_panel').toggleClass('svs-hidden', !showPanel);
    if (showPanel) layoutPanel();
    applyFab();
    scheduleInject();
  } catch (e) { logErr('render', e); }
}

function renderDrawer() {
  const s = S();
  $('#svs_drawer_body').html(`
    <label class="checkbox_label"><input type="checkbox" id="svs_d_en" ${s.enabled ? 'checked' : ''}><span>${t('s_enabled')}</span></label>
    <label>${t('s_lang')} <select id="svs_d_lang" class="text_pole"><option value="en" ${s.lang === 'en' ? 'selected' : ''}>English</option><option value="ru" ${s.lang === 'ru' ? 'selected' : ''}>Русский</option></select></label>
    <div class="flex-container">
      <div id="svs_d_open" class="menu_button menu_button_icon"><i class="fa-solid fa-terminal"></i><span>${t('open_btn')}</span></div>
      <div id="svs_d_diag" class="menu_button menu_button_icon"><i class="fa-solid fa-stethoscope"></i><span>${t('diag')}</span></div>
    </div>`);
  $('#svs_wand_label').text(t('title'));
  const g = (id) => document.getElementById(id);
  if (g('svs_d_en')) g('svs_d_en').onchange = (e) => { S().enabled = e.target.checked; render(); save(); };
  if (g('svs_d_lang')) g('svs_d_lang').onchange = (e) => { S().lang = e.target.value; renderDrawer(); render(); save(); };
  if (g('svs_d_open')) g('svs_d_open').onclick = () => { closeStDrawers(); openPanel(true); };
  if (g('svs_d_diag')) g('svs_d_diag').onclick = () => { closeStDrawers(); openPanel(true, 'diag'); runDiag(); };
}

/* ------------------------------------------------------------------- UI */
function openPanel(v, tab) {
  const s = S(); s.open = v; if (tab) s.tab = tab;
  render(); save();
  if (v) setTimeout(ensureReachable, 250);
}
/* Detect another element covering the panel (which would swallow taps) and try to lift the panel above it. */
function geom() {
  const p = document.getElementById('svs_panel'), r = p ? p.getBoundingClientRect() : null, vv = window.visualViewport;
  return `panel rect ${r ? [r.left, r.top, r.width, r.height].map(Math.round).join(',') : 'n/a'}; inner ${innerWidth}x${innerHeight}; visual ${vv ? Math.round(vv.width) + 'x' + Math.round(vv.height) + '@' + vv.scale : 'n/a'}`;
}
function hitTest() {
  const panel = document.getElementById('svs_panel');
  if (!panel || panel.classList.contains('svs-hidden')) return { ok: null, info: 'panel is closed' };
  const probes = ['#svs_close', '.svs-tab', '.svs-btn'];
  for (const sel of probes) {
    const el = panel.querySelector(sel); if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const top = document.elementFromPoint(x, y);
    if (!top) return { ok: false, info: `nothing at ${Math.round(x)},${Math.round(y)} (${sel} is off screen?) · ${geom()}` };
    if (!panel.contains(top)) {
      const d = (n) => `${n.tagName.toLowerCase()}${n.id ? '#' + n.id : ''}${n.className && typeof n.className === 'string' ? '.' + n.className.trim().split(/\s+/).slice(0, 2).join('.') : ''}`;
      return { ok: false, info: `${sel} is covered by <${d(top)}> (z-index ${getComputedStyle(top).zIndex})` };
    }
  }
  return { ok: true, info: 'taps reach the panel' };
}
function ensureReachable() {
  layoutPanel();
  const h = hitTest();
  if (h.ok === false) dbg.hitFix = h.info;
  return h;
}
function resetFab() {
  const s = S();
  s.fabPos = null; s.showFab = true; s.fabSize = 38;
  if (s.opacity < 0.5) s.opacity = 0.95;
  const f = document.getElementById('svs_fab');
  if (f) { f.style.zIndex = ''; f.style.left = ''; f.style.top = ''; }
  save(); render(); ensureFab();
  window.toastr?.success(t('fab_reset_done'));
}
function makeDraggable(el, onTap) {
  let down = false, moved = false, sx, sy, ox, oy;
  el.addEventListener('pointerdown', (e) => {
    down = true; moved = false; sx = e.clientX; sy = e.clientY;
    const r = el.getBoundingClientRect(); ox = r.left; oy = r.top;
    try { el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  });
  el.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
    if (!moved) return;
    el.style.left = clamp(ox + dx, 0, innerWidth - el.offsetWidth) + 'px';
    el.style.top = clamp(oy + dy, 0, innerHeight - el.offsetHeight) + 'px';
    el.style.right = 'auto'; el.style.bottom = 'auto';
  });
  el.addEventListener('pointerup', () => {
    if (!down) return; down = false;
    if (!moved) onTap();
    else { S().fabPos = { left: el.style.left, top: el.style.top }; save(); }
  });
  el.addEventListener('pointercancel', () => { down = false; });
}

function buildUI() {
  const s = S();
  const step = (name, fn) => { try { fn(); dbg.buildSteps.push({ name, ok: true }); } catch (e) { dbg.buildSteps.push({ name, ok: false }); logErr('buildUI:' + name, e); } };

  step('panel', () => {
    $('body').append(`
      <div id="svs_fab" class="svs-hidden" title="System"><i class="svs-ff"></i><span>S</span></div>
      <div id="svs_panel" class="svs-hidden" role="dialog" aria-label="System">
        <div class="svs-blur"></div>
        <div class="svs-frame"></div>
        <div class="svs-inner">
        <div class="svs-head">
          <span id="svs_title"></span><span id="svs_pts"></span>
          <span class="svs-spacer"></span>
          <span class="svs-oprow" title="Opacity"><i class="fa-regular fa-eye"></i>${opSlider()}</span>
          <button id="svs_diagbtn" class="svs-x" data-act="diag-toggle" aria-label="Diagnostics"><i class="fa-solid fa-stethoscope"></i></button>
          <button id="svs_close" class="svs-x" data-act="close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div id="svs_tabs" class="svs-tabs"></div>
        <div id="svs_body" class="svs-body"></div>
        <div id="svs_foot" class="svs-foot"></div>
        </div>
      </div>`);
    if (s.fabPos) $('#svs_fab').css({ left: s.fabPos.left, top: s.fabPos.top, right: 'auto', bottom: 'auto' });
    makeDraggable(document.getElementById('svs_fab'), () => openPanel(!S().open));
    document.getElementById('svs_body').addEventListener('toggle', (e) => {
      const k = e.target?.dataset?.sec; if (k) openSecs[k] = e.target.open;
    }, true);
  });
  step('drawer', () => {
    $('#extensions_settings2, #extensions_settings').first().append(`
      <div class="inline-drawer">
        <div class="inline-drawer-toggle inline-drawer-header"><b>The System</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>
        <div class="inline-drawer-content" id="svs_drawer_body"></div>
      </div>`);
  });
  step('wand', () => {
    $('#extensionsMenu').append(`<div id="svs_wand" class="list-group-item flex-container flexGap5"><div class="fa-solid fa-terminal extensionsMenuExtensionButton"></div><span id="svs_wand_label"></span></div>`);
    const wand = document.getElementById('svs_wand');
    if (wand) wand.onclick = () => { closeStDrawers(); openPanel(true); };
  });

  step('handlers', () => {
    const panelEl = document.getElementById('svs_panel');

    /* ---- actions (buttons) ---- */
    async function runAct(el) {
      hit('action');
      const act = el.dataset.act, cs = CS(), w = currentWorld(), st = S();
      try {
        switch (act) {
          case 'close': openPanel(false); break;
          case 'diag-toggle': openPanel(true, st.tab === 'diag' ? 'status' : 'diag'); break;
          case 'tab': st.tab = el.dataset.tab; render(); save(); break;
          case 'eval': evaluate(true); break;
          case 'ask': askSystem(); break;
          case 'reset':
            if (cs && await confirmBox(t('confirm_reset'))) {
              const m = META(); m.states[m.worldId] = blankState();
              bindWorld(m.worldId);
            }
            break;
          case 'm-ai': aiMission(); break;
          case 'm-add': {
            const title = (document.getElementById('svs_mt')?.value || '').trim(); if (!title || !cs) break;
            addMission(cs, { title, desc: '', reward: document.getElementById('svs_mr')?.value || 50 }); saveChat(); render(); break;
          }
          case 'm-done': { const m = cs.missions.find((x) => x.id === el.dataset.id); if (m) { completeMission(m); saveChat(); render(); } break; }
          case 'm-drop': { const m = cs.missions.find((x) => x.id === el.dataset.id); if (m) { m.status = 'failed'; saveChat(); render(); } break; }
          case 'buy': {
            const it = parseShop(w.shopText)[Number(el.dataset.i)]; if (!it) break;
            if (cs.points < it.cost) { window.toastr?.warning(t('not_enough')); break; }
            cs.points -= it.cost; cs.inventory.push({ name: it.name, desc: it.desc });
            pushLog(cs, { kind: 'info', text: t('bought_item', { item: it.name }), delta: -it.cost });
            saveChat(); render(); break;
          }
          case 'use': {
            const it = cs.inventory.splice(Number(el.dataset.i), 1)[0];
            if (it) pushLog(cs, { kind: 'info', text: t('used_item', { item: it.name }) });
            saveChat(); render(); break;
          }
          case 'w-switch': bindWorld(el.dataset.id); break;
          case 'w-mode': if (w) { w.mode = el.dataset.mode === 'oc' ? 'oc' : 'canon'; save(); render(); } break;
          case 'w-new': { const nw = newWorld(); st.worlds.push(nw); save(); bindWorld(nw.id); break; }
          case 'w-dup': { const nw = newWorld({ ...w, id: uid('w'), name: w.name + ' (2)' }); st.worlds.push(nw); save(); bindWorld(nw.id); break; }
          case 'w-del':
            if (w && await confirmBox(t('confirm_del'))) { const m = META(); if (m) delete m.states[w.id]; st.worlds = st.worlds.filter((x) => x.id !== w.id); save(); bindWorld(''); }
            break;
          case 'w-exp': download(`system-world-${(w.name || 'world').replace(/[^\w-]+/g, '_')}.json`, { type: 'svs-world-profile', version: 1, worlds: [w] }); break;
          case 'w-expall': download('system-worlds.json', { type: 'svs-world-profile', version: 1, worlds: st.worlds }); break;
          case 'w-imp': document.getElementById('svs_file')?.click(); break;
          case 'fill': fillWorld(); break;
          case 'refresh': render(); break;
          case 'profiles': render(); window.toastr?.info(t('profile_reloaded', { n: getProfiles().length })); break;
          case 'reset-fab': resetFab(); break;
          case 'avatar-pick': document.getElementById('svs_avatar_file')?.click(); break;
          case 'avatar-clear': st.avatarCustom = ''; if (st.avatarMode === 'custom') st.avatarMode = 'persona'; save(); render(); break;
          case 'diag-run': runDiag(); break;
          case 'diag-copy': copyText(diagText()); break;
        }
      } catch (err) { logErr('action:' + act, err); window.toastr?.error(t('err', { err: err.message || err })); }
    }

    /* ---- tap handling: pointerup is primary (works even if the browser swallows click), click is the fallback ---- */
    let down = null, lastFire = 0;
    const fire = (el) => { const now = Date.now(); if (now - lastFire < 400) return; lastFire = now; runAct(el); };
    const target = (e) => (e.target && e.target.closest ? e.target.closest('[data-act]') : null);
    panelEl.addEventListener('pointerdown', (e) => { hit('panel_pointerdown'); down = { x: e.clientX, y: e.clientY }; }, true);
    panelEl.addEventListener('pointerup', (e) => {
      hit('panel_pointerup');
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y) > 10; down = null;
      if (moved) return;
      const el = target(e);
      if (el && el.tagName !== 'INPUT' && !el.disabled) fire(el);
    }, true);
    panelEl.addEventListener('pointercancel', () => { down = null; }, true);
    panelEl.addEventListener('click', (e) => {
      hit('panel_click');
      const el = target(e);
      if (el && !el.disabled) fire(el);
    }, true);

    /* ---- inputs ---- */
    const settingsMap = {
      svs_en: (el) => { S().enabled = el.checked; renderDrawer(); },
      svs_lang: (el) => { S().lang = el.value; renderDrawer(); },
      svs_outlang: (el) => { S().outLang = el.value; },
      svs_profile: (el) => { S().profileId = el.value; },
      svs_auto: (el) => { S().autoEval = el.checked; },
      svs_ctxn: (el) => { S().ctxMessages = clamp(parseInt(el.value) || 6, 2, 30); },
      svs_strict: (el) => { S().strict = el.value; },
      svs_fabchk: (el) => { S().showFab = el.checked; },
      svs_toast: (el) => { S().toasts = el.checked; },
      svs_round: (el) => { S().rounded = el.checked; },
      svs_avmode: (el) => { S().avatarMode = el.value; },
      svs_chatpop: (el) => { S().chatPopup = el.checked; },
      svs_chatplace: (el) => { S().chatPlace = el.value; },
      svs_chattarget: (el) => { S().chatTarget = el.value; },
      svs_chatopen: (el) => { S().chatOpen = el.checked; openMap.clear(); document.querySelectorAll('.' + POP).forEach((n) => n.remove()); }
    };
    panelEl.addEventListener('input', (e) => {
      const el = e.target;
      if (el.classList.contains('svs-op')) {
        const v = clamp(Number(el.value) / 100, 0.25, 1);
        S().opacity = v;
        document.querySelectorAll('.svs-op').forEach((x) => { x.value = Math.round(v * 100); });
        document.querySelectorAll('.svs-opval').forEach((x) => { x.textContent = Math.round(v * 100) + '%'; });
        applyLook(); save();
      } else if (el.dataset && el.dataset.field) {
        const w = currentWorld(); if (w) { w[el.dataset.field] = el.value; save(); }
      } else if (el.id === 'svs_blur') {
        S().blur = Number(el.value); applyLook(); save();
        const lab = document.querySelector('.svs-blurval'); if (lab) lab.textContent = el.value + 'px';
      } else if (el.id === 'svs_fabsize') {
        S().fabSize = Number(el.value); applyFab(); placeFab(); save();
        const lab = document.querySelector('.svs-fabval'); if (lab) lab.textContent = el.value + 'px';
      } else if (el.id === 'svs_ask') askDraft = el.value;
    });
    panelEl.addEventListener('change', async (e) => {
      const el = e.target;
      if (el.dataset && el.dataset.field) { const w = currentWorld(); if (w) { w[el.dataset.field] = el.value; save(); } return; }
      if (el.id === 'svs_over') { overwrite = el.checked; return; }
      if (el.id === 'svs_world') { bindWorld(el.value); return; }
      if (el.id === 'svs_avatar_file') { const f = el.files[0]; if (f) await loadAvatarFile(f); el.value = ''; return; }
      if (el.id === 'svs_file') { const f = el.files[0]; if (f) importWorlds(await f.text()); el.value = ''; return; }
      if (settingsMap[el.id]) { settingsMap[el.id](el); save(); render(); }
    });
    panelEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.id === 'svs_ask') askSystem(); });

    const relayout = () => { placeFab(); if (!document.getElementById('svs_panel').classList.contains('svs-hidden')) layoutPanel(); };
    window.addEventListener('resize', relayout);
    window.addEventListener('orientationchange', () => setTimeout(relayout, 200));
    if (window.visualViewport) { window.visualViewport.addEventListener('resize', relayout); window.visualViewport.addEventListener('scroll', relayout); }
    window.addEventListener('resize', () => {
      const f = document.getElementById('svs_fab'); if (!f || !f.style.left) return;
      f.style.left = clamp(parseFloat(f.style.left) || 0, 0, innerWidth - f.offsetWidth) + 'px';
      f.style.top = clamp(parseFloat(f.style.top) || 0, 0, innerHeight - f.offsetHeight) + 'px';
    });
  });
}

/* ------------------------------------------------------------------ init */
function init() {
  S().open = false; // never reopen automatically after a reload

  buildUI();
  try { renderDrawer(); } catch (e) { logErr('renderDrawer', e); }
  render();
  try {
    const { eventSource, event_types } = ctx();
    const auto = (name) => () => {
      hit(name);
      const s = S();
      if (s.enabled && s.autoEval) setTimeout(() => evaluate(false).catch((e) => logErr('auto-eval', e)), 500);
    };
    eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, auto('rendered'));
    if (event_types.GENERATION_ENDED) eventSource.on(event_types.GENERATION_ENDED, auto('gen_ended'));
    eventSource.on(event_types.CHAT_CHANGED, () => { hit('chat_changed'); askDraft = ''; render(); });
    for (const k of ['CHARACTER_MESSAGE_RENDERED', 'USER_MESSAGE_RENDERED', 'MESSAGE_UPDATED', 'MESSAGE_EDITED', 'MESSAGE_SWIPED', 'MESSAGE_DELETED', 'MORE_MESSAGES_LOADED']) {
      if (event_types[k]) eventSource.on(event_types[k], scheduleInject);
    }
    dbg.listeners = true;
  } catch (e) { logErr('event registration', e); }
  try {
    const chatEl = document.getElementById('chat');
    if (chatEl) {
      new MutationObserver(() => scheduleInject()).observe(chatEl, { childList: true, subtree: true });
      chatEl.addEventListener('toggle', (e) => {
        const n = e.target;
        if (n && n.classList && n.classList.contains(POP)) openMap.set(Number(n.dataset.mes), n.open);
      }, true);
    }
  } catch (e) { logErr('chat observer', e); }
  scheduleInject();
  setTimeout(ensureFab, 700);
  console.log(`[System] v${VERSION} loaded`);
}
try { jQuery(init); } catch (e) { console.error('[System] fatal init error', e); }
})();
