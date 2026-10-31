# The System – SillyTavern extension

A private, game-like "System" (inspired by *Scum Villain's Self-Saving System*) that only YOU can see.
It watches your roleplay, hands out points for staying in character, deducts them for OOC behaviour,
gives missions and runs a shop. The character in the chat never sees any of it:
nothing is written into the chat or into the prompt of the character.

## Install
Copy the folder to `SillyTavern/public/scripts/extensions/third-party/SillyTavern-System/`
(or upload it to GitHub and use *Extensions → Install extension*). Reload SillyTavern.
Requires SillyTavern 1.13+. For the connection profile chooser, enable the built-in **Connection Manager** extension.

## Use
1. Tap the 【S】 button (or Wand menu → System, or Extensions → System → Open).
2. World tab → New → type a fandom + character → **Fill with AI** (or paste wiki URLs, pick a lorebook, or write it yourself).
3. Chat as usual. After each character reply the System judges your last message.

## Troubleshooting
Tap the stethoscope icon in the panel header (or Extensions → The System → Diagnostics) and press **Run diagnostics**.
It checks the DOM, events, settings, chat state, Connection Manager, a live model call and Fandom access,
then lets you copy a plain-text report. From the browser console you can also run `__svsDiag()`.
If the floating button is off screen: Settings → Reset button position.
