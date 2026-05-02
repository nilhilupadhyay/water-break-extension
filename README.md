# 💧 Water Break — Chrome Extension

> A minimalist animated reminder to hydrate every 20 minutes. A friendly character pops up, drinks water, and gently nudges you to do the same.

![Water Break Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat&logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green?style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

---

## ✨ Features

- ⏰ **Timed reminders** — alerts every 20 minutes (configurable: 10 / 20 / 30 / 45 min)
- 🧍 **Animated character** — a person tilts a glass and drinks with smooth CSS animations
- 🌊 **Transparent frosted overlay** — blurs your screen softly without fully blocking it
- ⏱️ **2-minute auto-dismiss** — countdown bar closes the overlay automatically
- ⏭️ **Skip button** — dismiss instantly anytime
- 🔔 **Popup controls** — enable/disable, change interval, preview the reminder
- 🎨 **Zero dependencies** — pure HTML/CSS/JS, no frameworks

---

## 📁 Project Structure

```
water-break-extension/
├── manifest.json        
├── background.js        
├── overlay.js           
├── overlay.css          
├── popup.html          
├── popup.js             
├── water-break.mp4      
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

---

## 🚀 Installation (Developer Mode)

> Use this method to run the extension locally without publishing it to the Chrome Web Store.

### Step 1 — Clone the repo

### Step 2 — Load in Chrome

1. Open Chrome and go to: 
2. Toggle **Developer mode** 
3. Click **Load unpacked**
4. Select the `water-break-extension/` folder
5. The extension appears in your toolbar — pin it for easy access!

---


---

## ⚙️ Configuration

Open the extension popup (click the 💧 icon in your toolbar) to:

| Setting | Options |
|--------|---------|
| Enable/Disable | Toggle reminders on or off |
| Reminder interval | 10 / 20 / 30 / 45 minutes |
| Preview | Test the overlay immediately |

---

## 🛠️ How It Works

```
background.js (Service Worker)
    │
    ├── Sets a Chrome alarm every N minutes
    │
    └── On alarm → finds active tab → injects overlay.js + overlay.css
                                            │
                                            └── Renders animated character overlay
                                                Auto-dismisses after 2 minutes
                                                Skip button closes immediately
```

- **Manifest V3** compliant — uses `chrome.alarms`, `chrome.scripting`, and `chrome.storage`
- **No persistent background page** — runs as a modern service worker
- **Safe injection** — skips `chrome://` and `chrome-extension://` pages automatically

---

## 🎨 Customization

### Change reminder interval default

In `background.js`, update:
```js
const INTERVAL_MINUTES = 20; // change to any number
```

### Change overlay display duration

In `overlay.js`, update:
```js
const DURATION = 120; // seconds (120 = 2 minutes)
```

### Swap the animated character colors

In `overlay.css`, find the SVG fill values:
```css
/* Skin tone */
fill="#ffe0c8"

/* Shirt color */
fill="#a8d8ea"

/* Water/glass color */
fill="rgba(140,210,255,0.5)"
```

---

## 🙌 Contributing

Pull requests welcome! To contribute:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

*Built with 💧 to keep developers hydrated.*
