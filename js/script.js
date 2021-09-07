const cellArr = document.querySelectorAll(".cell");
const button = document.getElementById("button");

const DELAY_MS = 100;

let lastCell = cellArr[cellArr.length - 1];
let buttonText = button.innerText;
let isAnimationInProgress = false;

//По клику начинаем анимацию, если она уже не запущена
button.addEventListener("click", () => {
	if (!isAnimationInProgress) {
		isAnimationInProgress = true;
		startAnimation(cellArr, DELAY_MS);
		button.innerText = "[in progress]";
	}
})

/*	По окончании анимации последней ячейки убираем лисенеры 
	функции с ячеек(Если не убрать, лисенеры будут добавляться при каждом запуске),
	а так же меняем текст кнопки и разрешаем запуск анимации.
*/
lastCell.addEventListener("animationend", () => {
	cellArr.forEach(cell => {
		cell.classList.toggle("_animated");
		cell.removeEventListener("animationend", logCellAnimEnd);
	});
	console.log("--- PROGRESS END ---");
	button.innerText = buttonText;
	isAnimationInProgress = false;
})

/*	
	Запуск анимации.
	async для возможности использования await в теле функции.
	Запускаем анимацию на всех ячейках и логируем этапы анимации.
	Функция лога конца анимации выполнена не в виде анонимной, 
	чтобы можно было снять эту функцию с лисенера.
	В конце каждой итерации задержка. Таким способом можно регулировать 
	временной промежуток между анимациями соседних ячеек.
*/
async function startAnimation(cellArr, delay) {
	console.log("--- PROGRESS START ---");
	for (cell of cellArr) {
		cell.classList.toggle("_animated");
		console.log(`Cell ${cell.innerText}: start animation...`);
		cell.addEventListener("animationend", logCellAnimEnd);
		await sleep(delay);
	}
}

//Функция задержки на Promise
function sleep(ms) {
	return new Promise((res) => setTimeout(res, Math.max(ms, 0)));
}

//Функция для лога конца анимации.
function logCellAnimEnd(e) {
	console.log(`Cell ${e.currentTarget.innerText}: animation complete!`);
}