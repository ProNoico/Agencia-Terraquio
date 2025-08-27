// js/script.js
import { setupAuth } from './modules/auth.js';
import { setupMobileMenu } from './modules/mobileMenu.js';
import { cargarPaquetesDestacados } from './modules/destacados.js';
import { cargarPaquetesGrupales, loadGroupBanners } from './modules/grupales.js';
import { loadDestinationsCarousel } from './modules/destinos.js';
import { loadQuinceanerasSlider, cargarProgramasQuinceaneras } from './modules/quinceaneras.js';
import { cargarEventos } from './modules/eventos.js';
import { setupSearch, performSearch } from './modules/search.js';
import { loadNosotrosPage } from './modules/nosotros.js';
import { loadRegionPackages } from './modules/paquetesDestino.js';
import { loadHeroSection } from './modules/hero.js'; // <-- 1. IMPORTAMOS LA NUEVA FUNCIÓN

document.addEventListener('DOMContentLoaded', () => {
    // Lógica que se ejecuta en TODAS las páginas
    setupAuth();
    setupMobileMenu();

    const pathname = window.location.pathname;

    // Lógica para la página de INICIO
    if (pathname.includes('index.html') || pathname === '/' || pathname.endsWith('/Agencia/')) {
        const destacadosContainer = document.getElementById('destacados-container');
        const grupalesContainer = document.getElementById('grupales-container');
        const packageLimit = window.innerWidth < 768 ? 4 : 8;

        loadHeroSection(); // <-- 2. LLAMAMOS A LA NUEVA FUNCIÓN AQUÍ
        cargarPaquetesDestacados(destacadosContainer, packageLimit);
        cargarPaquetesGrupales(grupalesContainer, packageLimit);
        loadGroupBanners();
        loadDestinationsCarousel();
        loadQuinceanerasSlider();
        cargarEventos();
        setupSearch();
        
        const scrollerInner = document.querySelector(".scroller__inner");
        if (scrollerInner) {
            const scrollerContent = Array.from(scrollerInner.children);
            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        }
    }

    // Lógica para la página de "Todos los Destacados"
    if (pathname.includes('destacados.html')) {
        const allDestacadosContainer = document.getElementById('all-destacados-container');
        cargarPaquetesDestacados(allDestacadosContainer);
    }

    // Lógica para la página de "Todas las Salidas Grupales"
    if (pathname.includes('grupales.html')) {
        const allGrupalesContainer = document.getElementById('all-grupales-container');
        cargarPaquetesGrupales(allGrupalesContainer);
    }

    // Lógica para la página de "Quinceañeras"
    if (pathname.includes('quinceaneras.html')) {
        const programasContainer = document.getElementById('programas-quince-grid');
        cargarProgramasQuinceaneras(programasContainer);
    }

    // Lógica para páginas específicas
    if (pathname.includes('nosotros.html')) {
        loadNosotrosPage();
    }
    
    if (pathname.includes('search-results.html')) {
        performSearch();
    }

    if (pathname.includes('paquetes-destino.html')) {
        loadRegionPackages();
    }
});