const loadSiemprePago = (callback) => {
  const existingScript = document.getElementById('siemprePago');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://testapi.siemprepago.com/v1/Scripts/PWCheckoutNoModal.js?key=9q1NRL7XQKYQzSmMEc4fDW_I56ONV7HQ&session_id=UI_bae43229-fc4b-4959-aaab-733dfcaba82c';
    script.id = 'siemprePago';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};

export default loadSiemprePago; 
