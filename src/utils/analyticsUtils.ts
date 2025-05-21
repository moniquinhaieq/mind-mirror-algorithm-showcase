
import { InteractionEvent, InteractionStats } from '@/hooks/useInteractionTracking';

// Calculate heatmap data from click events
export const calculateHeatmapData = (events: InteractionEvent[]) => {
  const clickEvents = events.filter(event => event.type === 'click');
  
  // Group by coordinates (simplified for this demo)
  const heatPoints = new Map<string, number>();
  
  clickEvents.forEach(event => {
    const key = `${Math.floor(event.x / 20)},${Math.floor(event.y / 20)}`;
    const count = heatPoints.get(key) || 0;
    heatPoints.set(key, count + 1);
  });
  
  return Array.from(heatPoints).map(([key, value]) => {
    const [x, y] = key.split(',').map(Number);
    return { x: x * 20, y: y * 20, value };
  });
};

// Get most interacted elements
export const getMostInteractedElements = (stats: InteractionStats) => {
  const elementInteractions = Array.from(stats.activeAreas.entries());
  return elementInteractions
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
};

// Calculate user engagement score (0-100)
export const calculateEngagementScore = (stats: InteractionStats) => {
  // Very simple engagement score calculation
  const clickWeight = 5;
  const hoverWeight = 0.01;
  const movementWeight = 0.001;
  const timeWeight = 0.5;
  
  const clickScore = Math.min(stats.clicks * clickWeight, 40);
  
  const totalHoverTime = Array.from(stats.hovers.values()).reduce((sum, time) => sum + time, 0);
  const hoverScore = Math.min(totalHoverTime * hoverWeight, 25);
  
  const movementScore = Math.min(stats.mouseDistance * movementWeight, 15);
  
  const timeScore = Math.min(stats.timeSpent * timeWeight, 20);
  
  return Math.min(100, Math.round(clickScore + hoverScore + movementScore + timeScore));
};

// Calculate preferences based on interaction patterns
export const analyzePreferences = (stats: InteractionStats) => {
  const clickPatterns = Array.from(stats.activeAreas.entries());
  const hoverPatterns = Array.from(stats.hovers.entries());
  
  // Combine click and hover data with different weights
  const combinedInterest = new Map<string, number>();
  
  clickPatterns.forEach(([key, value]) => {
    combinedInterest.set(key, (combinedInterest.get(key) || 0) + value * 10);
  });
  
  hoverPatterns.forEach(([key, value]) => {
    combinedInterest.set(key, (combinedInterest.get(key) || 0) + value * 0.01);
  });
  
  // Sort by interest level
  return Array.from(combinedInterest.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key);
};

export const formatTimeSpent = (seconds: number) => {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};
