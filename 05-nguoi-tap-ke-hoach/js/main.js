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

const templates = [
  { name: 'Squat', group: 'Chân', sets: 3, reps: 12 },
  { name: 'Plank', group: 'Bụng', sets: 3, reps: 30 },
  { name: 'Chạy bộ', group: 'Cardio', sets: 1, reps: 20 },
  { name: 'Đẩy tạ ngực', group: 'Ngực', sets: 4, reps: 8 },
  { name: 'Kéo xà', group: 'Lưng', sets: 3, reps: 10 }
];

const groupsByGoal = {
  'Giảm cân': ['Cardio', 'Chân', 'Bụng'],
  'Tăng cơ': ['Ngực', 'Lưng', 'Chân'],
  'Duy trì': ['Cardio', 'Bụng']
};

const goalForm = document.getElementById('goalForm');
const aiBox = document.getElementById('aiBox');
const currentBox = document.getElementById('currentPlan');

let ai = { status: 'idle' };
let currentPlan = null;

function setError(name, message) {
  document.getElementById('err_' + name).textContent = message;
  goalForm.elements[name].classList.toggle('invalid', message !== '');
}

function drawAi() {
  if (ai.status === 'idle') {
    aiBox.innerHTML = '<p class="muted">Chọn mục tiêu rồi bấm "AI gợi ý kế hoạch".</p>';
  } else if (ai.status === 'run') {
    aiBox.innerHTML = stateBox('Đang xử lý...');
  } else if (ai.status === 'fail') {
    aiBox.innerHTML = stateBox('Không đủ dữ liệu để đề xuất.',
      '<button type="button" class="btn btn-primary" data-action="retry">Thử lại</button><button type="button" class="btn btn-ghost" data-action="manual">Dùng thủ công</button>');
  } else if (ai.status === 'ok') {
    aiBox.innerHTML = `<div class="ai-box"><strong>Gợi ý cho "${escapeHtml(ai.goal)}", ${ai.sessions} buổi/tuần:</strong>
      <ul>${ai.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      <p class="muted">Chọn từ thư viện template theo nhóm cơ phù hợp mục tiêu.</p></div>
      <div class="actions">
        <button type="button" class="btn btn-ok" data-action="accept">Chấp nhận</button>
        <button type="button" class="btn" data-action="edit">Chỉnh sửa</button>
        <button type="button" class="btn btn-ghost" data-action="retry">Thử lại</button>
      </div>`;
  } else {
    aiBox.innerHTML = `<form id="editForm" novalidate>
      <div class="field">
        <label for="itemsText">Mỗi dòng một bài tập</label>
        <textarea id="itemsText" rows="5">${escapeHtml(ai.items.join('\n'))}</textarea>
        <span class="error-text" id="err_items"></span>
      </div>
      <button type="submit" class="btn btn-primary">Lưu và gửi duyệt</button>
    </form>`;
  }
}

function drawCurrent() {
  if (!currentPlan) {
    currentBox.innerHTML = stateBox('Chưa có kế hoạch. Hãy tạo bằng AI hoặc thủ công.');
    return;
  }
  currentBox.innerHTML = `<article class="card-box"><h2>Kế hoạch hiện tại</h2>
    <ul>${currentPlan.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <p><span class="badge badge-warn">Đang chờ duyệt</span></p>
    <button type="button" class="btn btn-ghost" id="editCurrentBtn">Sửa</button></article>`;
  document.getElementById('editCurrentBtn').addEventListener('click', () => {
    ai = { status: 'edit', items: currentPlan.items.slice() };
    drawAi();
    aiBox.scrollIntoView({ behavior: 'smooth' });
  });
}

function generate() {
  const goal = goalForm.elements.goal.value;
  const sessions = Number(goalForm.elements.sessions.value);
  let valid = true;

  if (goal === '') {
    setError('goal', 'Vui lòng chọn mục tiêu.');
    valid = false;
  } else {
    setError('goal', '');
  }
  if (!(sessions >= 1)) {
    setError('sessions', 'Số buổi/tuần phải là số dương.');
    valid = false;
  } else {
    setError('sessions', '');
  }
  if (!valid) {
    ai = { status: 'fail' };
    drawAi();
    return;
  }

  ai = { status: 'run' };
  drawAi();
  setTimeout(() => {
    const items = templates
      .filter(item => groupsByGoal[goal].includes(item.group))
      .slice(0, sessions)
      .map(item => item.name + ' — ' + item.sets + ' hiệp x ' + item.reps);
    ai = items.length ? { status: 'ok', goal, sessions, items } : { status: 'fail' };
    drawAi();
  }, 600);
}

function submitPlan(items) {
  currentPlan = { items };
  ai = { status: 'idle' };
  drawAi();
  drawCurrent();
  showToast('Đã gửi huấn luyện viên duyệt');
}

goalForm.addEventListener('submit', event => {
  event.preventDefault();
  generate();
});

document.getElementById('manualBtn').addEventListener('click', () => {
  ai = { status: 'edit', items: [] };
  drawAi();
});

aiBox.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'retry') generate();
  else if (action === 'manual') {
    ai = { status: 'edit', items: [] };
    drawAi();
  } else if (action === 'edit') {
    ai = { status: 'edit', items: ai.items };
    drawAi();
  } else if (action === 'accept') {
    submitPlan(ai.items);
  }
});

aiBox.addEventListener('submit', event => {
  event.preventDefault();
  const items = document.getElementById('itemsText').value.split('\n').map(line => line.trim()).filter(line => line !== '');
  if (items.length === 0) {
    document.getElementById('err_items').textContent = 'Cần ít nhất 1 bài tập.';
    return;
  }
  submitPlan(items);
});

function onFailChange() {
  loadView(currentBox, drawCurrent);
}

drawAi();
loadView(currentBox, drawCurrent);

const roleSwitch = document.getElementById('roleSwitch');
if (roleSwitch) {
  roleSwitch.addEventListener('change', () => {
    const label = roleSwitch.options[roleSwitch.selectedIndex].text;
    showToast('Chuyển sang vai trò ' + label);
    setTimeout(() => { window.location.href = roleSwitch.value; }, 500);
  });
}
