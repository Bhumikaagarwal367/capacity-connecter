/**
 * Connect Capacity — Login Controller v2
 * 3-step flow: Email → Password → OTP
 *
 * KEY FIX: ANY valid email address can now log in.
 * - Known accounts (3 preset) are auto-matched and loaded with their full data.
 * - Unknown emails are treated as new "Guest Trainee" accounts and auto-registered
 *   into LocalStorage so they land on the trainee dashboard.
 * - OTP is generated randomly and displayed on-screen (simulated, no email server).
 */

/* ─────────────────────────────────────────────────────────────────────────
   KNOWN ACCOUNTS (preset data — password: demo1234)
   Any other email will work too, with password of user's choice (min 6 chars)
   ───────────────────────────────────────────────────────────────────────── */
const KNOWN_USERS = {
  'alex.chen@learn.io': {
    uid: 'user-trainee-1',
    name: 'Alex Chen',
    email: 'alex.chen@learn.io',
    password: 'demo1234',
    role: 'trainee',
    title: 'Senior Associate Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    enrolledCourses: ['c-1', 'c-2', 'c-3'],
    savedOffline: ['lib-1', 'lib-3'],
    completedQuizzes: [{ quizId: 'q-2', score: 90, total: 100, date: '2026-09-25', passed: true }],
    certificates: [{ id: 'CERT-8849-SEC', quizTitle: 'Modern Web Security & OWASP Top 10', issuedDate: 'September 25, 2026', score: '90%', verificationHash: '0x8f9c2e4b1a7d' }]
  },
  'sarah.jenkins@learn.io': {
    uid: 'user-trainer-1',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@learn.io',
    password: 'demo1234',
    role: 'trainer',
    title: 'Principal AI & Cloud Architect',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    enrolledCourses: [], savedOffline: [], completedQuizzes: [], certificates: []
  },
  'marcus.vance@learn.io': {
    uid: 'user-admin-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@learn.io',
    password: 'demo1234',
    role: 'admin',
    title: 'Platform Chief Operations',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    enrolledCourses: [], savedOffline: [], completedQuizzes: [], certificates: []
  }
};

const SESSION_KEY  = 'cc_active_session';
const STORAGE_KEY  = 'connect_capacity_portal_db_v1';
const REG_KEY      = 'cc_registered_users'; // stores custom-email accounts

/* ─────────────────────────────────────────────────────────────────────────
   REGISTERED USERS (custom emails stored in localStorage)
   ───────────────────────────────────────────────────────────────────────── */
function loadRegisteredUsers() {
  try { return JSON.parse(localStorage.getItem(REG_KEY) || '{}'); }
  catch { return {}; }
}

function saveRegisteredUser(user) {
  const reg = loadRegisteredUsers();
  reg[user.email.toLowerCase()] = { uid: user.uid, name: user.name, email: user.email, password: user.password, role: user.role, title: user.title, avatar: user.avatar };
  localStorage.setItem(REG_KEY, JSON.stringify(reg));
}

/* ─────────────────────────────────────────────────────────────────────────
   LOOK UP USER — known accounts first, then registered, then create guest
   ───────────────────────────────────────────────────────────────────────── */
function findUser(email) {
  const key = email.toLowerCase();
  if (KNOWN_USERS[key]) return { type: 'known', user: KNOWN_USERS[key] };
  const reg = loadRegisteredUsers();
  if (reg[key]) return { type: 'registered', user: reg[key] };
  return { type: 'new', user: null };
}

/* ─────────────────────────────────────────────────────────────────────────
   BUILD A GUEST PROFILE for any unknown email
   ───────────────────────────────────────────────────────────────────────── */
function buildGuestProfile(email, password) {
  const localPart = email.split('@')[0];
  const name = localPart.replace(/[.\-_]/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    uid: 'user-guest-' + Date.now(),
    name,
    email: email.toLowerCase(),
    password,
    role: 'trainee',
    title: 'Portal Member',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=150`,
    enrolledCourses: [],
    savedOffline: [],
    completedQuizzes: [],
    certificates: []
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   SESSION MANAGEMENT
   ───────────────────────────────────────────────────────────────────────── */
function saveSession(user, remember) {
  const payload = { uid: user.uid, role: user.role, ts: Date.now() };
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(payload));
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/* Auto-redirect if already logged in */
;(function() {
  const s = getSession();
  if (s && s.uid) window.location.replace('/');
})();

/* ─────────────────────────────────────────────────────────────────────────
   SYNC USER → portal's own LocalStorage DB (so app.js sees correct user)
   ───────────────────────────────────────────────────────────────────────── */
function syncToPortalDB(user) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // ── Strategy ────────────────────────────────────────────────────────────
    // data.js only uses INITIAL_DATA when the key is completely ABSENT from
    // localStorage. If we write ANY value (even with empty arrays) it uses
    // that and the dashboard is blank.
    //
    // Fix: if the existing DB is missing real content keys (trainers/courses/
    // quizzes/library/news), DELETE the whole key so data.js re-initialises
    // from INITIAL_DATA on next page load, then immediately overwrite only
    // currentUser + roles so the correct user is visible after redirect.
    // ────────────────────────────────────────────────────────────────────────

    let db = null;
    try { db = raw ? JSON.parse(raw) : null; } catch { db = null; }

    const hasRealData = db &&
      Array.isArray(db.trainers) && db.trainers.length > 0 &&
      Array.isArray(db.news)     && db.news.length     > 0 &&
      Array.isArray(db.courses)  && db.courses.length  > 0;

    if (!hasRealData) {
      // Nuke the stale/empty DB — data.js will rebuild from INITIAL_DATA
      localStorage.removeItem(STORAGE_KEY);
      // Write a tiny bootstrap record that data.js will merge over on load.
      // We store it under a *different* key so data.js still sees the key as
      // absent and runs its INITIAL_DATA path, but app.js can read the user.
      localStorage.setItem('cc_pending_user', JSON.stringify({
        id:               user.uid,
        name:             user.name,
        role:             user.role,
        email:            user.email,
        avatar:           user.avatar,
        title:            user.title,
        enrolledCourses:  user.enrolledCourses  || [],
        savedOffline:     user.savedOffline     || [],
        completedQuizzes: user.completedQuizzes || [],
        certificates:     user.certificates     || []
      }));
      return; // data.js + app.js will handle the rest on next load
    }

    // DB already has real data — just patch currentUser and roles
    db.currentUser = {
      id:               user.uid,
      name:             user.name,
      role:             user.role,
      email:            user.email,
      avatar:           user.avatar,
      title:            user.title,
      enrolledCourses:  user.enrolledCourses  || [],
      savedOffline:     user.savedOffline     || [],
      completedQuizzes: user.completedQuizzes || [],
      certificates:     user.certificates     || []
    };

    if (db.roles && db.roles[user.role]) {
      db.roles[user.role].name   = user.name;
      db.roles[user.role].title  = user.title;
      db.roles[user.role].avatar = user.avatar;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) { console.warn('DB sync failed:', e); }
}



/* ─────────────────────────────────────────────────────────────────────────
   OTP MANAGER
   ───────────────────────────────────────────────────────────────────────── */
let currentOtp    = null;
let otpExpiry     = 0;
let otpCountdown  = null;
let resendCountdown = null;

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function startOtpTimer(seconds = 120) {
  clearInterval(otpCountdown);
  let remaining = seconds;
  const timerEl = document.getElementById('otp-timer');

  function tick() {
    if (timerEl) timerEl.textContent = remaining;
    if (remaining <= 0) {
      clearInterval(otpCountdown);
      if (timerEl) timerEl.textContent = '0';
      // OTP expired
      setOtpError('OTP has expired. Please click Resend OTP.');
      currentOtp = null;
    }
    remaining--;
  }

  tick();
  otpCountdown = setInterval(tick, 1000);
}

function startResendCooldown(seconds = 30) {
  clearInterval(resendCountdown);
  const btn       = document.getElementById('resend-otp-btn');
  const timerSpan = document.getElementById('resend-timer');
  let remaining   = seconds;

  btn.disabled = true;

  function tick() {
    timerSpan.textContent = `(${remaining}s)`;
    if (remaining <= 0) {
      clearInterval(resendCountdown);
      btn.disabled = false;
      timerSpan.textContent = '';
    }
    remaining--;
  }

  tick();
  resendCountdown = setInterval(tick, 1000);
}

function issueOtp() {
  currentOtp = generateOtp();
  otpExpiry  = Date.now() + 120_000;
  document.getElementById('otp-reveal-code').textContent = currentOtp;
  startOtpTimer(120);
  startResendCooldown(30);
  // Clear boxes
  otpBoxes.forEach(b => { b.value = ''; b.classList.remove('filled', 'error-box'); });
  otpBoxes[0].focus();
}

/* ─────────────────────────────────────────────────────────────────────────
   PROGRESS BAR
   ───────────────────────────────────────────────────────────────────────── */
function setProgress(step) {
  // step: 1 | 2 | 3
  const steps = [1, 2, 3];
  steps.forEach(n => {
    const el = document.getElementById(`prog-${n}`);
    el.classList.remove('active', 'done');
    if (n < step)  el.classList.add('done');
    if (n === step) el.classList.add('active');
  });
  [1, 2].forEach(n => {
    const line = document.getElementById(`line-${n}`);
    line.classList.toggle('filled', n < step);
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   STEP NAVIGATION
   ───────────────────────────────────────────────────────────────────────── */
function goToStep(id) {
  document.querySelectorAll('.login-step').forEach(s => {
    s.classList.remove('active-step');
    s.style.display = 'none';
  });
  const target = document.getElementById(id);
  target.style.display = 'block';
  target.classList.add('active-step', 'entering');
  setTimeout(() => target.classList.remove('entering'), 350);
}

/* ─────────────────────────────────────────────────────────────────────────
   DOM REFERENCES
   ───────────────────────────────────────────────────────────────────────── */
// Step 1 — Email
const emailInput    = document.getElementById('email-input');
const emailError    = document.getElementById('email-error');
const emailStatus   = document.getElementById('email-status');
const btnEmailNext  = document.getElementById('btn-email-next');

// Step 2 — Password
const pwInput       = document.getElementById('pw-input');
const pwError       = document.getElementById('pw-error');
const togglePw      = document.getElementById('toggle-pw');
const strengthBar   = document.getElementById('strength-bar');
const strengthLabel = document.getElementById('strength-label');
const rememberMe    = document.getElementById('remember-me');
const btnPwNext     = document.getElementById('btn-pw-next');
const chipAvatar    = document.getElementById('chip-avatar');
const chipName      = document.getElementById('chip-name');
const chipEmail     = document.getElementById('chip-email');

// Step 3 — OTP
const otpBoxes      = Array.from(document.querySelectorAll('.otp-box'));
const otpError      = document.getElementById('otp-error');
const otpEmailTarget = document.getElementById('otp-email-target');
const btnVerifyOtp  = document.getElementById('btn-verify-otp');
const resendOtpBtn  = document.getElementById('resend-otp-btn');

// Back buttons
const backEmail     = document.getElementById('back-email');
const backPassword  = document.getElementById('back-password');

// Quick pills
const quickPills    = document.querySelectorAll('.quick-pill');

// Forgot password
const forgotPwBtn   = document.getElementById('forgot-pw-btn');

// Success overlay
const successOverlay = document.getElementById('success-overlay');
const successText    = document.getElementById('success-text');

/* ─────────────────────────────────────────────────────────────────────────
   STATE
   ───────────────────────────────────────────────────────────────────────── */
let state = {
  email:       '',
  password:    '',
  user:        null,   // resolved user object
  isNew:       false,  // true if email not previously registered
  remember:    false
};

/* ─────────────────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────────────────── */
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function setError(el, msg) {
  el.innerHTML = msg
    ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> ${msg}`
    : '';
}
function clearErrors() {
  [emailError, pwError, otpError].forEach(el => setError(el, ''));
  [emailInput, pwInput].forEach(el => el.classList.remove('err', 'ok'));
  otpBoxes.forEach(b => b.classList.remove('error-box'));
}

function setOtpError(msg) { setError(otpError, msg); }

function setLoading(btn, on) {
  btn.classList.toggle('loading', on);
  btn.disabled = on;
}

function avatarForEmail(email) {
  const known = KNOWN_USERS[email.toLowerCase()];
  if (known) return known.avatar;
  const reg = loadRegisteredUsers()[email.toLowerCase()];
  if (reg) return reg.avatar;
  const name = email.split('@')[0];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=80`;
}

function nameForEmail(email) {
  const known = KNOWN_USERS[email.toLowerCase()];
  if (known) return known.name;
  const reg = loadRegisteredUsers()[email.toLowerCase()];
  if (reg) return reg.name;
  return email.split('@')[0]
    .replace(/[.\-_]/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/* ─────────────────────────────────────────────────────────────────────────
   PASSWORD STRENGTH
   ───────────────────────────────────────────────────────────────────────── */
function calcStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 6)  score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}

function renderStrength(pw) {
  const score = calcStrength(pw);
  const pct   = pw ? (score / 5) * 100 : 0;
  const colors = ['', '#f43f5e', '#f97316', '#f59e0b', '#22c55e', '#10b981'];
  const labels = ['', 'Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  strengthBar.style.width    = pct + '%';
  strengthBar.style.background = colors[score] || 'transparent';
  strengthLabel.textContent  = pw ? labels[score] : '';
  strengthLabel.style.color  = colors[score] || 'transparent';
}

/* ─────────────────────────────────────────────────────────────────────────
   SUCCESS & REDIRECT
   ───────────────────────────────────────────────────────────────────────── */
function triggerSuccess(user) {
  const firstName = user.name.split(' ')[0];
  successText.textContent = `Welcome${state.isNew ? '!' : ' back,'} ${firstName} ✨`;
  successOverlay.classList.add('active');
  successOverlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => window.location.replace('/'), 1700);
}

/* ─────────────────────────────────────────────────────────────────────────
   QUICK PILLS (Step 1)
   ───────────────────────────────────────────────────────────────────────── */
quickPills.forEach(pill => {
  pill.addEventListener('click', () => {
    const email = pill.getAttribute('data-email');
    emailInput.value = email;
    emailInput.classList.add('ok');
    emailStatus.textContent = '✓';
    emailStatus.classList.add('show');
    clearErrors();
    setError(emailError, '');
  });
});

/* ─────────────────────────────────────────────────────────────────────────
   STEP 1 — EMAIL
   ───────────────────────────────────────────────────────────────────────── */
emailInput.addEventListener('input', () => {
  clearErrors();
  const val = emailInput.value.trim();
  if (isValidEmail(val)) {
    emailInput.classList.add('ok');
    emailStatus.textContent = '✓';
    emailStatus.classList.add('show');
  } else {
    emailInput.classList.remove('ok');
    emailStatus.classList.remove('show');
  }
});

btnEmailNext.addEventListener('click', () => {
  clearErrors();
  const email = emailInput.value.trim().toLowerCase();

  if (!email) {
    setError(emailError, 'Email address is required.');
    emailInput.classList.add('err');
    emailInput.focus();
    return;
  }
  if (!isValidEmail(email)) {
    setError(emailError, 'Enter a valid email address (e.g. you@example.com).');
    emailInput.classList.add('err');
    emailInput.focus();
    return;
  }

  setLoading(btnEmailNext, true);

  // Simulate slight network delay
  setTimeout(() => {
    state.email = email;
    const { type, user } = findUser(email);
    state.isNew = (type === 'new');

    // Populate user chip in password step
    chipAvatar.src = avatarForEmail(email);
    chipName.textContent  = nameForEmail(email);
    chipEmail.textContent = email;

    setLoading(btnEmailNext, false);
    setProgress(2);
    goToStep('step-password');
    pwInput.focus();
  }, 400);
});

emailInput.addEventListener('keydown', e => { if (e.key === 'Enter') btnEmailNext.click(); });

/* ─────────────────────────────────────────────────────────────────────────
   STEP 2 — PASSWORD
   ───────────────────────────────────────────────────────────────────────── */
pwInput.addEventListener('input', () => {
  setError(pwError, '');
  pwInput.classList.remove('err');
  renderStrength(pwInput.value);
});

// Toggle password visibility
togglePw.addEventListener('click', () => {
  const isText = pwInput.type === 'text';
  pwInput.type = isText ? 'password' : 'text';
  togglePw.querySelector('.eye-show').style.display = isText ? 'block' : 'none';
  togglePw.querySelector('.eye-hide').style.display = isText ? 'none'  : 'block';
});

btnPwNext.addEventListener('click', () => {
  clearErrors();
  const pw = pwInput.value.trim();

  if (!pw) {
    setError(pwError, 'Password is required.');
    pwInput.classList.add('err');
    pwInput.focus();
    return;
  }

  if (pw.length < 6) {
    setError(pwError, 'Password must be at least 6 characters.');
    pwInput.classList.add('err');
    pwInput.focus();
    return;
  }

  const { type, user } = findUser(state.email);

  // Validate password for known/registered accounts
  if (type === 'known' && pw !== user.password) {
    setError(pwError, 'Incorrect password for this account. Try "demo1234".');
    pwInput.classList.add('err');
    pwInput.focus();
    return;
  }

  if (type === 'registered' && pw !== user.password) {
    setError(pwError, 'Incorrect password. Please try again.');
    pwInput.classList.add('err');
    pwInput.focus();
    return;
  }

  // For new accounts — build and save the profile now (password accepted as-is)
  if (type === 'new') {
    state.user   = buildGuestProfile(state.email, pw);
    state.isNew  = true;
  } else {
    state.user = user;
    state.isNew = false;
  }

  state.password = pw;
  state.remember = rememberMe.checked;

  setLoading(btnPwNext, true);

  setTimeout(() => {
    setLoading(btnPwNext, false);
    // Move to OTP
    otpEmailTarget.textContent = state.email;
    issueOtp();
    setProgress(3);
    goToStep('step-otp');
  }, 500);
});

pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') btnPwNext.click(); });

/* ─────────────────────────────────────────────────────────────────────────
   STEP 3 — OTP INPUT LOGIC
   ───────────────────────────────────────────────────────────────────────── */
otpBoxes.forEach((box, idx) => {
  box.addEventListener('input', e => {
    // Only allow digits
    box.value = box.value.replace(/\D/g, '');
    if (box.value) {
      box.classList.add('filled');
      box.classList.remove('error-box');
      // Move to next
      const next = idx < 5 ? otpBoxes[idx + 1] : null;
      if (next && idx < 5) next.focus();
    } else {
      box.classList.remove('filled');
    }
    setOtpError('');
  });

  box.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      if (!box.value && idx > 0) {
        otpBoxes[idx - 1].value = '';
        otpBoxes[idx - 1].classList.remove('filled');
        otpBoxes[idx - 1].focus();
      }
    }
    if (e.key === 'ArrowLeft'  && idx > 0) otpBoxes[idx - 1].focus();
    if (e.key === 'ArrowRight' && idx < 5) otpBoxes[idx + 1].focus();
    if (e.key === 'Enter') btnVerifyOtp.click();
  });

  // Handle paste into first box
  box.addEventListener('paste', e => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
    text.split('').forEach((ch, i) => {
      if (otpBoxes[i]) {
        otpBoxes[i].value = ch;
        otpBoxes[i].classList.add('filled');
      }
    });
    const nextEmpty = otpBoxes.find(b => !b.value);
    if (nextEmpty) nextEmpty.focus();
    else otpBoxes[5].focus();
  });
});

btnVerifyOtp.addEventListener('click', () => {
  clearErrors();
  const entered = otpBoxes.map(b => b.value).join('');

  if (entered.length < 6) {
    setOtpError('Please enter all 6 digits.');
    otpBoxes.forEach(b => { if (!b.value) b.classList.add('error-box'); });
    return;
  }

  if (!currentOtp) {
    setOtpError('OTP has expired. Please click Resend OTP below.');
    return;
  }

  if (entered !== currentOtp) {
    setOtpError('Incorrect OTP. Please check the code shown above.');
    otpBoxes.forEach(b => b.classList.add('error-box'));
    // Shake effect
    setTimeout(() => otpBoxes.forEach(b => b.classList.remove('error-box')), 400);
    return;
  }

  // OTP correct ✓
  setLoading(btnVerifyOtp, true);
  clearInterval(otpCountdown);
  clearInterval(resendCountdown);

  setTimeout(() => {
    // Save new account to localStorage registry
    if (state.isNew) {
      saveRegisteredUser(state.user);
    }
    saveSession(state.user, state.remember);
    syncToPortalDB(state.user);
    triggerSuccess(state.user);
  }, 600);
});

/* ─────────────────────────────────────────────────────────────────────────
   RESEND OTP
   ───────────────────────────────────────────────────────────────────────── */
resendOtpBtn.addEventListener('click', () => {
  issueOtp();
  showToast('New OTP generated and shown above!', '✉️');
});

/* ─────────────────────────────────────────────────────────────────────────
   BACK BUTTONS
   ───────────────────────────────────────────────────────────────────────── */
backEmail.addEventListener('click', () => {
  setProgress(1);
  goToStep('step-email');
  clearErrors();
  pwInput.value = '';
  renderStrength('');
});

backPassword.addEventListener('click', () => {
  clearInterval(otpCountdown);
  clearInterval(resendCountdown);
  currentOtp = null;
  setProgress(2);
  goToStep('step-password');
  clearErrors();
});

/* ─────────────────────────────────────────────────────────────────────────
   FORGOT PASSWORD
   ───────────────────────────────────────────────────────────────────────── */
forgotPwBtn.addEventListener('click', () => {
  const msg = state.email && KNOWN_USERS[state.email]
    ? `Demo password for ${state.email} is: demo1234`
    : 'For new accounts, enter any password (min 6 characters) — it becomes your password.';
  showToast(msg, '🔑');
});

/* ─────────────────────────────────────────────────────────────────────────
   MINI TOAST HELPER
   ───────────────────────────────────────────────────────────────────────── */
function showToast(msg, icon = 'ℹ️') {
  const el = document.createElement('div');
  el.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:rgba(13,18,45,0.96);backdrop-filter:blur(14px);
    border:1px solid rgba(99,102,241,0.3);border-radius:14px;
    padding:13px 20px;color:#f1f5f9;font-size:0.84rem;
    font-family:'Plus Jakarta Sans',sans-serif;z-index:9999;
    box-shadow:0 8px 32px rgba(0,0,0,0.45);
    display:flex;align-items:center;gap:10px;
    animation:slideUp .3s cubic-bezier(.16,1,.3,1) both;
    max-width:340px;text-align:left;
  `;
  el.innerHTML = `<span style="font-size:1.1rem">${icon}</span><span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.3s';
    setTimeout(() => el.remove(), 320);
  }, 4000);
}
