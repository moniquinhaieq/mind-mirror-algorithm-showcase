
import { useState, useEffect, useRef, useCallback } from 'react';

export type InteractionEvent = {
  type: 'click' | 'hover' | 'scroll' | 'movement';
  timestamp: number;
  x: number;
  y: number;
  target?: string;
  duration?: number;
};

export type InteractionStats = {
  clicks: number;
  hovers: Map<string, number>;
  scrollDepth: number;
  mouseDistance: number;
  timeSpent: number;
  activeAreas: Map<string, number>;
};

export const useInteractionTracking = (elementRef: React.RefObject<HTMLElement>) => {
  const [events, setEvents] = useState<InteractionEvent[]>([]);
  const [stats, setStats] = useState<InteractionStats>({
    clicks: 0,
    hovers: new Map(),
    scrollDepth: 0,
    mouseDistance: 0,
    timeSpent: 0,
    activeAreas: new Map(),
  });
  
  const startTimeRef = useRef<number>(Date.now());
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  // Track a new interaction event
  const trackEvent = useCallback((event: InteractionEvent) => {
    setEvents(prev => [...prev.slice(-100), event]); // Keep last 100 events
    
    // Update statistics based on event type
    setStats(prev => {
      const newStats = { ...prev };
      
      switch (event.type) {
        case 'click':
          newStats.clicks += 1;
          if (event.target) {
            const currentCount = newStats.activeAreas.get(event.target) || 0;
            newStats.activeAreas.set(event.target, currentCount + 1);
          }
          break;
          
        case 'hover':
          if (event.target && event.duration) {
            const currentHoverTime = newStats.hovers.get(event.target) || 0;
            newStats.hovers.set(event.target, currentHoverTime + event.duration);
          }
          break;
          
        case 'scroll':
          newStats.scrollDepth = Math.max(newStats.scrollDepth, event.y);
          break;
          
        case 'movement':
          if (lastMousePosition.current) {
            const dx = event.x - lastMousePosition.current.x;
            const dy = event.y - lastMousePosition.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            newStats.mouseDistance += distance;
          }
          lastMousePosition.current = { x: event.x, y: event.y };
          break;
      }
      
      return newStats;
    });
  }, []);
  
  // Calculate time spent
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setStats(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTimeRef.current) / 1000)
      }));
    }, 1000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Set up event listeners
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    let hoverTarget: string | null = null;
    let hoverStartTime: number | null = null;
    
    const clickHandler = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      const targetId = targetElement.id || targetElement.dataset.tracking || 'unknown';
      
      trackEvent({
        type: 'click',
        timestamp: Date.now(),
        x: e.clientX,
        y: e.clientY,
        target: targetId
      });
    };
    
    const mouseMoveHandler = (e: MouseEvent) => {
      trackEvent({
        type: 'movement',
        timestamp: Date.now(),
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const mouseEnterHandler = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      if (!targetElement.dataset.trackable) return;
      
      const targetId = targetElement.id || targetElement.dataset.tracking || 'unknown';
      hoverTarget = targetId;
      hoverStartTime = Date.now();
    };
    
    const mouseLeaveHandler = () => {
      if (hoverTarget && hoverStartTime) {
        const duration = Date.now() - hoverStartTime;
        
        trackEvent({
          type: 'hover',
          timestamp: Date.now(),
          x: 0, // Not relevant for hover duration
          y: 0, // Not relevant for hover duration
          target: hoverTarget,
          duration
        });
        
        hoverTarget = null;
        hoverStartTime = null;
      }
    };
    
    const scrollHandler = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      trackEvent({
        type: 'scroll',
        timestamp: Date.now(),
        x: 0, // Not relevant for scroll
        y: scrollPercentage,
      });
    };
    
    // Add event listeners
    element.addEventListener('click', clickHandler);
    element.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('scroll', scrollHandler);
    
    // Add event delegation for hover tracking
    element.addEventListener('mouseenter', mouseEnterHandler, true);
    element.addEventListener('mouseleave', mouseLeaveHandler, true);
    
    return () => {
      // Clean up event listeners
      element.removeEventListener('click', clickHandler);
      element.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('scroll', scrollHandler);
      element.removeEventListener('mouseenter', mouseEnterHandler, true);
      element.removeEventListener('mouseleave', mouseLeaveHandler, true);
    };
  }, [elementRef, trackEvent]);
  
  return { events, stats };
};
