const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("mobile-open", !isOpen);
});

document.querySelectorAll(".desktop-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    nav.classList.remove("mobile-open");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // 1. 获取弹窗相关元素
  const modal = document.getElementById("searchModal");
  const openBtn = document.getElementById("openSearchBtn");
  const closeBtn = document.getElementById("closeSearchBtn");
  const input = document.getElementById("modalSearchInput");
  const resultsContainer = document.getElementById("searchResults");

  // 获取所有带有 searchable-item 的卡片（文章和友链）
  // 注意：确保你的HTML卡片上保留了 searchable-item 类名
  const items = document.querySelectorAll(".searchable-item");

  // 2. 打开/关闭弹窗逻辑
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
      setTimeout(() => input.focus(), 100); // 稍微延迟聚焦，体验更好
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      input.value = "";
      resultsContainer.innerHTML = "";
    });
  }

  // 点击遮罩层空白处也可以关闭
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // 按 ESC 键关闭
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });

  // 3. 搜索核心逻辑
  input.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    resultsContainer.innerHTML = ""; // 每次输入先清空列表

    if (query === "") return;

    items.forEach((item) => {
      // 尝试获取标题和摘要，如果没有则用通用文本
      const titleEl = item.querySelector("h3") || item.querySelector("h2");
      const descEl = item.querySelector("p");
      const linkEl = item.querySelector("a");

      const title = titleEl ? titleEl.innerText : "未命名内容";
      const desc = descEl ? descEl.innerText : "";
      const link = linkEl ? linkEl.href : "#";

      // 获取整个卡片的文本用于匹配
      const fullText = item.innerText.toLowerCase();

      // 如果匹配关键词
      if (fullText.includes(query)) {
        // 创建结果项 HTML
        const resultDiv = document.createElement("div");
        resultDiv.className = "result-item";
        resultDiv.innerHTML = `
                    <div class="result-title">${title}</div>
                    <div class="result-desc">${desc.substring(0, 60)}${desc.length > 60 ? "..." : ""}</div>
                `;

        // 点击结果跳转
        resultDiv.addEventListener("click", () => {
          window.location.href = link;
        });

        resultsContainer.appendChild(resultDiv);
      }
    });

    // 如果没有结果提示
    if (resultsContainer.children.length === 0) {
      resultsContainer.innerHTML =
        '<div style="text-align:center;color:#999;padding:30px;">未找到相关内容 🤷‍♂️</div>';
    }
  });
});
