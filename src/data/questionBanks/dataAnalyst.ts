import { Question } from '../../types';

export const DATA_ANALYST_QUESTIONS: Question[] = [
  // ================= SQL (3 questions) =================
  {
    id: 'da-sql-1',
    category: 'sql',
    categoryLabel: 'SQL & Relational Databases',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Customer Retention & JOIN Behavior',
    question: 'A marketing team wants a list of ALL registered users and the date of their most recent purchase. Users who have registered but never made a purchase should still appear with a NULL purchase date. Which query correctly achieves this without dropping zero-purchase users?',
    codeSnippet: `-- Schema:
-- users (id, name, signup_date)
-- orders (id, user_id, order_date, amount)`,
    options: [
      {
        id: 'opt-a',
        text: 'SELECT u.name, MAX(o.order_date) FROM users u INNER JOIN orders o ON u.id = o.user_id GROUP BY u.name;',
        explanation: 'Incorrect: INNER JOIN excludes users who have never placed an order because they have no matching record in orders.'
      },
      {
        id: 'opt-b',
        text: 'SELECT u.name, MAX(o.order_date) AS latest_order FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;',
        explanation: 'Correct! LEFT JOIN preserves all rows from users, filling unmatched order fields with NULL, and MAX(order_date) correctly computes the latest date.'
      },
      {
        id: 'opt-c',
        text: 'SELECT u.name, o.order_date FROM users u RIGHT JOIN orders o ON u.id = o.user_id WHERE o.order_date IS NULL;',
        explanation: 'Incorrect: RIGHT JOIN keeps all orders, and filtering where order_date IS NULL will return empty results if order_date is not null.'
      },
      {
        id: 'opt-d',
        text: 'SELECT u.name, o.order_date FROM users u FULL OUTER JOIN orders o ON u.id = o.user_id WHERE u.signup_date IS NOT NULL;',
        explanation: 'Incorrect: This does not group by user and will return duplicate rows for users with multiple orders instead of the latest order.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'LEFT JOIN vs INNER JOIN with Aggregation'
  },
  {
    id: 'da-sql-2',
    category: 'sql',
    categoryLabel: 'SQL & Relational Databases',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Filtering Aggregated Results: HAVING vs WHERE',
    question: 'You need to find all product categories that generated more than $50,000 in total revenue during Q3. Where should the condition `SUM(price * quantity) > 50000` be placed?',
    options: [
      {
        id: 'opt-a',
        text: 'In the WHERE clause before GROUP BY',
        explanation: 'Incorrect: The WHERE clause filters individual rows before grouping and cannot evaluate aggregate functions like SUM().'
      },
      {
        id: 'opt-b',
        text: 'In the HAVING clause after GROUP BY',
        explanation: 'Correct! The HAVING clause is evaluated after aggregation (GROUP BY), allowing conditions based on aggregate values like SUM() or COUNT().'
      },
      {
        id: 'opt-c',
        text: 'In the ORDER BY clause',
        explanation: 'Incorrect: ORDER BY controls sort direction, not filtering.'
      },
      {
        id: 'opt-d',
        text: 'Inside the SELECT statement as an inline CASE WHEN expression only',
        explanation: 'Incorrect: CASE WHEN can label rows, but will not eliminate categories with < $50k from the returned result set.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'SQL Execution Order & HAVING Clause'
  },
  {
    id: 'da-sql-3',
    category: 'sql',
    categoryLabel: 'SQL & Relational Databases',
    type: 'code_interpretation',
    difficulty: 'advanced',
    title: 'Ranking Customers with Window Functions',
    question: 'You want to assign a rank to each salesperson based on their total sales within their respective sales department. If two salespeople in the same department have identical total sales ($100k), they should share rank 1, and the next salesperson should be ranked 3 (skipping rank 2). Which window function must you use?',
    codeSnippet: `SELECT 
  department_id,
  salesperson_id,
  total_sales,
  ____() OVER (PARTITION BY department_id ORDER BY total_sales DESC) AS sales_rank
FROM sales_summary;`,
    options: [
      {
        id: 'opt-a',
        text: 'ROW_NUMBER()',
        explanation: 'Incorrect: ROW_NUMBER() assigns distinct sequential integers (1, 2, 3...) regardless of ties.'
      },
      {
        id: 'opt-b',
        text: 'DENSE_RANK()',
        explanation: 'Incorrect: DENSE_RANK() does not skip numbers after ties (tied at 1, next is 2).'
      },
      {
        id: 'opt-c',
        text: 'RANK()',
        explanation: 'Correct! RANK() assigns the same rank to identical values and skips subsequent ranks (e.g. 1, 1, 3).'
      },
      {
        id: 'opt-d',
        text: 'NTILE(3)',
        explanation: 'Incorrect: NTILE divides rows into buckets/quantiles, not rank numbering.'
      }
    ],
    correctOptionId: 'opt-c',
    points: 10,
    conceptTested: 'Window Functions: RANK vs DENSE_RANK vs ROW_NUMBER'
  },

  // ================= PYTHON (3 questions) =================
  {
    id: 'da-py-1',
    category: 'python',
    categoryLabel: 'Python for Data Analysis',
    type: 'code_interpretation',
    difficulty: 'intermediate',
    title: 'Vectorized Pandas Missing Value Imputation',
    question: 'You are preparing a customer dataset in Pandas. The `income` column has missing values (NaN). You want to replace missing incomes with the median income of each customer\'s specific `city`, not the global median. Which approach achieves this idiomatically and vectorially?',
    codeSnippet: `import pandas as pd
df = pd.DataFrame({
  'city': ['NYC', 'NYC', 'SFO', 'SFO', 'SFO'],
  'income': [95000, None, 130000, None, 110000]
})`,
    options: [
      {
        id: 'opt-a',
        text: 'df["income"] = df["income"].fillna(df["income"].median())',
        explanation: 'Incorrect: This replaces NaN with the single global median across all cities, ignoring city-specific distributions.'
      },
      {
        id: 'opt-b',
        text: 'df["income"] = df.groupby("city")["income"].transform(lambda x: x.fillna(x.median()))',
        explanation: 'Correct! `transform` computes the group-level median and aligns the output back to the original index shape for seamless imputation.'
      },
      {
        id: 'opt-c',
        text: 'for i, row in df.iterrows(): if pd.isna(row["income"]): row["income"] = 50000',
        explanation: 'Incorrect: iterrows() is extremely slow in Pandas and modifying row variables does not mutate the DataFrame in-place.'
      },
      {
        id: 'opt-d',
        text: 'df["income"] = df.dropna(subset=["income"])',
        explanation: 'Incorrect: dropna deletes the rows entirely instead of imputing missing values.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Pandas Groupby Transform & Imputation'
  },
  {
    id: 'da-py-2',
    category: 'python',
    categoryLabel: 'Python for Data Analysis',
    type: 'code_interpretation',
    difficulty: 'beginner',
    title: 'Boolean Indexing & Operator Precedence',
    question: 'Examine the following Pandas snippet intended to filter for active users who are either in tier "Gold" or have spent over $1,000. Why does this snippet raise a `TypeError` or unexpected result?',
    codeSnippet: `active_high_value = df[df['status'] == 'active' & df['tier'] == 'Gold' | df['spent'] > 1000]`,
    options: [
      {
        id: 'opt-a',
        text: 'Pandas does not support the `&` and `|` operators on Series.',
        explanation: 'Incorrect: Pandas does support bitwise `&` and `|` for element-wise boolean operations.'
      },
      {
        id: 'opt-b',
        text: 'In Python, bitwise operators (&, |) have higher precedence than comparison operators (==, >), so parentheses `(...)` are mandatory around each condition.',
        explanation: 'Correct! Without parentheses like `(df["status"] == "active") & ...`, Python attempts to evaluate `\'active\' & df[\'tier\']` first, causing a TypeError.'
      },
      {
        id: 'opt-c',
        text: 'Column names must always be accessed via dot notation `df.status`.',
        explanation: 'Incorrect: Bracket notation `df[\'status\']` is standard and preferred.'
      },
      {
        id: 'opt-d',
        text: 'You must use the English words `and` and `or` instead of `&` and `|`.',
        explanation: 'Incorrect: `and` and `or` evaluate truth value of the whole Series object, which raises a ValueError in Pandas.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Pandas Vectorized Boolean Indexing Precedence'
  },
  {
    id: 'da-py-3',
    category: 'python',
    categoryLabel: 'Python for Data Analysis',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Efficient Data Structure for Analytics Lookup',
    question: 'You have a list of 2,000,000 transaction records and a reference list of 50,000 blacklisted merchant IDs. For each transaction, you must check whether its merchant is blacklisted. Which data structure should you use to store the blacklisted IDs for optimal runtime performance?',
    options: [
      {
        id: 'opt-a',
        text: 'A Python list: `merchant in blacklist_list`',
        explanation: 'Incorrect: Searching in a list takes O(N) linear time per lookup, leading to 2M * 50K = 100 billion operations.'
      },
      {
        id: 'opt-b',
        text: 'A Python set or dictionary: `merchant in blacklist_set`',
        explanation: 'Correct! Sets and dictionaries use hash tables with O(1) average lookup time, completing the 2 million checks in milliseconds.'
      },
      {
        id: 'opt-c',
        text: 'A Python tuple: `merchant in blacklist_tuple`',
        explanation: 'Incorrect: Tuples, like lists, have O(N) sequential search time.'
      },
      {
        id: 'opt-d',
        text: 'Sorting the list every time a check is executed',
        explanation: 'Incorrect: Sorting takes O(N log N) which is computationally prohibitive.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Time Complexity & Hash Table Lookups'
  },

  // ================= STATISTICS (3 questions) =================
  {
    id: 'da-stat-1',
    category: 'statistics',
    categoryLabel: 'Statistics & Probability',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Interpreting A/B Test P-Values',
    question: 'Your e-commerce team runs an A/B test on a new checkout button. The test yields a conversion lift with a p-value of p = 0.03 relative to the null hypothesis (alpha = 0.05). What is the technically correct interpretation of this result?',
    options: [
      {
        id: 'opt-a',
        text: 'There is a 97% probability that the new checkout button is genuinely better.',
        explanation: 'Incorrect: A p-value is NOT the probability that the alternative hypothesis is true (a very common fallacy).'
      },
      {
        id: 'opt-b',
        text: 'If there were actually no difference between the buttons (null hypothesis is true), there is only a 3% probability of observing a lift this large or larger purely by random chance.',
        explanation: 'Correct! The p-value measures the probability of observing data at least as extreme as what was obtained, assuming the null hypothesis holds.'
      },
      {
        id: 'opt-c',
        text: 'The new button will increase revenue by exactly 3% in production.',
        explanation: 'Incorrect: The p-value indicates statistical significance, not the effect size or business magnitude.'
      },
      {
        id: 'opt-d',
        text: 'There is a 3% chance the experiment was compromised by technical bugs.',
        explanation: 'Incorrect: The p-value has nothing to do with software bugs.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Hypothesis Testing & P-Value Definition'
  },
  {
    id: 'da-stat-2',
    category: 'statistics',
    categoryLabel: 'Statistics & Probability',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Skewed Distributions & Central Tendency',
    question: 'You analyze annual order values for 100,000 retail customers. 98% of customers spend between $20 and $200, while a handful of enterprise bulk buyers spend over $500,000 each. Which combination of central tendency and dispersion metrics best represents the "typical" customer experience to management?',
    options: [
      {
        id: 'opt-a',
        text: 'Mean and Standard Deviation',
        explanation: 'Incorrect: The arithmetic mean and standard deviation are heavily distorted by extreme outliers (the $500k bulk buyers).'
      },
      {
        id: 'opt-b',
        text: 'Median and Interquartile Range (IQR)',
        explanation: 'Correct! The median (50th percentile) and IQR (75th - 25th percentile) are robust against extreme right-tail skewness and represent typical consumers.'
      },
      {
        id: 'opt-c',
        text: 'Mode and Range',
        explanation: 'Incorrect: The mode only captures the most frequent exact cent, and the range is completely determined by the single largest outlier.'
      },
      {
        id: 'opt-d',
        text: 'Standard Error of the Mean only',
        explanation: 'Incorrect: Standard error reflects sampling variance of the mean, not the customer spend distribution shape.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Robust Statistics for Skewed Data'
  },
  {
    id: 'da-stat-3',
    category: 'statistics',
    categoryLabel: 'Statistics & Probability',
    type: 'multiple_choice',
    difficulty: 'advanced',
    title: 'Confounding Variables & Simpson\'s Paradox',
    question: 'When aggregated overall, University Department A accepts a lower percentage of female applicants than male applicants. However, when examining each academic program individually, female applicants have higher acceptance rates than male applicants in EVERY single program. What statistical phenomenon explains this, and what is the underlying cause?',
    options: [
      {
        id: 'opt-a',
        text: 'Berkson\'s Paradox, caused by sampling only accepted candidates.',
        explanation: 'Incorrect: Berkson\'s fallacy relates to selection bias in hospital/conditioned samples.'
      },
      {
        id: 'opt-b',
        text: 'Simpson\'s Paradox, caused by a confounding variable (e.g., female candidates applied disproportionately to highly competitive programs with low overall acceptance rates).',
        explanation: 'Correct! Simpson\'s Paradox occurs when a trend appearing in groups reverses when groups are pooled, caused by an unadjusted confounder (program competitiveness).'
      },
      {
        id: 'opt-c',
        text: 'The Gambler\'s Fallacy, caused by evaluators compensating for prior decisions.',
        explanation: 'Incorrect: Gambler\'s fallacy involves assuming independent probabilities are self-correcting.'
      },
      {
        id: 'opt-d',
        text: 'Regression to the Mean, caused by natural variation across admissions cycles.',
        explanation: 'Incorrect: This is a compositional weighting artifact, not regression to the mean.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Simpson\'s Paradox & Confounding Variables'
  },

  // ================= EXCEL (2 questions) =================
  {
    id: 'da-xl-1',
    category: 'excel',
    categoryLabel: 'Advanced Excel & Spreadsheets',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Modern Lookups: XLOOKUP vs VLOOKUP',
    question: 'Why has modern enterprise analytics increasingly adopted `XLOOKUP` over legacy `VLOOKUP` for spreadsheet models?',
    options: [
      {
        id: 'opt-a',
        text: 'XLOOKUP can search to the left of the lookup column and does not break when columns are inserted or deleted.',
        explanation: 'Correct! VLOOKUP requires a hardcoded column index integer and cannot look left without helper columns. XLOOKUP uses direct range references, making it resilient to structural sheet edits.'
      },
      {
        id: 'opt-b',
        text: 'VLOOKUP can only handle up to 256 rows of data.',
        explanation: 'Incorrect: VLOOKUP works across all 1,048,576 rows in Excel.'
      },
      {
        id: 'opt-c',
        text: 'XLOOKUP automatically converts data into SQL code.',
        explanation: 'Incorrect: XLOOKUP is an Excel formula, not an automated SQL generator.'
      },
      {
        id: 'opt-d',
        text: 'XLOOKUP only works if the lookup array is sorted in ascending alphabetical order.',
        explanation: 'Incorrect: XLOOKUP defaults to an exact match without requiring sorted data.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'XLOOKUP Architecture & Range Referencing'
  },
  {
    id: 'da-xl-2',
    category: 'excel',
    categoryLabel: 'Advanced Excel & Spreadsheets',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Pivot Table Distinct Counts vs Total Counts',
    question: 'You have a table of 10,000 order line items. A single customer may appear on multiple rows if they bought multiple items. When building a Pivot Table by region, adding the `CustomerID` field to the Values area defaults to `Count of CustomerID` (giving 10,000). To find how many unique individual customers purchased per region, what must you do?',
    options: [
      {
        id: 'opt-a',
        text: 'Manually delete all duplicate rows from the source transaction table before building the pivot.',
        explanation: 'Incorrect: Deleting rows destroys item-level revenue and quantity data.'
      },
      {
        id: 'opt-b',
        text: 'When creating the Pivot Table, check "Add this data to the Data Model", then select "Distinct Count" as the Value Field Setting.',
        explanation: 'Correct! Enabling the Excel Data Model (PowerPivot engine) unlocks the "Distinct Count" aggregation function in Pivot Tables.'
      },
      {
        id: 'opt-c',
        text: 'Change the number format of the field from Currency to General.',
        explanation: 'Incorrect: Number formatting only changes display appearance, not aggregation logic.'
      },
      {
        id: 'opt-d',
        text: 'Use conditional formatting to color duplicates red.',
        explanation: 'Incorrect: Highlighting colors does not aggregate unique numbers.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Excel Data Model & Distinct Count Aggregations'
  },

  // ================= DATA VISUALIZATION (2 questions) =================
  {
    id: 'da-viz-1',
    category: 'data_viz',
    categoryLabel: 'Data Visualization & BI',
    type: 'multiple_choice',
    difficulty: 'intermediate',
    title: 'Selecting Visual Encoded Charts',
    question: 'You want to display how customer support response times (in minutes) are distributed across 5 different product tiers, showing the median, spread, and any potential extreme outlier tickets. Which chart is most effective for this purpose?',
    options: [
      {
        id: 'opt-a',
        text: 'A 3D Pie Chart',
        explanation: 'Incorrect: Pie charts cannot show distributions, and 3D perspectives distort angles and accurate perception.'
      },
      {
        id: 'opt-b',
        text: 'A Stacked 100% Bar Chart',
        explanation: 'Incorrect: Stacked bars show percentage shares of categories, not continuous distribution spreads and medians.'
      },
      {
        id: 'opt-c',
        text: 'A Box Plot (or Violin Plot)',
        explanation: 'Correct! Box plots explicitly encode median, interquartile range (IQR), min/max whiskers, and individual outlier points across categories.'
      },
      {
        id: 'opt-d',
        text: 'A Donut Chart with glowing shadows',
        explanation: 'Incorrect: Donut charts only show proportions of a whole.'
      }
    ],
    correctOptionId: 'opt-c',
    points: 10,
    conceptTested: 'Chart Selection for Continuous Distributions'
  },
  {
    id: 'da-viz-2',
    category: 'data_viz',
    categoryLabel: 'Data Visualization & BI',
    type: 'data_scenario',
    difficulty: 'beginner',
    title: 'Detecting Misleading Visual Representations',
    question: 'A dashboard presentation displays a bar chart comparing company revenue ($99.2M) against a competitor ($98.1M). The company\'s bar appears three times taller than the competitor\'s bar. What design defect causes this deceptive perception?',
    options: [
      {
        id: 'opt-a',
        text: 'The vertical Y-axis has been truncated (baseline does not start at zero), exaggerating a minor 1.1% difference into a 300% visual discrepancy.',
        explanation: 'Correct! Bar lengths encode quantitative value. Truncating the baseline away from zero misleads viewers into perceiving length differences that do not represent proportions.'
      },
      {
        id: 'opt-b',
        text: 'The chart used a sans-serif font instead of serif font.',
        explanation: 'Incorrect: Font choice does not manipulate proportional heights.'
      },
      {
        id: 'opt-c',
        text: 'The bars were oriented vertically instead of horizontally.',
        explanation: 'Incorrect: Orientation does not distort the ratio if the zero-baseline is respected.'
      },
      {
        id: 'opt-d',
        text: 'The chart should have been a word cloud.',
        explanation: 'Incorrect: Word clouds are for text frequency, not numerical revenue.'
      }
    ],
    correctOptionId: 'opt-a',
    points: 10,
    conceptTested: 'Visual Integrity & Truncated Axes'
  },

  // ================= PROJECT EXPERIENCE & PROBLEM SOLVING (2 questions) =================
  {
    id: 'da-proj-1',
    category: 'project_exp',
    categoryLabel: 'Applied Projects & Problem Solving',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Investigating Dirty Data Anomalies',
    question: 'While conducting an exploratory data analysis (EDA) on an e-commerce shipping dataset of 500,000 orders, you discover that in 12% of records, the `shipped_date` is earlier than the `order_placed_date` (e.g., ordered on March 5, shipped on March 1). What is the professional first step a data analyst should take?',
    options: [
      {
        id: 'opt-a',
        text: 'Quietly delete all 60,000 problematic records without mentioning it in your report.',
        explanation: 'Incorrect: Silently dropping 12% of data introduces massive bias and conceals systemic operational or logging bugs.'
      },
      {
        id: 'opt-b',
        text: 'Invert the dates programmatically using an IF condition without investigating root causes.',
        explanation: 'Incorrect: Inverting dates blindly assumes a specific bug that might not be true (e.g. timezone mismatch, return order vs initial order).'
      },
      {
        id: 'opt-c',
        text: 'Isolate the anomaly, quantify its frequency across carriers/warehouses, check for timezone or UTC/local conversion bugs, and document the finding for data engineering.',
        explanation: 'Correct! Professional analysts isolate anomalies, inspect potential root causes (e.g., timezone offsets, pre-orders, warehouse scan bugs), and flag them to upstream owners.'
      },
      {
        id: 'opt-d',
        text: 'Conclude that your company possesses a time machine.',
        explanation: 'Incorrect: A humorous misconception, not a professional engineering approach.'
      }
    ],
    correctOptionId: 'opt-c',
    points: 10,
    conceptTested: 'Data Hygiene, Anomaly Investigation, & Upstream Triage'
  },
  {
    id: 'da-proj-2',
    category: 'project_exp',
    categoryLabel: 'Applied Projects & Problem Solving',
    type: 'data_scenario',
    difficulty: 'intermediate',
    title: 'Translating Vague Business Questions into Metrics',
    question: 'The VP of Marketing says: "Our mobile app users seem disengaged lately. Can you analyze why?" As a data analyst intern, how do you best translate this ambiguous request into an actionable analytics project?',
    options: [
      {
        id: 'opt-a',
        text: 'Immediately pull all tables into Python and train a deep neural network.',
        explanation: 'Incorrect: Premature machine learning without defined KPIs or targets is a classic junior trap.'
      },
      {
        id: 'opt-b',
        text: 'Define quantifiable engagement proxy metrics (e.g., DAU/MAU ratio, session duration, 7-day retention by cohort), validate trends against recent app releases, and segment by user tenure.',
        explanation: 'Correct! Effective analysts operationalize vague business intuition into concrete, trackable telemetry metrics and cohort segmentations.'
      },
      {
        id: 'opt-c',
        text: 'Tell the VP that engagement cannot be measured with data.',
        explanation: 'Incorrect: User engagement is standardly measured via product analytics telemetry.'
      },
      {
        id: 'opt-d',
        text: 'Email 10 random app users asking what they think.',
        explanation: 'Incorrect: While user research is valuable, an analyst\'s primary role is analyzing quantitative telemetry data across the full user base.'
      }
    ],
    correctOptionId: 'opt-b',
    points: 10,
    conceptTested: 'Translating Business Needs into Product Analytics Metrics'
  }
];
