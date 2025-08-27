// js/modules/search.js
import { supabase } from '../supabaseClient.js';
import { crearTarjetaPaquete } from './uiComponents.js';

export function setupSearch() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('search-input').value;
            if (query) {
                window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
            }
        });
    }
}

export async function performSearch() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    
    const resultsContainer = document.getElementById('search-results-container');
    const searchTitle = document.getElementById('search-title');

    if (!query || !resultsContainer || !searchTitle) return;

    searchTitle.textContent = `Resultados para: "${query}"`;
    resultsContainer.innerHTML = `<p class="text-gray-600 text-center col-span-full">Buscando paquetes...</p>`;

    // Llamamos a la nueva función de la base de datos
    const { data: allResults, error } = await supabase
        .rpc('search_packages', {
            search_term: query
        });

    if (error) {
        console.error('Error al realizar la búsqueda:', error);
        resultsContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">Ocurrió un error al buscar. Intenta de nuevo.</p>`;
        return;
    }

    if (allResults && allResults.length > 0) {
        resultsContainer.innerHTML = allResults.map(paquete => crearTarjetaPaquete(paquete, paquete.type)).join('');
    } else {
        resultsContainer.innerHTML = `<p class="text-gray-600 text-center col-span-full">No se encontraron paquetes que coincidan con tu búsqueda.</p>`;
    }
}