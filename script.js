const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('mobile-open', !isOpen);
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('mobile-open');
  });
});
// 等待页面加载完成后再执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取搜索框和所有带有 searchable-item 标记的卡片
    const searchInput = document.getElementById('blogSearchInput');
    const items = document.querySelectorAll('.searchable-item');

    // 2. 只有当页面上存在搜索框时，才启动监听（防止报错）
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            // 获取输入内容，转成小写以忽略大小写差异
            const query = this.value.toLowerCase().trim();

            items.forEach(item => {
                // 获取卡片内的所有文本内容
                const text = item.innerText.toLowerCase();

                // 核心逻辑：匹配则显示，不匹配则隐藏
                if (query === '' || text.includes(query)) {
                    item.style.display = ''; 
                } else {
                    item.style.display = 'none'; 
                }
            });
        });
    }
});
