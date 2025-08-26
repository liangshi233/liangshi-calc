import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  MasteryGs,
  {
    title: '砂糖1命：[堆叠真空域] 风灵作成·陆叁零捌的可使用次数增加[_eIncreases]次。',
    cons: 1,
    data: {
      _eIncreases: 1
    }
  },
  {
    title: '砂糖2命：[不羁型贝特] 禁·风灵作成·柒伍同构贰型的技能持续时间延长[_qSustainedPlus]秒',
    cons: 2,
    data: {
      _qSustainedPlus: 1
    }
  },
  {
    title: '砂糖4命：[炼金的偏执] 普通攻击或者重击命中敌人7.0次，风灵作成·陆叁零捌的冷却时间就会减少[_ecdPlus](期望)秒',
    cons: 2,
    data: {
      _ecdPlus: 4
    }
  },
    ...TeamBuff
]
