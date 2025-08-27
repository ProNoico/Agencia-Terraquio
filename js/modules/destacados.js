// js/modules/destacados.js
import { supabase } from '../supabaseClient.js';
import { crearTarjetaPaquete } from './uiComponents.js';

export async function cargarPaquetesDestacados(container, limite) {
    if (!container) return;
    container.innerHTML = `<p class="text-gray-600 text-center col-span-full">Cargando paquetes...</p>`;

    const { data, error } = await supabase
        .from('destacados')
        .select('*')
        .order('orden', { ascending: true })
        .limit(limite);

    if (error) {
        console.error(`Error al cargar los paquetes destacados:`, error);
        container.innerHTML = `<p class="text-red-500 text-center col-span-full">No se pudieron cargar los paquetes.</p>`;
        return;
    }

    if (data && data.length > 0) {
        container.innerHTML = data.map(paquete => crearTarjetaPaquete(paquete, 'destacados')).join('');
    } else {
        container.innerHTML = `<p class="text-gray-600 text-center col-span-full">No hay paquetes destacados disponibles.</p>`;
    }
}