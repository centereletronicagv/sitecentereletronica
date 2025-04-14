
// Script para exibir verificação do Google no console
export const logGoogleVerification = () => {
  console.log('google-site-verification: google7386898db140e9cd.html');
};

// Função para detectar quando o DevTools é aberto
export const detectDevTools = () => {
  const threshold = 160;
  
  const emitEvent = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      logGoogleVerification();
    }
  };

  window.addEventListener('resize', emitEvent);
  setInterval(emitEvent, 1000);
  
  // Também exibir no console ao carregar a página para garantir
  logGoogleVerification();
};
