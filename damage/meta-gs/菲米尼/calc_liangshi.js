export const details = [
{
  title: '普通攻击一段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
   title: '霜寒伤害',
   dmg: ({ talent }, dmg) => dmg(talent.e['霜寒伤害'], 'e')
},
{
   title: '上挑攻击伤害',
   dmg: ({ talent }, dmg) => dmg(talent.e['上挑攻击伤害'], 'e')
},
{
   title: '零阶高压粉碎伤害',
  params: { sebo: 2 },
   dmg: ({ talent }, dmg) => dmg(talent.e['零阶高压粉碎伤害'], 'e')
},
{
  title: '一阶高压粉碎伤害',
  params: { sebo: 2 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['一阶高压粉碎伤害'] * 0.6731 , 'e')
    let e2 = dmg(talent.e['一阶高压粉碎伤害'] * 0.3269 , 'e', 'phy')
    return {
      dmg: e1.dmg + e2.dmg ,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: '二阶高压粉碎伤害',
  params: { sebo: 2 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['二阶高压粉碎伤害'] * 0.4517 , 'e')
    let e2 = dmg(talent.e['二阶高压粉碎伤害'] * 0.5483 , 'e', 'phy')
    return {
      dmg: e1.dmg + e2.dmg ,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: '三阶高压粉碎伤害',
  params: { sebo: 2 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['三阶高压粉碎伤害'] * 0.2478 , 'e')
    let e2 = dmg(talent.e['三阶高压粉碎伤害'] * 0.7522 , 'e', 'phy')
    return {
      dmg: e1.dmg + e2.dmg ,
      avg: e1.avg + e2.avg
    }
  }
},
{
   title: '四阶高压粉碎伤害',
  params: { sebo: 2 , e: 1 },
   dmg: ({ talent }, dmg) => dmg(talent.e['四阶高压粉碎伤害'], 'e', 'phy')
},
{
   title: 'Q展开伤害',
   dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}
]

export const defDmgIdx = 7
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '菲米尼技能：[猎影潜袭] 浮冰增压冷却时间缩短[_ecd]%',
  data: {
    _ecd: 70
  }
},
{
  check: ({ params }) => params.ea === true,
  title: '菲米尼技能：[猎影潜袭] 使普通攻击释放的霜寒造成原本[_eDmg]%的伤害',
  data: {
    _eDmg: 200
  }
},
{
  title: '菲米尼天赋：[饱和深潜] 施放浮冰增压·高压粉碎时,如果佩伊刻计的压力阶级小于四阶,浮冰增压的冷却时间缩短[_ecdPlus]秒',
  data: {
    _ecdPlus: 1
  }
},
{
  title: '菲米尼天赋：[并流式冷凝机关] 对敌人触发碎冰反应后,会使浮冰增压·高压粉碎造成的伤害提高[eDmg]%',
  data: {
    eDmg: 20
  }
},
{
  title: '菲米尼1命：[深水与泡沫之梦] 浮冰增压·高压粉碎的暴击率提高[eCpct]%',
  cons: 1,
  data: {
    eCpct: 15
  }
},
{
  title: '菲米尼2命：[企鹅与丰渥之国] 施放浮冰增压·高压粉碎将为菲米尼恢复[_energyevery]点元素能量',
  cons: 2,
  data: {
    _energyevery: ({ params }) => 2 + ( params.e == 0 ? 0 : ( params.e || 0 ) )
  }
},
{
  title: '菲米尼4命：[雪月与芦笛之舞] 对敌人触发冰冻、碎冰、超导反应后,攻击力提升[atkPct]%',
  cons: 4,
  data: {
    atkPct: 18
  }
},
{
  title: '菲米尼6命：[梦晓与决意之刻] 对敌人触发冰冻、碎冰、超导反应后，暴击伤害提升[cdmg]%',
  cons: 6,
  data: {
    cdmg: 36
  }
},
 {title: '12.7最后修改：[12.8重置] 修复技能buff生效错误的问题'}
]
