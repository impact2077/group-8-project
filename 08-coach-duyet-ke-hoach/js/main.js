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
if (logoutBtn) logoutBtn.addEventListener('click', () => {
  showToast('Đã đăng xuất');
  setTimeout(() => { window.location.href = '../02-dang-nhap/index.html'; }, 600);
});

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

const plans = Store.load('plans');
const statusInfo = Store.planStatus;

const planList = document.getElementById('planList');
const resultCount = document.getElementById('resultCount');
const statusSelect = document.getElementById('statusSelect');

let filter = '';
let reviewingId = null;

function planCard(plan) {
  const info = statusInfo[plan.status];
  let html = `<article class="plan-card">
    <h3>${escapeHtml(plan.member)} — ${escapeHtml(plan.title)}</h3>
    <ul>${plan.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    <span class="badge ${info[0]}">${info[1]}</span>`;

  if (plan.note) html += `<p class="muted">Đã yêu cầu sửa: ${escapeHtml(plan.note)}</p>`;

  if (plan.status === 'pending') {
    html += `<div class="actions">
      <button type="button" class="btn btn-ok" data-action="accept" data-id="${plan.id}">Chấp nhận</button>
      <button type="button" class="btn btn-danger" data-action="reject" data-id="${plan.id}">Từ chối</button>
      <button type="button" class="btn btn-ghost" data-action="ask" data-id="${plan.id}">Yêu cầu sửa</button>
    </div>`;
    if (reviewingId === plan.id) {
      html += `<form class="note-form" data-id="${plan.id}" novalidate>
        <div class="field">
          <label for="note${plan.id}">Nhận xét cho học viên</label>
          <textarea id="note${plan.id}" name="note" rows="3"></textarea>
          <span class="error-text"></span>
        </div>
        <button type="submit" class="btn btn-primary">Gửi yêu cầu sửa</button>
        <button type="button" class="btn btn-ghost" data-action="cancel">Hủy</button>
      </form>`;
    }
  }
  return html + '</article>';
}

function drawPlans() {
  const list = plans.filter(plan => filter === '' || plan.status === filter);
  resultCount.textContent = 'Hiển thị ' + list.length + '/' + plans.length + ' kế hoạch';

  if (plans.length === 0) {
    planList.innerHTML = stateBox('Chưa có kế hoạch nào cần duyệt.');
  } else if (list.length === 0) {
    planList.innerHTML = stateBox('Không có kế hoạch nào ở trạng thái này.', '<button type="button" class="btn btn-primary" id="clearBtn">Xóa bộ lọc</button>');
    document.getElementById('clearBtn').addEventListener('click', () => {
      filter = '';
      statusSelect.value = '';
      drawPlans();
    });
  } else {
    planList.innerHTML = list.map(planCard).join('');
  }
}

function setStatus(id, status) {
  plans.find(plan => plan.id === id).status = status;
  Store.set('plans', plans);
  reviewingId = null;
  drawPlans();
  showToast('Đã cập nhật kế hoạch');
}

planList.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === 'accept') setStatus(id, 'completed');
  else if (action === 'reject') setStatus(id, 'rejected');
  else if (action === 'ask') {
    reviewingId = id;
    drawPlans();
  } else if (action === 'cancel') {
    reviewingId = null;
    drawPlans();
  }
});

planList.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const note = form.elements.note.value.trim();
  const error = form.querySelector('.error-text');
  if (note === '') {
    error.textContent = 'Nhận xét không được để trống.';
    form.elements.note.classList.add('invalid');
    return;
  }
  plans.find(plan => plan.id === Number(form.dataset.id)).note = note;
  Store.set('plans', plans);
  reviewingId = null;
  drawPlans();
  showToast('Đã gửi yêu cầu sửa');
});

statusSelect.addEventListener('change', event => {
  filter = event.target.value;
  drawPlans();
});

function onFailChange() {
  loadView(planList, drawPlans);
}

loadView(planList, drawPlans);
