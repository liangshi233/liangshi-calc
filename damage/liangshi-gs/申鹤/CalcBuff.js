import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '申鹤天赋：[缚灵通真法印] 施放仰灵威召将役咒后将使附近的队伍中所有角色根据技能释放形式对应伤害提高[dmg]%',
  data: {
    dmg: 15
  }
},
{
  check: ({ params }) => params.Talisman_Spirit === true && !params.TruceTime,
  title: '申鹤天赋：[大洞弥罗尊法] 处于神女遣灵真诀的领域中的当前场上角色,元素伤害加成提高[dmg]%',
  data: {
    dmg: 15
  }
},
{
  check: ({ params }) => params.Talisman_Spirit === true,
  title: '申鹤技能：[神女遣灵真诀] 使领域其中敌人的抗性降低[kx]%',
  data: {
    kx: ({ talent }) => talent.q['抗性降低']
  }
},
{
  check: ({ params }) => params.phy != true && params.Icy_Quill === true,
  title: '申鹤技能：[仰灵威召将役咒] 攻击对敌人造成冰元素伤害时,造成的伤害提高[aPlus]%',
  sort: 9,
  data: {
    aPlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.atk) / 100,
    a2Plus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.atk) / 100,
    a3Plus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.atk) / 100,
    ePlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.atk) / 100,
    qPlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.atk) / 100,
  }
},
{
  title: '申鹤1命：[心斋] 仰灵威召将役咒的可使用次数增加[_eIncreases]次。',
  cons: 1,
  data: {
    _eIncreases: 1
  }
},
{
  check: ({ params }) => params.Talisman_Spirit === true && params.phy != true && !params.TruceTime,
  title: '申鹤2命：[定蒙] 神女遣灵真诀的持续时间延长[_qSustainedPlus]秒,领域中的当前场上角色,冰元素伤害的暴击伤害提高[cdmg]%',
  cons: 2,
  data: {
    _qSustainedPlus: 6,
    cdmg: 15
  }
},
{
  title: '申鹤4命：[洞观] 施放仰灵威召将役咒时,将清除[buff]层「霜霄诀」,使本次仰灵威召将役咒造成的伤害提高[eDmg]%',
  cons: 4,
  data: {
    buff: ({ params }) => (params.Skyfrost_Mantra || 0),
    eDmg: ({ params }) => Math.min(((params.Skyfrost_Mantra || 0) * 5), 250)
  }
}]