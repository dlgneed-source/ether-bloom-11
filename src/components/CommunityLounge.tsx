import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, BadgeCheck, ChevronDown, Hash, Image, Info, Lock, LogIn,
  LogOut, MoreVertical, Plus, Reply, Search, Send, Settings, Shield, Smile,
  Users, Wallet, X, Pin, User, Paperclip, Crown
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

/* ━━━ Data Models ━━━ */
type Room = { id: string; name: string; unread: number; isVip: boolean; description?: string; icon?: 'hash' | 'pin' | 'lock'; };
type Contact = { id: string; name: string; initials: string; online: boolean; role: string; wallet: string; lastMsg: string; badge?: string; };
interface Msg { id: number; roomId: string; user: string; initials: string; text: string; time: string; isOwn?: boolean; userId?: string; role?: string; wallet?: string; replyToId?: number; }
type Profile = { id: string; name: string; initials: string; online?: boolean; role?: string; wallet?: string; subtitle?: string; badge?: string; };

const seedRooms: Room[] = [
  { id: 'announcements', name: 'announcements', unread: 0, isVip: false, description: 'Official updates and releases.', icon: 'pin' },
  { id: 'general', name: 'general', unread: 3, isVip: false, description: 'Community talk, intros, support.', icon: 'hash' },
  { id: 'dev-talk', name: 'dev-talk', unread: 0, isVip: false, description: 'Engineering, APIs, integrations.', icon: 'hash' },
  { id: 'trading-signals', name: 'trading-signals', unread: 7, isVip: false, description: 'Market discussion and signals.', icon: 'hash' },
  { id: 'alpha-signals', name: 'alpha-signals', unread: 0, isVip: true, description: 'VIP alpha access for eligible members.', icon: 'lock' },
];

const dmContacts: Contact[] = [
  { id: 'dm1', name: 'AIDevSara', initials: 'AS', online: true, role: 'Moderator', wallet: '0x71C...4A2b', lastMsg: 'Thanks for the tip!', badge: 'trusted' },
  { id: 'dm2', name: 'Web3Wizard', initials: 'WW', online: true, role: 'Admin', wallet: '0x99B...1C3d', lastMsg: 'Let me check the docs…', badge: 'team' },
  { id: 'dm3', name: 'NodeRunner', initials: 'NR', online: false, role: 'VIP Member', wallet: '0x11A...9F8e', lastMsg: 'Validator setup complete ✅', badge: 'vip' },
  { id: 'dm4', name: 'CryptoKing', initials: 'CK', online: true, role: 'Member', wallet: '0x44D...2E1f', lastMsg: 'BEP-20 deployed 🚀', badge: 'member' },
];

const communityMembers: Contact[] = [...dmContacts, { id: 'dm6', name: 'SignalFox', initials: 'SF', online: true, role: 'VIP Member', wallet: '0x22D...1B9f', lastMsg: 'Entry confirmed', badge: 'vip' }];

const seedMessages: Msg[] = [
  { id: 1, roomId: 'announcements', user: 'Web3Wizard', initials: 'WW', text: 'Welcome to the new E@Akhuwat community hub.', time: '09:15', userId: 'dm2', role: 'Admin', wallet: '0x99B...1C3d' },
  { id: 2, roomId: 'general', user: 'CryptoKing', initials: 'CK', text: 'This UI feels premium. Clean channel separation helps a lot.', time: '09:18', userId: 'dm4', role: 'Member', wallet: '0x44D...2E1f' },
  { id: 3, roomId: 'general', user: 'AIDevSara', initials: 'AS', text: 'Agree. The colors are popping now!', time: '09:19', userId: 'dm1', role: 'Moderator', wallet: '0x71C...4A2b', replyToId: 2 },
];

const roleTone: Record<string, string> = { Admin: 'text-indigo-400', Moderator: 'text-fuchsia-400', 'VIP Member': 'text-amber-400', Member: 'text-foreground' };

/* ━━━ Component ━━━ */
const CommunityLounge: React.FC = () => {
  const isMobile = useIsMobile();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'community' | 'dms'>('community');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [channelsOpen, setChannelsOpen] = useState(true);
  const [vipOpen, setVipOpen] = useState(true);

  const [rooms, setRooms] = useState<Room[]>(seedRooms);
  const [messages, setMessages] = useState<Msg[]>(seedMessages);
  const [input, setInput] = useState('');
  const [replyTo, setReplyTo] = useState<Msg | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roomIdInput, setRoomIdInput] = useState('');
  
  const [selectedRoomId, setSelectedRoomId] = useState('announcements');
  const [selectedDM, setSelectedDM] = useState<string | null>(null);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [profileTarget, setProfileTarget] = useState<Profile | null>(null);

  const [newRoomName, setNewRoomName] = useState('');
  const [isNewRoomVip, setIsNewRoomVip] = useState(false);

  const activeRoom = rooms.find((r) => r.id === selectedRoomId) ?? rooms[0];
  const activeDMObj = selectedDM ? dmContacts.find((c) => c.id === selectedDM) ?? null : null;
  const activeTitle = selectedDM ? activeDMObj?.name ?? 'Direct Message' : activeRoom?.name ?? 'announcements';
  const activeDescription = selectedDM ? `${activeDMObj?.role} • ${activeDMObj?.wallet}` : activeRoom?.description ?? 'Community space';

  const activeChannelMessages = useMemo(() => {
    const base = messages.filter((m) => m.roomId === (selectedDM ? `dm:${selectedDM}` : selectedRoomId));
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter((m) => m.user.toLowerCase().includes(q) || m.text.toLowerCase().includes(q));
  }, [messages, selectedRoomId, selectedDM, searchQuery]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeChannelMessages, mobileShowChat]);

  const openProfile = (profile: Profile) => { setProfileTarget(profile); setShowUserProfileModal(true); };

  const openMemberProfile = (contact: Contact) => {
    setSelectedDM(contact.id); setActiveTab('dms');
    openProfile({ id: contact.id, name: contact.name, initials: contact.initials, online: contact.online, role: contact.role, wallet: contact.wallet, subtitle: 'Community member', badge: contact.badge });
    if (isMobile) setMobileShowChat(true);
  };

  const openMessageProfile = (msg: Msg) => {
    const matched = communityMembers.find((m) => m.name === msg.user);
    openProfile({ id: msg.userId ?? matched?.id ?? msg.user, name: msg.user, initials: msg.initials, online: matched?.online, role: msg.role ?? matched?.role ?? 'Member', wallet: msg.wallet ?? matched?.wallet ?? '—', subtitle: 'Posted in chat' });
  };

  const handleSelectRoom = (roomId: string) => { setSelectedDM(null); setSelectedRoomId(roomId); setReplyTo(null); if (isMobile) setMobileShowChat(true); };
  const openDM = (contactId: string) => { setSelectedDM(contactId); setSelectedRoomId('announcements'); setReplyTo(null); if (isMobile) setMobileShowChat(true); };

  const send = () => {
    if (!input.trim()) return;
    const targetRoomId = selectedDM ? `dm:${selectedDM}` : selectedRoomId;
    setMessages((prev) => [...prev, { id: Date.now(), roomId: targetRoomId, user: 'You', initials: 'YO', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isOwn: true, userId: 'you', role: 'You', wallet: '—', replyToId: replyTo?.id }]);
    setInput(''); setReplyTo(null);
  };

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) return;
    const newId = newRoomName.toLowerCase().replace(/\s+/g, '-');
    setRooms((prev) => [...prev, { id: newId, name: newRoomName.trim(), unread: 0, isVip: isNewRoomVip, description: isNewRoomVip ? 'VIP-exclusive space' : 'Public room', icon: isNewRoomVip ? 'lock' : 'hash' }]);
    setNewRoomName(''); setIsNewRoomVip(false); setShowCreateRoomModal(false); handleSelectRoom(newId);
  };

  /* ━━━ SIDEBAR (Rooms & DMs) ━━━ */
  const navPane = (
    <div className="flex h-full w-full flex-col bg-[#0b0d12] border-r border-white/[0.05]">
      {/* Header Info */}
      <div className="flex items-center gap-3 p-4 border-b border-white/[0.05] bg-black/20 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-[0_0_15px_rgba(217,70,239,0.3)]">
          <Pin className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground tracking-wide">E@Akhuwat</h2>
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">Premium Lounge</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="p-3 border-b border-white/[0.05] shrink-0 bg-black/10">
        <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/[0.05]">
          <button onClick={() => setActiveTab('community')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'community' ? 'bg-primary/20 text-primary shadow-[0_0_10px_rgba(217,70,239,0.2)]' : 'text-muted-foreground hover:text-white'}`}>
            Community
          </button>
          <button onClick={() => setActiveTab('dms')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === 'dms' ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 'text-muted-foreground hover:text-white'}`}>
            DMs
          </button>
        </div>
      </div>

      {/* Room Lists */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-hide">
        {activeTab === 'community' ? (
          <>
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/40 px-3 py-2 focus-within:border-primary/40 transition-colors">
              <input value={roomIdInput} onChange={(e) => setRoomIdInput(e.target.value)} placeholder="Join by Room ID..." className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground/50" />
              <button onClick={() => {if(roomIdInput.trim()) setRoomIdInput('')}} className="rounded-lg bg-primary/20 px-2.5 py-1.5 text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-colors">Join</button>
            </div>

            <div className="space-y-1">
              <button onClick={() => handleSelectRoom('announcements')} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${!selectedDM && selectedRoomId === 'announcements' ? 'bg-primary/10 border border-primary/20' : 'border border-transparent hover:bg-white/[0.03]'}`}>
                <Pin className={`h-4 w-4 shrink-0 ${!selectedDM && selectedRoomId === 'announcements' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`flex-1 truncate text-sm font-bold ${!selectedDM && selectedRoomId === 'announcements' ? 'text-primary' : 'text-foreground'}`}>Announcements</span>
              </button>

              <button onClick={() => setChannelsOpen(!channelsOpen)} className="flex w-full items-center gap-2 px-3 py-2 mt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white">
                <ChevronDown className={`h-3 w-3 transition-transform ${channelsOpen ? '' : '-rotate-90'}`} /> Public Rooms
              </button>
              {channelsOpen && rooms.filter(r => !r.isVip && r.id !== 'announcements').map((room) => (
                <button key={room.id} onClick={() => handleSelectRoom(room.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${!selectedDM && selectedRoomId === room.id ? 'bg-white/[0.08] text-foreground font-bold' : 'text-muted-foreground hover:bg-white/[0.03] hover:text-white'}`}>
                  <Hash className="h-4 w-4 shrink-0 opacity-70" />
                  <span className="flex-1 truncate text-sm">{room.name}</span>
                  {!!room.unread && <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">{room.unread}</span>}
                </button>
              ))}

              <button onClick={() => setVipOpen(!vipOpen)} className="flex w-full items-center gap-2 px-3 py-2 mt-4 text-[10px] font-bold uppercase tracking-widest text-fuchsia-400 hover:text-fuchsia-300">
                <ChevronDown className={`h-3 w-3 transition-transform ${vipOpen ? '' : '-rotate-90'}`} /> VIP Exclusive
              </button>
              {vipOpen && rooms.filter(r => r.isVip).map((room) => (
                <button key={room.id} onClick={() => handleSelectRoom(room.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${!selectedDM && selectedRoomId === room.id ? 'bg-fuchsia-500/15 border border-fuchsia-500/20 text-fuchsia-300 font-bold' : 'text-muted-foreground border border-transparent hover:bg-white/[0.03] hover:text-fuchsia-300'}`}>
                  <Lock className="h-4 w-4 shrink-0 opacity-80" />
                  <span className="flex-1 truncate text-sm">{room.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-1">
            {dmContacts.map((c) => (
              <button key={c.id} onClick={() => openDM(c.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${selectedDM === c.id ? 'bg-indigo-500/15 border border-indigo-500/20' : 'border border-transparent hover:bg-white/[0.03]'}`}>
                <div className="relative shrink-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${selectedDM === c.id ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/10 text-foreground'}`}>{c.initials}</div>
                  {c.online && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0b0d12] bg-emerald-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center"><span className={`truncate font-bold text-sm ${selectedDM === c.id ? 'text-indigo-300' : 'text-foreground'}`}>{c.name}</span></div>
                  <p className="truncate text-[11px] text-muted-foreground mt-0.5">{c.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Create Room Button */}
      {activeTab === 'community' && (
        <div className="p-4 border-t border-white/[0.05] bg-black/20 shrink-0">
          <button onClick={() => setShowCreateRoomModal(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.05] border border-white/10 py-3 text-sm font-bold text-foreground transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]">
            <Plus className="h-4 w-4" /> Create Room
          </button>
        </div>
      )}
    </div>
  );

  /* ━━━ CHAT CANVAS ━━━ */
  const chatCanvas = (
    <div className="flex h-[100dvh] w-full flex-col bg-[#06070a]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0b0d12]/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {isMobile && (
            <button onClick={() => setMobileShowChat(false)} className="rounded-xl p-2 -ml-2 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${selectedDM ? 'bg-indigo-500/20 text-indigo-400' : 'bg-primary/20 text-primary'}`}>
            {selectedDM ? <User className="h-5 w-5" /> : activeRoom?.isVip ? <Lock className="h-5 w-5" /> : <Hash className="h-5 w-5" />}
          </div>
          <div className="min-w-0 cursor-pointer" onClick={() => selectedDM && activeDMObj && openProfile({id: activeDMObj.id, name: activeDMObj.name, initials: activeDMObj.initials, role: activeDMObj.role, wallet: activeDMObj.wallet})}>
            <h1 className="truncate text-base font-bold text-foreground flex items-center gap-1.5">
              {activeTitle} {selectedDM && activeDMObj?.role === 'Admin' && <BadgeCheck className="h-4 w-4 text-indigo-400" />}
            </h1>
            <p className="truncate text-[11px] text-muted-foreground">{activeDescription}</p>
          </div>
        </div>
        <div className="flex items-center">
          {!selectedDM && (
            <button onClick={() => setShowSettingsModal(true)} className="rounded-xl p-2.5 text-muted-foreground hover:bg-white/10 hover:text-white transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent">
        {activeChannelMessages.map((msg) => (
          <div key={msg.id} className={`group flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-3 sm:max-w-[75%] ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
              <button onClick={() => openMessageProfile(msg)} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold shadow-md transition-transform hover:scale-110 ${msg.isOwn ? 'bg-primary/20 border border-primary/40 text-primary' : 'bg-white/10 border border-white/20 text-white'}`}>
                {msg.initials}
              </button>
              <div className="flex min-w-0 flex-col">
                <div className={`mb-1.5 flex items-center gap-2 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isOwn && <span className="text-xs font-bold text-foreground">{msg.user}</span>}
                  {msg.role && <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ${roleTone[msg.role] ?? 'text-muted-foreground'}`}>{msg.role}</span>}
                  <span className="text-[10px] text-muted-foreground/60">{msg.time}</span>
                </div>
                {msg.replyToId && (
                   <div className="mb-2 rounded-r-lg border-l-2 border-primary/50 bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted-foreground">
                     Replying to <span className="font-semibold text-primary">{activeChannelMessages.find(m => m.id === msg.replyToId)?.user}</span>
                   </div>
                )}
                <div className={`relative rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm transition-all ${msg.isOwn ? 'rounded-tr-sm bg-primary text-white shadow-[0_2px_15px_rgba(217,70,239,0.3)]' : 'rounded-tl-sm border border-white/[0.08] bg-white/[0.05] text-foreground/90 backdrop-blur-md'}`}>
                  {msg.text}
                  <div className="absolute -top-3 right-2 hidden items-center gap-1 rounded-lg border border-white/10 bg-black/80 p-1 shadow-xl backdrop-blur-md group-hover:flex">
                    <button onClick={() => setReplyTo(msg)} className="rounded p-1.5 text-white/70 hover:bg-white/20 hover:text-white"><Reply className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/[0.06] bg-[#0b0d12] px-4 py-4 shrink-0">
        {replyTo && (
          <div className="mb-3 flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 px-4 py-2">
            <div className="min-w-0"><p className="text-[11px] font-bold text-primary">Replying to {replyTo.user}</p><p className="truncate text-xs text-white/70">{replyTo.text}</p></div>
            <button onClick={() => setReplyTo(null)} className="rounded-lg p-1 hover:bg-black/40"><X className="h-4 w-4 text-white" /></button>
          </div>
        )}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/50 px-2 py-2 focus-within:border-primary/50 transition-colors">
          <button className="rounded-xl p-2.5 text-muted-foreground hover:bg-white/10 hover:text-white"><Plus className="h-5 w-5" /></button>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Message..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none min-h-[44px]" />
          <button onClick={send} disabled={!input.trim()} className={`ml-1 rounded-xl p-3.5 transition-all duration-300 ${input.trim() ? 'bg-primary text-white shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:scale-105' : 'bg-white/5 text-muted-foreground/30 cursor-not-allowed'}`}>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  /* ━━━ Context Right Sidebar (Desktop only) ━━━ */
  const contextPane = (
    <aside className="hidden w-72 flex-col border-l border-white/[0.06] bg-[#0b0d12] xl:flex">
      <div className="p-6 border-b border-white/[0.05]">
        <h3 className="text-lg font-bold text-foreground truncate">{activeTitle}</h3>
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{activeDescription}</p>
        {!selectedDM && <button onClick={() => setShowSettingsModal(true)} className="mt-4 w-full rounded-xl bg-white/[0.05] border border-white/10 py-2.5 text-sm font-bold hover:bg-white/10 transition-colors">Manage Room</button>}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Members</h4>
        <div className="space-y-1">
          {communityMembers.map((m) => (
            <button key={m.id} onClick={() => openMemberProfile(m)} className="flex w-full items-center gap-3 rounded-xl p-2.5 hover:bg-white/[0.05] text-left transition-colors">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">{m.initials}</div>
                {m.online && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b0d12] bg-emerald-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{m.name}</p>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${roleTone[m.role] ?? 'text-muted-foreground'}`}>{m.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );

  /* ━━━ Modals ━━━ */
  const createRoomModal = showCreateRoomModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#0f1118] shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-white/10 bg-black/30 p-5">
          <h3 className="text-lg font-bold text-foreground">Create Room</h3>
          <button onClick={() => setShowCreateRoomModal(false)} className="text-muted-foreground hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 space-y-5">
          <input value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} placeholder="Room name (e.g. alerts)" className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm font-bold text-foreground outline-none focus:border-primary/50" autoFocus />
          <button onClick={() => setIsNewRoomVip(!isNewRoomVip)} className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${isNewRoomVip ? 'border-fuchsia-500/30 bg-fuchsia-500/10' : 'border-white/10 bg-black/30'}`}>
            <div className={`flex h-6 w-6 items-center justify-center rounded border-2 ${isNewRoomVip ? 'border-fuchsia-500 bg-fuchsia-500 text-white' : 'border-white/20'}`}>{isNewRoomVip && <Lock className="h-3.5 w-3.5" />}</div>
            <div><p className="text-sm font-bold text-foreground">VIP Exclusive</p><p className="text-[11px] text-muted-foreground mt-0.5">Token-gated access only.</p></div>
          </button>
        </div>
        <div className="flex justify-end gap-3 p-5 border-t border-white/10 bg-black/30">
          <button onClick={() => setShowCreateRoomModal(false)} className="px-4 py-2 text-sm font-bold text-muted-foreground hover:text-white">Cancel</button>
          <button onClick={handleCreateRoom} disabled={!newRoomName.trim()} className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(217,70,239,0.3)] disabled:opacity-50 disabled:shadow-none">Create</button>
        </div>
      </div>
    </div>
  );

  const profileModal = showUserProfileModal && profileTarget && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[24px] border border-white/10 bg-[#0f1118] shadow-2xl overflow-hidden animate-in zoom-in-95 relative">
        <button onClick={() => setShowUserProfileModal(false)} className="absolute right-4 top-4 z-10 rounded-full p-2 bg-black/40 text-white/70 hover:text-white"><X className="h-5 w-5" /></button>
        <div className="h-32 bg-gradient-to-br from-indigo-600/40 to-primary/20 w-full" />
        <div className="px-6 pb-6 -mt-12">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#0f1118] bg-indigo-500/20 text-3xl font-bold text-indigo-300 backdrop-blur-md shadow-lg">
            {profileTarget.initials}
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">{profileTarget.name} {profileTarget.role === 'Admin' && <BadgeCheck className="h-5 w-5 text-indigo-400" />}</h3>
            <p className={`mt-1 text-xs font-bold uppercase tracking-wider ${roleTone[profileTarget.role ?? 'Member'] ?? 'text-muted-foreground'}`}>{profileTarget.role}</p>
          </div>
          <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="flex items-center gap-3"><Wallet className="h-4 w-4 text-muted-foreground" /><div><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Wallet</p><p className="font-mono text-xs text-foreground mt-0.5">{profileTarget.wallet}</p></div></div>
            <div className="flex items-center gap-3"><Users className="h-4 w-4 text-muted-foreground" /><div><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</p><p className="text-xs font-bold text-foreground mt-0.5">{profileTarget.online ? 'Online now' : 'Offline'}</p></div></div>
          </div>
          <button onClick={() => { setShowUserProfileModal(false); if(profileTarget.id !== 'you') { setSelectedDM(profileTarget.id); setActiveTab('dms'); if(isMobile) setMobileShowChat(true); } }} className="mt-5 w-full rounded-xl bg-indigo-500 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-transform">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[#080a0f] text-foreground">
      {isMobile ? (
        mobileShowChat ? chatCanvas : <div className="flex-1 w-full">{navPane}</div>
      ) : (
        <>
          <aside className="w-[300px] shrink-0 border-r border-white/[0.05]">{navPane}</aside>
          <main className="flex-1 min-w-0">{chatCanvas}</main>
          {contextPane}
        </>
      )}
      {createRoomModal}
      {profileModal}
    </div>
  );
};

export default CommunityLounge;
