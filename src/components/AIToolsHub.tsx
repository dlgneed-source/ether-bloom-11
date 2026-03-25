import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Radio, Code, Zap, Brain, Eye, MessageSquare, Cpu, Sparkles, Image, ChevronDown } from 'lucide-react';

const aiModels = [
  {
    id: 'cogito', name: 'Cogito 671B v2.1', icon: Brain, tag: 'Reasoning',
    desc: 'Hybrid reasoning model with exceptional problem-solving. Built on DeepSeek R1 architecture with enhanced chain-of-thought capabilities.',
    pricing: { uncached: '$1.50/M', cached: '$0.80/M', output: '$1.50/M', context: '163K' },
    isStep: false,
  },
  {
    id: 'llama', name: 'Llama 3.3 70B Instruct', icon: MessageSquare, tag: 'LLM',
    desc: "Meta's powerful open-source LLM. Industry-leading performance for chat, code generation, and instruction following.",
    pricing: { uncached: '$1.20/M', cached: '$0.60/M', output: '$1.20/M', context: '131K' },
    isStep: false,
  },
  {
    id: 'glm5', name: 'GLM 5', icon: Sparkles, tag: 'Multimodal',
    desc: 'General-purpose multimodal language model for complex tasks. Optimized for code generation, analysis, and creative tasks.',
    pricing: { uncached: '$1.30/M', cached: '$0.30/M', output: '$3.60/M' },
    isStep: false,
  },
  {
    id: 'qwen3b', name: 'QWEN 3B', icon: Cpu, tag: 'Lightweight',
    desc: 'Efficient 3B parameter model excelling in multilingual tasks, math, and coding. Great balance of speed and capability.',
    pricing: { uncached: '$0.30/M', cached: '$0.15/M', output: '$0.30/M', context: '40K' },
    isStep: false,
  },
  {
    id: 'flux-schnell', name: 'Flux.1 [Schnell] FP8', icon: Zap, tag: 'Image Gen',
    desc: 'Ultra-fast image generation model. Optimized for speed with high quality outputs.',
    pricing: { stepPrice: '$0.0005/step', defaultSteps: '4 Steps' },
    isStep: true,
  },
  {
    id: 'flux-dev', name: 'Flux.1 [dev] FP8', icon: Eye, tag: 'Image Gen',
    desc: 'High-fidelity image generation for development and production. Superior quality with fine-grained prompt adherence.',
    pricing: { stepPrice: '$0.0008/step', defaultSteps: '29 Steps' },
    isStep: true,
  },
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

const styleOptions = ['Photorealistic', 'Digital Art', 'Anime', 'Oil Painting', 'Pixel Art', '3D Render'];

const AIToolsHub: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [imgPrompt, setImgPrompt] = useState('');
  const [imgStyle, setImgStyle] = useState(styleOptions[0]);

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
                className="glass-white rounded-2xl p-4 text-left transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-[30px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <model.icon className="w-5 h-5 text-primary" />
                    <span className="text-[9px] font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">{model.tag}</span>
                  </div>
                  <p className="text-sm font-bold text-primary-foreground">{model.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                    {model.isStep
                      ? `${model.pricing.stepPrice} • ${model.pricing.defaultSteps}`
                      : `In: ${model.pricing.uncached} • Out: ${model.pricing.output}`
                    }
                  </p>
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
                  {activeModel.isStep ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Price per Step</span>
                        <span className="text-xs font-bold text-primary">{activeModel.pricing.stepPrice}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Default Steps</span>
                        <span className="text-xs font-bold text-accent">{activeModel.pricing.defaultSteps}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Uncached Input</span>
                        <span className="text-xs font-bold text-primary">{activeModel.pricing.uncached}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Cached Input</span>
                        <span className="text-xs font-bold text-accent">{activeModel.pricing.cached}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Output</span>
                        <span className="text-xs font-bold text-neon-green">{activeModel.pricing.output}</span>
                      </div>
                      {activeModel.pricing.context && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Context Window</span>
                          <span className="text-xs font-bold text-foreground">{activeModel.pricing.context}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <button className="mt-5 w-full bg-gradient-to-r from-accent to-primary text-primary-foreground py-3 rounded-xl font-bold text-sm glow-fuchsia">
                  Launch Model
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Generation Studio */}
        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-sm font-bold text-primary-foreground mb-3 flex items-center gap-2">
            <Image className="w-4 h-4 text-primary" /> Image Generation Studio
          </h2>
          <div className="space-y-3">
            <input
              value={imgPrompt}
              onChange={(e) => setImgPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <select
                  value={imgStyle}
                  onChange={(e) => setImgStyle(e.target.value)}
                  className="w-full appearance-none bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-8"
                >
                  {styleOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <button className="bg-gradient-to-r from-accent to-primary text-primary-foreground py-2.5 px-6 rounded-xl font-bold text-sm glow-fuchsia shrink-0">
                Generate
              </button>
            </div>
          </div>
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
