<script lang="ts">
    //Imports
    import UploadDialog from "../components/UploadDialog.svelte";
    import Overlay from "../components/DialogOverlay.svelte"
    import PostComponent from "../components/PostComponent.svelte"

    //Classes and Types

    class Post {
        image: myImage;
        text: string;
        uploader: User;
        tags: Array<string>

		constructor() {
			this.text = "";
			this.uploader = new User();
			this.tags = []
            this.image = { url: '', height: 0, width: 0 }
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
    
    //Variables
    let posts: Array<Post> = $state([])
    let currUser: User = new User()
    currUser.name = "SampleUser"

    //Dialogs
    let uploadDialog: any
    let overlay: any

    //Functions

    //Takes a dialog as an argument; opens that dialog and the overlay.
    function open(dialog: any) {
        overlay.open(dialog);
        dialog.open();
    }

    //Takes a dialog as an argument; closes that dialog and the overlay.
    function close(dialog: any, shouldSave?: number) {
        if (shouldSave) {
            console.log("are you going to save")
        } else {
            overlay.close();
            dialog.close();
        }
    }



    //Temp - Submits the current Image
    function submitPost() {
        uploadDialog.setUser(currUser)
        posts.push(uploadDialog.getDraft())
        close(uploadDialog, 1)
    }
    

</script>
    <div class="bg-lime-300 m-5 p-5">
        {#each posts as post}
            <PostComponent>
                Uploaded by: {post.uploader.name} <br>
                Caption: {post.text} <br>
                <img src={post.image.url} height={post.image.height} width={post.image.width} alt=""> <br>
                Tags: {#each post.tags as tag} <span>{tag}, </span>{/each}
            </PostComponent>
        {/each}

        <button onclick={() => open(uploadDialog)}>Upload post</button>
    </div>

    <button onclick={() => close(overlay.getOpened(), false)}>
        <Overlay bind:this={overlay}></Overlay>
    </button>
    <UploadDialog bind:this={uploadDialog}>
        
        <button onclick={submitPost}>Submit</button>
    </UploadDialog>
    
