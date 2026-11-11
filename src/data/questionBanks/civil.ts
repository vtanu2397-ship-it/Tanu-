import { Question } from '../../types';

export const CIVIL_QUESTIONS: Question[] = [
  // ================= STRUCTURAL ENGINEERING =================
  {
    id: 'civ-struct-1',
    category: 'structural_eng',
    categoryLabel: 'Structural Engineering & RCC Design',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Limit State Method: Singly Reinforced Beam Under-Reinforcement',
    question: 'In Reinforced Cement Concrete (RCC) design according to IS 456 / ACI codes, why are flexural beams designed intentionally as "Under-Reinforced" sections rather than "Over-Reinforced" sections?',
    options: [
      {
        id: 'opt-a',
        text: 'In an under-reinforced section, the tensile steel yields before concrete reaches its crushing strain, giving visible ductile deflection and crack warnings prior to collapse rather than sudden explosive brittle concrete crushing.',
        explanation: 'Correct! Ductile failure gives occupants time to evacuate. In over-reinforced sections, brittle concrete crushes catastrophically without prior warning.'
      },
      {
        id: 'opt-b',
        text: 'Steel is more expensive than concrete, so engineers omit steel arbitrarily.',
        explanation: 'Incorrect: Reinforcement ratios are strictly calculated for structural safety and failure mode control.'
      },
      {
        id: 'opt-c',
        text: 'Under-reinforced beams cannot carry any live load.',
        explanation: 'Incorrect: They are designed to safely carry factored design loads.'
      },
      {
        id: 'opt-d',
        text: 'Over-reinforced beams float on water.',
        explanation: 'Incorrect: Irrelevant.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Ductile Failure Mode & Under-Reinforced RCC Design'
  },
  {
    id: 'civ-struct-2',
    category: 'structural_eng',
    categoryLabel: 'Structural Engineering & RCC Design',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Bending Moment and Shear Force Relationships',
    question: 'In structural analysis of beams subject to transverse loading, at what specific point along the span does the Bending Moment M(x) reach its local maximum or minimum value?',
    options: [
      {
        id: 'opt-a',
        text: 'At the cross-section where the Shear Force V(x) changes sign or passes through zero (dM/dx = V = 0).',
        explanation: 'Correct! The differential relationship between bending moment and shear force is dM/dx = V(x). Therefore, extreme values of M occur where V(x) = 0.'
      },
      {
        id: 'opt-b',
        text: 'At the point where deflection is zero.',
        explanation: 'Incorrect: Supports have zero deflection but often zero moment in simply supported beams.'
      },
      {
        id: 'opt-c',
        text: 'Only at the extreme left end of the beam.',
        explanation: 'Incorrect: Maximum moment occurs where shear transitions through zero.'
      },
      {
        id: 'opt-d',
        text: 'Where the load intensity is zero.',
        explanation: 'Incorrect: Shear derivative dV/dx = -w(x), whereas moment derivative is V(x).'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Differential Relationship Between Shear Force & Bending Moment'
  },

  // ================= SURVEYING =================
  {
    id: 'civ-surv-1',
    category: 'surveying',
    categoryLabel: 'Geomatics & Advanced Surveying',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Total Station & Electronic Distance Measurement (EDM)',
    question: 'How does an electronic Total Station measure the slope distance between the instrument station and a target prism, and what physical correction must be applied to the raw pulse measurement?',
    options: [
      {
        id: 'opt-a',
        text: 'By measuring the phase shift or transit time of an emitted modulated infrared/laser carrier wave; corrected for atmospheric temperature, atmospheric pressure, and earth curvature/refraction.',
        explanation: 'Correct! EDM instruments measure phase delay or time-of-flight of infrared light. Air density (temperature/pressure) alters light velocity, requiring PPM corrections.'
      },
      {
        id: 'opt-b',
        text: 'By dropping a mechanical steel chain down a plumb line.',
        explanation: 'Incorrect: Total Stations use electro-optical distance measurement, not chains.'
      },
      {
        id: 'opt-c',
        text: 'By tracking submarine sonar echoes.',
        explanation: 'Incorrect: Surveying uses optical and electromagnetic frequencies.'
      },
      {
        id: 'opt-d',
        text: 'By counting footsteps using a pedometer.',
        explanation: 'Incorrect: Pacing is an imprecise reconnaissance method.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Total Station EDM Principles & Atmospheric Refraction Corrections'
  },
  {
    id: 'civ-surv-2',
    category: 'surveying',
    categoryLabel: 'Geomatics & Advanced Surveying',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Traverse Closing Error & Bowditch Rule',
    question: 'In closed traverse surveying, when closing error in latitudes and departures occurs due to small angular and linear measurement discrepancies, how does the Bowditch (Compass) Rule distribute the correction?',
    options: [
      {
        id: 'opt-a',
        text: 'The correction to latitude/departure of any line is directly proportional to the length of that line divided by the total perimeter of the traverse.',
        explanation: 'Correct! The Bowditch rule assumes linear errors are proportional to sqrt(length) and angular errors proportional to 1/sqrt(length), yielding corrections proportional to line length.'
      },
      {
        id: 'opt-b',
        text: 'All error is assigned entirely to the very last traverse line.',
        explanation: 'Incorrect: This distorts the survey geometry.'
      },
      {
        id: 'opt-c',
        text: 'Error is divided equally among all lines regardless of their lengths.',
        explanation: 'Incorrect: That is Transit rule logic for angles, not Bowditch perimeter proportionality.'
      },
      {
        id: 'opt-d',
        text: 'The traverse must be discarded and redone without correction.',
        explanation: 'Incorrect: Small closing errors within allowable tolerances are standardly balanced.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Bowditch Rule for Balancing Traverse Closing Errors'
  },

  // ================= CONSTRUCTION TECHNOLOGY =================
  {
    id: 'civ-const-1',
    category: 'construction_tech',
    categoryLabel: 'Construction Technology & Project Management',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Critical Path Method (CPM): Floats and Schedule',
    question: 'In construction project scheduling using the Critical Path Method (CPM), what is the definition of "Total Float", and what is the Total Float value for activities lying along the Critical Path?',
    options: [
      {
        id: 'opt-a',
        text: 'Total Float is the maximum duration an activity can be delayed without delaying the overall project completion date (Late Start - Early Start); for critical path activities, Total Float is ZERO.',
        explanation: 'Correct! The critical path has zero total float. Any delay on a critical activity directly pushes the project delivery date.'
      },
      {
        id: 'opt-b',
        text: 'Total float is the volume of water needed for concrete curing.',
        explanation: 'Incorrect: Float in CPM is a time buffer metric.'
      },
      {
        id: 'opt-c',
        text: 'Total float on the critical path is infinite.',
        explanation: 'Incorrect: Critical path activities have zero float.'
      },
      {
        id: 'opt-d',
        text: 'Total float measures contractor profit margins.',
        explanation: 'Incorrect: CPM is a scheduling technique.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Critical Path Method (CPM) & Total Float Dynamics'
  },
  {
    id: 'civ-const-2',
    category: 'construction_tech',
    categoryLabel: 'Construction Technology & Project Management',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Concrete Curing & Hydration Kinetics',
    question: 'Why is moist curing of fresh concrete essential during the first 14 to 28 days after placement, and what occurs if concrete is allowed to dry prematurely?',
    options: [
      {
        id: 'opt-a',
        text: 'Water is required for the chemical hydration of Portland cement (formation of Calcium Silicate Hydrate / C-S-H gel); premature drying halts strength development and causes plastic and drying shrinkage cracking.',
        explanation: 'Correct! Cement hydration is an ongoing chemical reaction requiring moisture. Premature moisture loss stops hydration and causes micro-cracking and loss of compressive strength.'
      },
      {
        id: 'opt-b',
        text: 'Curing turns concrete into transparent glass.',
        explanation: 'Incorrect: Curing produces crystalline/gel structure, not glass.'
      },
      {
        id: 'opt-c',
        text: 'Concrete only hardens by absorbing atmospheric carbon dioxide over 100 years.',
        explanation: 'Incorrect: Portland cement hardens via water hydration, not carbonation (lime mortar relies on carbonation).'
      },
      {
        id: 'opt-d',
        text: 'Curing reduces concrete weight for earthquake safety.',
        explanation: 'Incorrect: Hydrated concrete retains mass.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Cement Hydration Kinetics & Moist Curing Requirements'
  }
];
