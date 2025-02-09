import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '恰斯卡4命：[星火，瞬息的击发] 元素爆发索魂命袭中的溢光索魂弹命中敌人时，恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 1.5
  }
},
{
  title: '恰斯卡6命：[相决，斗争的荣光] 且触发固有天赋后，重瞄准中的追影弹和焕光追影弹的暴击伤害提升[a2Cdmg]%',
  cons: 6,
  data: {
    a2Cdmg: 120
  }
},
{
  check: ({ params }) => params.ElementDifferent >= 0 && params.simulate != true,
  title: '恰斯卡天赋：[子弹的戏法] 进行元素战技灵缰追影中的多重瞄准的蓄力时,焕光追影弹造成的伤害提升[a2Dmg]%',
  data: {
    a2Dmg: ({ params }) => (params.ElementDifferent * params.ElementDifferent * 5 + params.ElementDifferent * 5 + 5) * (params.ElementDifferent == 0 ? 0 : 1),
    vaporize: ({ params }) => params.ElementDifferent == 0 ? 50 : 0
  }
},
{
  check: ({ params }) => params.simulate === true,
  title: '恰斯卡天赋：[子弹的戏法] 进行元素战技灵缰追影中的多重瞄准的蓄力时,焕光追影弹造成的伤害提升[a2Dmg]%',
  data: {
    a2Dmg: ({ cons }) => cons >= 2 ? 65 : 35
  }
}]
