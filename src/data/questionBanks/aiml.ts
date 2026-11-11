import { Question } from '../../types';

export const AIML_QUESTIONS: Question[] = [
  // ================= PYTHON FOR AI =================
  {
    id: 'aiml-py-1',
    category: 'python',
    categoryLabel: 'Python for AI & Numerical Computing',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'NumPy Broadcasting Mechanics',
    question: 'Given an array A of shape (4, 1) and an array B of shape (1, 5), what is the resulting shape of the arithmetic operation `A + B` in NumPy, and how does broadcasting operate?',
    codeSnippet: `import numpy as np
A = np.zeros((4, 1))
B = np.zeros((1, 5))
C = A + B
print(C.shape)`,
    options: [
      {
        id: 'opt-a',
        text: 'Shape (4, 5): Dimensions of size 1 are stretched to match the larger dimension along both axes.',
        explanation: 'Correct! According to NumPy broadcasting rules, trailing dimensions with size 1 expand to match the complementary array dimensions, yielding (4, 5).'
      },
      {
        id: 'opt-b',
        text: 'Raises a ValueError: operands could not be broadcast together with shapes (4,1) and (1,5).',
        explanation: 'Incorrect: Dimensions of size 1 are compatible for broadcasting.'
      },
      {
        id: 'opt-c',
        text: 'Shape (4, 1) because the first operand takes precedence.',
        explanation: 'Incorrect: Broadcasting expands both operands along axes of length 1.'
      },
      {
        id: 'opt-d',
        text: 'Shape (20,) flattened 1D vector.',
        explanation: 'Incorrect: Broadcasting preserves dimensionality.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'NumPy Vectorized Broadcasting Rules'
  },
  {
    id: 'aiml-py-2',
    category: 'python',
    categoryLabel: 'Python for AI & Numerical Computing',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'PyTorch Autograd & Computational Graph',
    question: 'In PyTorch, what is the role of `optimizer.zero_grad()` before executing `loss.backward()` during a standard neural network training step?',
    options: [
      {
        id: 'opt-a',
        text: 'It resets model parameters (weights and biases) back to random Gaussian initialization.',
        explanation: 'Incorrect: That would destroy training progress.'
      },
      {
        id: 'opt-b',
        text: 'PyTorch accumulates gradients by default on subsequent backward passes; zeroing gradients clears previously computed gradients from the `.grad` buffers to prevent unintended accumulation.',
        explanation: 'Correct! Gradients add up in `.grad` unless cleared with `optimizer.zero_grad()` or `model.zero_grad()`.'
      },
      {
        id: 'opt-c',
        text: 'It turns off GPU memory allocation for the backward pass.',
        explanation: 'Incorrect: Gradient buffers reside in GPU VRAM during backward calculation.'
      },
      {
        id: 'opt-d',
        text: 'It calculates the learning rate decay factor.',
        explanation: 'Incorrect: Schedulers handle learning rate decay, not zero_grad.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'PyTorch Computational Graph & Gradient Accumulation'
  },

  // ================= ARTIFICIAL INTELLIGENCE =================
  {
    id: 'aiml-ai-1',
    category: 'ai_foundations',
    categoryLabel: 'Artificial Intelligence Foundations',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'A* Search & Heuristic Admissibility',
    question: 'For the A* search algorithm to guarantee finding the optimal (shortest path) solution on a graph, what mathematical property must its heuristic function h(n) satisfy?',
    options: [
      {
        id: 'opt-a',
        text: 'The heuristic must be admissible: h(n) never overestimates the actual cost to reach the goal from node n.',
        explanation: 'Correct! An admissible heuristic h(n) <= h*(n) guarantees optimality in tree search, and consistency (monotonicity) guarantees it in graph search.'
      },
      {
        id: 'opt-b',
        text: 'The heuristic must equal the exact cost from the start node g(n).',
        explanation: 'Incorrect: g(n) is the cost from start, not the heuristic to the goal.'
      },
      {
        id: 'opt-c',
        text: 'The heuristic must always be strictly negative.',
        explanation: 'Incorrect: Heuristics must be non-negative (>= 0).'
      },
      {
        id: 'opt-d',
        text: 'The heuristic must be randomized to escape local minima.',
        explanation: 'Incorrect: Randomization breaks A* deterministic optimality.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'A* Search & Heuristic Admissibility Criteria'
  },
  {
    id: 'aiml-ai-2',
    category: 'ai_foundations',
    categoryLabel: 'Artificial Intelligence Foundations',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Minimax & Alpha-Beta Pruning',
    question: 'How does Alpha-Beta pruning optimize the standard Minimax algorithm in adversarial zero-sum game trees (e.g. Chess)?',
    options: [
      {
        id: 'opt-a',
        text: 'It reduces the depth of the search tree uniformly without calculating utility.',
        explanation: 'Incorrect: Alpha-beta maintains exact depth while eliminating branches.'
      },
      {
        id: 'opt-b',
        text: 'It prunes subtrees that are mathematically proven to not influence the final decision, potentially reducing effective branching factor from b to sqrt(b) in best-case ordering without altering the result.',
        explanation: 'Correct! Alpha-Beta pruning returns the exact same move as standard Minimax while skipping subtrees where a worse move has already been found.'
      },
      {
        id: 'opt-c',
        text: 'It converts Minimax from exponential to O(1) constant time.',
        explanation: 'Incorrect: Game tree search remains exponential in depth O(b^(d/2)).'
      },
      {
        id: 'opt-d',
        text: 'It switches from turn-based play to simultaneous play.',
        explanation: 'Incorrect: It is designed for sequential turn-based zero-sum games.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Alpha-Beta Pruning In Adversarial Search'
  },

  // ================= MACHINE LEARNING =================
  {
    id: 'aiml-ml-1',
    category: 'machine_learning',
    categoryLabel: 'Machine Learning',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Bias-Variance Tradeoff & Regularization',
    question: 'A predictive model achieves 99.8% accuracy on training data but drops to 64.2% on unseen validation data. What problem is present, and which regularization technique specifically encourages feature sparsity by driving irrelevant coefficients to absolute zero?',
    options: [
      {
        id: 'opt-a',
        text: 'High Bias (Underfitting); use a smaller neural network.',
        explanation: 'Incorrect: Near-perfect train accuracy with poor validation accuracy indicates High Variance (Overfitting).'
      },
      {
        id: 'opt-b',
        text: 'High Variance (Overfitting); apply L1 Regularization (Lasso), whose diamond-shaped constraint boundary drives less informative feature weights to zero.',
        explanation: 'Correct! High train accuracy with poor validation accuracy is overfitting. L1 (Lasso) penalty |w| enforces sparsity and performs feature selection.'
      },
      {
        id: 'opt-c',
        text: 'Data Leakage; train on validation data instead.',
        explanation: 'Incorrect: Training on validation data corrupts evaluation.'
      },
      {
        id: 'opt-d',
        text: 'Underfitting; apply L2 Ridge regularization.',
        explanation: 'Incorrect: L2 shrinks weights toward zero but does not set them exactly to zero.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Overfitting & L1 (Lasso) vs L2 (Ridge) Regularization'
  },
  {
    id: 'aiml-ml-2',
    category: 'machine_learning',
    categoryLabel: 'Machine Learning',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Classification Metrics: Precision vs Recall',
    question: 'In a cancer detection diagnostic model where false negatives (missing an actual patient with cancer) carry catastrophic life-threatening consequences, which metric must be prioritized during threshold tuning?',
    options: [
      {
        id: 'opt-a',
        text: 'Accuracy',
        explanation: 'Incorrect: Accuracy is heavily misleading in imbalanced healthcare datasets.'
      },
      {
        id: 'opt-b',
        text: 'Recall (Sensitivity) = TP / (TP + FN)',
        explanation: 'Correct! Maximizing Recall minimizes False Negatives, ensuring that actual positive cases are not missed.'
      },
      {
        id: 'opt-c',
        text: 'Precision = TP / (TP + FP)',
        explanation: 'Incorrect: High precision minimizes false alarms, but may sacrifice recall.'
      },
      {
        id: 'opt-d',
        text: 'Specificity = TN / (TN + FP)',
        explanation: 'Incorrect: Specificity focuses on healthy patients, not identifying sick patients.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Precision vs Recall Tradeoff in Imbalanced Domains'
  },

  // ================= DEEP LEARNING =================
  {
    id: 'aiml-dl-1',
    category: 'deep_learning',
    categoryLabel: 'Deep Learning & Neural Architectures',
    type: 'multiple_choice',
    difficulty: 'advanced',
    title: 'Vanishing Gradients & Activation Functions',
    question: 'Why did deep neural networks suffer severely from the vanishing gradient problem when using Sigmoid or Tanh activations across many hidden layers, and how does ReLU resolve this?',
    options: [
      {
        id: 'opt-a',
        text: 'Sigmoid has a maximum derivative of 0.25; chaining multiple layers through the backpropagation chain rule multiplies fractions (< 1), causing earlier layer gradients to decay exponentially to near zero. ReLU has a constant derivative of 1 for positive inputs.',
        explanation: 'Correct! The product of numbers <= 0.25 vanishes rapidly across deep layers. ReLU maintains a gradient of 1 for x > 0, preventing exponential decay.'
      },
      {
        id: 'opt-b',
        text: 'Sigmoid requires GPU hardware, while ReLU runs in CPU registers.',
        explanation: 'Incorrect: Both activations run on CPU and GPU.'
      },
      {
        id: 'opt-c',
        text: 'ReLU eliminates the need for backpropagation entirely.',
        explanation: 'Incorrect: ReLU networks still train using backpropagation.'
      },
      {
        id: 'opt-d',
        text: 'Sigmoid functions cannot handle negative numbers.',
        explanation: 'Incorrect: Sigmoid accepts all real numbers from -infinity to +infinity.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Vanishing Gradient Problem & Activation Function Derivatives'
  },
  {
    id: 'aiml-dl-2',
    category: 'deep_learning',
    categoryLabel: 'Deep Learning & Neural Architectures',
    type: 'code_interpretation',
    difficulty: 'advanced',
    title: 'Transformer Architecture: Scaled Dot-Product Attention',
    question: 'In the Transformer Attention formula `Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V`, why is the dot-product divided by the scaling factor `sqrt(d_k)`?',
    options: [
      {
        id: 'opt-a',
        text: 'For large values of d_k, the dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients; dividing by sqrt(d_k) counteracts this effect.',
        explanation: 'Correct! Without scaling, the variance of the dot product is d_k. High magnitudes push softmax to saturate with near-zero gradients.'
      },
      {
        id: 'opt-b',
        text: 'It normalizes token vectors into RGB image pixels.',
        explanation: 'Incorrect: d_k is the key dimension, unrelated to pixel encoding.'
      },
      {
        id: 'opt-c',
        text: 'It enforces causal masking for autoregressive generation.',
        explanation: 'Incorrect: Causal masking is achieved by adding -infinity to future positions before softmax.'
      },
      {
        id: 'opt-d',
        text: 'It eliminates the need for value vectors V.',
        explanation: 'Incorrect: V contains the values aggregated by attention weights.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Scaled Dot-Product Attention & Softmax Saturation'
  }
];
