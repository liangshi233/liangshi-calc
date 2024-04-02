import render from './common-lib/render.js'
import Cfg from './Cfg.js'

function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default {
  render,
  cfg: Cfg.get,
  isDisable: Cfg.isDisable,
  sleep
}
