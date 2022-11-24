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
        )
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
  getLegalMoves(_playerId: Mark): MarkCell[] {
    return []
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   * @return Moves that must be automatically played as a consequences of the move.
   */
  play(move: MarkCell): never[] {
    this.game.board[move.y][move.x][move.j][move.i] = Mark.X
    return []
  }
}