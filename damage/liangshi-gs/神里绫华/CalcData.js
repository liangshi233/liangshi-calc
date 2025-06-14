import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "神里绫华"
let c6Dmg = { dmg: 0 , avg: 0 }
let c6rDmg = { dmg: 0 , avg: 0 }
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
{
  title: `${TalentName.aName}一段`,
  dmgKey: 'a',
  params: { NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.aName}一段融化`,
  params: { NormalElement: 1, FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'melt')
},
{
  title: `${TalentName.aName}二段`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.aName}二段融化`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2, FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'melt')
},
{
  title: `${TalentName.aName}三段`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, NormalElement: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.aName}三段融化`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, NormalElement: 3, FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'melt')
},
{
  title: `${TalentName.aName}四段`,
  params: { NormalUse: 4, NormalHit: 6, NormalDmg: 6, NormalElement: 6 },
  dmg: ({ talent }, dmg) => {
    let a = dmg(talent.a['四段伤害2'][0], 'a')
    return {
      dmg: a.dmg * 3,
      avg: a.avg * 3
    }
  }
},
{
  title: `${TalentName.aName}四段融化`,
  params: { NormalUse: 4, NormalHit: 6, NormalDmg: 6, NormalElement: 6, FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => {
    let a = dmg(talent.a['四段伤害2'][0], 'a')
    let a2 = dmg(talent.a['四段伤害2'][0], 'a', 'melt')
    return {
      dmg: a.dmg * 2 + a2.dmg,
      avg: a.avg * 2 + a2.avg
    }
  }
},
{
  title: `${TalentName.aName}五段`,
  params: { NormalUse: 5, NormalHit: 7, NormalDmg: 7,  NormalElement: 7 },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: `${TalentName.aName}五段融化`,
  params: { NormalUse: 5, NormalHit: 7, NormalDmg: 7,  NormalElement: 7, FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'melt')
},
{
  title: `${TalentName.a2Name}单段伤害`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害2'][0], 'a2')
},
{
  title: `${TalentName.a2Name}单段融化`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1, FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害2'][0], 'a2', 'melt')
},
{
  title: `${TalentName.a2Name}完整伤害`,
  dmgKey: 'z',
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1 },
  dmg: ({ talent }, dmg) => {
    let zj = dmg(talent.a['重击伤害2'][0], 'a2')
    return {
      dmg: zj.dmg * 3,
      avg: zj.avg * 3
    }
  }
},
{
  title: `${TalentName.a2Name}完整融化`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1, FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => {
    let zj = dmg(talent.a['重击伤害2'][0], 'a2')
    let zjr = dmg(talent.a['重击伤害2'][0], 'a2', 'melt')
    return {
      dmg: zj.dmg * 2 + zjr.dmg ,
      avg: zj.avg * 2 + zjr.avg
    }
  }
},
{
  title: `${TalentName.c6Name}${TalentName.a2Name}单段伤害`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1, Usurahi_Butou: true },
  dmg: ({ talent }, dmg) => {
    c6Dmg = dmg(talent.a['重击伤害2'][0], 'a2')
    return c6Dmg
  }
},
{
  title: `${TalentName.c6Name}${TalentName.a2Name}单段融化`,
  params: { FireAttachment: true, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1, Usurahi_Butou: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => {
    c6rDmg = dmg(talent.a['重击伤害2'][0], 'a2', 'melt')
    return c6rDmg
  }
},
{
  title: `${TalentName.eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}融化`,
  params: { FireAttachment: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1, Frostflake_Seki: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['切割伤害'], 'q')
},
{
  title: `${TalentName.qName}单段融化`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1, Frostflake_Seki: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['切割伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}尾段伤害`,
  params: { BurstUse: 1, BurstHit: 19, BurstDmg: 19, EnergyUse: 1, Frostflake_Seki: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['绽放伤害'], 'q')
},
{
  title: `${TalentName.qName}尾段融化`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 19, BurstDmg: 19, EnergyUse: 1, Frostflake_Seki: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['绽放伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}完整伤害`,
  dmgKey: 'q',
  params: { BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, Frostflake_Seki: true },
  dmg: ({ talent, cons }, dmg) => {
    let cons2 = cons * 1 >= 2 ? 1.4 : 1
    let q = dmg(talent.q['切割伤害'], 'q')
    let qw = dmg(talent.q['绽放伤害'], 'q')
    return {
      dmg: q.dmg * 19 * cons2 + qw.dmg * cons2,
      avg: q.avg * 19 * cons2 + qw.avg * cons2
    }
  }
},
{
  title: `${TalentName.qName}完整融化`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, Frostflake_Seki: true, FreezeDetermine: false },
  dmg: ({ talent, cons }, dmg) => {
    let q = dmg(talent.q['切割伤害'], 'q')
    let qr = dmg(talent.q['切割伤害'], 'q', 'melt')
    let qw = dmg(talent.q['绽放伤害'], 'q')
    let qwr = dmg(talent.q['绽放伤害'], 'q', 'melt')
    let count = cons * 1 >= 2 ? 1 : 0
    let cons2 = cons * 1 >= 2 ? 19 : 7
    let cons0 = cons * 1 >= 2 ? 0 : 1
    return {
      dmg: qr.dmg * cons2 + cons0 * (q.dmg * 12 + qw.dmg) + count * (q.dmg * 19 * 0.4 + qwr.dmg * 1.4) ,
      avg: qr.avg * cons2 + cons0 * (q.avg * 12 + qw.avg) + count * (q.avg * 19 * 0.4 + qwr.dmg * 1.4)
    }
  }
},
{
  title: '单人站场21秒',
  dmgKey: 'dph',
  params: { NormalUse: 5, NormalHit: 5, NormalDmg: 5, NormalElement: 5, Frostflake_Seki: true, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1 },
  dmg: ({ talent, cons }, dmg) => {
    let q = dmg(talent.q['切割伤害'], 'q')
    let qw = dmg(talent.q['绽放伤害'], 'q')
    let e = dmg(talent.e['技能伤害'], 'e')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let zj = dmg(talent.a['重击伤害2'][0], 'a2')
    let zj6 = c6Dmg
    let aDmg = a1.dmg * 10 + zj.dmg * (cons >= 6 ? 24 : 30) + zj6.dmg * (cons >= 6 ? 6 : 0)
    let aAvg = a1.avg * 10 + zj.avg * (cons >= 6 ? 24 : 30) + zj6.avg * (cons >= 6 ? 6 : 0)
    let eDmg = e.dmg * 2
    let eAvg = e.avg * 2
    let qDmg = (q.dmg * 19 + qw.dmg) * (cons * 1 >= 2 ? 1.4 : 1)
    let qAvg = (q.avg * 19 + qw.avg) * (cons * 1 >= 2 ? 1.4 : 1)
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场融化21秒',
  params: { FireAttachment: true, NormalUse: 5, NormalHit: 5, NormalDmg: 5, NormalElement: 5, Frostflake_Seki: true, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, FreezeDetermine: false },
  dmg: ({ talent, cons }, dmg) => {
    let qr = dmg(talent.q['切割伤害'], 'q', 'melt')
    let q = dmg(talent.q['切割伤害'], 'q')
    let qw = dmg(talent.q['绽放伤害'], 'q')
    let qwr = dmg(talent.q['绽放伤害'], 'q', 'melt')
    let e1 = dmg(talent.e['技能伤害'], 'e', 'melt')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a1r = dmg(talent.a['一段伤害'], 'a', 'melt')
    let zj = dmg(talent.a['重击伤害2'][0], 'a2')
    let zjr = dmg(talent.a['重击伤害2'][0], 'a2', 'melt')
    let zj6 = c6Dmg
    let zjr6 = c6rDmg
    let aDmg = 5 * (a1.dmg + a1r.dmg) + 8 * (zjr.dmg + 2 * zj.dmg) + (cons >= 6 ? (2 * (zjr6.dmg + 2 * zj6.dmg)) : (2 * (zjr.dmg + 2 * zj.dmg)))
    let aAvg = 5 * (a1.avg + a1r.avg) + 8 * (zjr.avg + 2 * zj.avg) + (cons >= 6 ? (2 * (zjr6.avg + 2 * zj6.avg)) : (2 * (zjr.avg + 2 * zj.avg)))
    let eDmg = e1.dmg * 2
    let eAvg = e1.dmg * 2
    let qDmg = cons >= 2 ? (qwr.dmg * 1.4 + (qr.dmg + q.dmg * 0.4) * 19) : (q.dmg * 12 + qw.dmg + qr.dmg * 7)
    let qAvg = cons >= 2 ? (qwr.avg * 1.4 + (qr.avg + q.avg * 0.4) * 19) : (q.avg * 12 + qw.avg + qr.avg * 7)
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人循环流畅度',
  params: { NormalUse: 5, NormalHit: 5, NormalDmg: 5, NormalElement: 5, Frostflake_Seki: true, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1 },
  dmg: ({ attr, weapon, artis }) => {
    let a = EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 2, 0, 10)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场期望DPS',
  dmgKey: 'dps',
  params: { NormalUse: 5, NormalHit: 5, NormalDmg: 5, NormalElement: 5, Frostflake_Seki: true, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1 },
  dmg: ({ talent, cons, attr, weapon, artis }, dmg) => {
    let q = dmg(talent.q['切割伤害'], 'q')
    let qw = dmg(talent.q['绽放伤害'], 'q')
    let e = dmg(talent.e['技能伤害'], 'e')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let zj = dmg(talent.a['重击伤害2'][0], 'a2')
    let zj6 = c6Dmg
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 2, 0, 10))
    let aDmg = a1.dmg * 10 + zj.dmg * (cons >= 6 ? 24 : 30) + zj6.dmg * (cons >= 6 ? 6 : 0)
    let aAvg = a1.avg * 10 + zj.avg * (cons >= 6 ? 24 : 30) + zj6.avg * (cons >= 6 ? 6 : 0)
    let eDmg = e.dmg * 2
    let eAvg = e.avg * 2
    let qDmg = (q.dmg * 19 + qw.dmg) * (cons * 1 >= 2 ? 1.4 : 1) * qcn
    let qAvg = (q.avg * 19 + qw.avg) * (cons * 1 >= 2 ? 1.4 : 1) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 21,
      avg: (aAvg + eAvg + qAvg) / 21
    }
  }
},
{
  title: '单人站场期望DPS融化',
  params: { FireAttachment: true, NormalUse: 5, NormalHit: 5, NormalDmg: 5, NormalElement: 5, Frostflake_Seki: true, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, FreezeDetermine: false },
  dmg: ({ talent, cons, attr, weapon, artis }, dmg) => {
    let qr = dmg(talent.q['切割伤害'], 'q', 'melt')
    let q = dmg(talent.q['切割伤害'], 'q')
    let qw = dmg(talent.q['绽放伤害'], 'q')
    let qwr = dmg(talent.q['绽放伤害'], 'q', 'melt')
    let e1 = dmg(talent.e['技能伤害'], 'e', 'melt')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a1r = dmg(talent.a['一段伤害'], 'a', 'melt')
    let zj = dmg(talent.a['重击伤害2'][0], 'a2')
    let zjr = dmg(talent.a['重击伤害2'][0], 'a2', 'melt')
    let zj6 = c6Dmg
    let zjr6 = c6rDmg
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 2, 0, 10))
    let aDmg = 5 * (a1.dmg + a1r.dmg) + 8 * (zjr.dmg + 2 * zj.dmg) + (cons >= 6 ? (2 * (zjr6.dmg + 2 * zj6.dmg)) : (2 * (zjr.dmg + 2 * zj.dmg)))
    let aAvg = 5 * (a1.avg + a1r.avg) + 8 * (zjr.avg + 2 * zj.avg) + (cons >= 6 ? (2 * (zjr6.avg + 2 * zj6.avg)) : (2 * (zjr.avg + 2 * zj.avg)))
    let eDmg = e1.dmg * 2
    let eAvg = e1.dmg * 2
    let qDmg = (cons >= 2 ? (qwr.dmg * 1.4 + (qr.dmg + q.dmg * 0.4) * 19) : (q.dmg * 12 + qw.dmg + qr.dmg * 7)) * qcn
    let qAvg = (cons >= 2 ? (qwr.avg * 1.4 + (qr.avg + q.avg * 0.4) * 19) : (q.avg * 12 + qw.avg + qr.avg * 7)) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 21,
      avg: (aAvg + eAvg + qAvg) / 21
    }
  }
},
{
  title: `神鹤万莫 ${TalentName.zName}总伤害`,
  params: { Usurahi_Butou: true, team: true, Shen_He: true, Kaedehara_Kazuha: true, Mona: true, ElementIceTeam: 2, ElementWindTeam: 1, ElementWaterTeam: 1, LiyueTeammate: 1, ElementSame:2 , ElementDifferent: 2, EnergyTeammate: 280, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1 },
  dmg: ({ talent }, dmg) => {
    let a = dmg(talent.a['重击伤害2'][0], 'a2')
    return {
      dmg: a.dmg * 3,
      avg: a.avg * 3
    }
  }
},
{
  title: `神鹤万莫 ${TalentName.qNameT}单段`,
  params: { team: true, Shen_He: true, Kaedehara_Kazuha: true, Mona: true, ElementIceTeam:2, ElementWindTeam: 1, ElementWaterTeam: 1, LiyueTeammate: 1, ElementSame: 2, ElementDifferent: 2, EnergyTeammate: 280, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, Frostflake_Seki: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['切割伤害'], 'q')
},
{
  title: `神鹤万心 ${TalentName.zName}单段`,
  dmgKey: 'z',
  params: { Usurahi_Butou: true, team: true, Shen_He: true, Kaedehara_Kazuha: true, Sangonomiya_Kokomi: true, ElementIceTeam: 2, ElementWindTeam: 1, ElementWaterTeam: 1, LiyueTeammate: 1, ElementSame:2 , ElementDifferent: 2, EnergyTeammate: 290, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害2'][0], 'a2')
},
{
  title: `神鹤万心 ${TalentName.qNameT}单段`,
  params: { team: true, Shen_He: true, Kaedehara_Kazuha: true, Sangonomiya_Kokomi: true, ElementIceTeam: 2, ElementWindTeam: 1, ElementWaterTeam: 1, LiyueTeammate: 1, ElementSame:2 , ElementDifferent: 2, EnergyTeammate: 290, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, Frostflake_Seki: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['切割伤害'], 'q')
},
{
  title: `神万香班 ${TalentName.qNameT}单段融化`,
  params: { FireAttachment: true, team: true, Kaedehara_Kazuha: true, Xiang_Ling: true, Bennett: true, ElementIceTeam: 1, ElementWindTeam: 1, ElementFireTeam: 2, LiyueTeammate: 1, ElementSame: 1, ElementDifferent: 3, EnergyTeammate: 280, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, Frostflake_Seki: true, FreezeDetermine: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['切割伤害'], 'q', 'melt')
},
{
  title: `神万香班 ${TalentName.qNameT}融化总伤害`,
  dmgKey: 'q',
  params: { FireAttachment: true, team: true, Kaedehara_Kazuha: true, Xiang_Ling: true, Bennett: true, ElementIceTeam: 1, ElementWindTeam: 1, ElementFireTeam: 2, LiyueTeammate: 1, ElementSame: 1, ElementDifferent: 3, EnergyTeammate: 280, BurstUse: 1, BurstHit: 10, BurstDmg: 10, EnergyUse: 1, Frostflake_Seki: true, FreezeDetermine: false },
  dmg: ({ talent , cons }, dmg) => {
    let qr = dmg(talent.q['切割伤害'], 'q', 'melt')
    let q = dmg(talent.q['切割伤害'], 'q')
    let qw = dmg(talent.q['绽放伤害'], 'q')
    let qwr = dmg(talent.q['绽放伤害'], 'q', 'melt')
    return {
      dmg: (cons >= 2 ? (qwr.dmg * 1.4 + (qr.dmg + q.dmg * 0.4) * 19) : (q.dmg * 12 + qw.dmg + qr.dmg * 7)),
      avg: (cons >= 2 ? (qwr.avg * 1.4 + (qr.avg + q.avg * 0.4) * 19) : (q.avg * 12 + qw.avg + qr.avg * 7))
    }
  }
}]
