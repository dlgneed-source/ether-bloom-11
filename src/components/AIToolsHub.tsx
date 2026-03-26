import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, Cpu, Image, Layers, Zap } from 'lucide-react';

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

const AIToolsHub: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const creditsUsed = 8450;
  const creditsTotal = 10000;
  const usagePercent = (creditsUsed / creditsTotal) * 100;
  const isHighUsage = usagePercent > 90;

  return (
    <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-foreground tracking-wide flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            Premium AI Utility Hub
          </h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-wide">Enterprise-grade synthesis engine</p>
        </div>

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
                  className={`h-full rounded-full ${isHighUsage ? 'bg-red-500' : 'bg-purple-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${usagePercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Synthesis Engine Form */}
            <div className="rounded-lg bg-white/5 border border-white/10 backdrop-blur-md p-4 space-y-4">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Synthesis Engine</p>

              {/* Model Selector */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Model</label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full appearance-none rounded-md bg-black/20 border border-white/10 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 pr-8"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id} className="bg-[#1c0333] text-white">{m.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Prompt */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your synthesis target..."
                  rows={4}
                  className="w-full rounded-md bg-black/20 border border-white/10 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Aspect Ratio</label>
              <div className="flex flex-wrap gap-2">
                  {aspectRatios.map((r) => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                        aspectRatio === r
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-black/20 border-white/10 text-muted-foreground hover:border-white/20'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Generate Asset
              </button>
            </div>
          </div>

          {/* Right Column — Canvas */}
          <div className="lg:col-span-8 space-y-4">
            {/* Main Canvas */}
            <div className="rounded-lg border border-white/10 bg-black/30 backdrop-blur-md aspect-[16/10] flex flex-col items-center justify-center">
              <Layers className="w-10 h-10 text-white/15 mb-3 stroke-1" />
              <p className="text-sm text-muted-foreground font-medium">Awaiting Prompt Synthesis</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Select a model and enter a prompt to begin</p>
            </div>

            {/* Recent Generations */}
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-3">Recent Generations</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {recentThumbs.map((t) => (
                  <div
                    key={t.id}
                    className="aspect-square rounded-lg border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center hover:border-purple-500/40 transition-colors cursor-pointer group"
                  >
                    <Image className="w-5 h-5 text-white/20 group-hover:text-purple-400 transition-colors mb-1" />
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
