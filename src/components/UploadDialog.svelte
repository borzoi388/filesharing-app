<script lang="ts">
    import { blur } from "svelte/transition";

    import ImgViewDialog from "./ImgViewDialog.svelte";
    let imgViewDialog: any;

    export let uploadDialog;

    class Post {
        image: myImage | undefined
        text: string;
        uploader: User;
        tags: Array<string>

		constructor() {
			this.text = "";
			this.uploader = new User();
			this.tags = []
            this.image = undefined;
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
    
    type myImage = { url: string; height: number; width: number }

    let isOpen: boolean = false;

    let draft: Post = new Post();
    let nextTag: string;

    let imgInput: FileList;

    export function open() {
        draft = new Post()
        imgInput = new DataTransfer().files;
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
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                let img: HTMLImageElement = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    draft.image = { url: img.src, height: img.naturalHeight, width: img.naturalWidth }
                }
            }
        }
    }

    function pushTag() {
        draft.tags.push(nextTag);
        draft.tags = draft.tags;
        nextTag = "";
    }

</script>

<div bind:this={uploadDialog} class="dialog">
    {#if (isOpen)}
        <div transition:blur={{duration: 150}} class="p-4 bg-lime-300 fixed top-1/2 left-1/2 -translate-1/2 w-1/3 h-2/3 shadow-xl shadow-slate-950">

        <div class="grid grid-cols-2 gap-2 w-full items-bottom">
            <div class="col-span-1 items-bottom border-2 border-indigo-900">
                <div class="w-full h-40 bg-yellow-100">
                    {#if draft.image}
                        <button class="size-full" style="background: url({draft.image.url}); background-size: cover; background-repeat: no-repeat; background-position: center" onclick={() => imgViewDialog.open(draft.image, imgInput[0].name)}>
                            Click to preview
                        </button>
                    {:else}
                        No image selected
                    {/if}
                </div>
                <input class="bg-cyan-100 content-center px-2 w-full border-t-2 border-indigo-900" bind:files={imgInput} accept="image" type="file" onchange={onChange}>
            </div>
            <div class="col-span-1">
                
            </div>
        </div>


        <br>
        <input bind:value={draft.text} placeholder="caption">
        <input bind:value={nextTag} placeholder="add tag">
        <button onclick={pushTag}>add tag</button> <br>
        <span>Tags: </span>
        {#each draft.tags as tag, i} 
            <span> {#if (i != 0)},{/if} {tag}</span>
        {/each} <br>
            <slot/>
        </div>
        <ImgViewDialog bind:this={imgViewDialog}></ImgViewDialog>
    {/if}
</div>
