import {Rules} from '@gamepark/rules-api'
import Game from './Game'
import {isGameOptions, UltimateTicTacToeOptions} from './UltimateTicTacToeOptions'
import Mark from './Mark'
import MarkCell from './MarkCell'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export default class UltimateTicTacToeRules extends Rules<Game, MarkCell, Mark> {
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(state: Game)
  /**
   * This constructor is called when a new game is created. If your game has options, or a variable number of players, it will be provided here.
   * @param options The options of the new game
   */
  constructor(options: UltimateTicTacToeOptions)
  /**
   * In here you must code the construction of your class. Use a "typeguard" to distinguish a new game from a restored game.
   * @param arg The state of the game, or the options when starting a new game
   */
  constructor(arg: Game | UltimateTicTacToeOptions) {
    if (isGameOptions(arg)) {
      const newGame: Game = {
        board: [...Array(3)].map(() =>
          [...Array(3)].map(() =>
            [...Array(3)].map(() =>
              [...Array(3)].map(() => null)
            )
          )
        ),
        activePlayer: Mark.X
      }
      super(newGame)
    } else {
      super(arg)
    }
  }

  /**
   * Return the exhaustive list of moves that can be played.
   * This is used for 2 features:
   * - security (preventing unauthorized moves from being played);
   * - "Dummy players": when a player leaves a game, it is replaced by a "Dummy" that plays random moves, allowing the other players to finish the game.
   * If the game allows a very large (or infinite) number of moves, instead of implementing this method, you can implement instead:
   * - isLegal(move: Move):boolean, for security; and
   * - A class that implements "Dummy" to provide a custom Dummy player.
   */
  getLegalMoves(playerId: Mark): MarkCell[] {
    if (playerId !== this.game.activePlayer) return []
    const moves: MarkCell[] = []
    for (let y = 0; y < this.game.board.length; y++) {
      if (this.game.constraint && this.game.constraint.y !== y) continue
      const row = this.game.board[y]
      for (let x = 0; x < row.length; x++) {
        if (this.game.constraint && this.game.constraint.x !== x) continue
        const grid = row[x]
        if (isGridOver(grid)) continue
        for (let j = 0; j < grid.length; j++) {
          const gridRow = grid[j]
          for (let i = 0; i < gridRow.length; i++) {
            const cell = gridRow[i]
            if (cell === null) {
              moves.push({x, y, i, j, mark: playerId})
            }
          }
        }
      }
    }
    return moves
  }

  getActivePlayer(): Mark {
    return this.game.activePlayer
  }

  isOver(): boolean {
    return this.winner !== undefined || this.game.board.every(row => row.every(grid => grid.every(row => row.every(cell => cell !== null))))
  }

  get winner(): Mark | undefined {
    const metaGrid = this.game.board.map(row => row.map(grid => getGridWinner(grid) ?? null))
    return getGridWinner(metaGrid)
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   * @return Moves that must be automatically played as a consequences of the move.
   */
  play(move: MarkCell): never[] {
    this.game.board[move.y][move.x][move.j][move.i] = move.mark
    this.game.activePlayer = this.game.activePlayer === Mark.X ? Mark.O : Mark.X
    if (!isGridOver(this.game.board[move.j][move.i])) {
      this.game.constraint = {x: move.i, y: move.j}
    } else {
      delete this.game.constraint
    }
    return []
  }
}

export function isGridOver(grid: (Mark | null)[][]) {
  const winner = getGridWinner(grid)
  if (winner !== undefined) return true
  return !grid.some(row => row.includes(null))
}

export function getGridWinner(grid: (Mark | null)[][]): Mark | undefined {
  if (grid.length !== 3 || grid.some(row => row.length !== 3)) throw new Error('A tic-tac-toe grid must be 3x3!')
  if (grid[1][1] !== null) {
    if ((grid[0][1] === grid[1][1] && grid[2][1] === grid[1][1])
      || (grid[1][0] === grid[1][1] && grid[1][2] === grid[1][1])
      || (grid[0][0] === grid[1][1] && grid[2][2] === grid[1][1])
      || (grid[0][2] === grid[1][1] && grid[2][0] === grid[1][1])) {
      return grid[1][1]
    }
  }
  if (grid[0][0] !== null) {
    if ((grid[1][0] === grid[0][0] && grid[2][0] === grid[0][0])
      || (grid[0][1] === grid[0][0] && grid[0][2] === grid[0][0])) {
      return grid[0][0]
    }
  }
  if (grid[2][2] !== null) {
    if ((grid[0][2] === grid[2][2] && grid[1][2] === grid[2][2])
      || (grid[2][0] === grid[2][2] && grid[2][1] === grid[2][2])) {
      return grid[2][2]
    }
  }
  return
}
