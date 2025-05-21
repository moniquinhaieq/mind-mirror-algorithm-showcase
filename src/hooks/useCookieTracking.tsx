
import { useState, useEffect } from 'react';

export interface CookieInfo {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
}

export const useCookieTracking = () => {
  const [cookies, setCookies] = useState<CookieInfo[]>([]);
  const [cookiesPermission, setCookiesPermission] = useState<boolean>(false);
  
  // Função para analisar os cookies
  const parseCookies = (): CookieInfo[] => {
    const cookiesList: CookieInfo[] = [];
    
    if (document.cookie) {
      const cookiesPairs = document.cookie.split(';');
      
      cookiesPairs.forEach(cookie => {
        const cookiePair = cookie.trim().split('=');
        
        if (cookiePair.length === 2) {
          cookiesList.push({
            name: cookiePair[0],
            value: decodeURIComponent(cookiePair[1])
          });
        }
      });
    }
    
    return cookiesList;
  };
  
  // Função para obter permissão
  const requestCookiesPermission = () => {
    setCookiesPermission(true);
  };
  
  // Atualiza a lista de cookies quando a permissão for concedida
  useEffect(() => {
    if (cookiesPermission) {
      const cookiesList = parseCookies();
      setCookies(cookiesList);
      
      // Atualiza os cookies a cada 10 segundos
      const interval = setInterval(() => {
        setCookies(parseCookies());
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [cookiesPermission]);
  
  return {
    cookies,
    cookiesPermission,
    requestCookiesPermission
  };
};
