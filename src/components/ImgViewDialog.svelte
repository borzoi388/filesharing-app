<script lang=ts>
    export let imgViewDialog;
    let isOpened = false;

    //Classes
    type myImage = { url: string; height: number; width: number }

    let imgSrc: string;
    let imgHeight: number;
    let imgName: string;

    export function open(image: myImage, name: string) {
        imgSrc = image.url;
        imgName = name;
        let ratio = 25/image.width;
        imgHeight = image.height*ratio;
        isOpened = true;
    }

    export function close() {
        isOpened = false;
    }
</script>

<div bind:this={imgViewDialog} class="dialog">
    {#if (isOpened)}
        <div class="border border-2 border-indigo-900 fixed top-[2vw] left-[2vw] z-69 bg-lime-300">
            <div class="w-full bg-rose-200 border-b-2 border-indigo-900 pl-1 grid grid-cols-10">
                <span class="col-span-9">
                    {imgName}
                </span>
                <button class="hover:bg-rose-300 px-1 col-span-1" onclick={close}>x</button>
            </div>
            <div class="w-full p-2">
                <div class="bg-yellow-100 border border-2 border-indigo-900">
                    <div class="size-full w-[25vw]" style="height: {imgHeight}vw; background-color: var(--color-yellow-100); background: url({imgSrc}); background-size: cover; background-repeat: no-repeat; background-position: center"></div>
                </div>
            </div>
        </div>
    {/if}
</div>
