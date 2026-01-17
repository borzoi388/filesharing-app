<script lang="ts">
    import { blur } from "svelte/transition";

    export let uploadDialog;

    class Post {
        image: myImage;
        text: string;
        uploader: User;
        tags: Array<string>

		constructor() {
			this.image = new myImage();
			this.text = "";
			this.uploader = new User();
			this.tags = []
		}
    }

    class User {
        name: string;
        password: string;

		constructor() {
			this.name = ""
			this.password = ""
		}
    }

	class myImage {
        url: string;
        alt: string;

		constructor() {
			this.url = ""
			this.alt = ""
		}
    }

    let isOpen: boolean = false;

    let draft: Post = new Post();
    let nextTag: string;

    export function open() {
        draft = new Post()
        console.log(draft.text)
        isOpen = true
    }

    export function close() {
        draft = new Post()
        isOpen = false
    }
    
    export function setUser(user: User) {
        draft.uploader = user;
    }

    export function getDraft(): Post {
        return draft
    }
</script>

<div bind:this={uploadDialog} class="dialog">
    {#if (isOpen)}
        <div transition:blur={{duration: 150}} class="bg-lime-300 fixed top-1/2 left-1/2 -translate-1/2 w-1/3 h-2/3 shadow-xl shadow-slate-950">

        <input bind:value={draft.image.url} placeholder="image url">
        <input bind:value={draft.text} placeholder="caption">
        <input bind:value={nextTag} placeholder="add tag">
        <button onclick={() => draft.tags.push(nextTag)}>add tag</button>
        <ul>
            {#each draft.tags as tag} 
                <li>{tag}</li>
            {/each}
        </ul>
            <slot/>
        </div>
    {/if}
</div>
