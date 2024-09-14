import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs100ranking = cfg.gs100ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '出击，冲天转转！'
let eNameT = 'E'
let qName = '现在，认真时间！'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '嵴之啮咬'
  eNameT = '出击，冲天转转！'
  qNameT = '现在，认真时间！'
 } else if ( NamePath == 3 ) {
  eNameT = '出击，冲天转转！'
  qNameT = '现在，认真时间！'
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
const miss = ['z', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs100ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[卡齐娜] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs100ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}搭乘伤害`,
  dmgKey: 'a',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e['冲天转转搭乘伤害'] / 100, 'e,nightsoul')
},
{
  title: `${eName}独立伤害`,
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e['冲天转转独立伤害'] / 100, 'e,nightsoul')
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.q['技能伤害'] / 100, 'q')
},
{
  check: ({ cons }) => cons >= 6,
  title: '护盾替换摧毁伤害',
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.def) * 200 / 100, '')
}]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'def,cpct,cdmg,mastery'

export const buffs = [
{
  title: '卡齐娜天赋：[山的回声] 队伍中的附近的角色触发「夜魂迸发」,岩元素伤害加成提升[dmg]%。',
  data: {
    dmg: 20
  }
},
{
  title: '卡齐娜天赋：[坚岩之重] 冲天转转造成的伤害提升[ePlus]%。',
  sort: 9,
  data: {
    ePlus: ({ calc, attr }) => calc(attr.def) * 20 / 100 ,
    qPlus: ({ calc, attr }) => calc(attr.def) * 20 / 100
  }
},
{
  title: '卡齐娜1命：[晶片，也是一种宝石] 队伍中的角色获取晶片时，将恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    _energyevery: 3
  }
},
{
  title: '卡齐娜4命：[敌人越多，越要小心] 现在，认真时间！的超级钻钻领域中，存在的敌人数量为[_buff]名或更多时，领域中的队伍中当前场上角色的防御力提升[defPct]%',
  cons: 4,
  data: {
    _buff: ({ params }) => ( params.EnemiesNumber || 4 ) ,
    defPct: ({ params }) => 4 * ( ( params.EnemiesNumber || 4 ) + 1 )
  }
},
{
  title: '卡齐娜6命：[这一次，我一定要赢] 队伍中自己的当前场上角色的护盾因任何原因被替换或摧毁时，将造成岩元素范围伤害',
  cons: 6
},
{title: `9.10最后修改：[8.16重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs100ranking} 更新日志:${renew} 其他信息:${information}`}]

