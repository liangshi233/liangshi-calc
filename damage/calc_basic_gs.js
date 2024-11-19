import { Format, LSconfig } from '#liangshi'

/*

暂不支持非攻击力模型的角色伤害
暂不支持非攻生命模型的角色护盾
暂不支持非攻生命模型的角色治疗
暂不支持带有复杂或多段的伤害
暂不支持强化重击强化普攻

*/
let cfg = LSconfig.getConfig('user', 'config')
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '元素战技'
let eNameT = 'E'
let qName = '元素爆发'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '普通攻击'
  eNameT = '元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 3 ) {
  eNameT = '元素战技'
  qNameT = '元素爆发'
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
const miss = ['dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if ( rankingOnePath == 'm' ) {
 ranking = 'a'
} else if (miss.includes(rankingOnePath)) {
  if ( rankingTwoPath == 'm' ) {
   ranking = 'a'
  }  else if (miss.includes(rankingTwoPath)) {
    if ( rankingThreePath == 'm' ) {
     ranking = 'a'
    } else if (miss.includes(rankingThreePath)) {
     logger.mark('[通用] 排名规则均未命中，已选择默认排名规则')
     ranking = 'a'
    } else {
      ranking = `${rankingThreePath}`
    }
  }  else {
    ranking = `${rankingTwoPath}`
  }
} else {
 ranking = `${rankingOnePath}`
}

if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '通用计算，暂不提供buff计算，请安装拓展'

export const details = [
{
  check: ({ talent , weaponTypeName }) => talent.a['一段伤害'] && ['法器'].includes(weaponTypeName),
  title: `${aName}一段元素伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  check: ({ talent , weaponTypeName }) => talent.a['一段伤害'] && !['法器'].includes(weaponTypeName),
  title: `${aName}一段物理伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  check: ({ talent , weaponTypeName , element }) => talent.a['一段伤害'] && ['法器'].includes(weaponTypeName) && (element === '火' || element === '水'),
  title: `${aName}一段蒸发`,
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  check: ({ talent , weaponTypeName , element }) => talent.a['一段伤害'] && ['法器'].includes(weaponTypeName) && (element === '火' || element === '冰'),
  title: `${aName}一段融化`,
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'melt')
},
{
  check: ({ talent , weaponTypeName , element }) => talent.a['一段伤害'] && ['法器'].includes(weaponTypeName) && (element === '草' || element === '雷'),
  title: `${aName}一段激化`,
  dmg: ({ talent , element }, dmg ) => {
    let elementConfig = element == '草' ? 'spread' : 'aggravate'
    let aDmg = dmg(talent.a['一段伤害'], 'a', `${elementConfig}`)
    return aDmg
  }
},
{
  check: ({ talent }) => (talent.a['重击终结伤害'] || talent.a['满蓄力瞄准射击'] || talent.a['重击伤害'] || talent.a['一段蓄力瞄准射击']),
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent, attr , weaponTypeName }, dmg ) => {
    let a2Tal = ['双手剑'].includes(weaponTypeName) ? talent.a['重击终结伤害'] : (['弓'].includes(weaponTypeName) ? (!talent.a['满蓄力瞄准射击'] ? talent.a['一段蓄力瞄准射击'] : talent.a['满蓄力瞄准射击']) : talent.a['重击伤害'])
    let a2Dmg = dmg(a2Tal, 'a2')
    let a2Phy = dmg(a2Tal, 'a2', 'phy')
    let a2Config = ['法器'].includes(weaponTypeName) ? a2Dmg : (['弓'].includes(weaponTypeName) ? a2Dmg : a2Phy)
    return a2Config
  }
},
{
  check: ({ talent }) => talent.e['技能伤害'] || talent.e['点按伤害'],
  title: `${eName}发动伤害`,
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg ) => {
    let eTal = !talent.e['技能伤害'] ? talent.e['点按伤害'] : talent.e['技能伤害']
    let eDmg = dmg(eTal, 'e')
    return eDmg
  }
},
{
  check: ({ talent }) => talent.e['长按伤害'],
  title: `${eName}长按伤害`,
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['长按伤害'], 'e')
},
{
  check: ({ talent }) => talent.e['护盾基础吸收量2'] || talent.e['护盾吸收量2'] || talent.e['吸收量2'],
  title: `${eName}护盾量`,
  dmg: ({ talent, attr, calc }, { shield }) => {
    let eTal = !talent.e['护盾基础吸收量2'] ? (!talent.e['护盾吸收量2'] ? talent.e['吸收量2'] : talent.e['护盾吸收量2']) : talent.e['护盾基础吸收量2']
    let eShield = shield(eTal[0] * calc(attr.hp) / 100 + eTal[1] * 1)
    return eShield
  }
},
{
  title: `${eName}发动治疗`,
  check: ({ talent }) => talent.e['技能发动治疗量2'] || talent.e['治疗量2'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let eTal = !talent.e['技能发动治疗量2'] ? talent.e['治疗量2'] : talent.e['技能发动治疗量2']
    let eHealE = heal(eTal[0] * calc(attr.hp) / 100 + eTal[1] * 1 )
    return eHealE
  }
},
{
  title: `${eName}持续治疗`,
  check: ({ talent }) => talent.e['持续治疗量2'] || talent.e['持续回复量2'] || talent.e['持续治疗2'] || talent.e['治疗量2'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let eTal = !talent.e['持续治疗量2'] ? (!talent.e['持续回复量2'] ? (!talent.e['持续治疗2'] ? talent.e['治疗量2'] : talent.e['持续治疗2']) : talent.e['持续回复量2']) : talent.e['持续治疗量2']
    let eHealET = heal(eTal[0] * calc(attr.hp) / 100 + eTal[1] * 1 )
    return eHealET
  }
},
{
  title: `${eName}命中治疗`,
  check: ({ talent }) => talent.e['命中治疗量2'] || talent.e['治疗量2'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let eTal = !talent.e['命中治疗量2'] ? talent.e['治疗量2'] : talent.e['命中治疗量2']
    let eHealA = heal(eTal[0] * calc(attr.hp) / 100 + eTal[1] * 1)
    return eHealA
  }
},
{
  check: ({ talent }) => talent.e['一段伤害'],
  title: `${eNameT}后${aName}一段伤害`,
  dmg: ({ talent }, dmg ) => dmg(talent.e['一段伤害'], 'a')
},
{
  check: ({ talent , element }) => talent.e['一段伤害'] && (element === '火' || element === '水'),
  title: `${eNameT}后${aName}一段蒸发`,
  dmg: ({ talent }, dmg ) => dmg(talent.e['一段伤害'], 'a', 'vaporize')
},
{
  check: ({ talent , element }) => talent.e['一段伤害'] && (element === '火' || element === '冰'),
  title: `${eNameT}后${aName}一段蒸发`,
  dmg: ({ talent }, dmg ) => dmg(talent.e['一段伤害'], 'a', 'melt')
},
{
  check: ({ talent , element }) => talent.e['一段伤害'] && (element === '草' || element === '雷'),
  title: `${eNameT}后${aName}一段激化`,
  dmg: ({ talent , element }, dmg ) => {
    let elementConfig = element == '草' ? 'spread' : 'aggravate'
    let eaDmg = dmg(talent.e['一段伤害'], 'a', `${elementConfig}`)
    return eaDmg
  }
},
{
  check: ({ talent }) => talent.q['技能伤害'],
  title: `${qName}发动伤害`,
  dmgKey: 'q',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  check: ({ talent }) => talent.q['护盾基础吸收量2'] || talent.q['护盾吸收量2'] || talent.q['吸收量2'],
  title: `${eName}护盾量`,
  dmg: ({ talent, attr, calc }, { shield }) => {
    let qTal = !talent.q['护盾基础吸收量2'] ? (!talent.q['护盾吸收量2'] ? talent.q['吸收量2'] : talent.q['护盾吸收量2']) : talent.q['护盾基础吸收量2']
    let qShield = shield(qTal[0] * calc(attr.hp) / 100 + qTal[1] * 1)
    return qShield
  }
},
{
  title: `${qName}发动治疗`,
  check: ({ talent }) => talent.q['技能发动治疗量2'] || talent.q['治疗量2'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let qTal = !talent.q['技能发动治疗量2'] ? talent.q['治疗量2'] : talent.q['技能发动治疗量2']
    let qHealE = heal(qTal[0] * calc(attr.hp) / 100 + qTal[1] * 1 )
    return qHealE
  }
},
{
  title: `${qName}持续治疗`,
  check: ({ talent }) => talent.q['持续治疗量2'] || talent.q['持续回复量2'] || talent.q['持续治疗2'] || talent.q['治疗量2'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let qTal = !talent.q['持续治疗量2'] ? (!talent.q['持续回复量2'] ? (!talent.q['持续治疗2'] ? talent.q['治疗量2'] : talent.q['持续治疗2']) : talent.q['持续回复量2']) : talent.q['持续治疗量2']
    let qHealET = heal(qTal[0] * calc(attr.hp) / 100 + qTal[1] * 1 )
    return qHealET
  }
},
{
  title: `${qName}命中治疗`,
  check: ({ talent }) => talent.q['命中治疗量2'] || talent.q['治疗量2'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let qTal = !talent.q['命中治疗量2'] ? talent.q['治疗量2'] : talent.q['命中治疗量2']
    let qHealA = heal(qTal[0] * calc(attr.hp) / 100 + qTal[1] * 1)
    return qHealA
  }
},
{
  check: ({ talent }) => talent.q['一段伤害'],
  title: `${qNameT}后${aName}一段伤害`,
  dmg: ({ talent }, dmg ) => dmg(talent.q['一段伤害'], 'a')
},
{
  check: ({ talent , element }) => talent.q['一段伤害'] && (element === '火' || element === '水'),
  title: `${qNameT}后${aName}一段蒸发`,
  dmg: ({ talent }, dmg ) => dmg(talent.q['一段伤害'], 'a', 'vaporize')
},
{
  check: ({ talent ,  element }) => talent.q['一段伤害'] && (element === '火' || element === '冰'),
  title: `${qNameT}后${aName}一段蒸发`,
  dmg: ({ talent }, dmg ) => dmg(talent.q['一段伤害'], 'a', 'melt')
},
{
  check: ({ talent , element }) => talent.q['一段伤害'] && (element === '草' || element === '雷'),
  title: `${qNameT}后${aName}一段激化`,
  dmg: ({ talent , element }, dmg ) => {
    let elementConfig = element == '草' ? 'spread' : 'aggravate'
    let qaDmg = dmg(talent.q['一段伤害'], 'a', `${elementConfig}`)
    return qaDmg
  }
},
{
  check: ({ element }) => element !== '草' && element !== '岩',
  title: '扩散反应伤害',
  dmg: ({}, { reaction }) => reaction('swirl')
},
{
  check: ({ element }) => element === '草' || element === '火',
  title: '燃烧反应伤害',
  dmg: ({}, { reaction }) => reaction('burning')
},
{
  check: ({ element }) => element === '雷' || element === '冰',
  title: '超导反应伤害',
  dmg: ({}, { reaction }) => reaction('superConduct')
},
{
  check: ({ element }) => element === '雷' || element === '水',
  title: '感电反应伤害',
  dmg: ({}, { reaction }) => reaction('electroCharged')
},
{
  check: ({ element }) => element === '雷' || element === '火',
  title: '超载反应伤害',
  dmg: ({}, { reaction }) => reaction('overloaded')
},
{
  check: ({ element , weaponTypeName }) => element === '岩' || !['法器'].includes(weaponTypeName),
  title: '碎冰反应伤害',
  dmg: ({}, { reaction }) => reaction('shatter')
},
{
  check: ({ element }) => element === '水' || element === '草',
  title: '草原核伤害',
  dmg: ({}, { reaction }) =>  reaction('bloom')
},
{
  check: ({ element }) => element === '雷' || element === '风',
  title: '超绽放伤害',
  dmg: ({}, { reaction }) => reaction('hyperBloom')
},
{
  check: ({ element }) => element === '火' || element === '风',
  title: '烈绽放伤害',
  dmg: ({}, { reaction }) => reaction('burgeon')
}
]

export const defParams = { blPlus: `${BLPlusPath}` , blPct: `${BLPctPath}` }
export const defDmgKey = `${ranking}`
export const mainAttr = 'cpct,cdmg,mastery'

export const buffs = [{title: `11.18最后修改：[10.19重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 更新日志:${renew} 其他信息:${information}`}]

export const createdBy = 'liangshicalc 通用'
