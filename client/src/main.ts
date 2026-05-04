import { io } from 'socket.io-client';
import Assets from './Assets.ts';
import Player from '../../common/element/Player.ts';
import Bullet from '../../common/element/Bullet.ts';
import type Bandit from '../../common/element/Bandit.ts';
import type BillyTheKid from '../../common/element/BillyTheKid.ts';
import type JohnHenry from '../../common/element/JohnHenry.ts';

import drawPlayer from './draw/drawPlayer.ts';
import drawBandits from './draw/drawBandits.ts';
import drawBillyTheKids from './draw/drawBillyTheKids.ts';
import drawJohnHenrys from './draw/drawJohnHenrys.ts';
import updateAnimation from './draw/updateAnimation.ts';

import { musique } from './pageLoader.ts';

const assets = new Assets();
export const socket = io(window.location.hostname + ':1234');


let x: number = 0;
let y: number = 0;
let vitesseX: number = 0;
let vitesseY: number = 0;
const scale: number = 5;

const top3ListAffichage = document.querySelector('.top3List');
const gamePseudo = document.querySelector('.gamePseudo');
const gameScore = document.querySelector('.gameScore');
const gameHighScore = document.querySelector('.gameHighScore');
const nbLevelPointNumber = document.querySelector('.nbLevelPointNumber');
const upgradeHpBtn = document.querySelector('.upgradeHpBtn');
const upgradeDmgBtn = document.querySelector('.upgradeDmgBtn');
const upgradeSpeedBtn = document.querySelector('.upgradeSpeedBtn');
const maxHp = document.querySelector('.maxHp');
const maxDmg = document.querySelector('.maxDmg');
const maxSpeed = document.querySelector('.maxSpeed');
const gameHPNumber = document.querySelector('.hpValue');
const gameDmgNumber = document.querySelector('.dmgValue');
const gameSpeedNumber = document.querySelector('.speedValue');

let players: Player[] = [];
let serverBullets: Bullet[] = [];
let bandits: Bandit[] = [];
let listBonus: any[] = [];
let billyTheKids: BillyTheKid[] = [];
let johnHenrys: JohnHenry[] = [];

let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;
let lastShootTime = 0;
const shootInterval = 100;

let mouseMovingX = 0;
let mouseMovingY = 0;
let isMouseMoving: boolean = false;

const articleGamePage = document.querySelector('.GamePage');
const articleReplayPage = document.querySelector('.ReplayPage');

const replayTemps = document.querySelector('.replayTemps');
const replayKillsBandit = document.querySelector('.replayKillsBandit');
const replayKillsBillyTheKid = document.querySelector(
	'.replayKillsBillyTheKid'
);
const replayKillsJohnHenry = document.querySelector('.replayKillsJohnHenry');
const replayScore = document.querySelector('.replayScore');

socket.on('players', (p: Player[]) => {
	p.forEach(newPlayer => {
		const oldPlayer = players.find(old => old.id === newPlayer.id);
		if (oldPlayer) {
			if (!newPlayer.isDead && oldPlayer.isDead) {
				newPlayer.currentFrame = 0;
			} else {
				newPlayer.currentFrame = oldPlayer.currentFrame;
			}
		}
	});
	players = p;
});

socket.on('bullets', b => {
	serverBullets = b;
});

socket.on('bandits', b => {
	bandits = b;
});

socket.on('bonusList', bonusDuServeur => {
	listBonus = bonusDuServeur;
});

socket.on('billyTheKids', b => {
	billyTheKids = b;
});

socket.on('johnHenrys', b => {
	johnHenrys = b;
});

socket.on('death', (id: string) => {
	if (id === socket.id) {
		articleGamePage?.setAttribute('style', 'display: none;');
		articleReplayPage?.setAttribute('style', '');

		musique.pause();
        musique.currentTime = 0;
		
		if(nbLevelPointNumber) nbLevelPointNumber.innerHTML = '0';
		if(gameHPNumber) gameHPNumber.innerHTML = '100';
		if(gameDmgNumber) gameDmgNumber.innerHTML = '5';
		if(gameSpeedNumber) gameSpeedNumber.innerHTML = '8';

		if (replayTemps) {
			const nbTimeAlive = players.find(p => p.id === socket.id)?.nbTimeAlive;
			const nbSec = nbTimeAlive! % 60;
			const nbMin = Math.round(nbTimeAlive! / 60);
			replayTemps.innerHTML = `Temps : ${nbMin}min ${nbSec}sec`;
		}
		if (replayKillsBandit)
			replayKillsBandit.innerHTML = `Nombres de bandits tués : ${players.find(p => p.id === socket.id)?.nbKillsBandit}`;
		if (replayKillsBillyTheKid)
			replayKillsBillyTheKid.innerHTML = `Nombres de Billy The Kid tués : ${players.find(p => p.id === socket.id)?.nbKillsBillyTheKid}`;
		if (replayKillsJohnHenry)
			replayKillsJohnHenry.innerHTML = `Nombres de John henry tués : ${players.find(p => p.id === socket.id)?.nbKillsJohnHenry}`;
		if (replayScore)
			replayScore.innerHTML = `Score : ${players.find(p => p.id === socket.id)?.score}`;
	}
});

const canvas = document.querySelector<HTMLCanvasElement>('.gameCanvas')!,
	context = canvas.getContext('2d')!;
context.imageSmoothingEnabled = false;

const width: number = canvas.width;
const height: number = canvas.height;

let mapcpt = 0;

function render() {
	context.clearRect(0, 0, width, height);

	context.drawImage(
		assets.map,
		0,
		mapcpt,
		assets.map.width,
		height,
		0,
		0,
		width,
		height
	);
	if (mapcpt + height > assets.map.height) {
		context.drawImage(
			assets.map,
			0,
			0,
			assets.map.width,
			height - (assets.map.height - mapcpt),
			0,
			assets.map.height - mapcpt,
			width,
			height - (assets.map.height - mapcpt)
		);
	}

	mapcpt = (mapcpt + 0.5) % assets.map.height;

	updateAnimation(players);

	listBonus.forEach(bonnus => {
        let drawBonnus = assets.bonusVert;
        let glitchOffsetX = 0;
        let glitchOffsetY = 0;
        let glitchScale = 1.0;

        if (bonnus.type === 'rouge') {
            drawBonnus = assets.bonusRouge;  
            const probabiliteGlitch = 0.1; 
            if (Math.random() < probabiliteGlitch) {
                glitchOffsetX = (Math.random() - 0.5) * 10;
                glitchOffsetY = (Math.random() - 0.5) * 10; 
                glitchScale = 1.0 + (Math.random() - 0.5) * 0.2; 
            }
        }
        if (bonnus.type === 'gold') {
            drawBonnus = assets.bonusGold;
        }
        if (!drawBonnus.complete || drawBonnus.width === 0) return;

        const targetW = bonnus.width * glitchScale;
        const targetH = bonnus.height * glitchScale;
        const finalX = bonnus.x + glitchOffsetX - (targetW - bonnus.width) / 2;
        const finalY = bonnus.y + glitchOffsetY - (targetH - bonnus.height) / 2;
        context.drawImage(
            drawBonnus,
            finalX,
            finalY,
            targetW,
            targetH
        );
    });

	drawPlayer(players, context, scale, socket.id, assets);
	drawBandits(bandits, context, scale, assets);
	drawBillyTheKids(billyTheKids, context, scale, assets);
	drawJohnHenrys(johnHenrys, context, scale, assets);
	serverBullets.forEach(bullet => {
		context.beginPath();
		context.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
		context.fillStyle = 'black';
		context.fill();
		context.closePath();
	});
	requestAnimationFrame(render);
}

function movePlayer() {
	const playerBoxW = assets.playerSouthSkin1.width
		? (assets.playerSouthSkin1.width / 4) * scale
		: 160;
	const playerBoxH = assets.playerSouthSkin1.height
		? assets.playerSouthSkin1.height * scale
		: 160;

	if (x + playerBoxW < width || vitesseX < 0) {
		if (x > 0 || vitesseX > 0) {
			x += vitesseX;
		}
	}

	if (y + playerBoxH < height || vitesseY < 0) {
		if (y > 0 || vitesseY > 0) {
			y += vitesseY;
		}
	}

	let isMoving = vitesseX !== 0 || vitesseY !== 0;
	
	let direction: 'North' | 'South' | 'East' | 'West' = 'South';

	let myPlayer = players.find(p => p.id === socket.id);
	if (myPlayer && myPlayer.direction) {
		direction = myPlayer.direction;
	}

	if (Math.abs(vitesseY) > Math.abs(vitesseX)) {
		if (vitesseY < 0) direction = 'North';
		else if (vitesseY > 0) direction = 'South';
	} else if (Math.abs(vitesseX) >= Math.abs(vitesseY) && isMoving) {
		if (vitesseX > 0) direction = 'East';
		else if (vitesseX < 0) direction = 'West';
	}

	socket.emit('playerMovement', x, y, direction, isMoving);
}

function update() {
	const player = players.find(p => p.id === socket.id);
	if (player && !player.isDead) {
		updateVelocity();
		movePlayer();

		if (isMouseDown) {
			const now = Date.now();
			if (now - lastShootTime >= shootInterval) {
				lastShootTime = now;
				const playerBoxW = assets.playerSouthSkin1.width
					? (assets.playerSouthSkin1.width / 4) * scale
					: 160;
				const playerBoxH = assets.playerSouthSkin1.height
					? assets.playerSouthSkin1.height * scale
					: 160;
				const targetAngle = Math.atan2(
					mouseY - (y + playerBoxW / 2),
					mouseX - (x + playerBoxH / 2)
				);
				socket.emit('shoot', {
					x: x + playerBoxW / 2,
					y: y + playerBoxH / 2,
					angle: targetAngle,
				});
				lastShootTime = now;
			}
		}
	}
}

const keys = {
	up: false,
	down: false,
	left: false,
	right: false,
};

function updateVelocity() {
	let dx = 0;
	let dy = 0;

	const myPlayer = players.find(p => p.id === socket.id);

	if (keys.right) dx += 1;
	if (keys.left) dx -= 1;
	if (keys.down) dy += 1;
	if (keys.up) dy -= 1;

	let isKeyboardMoving = dx !== 0 || dy !== 0;

	if (isKeyboardMoving) {
		isMouseMoving = false;
		const length = Math.sqrt(dx * dx + dy * dy);
		dx /= length;
		dy /= length;
	} else if (isMouseMoving) {
		const targetAngle = Math.atan2(mouseMovingY - (y + 80), mouseMovingX - (x + 80));
		dx = Math.cos(targetAngle);
		dy = Math.sin(targetAngle);

		const distToTarget = Math.sqrt(
			Math.pow(mouseMovingX - (x + 80), 2) + Math.pow(mouseMovingY - (y + 80), 2)
		);
		
		if (distToTarget < myPlayer!.speed) {
			isMouseMoving = false;
			dx = 0;
			dy = 0;
		}
	}

	const FRICTION = 0.95;
	const ACCELERATION = myPlayer!.speed * (1 - FRICTION);

	vitesseX += dx * ACCELERATION;
	vitesseY += dy * ACCELERATION;

	vitesseX *= FRICTION;
	vitesseY *= FRICTION;

	if (Math.abs(vitesseX) < 0.1) vitesseX = 0;
	if (Math.abs(vitesseY) < 0.1) vitesseY = 0;
}

document.addEventListener('keydown', event => {
	const player = players.find(p => p.id === socket.id);
	if (player && !player.isDead) {
		if (event.code === 'ArrowRight' || event.code === 'KeyD') keys.right = true;
		if (event.code === 'ArrowLeft' || event.code === 'KeyA') keys.left = true;
		if (event.code === 'ArrowDown' || event.code === 'KeyS') keys.down = true;
		if (event.code === 'ArrowUp' || event.code === 'KeyW') keys.up = true;
		if (event.code === 'Digit1') upgradeHp();
		if (event.code === 'Digit2') upgradeDmg();
		if (event.code === 'Digit3') upgradeSpeed();
	}
});

document.addEventListener('keyup', event => {
	const player = players.find(p => p.id === socket.id);
	if (player && !player.isDead) {
		if (event.code === 'ArrowRight' || event.code === 'KeyD')
			keys.right = false;
		if (event.code === 'ArrowLeft' || event.code === 'KeyA') keys.left = false;
		if (event.code === 'ArrowDown' || event.code === 'KeyS') keys.down = false;
		if (event.code === 'ArrowUp' || event.code === 'KeyW') keys.up = false;
	}
});

document.addEventListener('mousemove', event => {
	mouseX = event.clientX;
	mouseY = event.clientY;
});

document.addEventListener('mouseup', event => {
	if (event.button === 0) {
		isMouseDown = false;
	}
});

document.addEventListener('mousedown', event => {
	if (event.button === 0) {
		isMouseDown = true;
	}
});

canvas.addEventListener('contextmenu', event => {
	event.preventDefault();
	isMouseMoving = true;
	mouseMovingX = mouseX;
	mouseMovingY = mouseY;
});

assets
	.loadAll()
	.then(() => {
		setInterval(update, 1000 / 60);
		requestAnimationFrame(render);
	})
	.catch(console.error);

const replayButton = document.querySelector('.ReplayPage .PlayAgainButton');
const backToHomePageFromReplay = document.querySelector(
	'.ReplayPage .backToHomePageFromReplay'
);

backToHomePageFromReplay?.addEventListener('click', event => {
	resetPlayer(event);
	console.log('BackToHomPageButton press');
});

replayButton?.addEventListener('click', event => {
	resetPlayer(event);
	articleReplayPage?.setAttribute('style', 'display: none;');
	articleGamePage?.setAttribute('style', '');
	socket.emit('replay', socket.id);
	console.log('ReplayButton press');
	musique.play();
});

function resetPlayer(event: Event) {
	event.preventDefault();
	x = 0;
	y = 0;
	vitesseX = 0;
	vitesseY = 0;
	keys.up = false;
	keys.down = false;
	keys.left = false;
	keys.right = false;
	isMouseMoving = false;
	isMouseDown = false;
}

socket.on('leaderboard', (tabScore: [string, { score: number, date: string }][]) => {
    tabScore.sort((a, b) => b[1].score - a[1].score);
    const top3 = tabScore.slice(0, 3);
    const monJoueur = players.find(p => p.id === socket.id);

    let top3L = '';
    top3.forEach(([nom, data], index) => {
        top3L += `<div>${index + 1}. ${nom} : ${data.score} pts</div>`;
    });
    if (top3ListAffichage) top3ListAffichage.innerHTML = top3L;

    if (monJoueur) {
        const monPseudo = monJoueur.name;
        const monIndex = tabScore.findIndex(joueur => joueur[0] === monPseudo);

        if (gamePseudo) gamePseudo.innerHTML = monPseudo;
        if (gameScore) gameScore.innerHTML = 'Score : ' + monJoueur.score;
        if (gameHighScore && monIndex !== -1) gameHighScore.innerHTML = 'High Score : ' + tabScore[monIndex][1].score;
        if (nbLevelPointNumber) nbLevelPointNumber.innerHTML = monJoueur.nbLevelPoint.toString();

        if (monIndex !== -1) {
            const monRangReel = monIndex + 1;
            const monScore = tabScore[monIndex][1].score;
            if (top3ListAffichage) {
                if (monIndex >= 3) {
                    top3ListAffichage.innerHTML += `<div style="text-align: center; color: gray;">...</div>`;
                    top3ListAffichage.innerHTML += `<div>${monRangReel}. ${monPseudo} : ${monScore} pts</div>`;
                }
            }
        }
    }
});
upgradeHpBtn?.addEventListener('click', () => {
	upgradeHp();
});

upgradeDmgBtn?.addEventListener('click', () => {
	upgradeDmg();
});

upgradeSpeedBtn?.addEventListener('click', () => {
	upgradeSpeed();
});

function upgradeHp() {
	const player = players.find(p => p.id === socket.id);
	if(player && player.nbLevelPoint > 0 && player.maxHp < 200) {
		if(gameHPNumber) gameHPNumber.innerHTML = (player.maxHp + 10).toString();
		if(nbLevelPointNumber) nbLevelPointNumber.innerHTML = (player.nbLevelPoint - 1).toString();
		if(player.maxHp + 10 === 200) {
			if(upgradeHpBtn) upgradeHpBtn.setAttribute('style', 'display: none;');
			if(maxHp) maxHp.setAttribute('style', '');
		}
		socket.emit('upgradeHp', socket.id);
	}
}

function upgradeDmg() {
	const player = players.find(p => p.id === socket.id);
	if(player && player.nbLevelPoint > 0 && player.damage < 15) {
		if(gameDmgNumber) gameDmgNumber.innerHTML = (player.damage + 1).toString();
		if(nbLevelPointNumber) nbLevelPointNumber.innerHTML = (player.nbLevelPoint - 1).toString();
		if(player.damage + 1 === 15) {
			if(upgradeDmgBtn) upgradeDmgBtn.setAttribute('style', 'display: none;');
			if(maxDmg) maxDmg.setAttribute('style', '');
		}
		socket.emit('upgradeDmg', socket.id);
	}
}

function upgradeSpeed() {
	const player = players.find(p => p.id === socket.id);
	if(player && player.nbLevelPoint > 0 && player.speed < 18) {
		if(gameSpeedNumber) gameSpeedNumber.innerHTML = (player.speed + 2).toString();
		if(nbLevelPointNumber) nbLevelPointNumber.innerHTML = (player.nbLevelPoint - 1).toString();
		if(player.speed + 2 === 18) {
			if(upgradeSpeedBtn) upgradeSpeedBtn.setAttribute('style', 'display: none;');
			if(maxSpeed) maxSpeed.setAttribute('style', '');
		}
		socket.emit('upgradeSpeed', socket.id);
	}
}
