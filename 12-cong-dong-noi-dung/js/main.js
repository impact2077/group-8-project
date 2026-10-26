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
if (logoutBtn) logoutBtn.addEventListener('click', () => { showToast('Đã đăng xuất (bản demo)'); setTimeout(() => { window.location.href = '../02-dang-nhap/index.html'; }, 700); });

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

const items = [
  { id: 1, title: '5 cách giữ thói quen tập', body: 'Đặt lịch cố định, bắt đầu nhỏ, ghi log mỗi buổi.' },
  { id: 2, title: 'Ngủ đủ giấc để tăng cơ', body: 'Cơ phục hồi tốt nhất khi ngủ 7–8 tiếng mỗi đêm.' }
];

const fields = [
  {
    "name": "title",
    "label": "Tiêu đề",
    "type": "text",
    "required": true
  },
  {
    "name": "body",
    "label": "Nội dung",
    "type": "textarea",
    "required": true
  }
];

const columns = [
  { title: 'Tiêu đề', render: item => escapeHtml(item.title) },
  { title: 'Nội dung', render: item => escapeHtml(item.body.length > 50 ? item.body.slice(0, 50) + '...' : item.body) }
];

const noun = 'bài viết';
const emptyText = 'Chưa có bài viết nào.';
const archiveLabels = null;
const defaults = {};

const form = document.getElementById('itemForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const listBox = document.getElementById('itemList');

let editingId = null;
let nextId = items.length ? Math.max(...items.map(item => item.id)) + 1 : 1;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function setError(name, message) {
  document.getElementById('err_' + name).textContent = message;
  form.elements[name].classList.toggle('invalid', message !== '');
}

function resetForm() {
  editingId = null;
  form.reset();
  fields.forEach(field => {
    if (field.defaultToday) form.elements[field.name].value = today();
    setError(field.name, '');
  });
  formTitle.textContent = 'Thêm ' + noun;
  submitBtn.textContent = 'Thêm';
  cancelBtn.hidden = true;
}

function validate() {
  let valid = true;
  fields.forEach(field => {
    const value = form.elements[field.name].value.trim();
    let message = '';
    if (field.required && value === '') {
      message = field.label + ' không được để trống.';
    } else if (field.type === 'number' && value !== '' && !(Number(value) >= 1)) {
      message = field.label + ' phải là số dương.';
    } else if (field.type === 'email' && value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      message = 'Email không hợp lệ.';
    }
    setError(field.name, message);
    if (message) valid = false;
  });
  return valid;
}

function drawList() {
  if (items.length === 0) {
    listBox.innerHTML = stateBox(emptyText);
  } else {
    const head = columns.map(col => `<th>${col.title}</th>`).join('') + '<th>Thao tác</th>';
    const rows = items.map(item => {
      const cells = columns.map(col => `<td>${col.render(item)}</td>`).join('');
      const second = archiveLabels
        ? `<button type="button" class="btn btn-ghost" data-action="archive" data-id="${item.id}">${item.archived ? archiveLabels[1] : archiveLabels[0]}</button>`
        : `<button type="button" class="btn btn-danger" data-action="delete" data-id="${item.id}">Xóa</button>`;
      return `<tr>${cells}<td><div class="actions"><button type="button" class="btn" data-action="edit" data-id="${item.id}">Sửa</button>${second}</div></td></tr>`;
    }).join('');
    listBox.innerHTML = `<div class="table-wrap"><table class="data-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }
  afterChange();
}

function afterChange() {}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validate()) return;
  const data = {};
  fields.forEach(field => {
    const value = form.elements[field.name].value.trim();
    data[field.name] = field.type === 'number' ? Number(value) : value;
  });
  if (editingId !== null) {
    Object.assign(items.find(item => item.id === editingId), data);
    showToast('Đã lưu thay đổi');
  } else {
    items.push({ id: nextId++, ...defaults, ...data });
    showToast('Đã thêm ' + noun);
  }
  resetForm();
  drawList();
});

cancelBtn.addEventListener('click', resetForm);

listBox.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  const item = items.find(entry => entry.id === id);
  const action = button.dataset.action;

  if (action === 'edit') {
    editingId = id;
    fields.forEach(field => {
      form.elements[field.name].value = item[field.name];
      setError(field.name, '');
    });
    formTitle.textContent = 'Sửa ' + noun;
    submitBtn.textContent = 'Lưu';
    cancelBtn.hidden = false;
    form.scrollIntoView({ behavior: 'smooth' });
  } else if (action === 'delete') {
    if (confirm('Bạn có chắc muốn xóa mục này?')) {
      items.splice(items.indexOf(item), 1);
      if (editingId === id) resetForm();
      drawList();
      showToast('Đã xóa');
    }
  } else if (action === 'archive') {
    item.archived = !item.archived;
    drawList();
  }
});

function onFailChange() {
  loadView(listBox, drawList);
}

resetForm();
loadView(listBox, drawList);

const roleSwitch = document.getElementById('roleSwitch');
if (roleSwitch) {
  roleSwitch.addEventListener('change', () => {
    const label = roleSwitch.options[roleSwitch.selectedIndex].text;
    showToast('Chuyển sang vai trò ' + label);
    setTimeout(() => { window.location.href = roleSwitch.value; }, 500);
  });
}
