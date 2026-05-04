import { socket } from './main.ts';

const body = document.body;

const ConnectionButton = document.querySelector('.ConnectionButton');
const RegisterButton = document.querySelector('.button-confirm');
const PlayButton = document.querySelector('.PlayButton');
const LeaderboardButton = document.querySelector('.LeaderboardButton');
const TheLeaderboard = document.querySelector('.leaderboard');
const CreditButton = document.querySelector('.CreditButton');
const backToHomePage = document.querySelectorAll('.backToHomePage');

const articleHomePage = document.querySelector('.HomePage');
const articleConnectionPage = document.querySelector('.ConnectionPage');
const articleGamePage = document.querySelector('.GamePage');
const articleLeaderboardPage = document.querySelector('.LeaderboardPage');
const articleCreditPage = document.querySelector('.CreditPage');
const articleReplayPage = document.querySelector('.ReplayPage');

const playlist = [
    '../audio/musique1.mp3',
    '../audio/musique2.mp3',
    '../audio/musique3.mp3'
];
let piste = 0;
export const musique = new Audio(playlist[piste]);

const backToHomePageFromReplay = document.querySelector(
	'.backToHomePageFromReplay'
);

const skin1Button = document.querySelector('.skin1Button');
const skin2Button = document.querySelector('.skin2Button');
const skin3Button = document.querySelector('.skin3Button');
const skin4Button = document.querySelector('.skin4Button');

const skin1Preview = document.querySelector('.skin1Preview');
const skin2Preview = document.querySelector('.skin2Preview');
const skin3Preview = document.querySelector('.skin3Preview');
const skin4Preview = document.querySelector('.skin4Preview');

const pseudoInput = document.getElementById('pseudoInput') as HTMLInputElement;

RegisterButton?.addEventListener('click', function (e) {
	e.preventDefault();
	const pseudo = pseudoInput.value.trim();
	if (pseudo !== '') {
		socket.emit('setPseudo', pseudo);
		alert(
			"t'es trop chaud ta réussi à écrire un pseudo wow wow wow" +
				pseudo +
				' ptit con'
		);
		articleConnectionPage?.setAttribute('style', 'display: none;');
		articleHomePage?.setAttribute('style', '');
		body.setAttribute(
			'style',
			"background-image: url('../images/fond/homePage.png');"
		);
	} else {
		alert('entre un pseudo ptit con');
	}
});

ConnectionButton?.addEventListener('click', function () {
	articleHomePage?.setAttribute('style', 'display: none;');
	articleConnectionPage?.setAttribute('style', '');
	console.log('ConnectionButton press');
});

PlayButton?.addEventListener('click', function () {

	musique.play();

	let pseudoFinal = pseudoInput.value.trim();
	if (pseudoFinal === '') {
		pseudoFinal = 'Martin' + Math.floor(Math.random() * 1000);
	}
	socket.emit('setPseudo', pseudoFinal);
	console.log('pseudo : ' + pseudoFinal);

	articleHomePage?.setAttribute('style', 'display: none;');
	articleGamePage?.setAttribute('style', '');

	socket.emit('logInGame', socket.id);

	console.log('PlayButton press');
});

LeaderboardButton?.addEventListener('click', function () {
	articleHomePage?.setAttribute('style', 'display: none;');
	articleLeaderboardPage?.setAttribute('style', '');
	body?.setAttribute(
		'style',
		"background-image: url('../images/fond/leaderboard.png');"
	);
	console.log('LeaderboardButton press');
});

socket.on('leaderboard', (tabScore:[string ,{score: number, date:string} ][]) => {
	tabScore.sort((a, b) => b[1].score - a[1].score);
	const top10 = tabScore.slice(0, 10);
	let nouveauHTML = '';

	top10.forEach(([nom, score], index: number) => {
		nouveauHTML += `<div> ${index + 1}. ${nom} : ${score.score}  |  ${score.date} </div>`;
	});

	if (TheLeaderboard) {
		TheLeaderboard.innerHTML = nouveauHTML;
	}
});

CreditButton?.addEventListener('click', function () {
	articleHomePage?.setAttribute('style', 'display: none;');
	articleCreditPage?.setAttribute('style', '');
	body?.setAttribute('style', "background-image: url('../images/fond/credit.png');");
	console.log('CreditButton press');
});

backToHomePage?.forEach(element => {
	element?.addEventListener('click', function (e) {
		e.preventDefault();
		articleConnectionPage?.setAttribute('style', 'display: none;');
		articleLeaderboardPage?.setAttribute('style', 'display: none;');
		articleCreditPage?.setAttribute('style', 'display: none;');
		articleReplayPage?.setAttribute('style', 'display: none;');
		articleGamePage?.setAttribute('style', 'display: none;');
		articleHomePage?.setAttribute('style', '');
		body?.setAttribute(
			'style',
			"background-image: url('../images/fond/homePage.png');"
		);
		console.log('BackToHomePage press');
		musique.pause();
		musique.currentTime = 0; 
	});
});

backToHomePageFromReplay?.addEventListener('click', function (e) {
	e.preventDefault();
	articleConnectionPage?.setAttribute('style', 'display: none;');
	articleLeaderboardPage?.setAttribute('style', 'display: none;');
	articleCreditPage?.setAttribute('style', 'display: none;');
	articleReplayPage?.setAttribute('style', 'display: none;');
	articleGamePage?.setAttribute('style', 'display: none;');
	articleHomePage?.setAttribute('style', '');
	body?.setAttribute(
		'style',
		"background-image: url('../images/fond/homePage.png');"
	);
	console.log('BackToHomePage press');
	musique.pause();
	musique.currentTime = 0; 
});

musique.addEventListener('ended', () => {
    piste++;
    if (piste >= playlist.length) {
        piste = 0;
    }
    musique.src = playlist[piste];
    musique.load();
    musique.play()
});

skin1Button?.addEventListener('click', function () {
	skin1Preview?.setAttribute('class', 'skinPlace active');
	skin2Preview?.setAttribute('class', 'skinPlace');
	skin3Preview?.setAttribute('class', 'skinPlace');
	skin4Preview?.setAttribute('class', 'skinPlace');
	socket.emit('setSkin', 1);
	console.log('skin1Button press');
});

skin2Button?.addEventListener('click', function () {
	skin1Preview?.setAttribute('class', 'skinPlace');
	skin2Preview?.setAttribute('class', 'skinPlace active');
	skin3Preview?.setAttribute('class', 'skinPlace');
	skin4Preview?.setAttribute('class', 'skinPlace');
	socket.emit('setSkin', 2);
	console.log('skin2Button press');
});

skin3Button?.addEventListener('click', function () {
	skin1Preview?.setAttribute('class', 'skinPlace');
	skin2Preview?.setAttribute('class', 'skinPlace');
	skin3Preview?.setAttribute('class', 'skinPlace active');
	skin4Preview?.setAttribute('class', 'skinPlace');
	socket.emit('setSkin', 3);
	console.log('skin3Button press');
});

skin4Button?.addEventListener('click', function () {
	skin1Preview?.setAttribute('class', 'skinPlace');
	skin2Preview?.setAttribute('class', 'skinPlace');
	skin3Preview?.setAttribute('class', 'skinPlace');
	skin4Preview?.setAttribute('class', 'skinPlace active');
	socket.emit('setSkin', 4);
	console.log('skin4Button press');
});