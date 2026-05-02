// popup.js

const enableToggle = document.getElementById('enableToggle');
const testBtn = document.getElementById('testBtn');
const nextAlarmEl = document.getElementById('nextAlarm');
const statusEl = document.getElementById('status');
const intervalBtns = document.querySelectorAll('.interval-btn');

// Load saved state
chrome.storage.local.get(['enabled', 'intervalMinutes'], (data) => {
  enableToggle.checked = data.enabled !== false;
  const mins = data.intervalMinutes || 20;
  intervalBtns.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.mins) === mins);
  });
});

// Load next alarm time
function refreshNextAlarm() {
  chrome.runtime.sendMessage({ action: 'getNextAlarm' }, (res) => {
    if (res && res.alarm) {
      const ms = res.alarm.scheduledTime - Date.now();
      const totalSec = Math.max(0, Math.floor(ms / 1000));
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      nextAlarmEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    } else {
      nextAlarmEl.textContent = 'Paused';
    }
  });
}

refreshNextAlarm();
setInterval(refreshNextAlarm, 5000);

// Toggle enable/disable
enableToggle.addEventListener('change', () => {
  chrome.runtime.sendMessage({ action: 'toggleEnabled' }, (res) => {
    const isOn = res && res.enabled;
    statusEl.textContent = isOn ? 'Protecting your hydration 💧' : 'Reminders paused';
    refreshNextAlarm();
  });
});

// Interval buttons
intervalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const mins = parseInt(btn.dataset.mins);
    intervalBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    chrome.runtime.sendMessage({ action: 'updateInterval', minutes: mins }, () => {
      statusEl.textContent = `Reminding every ${mins} minutes 🕐`;
      setTimeout(() => { statusEl.textContent = 'Protecting your hydration 💧'; }, 2000);
      refreshNextAlarm();
    });
  });
});

// Test overlay
testBtn.addEventListener('click', () => {
  testBtn.textContent = '✓ Triggered!';
  testBtn.disabled = true;
  chrome.runtime.sendMessage({ action: 'testOverlay' });
  setTimeout(() => {
    testBtn.textContent = '▶ Preview Reminder';
    testBtn.disabled = false;
  }, 2000);
});
