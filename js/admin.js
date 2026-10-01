// Admin Control & News Board Module
import { db } from './data.js';

export function renderAdminControlView(container, showToast, openModal, onNewsUpdated) {
  const pendingUsers = db.data.pendingUsers;
  const metrics = db.data.systemMetrics;
  const newsList = db.data.news;

  container.innerHTML = `
    <div class="admin-header">
      <div>
        <div class="badge-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Platform Operations & Compliance
        </div>
        <h2>Admin Command & Control Center</h2>
        <p class="subtitle">Approve new trainer and trainee applications, monitor real-time system performance and low-data bandwidth savings, and broadcast announcements to the entire portal.</p>
      </div>

      <div class="admin-quick-actions">
        <button id="btn-create-announcement" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Publish Announcement
        </button>
        <button id="btn-verify-cert" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Verify Certificate
        </button>
      </div>
    </div>

    <!-- Analytics Metric Cards -->
    <div class="metrics-grid">
      <div class="metric-card glass-card">
        <div class="metric-icon bg-indigo">👥</div>
        <div class="metric-details">
          <span class="metric-label">Enrolled Trainees</span>
          <h3 class="metric-val" id="metric-trainees">${metrics.totalTrainees.toLocaleString()}</h3>
          <span class="metric-sub text-success">↑ 14% this month</span>
        </div>
      </div>

      <div class="metric-card glass-card">
        <div class="metric-icon bg-cyan">👨‍🏫</div>
        <div class="metric-details">
          <span class="metric-label">Verified Trainers</span>
          <h3 class="metric-val" id="metric-trainers">${metrics.activeTrainers}</h3>
          <span class="metric-sub text-accent">★ 4.93 Avg Rating</span>
        </div>
      </div>

      <div class="metric-card glass-card">
        <div class="metric-icon bg-emerald">📝</div>
        <div class="metric-details">
          <span class="metric-label">Quizzes Evaluated</span>
          <h3 class="metric-val" id="metric-quizzes">${metrics.quizzesCompleted.toLocaleString()}</h3>
          <span class="metric-sub text-success">${metrics.averagePassRate} Pass Rate</span>
        </div>
      </div>

      <div class="metric-card glass-card">
        <div class="metric-icon bg-amber">⚡</div>
        <div class="metric-details">
          <span class="metric-label">Data Saver Savings</span>
          <h3 class="metric-val">${(metrics.bandwidthSavedGb / 1000).toFixed(2)} TB</h3>
          <span class="metric-sub text-warning">Mobile Optimization Active</span>
        </div>
      </div>
    </div>

    <!-- Analytics Chart Section -->
    <div class="admin-charts-row">
      <div class="chart-card glass-panel">
        <div class="card-header-flex">
          <div>
            <h4>System Traffic & Quiz Completions (Past 7 Days)</h4>
            <p class="text-muted">Interactive telemetry showing daily active learners and evaluation submissions.</p>
          </div>
          <span class="live-pulse-badge"><span class="pulse-dot"></span> Live Metrics</span>
        </div>
        <div class="chart-svg-container">
          <svg viewBox="0 0 600 180" class="analytics-chart-svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <!-- Grid lines -->
            <line x1="40" y1="30" x2="580" y2="30" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
            <line x1="40" y1="80" x2="580" y2="80" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
            <line x1="40" y1="130" x2="580" y2="130" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>

            <!-- Area fill -->
            <polygon points="40,150 40,110 120,95 200,80 280,70 360,50 440,100 520,85 580,75 580,150" fill="url(#chartGrad)"/>

            <!-- Active users line -->
            <polyline fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round" points="40,110 120,95 200,80 280,70 360,50 440,100 520,85 580,75"/>

            <!-- Quizzes line -->
            <polyline fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="3" points="40,130 120,118 200,105 280,95 360,80 440,120 520,110 580,100"/>

            <!-- Points with glow -->
            <circle cx="40" cy="110" r="4" fill="#6366f1"/>
            <circle cx="120" cy="95" r="4" fill="#6366f1"/>
            <circle cx="200" cy="80" r="4" fill="#6366f1"/>
            <circle cx="280" cy="70" r="4" fill="#6366f1"/>
            <circle cx="360" cy="50" r="5" fill="#38bdf8"/>
            <circle cx="440" cy="100" r="4" fill="#6366f1"/>
            <circle cx="520" cy="85" r="4" fill="#6366f1"/>
            <circle cx="580" cy="75" r="4" fill="#6366f1"/>

            <!-- Labels -->
            <text x="40" y="170" fill="#94a3b8" font-size="11">Mon</text>
            <text x="120" y="170" fill="#94a3b8" font-size="11">Tue</text>
            <text x="200" y="170" fill="#94a3b8" font-size="11">Wed</text>
            <text x="280" y="170" fill="#94a3b8" font-size="11">Thu</text>
            <text x="360" y="170" fill="#38bdf8" font-size="11" font-weight="bold">Fri (Peak)</text>
            <text x="440" y="170" fill="#94a3b8" font-size="11">Sat</text>
            <text x="520" y="170" fill="#94a3b8" font-size="11">Sun</text>
          </svg>
        </div>
      </div>
    </div>

    <!-- Split Section: User Approvals & News Board Management -->
    <div class="admin-split-grid">
      <!-- 1. User Approvals Queue -->
      <div class="admin-section-card glass-card">
        <div class="card-header-flex">
          <div>
            <h3>Pending Registrations</h3>
            <p class="text-muted">Review credentials and verify onboarding access.</p>
          </div>
          <span class="badge ${pendingUsers.length > 0 ? 'badge-warning' : 'badge-success'}" id="pending-count-badge">
            ${pendingUsers.length} Pending
          </span>
        </div>

        <div class="pending-users-list" id="pending-users-container">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <!-- 2. News Board & Home Announcements -->
      <div class="admin-section-card glass-card">
        <div class="card-header-flex">
          <div>
            <h3>News Board & Bulletins</h3>
            <p class="text-muted">Broadcast platform news, milestones, and notices.</p>
          </div>
        </div>

        <div class="admin-news-list" id="admin-news-container">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>
  `;

  // Render pending users
  const pendingContainer = container.querySelector('#pending-users-container');
  const pendingBadge = container.querySelector('#pending-count-badge');

  function renderPending() {
    pendingBadge.textContent = `${db.data.pendingUsers.length} Pending`;
    if (db.data.pendingUsers.length === 0) {
      pendingContainer.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-icon">✓</div>
          <h4>All registrations processed</h4>
          <p>No new applicants in the verification pipeline at this time.</p>
        </div>
      `;
      return;
    }

    pendingContainer.innerHTML = db.data.pendingUsers.map(user => `
      <div class="pending-user-item glass-panel" data-id="${user.id}">
        <img src="${user.avatar}" class="pending-user-avatar" />
        <div class="pending-user-info">
          <div class="pending-name-row">
            <strong>${user.name}</strong>
            <span class="role-tag ${user.requestedRole === 'trainer' ? 'tag-trainer' : 'tag-trainee'}">
              ${user.requestedRole === 'trainer' ? '👨‍🏫 Applying as Trainer' : '🎓 Applying as Trainee'}
            </span>
          </div>
          <p class="pending-spec">Specialty: <span>${user.specialty}</span> • Exp: <span>${user.experience}</span></p>
          <p class="pending-meta text-muted">Applied: ${user.appliedDate} • Email: ${user.email}</p>
        </div>
        <div class="pending-action-btns">
          <button class="btn btn-sm btn-success btn-approve-user" data-id="${user.id}">
            Approve ✓
          </button>
          <button class="btn btn-sm btn-danger btn-reject-user" data-id="${user.id}">
            Reject ✕
          </button>
        </div>
      </div>
    `).join('');

    pendingContainer.querySelectorAll('.btn-approve-user').forEach(btn => {
      btn.onclick = (e) => {
        const uid = e.currentTarget.getAttribute('data-id');
        const approved = db.approveUser(uid);
        if (approved) {
          showToast(`Approved ${approved.name} as verified ${approved.requestedRole}!`, 'success');
          renderPending();
          // Update counters
          container.querySelector('#metric-trainees').textContent = db.data.systemMetrics.totalTrainees.toLocaleString();
          container.querySelector('#metric-trainers').textContent = db.data.systemMetrics.activeTrainers;
        }
      };
    });

    pendingContainer.querySelectorAll('.btn-reject-user').forEach(btn => {
      btn.onclick = (e) => {
        const uid = e.currentTarget.getAttribute('data-id');
        const rejected = db.rejectUser(uid);
        if (rejected) {
          showToast(`Application for ${rejected.name} declined.`, 'info');
          renderPending();
        }
      };
    });
  }

  // Render news list
  const newsContainer = container.querySelector('#admin-news-container');
  function renderNews() {
    newsContainer.innerHTML = db.data.news.map(item => `
      <div class="admin-news-item glass-panel ${item.pinned ? 'item-pinned' : ''}">
        <div class="news-item-top">
          <span class="badge ${item.pinned ? 'badge-primary' : 'badge-secondary'}">${item.badge}</span>
          <span class="news-date">${item.date}</span>
        </div>
        <h4 class="news-headline">${item.title}</h4>
        <p class="news-snippet">${item.content}</p>
        <div class="news-author-row">
          <span>By ${item.author}</span>
          ${item.pinned ? '<span class="pinned-tag">📌 Pinned to Home</span>' : ''}
        </div>
      </div>
    `).join('');
  }

  // Announcement publisher modal
  container.querySelector('#btn-create-announcement').onclick = () => {
    openModal('Publish Platform Bulletin / News', `
      <div class="create-news-form">
        <p class="subtitle">Broadcast important alerts, curriculum updates, or certificate milestones to all users.</p>

        <div class="form-group">
          <label>Headline</label>
          <input type="text" id="news-in-title" class="form-control" placeholder="e.g. 🎓 New Cloud Certifications Available" value="🎓 New Cloud Certifications Available" />
        </div>

        <div class="form-row-2">
          <div class="form-group">
            <label>Category Tag</label>
            <input type="text" id="news-in-badge" class="form-control" placeholder="e.g. Certificate Release" value="Certificate Release" />
          </div>
          <div class="form-group">
            <label>Category Filter</label>
            <select id="news-in-cat" class="select-input full-width">
              <option value="Certification">Certification & Badges</option>
              <option value="Platform Update">Platform Update</option>
              <option value="Notice">Scheduled Maintenance</option>
              <option value="Workshop">Live Workshop</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Announcement Details</label>
          <textarea id="news-in-content" class="form-control" rows="3" placeholder="Full announcement text...">Official verification is now available for all trainees scoring 80% or higher on the Cloud Architecture & Kubernetes assessment.</textarea>
        </div>

        <div class="form-checkbox-row">
          <label class="custom-checkbox-label">
            <input type="checkbox" id="news-in-pinned" checked />
            <span>Pin this announcement to top home alert banner</span>
          </label>
        </div>

        <div class="modal-action-footer">
          <button class="btn btn-secondary modal-cancel-btn">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-post-news">Broadcast to Platform</button>
        </div>
      </div>
    `, (modalEl, closeModal) => {
      modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;

      modalEl.querySelector('#btn-confirm-post-news').onclick = () => {
        const title = modalEl.querySelector('#news-in-title').value.trim();
        const badge = modalEl.querySelector('#news-in-badge').value.trim() || 'Notice';
        const category = modalEl.querySelector('#news-in-cat').value;
        const content = modalEl.querySelector('#news-in-content').value.trim();
        const pinned = modalEl.querySelector('#news-in-pinned').checked;

        if (!title || !content) {
          showToast('Please fill in headline and details.', 'danger');
          return;
        }

        const newPost = {
          id: 'news-' + Date.now(),
          title,
          badge,
          category,
          author: db.data.currentUser.name,
          date: 'Just now',
          pinned,
          content
        };

        db.addNews(newPost);
        showToast('Announcement posted and broadcast to all dashboards!', 'success');
        closeModal();
        renderNews();
        if (onNewsUpdated) onNewsUpdated();
      };
    });
  };

  // Certificate Verification Modal
  container.querySelector('#btn-verify-cert').onclick = () => {
    openModal('Cryptographic Certificate Verification', `
      <div class="cert-verify-box">
        <p class="subtitle">Enter any Connect Capacity credential ID or verification hash to validate authenticity on the public ledger.</p>

        <div class="form-group">
          <label>Certificate Credential ID or Hash</label>
          <div class="search-input-group">
            <input type="text" id="input-cert-verify" class="search-input" placeholder="e.g. CERT-8849-SEC or 0x8f9c2e4b1a7d" value="CERT-8849-SEC" />
            <button id="btn-run-cert-check" class="btn btn-primary">Verify Authenticity</button>
          </div>
        </div>

        <div id="cert-verification-result" class="cert-verify-result-pane">
          <!-- Rendered on check -->
        </div>

        <div class="modal-action-footer">
          <button class="btn btn-secondary modal-cancel-btn">Close</button>
        </div>
      </div>
    `, (modalEl, closeModal) => {
      modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;

      const runCheck = () => {
        const query = modalEl.querySelector('#input-cert-verify').value.trim();
        const resultPane = modalEl.querySelector('#cert-verification-result');

        if (!query) {
          resultPane.innerHTML = `<div class="alert-box alert-danger">Please enter a valid credential ID.</div>`;
          return;
        }

        resultPane.innerHTML = `
          <div class="verified-cert-card glass-panel">
            <div class="verified-stamp">✓ VERIFIED AUTHENTIC</div>
            <h4>Certificate for Alex Chen</h4>
            <p class="cert-course-name">Evaluation: <strong>Modern Web Security & OWASP Top 10</strong></p>
            <div class="cert-meta-grid">
              <div><span>Credential ID:</span> <strong>${query}</strong></div>
              <div><span>Status:</span> <strong class="text-success">Active & Verified</strong></div>
              <div><span>Issue Date:</span> <strong>September 25, 2026</strong></div>
              <div><span>Score Achieved:</span> <strong>90% (Distinction)</strong></div>
              <div><span>Issuer:</span> <strong>Connect Capacity Global Certification Authority</strong></div>
              <div><span>Digital Signature:</span> <code>0x8f9c2e4b1a7d88920...</code></div>
            </div>
          </div>
        `;
      };

      modalEl.querySelector('#btn-run-cert-check').onclick = runCheck;
      runCheck();
    });
  };

  renderPending();
  renderNews();
}
