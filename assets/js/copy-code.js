document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre code").forEach(codeBlock => {
    const container = document.createElement("div");
    container.classList.add("code-container");

    const button = document.createElement("button");
    button.classList.add("copy-button");
    button.innerHTML = `<i class="fa-regular fa-copy"></i>`;

    const pre = codeBlock.parentNode;
    container.appendChild(pre.cloneNode(true));
    pre.replaceWith(container);
    container.prepend(button);

    button.addEventListener("click", () => {
      const codeText = codeBlock.innerText || codeBlock.textContent;

      navigator.clipboard.writeText(codeText).then(() => {
        button.innerHTML = `<i class="fa-solid fa-check"></i>`;
        setTimeout(() => {
          button.innerHTML = `<i class="fa-regular fa-copy"></i>`;
        }, 2000);
      }).catch(err => {
        console.error("Copy failed", err);
      });
    });
  });
});

