const colorsCard = ['red', 'blue', 'yellow', 'green', 'gray'];
const bullets = [1, 1, 1, 0, 0];
const containerCard = document.querySelector('.container');
const container_replay = document.querySelector('.container_replay')
let balance = document.querySelector('.balance');
let nowScore = document.querySelector('.now_score')

function balanse() {
	balance.innerHTML = localStorage.getItem('balanse')
	if (balance.innerHTML == '') {
		balance.innerHTML = '1000'
	}
}
balanse()

function balanseUp() {
	balanceNumber = Number.parseInt(balance.innerHTML)
	balanceNumber += 100
	balance.innerHTML = balanceNumber
	localStorage.setItem('balanse', balance.innerHTML)
}

function balanseDown() {
	balanceNumber = Number.parseInt(balance.innerHTML)
	balanceNumber -= 50
	balance.innerHTML = balanceNumber
	localStorage.setItem('balanse', balance.innerHTML)
}

function scoreUp() {
	scoreNumber = Number.parseInt(nowScore.innerHTML)
	scoreNumber++
	nowScore.innerHTML = scoreNumber
}

function scoreClear() {
	nowScore.innerHTML = '0'
}

function sort(arr) {
	return arr.sort(() => Math.random() - 0.5)
}

function createCard(arr, arr2) {
	sort(arr)
	sort(arr2)
	for (let i = 0; i < arr2.length; i++) {
		containerCard.innerHTML += `<div class="card" onclick='checkBullet(event)' style="background-color: ${arr2[i]}"></div>`
	}
	let coll = document.querySelectorAll('.card')
	for (let j = 0; j < coll.length; j++) {
		coll[j].setAttribute('data-id', bullets[j])
	}
}
createCard(bullets, colorsCard)

function addButton() {
	let button = document.createElement('button')
	button.classList.add('replay')
	button.innerHTML = 'переиграть'
	container_replay.append(button)
	button.addEventListener('click', () => {
		setTimeout(() => {
			button.remove()
			containerCard.innerHTML = ''
			createCard(bullets, colorsCard)
			scoreClear()
		}, 1000);
	})
}

function removeOnClick() {
	let coll = document.querySelectorAll('.card')
	coll.forEach(item => {
		item.onclick = null
		item.style.cursor = 'auto'
	})
}

function cardBefor() {
	let coll = document.querySelectorAll('.card_befor')
	coll.forEach(element => element.onclick = null);
}

function nextLine() {
	let coll = document.querySelectorAll('.card_befor')
	if (coll.length < 15) {
		createCard(bullets, colorsCard)
	}
}

function gameOver() {
	let coll = document.querySelectorAll('.card_befor')
	if (coll.length == 15) {
		alert('Вы выйграли')
		addButton()
		removeOnClick()
		balanseUp()
	}
}

function checkBullet(event) {
	let coll = document.querySelectorAll('.card')
	if (event.target.getAttribute('data-id') == 1) {
		removeOnClick()
		alert('Вы умерли')
		balanseDown()
		event.target.style.transition = '2s'
		event.target.style.backgroundColor = 'inherit'
		addButton()
	} else {
		coll.forEach(element => {
			element.className = 'card_befor'
			element.style.backgroundColor = '#000';
		});
		nextLine()
		cardBefor()
		scoreUp()
		gameOver()
	}
}