import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Pactsworn_Pathclearer === true,
  title: '赛诺技能：[圣仪·煟煌随狼行] 元素精通提升[mastery]点，抗打断能力提高[_interruption]%，并免疫感电反应造成的伤害',
  sort: 1,
  data: {
    mastery: 100,
    _interruption: 50
  }
},
{
  check: ({ params }) => params.Endseer_stance === true,
  title: '赛诺天赋：[落羽的裁择] 触发「裁定」效果，使此次秘仪·律渊渡魂造成的伤害提升[eDmg]%,并向前方发射3道渡荒之雷',
  data: {
    eDmg: 35
  }
},
{
  check: ({ params }) => params.Pactsworn_Pathclearer === true && params.Endseer_stance !== true,
  title: '赛诺天赋：[九弓的执命] 启途誓使状态下的普通攻击造成的伤害提升[aPlus],「落羽的裁择」的渡荒之雷造成的伤害提升[ePlus]',
  data: {
    aPlus: ({ attr, calc }) => calc(attr.mastery) * 150 / 100,
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 250 / 100
  }
},
{
  title: '赛诺1命：[立仪·俯览昼冥] 普通攻击的攻击速度提升[_aSpeed]%',
  cons: 1,
  data: {
    _aSpeed: 20
  }
},
{
  title: '赛诺2命：[令仪·引谒归灵] 普通攻击命中敌人[buff]次,元素伤害加成提升[dmg]%',
  cons: 2,
  data: {
    buff: ({ params }) => params.NormalHit || 1,
    dmg: ({ params }) => Math.min((10 * (params.NormalHit || 1)), 50)
  }
},
{
  title: '赛诺6命：[羽仪·裁落钧衡] 施放圣仪·煟煌随狼行或触发固有天赋「落羽的裁择」的「裁定」后,普通攻击命中敌人,将发射一道渡荒之雷',
  cons: 6
},
...TeamBuff
]
