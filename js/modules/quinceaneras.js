// js/modules/quinceaneras.js
import { supabase } from '../supabaseClient.js';

export async function loadQuinceanerasSlider() {
    const swiperContainer = document.querySelector('.quinceaneras-slider');
    if (!swiperContainer) return;
    const swiperWrapper = document.getElementById('quinceaneras-slider-wrapper');
    if (!swiperWrapper) return;

    const { data, error } = await supabase
        .from('quinceaneras_slider_images')
        .select('imagen_url')
        .eq('activo', true)
        .order('orden', { ascending: true });

    if (error || !data || data.length === 0) {
        console.error('No se encontraron imágenes para el slider de quinceañeras o hubo un error:', error);
               swiperWrapper.innerHTML = `<div class="swiper-slide"><img src="recursos/FOTOS PARA MÓDULOS/MÓDULO 6_ QUINCEAÑERAS/PLACASFEED13-07.png" class="w-full h-96 object-cover" alt="Imagen de Quinceañeras"></div>`;
    } else {
        swiperWrapper.innerHTML = data.map(img => `
            <div class="swiper-slide">
                <img src="${img.imagen_url}" class="w-full h-96 object-cover" alt="Imagen de viaje de quinceañeras">
            </div>
        `).join('');
    }

    new Swiper('.quinceaneras-slider', {
        loop: data && data.length > 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

// --- INICIO DE NUEVA FUNCIÓN AÑADIDA ---
export async function cargarProgramasQuinceaneras(container) {
    if (!container) return;
    container.innerHTML = `<p class="text-gray-600 text-center col-span-full">Cargando programas...</p>`;

    const { data, error } = await supabase
        .from('quinceaneras_programas')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true });
    
    if (error) {
        console.error('Error al cargar los programas de quinceañeras:', error);
        container.innerHTML = `<p class="text-red-500 text-center col-span-full">No se pudieron cargar los programas.</p>`;
        return;
    }

    if (data && data.length > 0) {
        container.innerHTML = data.map(programa => `
            <div class="card-quince rounded-lg shadow-xl overflow-hidden flex flex-col text-center transform hover:-translate-y-2 transition-transform duration-300">
                <img class="w-full h-56 object-cover" src="${programa.imagen_url}" alt="Imagen de ${programa.nombre}">
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-xl font-bold text-white uppercase">${programa.nombre}</h3>
                    <p class="text-gray-300 text-sm mt-2 flex-grow">${programa.descripcion}</p>
                    <div class="mt-4">
                        <a href="https://wa.me/+543476606001?text=Hola,%20quisiera%20más%20información%20sobre%20el%20programa%20de%20quinceañeras:%20${encodeURIComponent(programa.nombre)}" 
                           target="_blank" 
                           class="inline-block bg-brand-light-teal text-brand-dark-blue font-bold py-2 px-6 rounded-full hover:bg-white transition text-sm uppercase">
                           Consultar
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = `<p class="text-gray-600 text-center col-span-full">No hay programas de quinceañeras disponibles en este momento.</p>`;
    }
}
// --- FIN DE NUEVA FUNCIÓN ---