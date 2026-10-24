const members = [
  { id: 1, name: 'Nguyễn Văn An', goal: 'Giảm cân', sessions: 4, logs: [true, true, true, true, false] },
  { id: 2, name: 'Trần Thị Bình', goal: 'Tăng cơ', sessions: 5, logs: [false, false, false, true] },
  { id: 3, name: 'Lê Minh Cường', goal: 'Duy trì', sessions: 3, logs: [true, true] },
  { id: 4, name: 'Phạm Thu Hà', goal: 'Tăng cơ', sessions: 4, logs: [true, false, true, false] }
];

const plans = [
  { member: 'Nguyễn Văn An', status: 'pending' },
  { member: 'Trần Thị Bình', status: 'rejected' },
  { member: 'Lê Minh Cường', status: 'completed' },
  { member: 'Phạm Thu Hà', status: 'archived' }
];

const memberList = document.getElementById('memberList');
const resultCount = document.getElementById('resultCount');
const searchInput = document.getElementById('searchInput');
const goalSelect = document.getElementById('goalSelect');
const failToggle = document.getElementById('failToggle');
const pendingCount = document.getElementById('pendingCount');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const modalName = document.getElementById('modalName');
const modalGoal = document.getElementById('modalGoal');
const modalLogs = document.getElementById('modalLogs');
const modalSummary = document.getElementById('modalSummary');
const toast = document.getElementById('toast');

let keyword = '';
let goal = '';
let currentId = null;
let lastButton = null;
let toastTimer;

function removeAccents(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

function getDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function stateBox(message, buttons = '') {
  return `<div class="state-box">${message}${buttons}</div>`;
}

function onClick(selector, handler) {
  const element = document.querySelector(selector);
  if (element) element.addEventListener('click', handler);
}

function getFilteredMembers() {
  const key = removeAccents(keyword.trim());
  return members.filter(m => removeAccents(m.name).includes(key) && (goal === '' || m.goal === goal));
}

function renderMembers() {
  if (failToggle.checked) {
    resultCount.textContent = '';
    memberList.innerHTML = stateBox('Không thể tải dữ liệu. Vui lòng thử lại.', '<button type="button" class="btn btn-primary" id="retryBtn">Thử lại</button>');
    onClick('#retryBtn', loadMembers);
    return;
  }

  const list = getFilteredMembers();
  resultCount.textContent = 'Hiển thị ' + list.length + '/' + members.length + ' học viên';

  if (list.length === 0) {
    memberList.innerHTML = stateBox('Không tìm thấy học viên nào.', '<button type="button" class="btn btn-primary" id="clearBtn">Xóa bộ lọc</button>');
    onClick('#clearBtn', () => {
      keyword = '';
      goal = '';
      searchInput.value = '';
      goalSelect.value = '';
      renderMembers();
    });
    return;
  }

  memberList.innerHTML = list.map(m => `
    <article class="member-card">
      <h3>${m.name}</h3>
      <p>${m.goal} — ${m.sessions} buổi/tuần</p>
      <button type="button" class="btn" data-id="${m.id}">Xem chi tiết</button>
    </article>`).join('');

  memberList.querySelectorAll('button[data-id]').forEach(button => {
    button.addEventListener('click', () => openModal(Number(button.dataset.id), button));
  });
}

function loadMembers() {
  memberList.innerHTML = stateBox('Đang tải...');
  setTimeout(renderMembers, 300);
}

function renderLogs(member) {
  if (failToggle.checked) {
    modalLogs.innerHTML = stateBox('Không thể tải log.', '<button type="button" class="btn btn-primary" id="retryLogs">Thử lại</button>');
    onClick('#retryLogs', () => renderLogs(member));
    return;
  }
  if (member.logs.length === 0) {
    modalLogs.innerHTML = stateBox('Chưa có log nào.');
    return;
  }
  const items = member.logs.map((done, i) => `<li>${getDate(i * 2)} — ${done ? 'Xong' : 'Bỏ dở'}</li>`);
  modalLogs.innerHTML = '<ul>' + items.join('') + '</ul>';
}

function renderSummary(member) {
  modalSummary.innerHTML = stateBox('Đang xử lý...');

  setTimeout(() => {
    if (currentId !== member.id) return;

    const total = member.logs.length;
    const done = member.logs.filter(item => item).length;
    const rate = done / total;
    const retry = '<button type="button" class="btn btn-primary" id="retrySummary">Thử lại</button>';

    if (total < 3) {
      modalSummary.innerHTML = stateBox('Không đủ dữ liệu để tóm tắt (cần ít nhất 3 buổi).', retry);
      onClick('#retrySummary', () => renderSummary(member));
      return;
    }

    if (rate >= 0.4 && rate <= 0.6) {
      modalSummary.innerHTML = stateBox('AI chưa chắc chắn về tóm tắt này.',
        '<button type="button" class="btn btn-ghost" id="rawLogs">Xem log gốc</button>' + retry +
        '<button type="button" class="btn btn-ghost" id="reportBtn">Báo cáo</button>');
      onClick('#rawLogs', () => document.getElementById('logTitle').scrollIntoView({ behavior: 'smooth' }));
      onClick('#retrySummary', () => renderSummary(member));
      onClick('#reportBtn', () => showToast('Đã gửi báo cáo'));
      return;
    }

    const good = rate >= 0.7;
    modalSummary.innerHTML = `<div class="ai-box">
      <span class="badge ${good ? 'badge-ok' : 'badge-warn'}">${good ? 'Tốt' : 'Cần chú ý'}</span>
      Hoàn thành ${Math.round(rate * 100)}% trong ${total} buổi gần nhất (mục tiêu ${member.sessions} buổi/tuần).
    </div>`;
  }, 600);
}

function openModal(id, button) {
  const member = members.find(m => m.id === id);
  currentId = id;
  lastButton = button;
  modalName.textContent = member.name;
  modalGoal.textContent = member.goal + ' — ' + member.sessions + ' buổi/tuần';
  renderLogs(member);
  renderSummary(member);
  modal.hidden = false;
  document.body.classList.add('no-scroll');
  closeBtn.focus();
}

function closeModal() {
  modal.hidden = true;
  currentId = null;
  document.body.classList.remove('no-scroll');
  if (lastButton) lastButton.focus();
}

searchInput.addEventListener('input', event => {
  keyword = event.target.value;
  renderMembers();
});

goalSelect.addEventListener('change', event => {
  goal = event.target.value;
  renderMembers();
});

failToggle.addEventListener('change', () => {
  loadMembers();
  if (currentId !== null) renderLogs(members.find(m => m.id === currentId));
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

document.getElementById('logoutBtn').addEventListener('click', () => showToast('Đã đăng xuất (bản demo)'));

document.querySelectorAll('[data-soon]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showToast('Trang này thuộc phần khác của BTL nhóm');
  });
});

pendingCount.textContent = plans.filter(p => p.status === 'pending').length;
loadMembers();
