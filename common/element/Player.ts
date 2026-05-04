import GameElement from './GameElement.ts';

export default class Player extends GameElement {
	name: string;
	direction: 'North' | 'South' | 'East' | 'West' = 'South';
	isMoving: boolean = false;
	currentFrame: number = 0;
	score: number = 0;
	hp: number = 100;
	maxHp: number = 100;
	isDead: boolean = false;
	nbKillsBandit: number = 0;
	nbKillsBillyTheKid: number = 0;
	nbKillsJohnHenry: number = 0;
	nbTimeAlive: number = 0;
	isInvincible: boolean = false;
	skin: number = 1;
	nbLevelPoint: number = 0;
	level: number = 1;
	speed: number = 8;
	damage: number = 5;

	constructor(name: string, id: string, x: number, y: number, skin: number = 1) {
		super(id, x, y);
		this.name = name;
		this.skin = skin;
	}

	move(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	addScore(add: number) {
		this.score += add;
		// +1 point de level chaque 200 points
		if (this.score >= 200 * this.level && this.score < 200 * (this.level + 1)) {
			this.nbLevelPoint++;
			this.level++;
		}
	}

	takeDamage(hpRemove: number) {
		if (this.hp - hpRemove > 0) {
			this.hp -= hpRemove;
		} else {
			this.hp = 0;
			this.isDead = true;
		}
	}
}
