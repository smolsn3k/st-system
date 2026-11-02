# The System — SillyTavern extension

**English** | [Русский](README.ru.md)

A private, game-like **System** for SillyTavern, inspired by *Scum Villain's Self-Saving System*. It watches your roleplay and tells **you** how well you play your role: it gives points for acting in character, takes them away for out-of-character behaviour, hands out missions and runs a shop. Only you can see it. Nothing is written into the chat or the prompt, so the character never knows the System exists.

Works with any fandom and any character, on desktop and mobile.

## What it does

- **Points, missions and shop** — in-character acts earn points, OOC acts cost points. Missions, a shop with an inventory, and an "Ask the System" box for private hints.
- **Optional death / expulsion risk** — the System warns you from the start; if your points drop to zero or below, it erases you and locks the profile until you restart it. Can be switched on or off in settings.
- **Optional punishment quests** — instead of death, the System answers clear out-of-character acts and a zero balance with special penalty quests. Completing one restores points; declining it costs half of its reward. Can be switched on or off in settings.
- **Undo** for accidentally completed or abandoned quests.
- **World profiles for any fandom** — bind yourself to a **canon character**, or be inserted as an **original character** with your own story and entry point in the canon timeline.
- **Fill a profile automatically** from the model's own knowledge of the fandom, from Fandom wiki page links, from a lorebook, or from your own description. Or write everything by hand.
- **Save, switch, import and export profiles** — each profile keeps its own points, missions and items inside every chat.
- **In-chat popup** — a collapsible System window drawn in the chat, at the top, middle or bottom of a message. It is display-only.
- **On/off per chat**, plus an optional "new chats start switched off".
- **Look and feel** — holographic HUD style, opacity and background blur sliders, optional rounded corners, a softened (or hidden) decorative pattern, resizable draggable floating button, avatar from your persona, the chat character or your own image.
- **Connection profile chooser** (uses SillyTavern's Connection Manager) with a reload button, so the System can use a different model from your main chat.
- **English and Russian** interface; the System can speak a different language than the interface or match the chat.
- **Diagnostics** button that checks the extension and the model connection and produces a report you can copy.

## Installation

### From GitHub (recommended)

1. In SillyTavern open **Extensions** (puzzle-piece icon) → **Install extension**.
2. Paste the link and confirm:

   ```
   https://github.com/smolsn3k/st-system
   ```

3. Reload the page. A small **S** button appears on the screen (you can also open the System from the Wand menu or from Extensions → The System).

### Manually

1. Download this repository as a ZIP and unpack it so that the folder `st-system` contains `manifest.json`, `index.js` and `style.css`.
2. Put the folder into `SillyTavern/data/<your-user>/extensions/` (for one user) or `SillyTavern/public/scripts/extensions/third-party/` (for everyone).
3. Restart or reload SillyTavern.

**Requirements:** SillyTavern 1.13 or newer. For the connection profile chooser, enable the built-in **Connection Manager** extension.

## Quick start

1. Tap **S** → **World** → **New**.
2. Choose canon or original character, type the fandom and character name, then press **Fill with AI** (or add wiki links, pick a lorebook, or write the profile yourself).
3. Chat as usual. After each character reply the System judges your last message.
