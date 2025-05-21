
import React from 'react';
import { CookieInfo } from '@/hooks/useCookieTracking';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CookieMonitorProps {
  cookies: CookieInfo[];
  cookiesPermission: boolean;
  requestPermission: () => void;
}

const CookieMonitor: React.FC<CookieMonitorProps> = ({ 
  cookies, 
  cookiesPermission, 
  requestPermission 
}) => {
  
  // Determina o tipo do cookie com base no seu nome (simplificado)
  const getCookieType = (name: string): string => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('analytics') || lowerName.includes('ga')) return 'Analítico';
    if (lowerName.includes('session') || lowerName.includes('auth')) return 'Sessão/Autenticação';
    if (lowerName.includes('pref') || lowerName.includes('settings')) return 'Preferência';
    if (lowerName.includes('ad') || lowerName.includes('marketing')) return 'Marketing';
    
    return 'Outros';
  };
  
  return (
    <div className="bg-analytics-accent p-3 rounded-md">
      <div className="flex justify-between mb-2">
        <h3 className="text-sm font-medium">Monitoramento de Cookies</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-analytics-text/70" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">
                Cookies são pequenos arquivos de texto que sites armazenam no seu navegador. 
                Eles são usados para lembrar suas preferências, rastrear seu comportamento 
                e personalizar conteúdo. Esta funcionalidade demonstra como sites podem 
                acessar essa informação.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {!cookiesPermission ? (
        <div className="text-center py-2">
          <p className="text-xs mb-3">
            Podemos ler os cookies do seu navegador para demonstrar como sites rastreiam seus dados?
          </p>
          <Button 
            size="sm" 
            variant="outline"
            className="bg-analytics-highlight/80 hover:bg-analytics-highlight text-analytics-text w-full"
            onClick={requestPermission}
          >
            Permitir Acesso aos Cookies
          </Button>
        </div>
      ) : cookies.length === 0 ? (
        <p className="text-xs text-analytics-text/50 text-center py-2">
          Nenhum cookie detectado no seu navegador.
        </p>
      ) : (
        <div className="max-h-32 overflow-y-auto">
          {cookies.map((cookie, index) => (
            <div key={index} className="text-xs bg-analytics-accent/50 p-2 mb-1 rounded border border-analytics-text/10">
              <div className="flex justify-between">
                <span className="font-semibold">{cookie.name}</span>
                <span className="text-analytics-highlight text-[10px]">{getCookieType(cookie.name)}</span>
              </div>
              <div className="truncate text-[10px] opacity-70">{cookie.value}</div>
            </div>
          ))}
        </div>
      )}
      
      {cookiesPermission && cookies.length > 0 && (
        <p className="text-[10px] mt-2 text-analytics-text/50">
          Os cookies acima estão atualmente armazenados no seu navegador e podem ser acessados pelos sites que você visita.
        </p>
      )}
    </div>
  );
};

export default CookieMonitor;
