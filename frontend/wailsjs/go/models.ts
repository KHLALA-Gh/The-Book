export namespace database {
	
	export class Book {
	    id: number;
	    name: string;
	    progress: number;
	    img: string;
	
	    static createFrom(source: any = {}) {
	        return new Book(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.progress = source["progress"];
	        this.img = source["img"];
	    }
	}

}

export namespace main {
	
	export class HomeBooksData {
	    recentlyAdded: database.Book[];
	    lastReaded: database.Book[];
	    favoriteBooks: database.Book[];
	
	    static createFrom(source: any = {}) {
	        return new HomeBooksData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.recentlyAdded = this.convertValues(source["recentlyAdded"], database.Book);
	        this.lastReaded = this.convertValues(source["lastReaded"], database.Book);
	        this.favoriteBooks = this.convertValues(source["favoriteBooks"], database.Book);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

