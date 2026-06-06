/**
 * SystemPromptViewer — displays the AI trading system prompts for each model
 * Shows base prompt, per-model personality, HFT mode, and risk controls
 */

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Shield, Cpu, Brain, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MODEL_PROFILES } from '../../lib/constants';
import {
  BASE_TRADING_PROMPT,
  MODEL_PERSONALITY_PROMPTS,
  HFT_MODE_PROMPT,
  RISK_CONTROL_PROMPT,
  getFullSystemPrompt,
} from '../../services/prompts';
import type { ModelId } from '../../types';

type PromptSection = 'base' | 'personality' | 'hft' | 'risk' | 'full';

const sectionConfig: Record<PromptSection, { label: string; icon: React.ElementType | null; color: string }> = {
  base: { label: 'Base System Prompt', icon: Cpu, color: 'text-blue-500' },
  personality: { label: 'Model Personality', icon: Brain, color: 'text-purple-500' },
  hft: { label: 'HFT Mode', icon: Zap, color: 'text-yellow-500' },
  risk: { label: 'Risk Controls', icon: Shield, color: 'text-red-500' },
  full: { label: 'Full Prompt (Combined)', icon: null, color: 'text-green-500' },
};

function PromptBlock({ title, content, color }: { title: string; content: string; color: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border-primary rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-bg-tertiary border-b border-border-primary">
        <span className={cn('text-xs font-bold uppercase tracking-wider', color)}>{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-text-secondary whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto bg-bg-card">
        {content}
      </pre>
    </div>
  );
}

export function SystemPromptViewer() {
  const [selectedModel, setSelectedModel] = useState<ModelId>('kimi');
  const [activeSection, setActiveSection] = useState<PromptSection>('personality');
  const [expandedModels, setExpandedModels] = useState<Set<ModelId>>(new Set());

  const toggleModelExpand = (modelId: ModelId) => {
    setExpandedModels((prev) => {
      const next = new Set(prev);
      if (next.has(modelId)) {
        next.delete(modelId);
      } else {
        next.add(modelId);
      }
      return next;
    });
  };

  const getPromptContent = (): string => {
    switch (activeSection) {
      case 'base':
        return BASE_TRADING_PROMPT;
      case 'personality':
        return MODEL_PERSONALITY_PROMPTS[selectedModel];
      case 'hft':
        return HFT_MODE_PROMPT;
      case 'risk':
        return RISK_CONTROL_PROMPT;
      case 'full':
        return getFullSystemPrompt(selectedModel);
    }
  };

  return (
    <div className="space-y-4">
      {/* Model selector tabs */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-bg-tertiary border border-border-primary overflow-x-auto">
        {MODEL_PROFILES.map((model) => (
          <button
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className={cn(
              'px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all duration-200',
              selectedModel === model.id
                ? 'text-white shadow-lg'
                : 'text-text-secondary hover:text-text-primary'
            )}
            style={
              selectedModel === model.id
                ? { backgroundColor: model.color }
                : undefined
            }
          >
            {model.name}
          </button>
        ))}
      </div>

      {/* Section tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {(Object.keys(sectionConfig) as PromptSection[]).map((section) => {
          const config = sectionConfig[section];
          const Icon = config.icon;
          return (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                activeSection === section
                  ? 'bg-bg-card border border-border-primary text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {Icon && <Icon className={cn('w-3.5 h-3.5', config.color)} />}
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Prompt display */}
      <PromptBlock
        title={`${sectionConfig[activeSection].label} — ${MODEL_PROFILES.find((m) => m.id === selectedModel)?.name}`}
        content={getPromptContent()}
        color={sectionConfig[activeSection].color}
      />

      {/* Model personality cards (compact view) */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">All Model Personalities</h4>
        {MODEL_PROFILES.map((model) => {
          const isExpanded = expandedModels.has(model.id);
          return (
            <div
              key={model.id}
              className="border border-border-primary rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleModelExpand(model.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-card-hover transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: model.color }} />
                  <span className="text-sm font-bold text-text-primary">{model.name}</span>
                  <span className="text-xs text-text-muted">{model.personality}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                )}
              </button>
              {isExpanded && (
                <div className="px-4 pb-3 border-t border-border-primary">
                  <pre className="mt-2 p-3 text-[11px] font-mono text-text-secondary whitespace-pre-wrap leading-relaxed max-h-[200px] overflow-y-auto rounded bg-bg-tertiary">
                    {MODEL_PERSONALITY_PROMPTS[model.id]}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
