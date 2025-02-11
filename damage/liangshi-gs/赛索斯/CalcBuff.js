import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
    _BondOfLife: ({ talent, params, weapon }) => Math.min((params.blPct * (talent.q['赋予生命之契'] + 35 * 3 + (weapon.name === '海渊终曲' ? 25 : 0)) + params.blPct * params.blPlus), 200)
  }
},
{
  title: '克洛琳德天赋：[破夜的明焰] 队伍中附近的角色对敌人触发雷元素相关反应后，提升普通攻击与残光将终造成的雷元素伤害[aPlus]',
  data: {
    aPlus: ({ attr, calc }) => Math.min((calc(attr.atk) * 20 / 100 * 3), 1800),
    qPlus: ({ attr, calc }) => Math.min((calc(attr.atk) * 20 / 100 * 3), 1800)
  }
},
{
  check: ({ talent, params, weapon }) => (params.blPct * (talent.q['赋予生命之契'] + 35 * 3 + (weapon.name === '海渊终曲' ? 25 : 0)) + params.blPct * params.blPlus) >= 100,
  title: '克洛琳德天赋：[契令的酬偿] 生命之契的数值提升或降低[buffCount]次，暴击率提升[cpct]% ',
  data: {
    buffCount: ({ params }) => params.ChangeBondOfLife || 4,
    cpct: ({ params }) => 10 * Math.min((params.ChangeBondOfLife || 4), 2)
  }
},
{
  title: '克洛琳德1命：[「自此，行过烛影之帷」] 狩夜之巡的夜巡状态持续期间，普通攻击造成的雷元素伤害命中敌人时，将在敌人附近唤出夜巡之影进行两次协同攻击',
  cons: 1
},
{
  title: '克洛琳德2命：[「自此，直面长夜之危」] 队伍中附近的角色对敌人触发雷元素相关反应后，普通攻击与残光将终造成的雷元素伤害再提升[aPlus]%,处于3.0层状态下时，抗打断能力提升[interruption]%',
  cons: 2,
  data: {
    aPlus: ({ attr, calc }) => Math.min((calc(attr.atk) * 10 / 100 * 3 ), 900),
    qPlus: ({ attr, calc }) => Math.min((calc(attr.atk) * 10 / 100 * 3 ), 900),
    interruption: 70
  }
},
{
  title: '克洛琳德4命：[「铭记泪，生命与仁爱」] 当前拥有[_BondOfLife]%生命值上限的生命之契，残光将终造成的伤害提升[qDmg]',
  cons: 4,
  data: {
    _BondOfLife: ({ talent, params, weapon }) => Math.min((params.blPct * (talent.q['赋予生命之契'] + 35 * 3 + (weapon.name === '海渊终曲' ? 25 : 0)) + params.blPct * params.blPlus), 200),
    qDmg: ({ talent, params, weapon }) => Math.min((Math.min((params.blPct * (talent.q['赋予生命之契'] + 35 * 3 + (weapon.name === '海渊终曲' ? 25 : 0)) + params.blPct * params.blPlus), 200) * 2), 200)
  }
},
{
  title: '克洛琳德6命：[「为此，勿将希望弃扬」] 施放狩夜之巡后暴击率提高[cpct]%,暴击伤害提高[cdmg]%,夜巡状态持续期间受到的伤害降低[_reduction]%，抗打断能力提高[interruption]%，明烛之影会追击敌人造成雷元素伤害',
  cons: 6,
  data: {
    cpct: 10,
    cdmg: 70,
    _reduction: 80,
    interruption: 100
  }
}]
