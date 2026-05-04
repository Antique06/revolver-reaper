import Assets from '../Assets.ts';
import type Bandit from '../../../common/element/Bandit.ts';

export default function drawBandits(
	banditList: Bandit[],
	context: CanvasRenderingContext2D,
	scale: number,
	assets: Assets
) {

	banditList.forEach(b => {
		let image = assets.bandit;
		if(b.isDead) {
			image = assets.banditDeath;
		}

		if (!image.complete || image.width === 0) return;

		let frameWidth;
		let frameHeight;
		if(b.isDead) {
			frameWidth = image.width / 6;
			frameHeight = image.height;
		} else {
			frameWidth = image.width / 4;
			frameHeight = image.height;
		}

		context.drawImage(
			image,
			b.currentFrame * frameWidth,
			0,
			frameWidth,
			frameHeight,
			b.x,
			b.y,
			frameWidth * scale,
			frameHeight * scale
		);
	});
}
