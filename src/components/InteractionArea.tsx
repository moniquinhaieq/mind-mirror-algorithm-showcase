
import React from 'react';
import InteractiveElement, { InteractiveElementProps } from './InteractiveElement';

interface InteractionAreaProps {
  className?: string;
}

const InteractionArea: React.FC<InteractionAreaProps> = ({ className }) => {
  // Interactive elements data
  const elements: InteractiveElementProps[] = [
    { id: 'text-politics', type: 'text', theme: 'red', content: 'Politics', position: { x: 20, y: 20 } },
    { id: 'text-science', type: 'text', theme: 'blue', content: 'Science', position: { x: 50, y: 20 } },
    { id: 'text-entertainment', type: 'text', theme: 'green', content: 'Entertainment', position: { x: 80, y: 20 } },
    
    { id: 'shape-circle', type: 'shape', theme: 'purple', content: 'circle', position: { x: 25, y: 50 } },
    { id: 'shape-square', type: 'shape', theme: 'yellow', content: 'square', position: { x: 50, y: 50 } },
    { id: 'shape-triangle', type: 'shape', theme: 'green', content: 'triangle', position: { x: 75, y: 50 } },
    
    { id: 'image-chart', type: 'image', theme: 'blue', content: 'chart', position: { x: 25, y: 80 } },
    { id: 'image-graph', type: 'image', theme: 'red', content: 'graph', position: { x: 50, y: 80 } },
    { id: 'image-icon', type: 'image', theme: 'yellow', content: 'icon', position: { x: 75, y: 80 } },
  ];

  return (
    <div className={`interactive-area relative h-full w-full p-6 ${className || ''}`}>
      <div className="absolute top-6 left-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Interactive Demo Area</h2>
        <p className="text-sm text-gray-600 max-w-md">
          Interact with these elements to see how your behavior is tracked and analyzed in real-time. 
          Try clicking, hovering, and exploring different areas.
        </p>
      </div>
      
      {elements.map((element) => (
        <InteractiveElement key={element.id} {...element} />
      ))}
    </div>
  );
};

export default InteractionArea;
