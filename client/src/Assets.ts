export default class Assets {
	playerNorthSkin1: HTMLImageElement = new Image();
	playerNorthSkin2: HTMLImageElement = new Image();
	playerNorthSkin3: HTMLImageElement = new Image();
	playerNorthSkin4: HTMLImageElement = new Image();
	playerSouthSkin1: HTMLImageElement = new Image();
	playerSouthSkin2: HTMLImageElement = new Image();
	playerSouthSkin3: HTMLImageElement = new Image();
	playerSouthSkin4: HTMLImageElement = new Image();
	playerEastSkin1: HTMLImageElement = new Image();
	playerEastSkin2: HTMLImageElement = new Image();
	playerEastSkin3: HTMLImageElement = new Image();
	playerEastSkin4: HTMLImageElement = new Image();
	playerWestSkin1: HTMLImageElement = new Image();
	playerWestSkin2: HTMLImageElement = new Image();
	playerWestSkin3: HTMLImageElement = new Image();
	playerWestSkin4: HTMLImageElement = new Image();
	playerDeadSkin1: HTMLImageElement = new Image();
	playerDeadSkin2: HTMLImageElement = new Image();
	playerDeadSkin3: HTMLImageElement = new Image();
	playerDeadSkin4: HTMLImageElement = new Image();
	map: HTMLImageElement = new Image();
	bonusVert: HTMLImageElement = new Image();
    bonusRouge: HTMLImageElement = new Image();
	bonusGold: HTMLImageElement = new Image();
	bandit: HTMLImageElement = new Image();
	banditDeath: HTMLImageElement = new Image();
	billyTheKid: HTMLImageElement = new Image();
	billyTheKidDeath: HTMLImageElement = new Image();
	johnHenry: HTMLImageElement = new Image();
	johnHenryDeath: HTMLImageElement = new Image();

	constructor() {
		this.playerNorthSkin1.src = 'images/player/walk/cowboy_walk_up_spritesheet_1.png';
		this.playerNorthSkin2.src = 'images/player/walk/cowboy_walk_up_spritesheet_2.png';
		this.playerNorthSkin3.src = 'images/player/walk/cowboy_walk_up_spritesheet_3.png';
		this.playerNorthSkin4.src = 'images/player/walk/cowboy_walk_up_spritesheet_4.png';
		this.playerSouthSkin1.src = 'images/player/walk/cowboy_walk_down_spritesheet_1.png';
		this.playerSouthSkin2.src = 'images/player/walk/cowboy_walk_down_spritesheet_2.png';
		this.playerSouthSkin3.src = 'images/player/walk/cowboy_walk_down_spritesheet_3.png';
		this.playerSouthSkin4.src = 'images/player/walk/cowboy_walk_down_spritesheet_4.png';
		this.playerEastSkin1.src = 'images/player/walk/cowboy_walk_right_spritesheet_1.png';
		this.playerEastSkin2.src = 'images/player/walk/cowboy_walk_right_spritesheet_2.png';
		this.playerEastSkin3.src = 'images/player/walk/cowboy_walk_right_spritesheet_3.png';
		this.playerEastSkin4.src = 'images/player/walk/cowboy_walk_right_spritesheet_4.png';
		this.playerWestSkin1.src = 'images/player/walk/cowboy_walk_left_spritesheet_1.png';
		this.playerWestSkin2.src = 'images/player/walk/cowboy_walk_left_spritesheet_2.png';
		this.playerWestSkin3.src = 'images/player/walk/cowboy_walk_left_spritesheet_3.png';
		this.playerWestSkin4.src = 'images/player/walk/cowboy_walk_left_spritesheet_4.png';
		this.playerDeadSkin1.src = 'images/player/death/cowboy_death_spritesheet_1.png';
		this.playerDeadSkin2.src = 'images/player/death/cowboy_death_spritesheet_2.png';
		this.playerDeadSkin3.src = 'images/player/death/cowboy_death_spritesheet_3.png';
		this.playerDeadSkin4.src = 'images/player/death/cowboy_death_spritesheet_4.png';
		this.map.src = 'images/fond/mapTest.png';
		this.bonusVert.src = 'images/bonus/ferChevalVert.png';
		this.bonusRouge.src = 'images/bonus/ferChevalRouge.png';
		this.bonusGold.src = 'images/bonus/ferChevalGold.png';
		this.bandit.src = 'images/enemy/bandit.png';
		this.banditDeath.src = 'images/enemy/bandit_death.png';
		this.billyTheKid.src = 'images/enemy/BillyTheKid.png';
		this.billyTheKidDeath.src = 'images/enemy/BillyTheKid_death.png';
		this.johnHenry.src = 'images/enemy/JohnHenry.png';
		this.johnHenryDeath.src = 'images/enemy/JohnHenry_death.png';
	}

	loadAll(): Promise<void[]> {
		const images = [
			this.playerNorthSkin1,
			this.playerNorthSkin2,
			this.playerNorthSkin3,
			this.playerNorthSkin4,
			this.playerSouthSkin1,
			this.playerSouthSkin2,
			this.playerSouthSkin3,
			this.playerSouthSkin4,
			this.playerEastSkin1,
			this.playerEastSkin2,
			this.playerEastSkin3,
			this.playerEastSkin4,
			this.playerWestSkin1,
			this.playerWestSkin2,
			this.playerWestSkin3,
			this.playerWestSkin4,
			this.playerDeadSkin1,
			this.playerDeadSkin2,
			this.playerDeadSkin3,
			this.playerDeadSkin4,
			this.map,
			this.bonusVert,
			this.bonusRouge,
			this.bonusGold,
			this.bandit,
			this.banditDeath,
			this.billyTheKid,
			this.billyTheKidDeath,
			this.johnHenry,
			this.johnHenryDeath,
		];

		const promises = images.map(img => {
			return new Promise<void>((resolve, reject) => {
				if (img.complete) {
					resolve();
				} else {
					img.onload = () => resolve();
					img.onerror = () => reject(new Error(`Erreur lors du chargement de: ${img.src}`));
				}
			});
		});

		return Promise.all(promises);
	}

	getPlayerSkin(skin: number, direction: 'North' | 'South' | 'East' | 'West', isDead: boolean): HTMLImageElement {
		const skinStr = String(skin || 1) as '1' | '2' | '3' | '4';
		if (isDead) {
			const deadSkins: Record<string, HTMLImageElement> = {
				'1': this.playerDeadSkin1,
				'2': this.playerDeadSkin2,
				'3': this.playerDeadSkin3,
				'4': this.playerDeadSkin4,
			};
			return deadSkins[skinStr] || this.playerDeadSkin1;
		}

		if (direction === 'North') {
			const arr: Record<string, HTMLImageElement> = { '1': this.playerNorthSkin1, '2': this.playerNorthSkin2, '3': this.playerNorthSkin3, '4': this.playerNorthSkin4 };
			return arr[skinStr] || this.playerNorthSkin1;
		}
		if (direction === 'East') {
			const arr: Record<string, HTMLImageElement> = { '1': this.playerEastSkin1, '2': this.playerEastSkin2, '3': this.playerEastSkin3, '4': this.playerEastSkin4 };
			return arr[skinStr] || this.playerEastSkin1;
		}
		if (direction === 'West') {
			const arr: Record<string, HTMLImageElement> = { '1': this.playerWestSkin1, '2': this.playerWestSkin2, '3': this.playerWestSkin3, '4': this.playerWestSkin4 };
			return arr[skinStr] || this.playerWestSkin1;
		}
		
		const arrSouth: Record<string, HTMLImageElement> = { '1': this.playerSouthSkin1, '2': this.playerSouthSkin2, '3': this.playerSouthSkin3, '4': this.playerSouthSkin4 };
		return arrSouth[skinStr] || this.playerSouthSkin1;
	}
}
