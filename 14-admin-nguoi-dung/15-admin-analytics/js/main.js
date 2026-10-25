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

const totalUsers = 4;
const ownLogs = [
  { ago: 0, done: true },
  { ago: 1, done: true },
  { ago: 2, done: true },
  { ago: 5, done: false }
];
const memberLogs = [
  [1, 1, 1, 1, 0],
  [0, 0, 0, 1],
  [1, 1],
  [1, 0, 1, 0]
];

const sessions = ownLogs.concat(memberLogs.flatMap(list => list.map((done, index) => ({ ago: index * 2, done: Boolean(done) }))));
const weekdayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const statsView = document.getElementById('statsView');
const rangeSelect = document.getElementById('rangeSelect');

let range = 'all';

function weekdayOf(ago) {
  const date = new Date();
  date.setDate(date.getDate() - ago);
  return (date.getDay() + 6) % 7;
}

function drawStats() {
  const list = sessions.filter(item => range === 'all' || item.ago < Number(range));
  if (list.length === 0) {
    statsView.innerHTML = stateBox('Chưa có dữ liệu trong khoảng thời gian này.');
    return;
  }
  const doneCount = list.filter(item => item.done).length;
  const rate = Math.round(doneCount / list.length * 100);
  const perDay = [0, 0, 0, 0, 0, 0, 0];
  list.forEach(item => perDay[weekdayOf(item.ago)]++);
  const max = Math.max(...perDay, 1);

  const bars = perDay.map((count, index) => `<div class="bar-row">
    <span>${weekdayNames[index]}</span>
    <div class="bar"><div class="bar-fill" style="width: ${count / max * 100}%"></div></div>
    <span>${count}</span>
  </div>`).join('');

  statsView.innerHTML = `<div class="stat-grid">
      ${statCard(totalUsers, 'Người dùng')}
      ${statCard(list.length, 'Buổi tập đã ghi')}
      ${statCard(rate + '%', 'Tỉ lệ hoàn thành')}
    </div>
    <article class="card-box"><h2>Buổi tập theo thứ trong tuần</h2>${bars}</article>`;
}

rangeSelect.addEventListener('change', event => {
  range = event.target.value;
  drawStats();
});

function onFailChange() {
  loadView(statsView, drawStats);
}

loadView(statsView, drawStats);

const roleSwitch = document.getElementById('roleSwitch');
if (roleSwitch) {
  roleSwitch.addEventListener('change', () => {
    const label = roleSwitch.options[roleSwitch.selectedIndex].text;
    showToast('Chuyển sang vai trò ' + label);
    setTimeout(() => { window.location.href = roleSwitch.value; }, 500);
  });
}
