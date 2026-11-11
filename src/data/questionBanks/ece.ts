import { Question } from '../../types';

export const ECE_QUESTIONS: Question[] = [
  // ================= DIGITAL ELECTRONICS =================
  {
    id: 'ece-de-1',
    category: 'digital_electronics',
    categoryLabel: 'Digital Electronics & Logic Design',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Setup Time and Hold Time in Flip-Flops',
    question: 'In synchronous digital sequential circuits, what is the precise definition of "Setup Time" (t_setup) and "Hold Time" (t_hold) for an edge-triggered D flip-flop?',
    options: [
      {
        id: 'opt-a',
        text: 'Setup time is the minimum duration the data input must remain stable BEFORE the active clock edge; Hold time is the minimum duration the data input must remain stable AFTER the active clock edge.',
        explanation: 'Correct! Violating either setup or hold time leads to metastability where the flip-flop output oscillates unpredictably before settling.'
      },
      {
        id: 'opt-b',
        text: 'Setup time is the clock frequency; Hold time is the supply voltage.',
        explanation: 'Incorrect: Both are timing requirements measured in picoseconds or nanoseconds.'
      },
      {
        id: 'opt-c',
        text: 'Setup time is the time required to power on the circuit.',
        explanation: 'Incorrect: This describes power-on reset latency.'
      },
      {
        id: 'opt-d',
        text: 'Setup time applies only to asynchronous resets.',
        explanation: 'Incorrect: Setup and hold times govern the synchronous data input pin (D).'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Flip-Flop Setup and Hold Times & Metastability'
  },
  {
    id: 'ece-de-2',
    category: 'digital_electronics',
    categoryLabel: 'Digital Electronics & Logic Design',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Verilog Blocking vs Non-Blocking Assignments',
    question: 'In Verilog hardware description language, why MUST non-blocking assignments (`<=`) be strictly used inside edge-triggered `always @(posedge clk)` sequential blocks rather than blocking assignments (`=`)?',
    codeSnippet: `always @(posedge clk) begin
    q1 <= d;
    q2 <= q1;
end`,
    options: [
      {
        id: 'opt-a',
        text: 'Non-blocking assignments evaluate right-hand expressions simultaneously and schedule assignment at the end of the simulation time-step, correctly synthesizing cascaded flip-flops (shift registers) without race conditions.',
        explanation: 'Correct! Non-blocking (`<=`) models simultaneous hardware register updates. Blocking (`=`) introduces order-dependent simulation race hazards.'
      },
      {
        id: 'opt-b',
        text: 'Blocking assignments cannot be synthesized into silicon.',
        explanation: 'Incorrect: Blocking assignments synthesize valid combinational logic in `always @*` blocks.'
      },
      {
        id: 'opt-c',
        text: 'Non-blocking assignments only work for analog operational amplifiers.',
        explanation: 'Incorrect: Verilog is a digital HDL.'
      },
      {
        id: 'opt-d',
        text: 'Non-blocking assignments double the clock speed of the FPGA.',
        explanation: 'Incorrect: Clock frequency is set by clock generator hardware and timing closure.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Verilog Non-Blocking Assignments & Sequential Race Prevention'
  },

  // ================= VLSI =================
  {
    id: 'ece-vlsi-1',
    category: 'vlsi',
    categoryLabel: 'VLSI Design & Semiconductor Physics',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'CMOS Inverter Dynamic Power Dissipation',
    question: 'The dynamic power consumption of a digital CMOS logic gate switching at clock frequency f with load capacitance C_L and supply voltage V_DD is given by which fundamental formula?',
    options: [
      {
        id: 'opt-a',
        text: 'P_dynamic = alpha * C_L * (V_DD)^2 * f',
        explanation: 'Correct! Dynamic power scales linearly with switching activity (alpha), load capacitance (C_L), clock frequency (f), and quadratically with supply voltage (V_DD^2).'
      },
      {
        id: 'opt-b',
        text: 'P_dynamic = V_DD * I_leakage',
        explanation: 'Incorrect: This is static/sub-threshold leakage power, not dynamic switching power.'
      },
      {
        id: 'opt-c',
        text: 'P_dynamic = C_L * V_DD / f',
        explanation: 'Incorrect: Dimensional units do not match electrical power (Watts).'
      },
      {
        id: 'opt-d',
        text: 'P_dynamic = 0 because CMOS dissipates zero power.',
        explanation: 'Incorrect: CMOS has near-zero static power in steady state, but significant dynamic switching power.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'CMOS Dynamic Power Dissipation Formula'
  },
  {
    id: 'ece-vlsi-2',
    category: 'vlsi',
    categoryLabel: 'VLSI Design & Semiconductor Physics',
    type: 'multiple_choice',
    difficulty: 'advanced',
    title: 'Static Timing Analysis (STA): Clock Skew & Jitter',
    question: 'During Static Timing Analysis (STA) of an ASIC design, what is "Clock Skew", and when does positive clock skew between two sequential registers threaten a Hold Time violation?',
    options: [
      {
        id: 'opt-a',
        text: 'Clock Skew is the difference in clock arrival times at destination vs source flip-flops. Positive skew (clock reaches capturing register later) increases hold time vulnerability on short combinational paths.',
        explanation: 'Correct! If destination clock is delayed, data launched by source clock can race through fast combinational logic and overwrite destination input before its hold time expires.'
      },
      {
        id: 'opt-b',
        text: 'Clock Skew is the temperature variation of the quartz crystal oscillator.',
        explanation: 'Incorrect: That is frequency drift, not spatial skew across clock distribution trees.'
      },
      {
        id: 'opt-c',
        text: 'Positive skew automatically eliminates all setup time requirements.',
        explanation: 'Incorrect: It relaxes setup time on the forward path, but increases hold violation risks.'
      },
      {
        id: 'opt-d',
        text: 'Clock Skew only occurs in asynchronous ripple counters.',
        explanation: 'Incorrect: Clock distribution networks in synchronous ASICs exhibit skew due to interconnect RC delays.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Static Timing Analysis (STA) & Clock Skew Effects'
  },

  // ================= EMBEDDED SYSTEMS =================
  {
    id: 'ece-emb-1',
    category: 'embedded_systems',
    categoryLabel: 'Embedded Systems & Microcontrollers',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Communication Protocols: I2C vs SPI vs UART',
    question: 'How does the I2C (Inter-Integrated Circuit) serial communication bus differ from SPI (Serial Peripheral Interface) in terms of pin count and bus topology?',
    options: [
      {
        id: 'opt-a',
        text: 'I2C uses only 2 bidirectional lines (SDA and SCL) with open-drain pull-up resistors and 7-bit device addressing; SPI requires 4 lines (MOSI, MISO, SCK, CS/SS) with separate chip-select lines per peripheral.',
        explanation: 'Correct! I2C minimizes pin count using an open-drain shared 2-wire bus. SPI offers higher full-duplex throughput but requires dedicated Chip Select (CS) pins.'
      },
      {
        id: 'opt-b',
        text: 'I2C is an asynchronous protocol without any clock signal.',
        explanation: 'Incorrect: I2C is synchronous; SCL is the dedicated Serial Clock line.'
      },
      {
        id: 'opt-c',
        text: 'SPI uses 100 wires and only communicates across optical fibers.',
        explanation: 'Incorrect: SPI is a standard board-level 4-wire bus.'
      },
      {
        id: 'opt-d',
        text: 'I2C cannot support multiple slave devices on the same bus.',
        explanation: 'Incorrect: I2C supports up to 127 unique slave addresses on one bus.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Serial Protocols: I2C vs SPI Characteristics'
  },
  {
    id: 'ece-emb-2',
    category: 'embedded_systems',
    categoryLabel: 'Embedded Systems & Microcontrollers',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Interrupt Service Routines (ISRs) & Volatile Keyword',
    question: 'In C for microcontrollers (ARM Cortex-M / AVR), why must global variables updated inside an Interrupt Service Routine (ISR) and checked inside the main `while(1)` loop be declared with the `volatile` qualifier?',
    codeSnippet: `volatile uint8_t sensor_flag = 0;

void ISR_Timer_Handler(void) {
    sensor_flag = 1;
}

int main(void) {
    while(1) {
        if (sensor_flag) {
            process_data();
            sensor_flag = 0;
        }
    }
}`,
    options: [
      {
        id: 'opt-a',
        text: 'The `volatile` qualifier instructs the compiler optimizer NOT to cache the variable in a CPU register, forcing fresh memory reads on each loop check.',
        explanation: 'Correct! Without `volatile`, the compiler optimizer observes no modifications to `sensor_flag` inside `main()` and optimizes the `while` check into an infinite dead loop.'
      },
      {
        id: 'opt-b',
        text: '`volatile` stores the variable in non-volatile flash ROM memory.',
        explanation: 'Incorrect: `const` or flash attributes place variables in ROM; `volatile` prevents register caching.'
      },
      {
        id: 'opt-c',
        text: '`volatile` automatically prevents all race conditions without disabling interrupts.',
        explanation: 'Incorrect: `volatile` does not guarantee atomic multi-byte read/write operations.'
      },
      {
        id: 'opt-d',
        text: '`volatile` increases the clock frequency of the analog-to-digital converter.',
        explanation: 'Incorrect: C keywords do not configure peripheral hardware clocks.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Volatile Keyword & Embedded Interrupt Synchronization'
  }
];
