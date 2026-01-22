<script lang="ts">
    //Imports
    import UploadDialog from "../components/UploadDialog.svelte";
    import Overlay from "../components/DialogOverlay.svelte"
    import PostComponent from "../components/PostComponent.svelte"


    class Post {
        image: string;
        text: string;
        uploader: User;
        tags: Array<string>

		constructor() {
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
        console.log("opened")
        overlay.open(dialog);
        dialog.open();
    }

    //Takes a dialog as an argument; closes that dialog and the overlay.
    function close(dialog: any, shouldSave: boolean) {
        console.log("closed")
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
    }
    

</script>
    <div class="bg-lime-300 m-5 p-5">
        {#each posts as post}
            <PostComponent>
                Uploaded bt: {post.uploader.name}
                Caption: {post.text} <br>
                <img src={post.image} height="100px" width="100px" alt="">
            </PostComponent>
        {/each}

        <button onclick={() => open(uploadDialog)}>hi</button>
    </div>

    <button onclick={() => close(overlay.getOpened(), false)}>
        <Overlay bind:this={overlay}></Overlay>
    </button>
    <UploadDialog bind:this={uploadDialog}>
        
        <button onclick={submitPost}>Submit</button>
    </UploadDialog>
    
