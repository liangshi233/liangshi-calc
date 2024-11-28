import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs106ranking = cfg.gs106ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '称名之刻'
let eNameT = 'E'
let qName = '燔天之时'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '以火织命'
  eNameT = '称名之刻'
  qNameT = '燔天之时'
 }  else if ( NamePath == 3 ) {
  eNameT = '称名之刻'
  qNameT = '燔天之时'
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
if (!cfg.gs106ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[玛薇卡] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs106ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `满战意${eName}释放伤害`,
  params: { q: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e,nightsoul')
},
{
  title: `满战意${eName}持续伤害`,
  dmgKey: 'e',
  params: { q: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['焚曜之环伤害'], 'e,nightsoul')
},
{
  title: `无战意${eNameT}后一段攻击`,
  params: { q: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击一段伤害'], 'a,nightsoul')
},
{
  title: `满战意${eNameT}后一段攻击`,
  params: { q: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击一段伤害'], 'a,nightsoul')
},
{
  title: `无战意${eNameT}后尾段攻击`,
  dmgKey: 'a',
  params: { q: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击五段伤害'], 'a,nightsoul')
},
{
  title: `满战意${eNameT}后尾段攻击`,
  dmgKey: 'a',
  params: { q: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击五段伤害'], 'a,nightsoul')
},
{
  title: `满战意${eNameT}后${a2Name}终结伤害`,
  dmgKey: 'z',
  params: { q: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车重击终结伤害'], 'a2,nightsoul')
},
{
  title: `半战意${qName}释放伤害`,
  params: { q: 100 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `满战意${qName}释放伤害`,
  dmgKey: 'q',
  params: { q: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
}
]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
{
  check: ({ params }) => params.q !== undefined ,
  title: '玛薇卡技能：[燔天之时] 拥有[_buff]战意，坠日斩伤害提升[qPlus]，「古名解放」普通攻击伤害提升[aPlus]，「古名解放」重攻击伤害提升[a2Plus]，抗打断能力提升[_interruption]%',
  sort: 9,
  data: {
    _buff: ({ params }) => params.q ,
    qPlus: ({ params , talent , calc, attr }) => params.q * talent.q['坠日斩伤害提升'] * calc(attr.atk) / 100 ,
    aPlus: ({ params , talent , calc, attr }) => params.q * talent.q['驰轮车普通攻击伤害提升'] * calc(attr.atk) / 100 ,
    a2Plus: ({ params , talent , calc, attr }) => params.q * talent.q['驰轮车重击伤害提升'] * calc(attr.atk) / 100 ,
    _interruption: 100
  }
},
{
  title: '玛薇卡天赋：[炎花献礼] 附近的角色触发「夜魂迸发」时，攻击力提升[atkPct]%',
  data: {
    atkPct: 35
  }
},
{
  check: ({ params }) => params.q !== undefined ,
  title: '玛薇卡天赋：[「基扬戈兹」] 施放元素爆发燔天之时后，拥有[_buff]战意，造成的伤害提升[dmg]%',
  data: {
    _buff: ({ params }) => params.q ,
    dmg: ({ params }) => Math.min( 50 , params.q * 0.25 )
  }
},
{
  title: '玛薇卡1命：[夜主的授记] 通获取战意后，攻击力提升[atkPct]%',
  cons: 1,
  data: {
    atkPct: 40
  }
},
{
  title: '玛薇卡2命：[灰烬的代价] 基础攻击力提升[atkBase]',
  sort: 2,
  cons: 2,
  data: {
    atkBase: 300,
    atkPlus: ({ calc, attr }) => 300 * calc(attr.atk.pct) / 100 + 300
  }
},
{
  title: '玛薇卡2命：[灰烬的代价] 根据诸火武装的形态使附近的敌人的防御力降低[eEnemyDef]%普通攻击伤害提升[aPlus]重击伤害提升[a2Plus]',
  sort: 9,
  cons: 2,
  data: {
    eEnemyDef: 20,
    aPlus: ({ calc, attr }) => calc(attr.atk) * 100 / 100 ,
    a2Plus: ({ calc, attr }) => calc(attr.atk) * 150 / 100
  }
},
 {title: `11.28最后修改：[11.20重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs106ranking} 更新日志:${renew} 其他信息:${information}`}]

