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
  new: 'New', dup: 'Duplicate', del: 'Delete', export: 'Export', export_all: 'Export all', import: 'Import',
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
  def_pn: 'B-Points', new_world: 'New world'
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
  new: 'Новый', dup: 'Копия', del: 'Удалить', export: 'Экспорт', export_all: 'Экспорт всех', import: 'Импорт',
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
  def_pn: 'B-очки', new_world: 'Новый мир'
}
};
function t(k, v) {
  const l = S().lang;
  let s = (I18N[l] && I18N[l][k]) ?? I18N.en[k] ?? k;
  if (v) for (const x in v) s = s.replaceAll('{' + x + '}', v[x]);
  return s;
}

/* -------------------------------------------------------------- settings */
const DEFAULTS = {
  enabled: true, lang: 'en', outLang: 'ui', opacity: 0.95, profileId: '', autoEval: true,
  ctxMessages: 6, strict: 'normal', showFab: true, toasts: true, open: false, tab: 'status',
  fabPos: null, worlds: []
};
function S() {
  const { extensionSettings } = ctx();
  if (!extensionSettings[MODULE]) extensionSettings[MODULE] = {};
  const s = extensionSettings[MODULE];
  for (const k in DEFAULTS) if (s[k] === undefined) s[k] = structuredClone(DEFAULTS[k]);
  return s;
}
const save = () => ctx().saveSettingsDebounced();

function CS() {
  const md = ctx().chatMetadata;
  if (!md) return null;
  if (!md[MODULE]) md[MODULE] = { worldId: '', points: 100, log: [], missions: [], inventory: [], lastUserIdx: -1 };
  return md[MODULE];
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
    id: uid('w'), name: t('new_world'), fandom: '', character: '', wikiUrls: '', lorebook: '', notes: '',
    world: '', persona: '', plot: '', systemVoice: '', pointName: t('def_pn'), shopText: '', missionsText: ''
  }, over);
}
function currentWorld() {
  const cs = CS();
  if (!cs || !cs.worldId) return null;
  return S().worlds.find((w) => w.id === cs.worldId) || null;
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
  const c = ctx(), s = S();
  if (s.profileId && c.ConnectionManagerRequestService && getProfiles().some((p) => p.id === s.profileId)) {
    const r = await c.ConnectionManagerRequestService.sendRequest(
      s.profileId, [{ role: 'system', content: system }, { role: 'user', content: user }], maxTokens);
    return cleanText(r?.content);
  }
  const r = await c.generateRaw({ prompt: user, systemPrompt: system, responseLength: maxTokens });
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
  const c = ctx();
  const strict = {
    gentle: 'Be lenient: small deviations cost little (about -5 to -15) and rewards are modest.',
    normal: 'Be fair: clear OOC acts cost about -15 to -40, good in-character or plot-advancing acts earn about +10 to +40.',
    harsh: 'Be strict: any OOC act costs -20 to -60; rewards are rare and small unless the act is excellent.'
  }[S().strict];
  return `You are THE SYSTEM, an invisible game-like interface bound to the player ("${c.name1}") in a roleplay. Only the player can perceive you. Characters in the story are completely unaware of you: never address them and never write as if they could hear you.
Your job, in the manner of the System from "Scum Villain's Self-Saving System": make the player behave as the bound character "${w.character}" would. Reward in-character behaviour and advancing the original storyline with ${w.pointName}; punish out-of-character (OOC) behaviour and plot deviations by deducting ${w.pointName}; hand out missions.
Fandom / universe: ${w.fandom || 'original world'}
World & setting: ${w.world || 'n/a'}
Character persona & canon behaviour: ${w.persona || 'n/a'}
Original storyline / System goals: ${w.plot || 'n/a'}
Your voice: ${w.systemVoice || t('default_voice')}. Notices are short (1-2 sentences), like 【 ... 】 system notices, but write the text WITHOUT the brackets.
Scoring: ${strict}
${langInstruction()}`;
}

/* ---------------------------------------------------------------- state */
let busy = false, askDraft = '', overwrite = false;

function pushLog(cs, e) {
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
  const cs = CS(); if (!cs) return;
  cs.worldId = id;
  const w = currentWorld();
  if (w && cs.log.length === 0) {
    pushLog(cs, { kind: 'info', text: t('welcome', { char: w.character || w.name, pts: cs.points, pn: w.pointName }) });
    if (!cs.missions.length) parseMissions(w.missionsText).forEach((m) => cs.missions.push({ id: uid('m'), status: 'active', ...m }));
  }
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
  if (!s.enabled || busy || !w || !cs) return;
  const idx = lastUserIndex();
  if (idx < 0) { if (manual) window.toastr?.warning(t('need_msg')); return; }
  if (!manual && cs.lastUserIdx === idx) return;
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
    if (!r) throw new Error('bad JSON from model');
    applyResult(w, cs, r);
    cs.lastUserIdx = idx;
    saveChat();
  } catch (e) {
    console.error('[System]', e);
    window.toastr?.error(t('err', { err: e.message || e }));
  } finally { busy = false; render(); }
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
  } catch (e) { window.toastr?.error(t('err', { err: e.message || e })); }
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
  } catch (e) { window.toastr?.error(t('err', { err: e.message || e })); }
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
    const user = `Fandom / universe: ${w.fandom || '(not given)'}
Character the player is bound to: ${w.character || '(choose the most fitting protagonist or ask-worthy main character of this universe)'}
User notes: ${w.notes || '(none)'}
${wiki ? `\nWiki excerpts:\n${wiki}\n` : ''}${lore ? `\nLorebook excerpts:\n${lore}\n` : ''}
Use the supplied material first, then your own knowledge. If you do not reliably know this franchise and no material was given, set "known": false and keep fields short and based only on the notes. Do not invent canon facts.
${langInstruction()}
Return JSON with these keys:
{"known":true|false,"character":"","world":"setting, factions, rules of the world (max 150 words)","persona":"the character's canon personality, speech style, habits, do's and don'ts (max 150 words)","plot":"key canon storyline beats and what the System wants the player to preserve or achieve (max 150 words)","systemVoice":"how the System talks (one sentence)","pointName":"short name for the points","shop":[{"name":"","desc":"","cost":<int>}],"missions":[{"title":"","desc":"","reward":<int>}]}
Give 4-6 shop items and 3 starter missions.`;
    const r = extractJSON(await llm(system, user, 1800));
    if (!r) throw new Error('bad JSON from model');
    const put = (k, v) => { if (v && (overwrite || !String(w[k] || '').trim())) w[k] = String(v); };
    put('character', r.character); put('world', r.world); put('persona', r.persona); put('plot', r.plot);
    put('systemVoice', r.systemVoice);
    if (r.pointName && (overwrite || !w.pointName || w.pointName === I18N.en.def_pn || w.pointName === I18N.ru.def_pn)) w.pointName = String(r.pointName);
    if (Array.isArray(r.shop)) put('shopText', r.shop.map((x) => `${x.name} | ${x.desc || ''} | ${parseInt(x.cost) || 50}`).join('\n'));
    if (Array.isArray(r.missions)) put('missionsText', r.missions.map((x) => `${x.title} | ${x.desc || ''} | ${parseInt(x.reward) || 50}`).join('\n'));
    save();
    if (r.known === false) window.toastr?.warning(t('fill_unknown')); else window.toastr?.success(t('fill_done'));
  } catch (e) {
    console.error('[System]', e);
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
function opSlider() {
  return `<input type="range" class="svs-op" min="25" max="100" value="${Math.round(S().opacity * 100)}" aria-label="${t('s_opacity')}">`;
}
function viewStatus() {
  const w = currentWorld(), cs = CS();
  if (!w || !cs) return `<div class="svs-empty">${t('no_world')}</div><button class="svs-btn" data-act="tab" data-tab="world">${t('tab_world')}</button>`;
  const log = [...cs.log].reverse().map((e) => {
    const d = e.delta ? `<span class="svs-delta ${e.delta > 0 ? 'pos' : 'neg'}">${e.delta > 0 ? '+' : ''}${e.delta}</span>` : '';
    const q = e.kind === 'ask' ? `<div class="svs-q">${t('asked')}: ${esc(e.q)}</div>` : '';
    return `<div class="svs-note svs-k-${e.kind}">${q}<span class="svs-msg">【 ${esc(e.text)} 】</span>${d}</div>`;
  }).join('') || `<div class="svs-empty">${t('log_empty')}</div>`;
  return `
  <div class="svs-bound"><span>${t('bound_to')}</span><b>${esc(w.character || w.name)}</b><small>${esc(w.fandom)}</small></div>
  <div class="svs-score"><span class="svs-num">${cs.points}</span><span class="svs-unit">${esc(w.pointName)}</span></div>
  <button class="svs-btn svs-primary" data-act="eval" ${busy ? 'disabled' : ''}>${busy ? t('thinking') : t('evaluate')}</button>
  <div class="svs-ask"><input id="svs_ask" type="text" placeholder="${t('ask_ph')}" value="${esc(askDraft)}"><button class="svs-btn" data-act="ask" ${busy ? 'disabled' : ''}>${t('ask_btn')}</button></div>
  <div class="svs-log">${log}</div>
  <button class="svs-btn svs-danger" data-act="reset">${t('reset_state')}</button>`;
}
function viewMissions() {
  const w = currentWorld(), cs = CS();
  if (!w || !cs) return `<div class="svs-empty">${t('no_world')}</div>`;
  const act = cs.missions.filter((m) => m.status === 'active');
  const hist = cs.missions.filter((m) => m.status !== 'active').reverse();
  const card = (m, a) => `<div class="svs-card"><b>${esc(m.title)}</b><p>${esc(m.desc)}</p>
    <div class="svs-cardrow"><span class="svs-gold">${t('reward')}: ${m.reward} ${esc(w.pointName)}</span>
    ${a ? `<span><button class="svs-btn sm" data-act="m-done" data-id="${m.id}">${t('complete')}</button> <button class="svs-btn sm svs-danger" data-act="m-drop" data-id="${m.id}">${t('abandon')}</button></span>` : `<span class="svs-st-${m.status}">${m.status === 'done' ? '✔' : '✘'}</span>`}</div></div>`;
  return `
  <h4>${t('m_active')}</h4>${act.map((m) => card(m, true)).join('') || `<div class="svs-empty">${t('no_missions')}</div>`}
  <button class="svs-btn svs-primary" data-act="m-ai" ${busy ? 'disabled' : ''}>${busy ? t('thinking') : t('m_ai')}</button>
  <div class="svs-ask"><input id="svs_mt" type="text" placeholder="${t('m_title_ph')}"><input id="svs_mr" type="number" class="svs-narrow" placeholder="${t('m_reward_ph')}"><button class="svs-btn" data-act="m-add">${t('m_add')}</button></div>
  ${hist.length ? `<h4>${t('m_history')}</h4>${hist.map((m) => card(m, false)).join('')}` : ''}`;
}
function viewShop() {
  const w = currentWorld(), cs = CS();
  if (!w || !cs) return `<div class="svs-empty">${t('no_world')}</div>`;
  const items = parseShop(w.shopText);
  const shop = items.map((it, i) => `<div class="svs-card"><b>${esc(it.name)}</b><p>${esc(it.desc)}</p>
    <div class="svs-cardrow"><span class="svs-gold">${it.cost} ${esc(w.pointName)}</span><button class="svs-btn sm" data-act="buy" data-i="${i}">${t('buy')}</button></div></div>`).join('') || `<div class="svs-empty">${t('shop_empty')}</div>`;
  const inv = cs.inventory.map((it, i) => `<div class="svs-card"><b>${esc(it.name)}</b><p>${esc(it.desc)}</p>
    <div class="svs-cardrow"><span></span><button class="svs-btn sm" data-act="use" data-i="${i}">${t('use')}</button></div></div>`).join('') || `<div class="svs-empty">${t('inv_empty')}</div>`;
  return `<div class="svs-balance">${cs.points} ${esc(w.pointName)}</div>${shop}<h4>${t('inventory')}</h4>${inv}`;
}
function viewWorld() {
  const s = S(), cs = CS(), w = currentWorld();
  const opts = `<option value="">${t('world_none')}</option>` + s.worlds.map((x) => `<option value="${x.id}" ${cs && x.id === cs.worldId ? 'selected' : ''}>${esc(x.name)}</option>`).join('');
  const lore = `<option value="">${t('lore_none')}</option>` + getLorebookNames().map((n) => `<option ${w && w.lorebook === n ? 'selected' : ''}>${esc(n)}</option>`).join('');
  const inp = (f, label, ph = '') => `<label>${label}<input type="text" data-field="${f}" value="${esc(w[f])}" placeholder="${ph}"></label>`;
  const ta = (f, label, rows = 3) => `<label>${label}<textarea data-field="${f}" rows="${rows}">${esc(w[f])}</textarea></label>`;
  const editor = w ? `
    ${inp('name', t('f_name'))}
    ${inp('fandom', t('f_fandom'), 'Scum Villain, Naruto, Harry Potter…')}
    ${inp('character', t('f_character'))}
    ${ta('wikiUrls', t('f_wiki'), 2)}
    <label>${t('f_lore')}<span class="svs-inline"><select data-field="lorebook">${lore}</select><button class="svs-btn sm" data-act="refresh" title="${t('refresh')}">⟳</button></span></label>
    ${ta('notes', t('f_notes'), 3)}
    <label class="svs-check"><input type="checkbox" id="svs_over" ${overwrite ? 'checked' : ''}> ${t('overwrite')}</label>
    <button class="svs-btn svs-primary" data-act="fill" ${busy ? 'disabled' : ''}>${busy ? t('filling') : t('fill_ai')}</button>
    ${ta('world', t('f_world'), 4)}
    ${ta('persona', t('f_persona'), 4)}
    ${ta('plot', t('f_plot'), 4)}
    ${inp('systemVoice', t('f_voice'))}
    ${inp('pointName', t('f_points'))}
    ${ta('shopText', t('f_shop'), 4)}
    ${ta('missionsText', t('f_missions'), 4)}` : '';
  return `
  <label>${t('active_world')}<select id="svs_world">${opts}</select></label>
  <div class="svs-btnrow">
    <button class="svs-btn sm" data-act="w-new">${t('new')}</button>
    <button class="svs-btn sm" data-act="w-dup" ${w ? '' : 'disabled'}>${t('dup')}</button>
    <button class="svs-btn sm svs-danger" data-act="w-del" ${w ? '' : 'disabled'}>${t('del')}</button>
    <button class="svs-btn sm" data-act="w-exp" ${w ? '' : 'disabled'}>${t('export')}</button>
    <button class="svs-btn sm" data-act="w-expall" ${s.worlds.length ? '' : 'disabled'}>${t('export_all')}</button>
    <button class="svs-btn sm" data-act="w-imp">${t('import')}</button>
  </div>
  <input type="file" id="svs_file" accept=".json,application/json" hidden>
  ${editor}`;
}
function viewSettings() {
  const s = S(), profiles = getProfiles();
  const popt = `<option value="">${t('profile_current')}</option>` + profiles.map((p) => `<option value="${esc(p.id)}" ${p.id === s.profileId ? 'selected' : ''}>${esc(p.name)}</option>`).join('');
  const sel = (id, val, items) => `<select id="${id}">${items.map(([v, l]) => `<option value="${v}" ${v === val ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const chk = (id, v, l) => `<label class="svs-check"><input type="checkbox" id="${id}" ${v ? 'checked' : ''}> ${l}</label>`;
  return `
  ${chk('svs_en', s.enabled, t('s_enabled'))}
  <label>${t('s_lang')}${sel('svs_lang', s.lang, [['en', 'English'], ['ru', 'Русский']])}</label>
  <label>${t('s_outlang')}${sel('svs_outlang', s.outLang, [['ui', t('out_ui')], ['en', 'English'], ['ru', 'Русский'], ['chat', t('out_chat')]])}</label>
  <label>${t('s_opacity')}${opSlider()}</label>
  <label>${t('s_profile')}<span class="svs-inline"><select id="svs_profile">${popt}</select><button class="svs-btn sm" data-act="profiles" title="${t('profile_reload')}">⟳</button></span></label>
  ${profiles.length ? '' : `<small class="svs-hint">${t('profile_none')}</small>`}
  <button class="svs-btn" data-act="profiles">${t('profile_reload')}</button>
  ${chk('svs_auto', s.autoEval, t('s_auto'))}
  <label>${t('s_ctx')}<input type="number" id="svs_ctxn" min="2" max="30" value="${s.ctxMessages}"></label>
  <label>${t('s_strict')}${sel('svs_strict', s.strict, [['gentle', t('gentle')], ['normal', t('normal')], ['harsh', t('harsh')]])}</label>
  ${chk('svs_fabchk', s.showFab, t('s_fab'))}
  ${chk('svs_toast', s.toasts, t('s_toast'))}`;
}

/* ---------------------------------------------------------------- render */
function render() {
  const s = S();
  if (!$('#svs_panel').length) return;
  const tabs = ['status', 'missions', 'shop', 'world', 'settings'];
  $('#svs_tabs').html(tabs.map((k) => `<button class="svs-tab ${s.tab === k ? 'on' : ''}" data-act="tab" data-tab="${k}">${t('tab_' + k)}</button>`).join(''));
  $('#svs_title').text(`【 ${t('title')} 】`);
  const cs = CS(), w = currentWorld();
  $('#svs_pts').text(w && cs ? `${cs.points} ${w.pointName}` : '');
  const views = { status: viewStatus, missions: viewMissions, shop: viewShop, world: viewWorld, settings: viewSettings };
  const body = document.getElementById('svs_body');
  const top = body.scrollTop;
  body.innerHTML = views[s.tab]();
  body.scrollTop = top;
  $('#svs_panel').toggleClass('svs-hidden', !s.open || !s.enabled);
  $('#svs_fab').toggleClass('svs-hidden', !s.showFab || !s.enabled);
  $('#svs_panel,#svs_fab').css('opacity', s.opacity);
}

function renderDrawer() {
  const s = S();
  $('#svs_drawer_body').html(`
    <label class="checkbox_label"><input type="checkbox" id="svs_d_en" ${s.enabled ? 'checked' : ''}><span>${t('s_enabled')}</span></label>
    <label>${t('s_lang')} <select id="svs_d_lang" class="text_pole"><option value="en" ${s.lang === 'en' ? 'selected' : ''}>English</option><option value="ru" ${s.lang === 'ru' ? 'selected' : ''}>Русский</option></select></label>
    <div id="svs_d_open" class="menu_button">${t('open_btn')}</div>`);
  $('#svs_wand_label').text(t('title'));
}

/* ------------------------------------------------------------------- UI */
function openPanel(v) { S().open = v; save(); render(); }

function makeDraggable(el, onTap) {
  let down = false, moved = false, sx, sy, ox, oy;
  el.addEventListener('pointerdown', (e) => {
    down = true; moved = false; sx = e.clientX; sy = e.clientY;
    const r = el.getBoundingClientRect(); ox = r.left; oy = r.top;
    el.setPointerCapture(e.pointerId);
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
}

function buildUI() {
  const s = S();
  $('body').append(`
    <div id="svs_fab" class="svs-hidden" title="System">【S】</div>
    <div id="svs_panel" class="svs-hidden" role="dialog">
      <div class="svs-head">
        <span id="svs_title"></span><span id="svs_pts"></span>
        <span class="svs-spacer"></span>
        <span class="svs-oprow">${opSlider()}</span>
        <button id="svs_close" class="svs-x" aria-label="Close">✕</button>
      </div>
      <div id="svs_tabs" class="svs-tabs"></div>
      <div id="svs_body" class="svs-body"></div>
    </div>`);
  if (s.fabPos) $('#svs_fab').css({ left: s.fabPos.left, top: s.fabPos.top, right: 'auto', bottom: 'auto' });
  makeDraggable(document.getElementById('svs_fab'), () => openPanel(!S().open));

  $('#extensions_settings2, #extensions_settings').first().append(`
    <div class="inline-drawer">
      <div class="inline-drawer-toggle inline-drawer-header"><b>The System</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>
      <div class="inline-drawer-content" id="svs_drawer_body"></div>
    </div>`);
  $('#extensionsMenu').append(`<div id="svs_wand" class="list-group-item flex-container flexGap5"><div class="fa-solid fa-terminal extensionsMenuExtensionButton"></div><span id="svs_wand_label"></span></div>`);

  const $d = $(document);
  $d.on('click', '#svs_wand, #svs_d_open', () => openPanel(true));
  $d.on('click', '#svs_close', () => openPanel(false));
  $d.on('change', '#svs_d_en', (e) => { S().enabled = e.target.checked; save(); render(); });
  $d.on('change', '#svs_d_lang', (e) => { S().lang = e.target.value; save(); renderDrawer(); render(); });

  $d.on('input', '.svs-op', (e) => {
    const v = clamp(Number(e.target.value) / 100, 0.25, 1);
    S().opacity = v; $('.svs-op').val(Math.round(v * 100)); $('#svs_panel,#svs_fab').css('opacity', v); save();
  });

  // field edits (no re-render, so typing is never interrupted)
  $d.on('input change', '#svs_panel [data-field]', (e) => {
    const w = currentWorld(); if (!w) return;
    w[e.target.dataset.field] = e.target.value; save();
  });
  $d.on('change', '#svs_over', (e) => { overwrite = e.target.checked; });
  $d.on('input', '#svs_ask', (e) => { askDraft = e.target.value; });
  $d.on('keydown', '#svs_ask', (e) => { if (e.key === 'Enter') askSystem(); });
  $d.on('change', '#svs_world', (e) => bindWorld(e.target.value));
  $d.on('change', '#svs_file', async (e) => {
    const f = e.target.files[0]; if (!f) return;
    importWorlds(await f.text()); e.target.value = '';
  });

  // settings controls
  const bind = (id, fn) => $d.on('change', id, (e) => { fn(e.target); save(); render(); });
  bind('#svs_en', (el) => { S().enabled = el.checked; renderDrawer(); });
  bind('#svs_lang', (el) => { S().lang = el.value; renderDrawer(); });
  bind('#svs_outlang', (el) => { S().outLang = el.value; });
  bind('#svs_profile', (el) => { S().profileId = el.value; });
  bind('#svs_auto', (el) => { S().autoEval = el.checked; });
  bind('#svs_ctxn', (el) => { S().ctxMessages = clamp(parseInt(el.value) || 6, 2, 30); });
  bind('#svs_strict', (el) => { S().strict = el.value; });
  bind('#svs_fabchk', (el) => { S().showFab = el.checked; });
  bind('#svs_toast', (el) => { S().toasts = el.checked; });

  // buttons
  $d.on('click', '#svs_panel [data-act]', async (e) => {
    const el = e.currentTarget, act = el.dataset.act, cs = CS(), w = currentWorld(), st = S();
    switch (act) {
      case 'tab': st.tab = el.dataset.tab; save(); render(); break;
      case 'eval': evaluate(true); break;
      case 'ask': askSystem(); break;
      case 'reset':
        if (cs && await confirmBox(t('confirm_reset'))) {
          Object.assign(cs, { points: 100, log: [], missions: [], inventory: [], lastUserIdx: -1 });
          bindWorld(cs.worldId);
        }
        break;
      case 'm-ai': aiMission(); break;
      case 'm-add': {
        const title = $('#svs_mt').val().trim(); if (!title || !cs) break;
        addMission(cs, { title, desc: '', reward: $('#svs_mr').val() || 50 }); saveChat(); render(); break;
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
      case 'w-new': { const nw = newWorld(); st.worlds.push(nw); save(); bindWorld(nw.id); break; }
      case 'w-dup': { const nw = newWorld({ ...w, id: uid('w'), name: w.name + ' (2)' }); st.worlds.push(nw); save(); bindWorld(nw.id); break; }
      case 'w-del':
        if (w && await confirmBox(t('confirm_del'))) {
          st.worlds = st.worlds.filter((x) => x.id !== w.id); save(); bindWorld('');
        }
        break;
      case 'w-exp': download(`system-world-${(w.name || 'world').replace(/[^\w-]+/g, '_')}.json`, { type: 'svs-world-profile', version: 1, worlds: [w] }); break;
      case 'w-expall': download('system-worlds.json', { type: 'svs-world-profile', version: 1, worlds: st.worlds }); break;
      case 'w-imp': $('#svs_file').trigger('click'); break;
      case 'fill': fillWorld(); break;
      case 'refresh': render(); break;
      case 'profiles': render(); window.toastr?.info(t('profile_reloaded', { n: getProfiles().length })); break;
    }
  });
}

/* ------------------------------------------------------------------ init */
jQuery(() => {
  S();
  buildUI();
  renderDrawer();
  render();
  const { eventSource, event_types } = ctx();
  eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, () => {
    const s = S();
    if (s.enabled && s.autoEval) setTimeout(() => evaluate(false), 400);
  });
  eventSource.on(event_types.CHAT_CHANGED, () => { askDraft = ''; render(); });
  console.log('[System] loaded');
});
})();
