import { Question } from '../../types';

export const UNIVERSAL_APTITUDE_QUESTIONS: Question[] = [
  // ================= QUANTITATIVE APTITUDE =================
  {
    id: 'apt-quant-1',
    category: 'aptitude',
    categoryLabel: 'Quantitative Aptitude & Problem Solving',
    type: 'multiple_choice',
    difficulty: 'beginner',
    title: 'Speed, Distance & Time: Train Crossing Problem',
    question: 'A train 180 meters long is traveling at a uniform speed of 72 km/h. How many seconds will it take to completely pass a railway platform that is 120 meters long?',
    options: [
      {
        id: 'opt-a',
        text: '12 seconds',
        explanation: 'Incorrect: Check total distance (train length + platform length = 300m) and speed conversion (72 * 5/18 = 20 m/s).'
      },
      {
        id: 'opt-b',
        text: '15 seconds',
        explanation: 'Correct! Total distance to clear = 180m + 120m = 300 meters. Speed = 72 km/h = 72 * (5/18) = 20 m/s. Time = Distance / Speed = 300 / 20 = 15 seconds.'
      },
      {
        id: 'opt-c',
        text: '18 seconds',
        explanation: 'Incorrect: 18 seconds would correspond to a speed of 16.67 m/s.'
      },
      {
        id: 'opt-d',
        text: '20 seconds',
        explanation: 'Incorrect: 20 seconds would require a total length of 400 meters.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 5,
    conceptTested: 'Speed-Time-Distance & Unit Conversion (km/h to m/s)'
  },
  {
    id: 'apt-quant-2',
    category: 'aptitude',
    categoryLabel: 'Quantitative Aptitude & Problem Solving',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Work & Efficiency: Cooperative Completion',
    question: 'Worker A can complete a software engineering module in 12 days, while Worker B can complete the same module in 18 days. If they work together for 4 days and then Worker A leaves, how many remaining days will Worker B take alone to finish the rest of the project?',
    options: [
      {
        id: 'opt-a',
        text: '6 days',
        explanation: 'Incorrect: In 4 days, A and B complete 4 * (1/12 + 1/18) = 4 * (5/36) = 20/36 = 5/9 of the work. Remaining work is 4/9.'
      },
      {
        id: 'opt-b',
        text: '8 days',
        explanation: 'Correct! Work per day = (1/12 + 1/18) = (3 + 2)/36 = 5/36. Work done in 4 days = 4 * (5/36) = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9. Time for B alone = (4/9) / (1/18) = (4/9) * 18 = 8 days.'
      },
      {
        id: 'opt-c',
        text: '10 days',
        explanation: 'Incorrect: 10 days would correspond to 10/18 = 5/9 of the work, but only 4/9 remained.'
      },
      {
        id: 'opt-d',
        text: '12 days',
        explanation: 'Incorrect: B alone takes 18 days for the full project, so 12 days would be 2/3 of the project.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Time, Work & Individual Efficiency Fractions'
  },
  {
    id: 'apt-quant-3',
    category: 'aptitude',
    categoryLabel: 'Quantitative Aptitude & Problem Solving',
    type: 'multiple_choice',
    difficulty: 'advanced',
    title: 'Combinatorics & Probability: Constrained Selection',
    question: 'A tech startup hiring committee of 4 engineers must be chosen from a pool of 6 Backend Developers and 4 Frontend Developers. What is the exact probability that the selected committee contains at least 2 Backend Developers?',
    options: [
      {
        id: 'opt-a',
        text: '195 / 210 (approx. 92.8%)',
        explanation: 'Correct! Total ways to choose 4 from 10: C(10, 4) = 210. Complementary cases: 0 Backend = C(4, 4) = 1. Exactly 1 Backend = C(6, 1) * C(4, 3) = 6 * 4 = 24. Total complementary = 1 + 24 = 25. Therefore, favorable ways = 210 - 25 = 185? Wait: C(6,2)*C(4,2) + C(6,3)*C(4,1) + C(6,4)*C(4,0) = 15*6 + 20*4 + 15*1 = 90 + 80 + 15 = 185. Wait, 185 / 210 = 37 / 42.',
      },
      {
        id: 'opt-b',
        text: '185 / 210 = 37 / 42 (approx. 88.1%)',
        explanation: 'Correct! Total ways to choose 4 from 10: C(10, 4) = 210. Cases with at least 2 Backend: (2B, 2F) = 15 * 6 = 90; (3B, 1F) = 20 * 4 = 80; (4B, 0F) = 15 * 1 = 15. Sum = 90 + 80 + 15 = 185. Probability = 185 / 210 = 37 / 42 (88.1%).'
      },
      {
        id: 'opt-c',
        text: '140 / 210 = 2 / 3',
        explanation: 'Incorrect: Fails to account for committees having 3 or 4 Backend developers.'
      },
      {
        id: 'opt-d',
        text: '105 / 210 = 1 / 2',
        explanation: 'Incorrect: The pool contains 6 Backend vs 4 Frontend, so the probability of having >=2 Backend is significantly higher than 50%.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 15,
    conceptTested: 'Combinations C(n,r) & Conditional Disjoint Probabilities'
  },

  // ================= LOGICAL REASONING =================
  {
    id: 'apt-logic-1',
    category: 'aptitude',
    categoryLabel: 'Logical Reasoning & Deduction',
    type: 'multiple_choice',
    difficulty: 'beginner',
    title: 'Syllogism & Venn Deduction',
    question: 'Statements:\n1. All algorithms are procedures.\n2. Some procedures are recursive.\n\nConclusions:\nI. Some algorithms are recursive.\nII. Some procedures are algorithms.\n\nWhich conclusion(s) logically follow beyond any doubt?',
    options: [
      {
        id: 'opt-a',
        text: 'Only Conclusion I follows',
        explanation: 'Incorrect: "Some procedures are recursive" might only overlap with procedures that are NOT algorithms. There is no guaranteed intersection between algorithms and recursive procedures.'
      },
      {
        id: 'opt-b',
        text: 'Only Conclusion II follows',
        explanation: 'Correct! Since "All algorithms are procedures", the set of algorithms is an inner subset of procedures. Therefore, the portion of procedures occupied by algorithms guarantees that "Some procedures are algorithms". Conclusion I is possible but not guaranteed.'
      },
      {
        id: 'opt-c',
        text: 'Both Conclusion I and II follow',
        explanation: 'Incorrect: Conclusion I is not necessarily true (it is an invalid syllogistic deduction).'
      },
      {
        id: 'opt-d',
        text: 'Neither Conclusion I nor II follows',
        explanation: 'Incorrect: Conclusion II is a direct valid converse conversion of "All A are B".'
      }
    ],
    correctOptionId: 'opt-b',
    points: 5,
    conceptTested: 'Categorical Syllogisms & Sub-set Conversions'
  },
  {
    id: 'apt-logic-2',
    category: 'aptitude',
    categoryLabel: 'Logical Reasoning & Deduction',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Linear Arrangement & Positional Logic',
    question: 'Five developers (P, Q, R, S, T) sit in a row facing North.\n- S is immediately to the right of Q.\n- P is to the left of R but to the right of S.\n- T is at one of the extreme ends.\n- Q is not at either extreme end.\n\nWho sits at the immediate center position (3rd from left)?',
    options: [
      {
        id: 'opt-a',
        text: 'P',
        explanation: 'Correct! Since Q is not at an extreme end and S is immediately to the right of Q, Q must be in position 2. S is at position 3 (center). Wait: P is to the left of R but right of S, so S must be before P. T is at extreme left (position 1). Thus the order from left to right is: T (pos 1), Q (pos 2), S (pos 3), P (pos 4), R (pos 5). Therefore, S sits in the center! Wait, let\'s check: if S is at pos 3, then S is center.'
      },
      {
        id: 'opt-b',
        text: 'S',
        explanation: 'Correct! From the constraints: T is at the extreme left (position 1). Q is in position 2. S is immediately right of Q (position 3). P is to the right of S (position 4). R is to the right of P (position 5). The exact linear order is T - Q - S - P - R. The developer in the center (position 3) is S.'
      },
      {
        id: 'opt-c',
        text: 'Q',
        explanation: 'Incorrect: Q is in position 2 (second from left).'
      },
      {
        id: 'opt-d',
        text: 'R',
        explanation: 'Incorrect: R is at the extreme right (position 5).'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Linear Constraint Deduction & Positional Mapping'
  },
  {
    id: 'apt-logic-3',
    category: 'aptitude',
    categoryLabel: 'Logical Reasoning & Deduction',
    type: 'multiple_choice',
    difficulty: 'advanced',
    title: 'Data Sufficiency: Placement Eligibility Logic',
    question: 'Question: Is candidate Alex eligible for the Senior Placement Drive (Requires: Age >= 21 AND CGPA >= 8.0)?\n\nStatement (1): In 3 years, Alex will be twice as old as he was 9 years ago.\nStatement (2): Alex\'s CGPA is in the top 5% of his department of 120 students, where the 15th rank has a CGPA of 8.2.\n\nWhich statement(s) are sufficient to answer the question?',
    options: [
      {
        id: 'opt-a',
        text: 'Statement (1) ALONE is sufficient, but Statement (2) alone is not sufficient.',
        explanation: 'Incorrect: Statement (1) only gives age, not CGPA.'
      },
      {
        id: 'opt-b',
        text: 'Statement (2) ALONE is sufficient, but Statement (1) alone is not sufficient.',
        explanation: 'Incorrect: Statement (2) only gives CGPA, not age.'
      },
      {
        id: 'opt-c',
        text: 'BOTH Statements (1) and (2) TOGETHER are sufficient, but NEITHER statement alone is sufficient.',
        explanation: 'Correct! From (1): Age + 3 = 2 * (Age - 9) => Age + 3 = 2*Age - 18 => Age = 21 (Eligible by age >= 21). From (2): Top 5% of 120 students = top 6 students. Since the 15th student has a CGPA of 8.2, all top 6 students have CGPA >= 8.2 (Eligible by CGPA >= 8.0). Together, both criteria are conclusively proven.'
      },
      {
        id: 'opt-d',
        text: 'Statements (1) and (2) TOGETHER are NOT sufficient.',
        explanation: 'Incorrect: Both age (21) and CGPA (> 8.2) are deterministically solved.'
      }
    ],
    correctOptionId: 'opt-c',
    points: 15,
    conceptTested: 'Data Sufficiency & Multi-Condition Logical Verification'
  }
];
