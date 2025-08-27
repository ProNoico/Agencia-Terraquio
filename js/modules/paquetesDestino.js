// js/modules/paquetesDestino.js
import { supabase } from '../supabaseClient.js';
import { crearTarjetaPaquete } from './uiComponents.js';

export async function loadRegionPackages() {
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get('region');
    if (!regionParam) return;
    
    const paquetesContainer = document.getElementById('paquetes-container');
    const regionTitle = document.getElementById('region-title');

    if (regionTitle) regionTitle.textContent = `Paquetes en ${regionParam.toUpperCase()}`;
    if (paquetesContainer) paquetesContainer.innerHTML = `<p class="text-gray-600 text-center col-span-full">Cargando paquetes...</p>`;
    
    const { data, error } = await supabase
        .from('regiones_paquetes')
        .select('*')
        .eq('continente', regionParam);

    if (error) {
        console.error('Error al cargar paquetes de la región:', error);
        if (paquetesContainer) paquetesContainer.innerHTML = `<p class="text-red-500 text-center col-span-full">Error al cargar los paquetes.</p>`;
        return;
    }

    if (data && data.length > 0) {
        if (paquetesContainer) paquetesContainer.innerHTML = data.map(paquete => crearTarjetaPaquete(paquete, 'regionales')).join('');
    } else {
        if (paquetesContainer) paquetesContainer.innerHTML = `<p class="text-gray-600 text-center col-span-full">No hay paquetes disponibles para esta región.</p>`;
    }
}