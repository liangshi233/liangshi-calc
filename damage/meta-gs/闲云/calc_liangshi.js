export const details = [
{
  title: '仙力助推下落攻击伤害提升值',
  dmg: ({ calc, attr, cons }) => {
    let cons2 = cons * 1 >= 2 ? 1 : 0
    return {
      avg: Math.min( calc(attr.atk) * 170 / 100 , 8500 ) + cons2 * Math.min( calc(attr.atk) * 136 / 100 , 6800 )
    }
  }
},
{
  title: '步天梯伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['仙人姿态路径伤害'], 'e')
},
{
  title: '一段跳冲击波伤害',
  params: { btt: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['一段跳 · 鹤形追击伤害'], 'a3')
},
{
  title: '二段跳冲击波伤害',
  params: { btt: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['二段跳 · 鹤形追击伤害'], 'a3')
},
{
  title: '三段跳冲击波伤害',
  params: { btt: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段跳 · 鹤形追击伤害'], 'a3')
},
{
  title: '暮集竹星释放伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['施放瞬间伤害'], 'q')
},
{
  title: '竹星协同伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['机关协同伤害'], 'q')
},
{
  title: '暮集竹星释放治疗',
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let num = talent.q['施放瞬间治疗2'][0] * calc(attr.atk) / 100 + talent.q['施放瞬间治疗2'][1] * 1
    return heal(num)
  }
},
{
  title: '竹星协同治疗',
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let num = talent.q['机关持续治疗2'][0] * calc(attr.atk) / 100 + talent.q['机关持续治疗2'][1] * 1
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
  title: '闲云天赋：[细想应是洞中仙] 暮集竹星的竹星拥有仙力助推时，附近的当前场上角色的下落攻击坠地冲击造成的伤害提升[a3Plus]',
  sort: 9,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 136 / 100 , 8500 )
  }
},
{
  title: '闲云2命：[鹤唳远人间] 施放朝起鹤云后，攻击力提升[atkPct]%',
  sort: 1,
  cons: 2,
  data: {
    atkPct: 20
  }
},
{
  title: '闲云2命：[鹤唳远人间] 暮集竹星的竹星拥有仙力助推时，附近的当前场上角色的下落攻击坠地冲击造成的伤害额外提升[a3Plus]',
  sort: 9,
  cons: 2,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 170 / 100 , 6800 )
  }
},
{
  check: ({ params }) => params.btt !== undefined ,
  title: '闲云6命：[知是留云僊] 在一次朝起鹤云的鹤云幻化期间施展了[buffCount]次步天梯后，该次鹤云幻化期间的闲云冲击波的暴击伤害提升[a3Cdmg]%，若暮集竹星的竹星拥有仙力助推，则朝起鹤云不进入冷却',
  cons: 6,
  data: {
    buffCount: ({ params }) => Params.btt ,
    a3Cdmg: ({ params }) => 15 + Math.floor( Params.btt / 2 )  * 20 + Math.floor( Params.btt / 3 ) * 35
  }
},
{title: '测试内容：[4.3.50] 数据随时可能更改，请注意时效性'},
{title: '12.21最后修改：[12.18重置] '}
]
