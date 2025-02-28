document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("pre code").forEach(codeBlock => {
      const container = document.createElement("div");
      container.classList.add("code-container");
  
      const button = document.createElement("button");
      button.classList.add("copy-button");
      button.textContent = "Copy";
  
      codeBlock.parentNode.replaceWith(container);
      container.appendChild(button);
      container.appendChild(codeBlock.parentNode);
      
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          button.textContent = "Copied!";
          setTimeout(() => (button.textContent = "Copy"), 2000);
        });
      });
    });
  });
  