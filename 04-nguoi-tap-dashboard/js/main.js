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

const logs = [
  { ago: 0, exercise: 'Squat 3x12', done: true },
  { ago: 1, exercise: 'Plank 3x30s', done: true },
  { ago: 2, exercise: 'Chạy 20 phút', done: true },
  { ago: 5, exercise: 'Chạy 20 phút', done: false }
];

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

const dashboardView = document.getElementById('dashboardView');
const onboarding = document.getElementById('onboarding');
const onbForm = document.getElementById('onbForm');

let profile = { goal: '', sessions: 0 };
let todayPlan = [];
let insightState = 'idle';

function getStreak() {
  const doneDays = new Set(logs.filter(log => log.done).map(log => log.ago));
  let streak = 0;
  let day = doneDays.has(0) ? 0 : 1;
  while (doneDays.has(day)) {
    streak++;
    day++;
  }
  return streak;
}

function buildPlan() {
  const groups = groupsByGoal[profile.goal] || [];
  todayPlan = templates
    .filter(item => groups.includes(item.group))
    .slice(0, profile.sessions)
    .map(item => item.name + ' — ' + item.sets + ' hiệp x ' + item.reps);
}

function insightHtml() {
  if (insightState === 'run') return 'Đang xử lý...';
  if (insightState === 'skip') {
    return '<p class="muted">Đã bỏ qua insight.</p><button type="button" class="btn btn-ghost" data-action="again">Hiện lại</button>';
  }
  if (logs.length < 3) {
    return stateBox('Chưa đủ log để phân tích pattern.',
      '<button type="button" class="btn btn-ghost" data-action="skip">Bỏ qua</button><button type="button" class="btn btn-primary" data-action="again">Thử lại sau</button>');
  }
  const percent = Math.round(logs.filter(log => log.done).length / logs.length * 100);
  let message = 'Cần cải thiện: hãy đặt lịch tập cố định.';
  if (percent >= 80) message = 'Bạn đang duy trì rất tốt.';
  else if (percent >= 50) message = 'Khá ổn, thử thêm 1 buổi mỗi tuần.';
  return `<div class="ai-box">${message}<p class="muted">Dựa trên ${logs.length} buổi log, hoàn thành ${percent}%.</p></div>
    <div class="actions"><button type="button" class="btn btn-ghost" data-action="skip">Bỏ qua</button><button type="button" class="btn" data-action="again">Thử lại</button></div>`;
}

function drawDashboard() {
  const doneLogs = logs.filter(log => log.done);
  const weekCount = doneLogs.filter(log => log.ago <= 6).length;
  const rate = logs.length ? Math.round(doneLogs.length / logs.length * 100) : 0;
  const planHtml = todayPlan.length
    ? '<ul>' + todayPlan.map(item => `<li>${escapeHtml(item)}</li>`).join('') + '</ul>'
    : '<p class="muted">Chưa có kế hoạch. Tạo ở mục Kế hoạch.</p>';

  dashboardView.innerHTML = `
    <div class="stat-grid">
      ${statCard(getStreak() + ' ngày', 'Streak hiện tại')}
      ${statCard(weekCount + '/' + (profile.sessions || '—'), 'Buổi tuần này')}
      ${statCard(rate + '%', 'Hoàn thành')}
    </div>
    <div class="two-col">
      <article class="card-box"><h2>Kế hoạch hôm nay</h2>${planHtml}</article>
      <article class="card-box"><h2>Insight AI</h2><div id="insightBox"></div></article>
    </div>`;

  onboarding.hidden = profile.goal !== '';
  runInsight();
}

function runInsight() {
  const box = document.getElementById('insightBox');
  insightState = 'run';
  box.innerHTML = insightHtml();
  setTimeout(() => {
    insightState = 'ok';
    const current = document.getElementById('insightBox');
    if (current) current.innerHTML = insightHtml();
  }, 600);
}

dashboardView.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  if (button.dataset.action === 'skip') {
    insightState = 'skip';
    document.getElementById('insightBox').innerHTML = insightHtml();
  } else if (button.dataset.action === 'again') {
    runInsight();
  }
});

function setError(name, message) {
  document.getElementById('err_' + name).textContent = message;
  onbForm.elements[name].classList.toggle('invalid', message !== '');
}

onbForm.addEventListener('submit', event => {
  event.preventDefault();
  const goal = onbForm.elements.goal.value;
  const sessions = Number(onbForm.elements.sessions.value);
  let valid = true;
  if (goal === '') {
    setError('goal', 'Mục tiêu không được để trống.');
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
  if (!valid) return;

  profile = { goal, sessions };
  buildPlan();
  onbForm.reset();
  drawDashboard();
  showToast('Đã lưu mục tiêu');
});

document.getElementById('laterBtn').addEventListener('click', () => {
  onboarding.hidden = true;
});

function onFailChange() {
  loadView(dashboardView, drawDashboard);
}

loadView(dashboardView, drawDashboard);

const roleSwitch = document.getElementById('roleSwitch');
if (roleSwitch) {
  roleSwitch.addEventListener('change', () => {
    const label = roleSwitch.options[roleSwitch.selectedIndex].text;
    showToast('Chuyển sang vai trò ' + label);
    setTimeout(() => { window.location.href = roleSwitch.value; }, 500);
  });
}
