export default class CanvasImage {
    constructor(context, imgData) {
        this.context = context;
        this.imgData = imgData;
        const img = document.createElement("img");
        img.src = this.imgData;
        this.img = img;
        this.originalWidth = img.width;
        this.originalHeight = img.height;
        this.displayWidth = img.width;
        this.displayHeight = img.height;
        // if (this.originalWidth >= context.canvas.width) {
        //     this.displayWidth = context.canvas.width;
        //     this.displayHeight =
        //         this.originalHeight *
        //         (context.canvas.width / this.displayWidth);
        //     console.log(this.displayWidth, this.displayHeight);
        // }
        this.img.width = this.displayWidth;
        this.img.height = this.displayHeight;
        // console.log(this.img);
    }
    draw() {
        this.context.drawImage(this.img, 0, 0);
    }
}
