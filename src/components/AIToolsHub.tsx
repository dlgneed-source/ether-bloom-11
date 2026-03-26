import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Cpu, Image, Layers, Zap, X, CreditCard, Key, Plus, Trash2, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';

const models = [
  { id: 'llama', name: 'Llama 3.3 70B Instruct' },
  { id: 'flux-schnell', name: 'Flux.1 [Schnell] FP8' },
  { id: 'flux-dev', name: 'Flux.1 [dev] FP8' },
  { id: 'cogito', name: 'Cogito 671B v2.1' },
  { id: 'glm5', name: 'GLM 5' },
  { id: 'qwen3b', name: 'QWEN 3B' },
];

const aspectRatios = ['1:1', '16:9', '9:16', '4:3', '3:2'];

const recentThumbs = [
  { id: 1, label: 'Abstract Render' },
  { id: 2, label: 'Neural Map' },
  { id: 3, label: 'Token Flow' },
  { id: 4, label: 'Cyber Grid' },
];

const dummyApiKeys = [
  { id: 'ak_1', name: 'Production Key', key: 'sk-proj-****...8f2a', created: '2024-12-01', status: 'active' as const },
  { id: 'ak_2', name: 'Development Key', key: 'sk-dev-****...c1b3', created: '2025-01-15', status: 'active' as const },
];

const AIToolsHub: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [showCredits, setShowCredits] = useState(false);
  const [showDevPortal, setShowDevPortal] = useState(false);
  const [apiKeys, setApiKeys] = useState(dummyApiKeys);
  const [showKeyId, setShowKeyId] = useState<string | null>(null);

  const creditsUsed = 8450;
  const creditsTotal = 10000;
  const usagePercent = (creditsUsed / creditsTotal) * 100;
  const isHighUsage = usagePercent > 90;

  const totalSpend = 5.30;
  const llmInputTokens = 124500;
  const llmOutputTokens = 89200;
  const imageGenSteps = { schnell: 42, dev: 18 };

  const removeKey = (id: string) => setApiKeys(apiKeys.filter(k => k.id !== id));
  const addKey = () => {
    const newKey = {
      id: `ak_${Date.now()}`,
      name: `Key ${apiKeys.length + 1}`,
      key: `sk-new-****...${Math.random().toString(36).slice(-4)}`,
      created: new Date().toISOString().split('T')[0],
      status: 'active' as const,
    };
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-wide flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Premium AI Utility Hub
            </h1>
            <p className="text-xs text-muted-foreground mt-1 tracking-wide">Enterprise-grade synthesis engine</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCredits(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
            >
              <CreditCard className="w-3.5 h-3.5" /> Credits
            </button>
            <button
              onClick={() => setShowDevPortal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
            >
              <Key className="w-3.5 h-3.5" /> API Keys
            </button>
          </div>
        </div>

        {/* Credit Usage Modal */}
        <AnimatePresence>
          {showCredits && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowCredits(false)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-background border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Credit Usage</h2>
                  <button onClick={() => setShowCredits(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                </div>

                {/* Total Spend */}
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Total AI Spend</p>
                  <p className="text-3xl font-extrabold text-foreground">${totalSpend.toFixed(2)} <span className="text-sm text-muted-foreground font-normal">USDT</span></p>
                </div>

                {/* LLM Usage */}
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">LLM Token Usage</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Input Tokens</span>
                    <span className="font-mono font-semibold text-foreground">{llmInputTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Output Tokens</span>
                    <span className="font-mono font-semibold text-foreground">{llmOutputTokens.toLocaleString()}</span>
                  </div>
                </div>

                {/* Image Gen Usage */}
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 space-y-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Image Generation (Steps)</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Flux.1 [Schnell]</span>
                    <span className="font-mono font-semibold text-foreground">{imageGenSteps.schnell} steps</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Flux.1 [dev]</span>
                    <span className="font-mono font-semibold text-foreground">{imageGenSteps.dev} steps</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Developer Portal Modal */}
        <AnimatePresence>
          {showDevPortal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDevPortal(false)}>
              <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl bg-background border border-white/10 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-2"><Key className="w-4 h-4 text-primary" /> Developer API Keys</h2>
                  <button onClick={() => setShowDevPortal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                </div>

                <div className="space-y-2">
                  {apiKeys.map((ak) => (
                    <div key={ak.id} className="rounded-xl bg-white/[0.04] border border-white/10 p-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{ak.name}</p>
                        <p className="text-[10px] font-mono text-muted-foreground truncate">
                          {showKeyId === ak.id ? `sk-full-key-${ak.id}-visible` : ak.key}
                        </p>
                        <p className="text-[9px] text-muted-foreground">Created {ak.created}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => setShowKeyId(showKeyId === ak.id ? null : ak.id)} className="p-1.5 rounded-md hover:bg-white/5 text-muted-foreground">
                          {showKeyId === ak.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-white/5 text-muted-foreground"><Copy className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-md hover:bg-white/5 text-muted-foreground"><RefreshCw className="w-3.5 h-3.5" /></button>
                        <button onClick={() => removeKey(ak.id)} className="p-1.5 rounded-md hover:bg-red-500/10 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={addKey} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/20 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-white/30 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Generate New API Key
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column — Configuration Panel */}
          <div className="lg:col-span-4 space-y-5">
            {/* Access Tier */}
            <div className="rounded-lg bg-white/5 border border-white/10 backdrop-blur-md p-4">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-1">Access Tier</p>
              <p className="text-sm font-semibold text-foreground">VIP Tier (Plan 4)</p>
            </div>

            {/* API Credit Meter */}
            <div className="rounded-lg bg-white/5 border border-white/10 backdrop-blur-md p-4">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-2">API Credit Meter</p>
              <div className="flex items-baseline justify-between mb-2">
                <span className={`text-sm font-semibold ${isHighUsage ? 'text-red-500' : 'text-foreground'}`}>
                  {creditsUsed.toLocaleString()} / {creditsTotal.toLocaleString()}
                </span>
                <span className={`text-xs ${isHighUsage ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {usagePercent.toFixed(1)}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isHighUsage ? 'bg-red-500' : 'bg-primary'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${usagePercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Synthesis Engine Form */}
            <div className="rounded-lg bg-white/5 border border-white/10 backdrop-blur-md p-4 space-y-4">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Synthesis Engine</p>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Model</label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full appearance-none rounded-md bg-black/20 border border-white/10 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary pr-8"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id} className="bg-background text-foreground">{m.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your synthesis target..."
                  rows={4}
                  className="w-full rounded-md bg-black/20 border border-white/10 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Aspect Ratio</label>
                <div className="flex flex-wrap gap-2">
                  {aspectRatios.map((r) => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                        aspectRatio === r
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/20'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Generate Asset
              </button>
            </div>
          </div>

          {/* Right Column — Canvas */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-lg border border-white/10 bg-black/30 backdrop-blur-md aspect-[16/10] flex flex-col items-center justify-center">
              <Layers className="w-10 h-10 text-white/15 mb-3 stroke-1" />
              <p className="text-sm text-muted-foreground font-medium">Awaiting Prompt Synthesis</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Select a model and enter a prompt to begin</p>
            </div>

            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-3">Recent Generations</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {recentThumbs.map((t) => (
                  <div
                    key={t.id}
                    className="aspect-square rounded-lg border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center hover:border-primary/40 transition-colors cursor-pointer group"
                  >
                    <Image className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors mb-1" />
                    <span className="text-[9px] text-muted-foreground">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsHub;
