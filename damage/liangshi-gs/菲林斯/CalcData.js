import { Format, LSconfig } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "菲林斯"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, NormalUse: 3, NormalHit: 3, NormalDmg: 3, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, NormalUse: 4, NormalHit: 5, NormalDmg: 5, phy: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['四段伤害2'][0], 'a', 'phy')
      let a2 = dmg(talent.a['四段伤害2'][1], 'a', 'phy')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}五段伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, NormalUse: 3, NormalHit: 3, NormalDmg: 3, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    dmgKey: 'z',
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
  },
  {
    title: `${TalentName.a3Name}期间伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
  },
  {
    title: `低空${TalentName.a3Name}伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
  },
  {
    title: `高空${TalentName.a3Name}伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
  },
  {
    title: `${TalentName.eName}后${TalentName.aNameT}一段伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.e['一段伤害'], 'a')
  },
  {
    title: `${TalentName.eName}后${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.e['二段伤害'], 'a')
  },
  {
    title: `${TalentName.eName}后${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.e['三段伤害'], 'a')
  },
  {
    title: `${TalentName.eName}后${TalentName.aName}四段伤害`,
    params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.e['四段伤害2'][0], 'a')
      let a2 = dmg(talent.e['四段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}后${TalentName.aName}五段伤害`,
    dmgKey: 'a',
    params: { NormalUse: 5, NormalHit: 6, NormalDmg: 6 },
    dmg: ({ talent }, dmg) => dmg(talent.e['五段伤害'], 'a')
  },
  {
    title: `二段${TalentName.eName}伤害`,
    dmgKey: 'e',
    params: { SkillsUse: 2, SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['北国枪阵伤害'], 'e') //实际天赋名称尾有一个空格，后续可能会删除？使用本插件更新的data.json暂时删除了空格
  },
  {
    title: `二段${TalentName.eName}激化`,
    params: { SkillsUse: 2, SkillsHit: 1, SkillsDmg: 1, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['北国枪阵伤害'], 'e', 'aggravate')
  },
  {
    title: `${TalentName.qName}释放伤害`,
    dmgKey: 'q',
    params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能初始伤害'], 'q')
  },
  {
    title: `${TalentName.qName}释放激化`,
    params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能初始伤害'], 'q', 'aggravate')
  },
  {
    title: `${TalentName.qName}单段伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.atk) * talent.q['中间段月感电伤害'] / 100, '', 'lunarCharged')
  },
  {
    title: `${TalentName.qName}尾段伤害`,
    params: { SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.atk) * talent.q['最终段月感电伤害'] / 100, '', 'lunarCharged')
  },
  {
    title: `特殊${TalentName.qName}释放伤害`,
    params: { SkillsUse: 2, SkillsHit: 1, SkillsDmg: 1, BurstUse: 1, EnergyDetermine: 0, EnergyUse: 1, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.atk) * talent.q['雷霆交响伤害'] / 100, '', 'lunarCharged')
  },
  {
    title: `特殊${TalentName.qName}额外伤害`,
    params: { SkillsUse: 2, SkillsHit: 1, SkillsDmg: 1, BurstUse: 1, EnergyDetermine: 0, EnergyUse: 1, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.atk) * talent.q['雷霆交响额外伤害'] / 100, '', 'lunarCharged')
  },
  {
    check: ({ cons }) => cons >= 2,
    title: `${TalentName.c2Name}附加伤害`,
    params: { SkillsUse: 2, SkillsHit: 1, SkillsDmg: 1, BurstUse: 1, EnergyDetermine: 0, EnergyUse: 1, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 50 / 100, '', 'lunarCharged')
  },
  {
    title: '单人月感电伤害',
    dmgKey: 'r',
    params: { SkillsUse: 2, SkillsHit: 1, SkillsDmg: 1, BurstUse: 1, EnergyDetermine: 0, EnergyUse: 1, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({}, { reaction }) => reaction('lunarCharged')
  }
]
