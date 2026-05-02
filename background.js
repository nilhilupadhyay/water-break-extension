// background.js - Service Worker

const ALARM_NAME = 'waterBreak';
const INTERVAL_MINUTES = 20;

// Set up alarm on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(ALARM_NAME, {
    delayInMinutes: INTERVAL_MINUTES,
    periodInMinutes: INTERVAL_MINUTES
  });
  chrome.storage.local.set({ enabled: true, intervalMinutes: INTERVAL_MINUTES });
  console.log(`Water Break: Alarm set for every ${INTERVAL_MINUTES} minutes.`);
});

// Listen for alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== ALARM_NAME) return;

  chrome.storage.local.get(['enabled'], (data) => {
    if (!data.enabled) return;
    triggerOverlay();
  });
});

// Inject overlay into active tab
async function triggerOverlay() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) return;

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['overlay.js']
    });

    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['overlay.css']
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (gifSrc, audioSrc) => {
        if (document.getElementById('water-break-overlay')) return;
        if (typeof window.showWaterBreakOverlay === 'function') {
          window.showWaterBreakOverlay(gifSrc, audioSrc);
        }
      },
      args: [chrome.runtime.getURL('drink-water.gif'), chrome.runtime.getURL('drink-sound.mp3')]
    });
  } catch (err) {
    console.error('Water Break: Failed to inject overlay', err);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'testOverlay') {
    triggerOverlay();
    sendResponse({ ok: true });
  }
  if (msg.action === 'updateInterval') {
    const mins = msg.minutes || 20;
    chrome.alarms.clear(ALARM_NAME, () => {
      chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: mins,
        periodInMinutes: mins
      });
    });
    chrome.storage.local.set({ intervalMinutes: mins });
    sendResponse({ ok: true });
  }
  if (msg.action === 'toggleEnabled') {
    chrome.storage.local.get(['enabled'], (data) => {
      const next = !data.enabled;
      chrome.storage.local.set({ enabled: next });
      if (!next) {
        chrome.alarms.clear(ALARM_NAME);
      } else {
        chrome.storage.local.get(['intervalMinutes'], (d) => {
          const mins = d.intervalMinutes || 20;
          chrome.alarms.create(ALARM_NAME, { delayInMinutes: mins, periodInMinutes: mins });
        });
      }
      sendResponse({ enabled: next });
    });
    return true; // async
  }
  if (msg.action === 'getNextAlarm') {
    chrome.alarms.get(ALARM_NAME, (alarm) => {
      sendResponse({ alarm });
    });
    return true;
  }
  return true;
});
