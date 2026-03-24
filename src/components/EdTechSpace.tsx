import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Lock, MessageSquare, Send, X, Bot, Sparkles, CheckCircle } from 'lucide-react';

const plans = [
  { level: 1, name: 'Starter', price: '$29', features: ['Basic Video Courses', '10 AI Chat Queries/day', 'Community Access'], unlocked: true },
  { level: 2, name: 'Pro', price: '$79', features: ['Advanced Tutorials', 'Unlimited AI Chat', 'Live Sessions'], unlocked: false },
  { level: 3, name: 'Elite', price: '$149', features: ['Everything in Pro', 'Source Code Access', '1-on-1 Mentoring'], unlocked: false },
  { level: 4, name: 'VIP', price: '$299', features: ['Full Ecosystem Access', 'Private Rooms', 'Priority Support'], unlocked: false },
];

const courses = [
  { id: 1, title: 'Solidity Smart Contracts 101', duration: '42 min', thumbnail: '🔗', locked: false },
  { id: 2, title: 'BEP-20 Token Deployment', duration: '38 min', thumbnail: '🪙', locked: false },
  { id: 3, title: 'DeFi Yield Strategies', duration: '55 min', thumbnail: '📈', locked: true },
  { id: 4, title: 'AI-Powered Trading Bots', duration: '1h 12 min', thumbnail: '🤖', locked: true },
];

interface ChatMsg {
  role: 'user' | 'ai';
  text: string;
}

const EdTechSpace: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { role: 'ai', text: 'Hi! I\'m your AI learning assistant. Ask me anything about the course content.' },
  ]);
  const [showPlans, setShowPlans] = useState(false);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: 'ai', text: `Great question about "${userMsg}"! In Solidity, this concept relates to how smart contracts handle state variables and gas optimization. Would you like me to explain further?` },
      ]);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col pb-16 overflow-hidden relative">
      {/* Indicator bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary-foreground">Learning Space</span>
          <span className="text-[10px] bg-neon-green/20 text-neon-green px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <Bot className="w-3 h-3" /> Synced via Admin Bot
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
            className="absolute inset-0 z-30 bg-background/90 backdrop-blur-xl overflow-y-auto p-4 pb-20"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary-foreground">Access Plans</h2>
              <button onClick={() => setShowPlans(false)} className="text-muted-foreground hover:text-primary"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plans.map((plan) => (
                <div key={plan.level} className={`glass rounded-2xl p-4 sm:p-5 relative overflow-hidden ${plan.unlocked ? 'border-primary/40' : ''}`}>
                  {plan.unlocked && <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">ACTIVE</div>}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">Plan {plan.level}</span>
                    <span className="text-sm font-bold text-primary-foreground">{plan.name}</span>
                  </div>
                  <p className="text-2xl font-extrabold text-primary-foreground mb-3">{plan.price}<span className="text-xs text-muted-foreground">/mo</span></p>
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-neon-green" /> {f}
                      </li>
                    ))}
                  </ul>
                  {!plan.unlocked && (
                    <button className="mt-4 w-full bg-secondary hover:bg-secondary/80 text-foreground py-2 rounded-xl text-xs font-bold transition-colors">
                      Upgrade
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Area */}
      {activeVideo !== null ? (
        <div className="relative">
          <div className="w-full aspect-video bg-surface-deep flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
            <div className="text-center z-10">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 glow-fuchsia">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <p className="text-sm font-bold text-primary-foreground">{courses.find((c) => c.id === activeVideo)?.title}</p>
              <p className="text-xs text-muted-foreground mt-1">Native video player • Tap to play</p>
            </div>
          </div>
          <button onClick={() => setActiveVideo(null)} className="absolute top-3 right-3 w-8 h-8 glass rounded-full flex items-center justify-center z-10">
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
      ) : null}

      {/* Course List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
        <h2 className="text-sm font-bold text-primary-foreground mb-2">Courses</h2>
        {courses.map((course) => (
          <motion.button
            key={course.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => !course.locked && setActiveVideo(course.id)}
            className={`w-full glass rounded-2xl p-4 flex items-center gap-4 text-left transition-all ${
              course.locked ? 'opacity-50' : 'hover:border-primary/30'
            } ${activeVideo === course.id ? 'border-primary/50 glow-fuchsia' : ''}`}
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl shrink-0">
              {course.locked ? <Lock className="w-5 h-5 text-muted-foreground" /> : course.thumbnail}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-primary-foreground truncate">{course.title}</p>
              <p className="text-xs text-muted-foreground">{course.duration}</p>
            </div>
            {!course.locked && <Play className="w-4 h-4 text-primary shrink-0" />}
          </motion.button>
        ))}
      </div>

      {/* Floating AI Chat Button */}
      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center glow-fuchsia z-40 shadow-2xl"
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
            className="fixed inset-x-0 bottom-16 top-[40%] sm:left-auto sm:right-4 sm:bottom-20 sm:top-auto sm:w-96 sm:h-[28rem] sm:rounded-2xl z-40 glass-strong flex flex-col rounded-t-2xl overflow-hidden border-t border-primary/30 sm:border"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary-foreground">AI Assistant</span>
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
                      : 'glass rounded-tl-sm'
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
                  className="flex-1 bg-secondary/50 border border-border/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button onClick={sendChat} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
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
