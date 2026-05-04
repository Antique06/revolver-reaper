import GameElement from "./GameElement.ts";

export default class Bonus extends GameElement {
    type: string;
    width: number;
    height: number;

    constructor(x: number, y: number, type: string, width: number, height: number, id: string) {
        super(id, x, y);
        this.type = type;
        this.width = width;
        this.height = height;
    }
}
