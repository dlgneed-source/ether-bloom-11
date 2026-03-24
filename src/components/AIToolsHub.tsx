import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Sparkles, Radio, Code, Cpu, Zap, Brain, Eye, MessageSquare } from 'lucide-react';

const aiModels = [
  { id: 'cogito', name: 'Cogito 671B', icon: Brain, desc: 'Hybrid reasoning model with exceptional problem-solving. Built on DeepSeek R1 architecture with enhanced chain-of-thought capabilities.', inputPrice: '0.9', outputCached: '2.8', outputPrice: '4.5', tag: 'Reasoning' },
  { id: 'gml5', name: 'GML 5', icon: Sparkles, desc: 'General-purpose multimodal language model for complex tasks. Optimized for code generation, analysis, and creative tasks.', inputPrice: '0.9', outputCached: '2.8', outputPrice: '4.5', tag: 'Multimodal' },
  { id: 'flux-schnell', name: 'Flux Schnell', icon: Zap, desc: 'Ultra-fast image generation model. Optimized for speed with high quality outputs in under 2 seconds per image.', inputPrice: '0.9', outputCached: '2.8', outputPrice: '4.5', tag: 'Image Gen' },
  { id: 'flux-dev', name: 'Flux Dev', icon: Eye, desc: 'High-fidelity image generation for development and production. Superior quality with fine-grained prompt adherence.', inputPrice: '0.9', outputCached: '2.8', outputPrice: '4.5', tag: 'Image Gen' },
  { id: 'qwen8b', name: 'Qwen 8B', icon: Cpu, desc: 'Efficient 8B parameter model excelling in multilingual tasks, math, and coding. Great balance of speed and capability.', inputPrice: '0.9', outputCached: '2.8', outputPrice: '4.5', tag: 'Lightweight' },
  { id: 'llama72b', name: 'Llama 72B', icon: MessageSquare, desc: 'Meta\'s powerful open-source LLM. Industry-leading performance for chat, code generation, and instruction following.', inputPrice: '0.9', outputCached: '2.8', outputPrice: '4.5', tag: 'LLM' },
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
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeModel = aiModels.find(m => m.id === selectedModel);

  return (
    <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {/* AI Models Section */}
        <div>
          <h2 className="text-sm font-bold text-primary-foreground mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> AI Workspace
          </h2>
          <p className="text-xs text-muted-foreground mb-4">Enterprise-grade AI models at your fingertips.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {aiModels.map((model) => (
              <motion.button
                key={model.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedModel(model.id)}
                className="glass rounded-2xl p-4 text-left transition-all hover:border-primary/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full blur-[30px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <model.icon className="w-5 h-5 text-primary" />
                    <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{model.tag}</span>
                  </div>
                  <p className="text-sm font-bold text-primary-foreground">{model.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{model.desc.slice(0, 60)}...</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Model Detail Modal */}
        <AnimatePresence>
          {selectedModel && activeModel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-xl"
              onClick={() => setSelectedModel(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="glass-strong rounded-3xl p-6 sm:p-8 max-w-md w-full relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 rounded-full blur-[50px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-[40px] pointer-events-none" />
                <button onClick={() => setSelectedModel(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent to-primary flex items-center justify-center glow-fuchsia">
                    <activeModel.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-foreground">{activeModel.name}</h3>
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{activeModel.tag}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5">{activeModel.desc}</p>
                <div className="glass rounded-xl p-4 space-y-2.5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Pricing</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Input</span>
                    <span className="text-xs font-bold text-primary">{activeModel.inputPrice} <span className="text-muted-foreground font-normal">U/M tokens</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Output Cached</span>
                    <span className="text-xs font-bold text-accent">{activeModel.outputCached} <span className="text-muted-foreground font-normal">U/M tokens</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Output</span>
                    <span className="text-xs font-bold text-neon-green">{activeModel.outputPrice} <span className="text-muted-foreground font-normal">U/M tokens</span></span>
                  </div>
                </div>
                <button className="mt-5 w-full bg-gradient-to-r from-accent to-primary text-primary-foreground py-3 rounded-xl font-bold text-sm glow-fuchsia">
                  Launch Model
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
