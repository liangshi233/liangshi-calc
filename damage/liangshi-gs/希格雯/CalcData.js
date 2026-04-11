import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "希格雯"
let TalentName = ObTalentName(CharacterName)
let a2Dmg = { avg: 0, dmg: 0 }
let a2zDmg = { avg: 0, dmg: 0 }
let e1Dmg = { avg: 0, dmg: 0 }
let e1zDmg = { avg: 0, dmg: 0 }
let e2Dmg = { avg: 0, dmg: 0 }
let e2zDmg = { avg: 0, dmg: 0 }
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1, phy: true },
    dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
    dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    dmgKey: 'a',
    params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, phy: true },
    dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmgKey: 'z',
    dmg: ({ talent }, dmg ) => {
      a2Dmg = dmg(talent.a['满蓄力瞄准射击'], 'a2')
      return a2Dmg
    }
  },
  {
    title: `${TalentName.a2Name}蒸发`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, FireAttachment: true },
    dmg: ({ talent }, dmg ) => {
      a2zDmg = dmg(talent.a['满蓄力瞄准射击'], 'a2', 'vaporize')
      return a2zDmg
    }
  },
  {
    title: `小小关心气泡伤害`,
    params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4 },
    dmgKey: 'undefined',
    dmg: ({ talent, attr , cons }, dmg) => dmg(talent.a['小小关心气泡伤害'], 'a2')
  },
  {
    title: `${TalentName.eName}最小水球伤害`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, elv: 0 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e1Dmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
      return e1Dmg
    }
  },
  {
    title: `${TalentName.eName}最小水球蒸发`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, elv: 0, BondOfLifeGet: 2, FireAttachment: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e1zDmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
      return e1zDmg
    }
  },
  {
    title: `${TalentName.eName}最小水球治疗`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1, elv: 0 },
    dmg: ({ talent, attr, calc }, { heal }) => heal( ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3 )
  },
  {
    title: `${TalentName.eName}一层水球伤害`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, elv: 1 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e2Dmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
      return e2Dmg
    }
  },
  {
    title: `${TalentName.eName}一层水球蒸发`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, elv: 1, FireAttachment: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e2zDmg = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
      return e2zDmg
    }
  },
  {
    title: `${TalentName.eName}一层水球治疗`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1, elv: 1 },
    dmg: ({ talent, attr, calc }, { heal }) => heal( ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.35 )
  },
  {
    title: `${TalentName.eName}最大水球伤害`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, elv: 2 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
  },
  {
    title: `${TalentName.eName}最大水球蒸发`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, elv: 2, FireAttachment: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
  },
  {
    title: `${TalentName.eName}最大水球治疗`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1, elv: 2 },
    dmg: ({ talent, attr, calc }, { heal }) => heal( ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.4 )
  },
  {
    title: `${TalentName.eName}完整伤害`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1, elv: 2 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
      let e2 = e1Dmg
      let e3 = e2Dmg
      let cons1 = cons >= 1 ? 4 : 1
      return {
        avg: e1.avg * cons1 + e2.avg + e3.avg * 3 ,
        dmg: e1.dmg * cons1 + e2.dmg + e3.dmg * 3
      }
    }
  },
  {
    title: `${TalentName.eName}完整蒸发`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1, elv: 2, FireAttachment: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
      let e2 = e1zDmg
      let e3 = e2zDmg
      let cons1 = cons >= 1 ? 4 : 1
      return {
        avg: e1.avg * cons1 + e2.avg + e3.avg * 3 ,
        dmg: e1.dmg * cons1 + e2.dmg + e3.dmg * 3
      }
    }
  },
  {
    title: `${TalentName.eName}完整治疗`,
    dmgKey: 'h',
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1, elv: 2, FireAttachment: true },
    dmg: ({ talent, attr, calc, cons }, { heal }) => {
      let e1 = (calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1]) * 1.4
      let e2 = (calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1]) * 1.35
      let e3 = (calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1]) * 1.3
      let cons1 = cons >= 1 ? 4 : 1
      let e4 = e1 * cons1 + e2 + e3 * 3
      return heal(e4)
    }
  },
  {
    title: `${TalentName.eName}伤害提升值`,
    dmgKey: 'f',
    dmg: ({ calc, attr, cons }) => {
      let cons1 = cons >= 1 ? 100 : 80
      let cos1 = cons >= 1 ? 3500 : 2800
      return {
        avg: Math.max(0, Math.min(((calc(attr.hp) - 30000) / 1000 * cons1), cos1))
      }
    }
  },
  {
    title: `${TalentName.qName}单段伤害`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 3, BurstDmg: 3, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmgKey: 'q',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  },
  {
    title: `${TalentName.qName}单段伤害`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 3, BurstDmg: 3, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
  },
  {
    title: `${TalentName.qName}完整伤害`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr , cons , calc }, { basic }) => {
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let cons4 = cons >= 4 ? 13 : 6
      return {
        avg: q1.avg * cons4,
        dmg: q1.dmg * cons4
      }
    }
  },
  {
    title: `${TalentName.qName}完整蒸发`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, FireAttachment: true, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr , cons , calc }, { basic }) => {
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let q2 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
      let cons4 = cons >= 4 ? 10 : 4
      let con4 = cons >= 4 ? 3 : 2
      return {
        avg: q1.avg * cons4 + q2.avg * con4 ,
        dmg: q1.dmg * cons4 + q2.dmg * con4
      }
    }
  },
  {
    title: '单人站场18秒',
    params: { ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr , cons , calc }, { basic }) => {
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
      let e2 = e1Dmg
      let e3 = e2Dmg
      let a2 = a2Dmg
      let cons1 = cons >= 1 ? 4 : 1
      let cons4 = cons >= 4 ? 13 : 6
      return {
        avg: a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + q1.avg * cons4 ,
        dmg: a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + q1.dmg * cons4
      }
    }
  },
  {
    title: '单人站场18秒蒸发',
    dmgKey: 'dph',
    params: { ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, FireAttachment: true, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr , cons , calc }, { basic }) => {
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let q2 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
      let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
      let e2 = e1zDmg
      let e3 = e2zDmg
      let a2 = a2zDmg
      let cons1 = cons >= 1 ? 4 : 1
      let cons4 = cons >= 4 ? 10 : 4
      let con4 = cons >= 4 ? 3 : 2
      return {
        avg: a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + q1.avg * cons4 + q2.avg * con4 ,
        dmg: a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + q1.dmg * cons4 + q2.dmg * con4
      }
    }
  },
  {
    title: '双人站场18秒治疗',
    dmgKey: 'hph',
    params: { ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, FireAttachment: true, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr, calc, cons }, { heal }) => {
      let e1 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.4
      let e2 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.35
      let e3 = ( calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3
      let e5 = ( calc(attr.hp) * 50 / 100 * 1.3 )
      let cons1 = cons >= 1 ? 4 : 1
      let e4 = e1 * cons1 + e2 + e3 * 3 + e5
      return heal(e4)
    }
  },
  {
    title: '单人循环流畅度',
    params: { ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, FireAttachment: true, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ attr, weapon, artis, calc }) => {
      let a = EnergyCycle(CharacterName, attr, weapon, artis, Math.min(((calc(attr.hp) * 0.1) / 2000), 5) * 2, 0, 0, 1, 0, 0)
      return {
        avg: Format.percent(a),
        type: 'text'
      }
    }
  },
  {
    title: '单人站场期望DPS',
    params: { ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr, cons, calc, weapon, artis }, { basic }) => {
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e')
      let e2 = e1Dmg
      let e3 = e2Dmg
      let a2 = a2Dmg
      let cons1 = cons >= 1 ? 4 : 1
      let cons4 = cons >= 4 ? 13 : 6
      let qcn = EnergyCycle(CharacterName, attr, weapon, artis, Math.min(((calc(attr.hp) * 0.1) / 2000), 5) * 2, 0, 0, 1, 0, 0)
      return {
        avg: (a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + (q1.avg * cons4) * qcn) / 18 ,
        dmg: (a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + (q1.dmg * cons4) * qcn) / 18
      }
    }
  },
  {
    title: '单人站场期望DPS蒸发',
    dmgKey: 'dps',
    params: { ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, FireAttachment: true, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr, cons, calc, weapon, artis }, { basic }) => {
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let q2 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
      let e1 = basic(calc(attr.hp) * talent.e['激愈水球伤害'] / 100, 'e', 'vaporize')
      let e2 = e1zDmg
      let e3 = e2zDmg
      let a2 = a2zDmg
      let cons1 = cons >= 1 ? 4 : 1
      let cons4 = cons >= 4 ? 10 : 4
      let con4 = cons >= 4 ? 3 : 2
      let qcn = EnergyCycle(CharacterName, attr, weapon, artis, Math.min(((calc(attr.hp) * 0.1) / 2000), 5) * 2, 0, 0, 1, 0, 0)
      return {
        avg: (a2.dmg * 6 + e1.avg * cons1 + e2.avg + e3.avg * 3 + (q1.avg * cons4 + q2.avg * con4) * qcn) / 18 ,
        dmg: (a2.dmg * 6 + e1.dmg * cons1 + e2.dmg + e3.dmg * 3 + (q1.dmg * cons4 + q2.dmg * con4) * qcn) / 18
      }
    }
  },
  {
    title: '双人站场期望HPS',
    dmgKey: 'hps',
    params: { ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 6, BurstDmg: 6, FireAttachment: true, BondOfLifeGet: 2, DecreasedBondOfLife: 1, HealNumber: 1 },
    dmg: ({ talent, attr, calc, cons }, { heal }) => {
      let e1 = (calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.4
      let e2 = (calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.35
      let e3 = (calc(attr.hp) * talent.e['激愈水球治疗量2'][0] / 100 + talent.e['激愈水球治疗量2'][1] ) * 1.3
      let e5 = (calc(attr.hp) * 50 / 100 * 1.3)
      let cons1 = cons >= 1 ? 4 : 1
      let e4 = (e1 * cons1 + e2 + e3 * 3 + e5) / 18
      return heal(e4)
    }
  }]
