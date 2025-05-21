
import React from 'react';
import { InteractionEvent, InteractionStats } from '@/hooks/useInteractionTracking';
import { formatTimeSpent, calculateEngagementScore, getMostInteractedElements, analyzePreferences } from '@/utils/analyticsUtils';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface AnalyticsPanelProps {
  events: InteractionEvent[];
  stats: InteractionStats;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ events, stats }) => {
  const recentEvents = events.slice(-10).reverse();
  const engagementScore = calculateEngagementScore(stats);
  const mostActive = getMostInteractedElements(stats);
  const preferences = analyzePreferences(stats);
  
  return (
    <div className="analytics-panel h-full overflow-y-auto p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">
        Analytics Dashboard
        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-analytics-highlight animate-pulse-soft"></span>
      </h2>
      
      <div className="space-y-6">
        {/* Real-time metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Interactions</h3>
            <p className="text-2xl font-bold">{stats.clicks}</p>
          </div>
          
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Time Spent</h3>
            <p className="text-2xl font-bold">{formatTimeSpent(stats.timeSpent)}</p>
          </div>
          
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Mouse Distance</h3>
            <p className="text-2xl font-bold">{Math.round(stats.mouseDistance)}px</p>
          </div>
          
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Elements Interacted</h3>
            <p className="text-2xl font-bold">{stats.activeAreas.size}</p>
          </div>
        </div>
        
        {/* Engagement score */}
        <div className="bg-analytics-accent p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <h3 className="text-sm font-medium">Engagement Score</h3>
            <span className="text-sm font-bold">{engagementScore}/100</span>
          </div>
          <Progress value={engagementScore} className="h-2 bg-analytics-text/20" />
          {engagementScore > 70 && (
            <p className="text-xs mt-2 text-green-400">High engagement detected!</p>
          )}
        </div>
        
        {/* Most active elements */}
        <div>
          <h3 className="text-sm font-medium mb-2">Most Active Elements</h3>
          <div className="space-y-2">
            {mostActive.length > 0 ? (
              mostActive.map(([element, count]) => (
                <div key={element} className="flex justify-between items-center bg-analytics-accent p-2 rounded-md">
                  <span className="text-xs">{element}</span>
                  <span className="text-xs font-bold">{count} interactions</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-analytics-text/50">No interactions recorded yet</p>
            )}
          </div>
        </div>
        
        {/* Analyzed preferences */}
        <div>
          <h3 className="text-sm font-medium mb-2">Analyzed Preferences</h3>
          {preferences.length > 0 ? (
            <ul className="list-disc list-inside text-xs space-y-1">
              {preferences.map((pref) => (
                <li key={pref} className="text-analytics-highlight">{pref}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-analytics-text/50">Insufficient data to analyze preferences</p>
          )}
        </div>
        
        <Separator className="bg-analytics-text/20" />
        
        {/* Event log */}
        <div>
          <h3 className="text-sm font-medium mb-2">Live Event Log</h3>
          <div className="bg-analytics-background border border-analytics-accent/30 rounded-md h-40 overflow-y-auto p-2">
            {recentEvents.length > 0 ? (
              recentEvents.map((event, i) => (
                <div key={i} className="text-xs mb-1 animate-fade-in">
                  <span className="text-analytics-highlight">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  <span className="mx-1">-</span>
                  <span className="capitalize">{event.type}</span>
                  {event.target && <span> on {event.target}</span>}
                  {event.type === 'hover' && event.duration && <span> ({Math.round(event.duration / 1000)}s)</span>}
                </div>
              ))
            ) : (
              <p className="text-xs text-analytics-text/50">No events recorded yet</p>
            )}
          </div>
        </div>
        
        {/* Algorithm insights */}
        <div className="bg-analytics-highlight/10 border border-analytics-highlight/30 p-3 rounded-md">
          <h3 className="text-sm font-medium mb-1">Algorithm Insight</h3>
          <p className="text-xs">
            {engagementScore > 50 
              ? "User shows high interest in interactive content. Recommending more similar elements to increase engagement."
              : "Low interaction detected. Algorithm would prioritize different content types to boost engagement."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
