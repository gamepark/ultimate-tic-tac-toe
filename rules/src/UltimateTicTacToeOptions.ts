import {OptionsSpec} from '@gamepark/rules-api'
import {TFunction} from 'i18next'
import Game from './Game'
import Mark, {marks} from './Mark'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: Mark }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type UltimateTicTacToeOptions = {
  players: PlayerOptions[]
}

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: Game | UltimateTicTacToeOptions): arg is UltimateTicTacToeOptions {
  return typeof (arg as Game).board === 'undefined'
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const UltimateTicTacToeOptionsSpec: OptionsSpec<UltimateTicTacToeOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Mark'),
      values: marks,
      valueSpec: mark => ({label: () => mark})
    }
  }
}
