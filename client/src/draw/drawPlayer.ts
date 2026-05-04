import Assets from '../Assets.ts';
import Player from '../../../common/element/Player.ts';

export default function drawPlayer(
	playerList: Player[],
	context: CanvasRenderingContext2D,
	scale: number,
	socketId: string | undefined,
	assets: Assets
) {
	playerList.forEach(p => {
		if (p.isDead) {
			let image = assets.getPlayerSkin(p.skin, p.direction, true);

			if (!image.complete || image.width === 0) return;

			const frameWidth = image.width / 6;
			const frameHeight = image.height;

			context.drawImage(
				image,
				p.currentFrame * frameWidth,
				0,
				frameWidth,
				frameHeight,
				p.x,
				p.y,
				frameWidth * scale,
				frameHeight * scale
			);

			const pseudoX = p.x + (frameWidth * scale) / 2;
			const pseudoY = p.y + 25;

			context.font = "20px 'VT323', monospace";
			context.fillStyle = 'white';
			context.textAlign = 'center';
			context.lineWidth = 3;
			context.strokeStyle = 'black';
			context.strokeText(p.name, pseudoX, pseudoY);
			context.fillText(p.name, pseudoX, pseudoY);
		} else {
			if (p.isInvincible) {
				if (Math.floor(Date.now() / 200) % 2 === 0) {
					context.globalAlpha = 0.6;
				} else {
					context.globalAlpha = 1.0;
				}
			}

			let image = assets.getPlayerSkin(p.skin, p.direction, false);

			if (!image.complete || image.width === 0) return;

			if (p.currentFrame >= 4) {
				p.currentFrame = 0;
			}

			const frameWidth = image.width / 4;
			const frameHeight = image.height;

			context.drawImage(
				image,
				p.currentFrame * frameWidth,
				0,
				frameWidth,
				frameHeight,
				p.x,
				p.y,
				frameWidth * scale,
				frameHeight * scale
			);

			const pseudoX = p.x + (frameWidth * scale) / 2;
			const pseudoY = p.y + 25;

			context.font = "20px 'VT323', monospace";
			context.fillStyle = 'white';
			context.textAlign = 'center';
			context.lineWidth = 3;
			context.strokeStyle = 'black';
			context.strokeText(p.name, pseudoX, pseudoY);
			context.fillText(p.name, pseudoX, pseudoY);

			context.globalAlpha = 1.0;

			if (p.id === socketId) {
				const hpBar = document.querySelector('.bpin');
				const maxHp = p.maxHp;
				if (p.hp <= maxHp * 0.2) {
					hpBar?.classList.remove('high');
					hpBar?.classList.remove('mid');
					hpBar?.classList.add('low');
				} else if (p.hp <= maxHp * 0.5) {
					hpBar?.classList.remove('high');
					hpBar?.classList.add('mid');
					hpBar?.classList.remove('low');
				} else {
					hpBar?.classList.add('high');
					hpBar?.classList.remove('mid');
					hpBar?.classList.remove('low');
				}
				hpBar?.setAttribute('style', `width:${p.hp * 100 / maxHp}%`);
			}
		}
	});
}
