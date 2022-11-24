import Mark from './Mark'

type MarkCell = {
  x: number // Meta grid column index
  y: number // Meta grid row index
  i: number // Inner grid column index
  j: number // Inner grid row index
  mark: Mark
}

export default MarkCell