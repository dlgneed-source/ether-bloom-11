import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, Users, TrendingUp, ChevronDown, ChevronRight, Share2, Clock, DollarSign, Award, Droplets, Zap, GitBranch } from 'lucide-react';

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
          depth === 0 ? 'bg-gradient-to-tr from-accent to-primary text-primary-foreground glow-fuchsia' : 'bg-secondary text-foreground'
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

const poolStats = [
  { label: 'Leader Pool', value: '$2,180', colorClass: 'text-yellow-400' },
  { label: 'Reward Pool', value: '$1,450', colorClass: 'text-cyan-400' },
  { label: 'Daily Income Plan', value: '$86.50', colorClass: 'text-primary' },
  { label: 'Auto Filling Tree', value: '142 Nodes', colorClass: 'text-accent' },
];

const Dashboard: React.FC = () => {
  const [showTransactions, setShowTransactions] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto flex flex-col gap-4 sm:gap-6">
        {/* Welcome */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <h1 className="text-xl sm:text-3xl font-bold text-primary-foreground mb-1">Welcome to your Workspace</h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium">Manage your network, AI credits, and earnings.</p>
        </motion.div>

        {/* Balance Card */}
        <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Balance</span>
            </div>
            <div className="flex items-center gap-1 text-neon-green text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4%
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-primary-foreground tracking-tight">$4,892<span className="text-lg text-muted-foreground">.50</span></p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">≈ 8.12 BNB</p>
          
          {/* Action Buttons - Color coded */}
          <div className="mt-5 flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-3">
            <button className="bg-gradient-to-r from-accent to-primary text-primary-foreground py-3 px-4 rounded-xl font-bold text-sm transition-all glow-fuchsia flex items-center justify-center gap-2 min-h-[48px] w-full">
              <ArrowUpRight className="w-4 h-4 shrink-0" /> Withdraw
            </button>
            <button className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[48px] w-full">
              <ArrowDownLeft className="w-4 h-4 shrink-0" /> Deposit
            </button>
            <button className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-400 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[48px] w-full">
              <Share2 className="w-4 h-4 shrink-0" /> Refer
            </button>
            <button
              onClick={() => setShowTransactions(!showTransactions)}
              className="bg-slate-500/20 hover:bg-slate-500/30 border border-slate-500/40 text-slate-400 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[48px] w-full"
            >
              <Clock className="w-4 h-4 shrink-0" /> History
            </button>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        {showTransactions && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-5 overflow-hidden">
            <h2 className="text-sm font-bold text-primary-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" /> Recent Transactions
            </h2>
            <div className="space-y-2">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-secondary/40 border border-border/20">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">{tx.type}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs sm:text-sm font-bold ${tx.amount.startsWith('+') ? 'text-neon-green' : 'text-primary'}`}>{tx.amount}</p>
                    <p className={`text-[10px] font-semibold ${tx.status === 'Completed' ? 'text-neon-green/70' : 'text-accent/70'}`}>{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Invested Income Card */}
        <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-5 h-5 text-neon-green" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Invested Income</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">Total Invested</p>
              <p className="text-xl sm:text-2xl font-extrabold text-primary-foreground">$2,500<span className="text-sm text-muted-foreground">.00</span></p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground mb-1">Returns Earned</p>
              <p className="text-xl sm:text-2xl font-extrabold text-neon-green">$892<span className="text-sm text-muted-foreground/70">.50</span></p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-accent to-primary rounded-full" />
            </div>
            <span className="text-[10px] font-bold text-primary">35.7% ROI</span>
          </div>
        </motion.div>

        {/* Pool Stats 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {poolStats.map((stat, i) => (
            <motion.div key={stat.label} initial="hidden" animate="visible" custom={3 + i * 0.5} variants={fadeUp} className="glass rounded-2xl p-4">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2">{stat.label}</p>
              <p className={`text-lg sm:text-xl font-extrabold ${stat.colorClass}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Commission Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp} className="glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Level 1</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-primary-foreground">$1,240</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">24 Referrals • 5% rate</p>
          </motion.div>
          <motion.div initial="hidden" animate="visible" custom={6} variants={fadeUp} className="glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">Level 2</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-primary-foreground">$680</p>
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
                  : 'bg-secondary text-muted-foreground border border-border/30'
              }`}
            >
              {plan.name} <span className="text-[10px] opacity-80">{plan.price}</span>
            </div>
          ))}
        </motion.div>

        {/* Referral Tree */}
        <motion.div initial="hidden" animate="visible" custom={8} variants={fadeUp} className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-sm sm:text-base font-bold text-primary-foreground mb-4 flex items-center gap-2">
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
