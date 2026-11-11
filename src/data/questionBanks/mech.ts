import { Question } from '../../types';

export const MECH_QUESTIONS: Question[] = [
  // ================= THERMODYNAMICS =================
  {
    id: 'mech-thermo-1',
    category: 'thermodynamics',
    categoryLabel: 'Applied Thermodynamics & Thermal Systems',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Carnot Heat Engine Efficiency & Second Law',
    question: 'A heat engine operates on a reversible Carnot cycle between a heat source at T_H = 600 K and a heat sink at T_L = 300 K. What is the maximum theoretical thermal efficiency of this engine according to the Second Law of Thermodynamics?',
    options: [
      {
        id: 'opt-a',
        text: '50% (eta_Carnot = 1 - T_L / T_H = 1 - 300/600 = 0.50)',
        explanation: 'Correct! The maximum possible thermodynamic efficiency for any cycle operating between two temperatures is eta = 1 - (T_L / T_H) in Kelvin = 1 - 0.5 = 50%.'
      },
      {
        id: 'opt-b',
        text: '100% because the process is reversible.',
        explanation: 'Incorrect: A 100% efficient heat engine violates the Kelvin-Planck statement of the Second Law of Thermodynamics.'
      },
      {
        id: 'opt-c',
        text: '25% because of friction losses.',
        explanation: 'Incorrect: Carnot engines are ideal reversible models with zero friction.'
      },
      {
        id: 'opt-d',
        text: '75% based on Otto cycle compression ratio.',
        explanation: 'Incorrect: Carnot efficiency depends solely on boundary thermal reservoir temperatures.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Carnot Efficiency & Second Law of Thermodynamics'
  },
  {
    id: 'mech-thermo-2',
    category: 'thermodynamics',
    categoryLabel: 'Applied Thermodynamics & Thermal Systems',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Rankine Cycle vs Brayton Cycle',
    question: 'How does the working fluid and phase change in a thermal power plant Rankine Cycle differ from an aircraft gas turbine Brayton Cycle?',
    options: [
      {
        id: 'opt-a',
        text: 'The Rankine cycle uses water/steam that undergoes liquid-to-vapor and vapor-to-liquid phase changes (subcooling and condensation), requiring low pump work; the Brayton cycle uses a single-phase gas throughout, requiring substantial compressor work.',
        explanation: 'Correct! Pumping liquid water in Rankine requires ~1-2% of turbine output, whereas compressing air in Brayton consumes 40-50% of turbine work (back-work ratio).'
      },
      {
        id: 'opt-b',
        text: 'The Brayton cycle freezes water into ice.',
        explanation: 'Incorrect: Brayton operates on compressed air and combustion gases.'
      },
      {
        id: 'opt-c',
        text: 'The Rankine cycle only works in outer space.',
        explanation: 'Incorrect: Rankine is the standard thermodynamic cycle for coal, gas, and nuclear power generation.'
      },
      {
        id: 'opt-d',
        text: 'Both cycles require zero external heat input.',
        explanation: 'Incorrect: Both are heat engine cycles requiring fuel combustion or thermal heat sources.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Rankine vs Brayton Thermodynamic Cycles & Back-Work Ratio'
  },

  // ================= MANUFACTURING =================
  {
    id: 'mech-mfg-1',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing Technology & Metal Forming',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Merchant\'s Circle Analysis in Metal Cutting',
    question: 'In orthogonal metal cutting, according to Merchant\'s analysis, which relationship balances cutting forces and determines the shear plane angle phi given tool rake angle alpha and friction angle beta?',
    options: [
      {
        id: 'opt-a',
        text: '2*phi + beta - alpha = 90 degrees (phi = 45 + alpha/2 - beta/2)',
        explanation: 'Correct! Merchant\'s original condition optimizes maximum shear stress for minimum cutting energy, relating shear angle to rake and friction angles.'
      },
      {
        id: 'opt-b',
        text: 'phi + alpha + beta = 180 degrees',
        explanation: 'Incorrect: Does not reflect minimum energy equilibrium.'
      },
      {
        id: 'opt-c',
        text: 'Shear angle is independent of tool rake angle.',
        explanation: 'Incorrect: Higher positive rake angle increases shear angle and reduces cutting forces.'
      },
      {
        id: 'opt-d',
        text: 'Friction between chip and tool is always zero.',
        explanation: 'Incorrect: High friction and built-up edge (BUE) occur along tool rake face.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Merchant\'s Shear Angle Relationship in Metal Machining'
  },
  {
    id: 'mech-mfg-2',
    category: 'manufacturing',
    categoryLabel: 'Manufacturing Technology & Metal Forming',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Casting Solidification & Chvorinov\'s Rule',
    question: 'According to Chvorinov\'s rule for metal casting, total solidification time t_s is proportional to which ratio of the casting geometry?',
    options: [
      {
        id: 'opt-a',
        text: 't_s = B * (Volume / Surface Area)^2',
        explanation: 'Correct! Chvorinov\'s rule dictates that solidification time depends on the square of the volume-to-surface-area modulus (V/A)^2, ensuring risers solidify after the main casting.'
      },
      {
        id: 'opt-b',
        text: 't_s = B * (Surface Area / Volume)',
        explanation: 'Incorrect: Inverted ratio without exponent.'
      },
      {
        id: 'opt-c',
        text: 't_s is independent of casting volume.',
        explanation: 'Incorrect: Solidification time scales strongly with thermal mass (volume).'
      },
      {
        id: 'opt-d',
        text: 'Solidification time depends only on color of mold sand.',
        explanation: 'Incorrect: Mold constant B depends on mold material thermal properties, but geometry is governed by (V/A)^2.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Chvorinov\'s Rule & Metal Casting Riser Design'
  },

  // ================= CAD/CAM =================
  {
    id: 'mech-cad-1',
    category: 'cad_cam',
    categoryLabel: 'CAD/CAM & CNC Manufacturing',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'CNC G-Code Programming: Preparatory Functions',
    question: 'In standard ISO CNC machining programming (G-Code), what do the preparatory codes `G00`, `G01`, `G02`, and `G03` signify?',
    options: [
      {
        id: 'opt-a',
        text: 'G00 = Rapid positioning traverse; G01 = Linear interpolation with programmed feed rate; G02 = Circular interpolation clockwise; G03 = Circular interpolation counter-clockwise.',
        explanation: 'Correct! G00 is rapid non-cutting traverse; G01 is straight cutting tool feed; G02/G03 execute circular arcs with radius R or incremental center offsets (I, J).'
      },
      {
        id: 'opt-b',
        text: 'G00 = Spindle Stop; G01 = Coolant ON; G02 = Coolant OFF; G03 = Emergency Stop.',
        explanation: 'Incorrect: Coolant and spindle functions are M-Codes (Miscellaneous functions, e.g. M03, M08, M09).'
      },
      {
        id: 'opt-c',
        text: 'They represent tool change codes.',
        explanation: 'Incorrect: Tool change uses M06 with T-word.'
      },
      {
        id: 'opt-d',
        text: 'They set the measurement units to metric millimeters.',
        explanation: 'Incorrect: G21 specifies metric units; G20 specifies inches.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'CNC Machine G-Code Motion Primitives'
  },
  {
    id: 'mech-cad-2',
    category: 'cad_cam',
    categoryLabel: 'CAD/CAM & CNC Manufacturing',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Geometric Modeling: CSG vs B-Rep in CAD',
    question: 'What is the structural difference between Constructive Solid Geometry (CSG) and Boundary Representation (B-Rep) solid modeling engines in modern 3D CAD software (e.g. SolidWorks, CATIA)?',
    options: [
      {
        id: 'opt-a',
        text: 'CSG represents solids as a binary tree of primitive shapes (cubes, cylinders) combined via Boolean operations (Union, Subtract, Intersect); B-Rep explicitly defines solids by their topological boundaries (vertices, edges, faces, and surfaces).',
        explanation: 'Correct! CSG stores procedural construction trees; B-Rep stores explicit topological boundary adjacency structures and underlying NURBS geometry.'
      },
      {
        id: 'opt-b',
        text: 'CSG only works in 2D sketching; B-Rep is only for 3D printing.',
        explanation: 'Incorrect: Both are foundational 3D solid representation paradigms.'
      },
      {
        id: 'opt-c',
        text: 'B-Rep models have no volume or mass properties.',
        explanation: 'Incorrect: B-Rep solids are closed volumes capable of mass and moment-of-inertia calculation.'
      },
      {
        id: 'opt-d',
        text: 'CSG requires photorealistic rendering hardware.',
        explanation: 'Incorrect: Rendering is a visual display pipeline distinct from topological modeling.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Solid Modeling Paradigms: CSG vs B-Rep'
  }
];
