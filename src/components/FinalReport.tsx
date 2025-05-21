
import React from 'react';
import { InteractionStats } from '@/hooks/useInteractionTracking';
import { formatTimeSpent } from '@/utils/analyticsUtils';

interface FinalReportProps {
  stats: InteractionStats;
  onClose: () => void;
  show: boolean;
}

const FinalReport: React.FC<FinalReportProps> = ({ stats, onClose, show }) => {
  if (!show) return null;
  
  const topInteractions = Array.from(stats.activeAreas.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  const interactionStyle = 
    stats.clicks > 15 ? "muito ativo" :
    stats.clicks > 8 ? "ativo" :
    stats.clicks > 3 ? "moderado" : "exploratório";
  
  const movementStyle = 
    stats.mouseDistance > 5000 ? "extensivo" :
    stats.mouseDistance > 2000 ? "significativo" :
    stats.mouseDistance > 500 ? "moderado" : "mínimo";

  const hoverBehavior = 
    Array.from(stats.hovers.values()).reduce((sum, time) => sum + time, 0) > 10000 ? "analítico" :
    "rápido";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div className="bg-analytics-background border border-analytics-highlight p-6 rounded-lg max-w-lg w-full mx-4 relative">
        <h2 className="text-xl font-bold text-analytics-highlight mb-4 border-b border-analytics-accent pb-2">
          Seu Relatório de Comportamento Digital
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-analytics-text">Perfil de Interação Detectado</h3>
            <p className="text-sm text-analytics-text/80 mt-1">
              Usuário com comportamento <strong>{interactionStyle}</strong>, 
              movimento <strong>{movementStyle}</strong> e 
              observação <strong>{hoverBehavior}</strong>.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-analytics-text">Métricas Principais</h3>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-analytics-accent/30 p-2 rounded-md">
                <p className="text-xs text-analytics-text/70">Total de Interações</p>
                <p className="text-lg font-bold">{stats.clicks}</p>
              </div>
              <div className="bg-analytics-accent/30 p-2 rounded-md">
                <p className="text-xs text-analytics-text/70">Tempo Total</p>
                <p className="text-lg font-bold">{formatTimeSpent(stats.timeSpent)}</p>
              </div>
              <div className="bg-analytics-accent/30 p-2 rounded-md">
                <p className="text-xs text-analytics-text/70">Distância do Mouse</p>
                <p className="text-lg font-bold">{Math.round(stats.mouseDistance)}px</p>
              </div>
              <div className="bg-analytics-accent/30 p-2 rounded-md">
                <p className="text-xs text-analytics-text/70">Elementos Explorados</p>
                <p className="text-lg font-bold">{stats.activeAreas.size}</p>
              </div>
            </div>
          </div>
          
          {topInteractions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-analytics-text">Áreas de Maior Interesse</h3>
              <ul className="mt-2 space-y-1">
                {topInteractions.map(([area, count], index) => (
                  <li key={area} className="flex justify-between items-center text-sm">
                    <span className="text-analytics-text/80">{area}</span>
                    <span className="text-analytics-highlight font-medium">{count} interações</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="bg-analytics-highlight/10 p-3 rounded-md mt-4">
            <h3 className="text-sm font-medium text-analytics-highlight">Insights Algorítmicos</h3>
            <p className="text-xs mt-1">
              Com base em seu comportamento, um sistema poderia sugerir conteúdo específico
              para manter seu engajamento e direcionar suas decisões futuras.
              Seus dados de comportamento poderiam ser usados para prever suas preferências
              em outras plataformas digitais.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-analytics-accent hover:bg-analytics-accent/80 text-analytics-text py-2 px-6 rounded-md transition-colors"
          >
            Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;
