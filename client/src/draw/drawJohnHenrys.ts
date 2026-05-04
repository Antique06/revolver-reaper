import Assets from '../Assets.ts';
import JohnHenry from '../../../common/element/JohnHenry.ts';

export default function drawJohnHenrys(
	johnHenryList: JohnHenry[],
	context: CanvasRenderingContext2D,
	scale: number,
	assets: Assets
) {

	johnHenryList.forEach(b => {
		let image = assets.johnHenry;
		if(b.isDead) {
			image = assets.johnHenryDeath;
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
