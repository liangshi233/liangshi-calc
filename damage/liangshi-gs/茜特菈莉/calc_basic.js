import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs107ranking = cfg.gs107ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '霜昼黑星'
let eNameT = 'E'
let qName = '诸曜饬令'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '宿灵捕影'
  eNameT = '霜昼黑星'
  qNameT = '诸曜饬令'
 } else if ( NamePath == 3 ) {
  eNameT = '霜昼黑星'
  qNameT = '诸曜饬令'
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
const miss = ['a', 'z', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs107ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'h'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'h'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[茜特菈莉] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${gs107ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}释放伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['黑曜星魔伤害'], 'e,nightsoul')
},
{
  title: `${eName}释放融化`,
  dmg: ({ talent }, dmg) => dmg(talent.e['黑曜星魔伤害'], 'e,nightsoul', 'melt')
},
{
  title: `${eName}风暴伤害`,
  params: { fb: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['霜陨风暴伤害'], 'e,nightsoul')
},
{
  title: `${eName}护盾量`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['护盾吸收量2'][0] * calc(attr.mastery) / 100 + talent.e['护盾吸收量2'][1] * 1)
},
{
  title: `${qName}释放伤害`,
  params: { fb: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰风暴伤害'], 'q,nightsoul')
},
{
  title: `${qName}释放融化`,
  dmgKey: 'q',
  params: { fb: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰风暴伤害'], 'q,nightsoul', 'melt')
},
{
  title: `${qName}爆炸伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['宿灵之髑伤害'], 'q,nightsoul')
},
{
  check: ({ cons }) => cons >= 1,
  title: '「星刃」基础伤害提升值',
  dmgKey: 'f',
  dmg: ({ calc, attr }) => {
    return {
      avg: calc(attr.mastery) * 200 / 100
    }
  }
}]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '茜特菈莉天赋：[五重天的寒雨] 处于夜魂加持状态下时,触发冻结反应或融化反应后,敌人的抗性降低[kx]%',
  data: {
    kx: 20
  }
},
{
  check: ({ params }) => params.fb === true,
  title: '茜特菈莉天赋：[白燧蝶的星衣] 伊兹帕帕的霜陨风暴造成的伤害提升[ePlus],元素爆发冰风暴造成的伤害提升[qPlus]',
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 90 / 100,
    qPlus: ({ attr, calc }) => calc(attr.mastery) * 1200 / 100
  }
},
{
  title: '茜特菈莉2命：[拒亡者的灵髑] 元素精通提升[mastery],队伍中附近的角色触发冻结反应或融化反应后，抗性额外降低[kx]%',
  cons: 2,
  data: {
    mastery: 125,
    kx: 20
  }
},
{
  title: '茜特菈莉6命：[原动天的密契] 施放元素战技时提供[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: 2.5 * 40
  }
},
 {title: `12.18最后修改：[11.20重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs107ranking} 更新日志:${renew} 其他信息:${information}`}]

