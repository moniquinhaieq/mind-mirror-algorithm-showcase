
import React from 'react';
import { Alert, AlertTitle } from "@/components/ui/alert";
import { InteractionStats } from '@/hooks/useInteractionTracking';
import { analyzePreferences } from '@/utils/analyticsUtils';

interface AutomatedInsightsProps {
  stats: InteractionStats;
}

const AutomatedInsights: React.FC<AutomatedInsightsProps> = ({ stats }) => {
  const preferences = analyzePreferences(stats);
  const engagementLevel = stats.clicks > 10 ? "alto" : stats.clicks > 5 ? "médio" : "baixo";
  
  // Generate personalized insights based on user interactions
  const getInsight = () => {
    if (stats.clicks < 3) {
      return "Experimente interagir com mais elementos para obter insights personalizados.";
    }
    
    const topAreas = Array.from(stats.activeAreas.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([key]) => key);
      
    if (topAreas.length === 0) return null;
    
    const insights = [
      `Você demonstrou interesse em ${topAreas.join(' e ')}.`,
      `Detectamos um nível ${engagementLevel} de engajamento com a interface.`,
      `Você parece preferir conteúdo ${stats.hovers.size > stats.clicks ? 'visual' : 'interativo'}.`,
      `Baseado no seu comportamento, recomendaríamos mais conteúdos sobre ${preferences[0] || 'tecnologia'}.`,
      `Os dados de navegação como cookies e cliques permitem personalizar o conteúdo especificamente para seu perfil.`
    ];
    
    // Pick a random insight
    return insights[Math.floor(Math.random() * insights.length)];
  };
  
  const insight = getInsight();
  if (!insight) return null;
  
  return (
    <Alert className="bg-analytics-highlight/10 border border-analytics-highlight/30 text-analytics-text animate-fade-in">
      <AlertTitle className="text-analytics-highlight">Insight Algorítmico</AlertTitle>
      <p className="text-xs">{insight}</p>
    </Alert>
  );
};

export default AutomatedInsights;
