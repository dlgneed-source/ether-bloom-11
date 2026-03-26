import React, { useState, useRef, useEffect } from 'react';
import { Hash, Lock, Send, Plus, Users, Info, ChevronDown, Smile, AtSign, Image, ArrowLeft, LogIn } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  { id: 1, user: 'CryptoKing', initials: 'CK', text: 'Hey everyone! Just deployed my first smart contract on BEP-20 🚀', time: '2:34 PM' },
  { id: 2, user: 'AIDevSara', initials: 'AS', text: 'Nice work! Which tools did you use for verification?', time: '2:35 PM' },
  { id: 3, user: 'CryptoKing', initials: 'CK', text: 'Platform built-in verifier — super smooth, no manual ABI upload needed.', time: '2:36 PM' },
  { id: 4, user: 'You', initials: 'YO', text: 'That sounds great! I should try deploying one too.', time: '2:37 PM', isOwn: true },
  { id: 5, user: 'Web3Wizard', initials: 'WW', text: 'Welcome aboard! Check the EdTech vault for Solidity deep-dives.', time: '2:38 PM' },
  { id: 6, user: 'NodeRunner', initials: 'NR', text: 'Anyone running validator nodes? Getting solid yields on the testnet staking pool.', time: '2:41 PM' },
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
  const [roomIdInput, setRoomIdInput] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const [activeDM, setActiveDM] = useState<string | null>(null);
  const [showChannels, setShowChannels] = useState(true);
  const [showDMs, setShowDMs] = useState(true);
  const [showVIP, setShowVIP] = useState(true);
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const isMobile = useIsMobile();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeName = activeDM
    ? dmContacts.find(c => c.id === activeDM)?.name ?? ''
    : `#${activeChannel}`;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), user: 'You', initials: 'YO', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isOwn: true,
    }]);
    setInput('');
  };

  const handleSelectChannel = (id: string) => {
    setActiveChannel(id);
    setActiveDM(null);
    if (isMobile) setMobileShowChat(true);
  };

  const handleSelectDM = (id: string) => {
    setActiveDM(id);
    if (isMobile) setMobileShowChat(true);
  };

  /* ── Navigation Pane ── */
  const navPane = (
    <div className="flex flex-col h-full">
      {/* Room ID Join Bar */}
      <div className="px-3 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <input
            value={roomIdInput}
            onChange={e => setRoomIdInput(e.target.value)}
            placeholder="Enter Room ID"
            className="flex-1 bg-black/20 border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors min-h-[40px]"
          />
          <button className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-bold px-3 py-2 rounded-lg transition-colors min-h-[40px] shrink-0">
            <LogIn className="w-3.5 h-3.5" /> Join
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-2">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Community</h2>
      </div>

      {/* Channels */}
      <button onClick={() => setShowChannels(!showChannels)} className="flex items-center gap-1 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[40px]">
        <ChevronDown className={`w-3 h-3 transition-transform ${showChannels ? '' : '-rotate-90'}`} />
        Channels
      </button>
      {showChannels && channels.map(ch => (
        <button
          key={ch.id}
          onClick={() => handleSelectChannel(ch.id)}
          className={`flex items-center gap-2 mx-2 px-3 py-2.5 rounded-md text-sm transition-colors min-h-[44px] ${
            !activeDM && activeChannel === ch.id
              ? 'bg-white/[0.08] text-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
          }`}
        >
          <Hash className="w-3.5 h-3.5 opacity-60" />
          <span className="flex-1 text-left truncate">{ch.name}</span>
          {ch.unread > 0 && (
            <span className="text-[10px] font-bold bg-primary text-primary-foreground rounded-full px-1.5 min-w-[18px] text-center">{ch.unread}</span>
          )}
        </button>
      ))}

      {/* VIP */}
      <button onClick={() => setShowVIP(!showVIP)} className="flex items-center gap-1 px-4 py-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[40px]">
        <ChevronDown className={`w-3 h-3 transition-transform ${showVIP ? '' : '-rotate-90'}`} />
        VIP Exclusive Rooms
      </button>
      {showVIP && vipRooms.map(r => (
        <div key={r.id} className="flex items-center gap-2 mx-2 px-3 py-2.5 rounded-md text-sm text-muted-foreground/60 cursor-not-allowed min-h-[44px]">
          <Hash className="w-3.5 h-3.5 opacity-40" />
          <span className="flex-1 truncate">{r.name}</span>
          <Lock className="w-3 h-3 opacity-40" />
        </div>
      ))}

      {/* DMs */}
      <button onClick={() => setShowDMs(!showDMs)} className="flex items-center gap-1 px-4 py-2 mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[40px]">
        <ChevronDown className={`w-3 h-3 transition-transform ${showDMs ? '' : '-rotate-90'}`} />
        Direct Messages
      </button>
      {showDMs && dmContacts.map(c => (
        <button
          key={c.id}
          onClick={() => handleSelectDM(c.id)}
          className={`flex items-center gap-2.5 mx-2 px-3 py-2.5 rounded-md text-sm transition-colors min-h-[44px] ${
            activeDM === c.id
              ? 'bg-white/[0.08] text-foreground border-l-2 border-primary ml-2 pl-2'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
          }`}
        >
          <div className="relative shrink-0">
            <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] font-semibold text-foreground/70">{c.initials}</div>
            {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />}
          </div>
          <div className="min-w-0 flex-1 text-left">
            <span className="block truncate">{c.name}</span>
            <span className="block text-[11px] text-muted-foreground truncate">{c.lastMsg}</span>
          </div>
        </button>
      ))}

      <div className="mt-auto p-3">
        <button className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground py-2.5 rounded-md border border-white/[0.08] hover:border-primary/40 transition-colors min-h-[44px]">
          <Plus className="w-3.5 h-3.5" /> Add Channel
        </button>
      </div>
    </div>
  );

  /* ── Chat Canvas ── */
  const chatCanvas = (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2">
          {isMobile && (
            <button onClick={() => setMobileShowChat(false)} className="p-2 -ml-2 rounded-lg hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          {activeDM ? (
            <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-semibold text-foreground/80">
              {dmContacts.find(c => c.id === activeDM)?.initials}
            </div>
          ) : (
            <Hash className="w-4 h-4 text-muted-foreground" />
          )}
          <h3 className="text-sm font-semibold text-foreground">{activeName}</h3>
          {!activeDM && <span className="hidden sm:inline text-xs text-muted-foreground ml-1">— Real-time discussion</span>}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors" />
          <Info className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors" />
        </div>
      </div>

      {/* Messages — Bubble Style */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 scrollbar-hide">
        {messages.map((msg) => {
          const isOwn = msg.isOwn;
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] sm:max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-1 ${
                  isOwn ? 'bg-primary/30 text-primary' : 'bg-white/[0.08] text-foreground/60'
                }`}>
                  {msg.initials}
                </div>
                {/* Bubble */}
                <div className="flex flex-col">
                  {!isOwn && (
                    <span className="text-[10px] font-semibold text-muted-foreground mb-0.5 ml-1">{msg.user}</span>
                  )}
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-white/[0.06] border border-white/[0.08] text-foreground rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className={`text-[9px] text-muted-foreground/60 mt-1 ${isOwn ? 'text-right mr-1' : 'ml-1'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 sm:px-5 pb-4 pt-2 shrink-0">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2.5 focus-within:border-primary/40 transition-colors">
          <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0 p-1 min-h-[36px] min-w-[36px] flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`Message ${activeName}`}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none min-h-[36px]"
          />
          <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
            <Smile className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors hidden sm:block" />
            <AtSign className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors hidden sm:block" />
            <Image className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors hidden sm:block" />
            <button onClick={send} className="ml-1 p-2 text-primary hover:text-primary/80 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Room FAB (VIP) */}
      <button
        className="absolute bottom-20 right-4 sm:bottom-20 sm:right-6 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center glow-fuchsia hover:scale-105 transition-transform z-10"
        title="Create Room (VIP)"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );

  /* ── Room Context Pane ── */
  const contextPane = (
    <aside className="hidden xl:flex w-56 flex-col border-l border-white/[0.06] bg-black/20 backdrop-blur-sm">
      <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Room Details</h4>
        <p className="text-sm font-medium text-foreground mt-2">{activeName}</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Open discussion channel for the community network.</p>
      </div>
      <div className="px-4 pt-4">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Online — {onlineVips.length}</h4>
        <div className="space-y-2.5">
          {onlineVips.map(v => (
            <div key={v.name} className="flex items-center gap-2.5">
              <div className="relative shrink-0">
                <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[9px] font-semibold text-foreground/70">{v.initials}</div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-background" />
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
        <button className="w-full py-2.5 rounded-lg border border-white/[0.08] text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors min-h-[44px]">
          Create Exclusive Room
        </button>
      </div>
    </aside>
  );

  /* ── Mobile Layout ── */
  if (isMobile) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {mobileShowChat ? chatCanvas : (
          <div className="flex-1 overflow-y-auto">
            {navPane}
          </div>
        )}
      </div>
    );
  }

  /* ── Desktop Layout: 3-pane ── */
  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="hidden lg:flex w-56 xl:w-60 flex-col border-r border-white/[0.06] bg-black/20 backdrop-blur-sm overflow-y-auto">
        {navPane}
      </aside>
      {chatCanvas}
      {contextPane}
    </div>
  );
};

export default CommunityLounge;
