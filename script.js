if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.log('SW error:', err));
    });
}

// Botón Grande de Copiar Alias con Cambio de Texto Nativo
const btnCopyLarge = document.getElementById('btnCopyLarge');
const btnCopyText = document.getElementById('btnCopyText');
const aliasText = "hernanuber.prex";

btnCopyLarge.addEventListener('click', () => {
    navigator.clipboard.writeText(aliasText).then(() => {
        btnCopyText.innerText = "¡Copiado!";
        btnCopyLarge.classList.add('success');
        
        setTimeout(() => {
            btnCopyText.innerText = "Copiar Alias";
            btnCopyLarge.classList.remove('success');
        }, 2500);
    }).catch(err => {
        console.error("No se pudo copiar de forma automática", err);
    });
});

// Botón de Compartir Perfil Nativo
const btnShare = document.getElementById('btnShare');
btnShare.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Perfil de Hernán',
            text: 'Copiá mi alias o contactame por WhatsApp.',
            url: window.location.href
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Enlace de perfil copiado al portapapeles");
    }
});
