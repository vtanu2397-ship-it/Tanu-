export type SkillCategory = string;

export interface SkillCategoryMeta {
  key: string;
  name: string;
  iconName?: string;
  description: string;
}

export type SkillLevelName = 'Novice' | 'Developing' | 'Proficient' | 'Advanced';

export interface QuestionOption {
  id: string;
  text: string;
  explanation: string;
}

export interface Question {
  id: string;
  category: string;
  categoryLabel: string;
  type: 'multiple_choice' | 'code_interpretation' | 'data_scenario';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  question: string;
  codeSnippet?: string;
  dataContext?: string;
  options: QuestionOption[];
  correctOptionId: string;
  points: number;
  conceptTested: string;
}

export interface SkillBenchmark {
  requiredLevel: number; // 1-4
  levelName: SkillLevelName;
  weight: number; // Percentage e.g. 25
  targetScore: number; // Out of 100
  rationale: string;
}

export interface RoleBenchmark {
  id: string;
  title: string;
  branchId: string;
  branchName: string;
  industry: string;
  description: string;
  isPrimary?: boolean;
  skills: Record<string, SkillBenchmark>;
  commonTitles: string[];
}

export interface BranchDefinition {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  tracks: {
    id: string;
    title: string;
    description: string;
    categories: string[];
  }[];
}

export type PreparationGoal = 'placement' | 'internship';
export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export interface StudentProfile {
  id: string;
  email: string;
  displayName: string;
  university?: string;
  branch?: string; // e.g. 'cse', 'aiml', 'ds', 'it', 'ece', 'eee', 'mech', 'civil'
  major?: string;
  graduationYear?: string;
  academicYear?: AcademicYear;
  targetGoal?: PreparationGoal; // 'placement' | 'internship'
  targetRole: string; // Dynamic track ID e.g. 'cse-sde', 'data-analyst', etc.
  interests?: string[];
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryScoreDetail {
  score: number; // 0-100
  level: SkillLevelName;
  levelNum: number; // 1-4
  questionsTotal: number;
  questionsCorrect: number;
  evidence: string[];
}

export interface PriorityGap {
  skill: string;
  skillName: string;
  studentScore: number;
  targetScore: number;
  gapPoints: number;
  importance: 'Critical' | 'High' | 'Medium';
  recommendation: string;
}

export interface MatchCalculationStep {
  skill: string;
  weight: number;
  studentScore: number;
  targetScore: number;
  ratio: number;
  contribution: number;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  branchId?: string;
  roleId: string;
  roleTitle: string;
  completedAt: string;
  overallScore: number;
  skillScores: Record<string, CategoryScoreDetail>;
  answers: Record<string, string>; // questionId -> optionId
  strengths: string[];
  priorityGaps: PriorityGap[];
  matchSteps?: MatchCalculationStep[];
  companyId?: string;
  companyName?: string;
  assessmentType?: string;
  companyAnalysis?: CompanyAssessmentAnalysis;
  status: 'completed' | 'in_progress';
  createdAt: string;
}

export interface CompanyAssessmentConceptImprovement {
  concept: string;
  whyImportant: string;
  actionableDrill: string;
}

export interface CompanyAssessmentAnalysis {
  companyId: string;
  companyName: string;
  branchId: string;
  branchName: string;
  section: string;
  sectionTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  overallScore: number;
  grade: string;
  topicBreakdown: Record<string, {
    total: number;
    correct: number;
    score: number;
    level: string;
  }>;
  strongTopics: string[];
  weakTopics: string[];
  performanceSummary: string;
  conceptsToImprove: CompanyAssessmentConceptImprovement[];
  recommendedNextTopics: string[];
  practicalSuggestions: string[];
  generatedAt: string;
  isAiGenerated: boolean;
}

export interface WeeklyPlanItem {
  weekNumber: number;
  phase: '30-day' | '60-day' | '90-day';
  title: string;
  focusSkill: string;
  objectives: string[]; // learning topics
  handsOnTasks: string[]; // practical assignments
  learningMilestone: string;
  revisionTasks?: string[]; // revision tasks
  projectRecommendation?: {
    title: string;
    description: string;
    tools: string[];
  };
  estimatedHours: number;
}

export interface PortfolioProject {
  title: string;
  phase?: '30-day' | '60-day' | '90-day';
  targetGaps: string[];
  problemStatement: string;
  toolsUsed: string[];
  deliverables: string[];
  datasetSuggestion: string;
}

export interface GapExplanation {
  skill: string;
  plainEnglishExplanation: string;
  whyItMattersInRole: string;
  fastestWayToMaster: string;
}

export interface RoadmapPlan {
  id?: string;
  studentId?: string;
  assessmentId?: string;
  roleId?: string;
  roleTitle?: string;
  branchId?: string;
  branchName?: string;
  preparationGoal?: PreparationGoal;
  overview: string;
  studentScore?: number;
  existingSkills?: string[];
  identifiedGaps?: string[];
  thirtyDayGoal?: string;
  sixtyDayGoal?: string;
  ninetyDayGoal?: string;
  weeklyPlan: WeeklyPlanItem[];
  portfolioProjects: PortfolioProject[];
  gapExplanations: GapExplanation[];
  completedTaskIds?: string[];
  createdAt?: string;
}

export interface InterviewMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  coachingTip?: string;
  timestamp: string;
}

export interface MockInterviewSession {
  id: string;
  studentId: string;
  roleId: string;
  roleTitle: string;
  mode?: PreparationGoal; // 'placement' | 'internship'
  status: 'in_progress' | 'completed';
  messages: InterviewMessage[];
  overallFeedback?: string;
  score?: number;
  createdAt: string;
}

// Target Company Preparation Types
export type CompanyCategory = 'tier1_product' | 'it_services' | 'core_engineering';

export interface CompanyRecruitmentRound {
  roundNumber: number;
  name: string;
  format: string;
  focus: string;
  tips: string;
}

export interface CompanyPrepTopic {
  id: string;
  title: string;
  description: string;
  category: 'aptitude' | 'technical' | 'coding' | 'core_branch' | 'tech_interview' | 'hr_interview';
  estimatedHours: number;
  importance: 'Critical' | 'High' | 'Medium';
  branchRelevance?: string[];
  keyTips: string[];
}

export interface CompanyPracticeQuestion {
  id: string;
  companyId: string;
  category: 'aptitude' | 'technical' | 'coding' | 'core_branch' | 'tech_interview' | 'hr_interview';
  categoryLabel: string;
  title: string;
  question: string;
  codeSnippet?: string;
  scenarioContext?: string;
  options?: { id: string; text: string }[];
  correctAnswer?: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetBranches?: string[];
  subTopic?: string;
  starGuide?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

export interface BranchTargetAdvice {
  advice: string;
  focusAreas: string[];
  commonMistakes: string[];
}

export interface CompanyInternshipProgram {
  id: string;
  name: string;
  targetYear: string; // e.g. "2nd Year (Sophomores) / 3rd Year (Pre-Final Year)"
  duration: string; // e.g. "10-12 Weeks (Summer)"
  stipendBenchmark: string; // e.g. "₹80,000 - ₹1,20,000/mo (Sample Industry Range)"
  eligibleBranches: string[];
  selectionProcess: string[];
  evaluationFocus: string[];
  ppoConversionGuidance: string;
  applicationTimeline: string;
}

export interface TargetCompany {
  id: string;
  name: string;
  shortName: string;
  category: CompanyCategory;
  categoryLabel: string;
  accentColor: string;
  badge: string;
  logoPlaceholder: string;
  description: string;
  hiringModel: string;
  recruitmentRounds: CompanyRecruitmentRound[];
  internshipPrograms?: CompanyInternshipProgram[];
  syllabus: {
    aptitude: CompanyPrepTopic[];
    technical: CompanyPrepTopic[];
    coding: CompanyPrepTopic[];
    coreBranch: Record<string, CompanyPrepTopic[]>;
    techInterview: CompanyPrepTopic[];
    hrInterview: CompanyPrepTopic[];
  };
  branchRecommendations: Record<string, BranchTargetAdvice>;
  practiceQuestions: CompanyPracticeQuestion[];
  disclaimer: string;
}

export interface CompanyProgressState {
  completedTopicIds: string[];
  completedQuestionIds: string[];
  lastUpdated: string;
}

// Career Intelligence System Types
export interface CareerStage {
  stage: string; // e.g. "Graduate / Associate Engineer", "Mid-Level Specialist", "Senior / Lead Engineer", "Principal Architect / Engineering Manager"
  experienceYears: string;
  typicalTitles: string[];
  salaryRange: string;
  keyResponsibilities: string[];
  criticalSkills: string[];
}

export interface CareerProjectSuggestion {
  id: string;
  title: string;
  targetSkillGaps: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  problemStatement: string;
  toolsUsed: string[];
  keyDeliverables: string[];
  portfolioImpact: string;
}

export interface CareerRoleIntelligence {
  id: string;
  title: string;
  shortTitle: string;
  branchId: string;
  branchName: string;
  tagline: string;
  industrySector: string;
  demandTrend: 'Very High' | 'High' | 'Steady' | 'Explosive Growth';
  avgStartingPackage: string;
  interestTags: string[];
  coreSkills: {
    skillKey: string;
    skillName: string;
    targetScore: number;
    weight: number;
    description: string;
  }[];
  advancedSkills: {
    skillKey: string;
    skillName: string;
    targetScore: number;
    description: string;
  }[];
  careerProgression: CareerStage[];
  recommendedProjects: CareerProjectSuggestion[];
  yearWiseStrategy: Record<AcademicYear, {
    focusGoal: string;
    keyActionItems: string[];
    placementTimingAdvice: string;
  }>;
}

export interface MissingSkillDetail {
  skillKey: string;
  skillName: string;
  requiredScore: number;
  currentScore: number;
  gapSeverity: 'Critical' | 'Moderate' | 'Minor';
  improvementAdvice: string;
}

export interface StudentRoleRecommendation {
  role: CareerRoleIntelligence;
  matchScore: number; // 0-100%
  isPrimaryBranchMatch: boolean;
  whyRecommended: {
    primaryReason: string;
    branchSynergy: string;
    interestOverlap: string[];
    academicYearContext: string;
    skillAlignmentNote: string;
  };
  missingSkills: MissingSkillDetail[];
  strengthsApplied: string[];
}
