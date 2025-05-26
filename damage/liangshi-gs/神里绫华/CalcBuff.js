import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '神里绫华天赋：[天罪国罪镇词] 施放神里流·冰华后,普通攻击与重击造成的伤害提升[aDmg]%',
  data: {
    aDmg: 30,
    a2Dmg: 30
  }
},
{
  title: '神里绫华天赋：[天罪国罪镇词] 神里流·霰步结束时释放的寒冰命中了敌人时,获得[dmg]%元素伤害加成并恢复[_stamina]点体力',
  data: {
    dmg: 18,
    _stamina: 10
  }
},
{
  title: '神里绫华1命：[霜杀墨染樱] 普通攻击或重击对敌人造成冰元素伤害时,有50.0%的几率使神里流•冰华的冷却时间缩减[_ecdPlus]秒',
  cons: 1,
  data: {
    _ecdPlus: 0.3
  }
},
{
  title: '神里绫华2命：[三重雪关扉] 施放神里流•霜灭时,会额外释放两股规模较小的霜见雪关扉',
  cons: 2
},
{
  check: ({ params }) => params.Frostflake_Seki === true,
  title: '神里绫华4命：[盈缺流返] 敌人受到神里流•霜灭的霜见雪关扉造成的伤害后,防御力降低[enemyDef]%',
  cons: 4,
  data: {
    enemyDef: 30
  }
},
{
  check: ({ params }) => params.Usurahi_Butou === true,
  title: '神里绫华6命：[间水月] 使重击造成的伤害提高[a2Dmg]%',
  cons: 6,
  data: {
    a2Dmg: 298
  }
}]