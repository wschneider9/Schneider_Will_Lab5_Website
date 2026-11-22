/* ============================================================
   Chatbot widget — loaded on BOTH pages (index.html + guide.html)
   Opens the Lab 3 Chatling bot (First-Time Homebuyer Assistant)
   in a floating chat window.

   To use a different bot, change CHATBOT_URL below.
   ============================================================ */

const CHATBOT_URL = "https://share.chatling.ai/s/66fFS2Vn9b7ALun";

(function () {
  const icons = {
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  // Floating launcher button
  const launcher = document.createElement("button");
  launcher.className = "chat-launcher";
  launcher.setAttribute("aria-label", "Open the Homebuyer Assistant chat");
  launcher.innerHTML = icons.chat + "<span>Ask a homebuying question</span>";

  // Chat window
  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "First-Time Homebuyer Assistant");
  panel.innerHTML = `
    <div class="chat-head">
      <div>
        <strong>First-Time Homebuyer Assistant</strong>
        <small>General education, not financial advice</small>
      </div>
      <button class="chat-close" aria-label="Close chat">${icons.close}</button>
    </div>
    <div class="chat-body">
      <div class="chat-wait">
        <p>Loading the assistant&hellip;</p>
        <p>If it doesn't appear, open it in a new tab.</p>
      </div>
    </div>
    <div class="chat-foot">
      <span>Powered by Chatling</span>
      <a href="${CHATBOT_URL}" target="_blank" rel="noopener">Open in new tab</a>
    </div>`;

  document.body.append(panel, launcher);

  let loaded = false;
  function openChat() {
    if (!loaded) {
      const frame = document.createElement("iframe");
      frame.src = CHATBOT_URL;
      frame.title = "First-Time Homebuyer Assistant";
      frame.allow = "clipboard-write";
      panel.querySelector(".chat-body").appendChild(frame);
      loaded = true;
    }
    panel.classList.add("open");
    launcher.innerHTML = icons.close + "<span>Close chat</span>";
  }
  function closeChat() {
    panel.classList.remove("open");
    launcher.innerHTML = icons.chat + "<span>Ask a homebuying question</span>";
  }

  launcher.addEventListener("click", () => panel.classList.contains("open") ? closeChat() : openChat());
  panel.querySelector(".chat-close").addEventListener("click", closeChat);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeChat(); });

  // Any button with data-open-chat also opens the chat
  document.querySelectorAll("[data-open-chat]").forEach(btn =>
    btn.addEventListener("click", e => { e.preventDefault(); openChat(); })
  );
})();
