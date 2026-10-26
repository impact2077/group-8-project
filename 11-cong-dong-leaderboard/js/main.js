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

const board = [
  { id: 1, name: 'Nguyễn Văn An', score: 980, hidden: false },
  { id: 2, name: 'Trần Thị Bình', score: 910, hidden: false },
  { id: 3, name: 'Lê Minh Cường', score: 905, hidden: false }
];

const boardList = document.getElementById('boardList');

function drawBoard() {
  if (board.length === 0) {
    boardList.innerHTML = stateBox('Chưa có thành viên nào trên bảng xếp hạng.');
    return;
  }
  const sorted = board.slice().sort((a, b) => b.score - a.score);
  const rows = sorted.map((member, index) => `<tr>
    <td>${index + 1}</td>
    <td>${escapeHtml(member.name)}</td>
    <td><input type="number" min="0" value="${member.score}" data-score="${member.id}" aria-label="Điểm của ${escapeHtml(member.name)}"></td>
    <td><span class="badge ${member.hidden ? 'badge-gray' : 'badge-ok'}">${member.hidden ? 'Đã ẩn' : 'Hợp lệ'}</span></td>
    <td><div class="actions">
      <button type="button" class="btn" data-action="save" data-id="${member.id}">Lưu điểm</button>
      <button type="button" class="btn btn-ghost" data-action="toggle" data-id="${member.id}">${member.hidden ? 'Hiện' : 'Ẩn'}</button>
    </div></td>
  </tr>`).join('');
  boardList.innerHTML = `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>#</th><th>Thành viên</th><th>Điểm</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
    <tbody>${rows}</tbody></table></div>`;
}

boardList.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  const member = board.find(item => item.id === id);

  if (button.dataset.action === 'save') {
    const input = boardList.querySelector('input[data-score="' + id + '"]');
    const value = input.value.trim();
    if (value === '' || Number(value) < 0) {
      input.classList.add('invalid');
      showToast('Điểm phải là số không âm');
      return;
    }
    member.score = Number(value);
    drawBoard();
    showToast('Đã lưu điểm');
  } else if (button.dataset.action === 'toggle') {
    member.hidden = !member.hidden;
    drawBoard();
  }
});

function onFailChange() {
  loadView(boardList, drawBoard);
}

loadView(boardList, drawBoard);

const roleSwitch = document.getElementById('roleSwitch');
if (roleSwitch) {
  roleSwitch.addEventListener('change', () => {
    const label = roleSwitch.options[roleSwitch.selectedIndex].text;
    showToast('Chuyển sang vai trò ' + label);
    setTimeout(() => { window.location.href = roleSwitch.value; }, 500);
  });
}
