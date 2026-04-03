<script lang="ts">
    import { onMount } from 'svelte';
    import pym from 'pym.js';
    import Widget from './lib/Widget.svelte';

    let pymChild: any;

    onMount(() => {
        if (typeof window !== 'undefined') {
            pymChild = new pym.Child({ polling: 500 });
        }
    });

    function sendHeight() {
        if (pymChild) {
            setTimeout(() => pymChild.sendHeight(), 50);
        }
    }
</script>

<Widget onrendered={sendHeight} />
