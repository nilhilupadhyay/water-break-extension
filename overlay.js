// overlay.js - injected into the active tab

window.showWaterBreakOverlay = function(gifSrc, audioSrc) {
  if (document.getElementById('water-break-overlay')) return;

  const DURATION = 120; // 2 minutes in seconds

  const overlay = document.createElement('div');
  overlay.id = 'water-break-overlay';

  overlay.innerHTML = `
    <div class="wb-backdrop"></div>
    <div class="wb-container">

      <div class="wb-rings">
        <div class="wb-ring wb-ring-1"></div>
        <div class="wb-ring wb-ring-2"></div>
        <div class="wb-ring wb-ring-3"></div>
      </div>

      <div class="wb-media-wrap">
        <img class="wb-gif" src="${gifSrc}" alt="Drink water!" />
        <div class="wb-drops">
          <span class="wb-drop wb-drop-1">💧</span>
          <span class="wb-drop wb-drop-2">💧</span>
          <span class="wb-drop wb-drop-3">💧</span>
        </div>
      </div>

      <div class="wb-text">
        <div class="wb-title">Time to Hydrate! 💧</div>
        <div class="wb-subtitle">Step away. Take a long sip. You earned it.</div>
        <div class="wb-timer-bar-wrap">
          <div class="wb-timer-bar" id="wb-timer-bar"></div>
        </div>
        <div class="wb-timer-label" id="wb-timer-label">2:00</div>
      </div>

      <button class="wb-skip" id="wb-skip-btn">Skip \u2192</button>

    </div>
  `;

  document.body.appendChild(overlay);

  // Play audio looped for full 2 min
  const audio = new Audio(audioSrc);
  audio.loop = true;
  audio.volume = 0.75;
  audio.play().catch(() => {});

  // Countdown timer
  let elapsed = 0;
  const bar = document.getElementById('wb-timer-bar');
  const label = document.getElementById('wb-timer-label');

  const interval = setInterval(() => {
    elapsed++;
    const pct = (elapsed / DURATION) * 100;
    if (bar) bar.style.width = pct + '%';
    const remaining = DURATION - elapsed;
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    if (label) label.textContent = m + ':' + String(s).padStart(2, '0');
    if (elapsed >= DURATION) {
      clearInterval(interval);
      removeOverlay();
    }
  }, 1000);

  document.getElementById('wb-skip-btn').addEventListener('click', () => {
    clearInterval(interval);
    removeOverlay();
  });

  function removeOverlay() {
    audio.pause();
    audio.src = '';
    const el = document.getElementById('water-break-overlay');
    if (el) {
      el.style.animation = 'wb-fadeOut 0.5s ease forwards';
      setTimeout(() => el.remove(), 500);
    }
  }
};
