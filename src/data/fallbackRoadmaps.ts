import { RoadmapPlan, AssessmentResult, RoleBenchmark, StudentProfile, WeeklyPlanItem } from '../types';

export function generatePersonalizedFallbackRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile?: StudentProfile | null
): RoadmapPlan {
  const roleId = assessment?.roleId || benchmark?.id || 'cse-sde';
  const roleTitle = assessment?.roleTitle || benchmark?.title || 'Engineering Specialist';
  const branchName = profile?.branch?.toUpperCase() || benchmark?.branchName || 'Engineering';
  const gaps = assessment?.priorityGaps || [];
  const topGaps = gaps.slice(0, 3).map((g: any) => typeof g === 'string' ? g : g.skillName || g.skill);
  const strengths = assessment?.strengths || ['Engineering Fundamentals', 'Domain Principles'];
  const score = assessment?.overallScore ?? 72;
  const studentName = profile?.displayName || 'Student';

  // Branch & Role specific 30/60/90-Day Roadmap Configurations
  if (roleId.startsWith('cse')) {
    return {
      id: `roadmap-${Date.now()}`,
      roleId,
      roleTitle,
      branchId: 'cse',
      branchName: 'Computer Science & Engineering',
      assessmentId: assessment?.id,
      studentScore: score,
      existingSkills: strengths,
      identifiedGaps: topGaps,
      overview: `Hello ${studentName}! Your verified diagnostic readiness score is ${score}%. With solid existing competencies in ${strengths.slice(0, 2).join(' & ') || 'core coding'}, your strategic 90-day trajectory is engineered to eliminate priority gaps in ${topGaps.join(', ') || 'DSA, OS Concurrency, and DBMS'} and achieve tier-1 product and tech placement readiness.`,
      thirtyDayGoal: "Eliminate priority gaps in advanced Data Structures (Trees, Graphs, DP), master ACID/B+ Tree database internals, and solve 40+ medium coding challenges.",
      sixtyDayGoal: "Design scalable distributed backend systems, eliminate OS concurrency bottlenecks, and complete an end-to-end asynchronous task pipeline capstone.",
      ninetyDayGoal: "Reach top-tier placement speed with timed coding rounds, full-system architecture defense, STAR behavioral mastery, and comprehensive 12-week revision.",
      weeklyPlan: [
        // PHASE 1: 30-DAY SPRINT (Weeks 1 to 4)
        {
          weekNumber: 1,
          phase: '30-day',
          title: "Linear Data Structures & Two-Pointer/Sliding Window",
          focusSkill: "Data Structures & Algorithms",
          objectives: [
            "Two-pointer techniques for array partition and fast/slow pointer cycles",
            "Sliding window optimization for subarray and substring constraints",
            "Monotonic stack and queue patterns for next-greater element problems"
          ],
          handsOnTasks: [
            "Solve 10 Medium LeetCode problems on arrays, strings, and sliding windows",
            "Implement Floyd's Tortoise-and-Hare cycle detection on linked lists with O(1) space"
          ],
          revisionTasks: [
            "Audit Big-O space-time complexity derivation for recursive algorithms",
            "Review amortized array resizing and dynamic memory reallocation mechanics"
          ],
          projectRecommendation: {
            title: "Memory-Efficient LRU Cache Engine",
            description: "Implement an O(1) LRU cache using a doubly linked list and hash map with capacity bounds.",
            tools: ["C++ / Java", "GTest / JUnit", "Git"]
          },
          learningMilestone: "Implement an LRU cache from scratch without library shortcuts in under 25 minutes",
          estimatedHours: 10
        },
        {
          weekNumber: 2,
          phase: '30-day',
          title: "Trees, Graphs & Algorithmic Traversals",
          focusSkill: "Tree & Graph Algorithms",
          objectives: [
            "Binary tree, BST traversals, Lowest Common Ancestor, and diameter calculations",
            "Graph DFS/BFS, cycle detection in directed graphs, and topological sorting (Kahn's algorithm)",
            "Dijkstra's shortest path with min-heap priority queue implementation"
          ],
          handsOnTasks: [
            "Solve 8 Graph & Tree problems covering topological sort and subtree queries",
            "Implement Dijkstra's algorithm and verify edge relaxation on directed weighted graphs"
          ],
          revisionTasks: [
            "Review recursive call-stack space bounds and recursion unrolling",
            "Re-solve the 2 most challenging sliding window problems from Week 1"
          ],
          projectRecommendation: {
            title: "Course Prerequisite Dependency Graph Resolver",
            description: "Build an automated DAG scheduler that detects dependency cycles and generates execution orders.",
            tools: ["TypeScript / Python", "Graphviz", "Jest"]
          },
          learningMilestone: "Write a topological sort and cycle detector cleanly in under 20 minutes without IDE autocomplete",
          estimatedHours: 11
        },
        {
          weekNumber: 3,
          phase: '30-day',
          title: "DBMS Internals, B+ Tree Indexing & ACID Transactions",
          focusSkill: "Database Management Systems",
          objectives: [
            "Clustered vs. non-clustered indexing and B+ Tree node splitting mechanics",
            "ACID transaction properties and SQL isolation levels (Read Committed to Serializable)",
            "Write-ahead logging (WAL) and checkpoint crash recovery protocols"
          ],
          handsOnTasks: [
            "Simulate dirty reads, non-repeatable reads, and phantom reads using concurrent DB transactions",
            "Execute EXPLAIN ANALYZE on a 100,000-row table to eliminate sequential table scans"
          ],
          revisionTasks: [
            "Review 3rd Normal Form and BCNF normalization trade-offs in enterprise schemas",
            "Self-audit: write 5 complex SQL window function queries (ROW_NUMBER, DENSE_RANK, LAG/LEAD)"
          ],
          projectRecommendation: {
            title: "Mini Relational Query Analyzer",
            description: "Build a script that parses query plans, flags unindexed foreign keys, and suggests composite indices.",
            tools: ["PostgreSQL / SQLite", "SQL", "Python"]
          },
          learningMilestone: "Explain B+ Tree page splits and transaction lock contention out loud in simulated interview format",
          estimatedHours: 9
        },
        {
          weekNumber: 4,
          phase: '30-day',
          title: "30-Day Milestone: Dynamic Programming & First Phase Audit",
          focusSkill: "Dynamic Programming & Core Audit",
          objectives: [
            "1D and 2D Dynamic Programming (0/1 Knapsack, Longest Common Subsequence, Edit Distance)",
            "Memoization vs. bottom-up tabulation space optimization techniques",
            "Comprehensive 30-day diagnostic evaluation and priority gap closure review"
          ],
          handsOnTasks: [
            "Solve 6 classic DP problems from scratch with space-optimized states",
            "Complete a timed 90-minute mock coding assessment covering Weeks 1 to 4"
          ],
          revisionTasks: [
            "Re-solve all incorrect problems from your initial SkillPath assessment diagnostic",
            "Conduct self-audit on time-complexity proofs for divide-and-conquer recurrences"
          ],
          projectRecommendation: {
            title: "Dynamic Grid Resource Allocation Simulator",
            description: "Implement a knapsack-based resource scheduler maximizing compute throughput under budget limits.",
            tools: ["Java / C++", "CLI Runner", "Benchmarking Harness"]
          },
          learningMilestone: "Achieve 80%+ on the 30-day timed benchmark assessment and successfully eliminate Phase 1 priority gaps",
          estimatedHours: 12
        },

        // PHASE 2: 60-DAY MID-TERM (Weeks 5 to 8)
        {
          weekNumber: 5,
          phase: '60-day',
          title: "Operating Systems, Concurrency & Thread Synchronization",
          focusSkill: "Operating Systems & Concurrency",
          objectives: [
            "Process vs. thread memory layouts, context switching, and CPU scheduling algorithms",
            "Mutex locks, semaphores, condition variables, and race condition elimination",
            "Deadlock conditions (Coffman conditions) and Banker's algorithm prevention"
          ],
          handsOnTasks: [
            "Build a thread-safe producer-consumer bounded queue with condition variables in C++ or Java",
            "Simulate a dining philosophers deadlock and resolve it using resource hierarchy"
          ],
          revisionTasks: [
            "Review virtual memory paging, TLB hit rates, and page replacement algorithms (LRU, Clock)",
            "Review B+ Tree indexing mechanisms from Week 3"
          ],
          projectRecommendation: {
            title: "Multi-Threaded Work-Stealing Thread Pool",
            description: "Implement a thread pool with dynamic task distribution, worker queues, and shutdown barriers.",
            tools: ["C++17 / Java Concurrency", "POSIX Threads", "CMake / Maven"]
          },
          learningMilestone: "Build and benchmark a thread-safe queue without race conditions under 100 concurrent threads",
          estimatedHours: 11
        },
        {
          weekNumber: 6,
          phase: '60-day',
          title: "Computer Networks & Application Protocols",
          focusSkill: "Computer Networks & Protocols",
          objectives: [
            "OSI vs. TCP/IP model, TCP 3-way handshake, 4-way termination, and sliding window flow control",
            "TCP congestion control algorithms (Slow Start, Congestion Avoidance, Fast Retransmit)",
            "DNS resolution hierarchy, HTTP/1.1 vs. HTTP/2 multiplexing, and TLS handshake security"
          ],
          handsOnTasks: [
            "Capture and inspect TCP packet flags and TLS negotiation using Wireshark / tcpdump",
            "Build a raw TCP socket client-server application handling concurrent connections"
          ],
          revisionTasks: [
            "Self-audit: Trace a URL request from browser keystroke to rendered HTML in 5 clear minutes",
            "Review Dynamic Programming patterns from Week 4"
          ],
          projectRecommendation: {
            title: "HTTP/1.1 Reverse Proxy & Load Balancer",
            description: "Construct a lightweight reverse proxy distributing requests across backend instances with round-robin.",
            tools: ["Go / Node.js / C++", "Socket APIs", "cURL / ApacheBench"]
          },
          learningMilestone: "Articulate TCP flow control vs. congestion control flawlessly in a technical placement mock interview",
          estimatedHours: 10
        },
        {
          weekNumber: 7,
          phase: '60-day',
          title: "Object-Oriented Design & Low-Level System Design (LLD)",
          focusSkill: "Low-Level Design & Design Patterns",
          objectives: [
            "SOLID principles applied to real engineering codebases",
            "Creational, Structural, and Behavioral patterns (Factory, Strategy, Observer, Decorator)",
            "UML class diagrams, modular component decoupling, and schema definitions"
          ],
          handsOnTasks: [
            "Design and code a low-level Parking Lot management system adhering to SOLID principles",
            "Design an extensible Rate Limiter supporting Token Bucket and Leaky Bucket strategies"
          ],
          revisionTasks: [
            "Review thread synchronization primitives from Week 5",
            "Audit memory leak detection tools (Valgrind / AddressSanitizer)"
          ],
          projectRecommendation: {
            title: "Modular Splitwise Expense Sharing Engine",
            description: "Implement expense splitting with multiple split types (Equal, Exact, Percentage) and simplified debts.",
            tools: ["Java / C++ / TypeScript", "Object-Oriented Architecture", "Unit Tests"]
          },
          learningMilestone: "Present and defend an Object-Oriented LLD architecture in 30 minutes following standard rubrics",
          estimatedHours: 10
        },
        {
          weekNumber: 8,
          phase: '60-day',
          title: "60-Day Milestone: Capstone Portfolio Integration & Mid-Term Review",
          focusSkill: "Full Capstone Architecture & Audit",
          objectives: [
            "Integrate multi-threaded concurrency, robust networking, and database persistence into 1 capstone",
            "Complete comprehensive 60-day mid-term assessment and mock screening round",
            "Profile latency, error rates, and bottlenecks on production workloads"
          ],
          handsOnTasks: [
            "Publish and document your primary GitHub capstone repository with architecture diagrams",
            "Conduct a timed 2-hour technical screening exam covering DSA, OS, DBMS, and Networks"
          ],
          revisionTasks: [
            "Review all 8 weeks of algorithmic patterns and make a 1-page formula summary",
            "Audit database query performance and index coverage on your capstone tables"
          ],
          projectRecommendation: {
            title: "Distributed Asynchronous Job Queue with Worker Pool",
            description: "Deploy a high-throughput job queue with persistent storage, worker pools, and automated retries.",
            tools: ["Java / Go / Node.js", "PostgreSQL", "Docker", "GitHub Actions"]
          },
          learningMilestone: "Deliver a production-ready GitHub repository with passing CI/CD, README, and architecture diagrams",
          estimatedHours: 12
        },

        // PHASE 3: 90-DAY PLACEMENT READY (Weeks 9 to 12)
        {
          weekNumber: 9,
          phase: '90-day',
          title: "High-Level System Design (HLD) & Distributed Fundamentals",
          focusSkill: "High-Level System Design",
          objectives: [
            "Horizontal vs. vertical scaling, stateless services, and load balancer strategies",
            "Caching strategies (Cache-Aside, Write-Through), Redis, and CDN edge delivery",
            "CAP theorem, eventual consistency, database sharding, and database replication lag"
          ],
          handsOnTasks: [
            "Architect an end-to-end URL shortener system (TinyURL) handling 10,000 writes/sec",
            "Design a scalable notification dispatch service with message queues (Kafka / RabbitMQ)"
          ],
          revisionTasks: [
            "Review LLD design patterns from Week 7",
            "Solve 4 hard Graph and Dynamic Programming problems under timed conditions"
          ],
          projectRecommendation: {
            title: "Distributed Rate-Limiting Service",
            description: "Build a distributed rate limiter with Redis sliding window logs and token bucket algorithms.",
            tools: ["Redis", "Go / Python / Node.js", "Docker"]
          },
          learningMilestone: "Draw and defend a distributed system architecture on an online whiteboard in 35 minutes",
          estimatedHours: 11
        },
        {
          weekNumber: 10,
          phase: '90-day',
          title: "Company-Specific Recruitment Drills (Google, Microsoft, Amazon, TCS)",
          focusSkill: "Company Placement Patterns",
          objectives: [
            "Analyze recruitment patterns for product giants (Google, Microsoft) vs. service majors (TCS Digital, Infosys)",
            "Aptitude, quantitative reasoning, and logical puzzle solving under strict timers",
            "Mastering common coding problem variations frequently tested by target employers"
          ],
          handsOnTasks: [
            "Complete 3 full-length company placement drills in SkillPath Target Companies module",
            "Solve 5 company-specific coding questions under a 20-minute timer per question"
          ],
          revisionTasks: [
            "Review OS deadlocks, process scheduling, and memory management",
            "Review Computer Network protocols (TCP, UDP, DNS, HTTP/2)"
          ],
          projectRecommendation: {
            title: "Target Company Interview Drill Portfolio",
            description: "Compile and annotate verified solutions to top 20 questions asked by target hiring teams.",
            tools: ["GitHub", "Markdown Documentation", "Test Runners"]
          },
          learningMilestone: "Score 85%+ on a simulated company recruitment online assessment (OA)",
          estimatedHours: 10
        },
        {
          weekNumber: 11,
          phase: '90-day',
          title: "AI Mock Interviews & Technical Behavioral Defense",
          focusSkill: "Mock Interviews & Communication",
          objectives: [
            "Articulate technical approaches clearly before typing a single line of code",
            "Master the STAR method (Situation, Task, Action, Result) for engineering behavioral rounds",
            "Handling curveballs, edge cases, and architectural pushback with professional composure"
          ],
          handsOnTasks: [
            "Conduct 3 AI Mock Technical Interviews in SkillPath AI targeting your dream role",
            "Record and critique your own 2-minute project walkthrough explanation"
          ],
          revisionTasks: [
            "Review your top 3 project architectures, technical challenges, and personal contributions",
            "Audit all priority gap topics from your diagnostic assessment"
          ],
          projectRecommendation: {
            title: "Interview Cheat-Sheet & Architecture Portfolio",
            description: "Create a 1-page visual executive summary of your projects, skills, and benchmark evidence.",
            tools: ["PDF / Markdown", "System Diagrams", "GitHub Pages"]
          },
          learningMilestone: "Complete an AI Mock Interview scoring 85%+ in both technical depth and communication clarity",
          estimatedHours: 10
        },
        {
          weekNumber: 12,
          phase: '90-day',
          title: "90-Day Placement Readiness: Final Master Revision & Placement Launch",
          focusSkill: "Full Curriculum Revision & Placement Readiness",
          objectives: [
            "Comprehensive review across all 12 weeks of DSA, Core Subjects, Design, and Company Rounds",
            "Formula, theorem, and design pattern rapid-fire self-assessment",
            "Final placement readiness verification and mental confidence conditioning"
          ],
          handsOnTasks: [
            "Complete the Final SkillPath Placement Readiness Assessment to certify your 90-day progress",
            "Run through 30 rapid-fire technical questions covering all 5 core CS subjects"
          ],
          revisionTasks: [
            "Review your complete learning log and all completed practical assignments",
            "Double-check your resume links, GitHub repositories, and LinkedIn project showcases"
          ],
          projectRecommendation: {
            title: "Production Placement Portfolio Showcase",
            description: "Finalize your live portfolio showcasing all 3 milestone projects with verifiable documentation.",
            tools: ["GitHub", "Live Demo Hosting", "README Badges"]
          },
          learningMilestone: "Achieve 90%+ Placement Readiness Score and certified completion of the 90-day roadmap",
          estimatedHours: 8
        }
      ],
      portfolioProjects: [
        {
          title: "High-Throughput Concurrent Task Queue with Crash Recovery",
          phase: '30-day',
          targetGaps: topGaps.length ? topGaps : ["DSA", "Operating Systems", "DBMS"],
          problemStatement: "Enterprise backend microservices require resilient job queues that handle bursty async workloads without deadlocks or data loss.",
          toolsUsed: ["C++ / Java / Go", "POSIX Threads", "SQLite / PostgreSQL", "Git"],
          deliverables: [
            "Thread-safe priority task dispatcher with worker pool",
            "Write-ahead logging (WAL) persistence module for crash recovery",
            "Benchmark test report demonstrating throughput under 1,000 concurrent tasks"
          ],
          datasetSuggestion: "Synthetic multi-task workload traces and simulated network latency logs"
        },
        {
          title: "Distributed Scalable Rate Limiter & Reverse Proxy",
          phase: '60-day',
          targetGaps: ["Computer Networks", "Concurrency", "System Design"],
          problemStatement: "High-traffic APIs must prevent DDoS spikes and enforce multi-tenant quotas with sub-millisecond overhead.",
          toolsUsed: ["Go / Node.js / Java", "Redis", "Docker", "ApacheBench"],
          deliverables: [
            "Token Bucket & Sliding Window log algorithms implemented with Redis",
            "Reverse proxy request forwarding with round-robin load distribution",
            "Latency benchmark graphs comparing in-memory vs. distributed state"
          ],
          datasetSuggestion: "Simulated high-concurrency HTTP request workloads with burst spikes"
        },
        {
          title: "End-to-End Distributed Storage & Query Service",
          phase: '90-day',
          targetGaps: ["System Design", "DBMS", "Operating Systems"],
          problemStatement: "Build a fault-tolerant microservice demonstrating horizontal scaling, database sharding, and structured observability.",
          toolsUsed: ["Java / Go / Python", "PostgreSQL Sharding", "Prometheus", "Docker Compose"],
          deliverables: [
            "Consistent hashing client for multi-node database sharding",
            "Prometheus telemetry metrics dashboard monitoring request latencies",
            "Comprehensive technical architecture documentation and deployment guide"
          ],
          datasetSuggestion: "100,000 synthetic transaction records with multi-key queries"
        }
      ],
      gapExplanations: [
        {
          skill: topGaps[0] || "Operating Systems Concurrency",
          plainEnglishExplanation: "Think of an OS thread like a chef in a shared kitchen: if two chefs reach for the exact same pan at once without taking turns (mutex lock), they spill food everywhere (race condition).",
          whyItMattersInRole: "Placement interviewers evaluate concurrency to ensure your backend services run safely under high traffic without deadlocks.",
          fastestWayToMaster: "Write a 30-line multi-threaded counter in C++ or Java and intentionally reproduce a race condition before securing it with a mutex."
        },
        {
          skill: topGaps[1] || "B+ Tree Indexing",
          plainEnglishExplanation: "A database table without an index is like reading a phone book from page 1 to find a name. A B+ Tree is the thumb-index tabs on the edge that let you jump to the exact page in 3 flips.",
          whyItMattersInRole: "Poor query performance in production cripples database throughput and causes downtime during traffic spikes.",
          fastestWayToMaster: "Run EXPLAIN ANALYZE on a PostgreSQL query before and after adding a composite index."
        },
        {
          skill: topGaps[2] || "Graph Traversals & Topological Sorting",
          plainEnglishExplanation: "Think of a dependency graph like assembling furniture: you cannot attach the tabletop before building the legs. Topological sorting finds the exact sequence that respects all prerequisites.",
          whyItMattersInRole: "Used in package managers (npm, pip), build systems (Make), and task orchestrators tested in technical placements.",
          fastestWayToMaster: "Implement Kahn's algorithm using in-degree arrays and a queue on 5 dependency problems."
        }
      ]
    };
  }

  // AI & ML
  if (roleId.startsWith('aiml')) {
    return generateAIMLPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // Data Science
  if (roleId === 'data-scientist') {
    return generateDataSciencePhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // Data Analytics
  if (roleId === 'data-analyst' || roleId === 'data-analyst-intern') {
    return generateDataAnalyticsPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // IT & DevOps
  if (roleId === 'it-cloud-devops') {
    return generateITDevOpsPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // ECE (Embedded & VLSI)
  if (roleId === 'ece-embedded-vlsi') {
    return generateECEPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // EEE (Electrical)
  if (roleId === 'eee-core') {
    return generateEEEPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // Mechanical
  if (roleId === 'mech-design-mfg') {
    return generateMechanicalPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // Civil
  if (roleId === 'civil-structural') {
    return generateCivilPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps);
  }

  // Universal Fallback for any other engineering role
  return generateUniversalPhasedRoadmap(assessment, benchmark, profile, studentName, score, strengths, topGaps, roleId, roleTitle, branchName);
}

// ================= BRANCH-SPECIFIC 30/60/90-DAY GENERATORS =================

function generateAIMLPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'aiml-engineer',
    roleTitle: 'AI & Machine Learning Engineer',
    branchId: 'aiml',
    branchName: 'Artificial Intelligence & Machine Learning',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic score is ${score}%. Leveraging your strengths in ${strengths.slice(0, 2).join(' & ') || 'Python & Mathematics'}, this 90-day trajectory systematically bridges priority gaps in ${topGaps.join(', ') || 'PyTorch autograd, Regularization, and Attention Models'} to prepare you for AI/ML placement benchmarks.`,
    thirtyDayGoal: "Master vectorized numerical computing (NumPy/Pandas), mathematical backpropagation derivations, and core classical ML algorithms with regularization.",
    sixtyDayGoal: "Build deep neural networks (CNNs, RNNs, Transformer Attention), optimize PyTorch training pipelines, and build an end-to-end multimodal classification project.",
    ninetyDayGoal: "Master LLM fine-tuning, model quantization, production inference deployment, ML system design, and complete 90-day revision for campus placements.",
    weeklyPlan: create12WeekPlan(
      'aiml',
      'Artificial Intelligence & Machine Learning',
      [
        { w: 1, p: '30-day', title: 'Vectorized Computing & PyTorch Tensor Autograd', skill: 'Python & Numerical Math', h: 10 },
        { w: 2, p: '30-day', title: 'Classical Supervised Algorithms & Cost Functions', skill: 'Supervised Learning', h: 10 },
        { w: 3, p: '30-day', title: 'Bias-Variance Diagnostics & Regularization (L1/L2/Dropout)', skill: 'Model Generalization', h: 9 },
        { w: 4, p: '30-day', title: '30-Day Milestone: End-to-End Classical ML Pipeline', skill: 'Feature Engineering & Audit', h: 11 },
        { w: 5, p: '60-day', title: 'Deep Neural Networks & Backpropagation from Scratch', skill: 'Deep Learning Foundations', h: 11 },
        { w: 6, p: '60-day', title: 'Convolutional Neural Networks & Computer Vision', skill: 'CNNs & Vision Models', h: 10 },
        { w: 7, p: '60-day', title: 'Sequence Models & Scaled Dot-Product Attention Mechanisms', skill: 'Transformers & NLP', h: 11 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Transformer Architecture & Mid-Term Capstone', skill: 'Transformer Implementation', h: 12 },
        { w: 9, p: '90-day', title: 'MLOps, Model Quantization & Efficient Inference', skill: 'Inference Optimization', h: 10 },
        { w: 10, p: '90-day', title: 'Company AI/ML Placement Drills & DSA Coding', skill: 'Interview Problem Solving', h: 10 },
        { w: 11, p: '90-day', title: 'AI System Design & Behavioral Defense', skill: 'ML System Design', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Comprehensive Revision & Launch', skill: 'Full AI Curriculum Revision', h: 8 }
      ],
      'Python, PyTorch, Scikit-Learn, Hugging Face, Weights & Biases'
    ),
    portfolioProjects: [
      {
        title: "Predictive Customer Churn Pipeline with Explainable AI",
        phase: '30-day',
        targetGaps: ["Feature Engineering", "Regularization", "Model Evaluation"],
        problemStatement: "High-volume subscription platforms require real-time churn risk prediction with feature importance explanations for account managers.",
        toolsUsed: ["Python", "Scikit-Learn", "SHAP", "Streamlit"],
        deliverables: ["Cross-validated gradient boosted model", "SHAP interpretability dashboard", "Evaluation report (ROC-AUC, Precision-Recall)"],
        datasetSuggestion: "Telco Customer Churn Open Benchmark Dataset"
      },
      {
        title: "Fine-Tuned Vision-Language Multi-Class Diagnostic Classifier",
        phase: '60-day',
        targetGaps: ["Deep Learning", "CNNs", "PyTorch"],
        problemStatement: "Automated medical or industrial defect inspection requiring high-precision image classification with confidence calibration.",
        toolsUsed: ["PyTorch", "Torchvision", "FastAPI", "Docker"],
        deliverables: ["Transfer-learning CNN pipeline with data augmentation", "Inference REST API with confidence metrics", "Confusion matrix and PR-curve documentation"],
        datasetSuggestion: "Open Industrial Surface Defect Benchmark Dataset"
      },
      {
        title: "Domain-Adapted LLM Document QA System with RAG Pipeline",
        phase: '90-day',
        targetGaps: ["Transformers", "Vector Databases", "ML System Design"],
        problemStatement: "Enterprises need low-latency, hallucination-resistant question answering across thousands of internal technical manuals.",
        toolsUsed: ["PyTorch", "Hugging Face", "ChromaDB / FAISS", "LangChain"],
        deliverables: ["Chunking and dense vector embedding retrieval pipeline", "RAG query engine with hallucination guardrails", "Performance benchmark analyzing retrieval precision vs. latency"],
        datasetSuggestion: "Public Engineering Technical Documentation Repositories"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Scaled Dot-Product Attention",
        plainEnglishExplanation: "Imagine searching a library: Queries are what you want, Keys are book titles on the shelf, and Values are the actual text inside. Attention calculates how closely each title matches your query and returns a weighted combination of their content.",
        whyItMattersInRole: "Scaled dot-product attention is the foundational engine inside modern Transformer architectures (GPT, BERT, Llama).",
        fastestWayToMaster: "Implement the formula softmax((Q * K.T) / sqrt(d_k)) * V in 10 lines of PyTorch and verify output tensor dimensions."
      },
      {
        skill: topGaps[1] || "Bias-Variance Tradeoff & Regularization",
        plainEnglishExplanation: "Bias is like memorizing only 3 facts and failing on new questions. Variance is like memorizing every single practice question including misprints and failing on real exams. Regularization keeps the model focused on true underlying patterns.",
        whyItMattersInRole: "Placement interviewers will rigorously probe whether your model actually generalizes or is merely overfitting the training set.",
        fastestWayToMaster: "Train a high-degree polynomial regression on noisy data, observe exploding weights, and apply Ridge (L2) regularization to stabilize it."
      }
    ]
  };
}

function generateDataSciencePhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'data-scientist',
    roleTitle: 'Data Scientist & Statistical Modeler',
    branchId: 'ds',
    branchName: 'Data Science & Applied Statistics',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic readiness score is ${score}%. Focusing your 90-day preparation on ${topGaps.join(', ') || 'Statistical Hypothesis Testing, SQL Window Functions, and Predictive Modeling'} will satisfy technical hiring standards for campus Data Science placements.`,
    thirtyDayGoal: "Master advanced SQL (CTEs, Window Functions), exploratory data analysis, and rigorous statistical hypothesis testing (p-values, ANOVA, t-tests).",
    sixtyDayGoal: "Build end-to-end predictive models, perform feature selection, and construct an interactive analytical dashboard with reproducible notebooks.",
    ninetyDayGoal: "Master A/B test design, business ROI metrics, company recruitment test drills, and comprehensive 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'ds',
      'Data Science & Statistics',
      [
        { w: 1, p: '30-day', title: 'Advanced SQL Querying & Relational Aggregations', skill: 'SQL & Database Querying', h: 10 },
        { w: 2, p: '30-day', title: 'Applied Probability & Statistical Hypothesis Testing', skill: 'Inferential Statistics', h: 10 },
        { w: 3, p: '30-day', title: 'Exploratory Data Analysis & Anomaly Detection', skill: 'EDA & Data Cleaning', h: 9 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Statistical Inference & SQL Capstone', skill: 'Statistical Validation', h: 11 },
        { w: 5, p: '60-day', title: 'Supervised Predictive Modeling & Cross-Validation', skill: 'Predictive Modeling', h: 11 },
        { w: 6, p: '60-day', title: 'Unsupervised Clustering & Dimensionality Reduction (PCA)', skill: 'Unsupervised Analysis', h: 10 },
        { w: 7, p: '60-day', title: 'Time-Series Forecasting & Trend Decomposition', skill: 'Time Series', h: 10 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Interactive Machine Learning Dashboard', skill: 'ML Dashboard Integration', h: 12 },
        { w: 9, p: '90-day', title: 'Controlled A/B Testing & Causal Inference', skill: 'Experimentation Design', h: 10 },
        { w: 10, p: '90-day', title: 'Company Placement Tests & Product Analytics Questions', skill: 'Placement Drills', h: 10 },
        { w: 11, p: '90-day', title: 'Technical Interview Defense & Business Storytelling', skill: 'Interview Defense', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final Master Revision', skill: 'Curriculum Revision', h: 8 }
      ],
      'Python, SQL, Pandas, Scikit-Learn, Statsmodels, Tableau / Streamlit'
    ),
    portfolioProjects: [
      {
        title: "Multi-Variant A/B Test Simulation & Causal Impact Engine",
        phase: '30-day',
        targetGaps: ["Statistical Testing", "A/B Testing", "Python"],
        problemStatement: "Measure real conversion lifts while preventing Type I and Type II statistical errors under sample size constraints.",
        toolsUsed: ["Python", "Statsmodels", "SciPy", "Matplotlib"],
        deliverables: ["Sample size calculator with power analysis", "Automated hypothesis test runner with p-value adjustments", "Statistical report with business recommendations"],
        datasetSuggestion: "E-Commerce User Clickstream & Conversion Logs"
      },
      {
        title: "Dynamic Customer Lifetime Value (CLV) & Churn Forecast",
        phase: '60-day',
        targetGaps: ["Predictive Modeling", "SQL", "Feature Engineering"],
        problemStatement: "Identify high-value customer segments and predict 90-day retention probabilities using transaction histories.",
        toolsUsed: ["Python", "PostgreSQL", "XGBoost", "Streamlit"],
        deliverables: ["SQL feature extraction pipeline with window functions", "Tuned predictive model with cross-validated metrics", "Interactive business risk dashboard"],
        datasetSuggestion: "Public Retail Customer Transaction Dataset"
      },
      {
        title: "Time-Series Inventory Demand & Anomaly Forecasting",
        phase: '90-day',
        targetGaps: ["Time Series", "Machine Learning", "System Design"],
        problemStatement: "Forecast multi-warehouse product demand to minimize stockouts and holding costs during seasonal spikes.",
        toolsUsed: ["Python", "Prophet / ARIMA", "FastAPI", "Docker"],
        deliverables: ["Decomposed trend and seasonality model", "Automated anomaly alert system", "REST API for daily inventory replenishment recommendations"],
        datasetSuggestion: "Multi-Store Retail Inventory Demand Benchmark"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Statistical Hypothesis Testing",
        plainEnglishExplanation: "Think of a hypothesis test like a courtroom trial: the null hypothesis is 'innocent' (no real difference). You only convict if the evidence (test statistic) is so overwhelmingly improbable by pure coincidence that the p-value drops below 0.05.",
        whyItMattersInRole: "Data scientists decide multi-million dollar product launches using A/B testing; misunderstanding p-values leads to costly false conclusions.",
        fastestWayToMaster: "Conduct a two-sample t-test in Python on synthetic conversion data and verify confidence intervals against analytical formulas."
      }
    ]
  };
}

function generateDataAnalyticsPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'data-analyst',
    roleTitle: 'Data Analyst & BI Specialist',
    branchId: 'ds',
    branchName: 'Data Analytics',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic readiness score is ${score}%. Focusing on ${topGaps.join(', ') || 'Advanced SQL, Executive Dashboarding, and Data Storytelling'} will ensure you excel in campus recruitment rounds for Data Analytics.`,
    thirtyDayGoal: "Master multi-table SQL queries, window functions (ROW_NUMBER, DENSE_RANK, LAG/LEAD), and Excel business modeling.",
    sixtyDayGoal: "Build enterprise PowerBI / Tableau dashboards, calculate KPI unit economics, and automate ETL data cleaning scripts.",
    ninetyDayGoal: "Master recruitment test cases, company-specific analytics rounds, executive presentation defense, and complete 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'ds',
      'Data Analytics',
      [
        { w: 1, p: '30-day', title: 'SQL Joins, Subqueries & Aggregations', skill: 'SQL Fundamentals', h: 9 },
        { w: 2, p: '30-day', title: 'SQL Window Functions & Analytical Partitioning', skill: 'Advanced SQL', h: 10 },
        { w: 3, p: '30-day', title: 'Data Cleaning & Transformation in Python Pandas', skill: 'Data Cleaning', h: 9 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Multi-Table SQL Diagnostic Audit', skill: 'SQL Mastery Audit', h: 10 },
        { w: 5, p: '60-day', title: 'Interactive BI Dashboards (PowerBI / Tableau)', skill: 'BI Dashboarding', h: 10 },
        { w: 6, p: '60-day', title: 'Cohort Retention & Customer Unit Economics (LTV/CAC)', skill: 'Business Metrics', h: 10 },
        { w: 7, p: '60-day', title: 'Automated Data Extraction & Pipeline Scripting', skill: 'ETL Pipelines', h: 10 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Executive Placement Analytics Portfolio', skill: 'Portfolio Integration', h: 11 },
        { w: 9, p: '90-day', title: 'Company Technical Rounds (TCS, Accenture, MuSigma)', skill: 'Company Drills', h: 10 },
        { w: 10, p: '90-day', title: 'Case Study Frameworks & Root Cause Analysis', skill: 'Root Cause Analytics', h: 10 },
        { w: 11, p: '90-day', title: 'Executive Data Storytelling & Mock Interview', skill: 'Interview Defense', h: 9 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final Master Revision', skill: 'Full Analytics Revision', h: 8 }
      ],
      'SQL, Python (Pandas/Seaborn), PowerBI / Tableau, Excel VBA'
    ),
    portfolioProjects: [
      {
        title: "Executive Revenue & Cohort Retention Analytics Portal",
        phase: '30-day',
        targetGaps: ["SQL Window Functions", "Cohort Analysis", "PowerBI"],
        problemStatement: "Analyze monthly recurring revenue churn across 50,000 customers to identify drop-off drivers.",
        toolsUsed: ["PostgreSQL", "PowerBI / Tableau", "Python"],
        deliverables: ["SQL scripts with CTEs and window functions", "Interactive executive dashboard with drill-downs", "Written 2-page executive summary"],
        datasetSuggestion: "SaaS Subscription Billing Records Benchmark"
      },
      {
        title: "Supply Chain Procurement & Logistics Optimization Dashboard",
        phase: '60-day',
        targetGaps: ["KPI Modeling", "Data Cleaning", "Tableau"],
        problemStatement: "Track supplier lead times and warehouse bottlenecks to decrease shipping delays.",
        toolsUsed: ["Python Pandas", "SQL", "Tableau"],
        deliverables: ["Cleaned procurement dataset with automated sanity checks", "Interactive logistics map and SLA KPI cards", "Cost-saving optimization recommendations"],
        datasetSuggestion: "Global Supply Chain Logistics Benchmark Data"
      },
      {
        title: "E-Commerce Funnel Drop-Off & Conversion Diagnostic",
        phase: '90-day',
        targetGaps: ["Funnel Analytics", "Business Storytelling", "SQL"],
        problemStatement: "Pinpoint where users drop off between product search and final checkout to increase conversion rates.",
        toolsUsed: ["SQL", "Python", "Streamlit", "Excel"],
        deliverables: ["Multi-step funnel query scripts", "Interactive conversion calculator", "Presentation deck ready for recruiter walkthrough"],
        datasetSuggestion: "E-Commerce User Funnel Session Dataset"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "SQL Window Functions",
        plainEnglishExplanation: "A GROUP BY query squashes multiple rows into a single summary row. A Window Function gives you the calculation (like running totals or rankings) while keeping every original row visible.",
        whyItMattersInRole: "Essential in 90% of Data Analyst screening tests to compute running totals, month-over-month growth, and rank percentiles.",
        fastestWayToMaster: "Write ROW_NUMBER(), RANK(), DENSE_RANK(), and LAG() on a 10-row sales table and compare their exact outputs."
      }
    ]
  };
}

function generateITDevOpsPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'it-cloud-devops',
    roleTitle: 'Cloud Architect & DevOps Engineer',
    branchId: 'it',
    branchName: 'Information Technology & Cloud Systems',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic score is ${score}%. Focusing on ${topGaps.join(', ') || 'Docker containerization, Kubernetes orchestration, and CI/CD pipelines'} will position you as a high-demand candidate in IT & DevOps placements.`,
    thirtyDayGoal: "Master Linux system administration, bash automation, Docker containerization, and networking fundamentals (VPC, CIDR, subnets).",
    sixtyDayGoal: "Build automated CI/CD pipelines with GitHub Actions, deploy Kubernetes pods with ingress controllers, and manage Infrastructure-as-Code with Terraform.",
    ninetyDayGoal: "Master cloud security (zero-trust, IAM), observability (Prometheus/Grafana), mock placement drills, and complete 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'it',
      'IT & Cloud DevOps',
      [
        { w: 1, p: '30-day', title: 'Linux Administration, Shell Scripting & Permissions', skill: 'Linux & Scripting', h: 10 },
        { w: 2, p: '30-day', title: 'Containerization Fundamentals with Docker', skill: 'Docker Containerization', h: 10 },
        { w: 3, p: '30-day', title: 'Cloud Networking Architecture (VPC, Subnets, Gateways)', skill: 'Cloud Networking', h: 9 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Multi-Container Application Stack', skill: 'Docker Compose Audit', h: 11 },
        { w: 5, p: '60-day', title: 'Automated CI/CD Pipelines with GitHub Actions', skill: 'CI/CD Automation', h: 11 },
        { w: 6, p: '60-day', title: 'Kubernetes Pods, Deployments & Service Discovery', skill: 'Kubernetes Orchestration', h: 11 },
        { w: 7, p: '60-day', title: 'Infrastructure as Code (IaC) with Terraform', skill: 'Terraform Automation', h: 10 },
        { w: 8, p: '60-day', title: '60-Day Milestone: GitOps Production Deployment', skill: 'GitOps Implementation', h: 12 },
        { w: 9, p: '90-day', title: 'Observability, Distributed Tracing & Grafana Monitoring', skill: 'Cloud Observability', h: 10 },
        { w: 10, p: '90-day', title: 'Cloud Security, Zero-Trust IAM & Secret Management', skill: 'DevSecOps', h: 10 },
        { w: 11, p: '90-day', title: 'Target Company Cloud Drills & Incident Scenarios', skill: 'Mock Troubleshooting', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final DevOps Master Revision', skill: 'Full DevOps Revision', h: 8 }
      ],
      'Linux, Docker, Kubernetes, Terraform, GitHub Actions, AWS / GCP, Prometheus'
    ),
    portfolioProjects: [
      {
        title: "Multi-Tier Microservice Pipeline with Automated CI/CD",
        phase: '30-day',
        targetGaps: ["Docker", "Linux Scripting", "GitHub Actions"],
        problemStatement: "Automate code testing, container building, and staging deployment without manual server interventions.",
        toolsUsed: ["Docker", "GitHub Actions", "Node.js / Python", "Nginx"],
        deliverables: ["Dockerfile with multi-stage build optimization", "Automated GitHub Actions CI workflow", "Compose file with health checks"],
        datasetSuggestion: "Open-source 3-tier web application template"
      },
      {
        title: "Fault-Tolerant Kubernetes Cluster with Auto-Scaling",
        phase: '60-day',
        targetGaps: ["Kubernetes", "Cloud Networking", "IaC"],
        problemStatement: "Deploy a resilient microservice that scales pods automatically when CPU/memory exceed 75% thresholds.",
        toolsUsed: ["Kubernetes (Minikube / Kind)", "Helm", "HPA", "Terraform"],
        deliverables: ["Kubernetes Deployment manifests with readiness/liveness probes", "Horizontal Pod Autoscaler (HPA) configuration", "Terraform provisioning scripts"],
        datasetSuggestion: "Synthetic traffic generator producing burst load spikes"
      },
      {
        title: "Production Observability Stack with Prometheus & Grafana",
        phase: '90-day',
        targetGaps: ["Monitoring", "Cloud Architecture", "DevOps"],
        problemStatement: "Monitor system metrics, error budgets (SLI/SLO), and alert engineers on latency degradations in real time.",
        toolsUsed: ["Prometheus", "Grafana", "Alertmanager", "Docker"],
        deliverables: ["Metrics exporter integrating custom application telemetry", "Grafana operational dashboard displaying P95/P99 latency", "Automated alert rules for service degradation"],
        datasetSuggestion: "Simulated microservice distributed telemetry stream"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Kubernetes Service Discovery & Ingress",
        plainEnglishExplanation: "Pods in Kubernetes die and restart with new IP addresses constantly. A Kubernetes Service acts like a permanent business phone number that automatically redirects calls to whichever employees (pods) are active right now.",
        whyItMattersInRole: "Cloud hiring teams test service discovery to ensure candidates understand resilient container networking.",
        fastestWayToMaster: "Deploy 3 replica pods behind a ClusterIP service, kill a pod, and verify traffic continues without a dropped request."
      }
    ]
  };
}

function generateECEPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'ece-embedded-vlsi',
    roleTitle: 'Embedded Systems & VLSI Engineer',
    branchId: 'ece',
    branchName: 'Electronics & Communication Engineering',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic readiness score is ${score}%. Focusing on ${topGaps.join(', ') || 'Verilog RTL, Static Timing Analysis, and Embedded C Microcontroller Firmware'} will prepare you for top core hardware and semiconductor placement rounds.`,
    thirtyDayGoal: "Master digital logic design, finite state machines (FSM), Verilog RTL synthesis, and peripheral communication protocols (I2C/SPI/UART).",
    sixtyDayGoal: "Design Static Timing Analysis (setup/hold) constraints, write bare-metal embedded C firmware with interrupt service routines, and simulate pipelined processors.",
    ninetyDayGoal: "Master VLSI physical design principles, FPGA hardware implementation, core placement test drills, and complete 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'ece',
      'Embedded & VLSI',
      [
        { w: 1, p: '30-day', title: 'Digital Logic, Boolean Minimization & Combinational Circuits', skill: 'Digital Electronics', h: 10 },
        { w: 2, p: '30-day', title: 'Sequential Logic, Flip-Flops & Finite State Machines', skill: 'Sequential FSM Design', h: 10 },
        { w: 3, p: '30-day', title: 'Verilog RTL Synthesis & Testbench Simulation', skill: 'Verilog RTL', h: 10 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Verilog FSM & Waveform Timing Audit', skill: 'RTL Simulation Audit', h: 11 },
        { w: 5, p: '60-day', title: 'Static Timing Analysis (STA), Setup/Hold Slack & Clock Domains', skill: 'Static Timing Analysis', h: 11 },
        { w: 6, p: '60-day', title: 'Bare-Metal Embedded C, Bitwise Operations & Registers', skill: 'Embedded C Programming', h: 10 },
        { w: 7, p: '60-day', title: 'Interrupt Service Routines (ISR) & Peripheral Buses (I2C/SPI)', skill: 'Hardware Protocols', h: 11 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Pipelined RISC-V Datapath Simulation', skill: 'Processor Architecture', h: 12 },
        { w: 9, p: '90-day', title: 'VLSI CMOS Physical Design & Power-Delay Optimization', skill: 'VLSI Physical Design', h: 10 },
        { w: 10, p: '90-day', title: 'Core Semiconductor Placement Tests (Intel, TI, Qualcomm)', skill: 'Semiconductor Drills', h: 10 },
        { w: 11, p: '90-day', title: 'Hardware Debugging & Technical Interview Defense', skill: 'Interview Defense', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final ECE Master Revision', skill: 'Full ECE Revision', h: 8 }
      ],
      'Verilog HDL, ModelSim / Vivado, Embedded C, ARM Cortex / STM32, Oscilloscope / Logic Analyzers'
    ),
    portfolioProjects: [
      {
        title: "Pipelined 32-Bit RISC-V Processor Core in Verilog",
        phase: '30-day',
        targetGaps: ["Verilog RTL", "Processor Architecture", "Digital Electronics"],
        problemStatement: "Implement a 5-stage instruction pipeline supporting data forwarding, hazard detection, and branch prediction.",
        toolsUsed: ["Verilog HDL", "ModelSim / Icarus Verilog", "GTKWave"],
        deliverables: ["Synthesizable 5-stage pipelined ALU & register file", "Hazard detection and data forwarding unit", "Comprehensive testbench verifying instruction execution"],
        datasetSuggestion: "Standard RISC-V instruction assembly verification test suites"
      },
      {
        title: "Real-Time Sensor Telemetry Hub with I2C/SPI & FreeRTOS",
        phase: '60-day',
        targetGaps: ["Embedded C", "ISRs", "Hardware Protocols"],
        problemStatement: "Collect data from multiple digital sensors using non-blocking interrupt routines and prioritize telemetry transmission.",
        toolsUsed: ["Embedded C", "STM32 / ESP32", "FreeRTOS", "Logic Analyzer"],
        deliverables: ["Bare-metal peripheral drivers for I2C and SPI", "Preemptive RTOS task scheduling implementation", "Signal oscilloscope captures verifying timing closure"],
        datasetSuggestion: "Multi-sensor environmental and IMU accelerometer data streams"
      },
      {
        title: "Static Timing Analysis & Clock Domain Crossing (CDC) Synchronizer",
        phase: '90-day',
        targetGaps: ["STA", "Clock Domains", "VLSI"],
        problemStatement: "Safely transmit multi-bit control vectors between asynchronous clock domains without metastability failures.",
        toolsUsed: ["Verilog", "Synopsys / OpenLane STA tools", "Timing Constraints (SDC)"],
        deliverables: ["2-flip-flop synchronizer with Gray code encoding", "SDC timing constraint file defining setup/hold margins", "Timing slack report demonstrating zero violations"],
        datasetSuggestion: "Dual-clock asynchronous FIFO benchmark architecture"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Setup and Hold Time Violations",
        plainEnglishExplanation: "Imagine taking a photo of a moving athlete: Setup time is getting them to freeze in position BEFORE the camera shutter clicks. Hold time is keeping them still for a split second AFTER the click so the photo isn't blurred (metastable).",
        whyItMattersInRole: "Semiconductor chip companies test setup/hold slack in every interview to prevent chip manufacturing failures.",
        fastestWayToMaster: "Calculate maximum operating frequency from T_clk >= T_cq + T_comb + T_setup on 5 different circuit paths."
      }
    ]
  };
}

function generateEEEPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'eee-core',
    roleTitle: 'Power & Electrical Systems Engineer',
    branchId: 'eee',
    branchName: 'Electrical & Electronics Engineering',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic readiness score is ${score}%. Focusing on ${topGaps.join(', ') || 'Power Systems Fault Analysis, Transformer Dynamics, and Closed-Loop Control Tuning'} will prepare you for competitive core power, PSU, and energy sector placements.`,
    thirtyDayGoal: "Master electrical machines (transformers, induction motors), transmission line parameters, and Routh-Hurwitz / Bode stability criteria.",
    sixtyDayGoal: "Simulate symmetrical and unsymmetrical power system faults, design protective relaying curves, and tune closed-loop PID motor controllers.",
    ninetyDayGoal: "Master power electronics converters (inverters, buck/boost), smart grid integration, placement technical test drills, and complete 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'eee',
      'Power & Electrical Systems',
      [
        { w: 1, p: '30-day', title: 'Transformers: Magnetic Circuits & Efficiency Optimization', skill: 'Transformer Dynamics', h: 10 },
        { w: 2, p: '30-day', title: 'Induction & Synchronous Machines: Slip-Torque Characteristics', skill: 'Electrical Machines', h: 10 },
        { w: 3, p: '30-day', title: 'Control Systems: State Space, Transfer Functions & Root Locus', skill: 'Control Systems', h: 10 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Machine Efficiency & Stability Audit', skill: 'Machine Simulation Audit', h: 11 },
        { w: 5, p: '60-day', title: 'Power System Modeling, Ferranti Effect & Surge Impedance', skill: 'Power Transmission', h: 11 },
        { w: 6, p: '60-day', title: 'Symmetrical & Unsymmetrical Fault Analysis (LG, LL, LLG)', skill: 'Fault Analysis', h: 11 },
        { w: 7, p: '60-day', title: 'Power Electronics: Buck/Boost Converters & PWM Inverters', skill: 'Power Electronics', h: 10 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Grid Transient & Fault Protection Simulation', skill: 'Protection Systems', h: 12 },
        { w: 9, p: '90-day', title: 'Closed-Loop PID Tuning & State-Feedback Compensation', skill: 'Feedback Control', h: 10 },
        { w: 10, p: '90-day', title: 'PSU & Core Industry Placement Drills (L&T, Tata Power, BHEL)', skill: 'Core Industry Drills', h: 10 },
        { w: 11, p: '90-day', title: 'Single-Line Diagrams & Industrial Interview Defense', skill: 'System Defense', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final Electrical Master Revision', skill: 'Full EEE Revision', h: 8 }
      ],
      'MATLAB / Simulink, PSCAD / ETAP, C/C++ Embedded, DigSILENT PowerFactory'
    ),
    portfolioProjects: [
      {
        title: "Transmission Line Symmetrical Fault & Relay Protection Model",
        phase: '30-day',
        targetGaps: ["Fault Analysis", "Power Systems", "Relaying"],
        problemStatement: "Model a 400kV transmission grid and calculate short-circuit MVA under symmetrical 3-phase and single-line-to-ground faults.",
        toolsUsed: ["MATLAB / Simulink", "Power System Toolbox", "ETAP"],
        deliverables: ["Per-unit sequence network impedance model", "Fault current waveforms and circuit breaker tripping curves", "Relay coordination report"],
        datasetSuggestion: "IEEE 14-Bus Test System Standard Grid Parameters"
      },
      {
        title: "Closed-Loop Field-Oriented Control (FOC) Induction Motor Drive",
        phase: '60-day',
        targetGaps: ["Electrical Machines", "Power Electronics", "Control Systems"],
        problemStatement: "Regulate motor speed and torque dynamically under varying mechanical load transitions with minimal ripple.",
        toolsUsed: ["Simulink", "Space Vector PWM (SVPWM)", "PID Controllers"],
        deliverables: ["Simulink model implementing Clarke/Park transformations", "Dynamic response graphs under 50% step-load disturbance", "Harmonic analysis report demonstrating THD < 5%"],
        datasetSuggestion: "Standard Induction Motor Nameplate Parameters"
      },
      {
        title: "Grid-Tied Solar Photovoltaic Inverter with MPPT Algorithm",
        phase: '90-day',
        targetGaps: ["Power Electronics", "Grid Integration", "Renewable Energy"],
        problemStatement: "Extract maximum solar power under varying irradiance and inject synchronized sinusoidal current into the grid.",
        toolsUsed: ["MATLAB", "Perturb & Observe MPPT", "Phase Locked Loop (PLL)"],
        deliverables: ["MPPT tracking model maintaining peak efficiency under irradiance swings", "Grid-synchronized inverter with unity power factor control", "Simulated power export report under fluctuating solar radiation"],
        datasetSuggestion: "Solar Radiation & Temperature Time-Series Profiles"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Ferranti Effect & Reactive Compensation",
        plainEnglishExplanation: "Imagine pushing water through an elastic pipe: if you close the valve at the end suddenly, water piles up and the pressure at the end becomes higher than where you started. Under light loads, line capacitance causes voltage at the receiving end to exceed the sending end.",
        whyItMattersInRole: "Core power transmission companies test reactive compensation to ensure students can design safe voltage regulation.",
        fastestWayToMaster: "Derive the receiving-end voltage equation V_R = V_S / (1 - (omega^2 * L * C) / 2) and solve for shunt reactor ratings."
      }
    ]
  };
}

function generateMechanicalPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'mech-design-mfg',
    roleTitle: 'Mechanical Design & Manufacturing Engineer',
    branchId: 'mech',
    branchName: 'Mechanical Engineering',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic readiness score is ${score}%. Focusing on ${topGaps.join(', ') || 'FEA Stress Analysis, Thermodynamic Power Cycles, and GD&T Manufacturing Tolerances'} will ensure you excel in core automotive, aerospace, and manufacturing recruitment rounds.`,
    thirtyDayGoal: "Master strength of materials (Mohr's circle, shear force/bending moment), Rankine/Brayton thermodynamic cycles, and 3D CAD modeling fundamentals.",
    sixtyDayGoal: "Perform FEA static structural stress analysis, calculate metal cutting shear angles (Merchant circle), and apply GD&T industrial drawings.",
    ninetyDayGoal: "Master CNC G-Code generation, fatigue failure criteria (Soderberg/Goodman), placement technical drills, and complete 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'mech',
      'Mechanical Design & Manufacturing',
      [
        { w: 1, p: '30-day', title: 'Strength of Materials: Stress Tensors, Principal Stresses & Mohr Circle', skill: 'Strength of Materials', h: 10 },
        { w: 2, p: '30-day', title: 'Bending Moments, Shear Stresses & Deflection of Beams', skill: 'Structural Mechanics', h: 10 },
        { w: 3, p: '30-day', title: 'Applied Thermodynamics: Rankine & Brayton Power Cycles', skill: 'Thermodynamics', h: 10 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Structural Stress & Thermal Efficiency Audit', skill: 'Mechanical Analysis Audit', h: 11 },
        { w: 5, p: '60-day', title: '3D CAD Modeling & Geometric Dimensioning & Tolerancing (GD&T)', skill: 'CAD & GD&T', h: 11 },
        { w: 6, p: '60-day', title: 'Finite Element Analysis (FEA): Meshing & Von Mises Yield Criterion', skill: 'FEA Simulation', h: 11 },
        { w: 7, p: '60-day', title: 'Manufacturing Science: Orthogonal Cutting & Merchant Circle Force Balance', skill: 'Machining Mechanics', h: 10 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Validated FEA Structural Component Report', skill: 'FEA Component Design', h: 12 },
        { w: 9, p: '90-day', title: 'Fatigue Failure Criteria (S-N Curves, Goodman & Soderberg)', skill: 'Fatigue & Reliability', h: 10 },
        { w: 10, p: '90-day', title: 'Core Mechanical Placement Drills (Tata Motors, L&T, Mahindra)', skill: 'Core Auto & Mfg Drills', h: 10 },
        { w: 11, p: '90-day', title: 'Engineering Drawings & Design Defense Interview Practice', skill: 'Drawing Defense', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final Mechanical Master Revision', skill: 'Full Mechanical Revision', h: 8 }
      ],
      'SolidWorks / Fusion360, ANSYS Mechanical, MATLAB, AutoCAD, MasterCAM'
    ),
    portfolioProjects: [
      {
        title: "FEA Structural Topology & Stress Optimization of Aircraft Bracket",
        phase: '30-day',
        targetGaps: ["FEA Stress Analysis", "Strength of Materials", "CAD"],
        problemStatement: "Reduce bracket component mass by 30% while maintaining safety factor >= 1.8 under 5kN multidirectional loading.",
        toolsUsed: ["SolidWorks / Fusion 360", "ANSYS Mechanical", "MATLAB"],
        deliverables: ["Parametric 3D CAD model with generative topology optimization", "Von Mises stress and deformation contour plots", "Detailed technical analysis report with mesh convergence proof"],
        datasetSuggestion: "Standard Aerospace Titanium Ti-6Al-4V Material Properties"
      },
      {
        title: "Thermodynamic Combined Cycle Gas-Steam Turbine Optimization",
        phase: '60-day',
        targetGaps: ["Thermodynamics", "Thermal Engineering", "MATLAB"],
        problemStatement: "Optimize reheat pressure and turbine inlet temperatures to maximize combined thermal cycle efficiency.",
        toolsUsed: ["MATLAB", "Engineering Equation Solver (EES)", "Thermodynamic Tables"],
        deliverables: ["First and Second Law thermodynamic energy/exergy balance", "T-s and h-s diagrams with varying boiler pressures", "Sensitivity analysis of ambient temperature on plant heat rate"],
        datasetSuggestion: "Standard Gas Turbine Performance & Steam Enthalpy Tables"
      },
      {
        title: "Orthogonal Metal Cutting Force & Tool Wear Predictor",
        phase: '90-day',
        targetGaps: ["Manufacturing", "Merchant Circle", "Machining"],
        problemStatement: "Calculate cutting forces and shear plane temperatures to optimize CNC tool life and surface roughness.",
        toolsUsed: ["Merchant Circle Mechanics", "MATLAB", "G-Code Simulator"],
        deliverables: ["Mathematical model predicting shear angle and cutting power", "Tool life curve (Taylor's tool life equation) under varying feeds", "Validated CNC program with optimal toolpath parameters"],
        datasetSuggestion: "Standard Steel Machining Cutting Force & Tool Wear Data"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Von Mises Yield Criterion",
        plainEnglishExplanation: "Imagine stretching a metal bar in 3 directions at once: simple tensile strength doesn't tell you when it bends. Von Mises combines all 3 stresses into one 'equivalent' stress that tells you when the material actually yields.",
        whyItMattersInRole: "Core design teams (automotive, aerospace) test yield criteria in every technical interview to verify structural integrity.",
        fastestWayToMaster: "Write the formula sigma_v = sqrt(0.5 * ((s1-s2)^2 + (s2-s3)^2 + (s3-s1)^2)) and calculate it for pure shear stress."
      }
    ]
  };
}

function generateCivilPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[]
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId: 'civil-structural',
    roleTitle: 'Structural & Project Infrastructure Engineer',
    branchId: 'civil',
    branchName: 'Civil & Structural Engineering',
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your verified diagnostic readiness score is ${score}%. Focusing on ${topGaps.join(', ') || 'Under-Reinforced RCC Design, Limit State Safety Factors, and CPM Project Scheduling'} will prepare you for competitive core infrastructure, EPC, and construction placements.`,
    thirtyDayGoal: "Master structural analysis (shear force, bending moments), limit state concrete design principles, and surveying error balancing (Bowditch method).",
    sixtyDayGoal: "Design multi-story RCC frames (columns, beams, footings), perform geotechnical soil bearing capacity analysis, and model CPM construction schedules.",
    ninetyDayGoal: "Master earthquake-resistant detailing, bill of quantities (BOQ), company placement drills (L&T Construction, Shapoorji), and complete 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'civil',
      'Civil & Structural Engineering',
      [
        { w: 1, p: '30-day', title: 'Determinate & Indeterminate Structural Analysis', skill: 'Structural Analysis', h: 10 },
        { w: 2, p: '30-day', title: 'Limit State RCC Design: Under-Reinforced Singly/Doubly Reinforced Beams', skill: 'RCC Design', h: 10 },
        { w: 3, p: '30-day', title: 'Advanced Geomatics: Total Station EDM & Bowditch Traverse Balancing', skill: 'Surveying & Geomatics', h: 10 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Structural Limit State & Surveying Audit', skill: 'RCC & Surveying Audit', h: 11 },
        { w: 5, p: '60-day', title: 'RCC Column & Isolated Footing Design with Shear Checks', skill: 'Foundation Engineering', h: 11 },
        { w: 6, p: '60-day', title: 'Geotechnical Soil Mechanics: Terzaghi Bearing Capacity & Settlement', skill: 'Soil Mechanics', h: 11 },
        { w: 7, p: '60-day', title: 'Construction Planning: CPM Critical Path & Total Float Buffers', skill: 'Construction Management', h: 10 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Complete Structural RCC Frame & Schedule Package', skill: 'Building Frame Package', h: 12 },
        { w: 9, p: '90-day', title: 'Earthquake-Resistant Ductile Detailing (IS 13920 / Codal Standards)', skill: 'Seismic Design', h: 10 },
        { w: 10, p: '90-day', title: 'Core Infrastructure Placement Drills (L&T ECC, Afcons, Tata Projects)', skill: 'Core Civil Drills', h: 10 },
        { w: 11, p: '90-day', title: 'AutoCAD Structural Drawings & Construction Defense', skill: 'Drawing Defense', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final Civil Master Revision', skill: 'Full Civil Revision', h: 8 }
      ],
      'STAAD.Pro / ETABS, AutoCAD, Primavera P6 / MS Project, MS Excel'
    ),
    portfolioProjects: [
      {
        title: "Seismic-Resistant G+4 Commercial Building Analysis & RCC Design",
        phase: '30-day',
        targetGaps: ["RCC Design", "Structural Analysis", "IS Codes"],
        problemStatement: "Design structural framing for a G+4 commercial building under dead, live, and seismic lateral forces adhering to limit state design.",
        toolsUsed: ["STAAD.Pro / ETABS", "AutoCAD", "Excel"],
        deliverables: ["3D structural analysis model with bending moment envelopes", "Reinforcement detailing drawings for critical beams and columns", "Comprehensive limit state calculation report"],
        datasetSuggestion: "Standard Seismic Zone Parameters and Dead/Live Load Codal Specifications"
      },
      {
        title: "Geotechnical Deep Foundation Design & Settlement Prediction",
        phase: '60-day',
        targetGaps: ["Soil Mechanics", "Foundation Design", "Geotechnical"],
        problemStatement: "Determine pile group bearing capacity and immediate/consolidation settlement in clayey soils for an industrial structure.",
        toolsUsed: ["Terzaghi & Meyerhof Formulas", "Excel", "PLAXIS / Geotech Tools"],
        deliverables: ["Borehole soil log analysis report", "Pile group capacity and settlement safety factor calculations", "Structural drawing showing pile cap reinforcement"],
        datasetSuggestion: "Standard Soil Borehole Test Reports and SPT N-Values"
      },
      {
        title: "Construction CPM Schedule & Cash Flow Resource Optimization",
        phase: '90-day',
        targetGaps: ["Construction Management", "CPM", "Cost Optimization"],
        problemStatement: "Formulate a critical path construction schedule for a bridge or highway project minimizing project duration and avoiding liquidity bottlenecks.",
        toolsUsed: ["Primavera P6 / MS Project", "Excel", "CPM Network Diagrams"],
        deliverables: ["CPM network diagram identifying critical path and float buffers", "Resource-leveled labor and equipment allocation histogram", "Cash flow S-curve tracking cumulative project expenditures"],
        datasetSuggestion: "Standard Infrastructure Project Work Breakdown Structure (WBS)"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Under-Reinforced RCC Design",
        plainEnglishExplanation: "In an under-reinforced concrete beam, we deliberately put less steel than concrete can hold. If overloaded, the steel stretches like taffy first—giving visible cracks and sag warning tenants to evacuate safely—rather than the concrete abruptly exploding without warning.",
        whyItMattersInRole: "Building safety codes strictly mandate under-reinforced design to prevent catastrophic sudden brittle failure.",
        fastestWayToMaster: "Set C = T (0.36 * fck * b * xu = 0.87 * fy * Ast) and verify xu < xu_max."
      }
    ]
  };
}

function generateUniversalPhasedRoadmap(
  assessment: AssessmentResult | null,
  benchmark: RoleBenchmark,
  profile: StudentProfile | null | undefined,
  studentName: string,
  score: number,
  strengths: string[],
  topGaps: string[],
  roleId: string,
  roleTitle: string,
  branchName: string
): RoadmapPlan {
  return {
    id: `roadmap-${Date.now()}`,
    roleId,
    roleTitle,
    branchId: 'universal',
    branchName,
    assessmentId: assessment?.id,
    studentScore: score,
    existingSkills: strengths,
    identifiedGaps: topGaps,
    overview: `Hello ${studentName}! Your diagnostic assessment for ${roleTitle} is complete with a score of ${score}%. Focusing on ${topGaps.join(', ') || 'core technical competencies and structured engineering problem solving'} will maximize your performance across upcoming recruitment rounds.`,
    thirtyDayGoal: `Master foundational equations, core syntax, and eliminate priority gaps in ${topGaps[0] || 'core engineering'}.`,
    sixtyDayGoal: "Build a production-grade capstone project, apply practical tools, and master intermediate domain systems.",
    ninetyDayGoal: "Achieve top-tier placement speed with timed drills, architectural defense, and comprehensive 90-day revision.",
    weeklyPlan: create12WeekPlan(
      'universal',
      roleTitle,
      [
        { w: 1, p: '30-day', title: 'Foundational Theory & Core Equations Review', skill: topGaps[0] || 'Domain Foundations', h: 9 },
        { w: 2, p: '30-day', title: 'Analytical Problem Solving & Tradeoff Analysis', skill: 'Analytical Engineering', h: 10 },
        { w: 3, p: '30-day', title: 'Practical Toolchain & Simulation Setup', skill: 'Toolchain Mastery', h: 10 },
        { w: 4, p: '30-day', title: '30-Day Milestone: Core Diagnostics & Gap Audit', skill: 'Diagnostic Audit', h: 11 },
        { w: 5, p: '60-day', title: 'Intermediate System Design & Component Integration', skill: 'System Design', h: 10 },
        { w: 6, p: '60-day', title: 'Practical Hands-On Case Studies & Edge Cases', skill: 'Applied Engineering', h: 10 },
        { w: 7, p: '60-day', title: 'Optimization, Efficiency & Reliability Standards', skill: 'Optimization', h: 10 },
        { w: 8, p: '60-day', title: '60-Day Milestone: Capstone Portfolio Milestone', skill: 'Portfolio Implementation', h: 11 },
        { w: 9, p: '90-day', title: 'Company-Specific Recruitment Tests & Problem Types', skill: 'Placement Drills', h: 10 },
        { w: 10, p: '90-day', title: 'Timed Problem Solving & Quantitative Reasoning', skill: 'Timed Problem Solving', h: 10 },
        { w: 11, p: '90-day', title: 'Technical Interview Storytelling & Defense Practice', skill: 'Interview Defense', h: 10 },
        { w: 12, p: '90-day', title: '90-Day Placement Readiness: Final Master Revision', skill: 'Full Curriculum Revision', h: 8 }
      ],
      'Standard Domain Frameworks, Git, Simulation & Testing Tools'
    ),
    portfolioProjects: [
      {
        title: `${roleTitle} Milestone Phase 1 Prototype`,
        phase: '30-day',
        targetGaps: topGaps.length ? topGaps : ["Domain Foundations", "Analysis"],
        problemStatement: `An industry team needs a validated prototype for a foundational challenge in ${roleTitle}.`,
        toolsUsed: ["Industry Frameworks", "Git", "Simulation Software"],
        deliverables: ["Mathematical specification", "Validated prototype code / model", "Baseline test report"],
        datasetSuggestion: "Public open domain benchmarks and datasets"
      },
      {
        title: `${roleTitle} Integrated Production Capstone`,
        phase: '60-day',
        targetGaps: ["System Integration", "Applied Engineering"],
        problemStatement: `Build an end-to-end engineered solution addressing realistic performance, reliability, and edge-case constraints in ${roleTitle}.`,
        toolsUsed: ["Domain Toolchain", "Automation Scripts", "Docker / Version Control"],
        deliverables: ["Full architectural design documentation", "Tested codebase / CAD model / schematic", "Benchmark verification report"],
        datasetSuggestion: "Industrial open benchmark repository"
      },
      {
        title: `${roleTitle} Placement Defense Showcase`,
        phase: '90-day',
        targetGaps: ["Portfolio Presentation", "Interview Defense"],
        problemStatement: `Create an executive-level portfolio project demonstrating end-to-end design, implementation, and quantified outcomes ready for placement interviewers.`,
        toolsUsed: ["Full Technology Stack", "Testing Frameworks", "Documentation Tools"],
        deliverables: ["Live demo / interactive report", "Architecture diagrams and trade-off justification", "Recruiter presentation deck"],
        datasetSuggestion: "Real-world engineering challenge datasets"
      }
    ],
    gapExplanations: [
      {
        skill: topGaps[0] || "Foundational Engineering Competency",
        plainEnglishExplanation: "Think of this like foundational scaffolding: without solid anchoring, small stresses lead to structural failure under heavy load.",
        whyItMattersInRole: "Placement interviewers evaluate this to test whether you understand first-principles engineering.",
        fastestWayToMaster: "Work through 3 hands-on examples step-by-step and write down your reasoning out loud."
      }
    ]
  };
}

// Helper to create uniform 12-week plans across 30-day, 60-day, and 90-day phases
function create12WeekPlan(
  branchKey: string,
  domainName: string,
  modules: Array<{ w: number; p: '30-day' | '60-day' | '90-day'; title: string; skill: string; h: number }>,
  toolStack: string
): WeeklyPlanItem[] {
  return modules.map(m => {
    const is30 = m.p === '30-day';
    const is60 = m.p === '60-day';

    return {
      weekNumber: m.w,
      phase: m.p,
      title: m.title,
      focusSkill: m.skill,
      objectives: [
        `Master fundamental principles and real-world mechanisms of ${m.skill}`,
        `Understand boundary conditions, common design edge cases, and industry standards in ${domainName}`,
        `Connect theoretical formulas to practical placement problem solving`
      ],
      handsOnTasks: [
        `Complete 5 practical exercises / simulations focused on ${m.skill} using standard tools`,
        `Build a self-contained code module or simulation verifying execution against boundary conditions`
      ],
      revisionTasks: [
        `Review key formulas and notes from Week ${Math.max(1, m.w - 1)} to maintain active recall`,
        `Conduct a 15-minute self-audit: explain the core tradeoff of ${m.skill} out loud without reference`
      ],
      projectRecommendation: {
        title: `${domainName} Week ${m.w} Mini-Project`,
        description: `Construct a focused prototype demonstrating mastery of ${m.skill} under realistic constraints.`,
        tools: toolStack.split(',').slice(0, 3).map(t => t.trim())
      },
      learningMilestone: is30
        ? `Solve 5 timed domain problems in ${m.skill} autonomously with 0 syntax references`
        : is60
        ? `Deliver tested modular implementation ready for placement portfolio integration`
        : `Articulate end-to-end architecture and trade-off defense under placement interview rubrics`,
      estimatedHours: m.h
    };
  });
}
