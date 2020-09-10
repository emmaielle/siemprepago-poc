import React, { useEffect, useState } from 'react';

import SiemprePago from './scripts/SiemprePago';

import './App.css';

function App() {
  const [siemprePagoReady, setSiemprePagoReady] = useState(false);

  const onTokenCreated = (token) => {
    console.log(JSON.stringify(token));
    alert("TOKEN CREADO");
  }

  const openIframe = (pWCheckout) => {
    const main_iframe = document.createElement("iframe");
    const iframeDiv = document.getElementById("iframeDiv");
    main_iframe.id = "custom_iframe";
    // Append iframe to div
    iframeDiv.append(main_iframe);
    // iframe styles
    main_iframe.setAttribute("frameborder", "0");
    main_iframe.style.borderRadius = "10px";
    main_iframe.style.height = "100%";
    main_iframe.style.width = "100%";
    main_iframe.style.zIndex = "9999"; 
    main_iframe.style.display = "block";
    main_iframe.scrolling = "no";

		pWCheckout.SetStyle({
      buttonColor: '455880',
      backgroundColor: "f5f2e8",
      buttonHoverColor: "777777",
      buttonTextColor: "f5f2e8",
      buttonTextHoverColor: "f5f2e8",
      inputBackgroundColor: "f5f2e8",
      inputTextColor: "767676",
      inputErrorColor: "ff0000",
      inputAddonBackgroundColor: 'f5f2e8',
      labelColor: '455880',
    });

		
		// <!-- Evento que se dispara al generarse el token -->
		pWCheckout.Bind("tokenCreated", onTokenCreated);
		
		// <!-- Manera por defecto de abrir el iframe para OT y cualquier tarjeta-->
		//PWCheckout.AddActionButton("buttonId"); 
		
		// <!-- Manera mas programatica de abrir el iframe, para indicar medio de pago etc -->
		// function openIframe(){
			// <!-- Abrir el iframe para MASTERCARD-->
			//PWCheckout.Iframe.OpenIframeWithPaymentMediaOptions(2, null);
			
			// <!-- Customer registrado, primero hago GET a la API para obtener el uniqueId  y luego lo uso aqui. Este valor siempre debe ser fresco para cada intento de captura-->
			// var UniqueId = "UI_7eb58483-7897-47af-a16f-f73d8a4e14e4";
			
			// <!-- Captura para Customer sin reestriccion de medio de pago obanco -->
			//PWCheckout.OpenIframeCustom("https://api.siemprepago.com/v1/Capture?key=9q1NRL7XQKYQzSmMEc4fDW_I56ONV7HQ&session_id=" + UniqueId, UniqueId);
			
			// <!-- Captura para Customer con reestriccion de medio de pago MASTERCARD -->
			// PWCheckout.Iframe.OpenIframeCustomWithPaymentMediaOptions("https://testapi.siemprepago.com/v1/Capture?key=9q1NRL7XQKYQzSmMEc4fDW_I56ONV7HQ&session_id=" + UniqueId, UniqueId, 2);
			
			// <!-- Captura para Customer con reestriccion de medio de pago VISA y Banco Scotiabank-->
			//PWCheckout.Iframe.OpenIframeCustomWithPaymentMediaOptions("https://testapi.siemprepago.com/v1/Capture?key=9q1NRL7XQKYQzSmMEc4fDW_I56ONV7HQ&session_id=" + UniqueId, UniqueId, 1, 5);
			
			// <!-- Captura para Customer con reestriccion de Banco Scotiabanc-->
			//PWCheckout.Iframe.OpenIframeCustomWithPaymentMediaOptions("https://testapi.siemprepago.com/v1/Capture?key=9q1NRL7XQKYQzSmMEc4fDW_I56ONV7HQ&session_id=" + UniqueId, UniqueId, null, 5);
			
		// }
		
    //Openl Iframe
    // pWCheckout.LoadIframe();
    pWCheckout.Iframe.OpenIframeCustomWithPaymentMediaOptions('https://testapi.siemprepago.com/v1/Capture?key=9q1NRL7XQKYQzSmMEc4fDW_I56ONV7HQ&session_id=UI_72690e05-f2a8-40f5-9670-bc95c70872cd', 'UI_72690e05-f2a8-40f5-9670-bc95c70872cd', 2);
    // pWCheckout.OpenIframeCustom(10, 6);
  }
  
  useEffect(() => {
    SiemprePago(() => {
      if (!siemprePagoReady) {
          // eslint-disable-next-line no-undef
          PWCheckout.SetProperties( 
            { 
            "name": "SiemprePago S.A.", 
            "email": "gpigni@siemprepago.com", 
            "button_label": "Pagar #monto#", 
            // "email_edit" : "true",
            "description": "",
            "currency": "UYU", 
            "amount": "100", 
            "lang": "ESP",
            "form_id": "commerce_form", 
            "checkout_card": "1", 
            "autoSubmit": "false" ,
            "iframeId": "custom_iframe",
            } 
          ); 

          
          // eslint-disable-next-line no-undef
          PWCheckout.Bind("tokenCreated", onTokenCreated);
          // openIframe();
  
          // eslint-disable-next-line no-undef
          openIframe(PWCheckout);
          
          var formGroup = document.getElementsByClassName('form-group');
          debugger

          for(var i = 0, len = formGroup.length; i < len; i++) {
            formGroup[i].style.display = 'flex';
            formGroup[i].style['flex-direction'] = 'column';
            formGroup[i].style['align-items'] = 'stretch';
          }
  
        setSiemprePagoReady(true);
      }
    });    
  })

  return (
    <div className="App">
      <header className="App-header">
        <div
          id="iframeDiv"
          className="iframe">

        </div>
        <form id="commerce_form">
          <input id="PWToken" type="hidden" />
        </form>
      </header>
    </div>
  );
}

export default App;
