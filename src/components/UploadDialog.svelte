<script lang="ts">
    import { blur } from "svelte/transition";

    export let uploadDialog;

    class Post {
        image: string
        text: string;
        uploader: User;
        tags: Array<string>

		constructor() {
			this.text = "";
			this.uploader = new User();
			this.tags = []
            this.image = "";
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

    let isOpen: boolean = false;

    let draft: Post = new Post();
    let nextTag: string;

    let imgInput: FileList;
    let currentImg: string | undefined;

    export function open() {
        draft = new Post()
        currentImg = undefined;
        console.log(draft.text)
        isOpen = true
    }

    export function close() {
        isOpen = false
    }
    
    export function setUser(user: User) {
        draft.uploader = user;
    }

    export function getDraft(): Post {
        return draft
    }

    function onChange() {
        const file = imgInput[0]

        if (file) {
            console.log("there is a file")
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                currentImg = reader.result as string;
                draft.image = currentImg;
            }
        }

    }
</script>

<div bind:this={uploadDialog} class="dialog">
    {#if (isOpen)}
        <div transition:blur={{duration: 150}} class="bg-lime-300 fixed top-1/2 left-1/2 -translate-1/2 w-1/3 h-2/3 shadow-xl shadow-slate-950">

        <input bind:files={imgInput} type="file" onchange={onChange}>

        <br>
        image preview: 
        {#if (currentImg)}
            <img src={currentImg} height=100 width=100 alt="">
        {:else}
            please select an image!
        {/if}


        <br>
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
