import { Question } from '../../types';

export const DATA_SCIENCE_QUESTIONS: Question[] = [
  // ================= PYTHON FOR DATA SCIENCE =================
  {
    id: 'ds-py-1',
    category: 'python',
    categoryLabel: 'Python for Data Science',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Pandas Vectorized Method Chaining',
    question: 'You have a transactional DataFrame `df`. Which snippet correctly and idiomatically filters for non-cancelled orders, groups by user_id, and calculates the total spend and average order quantity in a single vectorized chain?',
    codeSnippet: `import pandas as pd
# df columns: ['order_id', 'user_id', 'amount', 'qty', 'status']`,
    options: [
      {
        id: 'opt-a',
        text: 'df.query("status != \'cancelled\'").groupby("user_id").agg(total_spend=("amount", "sum"), avg_qty=("qty", "mean")).reset_index()',
        explanation: 'Correct! Named aggregation via `.agg(new_col=(src_col, func))` combined with vectorized `.query()` is the idiomatic modern Pandas pattern.'
      },
      {
        id: 'opt-b',
        text: 'df[df["status"] != "cancelled"].apply(lambda row: sum(row["amount"]))',
        explanation: 'Incorrect: apply with sum on rows does not group by user_id.'
      },
      {
        id: 'opt-c',
        text: 'for user in df["user_id"].unique(): df[df["user_id"] == user]["amount"].sum()',
        explanation: 'Incorrect: Iterating through unique IDs creates an un-vectorized O(N^2) quadratic loop.'
      },
      {
        id: 'opt-d',
        text: 'df.pivot_table(index="status", columns="user_id", values="amount")',
        explanation: 'Incorrect: Pivots status to index instead of grouping by user_id.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Pandas Named Aggregation & Query Vectorization'
  },

  // ================= SQL FOR DATA SCIENCE =================
  {
    id: 'ds-sql-1',
    category: 'sql',
    categoryLabel: 'SQL for Data Science',
    type: 'code_interpretation',
    difficulty: 'advanced',
    title: 'Cohort Retention Using CTEs & LAG',
    question: 'You are analyzing monthly recurring revenue (MRR) changes. To calculate month-over-month percentage growth for each customer tier, which window construct accesses the prior month\'s revenue?',
    codeSnippet: `SELECT 
  tier, 
  month_date, 
  revenue,
  (revenue - ____(revenue) OVER (PARTITION BY tier ORDER BY month_date)) 
    / ____(revenue) OVER (PARTITION BY tier ORDER BY month_date) AS mom_growth
FROM monthly_tier_metrics;`,
    options: [
      {
        id: 'opt-a',
        text: 'LEAD',
        explanation: 'Incorrect: LEAD accesses subsequent future rows, not prior rows.'
      },
      {
        id: 'opt-b',
        text: 'LAG',
        explanation: 'Correct! LAG(column, 1) accesses values from the previous row in the ordered partition, enabling period-over-period delta calculations.'
      },
      {
        id: 'opt-c',
        text: 'FIRST_VALUE',
        explanation: 'Incorrect: FIRST_VALUE retrieves the first row in the window frame, not the immediate predecessor.'
      },
      {
        id: 'opt-d',
        text: 'ROW_NUMBER',
        explanation: 'Incorrect: ROW_NUMBER yields an index integer, not the historical metric value.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'SQL Window Functions: LAG vs LEAD'
  },

  // ================= STATISTICS =================
  {
    id: 'ds-stat-1',
    category: 'statistics',
    categoryLabel: 'Applied Statistics & Probability',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Central Limit Theorem in Real Data',
    question: 'What is the precise statement of the Central Limit Theorem (CLT), and under what condition does it allow parametric hypothesis testing on non-normal populations?',
    options: [
      {
        id: 'opt-a',
        text: 'All raw real-world data distributions automatically become Gaussian bell curves if the database table exceeds 10,000 rows.',
        explanation: 'Incorrect: The raw population distribution does not change shape.'
      },
      {
        id: 'opt-b',
        text: 'The distribution of sample means approaches a normal distribution as sample size N grows sufficiently large (typically N >= 30), regardless of the shape of the underlying population distribution.',
        explanation: 'Correct! CLT applies strictly to the sampling distribution of the sample mean, enabling z-tests and t-tests even on skewed populations.'
      },
      {
        id: 'opt-c',
        text: 'The variance of a population decreases to zero as more samples are collected.',
        explanation: 'Incorrect: Population variance is an intrinsic fixed parameter; the standard error of the mean shrinks, not population variance.'
      },
      {
        id: 'opt-d',
        text: 'Hypothesis testing requires perfectly uniform distributions.',
        explanation: 'Incorrect: Classical tests assume normality of sample means.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Central Limit Theorem & Sampling Distributions'
  },

  // ================= DATA ANALYSIS & EDA =================
  {
    id: 'ds-analysis-1',
    category: 'data_analysis',
    categoryLabel: 'Data Analysis & Exploratory Data Analysis (EDA)',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Outlier Detection: Z-Score vs Interquartile Range (IQR)',
    question: 'When analyzing salary distributions in a large tech firm with strong right-skewness and extreme executive compensation, why should an analyst prefer Tukey\'s IQR method (Q1 - 1.5*IQR to Q3 + 1.5*IQR) over standard Z-score filtering (mean +/- 3*std)?',
    options: [
      {
        id: 'opt-a',
        text: 'Z-scores require quantum computers to calculate.',
        explanation: 'Incorrect: Z-score is standard arithmetic.'
      },
      {
        id: 'opt-b',
        text: 'The sample mean and standard deviation used in Z-scores are themselves heavily inflated and pulled by extreme outliers, masking their true presence (masking effect), whereas quartiles (Q1, Q3) are rank-based and robust.',
        explanation: 'Correct! Outliers inflate mean and variance, causing Z-scores to underestimate anomaly severity. Medians and IQRs are resilient non-parametric bounds.'
      },
      {
        id: 'opt-c',
        text: 'IQR only works on categorical variables.',
        explanation: 'Incorrect: IQR requires ordered continuous numerical data.'
      },
      {
        id: 'opt-d',
        text: 'Z-scores cannot be negative.',
        explanation: 'Incorrect: Z-scores can be negative for values below the mean.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Robust Outlier Detection: IQR vs Z-Score'
  },

  // ================= MACHINE LEARNING =================
  {
    id: 'ds-ml-1',
    category: 'machine_learning',
    categoryLabel: 'Machine Learning & Predictive Modeling',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Ensemble Learning: Bagging vs Boosting',
    question: 'What is the fundamental difference in training methodology between Random Forests (Bagging) and Gradient Boosted Trees (Boosting like XGBoost/LightGBM)?',
    options: [
      {
        id: 'opt-a',
        text: 'Random Forests train deep independent trees in parallel on bootstrap samples to reduce variance; Gradient Boosting trains shallow trees sequentially where each new tree fits the residual errors (pseudo-residuals) of the previous ensemble to reduce bias.',
        explanation: 'Correct! Bagging averages parallel independent estimators (variance reduction). Boosting optimizes sequential weak learners along the negative gradient of the loss function (bias reduction).'
      },
      {
        id: 'opt-b',
        text: 'Random Forests only work for text data, while Boosting only works for image data.',
        explanation: 'Incorrect: Both are general tabular algorithms.'
      },
      {
        id: 'opt-c',
        text: 'Gradient Boosting does not support regularization.',
        explanation: 'Incorrect: Modern boosting frameworks (XGBoost/LightGBM) incorporate L1 and L2 tree penalties.'
      },
      {
        id: 'opt-d',
        text: 'Bagging requires all trees to be identical copies.',
        explanation: 'Incorrect: Bagging introduces variance through bootstrap sampling and random feature sub-spacing.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Bagging vs Boosting Ensemble Mechanics'
  }
];
