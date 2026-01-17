<script lang="ts">
    import { fade } from "svelte/transition";

    export let overlay;

    let isOpen: boolean = false;
    let openDialog: any;

    export function open(temp: any) {
        isOpen = true
        openDialog = temp;
        console.log("yay")
    }

    export function close(shouldSave: boolean) {
        if (!shouldSave) {
            isOpen = false
        } else {
            alert("uhh you're supposed to be able to save a draft or smt")
        }
    }

    export function getOpened(): any {
        return openDialog
    }
</script>

{#if (isOpen)}
    <div bind:this={overlay} class="dialog">
        <div transition:fade={{duration: 50}} class="fixed top-0 w-screen h-screen bg-radial-[at_75%_25%] from-indigo-800/25 to-slate-950/75 backdrop-blur-[1px]"></div>
    </div>
{/if}
