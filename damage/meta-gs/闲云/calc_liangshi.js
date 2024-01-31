export const details = [
{
  title: '仙力助推下落攻击伤害提升值',
  dmg: ({ calc, attr, cons }) => {
    let cons2 = cons * 1 >= 2 ? 2 : 1
    return {
      avg: Math.min( calc(attr.atk) * 200 / 100 , 9000 ) * cons2
    }
  }
},
{
  title: '步天梯伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '一段跳冲击波伤害',
  params: { btt: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][0], 'a3')
},
{
  title: '二段跳冲击波伤害',
  params: { btt: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][1], 'a3')
},
{
  title: '三段跳冲击波伤害',
  params: { btt: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][2], 'a3')
},
{
  title: '暮集竹星释放伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '竹星协同伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['竹星伤害'], 'q')
},
{
  title: '暮集竹星释放治疗',
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let num = talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1
    return heal(num)
  }
},
{
  title: '竹星持续治疗',
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let num = talent.q['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗量2'][1] * 1
    return heal(num)
  }
},
{
  title: '扩散反应伤害',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

export const defParams = { soda: 1 }
export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '闲云天赋：[霜翎高逐祥风势] 朝起鹤云的闲云冲击波命中[buffCount]个敌人,使角色的下落攻击的暴击率提升[a3Cpct]%',
  data: {
    buffCount: ({ params }) => ( params.enemy || 4 ) ,
    a3Cpct: ({ params }) => Math.min( 10 , ( params.enemy || 4 ) * 2 + 2 )
  }
},
{
  title: '闲云天赋：[细想应是洞中仙] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害提升[a3Plus]',
  sort: 9,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 200 / 100 , 9000 )
  }
},
{
  title: '闲云2命：[鹤唳远人间] 施放朝起鹤云后,攻击力提升[atkPct]%',
  sort: 1,
  cons: 2,
  data: {
    atkPct: 20
  }
},
{
  title: '闲云2命：[鹤唳远人间] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害额外提升[a3Plus]',
  sort: 9,
  cons: 2,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 200 / 100 , 9000 )
  }
},
{
  check: ({ params }) => params.btt !== undefined ,
  title: '闲云6命：[知是留云僊] 在一次朝起鹤云的鹤云幻化期间施展了[buffCount]次步天梯后,该次鹤云幻化期间的闲云冲击波的暴击伤害提升[a3Cdmg]%,若暮集竹星的竹星拥有仙力助推,则朝起鹤云不进入冷却',
  cons: 6,
  data: {
    buffCount: ({ params }) => params.btt ,
    a3Cdmg: ({ params }) => 15 + Math.floor( params.btt / 2 ) * 20 + Math.floor( params.btt / 3 ) * 35
  }
},
{title: '1.31最后修改：[12.18重置] '}
]
