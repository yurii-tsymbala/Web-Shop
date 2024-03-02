export class Product {
    constructor(
        public id: number,
        public brand: string,
        public name: string,
        public api_featured_image: string,
        public price: number,
        public price_sign: string,
        public currency: string,
        public created_at: string
    ) {}

    get date(): number {
        const date = new Date(this.created_at);
        return Math.floor(date.getTime() / 1000);
    }
}
