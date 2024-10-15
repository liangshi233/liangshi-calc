import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs103ranking = cfg.gs103ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '音火锻淬'
let eNameT = 'E'
let qName = '豹烈律动！'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '锐锋攫猎'
  eNameT = '音火锻淬'
  qNameT = '豹烈律动！'
 } else if ( NamePath == 3 ) {
  eNameT = '音火锻淬'
  qNameT = '豹烈律动！'
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
const miss = ['f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs103ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'h'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'h'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[希诺宁] 排名规则均未命中，已选择默认排名规则')
      ranking = 'h'
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
 ranking = `${gs103ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}突进伤害`,
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['突进伤害'] *  calc(attr.def) / 100 , 'e,nightsoul')
},
{
  title: `${qName}释放伤害`,
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['技能伤害'] *  calc(attr.def) / 100 , 'q,nightsoul')
},
{
  title: `${qName}单次治疗`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗量2'][0] * calc(attr.def) / 100 + talent.q['持续治疗量2'][1] * 1)
},
{
  title: `${qName}追加伤害`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['追加节拍伤害'] *  calc(attr.def) / 100 , 'q,nightsoul')
},
{
  title: `${eNameT}后${aName}一段`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎一段伤害'] *  calc(attr.def) / 100 , 'a,nightsoul')
},
{
  title: `${eNameT}后${aName}二段`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎二段伤害'] *  calc(attr.def) / 100 , 'a,nightsoul')
},
{
  title: `${eNameT}后${aName}三段`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎三段伤害'] *  calc(attr.def) / 100 , 'a,nightsoul')
},
{
  title: `${eNameT}后${aName}四段`,
  dmgKey: 'a',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎四段伤害'] *  calc(attr.def) / 100 , 'a,nightsoul')
}]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'def,cpct,cdmg,heal'

export const buffs = [
{
  title: '希诺宁天赋：[四境四象回声] 拥有少于两枚经过元素转化的「源音采样」，普通攻击与下落攻击造成的伤害提升[aDmg]%',
  data: {
    aDmg: 30 ,
    a3Dmg: 30
  }
},
{
  title: '希诺宁天赋：[便携铠装护层] 队伍中的附近的角色触发「夜魂迸发」时，防御力提升[_defPct]% { 该效果单人不生效 }',
  data: {
    _defPct: 20
  }
},
{
  title: '希诺宁技能：[音火锻淬] 在采样器激活时降低附近的敌人的对应元素抗性[kx]%',
  data: {
    kx: ({ talent }) => talent.e['元素抗性降低']
  }
},
{
  title: '希诺宁1命：[献予慵眠的休假日] 「源音采样」激活时，提升队伍中附近的当前场上角色的抗打断能力[_interruption]%',
  cons: 1,
  data: {
    _interruption: 50
  }
},
{
  title: '希诺宁2命：[献予灼原的五重奏] 根据「源音采样」的元素类型，使造成的伤害提升[dmg]%',
  cons: 2,
  data: {
    dmg: 50
  }
},
{
  title: '希诺宁4命：[献予午后的花之梦] 施放音火锻淬后，普通攻击、重击与下落攻击造成的伤害提升[aPlus]',
  cons: 4,
  data: {
    aPlus: ({ attr, calc }) => calc(attr.def) * 65 / 100,
    a2Plus: ({ attr, calc }) => calc(attr.def) * 65 / 100,
    a3Plus: ({ attr, calc }) => calc(attr.def) * 65 / 100
  }
},
{
  title: '希诺宁6命：[献予永夜的狂欢舞] 处于夜魂加持状态下时，进行冲刺、腾跃、普通攻击、下落攻击时，无视夜魂加持状态下的限制，并提升普通攻击与下落攻击造成的伤害[aPlus] ',
  cons: 6,
  data: {
    aPlus: ({ attr, calc }) => calc(attr.def) * 300 / 100,
    a3Plus: ({ attr, calc }) => calc(attr.def) * 300 / 100
  }
},
 {title: `9.10最后修改：[9.10重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs103ranking} 更新日志:${renew} 其他信息:${information}`}]

