import { resonanceBuffGs, characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
    _BondOfLife: ({ params, cons, weapon }) => Math.min((params.blPct * ( Math.min(145 , (65 + (cons >= 2 ? 65 : (params.simulate == true ? 65 : 0)))) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPlus) , 200)
  }
},
{
  title: '阿蕾奇诺技能：[红死之宴] 阴翳礼赞状态下，普通攻击将转为红死之宴,使造成的伤害提升[aPlus]；通过这种方式消耗生命之契时，会使元素战技「万相化灰」的冷却缩短[_eCdPlus]秒。',
  data: {
    aPlus: ({ talent, attr, calc, params, cons, weapon }) => calc(attr.atk) * ((Math.min((params.blPct * (Math.min(145 , (65 + (cons >= 2 ? 65 : (params.simulate == true ? 65 : 0)))) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPlus), 200) / 100) * (talent.a['红死之宴提升'] / 100)),
    _eCdPlus: 0.8
  }
},
{
  title: '阿蕾奇诺技能：[唯厄月可知晓] 在战斗状态下，获得[dmg]%火元素伤害加成',
  data: {
    dmg: 40
  }
},
{
  title: '阿蕾奇诺天赋：[唯力量可守护] 获得[_res]%全元素抗性和物理抗性',
  data: {
    _res: ({ attr, calc }) => Math.min((calc(attr.atk) >= 1000 ? ((calc(attr.atk) - 1000) / 100) : 0), 20)
  }
},
{
  title: '阿蕾奇诺1命：[「所有的仇与债皆由我偿…」] 红死之宴进一步提高[aPlus]；此外，在红死之宴状态下进行普通攻击或重击时，提高[_aInterruption]%抗打断能力。',
  cons: 1,
   data: {
    aPlus: ({ attr, calc, params, cons, weapon }) => calc(attr.atk) * ((Math.min((params.blPct * (Math.min(145, (65 + (cons >= 2 ? 65 : (params.simulate == true ? 65 : 0)))) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPlus), 200) / 100) * (100 / 100)),
    _aInterruption: 100
   }
},
{
  title: '阿蕾奇诺2命：[「所有的赏与罚皆自我出…」] 血偿勒令施加时即为血偿勒令·结，并在回收时在前方唤出厄月血祸，造成火元素范围伤害',
  cons: 2
},
{
  title: '阿蕾奇诺4命：[「此后，你们须相爱相护…」] 回收血偿勒令时，厄月将升的冷却时间缩短[_cdPlus]秒并恢复[_energyevery]点元素能量',
  cons: 4,
   data: {
     _cdPlus: 2,
     _energyevery: 15
   }
},
{
  title: '阿蕾奇诺6命：[「自此以后，我们将共飨新生。」] 厄月将升造成的伤害提高[qPlus],且释放后普通攻击与元素爆发的暴击率提高[aCpct]%,暴击伤害提高[aCdmg]%',
  cons: 6,
  data: {
    qPlus: ({ calc, attr, params, cons, weapon }) => (calc(attr.atk) * ((Math.min((params.blPct * (Math.min(145, (65 + (cons >= 2 ? 65 : 0))) * 2 + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPlus), 200) / 100) * (700 / 100))),
    aCpct: 10,
    aCdmg: 70,
    qCpct: 10,
    qCdmg: 70
  }
},
TeamBuff.TeamBuff_Emilie[0],
TeamBuff.TeamBuff_Emilie[1],
TeamBuff.TeamBuff_Zhong_Li[0],
TeamBuff.TeamBuff_Zhong_Li[1],
TeamBuff.TeamBuff_Kaedehara_Kazuha[0],
TeamBuff.TeamBuff_Kaedehara_Kazuha[1],
TeamBuff.TeamBuff_Xiang_Ling[0],
TeamBuff.TeamBuff_Xiang_Ling[1],
TeamBuff.TeamBuff_Bennett[0],
TeamBuff.TeamBuff_Bennett[1],
TeamBuff.TeamBuff_Bennett[2],
TeamBuff.TeamBuff_Ye_Lan[0],
TeamBuff.TeamBuff_Bei_Dou[0],
TeamBuff.TeamBuff_Bei_Dou[1],
TeamBuff.TeamBuff_Chevreuse[0],
TeamBuff.TeamBuff_Chevreuse[1],
TeamBuff.TeamBuff_Chevreuse[2],
TeamBuff.TeamBuff_Chevreuse[3],
TeamBuff.TeamBuff_Mona[0],
TeamBuff.TeamBuff_Mona[1],
TeamBuff.TeamBuff_Mona[2],
resonanceBuffGs[1],
resonanceBuffGs[4]
]