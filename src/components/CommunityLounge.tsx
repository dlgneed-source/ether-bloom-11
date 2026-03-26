import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Lock, Send, Plus, Users, Info, Circle, ChevronDown, Image, Smile, AtSign } from 'lucide-react';

/* ── Data ── */
const channels = [
  { id: 'general', name: 'general', unread: 3 },
  { id: 'dev-talk', name: 'dev-talk', unread: 0 },
  { id: 'trading', name: 'trading-signals', unread: 7 },
  { id: 'announcements', name: 'announcements', unread: 1 },
];

const vipRooms = [
  { id: 'alpha', name: 'alpha-signals', locked: true },
];

const dmContacts = [
  { id: 'dm1', name: 'AIDevSara', initials: 'AS', online: true, lastMsg: 'Thanks for the tip!' },
  { id: 'dm2', name: 'Web3Wizard', initials: 'WW', online: true, lastMsg: 'Let me check the docs…' },
  { id: 'dm3', name: 'NodeRunner', initials: 'NR', online: false, lastMsg: 'Validator setup complete ✅' },
  { id: 'dm4', name: 'CryptoKing', initials: 'CK', online: true, lastMsg: 'BEP-20 deployed 🚀' },
];

interface Msg {
  id: number;
  user: string;
  initials: string;
  text: string;
  time: string;
  isOwn?: boolean;
}

const seedMessages: Msg[] = [
  { id: 1, user: 'CryptoKing', initials: 'CK', text: 'Hey everyone! Just deployed my first smart contract on BEP-20 🚀', time: 'Today at 2:34 PM' },
  { id: 2, user: 'AIDevSara', initials: 'AS', text: 'Nice work! Which tools did you use for verification?', time: 'Today at 2:35 PM' },
  { id: 3, user: 'CryptoKing', initials: 'CK', text: 'Platform built-in verifier — super smooth, no manual ABI upload needed.', time: 'Today at 2:36 PM' },
  { id: 4, user: 'Web3Wizard', initials: 'WW', text: 'Welcome aboard! Check the EdTech vault for Solidity deep-dives. Module 4 covers contract patterns.', time: 'Today at 2:38 PM' },
  { id: 5, user: 'NodeRunner', initials: 'NR', text: 'Anyone running validator nodes? Getting solid yields on the testnet staking pool.', time: 'Today at 2:41 PM' },
];

const onlineVips = [
  { name: 'Web3Wizard', initials: 'WW', role: 'Moderator' },
  { name: 'AIDevSara', initials: 'AS', role: 'VIP Tier 4' },
  { name: 'CryptoKing', initials: 'CK', role: 'Member' },
  { name: 'NodeRunner', initials: 'NR', role: 'VIP Tier 3' },
];

/* ── Component ── */
const CommunityLounge: React.FC = () => {
  const [messages, setMessages] = useState<Msg[]>(seedMessages);
  const [input, setInput] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const [activeDM, setActiveDM] = useState<string | null>(null);
  const [showChannels, setShowChannels] = useState(true);
  const [showDMs, setShowDMs] = useState(true);
  const [showVIP, setShowVIP] = useState(true);

  const activeName = activeDM
    ? dmContacts.find(c => c.id === activeDM)?.name ?? ''
    : `#${activeChannel}`;

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), user: 'You', initials: 'YO', text: input, time: 'Just now', isOwn: true,
    }]);
    setInput('');
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* ── Pane 1: Navigation ── */}
      <aside className="hidden lg:flex w-56 xl:w-60 flex-col border-r border-white/[0.06] bg-black/20 backdrop-blur-sm">
        <div className="px-4 pt-4 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Community</h2>
        </div>

        {/* Channels */}
        <button onClick={() => setShowChannels(!showChannels)} className="flex items-center gap-1 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className={`w-3 h-3 transition-transform ${showChannels ? '' : '-rotate-90'}`} />
          Channels
        </button>
        {showChannels && channels.map(ch => (
          <button
            key={ch.id}
            onClick={() => { setActiveChannel(ch.id); setActiveDM(null); }}
            className={`flex items-center gap-2 mx-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
              !activeDM && activeChannel === ch.id
                ? 'bg-white/[0.08] text-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
            }`}
          >
            <Hash className="w-3.5 h-3.5 opacity-60" />
            <span className="flex-1 text-left truncate">{ch.name}</span>
            {ch.unread > 0 && (
              <span className="text-[10px] font-bold bg-purple-600 text-white rounded-full px-1.5 min-w-[18px] text-center">{ch.unread}</span>
            )}
          </button>
        ))}

        {/* VIP */}
        <button onClick={() => setShowVIP(!showVIP)} className="flex items-center gap-1 px-4 py-1.5 mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className={`w-3 h-3 transition-transform ${showVIP ? '' : '-rotate-90'}`} />
          VIP Exclusive Rooms
        </button>
        {showVIP && vipRooms.map(r => (
          <div key={r.id} className="flex items-center gap-2 mx-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground/60 cursor-not-allowed">
            <Hash className="w-3.5 h-3.5 opacity-40" />
            <span className="flex-1 truncate">{r.name}</span>
            <Lock className="w-3 h-3 opacity-40" />
          </div>
        ))}

        {/* DMs */}
        <button onClick={() => setShowDMs(!showDMs)} className="flex items-center gap-1 px-4 py-1.5 mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className={`w-3 h-3 transition-transform ${showDMs ? '' : '-rotate-90'}`} />
          Direct Messages
        </button>
        {showDMs && dmContacts.map(c => (
          <button
            key={c.id}
            onClick={() => { setActiveDM(c.id); }}
            className={`flex items-center gap-2.5 mx-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
              activeDM === c.id
                ? 'bg-white/[0.08] text-foreground border-l-2 border-purple-500 ml-2 pl-1.5'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
            }`}
          >
            <div className="relative shrink-0">
              <div className="w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] font-semibold text-foreground/70">{c.initials}</div>
              {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#1c0333]" />}
            </div>
            <span className="truncate">{c.name}</span>
          </button>
        ))}

        <div className="mt-auto p-3">
          <button className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground py-2 rounded-md border border-white/[0.08] hover:border-purple-500/40 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Channel
          </button>
        </div>
      </aside>

      {/* ── Pane 2: Chat Canvas ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            {activeDM ? (
              <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-semibold text-foreground/80">
                {dmContacts.find(c => c.id === activeDM)?.initials}
              </div>
            ) : (
              <Hash className="w-4 h-4 text-muted-foreground" />
            )}
            <h3 className="text-sm font-semibold text-foreground">{activeName}</h3>
            {!activeDM && <span className="hidden sm:inline text-xs text-muted-foreground ml-1">— Real-time community discussion</span>}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors" />
            <Info className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-0.5 scrollbar-hide">
          {messages.map((msg, i) => {
            const showHeader = i === 0 || messages[i - 1].user !== msg.user;
            return (
              <div
                key={msg.id}
                className={`group flex gap-3 px-2 py-0.5 rounded-md hover:bg-white/[0.03] transition-colors ${showHeader ? 'mt-4 pt-1' : ''}`}
              >
                {showHeader ? (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    msg.isOwn ? 'bg-purple-600/30 text-purple-300' : 'bg-white/[0.08] text-foreground/60'
                  }`}>
                    {msg.initials}
                  </div>
                ) : (
                  <div className="w-8 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  {showHeader && (
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-foreground">{msg.user}</span>
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    </div>
                  )}
                  <p className="text-sm text-foreground/80 leading-relaxed break-words">{msg.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-4 sm:px-5 pb-4 pt-2">
          <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2.5 focus-within:border-purple-500/40 transition-colors">
            <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <Plus className="w-4 h-4" />
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={`Message ${activeName}`}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
            <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
              <Smile className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors hidden sm:block" />
              <AtSign className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors hidden sm:block" />
              <Image className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors hidden sm:block" />
              <button onClick={send} className="ml-1 text-purple-400 hover:text-purple-300 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Pane 3: Room Context ── */}
      <aside className="hidden xl:flex w-56 flex-col border-l border-white/[0.06] bg-black/20 backdrop-blur-sm">
        <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Room Details</h4>
          <p className="text-sm font-medium text-foreground mt-2">{activeName}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Open discussion channel for the community network. Share ideas, get support, and collaborate.</p>
        </div>

        {/* Online VIPs */}
        <div className="px-4 pt-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Online — {onlineVips.length}</h4>
          <div className="space-y-2.5">
            {onlineVips.map(v => (
              <div key={v.name} className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] font-semibold text-foreground/70">{v.initials}</div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-[#1c0333]" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{v.name}</p>
                  <p className="text-[10px] text-muted-foreground">{v.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4">
          <button className="w-full py-2.5 rounded-lg border border-white/[0.08] text-xs font-medium text-muted-foreground hover:text-foreground hover:border-purple-500/40 transition-colors">
            Create Exclusive Room
          </button>
        </div>
      </aside>
    </div>
  );
};

export default CommunityLounge;
