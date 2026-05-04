import Assets from '../Assets.ts';
import BillyTheKid from '../../../common/element/BillyTheKid.ts';

export default function drawBillyTheKids(
	billyList: BillyTheKid[],
	context: CanvasRenderingContext2D,
	scale: number,
	assets: Assets
) {

	billyList.forEach(b => {
		let image = assets.billyTheKid;
		if(b.isDead) {
			image = assets.billyTheKidDeath;
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

		const pseudoX = b.x + (frameWidth * scale) / 2;
		const pseudoY = b.y + 25;

		context.font = "20px 'VT323', monospace";
		context.fillStyle = 'white';
		context.textAlign = 'center';
		context.lineWidth = 3;
		context.strokeStyle = 'black';
		context.strokeText(b.name, pseudoX, pseudoY);
		context.fillText(b.name, pseudoX, pseudoY);

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
