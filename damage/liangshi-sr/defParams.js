import { LSconfig } from '#liangshi'
import { CharacterParams } from './data/CharacterParams.js'

function ParamsData(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let data = {}
  return Object.assign(data, CharacterParams[CharacterName])
}

export { ParamsData }
