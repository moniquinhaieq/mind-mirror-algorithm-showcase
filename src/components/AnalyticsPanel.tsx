import React from 'react';
import { InteractionEvent, InteractionStats } from '@/hooks/useInteractionTracking';
import { formatTimeSpent, calculateEngagementScore, getMostInteractedElements, analyzePreferences, generateInsights } from '@/utils/analyticsUtils';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import InteractionTimeline from './InteractionTimeline';
import AutomatedInsights from './AutomatedInsights';
import CookieMonitor from './CookieMonitor';
import { useCookieTracking } from '@/hooks/useCookieTracking';

interface AnalyticsPanelProps {
  events: InteractionEvent[];
  stats: InteractionStats;
  onShowExercise: () => void;
  onShowReport: () => void;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ events, stats, onShowExercise, onShowReport }) => {
  const engagementScore = calculateEngagementScore(stats);
  const mostActive = getMostInteractedElements(stats);
  const preferences = analyzePreferences(stats);
  const insight = generateInsights(stats);
  
  const shouldShowReportButton = stats.clicks >= 5 || stats.timeSpent >= 60;
  
  // Cookie tracking
  const { cookies, cookiesPermission, requestCookiesPermission } = useCookieTracking();
  
  return (
    <div className="analytics-panel h-full overflow-y-auto p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">
        Painel de Análise
        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-analytics-highlight animate-pulse-soft"></span>
      </h2>
      
      <div className="space-y-6">
        {/* Real-time metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Interações</h3>
            <p className="text-2xl font-bold">{stats.clicks}</p>
          </div>
          
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Tempo</h3>
            <p className="text-2xl font-bold">{formatTimeSpent(stats.timeSpent)}</p>
          </div>
          
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Distância do Mouse</h3>
            <p className="text-2xl font-bold">{Math.round(stats.mouseDistance)}px</p>
          </div>
          
          <div className="bg-analytics-accent p-3 rounded-md">
            <h3 className="text-xs uppercase text-analytics-text/70">Elementos</h3>
            <p className="text-2xl font-bold">{stats.activeAreas.size}</p>
          </div>
        </div>
        
        {/* Cookie Monitor - NEW */}
        <CookieMonitor 
          cookies={cookies}
          cookiesPermission={cookiesPermission}
          requestPermission={requestCookiesPermission}
        />
        
        {/* Engagement score */}
        <div className="bg-analytics-accent p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <h3 className="text-sm font-medium">Pontuação de Engajamento</h3>
            <span className="text-sm font-bold">{engagementScore}/100</span>
          </div>
          <Progress value={engagementScore} className="h-2 bg-analytics-text/20" />
          {engagementScore > 70 && (
            <p className="text-xs mt-2 text-green-400">Alto engajamento detectado!</p>
          )}
        </div>
        
        {/* Interaction timeline */}
        <div>
          <h3 className="text-sm font-medium mb-2">Linha do Tempo de Interações</h3>
          <InteractionTimeline events={events} limit={4} />
        </div>
        
        {/* Most active elements */}
        <div>
          <h3 className="text-sm font-medium mb-2">Elementos Mais Ativos</h3>
          <div className="space-y-2">
            {mostActive.length > 0 ? (
              mostActive.map(([element, count]) => (
                <div key={element} className="flex justify-between items-center bg-analytics-accent p-2 rounded-md">
                  <span className="text-xs">{element}</span>
                  <span className="text-xs font-bold">{count} interações</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-analytics-text/50">Nenhuma interação registrada ainda</p>
            )}
          </div>
        </div>
        
        {/* Analyzed preferences */}
        <div>
          <h3 className="text-sm font-medium mb-2">Preferências Analisadas</h3>
          {preferences.length > 0 ? (
            <ul className="list-disc list-inside text-xs space-y-1">
              {preferences.map((pref) => (
                <li key={pref} className="text-analytics-highlight">{pref}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-analytics-text/50">Dados insuficientes para analisar preferências</p>
          )}
        </div>
        
        <Separator className="bg-analytics-text/20" />
        
        {/* Automated insights */}
        <AutomatedInsights stats={stats} />
        
        {/* Event log */}
        <div>
          <h3 className="text-sm font-medium mb-2">Registro de Eventos</h3>
          <div className="bg-analytics-background border border-analytics-accent/30 rounded-md h-40 overflow-y-auto p-2">
            {events.slice(-10).reverse().length > 0 ? (
              events.slice(-10).reverse().map((event, i) => (
                <div key={i} className="text-xs mb-1 animate-fade-in">
                  <span className="text-analytics-highlight">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  <span className="mx-1">-</span>
                  <span className="capitalize">
                    {event.type === 'click' && 'clique'}
                    {event.type === 'hover' && 'observação'}
                    {event.type === 'scroll' && 'rolagem'}
                    {event.type === 'movement' && 'movimento'}
                  </span>
                  {event.target && <span> em {event.target}</span>}
                  {event.type === 'hover' && event.duration && <span> ({Math.round(event.duration / 1000)}s)</span>}
                </div>
              ))
            ) : (
              <p className="text-xs text-analytics-text/50">Nenhum evento registrado ainda</p>
            )}
          </div>
        </div>
        
        {/* Algorithm insights */}
        <div className="bg-analytics-highlight/10 border border-analytics-highlight/30 p-3 rounded-md">
          <h3 className="text-sm font-medium mb-1">Insight do Algoritmo</h3>
          <p className="text-xs">
            {engagementScore > 50 
              ? "Usuário mostra alto interesse em conteúdo interativo. Recomendando mais elementos similares para aumentar o engajamento."
              : "Baixa interação detectada. O algoritmo priorizaria diferentes tipos de conteúdo para aumentar o engajamento."}
          </p>
        </div>
        
        {/* Interactive exercises button */}
        <div className="mt-2">
          <button
            onClick={onShowExercise}
            className="w-full bg-analytics-accent hover:bg-analytics-highlight/70 text-analytics-text py-2 rounded-md transition-colors mb-2"
          >
            Exercício Guiado
          </button>
          
          {shouldShowReportButton && (
            <button
              onClick={onShowReport}
              className="w-full bg-analytics-highlight hover:bg-analytics-highlight/70 text-analytics-text py-2 rounded-md transition-colors"
            >
              Ver Relatório de Comportamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
