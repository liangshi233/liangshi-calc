import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../resources/CalcBuff/index.js'
import path from 'node:path'
import fs from 'node:fs'

/*
暂不支持复合模型的角色伤害
暂不支持复合模型的角色护盾
暂不支持复合模型的角色治疗
暂不支持带有复杂或多段的伤害
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
if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '普通攻击'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 3) {
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 4) {
    eName = '元素战技'
    qName = '元素爆发'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 5) {
    aName = '普攻'
    a3Name = '下落'
    eName = 'E技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
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
if (rankingOnePath == 'm') {
  ranking = 'a'
} else if (miss.includes(rankingOnePath)) {
  if (rankingTwoPath == 'm') {
    ranking = 'a'
  } else if (miss.includes(rankingTwoPath)) {
    if (rankingThreePath == 'm') {
      ranking = 'a'
    } else if (miss.includes(rankingThreePath)) {
      logger.mark('[通用] 排名规则均未命中，已选择默认排名规则')
      ranking = 'a'
    } else {
      ranking = `${rankingThreePath}`
    }
  } else {
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
let typeName
let characterData
let namejsonPath = null

const calcTypeMap = {
  '生命值上限': 'hp',
  '攻击力': 'atk',
  '防御力': 'def',
  '暴击率': 'cpct',
  '暴击伤害': 'cdmg',
  '元素伤害': 'dmg',
  '护盾强效': 'shield',
  '治疗加成': 'heal',
  '元素精通': 'mastery',
  '': 'atk'
}

export const details = [
  {
    title: '角色养成度',
    dmg: ({ characterName, level, talent }) => {
      typeName = characterName;
      if (!typeName) {
        console.error('角色名字获取失败，请更新miao-plugin');
        typeName = 'TxtCharName';
        console.error('伤害将默认使用攻击力计算且不会进行buff计算');
      } else {
        try {
          let jsonPath = path.join(process.cwd(), `plugins/miao-plugin/resources/meta-gs/character/${typeName}/data.json`);
          namejsonPath = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        } catch (err) {
          console.error('data.json异常\n', err);
          console.error('伤害将默认使用攻击力计算且不会进行buff计算');
        }
      }
       if (typeof level !== 'number' || !talent || !talent.talentLevel || typeof talent.talentLevel.a !== 'number' || typeof talent.talentLevel.e !== 'number' || typeof talent.talentLevel.q !== 'number') {
       console.error('Level or Talent levels are not valid numbers');
       return {
        avg: '0.00%',
        type: 'text'
       };
      }

      let baseScore = level * (2 / 9);
      let totalTalentLevel = talent.talentLevel.a + talent.talentLevel.e + talent.talentLevel.q;
      let talentScore = Math.min(29, totalTalentLevel) * (20 / 17);
      let extraScore = Math.min(2, Math.max(0, totalTalentLevel - 29)) * (20 / 17 / 2);
      let score = baseScore + talentScore + extraScore;
  
      console.log(`Level: ${level}, Base Score: ${baseScore}`);
      console.log(`Talent Levels: A=${talent.talentLevel.a}, E=${talent.talentLevel.e}, Q=${talent.talentLevel.q}`);
      console.log(`Talent Score: ${talentScore}, Extra Score: ${extraScore}, Total Score: ${score}`);
  
   
      const maxScore = 66.47; 
      let percentage = (score / maxScore) * 100;
      percentage = Math.min(100, Math.max(0, percentage)); 
  
      return {
        avg: `${percentage.toFixed(2)}%`, 
      };
     }
    },
  {
    check: ({ talent, weaponTypeName }) => talent?.a?.['一段伤害'] && ['法器'].includes(weaponTypeName),
    title: `${aName}一段元素伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent?.a?.['一段伤害'], 'a')
  },
  {
    check: ({ talent, weaponTypeName }) => talent?.a?.['一段伤害'] && !['法器'].includes(weaponTypeName),
    title: `${aName}一段物理伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent?.a?.['一段伤害'], 'a', 'phy')
  },
  {
    check: ({ talent, weaponTypeName, element }) => talent?.a?.['一段伤害'] && ['法器'].includes(weaponTypeName) && ['火', '水'].includes(element),
    title: `${aName}一段蒸发`,
    dmg: ({ talent }, dmg) => dmg(talent?.a?.['一段伤害'], 'a', 'vaporize')
  },
  {
    check: ({ talent, weaponTypeName, element }) => talent?.a?.['一段伤害'] && ['法器'].includes(weaponTypeName) && ['火', '冰'].includes(element),
    title: `${aName}一段融化`,
    dmg: ({ talent }, dmg) => dmg(talent?.a?.['一段伤害'], 'a', 'melt')
  },
  {
    check: ({ talent, weaponTypeName, element }) => talent?.a?.['一段伤害'] && ['法器'].includes(weaponTypeName) && ['草', '雷'].includes(element),
    title: `${aName}一段激化`,
    dmg: ({ talent, element }, dmg) => {
      let elementConfig = element == '草' ? 'spread' : 'aggravate'
      let aDmg = dmg(talent?.a?.['一段伤害'], 'a', `${elementConfig}`)
      return aDmg
    }
  },
  {
    check: ({ talent, weaponTypeName }) => talent?.a?.['重击终结伤害'] || talent?.a?.['满蓄力瞄准射击'] || talent?.a?.['重击伤害'] || talent?.a?.['一段蓄力瞄准射击'],
    title: `${a2Name}伤害`,
    dmgKey: 'z',
    dmg: ({ talent, weaponTypeName, calc, attr }, { basic }) => {
      let a2Tal = ['双手剑'].includes(weaponTypeName) ? talent?.a?.['重击终结伤害'] : (['弓'].includes(weaponTypeName) ? (!talent?.a?.['满蓄力瞄准射击'] ? talent?.a?.['一段蓄力瞄准射击'] : talent?.a?.['满蓄力瞄准射击']) : talent?.a?.['重击伤害'])
      let calcType = ['双手剑'].includes(weaponTypeName) ? '重击终结伤害' : (['弓'].includes(weaponTypeName) ? (!talent?.a?.['满蓄力瞄准射击'] ? '一段蓄力瞄准射击' : '满蓄力瞄准射击') : '重击伤害')
      let calcTypeConfig = namejsonPath?.talent?.a.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let a2Dmg = basic(a2Tal * calcType / 100, 'a2')
      let a2Phy = basic(a2Tal * calcType / 100, 'a2', 'phy')
      let a2Config = ['法器', '弓'].includes(weaponTypeName) ? a2Dmg : a2Phy
      return a2Config
    }
  },
  {
    check: ({ talent }) => talent?.a?.['一段蓄力瞄准射击'],
    title: `${a2Name}二段蓄力伤害`,
    dmgKey: 'z',
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcTypeConfig = namejsonPath?.talent?.a.tables
      let a2z2Name
      for (let i = 0; i < calcTypeConfig.length; i++) {
        if (calcTypeConfig[i].name === "一段蓄力瞄准射击") {
          if (i + 1 < calcTypeConfig.length) {
            a2z2Name = calcTypeConfig[i + 1].name
            break
          } else {
            console.log("二段蓄力计算错误")
            a2z2Name = talent?.a?.['一段蓄力瞄准射击']
          }
        }
      }
      let a2Tal = talent?.a?.[`${a2z2Name}`]
      let calcType = a2z2Name
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let a2Dmg = basic(a2Tal * calcType / 100, 'a2')
      return a2Dmg
    }
  },
  {
    check: ({ talent }) => talent?.e?.['技能伤害'] || talent?.e?.['点按伤害'],
    title: `${eName}发动伤害`,
    dmgKey: 'e',
    dmg: ({ talent, calc, attr }, { basic }) => {
      let eTal = !talent?.e?.['技能伤害'] ? talent?.e?.['点按伤害'] : talent?.e?.['技能伤害']
      let calcType = !talent?.e?.['技能伤害'] ? '点按伤害' : '技能伤害'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let eDmg = basic(eTal * calcType / 100, 'e')
      return eDmg
    }
  },
  {
    check: ({ talent }) => talent?.e?.['长按伤害'],
    title: `${eName}长按伤害`,
    dmg: ({ talent, attr, calc }, { basic }) => {
      let calcType = '长按伤害'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let eDmg = basic(talent?.e?.['长按伤害'] * calcType / 100, 'e')
      return eDmg
    }
  },
  {
    check: ({ talent }) => talent?.e?.['护盾基础吸收量2'] || talent?.e?.['护盾吸收量2'] || talent?.e?.['吸收量2'],
    title: `${eName}护盾量`,
    dmg: ({ talent, attr, calc }, { shield }) => {
      let eTal = !talent?.e?.['护盾基础吸收量2'] ? (!talent?.e?.['护盾吸收量2'] ? talent?.e?.['吸收量2'] : talent?.e?.['护盾吸收量2']) : talent?.e?.['护盾基础吸收量2']
      let calcType = talent?.e?.['护盾基础吸收量2'] ? (!talent?.e?.['护盾吸收量2'] ? '吸收量2' : '护盾吸收量2') : '护盾基础吸收量2'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let eShield = shield(eTal[0] * calcType / 100 + eTal[1] * 1)
      return eShield
    }
  },
  {
    title: `${eName}发动治疗`,
    check: ({ talent }) => talent?.e?.['技能发动治疗量2'] || talent?.e?.['治疗量2'],
    dmg: ({ talent, calc, attr }, { heal }) => {
      let eTal = !talent?.e?.['技能发动治疗量2'] ? talent?.e?.['治疗量2'] : talent?.e?.['技能发动治疗量2']
      let calcType = !talent?.e?.['技能发动治疗量2'] ? '治疗量2' : '技能发动治疗量2'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let eHealE = heal(eTal[0] * calcType / 100 + eTal[1] * 1)
      return eHealE
    }
  },
  {
    title: `${eName}持续治疗`,
    check: ({ talent }) => talent?.e?.['持续治疗量2'] || talent?.e?.['持续回复量2'] || talent?.e?.['持续治疗2'] || talent?.e?.['治疗量2'],
    dmg: ({ talent, calc, attr }, { heal }) => {
      let eTal = !talent?.e?.['持续治疗量2'] ? (!talent?.e?.['持续回复量2'] ? (!talent?.e?.['持续治疗2'] ? talent?.e?.['治疗量2'] : talent?.e?.['持续治疗2']) : talent?.e?.['持续回复量2']) : talent?.e?.['持续治疗量2']
      let calcType = !talent?.e?.['持续治疗量2'] ? (!talent?.e?.['持续回复量2'] ? (!talent?.e?.['持续治疗2'] ? '治疗量2' : '持续治疗2') : '持续回复量2') : '持续治疗量2'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let eHealET = heal(eTal[0] * calcType / 100 + eTal[1] * 1)
      return eHealET
    }
  },
  {
    title: `${eName}命中治疗`,
    check: ({ talent }) => talent?.e?.['命中治疗量2'] || talent?.e?.['治疗量2'],
    dmg: ({ talent, calc, attr }, { heal }) => {
      let eTal = !talent?.e?.['命中治疗量2'] ? talent?.e?.['治疗量2'] : talent?.e?.['命中治疗量2']
      let calcType = !talent?.e?.['命中治疗量2'] ? '治疗量2' : '命中治疗量2'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let eHealA = heal(eTal[0] * calcType / 100 + eTal[1] * 1)
      return eHealA
    }
  },
  {
    check: ({ talent }) => talent?.e?.['一段伤害'],
    title: `${eNameT}后${aName}一段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcType = '一段伤害'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let ea1Dmg = basic(talent?.e?.['一段伤害'] * calcType / 100, 'a')
      return ea1Dmg
    }
  },
  {
    check: ({ talent, element }) => talent?.e?.['一段伤害'] && ['水', '火'].includes(element),
    title: `${eNameT}后${aName}一段蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcType = '一段伤害'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let ea1Dmg = basic(talent?.e?.['一段伤害'] * calcType / 100, 'a', 'vaporize')
      return ea1Dmg
    }
  },
  {
    check: ({ talent, element }) => talent?.e?.['一段伤害'] && ['冰', '火'].includes(element),
    title: `${eNameT}后${aName}一段融化`,
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcType = '一段伤害'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let ea1Dmg = basic(talent?.e?.['一段伤害'] * calcType / 100, 'a', 'melt')
      return ea1Dmg
    }
  },
  {
    check: ({ talent, element }) => talent?.e?.['一段伤害'] && ['雷', '草'].includes(element),
    title: `${eNameT}后${aName}一段激化`,
    dmg: ({ talent, calc, attr, element }, { basic }) => {
      let elementConfig = element == '草' ? 'spread' : 'aggravate'
      let calcType = '一段伤害'
      let calcTypeConfig = namejsonPath?.talent?.e.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let eaDmg = basic(talent?.e?.['一段伤害'] * calcType / 100, 'a', `${elementConfig}`)
      return eaDmg
    }
  },
  {
    check: ({ talent }) => talent?.q?.['技能伤害'],
    title: `${qName}发动伤害`,
    dmgKey: 'q',
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcType = '技能伤害'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qDmg = basic(talent?.q?.['技能伤害'] * calcType / 100, 'a')
      return qDmg
    }
  },
  {
    check: ({ talent }) => talent?.q?.['护盾基础吸收量2'] || talent?.q?.['护盾吸收量2'] || talent?.q?.['吸收量2'],
    title: `${eName}护盾量`,
    dmg: ({ talent, attr, calc }, { shield }) => {
      let qTal = !talent?.q?.['护盾基础吸收量2'] ? (!talent?.q?.['护盾吸收量2'] ? talent?.q?.['吸收量2'] : talent?.q?.['护盾吸收量2']) : talent?.q?.['护盾基础吸收量2']
      let calcType = !talent?.q?.['护盾基础吸收量2'] ? (!talent?.q?.['护盾吸收量2'] ? '吸收量2' : '护盾吸收量2') : '护盾基础吸收量2'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qShield = shield(qTal[0] * calcType / 100 + qTal[1] * 1)
      return qShield
    }
  },
  {
    title: `${qName}发动治疗`,
    check: ({ talent }) => talent?.q?.['技能发动治疗量2'] || talent?.q?.['治疗量2'],
    dmg: ({ talent, calc, attr }, { heal }) => {
      let qTal = !talent?.q?.['技能发动治疗量2'] ? talent?.q?.['治疗量2'] : talent?.q?.['技能发动治疗量2']
      let calcType = !talent?.q?.['技能发动治疗量2'] ? '治疗量2' : '技能发动治疗量2'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qHealE = heal(qTal[0] * calcType / 100 + qTal[1] * 1)
      return qHealE
    }
  },
  {
    title: `${qName}持续治疗`,
    check: ({ talent }) => talent?.q?.['持续治疗量2'] || talent?.q?.['持续回复量2'] || talent?.q?.['持续治疗2'] || talent?.q?.['治疗量2'],
    dmg: ({ talent, calc, attr }, { heal }) => {
      let qTal = !talent?.q?.['持续治疗量2'] ? (!talent?.q?.['持续回复量2'] ? (!talent?.q?.['持续治疗2'] ? talent?.q?.['治疗量2'] : talent?.q?.['持续治疗2']) : talent?.q?.['持续回复量2']) : talent?.q?.['持续治疗量2']
      let calcType = !talent?.q?.['持续治疗量2'] ? (!talent?.q?.['持续回复量2'] ? (!talent?.q?.['持续治疗2'] ? '治疗量2' : '持续治疗2') : '持续回复量2') : '持续治疗量2'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qHealET = heal(qTal[0] * calcType / 100 + qTal[1] * 1)
      return qHealET
    }
  },
  {
    title: `${qName}命中治疗`,
    check: ({ talent }) => talent?.q?.['命中治疗量2'] || talent?.q?.['治疗量2'],
    dmg: ({ talent, calc, attr }, { heal }) => {
      let qTal = !talent?.q?.['命中治疗量2'] ? talent?.q?.['治疗量2'] : talent?.q?.['命中治疗量2']
      let calcType = !talent?.q?.['命中治疗量2'] ? '治疗量2' : '命中治疗量2'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qHealA = heal(qTal[0] * calcType / 100 + qTal[1] * 1)
      return qHealA
    }
  },
  {
    check: ({ talent }) => talent?.q?.['一段伤害'],
    title: `${qNameT}后${aName}一段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcType = '一段伤害'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qa1Dmg = basic(talent?.q?.['一段伤害'] * calcType / 100, 'a')
      return qa1Dmg
    }
  },
  {
    check: ({ talent, element }) => talent?.q?.['一段伤害'] && ['水', '火'].includes(element),
    title: `${qNameT}后${aName}一段蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcType = '一段伤害'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qa1Dmg = basic(talent?.q?.['一段伤害'] * calcType / 100, 'a', 'vaporize')
      return qa1Dmg
    }
  },
  {
    check: ({ talent, element }) => talent?.q?.['一段伤害'] && ['冰', '火'].includes(element),
    title: `${qNameT}后${aName}一段融化`,
    dmg: ({ talent, calc, attr }, { basic }) => {
      let calcType = '一段伤害'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qa1Dmg = basic(talent?.q?.['一段伤害'] * calcType / 100, 'a', 'melt')
      return qa1Dmg
    }
  },
  {
    check: ({ talent, element }) => talent?.q?.['一段伤害'] && ['雷', '草'].includes(element),
    title: `${qNameT}后${aName}一段激化`,
    dmg: ({ talent, element, calc, attr }, { basic }) => {
      let calcType = '一段伤害'
      let elementConfig = element == '草' ? 'spread' : 'aggravate'
      let calcTypeConfig = namejsonPath?.talent?.q.tables.find(table => table.name === calcType)
      if (calcTypeConfig) {
        calcType = calcTypeMap[calcTypeConfig.unit]
        calcType = !calcType ? calc(attr.atk) : calc(attr[calcType])
      } else {
        calcType = calc(attr.atk)
      }
      let qaDmg = basic(talent?.q?.['一段伤害'] * calcType / 100, 'a', `${elementConfig}`)
      return qaDmg
    }
  },
  {
    check: ({ element }) => !['岩', '草'].includes(element),
    title: '扩散反应伤害',
    dmg: ({}, { reaction }) => reaction('swirl')
  },
  {
    check: ({ element }) => ['草', '火'].includes(element),
    title: '燃烧反应伤害',
    dmg: ({}, { reaction }) => reaction('burning')
  },
  {
    check: ({ element }) => ['冰', '雷'].includes(element),
    title: '超导反应伤害',
    dmg: ({}, { reaction }) => reaction('superConduct')
  },
  {
    check: ({ element }) => ['水', '雷'].includes(element),
    title: '感电反应伤害',
    dmg: ({}, { reaction }) => reaction('electroCharged')
  },
  {
    check: ({ element }) => ['雷', '火'].includes(element),
    title: '超载反应伤害',
    dmg: ({}, { reaction }) => reaction('overloaded')
  },
  {
    check: ({ element, weaponTypeName }) => ['岩'].includes(element) || !['法器'].includes(weaponTypeName),
    title: '碎冰反应伤害',
    dmg: ({}, { reaction }) => reaction('shatter')
  },
  {
    check: ({ element }) => ['草', '水'].includes(element),
    title: '草原核伤害',
    dmg: ({}, { reaction }) => reaction('bloom')
  },
  {
    check: ({ element }) => ['风', '雷'].includes(element),
    title: '超绽放伤害',
    dmg: ({}, { reaction }) => reaction('hyperBloom')
  },
  {
    check: ({ element }) => ['火', '风'].includes(element),
    title: '烈绽放伤害',
    dmg: ({}, { reaction }) => reaction('burgeon')
  }
]

export const defParams = {
  blPlus: `${BLPlusPath}`,
  blPct: `${BLPctPath}`
}
export const defDmgKey = `${ranking}`
export const mainAttr = 'cpct,cdmg,mastery'

export const buffs = [characterBuffGs, enemyBuffGs, ImaginariumBuff,
  {
    title: `1.15最后修改：[10.19重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 更新日志:${renew} 其他信息:${information}`
  }
]

export const createdBy = 'liangshi 通用'
