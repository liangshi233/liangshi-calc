import { LSconfig } from '#liangshi'

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
const miss = ['a', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
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
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
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
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
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
  title: '扩散反应伤害',
  dmg: ({}, { reaction }) => reaction('swirl')
},
{
  title: `莫甘娜 ${eNameT}点按伤害`,
  params: { teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
},
{
  title: `莫甘娜 ${qNameT}单段伤害`,
  params: { teamA: true , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
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
  check: ({ cons, params }) => cons >= 4 && params.teamA === true && params.q === true,
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
  title: '元素共鸣：[粉碎之冰] 攻击处于冰元素附着或冻结下的敌人时,暴击率提高[cpct]%',
  check: ({ params }) => params.teamA === true,
  data: {
    cpct: 15
  }
},
{title: `6.16最后修改：[4.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs22ranking} 更新日志:${renew} 其他信息:${information}`}]
