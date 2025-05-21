
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface WelcomeMessageProps {
  onClose: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div className="bg-analytics-background border border-analytics-highlight p-6 rounded-lg max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-analytics-text/50 hover:text-analytics-highlight"
          aria-label="Fechar mensagem de boas-vindas"
        >
          <X size={18} />
        </button>
        
        <h2 className="text-xl font-bold text-analytics-highlight mb-3">
          Bem-vindo ao Mind Mirror
        </h2>
        
        <p className="text-analytics-text mb-4">
          Este é um experimento interativo que demonstra como algoritmos monitoram e analisam seu comportamento em tempo real.
        </p>
        
        <ul className="space-y-2 text-sm text-analytics-text/80 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-analytics-highlight">•</span>
            <span>Clique, mova o cursor e interaja com os elementos na tela</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-analytics-highlight">•</span>
            <span>Observe o painel de análise à esquerda registrando suas ações</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-analytics-highlight">•</span>
            <span>Veja como algoritmos podem prever seus interesses</span>
          </li>
        </ul>
        
        <button
          onClick={onClose}
          className="w-full bg-analytics-accent hover:bg-analytics-accent/80 text-analytics-text py-2 rounded-md transition-colors"
        >
          Começar Experimento
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
