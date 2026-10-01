// Interactive Quiz System Module
import { db } from './data.js';

let activeQuizTimer = null;

// Helper to shuffle array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function renderQuizListView(container, showToast, openModal, onCertificateEarned) {
  const currentUser = db.data.currentUser;
  const isTrainer = currentUser.role === 'trainer';
  const allQuizzes = db.data.quizzes;

  container.innerHTML = `
    <div class="quiz-section-header">
      <div>
        <div class="badge-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Timed Evaluations & Instant Grading
        </div>
        <h2>Interactive Quiz Center</h2>
        <p class="subtitle">Complete technical evaluations under live countdown conditions. Quizzes feature randomized question delivery, instant automated grading, and instant verifiable certificates for scores of 80% and above.</p>
      </div>
      ${isTrainer ? `
        <button id="btn-create-quiz" class="btn btn-primary pulse-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Publish New Quiz
        </button>
      ` : ''}
    </div>

    <!-- Active Quizzes Grid -->
    <div class="quizzes-grid">
      ${allQuizzes.map(quiz => {
        const completedRecord = currentUser.completedQuizzes?.find(cq => cq.quizId === quiz.id);
        const deadlineDate = new Date(quiz.deadline);
        const isPast = deadlineDate < new Date();
        const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        return `
          <div class="quiz-card glass-card">
            <div class="quiz-card-top">
              <span class="quiz-course-tag" style="border-left: 3px solid ${quiz.badgeColor || '#6366f1'}">${quiz.course}</span>
              ${completedRecord ? `
                <span class="badge ${completedRecord.passed ? 'badge-success' : 'badge-danger'}">
                  ${completedRecord.passed ? 'Passed: ' + completedRecord.score + '%' : 'Failed: ' + completedRecord.score + '%'}
                </span>
              ` : `
                <span class="badge badge-warning">
                  ${quiz.timeLimitMinutes} Mins • ${quiz.questions.length} Questions
                </span>
              `}
            </div>

            <h3 class="quiz-title">${quiz.title}</h3>
            <p class="quiz-author">Curated by <strong>${quiz.author}</strong></p>

            <div class="quiz-features-row">
              <span class="feature-item" title="Questions are randomized for each student">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                Mixed Order
              </span>
              <span class="feature-item" title="Passing threshold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Pass: ${quiz.passingScore}%
              </span>
              <span class="feature-item deadline-item ${isPast ? 'text-danger' : ''}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Due: ${formattedDeadline}
              </span>
            </div>

            <div class="quiz-card-bottom">
              ${completedRecord ? `
                <button class="btn btn-outline btn-sm btn-retake-quiz" data-id="${quiz.id}">
                  Retake Evaluation
                </button>
                ${completedRecord.score >= 80 ? `
                  <button class="btn btn-accent btn-sm btn-view-earned-cert" data-title="${quiz.title}">
                    View Certificate 🏆
                  </button>
                ` : ''}
              ` : `
                <button class="btn btn-primary full-width btn-start-quiz" data-id="${quiz.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Start Timed Quiz (${quiz.timeLimitMinutes}m)
                </button>
              `}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach start quiz listener
  container.querySelectorAll('.btn-start-quiz, .btn-retake-quiz').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const quizId = e.currentTarget.getAttribute('data-id');
      startQuizSession(quizId, showToast, openModal, onCertificateEarned, () => {
        renderQuizListView(container, showToast, openModal, onCertificateEarned);
      });
    });
  });

  // Attach certificate button
  container.querySelectorAll('.btn-view-earned-cert').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const title = e.currentTarget.getAttribute('data-title');
      const cert = db.data.currentUser.certificates?.find(c => c.quizTitle === title) || db.data.currentUser.certificates?.[0];
      if (cert && onCertificateEarned) {
        onCertificateEarned(cert);
      } else {
        showToast('Certificate verified and active in profile!', 'info');
      }
    });
  });

  // Attach create quiz listener for trainers
  const createBtn = container.querySelector('#btn-create-quiz');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      openCreateQuizModal(showToast, openModal, () => {
        renderQuizListView(container, showToast, openModal, onCertificateEarned);
      });
    });
  }
}

// Start Quiz Session with Timer & Shuffled Questions
export function startQuizSession(quizId, showToast, openModal, onCertificateEarned, onFinishCallback) {
  const quiz = db.data.quizzes.find(q => q.id === quizId);
  if (!quiz) return;

  // Mixed up questions order if configured
  const questionsToUse = quiz.shuffleQuestions ? shuffleArray(quiz.questions) : [...quiz.questions];

  let currentQuestionIndex = 0;
  const userAnswers = {}; // { questionId: selectedIndex }
  let remainingSeconds = quiz.timeLimitMinutes * 60;

  // Build Quiz Modal UI
  openModal(`Assessment: ${quiz.title}`, `
    <div class="quiz-player-modal">
      <div class="quiz-timer-bar-wrapper">
        <div class="timer-display-row">
          <span class="quiz-progress-text">Question <strong id="current-q-num">1</strong> of ${questionsToUse.length}</span>
          <div class="timer-countdown-pill" id="timer-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span id="timer-text">04:00</span>
          </div>
        </div>
        <div class="progress-bar-track">
          <div id="quiz-progress-fill" class="progress-bar-fill" style="width: 0%"></div>
        </div>
      </div>

      <div class="question-tracker-pills" id="tracker-pills">
        ${questionsToUse.map((_, i) => `<button class="tracker-pill ${i === 0 ? 'active' : ''}" data-idx="${i}">${i + 1}</button>`).join('')}
      </div>

      <div class="question-container-box" id="question-box">
        <!-- Rendered dynamically -->
      </div>

      <div class="quiz-navigation-footer">
        <button id="btn-prev-question" class="btn btn-secondary" disabled>← Previous</button>
        <button id="btn-next-question" class="btn btn-outline">Next →</button>
        <button id="btn-submit-quiz" class="btn btn-primary" style="margin-left: auto;">
          Submit & Grade Quiz
        </button>
      </div>
    </div>
  `, (modalEl, closeModal) => {
    const timerTextEl = modalEl.querySelector('#timer-text');
    const timerPillEl = modalEl.querySelector('#timer-pill');
    const progressFillEl = modalEl.querySelector('#quiz-progress-fill');
    const questionBoxEl = modalEl.querySelector('#question-box');
    const qNumEl = modalEl.querySelector('#current-q-num');
    const prevBtn = modalEl.querySelector('#btn-prev-question');
    const nextBtn = modalEl.querySelector('#btn-next-question');
    const submitBtn = modalEl.querySelector('#btn-submit-quiz');
    const trackerPills = modalEl.querySelectorAll('.tracker-pill');

    const totalSeconds = quiz.timeLimitMinutes * 60;

    // Timer Interval
    clearInterval(activeQuizTimer);
    activeQuizTimer = setInterval(() => {
      remainingSeconds--;
      const mins = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;
      timerTextEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      // Progress bar (countdown elapsed)
      const elapsedPercent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
      progressFillEl.style.width = `${elapsedPercent}%`;

      if (remainingSeconds <= 30) {
        timerPillEl.classList.add('urgent-pulse');
      }

      if (remainingSeconds <= 0) {
        clearInterval(activeQuizTimer);
        showToast('Time is up! Submitting evaluation...', 'warning');
        finishGrading();
      }
    }, 1000);

    function renderQuestion(index) {
      currentQuestionIndex = index;
      qNumEl.textContent = index + 1;
      const q = questionsToUse[index];

      // Update tracker pills
      trackerPills.forEach((p, i) => {
        p.classList.remove('active');
        if (i === index) p.classList.add('active');
        if (userAnswers[questionsToUse[i].id] !== undefined) {
          p.classList.add('answered');
        }
      });

      // Update nav buttons
      prevBtn.disabled = index === 0;
      if (index === questionsToUse.length - 1) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'inline-flex';
      }

      const selectedOption = userAnswers[q.id];

      questionBoxEl.innerHTML = `
        <h4 class="question-text">${q.question}</h4>
        <div class="options-list">
          ${q.options.map((opt, optIdx) => `
            <label class="option-label ${selectedOption === optIdx ? 'selected' : ''}">
              <input type="radio" name="opt-${q.id}" value="${optIdx}" ${selectedOption === optIdx ? 'checked' : ''} />
              <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
              <span class="option-text">${opt}</span>
            </label>
          `).join('')}
        </div>
      `;

      // Option change handler
      questionBoxEl.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          userAnswers[q.id] = parseInt(e.target.value, 10);
          renderQuestion(currentQuestionIndex);
        });
      });
    }

    prevBtn.onclick = () => {
      if (currentQuestionIndex > 0) renderQuestion(currentQuestionIndex - 1);
    };

    nextBtn.onclick = () => {
      if (currentQuestionIndex < questionsToUse.length - 1) renderQuestion(currentQuestionIndex + 1);
    };

    trackerPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        renderQuestion(idx);
      });
    });

    submitBtn.onclick = () => {
      const unanswered = questionsToUse.filter(q => userAnswers[q.id] === undefined).length;
      if (unanswered > 0) {
        if (!confirm(`You have ${unanswered} unanswered question(s). Are you sure you want to finish and submit?`)) {
          return;
        }
      }
      clearInterval(activeQuizTimer);
      finishGrading();
    };

    function finishGrading() {
      clearInterval(activeQuizTimer);
      let correctCount = 0;
      questionsToUse.forEach(q => {
        if (userAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      });

      const scorePercent = Math.round((correctCount / questionsToUse.length) * 100);
      const passed = scorePercent >= quiz.passingScore;

      const submissionResult = db.recordQuizSubmission(quiz.id, scorePercent, passed);
      closeModal();

      // Show Results Modal
      openModal(`Evaluation Results: ${quiz.title}`, `
        <div class="quiz-results-modal">
          <div class="result-score-banner ${passed ? 'banner-pass' : 'banner-fail'}">
            <div class="result-icon">${passed ? '🎉' : '⚠️'}</div>
            <h2>${scorePercent}%</h2>
            <h4>${passed ? 'Congratulations! You Passed!' : 'Passing Threshold Not Met'}</h4>
            <p>${passed ? `You scored ${correctCount} out of ${questionsToUse.length} questions correctly, surpassing the required ${quiz.passingScore}% threshold.` : `You achieved ${correctCount}/${questionsToUse.length}. The passing threshold is ${quiz.passingScore}%. You can review the correct answers below and retake anytime.`}</p>
          </div>

          ${submissionResult?.cert ? `
            <div class="earned-cert-callout glass-panel">
              <div class="cert-callout-text">
                <strong>🏆 Official Certificate Generated</strong>
                <p>Credential ID: ${submissionResult.cert.id}</p>
              </div>
              <button id="btn-view-new-cert" class="btn btn-accent btn-sm">
                View & Download Certificate
              </button>
            </div>
          ` : ''}

          <div class="review-questions-breakdown">
            <h4>Detailed Answer Breakdown</h4>
            ${questionsToUse.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctIndex;
              return `
                <div class="review-item ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                  <div class="review-q-header">
                    <span class="review-badge ${isCorrect ? 'badge-success' : 'badge-danger'}">
                      ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <strong>Q${idx + 1}: ${q.question}</strong>
                  </div>
                  <div class="review-details">
                    <p class="review-user-ans">Your answer: <span>${userAns !== undefined ? `${String.fromCharCode(65 + userAns)}) ${q.options[userAns]}` : 'No answer selected'}</span></p>
                    ${!isCorrect ? `
                      <p class="review-correct-ans">Correct answer: <strong>${String.fromCharCode(65 + q.correctIndex)}) ${q.options[q.correctIndex]}</strong></p>
                    ` : ''}
                    <div class="review-explanation">
                      💡 <strong>Explanation:</strong> ${q.explanation}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="modal-action-footer">
            <button class="btn btn-primary" id="btn-close-results">Finish Review</button>
          </div>
        </div>
      `, (resModal, closeResModal) => {
        resModal.querySelector('#btn-close-results').onclick = () => {
          closeResModal();
          if (onFinishCallback) onFinishCallback();
        };

        const certBtn = resModal.querySelector('#btn-view-new-cert');
        if (certBtn && submissionResult?.cert) {
          certBtn.onclick = () => {
            closeResModal();
            if (onCertificateEarned) onCertificateEarned(submissionResult.cert);
          };
        }
      });
    }

    // Initial question
    renderQuestion(0);
  });
}

// Trainer Tool: Create and Publish Multiple-Choice Quiz
export function openCreateQuizModal(showToast, openModal, onPublished) {
  let questionDrafts = [
    {
      question: 'What is the primary role of a Reverse Proxy in cloud network architecture?',
      options: [
        'To compile code on the server before execution',
        'To distribute client requests, provide SSL termination, and protect internal servers',
        'To store persistent user database files on disk',
        'To generate frontend CSS stylesheets automatically'
      ],
      correctIndex: 1,
      explanation: 'A reverse proxy intercepts inbound requests, balancing loads, offloading SSL/TLS, and abstracting internal service topologies.'
    },
    {
      question: 'Which consistency model guarantees that any read returns the most recent write?',
      options: [
        'Eventual Consistency',
        'Causal Consistency',
        'Strict Linearizability',
        'Read-uncommitted'
      ],
      correctIndex: 2,
      explanation: 'Linearizability provides real-time recency guarantees where every read operation observes the latest completed write.'
    }
  ];

  openModal('Publish New Technical Quiz', `
    <div class="create-quiz-modal">
      <p class="subtitle">Design a multiple-choice quiz with countdown duration, randomized question delivery, and instant automated grading.</p>

      <div class="form-row-2">
        <div class="form-group">
          <label>Quiz Title</label>
          <input type="text" id="new-quiz-title" class="form-control" placeholder="e.g. Distributed Systems & High Availability" value="Distributed Systems & High Availability" />
        </div>
        <div class="form-group">
          <label>Course Track</label>
          <input type="text" id="new-quiz-course" class="form-control" placeholder="e.g. Cloud & Systems Engineering" value="Cloud & Systems Engineering" />
        </div>
      </div>

      <div class="form-row-3">
        <div class="form-group">
          <label>Countdown Duration (Minutes)</label>
          <input type="number" id="new-quiz-duration" class="form-control" min="1" max="60" value="5" />
        </div>
        <div class="form-group">
          <label>Passing Threshold (%)</label>
          <input type="number" id="new-quiz-pass" class="form-control" min="50" max="100" value="80" />
        </div>
        <div class="form-group">
          <label>Submission Deadline</label>
          <input type="date" id="new-quiz-deadline" class="form-control" value="2026-10-15" />
        </div>
      </div>

      <div class="form-checkbox-row">
        <label class="custom-checkbox-label">
          <input type="checkbox" id="new-quiz-shuffle" checked />
          <span>Enable Mixed-Up (Randomized) Question Ordering for Students</span>
        </label>
      </div>

      <hr class="divider" />

      <div class="builder-questions-header">
        <h4>Questions Builder (<span id="draft-count">2</span> Questions)</h4>
        <button type="button" id="btn-add-q-draft" class="btn btn-sm btn-outline">+ Add Another Question</button>
      </div>

      <div id="questions-draft-container" class="questions-draft-list">
        <!-- Rendered dynamically -->
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="btn-publish-quiz-confirm">Publish Quiz to Portal</button>
      </div>
    </div>
  `, (modalEl, closeModal) => {
    modalEl.querySelector('.modal-cancel-btn').onclick = closeModal;

    const draftContainer = modalEl.querySelector('#questions-draft-container');
    const draftCountSpan = modalEl.querySelector('#draft-count');
    const addQBtn = modalEl.querySelector('#btn-add-q-draft');

    function renderDrafts() {
      draftCountSpan.textContent = questionDrafts.length;
      draftContainer.innerHTML = questionDrafts.map((qd, qIdx) => `
        <div class="draft-question-card glass-panel" data-qidx="${qIdx}">
          <div class="draft-header">
            <strong>Question ${qIdx + 1}</strong>
            ${questionDrafts.length > 1 ? `<button type="button" class="btn-remove-q text-danger" data-qidx="${qIdx}">✕ Remove</button>` : ''}
          </div>
          <div class="form-group">
            <input type="text" class="form-control draft-q-input" value="${qd.question}" placeholder="Enter question prompt..." />
          </div>
          <label class="small-label">Options (Select radio button for the Correct Answer):</label>
          <div class="draft-options-grid">
            ${qd.options.map((opt, optIdx) => `
              <div class="draft-opt-row">
                <input type="radio" name="draft-correct-${qIdx}" value="${optIdx}" ${qd.correctIndex === optIdx ? 'checked' : ''} title="Mark as correct answer" />
                <span class="draft-opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                <input type="text" class="form-control draft-opt-text" data-optidx="${optIdx}" value="${opt}" placeholder="Option text..." />
              </div>
            `).join('')}
          </div>
          <div class="form-group" style="margin-top: 10px;">
            <input type="text" class="form-control draft-expl-input" value="${qd.explanation}" placeholder="Explanation (shown to student after grading)..." />
          </div>
        </div>
      `).join('');

      // Attach remove handlers
      draftContainer.querySelectorAll('.btn-remove-q').forEach(btn => {
        btn.onclick = (e) => {
          const idx = parseInt(e.target.getAttribute('data-qidx'), 10);
          questionDrafts.splice(idx, 1);
          renderDrafts();
        };
      });

      // Attach input sync
      draftContainer.querySelectorAll('.draft-question-card').forEach(card => {
        const qIdx = parseInt(card.getAttribute('data-qidx'), 10);
        const qInput = card.querySelector('.draft-q-input');
        const explInput = card.querySelector('.draft-expl-input');

        qInput.oninput = () => { questionDrafts[qIdx].question = qInput.value; };
        explInput.oninput = () => { questionDrafts[qIdx].explanation = explInput.value; };

        card.querySelectorAll('.draft-opt-text').forEach(optInput => {
          const optIdx = parseInt(optInput.getAttribute('data-optidx'), 10);
          optInput.oninput = () => { questionDrafts[qIdx].options[optIdx] = optInput.value; };
        });

        card.querySelectorAll(`input[name="draft-correct-${qIdx}"]`).forEach(radio => {
          radio.onchange = () => { questionDrafts[qIdx].correctIndex = parseInt(radio.value, 10); };
        });
      });
    }

    addQBtn.onclick = () => {
      questionDrafts.push({
        question: 'New technical assessment question...',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: 0,
        explanation: 'Detailed concept explanation for trainees.'
      });
      renderDrafts();
    };

    renderDrafts();

    // Confirm Publish
    modalEl.querySelector('#btn-publish-quiz-confirm').onclick = () => {
      const title = modalEl.querySelector('#new-quiz-title').value.trim();
      const course = modalEl.querySelector('#new-quiz-course').value.trim();
      const duration = parseInt(modalEl.querySelector('#new-quiz-duration').value, 10) || 5;
      const pass = parseInt(modalEl.querySelector('#new-quiz-pass').value, 10) || 75;
      const deadline = modalEl.querySelector('#new-quiz-deadline').value || '2026-10-20';
      const shuffle = modalEl.querySelector('#new-quiz-shuffle').checked;

      if (!title || !course) {
        showToast('Please specify both quiz title and course track.', 'danger');
        return;
      }

      const newQuiz = {
        id: 'q-' + Date.now(),
        title,
        course,
        author: db.data.currentUser.name,
        timeLimitMinutes: duration,
        deadline: `${deadline}T23:59:00`,
        passingScore: pass,
        shuffleQuestions: shuffle,
        badgeColor: '#10b981',
        questions: questionDrafts
      };

      db.addQuiz(newQuiz);
      showToast(`Quiz "${title}" published with randomized questions and instant grading!`, 'success');
      closeModal();
      if (onPublished) onPublished();
    };
  });
}
