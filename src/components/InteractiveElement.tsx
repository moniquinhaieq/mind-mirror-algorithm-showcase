
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

export type ElementType = 'image' | 'text' | 'shape';
export type ElementTheme = 'red' | 'blue' | 'green' | 'yellow' | 'purple';

export interface InteractiveElementProps {
  id: string;
  type: ElementType;
  theme: ElementTheme;
  content: string;
  size?: 'small' | 'medium' | 'large';
  position?: { x: number; y: number };
  className?: string;
}

const themeClasses: Record<ElementTheme, string> = {
  red: 'bg-red-100 border-red-500 text-red-800 hover:bg-red-200',
  blue: 'bg-blue-100 border-blue-500 text-blue-800 hover:bg-blue-200',
  green: 'bg-green-100 border-green-500 text-green-800 hover:bg-green-200',
  yellow: 'bg-yellow-100 border-yellow-500 text-yellow-800 hover:bg-yellow-200',
  purple: 'bg-purple-100 border-purple-500 text-purple-800 hover:bg-purple-200',
};

const sizeClasses: Record<string, string> = {
  small: 'w-24 h-24 text-sm',
  medium: 'w-36 h-36 text-base',
  large: 'w-48 h-48 text-lg',
};

export const InteractiveElement = ({
  id,
  type,
  theme,
  content,
  size = 'medium',
  position,
  className,
}: InteractiveElementProps) => {
  const [clicks, setClicks] = useState(0);
  
  const handleClick = () => {
    setClicks(prev => prev + 1);
  };
  
  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-3/4 h-3/4 flex items-center justify-center">
              {content === 'chart' && (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="251" strokeDashoffset="63" />
                  <text x="50" y="55" textAnchor="middle" className="text-sm font-bold">75%</text>
                </svg>
              )}
              {content === 'graph' && (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polyline points="10,90 30,40 50,60 70,20 90,50" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              )}
              {content === 'icon' && (
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="mt-2">{content}</span>
          </div>
        );
      case 'shape':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            {content === 'circle' && <div className="w-3/4 h-3/4 rounded-full bg-current opacity-50"></div>}
            {content === 'square' && <div className="w-3/4 h-3/4 bg-current opacity-50"></div>}
            {content === 'triangle' && (
              <div className="w-3/4 h-3/4 relative">
                <div className="absolute inset-0" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                  <div className="w-full h-full bg-current opacity-50"></div>
                </div>
              </div>
            )}
            <span className="mt-2">{content}</span>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="font-medium">{content}</p>
            {clicks > 0 && <span className="text-xs mt-2">Cliques: {clicks}</span>}
          </div>
        );
    }
  };
  
  const elementStyle: React.CSSProperties = position ? { 
    position: 'absolute', 
    left: `${position.x}%`, 
    top: `${position.y}%`,
    transform: 'translate(-50%, -50%)'
  } : {};
  
  return (
    <div
      id={id}
      data-trackable="true"
      data-tracking={id}
      style={elementStyle}
      className={cn(
        'border-2 rounded-md shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 select-none',
        'hover:scale-105 hover:shadow-lg', // Added animation effects
        themeClasses[theme],
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
    >
      {renderContent()}
    </div>
  );
};

export default InteractiveElement;
