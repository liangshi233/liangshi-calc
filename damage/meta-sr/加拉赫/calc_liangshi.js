export const details = [
{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: '酒花奔涌伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a2['TODO'], 'a')
},
{
  title: '战技生命恢复',
  dmg: ({ talent }, { heal }) => heal(talent.e['生命值回复'])
},
{
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '天赋生命恢复',
  dmg: ({ talent }, { heal }) => heal(talent.t['生命值回复'])
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgIdx = 2

export const buffs = [
{
  title: '加拉赫技能：[鏖战正酣] 【酩酊】使目标受到的击破伤害提高[_dmg]%',
  data: {
    _dmg: ({ talent }) => talent.t['击破伤害提高']
  }
},
{
  title: '加拉赫技能：[酒花奔涌] 受到强化普攻酒花奔涌攻击的目标攻击力降低[atkDef]%',
  data: {
    atkDef: ({ talent }) => talent.a2['TODO']
  }
},
{
  title: '加拉赫行迹：[崭新配方] 使自身提供的治疗量提高[heal]%',
  tree: 1,
  data: {
    heal: ({ calc, attr }) => Math.min( 75 , ( calc(attr.stance) * 50 ) / 100 )
  }
},
{
  title: '加拉赫1魂：[盐与犬] 进入战斗后会恢复[_energyevery]点能量，效果抵抗提高[effDef]%',
  cons: 1,
  data: {
    effDef: 50 ,
    _energyevery: 20
 }
},
{
  title: '加拉赫6魂：[血与沙] 击破特攻提高[stance]%',
  cons: 6,
  data: {
    stance: 20
 }
}]
