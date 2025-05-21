
import React from 'react';
import InteractiveElement, { InteractiveElementProps } from './InteractiveElement';
import HeatmapComponent from './HeatmapComponent';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';

interface InteractionAreaProps {
  className?: string;
  parentRef: React.RefObject<HTMLDivElement>;
}

const InteractionArea: React.FC<InteractionAreaProps> = ({ className, parentRef }) => {
  const { events } = useInteractionTracking(parentRef);
  
  // Interactive elements data translated to Portuguese
  const elements: InteractiveElementProps[] = [
    { id: 'text-politica', type: 'text', theme: 'red', content: 'Política', position: { x: 20, y: 20 } },
    { id: 'text-ciencia', type: 'text', theme: 'blue', content: 'Ciência', position: { x: 50, y: 20 } },
    { id: 'text-entretenimento', type: 'text', theme: 'green', content: 'Entretenimento', position: { x: 80, y: 20 } },
    
    { id: 'shape-circulo', type: 'shape', theme: 'purple', content: 'círculo', position: { x: 25, y: 50 } },
    { id: 'shape-quadrado', type: 'shape', theme: 'yellow', content: 'quadrado', position: { x: 50, y: 50 } },
    { id: 'shape-triangulo', type: 'shape', theme: 'green', content: 'triângulo', position: { x: 75, y: 50 } },
    
    { id: 'image-grafico', type: 'image', theme: 'blue', content: 'gráfico', position: { x: 25, y: 80 } },
    { id: 'image-dados', type: 'image', theme: 'red', content: 'dados', position: { x: 50, y: 80 } },
    { id: 'image-icone', type: 'image', theme: 'yellow', content: 'ícone', position: { x: 75, y: 80 } },
  ];

  return (
    <div className={`interactive-area relative h-full w-full p-6 ${className || ''}`}>
      <div className="absolute top-6 left-6 z-20">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Área de Demonstração Interativa</h2>
        <p className="text-sm text-gray-600 max-w-md">
          Interaja com esses elementos para ver como seu comportamento é rastreado e analisado em tempo real.
          Experimente clicar, passar o mouse e explorar diferentes áreas.
        </p>
      </div>
      
      {/* Heat map visualization */}
      <HeatmapComponent events={events} parentRef={parentRef} />
      
      {/* Interactive elements */}
      {elements.map((element) => (
        <InteractiveElement key={element.id} {...element} />
      ))}
    </div>
  );
};

export default InteractionArea;
