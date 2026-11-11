import React, { useState, useEffect, useRef } from 'react';
import { 
  AssessmentResult, 
  InterviewMessage, 
  MockInterviewSession 
} from '../types';
import { useAuth } from '../context/AuthContext';
import { saveInterviewSession } from '../firebase';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight,
  User,
  Bot,
  HelpCircle,
  Briefcase,
  Rocket,
  GraduationCap
} from 'lucide-react';

interface MockInterviewViewProps {
  assessment: AssessmentResult | null;
  onNavigateToDashboard: () => void;
}

const INTERVIEWER_PERSONAS: Record<string, {
  name: string;
  title: string;
  initialQuestion: string;
  tip: string;
  fallbackReply: string;
  fallbackTip: string;
}> = {
  'cse-sde': {
    name: 'Sarah Chen',
    title: 'Lead Software Development Engineer',
    initialQuestion: 'Could you walk me through a challenging algorithmic problem or data structure implementation you solved, and how you reasoned through time and space complexity trade-offs?',
    tip: 'Tip: Use the STAR method. State the problem context, highlight your Big-O time and space complexity, and explain why your chosen data structure outperformed alternative approaches.',
    fallbackReply: "That's a thoughtful approach. In enterprise software engineering, optimizing edge-case latency and memory safety is crucial. How would you test your solution against extreme boundary conditions or multithreaded contention?",
    fallbackTip: 'Tip: Discuss unit tests, fuzz testing, race condition detection, and benchmark profiling with specific metrics.'
  },
  'aiml-engineer': {
    name: 'Dr. Sarah Lin',
    title: 'AI/ML Engineering Tech Lead',
    initialQuestion: 'Could you walk me through an end-to-end machine learning or deep learning project you built, explaining your feature engineering steps and how you diagnosed and mitigated overfitting?',
    tip: 'Tip: Detail your dataset preprocessing, cross-validation strategy, chosen loss function, and regularization techniques (such as Dropout or L1/L2 weight decay).',
    fallbackReply: "Great perspective on model architecture. In production AI systems, inference latency and distribution shift are frequent hurdles. How would you monitor data drift and keep your model performant after deployment?",
    fallbackTip: 'Tip: Mention concept drift metrics (e.g., PSI, KS test), canary deployments, and automated retraining triggers.'
  },
  'data-scientist': {
    name: 'Sarah Mitchell',
    title: 'Principal Data Scientist',
    initialQuestion: 'Could you describe an analytical or predictive modeling problem where you formulated a statistical hypothesis, conducted exploratory data analysis, and validated your findings with rigorous metrics?',
    tip: 'Tip: Emphasize statistical validity (p-values, confidence intervals, sample bias), feature importance, and alignment with business objectives.',
    fallbackReply: "Well structured. In real-world data science, stakeholders often need to understand feature contributions rather than a black-box metric. How would you explain your model's predictions to a non-technical executive?",
    fallbackTip: 'Tip: Reference interpretability tools like SHAP or Partial Dependence plots, translated into actionable business impact.'
  },
  'it-cloud-devops': {
    name: 'Alex Rivera',
    title: 'Senior DevOps & Cloud Architect',
    initialQuestion: 'Could you walk me through a cloud infrastructure, networking setup, or automated CI/CD pipeline you implemented, and how you designed it for high availability, fault tolerance, and security?',
    tip: 'Tip: Focus on infrastructure-as-code, multi-AZ deployment, load balancing, zero-trust network policies, and automated rollback strategies.',
    fallbackReply: "Solid foundation on cloud architecture. If a production microservice experiences sudden network packet drops or high CPU throttling during peak traffic, what systematic diagnostic steps would you take?",
    fallbackTip: 'Tip: Outline observability workflows: inspecting APM logs, distributed tracing, container metrics, and network security group configurations.'
  },
  'ece-embedded-vlsi': {
    name: 'Dr. Vikram Iyer',
    title: 'Lead Hardware & Embedded Systems Engineer',
    initialQuestion: 'Could you describe an embedded firmware, microcontroller, or digital logic project you designed, and how you handled peripheral interfacing (I2C/SPI), interrupt routines, or timing constraints (setup/hold)?',
    tip: 'Tip: Address clock domain crossings, race condition prevention with volatile variables or mutexes, and power efficiency optimizations.',
    fallbackReply: "Good technical explanation. When debugging intermittent hardware issues such as signal noise on a communication bus or unexpected watchdog resets, how do you isolate the root cause?",
    fallbackTip: 'Tip: Mention logic analyzer/oscilloscope traces, pull-up resistor calculations, and static timing analysis reports.'
  },
  'eee-core': {
    name: 'Prof. Rajesh Sharma',
    title: 'Senior Electrical Systems Engineer',
    initialQuestion: 'Could you walk me through an electrical machines, power transmission, or control systems project you analyzed, and explain how you determined system stability and transient performance?',
    tip: 'Tip: Mention analytical methods such as Routh-Hurwitz, Bode/Nyquist stability criteria, power factor correction, or slip-torque characteristics.',
    fallbackReply: "Thorough analysis. In grid-connected or motor drive applications, sudden load rejection or voltage dips can induce severe transients. How would you design protective relaying or closed-loop feedback damping?",
    fallbackTip: 'Tip: Reference PID parameter tuning, phase margins, circuit breaker tripping curves, and reactive power compensation.'
  },
  'mech-design-mfg': {
    name: 'Marcus Vance',
    title: 'Lead Mechanical & Manufacturing Engineer',
    initialQuestion: 'Could you describe a mechanism, thermal cycle, or manufacturing process you analyzed or designed in CAD/CAM, and explain how you accounted for real-world stress concentrations, tolerances, and thermal limits?',
    tip: 'Tip: Highlight GD&T principles, finite element or thermodynamic cycle efficiency calculations, and tooling or machining feed/speed optimization.',
    fallbackReply: "Excellent mechanical reasoning. If a manufactured component shows unexpected fatigue failure or excessive dimensional distortion post-machining, how would you systematically investigate the root cause?",
    fallbackTip: 'Tip: Discuss stress concentration factors, residual stresses from heat treatment, cutting forces, and quality control CMM inspections.'
  },
  'civil-structural': {
    name: 'Er. Priya Nair',
    title: 'Senior Structural & Project Engineer',
    initialQuestion: 'Could you walk me through a reinforced concrete design, surveying traverse, or construction scheduling project you completed, and how you verified structural safety factors and codal provisions?',
    tip: 'Tip: Discuss limit state design principles, shear-moment balances, CPM critical path scheduling with float buffers, or surveying error adjustment methods.',
    fallbackReply: "Solid structural understanding. If unexpected site conditions (like differential soil settlement or schedule delays on a critical milestone) occur during execution, how would you mitigate risks?",
    fallbackTip: 'Tip: Reference geotechnical foundation checks, redesign of moment connections, CPM schedule crashing, and resource leveling.'
  },
  'data-analyst': {
    name: 'Sarah Vance',
    title: 'Lead Data Analyst',
    initialQuestion: 'Could you tell me about a time you worked with a complex or messy dataset, wrote advanced analytical queries (such as CTEs or window functions), and validated your business insights?',
    tip: 'Tip: Use the STAR method. State the context clearly, specify which tool you used (SQL, Python, Excel), and emphasize how you ensured data accuracy and translated insights into action.',
    fallbackReply: "That's a helpful perspective. In data analytics, being able to tie technical metrics back to the business problem is critical. How would you explain your recommendation to a non-technical stakeholder?",
    fallbackTip: 'Tip: Avoid jargon like CTEs or standard deviation when speaking with executive stakeholders. Focus on ROI, customer impact, and actionable decisions.'
  },
  'data-analyst-intern': {
    name: 'Sarah Vance',
    title: 'Lead Data Analyst',
    initialQuestion: 'Could you tell me about a time you worked with a complex or messy dataset, wrote advanced analytical queries (such as CTEs or window functions), and validated your business insights?',
    tip: 'Tip: Use the STAR method. State the context clearly, specify which tool you used (SQL, Python, Excel), and emphasize how you ensured data accuracy and translated insights into action.',
    fallbackReply: "That's a helpful perspective. In data analytics, being able to tie technical metrics back to the business problem is critical. How would you explain your recommendation to a non-technical stakeholder?",
    fallbackTip: 'Tip: Avoid jargon like CTEs or standard deviation when speaking with executive stakeholders. Focus on ROI, customer impact, and actionable decisions.'
  }
};

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({
  assessment,
  onNavigateToDashboard
}) => {
  const { profile, user, isDemoMode } = useAuth();
  const [interviewMode, setInterviewMode] = useState<'placement' | 'internship'>(() => profile?.targetGoal || 'placement');
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [readinessScore, setReadinessScore] = useState<number | null>(null);
  const [overallSummary, setOverallSummary] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const studentName = profile?.displayName || 'Student';
  const roleId = assessment?.roleId || profile?.targetRole || 'cse-sde';
  const targetRole = assessment?.roleTitle || (roleId === 'cse-sde' ? 'Software Development Engineer (SDE)' : 'Engineering Candidate');
  const gaps = (assessment?.priorityGaps || []).map(g => g.skillName);

  const persona = INTERVIEWER_PERSONAS[roleId] || INTERVIEWER_PERSONAS['cse-sde'];

  // Initialize conversation with welcoming opening question from the role-specific lead
  useEffect(() => {
    if (messages.length === 0) {
      const isIntern = interviewMode === 'internship';
      const questionText = isIntern
        ? `Could you tell me about a coursework project, lab experiment, or technical problem you worked on recently? Walk me through what interested you about it, what obstacle you encountered, and how you systematically debugged it.`
        : persona.initialQuestion;

      const tipText = isIntern
        ? 'Tip: For summer internships, interviewers evaluate learning agility, curiosity, and clarity of thought over multi-year industry experience. Explain your hypothesis, how you tested it, and what you learned.'
        : persona.tip;

      const initialGreeting: InterviewMessage = {
        id: 'msg-init',
        role: 'assistant',
        content: `Hi ${studentName}! I'm ${persona.name}, ${isIntern ? 'Summer Intern Host Mentor' : persona.title} here. Thanks for joining me today.
I've reviewed your verified diagnostic results, and we're excited to evaluate your engineering approach for the ${isIntern ? `${targetRole} Summer Internship` : `${targetRole} Campus Placement`} track.

To get started: ${questionText}`,
        coachingTip: tipText,
        timestamp: new Date().toISOString()
      };
      setMessages([initialGreeting]);
    }
  }, [studentName, roleId, interviewMode]);

  const handleModeChange = (newMode: 'placement' | 'internship') => {
    if (newMode === interviewMode) return;
    setInterviewMode(newMode);
    setMessages([]);
    setIsCompleted(false);
    setReadinessScore(null);
    setOverallSummary(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading || isCompleted) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const newCandidateMsg: InterviewMessage = {
      id: `candidate-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...messages, newCandidateMsg];
    setMessages(updatedHistory);
    setIsLoading(true);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleId,
          targetRole,
          studentName,
          interviewMode,
          conversationHistory: updatedHistory,
          userMessage: userText,
          assessmentGaps: gaps
        }),
        signal: controller.signal
      });

      clearTimeout(timer);
      if (!response.ok) {
        throw new Error('Interview server response failed');
      }

      const data = await response.json();

      const aiReplyMsg: InterviewMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.interviewerReply || "Thank you for sharing that. Let's explore your reasoning on this engineering challenge further.",
        coachingTip: data.coachingTip,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedHistory, aiReplyMsg];
      setMessages(finalMessages);

      if (data.isCompleted) {
        setIsCompleted(true);
        setReadinessScore(data.readinessScore || 80);
        setOverallSummary(data.overallSummary || 'Candidate demonstrated thoughtful communication and solid technical foundations.');

        // Persist session to Firestore
        if (user && !isDemoMode) {
          const session: MockInterviewSession = {
            id: `interview-${Date.now()}`,
            studentId: user.uid,
            roleId,
            roleTitle: targetRole,
            mode: interviewMode,
            status: 'completed',
            messages: finalMessages,
            score: data.readinessScore || 80,
            overallFeedback: data.overallSummary,
            createdAt: new Date().toISOString()
          };
          await saveInterviewSession(user.uid, session);
        }
      }
    } catch (err) {
      clearTimeout(timer);
      console.warn('Interview AI timeout or error, applying verified lead persona fallback:', err);
      // Graceful fallback response
      const fallbackAi: InterviewMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: persona.fallbackReply,
        coachingTip: persona.fallbackTip,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, fallbackAi]);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setIsCompleted(false);
    setReadinessScore(null);
    setOverallSummary(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Role-Specific AI Mock Interview
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Interviewer: {persona.name} ({persona.title})
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">
            {targetRole} Technical & Behavioral Screen
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate realistic interview scenarios and receive instant coaching feedback on communication and technical depth.
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Session</span>
        </button>
      </div>

      {/* Verified Data vs Coaching Notice */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
          Targeting your verified gap areas: {gaps.length > 0 ? gaps.slice(0, 2).join(', ') : 'Core Technical Foundations'}
        </span>
        <span className="text-slate-500 font-mono">Gemini Mentor Mode</span>
      </div>

      {/* Main Conversation Thread */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[560px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isAi = msg.role === 'assistant';
            return (
              <div 
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  isAi 
                    ? 'bg-gradient-to-tr from-indigo-600 to-sky-500 text-white' 
                    : 'bg-slate-700 text-slate-200'
                }`}>
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  {/* Bubble */}
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-sm'
                      : 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                  }`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>

                  {/* Real-Time Coaching Tip Box (if provided by AI) */}
                  {msg.coachingTip && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-amber-300 font-semibold">Mentor Coaching Note: </strong>
                        {msg.coachingTip}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic py-2">
              <Bot className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span>Sarah is evaluating your response and preparing the next question...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Completed Interview Summary Card if finished */}
        {isCompleted && (
          <div className="p-4 bg-emerald-950/30 border-t border-emerald-500/30 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Interview Screening Completed!
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Readiness Evaluation: <strong className="text-white">{readinessScore}%</strong> • {overallSummary}
              </p>
            </div>
            <button
              onClick={onNavigateToDashboard}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-sm"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Input Bar */}
        {!isCompleted && (
          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your response... (e.g. explain your methodology, queries, or problem solving)"
              rows={2}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`p-3 rounded-xl transition-all ${
                inputMessage.trim() && !isLoading
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      {/* Suggested Starter Topics / Scenarios */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
        <span className="text-[11px] font-semibold text-slate-400 block mb-2">
          Interview Practice Quick Prompts:
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            "How do you approach writing complex queries with window functions?",
            "Can you explain what a p-value represents to a product manager?",
            "How do you handle outliers when analyzing purchase amounts?",
            "Walk me through how you structured your last portfolio analysis."
          ].map((promptText, i) => (
            <button
              key={i}
              onClick={() => setInputMessage(promptText)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors text-left"
            >
              "{promptText}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
