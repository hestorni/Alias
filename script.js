if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(err => console.log('SW error:', err));
    });
}

const btnCopy = document.getElementById('btnCopy');
const aliasText = document.getElementById('aliasText').innerText;
const toast = document.getElementById('toast');

btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(aliasText).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    });
});

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
        toast.innerText = "Enlace de perfil copiado";
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.innerText = "Alias copiado al portapapeles";
        }, 2500);
    }
});