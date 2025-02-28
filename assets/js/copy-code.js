document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre code").forEach(codeBlock => {
    const container = document.createElement("div");
    container.classList.add("code-container");

    const button = document.createElement("button");
    button.classList.add("copy-button");
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;

    const pre = codeBlock.parentNode;
    container.appendChild(pre.cloneNode(true));
    pre.replaceWith(container);
    container.prepend(button);

    button.addEventListener("click", () => {
      const codeText = codeBlock.innerText || codeBlock.textContent;

      navigator.clipboard.writeText(codeText).then(() => {
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        setTimeout(() => {
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          `;
        }, 2000);
      }).catch(err => {
        console.error("Copy failed", err);
      });
    });
  });
});
