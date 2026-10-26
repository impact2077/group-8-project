const toast = document.getElementById('toast');
const failToggle = document.getElementById('failToggle');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function stateBox(message, buttons = '') {
  return `<div class="state-box">${message}${buttons}</div>`;
}

function statCard(value, label) {
  return `<div class="stat-card"><strong>${value}</strong><span>${label}</span></div>`;
}

function loadView(container, render) {
  container.innerHTML = stateBox('Đang tải...');
  setTimeout(() => {
    if (failToggle && failToggle.checked) {
      container.innerHTML = stateBox('Không thể tải dữ liệu. Vui lòng thử lại.', '<button type="button" class="btn btn-primary retry-btn">Thử lại</button>');
      container.querySelector('.retry-btn').addEventListener('click', () => loadView(container, render));
      return;
    }
    render();
  }, 300);
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.addEventListener('click', () => showToast('Đã đăng xuất (bản demo)'));

document.querySelectorAll('[data-soon]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showToast('Trang này thuộc phần khác của BTL nhóm');
  });
});

if (failToggle) {
  failToggle.addEventListener('change', () => {
    if (typeof onFailChange === 'function') onFailChange();
  });
}


