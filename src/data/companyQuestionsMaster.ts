/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyPracticeQuestion } from '../types';

export const CODING_DSA_QUESTIONS: CompanyPracticeQuestion[] = [
  {
    id: 'dsa-arr-1',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Arrays & Two Pointers',
    title: 'Two Sum with Optimal O(N) Hash Map',
    question: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice. What is the optimal approach and time-space complexity?',
    codeSnippet: `// Example: nums = [2, 7, 11, 15], target = 9\n// Output: [0, 1] (because nums[0] + nums[1] == 9)`,
    options: [
      { id: 'a', text: 'Brute force with nested loops: O(N^2) time, O(1) space.' },
      { id: 'b', text: 'Single-pass Hash Map: O(N) time, O(N) space storing target - nums[i].' },
      { id: 'c', text: 'Sorting then linear scan: O(N log N) time, O(N) space.' },
      { id: 'd', text: 'Two-pointer on unsorted array: O(N) time, O(1) space.' }
    ],
    correctAnswer: 'b',
    explanation: 'The optimal solution uses a single-pass Hash Map. As we iterate through nums at index i, we calculate complement = target - nums[i]. If complement exists in map, we return [map.get(complement), i]. Otherwise, map.set(nums[i], i). This runs in O(N) time and O(N) auxiliary space.',
    difficulty: 'Easy'
  },
  {
    id: 'dsa-str-2',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Strings & Sliding Window',
    title: 'Valid Palindrome with Alphanumeric Filtering',
    question: 'A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. What is the most memory-efficient technique to test this in O(1) extra space?',
    codeSnippet: `// Example: s = "A man, a plan, a canal: Panama" -> Output: true\n// Example: s = "race a car" -> Output: false`,
    options: [
      { id: 'a', text: 'Reverse the filtered string and compare: O(N) time, O(N) space.' },
      { id: 'b', text: 'Two pointers (left and right) moving inward, skipping non-alphanumeric chars: O(N) time, O(1) space.' },
      { id: 'c', text: 'Recursive string slicing: O(N^2) time, O(N) call stack space.' },
      { id: 'd', text: 'Regular expression replacement with stack: O(N) time, O(N) space.' }
    ],
    correctAnswer: 'b',
    explanation: 'Using two pointers starting at index 0 and index N-1 allows in-place verification. Increment left while s[left] is not alphanumeric, decrement right while s[right] is not alphanumeric. Compare lowercase equivalents. If mismatch, return false. Runs in O(N) time and strictly O(1) extra space.',
    difficulty: 'Easy'
  },
  {
    id: 'dsa-sort-3',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Searching & Sorting',
    title: 'Search in Rotated Sorted Array',
    question: 'Given an integer array nums sorted in ascending order (with distinct values) that is rotated at an unknown pivot index, find the index of a given target in O(log N) runtime.',
    codeSnippet: `// Example: nums = [4, 5, 6, 7, 0, 1, 2], target = 0 -> Output: 4\n// Example: nums = [4, 5, 6, 7, 0, 1, 2], target = 3 -> Output: -1`,
    options: [
      { id: 'a', text: 'Modified Binary Search checking which half (left or right) is normally sorted.' },
      { id: 'b', text: 'Linear scan from left to right in O(N) time.' },
      { id: 'c', text: 'Sorting the array first in O(N log N) then regular binary search.' },
      { id: 'd', text: 'Hashing all elements in O(N) space.' }
    ],
    correctAnswer: 'a',
    explanation: 'At any pivot mid in a rotated sorted array, at least one half (left to mid OR mid to right) MUST be strictly sorted. If nums[low] <= nums[mid], the left half is sorted: check if target is within [nums[low], nums[mid]]. If yes, search left; else search right. Otherwise, the right half is sorted. This guarantees O(log N) time and O(1) space.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa-ll-4',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Linked Lists',
    title: 'Detect Cycle in a Linked List (Floyd\'s Cycle-Finding Algorithm)',
    question: 'Given head, the head of a singly linked list, determine if the linked list has a cycle in it using O(1) memory.',
    options: [
      { id: 'a', text: 'Hash Set storing visited node addresses: O(N) time, O(N) space.' },
      { id: 'b', text: 'Tortoise and Hare algorithm: slow pointer moves 1 step, fast pointer moves 2 steps. If they meet, a cycle exists.' },
      { id: 'c', text: 'Modifying node values to an arbitrary sentinel value.' },
      { id: 'd', text: 'Counting nodes up to 100,000 limit.' }
    ],
    correctAnswer: 'b',
    explanation: 'Floyd\'s Cycle-Finding Algorithm uses two pointers. Fast moves 2 steps while slow moves 1 step. If there is a cycle, the relative distance between them decreases by 1 on each step, guaranteeing they will collide inside the loop in O(N) time and O(1) auxiliary space.',
    difficulty: 'Easy'
  },
  {
    id: 'dsa-stack-5',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Stacks & Queues',
    title: 'Valid Parentheses Matching',
    question: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. Brackets must close in correct order.',
    options: [
      { id: 'a', text: 'Counting open and closed brackets using integer counters.' },
      { id: 'b', text: 'Push opening brackets onto a Stack. On closing bracket, check if stack is non-empty and top matches; then pop.' },
      { id: 'c', text: 'Recursively replacing "()", "{}", "[]" with empty string until unchanged.' },
      { id: 'd', text: 'Sorting characters and comparing counts.' }
    ],
    correctAnswer: 'b',
    explanation: 'A Last-In-First-Out (LIFO) stack is the textbook optimal structure. Push open brackets. For a closing bracket, verify that stack is not empty and that the top matches the corresponding pair. At the end of the string, the stack must be completely empty. Runs in O(N) time and O(N) space.',
    difficulty: 'Easy'
  },
  {
    id: 'dsa-tree-6',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Trees & BST',
    title: 'Lowest Common Ancestor (LCA) in Binary Search Tree',
    question: 'Given a Binary Search Tree (BST) and two nodes p and q, find the lowest common ancestor (LCA) node in the BST with O(H) complexity where H is tree height.',
    options: [
      { id: 'a', text: 'Traverse root: if both p and q are less than root->val, go left; if both greater, go right; otherwise current root is the LCA split point.' },
      { id: 'b', text: 'Store path from root to p and path from root to q in arrays, then compare in O(N) space.' },
      { id: 'c', text: 'Level order traversal comparing node depths.' },
      { id: 'd', text: 'Convert BST to sorted array and pick median.' }
    ],
    correctAnswer: 'a',
    explanation: 'In a BST, all left descendants are < root and all right descendants are > root. If p.val and q.val are both smaller than current node, the LCA must lie in the left subtree. If both are larger, it lies in the right subtree. The very first node where p and q diverge on opposite sides (or one equals current node) is mathematically the Lowest Common Ancestor. Time: O(H), Space: O(1) iterative.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa-graph-7',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Graphs',
    title: 'Number of Islands (BFS / DFS Traversal on Grid)',
    question: 'Given an m x n 2D binary grid grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. What is the optimal time and space complexity?',
    options: [
      { id: 'a', text: 'O(M * N) time using DFS or BFS to traverse each unvisited land cell and mark visited; O(M * N) auxiliary stack/queue space.' },
      { id: 'b', text: 'O((M * N)^2) using all-pairs shortest paths.' },
      { id: 'c', text: 'O(M + N) using single row scanning.' },
      { id: 'd', text: 'O(2^(M+N)) using exhaustive backtracking.' }
    ],
    correctAnswer: 'a',
    explanation: 'Iterate through every cell (r, c). When a \'1\' is encountered, increment islandCount and trigger a BFS or DFS to sink all connected land cells by changing them to \'0\' (or recording in visited set). Each cell is visited a constant number of times (at most 4 edge checks). Time: O(M * N), Space: O(M * N) worst-case recursion/queue.',
    difficulty: 'Medium'
  },
  {
    id: 'dsa-dp-8',
    companyId: 'general',
    category: 'coding',
    categoryLabel: 'Coding & DSA',
    subTopic: 'Dynamic Programming',
    title: 'Coin Change Problem (Minimum Coins for Amount)',
    question: 'You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins that you need to make up that amount, or -1 if impossible.',
    codeSnippet: `// Example: coins = [1, 2, 5], amount = 11 -> Output: 3 (5 + 5 + 1)\n// Example: coins = [2], amount = 3 -> Output: -1`,
    options: [
      { id: 'a', text: 'Greedy approach: always pick the largest coin first.' },
      { id: 'b', text: 'Bottom-up 1D Dynamic Programming: dp[i] = min(dp[i], dp[i - coin] + 1) for each coin.' },
      { id: 'c', text: 'Depth-first search with no memoization.' },
      { id: 'd', text: 'Binary search over coin denominations.' }
    ],
    correctAnswer: 'b',
    explanation: 'Greedy fails for arbitrary coin sets (e.g., coins = [1, 3, 4], amount = 6: greedy gives 4 + 1 + 1 = 3 coins, whereas 3 + 3 = 2 coins is optimal). We initialize dp array of size amount + 1 with infinity, and dp[0] = 0. For i from 1 to amount, and for each coin <= i: dp[i] = min(dp[i], dp[i - coin] + 1). Time complexity is O(amount * coins.length), space is O(amount).',
    difficulty: 'Medium'
  }
];

export const BRANCH_CORE_QUESTIONS: Record<string, CompanyPracticeQuestion[]> = {
  cse: [
    {
      id: 'core-cse-dbms-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'CSE Core Subjects',
      subTopic: 'DBMS Internals',
      title: 'ACID Properties and Transaction Isolation Levels',
      question: 'Which SQL transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads under ANSI SQL standards?',
      options: [
        { id: 'a', text: 'Read Uncommitted' },
        { id: 'b', text: 'Read Committed' },
        { id: 'c', text: 'Repeatable Read' },
        { id: 'd', text: 'Serializable' }
      ],
      correctAnswer: 'c',
      explanation: 'Repeatable Read holds shared read locks until transaction completion, ensuring any row read once cannot be modified by another transaction (preventing non-repeatable reads). However, new rows matching a range predicate can still be inserted by other transactions, resulting in Phantom Reads. Serializable prevents all three phenomena.',
      difficulty: 'Medium',
      targetBranches: ['cse', 'it', 'ds']
    },
    {
      id: 'core-cse-os-2',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'CSE Core Subjects',
      subTopic: 'Operating Systems',
      title: 'Process Synchronization: Mutex vs Binary Semaphore',
      question: 'What is the critical fundamental distinction between a Mutex (Mutual Exclusion Lock) and a Binary Semaphore in operating system concurrency?',
      options: [
        { id: 'a', text: 'Mutex can only be locked; it cannot be unlocked.' },
        { id: 'b', text: 'A Mutex has ownership semantics: only the thread that acquired the mutex can unlock it. A semaphore can be signaled/unlocked by any thread.' },
        { id: 'c', text: 'Semaphores reside in CPU registers whereas mutexes reside on disk.' },
        { id: 'd', text: 'There is no distinction; they are identical in all kernels.' }
      ],
      correctAnswer: 'b',
      explanation: 'A Mutex enforces strict ownership semantics: the thread that locked the resource must be the one to release it. In contrast, a Binary Semaphore is a signaling mechanism: Thread A can wait for an event, and Thread B or an Interrupt Service Routine (ISR) can post/signal the semaphore to wake it up.',
      difficulty: 'Medium',
      targetBranches: ['cse', 'it', 'ece']
    },
    {
      id: 'core-cse-cn-3',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'CSE Core Subjects',
      subTopic: 'Computer Networks',
      title: 'TCP 3-Way Handshake Connection Establishment',
      question: 'During a standard TCP connection establishment, what sequence of flag packets is exchanged between client and server?',
      options: [
        { id: 'a', text: 'Client: SYN -> Server: ACK -> Client: FIN' },
        { id: 'b', text: 'Client: SYN -> Server: SYN-ACK -> Client: ACK' },
        { id: 'c', text: 'Client: ACK -> Server: SYN -> Client: SYN-ACK' },
        { id: 'd', text: 'Client: PING -> Server: PONG -> Client: ESTABLISHED' }
      ],
      correctAnswer: 'b',
      explanation: 'The TCP 3-way handshake protocol: 1) Client sends SYN with initial sequence number x. 2) Server replies with SYN-ACK with its own sequence number y and ACK = x + 1. 3) Client sends ACK with sequence number x + 1 and ACK = y + 1. The connection is then ESTABLISHED.',
      difficulty: 'Easy',
      targetBranches: ['cse', 'it']
    }
  ],
  aiml: [
    {
      id: 'core-aiml-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'AI & ML Core',
      subTopic: 'Machine Learning',
      title: 'Bias-Variance Tradeoff and Regularization',
      question: 'If a deep neural network achieves 99.2% accuracy on the training dataset but drops to 68.5% on the validation set, what problem is it experiencing and what is the appropriate remediation?',
      options: [
        { id: 'a', text: 'High Bias (Underfitting); increase model parameters and training epochs.' },
        { id: 'b', text: 'High Variance (Overfitting); introduce Dropout, L2 weight decay, and data augmentation.' },
        { id: 'c', text: 'Gradient vanishing; remove all non-linear activation functions.' },
        { id: 'd', text: 'Data leakage; reduce training dataset size.' }
      ],
      correctAnswer: 'b',
      explanation: 'A large gap between high training performance and poor test/validation performance is the hallmark of High Variance (Overfitting). The model memorized training noise. Mitigate by adding Dropout regularization, L1/L2 penalties, early stopping, and collecting or synthesizing augmented training samples.',
      difficulty: 'Easy',
      targetBranches: ['aiml', 'ds', 'cse']
    },
    {
      id: 'core-aiml-2',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'AI & ML Core',
      subTopic: 'Python & Numerical Stack',
      title: 'NumPy Vectorization vs Native Python Loops',
      question: 'Why is vectorized operations in NumPy significantly faster than equivalent Python for-loops for matrix arithmetic?',
      options: [
        { id: 'a', text: 'NumPy executes code directly inside the browser JavaScript engine.' },
        { id: 'b', text: 'NumPy arrays are stored in contiguous memory blocks with homogeneous types, bypassing Python type-checking and utilizing SIMD instructions written in C.' },
        { id: 'c', text: 'Python for-loops automatically spawn multi-threading which creates thread overhead.' },
        { id: 'd', text: 'NumPy converts code into quantum operations.' }
      ],
      correctAnswer: 'b',
      explanation: 'NumPy arrays are contiguous C-order memory buffers containing uniform C primitives. Operations execute in compiled C/Fortran routines with hardware SIMD (Single Instruction, Multiple Data) vector registers, avoiding Python\'s dynamic type inspection and pointer dereferencing on every element.',
      difficulty: 'Medium',
      targetBranches: ['aiml', 'ds']
    }
  ],
  ds: [
    {
      id: 'core-ds-sql-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'Data Science Core',
      subTopic: 'Advanced SQL & Analytics',
      title: 'Window Functions: RANK vs DENSE_RANK',
      question: 'In PostgreSQL / MySQL, what is the difference between RANK() and DENSE_RANK() when two rows share identical ordering values (e.g. tie for 1st place)?',
      options: [
        { id: 'a', text: 'RANK() assigns 1, 1, 3 (skips rank). DENSE_RANK() assigns 1, 1, 2 (no gaps).' },
        { id: 'b', text: 'DENSE_RANK() assigns 1, 1, 3. RANK() assigns 1, 1, 2.' },
        { id: 'c', text: 'RANK() can only be used with numbers; DENSE_RANK() can only be used with text.' },
        { id: 'd', text: 'There is no difference; they are aliases.' }
      ],
      correctAnswer: 'a',
      explanation: 'RANK() leaves gaps in the sequence after ties (e.g. 1, 1, 3). DENSE_RANK() always produces consecutive integers without gaps (e.g. 1, 1, 2, 3). For finding the Nth highest salary or top tier without skipping ranks, DENSE_RANK() is required.',
      difficulty: 'Easy',
      targetBranches: ['ds', 'cse', 'it']
    },
    {
      id: 'core-ds-stat-2',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'Data Science Core',
      subTopic: 'Applied Statistics',
      title: 'P-Value Interpretation in Hypothesis Testing',
      question: 'In an A/B test with significance level alpha = 0.05, a data scientist calculates p-value = 0.018. What is the rigorous scientific conclusion?',
      options: [
        { id: 'a', text: 'There is a 98.2% probability that variant B is better than variant A.' },
        { id: 'b', text: 'There is an 1.8% chance that the null hypothesis is true.' },
        { id: 'c', text: 'Assuming the null hypothesis of no difference is true, the probability of observing an effect as extreme as the sample data is 1.8%. Since p < 0.05, reject the null hypothesis.' },
        { id: 'd', text: 'The experiment failed and must be restarted.' }
      ],
      correctAnswer: 'c',
      explanation: 'A p-value is the probability of obtaining test results at least as extreme as the observed results, assuming that the null hypothesis is correct. It is NOT the probability that the null hypothesis is true. Since p (0.018) < alpha (0.05), we reject the null hypothesis with statistical significance.',
      difficulty: 'Medium',
      targetBranches: ['ds', 'aiml']
    }
  ],
  it: [
    {
      id: 'core-it-cloud-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'IT Core Subjects',
      subTopic: 'Cloud & Infrastructure',
      title: 'Cloud Service Models: IaaS vs PaaS vs SaaS',
      question: 'Under the Cloud Shared Responsibility Model, which deployment model requires the customer to manage the operating system, middleware, and runtime updates?',
      options: [
        { id: 'a', text: 'SaaS (Software as a Service)' },
        { id: 'b', text: 'PaaS (Platform as a Service)' },
        { id: 'c', text: 'IaaS (Infrastructure as a Service, such as AWS EC2)' },
        { id: 'd', text: 'FaaS (Function as a Service)' }
      ],
      correctAnswer: 'c',
      explanation: 'In IaaS (e.g., AWS EC2, GCP Compute Engine), the cloud provider manages physical hardware, virtualization, and networking facilities, while the customer is responsible for guest OS patching, middleware, firewalls, and application code.',
      difficulty: 'Easy',
      targetBranches: ['it', 'cse']
    }
  ],
  ece: [
    {
      id: 'core-ece-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'ECE Core Subjects',
      subTopic: 'Digital Electronics & VLSI',
      title: 'Setup Time and Hold Time in Sequential Logic',
      question: 'What is the definition of Setup Time (t_setup) in synchronous digital flip-flops?',
      options: [
        { id: 'a', text: 'The time required for output Q to switch states after clock edge.' },
        { id: 'b', text: 'The minimum time the input data signal must remain stable BEFORE the active clock edge arrives.' },
        { id: 'c', text: 'The minimum time the input data signal must remain stable AFTER the active clock edge arrives.' },
        { id: 'd', text: 'The total time a flip-flop takes to boot up.' }
      ],
      correctAnswer: 'b',
      explanation: 'Setup time is the minimum duration the data input must remain stable before the active clock edge to ensure reliable capturing. Hold time is the minimum duration data must remain stable after the clock edge. Violating either causes metastability.',
      difficulty: 'Medium',
      targetBranches: ['ece', 'eee']
    }
  ],
  eee: [
    {
      id: 'core-eee-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'Electrical Core Subjects',
      subTopic: 'Electrical Machines',
      title: 'Induction Motor Slip and Operating Modes',
      question: 'What is the slip (s) of a 3-phase induction motor running at synchronous speed (N_s), and what does slip represent?',
      options: [
        { id: 'a', text: 'Slip s = 0; no induced rotor voltage or torque is produced.' },
        { id: 'b', text: 'Slip s = 1; the motor operates at peak efficiency.' },
        { id: 'c', text: 'Slip s = infinity; the motor draws infinite reactive power.' },
        { id: 'd', text: 'Slip s = -1; the motor acts as a synchronous condenser.' }
      ],
      correctAnswer: 'a',
      explanation: 'Slip s = (N_s - N_r) / N_s. When rotor speed N_r equals synchronous speed N_s, slip is 0. With zero relative motion between rotating magnetic field and rotor conductors, no EMF is induced in rotor bars, generating zero electromagnetic torque.',
      difficulty: 'Medium',
      targetBranches: ['eee', 'ece']
    }
  ],
  mech: [
    {
      id: 'core-mech-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'Mechanical Core Subjects',
      subTopic: 'Thermodynamics & Heat Transfer',
      title: 'Carnot Thermal Efficiency and the Second Law',
      question: 'A heat engine operates between temperatures of 600 K (source) and 300 K (sink). What is the maximum theoretical thermal efficiency possible according to Carnot theorem?',
      options: [
        { id: 'a', text: '100%' },
        { id: 'b', text: '50% (eta = 1 - T_L / T_H)' },
        { id: 'c', text: '75%' },
        { id: 'd', text: '33.3%' }
      ],
      correctAnswer: 'b',
      explanation: 'Carnot efficiency eta_max = 1 - (T_sink / T_source) = 1 - (300 / 600) = 0.50 or 50%. No real heat engine operating between these two temperature limits can have higher efficiency without violating the Second Law of Thermodynamics (Kelvin-Planck statement).',
      difficulty: 'Easy',
      targetBranches: ['mech']
    }
  ],
  civil: [
    {
      id: 'core-civil-1',
      companyId: 'general',
      category: 'core_branch',
      categoryLabel: 'Civil Core Subjects',
      subTopic: 'Structural Engineering & RCC',
      title: 'Under-Reinforced vs Over-Reinforced Beam Design',
      question: 'In Limit State Design of reinforced concrete beams (IS 456 / ACI codes), why do structural engineering codes strictly mandate designing beams as under-reinforced sections?',
      options: [
        { id: 'a', text: 'To reduce the overall weight of concrete in the structure.' },
        { id: 'b', text: 'Because steel yields before concrete crushes, ensuring ductile failure with visible warning deflections and cracking before collapse.' },
        { id: 'c', text: 'Because under-reinforced beams have higher compressive strength than over-reinforced beams.' },
        { id: 'd', text: 'To save on construction formwork costs.' }
      ],
      correctAnswer: 'b',
      explanation: 'In under-reinforced beams, tensile reinforcement steel reaches yield strain before concrete reaches its ultimate crushing strain. This yields ductile failure: extensive cracks and large beam deflections provide occupants visual warning. Over-reinforced beams experience sudden, brittle explosive concrete crushing without warning.',
      difficulty: 'Medium',
      targetBranches: ['civil']
    }
  ]
};

export const TECHNICAL_INTERVIEW_QUESTIONS: CompanyPracticeQuestion[] = [
  {
    id: 'tech-int-1',
    companyId: 'general',
    category: 'tech_interview',
    categoryLabel: 'Technical Interview',
    subTopic: 'System Diagnostics & Performance',
    title: 'Identifying and Resolving Production Performance Bottlenecks',
    question: 'Interviewer Scenario: "A backend service in your project starts responding with 5-second latency spikes under peak load, while CPU utilization is only at 20%. How would you systematically diagnose and resolve the bottleneck?"',
    explanation: 'Ideal Structured Response:\n1. Metrics & Logs: Low CPU with high latency indicates I/O blocking or lock contention rather than compute saturation. Inspect APM distributed traces (e.g. database query latency, downstream API roundtrips).\n2. Database Profiling: Check for unindexed table scans (using EXPLAIN ANALYZE) and verify connection pool saturation. If all DB connections are busy waiting on locks, requests queue up.\n3. Thread & Concurrency Inspection: Take a thread dump to check for thread pool exhaustion, deadlocks, or synchronized locks waiting on shared memory.\n4. Remediation: Add optimal composite indexes, implement Redis caching for frequent read queries, and tune connection pool sizing with non-blocking async I/O.',
    difficulty: 'Medium'
  },
  {
    id: 'tech-int-2',
    companyId: 'general',
    category: 'tech_interview',
    categoryLabel: 'Technical Interview',
    subTopic: 'Web Systems & Protocols',
    title: 'What Happens When You Type a URL in a Browser and Hit Enter?',
    question: 'Interviewer Question: "Walk me through the exact technical journey from the moment you type https://www.google.com into your browser until the page renders pixels on your screen."',
    explanation: 'Step-by-Step Breakdown:\n1. DNS Resolution: Browser checks local cache -> OS hosts file -> Recursive DNS resolver -> Authoritative nameserver to resolve IP address.\n2. TCP 3-Way Handshake: Client sends SYN, server replies SYN-ACK, client replies ACK over port 443.\n3. TLS Handshake: Negotiate cipher suites, exchange certificates, verify public key authenticity, and establish symmetric session keys.\n4. HTTP GET Request: Client sends encrypted HTTP GET request with headers (User-Agent, Accept).\n5. Server Processing & Response: Reverse proxy (Nginx) routes to application server; server queries DB and returns HTML/JSON with HTTP 200.\n6. Client Rendering: Browser parses HTML to construct DOM tree, parses CSS to construct CSSOM tree, combines them into Render Tree, computes Layout (geometry), and Paints pixels to GPU screen buffer.',
    difficulty: 'Medium'
  },
  {
    id: 'tech-int-3',
    companyId: 'general',
    category: 'tech_interview',
    categoryLabel: 'Technical Interview',
    subTopic: 'Project Architecture Defense',
    title: 'Defending Your College Project Architecture and Trade-Offs',
    question: 'Interviewer Question: "Tell me about the most technically challenging bug or design tradeoff you faced in your primary academic project. Why did you choose your final approach over alternative solutions?"',
    explanation: 'Response Guide:\n- Structure with Situation, Problem, Options, Decision, Impact.\n- Example: In our real-time collaboration app, we needed to synchronize canvas drawings. Option A was HTTP polling (simple, but huge server load and 1s lag). Option B was WebSockets with JSON deltas (low latency, but connection drops required reconnection logic).\n- We chose WebSockets with a lightweight heartbeat protocol and client-side replay buffer for dropped packets. Under load testing with 50 concurrent tabs, latency dropped from 1,200ms to 42ms with zero packet loss.',
    difficulty: 'Medium'
  }
];

export const HR_INTERVIEW_QUESTIONS: CompanyPracticeQuestion[] = [
  {
    id: 'hr-1-intro',
    companyId: 'general',
    category: 'hr_interview',
    categoryLabel: 'HR Interview',
    subTopic: 'Tell Me About Yourself',
    title: 'Tell Me About Yourself (The 90-Second Professional Pitch)',
    question: 'Interviewer: "Walk me through your resume and tell me about yourself."',
    explanation: 'Use the Present-Past-Future Framework:\n1. Present (30s): "I am currently a pre-final/final year B.Tech student majoring in [Your Branch] at [Your College]. My core technical focus is on [e.g. scalable backend development, DSA, and database optimization]."\n2. Past & Projects (40s): "Over the past two years, I built [mention 1-2 major projects], where I solved [concrete challenge, e.g. multi-threaded job queue or real-time analytics]. I also maintain a consistent problem-solving habit, having solved 200+ DSA problems."\n3. Future & Company (20s): "I am passionate about this role at [Company] because of your work in [mention specific product or scale, e.g. cloud infrastructure or enterprise transformation], and I am eager to contribute my engineering discipline to your team."',
    difficulty: 'Easy',
    starGuide: {
      situation: 'First question in almost every campus placement and internship interview.',
      task: 'Provide a structured, enthusiastic, relevant pitch without reciting your entire high school resume.',
      action: 'Follow Present (current degree & core skills) -> Past (key projects & demonstrable achievements) -> Future (why this company).',
      result: 'Leaves a confident, professional first impression and guides the interviewer toward your strongest project topics.'
    }
  },
  {
    id: 'hr-2-why-company',
    companyId: 'general',
    category: 'hr_interview',
    categoryLabel: 'HR Interview',
    subTopic: 'Why Should We Hire You',
    title: 'Why Should We Hire You Over Other Candidates?',
    question: 'Interviewer: "There are dozens of qualified engineering students interviewing today. Why should we choose you?"',
    explanation: 'Highlight the Intersection of Competence, Learnability, and Work Ethic:\n- "You should hire me because I offer a strong foundation in [your core technical skills], proven by my hands-on projects, combined with high learnability and adaptability.\n- While many candidates understand syntax, I focus on system reliability, code cleanliness, and rigorous testing.\n- More importantly, I thrive in collaborative environments: in our college capstone, when our deadline was moved forward by 2 weeks, I coordinated sprint tasks and delivered our working module on time. I bring that same ownership to your team."',
    difficulty: 'Medium'
  },
  {
    id: 'hr-3-strengths-weakness',
    companyId: 'general',
    category: 'hr_interview',
    categoryLabel: 'HR Interview',
    subTopic: 'Strengths & Weaknesses',
    title: 'What Are Your Greatest Strengths and Genuine Weakness?',
    question: 'Interviewer: "What would you consider your biggest technical strength, and what is one genuine area of improvement you are actively working on?"',
    explanation: 'Strategic Framing:\n- Strength: Tie to engineering rigor. E.g., "My biggest strength is methodical root-cause debugging. When a bug occurs, instead of randomly changing lines of code, I isolate the failure with minimal reproductions, inspect logs, and test edge conditions."\n- Genuine Weakness + Action Plan: Pick a real skill you are improving, never a fake humblebrag. E.g., "Early on, I had a tendency to focus so heavily on polishing technical code that I hesitated to ask for feedback early. I recognized this in our 3rd semester project, so I adopted a practice of scheduling 15-minute syncs and publishing early Draft PRs to get mentor input before committing 40 hours of work. This has dramatically improved my velocity."',
    difficulty: 'Medium',
    starGuide: {
      situation: 'Interviewer testing self-awareness and honesty.',
      task: 'State a genuine technical/professional area for improvement without disqualifying yourself from the core job requirements.',
      action: 'Acknowledge the trait candidly and immediately present the concrete system or habit you adopted to remediate it.',
      result: 'Demonstrates maturity, growth mindset, and receptiveness to continuous feedback.'
    }
  },
  {
    id: 'hr-4-conflict',
    companyId: 'general',
    category: 'hr_interview',
    categoryLabel: 'HR Interview',
    subTopic: 'Teamwork & Conflict Resolution',
    title: 'Tell Me About a Team Conflict and How You Handled It',
    question: 'Interviewer: "Describe a situation where you had a major disagreement with a project partner or team member. How did you resolve it?"',
    explanation: 'Use the STAR Framework:\n- Situation: During our hackathon project, our teammate wanted to use a NoSQL database for financial ledger records, while I argued for PostgreSQL with ACID guarantees.\n- Task: We were 12 hours away from submission and needed to finalize the schema without creating team animosity.\n- Action: Instead of debating opinions, I built a 15-line benchmark script simulating 10 concurrent balance transfers. When the test ran, NoSQL produced inconsistent balances, whereas Postgres serialized correctly. I shared the results objectively without blaming anyone.\n- Result: The teammate agreed immediately, we delivered the app with zero ledger discrepancies, and we won 2nd place in the track. We remained close project partners afterwards.',
    difficulty: 'Medium',
    starGuide: {
      situation: 'Disagreement on database choice in a time-constrained hackathon.',
      task: 'Resolve the architecture decision objectively without creating personal conflict.',
      action: 'Wrote an objective benchmark script demonstrating concurrency failure rather than arguing opinions.',
      result: 'Team aligned smoothly, avoided catastrophic demo errors, and won an award.'
    }
  }
];

/**
 * Returns merged, deduplicated practice questions for a specific company and branch.
 */
export function getCompanyQuestionsForWorkspace(
  companyId: string,
  branchId: string,
  categoryFilter: string = 'all'
): CompanyPracticeQuestion[] {
  const result: CompanyPracticeQuestion[] = [];

  // 1. Coding & DSA Questions
  if (categoryFilter === 'all' || categoryFilter === 'coding') {
    result.push(...CODING_DSA_QUESTIONS);
  }

  // 2. Branch-specific Core Questions
  if (categoryFilter === 'all' || categoryFilter === 'core_branch') {
    const branchSpecific = BRANCH_CORE_QUESTIONS[branchId] || BRANCH_CORE_QUESTIONS['cse'] || [];
    result.push(...branchSpecific);
  }

  // 3. Technical Interview Questions
  if (categoryFilter === 'all' || categoryFilter === 'tech_interview') {
    result.push(...TECHNICAL_INTERVIEW_QUESTIONS);
  }

  // 4. HR Interview Questions
  if (categoryFilter === 'all' || categoryFilter === 'hr_interview') {
    result.push(...HR_INTERVIEW_QUESTIONS);
  }

  return result;
}
