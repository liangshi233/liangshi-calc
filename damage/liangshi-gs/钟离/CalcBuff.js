import { resonanceBuffGs, characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '钟离天赋：[悬岩宸断] 玉璋护盾受到伤害时提升护盾强效5.0%,至多提高[shield]%',
  data: {
    shield: 25
  }
},
{
  title: '玉璋护盾：[属性 - 岩] 对所有元素伤害与物理伤害有[shieldInc]%的额外吸收效果。',
  data: {
    shieldInc: 50
  }
},
{
  title: '钟离天赋：[炊金馔玉] 基于生命值上限，普通攻击重击下落攻击伤害提高[aPlus]，岩脊,共鸣与长按伤害提高[ePlus]，天星伤害提高[qPlus]',
  sort: 9,
  data: {
    aPlus: ({ attr, calc }) => calc(attr.hp) * 1.39 / 100,
    a2Plus: ({ attr, calc }) => calc(attr.hp) * 1.39 / 100,
    a3Plus: ({ attr, calc }) => calc(attr.hp) * 1.39 / 100,
    ePlus: ({ attr, calc }) => calc(attr.hp) * 1.9 / 100,
    qPlus: ({ attr, calc }) => calc(attr.hp) * 33 / 100
  }
},
{
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
  data: {
    kx: 20
  }
},
TeamBuff.TeamBuff_Emilie[0],
TeamBuff.TeamBuff_Emilie[1],
resonanceBuffGs[4]
]
