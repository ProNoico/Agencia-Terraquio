// js/modules/destinos.js
import { supabase } from '../supabaseClient.js';

export async function loadDestinationsCarousel() {
    const swiperWrapper = document.getElementById('destinos-container');
    if (!swiperWrapper) return;
    
    swiperWrapper.innerHTML = `<div class="swiper-slide text-center text-gray-600 flex items-center justify-center">Cargando destinos...</div>`;

    const { data, error } = await supabase
        .from('regiones_destinos')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });

    if (error) {
        console.error('Error fetching destinations:', error);
        swiperWrapper.innerHTML = `<div class="swiper-slide text-center text-red-500 flex items-center justify-center">Error al cargar destinos.</div>`;
        return;
    }

    if (data && data.length > 0) {
        // --- INICIO DE LA MODIFICACIÓN ESTÉTICA ---
        // Se ajustó el HTML para que coincida con la imagen de ejemplo (franja de color abajo)
        swiperWrapper.innerHTML = data.map(destino => `
            <div class="swiper-slide h-full pb-1">
                <a href="paquetes-destino.html?region=${destino.continente}" class="block relative rounded-lg overflow-hidden shadow-lg h-full group">
                    <img class="w-full h-full object-cover" src="${destino.imagen_url}" alt="Imagen de ${destino.continente}">
                    <div class="absolute bottom-0 left-0 right-0 p-3 bg-brand-dark-blue transition-colors duration-300 group-hover:bg-brand-light-teal">
                        <h3 class="text-white font-bold text-center uppercase text-sm group-hover:text-brand-dark-blue">${destino.continente}</h3>
                    </div>
                </a>
            </div>
        `).join('');
        // --- FIN DE LA MODIFICACIÓN ESTÉTICA ---
    } else {
        swiperWrapper.innerHTML = `<div class="swiper-slide text-center text-gray-600 flex items-center justify-center">No hay destinos disponibles.</div>`;
    }

     new Swiper('.swiper-destinos', {
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
        },
        navigation: {
            nextEl: '#busca-destino .swiper-button-next',
            prevEl: '#busca-destino .swiper-button-prev',
        },
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
        },
    });
}