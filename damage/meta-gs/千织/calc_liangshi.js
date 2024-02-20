export const details = [
{
  title: 'E后普攻一段',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: 'E后普攻四段',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: 'E后重击',
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: 'E后高空下落伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: '羽袖一触释放伤害',
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
},
{
  title: '羽袖一触人偶伤害',
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
},
{
  title: '2命人偶切斩伤害',
  check: ({ cons }) => cons >= 2,
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
},
{
  title: '二刀之形 · 比翼伤害',
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100 , 'q')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [
{
  title: '千织天赋：[锦上添花] 队伍中附近的角色创造岩元素创造物时，获得[dmg]%岩元素伤害加成',
  data: {
    dmg: 20
  }
},
{
  title: '千织2命：[落染五色] 施放二刀之形·比翼后，将在当前场上自己的角色身边唤出简易型自律人形 · 绢，对附近的敌人发起攻击，造成岩元素范围伤害',
  cons: 2
},
{
  title: '千织6命：[万理一空] 触发固有天赋「量体裁衣」的裁锦后，羽袖一触的冷却时间减少[_eCdPlus]秒。此外，普通攻击造成的伤害提升[aPlus] ',
  cons: 6,
  data: {
    _eCdPlus: 12,
    aPlus: ({ attr, calc }) => calc(attr.def) * 235 / 100
  }
},
{title: '测试内容：[4.4.52] 数据随时可能更改，请注意时效性'},
{title: '2.20最后修改：[1.30重置]'}
]
