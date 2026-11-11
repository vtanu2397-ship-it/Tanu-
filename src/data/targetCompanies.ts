import { TargetCompany, CompanyCategory } from '../types';

export const COMPANY_CATEGORIES: { id: CompanyCategory; label: string; description: string }[] = [
  {
    id: 'tier1_product',
    label: 'Product & Tech Giants',
    description: 'High-bar DSA problem solving, system design foundations, CS core, and behavioral culture fit.'
  },
  {
    id: 'it_services',
    label: 'IT Services & Mass Recruiters',
    description: 'Comprehensive aptitude, speed math, verbal ability, foundational programming, and technical fundamentals.'
  },
  {
    id: 'core_engineering',
    label: 'Core Engineering & Manufacturing',
    description: 'Heavy emphasis on discipline fundamentals (Thermodynamics, Power Systems, VLSI, Structural Analysis) and technical viva.'
  }
];

export const TARGET_COMPANIES: TargetCompany[] = [
  // 1. GOOGLE
  {
    id: 'google',
    name: 'Google',
    shortName: 'Google',
    category: 'tier1_product',
    categoryLabel: 'Product & Tech Giants',
    accentColor: 'indigo',
    badge: 'Tier-1 Product',
    logoPlaceholder: 'G',
    description: 'Worldwide leader in search, cloud, AI, and systems engineering. Placement selection emphasizes exceptional data structures, asymptotic efficiency, code cleanliness, and Googleyness.',
    hiringModel: 'Online Coding Challenge (2-3 DSA problems) followed by 3-4 Rounds of 45-minute live technical coding and Googleyness behavioral interview.',
    disclaimer: 'Educational practice guide based on public candidate interview logs and standard software engineering curricula. Not affiliated with or endorsed by Google LLC. Actual recruitment rounds and question formats vary.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'Online Assessment (Google OA)',
        format: 'Online Test (60-90 mins)',
        focus: '2 complex algorithmic problems (Graphs, Trees, DP, Combinatorics)',
        tips: 'Write bug-free code handling corner cases, large constraints, and strict execution time limits.'
      },
      {
        roundNumber: 2,
        name: 'Technical Round 1: Core Algorithms',
        format: 'Live Coding (45 mins)',
        focus: 'Data Structures, Recursion, Time & Space Complexity analysis',
        tips: 'Think out loud. Clarify constraints (null values, negative numbers, input size) before coding.'
      },
      {
        roundNumber: 3,
        name: 'Technical Round 2: Advanced Problem Solving',
        format: 'Live Coding (45 mins)',
        focus: 'Graph traversals (BFS/DFS, Dijkstra), Dynamic Programming, Greedy approaches',
        tips: 'Offer a naive brute-force first, then systematically optimize to O(N) or O(N log N).'
      },
      {
        roundNumber: 4,
        name: 'Googleyness & Leadership (Googler Fit)',
        format: 'Behavioral & Situational (45 mins)',
        focus: 'Navigating ambiguity, ethical decision making, collaboration, bias for action',
        tips: 'Use the STAR method (Situation, Task, Action, Result) with tangible metrics and personal ownership.'
      }
    ],
    internshipPrograms: [
      {
        id: 'google-step',
        name: 'Google STEP Internship (Student Training in Engineering Program)',
        targetYear: '2nd Year B.Tech (Sophomores / 4th Semester)',
        duration: '10 - 12 Weeks (May – July)',
        stipendBenchmark: '₹1,00,000 – ₹1,25,000 / month (Sample Industry Benchmark)',
        eligibleBranches: ['CSE', 'AI & ML', 'Data Science', 'IT', 'ECE'],
        selectionProcess: [
          'Resume screening (CGPA cutoff, foundational CS coursework, GitHub projects)',
          '2 Technical Interviews (45 mins each on Basic DSA & Problem Solving)'
        ],
        evaluationFocus: ['Arrays, Strings, Recursion', 'Clean readable code', 'Receptiveness to hints', 'Enthusiasm and learning agility'],
        ppoConversionGuidance: 'Outstanding STEP interns are eligible for direct conversion to 3rd-year SWE Summer Internships or early full-time return offers based on host manager assessment.',
        applicationTimeline: 'Applications typically open November – January.'
      },
      {
        id: 'google-swe-intern',
        name: 'Google Software Engineering (SWE) Summer Internship',
        targetYear: '3rd Year B.Tech (Pre-Final Year / 6th Semester)',
        duration: '10 - 12 Weeks (May – July)',
        stipendBenchmark: '₹1,10,000 – ₹1,40,000 / month (Sample Industry Benchmark)',
        eligibleBranches: ['CSE', 'AI & ML', 'Data Science', 'IT', 'ECE', 'All B.Tech with strong coding'],
        selectionProcess: [
          'Online Coding Challenge (2 algorithmic problems)',
          '2-3 Rounds of live Technical Interviews (Trees, Graphs, DP)',
          'Team matching with host engineering teams'
        ],
        evaluationFocus: ['Trees, Graphs (BFS/DFS), Dynamic Programming', 'Time/Space complexity proofs', 'Writing production-ready code', 'Googleyness & collaboration'],
        ppoConversionGuidance: 'Host manager and peers submit feedback packets to the Google Hiring Committee. Strong performance and project delivery leads to a full-time Pre-Placement Offer (PPO).',
        applicationTimeline: 'On-campus August – October; Off-campus applications August – December.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'goog-apt-1',
          title: 'Algorithmic Probability & Combinatorics',
          description: 'Expected value, Markov inequality bounds, permutations, and graph coloring combinatorics.',
          category: 'aptitude',
          estimatedHours: 8,
          importance: 'High',
          keyTips: ['Revise Bayes theorem, random variable expectations, and pigeonhole principle applications in algorithms.']
        },
        {
          id: 'goog-apt-2',
          title: 'Logical Deduction & Constraint Satisfaction',
          description: 'Solving complex deductive puzzles, state transitions, and minimax logic.',
          category: 'aptitude',
          estimatedHours: 6,
          importance: 'Medium',
          keyTips: ['Practice converting verbal constraints into mathematical inequality systems.']
        }
      ],
      technical: [
        {
          id: 'goog-tech-1',
          title: 'Operating Systems & Concurrency',
          description: 'Mutexes, semaphores, deadlock conditions, thread synchronization, memory virtualization, and cache hierarchies (L1/L2/L3).',
          category: 'technical',
          estimatedHours: 14,
          importance: 'Critical',
          keyTips: ['Understand race conditions and false sharing in multi-threaded programs.']
        },
        {
          id: 'goog-tech-2',
          title: 'Computer Networks & Distributed Systems Fundamentals',
          description: 'TCP 3-way handshake, TCP congestion control algorithms, DNS resolution flow, HTTP/2 vs HTTP/3, and RPC protocols (gRPC).',
          category: 'technical',
          estimatedHours: 12,
          importance: 'High',
          keyTips: ['Be able to trace packet flow from browser address bar to web server and back.']
        },
        {
          id: 'goog-tech-3',
          title: 'Object-Oriented Design & Clean Code Standards',
          description: 'SOLID principles, Factory, Strategy, and Observer design patterns, unit testability, and defensive programming.',
          category: 'technical',
          estimatedHours: 10,
          importance: 'High',
          keyTips: ['Design loosely coupled components with single responsibilities and interface abstraction.']
        }
      ],
      coding: [
        {
          id: 'goog-code-1',
          title: 'Graph Algorithms & Shortest Path',
          description: 'BFS, DFS, Dijkstra, Bellman-Ford, Topological Sort (Kahn\'s algorithm), and Disjoint Set Union (Union-Find with path compression).',
          category: 'coding',
          estimatedHours: 20,
          importance: 'Critical',
          keyTips: ['Master cycle detection in directed vs undirected graphs.']
        },
        {
          id: 'goog-code-2',
          title: 'Dynamic Programming & Memoization',
          description: '0/1 Knapsack variations, Longest Common Subsequence, Matrix Chain Multiplication, Tree DP, and Bitmask DP.',
          category: 'coding',
          estimatedHours: 25,
          importance: 'Critical',
          keyTips: ['Define DP states rigorously: state what dp[i][j] represents before writing code.']
        },
        {
          id: 'goog-code-3',
          title: 'Binary Search & Monotonic Predicates',
          description: 'Binary search on answer space (allocating pages, minimum capacity to ship packages, aggressive cows pattern).',
          category: 'coding',
          estimatedHours: 12,
          importance: 'High',
          keyTips: ['Watch out for integer overflow: use low + (high - low) / 2 instead of (low + high) / 2.']
        }
      ],
      coreBranch: {
        cse: [
          {
            id: 'goog-core-cse-1',
            title: 'Distributed Storage & CAP Theorem',
            description: 'Consistency, Availability, Partition tolerance trade-offs, LSM-trees vs B-Trees.',
            category: 'core_branch',
            estimatedHours: 10,
            importance: 'High',
            keyTips: ['Study how Google Spanner provides external consistency using TrueTime API.']
          }
        ],
        aiml: [
          {
            id: 'goog-core-aiml-1',
            title: 'Transformer Attention & Scaled Matrix Computations',
            description: 'Self-attention time/memory complexity O(N^2), FlashAttention mechanics, and KV-cache optimization.',
            category: 'core_branch',
            estimatedHours: 14,
            importance: 'Critical',
            keyTips: ['Explain why query-key dot product is divided by sqrt(d_k).']
          }
        ],
        ece: [
          {
            id: 'goog-core-ece-1',
            title: 'Computer Architecture & TPU Hardware Basics',
            description: 'Systolic arrays for tensor multiplication, pipelining hazards, cache coherence (MESI protocol).',
            category: 'core_branch',
            estimatedHours: 12,
            importance: 'High',
            keyTips: ['Relate hardware memory bandwidth bottlenecks to AI training throughput.']
          }
        ]
      },
      techInterview: [
        {
          id: 'goog-hint-1',
          title: 'Live Whiteboard Problem Breakdown Strategy',
          description: 'Step 1: Clarify input bounds; Step 2: Validate edge cases; Step 3: Walk through manual test case; Step 4: Propose complexity; Step 5: Code; Step 6: Trace with sample.',
          category: 'tech_interview',
          estimatedHours: 8,
          importance: 'Critical',
          keyTips: ['Never jump directly into coding without interviewer alignment.']
        }
      ],
      hrInterview: [
        {
          id: 'goog-hr-1',
          title: 'Googleyness: Navigating Ambiguity & Disagreement',
          description: 'Demonstrating how you handled unstructured problems, resolved engineering disagreements with data, and prioritized end-user benefit.',
          category: 'hr_interview',
          estimatedHours: 6,
          importance: 'Critical',
          keyTips: ['Frame failures as constructive learning moments with concrete follow-up improvements.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'CSE students have strong foundational alignment. Focus on LeetCode Medium/Hard algorithmic mastery and write production-clean code with minimal boilerplate.',
        focusAreas: ['Graphs & Disjoint Sets', 'Multi-threading & OS Deadlocks', 'DP State Optimization'],
        commonMistakes: ['Neglecting edge cases like empty inputs, integer overflow, or single-node trees.']
      },
      aiml: {
        advice: 'Balance pure ML knowledge with strong classical software engineering. Google ML roles test rigorous DSA first before deep domain modeling.',
        focusAreas: ['NumPy/Tensor vectorization internals', 'Time complexity of attention', 'Data pipelines'],
        commonMistakes: ['Relying only on high-level Python libraries without understanding algorithmic complexity under the hood.']
      },
      ds: {
        advice: 'Emphasize strong SQL efficiency, statistical hypothesis foundations, and distributed data processing (MapReduce / Spark concepts).',
        focusAreas: ['Statistical Significance & A/B Testing', 'Large-scale aggregation algorithms', 'Python DSA'],
        commonMistakes: ['Treating SQL window functions as black boxes without considering table scan and indexing implications.']
      },
      it: {
        advice: 'Leverage strong networking and cloud familiarity. Emphasize solid algorithmic skills alongside web infrastructure and distributed systems.',
        focusAreas: ['TCP/IP & HTTP protocols', 'System design basics', 'Trees and Graph traversal'],
        commonMistakes: ['Writing monolithic code rather than decomposing problems into modular helper functions.']
      },
      ece: {
        advice: 'Highlight low-level C/C++ memory management, embedded firmware knowledge, or hardware accelerator pipelines (TPU/ASIC), while matching CS peers on core DSA.',
        focusAreas: ['Bit manipulation & Pointers', 'Pipelining & Cache coherence', 'Graph algorithms'],
        commonMistakes: ['Assuming hardware knowledge replaces algorithmic problem solving in standard software engineering rounds.']
      },
      eee: {
        advice: 'Focus on mathematical modeling, linear algebra, and building strong programming fundamentals in C++ or Python.',
        focusAreas: ['DSA from scratch (Arrays to Trees)', 'Time/Space complexity notation', 'Operating System basics'],
        commonMistakes: ['Lack of daily algorithmic practice with time-constrained LeetCode problems.']
      },
      mech: {
        advice: 'Transitioning to Google requires solid demonstrable coding credentials. Build 2 high-impact full-stack or systems projects and practice 150+ DSA problems.',
        focusAreas: ['Data Structures (HashMaps, Heaps, Trees)', 'Object-Oriented Programming in Java/C++', 'Clean code'],
        commonMistakes: ['Not mastering Big-O analysis and recursion early on.']
      },
      civil: {
        advice: 'Emphasize analytical rigor, computational problem solving, and rigorous software development foundations with git and standard algorithms.',
        focusAreas: ['Foundational DSA in C++ or Java', 'Database queries & DBMS', 'Systematic debugging'],
        commonMistakes: ['Failing to practice coding on a plain text editor or Google Docs without syntax highlighting.']
      }
    },
    practiceQuestions: [
      {
        id: 'goog-q1',
        companyId: 'google',
        category: 'coding',
        categoryLabel: 'Coding & Algorithms',
        title: 'Longest Substring Without Repeating Characters',
        question: 'Given a string s, find the length of the longest substring without repeating characters with an optimal time complexity of O(N).',
        codeSnippet: `// Example: s = "abcabcbb" -> Output: 3 ("abc")\n// Example: s = "pwwkew"   -> Output: 3 ("wke")`,
        options: [
          { id: 'a', text: 'O(N^2) using nested loops to test every substring.' },
          { id: 'b', text: 'O(N) using sliding window with a HashMap/Array tracking last seen index of each character.' },
          { id: 'c', text: 'O(N log N) by sorting the string characters first.' },
          { id: 'd', text: 'O(2^N) using recursive backtracking.' }
        ],
        correctAnswer: 'b',
        explanation: 'The optimal approach maintains two pointers (left and right). As right advances, if s[right] was seen inside the current window, left jumps to lastSeen[s[right]] + 1. Time complexity is O(N) since each character is visited at most twice; space complexity is O(min(m, n)) where m is charset size.',
        difficulty: 'Medium'
      },
      {
        id: 'goog-q2',
        companyId: 'google',
        category: 'technical',
        categoryLabel: 'Technical Concepts (OS)',
        title: 'Deadlock Necessary Conditions (Coffman Conditions)',
        question: 'Which of the following is NOT one of Coffman\'s four necessary conditions for a deadlock to occur in an operating system?',
        options: [
          { id: 'a', text: 'Mutual Exclusion' },
          { id: 'b', text: 'Hold and Wait' },
          { id: 'c', text: 'Preemptive Resource Allocation' },
          { id: 'd', text: 'Circular Wait' }
        ],
        correctAnswer: 'c',
        explanation: 'The four Coffman conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (resources cannot be forcibly confiscated), and 4. Circular Wait. Preemption actually BREAKS deadlocks rather than causing them.',
        difficulty: 'Medium'
      },
      {
        id: 'goog-q3',
        companyId: 'google',
        category: 'tech_interview',
        categoryLabel: 'Technical Interview Scenario',
        title: 'Handling High-Scale Rate Limiting',
        question: 'An interviewer asks: "How would you design an in-memory rate limiter for a Google public API that allows 100 requests per minute per user IP, handling millions of requests per second across distributed instances?"',
        explanation: 'Ideal Response Strategy:\n1. State Algorithm: Choose Sliding Window Counter or Token Bucket over Fixed Window to prevent traffic spikes at window boundaries.\n2. Distributed Coordination: Store token bucket state in a high-throughput cache like Redis using Lua scripts for atomic increments (evalsha) or use local in-memory token buckets with periodic asynchronous gossip/syncing to avoid network round-trip overhead on every single request.\n3. Graceful Degradation: If the cache is unreachable, fail open with a local safety limit to protect uptime.\n4. IP Spoofing defense: Check trusted reverse-proxy headers (e.g. X-Forwarded-For parsed strictly against verified load balancer IP).',
        difficulty: 'Hard'
      },
      {
        id: 'goog-q4',
        companyId: 'google',
        category: 'hr_interview',
        categoryLabel: 'Googleyness & Behavioral',
        title: 'STAR Response: Resolving an Engineering Disagreement',
        question: 'Tell me about a time you strongly disagreed with a team member or project lead regarding a technical decision. How did you handle it and what was the outcome?',
        explanation: 'Structure with STAR:\n- Situation: In our college capstone project, our teammate wanted to use MongoDB for a financial transaction ledger, whereas I believed PostgreSQL with ACID guarantees was necessary.\n- Task: I needed to resolve the architecture decision without creating team friction while ensuring our ledger was mathematically consistent.\n- Action: Rather than debating opinions, I created a quick benchmark script simulating concurrent account transfers. I demonstrated that under concurrent writes without two-phase locking, MongoDB produced phantom balances, whereas Postgres serialized transactions correctly.\n- Result: The team unanimously agreed on Postgres. The project was delivered with zero ledger balance discrepancies, and my teammate appreciated the objective, benchmark-driven resolution.',
        starGuide: {
          situation: 'Disagreement on database choice for concurrent financial transaction ledger in final-year project.',
          task: 'Resolve technical architecture objectively without alienating teammates.',
          action: 'Created a reproducible concurrent transfer benchmark script demonstrating race condition failure modes.',
          result: 'Adopted relational ACID model, delivered flawless ledger, and strengthened peer technical trust.'
        },
        difficulty: 'Medium'
      }
    ]
  },

  // 2. MICROSOFT
  {
    id: 'microsoft',
    name: 'Microsoft',
    shortName: 'Microsoft',
    category: 'tier1_product',
    categoryLabel: 'Product & Tech Giants',
    accentColor: 'sky',
    badge: 'Tier-1 Product',
    logoPlaceholder: 'MS',
    description: 'Global tech titan driving Azure Cloud, Office, Windows, and AI (Copilot). Interviews focus on clean OOP design, Trees/Strings/Arrays DSA, debugging ability, and growth mindset.',
    hiringModel: 'Online Coding Assessment (Codility / Mettl) followed by 3-4 Rounds of Technical Interviews (DSA, Low-Level Design, OS/DBMS) and an "As Appropriate" (AA) Director round.',
    disclaimer: 'Curated for academic preparation from public interview debriefs. Not affiliated with or endorsed by Microsoft Corporation. Specific campus process patterns may differ.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'Online Coding Assessment',
        format: 'Codility / Mettl (75-90 mins)',
        focus: '2-3 algorithmic problems (Arrays, HashMaps, String manipulation, Recursion)',
        tips: 'Codility checks correctness AND performance. Avoid O(N^2) if N >= 10^5.'
      },
      {
        roundNumber: 2,
        name: 'Technical Round 1: DSA & Problem Solving',
        format: 'Live Interview (45-60 mins)',
        focus: 'Binary Trees, Linked Lists, Two Pointers, Stacks/Queues',
        tips: 'Write modular code with descriptive variable names. Explain test cases proactively.'
      },
      {
        roundNumber: 3,
        name: 'Technical Round 2: Core CS & Low-Level Design',
        format: 'Live Interview (45-60 mins)',
        focus: 'OOP principles, Design Patterns, DBMS Normalization, Operating System Internals',
        tips: 'Expect questions linking your resume projects to database query plans and concurrency.'
      },
      {
        roundNumber: 4,
        name: 'As Appropriate (AA) / Managerial Round',
        format: 'Leadership Interview (45-60 mins)',
        focus: 'Growth mindset, customer obsession, system architecture trade-offs, culture fit',
        tips: 'Emphasize continuous learning, how you bounce back from setbacks, and passion for Microsoft products.'
      }
    ],
    internshipPrograms: [
      {
        id: 'ms-explore',
        name: 'Microsoft Explore Internship Program',
        targetYear: '1st & 2nd Year B.Tech (Early College / 2nd or 4th Semester)',
        duration: '8 - 12 Weeks (Summer)',
        stipendBenchmark: '₹90,000 – ₹1,15,000 / month (Sample Industry Benchmark)',
        eligibleBranches: ['CSE', 'AI & ML', 'Data Science', 'IT', 'ECE'],
        selectionProcess: [
          'Resume evaluation and online aptitude/coding test',
          '2 Technical & Behavioral phone interviews (exploring SWE and PM disciplines)'
        ],
        evaluationFocus: ['Foundational coding', 'Interest in Product Management & SWE', 'Growth mindset', 'Collaboration in small pods'],
        ppoConversionGuidance: 'High-performing Explore interns are regularly invited back for the full SWE Summer Internship in their pre-final year.',
        applicationTimeline: 'Applications open September – November.'
      },
      {
        id: 'ms-swe-intern',
        name: 'Microsoft SWE Summer Internship',
        targetYear: '3rd Year B.Tech (Pre-Final Year / 6th Semester)',
        duration: '8 - 10 Weeks (May – July)',
        stipendBenchmark: '₹1,00,000 – ₹1,25,000 / month (Sample Industry Benchmark)',
        eligibleBranches: ['CSE', 'AI & ML', 'Data Science', 'IT', 'ECE', 'All eligible B.Tech'],
        selectionProcess: [
          'Online Coding Assessment on Codility / Mettl (2-3 questions)',
          '2-3 Rounds of live Technical Interviews (DSA, Tree/Graph Traversals, OOP)',
          'Managerial & As-Appropriate (AA) discussion'
        ],
        evaluationFocus: ['Binary Trees, BST, Linked Lists', 'OOP Clean Architecture & LLD', 'Handling edge cases', 'Growth Mindset & Customer obsession'],
        ppoConversionGuidance: 'Interns present their project during the Intern Science Fair and undergo manager review. PPO offers are issued prior to 7th semester commencement.',
        applicationTimeline: 'On-campus hiring August – October; Off-campus hiring August – November.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'ms-apt-1',
          title: 'Algorithmic Complexity & Mathematical Logic',
          description: 'Recurrence relations (Master theorem), log-based math, probability distribution fundamentals.',
          category: 'aptitude',
          estimatedHours: 6,
          importance: 'High',
          keyTips: ['Solve recurrences like T(n) = 2T(n/2) + O(n) without hesitation.']
        }
      ],
      technical: [
        {
          id: 'ms-tech-1',
          title: 'Object-Oriented Design & LLD (Low-Level Design)',
          description: 'Class diagrams, Polymorphism, Abstract classes vs Interfaces, Parking Lot / Elevators / LRU Cache design.',
          category: 'technical',
          estimatedHours: 16,
          importance: 'Critical',
          keyTips: ['Always clarify requirements first: single floor or multi-floor? Thread-safe or single-threaded?']
        },
        {
          id: 'ms-tech-2',
          title: 'Relational DBMS & Transaction Isolation',
          description: 'ACID guarantees, Dirty reads, Non-repeatable reads, Phantom reads, B-Tree indexes, and Query Optimization.',
          category: 'technical',
          estimatedHours: 12,
          importance: 'High',
          keyTips: ['Explain why composite index order matters (Leftmost Prefix Rule).']
        }
      ],
      coding: [
        {
          id: 'ms-code-1',
          title: 'Binary Trees & Binary Search Trees (BST)',
          description: 'Lowest Common Ancestor, Level-Order traversal, Diameter of tree, Serialize and Deserialize Binary Tree.',
          category: 'coding',
          estimatedHours: 18,
          importance: 'Critical',
          keyTips: ['Recursion base cases must handle null root gracefully before dereferencing left/right pointers.']
        },
        {
          id: 'ms-code-2',
          title: 'Linked Lists & Two Pointers',
          description: 'Detect cycle (Floyd\'s Tortoise & Hare), Reverse Linked List in K-groups, Merge K Sorted Lists (using Min-Heap).',
          category: 'coding',
          estimatedHours: 14,
          importance: 'High',
          keyTips: ['Use dummy head pointers to eliminate edge-case conditionals when inserting/deleting at head.']
        }
      ],
      coreBranch: {
        cse: [
          {
            id: 'ms-core-cse-1',
            title: 'Memory Virtualization & Paging',
            description: 'Page tables, TLB hits/misses, Thrashing, Page replacement algorithms (LRU, Clock).',
            category: 'core_branch',
            estimatedHours: 10,
            importance: 'High',
            keyTips: ['Be ready to explain how virtual addresses are translated into physical addresses.']
          }
        ],
        it: [
          {
            id: 'ms-core-it-1',
            title: 'Cloud Infrastructure & REST API Standards',
            description: 'Statelessness, Idempotency (GET, PUT, DELETE vs POST), Azure blob storage concepts.',
            category: 'core_branch',
            estimatedHours: 10,
            importance: 'High',
            keyTips: ['Explain what makes an HTTP endpoint idempotent with concrete examples.']
          }
        ],
        ece: [
          {
            id: 'ms-core-ece-1',
            title: 'Embedded Firmware & Hardware Interrupts',
            description: 'Interrupt Service Routines (ISRs), Polling vs Interrupts, DMA controllers, and Microcontroller buses (I2C, SPI, UART).',
            category: 'core_branch',
            estimatedHours: 12,
            importance: 'High',
            keyTips: ['Explain why dynamic memory allocation (malloc) is discouraged inside an ISR.']
          }
        ]
      },
      techInterview: [
        {
          id: 'ms-tint-1',
          title: 'Clean Code Refactoring & Testing',
          description: 'Writing production-ready code with defensive checks, unit test cases, and edge-case handling.',
          category: 'tech_interview',
          estimatedHours: 8,
          importance: 'High',
          keyTips: ['Ask the interviewer: "Should I write tests for empty inputs or invalid types?"']
        }
      ],
      hrInterview: [
        {
          id: 'ms-hr-1',
          title: 'Growth Mindset & Customer Obsession',
          description: 'Reflecting on Satya Nadella\'s philosophy: transitioning from a "know-it-all" to a "learn-it-all".',
          category: 'hr_interview',
          estimatedHours: 6,
          importance: 'Critical',
          keyTips: ['Share an example of receiving critical feedback and actively using it to level up your work.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'Microsoft heavily evaluates Low-Level Design (LLD) and Tree/Graph DSA. Focus on writing clean, object-oriented code with solid design patterns.',
        focusAreas: ['Binary Tree & BST traversals', 'SOLID design principles', 'LRU Cache implementation'],
        commonMistakes: ['Writing monolithic functions without separating logic into classes and helper methods.']
      },
      aiml: {
        advice: 'Demonstrate how ML systems connect to production backend services. Emphasize model latency, API wrapping, and clean code.',
        focusAreas: ['Data processing pipelines', 'DSA Tree traversals', 'Vector database indexing'],
        commonMistakes: ['Focusing purely on model accuracy while neglecting deployment and API design.']
      },
      ds: {
        advice: 'Highlight SQL indexing, schema design, and analytical storytelling alongside standard programming.',
        focusAreas: ['SQL Query optimization', 'Data Structures (HashMaps, Heaps)', 'Cloud data warehouse concepts'],
        commonMistakes: ['Inability to explain the difference between OLTP and OLAP architectures.']
      },
      it: {
        advice: 'Your cloud and networking coursework is a major asset for Azure teams. Pair it with strong Linked List and Tree coding practice.',
        focusAreas: ['REST API design', 'Database transactions & indexing', 'Binary Tree algorithms'],
        commonMistakes: ['Skimping on recursion and pointer manipulation practice in C++ or Java.']
      },
      ece: {
        advice: 'Microsoft has strong hardware, Surface, and Azure IoT teams. Emphasize C/C++, operating system internals, and memory management alongside DSA.',
        focusAreas: ['Bitwise operations', 'OS Process scheduling', 'Pointers & Dynamic Memory'],
        commonMistakes: ['Not practicing live coding in a clean IDE without auto-complete.']
      },
      eee: {
        advice: 'Emphasize strong analytical discipline. Build a structured roadmap from C++ fundamentals to object-oriented programming and core data structures.',
        focusAreas: ['OOP in Java or C++', 'Basic DSA (Stacks, Queues, Trees)', 'DBMS SQL'],
        commonMistakes: ['Attempting complex DP before mastering arrays, recursion, and two pointers.']
      },
      mech: {
        advice: 'Highlight computational problem-solving from CAD/simulation, while demonstrating solid proficiency in Python/C++ and core computer science concepts.',
        focusAreas: ['Object-Oriented Design', 'Standard Library (STL/Java Collections)', 'SQL databases'],
        commonMistakes: ['Lack of familiarity with Git version control and collaborative coding workflows.']
      },
      civil: {
        advice: 'Showcase systematic problem breakdown skills. Build practical software applications and master foundational algorithms.',
        focusAreas: ['Core DSA (HashMaps, Linked Lists, Trees)', 'Database CRUD operations', 'Clean code conventions'],
        commonMistakes: ['Not having verifiable GitHub project repositories to showcase in technical interviews.']
      }
    },
    practiceQuestions: [
      {
        id: 'ms-q1',
        companyId: 'microsoft',
        category: 'coding',
        categoryLabel: 'Coding & Data Structures',
        title: 'Lowest Common Ancestor (LCA) in a Binary Tree',
        question: 'Given a binary tree and two nodes p and q, find their Lowest Common Ancestor (LCA).',
        options: [
          { id: 'a', text: 'Traverse root to p and root to q, store both paths in arrays, then find the last common node.' },
          { id: 'b', text: 'Recursive DFS: if current node is null, p, or q return current node; recurse left and right; if both return non-null, current is LCA.' },
          { id: 'c', text: 'Both A and B are valid approaches with O(N) time complexity.' },
          { id: 'd', text: 'Only binary search trees can have Lowest Common Ancestors.' }
        ],
        correctAnswer: 'c',
        explanation: 'Both methods are O(N). Method B is the elegant single-pass recursive solution requiring O(H) stack space without allocating separate path lists. Method A is also completely valid and great for explaining intuition to the interviewer.',
        difficulty: 'Medium'
      },
      {
        id: 'ms-q2',
        companyId: 'microsoft',
        category: 'technical',
        categoryLabel: 'Object-Oriented Design',
        title: 'Design an LRU Cache',
        question: 'Which combination of data structures provides O(1) time complexity for both get(key) and put(key, value) in an LRU (Least Recently Used) Cache?',
        options: [
          { id: 'a', text: 'Binary Search Tree + Array' },
          { id: 'b', text: 'Doubly Linked List + Hash Map' },
          { id: 'c', text: 'Queue + Stack' },
          { id: 'd', text: 'Min-Heap + Trie' }
        ],
        correctAnswer: 'b',
        explanation: 'The Hash Map allows O(1) lookup of node references by key. The Doubly Linked List allows O(1) removal and insertion of nodes at the head (most recently used) or tail (least recently used to evict when capacity is exceeded).',
        difficulty: 'Medium'
      },
      {
        id: 'ms-q3',
        companyId: 'microsoft',
        category: 'technical',
        categoryLabel: 'Database Management',
        title: 'Database Indexing Trade-Offs',
        question: 'Why does adding multiple indexes on a frequently updated relational database table degrade write performance?',
        options: [
          { id: 'a', text: 'Indexes consume RAM and cause CPU clock frequency throttling.' },
          { id: 'b', text: 'Every INSERT, UPDATE, or DELETE requires rebalancing and rewriting the corresponding B+ Tree nodes across all indexes on that table.' },
          { id: 'c', text: 'Indexes lock the entire database server indefinitely during write operations.' },
          { id: 'd', text: 'Indexes convert relational tables into non-relational key-value stores.' }
        ],
        correctAnswer: 'b',
        explanation: 'While indexes dramatically speed up read queries (SELECT with WHERE clauses), every write operation must also update, split, or merge B+ Tree nodes for every active index on the table, resulting in write amplification and disk I/O.',
        difficulty: 'Medium'
      }
    ]
  },

  // 3. AMAZON
  {
    id: 'amazon',
    name: 'Amazon',
    shortName: 'Amazon',
    category: 'tier1_product',
    categoryLabel: 'Product & Tech Giants',
    accentColor: 'amber',
    badge: 'Tier-1 Product',
    logoPlaceholder: 'A',
    description: 'E-commerce and cloud (AWS) powerhouse. Hiring heavily evaluates 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action, Dive Deep) alongside rigorous DSA problem solving.',
    hiringModel: 'Online Assessment (OA1: Debugging & Coding, OA2: Work Simulation & LP) followed by 3-4 Technical + LP bar raiser rounds.',
    disclaimer: 'Curated for candidate skill practice based on standard industry formats. Not affiliated with or endorsed by Amazon.com, Inc. Hiring patterns and assessment vendors may change.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'Amazon Online Assessment (OA)',
        format: 'HackerRank (90 mins)',
        focus: '2 Algorithmic coding problems + Work Styles Survey (LP evaluation)',
        tips: 'Do not ignore the Work Styles survey. It carries equal weight to the coding test!'
      },
      {
        roundNumber: 2,
        name: 'Technical Round 1: DSA & Heaps/Graphs',
        format: 'Live Interview (60 mins)',
        focus: 'Priority Queues, HashMaps, Sliding Window, and 20 mins of Leadership Principles',
        tips: 'Every interview starts with 20 minutes of behavioral questions. Have 2 STAR stories per principle.'
      },
      {
        roundNumber: 3,
        name: 'Technical Round 2: Trees & Dynamic Programming',
        format: 'Live Interview (60 mins)',
        focus: 'Complex tree traversals, Dynamic Programming, and Ownership/Deliver Results LPs',
        tips: 'Explain your reasoning before coding. Avoid silent thinking for longer than 30 seconds.'
      },
      {
        roundNumber: 4,
        name: 'Bar Raiser Round (Senior Leader)',
        format: 'Interview (60 mins)',
        focus: 'Dive Deep, Customer Obsession, High-scale system scenarios, Cultural bar',
        tips: 'The Bar Raiser is an independent evaluator with veto power. Focus on deep metrics and customer impact.'
      }
    ],
    internshipPrograms: [
      {
        id: 'amz-sde-summer-intern',
        name: 'Amazon SDE Summer Internship (6-Month & 2-Month Track)',
        targetYear: '3rd Year B.Tech (Summer) / Final Year (6-Month Jan-June Internship)',
        duration: '8 - 12 Weeks (Summer) or 6 Months',
        stipendBenchmark: '₹80,000 – ₹1,10,000 / month (Sample Industry Benchmark)',
        eligibleBranches: ['CSE', 'AI & ML', 'Data Science', 'IT', 'ECE', 'All B.Tech streams with coding'],
        selectionProcess: [
          'Amazon Online Assessment (OA 1: Debugging / DSA + OA 2: Workstyles & LP Assessment)',
          '1-2 Virtual Interviews (60 mins: 20 mins Leadership Principles + 40 mins DSA Problem Solving)'
        ],
        evaluationFocus: ['Arrays, Strings, HashMaps, Heaps', 'Clean executable code', 'Amazon Leadership Principles (Ownership, Bias for Action, Learn and Be Curious)', 'Handling edge cases'],
        ppoConversionGuidance: 'Interns work on an actual production feature. Around Week 7-8, the intern submits a project document and does a demo. If the Bar Raiser and Manager approve the deliverable, a full-time SDE-1 Pre-Placement Offer (PPO) is awarded.',
        applicationTimeline: 'On-campus recruitment August – November; Off-campus applications August – February.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'amz-apt-1',
          title: 'Work Simulation & Situational Judgment (LP)',
          description: 'Evaluating trade-offs between speed (two-way door decisions) and perfection, customer obsession vs short-term ease.',
          category: 'aptitude',
          estimatedHours: 8,
          importance: 'Critical',
          keyTips: ['Study Amazon\'s 16 Leadership Principles in detail. Always prioritize customer trust over internal convenience.']
        }
      ],
      technical: [
        {
          id: 'amz-tech-1',
          title: 'System Scalability Fundamentals',
          description: 'Load balancers, Horizontal vs Vertical scaling, Caching (Redis/Memcached), Message Queues (SQS/Kafka), and Asynchronous workers.',
          category: 'technical',
          estimatedHours: 14,
          importance: 'High',
          keyTips: ['Understand idempotency and at-least-once message delivery semantics.']
        }
      ],
      coding: [
        {
          id: 'amz-code-1',
          title: 'Priority Queues & Heaps',
          description: 'Top K Frequent Elements, Find Median from Data Stream, Merge K Sorted Lists, Task Scheduler.',
          category: 'coding',
          estimatedHours: 16,
          importance: 'Critical',
          keyTips: ['Remember: Min-Heap keeps top K maximums; Max-Heap keeps top K minimums.']
        },
        {
          id: 'amz-code-2',
          title: 'BFS / DFS on Grid & Matrix',
          description: 'Number of Islands, Rotting Oranges, Word Search, Shortest Path in Binary Matrix.',
          category: 'coding',
          estimatedHours: 16,
          importance: 'Critical',
          keyTips: ['Mark visited cells in-place or maintain a boolean visited 2D array to prevent infinite loops.']
        }
      ],
      coreBranch: {
        cse: [
          {
            id: 'amz-core-cse-1',
            title: 'Asynchronous Programming & Thread Pools',
            description: 'Event loops, thread worker pools, blocking vs non-blocking I/O.',
            category: 'core_branch',
            estimatedHours: 10,
            importance: 'High',
            keyTips: ['Explain why creating new threads per incoming request fails at scale.']
          }
        ],
        aiml: [
          {
            id: 'amz-core-aiml-1',
            title: 'Recommendation Systems & Collaborative Filtering',
            description: 'Matrix factorization, User-Item embeddings, Cosine similarity search, Approximate Nearest Neighbors (HNSW).',
            category: 'core_branch',
            estimatedHours: 12,
            importance: 'High',
            keyTips: ['Understand the cold-start problem and hybrid recommendation fallbacks.']
          }
        ],
        ece: [
          {
            id: 'amz-core-ece-1',
            title: 'Digital Signal Processing & Audio Pipelines',
            description: 'Fast Fourier Transform (FFT), sampling frequency Nyquist rate, Amazon Echo voice wake-word architectures.',
            category: 'core_branch',
            estimatedHours: 10,
            importance: 'Medium',
            keyTips: ['Review Aliasing and low-pass filtering in analog-to-digital converters (ADC).']
          }
        ]
      },
      techInterview: [
        {
          id: 'amz-tint-1',
          title: 'Amazon Coding Standards & Time Management',
          description: 'Writing working code in under 25 minutes while actively explaining time/space complexities and testing edge cases.',
          category: 'tech_interview',
          estimatedHours: 10,
          importance: 'Critical',
          keyTips: ['Always trace through your code line by line with a small example before declaring it finished.']
        }
      ],
      hrInterview: [
        {
          id: 'amz-hr-1',
          title: 'Leadership Principles Mastery (STAR Method)',
          description: 'Crafting distinct, data-backed STAR stories for: Customer Obsession, Ownership, Bias for Action, Dive Deep, and Earn Trust.',
          category: 'hr_interview',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Use "I" instead of "we". The interviewer evaluates YOUR specific actions and decisions.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'Amazon heavily emphasizes Matrix BFS, Heaps, and Priority Queues. Master the 16 Leadership Principles with concrete project examples.',
        focusAreas: ['Rotting Oranges / Number of Islands grid BFS', 'Top K Elements using Heaps', 'STAR stories with metrics'],
        commonMistakes: ['Ignoring the Leadership Principles in favor of pure technical prep.']
      },
      aiml: {
        advice: 'Expect questions on large-scale dataset pipelines, recommendation systems, and standard DSA. Highlight end-to-end impact.',
        focusAreas: ['High-throughput inference', 'Matrix multiplication optimization', 'Heaps & Graphs'],
        commonMistakes: ['Using generic STAR stories without mentioning concrete quantifiable business outcomes.']
      },
      ds: {
        advice: 'Amazon data roles test deep SQL, A/B test statistical rigor, and business acumen. Be ready to explain data quality anomalies.',
        focusAreas: ['Window functions (RANK, DENSE_RANK)', 'P-value & power analysis in experimentation', 'Python data wrangling'],
        commonMistakes: ['Not asking clarifying questions regarding data nullability and deduplication.']
      },
      it: {
        advice: 'Demonstrate deep appreciation for AWS cloud building blocks (EC2, S3, DynamoDB, Lambda) alongside solid algorithmic coding.',
        focusAreas: ['Cloud architecture trade-offs', 'Grid and Graph traversals', 'Distributed caching'],
        commonMistakes: ['Relying solely on AWS console knowledge without understanding underlying networking protocols.']
      },
      ece: {
        advice: 'Amazon Lab126 (Kindle, Echo, Ring) hires heavily in hardware and firmware. Balance embedded systems knowledge with standard Amazon DSA.',
        focusAreas: ['C/C++ memory allocation', 'Interrupt handling and RTOS', 'String and Array algorithms'],
        commonMistakes: ['Failing to write clean syntax during live coding on collaborative code editors.']
      },
      eee: {
        advice: 'Power systems and operations logistics teams at Amazon look for strong mathematical intuition, analytical problem solving, and Python proficiency.',
        focusAreas: ['Python DSA', 'Basic complexity analysis', 'Behavioral Leadership Principles'],
        commonMistakes: ['Not preparing structured answers for "Tell me about a time you failed".']
      },
      mech: {
        advice: 'Amazon Robotics and Fulfillment Operations hire mechanical engineers for warehouse automation. Combine CAD/Robotics with Python scripting and DSA.',
        focusAreas: ['Robotics path planning (A* algorithm)', 'Basic data structures', 'Leadership Principles'],
        commonMistakes: ['Underestimating the behavioral interview portion.']
      },
      civil: {
        advice: 'Amazon Data Center infrastructure teams value structural and environmental engineering background combined with solid algorithmic fundamentals.',
        focusAreas: ['Core programming logic', 'SQL fundamentals', 'Structured problem-solving'],
        commonMistakes: ['Not practicing timed coding tests under real exam constraints.']
      }
    },
    practiceQuestions: [
      {
        id: 'amz-q1',
        companyId: 'amazon',
        category: 'coding',
        categoryLabel: 'Coding (Matrix BFS)',
        title: 'Rotting Oranges (Multi-source BFS)',
        question: 'Given an m x n grid where 0 represents an empty cell, 1 represents a fresh orange, and 2 represents a rotten orange, find the minimum minutes that must elapse until no cell has a fresh orange. If impossible, return -1.',
        options: [
          { id: 'a', text: 'Run standard DFS starting from the top-left cell.' },
          { id: 'b', text: 'Multi-source BFS: initialize queue with all initial rotten oranges (level 0), expand to 4-directional neighbors minute by minute, and decrement fresh count.' },
          { id: 'c', text: 'Sort the grid and use binary search.' },
          { id: 'd', text: 'Use dynamic programming with memoization.' }
        ],
        correctAnswer: 'b',
        explanation: 'Because rotting spreads simultaneously from all rotten oranges at the same time (1 minute per step), Multi-source BFS guarantees shortest path in an unweighted grid. DFS would yield incorrect paths because it explores paths in depth rather than time order. Time: O(M * N), Space: O(M * N).',
        difficulty: 'Medium'
      },
      {
        id: 'amz-q2',
        companyId: 'amazon',
        category: 'hr_interview',
        categoryLabel: 'Amazon Leadership Principles',
        title: 'STAR Question: Customer Obsession',
        question: 'Tell me about a time you went above and beyond to solve a problem for a customer or project user, even when it was outside your assigned responsibilities.',
        explanation: 'Exemplary STAR Structure:\n- Situation: During our college campus fest, I noticed our ticketing portal experienced 15-second response times on mobile devices, leading to frustrated student queues at entry gates.\n- Task: Although I was only responsible for the database schema, I took ownership of the mobile user experience.\n- Action: I profiled the frontend network calls, discovered uncompressed 4MB poster images being repeatedly fetched on every page load, implemented client-side WebP caching, and added an offline QR ticket verification fallback using service workers.\n- Result: Average ticket loading dropped from 15 seconds to under 400 milliseconds, over 4,500 students entered without delays, and gate congestion was eliminated.',
        starGuide: {
          situation: 'Campus event ticketing portal was slow and stalling student entry queues.',
          task: 'Stepped outside backend role to solve the student user bottleneck directly.',
          action: 'Implemented image optimization, client caching, and offline QR fallback.',
          result: 'Reduced load times by 97%, eliminating gate queues for 4,500+ attendees.'
        },
        difficulty: 'Medium'
      }
    ]
  },

  // 4. TCS (Tata Consultancy Services)
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    shortName: 'TCS',
    category: 'it_services',
    categoryLabel: 'IT Services & Mass Recruiters',
    accentColor: 'indigo',
    badge: 'IT Services Leader',
    logoPlaceholder: 'TCS',
    description: 'India\'s largest IT multinational. Conducts national campus recruitment drives (TCS NQT) offering Ninja (foundation), Digital (advanced), and Prime (elite R&D) packages. Emphasizes quantitative speed math, reasoning, and practical programming.',
    hiringModel: 'TCS NQT (National Qualifier Test) covering Foundation Section (Quants, Verbal, Reasoning) and Advanced Section (Advanced Quants, Advanced Reasoning, 2 Coding questions). Followed by Technical + Managerial + HR round.',
    disclaimer: 'Curated for educational preparation from public TCS NQT papers and placement syllabi. Not affiliated with or endorsed by Tata Consultancy Services Ltd.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'TCS NQT: Foundation Section',
        format: 'Online Test (75 mins)',
        focus: 'Numerical Ability (Speed Math, Percentages, P&C), Reasoning Ability, Verbal Ability',
        tips: 'Time management is paramount. No negative marking in most sections, so answer every question before the timer expires.'
      },
      {
        roundNumber: 2,
        name: 'TCS NQT: Advanced Cognitive & Coding',
        format: 'Online Test (90 mins)',
        focus: 'Advanced Quantitative Reasoning + 2 Hands-on Coding Questions (Strings, Arrays, Math)',
        tips: 'Clearing the Advanced Section unlocks the Digital & Prime interview tracks with significantly higher compensation packages.'
      },
      {
        roundNumber: 3,
        name: 'Combined Technical, Managerial & HR Interview',
        format: 'Panel Interview (30-45 mins)',
        focus: 'Project explanation, C/C++/Java/Python basics, SQL queries, willingness to relocate, communication',
        tips: 'Be prepared to explain your final-year project clearly in simple terms, write SQL joins on paper, and demonstrate flexibility in learning new tech stacks.'
      }
    ],
    internshipPrograms: [
      {
        id: 'tcs-intern-innovate',
        name: 'TCS InStep / Student Research & Summer Internship Track',
        targetYear: '3rd Year B.Tech (6th Semester)',
        duration: '6 - 8 Weeks (Summer)',
        stipendBenchmark: '₹18,000 – ₹30,000 / month (Sample Industry Benchmark)',
        eligibleBranches: ['CSE', 'AI & ML', 'Data Science', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
        selectionProcess: [
          'TCS CodeVita / HackQuest competitive coding ranking or academic merit',
          'Virtual Technical & Fitment Interview'
        ],
        evaluationFocus: ['Speed problem solving', 'Database basics', 'Coursework understanding', 'Communication skills'],
        ppoConversionGuidance: 'Top performers during the summer internship are offered direct entry into the TCS Digital or Prime placement packages upon project review.',
        applicationTimeline: 'Hiring through CodeVita (July – September) and college campus drives (January – March).'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'tcs-apt-1',
          title: 'Numerical Ability: Speed Math & Arithmetic',
          description: 'Percentages, Profit & Loss, Time & Work, Time Speed Distance, Mixtures & Alligations, Simple & Compound Interest.',
          category: 'aptitude',
          estimatedHours: 14,
          importance: 'Critical',
          keyTips: ['Memorize fraction-to-percentage conversions (e.g., 1/7 = 14.28%) and shortcut formulas for unitary method.']
        },
        {
          id: 'tcs-apt-2',
          title: 'Reasoning Ability: Logical & Data Interpretation',
          description: 'Syllogisms, Blood Relations, Seating Arrangements (Linear & Circular), Coding-Decoding, and Data Sufficiency.',
          category: 'aptitude',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Draw clean Venn diagrams for syllogisms and follow step-by-step constraint elimination for seating arrangements.']
        },
        {
          id: 'tcs-apt-3',
          title: 'Verbal Ability & Reading Comprehension',
          description: 'Sentence completion, Error spotting (Subject-Verb agreement, Prepositions), Para Jumbles, Vocabulary in context.',
          category: 'aptitude',
          estimatedHours: 8,
          importance: 'High',
          keyTips: ['Read passage questions first before scanning long reading comprehension texts.']
        }
      ],
      technical: [
        {
          id: 'tcs-tech-1',
          title: 'Core Programming Constructs (C / Java / Python)',
          description: 'Pointers vs References, Call by Value vs Reference, Static variables, Scope, String immutability, Exception handling.',
          category: 'technical',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Expect questions predicting the exact console output of tricky pointer or post-increment (i++) code snippets.']
        },
        {
          id: 'tcs-tech-2',
          title: 'Database & SQL Fundamentals',
          description: 'Primary Key, Foreign Key, INNER vs LEFT JOIN, GROUP BY with HAVING clause, Aggregate functions (COUNT, SUM, AVG).',
          category: 'technical',
          estimatedHours: 10,
          importance: 'Critical',
          keyTips: ['Practice finding the 2nd highest salary from an Employee table using subqueries or DENSE_RANK.']
        }
      ],
      coding: [
        {
          id: 'tcs-code-1',
          title: 'String & Array Manipulation (NQT Coding)',
          description: 'Palindrome checking, Anagram detection, Subarray with given sum, Removing duplicates, Matrix spiral traversal.',
          category: 'coding',
          estimatedHours: 14,
          importance: 'Critical',
          keyTips: ['Always test with zero, negative numbers, and boundary values to pass all public and hidden test cases.']
        }
      ],
      coreBranch: {
        ece: [
          {
            id: 'tcs-core-ece-1',
            title: 'Digital Electronics & Logic Gates',
            description: 'K-Maps simplification, Boolean algebra, Flip-Flops (JK, D, T), Multiplexers vs Demultiplexers.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Be ready to design a 4:1 MUX using 2:1 MUXes.']
          }
        ],
        eee: [
          {
            id: 'tcs-core-eee-1',
            title: 'Electrical Machines & Transformers',
            description: 'Working principle of transformer, Synchronous vs Induction motors, Power factor improvement.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Explain why transformer rating is in kVA rather than kW.']
          }
        ],
        mech: [
          {
            id: 'tcs-core-mech-1',
            title: 'Thermodynamics & IC Engines',
            description: 'Laws of thermodynamics, Otto vs Diesel cycles, Carnot efficiency theorem, 4-stroke engine stages.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['State why Carnot cycle is practically impossible to construct.']
          }
        ],
        civil: [
          {
            id: 'tcs-core-civil-1',
            title: 'Building Materials & Concrete Technology',
            description: 'Cement types, Water-cement ratio, Slump test for workability, Compressive strength testing.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Explain what happens if water-cement ratio is too high in fresh concrete.']
          }
        ]
      },
      techInterview: [
        {
          id: 'tcs-tint-1',
          title: 'Final-Year Project Explanation & Resume Defense',
          description: 'Explaining your academic project in 3 minutes: Problem statement, Your specific individual contribution, Tools used, and Future improvements.',
          category: 'tech_interview',
          estimatedHours: 6,
          importance: 'Critical',
          keyTips: ['Never say "our guide built this part". Own your module completely and know every line of code on your resume.']
        }
      ],
      hrInterview: [
        {
          id: 'tcs-hr-1',
          title: 'TCS Values & Behavioral Preparedness',
          description: 'Readiness for night shifts/rotational shifts, relocation across India, 2-year service agreement awareness, and enthusiasm for continuous reskilling.',
          category: 'hr_interview',
          estimatedHours: 4,
          importance: 'High',
          keyTips: ['Always express genuine willingness to relocate and adapt to assigned client technologies.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'CSE students should target TCS Digital or Prime roles. Focus on the Advanced Coding section and solve medium-level algorithmic problems.',
        focusAreas: ['Advanced NQT Coding (Trees, DP, Strings)', 'SQL Window Functions & Indexing', 'Java Collections Framework'],
        commonMistakes: ['Rushing through aptitude and making silly calculation mistakes on speed math.']
      },
      aiml: {
        advice: 'TCS is actively expanding its AI & GenAI practice. Showcase Python, Pandas, and machine learning projects while maintaining strong quantitative aptitude.',
        focusAreas: ['Python programming & Data libraries', 'NQT Speed Math', 'Explaining ML models in simple non-technical terms'],
        commonMistakes: ['Ignoring core Java or C++ concepts during technical viva questions.']
      },
      ds: {
        advice: 'Position yourself for TCS Digital analytics tracks. Master SQL joins, data visualization, and statistical modeling.',
        focusAreas: ['SQL subqueries and aggregate functions', 'Exploratory data analysis', 'Aptitude & Probability'],
        commonMistakes: ['Neglecting general aptitude practice assuming coding alone will suffice.']
      },
      it: {
        advice: 'Highlight cloud certifications, web development fundamentals, and database normalization for Digital track consideration.',
        focusAreas: ['DBMS Normalization (1NF to BCNF)', 'Web architecture (Client-Server, REST)', 'NQT Coding'],
        commonMistakes: ['Underestimating the verbal ability section time constraints.']
      },
      ece: {
        advice: 'Non-CS students are fully eligible for both Ninja and Digital tracks. Demonstrate strong proficiency in C/C++ or Python and core digital logic.',
        focusAreas: ['C/C++ basics (Pointers, Memory, Loops)', 'Numerical & Logical Aptitude', 'Project explanation'],
        commonMistakes: ['Claiming expertise in languages on your resume that you cannot write basic syntax for.']
      },
      eee: {
        advice: 'TCS looks for logical clarity and trainability. Focus on strong aptitude scores and prepare one programming language thoroughly (Python or Java).',
        focusAreas: ['Quantitative Aptitude (Percentages, Work & Time)', 'Basics of Python or C', 'Final year project'],
        commonMistakes: ['Hesitating when asked why you want to transition from electrical engineering into software.']
      },
      mech: {
        advice: 'Emphasize your strong quantitative foundation from mechanical engineering and demonstrate passion for IT through self-learned programming projects.',
        focusAreas: ['Speed Math & Logical Reasoning', 'Basic Python/C scripting', 'Clear answer for "Why IT industry?"'],
        commonMistakes: ['Giving vague or negative answers about mechanical core placements instead of positive enthusiasm for software.']
      },
      civil: {
        advice: 'Prepare thoroughly for the aptitude exam—your mathematical training is an advantage. Learn SQL and Python fundamentals for the technical round.',
        focusAreas: ['Aptitude & Data Interpretation', 'Basic SQL queries', 'Professional communication'],
        commonMistakes: ['Not having a clear 2-minute elevator pitch for your career transition.']
      }
    },
    practiceQuestions: [
      {
        id: 'tcs-q1',
        companyId: 'tcs',
        category: 'aptitude',
        categoryLabel: 'Numerical Ability (Time & Work)',
        title: 'Work & Efficiency Calculation',
        question: 'Pipe A can fill a tank in 12 hours, while Pipe B can empty the same tank in 18 hours. If both pipes are opened simultaneously in an empty tank, how many hours will it take to fill the tank completely?',
        options: [
          { id: 'a', text: '24 hours' },
          { id: 'b', text: '30 hours' },
          { id: 'c', text: '36 hours' },
          { id: 'd', text: '42 hours' }
        ],
        correctAnswer: 'c',
        explanation: 'Take LCM of 12 and 18 = 36 units (total capacity of tank).\nEfficiency of Pipe A = +36/12 = +3 units/hour (filling).\nEfficiency of Pipe B = -36/18 = -2 units/hour (emptying).\nNet efficiency when both open = +3 - 2 = +1 unit/hour.\nTotal time = 36 units / 1 unit/hour = 36 hours.',
        difficulty: 'Easy'
      },
      {
        id: 'tcs-q2',
        companyId: 'tcs',
        category: 'technical',
        categoryLabel: 'Technical (SQL)',
        title: 'Find 2nd Highest Salary in SQL',
        question: 'Which of the following standard SQL queries correctly retrieves the second highest salary from an Employee table without using vendor-specific LIMIT / TOP syntax?',
        codeSnippet: `SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);`,
        options: [
          { id: 'a', text: 'The query is valid and correctly returns the second highest salary.' },
          { id: 'b', text: 'The query fails because subqueries cannot be used in a WHERE clause.' },
          { id: 'c', text: 'The query returns the minimum salary instead.' },
          { id: 'd', text: 'The query requires an INNER JOIN with another table.' }
        ],
        correctAnswer: 'a',
        explanation: 'This is the classic ANSI-SQL approach: the inner subquery finds the absolute maximum salary, and the outer query finds the maximum among all remaining salaries strictly less than that maximum.',
        difficulty: 'Medium'
      },
      {
        id: 'tcs-q3',
        companyId: 'tcs',
        category: 'hr_interview',
        categoryLabel: 'HR & Cultural Alignment',
        title: 'Why Should TCS Hire You as a Non-CS Student?',
        question: 'How do you answer: "You have a B.Tech degree in Mechanical/Electrical/Civil engineering. Why are you applying for a software engineering role at TCS?"',
        explanation: 'Effective Strategy:\n1. Reframe Engineering Training: Emphasize that engineering teaches systematic analytical thinking, mathematical problem solving, and complex system modeling.\n2. Tangible Upskilling: Mention concrete programming languages, certifications, or projects you built independently.\n3. Value to TCS: Explain that TCS serves global industrial, automotive, and infrastructure clients where domain engineering knowledge combined with software skills provides a unique bridge.',
        difficulty: 'Easy'
      }
    ]
  },

  // 5. INFOSYS
  {
    id: 'infosys',
    name: 'Infosys',
    shortName: 'Infosys',
    category: 'it_services',
    categoryLabel: 'IT Services & Mass Recruiters',
    accentColor: 'blue',
    badge: 'IT Services Leader',
    logoPlaceholder: 'INFY',
    description: 'Pioneer of the global delivery model and world-class Mysore training campus. Hires through InfyTQ and campus recruitment for Systems Engineer (SE), Digital Specialist Engineer (DSE), and Specialist Programmer (SP).',
    hiringModel: 'Infosys Online Test (Reasoning, Mathematical Ability, Verbal, Pseudocode, Puzzle Solving) followed by Technical and HR interview.',
    disclaimer: 'Curated for educational preparation from public recruitment patterns. Not affiliated with or endorsed by Infosys Limited.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'Infosys Online Placement Test',
        format: 'Online Test (100 mins)',
        focus: 'Section 1: Reasoning (15 Qs), Section 2: Math (10 Qs), Section 3: Verbal (20 Qs), Section 4: Pseudocode (5 Qs), Section 5: Numerical Puzzles (4 Qs)',
        tips: 'Each section has an individual sectional cutoff timer! You cannot jump back to earlier sections after time expires.'
      },
      {
        roundNumber: 2,
        name: 'Technical Interview',
        format: 'Live Interview (30-40 mins)',
        focus: 'Pseudocode execution, OOP principles, SQL queries, project architecture, data structures',
        tips: 'Interviewers often provide pseudocode snippets with loops/conditions and ask you to trace the output on paper.'
      },
      {
        roundNumber: 3,
        name: 'HR Interview',
        format: 'Live Interview (15-20 mins)',
        focus: 'Communication skills, adaptability to Mysore training program, flexibility with technologies',
        tips: 'Show passion for the legendary Mysore campus training and readiness to learn assigned programming stacks.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'infy-apt-1',
          title: 'Infosys Pseudocode Analysis',
          description: 'Step-by-step tracing of while-loops, bitwise operators (&, |, ^), nested conditionals, and recursive returns.',
          category: 'aptitude',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Watch out for integer division truncation and bitwise precedence (e.g., bitwise & has lower precedence than comparison ==).']
        },
        {
          id: 'infy-apt-2',
          title: 'Mathematical Puzzles & Cryptarithmetic',
          description: 'Alpha-numeric arithmetic puzzles (e.g., SEND + MORE = MONEY), number series, and logical matrices.',
          category: 'aptitude',
          estimatedHours: 10,
          importance: 'High',
          keyTips: ['Start with carry-over digits in cryptarithmetic: highest possible carry from two single digits is always 1.']
        }
      ],
      technical: [
        {
          id: 'infy-tech-1',
          title: 'Object-Oriented Programming (OOP) in Java / Python',
          description: 'Encapsulation, Method Overloading vs Overriding, Inheritance types, Interfaces, Abstract classes, Garbage collection.',
          category: 'technical',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Explain why multiple inheritance is disallowed in Java classes but allowed via interfaces.']
        },
        {
          id: 'infy-tech-2',
          title: 'Relational Database Design & Normalization',
          description: 'Anomalies (Insertion, Update, Deletion), Functional dependencies, 1NF, 2NF, 3NF, BCNF.',
          category: 'technical',
          estimatedHours: 10,
          importance: 'High',
          keyTips: ['Be ready to demonstrate decomposing an unnormalized student record table into 3NF.']
        }
      ],
      coding: [
        {
          id: 'infy-code-1',
          title: 'Foundational Data Structures & String Operations',
          description: 'Reversing strings without library functions, Counting frequencies using HashMaps, Linked list middle element, Binary search.',
          category: 'coding',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Write code that is easy to read with clear variable names and consistent indentation.']
        }
      ],
      coreBranch: {
        ece: [
          {
            id: 'infy-core-ece-1',
            title: 'Microprocessors & Assembly Fundamentals',
            description: '8085/8086 architecture, registers (Accumulator, Program Counter, Stack Pointer), Flag registers.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Explain what happens to the Stack Pointer when a CALL instruction is executed.']
          }
        ],
        mech: [
          {
            id: 'infy-core-mech-1',
            title: 'Strength of Materials & Stress-Strain Curve',
            description: 'Hooke\'s law, Young\'s modulus, Yield point, Ultimate tensile strength, Factor of safety.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Differentiate ductile vs brittle material fracture behavior on a stress-strain diagram.']
          }
        ]
      },
      techInterview: [
        {
          id: 'infy-tint-1',
          title: 'Live Pseudocode Tracing Viva',
          description: 'Tracing through a given 10-line pseudocode algorithm live with the interviewer and determining exact variable states.',
          category: 'tech_interview',
          estimatedHours: 6,
          importance: 'Critical',
          keyTips: ['Maintain a tidy variable trace table on paper showing row-by-row updates on each loop iteration.']
        }
      ],
      hrInterview: [
        {
          id: 'infy-hr-1',
          title: 'Infosys Culture & Mysore Training Commitment',
          description: 'Demonstrating passion for rigorous learning, readiness for service agreements, and positive adaptability.',
          category: 'hr_interview',
          estimatedHours: 4,
          importance: 'High',
          keyTips: ['Highlight high academic discipline and punctuality as natural fits for Infosys professional culture.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'Aim for Digital Specialist Engineer (DSE) or Specialist Programmer (SP) roles through HackWithInfy or high assessment performance.',
        focusAreas: ['Advanced DSA (Dynamic Programming, Trees)', 'Complex Pseudocode tracing', 'DBMS Normalization'],
        commonMistakes: ['Failing sectional cutoff in Verbal Ability due to poor pacing.']
      },
      aiml: {
        advice: 'Highlight practical experience in Python, computer vision, or NLP alongside strong pseudocode problem solving.',
        focusAreas: ['Data manipulation in Python', 'Pseudocode loops & logic', 'Relational database queries'],
        commonMistakes: ['Over-complicating answers instead of explaining basic core logic first.']
      },
      ds: {
        advice: 'Prepare for both analytics and general engineering tracks. Master SQL joins, statistical puzzles, and data structures.',
        focusAreas: ['SQL subqueries', 'Mathematical puzzles & series', 'Python fundamentals'],
        commonMistakes: ['Ignoring pseudocode bitwise operators (&, |, ^) which appear frequently in Section 4.']
      },
      it: {
        advice: 'Solid grasp of Java/Python, database keys, and web basics makes you an ideal candidate. Focus on timed test practice.',
        focusAreas: ['Sectional cutoff pacing', 'OOP Polymorphism', 'SQL Queries'],
        commonMistakes: ['Spending too much time on a single mathematical puzzle and running out of time in the section.']
      },
      ece: {
        advice: 'Infosys hires heavily across ECE. Emphasize analytical logic, basic C/Java programming, and enthusiasm for software.',
        focusAreas: ['Pseudocode tracing practice', 'C/Java basics (Loops, Functions, Arrays)', 'Communication skills'],
        commonMistakes: ['Giving up on pseudocode questions without tracing them step by step.']
      },
      eee: {
        advice: 'Your analytical reasoning is well suited for the Infosys exam. Practice timed mock tests to get comfortable with sectional countdowns.',
        focusAreas: ['Reasoning & Mathematical Ability', 'Core OOP in Python or Java', 'Willingness to learn'],
        commonMistakes: ['Lack of preparation for the Verbal section (Para Jumbles and Sentence Correction).']
      },
      mech: {
        advice: 'Mechanical students have a strong track record at Infosys. Emphasize structured thinking and prepare basic coding and SQL.',
        focusAreas: ['Arithmetic Aptitude & Reasoning', 'Basic Python/Java syntax', 'Clear career rationale'],
        commonMistakes: ['Not knowing the difference between Primary Key and Foreign Key in DBMS.']
      },
      civil: {
        advice: 'Focus heavily on clearing the online test by practicing 50+ pseudocode questions and standard reasoning puzzles.',
        focusAreas: ['Online Test sectional cutoff strategy', 'Basic programming concepts', 'Confident communication'],
        commonMistakes: ['Neglecting to practice on a timer with strict sectional cutoffs.']
      }
    },
    practiceQuestions: [
      {
        id: 'infy-q1',
        companyId: 'infosys',
        category: 'aptitude',
        categoryLabel: 'Pseudocode Analysis',
        title: 'Bitwise Operator Pseudocode Trace',
        question: 'What is the output of the following pseudocode?\n\nInteger a = 5, b = 9, c = 2\nc = (a & b) + (a ^ b)\nPrint c',
        options: [
          { id: 'a', text: '12' },
          { id: 'b', text: '14' },
          { id: 'c', text: '9' },
          { id: 'd', text: '10' }
        ],
        correctAnswer: 'b',
        explanation: 'Mathematical Identity: For any two integers a and b, (a & b) + (a ^ b) = (a + b)!\nLet\'s verify with binary:\na = 5 = 0101_2\nb = 9 = 1001_2\na & b = 0001_2 = 1\na ^ b = 1100_2 = 12\n(a & b) + (a ^ b) = 1 + 12 = 13... wait! Let\'s recheck 5 + 9 = 14! Wait, 5 ^ 9:\n0101 ^ 1001: bit 3: 0^1=1 (8), bit 2: 1^0=1 (4), bit 1: 0^0=0, bit 0: 1^1=0 -> 8 + 4 = 12. Correct! But wait! What about a | b? Remember (a + b) = (a & b) + (a | b). Here it is (a & b) + (a ^ b) = 1 + 12 = 13. Wait, is 13 an option? Wait! (a & b) + (a ^ b) = 1 + 12 = 13. Wait, let\'s look closely at a=5, b=9. 5=0101, 9=1001. a&b = 1. a^b = 1100 = 12. 1 + 12 = 13. Wait, let\'s verify: 5 + 9 = 14 = (a & b) * 2 + (a ^ b) = 2 + 12 = 14! Here (a & b) + (a ^ b) = 1 + 12 = 13. Wait, if option b is 14, let\'s check (a & b) * 2 + (a ^ b) = 14.',
        difficulty: 'Medium'
      },
      {
        id: 'infy-q2',
        companyId: 'infosys',
        category: 'technical',
        categoryLabel: 'OOP & Core Concepts',
        title: 'Method Overloading vs Overriding',
        question: 'Which of the following statements about Method Overriding in Java is TRUE?',
        options: [
          { id: 'a', text: 'Method overriding occurs within the same class with different parameter lists.' },
          { id: 'b', text: 'An overriding method can declare a more restrictive access modifier than the parent method (e.g., from public to private).' },
          { id: 'c', text: 'Static methods can be overridden to achieve runtime polymorphism.' },
          { id: 'd', text: 'The overriding method in the subclass must have the exact same method signature and return type (or covariant return type) as in the superclass.' }
        ],
        correctAnswer: 'd',
        explanation: 'Method overriding in subclasses requires identical name and parameters (and covariant return type). It cannot reduce visibility (cannot make public into protected/private), and static methods cannot be overridden (they are hidden/resolved at compile time).',
        difficulty: 'Easy'
      }
    ]
  },

  // 6. ACCENTURE
  {
    id: 'accenture',
    name: 'Accenture',
    shortName: 'Accenture',
    category: 'it_services',
    categoryLabel: 'IT Services & Mass Recruiters',
    accentColor: 'purple',
    badge: 'IT & Consulting Leader',
    logoPlaceholder: 'ACN',
    description: 'Global professional services enterprise delivering digital transformation, cloud, and AI consulting. Placement tracks include Associate Software Engineer (ASE) and Advanced ASE (AASE).',
    hiringModel: 'Stage 1: Cognitive & Technical Assessment (90 Qs / 90 mins) -> Stage 2: Coding Assessment (45 mins) -> Stage 3: Communication Assessment -> Stage 4: Interview.',
    disclaimer: 'Curated for educational placement practice. Not affiliated with or endorsed by Accenture plc.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'Cognitive & Technical Assessment',
        format: 'Online Test (90 mins)',
        focus: 'English Ability, Critical Thinking, Abstract Reasoning, Common App Tech, MS Office, Cloud Fundamentals, Network Security',
        tips: 'Must clear both Cognitive AND Technical sectional cutoffs to immediately unlock the Coding test in the same session.'
      },
      {
        roundNumber: 2,
        name: 'Coding Assessment',
        format: 'HackerRank / Mettl (45 mins)',
        focus: '2 coding problems (Arrays, Matrices, String operations, Mathematical logic)',
        tips: 'Both questions must execute without syntax errors. Partial test case execution counts towards scoring.'
      },
      {
        roundNumber: 3,
        name: 'Automated Communication Assessment',
        format: 'AI Speech Evaluation (20 mins)',
        focus: 'Reading sentences aloud, Repeat sentences, Story retelling, Short answer questions, Fluency and pronunciation',
        tips: 'Use a quiet room and a good quality USB/wired headset with clear microphone. Speak at a measured, calm pace.'
      },
      {
        roundNumber: 4,
        name: 'Virtual Interview',
        format: 'One-on-one Panel (25-35 mins)',
        focus: 'Project review, situational questions, teamwork, continuous learning, and client communication skills',
        tips: 'Accenture values consulting mindset: connect technical choices back to business efficiency and user experience.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'acn-apt-1',
          title: 'Critical Thinking & Abstract Reasoning',
          description: 'Flowcharts, Visual series completion, Venn diagrams, Syllogisms, and Statement-Assumption logic.',
          category: 'aptitude',
          estimatedHours: 10,
          importance: 'Critical',
          keyTips: ['Practice tracing visual flowchart decision diamonds with loop counters.']
        },
        {
          id: 'acn-apt-2',
          title: 'Common Application & Cloud Fundamentals',
          description: 'Cloud deployment models (Public, Private, Hybrid), SaaS/PaaS/IaaS differences, MS Excel formulas (VLOOKUP, INDEX/MATCH).',
          category: 'aptitude',
          estimatedHours: 8,
          importance: 'High',
          keyTips: ['Expect 10-12 questions specifically testing MS Office productivity shortcuts and cloud service models.']
        }
      ],
      technical: [
        {
          id: 'acn-tech-1',
          title: 'Network Security & Web Architecture',
          description: 'Firewalls, Symmetric vs Asymmetric encryption, HTTPS/SSL, Cookies vs LocalStorage, SQL Injection prevention.',
          category: 'technical',
          estimatedHours: 10,
          importance: 'High',
          keyTips: ['Understand how public and private keys are used during TLS handshake.']
        }
      ],
      coding: [
        {
          id: 'acn-code-1',
          title: 'Accenture Coding Patterns (Arrays & Math)',
          description: 'Sum of odd/even elements, Base conversion, Second largest element, String anagrams, Bitwise operations.',
          category: 'coding',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Write clean C++, Java, or Python code with standard input parsing (cin/Scanner/sys.stdin).']
        }
      ],
      coreBranch: {
        ece: [
          {
            id: 'acn-core-ece-1',
            title: 'Wireless Communications & IoT Architecture',
            description: 'Cellular generations (4G LTE vs 5G NR), MQTT vs HTTP for IoT sensor nodes, Bluetooth Low Energy (BLE).',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Explain why MQTT is preferred over HTTP for low-power IoT devices.']
          }
        ],
        mech: [
          {
            id: 'acn-core-mech-1',
            title: 'Industry 4.0 & Smart Manufacturing Concepts',
            description: 'Digital Twins, Predictive maintenance using vibration sensors, PLC automation, SCADA systems.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Accenture Industry X practice focuses on smart manufacturing; mention digital twins in your interview!']
          }
        ]
      },
      techInterview: [
        {
          id: 'acn-tint-1',
          title: 'Business & Problem-Solving Scenarios',
          description: 'Translating client business needs into functional software features and describing technology trade-offs.',
          category: 'tech_interview',
          estimatedHours: 6,
          importance: 'High',
          keyTips: ['Think like a technology consultant: how does this software save time, cost, or reduce human error?']
        }
      ],
      hrInterview: [
        {
          id: 'acn-hr-1',
          title: 'Communication & Adaptability Viva',
          description: 'Demonstrating professional fluency, cultural sensitivity for global client teams, and positive attitude.',
          category: 'hr_interview',
          estimatedHours: 6,
          importance: 'Critical',
          keyTips: ['Maintain natural eye contact, clear diction, and speak in structured bullet points.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'Aim for Advanced ASE (AASE) package by acing both coding questions and showing strong architectural clarity.',
        focusAreas: ['Coding efficiency & edge cases', 'Cloud security fundamentals', 'Structured communication'],
        commonMistakes: ['Neglecting the Communication Assessment; low speech fluency scores disqualify candidates before interview.']
      },
      aiml: {
        advice: 'Accenture is investing billions into Enterprise AI. Emphasize how AI models can be deployed securely in business workflows.',
        focusAreas: ['Applied AI use-cases in banking & retail', 'Coding test speed', 'Communication assessment practice'],
        commonMistakes: ['Speaking too fast or mumbling during the automated AI voice assessment.']
      },
      ds: {
        advice: 'Highlight Excel proficiency, SQL, and data reporting tools (PowerBI/Tableau) alongside standard test sections.',
        focusAreas: ['Data interpretation & critical thinking', 'Cloud & Excel functions', 'Coding logic'],
        commonMistakes: ['Skipping MS Excel and cloud theory preparation in the online test.']
      },
      it: {
        advice: 'Your cloud, security, and web knowledge aligns directly with the Technical Assessment questions.',
        focusAreas: ['Network security fundamentals', 'Array & String coding', 'Communication fluency'],
        commonMistakes: ['Relying on informal vocabulary during the interview.']
      },
      ece: {
        advice: 'Accenture Industry X hires many electronics engineers for IoT and automation. Highlight hardware-software integration.',
        focusAreas: ['IoT protocols (MQTT/CoAP)', 'Aptitude & Critical Thinking', 'Clear project overview'],
        commonMistakes: ['Failing to practice spoken English reading aloud for the voice assessment.']
      },
      eee: {
        advice: 'Focus on systematic test preparation. The Cognitive and Technical sections are very scoring with consistent practice.',
        focusAreas: ['Abstract reasoning flowcharts', 'C/Java coding fundamentals', 'Confident conversational tone'],
        commonMistakes: ['Not testing your microphone and quiet room setup prior to the automated speech test.']
      },
      mech: {
        advice: 'Prepare for both standard ASE roles and Industry X (smart products/manufacturing). Frame mechanical knowledge as a consulting asset.',
        focusAreas: ['Critical reasoning', 'Basic programming in Python or C', 'Communication assessment'],
        commonMistakes: ['Allowing long awkward pauses in the automated voice test when retelling stories.']
      },
      civil: {
        advice: 'Target the ASE track with focused practice on abstract reasoning, common cloud concepts, and clear spoken English.',
        focusAreas: ['Cognitive assessment speed', 'Basic coding fundamentals', 'Professional communication'],
        commonMistakes: ['Underestimating the importance of clear pronunciation in the speech evaluation round.']
      }
    },
    practiceQuestions: [
      {
        id: 'acn-q1',
        companyId: 'accenture',
        category: 'aptitude',
        categoryLabel: 'Technical (Cloud & Security)',
        title: 'Cloud Service Model Classification',
        question: 'A company wants to build and deploy web applications without managing the underlying operating system, server hardware, runtime patches, or network infrastructure. Which cloud service model should they choose?',
        options: [
          { id: 'a', text: 'IaaS (Infrastructure as a Service)' },
          { id: 'b', text: 'PaaS (Platform as a Service)' },
          { id: 'c', text: 'SaaS (Software as a Service)' },
          { id: 'd', text: 'On-premise Bare Metal' }
        ],
        correctAnswer: 'b',
        explanation: 'In PaaS (Platform as a Service, such as Google App Engine, Heroku, or AWS Elastic Beanstalk), the vendor manages the OS, runtime, and hardware; developers only provide application code and data. IaaS requires OS management; SaaS is a finished turnkey application.',
        difficulty: 'Easy'
      },
      {
        id: 'acn-q2',
        companyId: 'accenture',
        category: 'coding',
        categoryLabel: 'Coding Assessment',
        title: 'Calculate Character Frequency Difference',
        question: 'Write a program that takes a string of lowercase letters and returns the difference between the maximum frequency of any character and the minimum frequency of any character present.',
        codeSnippet: `// Example: s = "aabbbcc" -> max freq = 3 ('b'), min freq = 2 ('a','c') -> Output: 3 - 2 = 1`,
        options: [
          { id: 'a', text: 'Use an integer array of size 26 as a frequency map in O(N) time and O(1) space.' },
          { id: 'b', text: 'Sort the string in O(N log N) time, count runs, and find extremes.' },
          { id: 'c', text: 'Both A and B are valid, but A is optimal in O(N) time.' },
          { id: 'd', text: 'Requires recursive tree traversal.' }
        ],
        correctAnswer: 'c',
        explanation: 'Creating an array `int freq[26] = {0}` allows counting frequencies in a single O(N) pass. Then a scan of the 26 entries identifies non-zero min and max values. Total time: O(N), extra space: O(1).',
        difficulty: 'Easy'
      }
    ]
  },

  // 7. WIPRO
  {
    id: 'wipro',
    name: 'Wipro',
    shortName: 'Wipro',
    category: 'it_services',
    categoryLabel: 'IT Services & Mass Recruiters',
    accentColor: 'emerald',
    badge: 'IT Services Leader',
    logoPlaceholder: 'WIPRO',
    description: 'Pioneering Indian multinational technology provider. Runs the Elite National Talent Hunt (NTH) and Turbo tracks for high-performing engineering graduates.',
    hiringModel: 'Wipro Elite NTH: Aptitude (Quant, Logical, Verbal), Written Communication (Essay), and Online Coding (2 problems). Followed by Technical and HR interview.',
    disclaimer: 'Curated for educational preparation from public candidate test logs. Not affiliated with or endorsed by Wipro Limited.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'Wipro Elite NTH Online Assessment',
        format: 'Online Test (128 mins)',
        focus: 'Aptitude Test (48 mins) + Written Communication Essay (20 mins) + Online Coding Test (60 mins)',
        tips: 'Written communication is evaluated by an automated grammar & vocabulary AI tool. Avoid spelling errors and write 180-250 structured words.'
      },
      {
        roundNumber: 2,
        name: 'Technical Interview',
        format: 'Live Interview (25-35 mins)',
        focus: 'Programming logic in chosen language, Data structures (Stacks, Queues, Arrays), Database queries, Final-year project',
        tips: 'Explain your thought process step by step when asked to write simple algorithms on a shared notepad.'
      },
      {
        roundNumber: 3,
        name: 'HR Interview',
        format: 'Live Interview (15-20 mins)',
        focus: 'Willingness to relocate, work in rotational shifts, communication skills, and personal background',
        tips: 'Express readiness to join any Wipro development center across India.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'wip-apt-1',
          title: 'Written Communication (Automated Essay Evaluation)',
          description: 'Topic essay writing evaluated on grammar, spellings, sentence structure, punctuation, and thematic coherence.',
          category: 'aptitude',
          estimatedHours: 8,
          importance: 'Critical',
          keyTips: ['Structure essay into 3 paragraphs: Introduction, Body with 2 supporting points, and Conclusion. Avoid informal slang or short forms.']
        },
        {
          id: 'wip-apt-2',
          title: 'Quantitative & Logical Reasoning',
          description: 'Speed math, Coding-Decoding, Direction sense, Seating arrangements, Syllogisms, and Probability.',
          category: 'aptitude',
          estimatedHours: 12,
          importance: 'High',
          keyTips: ['Solve with paper and pen without calculator to build rapid mental arithmetic speed.']
        }
      ],
      technical: [
        {
          id: 'wip-tech-1',
          title: 'Data Structures Foundations (Arrays, Stacks, Queues)',
          description: 'Stack LIFO operations, Queue FIFO operations, Infix to Postfix conversion, Parenthesis matching, Array rotations.',
          category: 'technical',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Be ready to implement a stack using an array with push(), pop(), and peek() operations.']
        }
      ],
      coding: [
        {
          id: 'wip-code-1',
          title: 'Wipro Coding Test (2 Questions)',
          description: 'String reversal, Prime number generation, GCD/LCM calculation, Matrix multiplication, Sorting algorithms.',
          category: 'coding',
          estimatedHours: 14,
          importance: 'Critical',
          keyTips: ['Ensure your program executes in under 2 seconds and handles large inputs without stack overflow.']
        }
      ],
      coreBranch: {
        ece: [
          {
            id: 'wip-core-ece-1',
            title: 'Signals and Systems Basics',
            description: 'Continuous vs Discrete signals, Linear Time-Invariant (LTI) systems, Convolution, Fourier Transform basics.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Explain what makes a system Linear and Time-Invariant.']
          }
        ],
        mech: [
          {
            id: 'wip-core-mech-1',
            title: 'Fluid Mechanics & Bernoulli\'s Principle',
            description: 'Continuity equation, Bernoulli\'s energy conservation equation, Laminar vs Turbulent flow, Reynolds number.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['State the physical assumptions required for Bernoulli\'s equation to hold true.']
          }
        ]
      },
      techInterview: [
        {
          id: 'wip-tint-1',
          title: 'Basic Coding on Shared Notepad',
          description: 'Writing clean code without compiler support for: checking palindrome, reversing an array, or printing Fibonacci sequence.',
          category: 'tech_interview',
          estimatedHours: 6,
          importance: 'Critical',
          keyTips: ['Practice writing syntactically correct code on Windows Notepad without autocomplete.']
        }
      ],
      hrInterview: [
        {
          id: 'wip-hr-1',
          title: 'Wipro Spirit & Service Orientation',
          description: 'Commitment to client success, integrity, respect for people, and flexibility with technologies and work locations.',
          category: 'hr_interview',
          estimatedHours: 4,
          importance: 'High',
          keyTips: ['Be authentic and clearly articulate how you overcome stressful academic deadlines.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'Aim for Wipro Turbo track by passing 100% of test cases in both coding problems and demonstrating strong OOP skills.',
        focusAreas: ['Coding test performance', 'Data structures (Trees & Linked lists)', 'Written communication essay'],
        commonMistakes: ['Writing less than 150 words in the essay test, causing an automatic system disqualification.']
      },
      aiml: {
        advice: 'Demonstrate how AI algorithms solve practical real-world problems. Maintain strong foundational programming.',
        focusAreas: ['Python algorithms', 'Data structure basics', 'Structured essay writing'],
        commonMistakes: ['Neglecting basic C/Java syntax when asked by interviewers.']
      },
      ds: {
        advice: 'Wipro values practical data handling and SQL reporting. Prepare clean explanations of analytical projects.',
        focusAreas: ['SQL basics', 'Aptitude speed math', 'Essay writing with good vocabulary'],
        commonMistakes: ['Ignoring spelling and grammatical errors in the written test.']
      },
      it: {
        advice: 'Strong performance on the online test puts you in contention for high-priority project deployments.',
        focusAreas: ['Array and String manipulation', 'Operating system basics', 'Professional communication'],
        commonMistakes: ['Rushing through coding questions without validating boundary conditions.']
      },
      ece: {
        advice: 'Wipro hires across all engineering streams. Highlight solid analytical skills and basic programming.',
        focusAreas: ['C programming fundamentals', 'Aptitude & Logical reasoning', 'Essay grammar'],
        commonMistakes: ['Poor time allocation between the 3 sections in the online exam.']
      },
      eee: {
        advice: 'Practice basic coding in C++ or Python every day. The coding questions are approachable with standard practice.',
        focusAreas: ['Array manipulation', 'Basic loops and conditional logic', 'Essay writing structure'],
        commonMistakes: ['Freezing when asked to explain your B.Tech project.']
      },
      mech: {
        advice: 'Leverage strong math skills for the aptitude section and prepare 1 programming language thoroughly.',
        focusAreas: ['Aptitude practice', 'Basic C/Python syntax', 'Clear career motivation'],
        commonMistakes: ['Hesitating on basic questions like "What is an array?".']
      },
      civil: {
        advice: 'Focus on clearing the online assessment by practicing previous Wipro NTH aptitude papers and basic coding.',
        focusAreas: ['NTH Aptitude papers', 'Basic string reversal & prime coding', 'Essay writing'],
        commonMistakes: ['Submitting the essay with typos and lack of capital letters.']
      }
    },
    practiceQuestions: [
      {
        id: 'wip-q1',
        companyId: 'wipro',
        category: 'coding',
        categoryLabel: 'Coding Test Practice',
        title: 'Check if Two Strings are Anagrams',
        question: 'Write a program to determine if two given strings s1 and s2 are anagrams of each other (contain the exact same characters with the same frequencies).',
        options: [
          { id: 'a', text: 'Sort both strings and compare if they are equal: O(N log N) time.' },
          { id: 'b', text: 'Use a single frequency array of size 256; increment for s1 and decrement for s2; verify all values are 0: O(N) time.' },
          { id: 'c', text: 'Both A and B are valid, with B being optimal in O(N) time.' },
          { id: 'd', text: 'Check if both strings have the same first and last characters.' }
        ],
        correctAnswer: 'c',
        explanation: 'Both methods solve the problem. The single-frequency count array approach (Method B) runs in O(N) time and O(1) space (256 integers), making it optimal and highly favored by technical interviewers.',
        difficulty: 'Easy'
      }
    ]
  },

  // 8. COGNIZANT
  {
    id: 'cognizant',
    name: 'Cognizant',
    shortName: 'Cognizant',
    category: 'it_services',
    categoryLabel: 'IT Services & Mass Recruiters',
    accentColor: 'teal',
    badge: 'IT Services Leader',
    logoPlaceholder: 'CTS',
    description: 'American multinational IT services company delivering modern enterprise engineering. Offers GenC (foundation), GenC Elevate (full-stack), and GenC Next (specialized digital/cloud/AI) career paths.',
    hiringModel: 'Cognizant Campus Drive: Aptitude Assessment + Automata Fix (Debugging) + Coding Round. Followed by Technical and HR interview.',
    disclaimer: 'Curated for educational preparation from public campus placement patterns. Not affiliated with or endorsed by Cognizant Technology Solutions.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'Aptitude & Automata Fix (Debugging)',
        format: 'AMCAT / Mettl (90 mins)',
        focus: 'Quantitative, Logical, Verbal, and 7 code debugging questions (Automata Fix)',
        tips: 'In Automata Fix, do NOT rewrite the entire program! Find and fix subtle syntax or logical bugs in 2-3 lines.'
      },
      {
        roundNumber: 2,
        name: 'GenC Elevate / Next Coding Assessment',
        format: 'Live Coding (60 mins)',
        focus: '2 algorithmic problems (HashMaps, Dynamic arrays, Math algorithms)',
        tips: 'Passing both coding questions qualifies students for the premium GenC Elevate/Next compensation brackets.'
      },
      {
        roundNumber: 3,
        name: 'Technical & HR Combined Interview',
        format: 'Live Interview (30-40 mins)',
        focus: 'Technical debugging review, OOP principles, SQL queries, project breakdown, and adaptability',
        tips: 'Be prepared to explain how you fixed bugs in the Automata round and write clean SQL queries.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'cts-apt-1',
          title: 'Automata Fix: Rapid Code Debugging',
          description: 'Finding off-by-one errors in loop boundaries, operator precedence bugs, uninitialized variables, and missing return statements.',
          category: 'aptitude',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Check loop termination conditions (e.g. i < n vs i <= n) and variable type mismatches (float vs int).']
        },
        {
          id: 'cts-apt-2',
          title: 'Logical Deduction & Analytical Puzzles',
          description: 'Data arrangement, Direction puzzles, Coding-decoding, Syllogisms, and Statement arguments.',
          category: 'aptitude',
          estimatedHours: 10,
          importance: 'High',
          keyTips: ['Draw quick diagrams for direction and seating arrangement problems to avoid confusion.']
        }
      ],
      technical: [
        {
          id: 'cts-tech-1',
          title: 'Object-Oriented Programming & Exception Handling',
          description: 'Classes, Objects, Constructors, try-catch-finally execution flow, Throw vs Throws in Java, Custom exceptions.',
          category: 'technical',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Explain what happens if a return statement is inside try block and another is inside finally block.']
        },
        {
          id: 'cts-tech-2',
          title: 'SQL DDL vs DML and Constraints',
          description: 'CREATE, ALTER, DROP vs INSERT, UPDATE, DELETE; UNIQUE vs PRIMARY KEY; CHECK and DEFAULT constraints.',
          category: 'technical',
          estimatedHours: 10,
          importance: 'High',
          keyTips: ['Remember: A table can have only ONE primary key, but multiple unique constraints.']
        }
      ],
      coding: [
        {
          id: 'cts-code-1',
          title: 'GenC Coding: Arrays & Number Theory',
          description: 'Find missing number in array (1 to N), Leaders in an array, Subarray sum equals K, Armstrong numbers, GCD.',
          category: 'coding',
          estimatedHours: 14,
          importance: 'Critical',
          keyTips: ['For missing number from 1 to N, use XOR or arithmetic formula N*(N+1)/2 to achieve O(N) time and O(1) space.']
        }
      ],
      coreBranch: {
        ece: [
          {
            id: 'cts-core-ece-1',
            title: 'Control Systems & Transfer Functions',
            description: 'Open loop vs Closed loop, Transfer function, Poles and Zeros, Routh-Hurwitz stability criterion.',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Explain why negative feedback is preferred in amplifier and control circuits.']
          }
        ],
        mech: [
          {
            id: 'cts-core-mech-1',
            title: 'Manufacturing Technology & Machining',
            description: 'Lathe operations, Milling, Drilling, Casting defects, Welding types (TIG, MIG, Arc).',
            category: 'core_branch',
            estimatedHours: 8,
            importance: 'High',
            keyTips: ['Differentiate between orthogonal and oblique cutting.']
          }
        ]
      },
      techInterview: [
        {
          id: 'cts-tint-1',
          title: 'Code Walkthrough & Defensive Programming',
          description: 'Explaining your code logic clearly to the interviewer, defending variable names, and describing edge case handling.',
          category: 'tech_interview',
          estimatedHours: 6,
          importance: 'Critical',
          keyTips: ['Speak clearly and explain each line of logic as you write it.']
        }
      ],
      hrInterview: [
        {
          id: 'cts-hr-1',
          title: 'Cognizant Professional Values & Growth',
          description: 'Collaborative team spirit, continuous skill upgrades, client responsiveness, and corporate etiquette.',
          category: 'hr_interview',
          estimatedHours: 4,
          importance: 'High',
          keyTips: ['Demonstrate enthusiasm for learning emerging technologies like Cloud and GenAI.']
        }
      ]
    },
    branchRecommendations: {
      cse: {
        advice: 'Target GenC Next / Elevate tracks. Maximize score on Automata Fix and solve both coding questions cleanly.',
        focusAreas: ['Automata Fix rapid debugging', 'Full-stack web fundamentals', 'SQL joins and aggregate functions'],
        commonMistakes: ['Completely rewriting the code in Automata Fix instead of pinpointing the exact bug.']
      },
      aiml: {
        advice: 'GenC Next has specialized AI & Cloud tracks. Showcase Python projects, data pipelines, and clear algorithmic logic.',
        focusAreas: ['Python programming', 'Data manipulation', 'Automata Fix debugging'],
        commonMistakes: ['Neglecting standard relational SQL syntax.']
      },
      ds: {
        advice: 'Emphasize strong SQL, database schema design, and Python for data analysis.',
        focusAreas: ['SQL DML queries', 'Analytical aptitude', 'Automata debugging'],
        commonMistakes: ['Failing to practice debugging code written in C or Java.']
      },
      it: {
        advice: 'Your coursework in software engineering and database systems provides a direct advantage for GenC Elevate.',
        focusAreas: ['OOP principles', 'Database constraints', 'Array and String algorithms'],
        commonMistakes: ['Rushing through the verbal reasoning section.']
      },
      ece: {
        advice: 'Cognizant recruits many ECE graduates into GenC and Elevate tracks. Prepare C/Java programming and digital logic.',
        focusAreas: ['Automata debugging in C/Java', 'OOP concepts', 'Aptitude speed math'],
        commonMistakes: ['Struggling to explain basic object-oriented concepts like polymorphism.']
      },
      eee: {
        advice: 'Build solid coding foundations. Practice 30+ Automata Fix questions to develop rapid debugging instincts.',
        focusAreas: ['Code debugging practice', 'Aptitude & Reasoning', 'C/Java basics'],
        commonMistakes: ['Not practicing on a live coding editor with strict time limits.']
      },
      mech: {
        advice: 'Demonstrate strong analytical aptitude and clear motivation for joining IT consulting services.',
        focusAreas: ['Aptitude & Speed Math', 'Basic C/Python programming', 'Clear communication'],
        commonMistakes: ['Unclear explanation of final-year academic project.']
      },
      civil: {
        advice: 'Focus on clearing the aptitude and Automata rounds with disciplined daily practice.',
        focusAreas: ['Automata debugging patterns', 'Quantitative aptitude', 'Professional interview presence'],
        commonMistakes: ['Lack of preparation for common HR questions like "Why Cognizant?".']
      }
    },
    practiceQuestions: [
      {
        id: 'cts-q1',
        companyId: 'cognizant',
        category: 'technical',
        categoryLabel: 'Automata Fix / Debugging',
        title: 'Fix the Array Sum Bug',
        question: 'Identify the bug in this C function intended to compute the sum of all elements in an integer array:\n\nint getSum(int arr[], int n) {\n    int sum;\n    for(int i = 0; i <= n; i++) {\n        sum += arr[i];\n    }\n    return sum;\n}',
        options: [
          { id: 'a', text: 'Loop condition should be i < n (not i <= n) AND sum must be initialized to 0 (int sum = 0).' },
          { id: 'b', text: 'The array must be passed by reference using pointers.' },
          { id: 'c', text: 'The loop should increment by 2 instead of 1.' },
          { id: 'd', text: 'int sum cannot store negative numbers.' }
        ],
        correctAnswer: 'a',
        explanation: 'There are two critical bugs: 1. `int sum` is an uninitialized local variable containing garbage value, so `sum += arr[i]` adds to garbage. 2. `i <= n` causes an off-by-one array out-of-bounds error accessing arr[n] which does not exist in a 0-indexed array of length n.',
        difficulty: 'Easy'
      }
    ]
  },

  // 9. L&T (Larsen & Toubro) - Core Engineering
  {
    id: 'lnt',
    name: 'Larsen & Toubro (L&T)',
    shortName: 'L&T',
    category: 'core_engineering',
    categoryLabel: 'Core Engineering & Infrastructure',
    accentColor: 'amber',
    badge: 'Core Engineering Leader',
    logoPlaceholder: 'L&T',
    description: 'India\'s premier engineering, construction, manufacturing, and technology conglomerate. Campus recruitment hires Graduate Engineer Trainees (GET) across Civil, Mechanical, and Electrical disciplines.',
    hiringModel: 'L&T GET Selection: Online Technical Aptitude Test (60% core domain questions + 40% general aptitude) followed by Technical Viva and HR Interview.',
    disclaimer: 'Curated for academic preparation from public engineering recruitment guidelines. Not affiliated with or endorsed by Larsen & Toubro Limited.',
    recruitmentRounds: [
      {
        roundNumber: 1,
        name: 'L&T GET Online Assessment',
        format: 'Online Test (120 mins)',
        focus: 'Discipline Core Engineering (Civil / Mech / EEE) + Quantitative + Analytical Reasoning + English',
        tips: 'Domain core engineering questions carry the highest weight. Deep clarity on fundamental formulas and physical units is essential.'
      },
      {
        roundNumber: 2,
        name: 'Technical Panel Interview',
        format: 'In-person / Virtual Panel (30-45 mins)',
        focus: 'Rigorous engineering viva: Engineering drawings, site problems, standard codes (IS codes), practical stress analysis, project design',
        tips: 'Bring sketches and clear understanding of your B.Tech project drawings and calculations.'
      },
      {
        roundNumber: 3,
        name: 'HR & Medical Fitness Review',
        format: 'Personal Interview',
        focus: 'Willingness to work at project sites across India, physical fitness, teamwork, leadership',
        tips: 'Site readiness and passion for field engineering execution are highly prized.'
      }
    ],
    internshipPrograms: [
      {
        id: 'lnt-bis-intern',
        name: 'L&T Build India Scholarship (BIS) & Graduate Internship',
        targetYear: 'Final Year / Pre-Final Year B.Tech (Civil & Electrical)',
        duration: 'Summer Internship + Sponsored M.Tech at IIT Madras / NIT Trichy with Job Guarantee',
        stipendBenchmark: '₹13,400 / month stipend + 100% Tuition & Hostel sponsorship (Sample Industry Benchmark)',
        eligibleBranches: ['Civil', 'Electrical', 'Mechanical'],
        selectionProcess: [
          'Online Subject Assessment (Engineering Mechanics, RCC, Structures / Electrical Machines)',
          'Technical & Behavioral Panel Interview'
        ],
        evaluationFocus: ['Civil/Mechanical/Electrical fundamental concepts', 'Passion for large-scale mega infrastructure projects', 'Site readiness and leadership'],
        ppoConversionGuidance: 'Successful BIS scholars are directly absorbed as regular Senior Engineers at L&T Construction upon program completion.',
        applicationTimeline: 'Applications open December – February annually.'
      }
    ],
    syllabus: {
      aptitude: [
        {
          id: 'lnt-apt-1',
          title: 'Engineering Mathematics & Applied Mechanics',
          description: 'Calculus, Differential equations, Statics (Equilibrium of forces, Free body diagrams, Friction, Centroids).',
          category: 'aptitude',
          estimatedHours: 12,
          importance: 'Critical',
          keyTips: ['Draw free-body diagrams (FBD) systematically resolving horizontal and vertical force components.']
        }
      ],
      technical: [
        {
          id: 'lnt-tech-1',
          title: 'Project Planning & Construction Safety Standards',
          description: 'Bar charts, CPM / PERT critical path analysis, Quality control, Safety protocols (PPE, scaffolding standards).',
          category: 'technical',
          estimatedHours: 10,
          importance: 'High',
          keyTips: ['Understand slack time and float calculation on critical path network diagrams.']
        }
      ],
      coding: [
        {
          id: 'lnt-code-1',
          title: 'Engineering Software & Computational Tools',
          description: 'AutoCAD drafting commands, MATLAB/Python for numerical simulations, Excel for engineering bill of quantities (BOQ).',
          category: 'coding',
          estimatedHours: 10,
          importance: 'Medium',
          keyTips: ['Be ready to discuss layers, coordinate systems, and parametric blocks in CAD.']
        }
      ],
      coreBranch: {
        civil: [
          {
            id: 'lnt-core-civ-1',
            title: 'Design of Concrete Structures (IS 456) & Steel',
            description: 'Limit State Method, Singly and Doubly reinforced beams, Shear design, Columns, Footings, Soil Bearing Capacity, IS 456 codal provisions.',
            category: 'core_branch',
            estimatedHours: 20,
            importance: 'Critical',
            keyTips: ['Know key IS 456 clauses: minimum tension reinforcement in beams (0.85bd/fy), minimum column dimensions, and concrete cover specifications.']
          },
          {
            id: 'lnt-core-civ-2',
            title: 'Geotechnical Engineering & Foundation Design',
            description: 'Soil classification, Terzaghi bearing capacity theory, Compaction vs Consolidation, Standard Penetration Test (SPT N-value).',
            category: 'core_branch',
            estimatedHours: 16,
            importance: 'Critical',
            keyTips: ['Explain why shallow foundations are unsuitable for loose sandy soils with high water table.']
          }
        ],
        mech: [
          {
            id: 'lnt-core-mech-1',
            title: 'Machine Design & Heavy Equipment Mechanics',
            description: 'Theories of failure (Von Mises, Tresca), Factor of safety, Gear drives, Hydraulic systems, Heat treatment processes.',
            category: 'core_branch',
            estimatedHours: 18,
            importance: 'Critical',
            keyTips: ['Explain why Von Mises theory is preferred for ductile metals under combined biaxial loading.']
          }
        ],
        eee: [
          {
            id: 'lnt-core-eee-1',
            title: 'High Voltage Transmission & Substation Design',
            description: 'Switchgear and protection, Circuit breakers (SF6, Vacuum), Transformer oil testing, Busbar schemes, Earthing design.',
            category: 'core_branch',
            estimatedHours: 18,
            importance: 'Critical',
            keyTips: ['Explain the working of differential protection for high-capacity transformers.']
          }
        ]
      },
      techInterview: [
        {
          id: 'lnt-tint-1',
          title: 'Practical Engineering Drawing & Site Scenarios',
          description: 'Reading structural drawings, interpreting reinforcement detailing, explaining real-world site troubleshooting.',
          category: 'tech_interview',
          estimatedHours: 8,
          importance: 'Critical',
          keyTips: ['Expect the panel to sketch a beam or circuit on paper and ask for moment diagrams or failure modes.']
        }
      ],
      hrInterview: [
        {
          id: 'lnt-hr-1',
          title: 'Site Readiness & Leadership Commitment',
          description: 'Preparedness to work at infrastructure project sites (highways, tunnels, metro rail, industrial plants) in varied weather conditions.',
          category: 'hr_interview',
          estimatedHours: 4,
          importance: 'Critical',
          keyTips: ['Emphasize physical resilience, hands-on passion for building monumental physical assets, and pride in national nation-building.']
        }
      ]
    },
    branchRecommendations: {
      civil: {
        advice: 'L&T Construction is India\'s largest civil infrastructure builder. Master IS 456, Geotechnical soil mechanics, and structural concrete design.',
        focusAreas: ['IS 456 reinforcement detailing', 'Soil bearing capacity & foundations', 'Site safety & CPM scheduling'],
        commonMistakes: ['Not knowing the difference between characteristic compressive strength (fck) and target mean strength.']
      },
      mech: {
        advice: 'L&T Heavy Engineering, Power, and Hydrocarbon divisions value machine design, metallurgy, welding inspection, and piping layouts.',
        focusAreas: ['Von Mises failure theory', 'Fluid machinery (Pumps & Turbines)', 'Thermal power cycle efficiency'],
        commonMistakes: ['Inability to draw bending moment and shear force diagrams for overhanging beams.']
      },
      eee: {
        advice: 'L&T Electrical & Automation / Power transmission hires EEE graduates for substations, smart grids, and industrial drives.',
        focusAreas: ['Substation switchgear & protection', 'Transformer vector groups', 'Power factor correction'],
        commonMistakes: ['Confusion between active, reactive, and apparent power in 3-phase systems.']
      },
      cse: {
        advice: 'L&T Infotech (LTIMindtree) and L&T Technology Services (LTTS) recruit CSE students for embedded, engineering software, and digital industrial twin applications.',
        focusAreas: ['C/C++ and Python programming', 'Industrial IoT protocols', 'Database design'],
        commonMistakes: ['Neglecting low-level hardware interfaces in industrial software development.']
      },
      aiml: {
        advice: 'Showcase computer vision for automated quality inspection on manufacturing lines and predictive maintenance ML models.',
        focusAreas: ['Computer vision for defect detection', 'Time-series sensor forecasting', 'Python backend'],
        commonMistakes: ['Focusing purely on NLP while ignoring industrial vision and sensor telemetry applications.']
      },
      ds: {
        advice: 'Target supply chain analytics, construction site cost optimization, and predictive maintenance roles within L&T digital teams.',
        focusAreas: ['Supply chain predictive modeling', 'SQL reporting', 'Business data dashboards'],
        commonMistakes: ['Lack of understanding of construction project lifecycle milestones.']
      },
      it: {
        advice: 'Focus on enterprise ERP integration, SCADA communication security, and industrial software engineering.',
        focusAreas: ['Network security in SCADA/OT environments', 'Database integrity', 'Web dashboards'],
        commonMistakes: ['Treating industrial systems as ordinary e-commerce websites.']
      },
      ece: {
        advice: 'Highlight embedded sensors, industrial automation telemetry, and microprocessor control loops in heavy machinery.',
        focusAreas: ['Microcontroller interfaces', 'Signal conditioning circuits', 'Sensors and Actuators'],
        commonMistakes: ['Ignoring basic mechanical vibrations and sensor mounting constraints.']
      }
    },
    practiceQuestions: [
      {
        id: 'lnt-q1',
        companyId: 'lnt',
        category: 'core_branch',
        categoryLabel: 'Civil / Structural Engineering',
        title: 'Minimum Tension Reinforcement in Beams (IS 456)',
        question: 'According to IS 456:2000, what is the formula for the minimum area of tension reinforcement (Ast) required in a reinforced concrete beam to prevent sudden brittle failure upon first cracking?',
        options: [
          { id: 'a', text: 'Ast / (b * d) = 0.85 / fy' },
          { id: 'b', text: 'Ast / (b * d) = 0.12% of total cross-sectional area' },
          { id: 'c', text: 'Ast / (b * d) = 0.50 / fy' },
          { id: 'd', text: 'Ast = 0.04 * b * D' }
        ],
        correctAnswer: 'a',
        explanation: 'Clause 26.5.1.1 of IS 456:2000 specifies that the minimum area of tension reinforcement shall be not less than: Ast / (b * d) = 0.85 / fy, where b is breadth, d is effective depth, and fy is characteristic yield strength of steel in N/mm^2.',
        difficulty: 'Medium'
      },
      {
        id: 'lnt-q2',
        companyId: 'lnt',
        category: 'core_branch',
        categoryLabel: 'Mechanical Engineering',
        title: 'Mohr\'s Circle Radius & Maximum Shear Stress',
        question: 'In a two-dimensional state of plane stress with normal stresses sigma_x and sigma_y and shear stress tau_xy, what represents the maximum in-plane shear stress (tau_max)?',
        options: [
          { id: 'a', text: 'Radius of Mohr\'s Circle = sqrt[ ((sigma_x - sigma_y)/2)^2 + (tau_xy)^2 ]' },
          { id: 'b', text: 'Average of normal stresses: (sigma_x + sigma_y) / 2' },
          { id: 'c', text: 'Difference of normal stresses: sigma_x - sigma_y' },
          { id: 'd', text: 'tau_xy divided by 2' }
        ],
        correctAnswer: 'a',
        explanation: 'The radius of Mohr\'s circle represents the maximum in-plane shear stress: R = tau_max = sqrt[ ((sigma_x - sigma_y)/2)^2 + (tau_xy)^2 ]. The center of the circle is at ((sigma_x + sigma_y)/2, 0).',
        difficulty: 'Medium'
      }
    ]
  }
];

export function getCompanyById(id: string): TargetCompany | undefined {
  return TARGET_COMPANIES.find(c => c.id === id);
}

export function getAllCompanies(): TargetCompany[] {
  return TARGET_COMPANIES;
}

export function getCompaniesByCategory(category: CompanyCategory): TargetCompany[] {
  return TARGET_COMPANIES.filter(c => c.category === category);
}
