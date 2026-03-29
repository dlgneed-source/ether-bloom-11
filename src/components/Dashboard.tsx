import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, ArrowUpRight, ArrowDownLeft, Users, TrendingUp, Share2, Clock, X,
  BookOpen, Trophy, ShieldCheck, Layers, ArrowLeft, User, Zap, Gift, Star,
  BellRing, CheckCircle, Send
} from 'lucide-react';
import { fadeUp, pageTransition, getNextISTMidnight, recentTransactions, planBadges, depositPlans, poolStats, scheduleNotes } from './dashboard/DashboardData';
import { CountdownPill } from './dashboard/DashboardCards';
import { PremiumPlanCard, PremiumPoolCard, PremiumTierBadge, PremiumDailyIncomeCard, PremiumReferralCard } from './dashboard/DashboardCards';
import { WithdrawalModal, SendView } from './dashboard/DashboardModals';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'plans' | 'rewards' | 'subscribe' | 'send'>('dashboard');
  const [showTransactions, setShowTransactions] = useState(false);
  const [isSalarySubscribed, setIsSalarySubscribed] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [refMode, setRefMode] = useState<'Level 1' | 'Downline'>('Level 1');
  const nextFlushout = useMemo(() => getNextISTMidnight(), []);

  const handleConfirmDailyIncome = () => {
    setIsSalarySubscribed(true);
    setActiveView('dashboard');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a0f] pb-20 text-slate-200 scrollbar-hide">
      <WithdrawalModal isOpen={showWithdrawModal} onClose={() => setShowWithdrawModal(false)} balance={4892.50} />

      <AnimatePresence mode="wait">

        {/* ======================= MAIN DASHBOARD VIEW ======================= */}
        {activeView === 'dashboard' && (
          <motion.div
            key="dashboard-view"
            variants={pageTransition}
            initial="hidden" animate="visible" exit="exit"
            className="mx-auto flex max-w-6xl flex-col gap-4 p-4 sm:p-6 lg:p-8"
          >
            {/* Header */}
            <motion.div custom={0} variants={fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">Akhuwat Workspace</p>
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Welcome, User</h1>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveView('plans')} className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] sm:flex-none">
                  <BookOpen className="h-4 w-4" /> Plans
                </button>
                <button onClick={() => setActiveView('rewards')} className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-2.5 text-sm font-semibold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition hover:bg-amber-500/20 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] sm:flex-none">
                  <Trophy className="h-4 w-4" /> Rewards
                </button>
              </div>
            </motion.div>

            {/* TOTAL BALANCE CARD */}
            <motion.section custom={1} variants={fadeUp} className="relative mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a2e]/90 p-5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
              <motion.div aria-hidden="true" className="absolute left-[40%] top-0 h-full w-28 -translate-x-1/2 rotate-12 bg-gradient-to-b from-cyan-400/0 via-cyan-300/20 to-cyan-400/0 blur-2xl"
                animate={{ x: [0, 18, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative z-10 grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Wallet className="h-5 w-5 text-cyan-300" />
                      <span className="text-xs font-semibold uppercase tracking-[0.2em]">Total Balance</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                      <TrendingUp className="h-3.5 w-3.5" /> +12.4%
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">$4,892<span className="text-xl text-slate-400">.50</span></p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <button onClick={() => setShowWithdrawModal(true)} className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-slate-200 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition hover:bg-blue-700">
                      <ArrowUpRight className="h-4 w-4" /> Withdraw
                    </button>
                    <button onClick={() => setActiveView('plans')} className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 text-sm font-bold text-slate-900 shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition hover:from-amber-300 hover:to-amber-400">
                      <ArrowDownLeft className="h-4 w-4" /> Deposit
                    </button>
                    <button className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/15">
                      <Share2 className="h-4 w-4" /> Refer
                    </button>
                    <button onClick={() => setShowTransactions(!showTransactions)} className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
                      <Clock className="h-4 w-4" /> History
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <CountdownPill label="Flushout" targetDate={nextFlushout} compact />
                    <motion.button onClick={() => setActiveView('send')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #0d0d0d 100%)',
                        boxShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <motion.div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)' }} />
                      <motion.div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))' }} />
                      <span className="relative z-10 flex items-center gap-2"><Send className="h-4 w-4" /> Send</span>
                    </motion.button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <AnimatePresence mode="wait">
                    {showTransactions && (
                      <motion.div key="history-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md"
                      >
                        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200"><Clock className="h-4 w-4 text-cyan-300" /> Recent Transactions</h2>
                          <button onClick={() => setShowTransactions(false)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition hover:bg-white/20"><X className="h-4 w-4" /></button>
                        </div>
                        <div className="space-y-2">
                          {recentTransactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3">
                              <div>
                                <p className="text-sm font-medium text-slate-200">{tx.type}</p>
                                <p className="text-[11px] text-slate-400">{tx.time}</p>
                              </div>
                              <div className="text-right">
                                <p className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-emerald-300' : 'text-slate-200'}`}>{tx.amount}</p>
                                <p className={`text-[11px] ${tx.status === 'Completed' ? 'text-emerald-300/80' : 'text-amber-300/80'}`}>{tx.status}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-400">Guaranteed flushout</p>
                        <p className="text-sm text-rose-200/70">Timer and cadence overview</p>
                      </div>
                      <ShieldCheck className="h-5 w-5 text-rose-400" />
                    </div>
                    <CountdownPill label="Next flushout" targetDate={nextFlushout} />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {scheduleNotes.map((item) => (
                        <div key={item.plan} className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-300">{item.plan}</p>
                          <p className="mt-1 text-sm font-medium text-rose-100">{item.cadence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* DAILY INCOME CARD */}
            <motion.div custom={2} variants={fadeUp}>
              <PremiumDailyIncomeCard isSubscribed={isSalarySubscribed} onSubscribe={() => setActiveView('subscribe')} />
            </motion.div>

            {/* ACTIVE TIERS */}
            <motion.div custom={7} variants={fadeUp} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-fuchsia-500/5" />
              <div className="relative z-10 flex flex-wrap items-center gap-3">
                <span className="mr-2 flex items-center gap-2 text-sm font-semibold text-slate-400"><Layers className="h-4 w-4" /> Active Tiers:</span>
                {planBadges.map((plan) => <PremiumTierBadge key={plan.name} plan={plan} />)}
              </div>
            </motion.div>

            {/* REFERRAL TREE */}
            <motion.div custom={8} variants={fadeUp}>
              <PremiumReferralCard refMode={refMode} setRefMode={setRefMode} />
            </motion.div>
          </motion.div>
        )}

        {/* ======================= PLANS VIEW ======================= */}
        {activeView === 'plans' && (
          <motion.div key="plans-view" variants={pageTransition} initial="hidden" animate="visible" exit="exit"
            className="mx-auto flex max-w-5xl flex-col gap-5 p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-2 flex items-center gap-4 border-b border-white/5 pb-5">
              <button onClick={() => setActiveView('dashboard')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-slate-200"><ArrowLeft className="h-5 w-5" /></button>
              <div>
                <h2 className="text-xl font-semibold text-slate-200 sm:text-2xl">Select Investment Plan</h2>
                <p className="mt-1 text-sm text-slate-400">Exclusive premium tiers for your workspace.</p>
              </div>
            </div>

            <div className="mb-4 grid gap-3 md:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl"
                style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(17,24,39,0.8))', borderColor: 'rgba(251,191,36,0.3)', boxShadow: '0 8px 32px rgba(251,191,36,0.2)' }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="relative z-10 flex items-center gap-2"><Gift className="h-5 w-5 text-amber-400" /><p className="text-sm font-semibold text-slate-200">Daily Income Plan</p></div>
                <p className="relative z-10 mt-2 text-3xl font-bold text-slate-200">$10<span className="text-sm font-medium text-slate-400"> token subscription</span></p>
                <p className="relative z-10 mt-2 text-sm leading-6 text-slate-400">Auto-subscribed from Plan 2 onward. Plan 1 excluded, as per your notes.</p>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 p-5 backdrop-blur-xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))' }}>
                <div className="absolute -left-8 -bottom-8 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl" />
                <p className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Flushout countdown</p>
                <div className="relative z-10 mt-3"><CountdownPill label="Next" targetDate={nextFlushout} /></div>
                <p className="relative z-10 mt-3 text-sm text-slate-400">Daily distribution happens at 12:00 midnight.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {depositPlans.map((plan, index) => <PremiumPlanCard key={plan.level} plan={plan} index={index} />)}
            </div>
          </motion.div>
        )}

        {/* ======================= REWARDS VIEW ======================= */}
        {activeView === 'rewards' && (
          <motion.div key="rewards-view" variants={pageTransition} initial="hidden" animate="visible" exit="exit"
            className="mx-auto flex max-w-5xl flex-col gap-5 p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-2 flex items-center gap-4 border-b border-white/5 pb-5">
              <button onClick={() => setActiveView('dashboard')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-slate-200"><ArrowLeft className="h-5 w-5" /></button>
              <div>
                <h2 className="text-xl font-semibold text-slate-200 sm:text-2xl">Rewards & Network</h2>
                <p className="mt-1 text-sm text-slate-400">View pools, gift cards, and commissions.</p>
              </div>
            </div>

            {/* Gift Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group relative overflow-hidden rounded-3xl md:w-2/3 lg:w-1/2">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 opacity-50 blur-xl" />
              <motion.div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} />
              <div className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl"
                style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05), rgba(0,0,0,0.2))', borderColor: 'rgba(16,185,129,0.3)', boxShadow: '0 8px 32px rgba(16,185,129,0.2)' }}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300"><Gift className="h-3.5 w-3.5" /> Reward Drop</div>
                    <p className="text-sm font-semibold text-slate-200">Random gift card</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10"><Star className="h-5 w-5 text-emerald-300" /></div>
                </div>
                <div className="relative z-10 mt-4 flex items-center gap-2">
                  <input type="text" placeholder="Enter Gift Code" className="w-full rounded-xl border border-emerald-500/20 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-emerald-500/50" />
                  <button className="whitespace-nowrap rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-400 hover:to-emerald-500">Redeem</button>
                </div>
                <div className="relative z-10 mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/10 bg-white/[0.03] px-3 py-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-500/70">Next reward</p>
                    <p className="text-sm font-semibold text-slate-200">Auto release from total balance</p>
                  </div>
                  <CountdownPill label="In" targetDate={nextFlushout} compact />
                </div>
              </div>
            </motion.div>

            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {poolStats.map((stat, i) => <PremiumPoolCard key={stat.label} stat={stat} index={i} />)}
            </div>
          </motion.div>
        )}

        {/* ======================= SUBSCRIBE VIEW ======================= */}
        {activeView === 'subscribe' && (
          <motion.div key="subscribe-view" variants={pageTransition} initial="hidden" animate="visible" exit="exit"
            className="mx-auto flex max-w-3xl flex-col gap-5 p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-2 flex items-center gap-4 border-b border-white/5 pb-5">
              <button onClick={() => setActiveView('dashboard')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-slate-200"><ArrowLeft className="h-5 w-5" /></button>
              <div>
                <h2 className="text-xl font-semibold text-slate-200 sm:text-2xl">Daily Income Plan</h2>
                <p className="mt-1 text-sm text-slate-400">Separate subscription fee of $10, with midnight distribution.</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl"
                style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(17,24,39,0.9))', borderColor: 'rgba(251,191,36,0.25)' }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="relative z-10 flex items-center gap-2"><BellRing className="h-5 w-5 text-amber-400" /><p className="font-semibold text-slate-200">Token Fee Subscription</p></div>
                <p className="relative z-10 mt-4 text-5xl font-bold text-slate-200">$10<span className="text-base font-medium text-slate-400"> / plan</span></p>
                <p className="relative z-10 mt-3 text-sm leading-6 text-slate-400">This plan activates after Plan 2 joining. It is separate from main joining fee flows and stays limited to the daily income system.</p>
                <div className="relative z-10 mt-5 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Daily income distribution</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">Distribution runs every day at <span className="font-semibold text-slate-200">12:00 midnight</span>.</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Subscription summary</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5"><span className="text-sm text-slate-400">Plan type</span><span className="text-sm font-semibold text-slate-200">Daily Income Plan</span></div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5"><span className="text-sm text-slate-400">Fee</span><span className="text-sm font-semibold text-slate-200">$10</span></div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5"><span className="text-sm text-slate-400">Status</span><span className="text-sm font-semibold text-amber-300">{isSalarySubscribed ? 'Already subscribed' : 'Not subscribed'}</span></div>
                </div>
                <div className="mt-5"><CountdownPill label="Next release" targetDate={nextFlushout} /></div>
                <button onClick={handleConfirmDailyIncome}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3.5 text-sm font-bold text-slate-900 shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition hover:from-amber-300 hover:to-amber-400"
                >
                  <ArrowDownLeft className="h-4 w-4" /> Deposit $10 & Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================= SEND VIEW ======================= */}
        {activeView === 'send' && <SendView onBack={() => setActiveView('dashboard')} />}

      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
