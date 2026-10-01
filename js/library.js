// All-in-One Digital Library Module with Offline Saving and Low-Data Streaming
import { db } from './data.js';

let activeCategoryFilter = 'all';
let searchQuery = '';

export function renderLibraryView(container, showToast, openModal, isLowDataMode = false) {
  const currentUser = db.data.currentUser;
  const isTrainer = currentUser.role === 'trainer';

  container.innerHTML = `
    <div class="library-header">
      <div>
        <div class="badge-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Cloud Repository & Offline Cache
        </div>
        <h2>All-in-One Digital Library</h2>
        <p class="subtitle">Stream compressed video lectures, explore interactive slide decks, and access offline study guides designed for lightning-fast loads on any device.</p>
      </div>
      ${isTrainer ? `
        <button id="btn-upload-content" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload New Resource
        </button>
      ` : ''}
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="library-toolbar glass-panel">
      <div class="category-tabs">
        <button class="lib-tab ${activeCategoryFilter === 'all' ? 'active' : ''}" data-cat="all">All Content</button>
        <button class="lib-tab ${activeCategoryFilter === 'video' ? 'active' : ''}" data-cat="video">🎬 Video Lectures</button>
        <button class="lib-tab ${activeCategoryFilter === 'slides' ? 'active' : ''}" data-cat="slides">📊 Slide Decks</button>
        <button class="lib-tab ${activeCategoryFilter === 'guide' ? 'active' : ''}" data-cat="guide">📖 Study Guides</button>
        <button class="lib-tab ${activeCategoryFilter === 'offline' ? 'active' : ''}" data-cat="offline">💾 Saved Offline (${currentUser.savedOffline?.length || 0})</button>
      </div>

      <div class="library-search-wrapper">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" id="lib-search-input" class="search-input" placeholder="Search by title, author, or technology..." value="${searchQuery}" />
      </div>
    </div>

    ${isLowDataMode ? `
      <div class="data-saver-notice-strip">
        <span class="icon">⚡</span>
        <span><strong>Data Saver Active:</strong> Media previews are compressed and video streams default to optimized 360p to preserve mobile data.</span>
      </div>
    ` : ''}

    <!-- Content Items Grid -->
    <div class="library-grid" id="library-grid-container">
      <!-- Rendered dynamically -->
    </div>
  `;

  const gridContainer = container.querySelector('#library-grid-container');
  const searchInput = container.querySelector('#lib-search-input');
  const catTabs = container.querySelectorAll('.lib-tab');

  function renderItems() {
    let items = db.data.library;

    if (activeCategoryFilter === 'offline') {
      items = items.filter(item => db.data.currentUser.savedOffline.includes(item.id));
    } else if (activeCategoryFilter !== 'all') {
      items = items.filter(item => item.category === activeCategoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (items.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state-box full-width">
          <div class="empty-icon">📂</div>
          <h4>No study resources found</h4>
          <p>${activeCategoryFilter === 'offline' ? 'You have not saved any materials for offline reading yet. Click "Save Offline" on any guide or lecture.' : 'Try adjusting your search terms or selecting another category.'}</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = items.map(item => {
      const isOffline = db.data.currentUser.savedOffline.includes(item.id);
      const isVideo = item.category === 'video';
      const isSlides = item.category === 'slides';
      const isGuide = item.category === 'guide';

      const typeBadge = isVideo ? '🎬 Video Lecture' : isSlides ? '📊 Presentation Deck' : '📖 Study Guide';
      const metaText = isVideo ? item.duration : isSlides ? `${item.slideCount} Slides` : item.readTime;

      return `
        <div class="library-card glass-card">
          <div class="card-media-banner" style="background-image: linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.95) 100%), url('${item.thumbnail}')">
            <span class="lib-type-tag">${typeBadge}</span>
            <button class="btn-offline-toggle ${isOffline ? 'is-saved' : ''}" data-id="${item.id}" title="${isOffline ? 'Saved in Local Offline Cache' : 'Save for Offline Reading'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isOffline ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              <span>${isOffline ? 'Offline Ready' : 'Save Offline'}</span>
            </button>
            ${isVideo ? `
              <div class="play-overlay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            ` : ''}
          </div>

          <div class="library-card-content">
            <div class="meta-subrow">
              <span class="author-name">By ${item.author}</span>
              <span class="meta-dot">•</span>
              <span class="duration-badge">${metaText}</span>
              <span class="meta-dot">•</span>
              <span class="size-badge">${isLowDataMode && item.lowDataSizeKb ? Math.round(item.lowDataSizeKb / 1024) + ' MB (Data Saver)' : item.fileSize}</span>
            </div>

            <h3 class="lib-item-title">${item.title}</h3>
            <p class="lib-item-summary">${item.summary}</p>

            <div class="tags-row">
              ${item.tags.map(t => `<span class="content-tag">${t}</span>`).join('')}
            </div>

            <div class="library-card-actions">
              <button class="btn btn-primary btn-sm btn-open-media full-width" data-id="${item.id}" data-type="${item.category}">
                ${isVideo ? 'Stream Lecture' : isSlides ? 'View Slide Deck' : 'Read Study Guide'}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Offline Save Toggles
    gridContainer.querySelectorAll('.btn-offline-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemId = e.currentTarget.getAttribute('data-id');
        const isSaved = db.toggleOfflineItem(itemId);
        showToast(
          isSaved ? 'Resource downloaded and cached in device offline storage!' : 'Resource removed from offline storage.',
          isSaved ? 'success' : 'info'
        );
        renderItems();
      });
    });

    // Open Media Buttons
    gridContainer.querySelectorAll('.btn-open-media').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-id');
        const itemType = e.currentTarget.getAttribute('data-type');
        const item = db.data.library.find(i => i.id === itemId);
        if (item) {
          if (itemType === 'video') openVideoPlayerModal(item, openModal, showToast, isLowDataMode);
          else if (itemType === 'slides') openSlideDeckModal(item, openModal, showToast);
          else if (itemType === 'guide') openStudyGuideModal(item, openModal, showToast);
        }
      });
    });
  }

  // Event handlers
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderItems();
  });

  catTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      catTabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeCategoryFilter = e.currentTarget.getAttribute('data-cat');
      renderItems();
    });
  });

  // Upload Resource Handler for Trainers
  const uploadBtn = container.querySelector('#btn-upload-content');
  if (uploadBtn) {
    uploadBtn.onclick = () => {
      openUploadModal(showToast, openModal, () => {
        renderLibraryView(container, showToast, openModal, isLowDataMode);
      });
    };
  }

  renderItems();
}

// 1. Interactive Video Player Modal with Low-Data Mode
function openVideoPlayerModal(item, openModal, showToast, isLowDataModeDefault) {
  let isPlaying = false;
  let playbackSpeed = 1;
  let resolution = isLowDataModeDefault ? '360p' : '720p';
  let progress = 15; // percentage

  openModal(`Streaming: ${item.title}`, `
    <div class="video-player-container">
      <div class="video-screen-wrapper">
        <!-- Interactive Canvas / Screen Canvas Simulation -->
        <div class="video-canvas-display" id="video-canvas">
          <div class="video-overlay-header">
            <span class="resolution-badge" id="player-res-badge">${resolution} ${resolution === '360p' ? '⚡ Data Saver' : 'HD'}</span>
            <span class="live-bitrate" id="player-bitrate">${resolution === '360p' ? '450 kbps (Low Data)' : '2.4 Mbps'}</span>
          </div>
          <div class="lecture-visualizer">
            <div class="visualizer-wave">
              <span class="bar bar1"></span>
              <span class="bar bar2"></span>
              <span class="bar bar3"></span>
              <span class="bar bar4"></span>
              <span class="bar bar5"></span>
            </div>
            <div class="lecture-screen-slide">
              <div class="slide-mock-header">🖥️ ${item.title}</div>
              <div class="slide-mock-bullet">✓ Instructor: ${item.author}</div>
              <div class="slide-mock-bullet">✓ Real-time cloud architecture and live demo</div>
              <div class="slide-mock-code">kubectl apply -f cluster-scaler.yaml --record</div>
            </div>
          </div>
          <div class="play-center-btn" id="canvas-play-toggle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>

        <!-- Video Player Controls Bar -->
        <div class="video-controls-bar">
          <button class="control-btn" id="btn-play-pause">
            <svg id="play-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <svg id="pause-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>

          <span class="time-readout" id="video-time">03:42 / ${item.duration}</span>

          <div class="scrub-bar-track" id="video-scrubber">
            <div class="scrub-bar-fill" id="scrubber-fill" style="width: ${progress}%"></div>
          </div>

          <!-- Low Data Quality Selector -->
          <select id="video-quality-select" class="control-select">
            <option value="360p" ${resolution === '360p' ? 'selected' : ''}>⚡ 360p (Low Data)</option>
            <option value="720p" ${resolution === '720p' ? 'selected' : ''}>720p (HD)</option>
            <option value="1080p" ${resolution === '1080p' ? 'selected' : ''}>1080p (Full HD)</option>
          </select>

          <!-- Speed Selector -->
          <select id="video-speed-select" class="control-select">
            <option value="1" selected>1.0x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2.0x</option>
          </select>
        </div>
      </div>

      <!-- Transcript & Notes Tabs -->
      <div class="video-info-tabs">
        <div class="video-info-header">
          <h4>Lecture Notes & Key Takeaways</h4>
          <span class="file-size-info">Estimated data used: <strong id="data-used-label">${resolution === '360p' ? '~12 MB' : '~64 MB'}</strong></span>
        </div>
        <p class="transcript-text">
          ${item.transcript}
        </p>
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Close Video</button>
        <button class="btn btn-primary" id="btn-save-video-offline">
          ${db.data.currentUser.savedOffline.includes(item.id) ? '✓ Saved Offline' : '💾 Save for Offline Playback'}
        </button>
      </div>
    </div>
  `, (modalEl, closeModal) => {
    modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;

    const playBtn = modalEl.querySelector('#btn-play-pause');
    const playIcon = modalEl.querySelector('#play-icon');
    const pauseIcon = modalEl.querySelector('#pause-icon');
    const canvasPlayBtn = modalEl.querySelector('#canvas-play-toggle');
    const scrubberFill = modalEl.querySelector('#scrubber-fill');
    const scrubberTrack = modalEl.querySelector('#video-scrubber');
    const qualitySelect = modalEl.querySelector('#video-quality-select');
    const resBadge = modalEl.querySelector('#player-res-badge');
    const bitrateText = modalEl.querySelector('#player-bitrate');
    const dataUsedLabel = modalEl.querySelector('#data-used-label');
    const saveOfflineBtn = modalEl.querySelector('#btn-save-video-offline');
    const visualizer = modalEl.querySelector('.visualizer-wave');

    function togglePlay() {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
        canvasPlayBtn.style.opacity = '0';
        visualizer.classList.add('wave-active');
      } else {
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
        canvasPlayBtn.style.opacity = '1';
        visualizer.classList.remove('wave-active');
      }
    }

    playBtn.onclick = togglePlay;
    canvasPlayBtn.onclick = togglePlay;

    scrubberTrack.onclick = (e) => {
      const rect = scrubberTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      scrubberFill.style.width = `${pct}%`;
    };

    qualitySelect.onchange = (e) => {
      resolution = e.target.value;
      if (resolution === '360p') {
        resBadge.textContent = '360p ⚡ Data Saver';
        bitrateText.textContent = '450 kbps (Low Data)';
        dataUsedLabel.textContent = '~12 MB';
        showToast('Switched to 360p Low-Data stream (~70% data saved).', 'info');
      } else if (resolution === '720p') {
        resBadge.textContent = '720p HD';
        bitrateText.textContent = '2.4 Mbps';
        dataUsedLabel.textContent = '~64 MB';
      } else {
        resBadge.textContent = '1080p Full HD';
        bitrateText.textContent = '5.8 Mbps';
        dataUsedLabel.textContent = '~180 MB';
      }
    };

    saveOfflineBtn.onclick = () => {
      const isSaved = db.toggleOfflineItem(item.id);
      saveOfflineBtn.textContent = isSaved ? '✓ Saved Offline' : '💾 Save for Offline Playback';
      showToast(isSaved ? 'Video lecture cached in offline memory!' : 'Removed from offline memory.', 'success');
    };
  });
}

// 2. Interactive Presentation Slide Deck Viewer Modal
function openSlideDeckModal(item, openModal, showToast) {
  let currentSlide = 0;
  const slides = item.slides || [
    { title: 'Overview', bullets: ['Key concept 1', 'Key concept 2'] },
    { title: 'Deep Architecture', bullets: ['Scaling pattern', 'Implementation details'] }
  ];

  openModal(`Presentation: ${item.title}`, `
    <div class="slide-deck-viewer">
      <div class="slide-deck-screen glass-panel">
        <div class="slide-stage" id="slide-stage-content">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <div class="slide-deck-controls">
        <button class="btn btn-secondary btn-sm" id="btn-slide-prev">← Previous Slide</button>
        <span class="slide-index-counter" id="slide-counter">Slide 1 of ${slides.length}</span>
        <button class="btn btn-primary btn-sm" id="btn-slide-next">Next Slide →</button>
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Close Viewer</button>
        <button class="btn btn-outline" id="btn-slide-offline">
          ${db.data.currentUser.savedOffline.includes(item.id) ? '✓ Saved in Cache' : '💾 Save Slides for Offline'}
        </button>
      </div>
    </div>
  `, (modalEl, closeModal) => {
    modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;

    const stageEl = modalEl.querySelector('#slide-stage-content');
    const counterEl = modalEl.querySelector('#slide-counter');
    const prevBtn = modalEl.querySelector('#btn-slide-prev');
    const nextBtn = modalEl.querySelector('#btn-slide-next');
    const offlineBtn = modalEl.querySelector('#btn-slide-offline');

    function renderSlide(idx) {
      currentSlide = idx;
      const s = slides[idx];
      counterEl.textContent = `Slide ${idx + 1} of ${slides.length}`;
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === slides.length - 1;

      stageEl.innerHTML = `
        <div class="slide-card-presentation">
          <div class="slide-branding">
            <span class="slide-logo">Connect Capacity Portal</span>
            <span class="slide-author">${item.author}</span>
          </div>
          <h2 class="slide-title-big">${s.title}</h2>
          <ul class="slide-bullet-list">
            ${s.bullets.map(b => `<li><span class="bullet-check">▸</span> ${b}</li>`).join('')}
          </ul>
          <div class="slide-footer-meta">
            <span>Course Track: ${item.tags.join(' • ')}</span>
            <span>Confidential & Certified Learning Material</span>
          </div>
        </div>
      `;
    }

    prevBtn.onclick = () => { if (currentSlide > 0) renderSlide(currentSlide - 1); };
    nextBtn.onclick = () => { if (currentSlide < slides.length - 1) renderSlide(currentSlide + 1); };

    offlineBtn.onclick = () => {
      const isSaved = db.toggleOfflineItem(item.id);
      offlineBtn.textContent = isSaved ? '✓ Saved in Cache' : '💾 Save Slides for Offline';
      showToast(isSaved ? 'Slide deck saved locally for offline review!' : 'Removed from cache.', 'success');
    };

    renderSlide(0);
  });
}

// 3. Study Guide Reader Modal
function openStudyGuideModal(item, openModal, showToast) {
  openModal(`Study Guide: ${item.title}`, `
    <div class="study-guide-reader">
      <div class="guide-meta-banner">
        <div>
          <span class="guide-badge">Production Architecture Guide</span>
          <h4>${item.title}</h4>
          <p class="text-muted">Author: ${item.author} • Read Time: ${item.readTime}</p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-guide-save-offline">
          ${db.data.currentUser.savedOffline.includes(item.id) ? '✓ Saved in Cache' : '💾 Save for Offline Reading'}
        </button>
      </div>

      <div class="guide-body-content markdown-formatted">
        <p class="lead-summary">${item.summary}</p>
        <hr class="divider" />
        <pre class="code-block-mock"><code>${item.guideMarkdown || 'Technical architectural guidelines and implementation patterns.'}</code></pre>
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Close</button>
        <button class="btn btn-primary" id="btn-print-guide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print / Export Study Guide
        </button>
      </div>
    </div>
  `, (modalEl, closeModal) => {
    modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;

    const offlineBtn = modalEl.querySelector('#btn-guide-save-offline');
    offlineBtn.onclick = () => {
      const isSaved = db.toggleOfflineItem(item.id);
      offlineBtn.textContent = isSaved ? '✓ Saved in Cache' : '💾 Save for Offline Reading';
      showToast(isSaved ? 'Study guide cached in device storage!' : 'Removed from offline storage.', 'success');
    };

    modalEl.querySelector('#btn-print-guide').onclick = () => {
      window.print();
    };
  });
}

// 4. Trainer Upload Tool Modal
function openUploadModal(showToast, openModal, onUploadSuccess) {
  openModal('Upload Resource to Digital Library', `
    <div class="upload-content-form">
      <p class="subtitle">Publish streaming lectures, interactive slide decks, or comprehensive study guides accessible to all enrolled trainees.</p>

      <div class="form-group">
        <label>Resource Title</label>
        <input type="text" id="up-title" class="form-control" placeholder="e.g. Distributed Consensus with Raft & Paxos" value="Distributed Consensus with Raft & Paxos" />
      </div>

      <div class="form-row-2">
        <div class="form-group">
          <label>Resource Category</label>
          <select id="up-category" class="select-input full-width">
            <option value="video">🎬 Video Lecture (with Low-Data 360p stream)</option>
            <option value="slides">📊 Presentation Slide Deck</option>
            <option value="guide">📖 Technical Study Guide</option>
          </select>
        </div>
        <div class="form-group">
          <label>Estimated Duration / Read Time</label>
          <input type="text" id="up-duration" class="form-control" placeholder="e.g. 25m 40s or 10 min read" value="18m 30s" />
        </div>
      </div>

      <div class="form-group">
        <label>Technology Tags (comma separated)</label>
        <input type="text" id="up-tags" class="form-control" placeholder="e.g. Distributed Systems, Raft, Go, Consensus" value="Distributed Systems, Raft, Consensus" />
      </div>

      <div class="form-group">
        <label>Executive Summary</label>
        <textarea id="up-summary" class="form-control" rows="2" placeholder="Brief synopsis of what trainees will learn...">Comprehensive breakdown of Raft leader election, log replication, and split-brain prevention with live simulated state machine.</textarea>
      </div>

      <div class="form-group">
        <label>Low-Data Notes / Lecture Transcript</label>
        <textarea id="up-transcript" class="form-control" rows="3" placeholder="Key notes or transcript (displayed in Data Saver mode)...">In distributed systems, achieving reliable state consensus over unreliable networks requires quorum-based protocols...</textarea>
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="btn-confirm-upload">Publish to Cloud Library</button>
      </div>
    </div>
  `, (modalEl, closeModal) => {
    modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;

    modalEl.querySelector('#btn-confirm-upload').onclick = () => {
      const title = modalEl.querySelector('#up-title').value.trim();
      const category = modalEl.querySelector('#up-category').value;
      const duration = modalEl.querySelector('#up-duration').value.trim() || '15 mins';
      const tags = modalEl.querySelector('#up-tags').value.split(',').map(t => t.trim()).filter(Boolean);
      const summary = modalEl.querySelector('#up-summary').value.trim();
      const transcript = modalEl.querySelector('#up-transcript').value.trim();

      if (!title) {
        showToast('Please provide a resource title.', 'danger');
        return;
      }

      const newItem = {
        id: 'lib-' + Date.now(),
        title,
        category,
        author: db.data.currentUser.name,
        duration: category === 'video' ? duration : undefined,
        readTime: category === 'guide' ? duration : undefined,
        slideCount: category === 'slides' ? 6 : undefined,
        fileSize: category === 'video' ? '38 MB (Data Saver) / 140 MB (HD)' : '2.4 MB',
        rating: 5.0,
        tags,
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        summary,
        transcript,
        lowDataSizeKb: 38000,
        offlineSaved: false
      };

      db.addLibraryItem(newItem);
      showToast(`Resource "${title}" successfully published to the Digital Library!`, 'success');
      closeModal();
      if (onUploadSuccess) onUploadSuccess();
    };
  });
}
