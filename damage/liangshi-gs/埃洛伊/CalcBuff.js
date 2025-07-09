import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '埃洛伊技能：[冰尘雪野] [buff]层线圈，提高普通攻击造成的伤害[aDmg]%，被命中的敌人攻击力降低[_enemyAtk]%',
  data: {
    _enemyAtk: 12,
    buff: ({ params }) => params.Coil || 0,
    aDmg: ({ talent, params }) => ((params.Coil || 0) >= 4) ? talent.e['冰驰普通攻击伤害提升'] : talent.e['线圈普通攻击伤害提升2'][(params.Coil || 0) - 1]
  }
},
{
  title: '埃洛伊天赋：[战斗覆盖] 触发线圈效果时提升攻击力[atkPct]%',
  data: {
    atkPct: 16
  }
},
{
  title: '埃洛伊天赋：[强力攻击] 处于冰尘雪野的冰驰状态下[buff]秒，获得[dmg]%元素伤害加成。',
  data: {
    buff: ({ params }) => params.FightTime || 6,
    dmg: ({ params }) => Math.min(((params.FightTime || 6) * 3.5), 35)
  }
},
{
  title: '埃洛伊1命：[异界之星] 点亮此人一方星空之刻尚未到来',
  cons: 1,
},
{
  title: '埃洛伊2命：[异界之星] 点亮此人一方星空之刻尚未到来',
  cons: 2,
},
{
  title: '埃洛伊4命：[异界之星] 点亮此人一方星空之刻尚未到来',
  cons: 4,
},
{
  title: '埃洛伊6命：[异界之星] 点亮此人一方星空之刻尚未到来',
  cons: 6,
}]