/**
 * This type describe the data structure representing the state of a game, in the database
 */
import Mark from './Mark'

type Game = {
  board: (Mark | null)[][][][]
}

export default Game