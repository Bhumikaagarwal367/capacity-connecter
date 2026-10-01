(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`nextrain_portal_db_v1`,t={currentUser:{id:`user-trainee-1`,name:`Alex Chen`,role:`trainee`,email:`alex.chen@learn.io`,avatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,title:`Senior Associate Engineer`,enrolledCourses:[`c-1`,`c-2`,`c-3`],savedOffline:[`lib-1`,`lib-3`],completedQuizzes:[{quizId:`q-2`,score:90,total:100,date:`2026-09-25`,passed:!0}],certificates:[{id:`CERT-8849-SEC`,quizTitle:`Modern Web Security & OWASP Top 10`,issuedDate:`September 25, 2026`,score:`90%`,verificationHash:`0x8f9c2e4b1a7d`}]},roles:{trainee:{name:`Alex Chen`,role:`trainee`,title:`Aspiring Cloud & AI Engineer`,avatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,badge:`Active Trainee`},trainer:{name:`Dr. Sarah Jenkins`,role:`trainer`,title:`Principal AI & Cloud Architect`,avatar:`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80`,badge:`Lead Trainer ⭐ 4.98`},admin:{name:`Marcus Vance`,role:`admin`,title:`Platform Chief Operations`,avatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80`,badge:`System SuperAdmin`}},trainers:[{id:`tr-1`,name:`Dr. Sarah Jenkins`,title:`Principal AI & Deep Learning Architect`,rating:4.98,reviewCount:342,hourlyRate:75,experienceYears:11,studentsCount:2340,skills:[`Machine Learning`,`Python`,`PyTorch`,`LLMs`,`Computer Vision`,`MLOps`,`Data Science`],topics:[`AI & Neural Networks Foundations`,`Deep Learning Specialization`,`Generative AI Architecture`],avatar:`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80`,bio:`Former Google AI researcher specializing in large neural models, high-performance training, and real-time inference systems.`,verified:!0,availability:`Immediate (Evenings & Weekends)`},{id:`tr-2`,name:`Elena Rostova`,title:`Lead DevSecOps & Penetration Testing Specialist`,rating:4.95,reviewCount:289,hourlyRate:65,experienceYears:8,studentsCount:1420,skills:[`Cybersecurity`,`Ethical Hacking`,`Penetration Testing`,`SIEM`,`Zero Trust`,`Network Defense`,`Linux Security`],topics:[`Modern Web Security & OWASP Top 10`,`Zero Trust Architecture`,`Defensive Systems`],avatar:`https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80`,bio:`Certified ethical hacker (OSCP, CISSP) with over 8 years hardening Fortune 500 infrastructure against nation-state cyber threats.`,verified:!0,availability:`Available (Flexible hours)`},{id:`tr-3`,name:`Liam O’Connor`,title:`Staff Kubernetes & Cloud Infrastructure Engineer`,rating:4.88,reviewCount:198,hourlyRate:70,experienceYears:9,studentsCount:1890,skills:[`Kubernetes`,`Cloud DevOps`,`Docker`,`Terraform`,`AWS`,`CI/CD Pipelines`,`Prometheus`],topics:[`Cloud Architecture & Kubernetes Essentials`,`Automated DevOps CI/CD`,`Multi-Cloud Mesh`],avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80`,bio:`Cloud Native Computing Foundation ambassador. Built resilient infrastructure running 100,000+ pods in production environments.`,verified:!0,availability:`Limited Slots (Booking fast)`},{id:`tr-4`,name:`David Kim`,title:`Full Stack Tech Lead & Distributed Systems Specialist`,rating:4.91,reviewCount:245,hourlyRate:55,experienceYears:7,studentsCount:1650,skills:[`Full Stack Web`,`React`,`Node.js`,`TypeScript`,`GraphQL`,`Next.js`,`PostgreSQL`,`Microservices`],topics:[`Modern Full Stack Web Architecture`,`Distributed API Design`,`Next.js 15 & SSR`],avatar:`https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80`,bio:`Ex-Stripe engineer focused on high-throughput web architecture, developer tooling, and modern frontend design frameworks.`,verified:!0,availability:`Immediate`},{id:`tr-5`,name:`Maya Patel`,title:`Principal UI/UX Architect & Design Systems Lead`,rating:4.93,reviewCount:184,hourlyRate:60,experienceYears:7,studentsCount:1210,skills:[`UI/UX Design`,`Design Systems`,`Figma`,`CSS Animations`,`Accessibility (a11y)`,`Component Libraries`],topics:[`UI/UX Micro-Interactions & Responsive Layouts`,`Design Systems at Scale`,`Design to Code`],avatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80`,bio:`Award-winning design architect recognized for building multi-brand design systems for hyper-growth tech companies.`,verified:!0,availability:`Available (Mornings)`}],quizzes:[{id:`q-1`,title:`Cloud Architecture & Kubernetes Essentials`,course:`Cloud & Infrastructure Engineering`,author:`Liam O’Connor`,timeLimitMinutes:4,deadline:`2026-10-02T23:59:00`,passingScore:75,shuffleQuestions:!0,badgeColor:`#06b6d4`,questions:[{id:`q1-1`,question:`In Kubernetes, which component is primarily responsible for tracking node health and scheduling Pods onto available nodes?`,options:[`kube-proxy`,`kube-scheduler`,`etcd datastore`,`Container Network Interface (CNI)`],correctIndex:1,explanation:`The kube-scheduler selects an optimal node for unscheduled pods based on resource constraints, affinity, and taints.`},{id:`q1-2`,question:`What is the primary architectural purpose of a Kubernetes Deployment object compared to a bare Pod?`,options:[`To provide persistent storage volumes for databases`,`To automate declarative rolling updates, rollbacks, and replica scaling`,`To expose HTTP routes via an external cloud load balancer`,`To compile container source code directly in the cluster`],correctIndex:1,explanation:`Deployments provide declarative updates for Pods and ReplicaSets, enabling zero-downtime updates and easy rollback.`},{id:`q1-3`,question:`Which Kubernetes service type provides direct access from an external cloud IP address with layer 4 load balancing?`,options:[`ClusterIP`,`NodePort`,`LoadBalancer`,`ExternalName`],correctIndex:2,explanation:`Service type LoadBalancer integrates with cloud providers to provision an external IP that routes to backend pods.`},{id:`q1-4`,question:`What happens when a container exceeds its defined memory "limit" in a Kubernetes Pod spec?`,options:[`The container is throttled to 50% CPU`,`The container is killed with an OOM (Out Of Memory) event and restarted per policy`,`The Pod is migrated to another node with more RAM automatically`,`Kubernetes borrows memory from adjacent running nodes`],correctIndex:1,explanation:`When a container surpasses its memory limit, the Linux kernel terminates the process via OOMKiller and Kubernetes restarts it based on restartPolicy.`}]},{id:`q-2`,title:`Modern Web Security & OWASP Top 10`,course:`Cybersecurity Specialization`,author:`Elena Rostova`,timeLimitMinutes:3,deadline:`2026-10-05T18:00:00`,passingScore:80,shuffleQuestions:!0,badgeColor:`#ef4444`,questions:[{id:`q2-1`,question:`Which HTTP response header is most effective at preventing Cross-Site Scripting (XSS) by restricting where scripts can be loaded from?`,options:[`Content-Security-Policy (CSP)`,`X-Frame-Options`,`Access-Control-Allow-Origin`,`Strict-Transport-Security (HSTS)`],correctIndex:0,explanation:`Content-Security-Policy restricts trusted script domains and disallows unauthorized inline script execution.`},{id:`q2-2`,question:`To defend authentication tokens stored in cookies from client-side script theft, which cookie attribute is essential?`,options:[`Secure; HttpOnly; SameSite=Strict`,`Domain=.domain.com; Path=/`,`Max-Age=999999; Readable=True`,`Allow-Credentials=True`],correctIndex:0,explanation:`The HttpOnly flag forbids JavaScript from accessing document.cookie, while Secure enforces HTTPS and SameSite reduces CSRF risks.`},{id:`q2-3`,question:`What is the primary mitigation strategy against SQL Injection in modern web applications?`,options:[`Client-side regex string replacement`,`Parameterized queries (Prepared Statements) or modern ORMs`,`Base64 encoding all query strings`,`Limiting database user passwords to 8 characters`],correctIndex:1,explanation:`Parameterized queries separate SQL code from untrusted user inputs, preventing attackers from injecting arbitrary SQL logic.`}]},{id:`q-3`,title:`AI & Neural Networks Foundations`,course:`AI & Machine Learning Engineering`,author:`Dr. Sarah Jenkins`,timeLimitMinutes:4,deadline:`2026-10-08T12:00:00`,passingScore:75,shuffleQuestions:!0,badgeColor:`#8b5cf6`,questions:[{id:`q3-1`,question:`Why are non-linear activation functions (like ReLU or GELU) required in deep neural networks?`,options:[`They compress neural network weights to under 8-bits`,`Without non-linearity, multiple stacked layers collapse mathematically into a single linear transformation`,`They convert training floating point numbers into integers`,`They eliminate the need for backpropagation`],correctIndex:1,explanation:`Composition of multiple linear functions is strictly linear; non-linear activation functions allow deep networks to learn complex arbitrary representations.`},{id:`q3-2`,question:`In modern Transformer models, what mechanism computes token-to-token contextual relevance across a sequence?`,options:[`Convolutional Kernels`,`Scaled Dot-Product Multi-Head Self-Attention`,`Recurrent Hidden States (RNN)`,`Random Forest Voting`],correctIndex:1,explanation:`Multi-Head Self-Attention allows each token to attend to all other tokens simultaneously via Query, Key, and Value dot-products.`},{id:`q3-3`,question:`What technique uses a validation loss curve to stop training before the model overfits to the training data?`,options:[`Early Stopping`,`Dropout Layering`,`Batch Normalization`,`Stochastic Gradient Ascent`],correctIndex:0,explanation:`Early stopping monitors validation loss and halts training when generalization starts degrading, preserving the best checkpoint.`}]}],library:[{id:`lib-1`,title:`Mastering Kubernetes Pod Scheduling & Horizontal Autoscaling`,category:`video`,author:`Liam O’Connor`,duration:`24m 10s`,fileSize:`42 MB (360p Data Saver) / 168 MB (HD)`,quality:`1080p / 720p / 360p`,rating:4.9,tags:[`DevOps`,`Kubernetes`,`Cloud`],thumbnail:`https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80`,summary:`Comprehensive hands-on breakdown of custom metrics with Prometheus Adapter, HPA target tracking, and node pod eviction prevention.`,transcript:`Welcome back engineers. In this deep dive, we configure the Horizontal Pod Autoscaler alongside cluster overprovisioning to ensure zero-downtime traffic spikes...`,lowDataSizeKb:42e3,offlineSaved:!0},{id:`lib-2`,title:`Defending Against Zero-Day Exploits: Modern Security Playbook`,category:`slides`,author:`Elena Rostova`,slideCount:8,fileSize:`6.4 MB`,rating:4.95,tags:[`Security`,`DevSecOps`,`Architecture`],thumbnail:`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80`,summary:`Interactive 8-slide executive and technical deck detailing Threat Modeling, Zero Trust micro-segmentation, and automated incident containment.`,slides:[{title:`Slide 1: The Modern Threat Landscape`,bullets:[`Perimeter security is obsolete`,`82% of breaches involve credential abuse`,`Zero Trust as a fundamental architecture`]},{title:`Slide 2: Principle of Least Privilege (PoLP)`,bullets:[`Just-In-Time access controls`,`Ephemeral service credentials`,`Granular IAM policies per service identity`]},{title:`Slide 3: Network Microsegmentation`,bullets:[`mTLS between all internal microservices`,`Default-deny network policies`,`Real-time telemetry and anomaly detection`]},{title:`Slide 4: Supply Chain & Dependency Hardening`,bullets:[`Software Bill of Materials (SBOM)`,`Cryptographic artifact signing with Cosign`,`Automated CVE scanning in CI/CD`]},{title:`Slide 5: Automated Incident Containment`,bullets:[`Automated isolation of compromised containers`,`Forensic memory dumping`,`Immutable audit logs sent to cold storage`]},{title:`Slide 6: Conclusion & Checklist`,bullets:[`Audit daily`,`Simulate tabletop exercises quarterly`,`Verify backup immutability`]}],offlineSaved:!1},{id:`lib-3`,title:`Production REST & GraphQL Microservices Architecture Blueprint`,category:`guide`,author:`David Kim`,readTime:`12 min read`,fileSize:`1.2 MB`,rating:4.92,tags:[`Full Stack`,`Node.js`,`System Design`],thumbnail:`https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80`,summary:`Comprehensive production study guide covering distributed rate limiting, idempotent mutations, GraphQL schema federation, and Redis caching layers.`,guideMarkdown:`# Production API Design Guide
## 1. Idempotency Keys
Always require an \`Idempotency-Key\` header on non-idempotent operations (POST /payments, /transfers). Store processed keys in Redis with a 24-hour TTL to prevent double execution.

## 2. Distributed Rate Limiting
Implement token bucket or sliding window algorithms using Redis Lua scripts:
\`\`\`javascript
const allowed = await redis.eval(slidingWindowLua, 1, userIP, windowSize, maxRequests);
\`\`\`

## 3. Schema Federation
Decouple services into bounded domains while providing a unified GraphQL schema gateway for clients.`,offlineSaved:!0},{id:`lib-4`,title:`Deep Dive: Transformer Attention Mechanisms in Large Language Models`,category:`video`,author:`Dr. Sarah Jenkins`,duration:`32m 45s`,fileSize:`54 MB (Data Saver) / 210 MB (HD)`,quality:`1080p / 720p / 360p`,rating:4.98,tags:[`AI`,`PyTorch`,`LLMs`],thumbnail:`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80`,summary:`Mathematical breakdown and PyTorch implementation of Multi-Query Attention (MQA) and FlashAttention optimizations.`,transcript:`In this lecture, we dismantle the quadratic computational bottleneck of classic self-attention and review how FlashAttention leverages SRAM caching...`,lowDataSizeKb:54e3,offlineSaved:!1},{id:`lib-5`,title:`Design Systems & High-Performance Micro-Interactions Guide`,category:`guide`,author:`Maya Patel`,readTime:`8 min read`,fileSize:`850 KB`,rating:4.89,tags:[`Design`,`CSS`,`UX`],thumbnail:`https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80`,summary:`Tokenized design variables, spring physics in CSS transitions, accessible focus rings, and dark-mode color balance formulas.`,guideMarkdown:"# High Performance Micro-Interactions\n- Use `transform` and `opacity` exclusively for 60fps animations.\n- Implement `will-change` judiciously on animated elements.\n- Honor `prefers-reduced-motion` for accessibility compliance.",offlineSaved:!1}],news:[{id:`news-1`,title:`🚀 NexTrain 2.0 Released: Offline PWA & Smart Matchmaker Live!`,category:`Platform Update`,badge:`Major Release`,author:`Platform Admin`,date:`Today, 09:30 AM`,pinned:!0,content:`We are thrilled to launch NexTrain 2.0 with instant low-data streaming, offline study guides, and an AI-driven Trainer Matchmaker algorithm!`},{id:`news-2`,title:`⚡ Bandwidth Optimization: Save up to 70% data with Data Saver`,category:`Efficiency`,badge:`Feature Tip`,author:`Engineering Ops`,date:`Yesterday, 04:15 PM`,pinned:!0,content:`Trainees on mobile networks can toggle Data Saver mode in the top navigation bar to automatically transcode video lectures to 360p and prioritize compressed transcripts.`},{id:`news-3`,title:`🏆 Q3 Certified Cloud Practitioners Honored`,category:`Community`,badge:`Milestone`,author:`Dr. Sarah Jenkins`,date:`Sept 28, 2026`,pinned:!1,content:`Congratulations to our 140+ trainees who passed the Cloud Architecture & Kubernetes Essentials certification quiz this week!`},{id:`news-4`,title:`🔧 Scheduled Platform Maintenance Notice: Oct 12`,category:`Maintenance`,badge:`Notice`,author:`Admin Ops`,date:`Sept 26, 2026`,pinned:!1,content:`Routine security patching and database indexing will occur on October 12 between 02:00 UTC and 03:00 UTC. Offline reading will remain fully accessible.`}],pendingUsers:[{id:`pen-1`,name:`James Wilson`,email:`james.wilson@cloudtech.co`,requestedRole:`trainer`,specialty:`Blockchain & Distributed Ledgers`,appliedDate:`2 hours ago`,experience:`8 Years`,status:`pending`,avatar:`https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80`},{id:`pen-2`,name:`Amina Yusuf`,email:`amina.yusuf@enterprise.org`,requestedRole:`trainee`,specialty:`Cloud Security Fast-Track`,appliedDate:`Yesterday`,experience:`Associate (2 Years)`,status:`pending`,avatar:`https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80`},{id:`pen-3`,name:`Kenji Sato`,email:`kenji.sato@iot-labs.jp`,requestedRole:`trainer`,specialty:`Embedded Systems & Edge AI`,appliedDate:`3 days ago`,experience:`12 Years`,status:`pending`,avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80`}],matchRequests:[{id:`req-101`,traineeName:`Alex Chen`,trainerName:`Dr. Sarah Jenkins`,topic:`AI & Neural Networks Foundations`,status:`Accepted`,date:`Today`,note:`Looking for 1-on-1 coaching for PyTorch distributed training.`}],systemMetrics:{totalTrainees:1842,activeTrainers:64,quizzesCompleted:8920,averagePassRate:`86.4%`,bandwidthSavedGb:1420,dailyActivity:[{day:`Mon`,quizzes:340,activeUsers:820},{day:`Tue`,quizzes:410,activeUsers:950},{day:`Wed`,quizzes:480,activeUsers:1040},{day:`Thu`,quizzes:530,activeUsers:1120},{day:`Fri`,quizzes:620,activeUsers:1260},{day:`Sat`,quizzes:380,activeUsers:740},{day:`Sun`,quizzes:450,activeUsers:890}]}},n=new class{constructor(){this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(e);if(t)return JSON.parse(t)}catch(e){console.warn(`LocalStorage load error, using default data:`,e)}return this.saveData(t),JSON.parse(JSON.stringify(t))}saveData(t=this.data){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`LocalStorage save error:`,e)}}switchRole(e){if(this.data.roles[e]){let t=this.data.roles[e];this.data.currentUser.role=e,this.data.currentUser.name=t.name,this.data.currentUser.avatar=t.avatar,this.data.currentUser.title=t.title,this.saveData()}}toggleOfflineItem(e){let t=this.data.library.find(t=>t.id===e);if(!t)return!1;t.offlineSaved=!t.offlineSaved;let n=this.data.currentUser.savedOffline.indexOf(e);return t.offlineSaved&&n===-1?this.data.currentUser.savedOffline.push(e):!t.offlineSaved&&n!==-1&&this.data.currentUser.savedOffline.splice(n,1),this.saveData(),t.offlineSaved}addQuiz(e){this.data.quizzes.unshift(e),this.saveData()}addLibraryItem(e){this.data.library.unshift(e),this.saveData()}addNews(e){this.data.news.unshift(e),this.saveData()}approveUser(e){let t=this.data.pendingUsers.findIndex(t=>t.id===e);if(t!==-1){let e=this.data.pendingUsers[t];return e.status=`approved`,e.requestedRole===`trainer`?(this.data.trainers.push({id:`tr-`+Date.now(),name:e.name,title:e.specialty,rating:5,reviewCount:1,hourlyRate:60,experienceYears:5,studentsCount:0,skills:[e.specialty,`Technical Coaching`],topics:[e.specialty],avatar:e.avatar,bio:`Newly approved verified trainer specializing in ${e.specialty}.`,verified:!0,availability:`Open for booking`}),this.data.systemMetrics.activeTrainers++):this.data.systemMetrics.totalTrainees++,this.data.pendingUsers.splice(t,1),this.saveData(),e}return null}rejectUser(e){let t=this.data.pendingUsers.findIndex(t=>t.id===e);if(t!==-1){let e=this.data.pendingUsers.splice(t,1)[0];return this.saveData(),e}return null}recordQuizSubmission(e,t,n){let r=this.data.quizzes.find(t=>t.id===e);if(!r)return null;let i={quizId:e,score:t,total:100,date:new Date().toISOString().split(`T`)[0],passed:n};this.data.currentUser.completedQuizzes.unshift(i),this.data.systemMetrics.quizzesCompleted++;let a=null;return n&&t>=80&&(a={id:`CERT-${Math.floor(1e3+Math.random()*9e3)}-${r.course.substring(0,3).toUpperCase()}`,quizTitle:r.title,issuedDate:new Date().toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`}),score:`${t}%`,verificationHash:`0x`+Math.random().toString(16).substring(2,14)},this.data.currentUser.certificates.unshift(a)),this.saveData(),{record:i,cert:a}}submitMatchRequest(e,t,n){let r=this.data.trainers.find(t=>t.id===e);if(!r)return null;let i={id:`req-`+Date.now(),traineeName:this.data.currentUser.name,trainerName:r.name,trainerAvatar:r.avatar,topic:t,status:`Pending Match`,date:`Just now`,note:n||`Interested in 1-on-1 mentorship and tailored skill review.`};return this.data.matchRequests.unshift(i),this.saveData(),i}resetToDefault(){this.data=JSON.parse(JSON.stringify(t)),this.saveData()}},r=class{constructor(e){this.showToast=e,this.deferredInstallPrompt=null,this.isLowData=localStorage.getItem(`nextrain_low_data`)===`true`,this.isOnline=navigator.onLine,this.initServiceWorker(),this.initNetworkListeners(),this.initInstallPrompt()}initServiceWorker(){`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).then(e=>{console.log(`[PWA] Service Worker registered successfully with scope:`,e.scope)}).catch(e=>{console.warn(`[PWA] Service Worker registration failed:`,e)})})}initNetworkListeners(){window.addEventListener(`online`,()=>{this.isOnline=!0,this.updateOfflineBanner(),this.showToast(`Network connection restored. Syncing latest course updates.`,`success`)}),window.addEventListener(`offline`,()=>{this.isOnline=!1,this.updateOfflineBanner(),this.showToast(`You are currently offline. Showing saved study materials from device cache.`,`warning`)})}initInstallPrompt(){window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),this.deferredInstallPrompt=e;let t=document.getElementById(`btn-install-pwa`);t&&(t.style.display=`inline-flex`)}),window.addEventListener(`appinstalled`,()=>{this.deferredInstallPrompt=null;let e=document.getElementById(`btn-install-pwa`);e&&(e.style.display=`none`),this.showToast(`NexTrain installed successfully to your device!`,`success`)})}promptInstall(){this.deferredInstallPrompt?(this.deferredInstallPrompt.prompt(),this.deferredInstallPrompt.userChoice.then(e=>{e.outcome===`accepted`&&console.log(`[PWA] User accepted installation prompt`),this.deferredInstallPrompt=null})):this.showToast(`To install on your mobile device or desktop, tap "Add to Home Screen" or the browser install icon in the address bar.`,`info`)}toggleLowData(){return this.isLowData=!this.isLowData,localStorage.setItem(`nextrain_low_data`,this.isLowData?`true`:`false`),this.updateDataSaverUI(),this.showToast(this.isLowData?`Data Saver Mode ON: Videos stream at 360p, high-res assets compressed (~70% data saved).`:`Data Saver Mode OFF: Full resolution video streaming enabled.`,this.isLowData?`success`:`info`),this.isLowData}updateDataSaverUI(){let e=document.getElementById(`btn-toggle-data-saver`),t=document.getElementById(`data-saver-status-text`);e&&t&&(this.isLowData?(e.classList.add(`data-saver-active`),t.textContent=`Data Saver: ON ⚡`):(e.classList.remove(`data-saver-active`),t.textContent=`Data Saver: OFF`))}updateOfflineBanner(){let e=document.getElementById(`offline-status-banner`);e&&(this.isOnline?e.style.display=`none`:e.style.display=`flex`)}};function i(e,t,n=4.5,r=100){if(!t||t.trim()===``){let t=e.rating/5*60,n=Math.min(e.experienceYears/10*40,40);return Math.round(t+n)}let i=t.toLowerCase().split(/\s+/).filter(Boolean),a=0,o=0;i.forEach(t=>{e.skills.some(e=>e.toLowerCase().includes(t))&&(a+=1.5),e.topics.some(e=>e.toLowerCase().includes(t))&&(o+=2),e.title.toLowerCase().includes(t)&&(a+=1),e.bio.toLowerCase().includes(t)&&(a+=.5)});let s=a*25+o*35,c=Math.min(s,70),l=e.rating/5*20,u=e.hourlyRate<=r?10:Math.max(0,10-(e.hourlyRate-r)/10),d=Math.min(Math.round(c+l+u),99);return Math.max(d,42)}function a(e,t,r){let a=n.data.trainers;e.innerHTML=`
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
  `;let o=e.querySelector(`#match-topic-input`),s=e.querySelector(`#btn-trigger-match`),c=e.querySelector(`#filter-min-rating`),l=e.querySelector(`#label-rating-val`),u=e.querySelector(`#filter-max-rate`),d=e.querySelector(`#label-rate-val`),f=e.querySelector(`#filter-sort`),p=e.querySelectorAll(`.chip-tag`);function m(){let t=o.value.trim(),n=parseFloat(c.value),r=parseInt(u.value,10),s=f.value;l.textContent=n.toFixed(1)+`+`,d.textContent=`$`+r+`/hr`;let p=a.map(e=>{let a=i(e,t,n,r);return{...e,matchScore:a}});p=p.filter(e=>e.rating>=n&&e.hourlyRate<=r),s===`match`?p.sort((e,t)=>t.matchScore-e.matchScore):s===`rating`?p.sort((e,t)=>t.rating-e.rating):s===`experience`?p.sort((e,t)=>t.experienceYears-e.experienceYears):s===`rate-asc`&&p.sort((e,t)=>e.hourlyRate-t.hourlyRate);let m=e.querySelector(`#match-count`);m.textContent=`${p.length} Available Qualified Trainers`;let _=e.querySelector(`#trainer-cards-grid`);if(p.length===0){_.innerHTML=`
        <div class="empty-state-box">
          <div class="empty-icon">🔍</div>
          <h4>No trainers match these precise filter criteria</h4>
          <p>Try widening your hourly rate range or lowering the minimum rating threshold.</p>
        </div>
      `;return}_.innerHTML=p.map((e,t)=>{let n=t===0&&e.matchScore>=85;return`
        <div class="trainer-card glass-card ${n?`card-top-match`:``}">
          ${n?`<div class="ribbon-top-match">🔥 Top Match</div>`:``}
          <div class="trainer-card-header">
            <div class="avatar-wrapper">
              <img src="${e.avatar}" alt="${e.name}" class="trainer-avatar" />
              ${e.verified?`<span class="verified-badge-icon" title="Identity & Skills Verified">✓</span>`:``}
            </div>
            <div class="trainer-info">
              <div class="name-row">
                <h4>${e.name}</h4>
                <div class="match-score-badge ${e.matchScore>=90?`score-high`:e.matchScore>=75?`score-med`:`score-regular`}">
                  ${e.matchScore}% Match
                </div>
              </div>
              <p class="trainer-title">${e.title}</p>
              <div class="trainer-meta-row">
                <span class="rating-stars">★ ${e.rating.toFixed(2)} (${e.reviewCount} reviews)</span>
                <span class="meta-dot">•</span>
                <span class="exp-badge">${e.experienceYears} yrs exp</span>
                <span class="meta-dot">•</span>
                <span class="rate-badge">$${e.hourlyRate}/hr</span>
              </div>
            </div>
          </div>

          <p class="trainer-bio">${e.bio}</p>

          <div class="trainer-skills-wrap">
            ${e.skills.map(e=>`<span class="skill-pill">${e}</span>`).join(``)}
          </div>

          <div class="trainer-card-footer">
            <div class="availability-info">
              <span class="status-indicator online"></span>
              <span>${e.availability}</span>
            </div>
            <div class="action-buttons">
              <button class="btn btn-sm btn-outline btn-view-profile" data-id="${e.id}">
                View Profile
              </button>
              <button class="btn btn-sm btn-primary btn-request-trainer" data-id="${e.id}" data-name="${e.name}">
                Request Trainer
              </button>
            </div>
          </div>
        </div>
      `}).join(``),_.querySelectorAll(`.btn-request-trainer`).forEach(e=>{e.addEventListener(`click`,e=>{h(e.currentTarget.getAttribute(`data-id`),e.currentTarget.getAttribute(`data-name`))})}),_.querySelectorAll(`.btn-view-profile`).forEach(e=>{e.addEventListener(`click`,e=>{g(e.currentTarget.getAttribute(`data-id`))})})}function h(e,i){let s=o.value||`General Coaching`,c=a.find(t=>t.id===e);r(`Request 1-on-1 Coaching with ${i}`,`
      <div class="request-match-modal-content">
        <div class="modal-trainer-summary">
          <img src="${c.avatar}" class="modal-trainer-avatar" />
          <div>
            <h4>${c.name}</h4>
            <p class="text-muted">${c.title}</p>
            <p class="text-accent">Rate: $${c.hourlyRate}/hr • Rating: ★ ${c.rating}</p>
          </div>
        </div>

        <div class="form-group">
          <label>Course Topic / Training Focus</label>
          <input type="text" id="req-topic-field" class="form-control" value="${s}" />
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
          <label>Notes / Questions for ${c.name}</label>
          <textarea id="req-notes-field" class="form-control" rows="3" placeholder="Tell the trainer what specific challenges or goals you have in mind..."></textarea>
        </div>

        <div class="modal-action-footer">
          <button class="btn btn-secondary modal-cancel-btn">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-match-req">Send Match Request</button>
        </div>
      </div>
    `,(r,a)=>{r.querySelector(`.modal-cancel-btn`).onclick=a,r.querySelector(`#btn-confirm-match-req`).onclick=()=>{let o=r.querySelector(`#req-topic-field`).value,s=r.querySelector(`#req-notes-field`).value;n.submitMatchRequest(e,o,s),t(`Match request dispatched to ${i}! They will respond within 4 hours.`,`success`),a()}})}function g(e){let t=a.find(t=>t.id===e);t&&r(`${t.name} - Trainer Profile & Credentials`,`
      <div class="trainer-profile-modal-content">
        <div class="profile-hero">
          <img src="${t.avatar}" class="profile-hero-avatar" />
          <div class="profile-hero-text">
            <h3>${t.name} ${t.verified?`<span class="verified-tag">✓ Verified Expert</span>`:``}</h3>
            <p class="text-accent">${t.title}</p>
            <p class="profile-meta">★ ${t.rating} (${t.reviewCount} verified reviews) • ${t.experienceYears} Years Enterprise Experience • $${t.hourlyRate}/hr</p>
          </div>
        </div>

        <div class="profile-section">
          <h5>Biography & Background</h5>
          <p>${t.bio}</p>
        </div>

        <div class="profile-section">
          <h5>Core Competencies & Technology Stack</h5>
          <div class="skills-pill-wrap">
            ${t.skills.map(e=>`<span class="skill-pill-highlight">${e}</span>`).join(``)}
          </div>
        </div>

        <div class="profile-section">
          <h5>Curated Courses Taught</h5>
          <ul class="course-list-bulleted">
            ${t.topics.map(e=>`<li><strong>${e}</strong> - Comprehensive modules with live quizzes and digital slide decks.</li>`).join(``)}
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
          <button class="btn btn-primary" id="btn-profile-book">Book Session with ${t.name}</button>
        </div>
      </div>
    `,(e,n)=>{e.querySelector(`.modal-cancel-btn`).onclick=n,e.querySelector(`#btn-profile-book`).onclick=()=>{n(),h(t.id,t.name)}})}s.addEventListener(`click`,m),o.addEventListener(`keyup`,e=>{e.key===`Enter`&&m()}),c.addEventListener(`input`,m),u.addEventListener(`input`,m),f.addEventListener(`change`,m),p.forEach(e=>{e.addEventListener(`click`,e=>{o.value=e.currentTarget.getAttribute(`data-tag`),m()})}),m()}var o=null;function s(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function c(e,t,r,i){let a=n.data.currentUser,o=a.role===`trainer`,s=n.data.quizzes;e.innerHTML=`
    <div class="quiz-section-header">
      <div>
        <div class="badge-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Timed Evaluations & Instant Grading
        </div>
        <h2>Interactive Quiz Center</h2>
        <p class="subtitle">Complete technical evaluations under live countdown conditions. Quizzes feature randomized question delivery, instant automated grading, and instant verifiable certificates for scores of 80% and above.</p>
      </div>
      ${o?`
        <button id="btn-create-quiz" class="btn btn-primary pulse-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Publish New Quiz
        </button>
      `:``}
    </div>

    <!-- Active Quizzes Grid -->
    <div class="quizzes-grid">
      ${s.map(e=>{let t=a.completedQuizzes?.find(t=>t.quizId===e.id),n=new Date(e.deadline),r=n<new Date,i=n.toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`});return`
          <div class="quiz-card glass-card">
            <div class="quiz-card-top">
              <span class="quiz-course-tag" style="border-left: 3px solid ${e.badgeColor||`#6366f1`}">${e.course}</span>
              ${t?`
                <span class="badge ${t.passed?`badge-success`:`badge-danger`}">
                  ${t.passed?`Passed: `+t.score+`%`:`Failed: `+t.score+`%`}
                </span>
              `:`
                <span class="badge badge-warning">
                  ${e.timeLimitMinutes} Mins • ${e.questions.length} Questions
                </span>
              `}
            </div>

            <h3 class="quiz-title">${e.title}</h3>
            <p class="quiz-author">Curated by <strong>${e.author}</strong></p>

            <div class="quiz-features-row">
              <span class="feature-item" title="Questions are randomized for each student">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                Mixed Order
              </span>
              <span class="feature-item" title="Passing threshold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Pass: ${e.passingScore}%
              </span>
              <span class="feature-item deadline-item ${r?`text-danger`:``}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Due: ${i}
              </span>
            </div>

            <div class="quiz-card-bottom">
              ${t?`
                <button class="btn btn-outline btn-sm btn-retake-quiz" data-id="${e.id}">
                  Retake Evaluation
                </button>
                ${t.score>=80?`
                  <button class="btn btn-accent btn-sm btn-view-earned-cert" data-title="${e.title}">
                    View Certificate 🏆
                  </button>
                `:``}
              `:`
                <button class="btn btn-primary full-width btn-start-quiz" data-id="${e.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Start Timed Quiz (${e.timeLimitMinutes}m)
                </button>
              `}
            </div>
          </div>
        `}).join(``)}
    </div>
  `,e.querySelectorAll(`.btn-start-quiz, .btn-retake-quiz`).forEach(n=>{n.addEventListener(`click`,n=>{l(n.currentTarget.getAttribute(`data-id`),t,r,i,()=>{c(e,t,r,i)})})}),e.querySelectorAll(`.btn-view-earned-cert`).forEach(e=>{e.addEventListener(`click`,e=>{let r=e.currentTarget.getAttribute(`data-title`),a=n.data.currentUser.certificates?.find(e=>e.quizTitle===r)||n.data.currentUser.certificates?.[0];a&&i?i(a):t(`Certificate verified and active in profile!`,`info`)})});let d=e.querySelector(`#btn-create-quiz`);d&&d.addEventListener(`click`,()=>{u(t,r,()=>{c(e,t,r,i)})})}function l(e,t,r,i,a){let c=n.data.quizzes.find(t=>t.id===e);if(!c)return;let l=c.shuffleQuestions?s(c.questions):[...c.questions],u=0,d={},f=c.timeLimitMinutes*60;r(`Assessment: ${c.title}`,`
    <div class="quiz-player-modal">
      <div class="quiz-timer-bar-wrapper">
        <div class="timer-display-row">
          <span class="quiz-progress-text">Question <strong id="current-q-num">1</strong> of ${l.length}</span>
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
        ${l.map((e,t)=>`<button class="tracker-pill ${t===0?`active`:``}" data-idx="${t}">${t+1}</button>`).join(``)}
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
  `,(e,s)=>{let p=e.querySelector(`#timer-text`),m=e.querySelector(`#timer-pill`),h=e.querySelector(`#quiz-progress-fill`),g=e.querySelector(`#question-box`),_=e.querySelector(`#current-q-num`),v=e.querySelector(`#btn-prev-question`),y=e.querySelector(`#btn-next-question`),b=e.querySelector(`#btn-submit-quiz`),x=e.querySelectorAll(`.tracker-pill`),S=c.timeLimitMinutes*60;clearInterval(o),o=setInterval(()=>{f--;let e=Math.floor(f/60),n=f%60;p.textContent=`${String(e).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`;let r=(S-f)/S*100;h.style.width=`${r}%`,f<=30&&m.classList.add(`urgent-pulse`),f<=0&&(clearInterval(o),t(`Time is up! Submitting evaluation...`,`warning`),w())},1e3);function C(e){u=e,_.textContent=e+1;let t=l[e];x.forEach((t,n)=>{t.classList.remove(`active`),n===e&&t.classList.add(`active`),d[l[n].id]!==void 0&&t.classList.add(`answered`)}),v.disabled=e===0,e===l.length-1?y.style.display=`none`:y.style.display=`inline-flex`;let n=d[t.id];g.innerHTML=`
        <h4 class="question-text">${t.question}</h4>
        <div class="options-list">
          ${t.options.map((e,r)=>`
            <label class="option-label ${n===r?`selected`:``}">
              <input type="radio" name="opt-${t.id}" value="${r}" ${n===r?`checked`:``} />
              <span class="option-letter">${String.fromCharCode(65+r)}</span>
              <span class="option-text">${e}</span>
            </label>
          `).join(``)}
        </div>
      `,g.querySelectorAll(`input[type="radio"]`).forEach(e=>{e.addEventListener(`change`,e=>{d[t.id]=parseInt(e.target.value,10),C(u)})})}v.onclick=()=>{u>0&&C(u-1)},y.onclick=()=>{u<l.length-1&&C(u+1)},x.forEach(e=>{e.addEventListener(`click`,e=>{C(parseInt(e.currentTarget.getAttribute(`data-idx`),10))})}),b.onclick=()=>{let e=l.filter(e=>d[e.id]===void 0).length;e>0&&!confirm(`You have ${e} unanswered question(s). Are you sure you want to finish and submit?`)||(clearInterval(o),w())};function w(){clearInterval(o);let e=0;l.forEach(t=>{d[t.id]===t.correctIndex&&e++});let t=Math.round(e/l.length*100),u=t>=c.passingScore,f=n.recordQuizSubmission(c.id,t,u);s(),r(`Evaluation Results: ${c.title}`,`
        <div class="quiz-results-modal">
          <div class="result-score-banner ${u?`banner-pass`:`banner-fail`}">
            <div class="result-icon">${u?`🎉`:`⚠️`}</div>
            <h2>${t}%</h2>
            <h4>${u?`Congratulations! You Passed!`:`Passing Threshold Not Met`}</h4>
            <p>${u?`You scored ${e} out of ${l.length} questions correctly, surpassing the required ${c.passingScore}% threshold.`:`You achieved ${e}/${l.length}. The passing threshold is ${c.passingScore}%. You can review the correct answers below and retake anytime.`}</p>
          </div>

          ${f?.cert?`
            <div class="earned-cert-callout glass-panel">
              <div class="cert-callout-text">
                <strong>🏆 Official Certificate Generated</strong>
                <p>Credential ID: ${f.cert.id}</p>
              </div>
              <button id="btn-view-new-cert" class="btn btn-accent btn-sm">
                View & Download Certificate
              </button>
            </div>
          `:``}

          <div class="review-questions-breakdown">
            <h4>Detailed Answer Breakdown</h4>
            ${l.map((e,t)=>{let n=d[e.id],r=n===e.correctIndex;return`
                <div class="review-item ${r?`review-correct`:`review-incorrect`}">
                  <div class="review-q-header">
                    <span class="review-badge ${r?`badge-success`:`badge-danger`}">
                      ${r?`✓ Correct`:`✗ Incorrect`}
                    </span>
                    <strong>Q${t+1}: ${e.question}</strong>
                  </div>
                  <div class="review-details">
                    <p class="review-user-ans">Your answer: <span>${n===void 0?`No answer selected`:`${String.fromCharCode(65+n)}) ${e.options[n]}`}</span></p>
                    ${r?``:`
                      <p class="review-correct-ans">Correct answer: <strong>${String.fromCharCode(65+e.correctIndex)}) ${e.options[e.correctIndex]}</strong></p>
                    `}
                    <div class="review-explanation">
                      💡 <strong>Explanation:</strong> ${e.explanation}
                    </div>
                  </div>
                </div>
              `}).join(``)}
          </div>

          <div class="modal-action-footer">
            <button class="btn btn-primary" id="btn-close-results">Finish Review</button>
          </div>
        </div>
      `,(e,t)=>{e.querySelector(`#btn-close-results`).onclick=()=>{t(),a&&a()};let n=e.querySelector(`#btn-view-new-cert`);n&&f?.cert&&(n.onclick=()=>{t(),i&&i(f.cert)})})}C(0)})}function u(e,t,r){let i=[{question:`What is the primary role of a Reverse Proxy in cloud network architecture?`,options:[`To compile code on the server before execution`,`To distribute client requests, provide SSL termination, and protect internal servers`,`To store persistent user database files on disk`,`To generate frontend CSS stylesheets automatically`],correctIndex:1,explanation:`A reverse proxy intercepts inbound requests, balancing loads, offloading SSL/TLS, and abstracting internal service topologies.`},{question:`Which consistency model guarantees that any read returns the most recent write?`,options:[`Eventual Consistency`,`Causal Consistency`,`Strict Linearizability`,`Read-uncommitted`],correctIndex:2,explanation:`Linearizability provides real-time recency guarantees where every read operation observes the latest completed write.`}];t(`Publish New Technical Quiz`,`
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
  `,(t,a)=>{t.querySelector(`.modal-cancel-btn`).onclick=a;let o=t.querySelector(`#questions-draft-container`),s=t.querySelector(`#draft-count`),c=t.querySelector(`#btn-add-q-draft`);function l(){s.textContent=i.length,o.innerHTML=i.map((e,t)=>`
        <div class="draft-question-card glass-panel" data-qidx="${t}">
          <div class="draft-header">
            <strong>Question ${t+1}</strong>
            ${i.length>1?`<button type="button" class="btn-remove-q text-danger" data-qidx="${t}">✕ Remove</button>`:``}
          </div>
          <div class="form-group">
            <input type="text" class="form-control draft-q-input" value="${e.question}" placeholder="Enter question prompt..." />
          </div>
          <label class="small-label">Options (Select radio button for the Correct Answer):</label>
          <div class="draft-options-grid">
            ${e.options.map((n,r)=>`
              <div class="draft-opt-row">
                <input type="radio" name="draft-correct-${t}" value="${r}" ${e.correctIndex===r?`checked`:``} title="Mark as correct answer" />
                <span class="draft-opt-letter">${String.fromCharCode(65+r)}</span>
                <input type="text" class="form-control draft-opt-text" data-optidx="${r}" value="${n}" placeholder="Option text..." />
              </div>
            `).join(``)}
          </div>
          <div class="form-group" style="margin-top: 10px;">
            <input type="text" class="form-control draft-expl-input" value="${e.explanation}" placeholder="Explanation (shown to student after grading)..." />
          </div>
        </div>
      `).join(``),o.querySelectorAll(`.btn-remove-q`).forEach(e=>{e.onclick=e=>{let t=parseInt(e.target.getAttribute(`data-qidx`),10);i.splice(t,1),l()}}),o.querySelectorAll(`.draft-question-card`).forEach(e=>{let t=parseInt(e.getAttribute(`data-qidx`),10),n=e.querySelector(`.draft-q-input`),r=e.querySelector(`.draft-expl-input`);n.oninput=()=>{i[t].question=n.value},r.oninput=()=>{i[t].explanation=r.value},e.querySelectorAll(`.draft-opt-text`).forEach(e=>{let n=parseInt(e.getAttribute(`data-optidx`),10);e.oninput=()=>{i[t].options[n]=e.value}}),e.querySelectorAll(`input[name="draft-correct-${t}"]`).forEach(e=>{e.onchange=()=>{i[t].correctIndex=parseInt(e.value,10)}})})}c.onclick=()=>{i.push({question:`New technical assessment question...`,options:[`Option A`,`Option B`,`Option C`,`Option D`],correctIndex:0,explanation:`Detailed concept explanation for trainees.`}),l()},l(),t.querySelector(`#btn-publish-quiz-confirm`).onclick=()=>{let o=t.querySelector(`#new-quiz-title`).value.trim(),s=t.querySelector(`#new-quiz-course`).value.trim(),c=parseInt(t.querySelector(`#new-quiz-duration`).value,10)||5,l=parseInt(t.querySelector(`#new-quiz-pass`).value,10)||75,u=t.querySelector(`#new-quiz-deadline`).value||`2026-10-20`,d=t.querySelector(`#new-quiz-shuffle`).checked;if(!o||!s){e(`Please specify both quiz title and course track.`,`danger`);return}let f={id:`q-`+Date.now(),title:o,course:s,author:n.data.currentUser.name,timeLimitMinutes:c,deadline:`${u}T23:59:00`,passingScore:l,shuffleQuestions:d,badgeColor:`#10b981`,questions:i};n.addQuiz(f),e(`Quiz "${o}" published with randomized questions and instant grading!`,`success`),a(),r&&r()}})}var d=`all`,f=``;function p(e,t,r,i=!1){let a=n.data.currentUser;e.innerHTML=`
    <div class="library-header">
      <div>
        <div class="badge-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Cloud Repository & Offline Cache
        </div>
        <h2>All-in-One Digital Library</h2>
        <p class="subtitle">Stream compressed video lectures, explore interactive slide decks, and access offline study guides designed for lightning-fast loads on any device.</p>
      </div>
      ${a.role===`trainer`?`
        <button id="btn-upload-content" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload New Resource
        </button>
      `:``}
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="library-toolbar glass-panel">
      <div class="category-tabs">
        <button class="lib-tab ${d===`all`?`active`:``}" data-cat="all">All Content</button>
        <button class="lib-tab ${d===`video`?`active`:``}" data-cat="video">🎬 Video Lectures</button>
        <button class="lib-tab ${d===`slides`?`active`:``}" data-cat="slides">📊 Slide Decks</button>
        <button class="lib-tab ${d===`guide`?`active`:``}" data-cat="guide">📖 Study Guides</button>
        <button class="lib-tab ${d===`offline`?`active`:``}" data-cat="offline">💾 Saved Offline (${a.savedOffline?.length||0})</button>
      </div>

      <div class="library-search-wrapper">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" id="lib-search-input" class="search-input" placeholder="Search by title, author, or technology..." value="${f}" />
      </div>
    </div>

    ${i?`
      <div class="data-saver-notice-strip">
        <span class="icon">⚡</span>
        <span><strong>Data Saver Active:</strong> Media previews are compressed and video streams default to optimized 360p to preserve mobile data.</span>
      </div>
    `:``}

    <!-- Content Items Grid -->
    <div class="library-grid" id="library-grid-container">
      <!-- Rendered dynamically -->
    </div>
  `;let o=e.querySelector(`#library-grid-container`),s=e.querySelector(`#lib-search-input`),c=e.querySelectorAll(`.lib-tab`);function l(){let e=n.data.library;if(d===`offline`?e=e.filter(e=>n.data.currentUser.savedOffline.includes(e.id)):d!==`all`&&(e=e.filter(e=>e.category===d)),f.trim()){let t=f.toLowerCase();e=e.filter(e=>e.title.toLowerCase().includes(t)||e.author.toLowerCase().includes(t)||e.tags.some(e=>e.toLowerCase().includes(t)))}if(e.length===0){o.innerHTML=`
        <div class="empty-state-box full-width">
          <div class="empty-icon">📂</div>
          <h4>No study resources found</h4>
          <p>${d===`offline`?`You have not saved any materials for offline reading yet. Click "Save Offline" on any guide or lecture.`:`Try adjusting your search terms or selecting another category.`}</p>
        </div>
      `;return}o.innerHTML=e.map(e=>{let t=n.data.currentUser.savedOffline.includes(e.id),r=e.category===`video`,a=e.category===`slides`;e.category;let o=r?`🎬 Video Lecture`:a?`📊 Presentation Deck`:`📖 Study Guide`,s=r?e.duration:a?`${e.slideCount} Slides`:e.readTime;return`
        <div class="library-card glass-card">
          <div class="card-media-banner" style="background-image: linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.95) 100%), url('${e.thumbnail}')">
            <span class="lib-type-tag">${o}</span>
            <button class="btn-offline-toggle ${t?`is-saved`:``}" data-id="${e.id}" title="${t?`Saved in Local Offline Cache`:`Save for Offline Reading`}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${t?`currentColor`:`none`}" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              <span>${t?`Offline Ready`:`Save Offline`}</span>
            </button>
            ${r?`
              <div class="play-overlay-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            `:``}
          </div>

          <div class="library-card-content">
            <div class="meta-subrow">
              <span class="author-name">By ${e.author}</span>
              <span class="meta-dot">•</span>
              <span class="duration-badge">${s}</span>
              <span class="meta-dot">•</span>
              <span class="size-badge">${i&&e.lowDataSizeKb?Math.round(e.lowDataSizeKb/1024)+` MB (Data Saver)`:e.fileSize}</span>
            </div>

            <h3 class="lib-item-title">${e.title}</h3>
            <p class="lib-item-summary">${e.summary}</p>

            <div class="tags-row">
              ${e.tags.map(e=>`<span class="content-tag">${e}</span>`).join(``)}
            </div>

            <div class="library-card-actions">
              <button class="btn btn-primary btn-sm btn-open-media full-width" data-id="${e.id}" data-type="${e.category}">
                ${r?`Stream Lecture`:a?`View Slide Deck`:`Read Study Guide`}
              </button>
            </div>
          </div>
        </div>
      `}).join(``),o.querySelectorAll(`.btn-offline-toggle`).forEach(e=>{e.addEventListener(`click`,e=>{e.stopPropagation();let r=e.currentTarget.getAttribute(`data-id`),i=n.toggleOfflineItem(r);t(i?`Resource downloaded and cached in device offline storage!`:`Resource removed from offline storage.`,i?`success`:`info`),l()})}),o.querySelectorAll(`.btn-open-media`).forEach(e=>{e.addEventListener(`click`,e=>{let a=e.currentTarget.getAttribute(`data-id`),o=e.currentTarget.getAttribute(`data-type`),s=n.data.library.find(e=>e.id===a);s&&(o===`video`?m(s,r,t,i):o===`slides`?h(s,r,t):o===`guide`&&g(s,r,t))})})}s.addEventListener(`input`,e=>{f=e.target.value,l()}),c.forEach(e=>{e.addEventListener(`click`,e=>{c.forEach(e=>e.classList.remove(`active`)),e.currentTarget.classList.add(`active`),d=e.currentTarget.getAttribute(`data-cat`),l()})});let u=e.querySelector(`#btn-upload-content`);u&&(u.onclick=()=>{_(t,r,()=>{p(e,t,r,i)})}),l()}function m(e,t,r,i){let a=!1,o=i?`360p`:`720p`;t(`Streaming: ${e.title}`,`
    <div class="video-player-container">
      <div class="video-screen-wrapper">
        <!-- Interactive Canvas / Screen Canvas Simulation -->
        <div class="video-canvas-display" id="video-canvas">
          <div class="video-overlay-header">
            <span class="resolution-badge" id="player-res-badge">${o} ${o===`360p`?`⚡ Data Saver`:`HD`}</span>
            <span class="live-bitrate" id="player-bitrate">${o===`360p`?`450 kbps (Low Data)`:`2.4 Mbps`}</span>
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
              <div class="slide-mock-header">🖥️ ${e.title}</div>
              <div class="slide-mock-bullet">✓ Instructor: ${e.author}</div>
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

          <span class="time-readout" id="video-time">03:42 / ${e.duration}</span>

          <div class="scrub-bar-track" id="video-scrubber">
            <div class="scrub-bar-fill" id="scrubber-fill" style="width: 15%"></div>
          </div>

          <!-- Low Data Quality Selector -->
          <select id="video-quality-select" class="control-select">
            <option value="360p" ${o===`360p`?`selected`:``}>⚡ 360p (Low Data)</option>
            <option value="720p" ${o===`720p`?`selected`:``}>720p (HD)</option>
            <option value="1080p" ${o===`1080p`?`selected`:``}>1080p (Full HD)</option>
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
          <span class="file-size-info">Estimated data used: <strong id="data-used-label">${o===`360p`?`~12 MB`:`~64 MB`}</strong></span>
        </div>
        <p class="transcript-text">
          ${e.transcript}
        </p>
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Close Video</button>
        <button class="btn btn-primary" id="btn-save-video-offline">
          ${n.data.currentUser.savedOffline.includes(e.id)?`✓ Saved Offline`:`💾 Save for Offline Playback`}
        </button>
      </div>
    </div>
  `,(t,i)=>{t.querySelector(`.modal-cancel-btn`).onclick=i;let s=t.querySelector(`#btn-play-pause`),c=t.querySelector(`#play-icon`),l=t.querySelector(`#pause-icon`),u=t.querySelector(`#canvas-play-toggle`),d=t.querySelector(`#scrubber-fill`),f=t.querySelector(`#video-scrubber`),p=t.querySelector(`#video-quality-select`),m=t.querySelector(`#player-res-badge`),h=t.querySelector(`#player-bitrate`),g=t.querySelector(`#data-used-label`),_=t.querySelector(`#btn-save-video-offline`),v=t.querySelector(`.visualizer-wave`);function y(){a=!a,a?(c.style.display=`none`,l.style.display=`inline-block`,u.style.opacity=`0`,v.classList.add(`wave-active`)):(c.style.display=`inline-block`,l.style.display=`none`,u.style.opacity=`1`,v.classList.remove(`wave-active`))}s.onclick=y,u.onclick=y,f.onclick=e=>{let t=f.getBoundingClientRect(),n=e.clientX-t.left,r=Math.max(0,Math.min(100,n/t.width*100));d.style.width=`${r}%`},p.onchange=e=>{o=e.target.value,o===`360p`?(m.textContent=`360p ⚡ Data Saver`,h.textContent=`450 kbps (Low Data)`,g.textContent=`~12 MB`,r(`Switched to 360p Low-Data stream (~70% data saved).`,`info`)):o===`720p`?(m.textContent=`720p HD`,h.textContent=`2.4 Mbps`,g.textContent=`~64 MB`):(m.textContent=`1080p Full HD`,h.textContent=`5.8 Mbps`,g.textContent=`~180 MB`)},_.onclick=()=>{let t=n.toggleOfflineItem(e.id);_.textContent=t?`✓ Saved Offline`:`💾 Save for Offline Playback`,r(t?`Video lecture cached in offline memory!`:`Removed from offline memory.`,`success`)}})}function h(e,t,r){let i=0,a=e.slides||[{title:`Overview`,bullets:[`Key concept 1`,`Key concept 2`]},{title:`Deep Architecture`,bullets:[`Scaling pattern`,`Implementation details`]}];t(`Presentation: ${e.title}`,`
    <div class="slide-deck-viewer">
      <div class="slide-deck-screen glass-panel">
        <div class="slide-stage" id="slide-stage-content">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <div class="slide-deck-controls">
        <button class="btn btn-secondary btn-sm" id="btn-slide-prev">← Previous Slide</button>
        <span class="slide-index-counter" id="slide-counter">Slide 1 of ${a.length}</span>
        <button class="btn btn-primary btn-sm" id="btn-slide-next">Next Slide →</button>
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Close Viewer</button>
        <button class="btn btn-outline" id="btn-slide-offline">
          ${n.data.currentUser.savedOffline.includes(e.id)?`✓ Saved in Cache`:`💾 Save Slides for Offline`}
        </button>
      </div>
    </div>
  `,(t,o)=>{t.querySelector(`.modal-cancel-btn`).onclick=o;let s=t.querySelector(`#slide-stage-content`),c=t.querySelector(`#slide-counter`),l=t.querySelector(`#btn-slide-prev`),u=t.querySelector(`#btn-slide-next`),d=t.querySelector(`#btn-slide-offline`);function f(t){i=t;let n=a[t];c.textContent=`Slide ${t+1} of ${a.length}`,l.disabled=t===0,u.disabled=t===a.length-1,s.innerHTML=`
        <div class="slide-card-presentation">
          <div class="slide-branding">
            <span class="slide-logo">NexTrain Portal</span>
            <span class="slide-author">${e.author}</span>
          </div>
          <h2 class="slide-title-big">${n.title}</h2>
          <ul class="slide-bullet-list">
            ${n.bullets.map(e=>`<li><span class="bullet-check">▸</span> ${e}</li>`).join(``)}
          </ul>
          <div class="slide-footer-meta">
            <span>Course Track: ${e.tags.join(` • `)}</span>
            <span>Confidential & Certified Learning Material</span>
          </div>
        </div>
      `}l.onclick=()=>{i>0&&f(i-1)},u.onclick=()=>{i<a.length-1&&f(i+1)},d.onclick=()=>{let t=n.toggleOfflineItem(e.id);d.textContent=t?`✓ Saved in Cache`:`💾 Save Slides for Offline`,r(t?`Slide deck saved locally for offline review!`:`Removed from cache.`,`success`)},f(0)})}function g(e,t,r){t(`Study Guide: ${e.title}`,`
    <div class="study-guide-reader">
      <div class="guide-meta-banner">
        <div>
          <span class="guide-badge">Production Architecture Guide</span>
          <h4>${e.title}</h4>
          <p class="text-muted">Author: ${e.author} • Read Time: ${e.readTime}</p>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-guide-save-offline">
          ${n.data.currentUser.savedOffline.includes(e.id)?`✓ Saved in Cache`:`💾 Save for Offline Reading`}
        </button>
      </div>

      <div class="guide-body-content markdown-formatted">
        <p class="lead-summary">${e.summary}</p>
        <hr class="divider" />
        <pre class="code-block-mock"><code>${e.guideMarkdown||`Technical architectural guidelines and implementation patterns.`}</code></pre>
      </div>

      <div class="modal-action-footer">
        <button class="btn btn-secondary modal-cancel-btn">Close</button>
        <button class="btn btn-primary" id="btn-print-guide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print / Export Study Guide
        </button>
      </div>
    </div>
  `,(t,i)=>{t.querySelector(`.modal-cancel-btn`).onclick=i;let a=t.querySelector(`#btn-guide-save-offline`);a.onclick=()=>{let t=n.toggleOfflineItem(e.id);a.textContent=t?`✓ Saved in Cache`:`💾 Save for Offline Reading`,r(t?`Study guide cached in device storage!`:`Removed from offline storage.`,`success`)},t.querySelector(`#btn-print-guide`).onclick=()=>{window.print()}})}function _(e,t,r){t(`Upload Resource to Digital Library`,`
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
  `,(t,i)=>{t.querySelector(`.modal-cancel-btn`).onclick=i,t.querySelector(`#btn-confirm-upload`).onclick=()=>{let a=t.querySelector(`#up-title`).value.trim(),o=t.querySelector(`#up-category`).value,s=t.querySelector(`#up-duration`).value.trim()||`15 mins`,c=t.querySelector(`#up-tags`).value.split(`,`).map(e=>e.trim()).filter(Boolean),l=t.querySelector(`#up-summary`).value.trim(),u=t.querySelector(`#up-transcript`).value.trim();if(!a){e(`Please provide a resource title.`,`danger`);return}let d={id:`lib-`+Date.now(),title:a,category:o,author:n.data.currentUser.name,duration:o===`video`?s:void 0,readTime:o===`guide`?s:void 0,slideCount:o===`slides`?6:void 0,fileSize:o===`video`?`38 MB (Data Saver) / 140 MB (HD)`:`2.4 MB`,rating:5,tags:c,thumbnail:`https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80`,summary:l,transcript:u,lowDataSizeKb:38e3,offlineSaved:!1};n.addLibraryItem(d),e(`Resource "${a}" successfully published to the Digital Library!`,`success`),i(),r&&r()}})}function v(e,t,r,i){let a=n.data.pendingUsers,o=n.data.systemMetrics;n.data.news,e.innerHTML=`
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
          <h3 class="metric-val" id="metric-trainees">${o.totalTrainees.toLocaleString()}</h3>
          <span class="metric-sub text-success">↑ 14% this month</span>
        </div>
      </div>

      <div class="metric-card glass-card">
        <div class="metric-icon bg-cyan">👨‍🏫</div>
        <div class="metric-details">
          <span class="metric-label">Verified Trainers</span>
          <h3 class="metric-val" id="metric-trainers">${o.activeTrainers}</h3>
          <span class="metric-sub text-accent">★ 4.93 Avg Rating</span>
        </div>
      </div>

      <div class="metric-card glass-card">
        <div class="metric-icon bg-emerald">📝</div>
        <div class="metric-details">
          <span class="metric-label">Quizzes Evaluated</span>
          <h3 class="metric-val" id="metric-quizzes">${o.quizzesCompleted.toLocaleString()}</h3>
          <span class="metric-sub text-success">${o.averagePassRate} Pass Rate</span>
        </div>
      </div>

      <div class="metric-card glass-card">
        <div class="metric-icon bg-amber">⚡</div>
        <div class="metric-details">
          <span class="metric-label">Data Saver Savings</span>
          <h3 class="metric-val">${(o.bandwidthSavedGb/1e3).toFixed(2)} TB</h3>
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
          <span class="badge ${a.length>0?`badge-warning`:`badge-success`}" id="pending-count-badge">
            ${a.length} Pending
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
  `;let s=e.querySelector(`#pending-users-container`),c=e.querySelector(`#pending-count-badge`);function l(){if(c.textContent=`${n.data.pendingUsers.length} Pending`,n.data.pendingUsers.length===0){s.innerHTML=`
        <div class="empty-state-box">
          <div class="empty-icon">✓</div>
          <h4>All registrations processed</h4>
          <p>No new applicants in the verification pipeline at this time.</p>
        </div>
      `;return}s.innerHTML=n.data.pendingUsers.map(e=>`
      <div class="pending-user-item glass-panel" data-id="${e.id}">
        <img src="${e.avatar}" class="pending-user-avatar" />
        <div class="pending-user-info">
          <div class="pending-name-row">
            <strong>${e.name}</strong>
            <span class="role-tag ${e.requestedRole===`trainer`?`tag-trainer`:`tag-trainee`}">
              ${e.requestedRole===`trainer`?`👨‍🏫 Applying as Trainer`:`🎓 Applying as Trainee`}
            </span>
          </div>
          <p class="pending-spec">Specialty: <span>${e.specialty}</span> • Exp: <span>${e.experience}</span></p>
          <p class="pending-meta text-muted">Applied: ${e.appliedDate} • Email: ${e.email}</p>
        </div>
        <div class="pending-action-btns">
          <button class="btn btn-sm btn-success btn-approve-user" data-id="${e.id}">
            Approve ✓
          </button>
          <button class="btn btn-sm btn-danger btn-reject-user" data-id="${e.id}">
            Reject ✕
          </button>
        </div>
      </div>
    `).join(``),s.querySelectorAll(`.btn-approve-user`).forEach(r=>{r.onclick=r=>{let i=r.currentTarget.getAttribute(`data-id`),a=n.approveUser(i);a&&(t(`Approved ${a.name} as verified ${a.requestedRole}!`,`success`),l(),e.querySelector(`#metric-trainees`).textContent=n.data.systemMetrics.totalTrainees.toLocaleString(),e.querySelector(`#metric-trainers`).textContent=n.data.systemMetrics.activeTrainers)}}),s.querySelectorAll(`.btn-reject-user`).forEach(e=>{e.onclick=e=>{let r=e.currentTarget.getAttribute(`data-id`),i=n.rejectUser(r);i&&(t(`Application for ${i.name} declined.`,`info`),l())}})}let u=e.querySelector(`#admin-news-container`);function d(){u.innerHTML=n.data.news.map(e=>`
      <div class="admin-news-item glass-panel ${e.pinned?`item-pinned`:``}">
        <div class="news-item-top">
          <span class="badge ${e.pinned?`badge-primary`:`badge-secondary`}">${e.badge}</span>
          <span class="news-date">${e.date}</span>
        </div>
        <h4 class="news-headline">${e.title}</h4>
        <p class="news-snippet">${e.content}</p>
        <div class="news-author-row">
          <span>By ${e.author}</span>
          ${e.pinned?`<span class="pinned-tag">📌 Pinned to Home</span>`:``}
        </div>
      </div>
    `).join(``)}e.querySelector(`#btn-create-announcement`).onclick=()=>{r(`Publish Platform Bulletin / News`,`
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
    `,(e,r)=>{e.querySelector(`.modal-cancel-btn`).onclick=r,e.querySelector(`#btn-confirm-post-news`).onclick=()=>{let a=e.querySelector(`#news-in-title`).value.trim(),o=e.querySelector(`#news-in-badge`).value.trim()||`Notice`,s=e.querySelector(`#news-in-cat`).value,c=e.querySelector(`#news-in-content`).value.trim(),l=e.querySelector(`#news-in-pinned`).checked;if(!a||!c){t(`Please fill in headline and details.`,`danger`);return}let u={id:`news-`+Date.now(),title:a,badge:o,category:s,author:n.data.currentUser.name,date:`Just now`,pinned:l,content:c};n.addNews(u),t(`Announcement posted and broadcast to all dashboards!`,`success`),r(),d(),i&&i()}})},e.querySelector(`#btn-verify-cert`).onclick=()=>{r(`Cryptographic Certificate Verification`,`
      <div class="cert-verify-box">
        <p class="subtitle">Enter any NexTrain credential ID or verification hash to validate authenticity on the public ledger.</p>

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
    `,(e,t)=>{e.querySelector(`.modal-cancel-btn`).onclick=t;let n=()=>{let t=e.querySelector(`#input-cert-verify`).value.trim(),n=e.querySelector(`#cert-verification-result`);if(!t){n.innerHTML=`<div class="alert-box alert-danger">Please enter a valid credential ID.</div>`;return}n.innerHTML=`
          <div class="verified-cert-card glass-panel">
            <div class="verified-stamp">✓ VERIFIED AUTHENTIC</div>
            <h4>Certificate for Alex Chen</h4>
            <p class="cert-course-name">Evaluation: <strong>Modern Web Security & OWASP Top 10</strong></p>
            <div class="cert-meta-grid">
              <div><span>Credential ID:</span> <strong>${t}</strong></div>
              <div><span>Status:</span> <strong class="text-success">Active & Verified</strong></div>
              <div><span>Issue Date:</span> <strong>September 25, 2026</strong></div>
              <div><span>Score Achieved:</span> <strong>90% (Distinction)</strong></div>
              <div><span>Issuer:</span> <strong>NexTrain Global Certification Authority</strong></div>
              <div><span>Digital Signature:</span> <code>0x8f9c2e4b1a7d88920...</code></div>
            </div>
          </div>
        `};e.querySelector(`#btn-run-cert-check`).onclick=n,n()})},l(),d()}var y=class{constructor(){this.currentRole=n.data.currentUser.role||`trainee`,this.activeTab=`overview`,this.pwa=new r((e,t)=>this.showToast(e,t)),this.initDOM(),this.bindGlobalEvents(),this.renderHeaderUser(),this.renderAnnouncementsBanner(),this.renderNavigationTabs(),this.renderActiveView(),this.pwa.updateDataSaverUI(),this.pwa.updateOfflineBanner()}initDOM(){this.toastContainer=document.getElementById(`toast-container`),this.modalBackdrop=document.getElementById(`modal-backdrop`),this.modalTitle=document.getElementById(`modal-title`),this.modalBody=document.getElementById(`modal-body`),this.modalCloseBtn=document.getElementById(`modal-close-btn`),this.mainContent=document.getElementById(`main-content-view`),this.navTabsContainer=document.getElementById(`role-nav-tabs`),this.bannerAnnouncement=document.getElementById(`top-announcement-banner`)}showToast(e,t=`info`){let n=document.createElement(`div`);n.className=`toast-item toast-${t} slide-up`;let r=`ℹ️`;t===`success`&&(r=`✓`),t===`warning`&&(r=`⚠️`),t===`danger`&&(r=`✕`),n.innerHTML=`
      <span class="toast-icon">${r}</span>
      <span class="toast-msg">${e}</span>
      <button class="toast-dismiss-btn">&times;</button>
    `,n.querySelector(`.toast-dismiss-btn`).onclick=()=>{n.remove()},this.toastContainer.appendChild(n),setTimeout(()=>{n.parentNode&&(n.classList.add(`fade-out`),setTimeout(()=>n.remove(),300))},4500)}openModal(e,t,n){this.modalTitle.textContent=e,this.modalBody.innerHTML=t,this.modalBackdrop.classList.add(`modal-visible`);let r=()=>{this.modalBackdrop.classList.remove(`modal-visible`),this.modalBody.innerHTML=``};this.modalCloseBtn.onclick=r,this.modalBackdrop.onclick=e=>{e.target===this.modalBackdrop&&r()},n&&n(this.modalBody,r)}bindGlobalEvents(){document.querySelectorAll(`.role-switcher-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-role`);this.switchRole(t)})});let e=document.getElementById(`btn-toggle-data-saver`);e&&e.addEventListener(`click`,()=>{this.pwa.toggleLowData(),this.renderActiveView()});let t=document.getElementById(`btn-install-pwa`);t&&t.addEventListener(`click`,()=>{this.pwa.promptInstall()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.modalBackdrop.classList.contains(`modal-visible`)&&this.modalBackdrop.classList.remove(`modal-visible`)})}switchRole(e){this.currentRole=e,n.switchRole(e),this.activeTab=`overview`,this.renderHeaderUser(),this.renderNavigationTabs(),this.renderActiveView(),this.showToast({trainee:`Switched to Trainee Dashboard (Alex Chen)`,trainer:`Switched to Trainer Dashboard (Dr. Sarah Jenkins)`,admin:`Switched to Platform Operations Admin (Marcus Vance)`}[e]||`Active role: ${e}`,`info`)}renderHeaderUser(){document.querySelectorAll(`.role-switcher-btn`).forEach(e=>{e.getAttribute(`data-role`)===this.currentRole?e.classList.add(`active-role`):e.classList.remove(`active-role`)});let e=n.data.currentUser,t=document.getElementById(`header-user-name`),r=document.getElementById(`header-user-title`),i=document.getElementById(`header-user-avatar`);t&&(t.textContent=e.name),r&&(r.textContent=e.title),i&&(i.src=e.avatar)}renderAnnouncementsBanner(){let e=n.data.news.find(e=>e.pinned)||n.data.news[0];e&&this.bannerAnnouncement&&(this.bannerAnnouncement.innerHTML=`
        <div class="announcement-content">
          <span class="announcement-badge">${e.badge||`Announcement`}</span>
          <span class="announcement-text"><strong>${e.title}:</strong> ${e.content}</span>
        </div>
        <button id="banner-action-view" class="banner-link-btn">View All Updates →</button>
      `,this.bannerAnnouncement.querySelector(`#banner-action-view`).onclick=()=>{this.activeTab=this.currentRole===`admin`?`news`:`overview`,this.renderNavigationTabs(),this.renderActiveView()})}renderNavigationTabs(){let e=[];this.currentRole===`trainee`?e=[{id:`overview`,label:`Dashboard Overview`,icon:`📊`},{id:`matchmaker`,label:`Trainer Matchmaker`,icon:`🎯`},{id:`quizzes`,label:`Interactive Quizzes`,icon:`⏱️`},{id:`library`,label:`Digital Library & Offline`,icon:`📚`},{id:`certificates`,label:`My Certificates`,icon:`🏆`}]:this.currentRole===`trainer`?e=[{id:`overview`,label:`Trainer Overview`,icon:`📈`},{id:`quizzes`,label:`Publish & Manage Quizzes`,icon:`✍️`},{id:`library`,label:`Cloud Library & Uploads`,icon:`📤`},{id:`matchmaker`,label:`Trainee Match Requests`,icon:`🤝`}]:this.currentRole===`admin`&&(e=[{id:`overview`,label:`Admin Command Center`,icon:`⚡`},{id:`approvals`,label:`User Approvals Queue`,icon:`🛡️`},{id:`news`,label:`News Board Manager`,icon:`📢`},{id:`library`,label:`Library Audit`,icon:`🗄️`}]),e.some(e=>e.id===this.activeTab)||(this.activeTab=`overview`),this.navTabsContainer.innerHTML=e.map(e=>`
      <button class="nav-tab-btn ${e.id===this.activeTab?`active`:``}" data-tab="${e.id}">
        <span class="tab-icon">${e.icon}</span>
        <span class="tab-label">${e.label}</span>
      </button>
    `).join(``),this.navTabsContainer.querySelectorAll(`.nav-tab-btn`).forEach(e=>{e.addEventListener(`click`,e=>{this.activeTab=e.currentTarget.getAttribute(`data-tab`),this.renderNavigationTabs(),this.renderActiveView()})})}renderActiveView(){this.mainContent.innerHTML=``,this.currentRole===`trainee`?this.renderTraineeContent():this.currentRole===`trainer`?this.renderTrainerContent():this.currentRole===`admin`&&this.renderAdminContent()}renderTraineeContent(){this.activeTab===`overview`?this.renderTraineeOverview():this.activeTab===`matchmaker`?a(this.mainContent,(e,t)=>this.showToast(e,t),(e,t,n)=>this.openModal(e,t,n)):this.activeTab===`quizzes`?c(this.mainContent,(e,t)=>this.showToast(e,t),(e,t,n)=>this.openModal(e,t,n),e=>this.openCertificateModal(e)):this.activeTab===`library`?p(this.mainContent,(e,t)=>this.showToast(e,t),(e,t,n)=>this.openModal(e,t,n),this.pwa.isLowData):this.activeTab===`certificates`&&this.renderTraineeCertificates()}renderTraineeOverview(){let e=n.data.currentUser,t=e.completedQuizzes?.length||0,r=e.certificates?.length||0,i=e.savedOffline?.length||0;this.mainContent.innerHTML=`
      <div class="dashboard-hero glass-panel">
        <div class="hero-left">
          <div class="welcome-tag">👋 Welcome back, ${e.name}</div>
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
            <span class="stat-number text-success">${t}</span>
            <span class="stat-title">Quizzes Done</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-amber">${r}</span>
            <span class="stat-title">Certificates</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-cyan">${i}</span>
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
              ${n.data.quizzes.slice(0,2).map(e=>`
                <div class="quick-quiz-row glass-panel">
                  <div class="quiz-info-mini">
                    <span class="quiz-badge-mini" style="background: ${e.badgeColor}22; color: ${e.badgeColor}">${e.course}</span>
                    <h4>${e.title}</h4>
                    <p class="text-muted">⏱️ ${e.timeLimitMinutes} Mins • Passing: ${e.passingScore}% • Curated by ${e.author}</p>
                  </div>
                  <button class="btn btn-sm btn-primary btn-jump-quiz" data-id="${e.id}">Start Quiz</button>
                </div>
              `).join(``)}
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
              ${n.data.library.slice(0,3).map(e=>`
                <div class="lib-preview-row glass-panel">
                  <div class="lib-preview-thumb" style="background-image: url('${e.thumbnail}')">
                    <span class="cat-pill">${e.category===`video`?`🎬`:e.category===`slides`?`📊`:`📖`}</span>
                  </div>
                  <div class="lib-preview-details">
                    <h4>${e.title}</h4>
                    <p class="text-muted">${e.author} • ${e.category===`video`?e.duration:e.category===`slides`?e.slideCount+` slides`:e.readTime} • ${e.fileSize}</p>
                  </div>
                  <button class="btn btn-sm btn-outline btn-jump-lib" data-id="${e.id}">View Material</button>
                </div>
              `).join(``)}
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
              ${n.data.news.map(e=>`
                <div class="side-news-item">
                  <div class="news-meta-line">
                    <span class="badge badge-sm ${e.pinned?`badge-primary`:`badge-secondary`}">${e.badge}</span>
                    <span class="news-time">${e.date}</span>
                  </div>
                  <h5>${e.title}</h5>
                  <p class="text-muted small">${e.content}</p>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>
    `,this.mainContent.querySelector(`#btn-hero-match`)?.addEventListener(`click`,()=>{this.activeTab=`matchmaker`,this.renderNavigationTabs(),this.renderActiveView()}),this.mainContent.querySelector(`#btn-side-matchmaker`)?.addEventListener(`click`,()=>{this.activeTab=`matchmaker`,this.renderNavigationTabs(),this.renderActiveView()}),this.mainContent.querySelector(`#btn-hero-quiz`)?.addEventListener(`click`,()=>{this.activeTab=`quizzes`,this.renderNavigationTabs(),this.renderActiveView()}),this.mainContent.querySelector(`#btn-goto-all-quizzes`)?.addEventListener(`click`,()=>{this.activeTab=`quizzes`,this.renderNavigationTabs(),this.renderActiveView()}),this.mainContent.querySelector(`#btn-goto-all-library`)?.addEventListener(`click`,()=>{this.activeTab=`library`,this.renderNavigationTabs(),this.renderActiveView()}),this.mainContent.querySelectorAll(`.btn-jump-quiz`).forEach(e=>{e.addEventListener(`click`,()=>{this.activeTab=`quizzes`,this.renderNavigationTabs(),this.renderActiveView()})}),this.mainContent.querySelectorAll(`.btn-jump-lib`).forEach(e=>{e.addEventListener(`click`,()=>{this.activeTab=`library`,this.renderNavigationTabs(),this.renderActiveView()})})}renderTraineeCertificates(){let e=n.data.currentUser.certificates||[];this.mainContent.innerHTML=`
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
        ${e.map(e=>`
          <div class="certificate-display-card glass-card">
            <div class="cert-card-inner">
              <div class="cert-ribbon-gold">🏆 Distinction Award</div>
              <div class="cert-seal-symbol">⭐</div>
              <h3 class="cert-title">${e.quizTitle}</h3>
              <p class="cert-recipient">Awarded to <strong>${n.data.currentUser.name}</strong></p>
              <div class="cert-meta-row">
                <span>Issue Date: <strong>${e.issuedDate}</strong></span>
                <span>Score: <strong class="text-success">${e.score}</strong></span>
              </div>
              <div class="cert-id-tag">ID: <code>${e.id}</code></div>
              <div class="cert-actions-row">
                <button class="btn btn-sm btn-primary btn-open-cert full-width" data-id="${e.id}">
                  View Full Certificate & Print
                </button>
              </div>
            </div>
          </div>
        `).join(``)}
      </div>
    `,this.mainContent.querySelectorAll(`.btn-open-cert`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget.getAttribute(`data-id`),r=e.find(e=>e.id===n);r&&this.openCertificateModal(r)})})}openCertificateModal(e){this.openModal(`Official Certificate of Achievement`,`
      <div class="certificate-modal-frame" id="printable-certificate">
        <div class="cert-frame-border">
          <div class="cert-header">
            <div class="cert-logo-seal">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
            </div>
            <h3>NexTrain Global Learning Accreditation</h3>
            <p class="cert-subhead">Certificate of Technical Proficiency</p>
          </div>

          <div class="cert-body">
            <p class="cert-presented">This is to officially certify that</p>
            <h1 class="cert-student-name">${n.data.currentUser.name}</h1>
            <p class="cert-demonstration">has successfully completed the comprehensive technical evaluation curriculum for</p>
            <h2 class="cert-course-name">${e.quizTitle}</h2>
            <p class="cert-score-line">demonstrating exceptional proficiency with an evaluated score of <strong>${e.score}</strong>.</p>
          </div>

          <div class="cert-footer-row">
            <div class="cert-sig-block">
              <div class="sig-line">Dr. Sarah Jenkins</div>
              <span>Lead Certification Director</span>
            </div>
            <div class="cert-verification-qr">
              <div class="qr-mock">
                <span>[QR Code]</span>
                <code>${e.id}</code>
              </div>
              <span class="qr-label">Scan to verify authenticity</span>
            </div>
            <div class="cert-sig-block">
              <div class="sig-line">${e.issuedDate}</div>
              <span>Date of Issue</span>
            </div>
          </div>

          <div class="cert-crypto-footer">
            <span>Cryptographic Proof: <code>${e.verificationHash||`0x8f9c2e4b1a7d`}</code></span>
            <span>Credential ID: <code>${e.id}</code></span>
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
    `,(e,t)=>{e.querySelector(`.modal-cancel-btn`).onclick=t,e.querySelector(`#btn-print-certificate`).onclick=()=>{window.print()}})}renderTrainerContent(){this.activeTab===`overview`?this.renderTrainerOverview():this.activeTab===`quizzes`?c(this.mainContent,(e,t)=>this.showToast(e,t),(e,t,n)=>this.openModal(e,t,n),e=>this.openCertificateModal(e)):this.activeTab===`library`?p(this.mainContent,(e,t)=>this.showToast(e,t),(e,t,n)=>this.openModal(e,t,n),this.pwa.isLowData):this.activeTab===`matchmaker`&&this.renderTrainerMatchRequests()}renderTrainerOverview(){let e=n.data.currentUser,t=n.data.quizzes;n.data.library;let r=n.data.matchRequests;this.mainContent.innerHTML=`
      <div class="dashboard-hero glass-panel">
        <div class="hero-left">
          <div class="welcome-tag">👨‍🏫 Trainer Command Suite</div>
          <h2>Welcome, ${e.name}</h2>
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
            <span class="stat-number text-amber">${t.length}</span>
            <span class="stat-title">Quizzes Active</span>
          </div>
          <div class="stat-box">
            <span class="stat-number text-cyan">${r.length}</span>
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
                  ${t.map(e=>`
                    <tr>
                      <td><strong>${e.title}</strong></td>
                      <td><span class="badge badge-secondary">${e.course}</span></td>
                      <td>${e.questions.length} questions</td>
                      <td>${e.timeLimitMinutes} mins</td>
                      <td>${e.passingScore}%</td>
                      <td>
                        <button class="btn btn-sm btn-outline btn-edit-quiz-stub" data-id="${e.id}">Active</button>
                      </td>
                    </tr>
                  `).join(``)}
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
              <span class="badge badge-primary">${r.length}</span>
            </div>
            <div class="match-req-list">
              ${r.map(e=>`
                <div class="match-req-item glass-panel">
                  <div class="req-top">
                    <strong>${e.traineeName}</strong>
                    <span class="badge badge-warning">${e.status}</span>
                  </div>
                  <p class="req-topic">Topic: <strong>${e.topic}</strong></p>
                  <p class="req-note text-muted small">"${e.note}"</p>
                  <div class="req-actions">
                    <button class="btn btn-sm btn-success btn-accept-req" data-id="${e.id}">Accept & Schedule</button>
                  </div>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>
    `,this.mainContent.querySelector(`#btn-trainer-create-quiz`).onclick=()=>{u((e,t)=>this.showToast(e,t),(e,t,n)=>this.openModal(e,t,n),()=>this.renderActiveView())},this.mainContent.querySelector(`#btn-trainer-upload`).onclick=()=>{this.activeTab=`library`,this.renderNavigationTabs(),this.renderActiveView()},this.mainContent.querySelector(`#btn-goto-quiz-tab`).onclick=()=>{this.activeTab=`quizzes`,this.renderNavigationTabs(),this.renderActiveView()},this.mainContent.querySelectorAll(`.btn-accept-req`).forEach(e=>{e.onclick=()=>{this.showToast(`Match request accepted! Session invitation dispatched to trainee.`,`success`)}})}renderTrainerMatchRequests(){let e=n.data.matchRequests;this.mainContent.innerHTML=`
      <div class="matchmaker-header">
        <div>
          <div class="badge-pill">🤝 Smart Matchmaker Pipeline</div>
          <h2>Trainee Coaching Requests</h2>
          <p class="subtitle">Review and accept 1-on-1 coaching requests matched to your skill profile and hourly availability.</p>
        </div>
      </div>

      <div class="match-requests-grid">
        ${e.map(e=>`
          <div class="request-card glass-card">
            <div class="request-card-header">
              <div class="req-user-avatar">🎓</div>
              <div>
                <h4>${e.traineeName}</h4>
                <p class="text-muted">Target Topic: <strong class="text-accent">${e.topic}</strong></p>
              </div>
              <span class="badge badge-warning">${e.status}</span>
            </div>
            <div class="req-body">
              <p><strong>Trainee Note:</strong> "${e.note}"</p>
              <p class="text-muted small">Requested: ${e.date}</p>
            </div>
            <div class="req-footer">
              <button class="btn btn-outline btn-sm">Message Trainee</button>
              <button class="btn btn-primary btn-sm btn-accept-session">Confirm & Book Session</button>
            </div>
          </div>
        `).join(``)}
      </div>
    `,this.mainContent.querySelectorAll(`.btn-accept-session`).forEach(e=>{e.onclick=()=>{this.showToast(`Coaching session confirmed and added to calendar!`,`success`)}})}renderAdminContent(){v(this.mainContent,(e,t)=>this.showToast(e,t),(e,t,n)=>this.openModal(e,t,n),()=>this.renderAnnouncementsBanner())}};window.addEventListener(`DOMContentLoaded`,()=>{window.nextrainApp=new y});