// js/modules/hero.js
import { supabase } from '../supabaseClient.js';

export async function loadHeroSection() {
    const heroContainer = document.getElementById('hero-container');
    if (!heroContainer) return;

    // Busca el primer slide que esté activo y con el menor número de orden
    const { data, error } = await supabase
        .from('hero_slider')
        .select('*')
        .eq('activo', true)
        .order('orden', { ascending: true })
        .limit(1)
        .single(); // .single() para que devuelva un solo objeto

    if (error || !data) {
        console.error('Error al cargar el slide principal o no se encontraron slides activos:', error);
        // Si hay un error o no hay nada en la base de datos, muestra el video por defecto para no dejar la sección vacía.
        heroContainer.innerHTML = `
            <div class="hero-shape">
                <video class="hero-video" autoplay loop muted playsinline>
                    <source src="recursos/VIDEO INICIO.mp4" type="video/mp4">
                </video>
                <div class="hero-overlay"></div>
            </div>
            <div class="hero-text-container">
                <p class="text-lg md:text-2xl font-semibold tracking-widest uppercase">Desde 2008</p>
                <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold mt-2 drop-shadow-lg uppercase">Cumpliendo Sueños</h1>
            </div>
        `;
        return;
    }

    // Si encuentra datos, construye el "hero" dinámicamente
    let mediaElement = '';
    if (data.media_type === 'video') {
        mediaElement = `<video class="hero-video" autoplay loop muted playsinline><source src="${data.media_url}" type="video/mp4"></video>`;
    } else {
        // Para imágenes, usamos un div con background-image para un mejor ajuste
        mediaElement = `<div class="hero-video" style="background-image: url('${data.media_url}'); background-size: cover; background-position: center;"></div>`;
    }

    heroContainer.innerHTML = `
        <div class="hero-shape">
            ${mediaElement}
            <div class="hero-overlay"></div>
        </div>
        <div class="hero-text-container">
            <p class="text-lg md:text-2xl font-semibold tracking-widest uppercase">${data.texto_secundario || ''}</p>
            <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold mt-2 drop-shadow-lg uppercase">${data.texto_principal || ''}</h1>
        </div>
    `;
}