/**
 * Shared pym.Child wrapper.
 * Call initPym() in onMount, then sendHeight() after any DOM change.
 */
import { onMount } from 'svelte';

let pymChild: { sendHeight: () => void } | null = null;

export function initPym() {
    onMount(async () => {
        if (typeof window !== 'undefined') {
            const pym = await import('pym.js');
            pymChild = new pym.default.Child({ polling: 500 });
        }
    });
}

export function sendHeight() {
    if (pymChild) {
        setTimeout(() => pymChild!.sendHeight(), 50);
    }
}
