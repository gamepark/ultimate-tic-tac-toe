/** @jsxImportSource @emotion/react */
import {usePlayerId} from '@gamepark/react-client'
import {useTranslation} from 'react-i18next'
import Game from '@gamepark/ultimate-tic-tac-toe/Game'

type Props = {
  loading: boolean
  game?: Game
}

export default function HeaderText({loading}: Props) {
  const {t} = useTranslation()
  const playerId = usePlayerId()
  if (loading) return <>{t('Game loading...')}</>
  return <>Loaded! Now what? Your player id is {playerId}</>
}