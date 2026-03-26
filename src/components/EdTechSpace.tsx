import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Lock, Send, X, Bot, Sparkles, CheckCircle, BookOpen, Shield, Brain, Code2, ArrowLeft, FileText, Download, Video, Clock, Paperclip } from 'lucide-react';

const plans = [
  {
    level: 1, name: 'Foundation', price: '$7', icon: BookOpen, unlocked: true,
    features: ['HTML, CSS & JS (Complete Core Logic)', 'Python Programming (Termux Hands-on)', 'Linux Command Line Mastery'],
  },
  {
    level: 2, name: 'Pro Builder', price: '$14', icon: Code2, unlocked: false,
    features: ['React.js & Tailwind CSS (Modern UI/UX)', 'SQL & DBMS (Database Architecture)', 'Git & Github (Complete Course)', 'Bot Architecture (TG/Discord Bots)'],
  },
  {
    level: 3, name: 'Cyber Elite', price: '$40', icon: Shield, unlocked: false,
    features: ['Ethical Hacking Foundations', 'Network Analysis (Wireshark)', 'Web App Security (Burpsuite & Scraping)'],
  },
  {
    level: 4, name: 'AI Mastery', price: '$150', icon: Brain, unlocked: false,
    features: ['Data Analysis (Pandas/Numpy)', 'Advanced Neural Networks & AI Architecture', 'AI API Integration (LLMs, Bots, Projects)'],
  },
];

const modules = [
  { id: 1, title: 'HTML, CSS & JS Fundamentals', duration: '1h 20m', thumbnail: '🌐', locked: false },
  { id: 2, title: 'Python for Termux Users', duration: '55m', thumbnail: '🐍', locked: false },
  { id: 3, title: 'Linux Command Line Mastery', duration: '42m', thumbnail: '🐧', locked: false },
  { id: 4, title: 'React.js & Tailwind CSS', duration: '1h 45m', thumbnail: '⚛️', locked: true },
  { id: 5, title: 'SQL & DBMS Foundations', duration: '1h 10m', thumbnail: '🗄️', locked: true },
  { id: 6, title: 'Git & Github Complete', duration: '58m', thumbnail: '🔀', locked: true },
  { id: 7, title: 'Bot Architecture (TG/Discord)', duration: '1h 30m', thumbnail: '🤖', locked: true },
  { id: 8, title: 'Ethical Hacking Foundations', duration: '2h 10m', thumbnail: '🔐', locked: true },
  { id: 9, title: 'Network Analysis (Wireshark)', duration: '1h 25m', thumbnail: '📡', locked: true },
  { id: 10, title: 'Neural Networks Deep Dive', duration: '1h 50m', thumbnail: '🧠', locked: true },
];

const attachments = [
  { name: 'Course_Syllabus.pdf', size: '2.4 MB', icon: FileText },
  { name: 'Python_Cheatsheet.pdf', size: '1.1 MB', icon: FileText },
  { name: 'Linux_Commands.md', size: '340 KB', icon: FileText },
  { name: 'Project_Starter.zip', size: '8.7 MB', icon: Paperclip },
];

interface ChatMsg { role: 'user' | 'ai'; text: string; }

const EdTechSpace: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { role: 'ai', text: "Hi! I'm your AI learning assistant. Ask me anything about the course content." },
  ]);
  const [showPlans, setShowPlans] = useState(false);
  const [activeTab, setActiveTab] = useState<'modules' | 'description' | 'attachments'>('modules');

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', text: `Great question about "${userMsg}"! This concept is covered in detail within the course modules. Would you like me to point you to the specific lesson?` },
      ]);
    }, 800);
  };

  const activeCourse = modules.find((c) => c.id === activeVideo);

  return (
    <div className="flex-1 flex flex-col pb-16 overflow-hidden relative">
      {/* Indicator bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-foreground">Learning Space</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Bot className="w-3 h-3" /> Synced
          </span>
        </div>
        <button onClick={() => setShowPlans(!showPlans)} className="text-xs font-bold text-primary hover:underline">
          Plans
        </button>
      </div>

      {/* Plans overlay */}
      <AnimatePresence>
        {showPlans && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-background/95 backdrop-blur-xl overflow-y-auto p-4 pb-20"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Access Plans</h2>
              <button onClick={() => setShowPlans(false)} className="text-muted-foreground hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plans.map((plan) => {
                const PlanIcon = plan.icon;
                return (
                  <div key={plan.level} className={`rounded-2xl p-4 sm:p-5 relative overflow-hidden border ${plan.unlocked ? 'bg-white/[0.06] border-primary/40' : 'bg-white/[0.03] border-white/10'}`}>
                    {plan.unlocked && <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">ACTIVE</div>}
                    <div className="flex items-center gap-2 mb-2">
                      <PlanIcon className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">Plan {plan.level}</span>
                    </div>
                    <p className="text-sm font-bold text-foreground mb-1">{plan.name}</p>
                    <p className="text-2xl font-extrabold text-foreground mb-3">{plan.price}<span className="text-xs text-muted-foreground">/mo</span></p>
                    <ul className="space-y-1.5 mb-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                    {!plan.unlocked && (
                      <button className="w-full bg-gradient-to-r from-amber-500/20 to-yellow-600/20 backdrop-blur-md border border-yellow-500/30 text-yellow-400 font-medium tracking-wide hover:from-amber-500/30 hover:to-yellow-600/30 transition-all duration-300 rounded-lg py-3 px-6 text-sm">
                        Upgrade to Plan {plan.level}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Course View */}
      {activeVideo !== null ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Sticky Video Player */}
          <div className="sticky top-0 z-40 w-full bg-black">
            <div className="relative w-full aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              <button onClick={() => setActiveVideo(null)} className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-foreground text-xs font-medium">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="text-center z-10">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                  <Play className="w-7 h-7 text-primary ml-0.5" />
                </div>
                <p className="text-sm font-bold text-foreground">{activeCourse?.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Tap to play</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border/30 bg-white/[0.02]">
            {(['modules', 'description', 'attachments'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {activeTab === 'modules' && (
              <div className="p-3 space-y-2">
                {modules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => !m.locked && setActiveVideo(m.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      m.id === activeVideo
                        ? 'bg-primary/10 border-primary/40'
                        : m.locked
                        ? 'bg-white/[0.02] border-white/5 opacity-50'
                        : 'bg-white/[0.03] border-white/10 hover:border-primary/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">
                      {m.locked ? <Lock className="w-4 h-4 text-muted-foreground" /> : m.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{m.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">{m.duration}</span>
                      </div>
                    </div>
                    {!m.locked && m.id === activeVideo && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Video className="w-3 h-3 text-primary" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'description' && (
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{activeCourse?.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This module covers the complete core logic and practical implementation. 
                    Designed for mobile-first learners using Termux and modern development environments. 
                    Each lesson includes hands-on exercises and real-world project examples.
                  </p>
                </div>
                <div className="border-t border-border/30 pt-3">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Instructor</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">EA</div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">eAkhuwat Academy</p>
                      <p className="text-[10px] text-muted-foreground">Senior Instructor</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attachments' && (
              <div className="p-3 space-y-2">
                {attachments.map((file) => {
                  const Icon = file.icon;
                  return (
                    <div key={file.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">{file.size}</p>
                      </div>
                      <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0">
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Course List (no active video) */
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
          <h2 className="text-sm font-bold text-foreground mb-2">Courses</h2>
          {modules.map((course) => (
            <motion.button
              key={course.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => !course.locked && setActiveVideo(course.id)}
              className={`w-full rounded-xl p-3 flex items-center gap-3 text-left transition-all border ${
                course.locked ? 'bg-white/[0.02] border-white/5 opacity-50' : 'bg-white/[0.03] border-white/10 hover:border-primary/30'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">
                {course.locked ? <Lock className="w-4 h-4 text-muted-foreground" /> : course.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{course.title}</p>
                <p className="text-[10px] text-muted-foreground">{course.duration}</p>
              </div>
              {!course.locked && <Play className="w-4 h-4 text-primary shrink-0" />}
            </motion.button>
          ))}
        </div>
      )}

      {/* Floating AI Chat Button */}
      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-40 shadow-2xl"
        >
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </button>
      )}

      {/* AI Chat Panel */}
      <AnimatePresence>
        {showAI && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-16 top-[40%] sm:left-auto sm:right-4 sm:bottom-20 sm:top-auto sm:w-96 sm:h-[28rem] sm:rounded-2xl z-40 bg-background/95 backdrop-blur-xl flex flex-col rounded-t-2xl overflow-hidden border-t border-border/30 sm:border sm:border-border/30"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">AI Assistant</span>
              </div>
              <button onClick={() => setShowAI(false)} className="text-muted-foreground hover:text-primary">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-white/[0.06] border border-white/10 rounded-tl-sm text-foreground'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-border/30">
              <div className="flex items-center gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChat()}
                  placeholder="Ask about the lesson..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={sendChat} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EdTechSpace;
