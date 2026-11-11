import { Question } from '../../types';

export const CSE_QUESTIONS: Question[] = [
  // ================= PROGRAMMING =================
  {
    id: 'cse-prog-0',
    category: 'programming',
    categoryLabel: 'Core Programming & Object-Oriented Principles',
    type: 'multiple_choice',
    difficulty: 'beginner',
    title: 'Array Indexing vs Linked List Access Complexity',
    question: 'What is the time complexity of retrieving an element at a known index `arr[i]` in a contiguous array versus retrieving the i-th node in a singly linked list with N elements?',
    options: [
      {
        id: 'opt-a',
        text: 'Array: O(1) constant time; Linked List: O(N) linear time',
        explanation: 'Correct! Arrays provide instant direct memory addressing via base_address + index * element_size in O(1) time. Linked lists require sequential node pointer traversal from the head in O(N) time.'
      },
      {
        id: 'opt-b',
        text: 'Array: O(N); Linked List: O(1)',
        explanation: 'Incorrect: Linked lists do not support random access without pointer traversal.'
      },
      {
        id: 'opt-c',
        text: 'Both are O(1) constant time.',
        explanation: 'Incorrect: Linked list nodes are scattered across heap memory without contiguous indexing.'
      },
      {
        id: 'opt-d',
        text: 'Both are O(log N) logarithmic time.',
        explanation: 'Incorrect: Binary search achieves O(log N) on sorted arrays, but direct index lookup is O(1).'
      }
    ],
    correctOptionId: 'opt-a',
    points: 5,
    conceptTested: 'Random Access Memory Addressing & Linked List Traversal'
  },
  {
    id: 'cse-prog-1',
    category: 'programming',
    categoryLabel: 'Core Programming & Object-Oriented Principles',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Polymorphism & Dynamic Dispatch',
    question: 'In C++ / Java, consider a base class reference pointing to a derived class instance. When calling a method declared as virtual/overridden, which method executes and how is this resolved at runtime?',
    codeSnippet: `class Base {
    public void display() { System.out.println("Base"); }
}
class Derived extends Base {
    public void display() { System.out.println("Derived"); }
}
Base obj = new Derived();
obj.display();`,
    options: [
      {
        id: 'opt-a',
        text: 'Outputs "Base" because method resolution depends exclusively on the compile-time reference type.',
        explanation: 'Incorrect: Non-static overridden methods in Java use dynamic method dispatch (vtable).'
      },
      {
        id: 'opt-b',
        text: 'Outputs "Derived" because the JVM performs dynamic method dispatch using the virtual method table (vtable) of the runtime object.',
        explanation: 'Correct! Dynamic polymorphism resolves method execution using the vtable of the concrete runtime instance (Derived).'
      },
      {
        id: 'opt-c',
        text: 'Causes a compilation error because downcasting is required.',
        explanation: 'Incorrect: Assigning a Derived instance to a Base reference is valid upcasting.'
      },
      {
        id: 'opt-d',
        text: 'Throws a ClassCastException at runtime.',
        explanation: 'Incorrect: Upcasting is always safe and does not trigger ClassCastException.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Dynamic Method Dispatch & Polymorphism'
  },
  {
    id: 'cse-prog-2',
    category: 'programming',
    categoryLabel: 'Core Programming & Object-Oriented Principles',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Memory Management: Stack vs Heap',
    question: 'When a function allocates a dynamic object using `new` (in Java/C++) and returns, where does the object data reside and what happens to the local pointer/reference variable stored inside the function?',
    options: [
      {
        id: 'opt-a',
        text: 'Both the object and pointer are allocated on the Stack and automatically deallocated when the stack frame pops.',
        explanation: 'Incorrect: Dynamically allocated memory resides on the Heap, not the stack frame.'
      },
      {
        id: 'opt-b',
        text: 'The object resides on the Heap; the local reference variable on the Stack is popped, leaving the heap memory allocated until collected or manually freed.',
        explanation: 'Correct! Local variables live on the activation record (Stack), whereas dynamically instantiated objects live in Heap memory.'
      },
      {
        id: 'opt-c',
        text: 'The object is moved to CPU registers automatically.',
        explanation: 'Incorrect: Heap allocations are managed in system RAM, not CPU register files.'
      },
      {
        id: 'opt-d',
        text: 'In C++, the memory is automatically converted into a static variable.',
        explanation: 'Incorrect: Heap memory remains allocated until explicit delete, risking memory leaks.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Stack Frame vs Dynamic Heap Memory'
  },

  // ================= DSA =================
  {
    id: 'cse-dsa-1',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Cycle Detection in Linked Lists',
    question: 'Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare) uses two pointers moving at speeds of 1 node and 2 nodes per step. If a linked list with N nodes contains a loop of length K, what is the time and auxiliary space complexity to detect the cycle?',
    options: [
      {
        id: 'opt-a',
        text: 'Time Complexity: O(N), Space Complexity: O(1)',
        explanation: 'Correct! The fast pointer reduces distance by 1 node per iteration, catching the slow pointer in O(N) time with only two pointer variables O(1) auxiliary space.'
      },
      {
        id: 'opt-b',
        text: 'Time Complexity: O(N^2), Space Complexity: O(N)',
        explanation: 'Incorrect: Floyd\'s algorithm does not require nested loops or hash sets.'
      },
      {
        id: 'opt-c',
        text: 'Time Complexity: O(N log N), Space Complexity: O(log N)',
        explanation: 'Incorrect: Linked list traversal is linear without divide-and-conquer.'
      },
      {
        id: 'opt-d',
        text: 'Time Complexity: O(K), Space Complexity: O(K)',
        explanation: 'Incorrect: Traversal depends on both non-loop prefix length and loop size.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Floyd\'s Cycle-Finding Algorithm & Space-Time Tradeoffs'
  },
  {
    id: 'cse-dsa-2',
    category: 'dsa',
    categoryLabel: 'Data Structures & Algorithms',
    type: 'multiple_choice',
    difficulty: 'advanced',
    title: 'Balanced Binary Search Trees vs Hash Tables',
    question: 'Why would an engineer choose a self-balancing Binary Search Tree (like a Red-Black Tree or std::map) over a Hash Map (std::unordered_map) for a mission-critical latency-sensitive application?',
    options: [
      {
        id: 'opt-a',
        text: 'Hash tables cannot store strings as keys.',
        explanation: 'Incorrect: Hash maps routinely hash strings using algorithms like MurmurHash or SipHash.'
      },
      {
        id: 'opt-b',
        text: 'Red-Black Trees provide strict guaranteed O(log N) worst-case time for insertions/lookups and maintain sorted in-order traversal, avoiding Hash Table O(N) worst-case collision degradation.',
        explanation: 'Correct! Hash maps have O(1) average but O(N) worst-case under hash collisions and lack in-order range queries (e.g. upper_bound/lower_bound).'
      },
      {
        id: 'opt-c',
        text: 'Binary search trees require zero memory overhead.',
        explanation: 'Incorrect: BST nodes require left, right, and parent pointer overhead.'
      },
      {
        id: 'opt-d',
        text: 'Hash maps require rehashing on every single read operation.',
        explanation: 'Incorrect: Rehashing only happens during load-factor expansion on write.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Red-Black Trees vs Hash Maps & Worst-Case Guarantees'
  },

  // ================= DBMS =================
  {
    id: 'cse-dbms-1',
    category: 'dbms',
    categoryLabel: 'Database Management Systems',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'ACID Properties & Isolation Anomalies',
    question: 'A transaction reads a set of rows satisfying a condition. Another concurrent transaction inserts a new row satisfying the same condition and commits. The first transaction re-executes the query and sees the newly inserted row. What concurrency anomaly occurred, and what SQL isolation level prevents it?',
    options: [
      {
        id: 'opt-a',
        text: 'Dirty Read, prevented by Read Committed',
        explanation: 'Incorrect: Dirty reads involve reading uncommitted data.'
      },
      {
        id: 'opt-b',
        text: 'Non-Repeatable Read, prevented by Read Uncommitted',
        explanation: 'Incorrect: Non-repeatable read is when an existing row\'s values change between reads.'
      },
      {
        id: 'opt-c',
        text: 'Phantom Read, prevented by Serializable isolation level',
        explanation: 'Correct! Phantom reads occur when new rows appear in range queries. Serializable isolation (or range locks) prevents phantom reads.'
      },
      {
        id: 'opt-d',
        text: 'Lost Update, prevented by Chaos Isolation',
        explanation: 'Incorrect: Chaos isolation does not exist in standard SQL.'
      }
    ],
    correctOptionId: 'opt-c',
    points: 10,
    conceptTested: 'Transaction Isolation Levels & Phantom Reads'
  },
  {
    id: 'cse-dbms-2',
    category: 'dbms',
    categoryLabel: 'Database Management Systems',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Database Indexing: B+ Trees',
    question: 'Why do relational databases (MySQL InnoDB, PostgreSQL) predominantly implement indexes using B+ Trees rather than standard Binary Search Trees or B-Trees?',
    options: [
      {
        id: 'opt-a',
        text: 'B+ Trees store all actual record pointers in leaf nodes connected by a linked list, maximizing disk block fan-out and allowing ultra-fast sequential range scans.',
        explanation: 'Correct! Internal nodes only store keys (increasing fanout to 100s per page), and doubly-linked leaf nodes allow linear range scans without traversing parent nodes.'
      },
      {
        id: 'opt-b',
        text: 'B+ Trees have O(1) space complexity on disk.',
        explanation: 'Incorrect: B+ trees scale with data size O(N).'
      },
      {
        id: 'opt-c',
        text: 'Binary search trees are faster on disk drives than RAM.',
        explanation: 'Incorrect: Binary trees have height O(log2 N) causing high disk I/O seeks.'
      },
      {
        id: 'opt-d',
        text: 'B+ Trees cannot handle duplicate values.',
        explanation: 'Incorrect: B+ trees handle secondary duplicates with row identifier suffixes.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'B+ Tree Architecture & Range Scan Optimization'
  },

  // ================= OPERATING SYSTEMS =================
  {
    id: 'cse-os-1',
    category: 'os',
    categoryLabel: 'Operating Systems & Architecture',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Process Synchronization: Deadlocks',
    question: 'Which of the following describes the four Coffman conditions that must hold simultaneously for a deadlock to occur in an operating system?',
    options: [
      {
        id: 'opt-a',
        text: 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait',
        explanation: 'Correct! These are the 4 fundamental Coffman conditions required for resource deadlocks.'
      },
      {
        id: 'opt-b',
        text: 'Paging, Segmentation, Swapping, Thrashing',
        explanation: 'Incorrect: These are memory management concepts.'
      },
      {
        id: 'opt-c',
        text: 'First-Come First-Served, Round Robin, Priority, Shortest Job First',
        explanation: 'Incorrect: These are CPU scheduling algorithms.'
      },
      {
        id: 'opt-d',
        text: 'Kernel Mode, User Mode, Context Switch, Syscall',
        explanation: 'Incorrect: These are OS privilege and context switching mechanisms.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Coffman Deadlock Conditions'
  },
  {
    id: 'cse-os-2',
    category: 'os',
    categoryLabel: 'Operating Systems & Architecture',
    type: 'data_scenario',
    difficulty: 'advanced',
    title: 'Virtual Memory & Page Faults (Thrashing)',
    question: 'A server\'s CPU utilization suddenly drops to 3%, but disk I/O activity spikes to 100% capacity. What operating system condition is taking place, and how can the OS scheduler recover?',
    options: [
      {
        id: 'opt-a',
        text: 'The CPU scheduler entered an infinite loop; restart the kernel.',
        explanation: 'Incorrect: Low CPU with 100% disk activity indicates excessive page swapping, not an infinite CPU loop.'
      },
      {
        id: 'opt-b',
        text: 'Thrashing is occurring because the sum of working sets of active processes exceeds physical RAM; the OS must decrease the degree of multiprogramming by temporarily suspending processes.',
        explanation: 'Correct! Thrashing happens when processes spend more time paging than executing. Suspending processes frees frames for remaining working sets.'
      },
      {
        id: 'opt-c',
        text: 'A deadlock occurred in the thread pool; trigger SIGKILL on all threads.',
        explanation: 'Incorrect: Thrashing is a memory allocation issue, not a lock deadlock.'
      },
      {
        id: 'opt-d',
        text: 'Cache coherency failure in L1 instruction cache.',
        explanation: 'Incorrect: Disk I/O saturation points to secondary storage paging.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Virtual Memory Thrashing & Working Set Model'
  },

  // ================= COMPUTER NETWORKS =================
  {
    id: 'cse-cn-1',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Transport Layer: TCP vs UDP',
    question: 'How does TCP provide reliable byte-stream transfer compared to UDP, and what mechanism handles network buffer overflows on the receiver side?',
    options: [
      {
        id: 'opt-a',
        text: 'TCP uses Three-Way Handshake, Sequence Numbers, Cumulative ACKs, and a Sliding Window advertising flow control buffer size.',
        explanation: 'Correct! TCP uses sequence/ACK numbers for ordering and retransmission, while the TCP Window field enforces receiver flow control.'
      },
      {
        id: 'opt-b',
        text: 'TCP uses UDP packets with encrypted headers.',
        explanation: 'Incorrect: TCP is an independent transport protocol.'
      },
      {
        id: 'opt-c',
        text: 'TCP forces routers along the path to reserve physical circuit switches.',
        explanation: 'Incorrect: The Internet uses packet switching, not circuit switching.'
      },
      {
        id: 'opt-d',
        text: 'UDP guarantees packet delivery but cannot transmit media streams.',
        explanation: 'Incorrect: UDP is connectionless and does not guarantee delivery.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'TCP Reliability Mechanisms & Sliding Window Flow Control'
  },
  {
    id: 'cse-cn-2',
    category: 'cn',
    categoryLabel: 'Computer Networks',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'DNS & HTTP Request Flow',
    question: 'When a user enters `https://example.com` in their web browser, which protocol resolution occurs FIRST before any TCP connection can be established?',
    options: [
      {
        id: 'opt-a',
        text: 'TLS Handshake with the certificate authority',
        explanation: 'Incorrect: TLS requires an established TCP socket connection first.'
      },
      {
        id: 'opt-b',
        text: 'DNS (Domain Name System) query over UDP port 53 to resolve the hostname into an IP address',
        explanation: 'Correct! The browser must resolve the human-readable domain name to an IP address via DNS before opening a TCP connection.'
      },
      {
        id: 'opt-c',
        text: 'HTTP GET request on port 80',
        explanation: 'Incorrect: HTTP requests cannot be transmitted without a destination IP address.'
      },
      {
        id: 'opt-d',
        text: 'ARP broadcast across the entire Internet',
        explanation: 'Incorrect: ARP is local link layer only, not routable over WAN.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Network Protocol Hierarchy & DNS Resolution'
  }
];
