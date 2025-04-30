let webampInstance = null;

function launchwebamp() {
    if (!webampInstance || webampInstance.__closed) {
        const app = document.getElementById("app");
        webampInstance = new Webamp();
        webampInstance.renderWhenReady(app).then(() => {
            webampInstance.onClose(() => {
                webampInstance.__closed = true;
            });
        });
    }
}
