
console.log('指向', this);

if('serviceWorker' in navigator) {
    document.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('注册成功')
        })
    })
}
