import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Hash, Lock, Crown, Plus, Image, Users } from 'lucide-react';

const userLevel = 2; // Simulated: 1=basic, 4=VIP

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  avatar: string;
}

const mockMessages: Message[] = [
  { id: 1, user: 'CryptoKing', text: 'Hey everyone! Just deployed my first smart contract 🚀', time: '2:34 PM', avatar: 'CK' },
  { id: 2, user: 'AIDevSara', text: 'Nice! Which network are you on?', time: '2:35 PM', avatar: 'AS' },
  { id: 3, user: 'CryptoKing', text: 'BEP-20 via the platform tools. Super smooth.', time: '2:36 PM', avatar: 'CK' },
  { id: 4, user: 'Web3Wizard', text: 'Welcome aboard! Check the learning space for Solidity tutorials.', time: '2:38 PM', avatar: 'WW' },
  { id: 5, user: 'NodeRunner', text: 'Anyone running validator nodes? Getting some good yields.', time: '2:41 PM', avatar: 'NR' },
];

const rooms = [
  { id: 'general', name: 'General', icon: Hash, locked: false },
  { id: 'trading', name: 'Trading Signals', icon: Hash, locked: false },
  { id: 'dev', name: 'Dev Talk', icon: Hash, locked: false },
  { id: 'vip', name: 'VIP Lounge', icon: Crown, locked: userLevel < 4 },
];

const CommunityLounge: React.FC = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [activeRoom, setActiveRoom] = useState('general');
  const [showRoomJoin, setShowRoomJoin] = useState(false);
  const [roomId, setRoomId] = useState('');

  const chatUnlocked = userLevel >= 1;

  const sendMessage = () => {
    if (!input.trim() || !chatUnlocked) return;
    setMessages([...messages, { id: Date.now(), user: 'You', text: input, time: 'Now', avatar: 'YO' }]);
    setInput('');
  };

  if (!chatUnlocked) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 pb-20">
        <div className="glass-strong rounded-3xl p-8 text-center max-w-sm">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-lg font-bold text-primary-foreground mb-2">Level 1 Required</h2>
          <p className="text-sm text-muted-foreground">Upgrade to Level 1 to unlock the Community Lounge and start chatting with the network.</p>
          <button className="mt-6 bg-gradient-to-r from-accent to-primary text-primary-foreground py-3 px-6 rounded-xl font-bold text-sm glow-fuchsia">
            Upgrade Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-16 overflow-hidden">
      {/* Room selector */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-3 overflow-x-auto scrollbar-hide border-b border-border/30">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => !room.locked && setActiveRoom(room.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeRoom === room.id
                ? 'bg-primary text-primary-foreground glow-fuchsia'
                : room.locked
                ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            <room.icon className="w-3.5 h-3.5" />
            {room.name}
            {room.locked && <Lock className="w-3 h-3 ml-1" />}
          </button>
        ))}
        <button onClick={() => setShowRoomJoin(!showRoomJoin)} className="shrink-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
          <Plus className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Join room modal */}
      <AnimatePresence>
        {showRoomJoin && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 overflow-hidden"
          >
            <div className="glass rounded-xl p-4 my-2 flex gap-2">
              <input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID..."
                className="flex-1 bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 rounded-lg text-sm font-bold">Join</button>
            </div>
            {userLevel >= 4 && (
              <button className="w-full glass rounded-xl p-3 mb-2 flex items-center justify-center gap-2 text-primary text-sm font-bold hover:bg-primary/10 transition-colors">
                <Crown className="w-4 h-4" /> Create a Room (VIP)
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3 scrollbar-hide">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              msg.user === 'You' ? 'bg-gradient-to-tr from-accent to-primary text-primary-foreground' : 'bg-secondary text-foreground'
            }`}>
              {msg.avatar}
            </div>
            <div className={`max-w-[75%] ${msg.user === 'You' ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-foreground">{msg.user}</span>
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
              </div>
              <div className={`inline-block px-3 py-2 rounded-2xl text-sm ${
                msg.user === 'You'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'glass rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 sm:px-4 pb-2 pt-2 border-t border-border/30">
        <div className="flex items-center gap-2 glass rounded-2xl px-3 py-2">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Image className="w-5 h-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button onClick={sendMessage} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center glow-fuchsia">
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityLounge;
