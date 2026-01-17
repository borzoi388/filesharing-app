// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	//types
    public class Post {
        image: myImage;
        text: string;
        uploader: User;
        tags: Array<string>

		constructor() {
			this.image = new myImage;
			this.text = "";
			this.uploader = new User;
			this.tags = []
		}
    }

    public class User {
        name: string;
        password: string;

		constructor() {
			this.name = ""
			this.password = ""
		}
    }

	public class myImage {
        url: string;
        alt: string;

		constructor() {
			this.url = ""
			this.alt = ""
		}
    }
}

export {};
