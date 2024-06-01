import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs79ranking = cfg.gs79ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '熔铁流狱'
let eNameT = 'E'
let qName = '凭此结契'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '拂金剑斗术'
  eNameT = '熔铁流狱'
  qNameT = '炎啸狮子咬'
 }  else if ( NamePath == 3 ) {
  eNameT = '熔铁流狱'
  qNameT = '炎啸狮子咬'
 }  else if ( NamePath == 4 ) {
  eName = '元素战技'
  qName = '元素爆发'
  eNameT = '元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  a2Name = 'Z'
  a3Name = '戳'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['a', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs79ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[迪希雅] 排名规则均未命中，已选择默认排名规则')
      ranking = 'e'
     } else {
       ranking = `${rankingThreePath}`
     }
   } else {
     ranking = `${rankingTwoPath}`
   }
 } else {
  ranking = `${rankingOnePath}`
 }
} else {
  ranking = `${gs79ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
 {
  title: '净焰剑狱协同攻击',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e')
  }
},
{
  title: '领域伤害蒸发',
  dmgKey: 'e',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e', 'vaporize')
  }
},
{
  title: '炽鬃拳伤害',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
},
{
  title: '炽鬃拳蒸发',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
  }
},
{
  title: '焚落踢伤害',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['焚落踢伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
},
{
  title: '焚落踢蒸发',
  dmgKey: 'q',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['焚落踢伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
  }
},
{
  title: `迪甘莫妲 ${eNameT}协同伤害`,
  params: { teamA: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e')
  }
},
{
  title: '迪甘莫妲 炽鬃拳伤害',
  params: { teamA: true , q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
},
{
  title: '迪甘莫妲 炽鬃拳蒸发',
  params: { teamA: true , q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,atk,cpct,cdmg'

export const buffs = [
{
  title: '迪希雅天赋：[不吝佑助] 施放熔铁流狱·净焰昂藏后将获得额外的[_interruption]%抗打断能力,承担来自赤鬃之血的伤害时,受到的伤害降低60%.',
  data: {
    _interruption: 100
  }
},
{
  title: '迪希雅1命：[皎洁之火铓辉灿漫] 生命值上限提升[hpPct]%',
  cons: 1,
  data: {
    hpPct: 20
  }
},
{
  title: '迪希雅1命：[皎洁之火铓辉灿漫] 熔铁流狱伤害提高[ePlus]，炎啸狮子咬伤害提高[qPlus]',
  sort: 9,
  cons: 1,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.036,
    qPlus: ({ attr, calc }) => calc(attr.hp) * 0.06
  }
},
{
  title: '迪希雅2命：[净沙利刃明映万乘] 重新产生的净焰剑狱领域持续时间延长6秒,领域内的当前场上角色受到攻击时,将使净焰剑狱协同攻击造成的伤害提升[eDmg]%',
  cons: 2,
  data: {
    eDmg: 50
  }
},
{
  title: '迪希雅4命：[服膺誓禁恪守无失] 炽鬃拳与焚落踢命中敌人时，将为迪希雅恢复[_energyevery]点元素能量，并恢复生命值',
  cons: 2,
  data: {
    _energyevery: 1.5
  }
},
{
  check: ({ params }) => params.q !== undefined,
  title: '迪希雅6命：[燎燃利爪裂帛斫金] 炎啸狮子咬的暴击率提升[qCpct]%，炽鬃拳命中敌人并造成暴击后,炎啸狮子咬的暴击伤害提升[qCdmg]%,持续时间延长2秒',
  cons: 6,
  data: {
   qCpct: 10,
   qCdmg: ({ params }) => params.q * 15
  }
},
{
  check: ({ cons, params }) => cons >= 4 && params.teamA === true ,
  title: '甘雨4命：[西狩] 在降众天华的领域内，敌人受到的伤害会增加[dmg]%',
  data: {
   dmg: 25 ,
 }
},
{
  title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时,暴击率提升[cpct]%',
  check: ({ params , cons }) => cons >= 4 && params.teamA === true,
  data: {
    cpct: 15
  }
},
{
  title: '莫娜技能：[星命定轨] 对敌人施加星异的伤害加成效果,并以此提高[dmg]%这一次造成的伤害',
  check: ({ params }) => params.teamA === true,
  data: {
    dmg: 60
  }
},
{
  title: '莫娜武器：[讨龙英杰谭-精5] 主动切换角色时,新登场的角色攻击力提升[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 48
  }
},
{
  title: '莫娜圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
  }
},
{
  title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
  check: ({ params }) => params.teamA === true,
  sort: 7,
  data: {
    mastery: 250
  }
},
{
  title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons < 6 && params.teamA === true,
  sort: 1,
  data: {
    mastery: 40
  }
},
{
  title: '纳西妲武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons >= 6 && params.teamA === true,
  sort: 1,
  data: {
    mastery: 48
  }
},
{
  title: '纳西妲2命：[正等善见之根] 处于纳西妲施加的蕴种印状态下的敌人,触发燃烧、绽放、超绽放、烈绽放反应伤害能够造成暴击,暴击率固定为[_fusionCpct]%，暴击伤害固定为[_fusionCdmg]%',
  check: ({ params , cons }) => cons >= 2 && params.teamA === true,
  data: {
    _fusionCpct: 20,
    _fusionCdmg: 100
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '元素共鸣：[交织之护] 全元素与物理抗性提升[_res]%',
  data: {
  	_res: 15
  }
},
'vaporize',
{title: `6.1最后修改：[12.11重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs79ranking} 更新日志:${renew} 其他信息:${information}`}]
