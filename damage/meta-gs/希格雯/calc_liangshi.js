import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs95ranking = cfg.gs95ranking
let energy = cfg.energymodel
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
const miss = ['a','c', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs95ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'f'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'f'
   }  else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'f'
     }  else if (miss.includes(rankingThreePath)) {
      logger.mark('[希格雯] 排名规则均未命中，已选择默认排名规则')
      ranking = 'f'
     }  else {
       ranking = `${rankingThreePath}`
     }
   }  else {
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
let information = '测试内容:[4.6.51] 数据随时可能更改，请注意时效性'

export const details = [
{
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},
{
  title: `小小关心气泡伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.a['小小关心气泡伤害'], 'a2')
},
{
  title: `${eName}伤害提升值`,
  dmgKey: 'f',
  dmg: ({ calc, attr, cons }) => {
    return {
      avg: Math.max( 0 , Math.min( ( ( calc(attr.hp) - 30000 ) / 1000 * 65 ) , 1800 ) )
    }
  }
},
{
  title: `${eName}水球伤害`,
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
},
{
  title: `${eName}水球蒸发`,
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
},
{
  title: `${eName}水球治疗`,
  dmgKey: 'h',
  dmg: ({ params, cons, talent, attr, calc, weapon }, { heal }) => heal( ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3 )
},
{
  title: `${eName}水球自身治疗`,
  dmg: ({ params, cons, talent, attr, calc, weapon }, { heal }) => heal(calc(attr.hp) * 50 / 100 * 1.3 )
},
{
  title: `${qName}单段伤害`,
  dmgKey: 'q',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
}]

export const defParams = { blPlus: `${BLPlusPath}` , blPct: `${BLPctPath}` }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
    _BondOfLife: ({ params , cons , weapon }) => Math.min( ( params.blPct * ( ( 10 * 2 ) + params.blPlus ) ) , 200 )
  }
},
{
  title: '希格雯技能：[弹跳水疗法] 生命之契被清除时，每清除2000点生命之契将为她恢复[_energyevery]点元素能量。',
  data: {
     _energyevery: 1
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
  title: '希格雯1命：[「最快乐的精灵，可否懂得焦虑」] 弹跳水疗法的激愈水球能额外弹跳3次',
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
    qCpct: ({ calc, attr }) => Math.min( 20 , calc(attr.hp) / 1000 * 0.7 ) ,
    qCdmg: ({ calc, attr }) => Math.min( 110 , calc(attr.hp) / 1000 * 1.6 )
  }
},
 'vaporize',
{title: `4.29最后修改：[4.23重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs95ranking} 更新日志:${renew} 其他信息:${information}`}]
