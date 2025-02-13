import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '甘雨天赋：[唯此一心] 发射的霜华矢与霜华矢引发的霜华绽发的暴击率提高[a2Cpct]%',
  data: {
    a2Cpct: 20
  }
},
{
  title: '甘雨天赋：[天地交泰] 降众天华领域内的队伍中当前场上角色获得[dmg]%元素伤害加成。',
  check: ({ params }) => params.Celestial_Shower === true,
  data: {
    dmg: 20
  }
},
{
  title: '甘雨1命：[饮露] 二段蓄力重击的霜华矢或霜华绽发命中敌人时，会使敌人的元素抗性降低[kx]%，命中时会恢复[_energyevery]点元素能量。',
  cons: 1,
  data: {
    kx: 15 ,
    _energyevery: 2
  }
},
{
  title: '甘雨2命：[获麟] 山泽麟迹的可使用次数增加[_eIncreases]次。',
  cons: 2,
  data: {
    _eIncreases: 1
  }
},
{
  title: '甘雨4命：[西狩] 在降众天华的领域内，敌人受到的伤害会增加[dmg]%',
  check: ({ params }) => params.Celestial_Shower === true,
  cons: 4,
  data: {
    dmg: 25
  }
},
{
  title: '甘雨6命：[履虫] 施放山泽麟迹的第一次霜华矢，无需蓄力即可施放。',
  cons: 4,
  data: {
    _a2Speed: 100
  }
}]
