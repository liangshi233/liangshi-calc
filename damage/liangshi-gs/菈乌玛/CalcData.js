import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "菈乌玛"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    dmgKey: 'z',
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['唤灵之祷伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}期间伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
  },
  {
    title: `低空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
  },
  {
    title: `高空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
  },
  {
    title: `点按${TalentName.eName}伤害`,
    params: { SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
  },
  {
    title: `长按${TalentName.eName}一段`,
    params: { SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['长按一段伤害'], 'e')
  },
  {
    title: `长按${TalentName.eName}二段单枚`,
    params: { SkillsHit: 3, SkillsDmg: 3, Lunar: true },
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.mastery) * talent.e['长按二段伤害'] / 100, '', 'lunarBloom')
  },
  {
    title: `满辉${TalentName.eName}二段单枚`,
    dmgKey: 'e',
    params: { SkillsHit: 3, SkillsDmg: 3, Moonsign: 3, Lunar: true },
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.mastery) * talent.e['长按二段伤害'] / 100, '', 'lunarBloom')
  },
  {
    title: `${TalentName.eName}圣域伤害`,
    params: { SkillsHit: 3, SkillsDmg: 3, Linnunrata: true },
    dmg: ({ talent, calc, attr }, { basic }) => basic(((calc(attr.mastery) * talent.e['霜林圣域攻击伤害2'][1]) + (calc(attr.atk) * talent.e['霜林圣域攻击伤害2'][0])) / 100, 'e')
  },
  {
    check: ({ cons }) => cons >= 6,
    title: `单人${TalentName.c6Name}${TalentName.eNameT}附加伤害`,
    params: { SkillsHit: 3, SkillsDmg: 3, Lunar: true, Moonsign: 1 },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.mastery) * 185 / 100, '', 'lunarBloom')
  },
  {
    check: ({ cons }) => cons >= 6,
    title: `满辉${TalentName.c6Name}${TalentName.eNameT}附加伤害`,
    params: { SkillsHit: 3, SkillsDmg: 3, Lunar: true, Moonsign: 3 },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.mastery) * 185 / 100, '', 'lunarBloom')
  },
  {
    check: ({ cons }) => cons >= 6,
    title: `单人${TalentName.c6Name}${TalentName.aNameT}附加伤害`,
    params: { SkillsHit: 5, SkillsDmg: 5, Lunar: true, Pale_Hymn: true, Moonsign: 1 },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.mastery) * 150 / 100, '', 'lunarBloom')
  },
  {
    check: ({ cons }) => cons >= 6,
    title: `满辉${TalentName.c6Name}${TalentName.aNameT}附加伤害`,
    params: { SkillsHit: 5, SkillsDmg: 5, Lunar: true, Pale_Hymn: true, Moonsign: 3 },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.mastery) * 150 / 100, '', 'lunarBloom')
  },
  {
    title: '绽放伤害',
    params: { Moonsign: 1 },
    dmg: ({}, { reaction }) => {
      let r1 = reaction('bloom')
      return {
        dmg: r1.avg * 2,
        avg: r1.avg * 1.15
      }
    }
  },
  {
    title: `${TalentName.qName}后绽放伤害`,
    dmgKey: 'r',
    params: { Pale_Hymn: true, Moonsign: 1 },
    dmg: ({}, { reaction }) => {
      let r1 = reaction('bloom')
      return {
        dmg: r1.avg * 2,
        avg: r1.avg * 1.15
      }
    }
  }
]
