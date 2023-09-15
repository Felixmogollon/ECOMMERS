const body = document.querySelector('.dark-mode-toggle')


function toggleDarkMode() {
    const body = document.body;

    // Agrega o elimina la clase 'dark-mode' del elemento 'body'
    body.classList.toggle('dark-mode');
}

    export default toggleDarkMode