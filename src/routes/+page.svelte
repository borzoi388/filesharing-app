<script lang="ts">
    import UploadDialog from "../components/UploadDialog.svelte";

    class Upload {
        file: string;
        text: string;
        uploader: User;
        tags: Array<string> | undefined
        constructor(file: string, text: string, uploader: User, tags?: Array<string>) {
            this.file = file;
            this.text = text;
            this.uploader = uploader;
            if (tags) this.tags = tags;
            console.log(file)
        }
    }

    class User {
        name: string;
        password: string;
        icon: string;
        status: string;
        constructor(name: string, password: string, icon: string, status: string) {
            this.name = name;
            this.password = password;
            this.icon = icon;
            this.status = status;
        }
    }

    function placeholderUser(): User {
        return new User("Name", "Password", "Icon", "Status")
    }

    let files: FileList = $state()
    var currText: string = $state("")
    var uploads: Array<Upload> = $state([])

    function clearFile() {
        files = new DataTransfer().files
    }
    function submitFile() {
        console.log(files[0].webkitRelativePath + " " + files[0].name)
        uploads.push(new Upload(files[0].webkitRelativePath, "text", placeholderUser(), ['tag']))
        clearFile()
    }
</script>
    <div class="bg-lime-200 m-5 p-5">
        <input accept="image/png" type="file" bind:files={files}>
        <input type="text" bind:value={currText}>
        <button onclick={submitFile}>submit</button>
        {#each uploads as upload}
            <div style="background: url({upload.file}); background-size: cover; background-position: center; width: 100px; height: 100px"></div>
            <p>{upload.file}eee</p>
        {/each}
    </div>

    <UploadDialog></UploadDialog>

