// js/modules/uiComponents.js

/**
 * Crea el HTML para una tarjeta de paquete.
 * @param {object} paquete - El objeto del paquete desde Supabase.
 * @param {string} tipo - El tipo de paquete ('destacados', 'grupales', 'regionales', 'eventos').
 * @returns {string} El string HTML de la tarjeta.
 */
export function crearTarjetaPaquete(paquete, tipo) {
    const imageUrl = paquete.imagen_url || 'recursos/placeholder.png';
    const detailPageUrl = `detalle-paquete.html?id=${paquete.id}&type=${tipo}`;

    // Tarjeta para Grupales y Regionales
    if (tipo === 'grupales' || tipo === 'regionales') {
        return `
            <div class="card-paquete-grupales rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                <a href="${detailPageUrl}" class="block">
                    <img class="w-full h-48 object-cover" src="${imageUrl}" alt="Imagen de ${paquete.nombre}">
                </a>
                <div class="card-footer p-4 flex flex-col flex-grow text-center">
                    <h3 class="text-xl font-bold uppercase">${paquete.nombre}</h3>
                </div>
            </div>
        `;
    }

    // Tarjeta para Eventos
    if (tipo === 'eventos') {
        return `
            <div class="text-center group">
                <a href="${detailPageUrl}">
                    <img class="w-40 h-40 rounded-full object-cover mx-auto shadow-lg border-4 border-white transform group-hover:scale-105 transition-transform duration-300" src="${imageUrl}" alt="Imagen de ${paquete.nombre}">
                </a>
                <a href="${detailPageUrl}" class="mt-4 inline-block bg-brand-dark-blue text-white font-bold py-2 px-8 rounded-full hover:bg-opacity-90 transition uppercase">
                    ${paquete.nombre}
                </a>
            </div>
        `;
    }

    // Tarjeta por defecto (para Destacados y otros)
    const iconosHtml = (paquete.iconos || [])
        .map(icon => `<i class="fas fa-${icon} text-brand-light-teal mr-2"></i>`)
        .join('');

    return `
        <div class="card-paquete rounded-lg shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <a href="${detailPageUrl}" class="block">
                <img class="w-full h-48 object-cover" src="${imageUrl}" alt="Imagen de ${paquete.nombre}">
            </a>
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-white">${paquete.nombre}</h3>
                <p class="text-xs text-gray-400 uppercase mt-1 mb-2">${paquete.descripcion_corta || ''}</p>
                <div class="flex items-center text-sm my-2">
                   ${iconosHtml}
                </div>
                <div class="mt-auto pt-2 flex justify-between items-center">
                    <span class="text-2xl font-black text-brand-light-teal">${paquete.precio}</span>
                    <a href="${detailPageUrl}" class="bg-brand-dark-blue text-white border border-brand-light-teal font-bold py-1 px-3 rounded-full hover:bg-brand-light-teal hover:text-brand-dark-blue transition text-xs uppercase">
                        Ver Más
                    </a>
                </div>
            </div>
        </div>
    `;
}