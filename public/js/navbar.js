document.addEventListener("DOMContentLoaded", () => {
    const toggleMenu = () => {
        document.querySelector('.nav-links').classList.toggle('active');
    };

    const loadHeader = () => {
        fetch('../components/header.html')
            .then(response => response.text())
            .then(data => {
                const headerPlaceholder = document.createElement('div');
                headerPlaceholder.innerHTML = data;
                document.body.prepend(headerPlaceholder);

                document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);
            })
            .catch(error => console.error('Error loading header:', error));
    };

    loadHeader();
});