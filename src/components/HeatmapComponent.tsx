
import React, { useEffect, useRef } from 'react';
import { InteractionEvent } from '@/hooks/useInteractionTracking';
import { calculateHeatmapData } from '@/utils/analyticsUtils';

interface HeatmapComponentProps {
  events: InteractionEvent[];
  parentRef: React.RefObject<HTMLElement>;
}

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({ events, parentRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const renderHeatmap = () => {
      const canvas = canvasRef.current;
      if (!canvas || !parentRef.current) return;
      
      const parent = parentRef.current;
      const rect = parent.getBoundingClientRect();
      
      // Match canvas size to parent size
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get heatmap data
      const heatData = calculateHeatmapData(events);
      
      // Draw heatmap points
      heatData.forEach(point => {
        // Calculate relative position in the container
        const x = point.x;
        const y = point.y;
        
        // Skip points outside the container
        if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
        
        // Map value to intensity
        const intensity = Math.min(1, point.value / 5) * 0.7;
        
        // Draw gradient for heatpoint
        const gradient = ctx.createRadialGradient(x, y, 2, x, y, 30);
        gradient.addColorStop(0, `rgba(233, 69, 96, ${intensity})`);
        gradient.addColorStop(1, 'rgba(233, 69, 96, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2 * Math.PI);
        ctx.fill();
      });
    };
    
    renderHeatmap();
    
    // Re-render on window resize
    const handleResize = () => renderHeatmap();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [events, parentRef]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
      aria-label="Mapa de calor de interações"
    />
  );
};

export default HeatmapComponent;
