import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, Radio, AlertOctagon, Search,
  Check, X, Ban, Zap, Terminal, Send, RefreshCw, Copy, Shield,
} from 'lucide-react';

type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Resolved';

/* ── Mock Data ── */
interface FundRequest {
  id: number;
  address: string;
  type: 'Deposit' | 'Withdraw';
  amount: number;
  status: RequestStatus;
}

const withdrawals: FundRequest[] = [
  { id: 1, address: '0x4F2e...c91B', type: 'Withdraw', amount: 450.00, status: 'Pending' },
  { id: 2, address: '0xA1b3...7d2F', type: 'Deposit', amount: 1200.00, status: 'Approved' },
  { id: 3, address: '0x8Fc1...a42E', type: 'Withdraw', amount: 85.50, status: 'Pending' },
  { id: 4, address: '0xD4e9...1f3A', type: 'Withdraw', amount: 320.00, status: 'Rejected' },
  { id: 5, address: '0x71Aa...b08C', type: 'Deposit', amount: 2500.00, status: 'Pending' },
];

interface HashRequest {
  id: number;
  txHash: string;
  user: string;
  reason: string;
  status: RequestStatus;
}

const hashApprovals: HashRequest[] = [
  { id: 1, txHash: '0xabc1...def4', user: '0x4F2e...c91B', reason: 'Gas estimation failed', status: 'Pending' },
  { id: 2, txHash: '0x9f82...7a1b', user: '0xA1b3...7d2F', reason: 'Nonce mismatch', status: 'Pending' },
  { id: 3, txHash: '0xe31c...04d9', user: '0x8Fc1...a42E', reason: 'Contract revert', status: 'Resolved' },
];

const securityLogs = [
  '[2024-01-15 14:32:01] POST /api/v1/withdraw — 0x4F2e...c91B — 200 OK',
  '[2024-01-15 14:31:58] GET  /api/v1/balance  — 0xA1b3...7d2F — 200 OK',
  '[2024-01-15 14:31:45] POST /api/v1/deposit  — 0x71Aa...b08C — 201 Created',
  '[2024-01-15 14:31:30] GET  /api/v1/referrals — 0xD4e9...1f3A — 403 Forbidden',
  '[2024-01-15 14:31:12] POST /api/v1/ai/gen   — 0x8Fc1...a42E — 429 Rate Limited',
  '[2024-01-15 14:30:55] GET  /api/v1/tree      — 0x4F2e...c91B — 200 OK',
  '[2024-01-15 14:30:41] POST /api/v1/withdraw — 0xA1b3...7d2F — 200 OK',
  '[2024-01-15 14:30:20] GET  /api/v1/modules  — 0x71Aa...b08C — 200 OK',
];

// moved above

const statusStyle = (s: RequestStatus) => {
  switch (s) {
    case 'Pending':  return 'text-yellow-400 bg-yellow-400/10';
    case 'Approved': return 'text-emerald-400 bg-emerald-400/10';
    case 'Rejected': return 'text-red-400 bg-red-400/10';
    case 'Resolved': return 'text-emerald-400 bg-emerald-400/10';
  }
};

/* ── Component ── */
const AdminPanel: React.FC = () => {
  const [requests, setRequests] = useState(withdrawals);
  const [hashes, setHashes] = useState(hashApprovals);
  const [searchAddr, setSearchAddr] = useState('');
  const [creditAmt, setCreditAmt] = useState('');
  const [killConfirm, setKillConfirm] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const handleRequestAction = (id: number, action: 'Approved' | 'Rejected') => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  const handleHashResolve = (id: number) => {
    setHashes(prev => prev.map(h => h.id === id ? { ...h, status: 'Resolved' as const } : h));
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 w-full max-w-full">
      {/* ── Top Bar ── */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Live Treasury Analytics</p>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mt-1">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-400" />
                <span className="text-lg sm:text-xl font-bold text-foreground">$1,248,392</span>
                <span className="text-[10px] text-muted-foreground">Platform Balance</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-lg sm:text-xl font-bold text-foreground">$4.2M</span>
                <span className="text-[10px] text-muted-foreground">TVL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setBroadcastOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/[0.1] text-xs font-medium text-muted-foreground hover:text-foreground hover:border-purple-500/40 transition-colors"
          >
            <Radio className="w-3.5 h-3.5" /> Global Broadcast
          </button>
          <button
            onClick={() => setKillConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-500 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <AlertOctagon className="w-3.5 h-3.5" /> KILL-SWITCH
          </button>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left 8/12 */}
        <div className="xl:col-span-8 space-y-6">
          {/* Fund Management Table */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Fund Management & Withdrawals</h3>
              <span className="text-[10px] text-muted-foreground">{requests.filter(r => r.status === 'Pending').length} pending</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {['User Address', 'Type', 'Amount', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 text-xs font-mono text-foreground/80">{r.address}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          r.type === 'Deposit' ? 'text-emerald-400 bg-emerald-400/10' : 'text-purple-300 bg-purple-400/10'
                        }`}>
                          {r.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs font-semibold text-foreground">${r.amount.toFixed(2)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle(r.status)}`}>{r.status}</span>
                      </td>
                      <td className="px-5 py-3">
                        {r.status === 'Pending' ? (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => handleRequestAction(r.id, 'Approved')} className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                              <Check className="w-3 h-3" />
                            </button>
                            <button onClick={() => handleRequestAction(r.id, 'Rejected')} className="p-1.5 rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manual Hash Approvals */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-foreground">Manual Hash Approvals</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Fix failed on-chain transactions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {['Tx Hash', 'User', 'Reason', 'Status', 'Action'].map(h => (
                      <th key={h} className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hashes.map(h => (
                    <tr key={h.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 text-xs font-mono text-purple-300 flex items-center gap-1.5">
                        {h.txHash}
                        <Copy className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
                      </td>
                      <td className="px-5 py-3 text-xs font-mono text-foreground/80">{h.user}</td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">{h.reason}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle(h.status)}`}>{h.status}</span>
                      </td>
                      <td className="px-5 py-3">
                        {h.status === 'Pending' ? (
                          <button onClick={() => handleHashResolve(h.id)} className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                            <RefreshCw className="w-3 h-3" /> Resolve
                          </button>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4/12 */}
        <div className="xl:col-span-4 space-y-6">
          {/* User Management */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-foreground">User Management</h3>
            </div>
            <div className="p-5 space-y-4">
              {/* Search */}
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 focus-within:border-purple-500/40 transition-colors">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  value={searchAddr}
                  onChange={e => setSearchAddr(e.target.value)}
                  placeholder="Search wallet address..."
                  className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none font-mono"
                />
              </div>

              {/* Profile Card */}
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-600/20 flex items-center justify-center text-[10px] font-bold text-purple-300">CK</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">CryptoKing</p>
                    <p className="text-[10px] text-muted-foreground font-mono">0x4F2e...c91B</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-md bg-white/[0.04] py-2">
                    <p className="text-sm font-bold text-foreground">Plan 3</p>
                    <p className="text-[9px] text-muted-foreground">Active Level</p>
                  </div>
                  <div className="rounded-md bg-white/[0.04] py-2">
                    <p className="text-sm font-bold text-foreground">14</p>
                    <p className="text-[9px] text-muted-foreground">Referrals</p>
                  </div>
                </div>

                {/* Ban */}
                <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-500/40 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
                  <Ban className="w-3.5 h-3.5" /> One-Click Ban
                </button>

                {/* AI Credit Override */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">AI Credit Override</p>
                  <div className="flex items-center gap-2">
                    <input
                      value={creditAmt}
                      onChange={e => setCreditAmt(e.target.value)}
                      placeholder="Amount"
                      type="number"
                      className="flex-1 bg-black/20 border border-white/[0.08] rounded-md px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-purple-500/40 font-mono"
                    />
                    <button className="px-3 py-1.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-colors">
                      <Zap className="w-3 h-3 inline mr-1" />Grant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Log */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">IP & Security Log</h3>
            </div>
            <div className="bg-black/40 p-4 max-h-60 overflow-y-auto scrollbar-hide">
              {securityLogs.map((log, i) => (
                <p key={i} className="font-mono text-[10px] leading-5 text-purple-200/70 whitespace-pre-wrap break-all">
                  {log}
                </p>
              ))}
              <span className="inline-block w-1.5 h-3.5 bg-purple-400 animate-pulse mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Kill-Switch Confirm Modal ── */}
      <AnimatePresence>
        {killConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setKillConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-red-500/30 bg-[#1a0a1e] p-6 text-center space-y-4"
            >
              <AlertOctagon className="w-10 h-10 text-red-500 mx-auto" />
              <h3 className="text-lg font-bold text-foreground">Emergency Kill-Switch</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">This will immediately pause ALL smart contract operations, freeze withdrawals, and lock the platform treasury. This action requires multi-sig confirmation.</p>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setKillConfirm(false)} className="flex-1 py-2.5 rounded-lg border border-white/[0.1] text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button onClick={() => setKillConfirm(false)} className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors">
                  Confirm Kill
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Broadcast Modal ── */}
      <AnimatePresence>
        {broadcastOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setBroadcastOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-xl border border-white/[0.08] bg-[#1a0a1e] p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-foreground">Global Broadcast</h3>
              </div>
              <textarea
                value={broadcastMsg}
                onChange={e => setBroadcastMsg(e.target.value)}
                placeholder="Enter broadcast message..."
                rows={4}
                className="w-full bg-black/30 border border-white/[0.08] rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-purple-500/40 resize-none"
              />
              <div className="flex items-center gap-3">
                <button onClick={() => setBroadcastOpen(false)} className="flex-1 py-2.5 rounded-lg border border-white/[0.1] text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button onClick={() => setBroadcastOpen(false)} className="flex-1 py-2.5 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors flex items-center justify-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Broadcast
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
