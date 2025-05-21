
import React, { useRef, useState, useEffect } from 'react';
import { useInteractionTracking } from '@/hooks/useInteractionTracking';
import AnalyticsPanel from '@/components/AnalyticsPanel';
import InteractionArea from '@/components/InteractionArea';
import WelcomeMessage from '@/components/WelcomeMessage';
import GuidedExercise from '@/components/GuidedExercise';
import FinalReport from '@/components/FinalReport';
import { generateDemoCookies } from '@/utils/demoCoookieGenerator';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const interactionAreaRef = useRef<HTMLDivElement>(null);
  
  const { events, stats } = useInteractionTracking(mainRef);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showExercise, setShowExercise] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportAutoShown, setReportAutoShown] = useState(false);

  // Generate demo cookies when component mounts
  useEffect(() => {
    generateDemoCookies();
  }, []);

  // Auto-show the report after a certain time or interaction level
  useEffect(() => {
    if (!reportAutoShown && stats.timeSpent > 90 && stats.clicks > 10) {
      setReportAutoShown(true);
      setShowReport(true);
    }
  }, [stats.timeSpent, stats.clicks, reportAutoShown]);

  // Handle exercise selection
  const handleExerciseSelection = (choiceId: string) => {
    console.log(`User selected: ${choiceId}`);
  };
  
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <header className="bg-analytics-background text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Algoritmos e Manipulação Mental: Uma Demonstração Interativa</h1>
      </header>
      
      <main ref={mainRef} className="flex flex-1 overflow-hidden">
        {/* Analytics Panel - 1/3 of the screen */}
        <div className="w-full md:w-1/3 h-full border-r border-analytics-accent">
          <AnalyticsPanel 
            events={events} 
            stats={stats} 
            onShowExercise={() => setShowExercise(true)}
            onShowReport={() => setShowReport(true)}
          />
        </div>
        
        {/* Interactive Content Area - 2/3 of the screen */}
        <div ref={interactionAreaRef} className="w-full md:w-2/3 h-full overflow-auto">
          <InteractionArea parentRef={interactionAreaRef} />
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
      
      {/* Welcome message modal */}
      {showWelcome && (
        <WelcomeMessage onClose={() => setShowWelcome(false)} />
      )}
      
      {/* Guided exercise modal */}
      {showExercise && (
        <GuidedExercise 
          onClose={() => setShowExercise(false)}
          onSelection={handleExerciseSelection}
        />
      )}
      
      {/* Final report modal */}
      <FinalReport 
        stats={stats} 
        onClose={() => setShowReport(false)}
        show={showReport}
      />
    </div>
  );
};

export default Index;
