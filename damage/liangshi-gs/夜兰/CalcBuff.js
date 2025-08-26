import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  MasteryGs,
  {
    title: '夜兰技能：[潜形隐曜弓] 「破局」状态，使下一次满蓄力瞄准射击所需的蓄力时间减少[_a2Speed]%，并将在满蓄力时转为发射「破局矢」',
    data: {
      _a2Speed: 80
    }
  },
  {
    title: '夜兰天赋：[猜先有方] 队伍存在[buff]种元素类型的角色时生命值上限提升[hpPct]%',
    data: {
      buff: ({ params }) => [params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length,
      hpPct: ({ params }) => [params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length * 6 + (([params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length) == 4 ? 6 : 0)
    }
  },
  {
    check: ({ params }) => params.Exquisite_Throw === true && !params.TruceTime,
    title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在[buff]秒，使队伍中自己的当前场上角色造成的伤害提高[dmg]%',
    data: {
      buff: ({ params }) => params.BurstAfter || 0,
      dmg: ({ params }) => Math.min(((params.BurstAfter || 0) * 3.5 + 1), 50)
    }
  },
  {
    title: '夜兰1命：[与谋者，以局入局] 萦络纵命索的可使用次数增加[_eIncreases]次。',
    cons: 1,
    data: {
      _eIncreases: 1
    }
  },
  {
    title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
    cons: 4,
    data: {
      hpPct: 40
    }
  },
  {
    title: '夜兰6命：[取胜者，大小通吃] 「运筹帷幄」状态普通攻击将转为发射特殊的「破局矢」造成的伤害视为重击伤害，能造成破局矢[_aMulti]%的伤害',
    cons: 6,
    data: {
      _aMulti: 156
    }
  },
    ...TeamBuff
]

