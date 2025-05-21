
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Choice {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface GuidedExerciseProps {
  onClose: () => void;
  onSelection: (choiceId: string) => void;
}

const GuidedExercise: React.FC<GuidedExerciseProps> = ({ onClose, onSelection }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  
  const choices: Choice[] = [
    {
      id: 'tech',
      title: 'Tecnologia',
      description: 'Temas relacionados a inovação, dispositivos e futuro digital',
      image: 'chart' // Reusing our existing content types as images
    },
    {
      id: 'art',
      title: 'Arte',
      description: 'Expressão criativa, visual e cultural',
      image: 'graph'
    }
  ];
  
  const handleSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
    onSelection(choiceId);
    setTimeout(() => {
      setShowAnalysis(true);
    }, 500);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fade-in">
      <div className="bg-analytics-background border border-analytics-highlight p-6 rounded-lg max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-analytics-text/50 hover:text-analytics-highlight"
          aria-label="Fechar exercício guiado"
        >
          <X size={18} />
        </button>
        
        {!showAnalysis ? (
          <>
            <h2 className="text-xl font-bold text-analytics-highlight mb-3">
              Exercício de Preferência
            </h2>
            
            <p className="text-analytics-text mb-4">
              Escolha uma das opções abaixo para ver como suas decisões são analisadas:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleSelect(choice.id)}
                  className={`border-2 rounded-md p-4 flex flex-col items-center transition-all ${
                    selectedChoice === choice.id 
                      ? 'border-analytics-highlight bg-analytics-highlight/10'
                      : 'border-analytics-accent hover:border-analytics-highlight'
                  }`}
                >
                  <div className="w-16 h-16 mb-2 flex items-center justify-center">
                    {choice.image === 'chart' && (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-analytics-text">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="251" strokeDashoffset="63" />
                        <text x="50" y="55" textAnchor="middle" className="text-sm font-bold fill-current">75%</text>
                      </svg>
                    )}
                    {choice.image === 'graph' && (
                      <svg viewBox="0 0 100 100" className="w-full h-full text-analytics-text">
                        <polyline points="10,90 30,40 50,60 70,20 90,50" fill="none" stroke="currentColor" strokeWidth="4" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-medium text-analytics-text">{choice.title}</h3>
                  <p className="text-xs text-analytics-text/70 text-center mt-1">{choice.description}</p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-analytics-highlight mb-3">
              Análise da Sua Escolha
            </h2>
            
            <div className="bg-analytics-accent/30 p-4 rounded-md mb-4">
              <p className="text-sm text-analytics-text">
                Você escolheu: <span className="font-bold">{choices.find(c => c.id === selectedChoice)?.title}</span>
              </p>
            </div>
            
            <h3 className="text-lg font-medium text-analytics-text mb-2">Como Algoritmos Usam Esta Informação:</h3>
            
            <ul className="space-y-2 text-sm text-analytics-text/80 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-analytics-highlight">1.</span>
                <span>Sua escolha foi registrada e associada ao seu perfil</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-analytics-highlight">2.</span>
                <span>Algoritmos agora recomendarão mais conteúdo relacionado a {choices.find(c => c.id === selectedChoice)?.title.toLowerCase()}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-analytics-highlight">3.</span>
                <span>Esta preferência será combinada com outras interações para refinar seu perfil</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-analytics-highlight">4.</span>
                <span>O tempo que você levou para decidir também foi analisado</span>
              </li>
            </ul>
            
            <div className="bg-analytics-highlight/10 p-3 rounded-md">
              <h3 className="text-sm font-medium text-analytics-highlight">Você Sabia?</h3>
              <p className="text-xs mt-1">
                Em plataformas reais, decisões simples como esta podem influenciar o conteúdo
                que você vê por semanas ou meses, criando gradualmente uma "bolha de filtro"
                que reforça suas preferências existentes.
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="w-full mt-4 bg-analytics-accent hover:bg-analytics-accent/80 text-analytics-text py-2 rounded-md transition-colors"
            >
              Continuar Explorando
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GuidedExercise;
