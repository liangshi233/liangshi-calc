import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '玛薇卡1命：[夜主的授记] 通获取战意后，攻击力提升[atkPct]%',
  cons: 1,
  data: {
    atkPct: 40
  }
},
{
  title: '玛薇卡2命：[灰烬的代价] 基础攻击力提升[atkBase]',
  sort: 2,
  cons: 2,
  data: {
    atkBase: 200
  }
},
{
  check: ({ params }) => params.SkillsAfter >= 2,
  title: '玛薇卡2命：[灰烬的代价] 根据诸火武装的形态使附近的敌人的防御力降低[eEnemyDef]%,普通攻击伤害提升[aPlus]重击伤害提升[a2Plus]元素爆发伤害提升[qPlus]',
  sort: 9,
  cons: 2,
  data: {
    eEnemyDef: 20,
    aPlus: ({ calc, attr }) => calc(attr.atk) * 60 / 100,
    a2Plus: ({ calc, attr }) => calc(attr.atk) * 90 / 100,
    qPlus: ({ calc, attr }) => calc(attr.atk) * 120 / 100
  }
},
{
  title: '玛薇卡4命：[「领袖」的觉悟] 施放元素爆发燔天之时后的伤害提升效果不再随时间降低，并额外获得[dmg]%伤害加成。',
  cons: 4,
  data: {
    dmg: 10
  }
},
{
  title: '玛薇卡天赋：[炎花献礼] 附近的角色触发「夜魂迸发」时，攻击力提升[atkPct]%',
  data: {
    atkPct: 30
  }
},
{
  check: ({ params }) => params.Fighting_Spirit != undefined ,
  title: '玛薇卡天赋：[「基扬戈兹」] 施放元素爆发燔天之时后，拥有[_buff]战意，造成的伤害提升[dmg]%',
  data: {
    _buff: ({ params }) => params.Fighting_Spirit,
    dmg: ({ params }) => Math.min(40 , params.Fighting_Spirit * 0.2)
  }
},
{
  check: ({ params }) => params.Fighting_Spirit != undefined ,
  title: '玛薇卡技能：[燔天之时] 拥有[_buff]战意，坠日斩伤害提升[qPlus]，「古名解放」普通攻击伤害提升[aPlus]，「古名解放」重攻击伤害提升[a2Plus]，抗打断能力提升[_interruption]%',
  sort: 9,
  data: {
    _buff: ({ params }) => params.Fighting_Spirit,
    qPlus: ({ params, talent, calc, attr }) => params.Fighting_Spirit * talent.q['坠日斩伤害提升'] * calc(attr.atk) / 100,
    aPlus: ({ params, talent, calc, attr }) => params.Fighting_Spirit * talent.q['驰轮车普通攻击伤害提升'] * calc(attr.atk) / 100,
    a2Plus: ({ params, talent, calc, attr }) => params.Fighting_Spirit * talent.q['驰轮车重击伤害提升'] * calc(attr.atk) / 100,
    _interruption: 100
  }
},
TeamBuff.TeamBuff_Ororon[0],
TeamBuff.TeamBuff_Ororon[1],
TeamBuff.TeamBuff_Citlali[0],
TeamBuff.TeamBuff_Citlali[1],
TeamBuff.TeamBuff_Citlali[2],
TeamBuff.TeamBuff_Citlali[3]
]
