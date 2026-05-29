import { LSconfig } from '#liangshi'

// 后续有更新记得加

function CalcBy(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let by = "liangshiCalc"
  if (cfg.calcLiangK) {
    by = "自定义"
  } else if (cfg.calcLiangQ) {
    //预留
  } else if (cfg.calcLiangT) {
    //预留
  } else if (cfg.calcLiangJ) {
    //预留
  } else if (cfg.calcLiang) {
    //预留
  } else {
    //预留
  }
  return by
}

export { CalcBy }
