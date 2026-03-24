import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, MessageSquare, Volume2, Code, Copy, Check, Sparkles, Radio } from 'lucide-react';

const aiTools = [
  { id: 'imggen', name: 'Image Gen', icon: Image, desc: 'Generate images from text prompts using AI models.' },
  { id: 'llm', name: 'LLM Chat', icon: MessageSquare, desc: 'Conversational AI powered by Web3-native models.' },
  { id: 'tts', name: 'Text to Speech', icon: Volume2, desc: 'Convert text to natural speech in 30+ languages.' },
];

const srcDrops = [
  {
    id: 1,
    title: 'BEP-20 Token Factory',
    lang: 'Solidity',
    time: '2h ago',
    snippet: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}`,
  },
  {
    id: 2,
    title: 'React Web3 Hook',
    lang: 'TypeScript',
    time: '5h ago',
    snippet: `import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const useWallet = () => {
  const [account, setAccount] = useState<string>('');
  
  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum
          .request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      }
    };
    connect();
  }, []);

  return { account };
};`,
  },
  {
    id: 3,
    title: 'AI Prompt Template',
    lang: 'Python',
    time: '8h ago',
    snippet: `from fireworks.client import Fireworks

client = Fireworks(api_key="YOUR_KEY")

response = client.chat.completions.create(
    model="accounts/fireworks/models/llama-v3",
    messages=[{
        "role": "user",
        "content": "Explain DeFi yield farming"
    }]
)
print(response.choices[0].message.content)`,
  },
];

const AIToolsHub: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {/* AI Tools Section */}
        <div>
          <h2 className="text-sm font-bold text-primary-foreground mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> AI Workspace
          </h2>
          <p className="text-xs text-muted-foreground mb-4">Enterprise-grade AI tools at your fingertips.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {aiTools.map((tool) => (
              <motion.button
                key={tool.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                className={`glass rounded-2xl p-4 sm:p-5 text-left transition-all ${
                  activeTool === tool.id ? 'border-primary/50 glow-fuchsia' : 'hover:border-primary/20'
                }`}
              >
                <tool.icon className={`w-6 h-6 mb-3 ${activeTool === tool.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-sm font-bold text-primary-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </motion.button>
            ))}
          </div>

          {/* Active tool workspace */}
          {activeTool && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="glass-strong rounded-2xl p-5 mt-3 overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  {aiTools.find((t) => t.id === activeTool)?.name} — Ready
                </span>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 min-h-[120px] flex items-center justify-center border border-border/30">
                <p className="text-sm text-muted-foreground text-center">
                  {activeTool === 'imggen' && '🎨 Enter a prompt below to generate an image...'}
                  {activeTool === 'llm' && '💬 Start a conversation with the AI model...'}
                  {activeTool === 'tts' && '🔊 Paste text to convert to speech...'}
                </p>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  placeholder={activeTool === 'tts' ? 'Enter text to convert...' : 'Enter your prompt...'}
                  className="flex-1 bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-gradient-to-r from-accent to-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold glow-fuchsia">
                  Go
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* SRC Drops Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-primary-foreground flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" /> Daily SRC Drops
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Ready-to-run snippets from the Telegram Broadcast.</p>
            </div>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Radio className="w-3 h-3" /> Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {srcDrops.map((drop) => (
              <motion.div
                key={drop.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
                  <div>
                    <p className="text-sm font-bold text-primary-foreground">{drop.title}</p>
                    <p className="text-[10px] text-muted-foreground">{drop.lang} • {drop.time} • via Telegram</p>
                  </div>
                  <button
                    onClick={() => copyCode(drop.id, drop.snippet)}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    {copiedId === drop.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === drop.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-xs font-mono text-foreground/80 leading-relaxed scrollbar-hide">
                  <code>{drop.snippet}</code>
                </pre>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsHub;
