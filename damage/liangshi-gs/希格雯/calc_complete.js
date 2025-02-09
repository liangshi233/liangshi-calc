import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs95ranking = cfg.gs95ranking
let energy = cfg.energymodel
let a2Dmg = { dmg: 0, avg: 0 }
let a2zDmg = { dmg: 0, avg: 0 }
let e1Dmg = { dmg: 0, avg: 0 }
let e1zDmg = { dmg: 0, avg: 0 }
let e2Dmg = { dmg: 0, avg: 0 }
let e2zDmg = { dmg: 0, avg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '弹跳水疗法'
let eNameT = 'E'
let qName = '过饱和心意注射'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '靶向治疗'
  eNameT = '弹跳水疗法'
  qNameT = '过饱和心意注射'
 } else if ( NamePath == 3 ) {
  eNameT = '弹跳水疗法'
  qNameT = '过饱和心意注射'
 } else if ( NamePath == 4 ) {
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
const miss = ['c', 'y']
let ranking = 'undefined'
if (!cfg.gs95ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'dps'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'dps'
     }  else if (miss.includes(rankingThreePath)) {
      logger.mark('[希格雯] 排名规则均未命中，已选择默认排名规则')
      ranking = 'dps'
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
 ranking = `${gs95ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段伤害`,
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${aName}二段伤害`,
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${aName}三段伤害`,
  dmgKey: 'a',
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${a2Name}伤害`,
  dmg: ({ talent, attr , cons }, dmg ) => {
     a2Dmg = dmg(talent.a['满蓄力瞄准射击'], 'a2')
     return a2Dmg
  }
},
{
  title: `${a2Name}蒸发`,
  dmgKey: 'z',
  dmg: ({ talent, attr , cons }, dmg ) => {
     a2zDmg = dmg(talent.a['满蓄力瞄准射击'], 'a2', 'vaporize')
     return a2zDmg
  }
},
{
  title: `小小关心气泡伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.a['小小关心气泡伤害'], 'a2')
},
{
  title: `小小关心气泡蒸发`,
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.a['小小关心气泡伤害'], 'a2', 'vaporize')
},
{
  title: `${eName}最小水球伤害`,
  params: { elv: 0 },
  dmg: ({ talent, attr, calc }, { basic }) => {
     e1Dmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
     return e1Dmg
  }
},
{
  title: `${eName}最小水球蒸发`,
  params: { elv: 0 },
  dmg: ({ talent, attr, calc }, { basic }) => {
     e1zDmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
     return e1zDmg
  }
},
{
  title: `${eName}最小水球治疗`,
  params: { elv: 0 },
  dmg: ({ talent, attr, calc }, { heal }) => heal( ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3 )
},
{
  title: `${eName}一层水球伤害`,
  params: { elv: 1 },
  dmg: ({ talent, attr, calc }, { basic }) => {
     e2Dmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
     return e2Dmg
  }
},
{
  title: `${eName}一层水球蒸发`,
  params: { elv: 1 },
  dmg: ({ talent, attr, calc }, { basic }) => {
     e2zDmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
     return e2zDmg
  }
},
{
  title: `${eName}一层水球治疗`,
  params: { elv: 1 },
  dmg: ({ talent, attr, calc }, { heal }) => heal( ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.35 )
},
{
  title: `${eName}最大水球伤害`,
  params: { elv: 2 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
},
{
  title: `${eName}最大水球蒸发`,
  params: { elv: 2 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
},
{
  title: `${eName}最大水球治疗`,
  params: { elv: 2 },
  dmg: ({ talent, attr, calc }, { heal }) => heal( ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.4 )
},
{
  title: `${eName}水球自身治疗`,
  dmg: ({ attr, calc }, { heal }) => heal(calc(attr.hp) * 50 / 100 * 1.3 )
},
{
  title: `${eName}完整伤害`,
  params: { elv: 2 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
    let e2 = e1Dmg
    let e3 = e2Dmg
    let cons1 = cons >= 1 ? 4 : 1
    return {
      avg: e1.avg * cons1 + e2.avg + e3.avg * 3 ,
      dmg: e1.dmg * cons1 + e2.dmg + e3.dmg * 3
    }
  }
},
{
  title: `${eName}完整蒸发`,
  dmgKey: 'e',
  params: { elv: 2 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
    let e2 = e1zDmg
    let e3 = e2zDmg
    let cons1 = cons >= 1 ? 4 : 1
    return {
      avg: e1.avg * cons1 + e2.avg + e3.avg * 3 ,
      dmg: e1.dmg * cons1 + e2.dmg + e3.dmg * 3
    }
  }
},
{
  title: `${eName}完整治疗`,
  dmgKey: 'h',
  params: { elv: 2 },
  dmg: ({ talent, attr, calc, cons }, { heal }) => {
    let e1 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.4
    let e2 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.35
    let e3 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3
    let cons1 = cons >= 1 ? 4 : 1
    let e4 = e1 * cons1 + e2 + e3 * 3
    return heal(e4)
  }
},
{
  title: `${eName}伤害提升值`,
  dmgKey: 'f',
  dmg: ({ calc, attr, cons }) => {
    let cons1 = cons >= 1 ? 100 : 80
    let cos1 = cons >= 1 ? 3500 : 2800
    return {
      avg: Math.max( 0 , Math.min( ( ( calc(attr.hp) - 30000 ) / 1000 * cons1 ) , cos1 ) )
    }
  }
},
{
  title: `${qName}单段伤害`,
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
},
{
  title: `${qName}单段蒸发`,
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
},
{
  title: `${qName}完整伤害`,
  dmg: ({ talent, attr , cons , calc }, { basic }) => {
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
    let cons4 = cons >= 4 ? 13 : 6
    return {
      avg: q1.avg * cons4,
      dmg: q1.dmg * cons4
    }
  }
},
{
  title: `${qName}完整蒸发`,
  dmgKey: 'q',
  dmg: ({ talent, attr , cons , calc }, { basic }) => {
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
    let q2 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
    let cons4 = cons >= 4 ? 10 : 4
    let con4 = cons >= 4 ? 3 : 2
    return {
      avg: q1.avg * cons4 + q2.avg * con4 ,
      dmg: q1.dmg * cons4 + q2.dmg * con4
    }
  }
},
{
  title: '单人站场18秒',
  params: { elv: 2 },
  dmg: ({ talent, attr , cons , calc }, { basic }) => {
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
    let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
    let e2 = e1Dmg
    let e3 = e2Dmg
    let a2 = a2Dmg
    let cons1 = cons >= 1 ? 4 : 1
    let cons4 = cons >= 4 ? 13 : 6
    return {
      avg: a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + q1.avg * cons4 ,
      dmg: a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + q1.dmg * cons4
	}
  }
},
{
  title: '单人站场18秒蒸发',
  dmgKey: 'dph',
  params: { elv: 2 },
  dmg: ({ talent, attr , cons , calc }, { basic }) => {
	let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
	let q2 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
    let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
    let e2 = e1zDmg
    let e3 = e2zDmg
	let a2 = a2zDmg
    let cons1 = cons >= 1 ? 4 : 1
    let cons4 = cons >= 4 ? 10 : 4
    let con4 = cons >= 4 ? 3 : 2
    return {
      avg: a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + q1.avg * cons4 + q2.avg * con4 ,
      dmg: a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + q1.dmg * cons4 + q2.dmg * con4
    }
  }
},
{
  title: '双人站场18秒治疗',
  dmgKey: 'hph',
  params: { elv: 2 },
  dmg: ({ talent, attr, calc, cons }, { heal }) => {
    let e1 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.4
    let e2 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.35
    let e3 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3
    let e5 = ( calc(attr.hp) * 50 / 100 * 1.3 )
    let cons1 = cons >= 1 ? 4 : 1
    let e4 = e1 * cons1 + e2 + e3 * 3 + e5
    return heal(e4)
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
    let weaponn = 0
    let weaponnn = 0
    if (weapon.name === '西风猎弓') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼弓') {
      weaponn = 4 * 3
    }
    weaponnn = Math.min( ( ( calc(attr.hp) * 0.1 * 2 ) / 2000 ) , 5 )
    return {
      avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn + energy ) ) / ( 70 - weaponnn ) ) ,
      type: 'text'
    }
  }
},
{
  title: '单人站场期望DPS',
  params: { elv: 2 },
	dmg: ({ talent, attr , cons , calc , weapon }, { basic }) => {
	let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
    let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
    let e2 = e1Dmg
    let e3 = e2Dmg
	let a2 = a2Dmg
    let cons1 = cons >= 1 ? 4 : 1
    let cons4 = cons >= 4 ? 13 : 6
    let weaponn = 0
    let weaponnn = 0
    if (weapon.name === '西风猎弓') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼弓') {
      weaponn = 4 * 3
    }
    weaponnn = Math.min( ( ( calc(attr.hp) * 0.1 * 2 ) / 2000 ) , 5 )
    let qcn = Math.min( ( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn + energy ) ) / ( 70 - weaponnn ) ) , 1 )
    return {
      avg: ( a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + ( q1.avg * cons4 ) * qcn ) / 18 ,
      dmg: ( a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + ( q1.dmg * cons4 ) * qcn ) / 18
	}
  }
},
{
  title: '单人站场期望DPS蒸发',
  dmgKey: 'dps',
  params: { elv: 2 },
	dmg: ({ talent, attr , cons , calc , weapon }, { basic }) => {
	let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
	let q2 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
    let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
    let e2 = e1zDmg
    let e3 = e2zDmg
	let a2 = a2zDmg
    let cons1 = cons >= 1 ? 4 : 1
	let cons4 = cons >= 4 ? 10 : 4
	let con4 = cons >= 4 ? 3 : 2
    let weaponn = 0
    let weaponnn = 0
    if (weapon.name === '西风猎弓') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼弓') {
      weaponn = 4 * 3
    }
    weaponnn = Math.min( ( ( calc(attr.hp) * 0.1 * 2 ) / 2000 ) , 5 )
    let qcn = Math.min( ( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn + energy ) ) / ( 70 - weaponnn ) ) , 1 )
    return {
      avg: ( a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + ( q1.avg * cons4 + q2.avg * con4 ) * qcn ) / 18 ,
      dmg: ( a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + ( q1.dmg * cons4 + q2.dmg * con4 ) * qcn ) / 18
    }
  }
},
{
  title: '双人站场期望HPS',
  dmgKey: 'hps',
  params: { elv: 2 },
  dmg: ({ talent, attr, calc, cons }, { heal }) => {
    let e1 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.4
    let e2 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.35
    let e3 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3
    let e5 = ( calc(attr.hp) * 50 / 100 * 1.3 )
    let cons1 = cons >= 1 ? 4 : 1
    let e4 = ( e1 * cons1 + e2 + e3 * 3 + e5 ) / 18
    return heal(e4)
  }
},
{
  title: `希芙万迪 ${qNameT}单段`,
  params: { teamA: true },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
},
{
  title: `希芙万迪 ${qNameT}完整蒸发`,
  params: { teamA: true },
  dmg: ({ talent, attr , cons , calc }, { basic }) => {
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
    let q2 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
    let cons4 = cons >= 4 ? 10 : 4
    let con4 = cons >= 4 ? 3 : 2
    return {
      avg: q1.avg * cons4 + q2.avg * con4 ,
      dmg: q1.dmg * cons4 + q2.dmg * con4
    }
  }
}]

export const defParams = { blPlus: 0 , blPct: 1 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
    _BondOfLife: ({ params }) => Math.min( ( params.blPct * ( ( 10 * 2 ) ) + params.blPlus ) , 200 )
  }
},
{
  title: '希格雯技能：[弹跳水疗法] 长按会使激愈水球造成的伤害提升[eDmg]%且生命之契被清除时，每清除一个源水之滴的生命之契将为她恢复[_energyevery]点元素能量。',
  data: {
     eDmg: ({ params }) => 5 * ( params.elv || 0 ),
     _energyevery: ({ params , calc , attr }) => Math.min( ( ( calc(attr.hp) * 0.1 ) / 2000 ) , 5 )
  }
},
{
  title: '希格雯天赋：[应有适当的休憩] 施放弹跳水疗法时，获得[dmg]%水元素伤害加成',
  data: {
    dmg: 8
  }
},
{
  title: '希格雯天赋：[细致入微的诊疗] 基于队伍中所有角色当前生命之契的总和,提升[_heal]%治疗量',
  data: {
    _heal: 30
  }
},
{
  title: '希格雯1命：[「最快乐的精灵，可否懂得焦虑」] 弹跳水疗法的激愈水球能额外弹跳3次，静养计数产生的伤害值额外提升',
  cons: 1
},
{
  title: '希格雯2命：[「最仁慈的精灵，可否化解仇敌」] 弹跳水疗法抛出的激愈水球或过饱和心意注射命中敌人后，该敌人的水元素抗性降低[kx]%',
  cons: 2,
   data: {
     kx: 35
   }
},
{
  title: '希格雯4命：[「最美丽的精灵，可否拒绝衰朽」] 过饱和心意注射的持续时间延长3秒。',
  cons: 4
},
{
  title: '希格雯6命：[「最光辉的精灵，可否为我祷告」] 过饱和心意注射的暴击率提高[qCpct]%,暴击伤害提高[qCdmg]%',
  sort: 9,
  cons: 6,
  data: {
    qCpct: ({ calc, attr }) => Math.min( 20 , calc(attr.hp) / 1000 * 0.4 ) ,
    qCdmg: ({ calc, attr }) => Math.min( 110 , calc(attr.hp) / 1000 * 2.2 )
  }
},
{
  title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
  check: ({ params }) => params.teamA === true,
  data: {
    hpPct: 25
  }
},
{
  title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性',
  check: ({ params }) => params.teamA === true,
  data: {
    kx: 40
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
  check: ({ params , cons }) => (cons < 6 && cons > 1) && params.teamA === true,
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
  check: ({ params , cons , weapon }) => (cons < 6 && cons > 1) && params.teamA === true && weapon.name !== '终末嗟叹之诗' ,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
  check: ({ params , cons }) => cons >= 6 && params.teamA === true,
  data: {
    aDmg: 32,
    a2Dmg: 32,
    a3Dmg: 32
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
  check: ({ params , cons , weapon }) => cons >= 6 && params.teamA === true && weapon.name !== '终末嗟叹之诗',
  sort: 1,
  data: {
    atkPct: 40
  }
},
{
  title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons >= 2 && params.teamA === true,
  sort: 1,
  data: {
    mastery: 200
  }
},
{
  title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
  check: ({ params }) => params.teamA === true,
  data: {
    dmg: 40
  }
},
{
  check: ({ cons, params }) => params.teamA === true,
  title: '芙宁娜技能：[万众狂欢] 基于芙宁娜持有的「气氛值」，附近的队伍中所有角色造成的伤害提升[dmg]%，受治疗加成提升[healInc]%',
  data: {
    dmg: 75,
    healInc: 30
  }
},
{
  check: ({ cons, params }) => cons >= 1 && params.teamA === true,
  title: '芙宁娜1命：[爱是难驯鸟，哀乞亦无用] 芙宁娜持有「气氛值」的上限提升100点',
  data: {
    dmg: 25,
    healInc: 10
  }
},
{
  title: '迪希雅天赋：[不吝佑助] 为队伍中所有角色赋予「熔金铸躯」状态。处于熔金铸躯状态下的角色处于净焰剑狱领域中时，将获得[_interruption]%的抗打断能力。',
  check: ({ params }) => params.teamA === true,
  data: {
    _interruption: 100
  }
},
{
  title: '迪希雅技能：[熔铁流狱] 提升领域中当前场上角色的抗打断能力[_interruption]%，并在这些角色受到伤害时，消解50%伤害，',
  check: ({ params }) => params.teamA === true,
  data: {
    _interruption: 30
  }
},
 'vaporize',
{title: `6.28最后修改：[5.25重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs95ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]
