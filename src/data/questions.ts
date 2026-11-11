import { Question, BranchDefinition } from '../types';
import { DATA_ANALYST_QUESTIONS } from './questionBanks/dataAnalyst';
import { CSE_QUESTIONS } from './questionBanks/cse';
import { AIML_QUESTIONS } from './questionBanks/aiml';
import { DATA_SCIENCE_QUESTIONS } from './questionBanks/dataScience';
import { IT_QUESTIONS } from './questionBanks/it';
import { ECE_QUESTIONS } from './questionBanks/ece';
import { EEE_QUESTIONS } from './questionBanks/eee';
import { MECH_QUESTIONS } from './questionBanks/mech';
import { CIVIL_QUESTIONS } from './questionBanks/civil';
import { UNIVERSAL_APTITUDE_QUESTIONS } from './questionBanks/aptitude';

// Re-export original for backward compatibility
export { DATA_ANALYST_QUESTIONS, UNIVERSAL_APTITUDE_QUESTIONS };

export const BRANCH_DEFINITIONS: BranchDefinition[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    icon: 'Code2',
    description: 'Software Engineering, Algorithms, Operating Systems, Database Internals, and Computer Networks.',
    tracks: [
      {
        id: 'cse-sde',
        title: 'Software Development Engineer (SDE)',
        description: 'Covers Object-Oriented Programming, DSA (Arrays, Trees, Graphs), DBMS, OS, Networks, and Quantitative Aptitude.',
        categories: ['programming', 'dsa', 'dbms', 'os', 'cn', 'aptitude']
      }
    ]
  },
  {
    id: 'aiml',
    name: 'Artificial Intelligence & Machine Learning',
    shortName: 'AI & ML',
    icon: 'BrainCircuit',
    description: 'Mathematical foundations of AI, Machine Learning algorithms, Deep Neural Networks, Python scientific stack, and Aptitude.',
    tracks: [
      {
        id: 'aiml-engineer',
        title: 'AI / Machine Learning Engineer',
        description: 'NumPy/PyTorch vectorization, Search & Heuristics, Bias-Variance tuning, Transformer Deep Learning, and Logical Reasoning.',
        categories: ['python', 'ai_foundations', 'machine_learning', 'deep_learning', 'aptitude']
      }
    ]
  },
  {
    id: 'ds',
    name: 'Data Science & Analytics',
    shortName: 'Data Science',
    icon: 'LineChart',
    description: 'Statistical inference, exploratory data analysis, business intelligence, predictive modeling, SQL, and Placement Aptitude.',
    tracks: [
      {
        id: 'data-scientist',
        title: 'Data Scientist',
        description: 'Statistical hypothesis testing, Pandas pipeline wrangling, predictive ensembles (XGBoost), advanced SQL, and Aptitude.',
        categories: ['python', 'sql', 'statistics', 'data_analysis', 'machine_learning', 'aptitude']
      },
      {
        id: 'data-analyst',
        title: 'Data Analyst & BI Specialist',
        description: 'Relational SQL queries, business metrics, Excel models, data visualization, and Aptitude problem solving.',
        categories: ['sql', 'python', 'statistics', 'excel', 'data_viz', 'project_exp', 'aptitude']
      }
    ]
  },
  {
    id: 'it',
    name: 'Information Technology',
    shortName: 'IT',
    icon: 'Server',
    description: 'Enterprise networking, cloud infrastructure, containerization, scripting automation, cybersecurity, and Quantitative Aptitude.',
    tracks: [
      {
        id: 'it-cloud-devops',
        title: 'Cloud & DevOps / Systems Engineer',
        description: 'Shell scripting, IPv4 CIDR subnetting, PaaS/IaaS cloud architecture, Docker, asymmetric cryptography, and Aptitude.',
        categories: ['programming', 'networking', 'cloud_computing', 'cybersecurity', 'aptitude']
      }
    ]
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    shortName: 'ECE',
    icon: 'Cpu',
    description: 'Digital logic design, Verilog HDL, Static Timing Analysis, VLSI power optimization, embedded microcontrollers, and Aptitude.',
    tracks: [
      {
        id: 'ece-embedded-vlsi',
        title: 'Embedded Systems & VLSI Engineer',
        description: 'Setup/Hold timing, Verilog non-blocking assignments, CMOS power, I2C/SPI buses, ISR programming, and Logical Deduction.',
        categories: ['digital_electronics', 'vlsi', 'embedded_systems', 'aptitude']
      }
    ]
  },
  {
    id: 'eee',
    name: 'Electrical & Electronics',
    shortName: 'Electrical',
    icon: 'Zap',
    description: 'Transformers and AC rotating machines, transmission grid dynamics, fault analysis, feedback control theory, and Aptitude.',
    tracks: [
      {
        id: 'eee-core',
        title: 'Electrical & Power Systems Engineer',
        description: 'Transformer eddy losses, induction motor slip, Ferranti compensation, SLG fault networks, PID control, and Aptitude.',
        categories: ['electrical_machines', 'power_systems', 'control_systems', 'aptitude']
      }
    ]
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    shortName: 'Mechanical',
    icon: 'Wrench',
    description: 'Applied thermodynamics, power cycles, metal cutting kinematics, casting solidification, CNC CAD/CAM, and Logical Reasoning.',
    tracks: [
      {
        id: 'mech-design-mfg',
        title: 'Mechanical Design & Manufacturing Engineer',
        description: 'Carnot & Rankine cycles, Merchant metal shear angle, Chvorinov casting modulus, CNC G-code, and Quantitative Aptitude.',
        categories: ['thermodynamics', 'manufacturing', 'cad_cam', 'aptitude']
      }
    ]
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'Civil',
    icon: 'HardHat',
    description: 'RCC limit state structural design, beam mechanics, geomatics and Total Station surveying, CPM scheduling, and Aptitude.',
    tracks: [
      {
        id: 'civil-structural',
        title: 'Structural & Construction Engineer',
        description: 'Ductile under-reinforced beams, shear-moment relations, EDM surveying, Bowditch balancing, CPM float, and Aptitude.',
        categories: ['structural_eng', 'surveying', 'construction_tech', 'aptitude']
      }
    ]
  }
];

export const TRACK_QUESTIONS: Record<string, Question[]> = {
  // CSE
  'cse-sde': [...CSE_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],

  // AI & ML
  'aiml-engineer': [...AIML_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],

  // Data Science
  'data-scientist': [...DATA_SCIENCE_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],
  'data-analyst': [...DATA_ANALYST_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],
  'data-analyst-intern': [...DATA_ANALYST_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS], // Backward-compatible alias

  // IT
  'it-cloud-devops': [...IT_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],

  // ECE
  'ece-embedded-vlsi': [...ECE_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],

  // EEE
  'eee-core': [...EEE_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],

  // Mechanical
  'mech-design-mfg': [...MECH_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS],

  // Civil
  'civil-structural': [...CIVIL_QUESTIONS, ...UNIVERSAL_APTITUDE_QUESTIONS]
};

/**
 * Returns the appropriate questions for the requested track.
 * Defaults safely to 'cse-sde' or 'data-analyst' if not matched.
 */
export function getQuestionsForTrack(trackId?: string): Question[] {
  if (trackId && TRACK_QUESTIONS[trackId]) {
    return TRACK_QUESTIONS[trackId];
  }
  // Try case-insensitive or partial match
  if (trackId) {
    const key = Object.keys(TRACK_QUESTIONS).find(k => k.toLowerCase() === trackId.toLowerCase());
    if (key) return TRACK_QUESTIONS[key];
  }
  return DATA_ANALYST_QUESTIONS;
}

/**
 * Finds which branch a given track belongs to
 */
export function getBranchForTrack(trackId: string): BranchDefinition | undefined {
  return BRANCH_DEFINITIONS.find(b => b.tracks.some(t => t.id === trackId || (trackId === 'data-analyst-intern' && t.id === 'data-analyst')));
}

/**
 * Fully dynamic assessment grading function:
 * Accepts any track questions, grades answers transparently, and computes category proficiencies.
 */
export function gradeAssessment(
  answers: Record<string, string>,
  questions: Question[] = DATA_ANALYST_QUESTIONS
): {
  overallScore: number;
  skillScores: Record<string, any>;
  strengths: string[];
} {
  const categoryCounts: Record<string, { total: number; correct: number; points: number; totalPoints: number; evidence: string[] }> = {};

  let totalPointsEarned = 0;
  let maxPossiblePoints = 0;

  for (const q of questions) {
    if (!categoryCounts[q.category]) {
      categoryCounts[q.category] = { total: 0, correct: 0, points: 0, totalPoints: 0, evidence: [] };
    }

    const bucket = categoryCounts[q.category];
    bucket.total += 1;
    bucket.totalPoints += q.points;
    maxPossiblePoints += q.points;

    const chosenOptionId = answers[q.id];
    const isCorrect = chosenOptionId === q.correctOptionId;

    if (isCorrect) {
      bucket.correct += 1;
      bucket.points += q.points;
      totalPointsEarned += q.points;
      bucket.evidence.push(`Correctly mastered: ${q.conceptTested} (${q.title})`);
    } else {
      bucket.evidence.push(`Needs review: ${q.conceptTested} (${q.title})`);
    }
  }

  const skillScores: Record<string, any> = {};
  const strengths: string[] = [];

  for (const [cat, data] of Object.entries(categoryCounts)) {
    const scorePct = data.totalPoints > 0 ? Math.round((data.points / data.totalPoints) * 100) : 0;
    let level = 'Novice';
    let levelNum = 1;
    if (scorePct >= 90) { level = 'Advanced'; levelNum = 4; }
    else if (scorePct >= 70) { level = 'Proficient'; levelNum = 3; }
    else if (scorePct >= 40) { level = 'Developing'; levelNum = 2; }

    skillScores[cat] = {
      score: scorePct,
      level,
      levelNum,
      questionsTotal: data.total,
      questionsCorrect: data.correct,
      evidence: data.evidence
    };

    if (scorePct >= 70) {
      strengths.push(`${cat.toUpperCase().replace(/_/g, ' ')} (${scorePct}% - ${level})`);
    }
  }

  const overallScore = maxPossiblePoints > 0 ? Math.round((totalPointsEarned / maxPossiblePoints) * 100) : 0;

  return {
    overallScore,
    skillScores,
    strengths
  };
}
