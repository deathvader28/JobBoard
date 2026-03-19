import { useState, useEffect } from "react";

// ─── 75 Most In-Demand Job Listings (March 2026) ─────────────────────────────
const ALL_JOBS = [
  // ── Frontend ──
  { id: 1,  title: "React Developer",             company: "Razorpay",       location: "Bangalore",  type: "Full-time",   tags: ["React", "JavaScript"],       description: "Build and maintain payment UI components used by millions of merchants across India." },
  { id: 2,  title: "Frontend Engineer",            company: "Swiggy",         location: "Bangalore",  type: "Full-time",   tags: ["React", "TypeScript"],       description: "Own the consumer-facing web app experience for food delivery across 500+ cities." },
  { id: 3,  title: "UI Developer",                 company: "Zoho",           location: "Chennai",    type: "Full-time",   tags: ["HTML", "CSS", "JavaScript"], description: "Create accessible, responsive interfaces for Zoho's suite of SaaS products." },
  { id: 4,  title: "Next.js Developer",            company: "Groww",          location: "Bangalore",  type: "Full-time",   tags: ["Next.js", "React"],          description: "Build performant SSR pages for India's fastest-growing investment platform." },
  { id: 5,  title: "Frontend Intern",              company: "Internshala",    location: "Remote",     type: "Internship",  tags: ["React", "CSS"],              description: "Work on real student-facing features under senior engineers. Stipend: ₹15k/month." },
  { id: 6,  title: "React Native Developer",       company: "CRED",           location: "Bangalore",  type: "Full-time",   tags: ["React Native", "Redux"],     description: "Build premium mobile experiences for India's most design-forward fintech app." },
  { id: 7,  title: "Vue.js Developer",             company: "FreshWorks",     location: "Chennai",    type: "Full-time",   tags: ["Vue.js", "JavaScript"],      description: "Develop scalable frontend modules for CRM and customer support products." },
  { id: 8,  title: "Angular Developer",            company: "Infosys",        location: "Hyderabad",  type: "Full-time",   tags: ["Angular", "TypeScript"],     description: "Maintain and enhance enterprise-grade Angular apps for global banking clients." },

  // ── Backend ──
  { id: 9,  title: "Node.js Backend Developer",    company: "Meesho",         location: "Bangalore",  type: "Full-time",   tags: ["Node.js", "MongoDB"],        description: "Build high-throughput APIs serving 140M+ users on India's social commerce platform." },
  { id: 10, title: "Java Developer",               company: "Wipro",          location: "Pune",       type: "Full-time",   tags: ["Java", "Spring Boot"],       description: "Develop microservices for large-scale enterprise clients in BFSI and retail sectors." },
  { id: 11, title: "Python Developer",             company: "PhonePe",        location: "Bangalore",  type: "Full-time",   tags: ["Python", "Django"],          description: "Write robust backend services powering UPI transactions for 500M+ users." },
  { id: 12, title: "Go Developer",                 company: "Zepto",          location: "Mumbai",     type: "Full-time",   tags: ["Golang", "gRPC"],            description: "Build low-latency backend systems for India's fastest 10-minute grocery delivery." },
  { id: 13, title: "Ruby on Rails Developer",      company: "Shopify India",  location: "Remote",     type: "Full-time",   tags: ["Ruby", "Rails"],             description: "Contribute to Shopify's core commerce platform used by millions of merchants worldwide." },
  { id: 14, title: "Backend Engineer Intern",      company: "Ola",            location: "Bangalore",  type: "Internship",  tags: ["Node.js", "SQL"],            description: "Work on real backend systems — ride matching, pricing, driver APIs. Stipend: ₹20k/month." },
  { id: 15, title: "Scala Developer",              company: "Flipkart",       location: "Bangalore",  type: "Full-time",   tags: ["Scala", "Kafka"],            description: "Build distributed data processing pipelines for Flipkart's recommendation engine." },

  // ── Full Stack ──
  { id: 16, title: "Full Stack Developer",         company: "Notion (India)", location: "Remote",     type: "Full-time",   tags: ["React", "Node.js"],          description: "Build collaborative productivity features used by teams globally." },
  { id: 17, title: "MERN Stack Developer",         company: "Startup (YC)",  location: "Bangalore",  type: "Full-time",   tags: ["MongoDB", "Express", "React"], description: "Early-stage Y Combinator startup seeking strong MERN developers. Equity offered." },
  { id: 18, title: "Full Stack Intern",            company: "Springworks",    location: "Bangalore",  type: "Internship",  tags: ["React", "Node.js"],          description: "Hands-on internship building HR-tech features from frontend to database. ₹18k/month." },
  { id: 19, title: "Django + React Developer",     company: "Licious",        location: "Bangalore",  type: "Full-time",   tags: ["Django", "React"],           description: "Own end-to-end features for India's largest online meat and seafood delivery brand." },
  { id: 20, title: "Full Stack Engineer",          company: "BrowserStack",   location: "Mumbai",     type: "Full-time",   tags: ["TypeScript", "Node.js"],     description: "Build testing infrastructure tools used by 50,000+ companies worldwide." },

  // ── DevOps / Cloud ──
  { id: 21, title: "DevOps Engineer",              company: "Amazon (AWS)",   location: "Hyderabad",  type: "Full-time",   tags: ["AWS", "Docker"],             description: "Design and manage CI/CD pipelines and cloud infrastructure at massive scale." },
  { id: 22, title: "Site Reliability Engineer",    company: "Google",         location: "Hyderabad",  type: "Full-time",   tags: ["Kubernetes", "Go"],          description: "Maintain uptime and reliability for Google Cloud services serving millions of users." },
  { id: 23, title: "Cloud Engineer",               company: "Microsoft Azure", location: "Hyderabad", type: "Full-time",   tags: ["Azure", "Terraform"],        description: "Architect and deploy scalable cloud solutions for enterprise clients on Azure." },
  { id: 24, title: "Kubernetes Engineer",          company: "Juspay",         location: "Bangalore",  type: "Full-time",   tags: ["Kubernetes", "Helm"],        description: "Manage containerized payment infrastructure processing billions of transactions." },
  { id: 25, title: "Platform Engineer",            company: "Dunzo",          location: "Bangalore",  type: "Full-time",   tags: ["GCP", "Terraform"],          description: "Own the developer platform that enables 200+ engineers to ship faster and reliably." },
  { id: 26, title: "DevOps Intern",                company: "ThoughtWorks",   location: "Pune",       type: "Internship",  tags: ["Linux", "Docker"],           description: "Learn enterprise DevOps practices on real client projects. Stipend: ₹25k/month." },

  // ── Data / ML / AI ──
  { id: 27, title: "Data Scientist",               company: "Walmart Labs",   location: "Bangalore",  type: "Full-time",   tags: ["Python", "ML"],              description: "Build predictive models for demand forecasting across 10,000+ Walmart stores globally." },
  { id: 28, title: "Machine Learning Engineer",    company: "Microsoft",      location: "Hyderabad",  type: "Full-time",   tags: ["PyTorch", "Azure ML"],       description: "Deploy large-scale ML models powering Bing search and Microsoft Copilot features." },
  { id: 29, title: "Data Analyst",                 company: "Nykaa",          location: "Mumbai",     type: "Full-time",   tags: ["SQL", "Power BI"],           description: "Analyze customer behavior, funnel metrics, and product performance for India's top beauty brand." },
  { id: 30, title: "AI/ML Intern",                 company: "Samsung R&D",    location: "Bangalore",  type: "Internship",  tags: ["Python", "TensorFlow"],      description: "Research and prototype AI features for Samsung's next-gen mobile products. ₹30k/month." },
  { id: 31, title: "Data Engineer",                company: "Zomato",         location: "Gurgaon",    type: "Full-time",   tags: ["Spark", "Airflow"],          description: "Build real-time data pipelines processing millions of orders and restaurant events daily." },
  { id: 32, title: "NLP Engineer",                 company: "Sarvam AI",      location: "Bangalore",  type: "Full-time",   tags: ["NLP", "Python"],             description: "Build Indian-language AI models for speech and text understanding at India's leading AI lab." },
  { id: 33, title: "Computer Vision Engineer",     company: "Ather Energy",   location: "Bangalore",  type: "Full-time",   tags: ["OpenCV", "PyTorch"],         description: "Develop vision systems for EV fleet monitoring and autonomous riding assistance." },
  { id: 34, title: "Business Analyst",             company: "Paytm",          location: "Noida",      type: "Full-time",   tags: ["Excel", "SQL"],              description: "Translate business problems into data-driven insights for payments and lending products." },
  { id: 35, title: "MLOps Engineer",               company: "Jio Platforms",  location: "Mumbai",     type: "Full-time",   tags: ["MLflow", "Kubernetes"],      description: "Build the infrastructure that takes ML models from experiments to production at Jio scale." },

  // ── Mobile ──
  { id: 36, title: "Android Developer",            company: "Flipkart",       location: "Bangalore",  type: "Full-time",   tags: ["Kotlin", "Jetpack"],         description: "Build and optimize the Flipkart Android app used by 300M+ customers across India." },
  { id: 37, title: "iOS Developer",                company: "Urban Company",  location: "Gurgaon",    type: "Full-time",   tags: ["Swift", "SwiftUI"],          description: "Craft delightful iOS experiences for professionals and customers on India's services marketplace." },
  { id: 38, title: "Flutter Developer",            company: "Khatabook",      location: "Bangalore",  type: "Full-time",   tags: ["Flutter", "Dart"],           description: "Build cross-platform apps helping 10M+ small businesses manage their accounts digitally." },
  { id: 39, title: "Android Intern",               company: "ShareChat",      location: "Bangalore",  type: "Internship",  tags: ["Android", "Java"],           description: "Work on video and social features for India's largest regional social media platform. ₹20k/month." },
  { id: 40, title: "React Native Intern",          company: "Jar App",        location: "Remote",     type: "Internship",  tags: ["React Native", "Firebase"],  description: "Build savings and investment features for India's fastest-growing micro-savings app. ₹15k/month." },

  // ── Cybersecurity ──
  { id: 41, title: "Security Engineer",            company: "Razorpay",       location: "Bangalore",  type: "Full-time",   tags: ["Penetration Testing", "Python"], description: "Identify and fix security vulnerabilities in payment APIs handling billions in transactions." },
  { id: 42, title: "Cybersecurity Analyst",        company: "HCL Tech",       location: "Noida",      type: "Full-time",   tags: ["SIEM", "SOC"],               description: "Monitor and respond to threats for Fortune 500 clients from HCL's security operations center." },
  { id: 43, title: "AppSec Engineer",              company: "Atlassian",      location: "Bangalore",  type: "Full-time",   tags: ["OWASP", "Burp Suite"],       description: "Embed security reviews in engineering teams building Jira, Confluence, and Trello." },

  // ── QA / Testing ──
  { id: 44, title: "QA Engineer",                  company: "BrowserStack",   location: "Mumbai",     type: "Full-time",   tags: ["Selenium", "Jest"],          description: "Build and maintain automation test suites for a platform used by Netflix, Microsoft, and GitHub." },
  { id: 45, title: "SDET",                         company: "Freshworks",     location: "Chennai",    type: "Full-time",   tags: ["Cypress", "Python"],         description: "Own test automation strategy for Freshdesk and Freshsales used by 60,000+ businesses." },
  { id: 46, title: "QA Intern",                    company: "Postman",        location: "Bangalore",  type: "Internship",  tags: ["API Testing", "Postman"],    description: "Test APIs on the world's most popular API platform. Stipend: ₹20k/month." },

  // ── Product / Design ──
  { id: 47, title: "Product Manager",              company: "Myntra",         location: "Bangalore",  type: "Full-time",   tags: ["Roadmapping", "Analytics"],  description: "Define and ship fashion discovery and search features for 50M+ active shoppers." },
  { id: 48, title: "UI/UX Designer",               company: "Zerodha",        location: "Bangalore",  type: "Full-time",   tags: ["Figma", "User Research"],    description: "Design intuitive trading interfaces for India's largest stock broker with 15M+ customers." },
  { id: 49, title: "Product Design Intern",        company: "Canva India",    location: "Remote",     type: "Internship",  tags: ["Figma", "Prototyping"],      description: "Design features for Canva's 150M+ global users. Work with world-class design team. ₹35k/month." },
  { id: 50, title: "Associate Product Manager",    company: "Swiggy",         location: "Bangalore",  type: "Full-time",   tags: ["SQL", "Product Sense"],      description: "Own metrics and roadmap for Swiggy Instamart — fastest growing quick-commerce product in India." },

  // ── Blockchain / Web3 ──
  { id: 51, title: "Blockchain Developer",         company: "Polygon",        location: "Remote",     type: "Full-time",   tags: ["Solidity", "Ethereum"],      description: "Build smart contracts and Layer 2 solutions on Polygon's blockchain infrastructure." },
  { id: 52, title: "Web3 Frontend Developer",      company: "CoinDCX",        location: "Mumbai",     type: "Full-time",   tags: ["React", "ethers.js"],        description: "Build DeFi and crypto trading interfaces for India's largest crypto exchange." },
  { id: 53, title: "Smart Contract Engineer",      company: "WazirX",         location: "Remote",     type: "Full-time",   tags: ["Solidity", "Hardhat"],       description: "Develop and audit smart contracts for trading, staking, and NFT platforms." },

  // ── Embedded / Hardware ──
  { id: 54, title: "Embedded Software Engineer",   company: "Ola Electric",   location: "Bangalore",  type: "Full-time",   tags: ["C", "RTOS"],                 description: "Write firmware for battery management and motor control systems in next-gen electric scooters." },
  { id: 55, title: "IoT Developer",                company: "Bosch India",    location: "Bangalore",  type: "Full-time",   tags: ["C++", "MQTT"],               description: "Build connected device solutions for smart home and industrial automation using IoT protocols." },
  { id: 56, title: "FPGA Engineer",                company: "Intel India",    location: "Hyderabad",  type: "Full-time",   tags: ["VHDL", "Verilog"],           description: "Design and verify FPGA-based hardware accelerators for Intel's data center products." },

  // ── Game Dev ──
  { id: 57, title: "Unity Game Developer",         company: "Nazara Games",   location: "Mumbai",     type: "Full-time",   tags: ["Unity", "C#"],               description: "Build casual and mid-core mobile games for a 100M+ player audience across emerging markets." },
  { id: 58, title: "Unreal Engine Developer",      company: "Rockstar India", location: "Bangalore",  type: "Full-time",   tags: ["Unreal Engine", "C++"],      description: "Work on AAA game development at one of the world's most iconic game studios." },

  // ── SRE / Infrastructure ──
  { id: 59, title: "Infrastructure Engineer",      company: "Dream11",        location: "Mumbai",     type: "Full-time",   tags: ["AWS", "Kafka"],              description: "Build infra that handles 100M+ concurrent users during live cricket match surges." },
  { id: 60, title: "Database Administrator",       company: "HDFC Bank Tech", location: "Mumbai",     type: "Full-time",   tags: ["PostgreSQL", "Oracle"],      description: "Manage mission-critical databases for India's largest private bank serving 80M+ customers." },

  // ── Support / Others ──
  { id: 61, title: "Technical Support Engineer",   company: "Postman",        location: "Bangalore",  type: "Full-time",   tags: ["API", "Troubleshooting"],    description: "Help developers worldwide debug and get the most out of the Postman API platform." },
  { id: 62, title: "Solutions Architect",          company: "Salesforce",     location: "Hyderabad",  type: "Full-time",   tags: ["CRM", "Cloud"],              description: "Design Salesforce solutions for enterprise clients across BFSI, healthcare, and retail." },
  { id: 63, title: "Scrum Master",                 company: "Accenture",      location: "Pune",       type: "Full-time",   tags: ["Agile", "Jira"],             description: "Lead agile ceremonies and remove blockers for cross-functional engineering teams." },
  { id: 64, title: "Technical Writer",             company: "HasuraHQ",       location: "Remote",     type: "Full-time",   tags: ["Documentation", "APIs"],     description: "Write clear, developer-friendly docs for an open-source GraphQL engine used globally." },

  // ── Trending 2026 Roles ──
  { id: 65, title: "Prompt Engineer",              company: "Sarvam AI",      location: "Bangalore",  type: "Full-time",   tags: ["LLMs", "Python"],            description: "Design and evaluate prompts for production AI systems powering Indian-language assistants." },
  { id: 66, title: "AI Product Manager",           company: "Microsoft",      location: "Hyderabad",  type: "Full-time",   tags: ["AI/ML", "Product"],          description: "Define the roadmap for AI-powered features in Microsoft 365 Copilot for the India market." },
  { id: 67, title: "LLM Fine-Tuning Engineer",     company: "Krutrim AI",     location: "Bangalore",  type: "Full-time",   tags: ["LLMs", "PyTorch"],           description: "Fine-tune large language models on Indian datasets at Bhavish Aggarwal's AI startup." },
  { id: 68, title: "RAG Systems Engineer",         company: "Lepton AI",      location: "Remote",     type: "Full-time",   tags: ["RAG", "LangChain"],          description: "Build retrieval-augmented generation pipelines for enterprise knowledge management systems." },
  { id: 69, title: "AI Infrastructure Engineer",   company: "Jio AI Cloud",   location: "Mumbai",     type: "Full-time",   tags: ["CUDA", "Kubernetes"],        description: "Build GPU clusters and AI serving infrastructure for Jio's national AI cloud platform." },
  { id: 70, title: "Generative AI Intern",         company: "TCS Innovation", location: "Remote",     type: "Internship",  tags: ["GenAI", "Python"],           description: "Research and prototype generative AI applications for enterprise clients. ₹25k/month." },
  { id: 71, title: "AR/VR Developer",              company: "Meta India",     location: "Hyderabad",  type: "Full-time",   tags: ["Unity", "Spatial Computing"],description: "Build immersive experiences for Meta Quest and Ray-Ban smart glasses." },
  { id: 72, title: "Quantum Computing Researcher", company: "IBM India",      location: "Bangalore",  type: "Full-time",   tags: ["Qiskit", "Python"],          description: "Research quantum algorithms and circuits on IBM's real quantum hardware." },
  { id: 73, title: "Rust Developer",               company: "Turbopack",      location: "Remote",     type: "Full-time",   tags: ["Rust", "WebAssembly"],       description: "Build blazing-fast developer tooling in Rust for the next generation of web bundlers." },
  { id: 74, title: "Cybersecurity Intern",         company: "Quick Heal",     location: "Pune",       type: "Internship",  tags: ["Ethical Hacking", "Linux"],  description: "Learn real-world threat detection and response at India's leading cybersecurity company. ₹15k/month." },
  { id: 75, title: "Open Source Contributor",      company: "Mozilla",        location: "Remote",     type: "Part-time",   tags: ["JavaScript", "Firefox"],     description: "Contribute to Firefox and Mozilla's open-source ecosystem. Great for freshers building portfolio." },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f0f2f7; --surface: #fff; --border: #e2e6f0;
    --primary: #2563eb; --primary-dk: #1d4ed8;
    --saved: #16a34a;
    --text-1: #0f172a; --text-2: #475569; --text-3: #94a3b8;
    --tag-bg: #eff6ff; --tag-txt: #1d4ed8;
    --radius: 14px;
    --shadow: 0 2px 12px rgba(15,23,42,.07);
    --shadow-lg: 0 8px 30px rgba(15,23,42,.12);
    --t: .18s ease;
  }
  body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--text-1); min-height:100vh; }

  /* Navbar */
  .navbar { background:var(--surface); border-bottom:1px solid var(--border); position:sticky; top:0; z-index:100; box-shadow:var(--shadow); }
  .navbar-inner { max-width:960px; margin:0 auto; padding:0 24px; height:62px; display:flex; align-items:center; justify-content:space-between; }
  .brand { font-family:'Sora',sans-serif; font-size:1.2rem; font-weight:700; color:var(--primary); display:flex; align-items:center; gap:7px; }
  .saved-badge { background:var(--primary); color:#fff; font-size:.72rem; font-weight:700; padding:2px 9px; border-radius:20px; font-family:'Sora',sans-serif; }

  /* Page */
  .page { max-width:960px; margin:0 auto; padding:32px 24px 72px; }

  /* Hero */
  .hero { background:linear-gradient(135deg,#1e3a8a,#2563eb 60%,#6366f1); border-radius:18px; padding:44px 36px; margin-bottom:28px; color:#fff; text-align:center; }
  .hero-title { font-family:'Sora',sans-serif; font-size:clamp(1.5rem,4vw,2.2rem); font-weight:700; margin-bottom:8px; }
  .hero-sub { font-size:.93rem; opacity:.8; margin-bottom:26px; }

  /* Search bar inside hero */
  .hero-search { display:flex; max-width:580px; margin:0 auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,.2); }
  .hero-search input { flex:1; padding:13px 16px; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:.95rem; color:var(--text-1); min-width:0; }
  .hero-search input::placeholder { color:var(--text-3); }
  .hero-search-btn { padding:13px 22px; border:none; background:var(--primary); color:#fff; font-family:'Sora',sans-serif; font-size:.88rem; font-weight:700; cursor:pointer; transition:background var(--t); white-space:nowrap; }
  .hero-search-btn:hover { background:var(--primary-dk); }

  /* Stats row */
  .stats { display:flex; gap:20px; justify-content:center; margin-top:18px; flex-wrap:wrap; }
  .stat { font-size:.8rem; opacity:.75; display:flex; align-items:center; gap:5px; }

  /* Toolbar */
  .toolbar { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:20px; }
  .tab-group { display:flex; background:var(--border); border-radius:10px; padding:3px; }
  .tab-btn { padding:7px 16px; border:none; background:transparent; border-radius:8px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.88rem; font-weight:500; color:var(--text-2); transition:background var(--t),color var(--t); display:flex; align-items:center; gap:5px; }
  .tab-btn.active { background:var(--surface); color:var(--primary); box-shadow:var(--shadow); }
  .pill { font-size:.69rem; font-weight:700; padding:1px 7px; border-radius:20px; background:var(--tag-bg); color:var(--tag-txt); }
  .tab-btn.active .pill { background:var(--primary); color:#fff; }

  /* Filter selects */
  .filter-select { padding:7px 12px; border:1.5px solid var(--border); border-radius:8px; font-family:'DM Sans',sans-serif; font-size:.86rem; color:var(--text-1); background:var(--surface); outline:none; cursor:pointer; transition:border-color var(--t); }
  .filter-select:focus { border-color:var(--primary); }
  .clear-btn { padding:7px 13px; border:1.5px solid var(--border); border-radius:8px; background:var(--surface); color:var(--text-2); cursor:pointer; font-size:.84rem; font-family:'DM Sans',sans-serif; transition:background var(--t); }
  .clear-btn:hover { background:var(--bg); }

  /* Results label */
  .results-label { font-size:.83rem; color:var(--text-3); font-weight:500; margin-bottom:14px; }

  /* Job Card */
  .job-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:20px 20px 16px; margin-bottom:12px; box-shadow:var(--shadow); transition:box-shadow var(--t),border-color var(--t),transform var(--t); animation:fadeUp .3s ease both; }
  .job-card:hover { box-shadow:var(--shadow-lg); border-color:#c7d7f9; transform:translateY(-2px); }
  @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .card-top { display:flex; align-items:flex-start; gap:13px; }
  .logo { width:46px; height:46px; border-radius:10px; background:var(--tag-bg); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-family:'Sora',sans-serif; font-size:.72rem; font-weight:800; color:var(--primary); flex-shrink:0; }
  .job-info { flex:1; min-width:0; }
  .job-title { font-family:'Sora',sans-serif; font-size:.98rem; font-weight:600; color:var(--text-1); margin-bottom:4px; }
  .job-meta { display:flex; gap:12px; flex-wrap:wrap; }
  .meta-item { font-size:.8rem; color:var(--text-2); display:flex; align-items:center; gap:3px; }
  .job-desc { font-size:.85rem; color:var(--text-2); line-height:1.6; margin:10px 0 13px; border-left:3px solid var(--border); padding-left:11px; }
  .card-bottom { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; }
  .tags { display:flex; gap:5px; flex-wrap:wrap; }
  .tag { background:var(--tag-bg); color:var(--tag-txt); font-size:.72rem; font-weight:600; padding:2px 9px; border-radius:20px; font-family:'Sora',sans-serif; }
  .tag.type { background:#faf5ff; color:#7c3aed; }

  /* Save button */
  .save-btn { padding:7px 16px; border:none; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:.86rem; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:5px; white-space:nowrap; transition:background var(--t),transform var(--t),box-shadow var(--t); }
  .save-btn.unsaved { background:var(--primary); color:#fff; }
  .save-btn.unsaved:hover { background:var(--primary-dk); box-shadow:0 4px 12px rgba(37,99,235,.3); }
  .save-btn.saved { background:#f0fdf4; color:var(--saved); border:1.5px solid #bbf7d0; }
  .save-btn.saved:hover { background:#dcfce7; }
  .save-btn:active { transform:scale(.96); }

  /* Empty */
  .empty { text-align:center; padding:56px 20px; }
  .empty-icon { font-size:3.2rem; margin-bottom:12px; }
  .empty-title { font-family:'Sora',sans-serif; font-size:1.05rem; font-weight:700; color:var(--text-1); margin-bottom:5px; }
  .empty-sub { font-size:.87rem; color:var(--text-3); }

  @media(max-width:600px){
    .hero{padding:32px 18px;}
    .hero-search{flex-direction:column;}
    .hero-search-btn{border-radius:0 0 10px 10px;}
    .toolbar{gap:7px;}
  }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name.trim().split(/\s+/).map(w => w[0]).join("").slice(0, 3).toUpperCase();

const loadSaved = () => {
  try { return JSON.parse(localStorage.getItem("jb_saved")) || []; }
  catch { return []; }
};

const TYPES     = ["All Types", "Full-time", "Internship", "Remote", "Part-time", "Hybrid"];
const LOCATIONS = ["All Locations", ...Array.from(new Set(ALL_JOBS.map(j => j.location))).sort()];

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar({ savedCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">💼 JobBoard</div>
        {savedCount > 0 && <span className="saved-badge">🔖 {savedCount} saved</span>}
      </div>
    </nav>
  );
}

function JobCard({ job, isSaved, onToggle, index }) {
  return (
    <div className="job-card" style={{ animationDelay: `${index * 40}ms` }}>
      <div className="card-top">
        <div className="logo">{getInitials(job.company)}</div>
        <div className="job-info">
          <div className="job-title">{job.title}</div>
          <div className="job-meta">
            <span className="meta-item">🏢 {job.company}</span>
            <span className="meta-item">📍 {job.location}</span>
          </div>
        </div>
      </div>

      <p className="job-desc">{job.description}</p>

      <div className="card-bottom">
        <div className="tags">
          <span className="tag type">{job.type}</span>
          {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <button className={`save-btn ${isSaved ? "saved" : "unsaved"}`} onClick={() => onToggle(job)}>
          {isSaved ? "✅ Saved" : "🔖 Save"}
        </button>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [savedJobs,  setSavedJobs]  = useState(loadSaved);
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [locFilter,  setLocFilter]  = useState("All Locations");
  const [viewMode,   setViewMode]   = useState("all"); // "all" | "saved"

  // Persist saves
  useEffect(() => {
    localStorage.setItem("jb_saved", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const toggleSave = (job) => {
    setSavedJobs(prev =>
      prev.some(j => j.id === job.id)
        ? prev.filter(j => j.id !== job.id)
        : [...prev, job]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All Types");
    setLocFilter("All Locations");
  };

  const hasFilters = search || typeFilter !== "All Types" || locFilter !== "All Locations";

  // Filter logic
  const filtered = ALL_JOBS.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase())
      || job.company.toLowerCase().includes(search.toLowerCase())
      || job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === "All Types" || job.type === typeFilter;
    const matchLoc  = locFilter  === "All Locations" || job.location === locFilter;
    return matchSearch && matchType && matchLoc;
  });

  const displayedJobs = viewMode === "all" ? filtered : savedJobs;

  return (
    <>
      <style>{STYLES}</style>
      <Navbar savedCount={savedJobs.length} />

      <main className="page">

        {/* Hero */}
        <div className="hero">
          <h1 className="hero-title">Find your next opportunity 🚀</h1>
          <p className="hero-sub">Browse  hand-picked, high-demand job listings from top companies</p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search by role, company, or skill…"
              value={search}
              onChange={e => { setSearch(e.target.value); setViewMode("all"); }}
            />
            {search && (
              <button className="hero-search-btn" style={{ background: "#64748b" }} onClick={() => setSearch("")}>✕</button>
            )}
            <button className="hero-search-btn">🔍 Search</button>
          </div>

          <div className="stats">
            <span className="stat">💼 {ALL_JOBS.filter(j => j.type === "Full-time").length} Full-time</span>
            <span className="stat">🎓 {ALL_JOBS.filter(j => j.type === "Internship").length} Internships</span>
            <span className="stat">🌐 {ALL_JOBS.filter(j => j.location === "Remote").length} Remote</span>
            <span className="stat">🏙️ {new Set(ALL_JOBS.map(j => j.location)).size} Cities</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="tab-group">
            <button className={`tab-btn ${viewMode === "all" ? "active" : ""}`} onClick={() => setViewMode("all")}>
              All Jobs <span className="pill">{filtered.length}</span>
            </button>
            <button className={`tab-btn ${viewMode === "saved" ? "active" : ""}`} onClick={() => setViewMode("saved")}>
              Saved <span className="pill">{savedJobs.length}</span>
            </button>
          </div>

          {viewMode === "all" && (
            <>
              <select className="filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <select className="filter-select" value={locFilter} onChange={e => setLocFilter(e.target.value)}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
              {hasFilters && <button className="clear-btn" onClick={clearFilters}>✕ Clear</button>}
            </>
          )}
        </div>

        {/* Results count */}
        {!hasFilters && viewMode === "all" && (
          <p className="results-label">Showing all {ALL_JOBS.length} listings</p>
        )}
        {hasFilters && viewMode === "all" && (
          <p className="results-label">Found {filtered.length} job{filtered.length !== 1 ? "s" : ""} matching your search</p>
        )}

        {/* Job List */}
        {displayedJobs.length > 0 ? (
          displayedJobs.map((job, i) => (
            <JobCard
              key={job.id}
              job={job}
              index={i}
              isSaved={savedJobs.some(s => s.id === job.id)}
              onToggle={toggleSave}
            />
          ))
        ) : viewMode === "saved" ? (
          <div className="empty">
            <div className="empty-icon">🗂️</div>
            <div className="empty-title">No saved jobs yet</div>
            <div className="empty-sub">Browse jobs and hit 🔖 Save to bookmark them here.</div>
          </div>
        ) : (
          <div className="empty">
            <div className="empty-icon">🔎</div>
            <div className="empty-title">No jobs found</div>
            <div className="empty-sub">Try a different keyword, type, or location.</div>
          </div>
        )}

      </main>
    </>
  );
}