const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const VICTORIOUS_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const victoryMessageElement = document.getElementById
('victoryMessage')
const resetButton = document.getElementById('resetButton')
const victoryMessageTextElement = document.querySelector('[data-victory-message-text]')
let circleTurn

startGame()

resetButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
      cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    victoryMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass  = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    swapTurns()
    setBoardHoverClass()
}

function endGame(draw) {
    if (draw) {
      victoryMessageTextElement.innerText = 'It is a Draw!'
    }
    else {
        victoryMessageTextElement.innerText = '${circleTurn ? "O" : "X"} is Victorious!'
    }
    victoryMessageTextElement.classList.add('show')
}

function isDraw() {
    return cellElements.every(cell => {
        return cell.classlist.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClasss() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
      board.classList.add(CIRCLE_CLASS)
    } else {
      board.classList.add(X_CLASS)
    }
}

function checkVictory(currentClass) {
    return VICTORY_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentClass)
        })
    })
}