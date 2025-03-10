import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/index.css';

// Just start
function start() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Start after load telegram lib
function startWithTelegram(fn) {
  var head = document.getElementsByTagName('head')[0];
  var js = document.createElement("script");
  js.src = "https://telegram.org/js/telegram-web-app.js?56";
  head.appendChild(js);
  js.addEventListener("load", () => {
    window.isMiniApp = window.Telegram.WebApp.initData !== '';
    fn();
  });
}

// Check is run tauri or web
if (window.isTauri) {
  start();
} else {
  startWithTelegram(start);
}
