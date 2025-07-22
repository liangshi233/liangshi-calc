import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "迪奥娜"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段`,
    dmgKey: 'a',
    params: { phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}二段`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}三段`,
    params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}四段`,
    params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}五段`,
    params: { NormalUse: 5, NormalHit: 5, NormalDmg: 5, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['瞄准射击'], 'a2')
  },
  {
    title: `满蓄力${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  },
  {
    title: `满蓄力${TalentName.a2Name}融化`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, FireAttachment: true, FreezeDetermine: false },
    dmgKey: 'z',
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `${TalentName.a3Name}期间伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
  },
  {
    title: `低空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
  },
  {
    title: `高空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
  },
  {
    title: '冻冻猫猫爪伤害',
    params: { Icy_Paws: 1, SkillsHit: 1, SkillsDmg: 1, ShieldTime: 0.1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['猫爪伤害'], 'e')
  },
  {
    title: '冻冻猫猫爪融化',
    params: { Icy_Paws: 1, SkillsHit: 1, SkillsDmg: 1, FireAttachment: true, FreezeDetermine: false, ShieldTime: 0.1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['猫爪伤害'], 'e', 'melt')
  },
  {
    title: `点按${TalentName.eNameT}总伤害`,
    params: { Icy_Paws: 2, SkillsHit: 2, SkillsDmg: 2, ShieldTime: 0.1 },
    dmg: ({ talent, params }, dmg) => {
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      return {
        dmg: e1.dmg * params.Icy_Paws,
        avg: e1.avg * params.Icy_Paws
      }
    }
  },
  {
    title: `点按${TalentName.eNameT}总融化`,
    params: { Icy_Paws: 2, SkillsHit: 2, SkillsDmg: 2, FireAttachment: true, FreezeDetermine: false, ShieldTime: 0.1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      let e2 = dmg(talent.e['猫爪伤害'], 'e', 'melt')
      return {
        dmg: e1.dmg + e2.dmg,
        avg: e1.avg + e2.avg
      }
    }
  },
  {
    title: `短按${TalentName.eName}护盾量`,
    params: { Icy_Paws: 2, SkillsHit: 2, SkillsDmg: 2, ShieldTime: 0.1 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.e['护盾基础吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾基础吸收量2'][1])
  },
  {
    title: `长按${TalentName.eNameT}总伤害`,
    params: { Icy_Paws: 5, SkillsHit: 3, SkillsDmg: 3, ShieldTime: 0.1 },
    dmgKey: 'e',
    dmg: ({ talent, params }, dmg) => {
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      return {
        dmg: e1.dmg * params.Icy_Paws,
        avg: e1.avg * params.Icy_Paws
      }
    }
  },
  {
    title: `长按${TalentName.eNameT}总融化`,
    params: { Icy_Paws: 5, SkillsHit: 3, SkillsDmg: 3, FireAttachment: true, FreezeDetermine: false, ShieldTime: 0.1 },
    dmg: ({ talent, params }, dmg) => {
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      let e2 = dmg(talent.e['猫爪伤害'], 'e', 'melt')
      return {
        dmg: e1.dmg * 3 + e2.dmg * 2,
        avg: e1.avg * 3 + e2.avg * 2
      }
    }
  },
  {
    title: `长按${TalentName.qName}护盾量`,
    params: { Icy_Paws: 5, SkillsHit: 3, SkillsDmg: 3, ShieldTime: 0.1 },
    dmgKey: 'h',
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.e['护盾基础吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾基础吸收量2'][1])
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}释放融化`,
    params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, FireAttachment: true, FreezeDetermine: false, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
  },
  {
    title: '冰气酒雾领域伤害',
    dmgKey: 'q',
    params: { Drunken_Mist: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5, HealNumber: 4, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['领域持续伤害'], 'q')
  },
  {
    title: '冰气酒雾领域融化',
    params: { Drunken_Mist: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5, HealNumber: 4, FireAttachment: true, FreezeDetermine: false, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['领域持续伤害'], 'q', 'melt')
  },
  {
    title: `${TalentName.qName}每跳治疗`,
    params: { Drunken_Mist: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5, HealNumber: 4, EnergyUse: 1 },
    dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗量2'][1])
  },
  {
    title: `${TalentName.qName}完整伤害`,
    params: { Drunken_Mist: true, BurstUse: 1, BurstHit: 7, BurstDmg: 7, HealNumber: 6, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['技能伤害'], 'q')
      let q2 = dmg(talent.q['领域持续伤害'], 'q')
      return {
        dmg: q1.dmg + q2.dmg * 6,
        avg: q1.avg + q2.avg * 6
      }
    }
  },
  {
    title: `${TalentName.qName}完整融化`,
    params: { Drunken_Mist: true, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, HealNumber: 6, FireAttachment: true, FreezeDetermine: false },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['技能伤害'], 'q')
      let q2 = dmg(talent.q['领域持续伤害'], 'q')
      let q3 = dmg(talent.q['领域持续伤害'], 'q', 'melt')
      return {
        dmg: q1.dmg + (q2.dmg + q3.dmg) * 3,
        avg: q1.avg + (q2.avg + q3.avg) * 3
      }
    }
  },
  {
    title: `${TalentName.qName}完整治疗`,
    params: { Drunken_Mist: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 7, BurstDmg: 7, HealNumber: 6, EnergyUse: 1 },
    dmg: ({ talent, calc, attr }, { heal }) => heal((talent.q['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗量2'][1]) * 6)
  },
  {
    title: '单人站场21秒',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6 },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['满蓄力瞄准射击'], 'a2')
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      let q1 = dmg(talent.q['技能伤害'], 'q')
      let q2 = dmg(talent.q['领域持续伤害'], 'q')
      let aDmg = a1.dmg * 6 * (cons >= 4 ? 2 : 1)
      let aAvg = a1.avg * 6 * (cons >= 4 ? 2 : 1)
      let eDmg = e1.dmg * 2 * 3
      let eAvg = e1.avg * 2 * 3
      let qDmg = q1.dmg + q2.dmg * 6
      let qAvg = q1.avg + q2.avg * 6
      return {
        dmg: aDmg + eDmg + qDmg,
        avg: aAvg + eAvg + qAvg
      }
    }
  },
  {
    title: '单人站场21秒融化',
    dmgKey: 'hps',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, FireAttachment: true, FreezeDetermine: false },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      let e2 = dmg(talent.e['猫爪伤害'], 'e', 'melt')
      let q1 = dmg(talent.q['技能伤害'], 'q', 'melt')
      let q2 = dmg(talent.q['领域持续伤害'], 'q')
      let q3 = dmg(talent.q['领域持续伤害'], 'q', 'melt')
      let aDmg = a1.dmg * 6 * (cons >= 4 ? 2 : 1)
      let aAvg = a1.avg * 6 * (cons >= 4 ? 2 : 1)
      let eDmg = (e1.dmg + e2.dmg) * 3
      let eAvg = (e1.avg + e2.avg) * 3
      let qDmg = q1.dmg + (q2.dmg + q3.dmg) * 3
      let qAvg = q1.avg + (q2.avg + q3.avg) * 3
      return {
        dmg: aDmg + eDmg + qDmg,
        avg: aAvg + eAvg + qAvg
      }
    }
  },
  {
    title: '单人站场21秒治疗',
    dmgKey: 'hph',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6 },
    dmg: ({ talent, calc, attr }, { heal }) => {
      let q1 = talent.q['持续治疗量2'][0] * calc(attr.hp) / 100
      let q2 = talent.q['持续治疗量2'][1]
      let zll = (q1 + q2) * 6
      return heal(zll)
    }
  },
  {
    title: '单人循环流畅度',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6 },
    dmg: ({ attr, weapon, artis }) => {
      let SkillsQuantity = weapon.name.includes('祭礼') ? 10 : 6 //祭礼刷新次数默认为长按
      let a = EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 0, 0) //3短E，(1长E期望4.0,3短E期望4.8)
      return {
        avg: Format.percent(a),
        type: 'text'
      }
    }
  },
  {
    title: '单人站场DPS',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6 },
    dmg: ({ talent, cons, attr, weapon, artis }, dmg) => {
      let a1 = dmg(talent.a['满蓄力瞄准射击'], 'a2')
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      let q1 = dmg(talent.q['技能伤害'], 'q')
      let q2 = dmg(talent.q['领域持续伤害'], 'q')
      let SkillsQuantity = weapon.name.includes('祭礼') ? 10 : 6
      let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 0, 0)), 1)
      let aDmg = a1.dmg * 6 * (cons >= 4 ? (1 + qcn) : 1)
      let aAvg = a1.avg * 6 * (cons >= 4 ? (1 + qcn) : 1)
      let eDmg = e1.dmg * 2 * 3
      let eAvg = e1.avg * 2 * 3
      let qDmg = (q1.dmg + q2.dmg * 6) * qcn
      let qAvg = (q1.avg + q2.avg * 6) * qcn
      return {
        dmg: (aDmg + eDmg + qDmg) / 21,
        avg: (aAvg + eAvg + qAvg) / 21
      }
    }
  },
  {
    title: '单人站场DPS融化',
    dmgKey: 'dps',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, FireAttachment: true, FreezeDetermine: false },
    dmg: ({ talent, cons, attr, weapon, artis }, dmg) => {
      let a1 = dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      let e2 = dmg(talent.e['猫爪伤害'], 'e', 'melt')
      let q1 = dmg(talent.q['技能伤害'], 'q', 'melt')
      let q2 = dmg(talent.q['领域持续伤害'], 'q')
      let q3 = dmg(talent.q['领域持续伤害'], 'q', 'melt')
      let SkillsQuantity = weapon.name.includes('祭礼') ? 10 : 6
      let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 0, 0)), 1)
      let aDmg = a1.dmg * 6 * (cons >= 4 ? (1 + qcn) : 1)
      let aAvg = a1.avg * 6 * (cons >= 4 ? (1 + qcn) : 1)
      let eDmg = (e1.dmg + e2.dmg) * 3
      let eAvg = (e1.avg + e2.avg) * 3
      let qDmg = (q1.dmg + (q2.dmg + q3.dmg) * 3) * qcn
      let qAvg = (q1.avg + (q2.avg + q3.avg) * 3) * qcn
      return {
        dmg: (aDmg + eDmg + qDmg) / 21,
        avg: (aAvg + eAvg + qAvg) / 21
      }
    }
  },
  {
    title: '单人站场DPH',
    dmgKey: 'dph',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6 },
    dmg: ({ talent, attr, calc, artis, weapon }, { heal }) => {
      let q1 = talent.q['持续治疗量2'][0] * calc(attr.hp) / 100
      let q2 = talent.q['持续治疗量2'][1]
      let SkillsQuantity = weapon.name.includes('祭礼') ? 10 : 6
      let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 0, 0)), 1)
      let zll = ((q1 + q2) * 6 * qcn) / 21
      return heal(zll)
    }
  },
  {
    title: `猫鹤万班 ${TalentName.a2NameT}`,
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, ElementFireTeam: 1, ElementIceTeam: 2, ElementWindTeam: 1,  ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, EnergyTeammate: 280, Shen_He: true, Kaedehara_Kazuha: true, Bennett: true, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  },
  {
    title: `猫鹤万班 ${TalentName.a2NameT}融化`,
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, ElementFireTeam: 1, ElementIceTeam: 2, ElementWindTeam: 1,  ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, EnergyTeammate: 280, Shen_He: true, Kaedehara_Kazuha: true, Bennett: true, FireAttachment: true, FreezeDetermine: false, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `半血 猫鹤万班${TalentName.a2NameT}融化`,
    params: { OwnHp: 40, Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, ElementFireTeam: 1, ElementIceTeam: 2, ElementWindTeam: 1,  ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, EnergyTeammate: 280, Shen_He: true, Kaedehara_Kazuha: true, Bennett: true, FireAttachment: true, FreezeDetermine: false, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `猫纳万班 ${TalentName.a2NameT}`,
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, ElementFireTeam: 1, ElementIceTeam: 1, ElementWindTeam: 1, ElementGrassTeam: 1, ElementSame: 1, ElementDifferent: 3, EnergyTeammate: 250, Nahida: true, Kaedehara_Kazuha: true, Bennett: true, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  },
  {
    title: `猫纳万班 ${TalentName.a2NameT}融化`, //敌人持续燃烧状态
    dmgKey: 'z',
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, ElementFireTeam: 1, ElementIceTeam: 1, ElementWindTeam: 1, ElementGrassTeam: 1, ElementSame: 1, ElementDifferent: 3, EnergyTeammate: 250, Nahida: true, Kaedehara_Kazuha: true, Bennett: true, FireAttachment: true, FreezeDetermine: false, BurningDetermine: true, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `半血 猫纳万班 ${TalentName.a2NameT}融化`,
    params: { OwnHp: 40, Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6, ElementFireTeam: 1, ElementIceTeam: 1, ElementWindTeam: 1, ElementGrassTeam: 1, ElementSame: 1, ElementDifferent: 3, EnergyTeammate: 250, Nahida: true, Kaedehara_Kazuha: true, Bennett: true, FireAttachment: true, FreezeDetermine: false, BurningDetermine: true, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `猫鹤芙爱 ${TalentName.a2NameT}`, //敌人持续冻结状态
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6,  ElementIceTeam: 2, ElementWaterTeam: 2, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, FontaineTeammate: 2, EnergyTeammate: 280, Shen_He: true, Furina: true, Escoffier: true, FreezeDetermine: true, IceAttachment: true, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  },
  {
    title: `猫鹤芙爱 短${TalentName.eNameT}伤害`,
    params: { Drunken_Mist: true, Icy_Paws: 2, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 0.1, HealNumber: 6,  ElementIceTeam: 2, ElementWaterTeam: 2, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, FontaineTeammate: 2, EnergyTeammate: 280, Shen_He: true, Furina: true, Escoffier: true, FreezeDetermine: true, IceAttachment: true, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['猫爪伤害'], 'e')
  },
  {
    title: `猫鹤芙爱 长${TalentName.eNameT}总伤害`,
    params: { Drunken_Mist: true, Icy_Paws: 5, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, ShieldTime: 0.1, HealNumber: 6,  ElementIceTeam: 2, ElementWaterTeam: 2, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, FontaineTeammate: 2, EnergyTeammate: 280, Shen_He: true, Furina: true, Escoffier: true, FreezeDetermine: true, IceAttachment: true, team: true },
    dmgKey: 'e',
    dmg: ({ talent, params }, dmg) => {
      let e1 = dmg(talent.e['猫爪伤害'], 'e')
      return {
        dmg: e1.dmg * params.Icy_Paws,
        avg: e1.avg * params.Icy_Paws
      }
    }
  },
  {
    title: `猫鹤芙爱 ${TalentName.qNameT}伤害`,
    params: { Drunken_Mist: true, Icy_Paws: 5, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6,  ElementIceTeam: 2, ElementWaterTeam: 2, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, FontaineTeammate: 2, EnergyTeammate: 280, Shen_He: true, Furina: true, Escoffier: true, FreezeDetermine: true, IceAttachment: true, team: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: '猫鹤芙爱 冰气酒雾领域伤害',
    params: { Drunken_Mist: true, Icy_Paws: 5, ChargedUse: 6, ChargedHit: 6, ChargedDmg: 6, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1, ShieldTime: 2.4, HealNumber: 6,  ElementIceTeam: 2, ElementWaterTeam: 2, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, FontaineTeammate: 2, EnergyTeammate: 280, Shen_He: true, Furina: true, Escoffier: true, FreezeDetermine: true, IceAttachment: true, team: true },
    dmgKey: 'q',
    dmg: ({ talent }, dmg) => dmg(talent.q['领域持续伤害'], 'q')
  }
]