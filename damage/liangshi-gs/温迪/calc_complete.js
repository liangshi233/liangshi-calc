import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs22ranking = cfg.gs22ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '高天之歌'
let eNameT = 'E'
let qName = '风神之诗'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '神代射术'
  eNameT = '高天之歌'
  qNameT = '风神之诗'
 }  else if ( NamePath == 3 ) {
  eNameT = '高天之歌'
  qNameT = '风神之诗'
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
const miss = ['h', 'f', 'y', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs22ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'q'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'q'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[温迪] 排名规则均未命中，已选择默认排名规则')
      ranking = 'q'
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
  ranking = `${gs22ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段伤害`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${aName}二段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${aName}三段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${aName}四段伤害`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['四段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${aName}五段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: `${aName}六段伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'phy')
},
{
  title: `${a2Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['瞄准射击'], 'a2', 'phy')
},
{
  title: `${a2Name}分裂箭`,
  check: ({ cons }) => cons >= 1,
  dmg: ({ talent }, dmg) => dmg(talent.a['瞄准射击'] * 0.33 , 'a2', 'phy')
},
{
  title: `满蓄力${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},
{
  title: `满蓄力${a2Name}分裂箭`,
  check: ({ cons }) => cons >= 1,
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'] * 0.33 , 'a2')
},
{
  title: `${a3Name}期间伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `低空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `高空${a3Name}伤害`,
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${eName}点按伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
},
{
  title: `${eName}长按伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
},
{
  title: `${qName}单段伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
},
{
  title: `${qName}单段转化理论`,
  dmgKey: 'undefined',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['附加元素伤害'], 'q', 'phy')
},
{
  title: `${qName}含转化单段`,
  params: { q: true },
  dmg: ({ talent }, dmg) => {
    let basic = dmg(talent.q['持续伤害'], 'q')
    let fj = dmg(talent.q['附加元素伤害'], 'q', 'phy')
    return {
      dmg: basic.dmg + fj.dmg,
      avg: basic.avg + fj.avg
    }
  }
},
{
  title: `${qName}无转化完整伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => {
    let basic = dmg(talent.q['持续伤害'], 'q')
    return {
      dmg: basic.dmg * 20 ,
      avg: basic.avg * 20
    }
  }
},
{
  title: `${qName}完整伤害`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => {
    let basic = dmg(talent.q['持续伤害'], 'q')
    let fj = dmg(talent.q['附加元素伤害'], 'q', 'phy')
    return {
      dmg: basic.dmg * 20 + fj.dmg * 16 ,
      avg: basic.avg * 20 + fj.avg * 16
    }
  }
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
},
{
  title: '单人站场18秒',
  dmgKey: 'dph',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
    let a = dmg(talent.a['满蓄力瞄准射击'], 'a2')
    let a2 = dmg(talent.a['满蓄力瞄准射击'] * 0.33, 'a2')
    let e = dmg(talent.e['点按伤害'], 'e')
    let q = dmg(talent.q['持续伤害'], 'q')
    let count = cons * 1 >= 1 ? 1 : 0
    return {
      dmg: a.dmg * 9 + a2.dmg * 9 * 2 * count + e.dmg * 3 + q.dmg * 20,
      avg: a.avg * 9 + a2.avg * 9 * 2 * count + e.avg * 3 + q.avg * 20
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  if (weapon.name === '西风猎弓') {
    weaponn = 3 * 2 * 2
  }
  if (weapon.name === '祭礼弓') {
    weaponn = 3 * 3
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 60 - 15 ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  dmgKey: 'dps',
  params: { q: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a = dmg(talent.a['满蓄力瞄准射击'], 'a2')
    let a2 = dmg(talent.a['满蓄力瞄准射击'] * 0.33, 'a2')
    let e = dmg(talent.e['点按伤害'], 'e')
    let q = dmg(talent.q['持续伤害'], 'q')
    let count = cons * 1 >= 1 ? 1 : 0
    let weaponn = 0
    if (weapon.name === '西风猎弓') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼弓') {
      weaponn = 3 * 3
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 60 - 15 ) )
    return {
      dmg: ( a.dmg * 9 + a2.dmg * 9 * 2 * count + e.dmg * 3 + q.dmg * 20 * qcn ) / 18 ,
      avg: ( a.avg * 9 + a2.avg * 9 * 2 * count + e.avg * 3 + q.avg * 20 * qcn ) / 18
    }
  }
},
{
  title: `莫甘娜 ${eNameT}点按伤害`,
  params: { teamA: true , gan: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
},
{
  title: `莫甘娜 ${qNameT}单段伤害`,
  params: { teamA: true , q: true , gan: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
},
{
  title: '温莫甘娜 扩散',
  params: { teamA: true , q: true , gan: true },
  dmg: ({}, { reaction }) => reaction('swirl')

},
{
  title: `温甘纳班 ${eNameT}点按伤害`,
  params: { teamB: true , gan: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
},
{
  title: `温甘纳班 ${qNameT}单段伤害`,
  params: { teamB: true , q: true , gan: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '温迪天赋：[暴风之眼] 风神之诗效果结束后，会为温迪恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 15
  }
},
{
  title: '温迪2命：[眷恋的泠风] 高天之歌会使敌人的风元素抗性与物理抗性降低[_kx]％被高天之歌击飞的敌人在落地前,风元素抗性与物理抗性总计降低[kx]％',
  cons: 2,
  data: {
    _kx: 12,
    kx: 24
  }
},
{
  title: '温迪4命：[自由的凛风] 温迪获取元素晶球或元素微粒后,获得[dmg]%风元素伤害加成',
  cons: 4,
  data: {
    dmg: 25
  }
},
{
  title: '温迪6命：[抗争的暴风] 受风神之诗伤害的敌人,风元素抗性降低[kx]％',
  check: ({ params }) => params.q === true,
  cons: 6,
  data: {
    kx: 20
  }
},
{
  title: '甘雨4命：[西狩] 在降众天华的领域内,敌人受到的伤害会增加至多[dmg]%',
  check: ({ cons, params }) => cons >= 4 && params.gan === true && params.q === true,
  data: {
    dmg: 25
  }
},
{
  title: '莫娜圣遗物：[教官4] 	触发元素反应后。队伍中所有角色元素精通提高[mastery]%点',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    mastery: 120
  }
},
{
  title: '莫娜武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons < 6 && params.teamA === true,
  sort: 1,
  data: {
    mastery: 40
  }
},
{
  title: '莫娜武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons >= 6 && params.teamA === true,
  sort: 1,
  data: {
    mastery: 48
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
  check: ({ params  }) => params.teamA === true,
  data: {
    dmg: 60
  }
},
{
  title: '迪奥娜圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '迪奥娜6命：[猫尾打烊之时] 处在最烈特调领域内的角色,元素精通提升[mastery]点',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    mastery: 200
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
  check: ({ params }) => params.teamB === true,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
  check: ({ params }) => params.teamB === true,
  sort: 7,
  data: {
    mastery: 250
  }
},
{
  title: '纳西妲圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
  check: ({ cons, params }) => params.teamB === true,
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
  }
},
{
  title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons < 6 && params.teamB === true,
  sort: 1,
  data: {
    mastery: 40
  }
},
{
  title: '纳西妲武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons >= 6 && params.teamB === true,
  sort: 1,
  data: {
    mastery: 48
  }
},
{
  title: '纳西妲2命：[正等善见之根] 处于纳西妲施加的蕴种印状态下的敌人,触发燃烧、绽放、超绽放、烈绽放反应伤害能够造成暴击,暴击率固定为[_bloomCpct]%，暴击伤害固定为[_bloomCdmg]%',
  check: ({ params , cons }) => cons >= 2 && params.teamB === true,
  data: {
    _bloomCpct: 20,
    _burningCpct: 20,
    _bloomCdmg: 100,
    _burningCdmg: 100
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
  title: '元素共鸣：[交织之护] 全元素与物理抗性提升[_res]%',
  check: ({ params }) => params.teamB === true,
  data: {
  	_res: 15
  }
},
 'swirl',
{title: `6.17最后修改：[4.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs22ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

