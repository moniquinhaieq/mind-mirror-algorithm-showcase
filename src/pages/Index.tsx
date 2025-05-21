
import React, { useRef } from 'react';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import InteractionArea from '@/components/InteractionArea';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { events, stats } = useInteractionTracking(mainRef);

  return (
    <div className="min-h-screen h-screen flex flex-col">
      <header className="bg-analytics-background text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Algoritmos e Manipulação Mental: Uma Demonstração Interativa</h1>
      </header>
      
      <main ref={mainRef} className="flex flex-1 overflow-hidden">
        {/* Analytics Panel - 1/3 of the screen */}
        <div className="w-full md:w-1/3 h-full border-r border-analytics-accent">
          <AnalyticsPanel events={events} stats={stats} />
        </div>
        
        {/* Interactive Content Area - 2/3 of the screen */}
        <div className="w-full md:w-2/3 h-full overflow-auto">
          <InteractionArea />
        </div>
      </main>
      
      {/* Visual data points that appear when the user interacts */}
      {events.slice(-3).map((event, index) => (
        event.type === 'click' && (
          <div 
            key={`data-point-${index}-${event.timestamp}`}
            className="data-point"
            style={{
              left: `${event.x}px`,
              top: `${event.y}px`,
              opacity: 0.8,
              zIndex: 1000,
            }}
          />
        )
      ))}
    </div>
  );
};

export default Index;
