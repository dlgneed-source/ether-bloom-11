import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Users, TrendingUp, ChevronDown, ChevronRight, Share2, Clock, DollarSign, Award, X, CheckCircle, BookOpen, Code2, Shield, Brain, Banknote } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const referralTree = {
  name: 'You',
  wallet: '0x1A4...B9F2',
  level: 0,
  children: [
    {
      name: 'User A',
      wallet: '0x7B2...F1A3',
      level: 1,
      children: [
        { name: 'User D', wallet: '0x3C1...E4B2', level: 2, children: [] },
        { name: 'User E', wallet: '0x9F8...D2C1', level: 2, children: [] },
      ],
    },
    {
      name: 'User B',
      wallet: '0x5E6...A8D4',
      level: 1,
      children: [
        { name: 'User F', wallet: '0x2D7...C5E3', level: 2, children: [] },
      ],
    },
    {
      name: 'User C',
      wallet: '0x8A3...B7F6',
      level: 1,
      children: [],
    },
  ],
};

interface TreeNode {
  name: string;
  wallet: string;
  level: number;
  children: TreeNode[];
}

const TreeNodeItem: React.FC<{ node: TreeNode; depth?: number }> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children.length > 0;

  return (
    <div className={`${depth > 0 ? 'ml-4 sm:ml-6 border-l border-border/30 pl-3 sm:pl-4' : ''}`}>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className="flex items-center gap-2 sm:gap-3 py-2 w-full group"
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          </div>
        )}
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold ${
          depth === 0 ? 'bg-gradient-to-tr from-accent to-primary text-primary-foreground' : 'bg-secondary text-foreground'
        }`}>
          {node.name[0]}
        </div>
        <div className="text-left">
          <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{node.name}</p>
          <p className="text-[10px] text-muted-foreground font-mono">{node.wallet}</p>
        </div>
        {depth > 0 && (
          <span className="ml-auto text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            L{node.level}
          </span>
        )}
      </button>
      {expanded && hasChildren && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }}>
          {node.children.map((child, i) => (
            <TreeNodeItem key={i} node={child} depth={depth + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

const recentTransactions = [
  { id: 1, type: 'Deposit', amount: '+$500.00', time: '2h ago', status: 'Completed' },
  { id: 2, type: 'Commission', amount: '+$24.50', time: '5h ago', status: 'Completed' },
  { id: 3, type: 'Withdrawal', amount: '-$200.00', time: '1d ago', status: 'Pending' },
  { id: 4, type: 'Referral Bonus', amount: '+$15.00', time: '2d ago', status: 'Completed' },
];

const planBadges = [
  { name: 'Plan 1', price: '$7', active: true },
  { name: 'Plan 2', price: '$14', active: false },
  { name: 'Plan 3', price: '$40', active: false },
  { name: 'Plan 4', price: '$150', active: false },
];

const depositPlans = [
  {
    level: 1, name: 'Foundation', price: '$7', icon: BookOpen,
    features: ['HTML, CSS & JS (Core Logic)', 'Python (Termux Hands-on)', 'Linux Cmd Line Mastery'],
  },
  {
    level: 2, name: 'Pro Builder', price: '$14', icon: Code2,
    features: ['React.js & Tailwind CSS', 'SQL & DBMS', 'Git & Github', 'Bot Architecture'],
  },
  {
    level: 3, name: 'Cyber Elite', price: '$40', icon: Shield,
    features: ['Ethical Hacking', 'Network Analysis (Wireshark)', 'Web App Security (Burpsuite)'],
  },
  {
    level: 4, name: 'AI Mastery', price: '$150', icon: Brain,
    features: ['Data Analysis (Pandas/Numpy)', 'Neural Networks & AI', 'AI API Integration'],
  },
];

const poolStats = [
  { label: 'Leader Pool', value: '$2,180', colorClass: 'text-yellow-400' },
  { label: 'Reward Pool', value: '$1,450', colorClass: 'text-cyan-400' },
  { label: 'Daily Income Plan', value: '$86.50', colorClass: 'text-primary' },
  { label: 'Auto Filling Tree', value: '142 Nodes', colorClass: 'text-accent' },
];

const Dashboard: React.FC = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showDepositPlans, setShowDepositPlans] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto flex flex-col gap-6">
        {/* Welcome */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <h1 className="text-xl sm:text-3xl font-bold text-foreground mb-1">Welcome to your Workspace</h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">Manage your network, AI credits, and earnings.</p>
        </motion.div>

        {/* Balance Card — Glowing Glassmorphism */}
        <motion.div
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden
            bg-white/[0.04] backdrop-blur-xl
            border border-primary/20
            shadow-[0_0_30px_-5px_hsl(var(--primary)/0.25),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
        >
          {/* Corner glow rays */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Balance</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4%
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">$4,892<span className="text-lg text-muted-foreground">.50</span></p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">≈ 8.12 BNB</p>

          {/* Action Buttons — 2x2 grid with curved divider */}
          <div className="mt-5 relative">
            {/* Curved glowing divider between rows */}
            <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[1px] z-10 pointer-events-none">
              <svg viewBox="0 0 200 8" preserveAspectRatio="none" className="w-full h-2">
                <path d="M0 4 Q50 0 100 4 Q150 8 200 4" stroke="hsl(var(--primary)/0.35)" strokeWidth="1" fill="none" />
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Row 1: Withdraw + Deposit */}
              <button className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 min-h-[44px] hover:border-primary/50 hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)]">
                <ArrowUpRight className="w-4 h-4 shrink-0" /> Withdraw
              </button>
              <button
                onClick={() => setShowDepositPlans(true)}
                className="bg-gradient-to-r from-yellow-600/25 to-amber-500/25 border border-yellow-500/35 text-yellow-400 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 min-h-[44px] hover:border-yellow-400/50 hover:shadow-[0_0_12px_rgba(234,179,8,0.2)]"
              >
                <ArrowDownLeft className="w-4 h-4 shrink-0" /> Deposit
              </button>
              {/* Row 2: Refer + History */}
              <button className="bg-gradient-to-r from-blue-600/25 to-blue-500/20 border border-blue-500/35 text-blue-400 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 min-h-[44px] hover:border-blue-400/50 hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]">
                <Share2 className="w-4 h-4 shrink-0" /> Refer
              </button>
              <button
                onClick={() => setShowTransactions(!showTransactions)}
                className="bg-white/[0.04] border border-white/10 text-muted-foreground py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 min-h-[44px] hover:bg-white/[0.08] hover:text-foreground"
              >
                <Clock className="w-4 h-4 shrink-0" /> History
              </button>
            </div>
          </div>
        </motion.div>

        {/* Deposit Plans Modal */}
        <AnimatePresence>
          {showDepositPlans && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDepositPlans(false)}>
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-background border border-white/10 p-5 scrollbar-hide">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-foreground">Select Investment Plan</h2>
                  <button onClick={() => setShowDepositPlans(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {depositPlans.map((plan) => {
                    const PlanIcon = plan.icon;
                    return (
                      <div key={plan.level} className="rounded-2xl p-4 relative overflow-hidden bg-white/[0.04] border border-white/10">
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
                        <button className="w-full bg-gradient-to-r from-amber-500/20 to-yellow-600/20 backdrop-blur-md border border-yellow-500/30 text-yellow-400 font-medium tracking-wide hover:from-amber-500/30 hover:to-yellow-600/30 transition-all duration-300 rounded-lg py-3 px-6 text-sm">
                          Deposit {plan.price}
                        </button>
                      </div>
                    );
                  })}
                </div>
                {/* Daily Income Plan */}
                <div className="mt-4 rounded-xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Daily Income Plan</p>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <p className="text-lg font-extrabold text-foreground">$86.50<span className="text-xs text-muted-foreground font-normal"> /day avg.</span></p>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Transactions */}
        {showTransactions && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 overflow-hidden bg-white/[0.04] border border-white/10">
            <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" /> Recent Transactions
            </h2>
            <div className="space-y-2">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">{tx.type}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs sm:text-sm font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-primary'}`}>{tx.amount}</p>
                    <p className={`text-[10px] font-semibold ${tx.status === 'Completed' ? 'text-emerald-400/70' : 'text-accent/70'}`}>{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Daily Salary Card (replaces Invested Income) */}
        <motion.div
          initial="hidden" animate="visible" custom={2} variants={fadeUp}
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden
            bg-white/[0.04] border border-emerald-500/15
            shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]"
        >
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/8 rounded-full blur-[50px] pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Daily Salary</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">Today's Earning</p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">$86<span className="text-sm text-emerald-400/60">.50</span></p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">Monthly Total</p>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground">$2,595<span className="text-sm text-muted-foreground">.00</span></p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[86%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400">86% Target</span>
          </div>
        </motion.div>

        {/* Pool Stats 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {poolStats.map((stat, i) => (
            <motion.div key={stat.label} initial="hidden" animate="visible" custom={3 + i * 0.5} variants={fadeUp} className="rounded-2xl p-4 bg-white/[0.04] border border-white/10">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2">{stat.label}</p>
              <p className={`text-lg sm:text-xl font-extrabold ${stat.colorClass}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Commission Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp} className="rounded-2xl p-4 sm:p-5 bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Level 1</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">$1,240</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">24 Referrals • 5% rate</p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" custom={6} variants={fadeUp} className="rounded-2xl p-4 sm:p-5 bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Level 2</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground">$680</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">58 Downlines • 2% rate</p>
          </motion.div>
        </div>

        {/* Plan Badges */}
        <motion.div initial="hidden" animate="visible" custom={7} variants={fadeUp} className="flex items-center gap-2 flex-wrap">
          {planBadges.map((plan) => (
            <div
              key={plan.name}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                plan.active
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/60 shadow-[0_0_12px_rgba(234,179,8,0.4)]'
                  : 'bg-white/[0.04] text-muted-foreground border border-white/10'
              }`}
            >
              {plan.name} <span className="text-[10px] opacity-80">{plan.price}</span>
            </div>
          ))}
        </motion.div>

        {/* Referral Tree */}
        <motion.div initial="hidden" animate="visible" custom={8} variants={fadeUp} className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white/[0.04] border border-white/10">
          <h2 className="text-sm sm:text-base font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Referral Tree
            <span className="ml-auto text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Live</span>
          </h2>
          <TreeNodeItem node={referralTree} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
