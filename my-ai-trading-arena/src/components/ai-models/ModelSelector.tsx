/**
 * ModelSelector — dropdown/segmented control for selecting an AI model
 */

import { cn } from '../../lib/utils';
import { MODEL_PROFILES } from '../../lib/constants';
import type { ModelId } from '../../types';

interface ModelSelectorProps {
  selectedModel: ModelId | null;
  onSelect: (modelId: ModelId | null) => void;
}

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-bg-tertiary border border-border-primary overflow-x-auto">
      {/* "All" option */}
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all duration-200',
          selectedModel === null
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-text-secondary hover:text-text-primary'
        )}
      >
        All Models
      </button>

      {/* Individual model options */}
      {MODEL_PROFILES.map((model) => (
        <button
          key={model.id}
          onClick={() => onSelect(model.id)}
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
  );
}
