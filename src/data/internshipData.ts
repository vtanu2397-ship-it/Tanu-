/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BranchInternshipGuidance {
  branchId: string;
  branchName: string;
  idealInternshipWindow: string;
  coreSkillsTested: string[];
  recommendedCollegeProjects: {
    title: string;
    focus: string;
    techStack: string;
    whyRecruitersValueIt: string;
  }[];
  keyPreparationPriorities: string[];
  ppoConversionTips: string[];
}

export interface InternshipTimelinePhase {
  season: string;
  timeline: string;
  targetYear: string;
  keyEvents: string[];
  actionItems: string[];
}

export interface RubricComparisonRow {
  dimension: string;
  internshipExpectation: string;
  placementExpectation: string;
  tipForStudents: string;
}

export interface PPOPlaybookRule {
  step: number;
  rule: string;
  tagline: string;
  explanation: string;
  actionableChecklist: string[];
}

export const INTERNSHIP_TIMELINES: InternshipTimelinePhase[] = [
  {
    season: 'Autumn On-Campus Window (Phase 1)',
    timeline: 'July – October (Pre-Final 5th Semester)',
    targetYear: '3rd Year Students (Summer Interns for upcoming summer)',
    keyEvents: [
      'Top product companies (Google, Microsoft, Amazon, Uber, Atlassian) visit campus',
      'Online Coding Assessments (OA) on HackerRank / CodeSignal / Mettle',
      'Virtual technical screening interviews (2-3 rounds)'
    ],
    actionItems: [
      'Have LeetCode Easy & Medium patterns (Arrays, Strings, Trees, Binary Search) polished by June',
      'Prepare 1 clean, verifiable full-stack or deep domain project on GitHub with live demo',
      'Ensure college CGPA is above 7.5 / 8.0 for initial cutoff filters'
    ]
  },
  {
    season: 'Winter Off-Campus & Contest Window (Phase 2)',
    timeline: 'November – February (5th to 6th Semester)',
    targetYear: '2nd & 3rd Year Students',
    keyEvents: [
      'Google STEP (2nd year) applications open',
      'Contest-based hiring: TCS CodeVita, HackWithInfy, Flipkart GRiD, Smart India Hackathon',
      'Startup and mid-market product company openings on Wellfound / LinkedIn'
    ],
    actionItems: [
      'Apply with cold reach-outs / employee referrals on LinkedIn within 48 hours of posting',
      'Participate actively in competitive hiring contests with college team'
    ]
  },
  {
    season: 'Spring Core & Services Window (Phase 3)',
    timeline: 'March – May (6th Semester)',
    targetYear: '3rd Year Students (Fast-track summer allocations)',
    keyEvents: [
      'Core engineering majors (L&T, Tata Motors, Texas Instruments, Schneider, DRDO/ISRO)',
      'IT Services internship-cum-training drives (Infosys InStep, TCS CBO, Cognizant NextGen)',
      'Research and laboratory summer fellowships at IITs / IISc'
    ],
    actionItems: [
      'Brush up core branch fundamentals (Thermodynamics, RCC, Microcontrollers, Machines)',
      'Prepare lab experiment explanations and hardware/CAD simulation artifacts'
    ]
  }
];

export const RUBRIC_COMPARISONS: RubricComparisonRow[] = [
  {
    dimension: 'DSA / Problem Solving Depth',
    internshipExpectation: 'Focus on Easy to Medium fundamentals: Arrays, Hash Maps, Two-Pointers, BFS/DFS, Recursion. Focus on clear clean code and explaining thought process.',
    placementExpectation: 'Medium to Hard LeetCode patterns: Dynamic Programming, Graph shortest paths (Dijkstra), Trie, Segment trees, and time-space proofs under tight pressure.',
    tipForStudents: 'For internships, interviewers evaluate problem-solving intuition and code readability over obscure competitive programming tricks.'
  },
  {
    dimension: 'System Design & Architecture',
    internshipExpectation: 'Almost never asked. High-level questions may only inquire how your college project components communicate (e.g. REST API, client-server).',
    placementExpectation: 'Low-Level Design (LLD / OOP design patterns) or basic High-Level Design (HLD: caching, load balancers, DB indexing) for tier-1 roles.',
    tipForStudents: 'Do not spend 80% of your time studying Distributed Systems for summer internships; invest that time into rock-solid DSA and core coursework.'
  },
  {
    dimension: 'Core Branch Coursework',
    internshipExpectation: 'Evaluates passion for subjects completed in 2nd/3rd year. Questions test definitions, basic formulas, and lab experiments.',
    placementExpectation: 'Rigorous application: boundary failure analysis, manufacturing/VLSI trade-offs, OS deadlocks, and relational query profiling.',
    tipForStudents: 'Be ready to discuss your favorite 2 core subjects and your best lab experiment.'
  },
  {
    dimension: 'Prior Work Experience',
    internshipExpectation: 'Zero prior corporate experience required. Evaluated purely on coursework, GitHub repositories, student clubs, or hackathon prototypes.',
    placementExpectation: 'Prior summer internship or production project experience is heavily probed for engineering maturity and real impact.',
    tipForStudents: 'Highlight open-source contributions, academic mini-projects, and leadership in technical societies.'
  },
  {
    dimension: 'Behavioral & Culture Fit',
    internshipExpectation: 'High emphasis on "Learnability": willingness to ask questions, humility, receptive to constructive feedback, and enthusiasm.',
    placementExpectation: 'Accountability, handling ambiguity, cross-functional collaboration, conflict resolution, and delivering under deadlines.',
    tipForStudents: 'Never pretend to know an answer you do not know in an intern interview; state your hypothesis and ask the interviewer for guidance.'
  }
];

export const PPO_PLAYBOOK: PPOPlaybookRule[] = [
  {
    step: 1,
    rule: 'Align Deliverables in Week 1',
    tagline: 'Define exact success metrics with your host manager upfront.',
    explanation: 'Many interns fail to get a PPO because they assume working hard is enough. On Day 3, ask your manager: "What does an exceptional intern project look like at the end of Week 8?" Document the exact acceptance criteria.',
    actionableChecklist: [
      'Schedule a 30-min 1:1 with your mentor and manager in Week 1',
      'Create a 1-page project design document outlining goals and non-goals',
      'Get explicit sign-off on required vs bonus deliverables'
    ]
  },
  {
    step: 2,
    rule: 'The 20-Minute Rule on Getting Stuck',
    tagline: 'Balance independent investigation with team velocity.',
    explanation: 'If you encounter a blocking bug or tool error, spend 20-30 minutes systematically debugging (check docs, logs, stack traces). If still stuck, write down: 1) What you tried, 2) The exact error, 3) Your hypothesis, and ask your mentor.',
    actionableChecklist: [
      'Always document reproducible steps before pinging senior engineers',
      'Show your mentor the diagnostic steps you already attempted',
      'Maintain an internal engineering log of learnings and solutions'
    ]
  },
  {
    step: 3,
    rule: 'Submit Small, Clean Pull Requests Early',
    tagline: 'Avoid the Week 7 "monster PR" that cannot be merged.',
    explanation: 'Senior engineers hate reviewing a 2,000-line code diff in the last week of an internship. Ship working code in modular increments starting by Week 3. Write unit tests for every change.',
    actionableChecklist: [
      'Keep Pull Requests under 250-300 lines of code',
      'Include clear testing notes, screenshots, and edge cases in the PR description',
      'Address code review comments within 24 hours with polite gratitude'
    ]
  },
  {
    step: 4,
    rule: 'Proactive Mid-Point Feedback Check-In',
    tagline: 'Never wait until the final presentation to discover issues.',
    explanation: 'At the end of Week 4 or Week 5, ask your manager: "If the internship ended today, what areas would I need to strengthen to meet the bar for a full-time return offer?" This gives you 3-4 weeks to course-correct.',
    actionableChecklist: [
      'Request mid-term feedback explicitly focused on return-offer criteria',
      'Do not get defensive; take thorough notes on growth areas',
      'Demonstrate immediate improvement in the subsequent sprint'
    ]
  },
  {
    step: 5,
    rule: 'Exceed in Documentation & Reproducibility',
    tagline: 'Leave the team better than you found it.',
    explanation: 'Intern code is only useful if the full-time team can maintain it after you return to campus. Write an outstanding README, architecture diagram, and deployment runbook.',
    actionableChecklist: [
      'Create step-by-step local setup and environment instructions',
      'Record a 5-minute Loom / video demo walkthrough of your feature',
      'Include comments explaining "Why" decisions were made, not just "What"'
    ]
  },
  {
    step: 6,
    rule: 'Deliver a Compelling Final Demo',
    tagline: 'Connect your engineering code to real business impact.',
    explanation: 'In your final presentation to the engineering director, spend 30% on the problem and metrics, 50% on technical architecture and code, and 20% on future roadmap and gratitude.',
    actionableChecklist: [
      'Quantify your impact (e.g. "reduced latency by 18%", "automated 40 hrs of manual work")',
      'Rehearse your demo live with your mentor 2 days prior to the director review',
      'Send a heartfelt thank-you email to all team members who assisted you'
    ]
  }
];

export const BRANCH_INTERNSHIP_GUIDANCE: Record<string, BranchInternshipGuidance> = {
  cse: {
    branchId: 'cse',
    branchName: 'Computer Science & Engineering',
    idealInternshipWindow: 'Summer after 4th / 6th semester (May – July, 8 to 12 weeks)',
    coreSkillsTested: ['DSA (Easy-Med)', 'OOP Principles', 'Basic SQL & Relational Schema', 'Git Collaboration', 'Clean Coding'],
    recommendedCollegeProjects: [
      {
        title: 'Collaborative Markdown Note-Taking App with Live Sync',
        focus: 'WebSockets, REST APIs, JWT Auth, and Relational Database Schema',
        techStack: 'React, Node.js/Express, SQLite/PostgreSQL, Tailwind CSS',
        whyRecruitersValueIt: 'Demonstrates end-to-end full-stack fluency, state management, and real-time network protocol awareness without third-party template bloat.'
      },
      {
        title: 'CLI-based Multi-threaded File Indexer & Search Engine',
        focus: 'Data Structures (Trie, Inverted Index), Thread Pools, and File I/O',
        techStack: 'Java / C++ / Go, POSIX Threads / Concurrency APIs',
        whyRecruitersValueIt: 'Proves solid understanding of systems programming, thread safety, and algorithmic time complexity beyond standard UI web clones.'
      }
    ],
    keyPreparationPriorities: [
      'Complete 120-150 curated LeetCode problems (Focus: Two Pointers, Trees, Graphs BFS/DFS)',
      'Host projects on GitHub with interactive live deployment links (Vercel, Render)',
      'Prepare 2-minute elevator pitches for your resume projects using the STAR method'
    ],
    ppoConversionTips: [
      'Clarify task acceptance criteria on Day 1 with your mentor',
      'Submit small, test-covered PRs every 3 to 4 days rather than a massive dump at the end'
    ]
  },
  aiml: {
    branchId: 'aiml',
    branchName: 'AI & Machine Learning',
    idealInternshipWindow: 'Summer after 4th / 6th semester (8 to 10 weeks)',
    coreSkillsTested: ['Python (NumPy, Pandas, PyTorch)', 'Supervised Algorithms', 'Model Evaluation & Cross-Validation', 'Data Preprocessing'],
    recommendedCollegeProjects: [
      {
        title: 'Document Q&A RAG System with Semantic Search & Citations',
        focus: 'Vector Embeddings, Chunking Strategies, Cosine Similarity, and API Serving',
        techStack: 'Python, PyTorch / Transformers, ChromaDB, FastAPI, Streamlit',
        whyRecruitersValueIt: 'Demonstrates modern AI engineering, retrieval pipelines, and building working prototypes that provide business value.'
      },
      {
        title: 'Vision-Based Defect Inspection Pipeline with Metric Tracking',
        focus: 'Convolutional Neural Networks, Transfer Learning, and Confusion Matrix Diagnostics',
        techStack: 'PyTorch, OpenCV, Torchvision, Scikit-learn',
        whyRecruitersValueIt: 'Proves the candidate understands model training loops, data augmentation, class imbalance handling, and real evaluation metrics.'
      }
    ],
    keyPreparationPriorities: [
      'Master vectorized NumPy broadcasting and Pandas grouping pipelines without manual loops',
      'Be able to derive and explain the math behind backpropagation, loss functions, and ROC-AUC',
      'Prepare explanations for why a simple baseline often beats an uncalibrated complex neural network'
    ],
    ppoConversionTips: [
      'Establish a strict evaluation benchmark baseline before testing fancy deep learning models',
      'Document training time, inference latency, and memory footprint alongside accuracy metrics'
    ]
  },
  ds: {
    branchId: 'ds',
    branchName: 'Data Science & Analytics',
    idealInternshipWindow: 'Summer after 4th / 6th semester (8 to 12 weeks)',
    coreSkillsTested: ['SQL (Window Functions, Aggregations)', 'Python Exploratory Data Analysis', 'Applied Statistics', 'Tableau / PowerBI BI Dashboards'],
    recommendedCollegeProjects: [
      {
        title: 'E-Commerce Cohort Retention & Churn Risk Analytics',
        focus: 'Cohort Analysis, Customer Lifetime Value (LTV), SQL Window Functions, and Survival Curves',
        techStack: 'PostgreSQL, Python (Pandas, Lifelines), PowerBI / Metabase',
        whyRecruitersValueIt: 'Hiring managers look for commercial acumen: connecting raw database queries to customer churn prevention and revenue impact.'
      },
      {
        title: 'A/B Test Experimentation Simulation & Sample Size Calculator',
        focus: 'Hypothesis Testing, Two-sample T-test, Central Limit Theorem, Statistical Power',
        techStack: 'Python (SciPy, Statsmodels), Streamlit, Altair',
        whyRecruitersValueIt: 'Proves deep grasp of statistical significance, Type I/II errors, and experimental design rather than superficial charting.'
      }
    ],
    keyPreparationPriorities: [
      'Solve 50 complex SQL queries on HackerRank/StrataScratch (RANK, DENSE_RANK, LEAD, LAG, CTEs)',
      'Learn how to clean messy real-world datasets with missing values, skewed tails, and duplicate records'
    ],
    ppoConversionTips: [
      'Always validate data source lineage and row counts before presenting insights to business leaders',
      'Pair every chart with a 1-sentence actionable business recommendation'
    ]
  },
  it: {
    branchId: 'it',
    branchName: 'Information Technology',
    idealInternshipWindow: 'Summer after 4th / 6th semester (8 to 10 weeks)',
    coreSkillsTested: ['Linux Shell Scripting', 'Docker Containerization', 'Cloud Foundations (AWS/GCP)', 'TCP/IP & Networking', 'CI/CD Basics'],
    recommendedCollegeProjects: [
      {
        title: 'Automated Microservices CI/CD Pipeline with Monitoring',
        focus: 'Docker containerization, GitHub Actions CI, Prometheus metrics, and automated rollback',
        techStack: 'Docker, GitHub Actions, AWS EC2 / ECS, Nginx, Grafana',
        whyRecruitersValueIt: 'Shows practical DevOps automation, infrastructure hygiene, and deployment reliability.'
      },
      {
        title: 'Zero-Trust Internal API Gateway with Rate Limiting',
        focus: 'Reverse Proxy, JWT verification, Token Bucket rate limiting, and TLS termination',
        techStack: 'Go / Node.js, Redis, Docker, OpenSSL',
        whyRecruitersValueIt: 'Demonstrates enterprise cybersecurity, defensive coding, and network protocol fundamentals.'
      }
    ],
    keyPreparationPriorities: [
      'Master Linux terminal navigation, bash scripts, permissions, grep/sed/awk, and systemctl',
      'Understand IPv4 CIDR subnetting, DNS resolution flow, and TLS handshake'
    ],
    ppoConversionTips: [
      'Create foolproof infrastructure scripts that any team member can re-run with one command',
      'Document security threat models and permission boundaries'
    ]
  },
  ece: {
    branchId: 'ece',
    branchName: 'Electronics & Communication',
    idealInternshipWindow: 'Summer after 4th / 6th semester (May – July)',
    coreSkillsTested: ['Digital Electronics & Boolean Logic', 'Verilog HDL / SystemVerilog', 'Microcontroller C Programming (ARM Cortex / ESP32)', 'I2C / SPI / UART protocols'],
    recommendedCollegeProjects: [
      {
        title: 'Verilog FSM Controller for SPI Master with Testbench Verification',
        focus: 'Finite State Machine design, non-blocking assignments, clock dividers, and timing waveforms',
        techStack: 'Verilog HDL, ModelSim / Icarus Verilog, GTKWave',
        whyRecruitersValueIt: 'VLSI / chip design teams evaluate whether students can write synthesizable HDL code with clean testbench stimulus.'
      },
      {
        title: 'FreeRTOS Multi-Tasking Sensor Node with DMA Transfer',
        focus: 'Real-Time Operating Systems, Task Priorities, Queues, Interrupt Service Routines (ISR)',
        techStack: 'Embedded C, STM32 / ESP32, FreeRTOS, Logic Analyzer',
        whyRecruitersValueIt: 'Demonstrates professional firmware programming beyond simple Arduino delay loops.'
      }
    ],
    keyPreparationPriorities: [
      'Understand Setup & Hold timing violations, clock skew, and metastable flip-flop recovery',
      'Practice debugging hardware signals using an oscilloscope and logic analyzer'
    ],
    ppoConversionTips: [
      'Annotate timing diagrams in your lab notebook and report boundary clock jitter results',
      'Follow hardware safety rules and verify power rail voltages prior to energizing test boards'
    ]
  },
  eee: {
    branchId: 'eee',
    branchName: 'Electrical & Electronics',
    idealInternshipWindow: 'Summer after 4th / 6th semester (8 to 10 weeks)',
    coreSkillsTested: ['Electrical Machines', 'Power Systems & Fault Analysis', 'MATLAB / Simulink Modeling', 'Control Systems (Bode / Nyquist)'],
    recommendedCollegeProjects: [
      {
        title: 'Closed-Loop PID Speed Control of DC / BLDC Motor in MATLAB',
        focus: 'Transfer functions, root locus, transient overshoot damping, and PWM switching',
        techStack: 'MATLAB / Simulink, Simscape Power Systems, Arduino H-Bridge',
        whyRecruitersValueIt: 'Proves mathematical modeling rigor and hands-on actuator interfacing.'
      },
      {
        title: 'Microgrid Solar PV System with Maximum Power Point Tracking (MPPT)',
        focus: 'Perturb & Observe MPPT algorithm, DC-DC Boost Converter, and Inverter synchronization',
        techStack: 'Simulink, Power Electronics Toolboxes, C Programming',
        whyRecruitersValueIt: 'Directly aligns with renewable energy, electric vehicle (EV), and power engineering internship tracks.'
      }
    ],
    keyPreparationPriorities: [
      'Master transformer equivalent circuit parameters, induction motor slip-torque curves, and 3-phase power calculations',
      'Know Routh-Hurwitz stability criteria and phase/gain margins thoroughly'
    ],
    ppoConversionTips: [
      'Validate numerical simulation models against physical laboratory bench measurements',
      'Emphasize energy efficiency metrics and harmonic distortion compliance'
    ]
  },
  mech: {
    branchId: 'mech',
    branchName: 'Mechanical Engineering',
    idealInternshipWindow: 'Summer after 4th / 6th semester (May – July)',
    coreSkillsTested: ['Thermodynamics & Heat Transfer', 'Engineering Mechanics & SOM', 'CAD Modeling (SolidWorks / Fusion360)', 'Manufacturing Processes & GD&T'],
    recommendedCollegeProjects: [
      {
        title: 'Parametric CAD Modeling & Static FEA Stress Analysis of Suspension Wishbone',
        focus: 'Geometric dimensioning, Von Mises stress, Factor of Safety (FOS), and mass reduction',
        techStack: 'SolidWorks / Fusion 360, ANSYS Mechanical FEA',
        whyRecruitersValueIt: 'Demonstrates professional engineering design workflow from concept sketches to finite element stress verification.'
      },
      {
        title: 'Thermal Heat Sink Optimization for Electronic Enclosures using CFD',
        focus: 'Convective heat transfer, fin geometry optimization, pressure drop, and airflow dynamics',
        techStack: 'ANSYS Fluent / OpenFOAM, SolidWorks CAD',
        whyRecruitersValueIt: 'High demand in consumer electronics, automotive powertrain, and thermal engineering companies.'
      }
    ],
    keyPreparationPriorities: [
      'Understand GD&T symbols (flatness, perpendicularity, position tolerances) and manufacturing fits/limits',
      'Be able to hand-calculate shear force and bending moment diagrams for complex beam loadings'
    ],
    ppoConversionTips: [
      'Spend time understanding shop-floor machine tooling tolerances before finalizing CAD designs',
      'Document design trade-offs between material cost, manufacturability, and safety factors'
    ]
  },
  civil: {
    branchId: 'civil',
    branchName: 'Civil Engineering',
    idealInternshipWindow: 'Summer after 4th / 6th semester (8 to 10 weeks)',
    coreSkillsTested: ['Structural RCC & Steel Design', 'Total Station & GIS Surveying', 'STAAD.Pro / ETABS Modeling', 'Project Planning (CPM / Primavera)'],
    recommendedCollegeProjects: [
      {
        title: 'Multi-Storey Commercial Building Structural Analysis in ETABS / STAAD.Pro',
        focus: 'Dead/Live load combinations, seismic wind analysis (IS 1893 / ASCE 7), and column reinforcement detailing',
        techStack: 'ETABS / STAAD.Pro, AutoCAD, IS Code provisions',
        whyRecruitersValueIt: 'Structural consultancy firms prioritize interns who already know how to model frames and interpret bending moment envelopes.'
      },
      {
        title: 'Highway Alignment Geometric Design & Cut-Fill Earthwork Optimization',
        focus: 'Horizontal/vertical curve design, super-elevation, and mass-haul diagram balancing',
        techStack: 'AutoCAD Civil 3D, Total Station field data, Excel',
        whyRecruitersValueIt: 'Directly applicable to infrastructure giants like L&T, NHAI projects, and urban planning firms.'
      }
    ],
    keyPreparationPriorities: [
      'Master limit state design of reinforced concrete beams and columns according to standard design codes',
      'Understand concrete mix design, water-cement ratio impact, and slump test quality metrics'
    ],
    ppoConversionTips: [
      'Wear PPE and adhere strictly to on-site construction safety guidelines during site inspections',
      'Double check reinforcing bar scheduling against structural drawings before pour operations'
    ]
  }
};
