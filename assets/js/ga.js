window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'UA-37265565-3');

if ('addEventListener' in window) {
    window.addEventListener('load', function () {
        document.body.className = document.body.className.replace(/\bis-loading\b/, '');
    });
    document.body.className += (navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? ' is-ie' : '');
}