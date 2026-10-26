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

const registerForm = document.getElementById('registerForm');
const registerResult = document.getElementById('registerResult');

function setError(name, message) {
  document.getElementById('err_' + name).textContent = message;
  registerForm.elements[name].classList.toggle('invalid', message !== '');
}

function validateRegister(name, email, password) {
  let valid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === '') {
    setError('name', 'Họ tên không được để trống.');
    valid = false;
  } else {
    setError('name', '');
  }

  if (email === '') {
    setError('email', 'Email không được để trống.');
    valid = false;
  } else if (!emailPattern.test(email)) {
    setError('email', 'Email không hợp lệ.');
    valid = false;
  } else if (users.some(user => user.email === email)) {
    setError('email', 'Email này đã được đăng ký.');
    valid = false;
  } else {
    setError('email', '');
  }

  if (password === '') {
    setError('password', 'Mật khẩu không được để trống.');
    valid = false;
  } else if (password.length < 6) {
    setError('password', 'Mật khẩu tối thiểu 6 ký tự.');
    valid = false;
  } else {
    setError('password', '');
  }
  return valid;
}

registerForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = registerForm.elements.name.value.trim();
  const email = registerForm.elements.email.value.trim();
  const password = registerForm.elements.password.value;
  registerResult.textContent = '';
  registerResult.classList.remove('success-text');
  if (!validateRegister(name, email, password)) return;

  users.push({ name, email });
  registerForm.reset();
  registerResult.textContent = 'Tạo tài khoản thành công. Bạn có thể đăng nhập ngay.';
  registerResult.classList.add('success-text');
  showToast('Tạo tài khoản thành công');
});
