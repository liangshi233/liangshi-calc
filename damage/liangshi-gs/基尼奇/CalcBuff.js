import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
{
  check: ({ params }) => params.Scalespiker_Cannon === true ,
  title: '基尼奇天赋：[焰灵的契约] 队伍中的附近的角色触发「夜魂迸发」迴猎贯鳞炮造成的伤害提高[ePlus]',
  data: {
    ePlus: ({ calc , attr }) => calc(attr.atk) * 320 / 100
  }
},
{
  check: ({ params }) => params.Scalespiker_Cannon === true ,
  title: '基尼奇1命：[七鹦之喙] 通过悬猎 · 游骋高狩进行空中摆荡落地后移动速度提升[_jSpeed]%，迴猎贯鳞炮的暴击伤害提升[eCdmg]%',
  cons: 1,
  data: {
    _jSpeed: 30 ,
    eCdmg: 100
  }
},
{
  title: '基尼奇2命：[星虎之掌] 元素战技命中敌人使其草元素抗性降低[kx]%,猎贯鳞炮的伤害提升[eDmg]%',
  cons: 2,
  data: {
    kx: 30,
    eDmg: ({ params }) => params.first === true ? 100 : 0
  }
},
{
  title: '基尼奇4命：[蜂鸟之羽] 进行环绕射击或施放迴猎贯鳞炮后，将恢复[_energyevery]点元素能量。 向伟大圣龙致意造成的伤害提升[qDmg]%',
  cons: 4,
  data: {
    _energyevery: 5,
    qDmg: 70
  }
}]

export const TeamBuff_Kinich = [
{
  check: ({ params }) => params.team === true && params.Kinich === true,
  title: '基尼奇2命：[星虎之掌] 元素战技命中敌人使其元素抗性降低[kx]%',
  cons: 2,
  data: {
    kx: ({ element }) => ['草'].includes(element) ? 30 : 0
  }
}]
