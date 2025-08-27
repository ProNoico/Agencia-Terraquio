// js/modules/auth.js
import { supabase } from '../supabaseClient.js';

export function setupAuth() {
    const authLinksContainer = document.getElementById('auth-links');
    const authLinksMobileContainer = document.getElementById('auth-links-mobile');

    supabase.auth.onAuthStateChange((event, session) => {
        const userLoggedIn = !!session;
        const authHtml = userLoggedIn
            ? `<a href="mi-cuenta.html" class="bg-brand-dark-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition text-xs uppercase">MI CUENTA</a>`
            : `<a href="login.html" class="bg-brand-dark-blue text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition text-xs uppercase">INICIAR SESIÓN</a>`;

        if (authLinksContainer) {
            authLinksContainer.innerHTML = authHtml;
        }
        if (authLinksMobileContainer) {
            authLinksMobileContainer.innerHTML = authHtml.replace('py-2 px-4', 'py-2 px-4 w-full text-center block');
        }
    });
}