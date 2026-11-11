import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { generatePersonalizedFallbackRoadmap } from '../src/data/fallbackRoadmaps';

export const apiRouter = Router();

// Initialize Gemini client (picks up GEMINI_API_KEY from process.env)
const getGeminiClient = () => {
  try {
    return new GoogleGenAI();
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI:', err);
    return null;
  }
};

apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Generate Personalized Learning Roadmap using Gemini
apiRouter.post('/ai/roadmap', async (req: Request, res: Response) => {
  try {
    const { studentProfile, assessmentResult, roleBenchmark } = req.body;

    if (!assessmentResult || !assessmentResult.skillScores) {
      return res.status(400).json({ error: 'Assessment result data is required' });
    }

    const ai = getGeminiClient();

    // Context for prompt using real student data
    const skillsBreakdown = Object.entries(assessmentResult.skillScores)
      .map(([skill, data]: [string, any]) => `- ${skill.toUpperCase().replace(/_/g, ' ')}: Score ${data.score}% (${data.level}) | Benchmark Target: ${roleBenchmark?.skills?.[skill]?.targetScore || 70}%`)
      .join('\n');

    const strengths = (assessmentResult.strengths || []).join(', ');
    const gaps = (assessmentResult.priorityGaps || []).map((g: any) => typeof g === 'string' ? g : g.skillName || g.skill).join(', ');
    const targetRole = assessmentResult.roleTitle || roleBenchmark?.title || 'Software Development Engineer';
    const branchName = studentProfile?.branch || assessmentResult.branchId || roleBenchmark?.branchName || 'Engineering';

    const prompt = `You are a Senior Engineering Director and Campus Placement Career Mentor for university engineering students.
You are generating a personalized, actionable 30-Day, 60-Day, and 90-Day placement preparation roadmap for a student named ${studentProfile?.displayName || 'Student'}, majoring in ${branchName} at ${studentProfile?.university || 'University'}.

TARGET CAREER TRACK: ${targetRole}
ACTUAL VERIFIED STUDENT ASSESSMENT DATA:
${skillsBreakdown}

IDENTIFIED EXISTING SKILLS / STRENGTHS:
${strengths || 'Solid foundational engineering coursework'}

HIGHEST PRIORITY SKILL GAPS:
${gaps || 'Core foundational problem solving and system analysis'}

OVERALL SKILL-MATCH SCORE: ${assessmentResult.overallScore}%

CRITICAL INSTRUCTIONS:
1. Divide the preparation journey across 3 distinct phases:
   - 30-Day Sprint (Phase: "30-day"): Foundational mastery and rapid elimination of priority gaps (Weeks 1 to 4).
   - 60-Day Mid-Term (Phase: "60-day"): Advanced domain systems, practical toolchain, and portfolio project construction (Weeks 5 to 8).
   - 90-Day Placement Ready (Phase: "90-day"): Full campus recruitment mastery, timed mock rounds, system design/architecture, and comprehensive revision (Weeks 9 to 12).
2. For each weekly module, provide:
   - "phase": "30-day" | "60-day" | "90-day"
   - "weekNumber": Integer from 1 to 12
   - "title": Concise, motivating title
   - "focusSkill": Target skill
   - "objectives": 2-3 specific learning topics
   - "handsOnTasks": 2 practical hands-on exercises/assignments with specific tools/code
   - "revisionTasks": 2 specific revision/audit tasks to retain previously learned concepts
   - "projectRecommendation": { "title": "Project Name", "description": "Concise technical description", "tools": ["Tool1", "Tool2"] }
   - "learningMilestone": Verifiable outcome
   - "estimatedHours": 8 to 12 hours
3. Provide 3 "portfolioProjects" (one for each 30, 60, and 90 day milestone) relevant to ${targetRole} and ${branchName}.
4. Provide "gapExplanations" using beginner-friendly analogies and actionable practice routines.
5. Do NOT fabricate fake URLs. Refer to reputable platforms (LeetCode, GitHub, IEEE, official docs).

RETURN STRICTLY A VALID JSON OBJECT MATCHING THIS EXACT SCHEMA (no markdown code blocks, just raw JSON):
{
  "overview": "A 2-3 sentence encouraging diagnostic summary of their readiness and placement strategy for ${targetRole}.",
  "thirtyDayGoal": "Clear, actionable goal for the 30-day sprint (foundation & priority gaps).",
  "sixtyDayGoal": "Clear goal for 60 days (intermediate domain systems & project implementation).",
  "ninetyDayGoal": "Clear goal for 90 days (full placement readiness, mock interview fluency & revision).",
  "weeklyPlan": [
    {
      "weekNumber": 1,
      "phase": "30-day",
      "title": "Week Title",
      "focusSkill": "Skill Name",
      "objectives": ["Learning Topic 1", "Learning Topic 2"],
      "handsOnTasks": ["Practical Assignment 1", "Practical Assignment 2"],
      "revisionTasks": ["Revision Task 1", "Revision Task 2"],
      "projectRecommendation": {
        "title": "Project Name",
        "description": "Project Description",
        "tools": ["Tool 1", "Tool 2"]
      },
      "learningMilestone": "Verifiable outcome",
      "estimatedHours": 10
    }
  ],
  "portfolioProjects": [
    {
      "title": "Project Title",
      "phase": "30-day",
      "targetGaps": ["Skill Gap 1", "Skill Gap 2"],
      "problemStatement": "Clear 2-sentence technical problem",
      "toolsUsed": ["Tools / Languages / Frameworks"],
      "deliverables": ["Deliverable 1", "Deliverable 2"],
      "datasetSuggestion": "Suggested open benchmark, simulator, or dataset"
    }
  ],
  "gapExplanations": [
    {
      "skill": "Skill name",
      "plainEnglishExplanation": "Intuitive beginner analogy",
      "whyItMattersInRole": "Why hiring teams evaluate this",
      "fastestWayToMaster": "Practical 3-step practice routine"
    }
  ]
}`;

    if (!process.env.GEMINI_API_KEY) {
      const fallback = generatePersonalizedFallbackRoadmap(assessmentResult, roleBenchmark, studentProfile);
      return res.json({ ...fallback, _meta: { isFallback: true, reason: 'no_api_key' } });
    }

    // Enforce strict 18s timeout on Gemini API call to guarantee fast response
    const GEMINI_TIMEOUT_MS = 18000;
    let timerId: NodeJS.Timeout;
    const timeoutPromise = new Promise((_, reject) => {
      timerId = setTimeout(() => {
        reject(new Error('GEMINI_TIMEOUT_EXCEEDED'));
      }, GEMINI_TIMEOUT_MS);
    });

    try {
      const response = await Promise.race([
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4
          }
        }),
        timeoutPromise
      ]) as any;

      clearTimeout(timerId!);

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        res.json(parsed);
      } catch {
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        res.json(parsed);
      }
    } catch (genError: any) {
      clearTimeout(timerId!);
      console.warn('Gemini generation failed or timed out:', genError?.message || genError);
      const fallback = generatePersonalizedFallbackRoadmap(assessmentResult, roleBenchmark, studentProfile);
      res.json({
        ...fallback,
        _meta: {
          isFallback: true,
          reason: genError?.message === 'GEMINI_TIMEOUT_EXCEEDED' ? 'timeout' : 'error',
          notice: genError?.message === 'GEMINI_TIMEOUT_EXCEEDED'
            ? 'Gemini response exceeded 18s threshold. Generated using verified placement diagnostic rules.'
            : 'Gemini service error. Generated using verified placement diagnostic rules.'
        }
      });
    }
  } catch (error: any) {
    console.error('Error generating AI roadmap:', error?.message || error);
    const fallback = generatePersonalizedFallbackRoadmap(req.body?.assessmentResult, req.body?.roleBenchmark, req.body?.studentProfile);
    res.json({
      ...fallback,
      _meta: {
        isFallback: true,
        reason: 'server_exception'
      }
    });
  }
});

// Interactive Mock Interview Turn using Gemini
apiRouter.post('/ai/interview', async (req: Request, res: Response) => {
  try {
    const { roleId, targetRole, studentName, conversationHistory, userMessage, assessmentGaps } = req.body;

    const ai = getGeminiClient();

    const gapsList = (assessmentGaps || []).join(', ');
    const historyFormatted = (conversationHistory || [])
      .map((m: any) => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
      .join('\n');

    const roleName = targetRole || 'Software Development Engineer';

    const prompt = `You are Sarah, a Principal Engineering Lead conducting a technical campus placement screening interview for a ${roleName} position.
The candidate is ${studentName || 'the student'}.
Based on their prior technical assessment, their known improvement areas are: ${gapsList || 'Core domain fundamentals'}.

INTERVIEW GOALS:
- Be encouraging, professional, and realistic like a top engineering placement interviewer.
- Ask practical scenario-based questions tailored specifically to ${roleName} (e.g. for SDE ask about system bottlenecks or data structure tradeoffs; for AI/ML ask about bias-variance or backprop; for ECE ask about timing closure; for Mechanical ask about thermal cycles; for Civil ask about beam limit states).
- Evaluate their last response: provide a concise, constructive coaching tip (what was good, what could be clearer using the STAR method or specific technical nuance).
- Then ask the next natural follow-up question.
- After 4-5 turns or if the candidate explicitly requests concluding, mark "isCompleted": true and provide an overall evaluation score (0-100) and final feedback.

CONVERSATION SO FAR:
${historyFormatted}

CANDIDATE'S LATEST MESSAGE:
"${userMessage}"

RESPOND WITH RAW JSON ONLY (no markdown fences) matching this structure:
{
  "interviewerReply": "Interviewer's spoken response and next question",
  "coachingTip": "Quick constructive advice on the candidate's last answer (strengths & improvement areas)",
  "isCompleted": false,
  "readinessScore": 75,
  "overallSummary": "Optional final summary if completed"
}`;

    if (!process.env.GEMINI_API_KEY) {
      return res.json(generateFallbackInterviewResponse(userMessage, conversationHistory, roleName));
    }

    // Strict 15s server timeout for mock interview
    const INTERVIEW_TIMEOUT_MS = 15000;
    let timerId: NodeJS.Timeout;
    const timeoutPromise = new Promise((_, reject) => {
      timerId = setTimeout(() => reject(new Error('INTERVIEW_TIMEOUT_EXCEEDED')), INTERVIEW_TIMEOUT_MS);
    });

    try {
      const response = await Promise.race([
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.6
          }
        }),
        timeoutPromise
      ]) as any;

      clearTimeout(timerId!);
      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        res.json(parsed);
      } catch {
        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        res.json(JSON.parse(cleaned));
      }
    } catch (genError) {
      clearTimeout(timerId!);
      console.warn('Gemini interview generation timed out or failed, serving verified fallback:', genError);
      res.json(generateFallbackInterviewResponse(userMessage, conversationHistory, roleName));
    }
  } catch (error: any) {
    console.error('Error in mock interview:', error);
    res.json(generateFallbackInterviewResponse(req.body.userMessage, req.body.conversationHistory, req.body.targetRole));
  }
});

// Explain individual skill gap in depth
apiRouter.post('/ai/explain-gap', async (req: Request, res: Response) => {
  const { skillName, currentScore, roleTitle } = req.body;
  const fallbackGap = {
    analogy: `Think of ${skillName || 'this concept'} like calibrating a measurement gauge: without standard precision, small foundational errors compound into massive defects down the pipeline.`,
    workplaceContext: `In production engineering and campus hiring teams, ${skillName || 'this competency'} is tested to evaluate whether a candidate writes reliable, maintainable code rather than trial-and-error scripts.`,
    commonPitfall: `Attempting advanced implementations without validating fundamental edge cases and boundary inputs.`,
    threeDaySprint: [
      `Day 1: Master core theoretical syntax and solve 5 focused benchmark problems.`,
      `Day 2: Construct a minimal end-to-end script or prototype verifying execution against boundary conditions.`,
      `Day 3: Practice explaining the Big-O tradeoffs or engineering mechanics out loud in a simulated interview.`
    ]
  };

  try {
    const ai = getGeminiClient();

    const prompt = `As a friendly senior engineering mentor for college placement students, explain the skill "${skillName}" for someone targeting a "${roleTitle}" role who scored ${currentScore || 50}%.
Explain in plain English with:
1. "The Everyday Analogy": an intuitive comparison to daily life.
2. "Why Tech Teams Care": real example of how this is used in production engineering.
3. "Common Student Pitfall": mistake juniors frequently make in technical interviews.
4. "3-Day Sprint": specific hands-on exercises to reach proficiency.

Return raw JSON with keys: { "analogy": "...", "workplaceContext": "...", "commonPitfall": "...", "threeDaySprint": ["Day 1: ...", "Day 2: ...", "Day 3: ..."] }`;

    if (!process.env.GEMINI_API_KEY) {
      return res.json(fallbackGap);
    }

    // Strict 10s server timeout for gap explanation
    let timerId: NodeJS.Timeout;
    const timeoutPromise = new Promise((_, reject) => {
      timerId = setTimeout(() => reject(new Error('GAP_TIMEOUT_EXCEEDED')), 10000);
    });

    try {
      const response = await Promise.race([
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.5
          }
        }),
        timeoutPromise
      ]) as any;

      clearTimeout(timerId!);
      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleaned));
    } catch {
      clearTimeout(timerId!);
      res.json(fallbackGap);
    }
  } catch (error: any) {
    res.json(fallbackGap);
  }
});

// Personalized AI Career Intelligence & Strategy Mentor
apiRouter.post('/ai/career-guidance', async (req: Request, res: Response) => {
  try {
    const { 
      studentName, 
      branch, 
      academicYear, 
      roleTitle, 
      interests, 
      targetGoal, 
      assessedStrengths, 
      missingSkills 
    } = req.body;

    const ai = getGeminiClient();
    const branchLabel = branch?.toUpperCase() || 'Engineering';
    const yearLabel = academicYear || '3rd Year';
    const interestsList = (interests || []).join(', ') || 'Core Engineering Fundamentals';
    const strengthsList = (assessedStrengths || []).join(', ') || 'Foundational coursework';
    const missingList = (missingSkills || []).map((m: any) => typeof m === 'string' ? m : m.skillName || m.skillKey).join(', ') || 'Niche domain tools';

    const fallbackResponse = {
      strategicAnalysis: `As a ${yearLabel} student in ${branchLabel} targeting ${roleTitle}, your profile sits at a strong strategic intersection. Hiring teams in campus placements prioritize candidates who pair core engineering discipline with practical execution. Leveraging your interest in ${interestsList}, you have a natural advantage in technical rounds that emphasize problem decomposition over rote memorization.`,
      keyCompetitiveEdge: `Your verified background in ${branchLabel} equips you with fundamental systems intuition that generalist candidates often lack. Highlighting tangible project deliverables and how you tackle edge cases will set you apart in placement interviews.`,
      immediate90DayActionPlan: [
        `Month 1: Eliminate high-priority gaps in ${missingList.slice(0, 50)} through 2 small proof-of-concept implementations.`,
        `Month 2: Build and document a comprehensive capstone project with clean GitHub documentation and live architecture diagrams.`,
        `Month 3: Run timed mock interview simulations focusing on core domain tradeoffs and the STAR method.`
      ],
      interviewGotchas: [
        `Interviewers frequently ask candidates to explain failure modes or boundary conditions rather than just happy-path operation.`,
        `Be prepared to justify why you chose a specific tool, algorithm, or component over standard alternatives.`
      ]
    };

    if (!process.env.GEMINI_API_KEY) {
      return res.json(fallbackResponse);
    }

    const prompt = `You are a Principal Engineering Director and Campus Placement Chairperson mentoring a university student.
Student Details:
- Name: ${studentName || 'Student'}
- Branch: ${branchLabel}
- Academic Stage: ${yearLabel} (Target: ${targetGoal === 'internship' ? 'Summer Internship' : 'Full-Time Campus Placement'})
- Selected Target Role: ${roleTitle}
- Personal Interests: ${interestsList}
- Evaluated Strengths: ${strengthsList}
- Identified Priority Gaps: ${missingList}

Provide actionable, inspiring, and concrete career intelligence guidance.
RETURN STRICTLY A VALID JSON OBJECT (no markdown, no backticks) with keys:
{
  "strategicAnalysis": "A 2-3 paragraph authoritative breakdown of their competitive positioning in campus hiring for ${roleTitle}.",
  "keyCompetitiveEdge": "Specific differentiator they should highlight on their resume and in interviews.",
  "immediate90DayActionPlan": ["Month 1 concrete milestone", "Month 2 concrete milestone", "Month 3 concrete milestone"],
  "interviewGotchas": ["Gotcha 1 frequently tested by senior interviewers", "Gotcha 2"]
}`;

    // Enforce 12s timeout
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 12000));
    
    try {
      const response = await Promise.race([
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.5
          }
        }),
        timeoutPromise
      ]) as any;

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleaned));
    } catch {
      res.json(fallbackResponse);
    }
  } catch (err: any) {
    console.error('Error in career guidance:', err);
    res.status(500).json({ error: 'Failed to generate guidance' });
  }
});

// On-demand AI deep dive for a target company practice question
apiRouter.post('/ai/company-guidance', async (req: Request, res: Response) => {
  const { companyName, questionTitle, questionPrompt, questionCategory, branchName } = req.body;
  const fallback = {
    explanation: `For ${companyName || 'leading technology companies'}, interviewers focus on systematic derivation. Break the problem into explicit invariants, verify edge cases (such as empty inputs, single element, negative numbers, or overflow limits), and clearly explain time and space complexity before writing code.`,
    interviewTip: `During ${companyName || 'campus placement'} interviews, talk aloud through your thought process. State your assumptions clearly and confirm whether helper space is permitted.`,
    practiceVariation: `Try solving this problem with an in-place constraint (O(1) auxiliary memory) or explore how it generalizes to streaming inputs.`
  };

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.json(fallback);
    }

    const prompt = `You are a Technical Placement Interviewer for ${companyName || 'Top Tech Companies'}.
A student majoring in ${branchName || 'Engineering'} is practicing this ${questionCategory || 'Technical'} question:
Title: "${questionTitle}"
Problem: "${questionPrompt}"

Provide a concise, high-impact mentor explanation.
Return strictly valid JSON with keys:
{
  "explanation": "2-3 concise paragraphs covering the optimal approach, algorithmic intuition, and Big-O complexity.",
  "interviewTip": "Concrete tip for communicating this solution effectively in a live ${companyName} technical interview.",
  "practiceVariation": "A follow-up variation or edge-case frequently asked by interviewers."
}`;

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 12000));
    try {
      const response = await Promise.race([
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.4 }
        }),
        timeoutPromise
      ]) as any;

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleaned));
    } catch {
      res.json(fallback);
    }
  } catch {
    res.json(fallback);
  }
});

// On-demand AI generated extra practice question for target company & branch
apiRouter.post('/ai/company-extra-question', async (req: Request, res: Response) => {
  const { companyName, branchId, branchName, category, difficulty } = req.body;
  const fallbackQuestion = {
    id: `ai-extra-${Date.now()}`,
    title: `${companyName || 'Company'} Dynamic Systems Challenge`,
    category: category || 'coding',
    difficulty: difficulty || 'Medium',
    subTopic: `${branchName || 'Core'} Practice`,
    question: `Given a collection of resource intervals or data streams, determine if there exists an overlap that exceeds available capacity. Return the minimum additional resources required.`,
    options: [
      { id: 'a', text: 'Sort intervals by start time and use a min-heap to track active allocations.' },
      { id: 'b', text: 'Apply brute-force pairwise comparison resulting in quadratic O(N^2) complexity.' },
      { id: 'c', text: 'Store intervals in a hash map without sorting.' },
      { id: 'd', text: 'Use linear scan without auxiliary memory.' }
    ],
    correctAnswer: 'a',
    explanation: `Sorting by start time (O(N log N)) and maintaining a min-heap of end times allows instantaneous inspection of released capacity, achieving optimal O(N log N) time and O(N) space.`,
    companySpecific: true
  };

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.json(fallbackQuestion);
    }

    const prompt = `Create 1 realistic, high-quality placement practice question for ${companyName} for a student in ${branchName || 'Engineering'}.
Category: ${category || 'coding'} (Difficulty: ${difficulty || 'Medium'}).
Return strictly valid JSON matching this schema:
{
  "id": "ai-gen-${Date.now()}",
  "title": "Concise Question Title",
  "category": "${category || 'coding'}",
  "difficulty": "${difficulty || 'Medium'}",
  "subTopic": "Specific topic",
  "question": "Clear problem statement with inputs, outputs, and constraints.",
  "options": [
    { "id": "a", "text": "Option A" },
    { "id": "b", "text": "Option B" },
    { "id": "c", "text": "Option C" },
    { "id": "d", "text": "Option D" }
  ],
  "correctAnswer": "a",
  "explanation": "Clear step-by-step technical solution."
}`;

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 12000));
    try {
      const response = await Promise.race([
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.5 }
        }),
        timeoutPromise
      ]) as any;

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(cleaned));
    } catch {
      res.json(fallbackQuestion);
    }
  } catch {
    res.json(fallbackQuestion);
  }
});

// Personalized AI performance analysis for Target Company Assessment Drill
apiRouter.post('/ai/company-analysis', async (req: Request, res: Response) => {
  const {
    companyId,
    companyName,
    branchId,
    branchName,
    roleTitle,
    sectionTitle,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    overallScore,
    topicBreakdown,
    strongTopics,
    weakTopics,
    studentName
  } = req.body;

  const scoreNum = typeof overallScore === 'number' ? overallScore : 0;
  const grade = scoreNum >= 85 ? 'Excellent' : scoreNum >= 70 ? 'Proficient' : scoreNum >= 50 ? 'Developing' : 'Needs Practice';

  const fallbackAnalysis = generateFallbackCompanyAnalysis({
    companyId,
    companyName: companyName || 'Target Company',
    branchId,
    branchName: branchName || 'Engineering',
    roleTitle: roleTitle || 'Campus Placement Candidate',
    sectionTitle: sectionTitle || 'Technical Assessment',
    totalQuestions: totalQuestions || 0,
    correctAnswers: correctAnswers || 0,
    incorrectAnswers: incorrectAnswers || 0,
    unansweredQuestions: unansweredQuestions || 0,
    overallScore: scoreNum,
    grade,
    topicBreakdown: topicBreakdown || {},
    strongTopics: strongTopics || [],
    weakTopics: weakTopics || []
  });

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ ...fallbackAnalysis, isAiGenerated: false });
    }

    const prompt = `You are a Senior Technical Hiring Lead and Placement Chairperson at ${companyName || 'Top Tech Companies'}.
Analyze the test drill performance of a candidate named ${studentName || 'Student'} (Branch: ${branchName || 'Engineering'}, Target Role: ${roleTitle || 'Campus Placement'}, Test Section: ${sectionTitle || 'Technical Assessment'}).

ASSESSMENT METRICS:
- Overall Score: ${scoreNum}% (${grade})
- Questions: ${totalQuestions} Total, ${correctAnswers} Correct, ${incorrectAnswers} Incorrect, ${unansweredQuestions} Unanswered
- Strong Topics: ${(strongTopics || []).join(', ') || 'Core concepts'}
- Weak Topics: ${(weakTopics || []).join(', ') || 'Complex edge cases and boundary validation'}
- Topic Breakdown: ${JSON.stringify(topicBreakdown || {})}

REQUIREMENTS:
Provide an incisive, actionable, and encouraging placement analysis tailored specifically to ${companyName}'s hiring benchmarks and ${branchName} engineering principles.
Return strictly a valid JSON object (no markdown, no backticks) with this structure:
{
  "performanceSummary": "2-3 crisp sentences evaluating their readiness for ${companyName} placement rounds and what this score signals to interviewers.",
  "strongTopics": ["Topic 1", "Topic 2"],
  "weakTopics": ["Topic 1", "Topic 2"],
  "conceptsToImprove": [
    {
      "concept": "Name of concept",
      "whyImportant": "Why ${companyName} specifically tests this in their interview rounds",
      "actionableDrill": "1 specific exercise with concrete numbers or constraints"
    }
  ],
  "recommendedNextTopics": [
    "Recommended Topic 1",
    "Recommended Topic 2"
  ],
  "practicalSuggestions": [
    "Practical suggestion 1 for ${companyName} hiring process",
    "Practical suggestion 2 on communication or timing",
    "Practical suggestion 3 for branch-specific edge cases"
  ]
}`;

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 14000));
    try {
      const response = await Promise.race([
        ai!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json', temperature: 0.4 }
        }),
        timeoutPromise
      ]) as any;

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      res.json({
        ...parsed,
        companyId,
        companyName: companyName || 'Target Company',
        branchId,
        branchName: branchName || 'Engineering',
        sectionTitle: sectionTitle || 'Technical Assessment',
        overallScore: scoreNum,
        grade,
        totalQuestions: totalQuestions || 0,
        correctAnswers: correctAnswers || 0,
        incorrectAnswers: incorrectAnswers || 0,
        unansweredQuestions: unansweredQuestions || 0,
        topicBreakdown: topicBreakdown || {},
        generatedAt: new Date().toISOString(),
        isAiGenerated: true
      });
    } catch {
      res.json({ ...fallbackAnalysis, isAiGenerated: false });
    }
  } catch {
    res.json({ ...fallbackAnalysis, isAiGenerated: false });
  }
});

// Deterministic fallback analysis generator
function generateFallbackCompanyAnalysis(data: any) {
  const {
    companyId,
    companyName,
    branchId,
    branchName,
    sectionTitle,
    overallScore,
    grade,
    strongTopics,
    weakTopics,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    topicBreakdown
  } = data;

  const topStrong = (strongTopics && strongTopics.length > 0)
    ? strongTopics
    : [`${branchName} Core Foundations`, 'Systematic Approach'];
  const topWeak = (weakTopics && weakTopics.length > 0)
    ? weakTopics
    : ['Edge-case Boundary Verification', 'Optimized Space/Time Complexity'];

  return {
    companyId,
    companyName,
    branchId,
    branchName,
    sectionTitle,
    overallScore,
    grade,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unansweredQuestions,
    topicBreakdown,
    performanceSummary: `You completed the ${companyName} ${sectionTitle} with a score of ${overallScore}% (${grade}). Your performance shows solid competence in ${topStrong.slice(0, 2).join(' and ')}, while targeted drills in ${topWeak.slice(0, 2).join(' and ')} will bring your performance directly into ${companyName}'s target placement range.`,
    strongTopics: topStrong,
    weakTopics: topWeak,
    conceptsToImprove: topWeak.map((topic: string) => ({
      concept: topic,
      whyImportant: `${companyName} technical interviewers prioritize candidates who demonstrate first-principles understanding and rigorously handle corner cases in ${topic}.`,
      actionableDrill: `Solve 3 focused benchmark problems in ${topic} under a 20-minute timer and articulate trade-offs before writing code.`
    })),
    recommendedNextTopics: [
      `Advanced ${topWeak[0] || 'Problem Solving'} Patterns`,
      `${companyName} Speed Drills & Sectional Timing`,
      'Mock Whiteboard Defense with STAR Framework'
    ],
    practicalSuggestions: [
      `Practice communicating your rationale aloud before writing code or formulas, which is heavily weighted at ${companyName}.`,
      `Always state edge cases (null inputs, boundary conditions, integer overflow) upfront before finalizing answers.`,
      `Review incorrect and unanswered questions from this drill using the detailed step-by-step explanations.`
    ],
    generatedAt: new Date().toISOString(),
    isAiGenerated: false
  };
}

// Role-aware fallback roadmap generator
function generateFallbackRoadmap(assessment: any, benchmark: any, profile?: any) {
  return generatePersonalizedFallbackRoadmap(assessment, benchmark, profile);
}

// Fallback interview response
function generateFallbackInterviewResponse(userMessage: string, history: any[], roleName: string = 'Software Engineer') {
  const turnCount = history ? history.length : 0;

  if (turnCount >= 6) {
    return {
      interviewerReply: `Thank you for walking me through your technical approach! You articulated your problem-solving logic clearly and connected principles to practical outcomes for the ${roleName} role. That concludes our technical screening session.`,
      coachingTip: "Excellent job maintaining composure and connecting technical concepts to system impact. In future interviews, remember to state edge cases upfront before diving into the solution.",
      isCompleted: true,
      readinessScore: 84,
      overallSummary: `Candidate demonstrated solid structured technical thinking appropriate for ${roleName} placement benchmarks.`
    };
  }

  return {
    interviewerReply: `That is a strong technical explanation. Let's explore a scenario: If a system or process you designed suddenly exhibited an unexpected latency spike or boundary violation under high load, walk me through the first 3 steps you would take to isolate and remediate the issue.`,
    coachingTip: `Good structure in your previous answer. Remember to frame responses using the STAR method (Situation, Task, Action, Result) and mention specific telemetry, logs, or debugging tools you would utilize.`,
    isCompleted: false,
    readinessScore: 78
  };
}
