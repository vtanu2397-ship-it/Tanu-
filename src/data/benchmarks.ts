import { RoleBenchmark, SkillLevelName, MatchCalculationStep, CategoryScoreDetail, PriorityGap } from '../types';

export const SKILL_CATEGORIES: Record<string, { name: string; description: string; icon: string }> = {
  // CSE
  programming: {
    name: 'Core Programming & OOP',
    description: 'Object-Oriented Programming, Polymorphism, Memory allocation (Stack/Heap), and clean modular code.',
    icon: 'Code2'
  },
  dsa: {
    name: 'Data Structures & Algorithms',
    description: 'Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, and Time-Space Complexity.',
    icon: 'Binary'
  },
  dbms: {
    name: 'Database Management Systems',
    description: 'Relational algebra, ACID properties, Transaction Isolation, B+ Tree indexing, and Normalization.',
    icon: 'Database'
  },
  os: {
    name: 'Operating Systems & Architecture',
    description: 'Process synchronization, Deadlocks, CPU scheduling, Virtual memory, Paging, and Thrashing.',
    icon: 'Terminal'
  },
  cn: {
    name: 'Computer Networks',
    description: 'OSI / TCP-IP models, Sliding Window flow control, DNS, Routing protocols, and HTTP/TLS.',
    icon: 'Network'
  },

  // AI & ML
  python: {
    name: 'Python & Numerical Computing',
    description: 'NumPy vectorized broadcasting, Pandas, PyTorch autograd, and scientific computing.',
    icon: 'FileCode2'
  },
  ai_foundations: {
    name: 'Artificial Intelligence Foundations',
    description: 'Search algorithms (A*, Heuristics), Minimax, Alpha-Beta pruning, and Knowledge Representation.',
    icon: 'Brain'
  },
  machine_learning: {
    name: 'Machine Learning',
    description: 'Supervised/Unsupervised learning, Bias-Variance tradeoff, Regularization (L1/L2), and Evaluation metrics.',
    icon: 'BrainCircuit'
  },
  deep_learning: {
    name: 'Deep Learning & Neural Architectures',
    description: 'Backpropagation, Vanishing Gradients, CNNs, Transformers, and Scaled Dot-Product Attention.',
    icon: 'Sparkles'
  },

  // Data Science & Analytics
  sql: {
    name: 'SQL & Relational Databases',
    description: 'Complex multi-table JOINs, Aggregations, Subqueries, CTEs, and Window Functions (RANK, LAG/LEAD).',
    icon: 'Database'
  },
  statistics: {
    name: 'Applied Statistics & Probability',
    description: 'Hypothesis testing, A/B experiments, Central Limit Theorem, P-values, and skewed distributions.',
    icon: 'BarChart2'
  },
  data_analysis: {
    name: 'Data Analysis & EDA',
    description: 'Exploratory data analysis, outlier triage (IQR/Z-Score), feature engineering, and data cleaning.',
    icon: 'LineChart'
  },
  excel: {
    name: 'Advanced Excel & Spreadsheets',
    description: 'XLOOKUP, PowerQuery, Pivot Tables, Distinct Count aggregations, and business models.',
    icon: 'Sheet'
  },
  data_viz: {
    name: 'Data Visualization & BI',
    description: 'Chart ergonomics, dashboard communication, continuous distributions, and avoiding misleading axes.',
    icon: 'PieChart'
  },
  project_exp: {
    name: 'Applied Projects & Problem Solving',
    description: 'Investigating real-world data anomalies, root-cause triage, and stakeholder communication.',
    icon: 'Lightbulb'
  },

  // Universal Placement Aptitude
  aptitude: {
    name: 'Aptitude & Logical Reasoning',
    description: 'Quantitative aptitude, work-time-speed, probability, permutation, syllogisms, and deductive reasoning.',
    icon: 'Brain'
  },

  // IT
  networking: {
    name: 'Enterprise Networking',
    description: 'Subnetting, CIDR prefix masks, routing tables, DNS, DHCP, and firewall rule configurations.',
    icon: 'Network'
  },
  cloud_computing: {
    name: 'Cloud Computing & Infrastructure',
    description: 'IaaS/PaaS/SaaS Shared Responsibility, AWS/GCP architecture, Docker containers, and microservices.',
    icon: 'Cloud'
  },
  cybersecurity: {
    name: 'Cybersecurity & Defense',
    description: 'Asymmetric cryptography, TLS handshakes, digital signatures, SQL injection, and OWASP Top 10.',
    icon: 'ShieldCheck'
  },

  // ECE
  digital_electronics: {
    name: 'Digital Electronics & HDL',
    description: 'Setup and Hold timing, metastability, combinational/sequential logic, and Verilog HDL assignments.',
    icon: 'Cpu'
  },
  vlsi: {
    name: 'VLSI Design & Timing',
    description: 'CMOS inverter dynamics, dynamic power dissipation, Static Timing Analysis (STA), and clock skew.',
    icon: 'Layers'
  },
  embedded_systems: {
    name: 'Embedded Systems & Microcontrollers',
    description: 'ARM Cortex/AVR architectures, I2C/SPI buses, Interrupt Service Routines, and volatile qualifiers.',
    icon: 'HardDrive'
  },

  // Electrical (EEE)
  electrical_machines: {
    name: 'Electrical Machines & Transformers',
    description: 'Transformer core eddy current laminations, induction motor slip, torque curves, and synchronous machines.',
    icon: 'Zap'
  },
  power_systems: {
    name: 'Power Systems Engineering',
    description: 'Ferranti effect, shunt reactor compensation, transmission lines, and symmetrical SLG fault analysis.',
    icon: 'Activity'
  },
  control_systems: {
    name: 'Control Systems Engineering',
    description: 'Routh-Hurwitz stability, s-plane poles, Nyquist/Bode plots, and PID feedback tuning.',
    icon: 'Sliders'
  },

  // Mechanical
  thermodynamics: {
    name: 'Applied Thermodynamics',
    description: 'Carnot thermal efficiency, Second Law, Rankine power plant steam cycles, and Brayton gas turbines.',
    icon: 'Flame'
  },
  manufacturing: {
    name: 'Manufacturing & Machining',
    description: 'Merchant circle cutting shear angle, orthogonal machining, and Chvorinov casting solidification modulus.',
    icon: 'Wrench'
  },
  cad_cam: {
    name: 'CAD/CAM & CNC Technology',
    description: 'G-Code/M-Code CNC interpolation, CSG solid primitives, and B-Rep boundary topological modeling.',
    icon: 'Compass'
  },

  // Civil
  structural_eng: {
    name: 'Structural Engineering & RCC',
    description: 'Ductile under-reinforced beam design, concrete crushing limit states, and shear-moment differentials.',
    icon: 'Building'
  },
  surveying: {
    name: 'Geomatics & Advanced Surveying',
    description: 'Electronic Total Station EDM principles, atmospheric refraction corrections, and Bowditch balancing.',
    icon: 'MapPin'
  },
  construction_tech: {
    name: 'Construction Technology & CPM',
    description: 'Critical Path Method (CPM), total float schedule buffers, and Portland cement hydration curing kinetics.',
    icon: 'HardHat'
  }
};

export const ROLE_BENCHMARKS: Record<string, RoleBenchmark> = {
  // CSE
  'cse-sde': {
    id: 'cse-sde',
    title: 'Software Development Engineer (SDE)',
    branchId: 'cse',
    branchName: 'Computer Science & Engineering',
    industry: 'Product Software & Tech Infrastructure',
    description: 'Builds scalable software systems, writes robust data structure algorithms, designs relational databases, and understands OS thread/memory architecture.',
    isPrimary: true,
    commonTitles: ['Graduate SDE', 'Junior Software Engineer', 'Full Stack Developer', 'Backend Engineer'],
    skills: {
      dsa: {
        requiredLevel: 4,
        levelName: 'Advanced',
        weight: 25,
        targetScore: 80,
        rationale: 'Core foundation for campus placement technical screening tests and algorithmic interviews.'
      },
      programming: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Clean object-oriented code, memory hygiene, dynamic dispatch, and design patterns.'
      },
      dbms: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 70,
        rationale: 'Relational data modeling, ACID transactions, and index query optimization.'
      },
      os: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 70,
        rationale: 'Concurrency, multi-threading, virtual memory, and process synchronization.'
      },
      cn: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 10,
        targetScore: 65,
        rationale: 'TCP/IP socket communication, HTTP/TLS, and client-server protocols.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Speed-distance, time-work, probability, and logical reasoning for campus placements.'
      }
    }
  },

  // AI & ML
  'aiml-engineer': {
    id: 'aiml-engineer',
    title: 'AI / Machine Learning Engineer',
    branchId: 'aiml',
    branchName: 'Artificial Intelligence & Machine Learning',
    industry: 'Applied AI & Intelligent Systems',
    description: 'Develops machine learning models, neural network architectures, computer vision and NLP systems, and optimizes inference pipelines.',
    isPrimary: true,
    commonTitles: ['AI Engineer', 'Machine Learning Engineer', 'Applied Scientist Intern', 'NLP Engineer'],
    skills: {
      machine_learning: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 25,
        targetScore: 75,
        rationale: 'Core algorithms, regularized loss functions, cross-validation, and metrics.'
      },
      deep_learning: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Backpropagation, Transformer attention, CNNs, and activation dynamics.'
      },
      ai_foundations: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 70,
        rationale: 'Heuristic search algorithms, Minimax game trees, and optimization.'
      },
      python: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Vectorized NumPy broadcasting and PyTorch autograd tensor pipelines.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Logical deduction, quantitative problem solving, and analytical ability.'
      }
    }
  },

  // Data Science
  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    branchId: 'ds',
    branchName: 'Data Science & Analytics',
    industry: 'Statistical Modeling & Enterprise Data',
    description: 'Discovers quantitative trends, formulates hypothesis experiments, develops predictive ML ensembles, and wrangles complex datasets.',
    isPrimary: true,
    commonTitles: ['Junior Data Scientist', 'Predictive Modeler', 'Quantitative Analyst'],
    skills: {
      statistics: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Experimental A/B testing, sampling distributions, and Central Limit Theorem.'
      },
      machine_learning: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Supervised predictive ensembles (Gradient Boosting, Random Forests).'
      },
      python: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Pandas data wrangling, method chaining, and feature pipelines.'
      },
      sql: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 70,
        rationale: 'Complex queries, cohort analysis, and analytical window functions.'
      },
      data_analysis: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 70,
        rationale: 'Exploratory data analysis, robust outlier detection (IQR vs Z-score).'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Probability calculations, permutations, and logical deduction for placements.'
      }
    }
  },

  // Data Analyst & BI (Preserved & expanded)
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst & BI Specialist',
    branchId: 'ds',
    branchName: 'Data Science & Analytics',
    industry: 'Business Intelligence & Product Analytics',
    description: 'Transforms raw operational and product data into actionable insights for business stakeholders through SQL queries, dashboards, and exploratory data analysis.',
    commonTitles: ['Junior Data Analyst', 'Analytics Specialist', 'Product Analytics Intern'],
    skills: {
      sql: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Primary daily tool for pulling metrics, writing CTEs, and cohort retention queries.'
      },
      python: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 15,
        targetScore: 65,
        rationale: 'Used for tabular data manipulation with Pandas and automating repetitive workflows.'
      },
      statistics: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 15,
        targetScore: 65,
        rationale: 'Vital for interpreting A/B experiments without misinterpreting random noise.'
      },
      excel: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Essential for rapid stakeholder ad-hoc sharing and financial modeling.'
      },
      data_viz: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Communicates insights clearly without misleading axes or clutter.'
      },
      project_exp: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 10,
        targetScore: 60,
        rationale: 'Demonstrates ability to handle imperfect, real-world data and document hypotheses.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 10,
        targetScore: 75,
        rationale: 'Data interpretation, percentages, ratios, and quantitative problem solving.'
      }
    }
  },
  'data-analyst-intern': {
    id: 'data-analyst-intern',
    title: 'Data Analyst Intern',
    branchId: 'ds',
    branchName: 'Data Science & Analytics',
    industry: 'Technology & Enterprise Analytics',
    description: 'Transforms raw operational and product data into actionable insights for business stakeholders through SQL queries, dashboards, and exploratory data analysis.',
    commonTitles: ['Junior Data Analyst', 'Analytics Intern', 'Product Analytics Intern'],
    skills: {
      sql: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Primary daily tool for pulling metrics, writing CTEs, and cohort retention queries.'
      },
      python: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 15,
        targetScore: 65,
        rationale: 'Used for tabular data manipulation with Pandas and automating repetitive workflows.'
      },
      statistics: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 15,
        targetScore: 65,
        rationale: 'Vital for interpreting A/B experiments without misinterpreting random noise.'
      },
      excel: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Essential for rapid stakeholder ad-hoc sharing and financial modeling.'
      },
      data_viz: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Communicates insights clearly without misleading axes or clutter.'
      },
      project_exp: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 10,
        targetScore: 60,
        rationale: 'Demonstrates ability to handle imperfect, real-world data and document hypotheses.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 10,
        targetScore: 75,
        rationale: 'Data interpretation, percentages, ratios, and quantitative problem solving.'
      }
    }
  },

  // IT
  'it-cloud-devops': {
    id: 'it-cloud-devops',
    title: 'Cloud & DevOps / Systems Engineer',
    branchId: 'it',
    branchName: 'Information Technology',
    industry: 'Enterprise Cloud & Cybersecurity',
    description: 'Administers cloud infrastructure, containerized deployments, enterprise networks, automated shell scripts, and zero-trust security.',
    isPrimary: true,
    commonTitles: ['Cloud Engineer', 'DevOps Engineer', 'IT Systems Specialist', 'Infrastructure Associate'],
    skills: {
      cloud_computing: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 25,
        targetScore: 75,
        rationale: 'IaaS/PaaS architecture, containerization with Docker, and cloud deployments.'
      },
      networking: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 75,
        rationale: 'Subnetting, CIDR addressing, DNS, and enterprise firewall routing.'
      },
      cybersecurity: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 20,
        targetScore: 70,
        rationale: 'Public key cryptography, TLS digital certificates, and injection vulnerability defense.'
      },
      programming: {
        requiredLevel: 2,
        levelName: 'Developing',
        weight: 20,
        targetScore: 65,
        rationale: 'Bash shell scripting and task automation.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Logical deduction, quantitative speed-time-work, and reasoning tests.'
      }
    }
  },

  // ECE
  'ece-embedded-vlsi': {
    id: 'ece-embedded-vlsi',
    title: 'Embedded Systems & VLSI Engineer',
    branchId: 'ece',
    branchName: 'Electronics & Communication',
    industry: 'Semiconductor & Embedded Electronics',
    description: 'Designs digital and mixed-signal electronic circuits, writes Verilog HDL, optimizes ASIC timing/power, and programs microcontrollers.',
    isPrimary: true,
    commonTitles: ['VLSI Design Engineer', 'Embedded Firmware Engineer', 'Hardware Design Associate'],
    skills: {
      digital_electronics: {
        requiredLevel: 4,
        levelName: 'Advanced',
        weight: 30,
        targetScore: 80,
        rationale: 'Flip-flop setup/hold times, metastability, and Verilog non-blocking semantics.'
      },
      vlsi: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 30,
        targetScore: 75,
        rationale: 'CMOS dynamic power dissipation, Static Timing Analysis (STA), and clock skew.'
      },
      embedded_systems: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 25,
        targetScore: 75,
        rationale: 'I2C/SPI serial buses, interrupt service routines, and volatile qualifier safety.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Core problem solving, speed-distance-time, probability, and logical deduction.'
      }
    }
  },

  // EEE
  'eee-core': {
    id: 'eee-core',
    title: 'Electrical & Power Systems Engineer',
    branchId: 'eee',
    branchName: 'Electrical & Electronics',
    industry: 'Power Generation & Energy Infrastructure',
    description: 'Analyzes electrical machines, high-voltage transmission networks, unsymmetrical fault dynamics, and industrial feedback control loops.',
    isPrimary: true,
    commonTitles: ['Electrical Engineer', 'Power Systems Engineer', 'Grid Operations Analyst'],
    skills: {
      electrical_machines: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 30,
        targetScore: 75,
        rationale: 'Transformer core lamination physics and induction motor slip-torque relations.'
      },
      power_systems: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 30,
        targetScore: 75,
        rationale: 'Ferranti effect line compensation and symmetrical components SLG fault analysis.'
      },
      control_systems: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 25,
        targetScore: 70,
        rationale: 'Routh-Hurwitz stability criterion and PID controller tuning.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Quantitative aptitude, work-efficiency, percentages, and logical reasoning.'
      }
    }
  },

  // Mechanical
  'mech-design-mfg': {
    id: 'mech-design-mfg',
    title: 'Mechanical Design & Manufacturing Engineer',
    branchId: 'mech',
    branchName: 'Mechanical Engineering',
    industry: 'Automotive, Aerospace & Manufacturing',
    description: 'Designs thermal power systems, models cutting and casting mechanics, generates CNC tool paths, and utilizes 3D CAD modeling software.',
    isPrimary: true,
    commonTitles: ['Mechanical Design Engineer', 'Manufacturing Trainee', 'Production Engineer'],
    skills: {
      thermodynamics: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 30,
        targetScore: 75,
        rationale: 'Carnot and Rankine power cycles, heat transfer, and back-work ratios.'
      },
      manufacturing: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 30,
        targetScore: 75,
        rationale: 'Merchant circle machining kinematics and Chvorinov casting solidification.'
      },
      cad_cam: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 25,
        targetScore: 70,
        rationale: 'CNC G-Code motion primitives and CSG vs B-Rep solid modeling.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Spatial aptitude, speed-distance-time, probability, and deduction logic.'
      }
    }
  },

  // Civil
  'civil-structural': {
    id: 'civil-structural',
    title: 'Structural & Construction Engineer',
    branchId: 'civil',
    branchName: 'Civil Engineering',
    industry: 'Infrastructure, Structural & Project Engineering',
    description: 'Analyzes RCC limit-state flexural members, conducts Total Station geomatics, balances traverses, and manages CPM project schedules.',
    isPrimary: true,
    commonTitles: ['Structural Engineer', 'Site Engineer', 'Project Planning Engineer'],
    skills: {
      structural_eng: {
        requiredLevel: 4,
        levelName: 'Advanced',
        weight: 30,
        targetScore: 80,
        rationale: 'Under-reinforced ductile beam mechanics and shear-moment differential equations.'
      },
      surveying: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 30,
        targetScore: 75,
        rationale: 'Total Station EDM optical measurements and Bowditch traverse balancing.'
      },
      construction_tech: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 25,
        targetScore: 70,
        rationale: 'Critical Path Method (CPM) total float and cement hydration kinetics.'
      },
      aptitude: {
        requiredLevel: 3,
        levelName: 'Proficient',
        weight: 15,
        targetScore: 75,
        rationale: 'Mathematical ratios, percentages, time-work, and logical deduction for placements.'
      }
    }
  }
};

export const LEVEL_DEFINITIONS: Record<number, { name: SkillLevelName; range: string; description: string }> = {
  1: {
    name: 'Novice',
    range: '0% – 39%',
    description: 'Familiar with basic vocabulary and simple syntax; requires guidance on real tasks.'
  },
  2: {
    name: 'Developing',
    range: '40% – 69%',
    description: 'Understands core patterns and can solve common problems with occasional reference docs.'
  },
  3: {
    name: 'Proficient',
    range: '70% – 89%',
    description: 'Can solve standard placement tasks autonomously and debug edge cases systematically.'
  },
  4: {
    name: 'Advanced',
    range: '90% – 100%',
    description: 'Demonstrates deep idiomatic mastery, optimization awareness, and teaches concepts to others.'
  }
};

export function scoreToLevel(score: number): { levelNum: number; levelName: SkillLevelName } {
  if (score >= 90) return { levelNum: 4, levelName: 'Advanced' };
  if (score >= 70) return { levelNum: 3, levelName: 'Proficient' };
  if (score >= 40) return { levelNum: 2, levelName: 'Developing' };
  return { levelNum: 1, levelName: 'Novice' };
}

/**
 * Transparent calculation of the skill-match score across any technical track:
 * Match Score = Sum_i [ Weight_i * Min(1.0, StudentScore_i / TargetScore_i) ]
 */
export function calculateSkillMatch(
  studentScores: Record<string, CategoryScoreDetail>,
  benchmark: RoleBenchmark
): {
  overallScore: number;
  steps: MatchCalculationStep[];
  strengths: string[];
  priorityGaps: PriorityGap[];
} {
  const steps: MatchCalculationStep[] = [];
  let totalWeightedScore = 0;
  const strengths: string[] = [];
  const priorityGaps: PriorityGap[] = [];

  for (const [skillKey, req] of Object.entries(benchmark.skills)) {
    const student = studentScores[skillKey] || { score: 0, level: 'Novice', levelNum: 1 };
    const ratio = Math.min(1.0, student.score / req.targetScore);
    const contribution = Math.round(req.weight * ratio * 10) / 10;
    totalWeightedScore += contribution;

    const skillMeta = SKILL_CATEGORIES[skillKey] || { name: skillKey.replace(/_/g, ' ').toUpperCase() };

    steps.push({
      skill: skillMeta.name,
      weight: req.weight,
      studentScore: student.score,
      targetScore: req.targetScore,
      ratio: Math.round(ratio * 100),
      contribution
    });

    if (student.score >= req.targetScore) {
      strengths.push(`${skillMeta.name} (${student.score}% vs required ${req.targetScore}%)`);
    } else {
      const gapPoints = req.targetScore - student.score;
      const importance: 'Critical' | 'High' | 'Medium' = 
        req.weight >= 25 ? 'Critical' : req.weight >= 15 ? 'High' : 'Medium';

      let recommendation = `Target: ${req.targetScore}%. Focus on fundamental exercises in ${skillMeta.name}.`;

      // Branch-aware tailored recommendations
      if (skillKey === 'dsa') recommendation = 'Practice linked lists, two-pointer arrays, binary search trees, and dynamic programming on LeetCode/HackerRank.';
      else if (skillKey === 'programming') recommendation = 'Review dynamic dispatch, stack vs heap allocation, and design patterns.';
      else if (skillKey === 'dbms') recommendation = 'Practice SQL isolation levels, B+ Tree indexing, and normalization forms.';
      else if (skillKey === 'os') recommendation = 'Review deadlock Coffman conditions, paging/thrashing mechanics, and thread synchronization.';
      else if (skillKey === 'cn') recommendation = 'Study TCP 3-way handshakes, sliding window flow control, and DNS resolution.';
      else if (skillKey === 'machine_learning') recommendation = 'Practice L1 vs L2 regularization, confusion matrix thresholds, and bias-variance tradeoff.';
      else if (skillKey === 'deep_learning') recommendation = 'Review backpropagation chain rule, vanishing gradient mitigation with ReLU, and scaled dot-product attention.';
      else if (skillKey === 'ai_foundations') recommendation = 'Study admissible A* heuristics and Alpha-Beta pruning in adversarial search trees.';
      else if (skillKey === 'cloud_computing') recommendation = 'Review the PaaS/IaaS Shared Responsibility model, Docker cgroups/namespaces, and cloud networking.';
      else if (skillKey === 'cybersecurity') recommendation = 'Practice asymmetric key signing vs encryption, and sanitize user input with prepared statements.';
      else if (skillKey === 'digital_electronics') recommendation = 'Review setup and hold timing margins in flip-flops and Verilog non-blocking assignments.';
      else if (skillKey === 'vlsi') recommendation = 'Study CMOS dynamic power dissipation formulas and Static Timing Analysis clock skew.';
      else if (skillKey === 'embedded_systems') recommendation = 'Compare I2C vs SPI protocols and practice using volatile qualifiers in microcontrollers.';
      else if (skillKey === 'electrical_machines') recommendation = 'Review transformer core lamination to minimize eddy current loss, and induction motor slip curves.';
      else if (skillKey === 'power_systems') recommendation = 'Study the Ferranti effect on lightly loaded transmission lines and symmetrical fault analysis.';
      else if (skillKey === 'control_systems') recommendation = 'Practice Routh-Hurwitz stability arrays and PID controller integral windup tuning.';
      else if (skillKey === 'thermodynamics') recommendation = 'Review Carnot thermal efficiency limits and the Rankine vs Brayton cycle back-work ratio.';
      else if (skillKey === 'manufacturing') recommendation = 'Study Merchant circle shear plane angle calculations and Chvorinov casting modulus.';
      else if (skillKey === 'cad_cam') recommendation = 'Practice CNC G-Code motion primitives (G00, G01, G02, G03) and CSG vs B-Rep solid modeling.';
      else if (skillKey === 'structural_eng') recommendation = 'Study under-reinforced RCC beam ductility and shear-moment differential equations.';
      else if (skillKey === 'surveying') recommendation = 'Review Total Station EDM optical principles and Bowditch traverse closing error distribution.';
      else if (skillKey === 'construction_tech') recommendation = 'Practice CPM total float calculation and study cement hydration kinetics.';
      else if (skillKey === 'sql') recommendation = 'Practice window functions (RANK, ROW_NUMBER) and multi-table NULL-safe JOINs.';
      else if (skillKey === 'python') recommendation = 'Work on vectorization with Pandas groupby, fillna, and chained boolean filters.';
      else if (skillKey === 'statistics') recommendation = 'Review p-value thresholds in A/B testing and Central Limit Theorem sampling distributions.';
      else if (skillKey === 'excel') recommendation = 'Practice XLOOKUP nested lookups and Pivot Table distinct counts.';
      else if (skillKey === 'data_viz') recommendation = 'Study chart ergonomics: avoid truncated zero-lines and choose scatter/box plots for distributions.';
      else if (skillKey === 'project_exp') recommendation = 'Practice framing anomalies into structured hypotheses with verification checks.';
      else if (skillKey === 'aptitude') recommendation = 'Practice speed-time-distance, work-time formulas, permutations, probability, and syllogism deduction.';

      priorityGaps.push({
        skill: skillKey,
        skillName: skillMeta.name,
        studentScore: student.score,
        targetScore: req.targetScore,
        gapPoints,
        importance,
        recommendation
      });
    }
  }

  // Sort priority gaps by importance weight & gap magnitude
  priorityGaps.sort((a, b) => {
    const impMap = { Critical: 3, High: 2, Medium: 1 };
    const diff = impMap[b.importance] - impMap[a.importance];
    return diff !== 0 ? diff : b.gapPoints - a.gapPoints;
  });

  return {
    overallScore: Math.round(totalWeightedScore),
    steps,
    strengths,
    priorityGaps
  };
}
