import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs102ranking = cfg.gs102ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '踏鲨破浪'
let eNameT = 'E'
let qName = '爆瀑飞弹'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '降温处理'
  eNameT = '踏鲨破浪'
  qNameT = '爆瀑飞弹'
 }  else if ( NamePath == 3 ) {
  eNameT = '踏鲨破浪'
  qNameT = '爆瀑飞弹'
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
const miss = ['a', 'z', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs102ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[玛拉妮] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs102ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: '鲨鲨撕咬基础伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul')
},
{
  title: '鲨鲨撕咬基础蒸发',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul', 'vaporize')
},
{
  title: '鲨鲨撕咬一层伤害',
  params: { lscn: 1 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul')
},
{
  title: '鲨鲨撕咬二层伤害',
  params: { lscn: 2 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul')
},
{
  title: '巨浪鲨鲨撕咬伤害',
  params: { lscn: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * ( talent.e['鲨鲨撕咬基础伤害'] + talent.e['巨浪鲨鲨撕咬伤害额外提升'] ) / 100, 'a,nightsoul')
},
{
  title: '巨浪鲨鲨撕咬蒸发',
  params: { lscn: 3 },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * ( talent.e['鲨鲨撕咬基础伤害'] + talent.e['巨浪鲨鲨撕咬伤害额外提升'] ) / 100, 'a,nightsoul', 'vaporize')
},
{
  check: ({ cons }) => cons >= 1 && cons < 6,
  title: '1命首次巨浪鲨鲨撕咬蒸发',
  params: { cons1: true , lscn: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * ( talent.e['鲨鲨撕咬基础伤害'] + talent.e['巨浪鲨鲨撕咬伤害额外提升'] ) / 100, 'a,nightsoul', 'vaporize')
},
{
  title: `${qName}伤害`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q,nightsoul')
},
{
  title: `${qName}蒸发`,
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q,nightsoul', 'vaporize')
}]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,cpct,cdmg,mastery'

export const buffs = [
{
  check: ({ params }) => params.lscn !== undefined,
  title: '玛拉妮技能：[踏鲨破浪] 浪势充能使鲨鲨撕咬造成的伤害提升[aPlus],巨浪鲨鲨撕咬伤害额外提升[_aPlus]',
  sort: 9,
  data: {
    aPlus: ({ talent, calc, attr, params }) => calc(attr.hp) * talent.e['浪势充能伤害提升'] / 100 * params.lscn ,
    _aPlus: ({ talent, calc, attr }) => calc(attr.hp) * talent.e['巨浪鲨鲨撕咬伤害额外提升'] / 100
  }
},
{
  title: '玛拉妮天赋：[纳塔最好的向导] 队伍中的附近的角色触发「夜魂迸发」,爆瀑飞弹造成的伤害提升[qPlus]',
  sort: 9,
  data: {
    qPlus: ({ calc, attr }) => calc(attr.hp) * 45 / 100
  }
},
{
  check: ({ params }) => params.cons1 === true,
  title: '玛拉妮1命：[悠闲的「梅兹特利」…] 进入夜魂加持状态后的第一次巨浪鲨鲨撕咬及它所触发的鲨鲨飞弹造成的伤害提升[aPlus]',
  cons: 1,
  sort: 9,
  data: {
    aPlus: ({ calc, attr }) => calc(attr.hp) * 66 / 100
  }
},
{
  title: '玛拉妮4命：[鲨鲨主食是豚豚。] 爆瀑飞弹造成的伤害提升[qDmg]%,获得豚豚球时恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 3 ,
    qDmg: 75
  }
},
{
  title: '玛拉妮6命：[「流泉之众」的精神] 命之座「悠闲的「梅兹特利」…」的伤害提升效果，移除原本每次夜魂加持只能触发一次的限制。',
  cons: 6,
  sort: 9,
  data: {
    aPlus: ({ calc, attr }) => calc(attr.hp) * 66 / 100
  }
},
{title: `9.14最后修改：[8.16重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs102ranking} 更新日志:${renew} 其他信息:${information}`}]

