/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import {Letterbox} from '@gamepark/react-components'
import Game from '@gamepark/ultimate-tic-tac-toe/Game'

type Props = {
  game: Game
}

export default function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <div css={sampleCss}>
        {JSON.stringify(game)}
      </div>
    </Letterbox>
  )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`

const sampleCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  background-color: black;
  padding: 0.5em;
  border-radius: 1em;
`
