(function(){
  "use strict";

  var ALIAS = "hernanuber.prex";
  var copyBtn = document.getElementById("copyBtn");
  var toast = document.getElementById("toast");
  var toastTimer = null;

  function showToast(message){
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){
      toast.classList.remove("is-visible");
    }, 2200);
  }

  function fallbackCopy(text){
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.appendChild(textarea);
    textarea.select();
    try{
      document.execCommand("copy");
    }catch(err){
      /* no-op: clipboard unavailable */
    }
    document.body.removeChild(textarea);
  }

  function copyAlias(){
    var done = function(){
      copyBtn.classList.add("is-copied");
      copyBtn.querySelector(".copybtn__text").textContent = "Copiado";
      showToast("Alias copiado: " + ALIAS);
      setTimeout(function(){
        copyBtn.classList.remove("is-copied");
        copyBtn.querySelector(".copybtn__text").textContent = "Copiar alias";
      }, 1800);
    };

    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(ALIAS).then(done).catch(function(){
        fallbackCopy(ALIAS);
        done();
      });
    }else{
      fallbackCopy(ALIAS);
      done();
    }
  }

  if(copyBtn){
    copyBtn.addEventListener("click", copyAlias);
  }

  // Register service worker for PWA / offline support
  if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
      navigator.serviceWorker.register("service-worker.js").catch(function(){
        /* registration failed silently, page still works online */
      });
    });
  }
})();
