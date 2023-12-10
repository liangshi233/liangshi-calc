let tmpDmg = false

export const details = [
{
  title: '普攻首段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: '普攻尾段2次伤害',
  dmg: ({ talent }, dmg) => {
    let a5 = dmg(talent.a['五段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: a5.dmg * 2 ,
      avg: a5.avg * 2
    }
  }
},
{
 title: 'E0层长按伤害',
 dmg: ({ talent }, dmg) => {
   tmpDmg = dmg(talent.e['长按伤害'], 'e')
   return tmpDmg
 }
},
{
 title: 'E2层长按伤害',
 params: { lkzx: true , sebo: 2 },
 dmg: ({ talent }, dmg) => {
   let e = tmpDmg
   let g = dmg(talent.e['冰涡之剑伤害'], 'e')
   let j = dmg(talent.q['光降之剑基础伤害'], 'e', 'phy')
   return {
     dmg: e.dmg * 1 + g.dmg * 2 + j.dmg * 0.5,
     avg: e.avg * 1 + g.avg * 2 + j.avg * 0.5
   }
 }
},
 ({ cons, weapon }) => {
  let buffCount = 12
  if (weapon.name === '松籁响起之时') {
    buffCount = 13
    if (weapon.affix_level >= 4) {
      buffCount = 14
    }
  }
  if (cons === 6) {
    buffCount = buffCount + 11
  }
  return {
    title: `光降之剑${buffCount}层伤害`,
    params: { lkzx: true , sebo: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.q['光降之剑基础伤害'] + talent.q['每层能量伤害'] * buffCount, 'q', 'phy')
  }
},
{
 title: '优雷修钟 2层E',
 params: { lkzx: true , teamB: true , sebo: 2 },
 dmg: ({ talent }, dmg) => {
   let e = tmpDmg
   let g = dmg(talent.e['冰涡之剑伤害'], 'e')
   let j = dmg(talent.q['光降之剑基础伤害'], 'e', 'phy')
   return {
     dmg: e.dmg * 1 + g.dmg * 2 + j.dmg * 0.5,
     avg: e.avg * 1 + g.avg * 2 + j.avg * 0.5
   }
 }
},
 ({ cons, weapon }) => {
  let buffCount = 12
  if (weapon.name === '松籁响起之时') {
    buffCount = 13
    if (weapon.affix_level >= 4) {
      buffCount = 14
    }
  }
  if (cons === 6) {
    buffCount = buffCount + 11
  }
  return {
    title: `优雷修钟 光剑${buffCount}层伤害`,
    params: { lkzx: true , teamA: true , sebo: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.q['光降之剑基础伤害'] + talent.q['每层能量伤害'] * buffCount, 'q', 'phy')
  }
},
{
  title: '优万重班 Q斩击融化',
  params: { lkzx:true , teamB: true , eqDmg: true , sebo: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}
]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg'
export const enemyName = '魔偶/女士/雷神'


export const buffs = [
{
  title: '优菈技能：[冰潮的涡旋] 若消耗了冷酷之心效果，会使身边的敌人的物理抗性与冰元素抗性降低[kx]%',
  check: ({ params }) => params.lkzx === true,
  data: {
    kx: ({ talent }) => talent.e['冰元素抗性降低']
  }
},
{
  title: '优菈1命：[光潮的幻象] 消耗冰潮的涡旋的冷酷之心效果后,物理伤害加成提高[phy]%',
  check: ({ params }) => params.lkzx === true,
  cons: 1,
  data: {
    phy: 30
  }
},
{
  title: '优菈4命：[自卑者的逞强] 对生命值低于50%的敌人，光降之剑造成的伤害提高[qDmg]%',
  cons: 4,
  data: {
    qDmg: 25
  }
},
{
  title: '优菈6命：[高贵者的义务] 光降之剑额外获得5层能量,每次获得能量层数时有50%概率额外获得1层',
  cons: 6
},
{
  title: '雷电将军技能：[神变·恶曜开眼] 获授雷罚恶曜之眼的角色在持续期间内元素爆发造成的伤害获得[qDmg]%提升',
  check: ({ params }) => params.teamA === true,
  data: {
    qDmg: 80 * 0.3
  }
},
{
  title: '雷电将军4命：[誓奉常道] 奥义•梦想真说施加的梦想一心状态结束后，附近的队伍中所有角色的攻击力提升[atkPct]%',
  check: ({ params , cons }) => cons >= 4 && params.teamA === true,
  sort: 1,
  data: {
    atkPct: 30
  }
},
{
  title: '雷电将军6命：[负愿前行] 雷电将军的元素爆发伤害命中敌人时使附近的队伍中所有角色元素爆发的冷却时间缩短,至多缩短[_cdPlus]秒',
  check: ({ params , cons }) => cons >= 6 && params.teamA === true,
  data: {
    _cdPlus: 5
  }
},
{
  title: '罗莎莉亚圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
  check: ({ params , artis }) => params.teamA === true && artis.昔日宗室之仪 !== 4 ,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '罗莎莉亚天赋：[暗中支援的黯色] 施放终命的圣礼时提高附近的队伍中所有角色[cpct]%暴击率',
  check: ({ params }) => params.teamA === true,
  data: {
    cpct: 15
  }
},
{
  title: '罗莎莉亚6命：[代行裁判] 终命的圣礼的攻击会使敌人的物理抗性降低[phyKx]%',
  check: ({ params }) => params.teamA === true,
  data: {
    phyKx: 20
  }
},
{
  title: '钟离圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
  check: ({ params , artis }) => params.teamA === true && artis.千岩牢固 !== 4 ,
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
  }
},
{
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
  check: ({ params }) => params.teamA === true,
  data: {
    kx: 20
  }
},
{
  title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性',
  check: ({ params }) => params.teamB === true,
  data: {
    kx: 40
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
  check: ({ params , cons }) => (cons < 6 && cons > 1) && params.teamB === true,
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
  check: ({ params , cons , weapon }) => (cons < 6 && cons > 1) && params.teamB === true && weapon.name !== '松籁响起之时' ,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
  check: ({ params , cons }) => cons >= 6 && params.teamB === true,
  data: {
    aDmg: 32,
    a2Dmg: 32,
    a3Dmg: 32
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
  check: ({ params , cons , weapon }) => cons >= 6 && params.teamB === true && weapon.name !== '松籁响起之时',
  sort: 1,
  data: {
    atkPct: 40
  }
},
{
  title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]%点',
  check: ({ params , cons }) => cons >= 2 && params.teamB === true,
  sort: 1,
  data: {
    mastery: 200
  }
},
{
  title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
  check: ({ params }) => params.teamB === true,
  data: {
    dmg: 40
  }
},
{
  title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
  check: ({ params }) => params.teamB === true,
  sort: 1,
  data: {
    atkPlus: 1202.35
  }
},
{
  title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
  check: ({ params , artis }) => params.teamB === true && artis.昔日宗室之仪 !== 4 ,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '重云技能：[灵刃·重华叠霜] 华叠霜领域其中的单手剑,双手剑,长柄武器角色获得 冰元素附魔 ',
  check: ({ params }) => params.teamB === true
},
{
  title: '重云天赋：[追冰剑诀] 灵刃·重华叠霜领域消失时唤出灵刃降低敌人[kx]%冰元素抗性',
  check: ({ params }) => params.teamB && params.eqDmg === true,
  data: {
    kx: 15
  }
},
{
  title: '重云天赋：[吐纳真定] 处在灵刃·重华叠霜领域内的普通攻击的单手剑,双手剑,长柄武器角色攻击速度提升[_aSpeed]%',
  check: ({ params }) => params.teamB === true,
  data: {
    _aSpeed: 8
  }
},
{
  check: ({ cons , params , weapon }) => (cons < 6 && cons > 1) && params.teamB === true && weapon.name !== '狼的末路',
  title: '重云武器：[狼的末路-精1] 攻击命中生命值低于30%的敌人时队伍中所有成员的攻击力提高[atkPct]%',
  sort: 1,
  data: {
    atkPct: 40
  }
},
{
  check: ({ cons , params , weapon }) => cons >= 6 && params.teamB === true && weapon.name !== '狼的末路',
  title: '重云武器：[狼的末路-精5] 攻击命中生命值低于30%的敌人时队伍中所有成员的攻击力提高[atkPct]%',
  sort: 1,
  data: {
    atkPct: 80
  }
},
{
  title: '重云2命：[周天运转] 处于重华叠霜领域中获得[_cd]%冷却缩减',
  check: ({ params }) => params.teamB === true,
  cons: 2,
  data: {
    _cd: 15
  }
},
{
  title: '元素反应：[超导] 冰元素触及雷元素时会造成冰元素的范围伤害,并降低受超导影响生物[phyKx]%的物理抗性 ',
  check: ({ params }) => params.teamA === true,
  data: {
    phyKx: 25
  }
},
{
  title: '元素共鸣：[粉碎之冰] 攻击处于冰元素附着或冻结下的敌人时,暴击率提高[cpct]%',
  check: ({ params }) => params.teamA === true,
  data: {
    cpct: 15
  }
},
{
  title: '元素共鸣：[粉碎之冰] 攻击处于冰元素附着或冻结下的敌人时,暴击率提高[cpct]%',
  check: ({ params }) => params.teamB === true,
  data: {
    cpct: 15
  }
},
'melt',
 {title: '12.10最后修改：[10.23重置] 修正多段类普攻无法多次获取伤害值提升类buff的问题'}
]
