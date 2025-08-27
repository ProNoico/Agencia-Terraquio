// js/modules/grupales.js
import { supabase } from '../supabaseClient.js';
import { crearTarjetaPaquete } from './uiComponents.js';

export async function cargarPaquetesGrupales(container, limite) {
    if (!container) return;
    container.innerHTML = `<p class="text-gray-600 text-center col-span-full">Cargando salidas grupales...</p>`;

    const { data, error } = await supabase
        .from('grupales_paquetes')
        .select('*')
        .order('orden', { ascending: true })
        .limit(limite);

    if (error) {
        console.error('Error al cargar paquetes grupales:', error);
        container.innerHTML = `<p class="text-red-500 text-center col-span-full">No se pudieron cargar las salidas.</p>`;
        return;
    }

    if (data && data.length > 0) {
        container.innerHTML = data.map(paquete => crearTarjetaPaquete(paquete, 'grupales')).join('');
    } else {
        container.innerHTML = `<p class="text-gray-600 text-center col-span-full">No hay salidas grupales disponibles.</p>`;
    }
}

export async function loadGroupBanners() {
    const swiperWrapper = document.querySelector('.banner-grupales-slider .swiper-wrapper');
    if (!swiperWrapper) return;
    swiperWrapper.innerHTML = `<div class="swiper-container banner-grupales-slider mt-8 rounded-lg overflow-hidden>Cargando...</div>`;

    const { data, error } = await supabase
        .from('grupales_banners')
        .select('imagen_url, texto_overlay')
        .eq('activo', true)
        .order('orden', { ascending: true });

    if (error) {
        console.error('Error fetching group banners:', error);
        swiperWrapper.innerHTML = `<div class="swiper-slide text-center text-red-500 flex items-center justify-center">Error al cargar banners.</div>`;
        return;
    }

    if (data && data.length > 0) {
        swiperWrapper.innerHTML = data.map(banner => `
            <div class="swiper-slide">
                 <img src="${banner.imagen_url}" class="absolute inset-0 w-full h-full object-cover" alt="${banner.texto_overlay || 'Banner de viaje grupal'}">
                 
                 <h3 class="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-white text-center px-4">
                    <span class="juntos-text">${banner.texto_overlay || ''}</span>
                 </h3>
            </div>
        `).join('');
    } else {
        swiperWrapper.innerHTML = `<div class="swiper-slide"><img src="https://rwndahfhxxasuwycfjug.supabase.co/storage/v1/object/public/imagenes-web/destinos/grupo.jpg" class="absolute inset-0 w-full h-full object-cover" alt="Viajes en grupo"><div class="absolute inset-0 bg-black/40"></div><h3 class="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-white text-center px-4"><span class="juntos-text">JUNTOS POR EL MUNDO</span></h3></div>`;
    }

    new Swiper('.banner-grupales-slider', {
        loop: data && data.length > 1,
        effect: 'fade',
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });
}