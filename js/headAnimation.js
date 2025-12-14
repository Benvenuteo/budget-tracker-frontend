window.marekAnimation = {
    start: (imagePath) => {
        // 1. Tworzymy element obrazka
        const img = document.createElement('img');
        img.src = imagePath;
        img.style.position = 'fixed';
        img.style.zIndex = '9999'; // Musi być nad wszystkim
        img.style.width = '150px'; // Rozmiar głowy
        img.style.height = 'auto';
        img.style.pointerEvents = 'none'; // Żeby nie dało się w nią kliknąć
        document.body.appendChild(img);

        // 2. Parametry startowe
        const speed = 10; // Prędkość poruszania
        let x = Math.random() * (window.innerWidth - 150);
        let y = Math.random() * (window.innerHeight - 150);

        // Losowy kierunek (nie może być 0)
        let dx = (Math.random() > 0.5 ? 1 : -1) * speed;
        let dy = (Math.random() > 0.5 ? 1 : -1) * speed;

        let rotation = 0;
        let rotationSpeed = 10; // Prędkość obrotu
        let bounceCount = 0;

        // 3. Pętla animacji
        function animate() {
            // Aktualizacja pozycji
            x += dx;
            y += dy;
            rotation += rotationSpeed;

            // Logika Odbić (Ściany)
            let collided = false;

            // Prawa/Lewa krawędź
            if (x + img.offsetWidth >= window.innerWidth) {
                x = window.innerWidth - img.offsetWidth;
                dx = -dx;
                collided = true;
            } else if (x <= 0) {
                x = 0;
                dx = -dx;
                collided = true;
            }

            // Góra/Dół krawędź
            if (y + img.offsetHeight >= window.innerHeight) {
                y = window.innerHeight - img.offsetHeight;
                dy = -dy;
                collided = true;
            } else if (y <= 0) {
                y = 0;
                dy = -dy;
                collided = true;
            }

            // Liczenie odbić
            if (collided) {
                bounceCount++;
                // Możesz dodać dźwięk "boing" tutaj ;)
            }

            // Aplikowanie stylów
            img.style.left = x + 'px';
            img.style.top = y + 'px';
            img.style.transform = `rotate(${rotation}deg)`;

            // 4. Warunek końcowy: Za 5 razem (czyli po 4 pełnych odbiciach) znika
            if (bounceCount >= 5) {
                // Efekt znikania (opcjonalny)
                img.style.transition = "opacity 0.2s";
                img.style.opacity = "0";

                // Usunięcie z DOM po chwili
                setTimeout(() => {
                    img.remove();
                }, 200);
            } else {
                // Kontynuuj pętlę
                requestAnimationFrame(animate);
            }
        }

        // Start pętli
        requestAnimationFrame(animate);
    }
};