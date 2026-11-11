import { 
  CareerRoleIntelligence, 
  StudentRoleRecommendation, 
  AcademicYear, 
  PreparationGoal, 
  AssessmentResult 
} from '../types';

export const ALL_INTEREST_TAGS = [
  'System Architecture & Low-Level Code',
  'Web & Full-Stack Development',
  'Machine Learning & Deep Learning',
  'Data Engineering & Analytics',
  'Cloud Computing & DevOps',
  'Cybersecurity & Network Defense',
  'Embedded Systems & Firmware',
  'VLSI & Chip Design',
  'Robotics & Automation',
  'Power Electronics & Electric Vehicles',
  'CAD / 3D Modeling & Simulation',
  'Structural Design & BIM Modeling',
  'Product & Business Intelligence',
  'Smart Grids & Green Energy'
] as const;

export const CAREER_ROLES_DATABASE: CareerRoleIntelligence[] = [
  // ===================== CSE =====================
  {
    id: 'cse-backend-distributed',
    title: 'Software Development Engineer (Backend & Distributed Systems)',
    shortTitle: 'Backend SDE',
    branchId: 'cse',
    branchName: 'Computer Science & Engineering',
    tagline: 'Architect high-throughput microservices, data consistency protocols, and scalable cloud APIs.',
    industrySector: 'Enterprise Tech / SaaS / FinTech',
    demandTrend: 'Very High',
    avgStartingPackage: '₹10 LPA - ₹24 LPA',
    interestTags: [
      'System Architecture & Low-Level Code',
      'Web & Full-Stack Development',
      'Cloud Computing & DevOps'
    ],
    coreSkills: [
      { skillKey: 'dsa', skillName: 'Data Structures & Algorithms', targetScore: 80, weight: 30, description: 'Trees, Graphs, DP, Hash Maps, and optimal Big-O algorithmic tradeoffs.' },
      { skillKey: 'programming', skillName: 'Core OOP & Language Mastery', targetScore: 80, weight: 25, description: 'Concurrency, multithreading, memory management in Java/C++/Go.' },
      { skillKey: 'dbms', skillName: 'Database Management & Indexing', targetScore: 75, weight: 25, description: 'ACID transactions, B-Tree indexes, query execution plans, and caching.' },
      { skillKey: 'os', skillName: 'Operating Systems & Concurrency', targetScore: 70, weight: 20, description: 'Threads, locks, semaphores, process memory models, and I/O multiplexing.' }
    ],
    advancedSkills: [
      { skillKey: 'system_design', skillName: 'High-Level System Design', targetScore: 70, description: 'Load balancers, message queues (Kafka), Redis caching, and eventual consistency.' },
      { skillKey: 'cn', skillName: 'Computer Networks (HTTP/gRPC/TCP)', targetScore: 75, description: 'Socket connections, TLS handshakes, HTTP/2/3, and API gateway routing.' }
    ],
    careerProgression: [
      {
        stage: 'Graduate SDE (Tier 1/2)',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Software Development Engineer I', 'Associate Backend Engineer'],
        salaryRange: '₹10 - ₹22 LPA',
        keyResponsibilities: ['Implement REST/gRPC endpoints', 'Write unit & integration test suites', 'Optimize SQL queries', 'Participate in code reviews'],
        criticalSkills: ['DSA', 'Java/Go/Python', 'SQL & Redis', 'Git CI/CD']
      },
      {
        stage: 'Mid-Level Software Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Software Development Engineer II', 'Senior Backend Engineer'],
        salaryRange: '₹22 - ₹42 LPA',
        keyResponsibilities: ['Own end-to-end microservices', 'Design asynchronous event queues', 'Conduct database sharding', 'Mentor junior engineers'],
        criticalSkills: ['Distributed Transactions', 'Kafka/RabbitMQ', 'Docker/Kubernetes', 'Performance Profiling']
      },
      {
        stage: 'Senior / Staff Software Engineer',
        experienceYears: '5 - 9 Years',
        typicalTitles: ['Senior SDE III', 'Staff Engineer', 'Engineering Manager'],
        salaryRange: '₹42 - ₹75 LPA+',
        keyResponsibilities: ['Drive tech stack decisions across teams', 'Resolve cross-system reliability bottlenecks', 'Define zero-downtime migration plans'],
        criticalSkills: ['Domain-Driven Design', 'High Availability Architecture', 'Chaos Engineering', 'Tech Leadership']
      },
      {
        stage: 'Principal Engineer / VP of Engineering',
        experienceYears: '9+ Years',
        typicalTitles: ['Principal Engineer', 'Distinguished Architect', 'Director of Engineering'],
        salaryRange: '₹80 LPA - ₹1.5 Cr+',
        keyResponsibilities: ['Multi-year tech vision', 'C-suite strategic alignment', 'Company-wide architectural governance'],
        criticalSkills: ['Global System Architecture', 'Organizational Scaling', 'Cost & Cloud Governance']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-cse-distributed-cache',
        title: 'Distributed In-Memory Key-Value Store with Raft Consensus',
        targetSkillGaps: ['dsa', 'programming', 'os'],
        difficulty: 'Advanced',
        problemStatement: 'Build a fault-tolerant in-memory distributed cache supporting replication and leader election across nodes under network partitioning.',
        toolsUsed: ['Go or C++', 'gRPC', 'Raft Consensus Protocol', 'Docker'],
        keyDeliverables: ['Leader election mechanism', 'Log replication test with synthetic packet drop', 'Benchmarking client achieving >20k QPS'],
        portfolioImpact: 'Immediately validates distributed systems knowledge in Tier-1 product interviews (Google, Amazon, Uber).'
      },
      {
        id: 'proj-cse-rate-limiter',
        title: 'Distributed Rate Limiter & API Gateway with Redis Sliding Window',
        targetSkillGaps: ['dbms', 'cn', 'programming'],
        difficulty: 'Intermediate',
        problemStatement: 'Construct a low-latency API rate-limiting middleware that stops DDoS abuse using the sliding window log algorithm with atomic Lua scripts.',
        toolsUsed: ['Node.js/Go', 'Redis', 'Docker Compose', 'k6 Load Testing'],
        keyDeliverables: ['Sub-millisecond token check', 'Lua atomic script execution', 'Load test benchmark report handling 10,000 req/sec'],
        portfolioImpact: 'Demonstrates practical backend production problem-solving beyond standard CRUD tutorials.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master one core programming language (C++ or Java) and build strong problem-solving fundamentals.',
        keyActionItems: ['Solve 50+ basic array & string problems on LeetCode/HackerRank', 'Understand memory pointers, references, and OOP principles', 'Push code to personal GitHub'],
        placementTimingAdvice: 'Participate in beginner college hackathons and open-source contributions.'
      },
      '2nd Year': {
        focusGoal: 'Crack standard Data Structures & Algorithms and learn fundamental database internals.',
        keyActionItems: ['Complete Trees, Graphs, and DP problem sets', 'Build a multi-user database-driven backend project', 'Study operating system process scheduling and threading'],
        placementTimingAdvice: 'Target summer software engineering internships during the 4th semester.'
      },
      '3rd Year': {
        focusGoal: 'Intensive placement prep: 200+ DSA problems, low-level design patterns, and mock interviews.',
        keyActionItems: ['Revise DBMS (B+ trees, ACID), OS (paging, deadlocks), and Computer Networks (TCP 3-way handshake)', 'Practice timed 45-minute live coding challenges', 'Design a scalable microservice project'],
        placementTimingAdvice: 'Peak campus recruitment season begins! Have your resume ready by July-August.'
      },
      '4th Year': {
        focusGoal: 'Finalize top-tier placements, system design preparation, and smooth corporate onboarding.',
        keyActionItems: ['Target high-tier dream company rounds', 'Practice behavioral STAR method interview responses', 'Complete a capstone production deployment'],
        placementTimingAdvice: 'Focus on off-campus referral pipelines if campus offers need upgrading.'
      }
    }
  },
  {
    id: 'cse-fullstack',
    title: 'Full-Stack Software Engineer (React / TypeScript / Node.js)',
    shortTitle: 'Full-Stack Engineer',
    branchId: 'cse',
    branchName: 'Computer Science & Engineering',
    tagline: 'Engineer fluid, accessible user interfaces backed by resilient cloud APIs and real-time state sync.',
    industrySector: 'Product Startups / SaaS / E-Commerce',
    demandTrend: 'Very High',
    avgStartingPackage: '₹8 LPA - ₹20 LPA',
    interestTags: [
      'Web & Full-Stack Development',
      'System Architecture & Low-Level Code',
      'Cloud Computing & DevOps'
    ],
    coreSkills: [
      { skillKey: 'programming', skillName: 'TypeScript & JavaScript Runtime', targetScore: 80, weight: 30, description: 'Event loop, asynchronous promises, typing patterns, and closures.' },
      { skillKey: 'dsa', skillName: 'Data Structures & Algorithms', targetScore: 75, weight: 25, description: 'Efficient UI tree diffing, caching structures, and search algorithms.' },
      { skillKey: 'dbms', skillName: 'PostgreSQL / Prisma / MongoDB', targetScore: 70, weight: 25, description: 'Relational data modeling, foreign keys, migrations, and indexing.' },
      { skillKey: 'cn', skillName: 'HTTP APIs, WebSockets & Security', targetScore: 70, weight: 20, description: 'CORS, JWT/OAuth auth flows, WebSocket synchronization, and HTTPS.' }
    ],
    advancedSkills: [
      { skillKey: 'frontend_perf', skillName: 'Client Performance & SSR', targetScore: 75, description: 'Code splitting, memoization, Core Web Vitals, and Next.js server components.' },
      { skillKey: 'devops', skillName: 'Docker & Cloud Deployment', targetScore: 70, description: 'Docker multi-stage builds, CI/CD GitHub Actions, and AWS ECS/Vercel.' }
    ],
    careerProgression: [
      {
        stage: 'Junior Full-Stack Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Associate Software Engineer', 'Full-Stack Developer'],
        salaryRange: '₹8 - ₹16 LPA',
        keyResponsibilities: ['Build reusable UI components', 'Develop REST endpoints', 'Fix cross-browser bugs', 'Write integration tests'],
        criticalSkills: ['React', 'TypeScript', 'Node.js', 'SQL']
      },
      {
        stage: 'Full-Stack Engineer II',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Full-Stack Engineer', 'Senior Frontend/Full-Stack Developer'],
        salaryRange: '₹18 - ₹35 LPA',
        keyResponsibilities: ['Architect state management & caching', 'Lead database schema migrations', 'Implement real-time features', 'Optimize load times'],
        criticalSkills: ['Next.js/React', 'Redis', 'WebSockets', 'GraphQL/gRPC']
      },
      {
        stage: 'Staff Full-Stack Architect',
        experienceYears: '5 - 9 Years',
        typicalTitles: ['Lead Full-Stack Engineer', 'Engineering Manager'],
        salaryRange: '₹35 - ₹65 LPA',
        keyResponsibilities: ['Design enterprise-grade design systems', 'Oversee end-to-end web security', 'Lead multi-disciplinary feature pods'],
        criticalSkills: ['Design Systems', 'Cloud Native Architecture', 'Team Leadership']
      },
      {
        stage: 'Principal Engineer / VP Tech',
        experienceYears: '9+ Years',
        typicalTitles: ['Principal Full-Stack Architect', 'VP of Engineering'],
        salaryRange: '₹70 LPA - ₹1.3 Cr+',
        keyResponsibilities: ['Drive technological innovation and company digital products roadmap'],
        criticalSkills: ['Executive Leadership', 'Platform Architecture']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-fullstack-collaboration',
        title: 'Real-Time Collaborative Document Canvas (Figma/Notion-like)',
        targetSkillGaps: ['programming', 'cn', 'dsa'],
        difficulty: 'Advanced',
        problemStatement: 'Create a multi-user collaborative workspace with live cursor tracking, conflict-free replicated data types (CRDTs), and optimistic client updates.',
        toolsUsed: ['React', 'TypeScript', 'WebSockets', 'Yjs / CRDTs', 'Node.js', 'PostgreSQL'],
        keyDeliverables: ['Sub-50ms sync across multiple browser tabs', 'Undo/redo history stack', 'Export to PDF/JSON'],
        portfolioImpact: 'Stands out immensely in startup and tier-1 product campus interviews.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master HTML5, CSS3, modern JavaScript ES6+, and responsive layouts.',
        keyActionItems: ['Build 3 interactive UI projects from scratch', 'Learn Git and host on GitHub Pages/Vercel', 'Practice basic DSA in JS/TypeScript'],
        placementTimingAdvice: 'Contribute to college website or student club portals.'
      },
      '2nd Year': {
        focusGoal: 'Deep dive into React, TypeScript, backend Node.js APIs, and relational databases.',
        keyActionItems: ['Build full-stack applications with auth and database CRUD', 'Study DSA in depth for technical rounds', 'Learn state management (Zustand/Redux)'],
        placementTimingAdvice: 'Apply for summer frontend / full-stack internships.'
      },
      '3rd Year': {
        focusGoal: 'Build high-performance full-stack projects with Docker, WebSockets, and CI/CD pipelines.',
        keyActionItems: ['Add real-time and caching layers (Redis)', 'Practice LeetCode medium questions', 'Refine resume with deployed live URLs'],
        placementTimingAdvice: 'Prime time for on-campus full-stack hiring tests.'
      },
      '4th Year': {
        focusGoal: 'Target high-growth startups and tech multinationals offering full-stack roles.',
        keyActionItems: ['Prepare for live paired-coding frontend challenges', 'Demonstrate architectural depth in system interviews'],
        placementTimingAdvice: 'Leverage LinkedIn direct engineering reach-outs and referrals.'
      }
    }
  },

  // ===================== AI & ML =====================
  {
    id: 'aiml-mle',
    title: 'Machine Learning Engineer (MLOps & Applied AI)',
    shortTitle: 'ML Engineer',
    branchId: 'aiml',
    branchName: 'Artificial Intelligence & Machine Learning',
    tagline: 'Design, train, optimize, and deploy robust machine learning pipelines into high-availability production.',
    industrySector: 'AI Labs / Autonomous Tech / E-Commerce',
    demandTrend: 'Explosive Growth',
    avgStartingPackage: '₹12 LPA - ₹28 LPA',
    interestTags: [
      'Machine Learning & Deep Learning',
      'System Architecture & Low-Level Code',
      'Data Engineering & Analytics'
    ],
    coreSkills: [
      { skillKey: 'python', skillName: 'Python & NumPy Vectorization', targetScore: 85, weight: 25, description: 'Broadcasting, vectorized matrix computations, Pandas, and memory-efficient tensor manipulation.' },
      { skillKey: 'machine_learning', skillName: 'Core ML Algorithms & Math', targetScore: 80, weight: 25, description: 'Gradient descent, regularized loss functions, XGBoost, cross-validation, and ROC-AUC metrics.' },
      { skillKey: 'deep_learning', skillName: 'Deep Learning & Neural Architectures', targetScore: 75, weight: 25, description: 'Backpropagation mechanics, CNNs, Transformers, attention mechanisms, and PyTorch.' },
      { skillKey: 'ai_foundations', skillName: 'AI Problem Formulation & Heuristics', targetScore: 75, weight: 25, description: 'Cost functions, search spaces, probabilistic modeling, and optimization strategies.' }
    ],
    advancedSkills: [
      { skillKey: 'mlops', skillName: 'MLOps, Docker & Model Serving', targetScore: 70, description: 'FastAPI model inference, ONNX runtime optimization, Triton inference server, and model drift monitoring.' },
      { skillKey: 'feature_store', skillName: 'Feature Engineering & Data Pipelines', targetScore: 75, description: 'Embedding generation, vector search (FAISS/Pinecone), and reproducible pipeline tracking.' }
    ],
    careerProgression: [
      {
        stage: 'Associate ML Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Graduate ML Engineer', 'Associate AI Engineer'],
        salaryRange: '₹12 - ₹24 LPA',
        keyResponsibilities: ['Data preprocessing & cleaning', 'Fine-tuning baseline models', 'Packaging models into Docker containers', 'Tracking experiment runs with MLflow'],
        criticalSkills: ['PyTorch/TensorFlow', 'Scikit-Learn', 'FastAPI', 'Pandas & NumPy']
      },
      {
        stage: 'Machine Learning Engineer II',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Senior ML Engineer', 'Applied AI Scientist'],
        salaryRange: '₹24 - ₹48 LPA',
        keyResponsibilities: ['Design custom loss functions', 'Set up automated model re-training pipelines', 'Quantize models (INT8/FP16) for real-time inference', 'A/B test models in production'],
        criticalSkills: ['MLOps Pipelines (Kubeflow/Airflow)', 'Vector Databases', 'Model Quantization (TensorRT)', 'Distributed Training']
      },
      {
        stage: 'Lead / Staff ML Architect',
        experienceYears: '5 - 9 Years',
        typicalTitles: ['Staff ML Engineer', 'Head of AI Platforms'],
        salaryRange: '₹48 - ₹85 LPA+',
        keyResponsibilities: ['Architect foundational AI systems', 'Benchmark GPU compute utilization', 'Lead multi-modal AI initiatives'],
        criticalSkills: ['Distributed GPU Clusters', 'LLM Alignment (RLHF/DPO)', 'Research-to-Production Translation']
      },
      {
        stage: 'Principal AI Scientist / Director',
        experienceYears: '9+ Years',
        typicalTitles: ['Principal Research Scientist', 'VP of AI Research'],
        salaryRange: '₹90 LPA - ₹1.8 Cr+',
        keyResponsibilities: ['Steer organization AI breakthroughs and high-impact patent strategy'],
        criticalSkills: ['Frontier AI Research', 'Strategic Innovation']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-aiml-production-pipeline',
        title: 'End-to-End Multimodal Recommendation Engine with Vector Search & MLOps',
        targetSkillGaps: ['machine_learning', 'deep_learning', 'python'],
        difficulty: 'Advanced',
        problemStatement: 'Build a production-grade recommendation service combining image embeddings (CLIP) and user click histories, served with sub-30ms latency using vector indexing.',
        toolsUsed: ['PyTorch', 'FAISS / Qdrant', 'FastAPI', 'Docker', 'MLflow'],
        keyDeliverables: ['Vector embedding generation pipeline', 'HNSW index benchmarking', 'FastAPI endpoint with health check and Docker container'],
        portfolioImpact: 'Provides undeniable proof of production-grade engineering beyond basic Jupyter notebook scripts.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Solidify Linear Algebra, Calculus, Probability, and Python programming.',
        keyActionItems: ['Implement linear regression and gradient descent from scratch in pure NumPy', 'Understand eigenvalues, vectors, matrix rank, and partial derivatives', 'Learn Git'],
        placementTimingAdvice: 'Focus on mathematical intuition and clean scripting.'
      },
      '2nd Year': {
        focusGoal: 'Master Classical Machine Learning and start Deep Learning with PyTorch.',
        keyActionItems: ['Train Scikit-Learn models on Kaggle datasets with rigorous cross-validation', 'Build first CNN and RNN models in PyTorch', 'Understand backpropagation math step-by-step'],
        placementTimingAdvice: 'Compete in Kaggle competitions and pursue college research internships.'
      },
      '3rd Year': {
        focusGoal: 'Deploy models to production with Docker, APIs, and MLOps pipelines.',
        keyActionItems: ['Convert models to ONNX and serve via FastAPI', 'Learn Transformer architectures (Self-Attention)', 'Prepare for coding and ML theory placement rounds'],
        placementTimingAdvice: 'Apply for AI/ML specialist campus placements and off-campus roles.'
      },
      '4th Year': {
        focusGoal: 'Publish a research paper or release a well-documented open-source AI project.',
        keyActionItems: ['Fine-tune LLMs/Diffusion models with LoRA/QLoRA', 'Practice system design for ML applications (recommender systems, search engines)'],
        placementTimingAdvice: 'Target high-paying AI research labs and tech product companies.'
      }
    }
  },
  {
    id: 'aiml-llm-nlp',
    title: 'Generative AI & LLM Systems Engineer',
    shortTitle: 'GenAI Engineer',
    branchId: 'aiml',
    branchName: 'Artificial Intelligence & Machine Learning',
    tagline: 'Engineer Retrieval-Augmented Generation (RAG) pipelines, autonomous agents, and fine-tuned open-weights models.',
    industrySector: 'AI Labs / Cloud Platforms / Enterprise Copilots',
    demandTrend: 'Explosive Growth',
    avgStartingPackage: '₹14 LPA - ₹30 LPA',
    interestTags: [
      'Machine Learning & Deep Learning',
      'System Architecture & Low-Level Code',
      'Data Engineering & Analytics'
    ],
    coreSkills: [
      { skillKey: 'deep_learning', skillName: 'Transformer Architecture & Attention', targetScore: 85, weight: 30, description: 'Multi-head attention, KV cache, Positional Encodings (RoPE), and parameter-efficient fine-tuning (PEFT/LoRA).' },
      { skillKey: 'python', skillName: 'Python & Async Frameworks', targetScore: 85, weight: 25, description: 'AsyncIO concurrency, token streaming, LangChain/LlamaIndex, and Hugging Face Transformers.' },
      { skillKey: 'machine_learning', skillName: 'Evaluation Metrics & Loss Functions', targetScore: 75, weight: 25, description: 'Perplexity, BLEU/ROUGE, RAG Triad (Faithfulness, Answer Relevance), and cross-entropy.' },
      { skillKey: 'ai_foundations', skillName: 'Agentic Workflows & Search Heuristics', targetScore: 75, weight: 20, description: 'ReAct loops, tool calling, memory management, and structured JSON output validation.' }
    ],
    advancedSkills: [
      { skillKey: 'vector_retrieval', skillName: 'Hybrid Vector Search & Reranking', targetScore: 80, description: 'Dense vs sparse embeddings (BM25 + ColBERT), cross-encoder reranking, and semantic chunking.' },
      { skillKey: 'vllm_serving', skillName: 'High-Throughput Model Serving', targetScore: 75, description: 'vLLM, continuous batching, PagedAttention, and TensorRT-LLM deployment.' }
    ],
    careerProgression: [
      {
        stage: 'Associate GenAI Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Junior AI Engineer', 'NLP Systems Associate'],
        salaryRange: '₹12 - ₹24 LPA',
        keyResponsibilities: ['Build production RAG pipelines', 'Evaluate prompt performance and hallucinations', 'Fine-tune open-weights models (Llama 3/Mistral)', 'Integrate vector databases'],
        criticalSkills: ['Hugging Face', 'LangChain/LlamaIndex', 'Vector DBs (Chroma/Pinecone)', 'Python']
      },
      {
        stage: 'Senior GenAI Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Generative AI Lead', 'Senior LLM Engineer'],
        salaryRange: '₹26 - ₹52 LPA',
        keyResponsibilities: ['Optimize inference latencies with vLLM', 'Design multi-agent orchestrations', 'Implement guardrails and automated hallucination mitigations'],
        criticalSkills: ['vLLM / TensorRT', 'LoRA / DPO alignment', 'Advanced Agentic Patterns', 'Enterprise Security']
      },
      {
        stage: 'Principal AI Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Principal GenAI Architect', 'Director of Applied AI'],
        salaryRange: '₹55 LPA - ₹1.2 Cr+',
        keyResponsibilities: ['Define enterprise foundation model strategies and multi-million dollar GPU allocation'],
        criticalSkills: ['Frontier Model Strategy', 'GPU Infra Architecture']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-genai-agentic-rag',
        title: 'Production Agentic RAG System with Semantic Caching & Cross-Encoder Reranking',
        targetSkillGaps: ['deep_learning', 'python', 'ai_foundations'],
        difficulty: 'Advanced',
        problemStatement: 'Build a multi-turn enterprise knowledge assistant with semantic chunking, hybrid search (BM25 + Cohere rerank), and automated hallucination evaluation using the RAG triad.',
        toolsUsed: ['Python', 'Qdrant / Milvus', 'LangGraph', 'vLLM or Gemini SDK', 'Ragas'],
        keyDeliverables: ['Sub-1s token-to-first-byte streaming', 'Benchmark report with Ragas evaluation scores', 'Dockerized deployment with clean documentation'],
        portfolioImpact: 'The absolute gold-standard project for current AI/ML placement interview rounds.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Learn Python syntax, regex, NLP basics (tokenization, n-grams), and vectors.',
        keyActionItems: ['Build text classifiers with TF-IDF', 'Understand vector dot products and cosine similarity', 'Study attention mechanism papers'],
        placementTimingAdvice: 'Build foundational command over mathematics and language models.'
      },
      '2nd Year': {
        focusGoal: 'Build hands-on expertise with Hugging Face Transformers and embeddings.',
        keyActionItems: ['Fine-tune BERT for Named Entity Recognition', 'Experiment with open-source LLMs locally using Ollama', 'Master vector databases'],
        placementTimingAdvice: 'Pursue generative AI internships at tech startups.'
      },
      '3rd Year': {
        focusGoal: 'Architect production RAG and multi-agent systems with verified evaluation.',
        keyActionItems: ['Build an agent that executes SQL queries or code securely', 'Learn parameter-efficient fine-tuning (LoRA/QLoRA)', 'Prepare DSA and system design'],
        placementTimingAdvice: 'Showcase working interactive demos in placement interview presentations.'
      },
      '4th Year': {
        focusGoal: 'Target specialized AI engineer tracks with high compensation packages.',
        keyActionItems: ['Benchmark inference optimization (quantization, speculative decoding)', 'Publish technical case studies on LinkedIn/GitHub'],
        placementTimingAdvice: 'Take advantage of the huge industry demand for applied GenAI engineers.'
      }
    }
  },

  // ===================== DATA SCIENCE =====================
  {
    id: 'ds-data-scientist',
    title: 'Data Scientist (Predictive Modeling & Statistical Inference)',
    shortTitle: 'Data Scientist',
    branchId: 'ds',
    branchName: 'Data Science & Analytics',
    tagline: 'Transform messy raw data into statistically sound business intelligence, forecasting models, and predictive pipelines.',
    industrySector: 'FinTech / E-Commerce / Healthcare / Consulting',
    demandTrend: 'High',
    avgStartingPackage: '₹9 LPA - ₹22 LPA',
    interestTags: [
      'Data Engineering & Analytics',
      'Machine Learning & Deep Learning',
      'Product & Business Intelligence'
    ],
    coreSkills: [
      { skillKey: 'statistics', skillName: 'Applied Statistics & Hypothesis Testing', targetScore: 85, weight: 30, description: 'A/B testing, p-values, Central Limit Theorem, ANOVA, Bayesian inference, and confidence intervals.' },
      { skillKey: 'python', skillName: 'Python, Pandas & Scientific Computing', targetScore: 80, weight: 25, description: 'Data wrangling, groupby operations, feature engineering, and statistical plotting.' },
      { skillKey: 'sql', skillName: 'Advanced SQL & Data Warehousing', targetScore: 80, weight: 25, description: 'Window functions, CTEs, self-joins, query performance tuning, and schema design.' },
      { skillKey: 'machine_learning', skillName: 'Supervised & Unsupervised Modeling', targetScore: 75, weight: 20, description: 'Random Forests, XGBoost, clustering (K-Means/DBSCAN), and classification metrics.' }
    ],
    advancedSkills: [
      { skillKey: 'causal_inference', skillName: 'Causal Inference & Experimentation', targetScore: 70, description: 'Difference-in-differences, propensity score matching, and quasi-experimental design.' },
      { skillKey: 'big_data', skillName: 'PySpark & Distributed Data Processing', targetScore: 70, description: 'Spark DataFrames, lazy evaluation, partitioning, and cloud data lakes (Snowflake/BigQuery).' }
    ],
    careerProgression: [
      {
        stage: 'Associate Data Scientist',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Junior Data Scientist', 'Decision Analytics Associate'],
        salaryRange: '₹9 - ₹18 LPA',
        keyResponsibilities: ['Perform exploratory data analysis', 'Write complex SQL extraction queries', 'Build baseline predictive models', 'Design A/B test experiments'],
        criticalSkills: ['SQL', 'Python (Pandas/Statsmodels)', 'Scikit-Learn', 'Tableau/Power BI']
      },
      {
        stage: 'Data Scientist II',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Data Scientist', 'Senior Decision Scientist'],
        salaryRange: '₹18 - ₹36 LPA',
        keyResponsibilities: ['Own predictive algorithms in production', 'Design causal experimentation frameworks', 'Present insights to senior executives', 'Tune ensemble models'],
        criticalSkills: ['XGBoost/LightGBM', 'A/B Test Design', 'PySpark / BigQuery', 'Business Analytics']
      },
      {
        stage: 'Lead / Principal Data Scientist',
        experienceYears: '5 - 9 Years',
        typicalTitles: ['Lead Data Scientist', 'Director of Data Science'],
        salaryRange: '₹38 - ₹70 LPA+',
        keyResponsibilities: ['Define enterprise analytics strategy', 'Oversee algorithmic fairness and compliance', 'Direct data platform roadmaps'],
        criticalSkills: ['Strategic Data Governance', 'Predictive Platform Architecture']
      },
      {
        stage: 'Chief Data Officer / VP of Analytics',
        experienceYears: '9+ Years',
        typicalTitles: ['Chief Data Officer', 'VP of Analytics'],
        salaryRange: '₹75 LPA - ₹1.5 Cr+',
        keyResponsibilities: ['Executive leadership over enterprise data assets, monetization, and compliance'],
        criticalSkills: ['Executive Decision Making', 'Enterprise Strategy']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-ds-customer-churn',
        title: 'Customer Lifetime Value & Churn Prediction with Causal Uplift Modeling',
        targetSkillGaps: ['statistics', 'machine_learning', 'sql'],
        difficulty: 'Intermediate',
        problemStatement: 'Develop a predictive model on 100k+ transaction records to identify high-risk customer churn and isolate incremental marketing campaign effectiveness.',
        toolsUsed: ['Python', 'Pandas', 'XGBoost', 'CausalML / Statsmodels', 'PostgreSQL'],
        keyDeliverables: ['Feature importance analysis', 'ROC-AUC & Precision-Recall curves', 'Causal uplift calculation report demonstrating saved revenue'],
        portfolioImpact: 'Highly valued by analytics consulting firms (Mu Sigma, Fractal, Bain Bain Cap, ZS Associates) and e-commerce giants.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master probability distributions, descriptive statistics, and Python fundamentals.',
        keyActionItems: ['Learn hypothesis testing (Z-test, T-test, Chi-square)', 'Master Pandas and Matplotlib/Seaborn', 'Complete SQL basics (SELECT, GROUP BY, JOIN)'],
        placementTimingAdvice: 'Build clean data visualization notebooks on Kaggle/GitHub.'
      },
      '2nd Year': {
        focusGoal: 'Deepen SQL window functions, statistical regression, and machine learning.',
        keyActionItems: ['Solve LeetCode Database Medium/Hard SQL problems', 'Build regression and classification models with Scikit-Learn', 'Learn A/B testing methodologies'],
        placementTimingAdvice: 'Apply for summer data analyst or business intelligence internships.'
      },
      '3rd Year': {
        focusGoal: 'Master end-to-end data pipelines, feature engineering, and ensemble models.',
        keyActionItems: ['Participate in competitive data science tournaments', 'Build an interactive dashboard (Streamlit or PowerBI) linked to a predictive backend', 'Prepare for SQL and statistical interview case studies'],
        placementTimingAdvice: 'Placement drive preparation for data consulting and product analytics roles.'
      },
      '4th Year': {
        focusGoal: 'Prepare for quantitative assessments, business case interviews, and tech rounds.',
        keyActionItems: ['Practice communicating complex statistical insights to non-technical stakeholders', 'Review PySpark and cloud data warehouses (Snowflake/BigQuery)'],
        placementTimingAdvice: 'Target high-paying analytics teams in FinTech and multinational consultancies.'
      }
    }
  },
  {
    id: 'ds-data-analyst',
    title: 'Data Analyst & Business Intelligence Specialist',
    shortTitle: 'Data Analyst / BI',
    branchId: 'ds',
    branchName: 'Data Science & Analytics',
    tagline: 'Synthesize multi-source business data into actionable KPI dashboards, financial models, and executive insights.',
    industrySector: 'Corporate Strategy / FinTech / Supply Chain / E-Commerce',
    demandTrend: 'High',
    avgStartingPackage: '₹6 LPA - ₹15 LPA',
    interestTags: [
      'Product & Business Intelligence',
      'Data Engineering & Analytics',
      'Web & Full-Stack Development'
    ],
    coreSkills: [
      { skillKey: 'sql', skillName: 'SQL Querying & Aggregations', targetScore: 85, weight: 30, description: 'Window functions, subqueries, complex multi-table joins, and cohort analysis.' },
      { skillKey: 'data_viz', skillName: 'Power BI / Tableau / Dashboards', targetScore: 80, weight: 25, description: 'DAX formulas, interactive drill-downs, visual storytelling, and KPI scorecards.' },
      { skillKey: 'excel', skillName: 'Advanced Excel & Financial Modeling', targetScore: 80, weight: 25, description: 'PowerQuery, Pivot Tables, XLOOKUP, dynamic arrays, and scenario modeling.' },
      { skillKey: 'data_analysis', skillName: 'Exploratory Data Analysis (EDA)', targetScore: 75, weight: 20, description: 'Outlier detection, data cleansing, trend decomposition, and anomaly flagging.' }
    ],
    advancedSkills: [
      { skillKey: 'python_bi', skillName: 'Python for Automated Reporting', targetScore: 70, description: 'Automating Excel/PDF reports with Pandas, OpenPyXL, and scheduling cron jobs.' },
      { skillKey: 'metric_design', skillName: 'Product & Business Metrics Design', targetScore: 75, description: 'CAC, LTV, Retention Cohorts, Churn Rates, and North Star metrics.' }
    ],
    careerProgression: [
      {
        stage: 'Junior Data Analyst',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Business Analyst Intern', 'Junior Data Analyst'],
        salaryRange: '₹6 - ₹12 LPA',
        keyResponsibilities: ['Build automated KPI dashboards', 'Execute weekly/monthly business reporting', 'Clean and validate incoming CRM datasets'],
        criticalSkills: ['SQL', 'Excel', 'Power BI / Tableau']
      },
      {
        stage: 'Senior Business Intelligence Analyst',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Senior Data Analyst', 'BI Specialist'],
        salaryRange: '₹14 - ₹26 LPA',
        keyResponsibilities: ['Lead cross-functional metric reviews', 'Design self-serve data marts', 'Conduct deep-dive root cause analyses on revenue drops'],
        criticalSkills: ['Advanced DAX', 'SQL Tuning', 'Executive Storytelling', 'Python Automation']
      },
      {
        stage: 'Analytics Manager',
        experienceYears: '5+ Years',
        typicalTitles: ['Lead Business Analyst', 'Head of BI'],
        salaryRange: '₹28 - ₹55 LPA',
        keyResponsibilities: ['Oversee business reporting infrastructure and bridge technical teams with executive strategy'],
        criticalSkills: ['Strategic KPI Governance', 'Cross-Functional Leadership']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-da-ecommerce-bi',
        title: 'Executive E-Commerce Sales & Supply Chain Intelligence Dashboard',
        targetSkillGaps: ['sql', 'data_viz', 'excel'],
        difficulty: 'Intermediate',
        problemStatement: 'Design an end-to-end business intelligence suite analyzing 500,000 transactions across regions to optimize logistics lead times and inventory turnover.',
        toolsUsed: ['PostgreSQL', 'Power BI / Tableau', 'Advanced Excel', 'Python'],
        keyDeliverables: ['Automated ETL script cleaning messy CSVs', 'Interactive executive dashboard with dynamic filtering', 'One-page strategic recommendations briefing'],
        portfolioImpact: 'Immediately demonstrable in analytics placement interviews with interactive live links.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master Excel spreadsheets, formulas, chart design, and basic SQL syntax.',
        keyActionItems: ['Learn VLOOKUP/XLOOKUP, INDEX-MATCH, and Pivot Tables', 'Write basic SQL queries on sample datasets', 'Understand key business terms (Revenue, Margin, ROI)'],
        placementTimingAdvice: 'Build tidy spreadsheet models for college fests and clubs.'
      },
      '2nd Year': {
        focusGoal: 'Deep dive into Power BI / Tableau and intermediate SQL window functions.',
        keyActionItems: ['Earn a free certification in Power BI or Tableau', 'Practice complex multi-table SQL queries', 'Learn basic Python for data wrangling (Pandas)'],
        placementTimingAdvice: 'Target summer business analyst internships.'
      },
      '3rd Year': {
        focusGoal: 'Build comprehensive portfolio dashboards and practice case study interview rounds.',
        keyActionItems: ['Publish interactive dashboards on Tableau Public / Power BI Web', 'Practice Guesstimates and Market Sizing interview puzzles', 'Prepare for technical SQL tests'],
        placementTimingAdvice: 'Peak recruitment for analytics consulting firms and banking analytics teams.'
      },
      '4th Year': {
        focusGoal: 'Polish business presentation skills and secure high-impact analyst roles.',
        keyActionItems: ['Practice explaining analytical insights with crisp executive summaries', 'Participate in company placement aptitude and case interviews'],
        placementTimingAdvice: 'Target high-paying corporate strategy and BI analyst tracks.'
      }
    }
  },

  // ===================== IT =====================
  {
    id: 'it-cloud-architect',
    title: 'Cloud Infrastructure & DevOps Engineer',
    shortTitle: 'Cloud / DevOps Engineer',
    branchId: 'it',
    branchName: 'Information Technology',
    tagline: 'Automate infrastructure as code, containerize microservices, and orchestrate bulletproof CI/CD cloud deployments.',
    industrySector: 'Cloud Providers / Global SaaS / Fintech',
    demandTrend: 'Very High',
    avgStartingPackage: '₹9 LPA - ₹22 LPA',
    interestTags: [
      'Cloud Computing & DevOps',
      'System Architecture & Low-Level Code',
      'Cybersecurity & Network Defense'
    ],
    coreSkills: [
      { skillKey: 'cloud_computing', skillName: 'AWS / Azure Cloud Architecture', targetScore: 80, weight: 30, description: 'VPC, EC2, IAM policies, S3, RDS, Serverless (Lambda), and load balancing.' },
      { skillKey: 'networking', skillName: 'Computer Networks & CIDR Subnetting', targetScore: 75, weight: 25, description: 'IPv4 subnet calculations, DNS resolution, NAT gateways, TCP/UDP sockets, and firewalls.' },
      { skillKey: 'programming', skillName: 'Shell Scripting & Python Automation', targetScore: 75, weight: 25, description: 'Bash automation, Python scripting for cloud SDKs (Boto3), and Linux system admin.' },
      { skillKey: 'cybersecurity', skillName: 'Infrastructure Security & IAM', targetScore: 70, weight: 20, description: 'Least privilege access, SSL/TLS certificates, secrets management, and SSH hardening.' }
    ],
    advancedSkills: [
      { skillKey: 'kubernetes', skillName: 'Kubernetes & Docker Containerization', targetScore: 75, description: 'Pod lifecycle, Deployments, Services, Ingress controllers, Helm charts, and HPA.' },
      { skillKey: 'iac', skillName: 'Infrastructure as Code (Terraform)', targetScore: 70, description: 'Declarative resource provisioning, state file management, and modular architecture.' }
    ],
    careerProgression: [
      {
        stage: 'Associate Cloud Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Junior DevOps Engineer', 'Cloud Operations Associate'],
        salaryRange: '₹8 - ₹16 LPA',
        keyResponsibilities: ['Maintain CI/CD pipeline builds', 'Monitor server health alerts (Prometheus/Grafana)', 'Containerize services with Docker', 'Manage AWS IAM users and policies'],
        criticalSkills: ['Linux', 'Docker', 'AWS Basics', 'Bash & Git']
      },
      {
        stage: 'Senior DevOps / SRE',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['DevOps Engineer', 'Site Reliability Engineer II'],
        salaryRange: '₹18 - ₹38 LPA',
        keyResponsibilities: ['Author Terraform modules for multi-region clusters', 'Manage Kubernetes production deployments', 'Lead disaster recovery drills', 'Automate zero-downtime blue-green deployments'],
        criticalSkills: ['Kubernetes', 'Terraform', 'CI/CD (GitHub Actions/ArgoCD)', 'Prometheus/Grafana']
      },
      {
        stage: 'Principal Cloud Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Principal DevOps Architect', 'Head of Cloud Infrastructure'],
        salaryRange: '₹40 - ₹80 LPA+',
        keyResponsibilities: ['Architect global enterprise multi-cloud resilience, cost optimization (FinOps), and SOC2 compliance'],
        criticalSkills: ['Multi-Cloud Architecture', 'FinOps', 'Zero-Trust Security']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-it-gitops-k8s',
        title: 'Zero-Downtime GitOps CI/CD Pipeline on Kubernetes with Terraform & ArgoCD',
        targetSkillGaps: ['cloud_computing', 'networking', 'programming'],
        difficulty: 'Advanced',
        problemStatement: 'Provision a complete cloud VPC on AWS using Terraform and establish an automated GitOps deployment pipeline using ArgoCD that executes automated rollbacks on failure.',
        toolsUsed: ['AWS / LocalStack', 'Terraform', 'Kubernetes (Minikube/EKS)', 'ArgoCD', 'GitHub Actions', 'Prometheus'],
        keyDeliverables: ['Clean modular Terraform code', 'Working Canary / Blue-Green deployment demo', 'Grafana monitoring dashboard with CPU/Memory alerts'],
        portfolioImpact: 'Unrivaled differentiator for DevOps and Cloud placement interviews.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Learn Linux command line mastery, Shell scripting, and Computer Networking basics.',
        keyActionItems: ['Install Linux (Ubuntu) on dual-boot or WSL', 'Write 20+ Bash automation scripts', 'Understand IP addressing, subnet masks, and DNS'],
        placementTimingAdvice: 'Build comfort with terminal workflows and version control.'
      },
      '2nd Year': {
        focusGoal: 'Master Docker containerization, Git workflows, and cloud fundamentals (AWS Free Tier).',
        keyActionItems: ['Containerize 3 web applications with optimized Dockerfiles', 'Launch AWS EC2, S3, and configure security groups', 'Study operating system virtualization'],
        placementTimingAdvice: 'Target cloud support and infrastructure intern roles.'
      },
      '3rd Year': {
        focusGoal: 'Deep dive into Kubernetes, Terraform, and CI/CD pipelines.',
        keyActionItems: ['Write Terraform scripts to spin up infrastructure', 'Deploy apps on Kubernetes pods and services', 'Prepare for campus placement technical tests'],
        placementTimingAdvice: 'Major hiring season for Cloud Engineers and SRE roles.'
      },
      '4th Year': {
        focusGoal: 'Earn an industry cloud certification (e.g. AWS Solutions Architect Associate) and finalize offers.',
        keyActionItems: ['Practice cloud architecture scenario questions', 'Demonstrate cost-optimization knowledge in interviews'],
        placementTimingAdvice: 'Target enterprise cloud consultancies and high-scale tech firms.'
      }
    }
  },
  {
    id: 'it-cybersecurity',
    title: 'Cybersecurity & Security Operations (SecOps) Analyst',
    shortTitle: 'Cybersecurity Analyst',
    branchId: 'it',
    branchName: 'Information Technology',
    tagline: 'Defend enterprise digital assets against cyber threats, conduct penetration tests, and enforce zero-trust security postures.',
    industrySector: 'Banking / Defense / Cybersecurity Vendors / Critical Infra',
    demandTrend: 'Very High',
    avgStartingPackage: '₹8 LPA - ₹20 LPA',
    interestTags: [
      'Cybersecurity & Network Defense',
      'System Architecture & Low-Level Code',
      'Cloud Computing & DevOps'
    ],
    coreSkills: [
      { skillKey: 'cybersecurity', skillName: 'Network Security & Cryptography', targetScore: 85, weight: 35, description: 'Symmetric/Asymmetric encryption, RSA, AES, digital signatures, hashing, and PKI infrastructure.' },
      { skillKey: 'networking', skillName: 'TCP/IP Packet Analysis & Protocols', targetScore: 80, weight: 25, description: 'Wireshark packet sniffing, TCP flags, firewall rules, IDS/IPS, and VPN tunneling.' },
      { skillKey: 'programming', skillName: 'Python & Bash for Security Automation', targetScore: 75, weight: 20, description: 'Port scanning scripts, log parsing, automated vulnerability scanning, and exploit payloads.' },
      { skillKey: 'cloud_computing', skillName: 'Cloud Security & IAM Hardening', targetScore: 70, weight: 20, description: 'Cloud vulnerability posture, zero-trust policies, and API security auditing.' }
    ],
    advancedSkills: [
      { skillKey: 'soc_siem', skillName: 'SIEM Log Monitoring & Threat Hunting', targetScore: 75, description: 'Splunk / ELK stack threat correlation, incident response triage, and MITRE ATT&CK mapping.' },
      { skillKey: 'web_pentest', skillName: 'Web App Penetration Testing (OWASP)', targetScore: 75, description: 'SQL injection, Cross-Site Scripting (XSS), CSRF, SSRF, and authentication bypass techniques.' }
    ],
    careerProgression: [
      {
        stage: 'Associate Security Analyst (SOC Tier 1)',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['SOC Analyst L1', 'Junior Penetration Tester'],
        salaryRange: '₹8 - ₹15 LPA',
        keyResponsibilities: ['Triage automated SIEM security alerts', 'Analyze suspicious email payloads and phishing attempts', 'Run periodic vulnerability scans with Nessus/OpenVAS'],
        criticalSkills: ['Wireshark', 'Splunk/ELK', 'Linux Security', 'OWASP Top 10']
      },
      {
        stage: 'Cybersecurity Engineer / Pentester',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Security Engineer', 'Penetration Tester / Red Teamer'],
        salaryRange: '₹16 - ₹32 LPA',
        keyResponsibilities: ['Conduct white/black-box penetration tests', 'Formulate remediation guidelines for development teams', 'Perform incident response and digital forensics'],
        criticalSkills: ['Burp Suite Professional', 'Metasploit', 'Forensics (Autopsy)', 'Reverse Engineering']
      },
      {
        stage: 'Chief Information Security Officer (CISO)',
        experienceYears: '6+ Years',
        typicalTitles: ['Security Architect', 'CISO'],
        salaryRange: '₹35 - ₹80 LPA+',
        keyResponsibilities: ['Oversee company-wide cyber risk governance, regulatory compliance, and incident response command'],
        criticalSkills: ['Enterprise Risk Management', 'Zero-Trust Architecture']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-it-soc-honeypot',
        title: 'Automated SOC Threat Detection Lab with Cowrie Honeypot & ELK SIEM',
        targetSkillGaps: ['cybersecurity', 'networking', 'programming'],
        difficulty: 'Intermediate',
        problemStatement: 'Deploy an SSH honeypot on a cloud VPS to capture real-world brute-force attacks, stream live logs to an ELK SIEM pipeline, and map attack IPs against geo-location and MITRE tactics.',
        toolsUsed: ['Ubuntu VPS', 'Cowrie Honeypot', 'Elasticsearch, Logstash, Kibana', 'Python', 'Wireshark'],
        keyDeliverables: ['Real-time attack dashboard in Kibana', 'Python script parsing malicious payloads', 'Comprehensive incident response report'],
        portfolioImpact: 'Unbeatable project to present in SOC Analyst and Cybersecurity placement interviews.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Learn networking protocols, Linux internals, and foundational cryptography.',
        keyActionItems: ['Analyze TCP handshakes in Wireshark', 'Practice on OverTheWire Bandit wargames', 'Understand symmetric vs asymmetric encryption'],
        placementTimingAdvice: 'Build foundational curiosity through Capture The Flag (CTF) competitions.'
      },
      '2nd Year': {
        focusGoal: 'Explore web application security (OWASP Top 10) and scripting automation.',
        keyActionItems: ['Solve PortSwigger Web Security Academy labs', 'Write Python port scanners and directory fuzzers', 'Earn a basic certificate like CompTIA Security+ or Google Cybersecurity'],
        placementTimingAdvice: 'Participate actively in college CTFs and bug bounty programs.'
      },
      '3rd Year': {
        focusGoal: 'Deepen SIEM monitoring, threat detection, and defensive engineering.',
        keyActionItems: ['Set up a local virtual SOC with Splunk/ELK', 'Study MITRE ATT&CK framework', 'Prepare for technical interview questions on cryptography and networks'],
        placementTimingAdvice: 'Campus placement drive for banking, defense, and consulting security teams.'
      },
      '4th Year': {
        focusGoal: 'Target Tier-1 security consultancies and specialized enterprise security teams.',
        keyActionItems: ['Document your CTF writeups and home lab setups on a personal portfolio blog', 'Review compliance standards (ISO 27001, GDPR, CERT-In)'],
        placementTimingAdvice: 'Showcase live home lab demonstrations during technical rounds.'
      }
    }
  },

  // ===================== ECE =====================
  {
    id: 'ece-embedded-firmware',
    title: 'Embedded Systems & Firmware Engineer',
    shortTitle: 'Embedded Systems',
    branchId: 'ece',
    branchName: 'Electronics & Communication',
    tagline: 'Write bare-metal C/C++ firmware, configure hardware peripherals, and develop real-time operating system (RTOS) devices.',
    industrySector: 'Semiconductors / Automotive / Consumer Electronics / IoT',
    demandTrend: 'High',
    avgStartingPackage: '₹8 LPA - ₹20 LPA',
    interestTags: [
      'Embedded Systems & Firmware',
      'System Architecture & Low-Level Code',
      'Robotics & Automation'
    ],
    coreSkills: [
      { skillKey: 'embedded_systems', skillName: 'Embedded C, RTOS & Peripheral Drivers', targetScore: 85, weight: 35, description: 'Volatile keyword, register manipulation, ISRs, FreeRTOS tasks, semaphores, and memory maps.' },
      { skillKey: 'digital_electronics', skillName: 'Digital Logic & Microcontroller Architecture', targetScore: 80, weight: 30, description: 'ARM Cortex-M architecture, timers, ADC/DAC conversions, DMA controllers, and GPIOs.' },
      { skillKey: 'vlsi', skillName: 'Communication Protocols (I2C, SPI, UART, CAN)', targetScore: 75, weight: 20, description: 'Bus timing diagrams, pull-up resistors, master-slave handshakes, packet framing, and arbitration.' },
      { skillKey: 'programming', skillName: 'C/C++ Systems Programming', targetScore: 75, weight: 15, description: 'Bitwise operations, function pointers, circular buffers, and memory leak prevention.' }
    ],
    advancedSkills: [
      { skillKey: 'hardware_debugging', skillName: 'Oscilloscope & Logic Analyzer Debugging', targetScore: 75, description: 'Triggering logic analyzers on protocol packets, measuring rise times, and debugging signal jitter.' },
      { skillKey: 'linux_embedded', skillName: 'Embedded Linux & Kernel Device Drivers', targetScore: 70, description: 'Device tree configuration, U-Boot bootloader, and character device drivers.' }
    ],
    careerProgression: [
      {
        stage: 'Associate Firmware Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Embedded Software Engineer I', 'Associate Hardware Engineer'],
        salaryRange: '₹8 - ₹16 LPA',
        keyResponsibilities: ['Write low-level peripheral drivers (UART/I2C/SPI)', 'Develop board bring-up test code', 'Debug board issues with oscilloscopes and multimeters'],
        criticalSkills: ['Embedded C', 'ARM Cortex-M (STM32/ESP32)', 'FreeRTOS', 'Git']
      },
      {
        stage: 'Senior Embedded Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Senior Firmware Developer', 'IoT Systems Architect'],
        salaryRange: '₹18 - ₹36 LPA',
        keyResponsibilities: ['Architect FreeRTOS multi-threaded firmware', 'Design power-saving sleep modes (microamps)', 'Implement over-the-air (OTA) cryptographic updates'],
        criticalSkills: ['Real-Time OS (RTOS)', 'Power Optimization', 'CAN Bus / Automotive Protocols', 'BLE / Wi-Fi Stacks']
      },
      {
        stage: 'Principal Embedded Systems Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Principal Embedded Architect', 'Director of Hardware Engineering'],
        salaryRange: '₹38 - ₹75 LPA+',
        keyResponsibilities: ['Oversee chip selection, system architecture, safety certifications (ISO 26262), and production manufacturing'],
        criticalSkills: ['System-on-Chip (SoC) Selection', 'Safety-Critical Standards']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-ece-freertos-ecu',
        title: 'FreeRTOS Multi-Task Telemetry Engine with CAN Bus & Sensor Fusion',
        targetSkillGaps: ['embedded_systems', 'digital_electronics', 'programming'],
        difficulty: 'Advanced',
        problemStatement: 'Develop a deterministic FreeRTOS firmware on an STM32/ESP32 that samples IMU sensors at 100Hz, communicates via CAN/SPI, and prevents priority inversion using mutexes.',
        toolsUsed: ['STM32CubeIDE / Keil', 'FreeRTOS', 'Logic Analyzer / Saleae', 'C/C++'],
        keyDeliverables: ['Firmware source code with non-blocking ISRs', 'Logic analyzer trace verifying SPI clock and frame timing', 'Circular buffer UART diagnostic telemetry'],
        portfolioImpact: 'The absolute gold-standard project for core embedded interviews (Qualcomm, Texas Instruments, Bosch).'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master C programming, bitwise operations, and fundamental circuit electronics.',
        keyActionItems: ['Learn pointers, bitwise shifts, structs, and memory layout', 'Study Ohm’s Law, KCL/KVL, diodes, and transistor switching', 'Experiment with basic Arduino scripts'],
        placementTimingAdvice: 'Build foundational hardware and low-level code understanding.'
      },
      '2nd Year': {
        focusGoal: 'Transition from Arduino to 32-bit ARM microcontrollers (STM32/ESP32) and bare-metal C.',
        keyActionItems: ['Program microcontrollers using register manipulation without external libraries', 'Learn I2C, SPI, and UART communication protocols', 'Study Digital Electronics (flip-flops, counters, state machines)'],
        placementTimingAdvice: 'Apply for core hardware and IoT summer internships.'
      },
      '3rd Year': {
        focusGoal: 'Master FreeRTOS (tasks, queues, semaphores) and build hardware projects with clean schematics.',
        keyActionItems: ['Implement multi-tasking FreeRTOS firmware projects', 'Learn to use digital oscilloscopes and logic analyzers', 'Prepare for technical placement rounds on C, OS, and digital logic'],
        placementTimingAdvice: 'Primary hiring season for core semiconductor and automotive giants.'
      },
      '4th Year': {
        focusGoal: 'Target Tier-1 hardware multinationals and prepare for hardware interview questions.',
        keyActionItems: ['Design a complete PCB on KiCAD with firmware documentation', 'Review low-power sleep modes and safety-critical coding standards'],
        placementTimingAdvice: 'Demonstrate physical prototypes or recorded logic analyzer traces during interviews.'
      }
    }
  },
  {
    id: 'ece-vlsi-design',
    title: 'VLSI Physical Design & Verification Engineer',
    shortTitle: 'VLSI Design Engineer',
    branchId: 'ece',
    branchName: 'Electronics & Communication',
    tagline: 'Design, simulate, and verify silicon microchips from RTL Verilog synthesis through place-and-route and static timing analysis.',
    industrySector: 'Semiconductors (Intel, AMD, Qualcomm, NVIDIA, Synopsys)',
    demandTrend: 'Very High',
    avgStartingPackage: '₹10 LPA - ₹26 LPA',
    interestTags: [
      'VLSI & Chip Design',
      'System Architecture & Low-Level Code',
      'Embedded Systems & Firmware'
    ],
    coreSkills: [
      { skillKey: 'vlsi', skillName: 'Verilog / SystemVerilog RTL Design', targetScore: 85, weight: 35, description: 'Combinational vs sequential logic, blocking vs non-blocking assignments, and FSM design.' },
      { skillKey: 'digital_electronics', skillName: 'Digital Logic & Static Timing Analysis (STA)', targetScore: 85, weight: 30, description: 'Setup time, hold time, clock skew, jitter, critical path analysis, and CMOS inverter characteristics.' },
      { skillKey: 'embedded_systems', skillName: 'Computer Architecture & Memory Hierarchy', targetScore: 75, weight: 20, description: 'Pipelining, hazard resolution, cache memory (L1/L2), and instruction decoding.' },
      { skillKey: 'programming', skillName: 'Scripting for EDA Automation (Tcl / Python)', targetScore: 70, weight: 15, description: 'Tcl scripting for EDA tool automation, synthesis constraints (SDC), and testbench automation.' }
    ],
    advancedSkills: [
      { skillKey: 'uvm_verification', skillName: 'Universal Verification Methodology (UVM)', targetScore: 75, description: 'Constrained random verification, functional coverage, scoreboards, and assertions (SVA).' },
      { skillKey: 'physical_design', skillName: 'ASIC Physical Design Flow (P&R)', targetScore: 70, description: 'Floorplanning, power planning, clock tree synthesis (CTS), routing, and DRC/LVS closure.' }
    ],
    careerProgression: [
      {
        stage: 'Associate ASIC / Design Verification Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['RTL Design Engineer I', 'Design Verification Engineer'],
        salaryRange: '₹10 - ₹22 LPA',
        keyResponsibilities: ['Write SystemVerilog testbenches', 'Run RTL simulations and debug wave files', 'Verify code and functional coverage metrics', 'Fix timing violations'],
        criticalSkills: ['Verilog/SystemVerilog', 'ModelSim/QuestaSim', 'Static Timing Analysis (STA)', 'Linux & Tcl']
      },
      {
        stage: 'Senior VLSI Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Senior RTL Designer', 'Physical Design Lead'],
        salaryRange: '₹22 - ₹45 LPA',
        keyResponsibilities: ['Own complex IP blocks (PCIe, USB, Memory controllers)', 'Drive timing closure on advanced process nodes (5nm/3nm)', 'Develop UVM verification environments'],
        criticalSkills: ['UVM', 'Synopsys Design Compiler / Cadence Genus', 'Clock Tree Synthesis (CTS)', 'Low-Power Design (UPF)']
      },
      {
        stage: 'Principal Chip Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Principal Silicon Architect', 'Director of VLSI Engineering'],
        salaryRange: '₹50 LPA - ₹1.2 Cr+',
        keyResponsibilities: ['Drive chip microarchitecture, tape-out readiness, power-performance-area (PPA) optimization'],
        criticalSkills: ['SoC Microarchitecture', 'PPA Optimization', 'Tape-Out Execution']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-ece-riscv-core',
        title: 'Pipelined 32-Bit RISC-V CPU Core with Static Timing Analysis in Verilog',
        targetSkillGaps: ['vlsi', 'digital_electronics', 'programming'],
        difficulty: 'Advanced',
        problemStatement: 'Design a 5-stage pipelined RISC-V (RV32I) processor core with data forwarding, hazard detection, and complete testbench verification in Verilog.',
        toolsUsed: ['Verilog / SystemVerilog', 'Icarus Verilog / GTKWave / EDA Playground', 'OpenLane / Yosys'],
        keyDeliverables: ['Synthesizable RTL code with 5 pipeline stages', 'Timing closure report showing zero setup/hold slack violations', 'Simulation waveform verifying branch prediction'],
        portfolioImpact: 'The holy grail project for semiconductor campus placements (NVIDIA, Intel, Qualcomm, Synopsys).'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master Boolean algebra, logic gates, Karnaugh maps, and C programming.',
        keyActionItems: ['Learn number representations (2’s complement, floating point)', 'Design combinational logic circuits on circuit simulators', 'Learn basic digital gates and truth tables'],
        placementTimingAdvice: 'Build intuition for hardware gate delays and logic minimization.'
      },
      '2nd Year': {
        focusGoal: 'Learn Verilog HDL, synchronous sequential circuits, and finite state machines (FSM).',
        keyActionItems: ['Write Verilog modules for adders, multiplexers, and counters', 'Simulate designs using ModelSim or Icarus Verilog', 'Study CMOS transistor mechanics and propagation delays'],
        placementTimingAdvice: 'Target summer internships in hardware and chip design laboratories.'
      },
      '3rd Year': {
        focusGoal: 'Master Static Timing Analysis (STA), SystemVerilog, and Computer Architecture.',
        keyActionItems: ['Calculate setup and hold slack calculations by hand and in simulation', 'Implement a multi-stage pipelined CPU or complex protocol controller', 'Prepare for technical interview questions on setup/hold violations and metastabilities'],
        placementTimingAdvice: 'Peak recruitment season for semiconductor giants (Qualcomm, Intel, Texas Instruments).'
      },
      '4th Year': {
        focusGoal: 'Explore Physical Design (P&R) and UVM verification to finalize dream chip offers.',
        keyActionItems: ['Run open-source ASIC synthesis flows (OpenLane / SkyWater 130nm)', 'Practice explaining PPA (Power, Performance, Area) tradeoffs in interviews'],
        placementTimingAdvice: 'Focus on core VLSI written tests and design problem discussions.'
      }
    }
  },

  // ===================== ELECTRICAL (EEE) =====================
  {
    id: 'eee-power-smartgrid',
    title: 'Power Systems & Smart Grid Protection Engineer',
    shortTitle: 'Power Systems Engineer',
    branchId: 'eee',
    branchName: 'Electrical & Electronics',
    tagline: 'Design resilient power transmission networks, digital protective relay schemes, and smart renewable grid integration.',
    industrySector: 'Energy Utilities / Power Grid / Renewable Energy / Heavy Industry',
    demandTrend: 'High',
    avgStartingPackage: '₹7 LPA - ₹18 LPA',
    interestTags: [
      'Smart Grids & Green Energy',
      'Power Electronics & Electric Vehicles',
      'Robotics & Automation'
    ],
    coreSkills: [
      { skillKey: 'power_systems', skillName: 'Power Transmission, Faults & Protection', targetScore: 85, weight: 35, description: 'Symmetrical components, SLG fault calculations, Ferranti effect, digital overcurrent relays, and load flow (Newton-Raphson).' },
      { skillKey: 'electrical_machines', skillName: 'Transformers, Alternators & Motors', targetScore: 80, weight: 30, description: 'Transformer losses, equivalent circuits, synchronous alternator reactance, induction motor torque-slip curves, and V-curves.' },
      { skillKey: 'control_systems', skillName: 'Feedback Control & Stability Analysis', targetScore: 75, weight: 20, description: 'Bode plots, Nyquist stability, PID controller tuning, state-space representations, and phase/gain margins.' },
      { skillKey: 'programming', skillName: 'MATLAB / Simulink Simulation', targetScore: 70, weight: 15, description: 'Simscape Power Systems modeling, steady-state load flow analysis, and dynamic motor simulation.' }
    ],
    advancedSkills: [
      { skillKey: 'scada_smartgrid', skillName: 'SCADA Protocols & Smart Grid Automation', targetScore: 75, description: 'IEC 61850 substation automation, Phasor Measurement Units (PMUs), and microgrid islanding.' },
      { skillKey: 'etap_simulation', skillName: 'ETAP Electrical Power System Analysis', targetScore: 70, description: 'Short circuit analysis, protective device coordination, and arc flash calculations.' }
    ],
    careerProgression: [
      {
        stage: 'Graduate Electrical Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Assistant Electrical Engineer', 'Substation Protection Trainee'],
        salaryRange: '₹7 - ₹14 LPA',
        keyResponsibilities: ['Perform load flow and short-circuit calculations', 'Test and calibrate numerical protective relays', 'Inspect switchgear, transformers, and circuit breakers'],
        criticalSkills: ['MATLAB/Simulink', 'Power System Faults', 'Single Line Diagrams (SLD)', 'Relay Settings']
      },
      {
        stage: 'Senior Power Systems Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Power Systems Specialist', 'Grid Integration Engineer'],
        salaryRange: '₹15 - ₹30 LPA',
        keyResponsibilities: ['Coordinate protection schemes across interconnected grids', 'Model renewable solar/wind farm grid integration', 'Execute arc flash and harmonic studies on ETAP'],
        criticalSkills: ['ETAP / PSCAD', 'Renewable Grid Codes', 'IEC 61850', 'Transient Stability']
      },
      {
        stage: 'Chief Electrical Systems Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Principal Grid Architect', 'General Manager (Electrical Projects)'],
        salaryRange: '₹32 - ₹65 LPA+',
        keyResponsibilities: ['Lead multi-gigawatt transmission line projects, HVDC link deployments, and national grid resilience planning'],
        criticalSkills: ['HVDC Transmission', 'Grid Policy & Regulation']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-eee-grid-protection',
        title: 'Microgrid Protective Relay Coordination & Solar PV Integration in MATLAB/Simulink',
        targetSkillGaps: ['power_systems', 'electrical_machines', 'control_systems'],
        difficulty: 'Intermediate',
        problemStatement: 'Model a 33kV distribution microgrid with distributed solar PV generation, evaluate fault currents during symmetrical and unsymmetrical faults, and configure numerical overcurrent relay coordination curves.',
        toolsUsed: ['MATLAB / Simulink', 'Simscape Electrical', 'ETAP (optional demo)'],
        keyDeliverables: ['Simulink model with fault injection blocks', 'Time-current characteristic (TCC) relay tripping curves', 'Voltage recovery report during transient disturbances'],
        portfolioImpact: 'Highly respected in PSU, power utility, and multinational engineering interviews (Siemens, Schneider, ABB, L&T).'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master circuit network theory, AC analysis, and fundamental magnetic fields.',
        keyActionItems: ['Learn Norton/Thevenin theorems, superposition, and maximum power transfer', 'Master 3-phase star/delta connections and power factor calculations', 'Study basic MATLAB programming'],
        placementTimingAdvice: 'Build rock-solid electrical circuit fundamentals.'
      },
      '2nd Year': {
        focusGoal: 'Deep dive into Electrical Machines (Transformers, DC/AC motors) and Control Systems.',
        keyActionItems: ['Understand transformer equivalent circuits, eddy current, and hysteresis losses', 'Plot Bode diagrams and root locus for motor feedback control', 'Learn to wire practical electrical panels in college labs'],
        placementTimingAdvice: 'Target summer internships at industrial manufacturing plants or power substations.'
      },
      '3rd Year': {
        focusGoal: 'Master Power Systems analysis (transmission parameters, faults, symmetrical components).',
        keyActionItems: ['Calculate fault currents for SLG, LL, and 3-phase short circuits', 'Model power transmission lines in MATLAB/Simulink', 'Prepare for technical aptitude and core interviews'],
        placementTimingAdvice: 'Peak recruitment for power utilities, core EPC firms (L&T, Tata Power), and PSUs.'
      },
      '4th Year': {
        focusGoal: 'Specialize in Smart Grids or EV powertrain electronics and crack core engineering jobs.',
        keyActionItems: ['Learn software tools like ETAP or PSCAD', 'Review safety regulations, Indian Electricity Rules, and switchgear operation'],
        placementTimingAdvice: 'Showcase practical simulation results and lab project experiences in interviews.'
      }
    }
  },
  {
    id: 'eee-ev-powertrain',
    title: 'Electric Vehicle (EV) Powertrain & Battery Systems Engineer',
    shortTitle: 'EV Powertrain Engineer',
    branchId: 'eee',
    branchName: 'Electrical & Electronics',
    tagline: 'Design high-efficiency inverter motor drives, battery management systems (BMS), and regenerative braking controls.',
    industrySector: 'Automotive / EV Startups / CleanTech (Tesla, Tata Motors, Ola Electric, Ather)',
    demandTrend: 'Explosive Growth',
    avgStartingPackage: '₹8 LPA - ₹22 LPA',
    interestTags: [
      'Power Electronics & Electric Vehicles',
      'Embedded Systems & Firmware',
      'Robotics & Automation'
    ],
    coreSkills: [
      { skillKey: 'control_systems', skillName: 'Motor Control (FOC, BLDC & PMSM)', targetScore: 85, weight: 35, description: 'Field-Oriented Control (FOC), Clarke/Park transforms, Space Vector PWM (SVPWM), and PI speed-current loops.' },
      { skillKey: 'electrical_machines', skillName: 'Permanent Magnet Synchronous Motors & Drives', targetScore: 80, weight: 30, description: 'PMSM torque production, saliency, back-EMF, regenerative braking, and thermal dissipation.' },
      { skillKey: 'power_systems', skillName: 'Power Electronics (Inverters, DC-DC Converters)', targetScore: 80, weight: 20, description: 'MOSFET/IGBT switching losses, Buck-Boost converters, gate driver circuits, and snubber designs.' },
      { skillKey: 'embedded_systems', skillName: 'Battery Management Systems (BMS) & CAN', targetScore: 75, weight: 15, description: 'State of Charge (SoC) estimation (Kalman Filters), cell balancing, thermal runaway prevention, and CAN communication.' }
    ],
    advancedSkills: [
      { skillKey: 'simulink_powertrain', skillName: 'MATLAB Powertrain Blockset Simulation', targetScore: 75, description: 'Drive cycle simulations (WLTP/FTP-75), vehicle range estimations, and regenerative efficiency.' },
      { skillKey: 'embedded_auto', skillName: 'AUTOSAR & Functional Safety (ISO 26262)', targetScore: 70, description: 'Automotive safety integrity levels (ASIL), fault diagnostic trees, and software architecture.' }
    ],
    careerProgression: [
      {
        stage: 'Associate EV Powertrain Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Junior Powertrain Engineer', 'BMS Calibration Associate'],
        salaryRange: '₹8 - ₹16 LPA',
        keyResponsibilities: ['Simulate motor torque-speed curves', 'Calibrate battery cell voltage and temperature sensors', 'Test inverter gate driver circuits on test benches'],
        criticalSkills: ['MATLAB/Simulink', 'Power Electronics', 'Embedded C', 'CANalyzer']
      },
      {
        stage: 'Senior EV Systems Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['EV Controls Engineer', 'Powertrain Lead'],
        salaryRange: '₹18 - ₹38 LPA',
        keyResponsibilities: ['Design Field-Oriented Control (FOC) motor firmware', 'Implement Extended Kalman Filter for real-time battery SoC estimation', 'Optimize inverter efficiency up to 98%'],
        criticalSkills: ['FOC Algorithms', 'Battery Chemistry & SoC Modeling', 'Hardware-in-the-Loop (HIL) Testing']
      },
      {
        stage: 'Chief EV Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Principal EV Architect', 'VP of Powertrain Engineering'],
        salaryRange: '₹40 - ₹85 LPA+',
        keyResponsibilities: ['Lead entire high-voltage vehicle electrical architecture, battery pack safety, and mass production rollout'],
        criticalSkills: ['High-Voltage Architecture', 'Global Automotive Compliance']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-eee-foc-motor-drive',
        title: 'Field-Oriented Control (FOC) PMSM Motor Drive Simulation with Regenerative Braking',
        targetSkillGaps: ['control_systems', 'electrical_machines', 'power_systems'],
        difficulty: 'Advanced',
        problemStatement: 'Design a closed-loop Space Vector PWM (SVPWM) Field-Oriented Control system for an EV PMSM motor, achieving fast torque response and energy recapture during deceleration.',
        toolsUsed: ['MATLAB / Simulink', 'Simscape Driveline', 'C/C++ for MCU code generation'],
        keyDeliverables: ['Complete Simulink FOC block diagram with Clarke/Park transforms', 'Current ripple and torque response graphs under sudden load steps', 'Efficiency map across vehicle drive cycle speeds'],
        portfolioImpact: 'Instant ticket into top EV engineering teams (Ather, Ola Electric, Tata Motors, Mahindra Electric).'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Build strong basics in electric circuits, semiconductors (diodes/transistors), and physics.',
        keyActionItems: ['Learn how capacitors, inductors, and MOSFETs store and switch energy', 'Learn MATLAB programming for scientific calculations', 'Study battery chemistry fundamentals (Li-ion cells)'],
        placementTimingAdvice: 'Build passion for green mobility and electric vehicles.'
      },
      '2nd Year': {
        focusGoal: 'Deep dive into Power Electronics (DC-DC converters, inverters) and AC machines.',
        keyActionItems: ['Simulate buck, boost, and bridge inverters in MATLAB', 'Understand rotating magnetic fields and induction/PMSM motors', 'Learn embedded C for microcontrollers'],
        placementTimingAdvice: 'Join college formula student / electric vehicle racing teams.'
      },
      '3rd Year': {
        focusGoal: 'Master Field-Oriented Control (FOC), Battery Management Systems (BMS), and CAN protocols.',
        keyActionItems: ['Implement motor control simulation loops', 'Learn cell balancing circuits and SoC estimation methods', 'Prepare for technical placement interviews at automotive companies'],
        placementTimingAdvice: 'Prime recruitment season for EV startups and legacy automotive brands.'
      },
      '4th Year': {
        focusGoal: 'Target specialized EV powertrain engineering roles with detailed portfolio projects.',
        keyActionItems: ['Document your vehicle simulation and hardware testbench results in a clean portfolio', 'Review thermal management and battery safety regulations (AIS-156)'],
        placementTimingAdvice: 'Demonstrate domain passion with working motor simulation demos.'
      }
    }
  },

  // ===================== MECHANICAL =====================
  {
    id: 'mech-cad-cae',
    title: 'Mechanical CAD / FEA Simulation Engineer',
    shortTitle: 'CAD / FEA Engineer',
    branchId: 'mech',
    branchName: 'Mechanical Engineering',
    tagline: 'Engineer precision mechanical components, run structural Finite Element Analysis (FEA), and optimize for manufacturing.',
    industrySector: 'Automotive / Aerospace / Heavy Machinery / Consumer Products',
    demandTrend: 'High',
    avgStartingPackage: '₹6 LPA - ₹16 LPA',
    interestTags: [
      'CAD / 3D Modeling & Simulation',
      'Robotics & Automation',
      'System Architecture & Low-Level Code'
    ],
    coreSkills: [
      { skillKey: 'cad_cam', skillName: '3D CAD Modeling & GD&T Standards', targetScore: 85, weight: 35, description: 'Parametric 3D modeling (SolidWorks/CATIA), Geometric Dimensioning and Tolerancing (GD&T ASME Y14.5), and manufacturing drawings.' },
      { skillKey: 'manufacturing', skillName: 'Manufacturing Processes & Materials', targetScore: 80, weight: 30, description: 'Machining, casting modulus (Chvorinov), sheet metal stamping, injection molding design rules, and CNC tooling.' },
      { skillKey: 'thermodynamics', skillName: 'Stress Analysis & Mechanics of Materials', targetScore: 80, weight: 25, description: 'Von Mises stress, Mohr’s circle, shear-moment diagrams, fatigue life (S-N curve), and buckling analysis.' },
      { skillKey: 'programming', skillName: 'FEA Simulation (ANSYS / Abaqus)', targetScore: 70, weight: 10, description: 'Mesh convergence, boundary conditions, static structural analysis, modal analysis, and thermal stresses.' }
    ],
    advancedSkills: [
      { skillKey: 'topology_opt', skillName: 'Topology Optimization & Generative Design', targetScore: 75, description: 'Mass reduction optimization for additive manufacturing (3D printing) under safety factor constraints.' },
      { skillKey: 'cfd_basics', skillName: 'Computational Fluid Dynamics (CFD)', targetScore: 70, description: 'Navier-Stokes discretization, boundary layer meshing (y+), and drag coefficient reduction.' }
    ],
    careerProgression: [
      {
        stage: 'Graduate Trainee Engineer (CAD/CAE)',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Junior Design Engineer', 'CAE Analyst Trainee'],
        salaryRange: '₹6 - ₹12 LPA',
        keyResponsibilities: ['Create 3D parametric models and 2D manufacturing drawings', 'Apply GD&T tolerances', 'Perform linear static FEA structural simulations in ANSYS'],
        criticalSkills: ['SolidWorks / CATIA / Creo', 'ANSYS Mechanical', 'GD&T', 'Material Selection']
      },
      {
        stage: 'Senior Mechanical Design Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Design Specialist', 'Senior CAE Analyst'],
        salaryRange: '₹14 - ₹28 LPA',
        keyResponsibilities: ['Lead complete subsystem design', 'Perform non-linear dynamic crash and fatigue simulations', 'Validate design for manufacturing and assembly (DFMA)'],
        criticalSkills: ['Non-linear FEA', 'DFMA', 'Fatigue Life Analysis', 'Thermal-Structural Coupling']
      },
      {
        stage: 'Principal Mechanical Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Chief Design Engineer', 'Director of Mechanical Engineering'],
        salaryRange: '₹30 - ₹65 LPA+',
        keyResponsibilities: ['Oversee product lifecycle management (PLM), global homologation certifications, and supplier tooling approvals'],
        criticalSkills: ['Product Architecture', 'Global Certification Standards']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-mech-fea-suspension',
        title: 'Topology Optimization & Structural FEA of an Automotive Suspension Control Arm',
        targetSkillGaps: ['cad_cam', 'thermodynamics', 'manufacturing'],
        difficulty: 'Intermediate',
        problemStatement: 'Design an automotive suspension A-arm in SolidWorks, perform static structural stress analysis under braking and cornering bump loads, and run topology optimization to reduce mass by 25% while maintaining a minimum safety factor of 1.8.',
        toolsUsed: ['SolidWorks / Fusion 360', 'ANSYS Mechanical / Workbench', 'Excel for stress calculations'],
        keyDeliverables: ['Parametric CAD model with 2D GD&T manufacturing drawing', 'Mesh convergence study plot verifying solution accuracy', 'Von Mises stress and total deformation contour plots with report'],
        portfolioImpact: 'The hallmark project for automotive and aerospace mechanical design campus recruitment.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master Engineering Graphics, Orthographic projections, and basic physics mechanics.',
        keyActionItems: ['Learn first-angle and third-angle projection principles', 'Practice freehand isometric sketching', 'Study vectors, statics, and free-body diagrams (FBD)'],
        placementTimingAdvice: 'Build deep spatial visualization capabilities.'
      },
      '2nd Year': {
        focusGoal: 'Master 3D CAD software (SolidWorks/CATIA) and Mechanics of Materials.',
        keyActionItems: ['Earn a CSWA/CSWP (Certified SolidWorks Associate/Professional) credential', 'Understand shear force, bending moments, and principal stresses', 'Learn manufacturing processes (casting, welding, machining)'],
        placementTimingAdvice: 'Target summer internships in machine shops or CAD design consultancies.'
      },
      '3rd Year': {
        focusGoal: 'Master FEA simulation (ANSYS) and Geometric Dimensioning & Tolerancing (GD&T).',
        keyActionItems: ['Run structural, thermal, and modal simulations in ANSYS', 'Learn standard GD&T symbols (flatness, parallelism, true position)', 'Prepare for core placement tests and technical interviews'],
        placementTimingAdvice: 'Peak recruitment for automotive, aerospace, and heavy machinery giants.'
      },
      '4th Year': {
        focusGoal: 'Compile an outstanding visual CAD/CAE portfolio and secure core engineering placements.',
        keyActionItems: ['Assemble a 10-page PDF portfolio showcasing your 3D CAD renders and FEA plots', 'Review failure theories (Tresca, Von Mises) and material stress-strain curves'],
        placementTimingAdvice: 'Bring physical components or printed portfolio binders to face-to-face interviews.'
      }
    }
  },
  {
    id: 'mech-thermal-fluids',
    title: 'Thermal & Fluid Systems Engineer',
    shortTitle: 'Thermal Systems Engineer',
    branchId: 'mech',
    branchName: 'Mechanical Engineering',
    tagline: 'Design high-efficiency heat exchangers, HVAC chillers, electronic cooling loops, and aerodynamic fluid systems.',
    industrySector: 'Aerospace / Automotive / Power Generation / Electronics Cooling',
    demandTrend: 'Steady',
    avgStartingPackage: '₹6 LPA - ₹15 LPA',
    interestTags: [
      'CAD / 3D Modeling & Simulation',
      'Smart Grids & Green Energy',
      'System Architecture & Low-Level Code'
    ],
    coreSkills: [
      { skillKey: 'thermodynamics', skillName: 'Applied Thermodynamics & Power Cycles', targetScore: 85, weight: 35, description: 'Carnot, Rankine, Brayton, and Otto cycles, entropy generation, exergy analysis, and psychrometrics.' },
      { skillKey: 'cad_cam', skillName: 'Heat Transfer & Fluid Mechanics', targetScore: 80, weight: 30, description: 'Conduction, convection (Nusselt/Reynolds numbers), radiation, pipe friction losses (Darcy-Weisbach), and boundary layers.' },
      { skillKey: 'manufacturing', skillName: 'Thermal Equipment Fabrication & Testing', targetScore: 75, weight: 20, description: 'Tubular heat exchangers, brazing, boiler codes (ASME), and flow measurement instruments (Venturi/Pitot).' },
      { skillKey: 'programming', skillName: 'MATLAB / Python for Thermodynamic Modeling', targetScore: 70, weight: 15, description: 'CoolProp thermodynamic property lookups, numerical heat equation solvers, and cycle optimization.' }
    ],
    advancedSkills: [
      { skillKey: 'cfd_thermal', skillName: 'ANSYS Fluent CFD Thermal Simulation', targetScore: 75, description: 'Turbulence modeling (k-epsilon, k-omega SST), conjugate heat transfer (CHT), and pressure drop analysis.' },
      { skillKey: 'ev_thermal', skillName: 'Battery Pack & Electronics Liquid Cooling', targetScore: 70, description: 'Cold plate design, coolant flow balancing, and thermal management for EV batteries.' }
    ],
    careerProgression: [
      {
        stage: 'Graduate Thermal Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Thermal Analyst Trainee', 'HVAC Design Engineer'],
        salaryRange: '₹6 - ₹12 LPA',
        keyResponsibilities: ['Perform heat load calculations', 'Size heat exchangers and cooling coils', 'Simulate fluid pressure drops across piping networks'],
        criticalSkills: ['Thermodynamics', 'Heat Transfer Calculations', 'HVAC Sizing', 'ANSYS Fluent']
      },
      {
        stage: 'Senior Thermal Systems Specialist',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Thermal Architect', 'Aerodynamics Engineer'],
        salaryRange: '₹14 - ₹26 LPA',
        keyResponsibilities: ['Lead battery thermal management system (BTMS) designs', 'Conduct complex conjugate heat transfer CFD analyses', 'Validate physical wind tunnel or calorimeter prototypes'],
        criticalSkills: ['Conjugate Heat Transfer', 'Fluent / Star-CCM+', 'Cooling System Architecture']
      },
      {
        stage: 'Principal Fluid/Thermal Architect',
        experienceYears: '5+ Years',
        typicalTitles: ['Chief Thermal Engineer', 'Head of Energy Systems'],
        salaryRange: '₹28 - ₹60 LPA+',
        keyResponsibilities: ['Oversee high-capacity power plant thermal cycles, space launch vehicle propulsion cooling, and green hydrogen systems'],
        criticalSkills: ['Propulsion / Cryogenics', 'Enterprise Thermal Strategy']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-mech-battery-cooling',
        title: 'Conjugate Heat Transfer Simulation of an EV Battery Liquid Cooling Cold Plate',
        targetSkillGaps: ['thermodynamics', 'cad_cam', 'manufacturing'],
        difficulty: 'Advanced',
        problemStatement: 'Design a micro-channel aluminum liquid cold plate for an 800V EV battery module and perform CFD simulations in ANSYS Fluent to maintain cell temperature below 35°C with less than 2°C temperature variance across cells.',
        toolsUsed: ['SolidWorks', 'ANSYS Fluent', 'CoolProp / MATLAB'],
        keyDeliverables: ['CAD model of serpentine cold plate channels', 'Temperature contour plot verifying maximum temperature <35°C', 'Pressure drop curve versus coolant flow rate'],
        portfolioImpact: 'Highly sought-after in EV, aerospace, and data center server cooling placement interviews.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master basic laws of thermodynamics, fluid properties, and differential equations.',
        keyActionItems: ['Understand First and Second Laws of Thermodynamics', 'Learn fluid statics, manometers, and buoyancy', 'Study temperature scales and ideal gas laws'],
        placementTimingAdvice: 'Build foundational command over physical energy principles.'
      },
      '2nd Year': {
        focusGoal: 'Deep dive into Applied Thermodynamics, Fluid Mechanics, and Heat Transfer.',
        keyActionItems: ['Solve steam table and psychrometric chart problems', 'Calculate Nusselt numbers for forced and free convection', 'Learn to use CoolProp thermodynamic libraries in Python'],
        placementTimingAdvice: 'Target summer internships in HVAC companies or energy utilities.'
      },
      '3rd Year': {
        focusGoal: 'Master CFD simulation (ANSYS Fluent) and heat exchanger design.',
        keyActionItems: ['Perform laminar and turbulent pipe flow simulations', 'Design shell-and-tube and plate-fin heat exchangers', 'Prepare for core placement technical rounds'],
        placementTimingAdvice: 'Key recruitment season for aerospace, automotive, and energy EPC firms.'
      },
      '4th Year': {
        focusGoal: 'Target high-growth thermal specializations like EV cooling and green energy systems.',
        keyActionItems: ['Complete a capstone project on clean energy or battery thermal cooling', 'Practice explaining thermodynamic tradeoffs with crisp clarity'],
        placementTimingAdvice: 'Demonstrate CFD mesh convergence and validation metrics in interviews.'
      }
    }
  },

  // ===================== CIVIL =====================
  {
    id: 'civil-structural-design',
    title: 'Structural Design & Analysis Engineer (RCC & Steel)',
    shortTitle: 'Structural Engineer',
    branchId: 'civil',
    branchName: 'Civil Engineering',
    tagline: 'Analyze high-rise structural loads, engineer reinforced concrete (RCC) frames, and ensure earthquake-resistant building safety.',
    industrySector: 'Structural Engineering Consultancies / Infrastructure Giants (L&T, Tata Projects) / Real Estate',
    demandTrend: 'Steady',
    avgStartingPackage: '₹6 LPA - ₹15 LPA',
    interestTags: [
      'Structural Design & BIM Modeling',
      'CAD / 3D Modeling & Simulation',
      'System Architecture & Low-Level Code'
    ],
    coreSkills: [
      { skillKey: 'structural_eng', skillName: 'RCC & Steel Design (IS 456 / IS 800)', targetScore: 85, weight: 35, description: 'Limit state design, moment-curvature, ductile detailing (IS 13920), shear walls, and foundation footing design.' },
      { skillKey: 'surveying', skillName: 'Structural Mechanics & Load Combinations', targetScore: 80, weight: 30, description: 'Bending moment and shear force envelopes, deflection limits, dead/live/wind/seismic load calculations (IS 1893 / IS 875).' },
      { skillKey: 'construction_tech', skillName: 'Concrete Technology & Construction Quality', targetScore: 75, weight: 20, description: 'Concrete mix design (IS 10262), curing mechanisms, slump tests, non-destructive testing, and rebar placement.' },
      { skillKey: 'programming', skillName: 'Structural Software (ETABS / STAAD.Pro)', targetScore: 75, weight: 15, description: '3D frame modeling, response spectrum seismic analysis, rebar schedule generation, and drift checks.' }
    ],
    advancedSkills: [
      { skillKey: 'post_tensioning', skillName: 'Prestressed Concrete & Post-Tensioning', targetScore: 70, description: 'Prestress losses, tendon profiling, end block stresses, and long-span bridge girders.' },
      { skillKey: 'seismic_retrofit', skillName: 'Performance-Based Seismic Design & Pushover Analysis', targetScore: 70, description: 'Non-linear static pushover analysis, base isolation, and tuned mass damper integration.' }
    ],
    careerProgression: [
      {
        stage: 'Graduate Structural Engineer',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Junior Structural Designer', 'Structural Detailer Trainee'],
        salaryRange: '₹6 - ₹11 LPA',
        keyResponsibilities: ['Model multi-story buildings in ETABS / STAAD.Pro', 'Calculate dead, live, and wind loads', 'Prepare structural reinforcement drawings in AutoCAD'],
        criticalSkills: ['ETABS / STAAD.Pro', 'IS 456 / IS 800 Codes', 'AutoCAD', 'Rebar Detailing']
      },
      {
        stage: 'Senior Structural Design Engineer',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Senior Structural Engineer', 'Project Structural Lead'],
        salaryRange: '₹13 - ₹25 LPA',
        keyResponsibilities: ['Lead seismic analysis for high-rise residential/commercial towers', 'Sign off on foundation raft and pile cap designs', 'Conduct site visits to verify rebar binding compliance'],
        criticalSkills: ['High-Rise Dynamic Analysis', 'Response Spectrum Analysis', 'Foundation Engineering', 'Site Coordination']
      },
      {
        stage: 'Principal Structural Consultant',
        experienceYears: '5+ Years',
        typicalTitles: ['Chief Structural Consultant', 'Director of Infrastructure Projects'],
        salaryRange: '₹28 - ₹60 LPA+',
        keyResponsibilities: ['Architect iconic infrastructure (bridges, metro viaducts, airports) and serve as Chartered Structural Engineer'],
        criticalSkills: ['Chartered Structural Authority', 'Iconic Bridge/Mega-Structure Engineering']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-civil-etabs-seismic',
        title: 'Seismic Analysis & Ductile Detailing of a G+12 Story RCC Framed Building in ETABS',
        targetSkillGaps: ['structural_eng', 'construction_tech', 'surveying'],
        difficulty: 'Intermediate',
        problemStatement: 'Model a 12-story commercial RCC building in ETABS, apply dead, live, wind, and seismic loads as per IS 1893:2016 for Zone IV, verify story drift limits, and prepare ductile beam-column joint detailing as per IS 13920.',
        toolsUsed: ['ETABS', 'AutoCAD', 'Excel for IS 456 moment capacity checks'],
        keyDeliverables: ['3D ETABS structural model file', 'Seismic base shear and story drift compliance report', 'AutoCAD structural drawing showing beam-column rebar schedules'],
        portfolioImpact: 'The absolute standard project required to secure structural design consultancy placements.'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master Engineering Mechanics, Vectors, Free Body Diagrams, and basic building materials.',
        keyActionItems: ['Learn to calculate support reactions, moments, and centroids', 'Study basic building construction terminology', 'Practice 2D drawing in AutoCAD'],
        placementTimingAdvice: 'Build foundational command over structural statics.'
      },
      '2nd Year': {
        focusGoal: 'Master Strength of Materials, Structural Analysis, and Concrete Technology.',
        keyActionItems: ['Plot shear force and bending moment diagrams for determinate and indeterminate beams', 'Learn IS 456 limit state principles for singly and doubly reinforced beams', 'Study concrete mix design ratios'],
        placementTimingAdvice: 'Target summer site engineering or survey internships.'
      },
      '3rd Year': {
        focusGoal: 'Master structural design software (ETABS/STAAD.Pro) and seismic loading codes.',
        keyActionItems: ['Model multi-story structures in ETABS with proper boundary conditions', 'Learn Indian Standard codes (IS 456, IS 800, IS 1893, IS 13920)', 'Prepare for technical placement rounds and core interviews'],
        placementTimingAdvice: 'Peak recruitment season for EPC giants (L&T Construction, Tata Projects, Shapoorji Pallonji).'
      },
      '4th Year': {
        focusGoal: 'Create a complete structural calculation sheet portfolio and secure design consultancy roles.',
        keyActionItems: ['Assemble your ETABS analysis reports and reinforcement detailing drawings into a portfolio binder', 'Review site troubleshooting scenarios (honeycombing, cracking, settlement)'],
        placementTimingAdvice: 'Bring printed structural calculation packages to consultancy interviews.'
      }
    }
  },
  {
    id: 'civil-bim-virtual',
    title: 'Building Information Modeling (BIM) & Virtual Construction Specialist',
    shortTitle: 'BIM Specialist',
    branchId: 'civil',
    branchName: 'Civil Engineering',
    tagline: 'Construct intelligent 3D/4D digital building twins, coordinate multi-disciplinary clash detection, and streamline construction scheduling.',
    industrySector: 'Global AEC Firms / Smart Cities / International Contracting (Atkins, Jacobs, WSP, AECOM)',
    demandTrend: 'Very High',
    avgStartingPackage: '₹7 LPA - ₹18 LPA',
    interestTags: [
      'Structural Design & BIM Modeling',
      'CAD / 3D Modeling & Simulation',
      'Web & Full-Stack Development'
    ],
    coreSkills: [
      { skillKey: 'construction_tech', skillName: 'BIM Modeling & 4D/5D Scheduling', targetScore: 85, weight: 35, description: 'Autodesk Revit architecture/structure, Navisworks clash detection, 4D construction sequencing, and 5D quantity takeoff.' },
      { skillKey: 'structural_eng', skillName: 'Building Systems & Multi-Disciplinary Coordination', targetScore: 80, weight: 30, description: 'Structural frames, MEP (Mechanical, Electrical, Plumbing) services routing, and architectural interfaces.' },
      { skillKey: 'surveying', skillName: 'Geomatics, Drone Surveys & Point Clouds', targetScore: 75, weight: 20, description: 'LiDAR point cloud scanning, Total Station integration, coordinate georeferencing, and scan-to-BIM modeling.' },
      { skillKey: 'programming', skillName: 'Computational BIM (Dynamo / Python)', targetScore: 70, weight: 15, description: 'Parametric Dynamo visual scripting for automated rebar modeling, parameter mapping, and schedule exports.' }
    ],
    advancedSkills: [
      { skillKey: 'digital_twin', skillName: 'Digital Twins & Facility Management (COBie)', targetScore: 75, description: 'Asset data schemas, ISO 19650 international BIM standards, and IoT sensor integration.' },
      { skillKey: 'cde_platforms', skillName: 'Common Data Environments (Autodesk Construction Cloud)', targetScore: 70, description: 'BIM 360 cloud workflows, issue tracking, and model versioning governance.' }
    ],
    careerProgression: [
      {
        stage: 'BIM Modeler / Trainee',
        experienceYears: '0 - 2 Years',
        typicalTitles: ['Graduate BIM Engineer', 'Junior Revit Modeler'],
        salaryRange: '₹6.5 - ₹12 LPA',
        keyResponsibilities: ['Create LOD 300/350 structural and architectural Revit models', 'Extract parametric material quantity takeoffs', 'Resolve geometric clashes in Navisworks'],
        criticalSkills: ['Autodesk Revit', 'Navisworks Manage', 'AutoCAD', 'ISO 19650 Basics']
      },
      {
        stage: 'BIM Coordinator',
        experienceYears: '2 - 5 Years',
        typicalTitles: ['Senior BIM Specialist', 'Virtual Design Coordinator'],
        salaryRange: '₹14 - ₹28 LPA',
        keyResponsibilities: ['Run multi-disciplinary coordination meetings across Architecture, Structure, and MEP teams', 'Develop custom Dynamo automation scripts', 'Manage cloud models on Autodesk Construction Cloud'],
        criticalSkills: ['Navisworks Clash Matrix', 'Dynamo Visual Scripting', '4D Synchro Scheduling', 'AEC Cloud Workflows']
      },
      {
        stage: 'Head of Digital Construction / BIM Manager',
        experienceYears: '5+ Years',
        typicalTitles: ['BIM Director', 'Head of Digital Engineering'],
        salaryRange: '₹30 - ₹65 LPA+',
        keyResponsibilities: ['Author enterprise BIM Execution Plans (BEP), enforce ISO 19650 quality compliance across global mega-projects'],
        criticalSkills: ['Enterprise BIM Strategy', 'Digital Twin Deployment']
      }
    ],
    recommendedProjects: [
      {
        id: 'proj-civil-bim-clash',
        title: 'LOD 350 Multi-Disciplinary BIM Coordination & Automated Clash Matrix in Navisworks',
        targetSkillGaps: ['construction_tech', 'structural_eng', 'surveying'],
        difficulty: 'Intermediate',
        problemStatement: 'Develop a federated 3D model of an institutional building combining architectural concrete frames and MEP ventilation ducts in Autodesk Revit, conduct hard and clearance clash detection in Navisworks, and automate quantity takeoff schedules.',
        toolsUsed: ['Autodesk Revit', 'Navisworks Manage', 'Dynamo for Revit', 'Excel'],
        keyDeliverables: ['Federated .NWD Navisworks coordination model', 'Clash detective audit matrix resolving 50+ interferences', 'Automated bill of materials (BOM) schedule exported via Dynamo'],
        portfolioImpact: 'Huge competitive advantage for international engineering consultancies (WSP, Jacobs, Atkins, Ramboll).'
      }
    ],
    yearWiseStrategy: {
      '1st Year': {
        focusGoal: 'Master AutoCAD 2D drafting, spatial dimensions, and basic building materials.',
        keyActionItems: ['Learn layer management, blocks, and dimensioning standards in AutoCAD', 'Understand fundamental floor plans, elevations, and building sections', 'Learn basic computer literacy and spreadsheets'],
        placementTimingAdvice: 'Build precision and digital modeling discipline.'
      },
      '2nd Year': {
        focusGoal: 'Transition from 2D CAD to 3D BIM parametric modeling using Autodesk Revit.',
        keyActionItems: ['Model residential villas and commercial floors in Autodesk Revit', 'Understand Level of Development (LOD 100 to 350) definitions', 'Learn Surveying and georeferencing coordinates'],
        placementTimingAdvice: 'Target summer BIM modeling internships with design firms.'
      },
      '3rd Year': {
        focusGoal: 'Master Navisworks clash coordination, 4D scheduling, and Dynamo automation.',
        keyActionItems: ['Run clash detection between structural elements and ductwork in Navisworks', 'Create visual automation scripts in Dynamo to save modeling time', 'Learn ISO 19650 international BIM workflows'],
        placementTimingAdvice: 'Key campus recruitment for global AEC consultancies and digital contractors.'
      },
      '4th Year': {
        focusGoal: 'Assemble an interactive 3D digital model portfolio and secure high-package BIM roles.',
        keyActionItems: ['Host Navisworks clash reports and 3D Revit models on a digital portfolio site', 'Practice explaining multi-disciplinary clash resolutions with crisp engineering logic'],
        placementTimingAdvice: 'Present interactive 3D model walkthroughs during virtual and in-person interviews.'
      }
    }
  }
];

// Calculate personalized dynamic recommendations based on student profile + verified scores
export function calculateStudentCareerRecommendations(params: {
  branch: string;
  academicYear: AcademicYear;
  interests: string[];
  assessment: AssessmentResult | null;
  targetGoal?: PreparationGoal;
}): StudentRoleRecommendation[] {
  const { branch, academicYear, interests, assessment } = params;

  // Score each role in the database
  const scoredRoles = CAREER_ROLES_DATABASE.map((role) => {
    let score = 0;
    const isPrimaryBranchMatch = role.branchId === branch;

    // 1. Branch synergy score (up to 40 points)
    if (isPrimaryBranchMatch) {
      score += 40;
    } else {
      // Related interdisciplinary paths
      const crossBranchMap: Record<string, string[]> = {
        cse: ['it', 'aiml', 'ds'],
        aiml: ['cse', 'ds', 'it'],
        ds: ['cse', 'aiml', 'it'],
        it: ['cse', 'ds', 'aiml'],
        ece: ['eee', 'cse', 'mech'],
        eee: ['ece', 'mech'],
        mech: ['civil', 'eee', 'ece'],
        civil: ['mech']
      };
      if (crossBranchMap[branch]?.includes(role.branchId)) {
        score += 26;
      } else {
        score += 15;
      }
    }

    // 2. Student Selected Interests match (up to 30 points)
    const matchingInterests = role.interestTags.filter(tag => interests.includes(tag));
    const interestRatio = role.interestTags.length > 0 ? matchingInterests.length / role.interestTags.length : 0;
    score += Math.round(interestRatio * 30);

    // 3. Assessed Skills & Verified Evidence (up to 30 points)
    const missingSkills: any[] = [];
    const strengthsApplied: string[] = [];

    let assessedSkillPoints = 0;
    let totalAssessedWeight = 0;

    role.coreSkills.forEach((skillReq) => {
      totalAssessedWeight += skillReq.weight;
      const studentSkillData = assessment?.skillScores?.[skillReq.skillKey];

      if (studentSkillData) {
        const studentScore = studentSkillData.score;
        if (studentScore >= skillReq.targetScore) {
          // Met or exceeded
          assessedSkillPoints += skillReq.weight;
          strengthsApplied.push(`${skillReq.skillName} (Scored ${studentScore}% vs target ${skillReq.targetScore}%)`);
        } else {
          // Below benchmark
          const ratio = studentScore / skillReq.targetScore;
          assessedSkillPoints += Math.round(skillReq.weight * ratio);
          const gapSize = skillReq.targetScore - studentScore;
          missingSkills.push({
            skillKey: skillReq.skillKey,
            skillName: skillReq.skillName,
            requiredScore: skillReq.targetScore,
            currentScore: studentScore,
            gapSeverity: gapSize > 25 ? 'Critical' : gapSize > 12 ? 'Moderate' : 'Minor',
            improvementAdvice: `Current verified score is ${studentScore}%. Bridge this ${gapSize}% gap to meet the entry benchmark (${skillReq.targetScore}%) for ${role.shortTitle}.`
          });
        }
      } else {
        // Not yet verified in assessment
        // Assign a modest baseline assumption based on academic year
        const baselineScore = academicYear === '4th Year' ? 65 : academicYear === '3rd Year' ? 55 : academicYear === '2nd Year' ? 45 : 35;
        const ratio = Math.min(baselineScore / skillReq.targetScore, 1.0);
        assessedSkillPoints += Math.round(skillReq.weight * ratio * 0.7);
        missingSkills.push({
          skillKey: skillReq.skillKey,
          skillName: skillReq.skillName,
          requiredScore: skillReq.targetScore,
          currentScore: baselineScore,
          gapSeverity: skillReq.targetScore - baselineScore > 25 ? 'Critical' : 'Moderate',
          improvementAdvice: `Target benchmark is ${skillReq.targetScore}%. Take the Skill Assessment to calibrate your actual placement readiness.`
        });
      }
    });

    if (totalAssessedWeight > 0) {
      score += Math.round((assessedSkillPoints / totalAssessedWeight) * 30);
    } else {
      score += 15;
    }

    // Clamp score to 98% max
    const finalMatchScore = Math.min(Math.max(score, 32), 98);

    // Personalized Why Recommended synthesis
    let primaryReason = '';
    if (isPrimaryBranchMatch && matchingInterests.length > 0) {
      primaryReason = `Top match for your ${role.branchName} curriculum with verified interest in ${matchingInterests.slice(0, 2).join(' and ')}.`;
    } else if (isPrimaryBranchMatch) {
      primaryReason = `Core high-demand career trajectory directly aligned with your ${role.branchName} degree.`;
    } else if (matchingInterests.length > 0) {
      primaryReason = `Interdisciplinary opportunity matching your specialized passion in ${matchingInterests[0]}.`;
    } else {
      primaryReason = `Complementary high-growth engineering domain broadening your technical versatility.`;
    }

    const branchSynergy = isPrimaryBranchMatch 
      ? `Directly leverages your ${role.branchName} foundational coursework and lab training.`
      : `High-value crossover track where your engineering branch offers a unique problem-solving edge.`;

    const academicYearContext = role.yearWiseStrategy[academicYear]?.focusGoal || 
      `Calibrated for ${academicYear} preparation timeline.`;

    const skillAlignmentNote = strengthsApplied.length > 0
      ? `Backed by strong assessed performance in ${strengthsApplied[0]}.`
      : `Complete your Skill Assessment to lock in verified competency proof for this role.`;

    return {
      role,
      matchScore: finalMatchScore,
      isPrimaryBranchMatch,
      whyRecommended: {
        primaryReason,
        branchSynergy,
        interestOverlap: matchingInterests,
        academicYearContext,
        skillAlignmentNote
      },
      missingSkills,
      strengthsApplied
    };
  });

  // Sort: primary branch matches first, then by matchScore descending
  scoredRoles.sort((a, b) => {
    if (a.isPrimaryBranchMatch && !b.isPrimaryBranchMatch) return -1;
    if (!a.isPrimaryBranchMatch && b.isPrimaryBranchMatch) return 1;
    return b.matchScore - a.matchScore;
  });

  return scoredRoles;
}
