import { LSconfig } from '#liangshi'
import fs from 'node:fs'

function CalcMeasure(CharacterName, AllCalc) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (cfg.calcLiangQ && !cfg.calcLiangK) { //直接返回全部, 预留特殊角色特殊处理
    return AllCalc
  }
  let CalcNumber
  try {
    if (!AllCalc) {
      console.error(`[liangshi-calc] 角色${CharacterName}在liangshi-calc中没有任何计算条目`)
      CalcNumber = false
    } else if (cfg.calcLiangK) {
      if (!fs.existsSync('plugins/liangshi-calc/config/calc.json')) {
        const data = fs.readFileSync('plugins/liangshi-calc/config/system/calc_system.json', 'utf8')
        fs.writeFileSync('plugins/liangshi-calc/config/calc.json', data)
        logger.mark(`[liangshi-calc] 尚未自定义计算条目，已自动生成自定义计算条目文件`)
      }
      CalcNumber = JSON.parse(fs.readFileSync('plugins/liangshi-calc/config/calc.json', 'utf8'))
    } else if (cfg.calcLiangT) {
      CalcNumber = JSON.parse(fs.readFileSync('plugins/liangshi-calc/damage/liangshi-mc/data/TeamCalc.json', 'utf8'))
    } else if (cfg.calcLiangJ) {
      CalcNumber = JSON.parse(fs.readFileSync('plugins/liangshi-calc/damage/liangshi-mc/data/ConciseCalc.json', 'utf8'))
    } else if (cfg.calcLiang) {
      CalcNumber = JSON.parse(fs.readFileSync('plugins/liangshi-calc/damage/liangshi-mc/data/BasicCalc.json', 'utf8'))
    } else {
      return false
    }
  } catch (err) {
    console.error('[liangshi-calc] 计算条目设置读取失败:', err)
  }
  if (!CalcNumber(CharacterName)) {
    console.error(`[liangshi-calc] 角色${CharacterName}当前没有设定计算条目内容`)
    return false
  }
  let index = CalcNumber[CharacterName]
    .map(index => AllCalc[index])
    .filter(item => item !== undefined)
  return index
}

export { CalcMeasure }