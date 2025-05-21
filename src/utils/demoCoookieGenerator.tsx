
export const generateDemoCookies = (): void => {
  // Cookie para simular um nome de usuário
  document.cookie = "usuario_demo=Johnny; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/";
  
  // Cookie para simular preferência de tema
  document.cookie = "preferencia_tema=escuro; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/";
  
  // Cookie para simular configuração de idioma
  document.cookie = "idioma=pt-BR; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/";
  
  // Cookie para simular data da última visita
  document.cookie = "ultima_visita=" + new Date().toISOString() + "; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/";
  
  // Cookie para simular um identificador de sessão
  document.cookie = "sessao_demo=" + Math.random().toString(36).substring(2, 9) + "; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/";

  // Cookie adicional para simular rastreamento de marketing
  document.cookie = "campanha_origem=google_ads; expires=Fri, 31 Dec 2099 23:59:59 GMT; path=/";
  
  console.log("Cookies de demonstração foram criados com sucesso!");
};
