import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertOctagon,
  Ban,
  Briefcase,
  ChevronRight,
  Copy,
  Gift,
  Radio,
  RefreshCw,
  Search,
  Send,
  Shield,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';

type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Resolved';

type TreasuryPool = {
  id: string;
  name: string;
  balance: number;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  accent: string;
};

type HashRequest = {
  id: number;
  txHash: string;
  user: string;
  reason: string;
  status: RequestStatus;
};

const treasuryPools: TreasuryPool[] = [
  {
    id: 'system',
    name: 'System Fund',
    balance: 45250,
    icon: Shield,
    color: 'text-sky-300',
    bg: 'bg-sky-500/10',
    border: 'border-sky-400/20',
    accent: 'from-sky-500/20 to-cyan-500/10',
  },
  {
    id: 'leader',
    name: 'Leader Pool',
    balance: 18400,
    icon: TrendingUp,
    color: 'text-indigo-300',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-400/20',
    accent: 'from-indigo-500/20 to-violet-500/10',
  },
  {
    id: 'reward',
    name: 'Reward Pool',
    balance: 9200,
    icon: Gift,
    color: 'text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-400/20',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
  },
  {
    id: 'salary',
    name: 'Daily Income',
    balance: 32100,
    icon: Briefcase,
    color: 'text-orange-200',
    bg: 'bg-orange-500/10',
    border: 'border-orange-400/20',
    accent: 'from-orange-500/20 to-amber-500/10',
  },
];

const initialHashes: HashRequest[] = [
  { id: 1, txHash: '0xabc1...def4', user: '0x4F2e...c91B', reason: 'Gas estimation failed', status: 'Pending' },
  { id: 2, txHash: '0x9f82...7a1b', user: '0xA1b3...7d2F', reason: 'Nonce mismatch', status: 'Pending' },
  { id: 3, txHash: '0xe31c...04d9', user: '0x8Fc1...a42E', reason: 'Contract revert', status: 'Resolved' },
];

const statusStyle = (s: RequestStatus) => {
  switch (s) {
    case 'Pending':
      return 'text-amber-200 bg-amber-500/10 border-amber-400/20';
    case 'Resolved':
      return 'text-emerald-200 bg-emerald-500/10 border-emerald-400/20';
    case 'Approved':
      return 'text-sky-200 bg-sky-500/10 border-sky-400/20';
    case 'Rejected':
      return 'text-rose-200 bg-rose-500/10 border-rose-400/20';
    default:
      return 'text-slate-300 bg-white/5 border-white/10';
  }
};

const securityLogs = [
  '[2026-03-27 14:32:01] CONTRACT CALL — Leader Pool +$5.00',
  '[2026-03-27 14:31:58] POST /api/auth — 0xA1b3...7d2F — 200 OK',
  '[2026-03-27 14:31:45] POST /api/ai — 0x71Aa...b08C — 201 Created',
  '[2026-03-27 14:31:30] GET /api/tree — 0xD4e9...1f3A — 403 Forbidden',
];

function StatCard({ icon: Icon, label, value, tone }: { icon: React.ElementType; label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-sm backdrop-blur-xl sm:p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 ${tone}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</p>
          <p className="mt-1 truncate font-mono text-lg font-semibold text-white sm:text-xl">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [hashes, setHashes] = useState<HashRequest[]>(initialHashes);
  const [searchAddr, setSearchAddr] = useState('');
  const [creditAmt, setCreditAmt] = useState('');
  const [killConfirm, setKillConfirm] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [accountBlocked, setAccountBlocked] = useState(false);

  const filteredHashes = useMemo(() => {
    const q = searchAddr.trim().toLowerCase();
    if (!q) return hashes;
    return hashes.filter(
      (h) => h.txHash.toLowerCase().includes(q) || h.user.toLowerCase().includes(q) || h.reason.toLowerCase().includes(q)
    );
  }, [hashes, searchAddr]);

  const handleHashResolve = (id: number) => {
    setHashes((prev) => prev.map((h) => (h.id === id ? { ...h, status: 'Resolved' } : h)));
  };

  const handlePoolWithdraw = (poolName: string) => {
    alert(`Initiating Web3 Tx to withdraw ${poolName} to Admin Wallet...`);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_24%),linear-gradient(180deg,#0b1220_0%,#111827_45%,#0f172a_100%)] px-3 py-3 text-slate-100 sm:px-4 sm:py-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[26px] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
          <div className="relative overflow-hidden rounded-[26px] p-4 sm:p-5 lg:p-6">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.03))]" />
            <div className="pointer-events-none absolute -top-24 right-[-6rem] h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-[-5rem] h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" />

            <div className="relative space-y-4 border-b border-white/10 pb-5 sm:space-y-5 sm:pb-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400 sm:text-[11px]">Control Center</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">Nexus Dashboard</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Mobile-first dark SaaS layout with cleaner hierarchy and controlled accent color.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <StatCard icon={Wallet} label="Total Balance" value="$1,248,392" tone="bg-slate-700/60" />
                <StatCard icon={Shield} label="System Status" value="Contract Active" tone="bg-sky-500/15" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:justify-end">
                <button
                  onClick={() => setBroadcastOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/[0.08] lg:w-auto"
                >
                  <Radio className="h-4 w-4 text-slate-200" /> Broadcast
                </button>
                <button
                  onClick={() => setKillConfirm(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-300/30 bg-rose-700/35 px-4 py-3 text-sm font-semibold text-rose-50 shadow-sm transition hover:bg-rose-700/45 lg:w-auto"
                >
                  <AlertOctagon className="h-4 w-4" /> KILL-SWITCH
                </button>
              </div>
            </div>

            <div className="relative mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
              <div className="space-y-5 lg:col-span-8">
                <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-sm">
                  <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                    <h3 className="text-base font-semibold text-white">Treasury Liquidity</h3>
                    <p className="mt-1 text-sm text-slate-400">One-click contract withdrawal actions</p>
                  </div>

                  <div className="space-y-3 p-4 sm:p-5">
                    {treasuryPools.map((pool) => (
                      <div
                        key={pool.id}
                        className={`group flex w-full flex-col gap-3 rounded-2xl border ${pool.border} bg-gradient-to-br ${pool.accent} p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${pool.border} ${pool.bg}`}>
                            <pool.icon className={`h-6 w-6 ${pool.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-white/80">{pool.name}</p>
                            <p className="mt-1 font-mono text-xl font-semibold text-white sm:text-2xl">
                              ${pool.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-white/60 transition group-hover:translate-x-0.5" />
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePoolWithdraw(pool.name)}
                            className="flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white hover:bg-white/[0.1]"
                          >
                            Withdraw
                          </button>
                          <button className="flex-1 rounded-xl border border-sky-400/20 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-100 hover:bg-sky-500/15">
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-sm">
                  <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                    <h3 className="text-base font-semibold text-white">Manual Hash Fallback</h3>
                    <p className="mt-1 text-sm text-slate-400">Resolve failed on-chain transactions</p>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="relative mb-4">
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                      <input
                        value={searchAddr}
                        onChange={(e) => setSearchAddr(e.target.value)}
                        placeholder="Search tx hash, wallet, reason..."
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sky-400/30 focus:bg-white/[0.06]"
                      />
                    </div>

                    <div className="space-y-3 md:hidden">
                      {filteredHashes.map((h) => (
                        <div key={h.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-sm">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-mono text-sm font-semibold text-white">{h.txHash}</p>
                              <p className="mt-2 font-mono text-xs text-slate-300">User: {h.user}</p>
                              <p className="mt-1 text-sm text-slate-300">Reason: {h.reason}</p>
                            </div>
                            <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold ${statusStyle(h.status)}`}>
                              {h.status}
                            </span>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-semibold text-white">
                              <Copy className="h-3.5 w-3.5" /> Copy
                            </button>
                            {h.status === 'Pending' ? (
                              <button
                                onClick={() => handleHashResolve(h.id)}
                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-white"
                              >
                                <RefreshCw className="h-3.5 w-3.5" /> Resolve
                              </button>
                            ) : (
                              <span className="inline-flex flex-1 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-100">
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="hidden overflow-x-auto md:block">
                      <table className="w-full min-w-[720px] text-left">
                        <thead className="bg-white/[0.03]">
                          <tr className="border-b border-white/10">
                            {['Tx Hash', 'User Wallet', 'Error Reason', 'Status', 'Action'].map((h) => (
                              <th key={h} className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredHashes.map((h, index) => (
                            <tr key={h.id} className={`border-b border-white/5 transition hover:bg-white/[0.03] ${index % 2 ? 'bg-white/[0.015]' : ''}`}>
                              <td className="px-6 py-4 font-mono text-sm text-slate-200">
                                <div className="flex items-center gap-2">
                                  {h.txHash}
                                  <Copy className="h-3.5 w-3.5 cursor-pointer text-slate-500 transition hover:text-slate-200" />
                                </div>
                              </td>
                              <td className="px-6 py-4 font-mono text-sm text-slate-300">{h.user}</td>
                              <td className="px-6 py-4 text-sm text-slate-300">{h.reason}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${statusStyle(h.status)}`}>
                                  {h.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {h.status === 'Pending' ? (
                                  <button
                                    onClick={() => handleHashResolve(h.id)}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/[0.1]"
                                  >
                                    <RefreshCw className="h-3.5 w-3.5" /> Override
                                  </button>
                                ) : (
                                  <span className="text-sm text-slate-500">Completed</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-5 lg:col-span-4">
                <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-sm">
                  <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                    <h3 className="text-base font-semibold text-white">Network Control</h3>
                  </div>

                  <div className="space-y-5 p-4 sm:p-5">
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-4 sm:p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-800/70 font-semibold text-white shadow-sm">
                          0x4F
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">0x4F2e...c91B</p>
                          <p className="mt-1 text-xs text-slate-400">Joined: Jan 15, 2026</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-center sm:gap-4">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] py-4 shadow-sm">
                          <p className="font-mono text-lg font-semibold text-white">14</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">Referrals</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] py-4 shadow-sm">
                          <p className="font-mono text-lg font-semibold text-white">850</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">AI Credits</p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-white/10 pt-4">
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          AI Credit Override
                        </label>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <input
                            value={creditAmt}
                            onChange={(e) => setCreditAmt(e.target.value)}
                            placeholder="Amount"
                            type="number"
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sky-400/30"
                          />
                          <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-indigo-400/20 bg-indigo-500/15 px-5 py-3 text-sm font-semibold text-indigo-100 shadow-sm transition hover:bg-indigo-500/20 sm:w-auto">
                            <Zap className="h-4 w-4" /> Grant
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setAccountBlocked(false)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-rose-300/30 bg-rose-700/35 py-3 text-sm font-semibold text-rose-50 shadow-sm transition hover:bg-rose-700/45"
                        >
                          <Ban className="h-4 w-4" /> Suspend
                        </button>
                        <button
                          onClick={() => setAccountBlocked(false)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 py-3 text-sm font-semibold text-emerald-100 shadow-sm transition hover:bg-emerald-500/15"
                        >
                          Unblock
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-sm sm:p-5">
                      <h4 className="text-sm font-semibold text-white">Security Log</h4>
                      <div className="mt-4 space-y-3">
                        {securityLogs.map((line) => (
                          <div key={line} className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 font-mono text-[11px] leading-5 text-slate-300">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {killConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setKillConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-[28px] border border-rose-300/20 bg-slate-900/95 p-6 text-center shadow-2xl sm:p-8"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-rose-300/20 bg-rose-700/35">
                <AlertOctagon className="h-10 w-10 text-rose-100" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white">Execute Kill-Switch</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                This will instantly pause all operations, freeze actions, and lock the treasury.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setKillConfirm(false)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/[0.08]"
                >
                  Abort
                </button>
                <button
                  onClick={() => setKillConfirm(false)}
                  className="w-full rounded-2xl border border-rose-300/30 bg-rose-700/45 px-4 py-3 text-sm font-semibold text-rose-50 shadow-sm transition hover:bg-rose-700/55"
                >
                  Confirm Override
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {broadcastOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setBroadcastOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Radio className="h-6 w-6 text-slate-100" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Global Broadcast</h3>
                  <p className="mt-1 text-sm text-slate-400">Push a message to all users</p>
                </div>
              </div>

              <textarea
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                placeholder="Type alert message to push to all users..."
                rows={4}
                className="mt-6 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-sky-400/30 focus:bg-white/[0.06]"
              />

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setBroadcastOpen(false)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setBroadcastOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-400/20 bg-sky-500/15 px-4 py-3 text-sm font-semibold text-sky-100 shadow-sm transition hover:bg-sky-500/20"
                >
                  <Send className="h-4 w-4" /> Push Alert
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
