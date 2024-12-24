/*-------------------------------- Constants --------------------------------*/
const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board = ['', '', '', '', '', '', '', '', '']
let turn = 'X'
let winner = false
let tie = false

/*------------------------ Cached Elements Reference ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
  console.log('Game init')
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false

  squareEls.forEach((square) => {
    square.textContent = ''
    square.style.color = 'black'
  })

  message = `Player ${turn}'s turn`

  squareEls.forEach((square, index) => {
    square.id = index
    square.addEventListener('click', handleClick)
  })
}

const placePieces = (index) => {
  board[index] = turn

  console.log(board)
}

const checkForWinner = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i]

    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true
      message = `Player ${board[a]} wins!`
      return
    }
  }
}

const checkForTie = () => {
  if (winner) return

  if (!board.includes('')) {
    tie = true
    message = 'Its a tie!'
  }
  console.log('Tie state:', tie)
}

const switchPlayerTurn = () => {
  if (winner) return
  turn = turn === 'X' ? 'O' : 'X'
  console.log('Current turn', turn)
}

const handleClick = () => {
  const squareIndex = parseInt(event.target.id, 10)
  if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
    return
  }

  placePiece(squareIndex)

  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

const updateBoard = () => {
  board.forEach((cell, index) => {
    const square = squareEls[index]

    square.textContent = cell
    if (cell === 'X') {
      square.style.color = '#0000FF'
    } else if (cell === 'O') {
      square.style.color = '#FF0000'
    } else {
      square.style.color = 'black'
    }
  })
}
const updateMessage = () => {
  if (winner) {
    message = `Player ${turn} wins!`
  } else if (tie) {
    message = 'Its a tie!'
  } else {
    message = `Player ${turn} turn`
  }
}

const render = () => {
  updateBoard()
  updateMessage()
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', handleClick)
})

window.addEventListener('load', init)

resetBtnEl.addEventListener('click', init)
