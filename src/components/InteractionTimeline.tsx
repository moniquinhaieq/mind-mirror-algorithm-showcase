
import React from 'react';
import { InteractionEvent } from '@/hooks/useInteractionTracking';
import { formatTimeSpent } from '@/utils/analyticsUtils';

interface InteractionTimelineProps {
  events: InteractionEvent[];
  limit?: number;
}

const InteractionTimeline: React.FC<InteractionTimelineProps> = ({ events, limit = 6 }) => {
  const recentEvents = events.slice(-limit).reverse();
  const startTime = events.length > 0 ? events[0].timestamp : Date.now();
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'click': return '👆';
      case 'hover': return '👁️';
      case 'scroll': return '📜';
      case 'movement': return '🖱️';
      default: return '⚡';
    }
  };
  
  const getEventDescription = (event: InteractionEvent) => {
    switch (event.type) {
      case 'click':
        return `Clicou em ${event.target || 'área'}`;
      case 'hover':
        return `Observou ${event.target || 'área'} por ${event.duration ? Math.round(event.duration / 1000) : 0}s`;
      case 'scroll':
        return `Rolou a página até ${Math.round(event.y)}%`;
      case 'movement':
        return 'Moveu o cursor';
      default:
        return 'Interação desconhecida';
    }
  };
  
  const timeFromStart = (timestamp: number) => {
    return formatTimeSpent(Math.floor((timestamp - startTime) / 1000));
  };
  
  if (recentEvents.length === 0) {
    return (
      <div className="bg-analytics-accent/30 p-3 rounded-md text-center">
        <p className="text-xs text-analytics-text/70">Aguardando interações...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-1.5">
      {recentEvents.map((event, index) => (
        <div 
          key={`timeline-${index}-${event.timestamp}`}
          className="flex items-center gap-2 bg-analytics-accent/30 p-2 rounded-md animate-fade-in"
        >
          <span className="text-sm">{getEventIcon(event.type)}</span>
          <div className="flex-1">
            <p className="text-xs">{getEventDescription(event)}</p>
          </div>
          <span className="text-xs text-analytics-highlight">
            {timeFromStart(event.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default InteractionTimeline;
