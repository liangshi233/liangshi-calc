import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '丝柯克天赋：[万流归寂] 当前[buff]层「死河渡断」效果，七相一闪模式下的普通攻击与元素爆发极恶技·灭造成伤害提升为原本的[aMulti]%和[qMulti]%',
  data: {
    buff: ({ params }) => Math.min((params.Deaths_Crossing || 3), 3),
    aMulti: ({ params }) => {
      let a = Math.min((params.Deaths_Crossing || 3), 3)
      let b = ((20 / 3) * Math.pow(a, 3)) - (20 * Math.pow(a, 2)) + ((70 / 3) * a)
      return b
    },
    qMulti: ({ params }) => {
      let a = Math.min((params.Deaths_Crossing || 3), 3)
      let b = (5 * Math.pow(a, 3)) - ((25 / 2) * Math.pow(a, 2)) + ((25 / 2) * a)
      return b
    }
  }
},
{
  title: '丝柯克技能：[极恶技·尽] 施放极恶技·尽时，汲取了虚境裂隙[buff]枚,普通攻击造成的伤害进一步提高[aDmg]%',
  data: {
    buff: ({ params }) => params.Deaths_Crossing || 3,
    aDmg: ({ params, talent }) => talent.q['汲取0/1/2/3枚虚境裂隙伤害提升2'][Math.min(((params.Deaths_Crossing || 3)), 3)]
  }
},
{
  title: '丝柯克技能：[极恶技·灭] 施放极恶技·灭时，拥有[buff]点蛇之狡谋,元素爆发造成的伤害提高[qPlus]',
  sort: 9,
  data: {
    buff: ({ params }) => params.Serpents_Subtlety || 100,
    qPlus: ({ params, attr, calc, talent }) => (calc(attr.atk) * talent.q['蛇之狡谋加成'] / 100) * Math.max((Math.min(((params.Serpents_Subtlety || 100) - 50), 12)), 0)
  }
},
{
  check: ({ params }) => params.SkillsUse > 0,
  title: '丝柯克技能：[极恶技·闪] 提升普通攻击与重击的攻击范围和抗打断能力[_interruption]%',
  data: {
    _interruption: 85
  }
},
{
  title: '丝柯克天赋：[诸武相授] 队伍中所有角色的元素类型均为冰元素与水元素时，队伍中自己的角色的元素战技等级提高1.0级'
},
{
  title: '丝柯克2命：[坠渊] 极恶技·灭造成的伤害额外提升[qPlus]，七相一闪模式下释放元素爆发攻击力提升[atkPct]%',
  cons: 2,
  sort: 9,
  data: {
    atkPct: ({ params }) => (params.BurstUse || 0) > 0 ? ((params.SkillsUse || 1) > 0 ? 60 : 0) : 0,
    qPlus: ({ params, attr, calc, talent }) => (calc(attr.atk) * talent.q['蛇之狡谋加成'] / 100) * Math.max((Math.min(((params.Serpents_Subtlety || 100) - 62), 10)), 0)
  }
},
{
  title: '丝柯克4命：[流断] 当前[buff]层死河渡断效果,攻击力提升[atkPct]%',
  cons: 4,
  data: {
    buff: ({ params }) => Math.min((params.Deaths_Crossing || 3), 3),
    atkPct: ({ params }) => {
      let a = Math.min(((params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0) + (params.ElementWindTeam || 0)), 3)
      let b = ((10 / 3) * Math.pow(a, 3)) - (10 * Math.pow(a, 2)) + ((50 / 3) * a)
      return b
    }
  }
}]
