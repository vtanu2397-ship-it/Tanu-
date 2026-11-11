import { Question } from '../../types';

export const EEE_QUESTIONS: Question[] = [
  // ================= ELECTRICAL MACHINES =================
  {
    id: 'eee-em-1',
    category: 'electrical_machines',
    categoryLabel: 'Electrical Machines & Transformers',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Transformer Core Losses & Laminations',
    question: 'Why are the magnetic cores of power transformers constructed using thin, insulated silicon steel laminations stacked together rather than a solid steel block?',
    options: [
      {
        id: 'opt-a',
        text: 'Laminations break the continuous conductive loop paths, significantly reducing Eddy Current losses which are proportional to the square of lamination thickness (t^2).',
        explanation: 'Correct! Eddy current loss P_e is proportional to (f * B_max * t)^2. Slicing the core into insulated laminations minimizes cross-sectional loops for induced eddy currents.'
      },
      {
        id: 'opt-b',
        text: 'Laminations eliminate winding copper resistance entirely.',
        explanation: 'Incorrect: Copper loss occurs in the copper coils, not the magnetic core.'
      },
      {
        id: 'opt-c',
        text: 'Laminated cores make the transformer completely non-magnetic.',
        explanation: 'Incorrect: Silicon steel has high magnetic permeability.'
      },
      {
        id: 'opt-d',
        text: 'Solid steel cores cannot operate above 0 volts.',
        explanation: 'Incorrect: Solid cores function but overheat severely due to massive eddy currents.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Transformer Eddy Current Losses & Core Lamination'
  },
  {
    id: 'eee-em-2',
    category: 'electrical_machines',
    categoryLabel: 'Electrical Machines & Transformers',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: '3-Phase Induction Motor Slip & Torque',
    question: 'What is the "slip" (s) of a 3-phase squirrel cage induction motor running at synchronous speed (N_r = N_s), and what electromagnetic torque does it produce under this condition?',
    options: [
      {
        id: 'opt-a',
        text: 'Slip s = 0; electromagnetic torque is zero because rotor conductors do not cut the rotating magnetic field, inducing zero rotor current.',
        explanation: 'Correct! Slip s = (N_s - N_r)/N_s. At N_r = N_s, relative motion between rotor and stator flux is zero; no rotor EMF is induced (Faraday\'s Law), producing zero torque.'
      },
      {
        id: 'opt-b',
        text: 'Slip s = 1; torque reaches breakdown maximum.',
        explanation: 'Incorrect: s = 1 occurs at standstill (starting), not synchronous speed.'
      },
      {
        id: 'opt-c',
        text: 'Slip s = -1; the motor operates as a DC dynamo.',
        explanation: 'Incorrect: s < 0 is induction generator operation.'
      },
      {
        id: 'opt-d',
        text: 'Torque is infinite due to resonance.',
        explanation: 'Incorrect: Induction motor torque depends on induced rotor current.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Induction Motor Slip Mechanics & Faraday Induction'
  },

  // ================= POWER SYSTEMS =================
  {
    id: 'eee-ps-1',
    category: 'power_systems',
    categoryLabel: 'Power Systems & Transmission Engineering',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Ferranti Effect on Long Transmission Lines',
    question: 'What is the "Ferranti Effect" observed on long high-voltage AC transmission lines under no-load or lightly loaded conditions, and what equipment is used to mitigate it?',
    options: [
      {
        id: 'opt-a',
        text: 'The receiving end voltage becomes higher than the sending end voltage due to the line charging capacitance charging current flowing through the line series inductance; mitigated using Shunt Reactors.',
        explanation: 'Correct! Under light load, capacitive charging current causes a voltage rise across series line inductance. Shunt reactors absorb excess reactive vars.'
      },
      {
        id: 'opt-b',
        text: 'The line frequency doubles to 120 Hz; mitigated by thermal fuses.',
        explanation: 'Incorrect: Grid frequency is governed by synchronous generators.'
      },
      {
        id: 'opt-c',
        text: 'The line conductors melt due to zero resistance.',
        explanation: 'Incorrect: Zero load current means minimal I^2*R heating.'
      },
      {
        id: 'opt-d',
        text: 'Lightning discharges spontaneously without clouds.',
        explanation: 'Incorrect: Ferranti effect is an AC transmission steady-state phenomenon.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Ferranti Effect & Shunt Reactor Compensation'
  },
  {
    id: 'eee-ps-2',
    category: 'power_systems',
    categoryLabel: 'Power Systems & Transmission Engineering',
    type: 'multiple_choice',
    difficulty: 'advanced',
    title: 'Symmetrical Components & Single Line-to-Ground Fault',
    question: 'In symmetrical component analysis of power system unsymmetrical faults, how are the positive (I_a1), negative (I_a2), and zero sequence (I_a0) currents related at the fault point during a Single Line-to-Ground (SLG) fault?',
    options: [
      {
        id: 'opt-a',
        text: 'All three sequence currents are equal: I_a1 = I_a2 = I_a0 = I_f / 3, corresponding to a series connection of sequence network impedance diagrams.',
        explanation: 'Correct! For an SLG fault on phase A, boundary conditions dictate equal sequence currents flowing through positive, negative, and zero sequence networks connected in series.'
      },
      {
        id: 'opt-b',
        text: 'I_a0 = 0 and I_a1 = -I_a2 (parallel connection).',
        explanation: 'Incorrect: This characterizes a Line-to-Line (L-L) fault without ground.'
      },
      {
        id: 'opt-c',
        text: 'Zero sequence current is always 10 times higher than positive sequence current.',
        explanation: 'Incorrect: Sequence currents are exactly equal for an SLG fault.'
      },
      {
        id: 'opt-d',
        text: 'Symmetrical components cannot be applied to ground faults.',
        explanation: 'Incorrect: Fortescue\'s theorem applies to all 3-phase unbalanced conditions.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Symmetrical Fault Analysis: SLG Sequence Networks'
  },

  // ================= CONTROL SYSTEMS =================
  {
    id: 'eee-cs-1',
    category: 'control_systems',
    categoryLabel: 'Control Systems Engineering',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Routh-Hurwitz Stability Criterion',
    question: 'According to the Routh-Hurwitz stability criterion, for a closed-loop linear time-invariant (LTI) system to be stable, what condition must the first column of the Routh array satisfy?',
    options: [
      {
        id: 'opt-a',
        text: 'All elements in the first column of the Routh array must have the same sign (no sign changes); the number of sign changes equals the number of closed-loop poles in the right-half s-plane.',
        explanation: 'Correct! Any sign change in the first column corresponds to an unstable pole with positive real part in the right half of the s-plane.'
      },
      {
        id: 'opt-b',
        text: 'All elements in the first column must equal zero.',
        explanation: 'Incorrect: A row of zeros indicates roots on the imaginary axis or symmetry, not standard stability.'
      },
      {
        id: 'opt-c',
        text: 'The first column must contain alternating positive and negative signs.',
        explanation: 'Incorrect: Alternating signs guarantees instability.'
      },
      {
        id: 'opt-d',
        text: 'The Routh criterion only works on open-loop frequency response graphs.',
        explanation: 'Incorrect: Routh-Hurwitz evaluates the closed-loop characteristic polynomial.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Routh-Hurwitz Stability Criterion & S-Plane Poles'
  },
  {
    id: 'eee-cs-2',
    category: 'control_systems',
    categoryLabel: 'Control Systems Engineering',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'PID Controller Action: Proportional, Integral, Derivative',
    question: 'In industrial process feedback control, what is the specific role of the Integral (I) term in a PID controller, and what side-effect can it cause if tuned with excessive gain?',
    options: [
      {
        id: 'opt-a',
        text: 'The Integral term accumulates past errors over time to eliminate Steady-State Error to zero; excessive integral gain causes overshoot, oscillation, and "Integrator Windup".',
        explanation: 'Correct! By integrating error e(t)dt, the controller forces steady-state offset to 0. Too much integral action increases phase lag, causing overshoot and windup under actuator saturation.'
      },
      {
        id: 'opt-b',
        text: 'The Integral term predicts future error by taking derivatives of the sensor reading.',
        explanation: 'Incorrect: Derivative (D) action anticipates future error trends.'
      },
      {
        id: 'opt-c',
        text: 'The Integral term disconnects the feedback loop.',
        explanation: 'Incorrect: It is an active parallel feedback component.'
      },
      {
        id: 'opt-d',
        text: 'The Integral term ensures zero high-frequency noise amplification.',
        explanation: 'Incorrect: Low-pass filtering on the derivative term handles noise.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'PID Controller Terms: Steady-State Error & Integrator Windup'
  }
];
