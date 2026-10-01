// Smart Trainer Matchmaker Module
import { db } from './data.js';

export function calculateMatchScore(trainer, topicQuery, minRating = 4.5, maxRate = 100) {
  if (!topicQuery || topicQuery.trim() === '') {
    // General rating & experience score
    const ratingScore = (trainer.rating / 5.0) * 60;
    const expScore = Math.min((trainer.experienceYears / 10) * 40, 40);
    return Math.round(ratingScore + expScore);
  }

  const queryTerms = topicQuery.toLowerCase().split(/\s+/).filter(Boolean);
  let skillHits = 0;
  let topicHits = 0;

  queryTerms.forEach(term => {
    // Check skills
    const hasSkill = trainer.skills.some(skill => skill.toLowerCase().includes(term));
    if (hasSkill) skillHits += 1.5;

    // Check topics
    const hasTopic = trainer.topics.some(top => top.toLowerCase().includes(term));
    if (hasTopic) topicHits += 2;

    // Check bio & title
    if (trainer.title.toLowerCase().includes(term)) skillHits += 1;
    if (trainer.bio.toLowerCase().includes(term)) skillHits += 0.5;
  });

  const rawRelevance = (skillHits * 25) + (topicHits * 35);
  const normalizedRelevance = Math.min(rawRelevance, 70);

  // Rating contribution (up to 20%)
  const ratingWeight = (trainer.rating / 5.0) * 20;

  // Rate budget bonus (up to 10%)
  const budgetWeight = trainer.hourlyRate <= maxRate ? 10 : Math.max(0, 10 - ((trainer.hourlyRate - maxRate) / 10));

  const totalScore = Math.min(Math.round(normalizedRelevance + ratingWeight + budgetWeight), 99);
  return Math.max(totalScore, 42); // minimum baseline
}

export function renderMatchmakerView(container, showToast, openModal) {
  const allTrainers = db.data.trainers;

  container.innerHTML = `
    <div class="matchmaker-header">
      <div class="header-text">
        <div class="badge-pill pulse-badge">
          <span class="pulse-dot"></span> AI-Powered Recommendation Engine
        </div>
        <h2>Smart Trainer Matchmaker</h2>
        <p class="subtitle">Enter your course topic, target skills, or project requirements. Our smart matching algorithm computes real-time compatibility based on domain expertise, student ratings, and availability.</p>
      </div>

      <div class="match-search-card glass-panel">
        <div class="search-input-group">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" id="match-topic-input" class="search-input" placeholder="e.g. Kubernetes, Generative AI, Penetration Testing, Full Stack React..." value="Kubernetes & DevOps" />
          <button id="btn-trigger-match" class="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Analyze & Match
          </button>
        </div>

        <!-- Quick Topic Tags -->
        <div class="quick-tags-row">
          <span class="quick-tag-label">Popular Topics:</span>
          <button class="chip-tag" data-tag="Kubernetes & DevOps">⚡ Kubernetes & Cloud</button>
          <button class="chip-tag" data-tag="Deep Learning & LLMs">🤖 AI & Deep Learning</button>
          <button class="chip-tag" data-tag="Cybersecurity & Zero Trust">🛡️ Cybersecurity</button>
          <button class="chip-tag" data-tag="React & Microservices">🌐 Full Stack Web</button>
          <button class="chip-tag" data-tag="Design Systems">🎨 UI/UX Design</button>
        </div>

        <!-- Filters Row -->
        <div class="filters-row">
          <div class="filter-item">
            <label for="filter-min-rating">Min Rating: <span id="label-rating-val">4.5+</span></label>
            <input type="range" id="filter-min-rating" min="4.0" max="5.0" step="0.1" value="4.5" />
          </div>
          <div class="filter-item">
            <label for="filter-max-rate">Max Hourly Rate: <span id="label-rate-val">$80/hr</span></label>
            <input type="range" id="filter-max-rate" min="40" max="120" step="5" value="80" />
          </div>
          <div class="filter-item">
            <label for="filter-sort">Sort By:</label>
            <select id="filter-sort" class="select-input">
              <option value="match">Highest Match Score</option>
              <option value="rating">Top Rated (Stars)</option>
              <option value="experience">Most Experienced</option>
              <option value="rate-asc">Lowest Hourly Rate</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Match Results Grid -->
    <div class="match-results-section">
      <div class="results-header-bar">
        <h3 id="match-results-title">Recommended Trainers (Top Matches)</h3>
        <span class="match-count-badge" id="match-count">Calculating...</span>
      </div>
      <div id="trainer-cards-grid" class="trainer-cards-grid">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;

  // Attach interactive listeners
  const inputEl = container.querySelector('#match-topic-input');
  const triggerBtn = container.querySelector('#btn-trigger-match');
  const ratingSlider = container.querySelector('#filter-min-rating');
  const ratingLabel = container.querySelector('#label-rating-val');
  const rateSlider = container.querySelector('#filter-max-rate');
  const rateLabel = container.querySelector('#label-rate-val');
  const sortSelect = container.querySelector('#filter-sort');
  const chipTags = container.querySelectorAll('.chip-tag');

  function updateCards() {
    const query = inputEl.value.trim();
    const minRating = parseFloat(ratingSlider.value);
    const maxRate = parseInt(rateSlider.value, 10);
    const sortBy = sortSelect.value;

    ratingLabel.textContent = minRating.toFixed(1) + '+';
    rateLabel.textContent = '$' + maxRate + '/hr';

    // Filter and score
    let scored = allTrainers.map(trainer => {
      const matchScore = calculateMatchScore(trainer, query, minRating, maxRate);
      return { ...trainer, matchScore };
    });

    scored = scored.filter(t => t.rating >= minRating && t.hourlyRate <= maxRate);

    // Sort
    if (sortBy === 'match') {
      scored.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'rating') {
      scored.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      scored.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (sortBy === 'rate-asc') {
      scored.sort((a, b) => a.hourlyRate - b.hourlyRate);
    }

    const countBadge = container.querySelector('#match-count');
    countBadge.textContent = `${scored.length} Available Qualified Trainers`;

    const grid = container.querySelector('#trainer-cards-grid');
    if (scored.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-icon">🔍</div>
          <h4>No trainers match these precise filter criteria</h4>
          <p>Try widening your hourly rate range or lowering the minimum rating threshold.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = scored.map((t, idx) => {
      const isTopMatch = idx === 0 && t.matchScore >= 85;
      return `
        <div class="trainer-card glass-card ${isTopMatch ? 'card-top-match' : ''}">
          ${isTopMatch ? '<div class="ribbon-top-match">🔥 Top Match</div>' : ''}
          <div class="trainer-card-header">
            <div class="avatar-wrapper">
              <img src="${t.avatar}" alt="${t.name}" class="trainer-avatar" />
              ${t.verified ? '<span class="verified-badge-icon" title="Identity & Skills Verified">✓</span>' : ''}
            </div>
            <div class="trainer-info">
              <div class="name-row">
                <h4>${t.name}</h4>
                <div class="match-score-badge ${t.matchScore >= 90 ? 'score-high' : t.matchScore >= 75 ? 'score-med' : 'score-regular'}">
                  ${t.matchScore}% Match
                </div>
              </div>
              <p class="trainer-title">${t.title}</p>
              <div class="trainer-meta-row">
                <span class="rating-stars">★ ${t.rating.toFixed(2)} (${t.reviewCount} reviews)</span>
                <span class="meta-dot">•</span>
                <span class="exp-badge">${t.experienceYears} yrs exp</span>
                <span class="meta-dot">•</span>
                <span class="rate-badge">$${t.hourlyRate}/hr</span>
              </div>
            </div>
          </div>

          <p class="trainer-bio">${t.bio}</p>

          <div class="trainer-skills-wrap">
            ${t.skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>

          <div class="trainer-card-footer">
            <div class="availability-info">
              <span class="status-indicator online"></span>
              <span>${t.availability}</span>
            </div>
            <div class="action-buttons">
              <button class="btn btn-sm btn-outline btn-view-profile" data-id="${t.id}">
                View Profile
              </button>
              <button class="btn btn-sm btn-primary btn-request-trainer" data-id="${t.id}" data-name="${t.name}">
                Request Trainer
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach request buttons
    grid.querySelectorAll('.btn-request-trainer').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const trId = e.currentTarget.getAttribute('data-id');
        const trName = e.currentTarget.getAttribute('data-name');
        openRequestModal(trId, trName);
      });
    });

    // Attach view profile buttons
    grid.querySelectorAll('.btn-view-profile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const trId = e.currentTarget.getAttribute('data-id');
        openProfileModal(trId);
      });
    });
  }

  function openRequestModal(trainerId, trainerName) {
    const currentTopic = inputEl.value || 'General Coaching';
    const trainer = allTrainers.find(t => t.id === trainerId);

    openModal(`Request 1-on-1 Coaching with ${trainerName}`, `
      <div class="request-match-modal-content">
        <div class="modal-trainer-summary">
          <img src="${trainer.avatar}" class="modal-trainer-avatar" />
          <div>
            <h4>${trainer.name}</h4>
            <p class="text-muted">${trainer.title}</p>
            <p class="text-accent">Rate: $${trainer.hourlyRate}/hr • Rating: ★ ${trainer.rating}</p>
          </div>
        </div>

        <div class="form-group">
          <label>Course Topic / Training Focus</label>
          <input type="text" id="req-topic-field" class="form-control" value="${currentTopic}" />
        </div>

        <div class="form-group">
          <label>Preferred Session Schedule</label>
          <select id="req-schedule-field" class="select-input full-width">
            <option>Next available weekday evening (18:00 - 20:00 UTC)</option>
            <option>Weekend intensive bootcamp (Saturday morning)</option>
            <option>Flexible (Asynchronously over 2 weeks)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Notes / Questions for ${trainer.name}</label>
          <textarea id="req-notes-field" class="form-control" rows="3" placeholder="Tell the trainer what specific challenges or goals you have in mind..."></textarea>
        </div>

        <div class="modal-action-footer">
          <button class="btn btn-secondary modal-cancel-btn">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-match-req">Send Match Request</button>
        </div>
      </div>
    `, (modalEl, closeModal) => {
      modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;
      modalEl.querySelector('#btn-confirm-match-req').onclick = () => {
        const topic = modalEl.querySelector('#req-topic-field').value;
        const notes = modalEl.querySelector('#req-notes-field').value;
        db.submitMatchRequest(trainerId, topic, notes);
        showToast(`Match request dispatched to ${trainerName}! They will respond within 4 hours.`, 'success');
        closeModal();
      };
    });
  }

  function openProfileModal(trainerId) {
    const trainer = allTrainers.find(t => t.id === trainerId);
    if (!trainer) return;

    openModal(`${trainer.name} - Trainer Profile & Credentials`, `
      <div class="trainer-profile-modal-content">
        <div class="profile-hero">
          <img src="${trainer.avatar}" class="profile-hero-avatar" />
          <div class="profile-hero-text">
            <h3>${trainer.name} ${trainer.verified ? '<span class="verified-tag">✓ Verified Expert</span>' : ''}</h3>
            <p class="text-accent">${trainer.title}</p>
            <p class="profile-meta">★ ${trainer.rating} (${trainer.reviewCount} verified reviews) • ${trainer.experienceYears} Years Enterprise Experience • $${trainer.hourlyRate}/hr</p>
          </div>
        </div>

        <div class="profile-section">
          <h5>Biography & Background</h5>
          <p>${trainer.bio}</p>
        </div>

        <div class="profile-section">
          <h5>Core Competencies & Technology Stack</h5>
          <div class="skills-pill-wrap">
            ${trainer.skills.map(s => `<span class="skill-pill-highlight">${s}</span>`).join('')}
          </div>
        </div>

        <div class="profile-section">
          <h5>Curated Courses Taught</h5>
          <ul class="course-list-bulleted">
            ${trainer.topics.map(tp => `<li><strong>${tp}</strong> - Comprehensive modules with live quizzes and digital slide decks.</li>`).join('')}
          </ul>
        </div>

        <div class="profile-section">
          <h5>Recent Trainee Feedback</h5>
          <div class="review-quote-box">
            <p class="review-text">"Dr. Jenkins explained Transformer self-attention with unmatched clarity. The hands-on coding exercises accelerated our deployment by weeks."</p>
            <span class="review-author">— Michael T., Enterprise Cloud Architect</span>
          </div>
        </div>

        <div class="modal-action-footer">
          <button class="btn btn-secondary modal-cancel-btn">Close</button>
          <button class="btn btn-primary" id="btn-profile-book">Book Session with ${trainer.name}</button>
        </div>
      </div>
    `, (modalEl, closeModal) => {
      modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;
      modalEl.querySelector('#btn-profile-book').onclick = () => {
        closeModal();
        openRequestModal(trainer.id, trainer.name);
      };
    });
  }

  // Event handlers
  triggerBtn.addEventListener('click', updateCards);
  inputEl.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') updateCards();
  });
  ratingSlider.addEventListener('input', updateCards);
  rateSlider.addEventListener('input', updateCards);
  sortSelect.addEventListener('change', updateCards);

  chipTags.forEach(chip => {
    chip.addEventListener('click', (e) => {
      inputEl.value = e.currentTarget.getAttribute('data-tag');
      updateCards();
    });
  });

  // Initial trigger
  updateCards();
}
