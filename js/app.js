// Main Application Orchestrator
import { db } from './data.js';
import { PWAManager } from './pwa.js';
import { renderMatchmakerView } from './matchmaker.js';
import { renderQuizListView, openCreateQuizModal } from './quiz.js';
import { renderLibraryView } from './library.js';
import { renderAdminControlView } from './admin.js';

class ConnectCapacityApp {
  constructor() {
    this.currentRole = db.data.currentUser.role || 'trainee';
    this.activeTab = 'overview';
    this.pwa = new PWAManager((msg, type) => this.showToast(msg, type));

    this.initDOM();
    this.bindGlobalEvents();
    this.renderHeaderUser();
    this.renderAnnouncementsBanner();
    this.renderNavigationTabs();
    this.renderActiveView();
    this.pwa.updateDataSaverUI();
    this.pwa.updateOfflineBanner();
  }

  initDOM() {
    this.toastContainer = document.getElementById('toast-container');
    this.modalBackdrop = document.getElementById('modal-backdrop');
    this.modalTitle = document.getElementById('modal-title');
    this.modalBody = document.getElementById('modal-body');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.mainContent = document.getElementById('main-content-view');
    this.navTabsContainer = document.getElementById('role-nav-tabs');
    this.bannerAnnouncement = document.getElementById('top-announcement-banner');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type} slide-up`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚠️';
    if (type === 'danger') icon = '✕';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
      <button class="toast-dismiss-btn">&times;</button>
    `;

    toast.querySelector('.toast-dismiss-btn').onclick = () => {
      toast.remove();
    };

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
      }
    }, 4500);
  }

  openModal(title, htmlContent, initCallback) {
    this.modalTitle.textContent = title;
    this.modalBody.innerHTML = htmlContent;
    this.modalBackdrop.classList.add('modal-visible');

    const closeModal = () => {
      this.modalBackdrop.classList.remove('modal-visible');
      this.modalBody.innerHTML = '';
    };

    this.modalCloseBtn.onclick = closeModal;
    this.modalBackdrop.onclick = (e) => {
      if (e.target === this.modalBackdrop) closeModal();
    };

    if (initCallback) {
      initCallback(this.modalBody, closeModal);
    }
  }

  bindGlobalEvents() {
    // Role switchers in the header
    document.querySelectorAll('.role-switcher-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const selectedRole = e.currentTarget.getAttribute('data-role');
        this.switchRole(selectedRole);
      });
    });

    // Data saver toggle
    const dataSaverBtn = document.getElementById('btn-toggle-data-saver');
    if (dataSaverBtn) {
      dataSaverBtn.addEventListener('click', () => {
        this.pwa.toggleLowData();
        this.renderActiveView();
      });
    }

    // PWA install button
    const installBtn = document.getElementById('btn-install-pwa');
    if (installBtn) {
      installBtn.addEventListener('click', () => {
        this.pwa.promptInstall();
      });
    }

    // Escape key closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop.classList.contains('modal-visible')) {
        this.modalBackdrop.classList.remove('modal-visible');
      }
    });
  }

  switchRole(roleName) {
    this.currentRole = roleName;
    db.switchRole(roleName);
    this.activeTab = 'overview';
    this.renderHeaderUser();
    this.renderNavigationTabs();
    this.renderActiveView();

    const roleTitles = {
      trainee: 'Switched to Trainee Dashboard (Alex Chen)',
      trainer: 'Switched to Trainer Dashboard (Dr. Sarah Jenkins)',
      admin: 'Switched to Platform Operations Admin (Marcus Vance)'
    };
    this.showToast(roleTitles[roleName] || `Active role: ${roleName}`, 'info');
  }

  renderHeaderUser() {
    // Update active pill button
    document.querySelectorAll('.role-switcher-btn').forEach(btn => {
      if (btn.getAttribute('data-role') === this.currentRole) {
        btn.classList.add('active-role');
      } else {
        btn.classList.remove('active-role');
      }
    });

    const user = db.data.currentUser;
    const nameEl = document.getElementById('header-user-name');
    const titleEl = document.getElementById('header-user-title');
    const avatarEl = document.getElementById('header-user-avatar');

    if (nameEl) nameEl.textContent = user.name;
    if (titleEl) titleEl.textContent = user.title;
    if (avatarEl) avatarEl.src = user.avatar;
  }

  renderAnnouncementsBanner() {
    const pinned = db.data.news.find(n => n.pinned) || db.data.news[0];
    if (pinned && this.bannerAnnouncement) {
      this.bannerAnnouncement.innerHTML = `
        <div class="announcement-content">
          <span class="announcement-badge">${pinned.badge || 'Announcement'}</span>
          <span class="announcement-text"><strong>${pinned.title}:</strong> ${pinned.content}</span>
        </div>
        <button id="banner-action-view" class="banner-link-btn">View All Updates →</button>
      `;

      this.bannerAnnouncement.querySelector('#banner-action-view').onclick = () => {
        if (this.currentRole === 'admin') {
          this.activeTab = 'news';
        } else {
          this.activeTab = 'overview';
        }
        this.renderNavigationTabs();
        this.renderActiveView();
      };
    }
  }

  renderNavigationTabs() {
    let tabs = [];

    if (this.currentRole === 'trainee') {
      tabs = [
        { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
        { id: 'matchmaker', label: 'Trainer Matchmaker', icon: '🎯' },
        { id: 'quizzes', label: 'Interactive Quizzes', icon: '⏱️' },
        { id: 'library', label: 'Digital Library & Offline', icon: '📚' },
        { id: 'certificates', label: 'My Certificates', icon: '🏆' }
      ];
    } else if (this.currentRole === 'trainer') {
      tabs = [
        { id: 'overview', label: 'Trainer Overview', icon: '📈' },
        { id: 'quizzes', label: 'Publish & Manage Quizzes', icon: '✍️' },
        { id: 'library', label: 'Cloud Library & Uploads', icon: '📤' },
        { id: 'matchmaker', label: 'Trainee Match Requests', icon: '🤝' }
      ];
    } else if (this.currentRole === 'admin') {
      tabs = [
        { id: 'overview', label: 'Admin Command Center', icon: '⚡' },
        { id: 'approvals', label: 'User Approvals Queue', icon: '🛡️' },
        { id: 'news', label: 'News Board Manager', icon: '📢' },
        { id: 'library', label: 'Library Audit', icon: '🗄️' }
      ];
    }

    // Ensure valid activeTab
    if (!tabs.some(t => t.id === this.activeTab)) {
      this.activeTab = 'overview';
    }

    this.navTabsContainer.innerHTML = tabs.map(t => `
      <button class="nav-tab-btn ${t.id === this.activeTab ? 'active' : ''}" data-tab="${t.id}">
        <span class="tab-icon">${t.icon}</span>
        <span class="tab-label">${t.label}</span>
      </button>
    `).join('');

    this.navTabsContainer.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeTab = e.currentTarget.getAttribute('data-tab');
        this.renderNavigationTabs();
        this.renderActiveView();
      });
    });
  }

  renderActiveView() {
    this.mainContent.innerHTML = '';

    if (this.currentRole === 'trainee') {
      this.renderTraineeContent();
    } else if (this.currentRole === 'trainer') {
      this.renderTrainerContent();
    } else if (this.currentRole === 'admin') {
      this.renderAdminContent();
    }
  }

  // ===================== TRAINEE VIEWS =====================
  renderTraineeContent() {
    if (this.activeTab === 'overview') {
      this.renderTraineeOverview();
    } else if (this.activeTab === 'matchmaker') {
      renderMatchmakerView(
        this.mainContent,
        (msg, type) => this.showToast(msg, type),
        (t, c, cb) => this.openModal(t, c, cb)
      );
    } else if (this.activeTab === 'quizzes') {
      renderQuizListView(
        this.mainContent,
        (msg, type) => this.showToast(msg, type),
        (t, c, cb) => this.openModal(t, c, cb),
        (cert) => this.openCertificateModal(cert)
      );
    } else if (this.activeTab === 'library') {
      renderLibraryView(
        this.mainContent,
        (msg, type) => this.showToast(msg, type),
        (t, c, cb) => this.openModal(t, c, cb),
        this.pwa.isLowData
      );
    } else if (this.activeTab === 'certificates') {
      this.renderTraineeCertificates();
    }
  }

  renderTraineeOverview() {
    const user = db.data.currentUser;
    const completedQuizzesCount = user.completedQuizzes?.length || 0;
    const certsCount = user.certificates?.length || 0;
    const offlineCount = user.savedOffline?.length || 0;

    this.mainContent.innerHTML = `
      <div class="dashboard-hero glass-panel">
        <div class="hero-left">
          <div class="welcome-tag">👋 Welcome back, ${user.name}</div>
          <h2>Accelerate Your Engineering Mastery</h2>
          <p class="hero-desc">Your customized learning portal gives you fast access to smart trainer matching, timed evaluation quizzes with instant certificates, and low-bandwidth cloud media for offline study.</p>
          <div class="hero-action-buttons">
            <button id="btn-hero-match" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Find Qualified Trainer
            </button>
            <button id="btn-hero-quiz" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Take Assessment Quiz
            </button>
          </div>
        </div>

        <div class="hero-stats-grid">
          <div class="stat-box">
            <span class="stat-number text-accent">3</span>
            <span class="stat-title">Active Tracks</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-success">${completedQuizzesCount}</span>
            <span class="stat-title">Quizzes Done</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-amber">${certsCount}</span>
            <span class="stat-title">Certificates</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-cyan">${offlineCount}</span>
            <span class="stat-title">Saved Offline</span>
          </div>
        </div>
      </div>

      <!-- Trainee Dashboard Main Columns -->
      <div class="dashboard-split-layout">
        <div class="layout-main-column">
          <!-- Pending Evaluations Section -->
          <div class="section-card glass-card">
            <div class="card-header-flex">
              <div>
                <h3>Recommended Assessment Quizzes</h3>
                <p class="text-muted">Timed multiple choice with instant automated grading.</p>
              </div>
              <button id="btn-goto-all-quizzes" class="btn-text">View All Quizzes →</button>
            </div>
            <div class="quick-quizzes-list">
              ${db.data.quizzes.slice(0, 2).map(q => `
                <div class="quick-quiz-row glass-panel">
                  <div class="quiz-info-mini">
                    <span class="quiz-badge-mini" style="background: ${q.badgeColor}22; color: ${q.badgeColor}">${q.course}</span>
                    <h4>${q.title}</h4>
                    <p class="text-muted">⏱️ ${q.timeLimitMinutes} Mins • Passing: ${q.passingScore}% • Curated by ${q.author}</p>
                  </div>
                  <button class="btn btn-sm btn-primary btn-jump-quiz" data-id="${q.id}">Start Quiz</button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Featured Digital Library Content -->
          <div class="section-card glass-card">
            <div class="card-header-flex">
              <div>
                <h3>Latest Digital Library Uploads</h3>
                <p class="text-muted">Stream video lectures or save study guides for offline reading.</p>
              </div>
              <button id="btn-goto-all-library" class="btn-text">Explore Full Library →</button>
            </div>
            <div class="library-preview-list">
              ${db.data.library.slice(0, 3).map(item => `
                <div class="lib-preview-row glass-panel">
                  <div class="lib-preview-thumb" style="background-image: url('${item.thumbnail}')">
                    <span class="cat-pill">${item.category === 'video' ? '🎬' : item.category === 'slides' ? '📊' : '📖'}</span>
                  </div>
                  <div class="lib-preview-details">
                    <h4>${item.title}</h4>
                    <p class="text-muted">${item.author} • ${item.category === 'video' ? item.duration : item.category === 'slides' ? item.slideCount + ' slides' : item.readTime} • ${item.fileSize}</p>
                  </div>
                  <button class="btn btn-sm btn-outline btn-jump-lib" data-id="${item.id}">View Material</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Sidebar Column: News & Matchmaker Highlights -->
        <div class="layout-side-column">
          <!-- Smart Matchmaker Callout -->
          <div class="side-card glass-card matchmaker-callout-card">
            <div class="match-icon-badge">🎯</div>
            <h4>Smart Trainer Matchmaker</h4>
            <p>Looking for guidance on Kubernetes, AI, or Full Stack? Our algorithm calculates real-time compatibility scores for top verified trainers.</p>
            <button id="btn-side-matchmaker" class="btn btn-accent full-width">Find Top Rated Trainer</button>
          </div>

          <!-- Bulletin & News Board -->
          <div class="side-card glass-card">
            <div class="card-header-flex">
              <h4>News & Announcements</h4>
            </div>
            <div class="side-news-list">
              ${db.data.news.map(n => `
                <div class="side-news-item">
                  <div class="news-meta-line">
                    <span class="badge badge-sm ${n.pinned ? 'badge-primary' : 'badge-secondary'}">${n.badge}</span>
                    <span class="news-time">${n.date}</span>
                  </div>
                  <h5>${n.title}</h5>
                  <p class="text-muted small">${n.content}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    // Interactive button bindings
    this.mainContent.querySelector('#btn-hero-match')?.addEventListener('click', () => {
      this.activeTab = 'matchmaker';
      this.renderNavigationTabs();
      this.renderActiveView();
    });
    this.mainContent.querySelector('#btn-side-matchmaker')?.addEventListener('click', () => {
      this.activeTab = 'matchmaker';
      this.renderNavigationTabs();
      this.renderActiveView();
    });
    this.mainContent.querySelector('#btn-hero-quiz')?.addEventListener('click', () => {
      this.activeTab = 'quizzes';
      this.renderNavigationTabs();
      this.renderActiveView();
    });
    this.mainContent.querySelector('#btn-goto-all-quizzes')?.addEventListener('click', () => {
      this.activeTab = 'quizzes';
      this.renderNavigationTabs();
      this.renderActiveView();
    });
    this.mainContent.querySelector('#btn-goto-all-library')?.addEventListener('click', () => {
      this.activeTab = 'library';
      this.renderNavigationTabs();
      this.renderActiveView();
    });

    this.mainContent.querySelectorAll('.btn-jump-quiz').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = 'quizzes';
        this.renderNavigationTabs();
        this.renderActiveView();
      });
    });

    this.mainContent.querySelectorAll('.btn-jump-lib').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = 'library';
        this.renderNavigationTabs();
        this.renderActiveView();
      });
    });
  }

  renderTraineeCertificates() {
    const certs = db.data.currentUser.certificates || [];

    this.mainContent.innerHTML = `
      <div class="cert-header-section">
        <div>
          <div class="badge-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Official Verifiable Accreditations
          </div>
          <h2>My Earned Certificates</h2>
          <p class="subtitle">Certificates are automatically awarded when completing evaluation quizzes with an 80% score or higher. Each certificate features a verifiable cryptographic hash.</p>
        </div>
      </div>

      <div class="certs-grid">
        ${certs.map(cert => `
          <div class="certificate-display-card glass-card">
            <div class="cert-card-inner">
              <div class="cert-ribbon-gold">🏆 Distinction Award</div>
              <div class="cert-seal-symbol">⭐</div>
              <h3 class="cert-title">${cert.quizTitle}</h3>
              <p class="cert-recipient">Awarded to <strong>${db.data.currentUser.name}</strong></p>
              <div class="cert-meta-row">
                <span>Issue Date: <strong>${cert.issuedDate}</strong></span>
                <span>Score: <strong class="text-success">${cert.score}</strong></span>
              </div>
              <div class="cert-id-tag">ID: <code>${cert.id}</code></div>
              <div class="cert-actions-row">
                <button class="btn btn-sm btn-primary btn-open-cert full-width" data-id="${cert.id}">
                  View Full Certificate & Print
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.mainContent.querySelectorAll('.btn-open-cert').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cId = e.currentTarget.getAttribute('data-id');
        const cert = certs.find(c => c.id === cId);
        if (cert) this.openCertificateModal(cert);
      });
    });
  }

  openCertificateModal(cert) {
    this.openModal(`Official Certificate of Achievement`, `
      <div class="certificate-modal-frame" id="printable-certificate">
        <div class="cert-frame-border">
          <div class="cert-header">
            <div class="cert-logo-seal">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
            </div>
            <h3>Connect Capacity Global Learning Accreditation</h3>
            <p class="cert-subhead">Certificate of Technical Proficiency</p>
          </div>

          <div class="cert-body">
            <p class="cert-presented">This is to officially certify that</p>
            <h1 class="cert-student-name">${db.data.currentUser.name}</h1>
            <p class="cert-demonstration">has successfully completed the comprehensive technical evaluation curriculum for</p>
            <h2 class="cert-course-name">${cert.quizTitle}</h2>
            <p class="cert-score-line">demonstrating exceptional proficiency with an evaluated score of <strong>${cert.score}</strong>.</p>
          </div>

          <div class="cert-footer-row">
            <div class="cert-sig-block">
              <div class="sig-line">Dr. Sarah Jenkins</div>
              <span>Lead Certification Director</span>
            </div>
            <div class="cert-verification-qr">
              <div class="qr-mock">
                <span>[QR Code]</span>
                <code>${cert.id}</code>
              </div>
              <span class="qr-label">Scan to verify authenticity</span>
            </div>
            <div class="cert-sig-block">
              <div class="sig-line">${cert.issuedDate}</div>
              <span>Date of Issue</span>
            </div>
          </div>

          <div class="cert-crypto-footer">
            <span>Cryptographic Proof: <code>${cert.verificationHash || '0x8f9c2e4b1a7d'}</code></span>
            <span>Credential ID: <code>${cert.id}</code></span>
          </div>
        </div>

        <div class="modal-action-footer">
          <button class="btn btn-secondary modal-cancel-btn">Close</button>
          <button class="btn btn-primary" id="btn-print-certificate">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print & Export PDF
          </button>
        </div>
      </div>
    `, (modalEl, closeModal) => {
      modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;
      modalEl.querySelector('#btn-print-certificate').onclick = () => {
        window.print();
      };
    });
  }

  // ===================== TRAINER VIEWS =====================
  renderTrainerContent() {
    if (this.activeTab === 'overview') {
      this.renderTrainerOverview();
    } else if (this.activeTab === 'quizzes') {
      renderQuizListView(
        this.mainContent,
        (msg, type) => this.showToast(msg, type),
        (t, c, cb) => this.openModal(t, c, cb),
        (cert) => this.openCertificateModal(cert)
      );
    } else if (this.activeTab === 'library') {
      renderLibraryView(
        this.mainContent,
        (msg, type) => this.showToast(msg, type),
        (t, c, cb) => this.openModal(t, c, cb),
        this.pwa.isLowData
      );
    } else if (this.activeTab === 'matchmaker') {
      this.renderTrainerMatchRequests();
    }
  }

  renderTrainerOverview() {
    const user = db.data.currentUser;
    const myQuizzes = db.data.quizzes;
    const myUploads = db.data.library;
    const matchRequests = db.data.matchRequests;

    this.mainContent.innerHTML = `
      <div class="dashboard-hero glass-panel">
        <div class="hero-left">
          <div class="welcome-tag">👨‍🏫 Trainer Command Suite</div>
          <h2>Welcome, ${user.name}</h2>
          <p class="hero-desc">Manage course curricula, build interactive quizzes with automated grading, upload high-performance streaming lectures, and connect with trainees requesting your expertise.</p>
          <div class="hero-action-buttons">
            <button id="btn-trainer-create-quiz" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Publish New Quiz
            </button>
            <button id="btn-trainer-upload" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Digital Media
            </button>
          </div>
        </div>

        <div class="hero-stats-grid">
          <div class="stat-box">
            <span class="stat-number text-accent">2,340</span>
            <span class="stat-title">Trainees Coached</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-success">⭐ 4.98</span>
            <span class="stat-title">Student Rating</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-amber">${myQuizzes.length}</span>
            <span class="stat-title">Quizzes Active</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-cyan">${matchRequests.length}</span>
            <span class="stat-title">Match Requests</span>
          </div>
        </div>
      </div>

      <div class="dashboard-split-layout">
        <div class="layout-main-column">
          <!-- Active Quizzes Managed -->
          <div class="section-card glass-card">
            <div class="card-header-flex">
              <div>
                <h3>Published Assessment Quizzes</h3>
                <p class="text-muted">Quizzes actively delivering randomized questions & automated scoring.</p>
              </div>
              <button id="btn-goto-quiz-tab" class="btn-text">Manage Quizzes →</button>
            </div>
            <div class="trainer-quizzes-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Course Track</th>
                    <th>Questions</th>
                    <th>Timer</th>
                    <th>Passing %</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${myQuizzes.map(q => `
                    <tr>
                      <td><strong>${q.title}</strong></td>
                      <td><span class="badge badge-secondary">${q.course}</span></td>
                      <td>${q.questions.length} questions</td>
                      <td>${q.timeLimitMinutes} mins</td>
                      <td>${q.passingScore}%</td>
                      <td>
                        <button class="btn btn-sm btn-outline btn-edit-quiz-stub" data-id="${q.id}">Active</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="layout-side-column">
          <!-- Trainee Match Requests Panel -->
          <div class="side-card glass-card">
            <div class="card-header-flex">
              <h4>Incoming Matchmaker Requests</h4>
              <span class="badge badge-primary">${matchRequests.length}</span>
            </div>
            <div class="match-req-list">
              ${matchRequests.map(req => `
                <div class="match-req-item glass-panel">
                  <div class="req-top">
                    <strong>${req.traineeName}</strong>
                    <span class="badge badge-warning">${req.status}</span>
                  </div>
                  <p class="req-topic">Topic: <strong>${req.topic}</strong></p>
                  <p class="req-note text-muted small">"${req.note}"</p>
                  <div class="req-actions">
                    <button class="btn btn-sm btn-success btn-accept-req" data-id="${req.id}">Accept & Schedule</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    this.mainContent.querySelector('#btn-trainer-create-quiz').onclick = () => {
      openCreateQuizModal(
        (msg, type) => this.showToast(msg, type),
        (t, c, cb) => this.openModal(t, c, cb),
        () => this.renderActiveView()
      );
    };

    this.mainContent.querySelector('#btn-trainer-upload').onclick = () => {
      this.activeTab = 'library';
      this.renderNavigationTabs();
      this.renderActiveView();
    };

    this.mainContent.querySelector('#btn-goto-quiz-tab').onclick = () => {
      this.activeTab = 'quizzes';
      this.renderNavigationTabs();
      this.renderActiveView();
    };

    this.mainContent.querySelectorAll('.btn-accept-req').forEach(btn => {
      btn.onclick = () => {
        this.showToast('Match request accepted! Session invitation dispatched to trainee.', 'success');
      };
    });
  }

  renderTrainerMatchRequests() {
    const matchRequests = db.data.matchRequests;

    this.mainContent.innerHTML = `
      <div class="matchmaker-header">
        <div>
          <div class="badge-pill">🤝 Smart Matchmaker Pipeline</div>
          <h2>Trainee Coaching Requests</h2>
          <p class="subtitle">Review and accept 1-on-1 coaching requests matched to your skill profile and hourly availability.</p>
        </div>
      </div>

      <div class="match-requests-grid">
        ${matchRequests.map(req => `
          <div class="request-card glass-card">
            <div class="request-card-header">
              <div class="req-user-avatar">🎓</div>
              <div>
                <h4>${req.traineeName}</h4>
                <p class="text-muted">Target Topic: <strong class="text-accent">${req.topic}</strong></p>
              </div>
              <span class="badge badge-warning">${req.status}</span>
            </div>
            <div class="req-body">
              <p><strong>Trainee Note:</strong> "${req.note}"</p>
              <p class="text-muted small">Requested: ${req.date}</p>
            </div>
            <div class="req-footer">
              <button class="btn btn-outline btn-sm">Message Trainee</button>
              <button class="btn btn-primary btn-sm btn-accept-session">Confirm & Book Session</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.mainContent.querySelectorAll('.btn-accept-session').forEach(btn => {
      btn.onclick = () => {
        this.showToast('Coaching session confirmed and added to calendar!', 'success');
      };
    });
  }

  // ===================== ADMIN VIEWS =====================
  renderAdminContent() {
    renderAdminControlView(
      this.mainContent,
      (msg, type) => this.showToast(msg, type),
      (t, c, cb) => this.openModal(t, c, cb),
      () => this.renderAnnouncementsBanner()
    );
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.connectCapacityApp = new ConnectCapacityApp();
});
