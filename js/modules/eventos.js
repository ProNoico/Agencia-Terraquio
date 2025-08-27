// js/modules/eventos.js
import { supabase } from '../supabaseClient.js';
import { crearTarjetaPaquete } from './uiComponents.js';

export async function cargarEventos() {
    const eventosContainer = document.getElementById('eventos-container');
    if (!eventosContainer) return;
    eventosContainer.innerHTML = `<p class="text-gray-600">Cargando eventos...</p>`;

    const { data, error } = await supabase
        .from('eventos_paquetes')
        .select('*')
        .order('orden', { ascending: true });

    if (error) {
        console.error('Error al cargar los eventos:', error);
        eventosContainer.innerHTML = `<p class="text-red-500">No se pudieron cargar los eventos.</p>`;
        return;
    }

    if (data && data.length > 0) {
        eventosContainer.innerHTML = data.map(evento => crearTarjetaPaquete(evento, 'eventos')).join('');
    } else {
        eventosContainer.innerHTML = `<p class="text-gray-600">No hay eventos disponibles en este momento.</p>`;
    }
}