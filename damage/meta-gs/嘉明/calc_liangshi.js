export const details = [
{
  title: '下落攻击·踏云献瑞伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['下落攻击·踏云献瑞伤害'], 'a3')
},
{
  title: '下落攻击·踏云献瑞蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['下落攻击·踏云献瑞伤害'], 'a3', 'vaporize')
},
{
  title: '下落攻击·踏云献瑞融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['下落攻击·踏云献瑞伤害'], 'a3', 'melt')
},
{
  title: '猊兽·文仔砸击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['猊兽·文仔砸击伤害'], 'q')
},
{
  title: '猊兽·文仔砸击蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.q['猊兽·文仔砸击伤害'], 'q', 'vaporize')
},
{
  title: '猊兽·文仔砸击融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['猊兽·文仔砸击伤害'], 'q', 'melt')
},
{
  title: '天赋下落攻击治疗量',
  dmg: ({ attr, calc }, { heal }) =>
    heal( calc(attr.hp) * 6 / 100 )
},
{
  check: ({ cons }) => cons >= 1,
  title: '1命会合治疗量',
  dmg: ({ attr, calc }, { heal }) =>
    heal( calc(attr.hp) * 15 / 100 )
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '嘉明天赋：[祥烟瑞气] 生命值低于50%时，获得[healInc]%受治疗加成。生命值高于或等于50%时，下落攻击·踏云献瑞造成的伤害提升[a3Dmg]%。',
  data: {
    healInc: 20,
    a3Dmg: 20
  }
},
{
  title: '嘉明2命：[步踏梅花] 受到治疗时，若此次治疗回复量溢出，攻击力将提升[atkPct]%',
  sort: 1,
  cons: 2,
  data: {
    atkPct: 20
  }
},
{
  title: '嘉明4命：[云里翻山] 瑞兽登高楼的下落攻击·踏云献瑞命中敌人时，将为嘉明恢复[_energyevery]点元素能量。',
  cons: 4,
  data: {
    _energyevery: 2
  }
},
{
  title: '嘉明6命：[百兽俱驯] 瑞兽登高楼的下落攻击·踏云献瑞的暴击率提升[a3Cpct]%，暴击伤害提升[a3Cdmg]%，攻击范围提升。',
  cons: 6,
  data: {
    a3Cpct: 20,
    a3Cdmg: 40
  }
},
{title: '测试内容：[4.3.50] 数据随时可能更改，请注意时效性'},
{title: '12.26最后修改：[12.18重置] '}
]