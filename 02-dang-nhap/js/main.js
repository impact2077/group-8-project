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

const users = [
  { name: 'Nguyễn Văn An', email: 'an@mail.com' },
  { name: 'Coach Hùng', email: 'hung@mail.com' },
  { name: 'Lan Điều Phối', email: 'lan@mail.com' },
  { name: 'Admin', email: 'admin@mail.com' }
];

const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const formError = document.getElementById('formError');
const loginResult = document.getElementById('loginResult');

function setError(name, message) {
  document.getElementById('err_' + name).textContent = message;
  loginForm.elements[name].classList.toggle('invalid', message !== '');
}

function validateLogin(email, password) {
  let valid = true;
  if (email === '') {
    setError('email', 'Vui lòng nhập email.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('email', 'Email không hợp lệ.');
    valid = false;
  } else {
    setError('email', '');
  }
  if (password === '') {
    setError('password', 'Vui lòng nhập mật khẩu.');
    valid = false;
  } else {
    setError('password', '');
  }
  return valid;
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = loginForm.elements.email.value.trim();
  const password = loginForm.elements.password.value;
  const role = loginForm.elements.role.value;
  formError.textContent = '';
  if (!validateLogin(email, password)) return;

  loginBtn.disabled = true;
  loginBtn.textContent = 'Đang đăng nhập...';

  setTimeout(() => {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Đăng nhập';
    if (password.length < 6) {
      formError.textContent = 'Sai email hoặc mật khẩu.';
      return;
    }
    const user = users.find(item => item.email === email);
    const name = user ? user.name : email.split('@')[0];
    loginResult.innerHTML = 'Xin chào <strong>' + escapeHtml(name) + '</strong> — vai trò ' + escapeHtml(role) + '.';
    loginResult.classList.add('success-text');
    showToast('Đăng nhập thành công');
  }, 400);
});
