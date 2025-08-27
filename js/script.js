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
import { loadHeroSection } from './modules/hero.js';

document.addEventListener('DOMContentLoaded', () => {
    // Lógica que se ejecuta en TODAS las páginas
    setupAuth();
    setupMobileMenu();

    const pathname = window.location.pathname;

    // Helper para detectar la página actual de forma robusta
    const onPage = (page) => pathname.endsWith(`/${page}.html`) || pathname.endsWith(`/${page}`) || (page === 'index' && (pathname === '/' || pathname.endsWith('/index.html')));

    // Lógica para la página de INICIO
    if (onPage('index') || pathname.endsWith('/Agencia/')) {
        const destacadosContainer = document.getElementById('destacados-container');
        const grupalesContainer = document.getElementById('grupales-container');
        const packageLimit = window.innerWidth < 768 ? 4 : 8;

        loadHeroSection();
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
    if (onPage('destacados')) {
        const allDestacadosContainer = document.getElementById('all-destacados-container');
        cargarPaquetesDestacados(allDestacadosContainer);
    }

    // Lógica para la página de "Todas las Salidas Grupales"
    if (onPage('grupales')) {
        const allGrupalesContainer = document.getElementById('all-grupales-container');
        cargarPaquetesGrupales(allGrupalesContainer);
    }

    // Lógica para la página de "Quinceañeras"
    if (onPage('quinceaneras')) {
        const programasContainer = document.getElementById('programas-quince-grid');
        cargarProgramasQuinceaneras(programasContainer);
    }

    // Lógica para páginas específicas
    if (onPage('nosotros')) {
        loadNosotrosPage();
    }
    
    if (onPage('search-results')) {
        performSearch();
    }

    if (onPage('paquetes-destino')) {
        loadRegionPackages();
    }
});