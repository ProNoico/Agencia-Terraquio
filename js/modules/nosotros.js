// js/modules/nosotros.js
import { supabase } from '../supabaseClient.js';

export async function loadNosotrosPage() {
    const textoContainer = document.getElementById('nosotros-texto');
    const galeriaContainer = document.getElementById('nosotros-galeria');

    if (!textoContainer || !galeriaContainer) return;

    // Cargar texto
    const { data: textoData, error: textoError } = await supabase
        .from('nosotros_content')
        .select('content')
        .eq('id', 1)
        .single();
    
    if (textoError) {
        textoContainer.innerHTML = `<p class="text-red-500">Error al cargar el contenido.</p>`;
    } else if (textoData) {
        textoContainer.innerHTML = textoData.content;
    }

    // Cargar imágenes
    const { data: galeriaData, error: galeriaError } = await supabase
        .from('nosotros_gallery_images')
        .select('*')
        .order('orden', { ascending: true });

    if (galeriaError) {
        galeriaContainer.innerHTML = `<p class="text-red-500 col-span-full">Error al cargar las imágenes.</p>`;
    } else if (galeriaData && galeriaData.length > 0) {
        galeriaContainer.innerHTML = galeriaData.map(img => `
            <div class="rounded-lg overflow-hidden shadow-lg">
                <img src="${img.imagen_url}" alt="${img.alt_text}" class="w-full h-full object-cover aspect-[4/3]">
            </div>
        `).join('');
    } else {
        galeriaContainer.innerHTML = `<p class="text-gray-500 col-span-full">No hay imágenes en la galería.</p>`;
    }
}