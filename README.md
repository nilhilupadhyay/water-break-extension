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
├── manifest.json        # Chrome extension config (Manifest V3)
├── background.js        # Service worker — manages alarms & tab injection
├── overlay.js           # Injected into active tab — renders the popup UI
├── overlay.css          # Styles & animations for the overlay
├── popup.html           # Extension toolbar popup UI
├── popup.js             # Popup interaction logic
├── water-break.mp4      # Reference video asset
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

```bash
git clone https://github.com/YOUR_USERNAME/water-break-extension.git
cd water-break-extension
```

### Step 2 — Load in Chrome

1. Open Chrome and go to: `chrome://extensions/`
2. Toggle **Developer mode** ON (top-right corner)
3. Click **Load unpacked**
4. Select the `water-break-extension/` folder
5. The extension appears in your toolbar — pin it for easy access!

---

## 🌐 Publishing to Chrome Web Store

Follow these steps to make your extension publicly available.

### Step 1 — Create a ZIP

```bash
# From inside the project folder
zip -r water-break-extension.zip . --exclude "*.git*" --exclude "*.DS_Store"
```

Or on Windows (PowerShell):
```powershell
Compress-Archive -Path * -DestinationPath water-break-extension.zip
```

### Step 2 — Register as a Chrome Developer

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Sign in with your Google account
3. Pay the **one-time $5 registration fee**

### Step 3 — Submit your extension

1. Click **Add new item**
2. Upload your `water-break-extension.zip`
3. Fill in the store listing:
   - **Name**: Water Break
   - **Short description**: A minimalist animated reminder to drink water every 20 minutes.
   - **Category**: Productivity
   - **Screenshots**: Take a screenshot of the overlay in action (1280×800 or 640×400)
4. Click **Submit for review**

> ⏳ Review typically takes 1–3 business days.

---

## 🔧 Git Setup & Push

### First time setup

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial release of Water Break extension"

# Connect to your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/water-break-extension.git

# Push
git push -u origin main
```

### Subsequent updates

```bash
git add .
git commit -m "fix: improved animation timing"
git push
```

### Recommended `.gitignore`

```
.DS_Store
*.zip
node_modules/
```

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

## 📄 License

MIT License — free to use, modify, and distribute.

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
