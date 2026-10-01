// Connect Capacity Local Storage & Mock Data Repository
const STORAGE_KEY = 'connect_capacity_portal_db_v1';

const INITIAL_DATA = {
  currentUser: {
    id: 'user-trainee-1',
    name: 'Alex Chen',
    role: 'trainee', // 'trainee' | 'trainer' | 'admin'
    email: 'alex.chen@learn.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Senior Associate Engineer',
    enrolledCourses: ['c-1', 'c-2', 'c-3'],
    savedOffline: ['lib-1', 'lib-3'],
    completedQuizzes: [
      { quizId: 'q-2', score: 90, total: 100, date: '2026-09-25', passed: true }
    ],
    certificates: [
      {
        id: 'CERT-8849-SEC',
        quizTitle: 'Modern Web Security & OWASP Top 10',
        issuedDate: 'September 25, 2026',
        score: '90%',
        verificationHash: '0x8f9c2e4b1a7d'
      }
    ]
  },
  roles: {
    trainee: {
      name: 'Alex Chen',
      role: 'trainee',
      title: 'Aspiring Cloud & AI Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Active Trainee'
    },
    trainer: {
      name: 'Dr. Sarah Jenkins',
      role: 'trainer',
      title: 'Principal AI & Cloud Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      badge: 'Lead Trainer ⭐ 4.98'
    },
    admin: {
      name: 'Marcus Vance',
      role: 'admin',
      title: 'Platform Chief Operations',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      badge: 'System SuperAdmin'
    }
  },
  trainers: [
    {
      id: 'tr-1',
      name: 'Dr. Sarah Jenkins',
      title: 'Principal AI & Deep Learning Architect',
      rating: 4.98,
      reviewCount: 342,
      hourlyRate: 75,
      experienceYears: 11,
      studentsCount: 2340,
      skills: ['Machine Learning', 'Python', 'PyTorch', 'LLMs', 'Computer Vision', 'MLOps', 'Data Science'],
      topics: ['AI & Neural Networks Foundations', 'Deep Learning Specialization', 'Generative AI Architecture'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      bio: 'Former Google AI researcher specializing in large neural models, high-performance training, and real-time inference systems.',
      verified: true,
      availability: 'Immediate (Evenings & Weekends)'
    },
    {
      id: 'tr-2',
      name: 'Elena Rostova',
      title: 'Lead DevSecOps & Penetration Testing Specialist',
      rating: 4.95,
      reviewCount: 289,
      hourlyRate: 65,
      experienceYears: 8,
      studentsCount: 1420,
      skills: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'SIEM', 'Zero Trust', 'Network Defense', 'Linux Security'],
      topics: ['Modern Web Security & OWASP Top 10', 'Zero Trust Architecture', 'Defensive Systems'],
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      bio: 'Certified ethical hacker (OSCP, CISSP) with over 8 years hardening Fortune 500 infrastructure against nation-state cyber threats.',
      verified: true,
      availability: 'Available (Flexible hours)'
    },
    {
      id: 'tr-3',
      name: 'Liam O’Connor',
      title: 'Staff Kubernetes & Cloud Infrastructure Engineer',
      rating: 4.88,
      reviewCount: 198,
      hourlyRate: 70,
      experienceYears: 9,
      studentsCount: 1890,
      skills: ['Kubernetes', 'Cloud DevOps', 'Docker', 'Terraform', 'AWS', 'CI/CD Pipelines', 'Prometheus'],
      topics: ['Cloud Architecture & Kubernetes Essentials', 'Automated DevOps CI/CD', 'Multi-Cloud Mesh'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      bio: 'Cloud Native Computing Foundation ambassador. Built resilient infrastructure running 100,000+ pods in production environments.',
      verified: true,
      availability: 'Limited Slots (Booking fast)'
    },
    {
      id: 'tr-4',
      name: 'David Kim',
      title: 'Full Stack Tech Lead & Distributed Systems Specialist',
      rating: 4.91,
      reviewCount: 245,
      hourlyRate: 55,
      experienceYears: 7,
      studentsCount: 1650,
      skills: ['Full Stack Web', 'React', 'Node.js', 'TypeScript', 'GraphQL', 'Next.js', 'PostgreSQL', 'Microservices'],
      topics: ['Modern Full Stack Web Architecture', 'Distributed API Design', 'Next.js 15 & SSR'],
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
      bio: 'Ex-Stripe engineer focused on high-throughput web architecture, developer tooling, and modern frontend design frameworks.',
      verified: true,
      availability: 'Immediate'
    },
    {
      id: 'tr-5',
      name: 'Maya Patel',
      title: 'Principal UI/UX Architect & Design Systems Lead',
      rating: 4.93,
      reviewCount: 184,
      hourlyRate: 60,
      experienceYears: 7,
      studentsCount: 1210,
      skills: ['UI/UX Design', 'Design Systems', 'Figma', 'CSS Animations', 'Accessibility (a11y)', 'Component Libraries'],
      topics: ['UI/UX Micro-Interactions & Responsive Layouts', 'Design Systems at Scale', 'Design to Code'],
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      bio: 'Award-winning design architect recognized for building multi-brand design systems for hyper-growth tech companies.',
      verified: true,
      availability: 'Available (Mornings)'
    }
  ],
  quizzes: [
    {
      id: 'q-1',
      title: 'Cloud Architecture & Kubernetes Essentials',
      course: 'Cloud & Infrastructure Engineering',
      author: 'Liam O’Connor',
      timeLimitMinutes: 4,
      deadline: '2026-10-02T23:59:00',
      passingScore: 75,
      shuffleQuestions: true,
      badgeColor: '#06b6d4',
      questions: [
        {
          id: 'q1-1',
          question: 'In Kubernetes, which component is primarily responsible for tracking node health and scheduling Pods onto available nodes?',
          options: [
            'kube-proxy',
            'kube-scheduler',
            'etcd datastore',
            'Container Network Interface (CNI)'
          ],
          correctIndex: 1,
          explanation: 'The kube-scheduler selects an optimal node for unscheduled pods based on resource constraints, affinity, and taints.'
        },
        {
          id: 'q1-2',
          question: 'What is the primary architectural purpose of a Kubernetes Deployment object compared to a bare Pod?',
          options: [
            'To provide persistent storage volumes for databases',
            'To automate declarative rolling updates, rollbacks, and replica scaling',
            'To expose HTTP routes via an external cloud load balancer',
            'To compile container source code directly in the cluster'
          ],
          correctIndex: 1,
          explanation: 'Deployments provide declarative updates for Pods and ReplicaSets, enabling zero-downtime updates and easy rollback.'
        },
        {
          id: 'q1-3',
          question: 'Which Kubernetes service type provides direct access from an external cloud IP address with layer 4 load balancing?',
          options: [
            'ClusterIP',
            'NodePort',
            'LoadBalancer',
            'ExternalName'
          ],
          correctIndex: 2,
          explanation: 'Service type LoadBalancer integrates with cloud providers to provision an external IP that routes to backend pods.'
        },
        {
          id: 'q1-4',
          question: 'What happens when a container exceeds its defined memory "limit" in a Kubernetes Pod spec?',
          options: [
            'The container is throttled to 50% CPU',
            'The container is killed with an OOM (Out Of Memory) event and restarted per policy',
            'The Pod is migrated to another node with more RAM automatically',
            'Kubernetes borrows memory from adjacent running nodes'
          ],
          correctIndex: 1,
          explanation: 'When a container surpasses its memory limit, the Linux kernel terminates the process via OOMKiller and Kubernetes restarts it based on restartPolicy.'
        }
      ]
    },
    {
      id: 'q-2',
      title: 'Modern Web Security & OWASP Top 10',
      course: 'Cybersecurity Specialization',
      author: 'Elena Rostova',
      timeLimitMinutes: 3,
      deadline: '2026-10-05T18:00:00',
      passingScore: 80,
      shuffleQuestions: true,
      badgeColor: '#ef4444',
      questions: [
        {
          id: 'q2-1',
          question: 'Which HTTP response header is most effective at preventing Cross-Site Scripting (XSS) by restricting where scripts can be loaded from?',
          options: [
            'Content-Security-Policy (CSP)',
            'X-Frame-Options',
            'Access-Control-Allow-Origin',
            'Strict-Transport-Security (HSTS)'
          ],
          correctIndex: 0,
          explanation: 'Content-Security-Policy restricts trusted script domains and disallows unauthorized inline script execution.'
        },
        {
          id: 'q2-2',
          question: 'To defend authentication tokens stored in cookies from client-side script theft, which cookie attribute is essential?',
          options: [
            'Secure; HttpOnly; SameSite=Strict',
            'Domain=.domain.com; Path=/',
            'Max-Age=999999; Readable=True',
            'Allow-Credentials=True'
          ],
          correctIndex: 0,
          explanation: 'The HttpOnly flag forbids JavaScript from accessing document.cookie, while Secure enforces HTTPS and SameSite reduces CSRF risks.'
        },
        {
          id: 'q2-3',
          question: 'What is the primary mitigation strategy against SQL Injection in modern web applications?',
          options: [
            'Client-side regex string replacement',
            'Parameterized queries (Prepared Statements) or modern ORMs',
            'Base64 encoding all query strings',
            'Limiting database user passwords to 8 characters'
          ],
          correctIndex: 1,
          explanation: 'Parameterized queries separate SQL code from untrusted user inputs, preventing attackers from injecting arbitrary SQL logic.'
        }
      ]
    },
    {
      id: 'q-3',
      title: 'AI & Neural Networks Foundations',
      course: 'AI & Machine Learning Engineering',
      author: 'Dr. Sarah Jenkins',
      timeLimitMinutes: 4,
      deadline: '2026-10-08T12:00:00',
      passingScore: 75,
      shuffleQuestions: true,
      badgeColor: '#8b5cf6',
      questions: [
        {
          id: 'q3-1',
          question: 'Why are non-linear activation functions (like ReLU or GELU) required in deep neural networks?',
          options: [
            'They compress neural network weights to under 8-bits',
            'Without non-linearity, multiple stacked layers collapse mathematically into a single linear transformation',
            'They convert training floating point numbers into integers',
            'They eliminate the need for backpropagation'
          ],
          correctIndex: 1,
          explanation: 'Composition of multiple linear functions is strictly linear; non-linear activation functions allow deep networks to learn complex arbitrary representations.'
        },
        {
          id: 'q3-2',
          question: 'In modern Transformer models, what mechanism computes token-to-token contextual relevance across a sequence?',
          options: [
            'Convolutional Kernels',
            'Scaled Dot-Product Multi-Head Self-Attention',
            'Recurrent Hidden States (RNN)',
            'Random Forest Voting'
          ],
          correctIndex: 1,
          explanation: 'Multi-Head Self-Attention allows each token to attend to all other tokens simultaneously via Query, Key, and Value dot-products.'
        },
        {
          id: 'q3-3',
          question: 'What technique uses a validation loss curve to stop training before the model overfits to the training data?',
          options: [
            'Early Stopping',
            'Dropout Layering',
            'Batch Normalization',
            'Stochastic Gradient Ascent'
          ],
          correctIndex: 0,
          explanation: 'Early stopping monitors validation loss and halts training when generalization starts degrading, preserving the best checkpoint.'
        }
      ]
    }
  ],
  library: [
    {
      id: 'lib-1',
      title: 'Mastering Kubernetes Pod Scheduling & Horizontal Autoscaling',
      category: 'video',
      author: 'Liam O’Connor',
      duration: '24m 10s',
      fileSize: '42 MB (360p Data Saver) / 168 MB (HD)',
      quality: '1080p / 720p / 360p',
      rating: 4.9,
      tags: ['DevOps', 'Kubernetes', 'Cloud'],
      thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
      summary: 'Comprehensive hands-on breakdown of custom metrics with Prometheus Adapter, HPA target tracking, and node pod eviction prevention.',
      transcript: 'Welcome back engineers. In this deep dive, we configure the Horizontal Pod Autoscaler alongside cluster overprovisioning to ensure zero-downtime traffic spikes...',
      lowDataSizeKb: 42000,
      offlineSaved: true
    },
    {
      id: 'lib-2',
      title: 'Defending Against Zero-Day Exploits: Modern Security Playbook',
      category: 'slides',
      author: 'Elena Rostova',
      slideCount: 8,
      fileSize: '6.4 MB',
      rating: 4.95,
      tags: ['Security', 'DevSecOps', 'Architecture'],
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      summary: 'Interactive 8-slide executive and technical deck detailing Threat Modeling, Zero Trust micro-segmentation, and automated incident containment.',
      slides: [
        { title: 'Slide 1: The Modern Threat Landscape', bullets: ['Perimeter security is obsolete', '82% of breaches involve credential abuse', 'Zero Trust as a fundamental architecture'] },
        { title: 'Slide 2: Principle of Least Privilege (PoLP)', bullets: ['Just-In-Time access controls', 'Ephemeral service credentials', 'Granular IAM policies per service identity'] },
        { title: 'Slide 3: Network Microsegmentation', bullets: ['mTLS between all internal microservices', 'Default-deny network policies', 'Real-time telemetry and anomaly detection'] },
        { title: 'Slide 4: Supply Chain & Dependency Hardening', bullets: ['Software Bill of Materials (SBOM)', 'Cryptographic artifact signing with Cosign', 'Automated CVE scanning in CI/CD'] },
        { title: 'Slide 5: Automated Incident Containment', bullets: ['Automated isolation of compromised containers', 'Forensic memory dumping', 'Immutable audit logs sent to cold storage'] },
        { title: 'Slide 6: Conclusion & Checklist', bullets: ['Audit daily', 'Simulate tabletop exercises quarterly', 'Verify backup immutability'] }
      ],
      offlineSaved: false
    },
    {
      id: 'lib-3',
      title: 'Production REST & GraphQL Microservices Architecture Blueprint',
      category: 'guide',
      author: 'David Kim',
      readTime: '12 min read',
      fileSize: '1.2 MB',
      rating: 4.92,
      tags: ['Full Stack', 'Node.js', 'System Design'],
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      summary: 'Comprehensive production study guide covering distributed rate limiting, idempotent mutations, GraphQL schema federation, and Redis caching layers.',
      guideMarkdown: `# Production API Design Guide
## 1. Idempotency Keys
Always require an \`Idempotency-Key\` header on non-idempotent operations (POST /payments, /transfers). Store processed keys in Redis with a 24-hour TTL to prevent double execution.

## 2. Distributed Rate Limiting
Implement token bucket or sliding window algorithms using Redis Lua scripts:
\`\`\`javascript
const allowed = await redis.eval(slidingWindowLua, 1, userIP, windowSize, maxRequests);
\`\`\`

## 3. Schema Federation
Decouple services into bounded domains while providing a unified GraphQL schema gateway for clients.`,
      offlineSaved: true
    },
    {
      id: 'lib-4',
      title: 'Deep Dive: Transformer Attention Mechanisms in Large Language Models',
      category: 'video',
      author: 'Dr. Sarah Jenkins',
      duration: '32m 45s',
      fileSize: '54 MB (Data Saver) / 210 MB (HD)',
      quality: '1080p / 720p / 360p',
      rating: 4.98,
      tags: ['AI', 'PyTorch', 'LLMs'],
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      summary: 'Mathematical breakdown and PyTorch implementation of Multi-Query Attention (MQA) and FlashAttention optimizations.',
      transcript: 'In this lecture, we dismantle the quadratic computational bottleneck of classic self-attention and review how FlashAttention leverages SRAM caching...',
      lowDataSizeKb: 54000,
      offlineSaved: false
    },
    {
      id: 'lib-5',
      title: 'Design Systems & High-Performance Micro-Interactions Guide',
      category: 'guide',
      author: 'Maya Patel',
      readTime: '8 min read',
      fileSize: '850 KB',
      rating: 4.89,
      tags: ['Design', 'CSS', 'UX'],
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      summary: 'Tokenized design variables, spring physics in CSS transitions, accessible focus rings, and dark-mode color balance formulas.',
      guideMarkdown: `# High Performance Micro-Interactions
- Use \`transform\` and \`opacity\` exclusively for 60fps animations.
- Implement \`will-change\` judiciously on animated elements.
- Honor \`prefers-reduced-motion\` for accessibility compliance.`,
      offlineSaved: false
    }
  ],
  news: [
    {
      id: 'news-1',
      title: '🚀 Connect Capacity 2.0 Released: Offline PWA & Smart Matchmaker Live!',
      category: 'Platform Update',
      badge: 'Major Release',
      author: 'Platform Admin',
      date: 'Today, 09:30 AM',
      pinned: true,
      content: 'We are thrilled to launch Connect Capacity 2.0 with instant low-data streaming, offline study guides, and an AI-driven Trainer Matchmaker algorithm!'
    },
    {
      id: 'news-2',
      title: '⚡ Bandwidth Optimization: Save up to 70% data with Data Saver',
      category: 'Efficiency',
      badge: 'Feature Tip',
      author: 'Engineering Ops',
      date: 'Yesterday, 04:15 PM',
      pinned: true,
      content: 'Trainees on mobile networks can toggle Data Saver mode in the top navigation bar to automatically transcode video lectures to 360p and prioritize compressed transcripts.'
    },
    {
      id: 'news-3',
      title: '🏆 Q3 Certified Cloud Practitioners Honored',
      category: 'Community',
      badge: 'Milestone',
      author: 'Dr. Sarah Jenkins',
      date: 'Sept 28, 2026',
      pinned: false,
      content: 'Congratulations to our 140+ trainees who passed the Cloud Architecture & Kubernetes Essentials certification quiz this week!'
    },
    {
      id: 'news-4',
      title: '🔧 Scheduled Platform Maintenance Notice: Oct 12',
      category: 'Maintenance',
      badge: 'Notice',
      author: 'Admin Ops',
      date: 'Sept 26, 2026',
      pinned: false,
      content: 'Routine security patching and database indexing will occur on October 12 between 02:00 UTC and 03:00 UTC. Offline reading will remain fully accessible.'
    }
  ],
  pendingUsers: [
    {
      id: 'pen-1',
      name: 'James Wilson',
      email: 'james.wilson@cloudtech.co',
      requestedRole: 'trainer',
      specialty: 'Blockchain & Distributed Ledgers',
      appliedDate: '2 hours ago',
      experience: '8 Years',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'pen-2',
      name: 'Amina Yusuf',
      email: 'amina.yusuf@enterprise.org',
      requestedRole: 'trainee',
      specialty: 'Cloud Security Fast-Track',
      appliedDate: 'Yesterday',
      experience: 'Associate (2 Years)',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'pen-3',
      name: 'Kenji Sato',
      email: 'kenji.sato@iot-labs.jp',
      requestedRole: 'trainer',
      specialty: 'Embedded Systems & Edge AI',
      appliedDate: '3 days ago',
      experience: '12 Years',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ],
  matchRequests: [
    {
      id: 'req-101',
      traineeName: 'Alex Chen',
      trainerName: 'Dr. Sarah Jenkins',
      topic: 'AI & Neural Networks Foundations',
      status: 'Accepted',
      date: 'Today',
      note: 'Looking for 1-on-1 coaching for PyTorch distributed training.'
    }
  ],
  systemMetrics: {
    totalTrainees: 1842,
    activeTrainers: 64,
    quizzesCompleted: 8920,
    averagePassRate: '86.4%',
    bandwidthSavedGb: 1420,
    dailyActivity: [
      { day: 'Mon', quizzes: 340, activeUsers: 820 },
      { day: 'Tue', quizzes: 410, activeUsers: 950 },
      { day: 'Wed', quizzes: 480, activeUsers: 1040 },
      { day: 'Thu', quizzes: 530, activeUsers: 1120 },
      { day: 'Fri', quizzes: 620, activeUsers: 1260 },
      { day: 'Sat', quizzes: 380, activeUsers: 740 },
      { day: 'Sun', quizzes: 450, activeUsers: 890 }
    ]
  }
};

class DataStore {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage load error, using default data:', e);
    }
    this.saveData(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveData(data = this.data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }

  switchRole(roleName) {
    if (this.data.roles[roleName]) {
      const roleProfile = this.data.roles[roleName];
      this.data.currentUser.role = roleName;
      this.data.currentUser.name = roleProfile.name;
      this.data.currentUser.avatar = roleProfile.avatar;
      this.data.currentUser.title = roleProfile.title;
      this.saveData();
    }
  }

  toggleOfflineItem(itemId) {
    const item = this.data.library.find(i => i.id === itemId);
    if (!item) return false;
    item.offlineSaved = !item.offlineSaved;

    const savedIdx = this.data.currentUser.savedOffline.indexOf(itemId);
    if (item.offlineSaved && savedIdx === -1) {
      this.data.currentUser.savedOffline.push(itemId);
    } else if (!item.offlineSaved && savedIdx !== -1) {
      this.data.currentUser.savedOffline.splice(savedIdx, 1);
    }

    this.saveData();
    return item.offlineSaved;
  }

  addQuiz(quiz) {
    this.data.quizzes.unshift(quiz);
    this.saveData();
  }

  addLibraryItem(item) {
    this.data.library.unshift(item);
    this.saveData();
  }

  addNews(newsItem) {
    this.data.news.unshift(newsItem);
    this.saveData();
  }

  approveUser(userId) {
    const idx = this.data.pendingUsers.findIndex(u => u.id === userId);
    if (idx !== -1) {
      const user = this.data.pendingUsers[idx];
      user.status = 'approved';
      if (user.requestedRole === 'trainer') {
        this.data.trainers.push({
          id: 'tr-' + Date.now(),
          name: user.name,
          title: user.specialty,
          rating: 5.0,
          reviewCount: 1,
          hourlyRate: 60,
          experienceYears: 5,
          studentsCount: 0,
          skills: [user.specialty, 'Technical Coaching'],
          topics: [user.specialty],
          avatar: user.avatar,
          bio: `Newly approved verified trainer specializing in ${user.specialty}.`,
          verified: true,
          availability: 'Open for booking'
        });
        this.data.systemMetrics.activeTrainers++;
      } else {
        this.data.systemMetrics.totalTrainees++;
      }
      this.data.pendingUsers.splice(idx, 1);
      this.saveData();
      return user;
    }
    return null;
  }

  rejectUser(userId) {
    const idx = this.data.pendingUsers.findIndex(u => u.id === userId);
    if (idx !== -1) {
      const user = this.data.pendingUsers.splice(idx, 1)[0];
      this.saveData();
      return user;
    }
    return null;
  }

  recordQuizSubmission(quizId, score, passed) {
    const quiz = this.data.quizzes.find(q => q.id === quizId);
    if (!quiz) return null;

    const record = {
      quizId,
      score,
      total: 100,
      date: new Date().toISOString().split('T')[0],
      passed
    };
    this.data.currentUser.completedQuizzes.unshift(record);
    this.data.systemMetrics.quizzesCompleted++;

    let cert = null;
    if (passed && score >= 80) {
      cert = {
        id: `CERT-${Math.floor(1000 + Math.random() * 9000)}-${quiz.course.substring(0, 3).toUpperCase()}`,
        quizTitle: quiz.title,
        issuedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        score: `${score}%`,
        verificationHash: '0x' + Math.random().toString(16).substring(2, 14)
      };
      this.data.currentUser.certificates.unshift(cert);
    }
    this.saveData();
    return { record, cert };
  }

  submitMatchRequest(trainerId, topic, note) {
    const trainer = this.data.trainers.find(t => t.id === trainerId);
    if (!trainer) return null;

    const request = {
      id: 'req-' + Date.now(),
      traineeName: this.data.currentUser.name,
      trainerName: trainer.name,
      trainerAvatar: trainer.avatar,
      topic,
      status: 'Pending Match',
      date: 'Just now',
      note: note || 'Interested in 1-on-1 mentorship and tailored skill review.'
    };
    this.data.matchRequests.unshift(request);
    this.saveData();
    return request;
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveData();
  }
}

export const db = new DataStore();
