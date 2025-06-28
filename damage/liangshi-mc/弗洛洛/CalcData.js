import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "弗洛洛"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第一段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 3, NormalDmg: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 9, NormalDmg: 9 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第三段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg * 6,
        avg: a1.avg + a2.avg * 6
      }
    }
  },
  {
    title: `${TalentName.tName}强化${TalentName.aName}`,
    params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
    dmg: ({ talent, cons }, dmg) => {
      let c1 = cons >= 1 ? 80 : 0
      let t1 = dmg(talent.t['亡与死的乐章伤害2'][0] + c1, 'e')
      let t2 = dmg(talent.t['亡与死的乐章伤害2'][1] + c1, 'e')
      return {
        dmg: t1.dmg + t2.dmg,
        avg: t1.avg + t2.avg
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害'], 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: '谱曲终末伤害',
    params: { ChargedUse: 1, SkillsHit: 11, SkillsDmg: 11, Scarlet_Coda: true },
    dmg: ({ talent, cons }, dmg) => {
      let c2 = cons >= 2 ? 75 : 0
      let a1 = dmg(talent.a['谱曲终末伤害2'][0] + c2, 'e')
      let a2 = dmg(talent.a['谱曲终末伤害2'][1] + c2, 'e')
      let a3 = dmg(talent.a['谱曲终末伤害2'][2] + c2, 'e')
      return {
        dmg: a1.dmg * 2 + a2.dmg * 8 + a3.dmg,
        avg: a1.avg * 2 + a2.avg * 8 + a3.avg
      }
    }
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, fly: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['闪避反击伤害'], 'a')
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害'], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.tName}强化${TalentName.eName}`,
    params: { SkillsUse: 2, SkillsHit: 12, SkillsDmg: 12 },
    dmg: ({ talent, cons }, dmg) => {
      let c1 = cons >= 1 ? 80 : 0
      let t1 = dmg(talent.t['永不消逝的梦呓伤害2'][0] + c1, 'e')
      let t2 = dmg(talent.t['永不消逝的梦呓伤害2'][1] + c1, 'e')
      let t3 = dmg(talent.t['永不消逝的梦呓伤害2'][2] + c1, 'e')
      return {
        dmg: t1.dmg * 2 + t2.dmg * 8 + t3.dmg,
        avg: t1.avg * 2 + t2.avg * 8 + t3.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}一段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, Maestro_State: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['普攻·赫卡忒第一段伤害'], 'r')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}二段伤害`,
    params: { BurstUse: 1, NormalUse: 2, EnergyUse: 1, Maestro_State: true },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['普攻·赫卡忒第二段伤害'], 'r')
      return {
        dmg: q1.dmg * 2,
        avg: q1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}后强化${TalentName.aName}弦乐`,
    params: { BurstUse: 1, NormalUse: 3, EnergyUse: 1, Maestro_State: true },
    dmg: ({ talent, params }, dmg) => {
      let q1 = dmg(talent.q['强化攻击·弦乐·赫卡忒伤害2'][0] + Math.min((params.Lingering_Note || 0), 24) * 3, 'r')
      let q2 = dmg(talent.q['强化攻击·弦乐·赫卡忒伤害2'][1] + Math.min((params.Lingering_Note || 0), 24) * 3, 'r')
      return {
        dmg: q1.dmg + q2.dmg,
        avg: q1.avg + q2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}后强化${TalentName.aName}管乐`,
    params: { BurstUse: 1, NormalUse: 3, EnergyUse: 1, Maestro_State: true },
    dmg: ({ talent, params }, dmg) => {
      let q1 = dmg(talent.q['强化攻击·管乐·赫卡忒伤害2'][0] + Math.min((params.Lingering_Note || 0), 24) * 3, 'r')
      let q2 = dmg(talent.q['强化攻击·管乐·赫卡忒伤害2'][1] + Math.min((params.Lingering_Note || 0), 24) * 3, 'r')
      return {
        dmg: q1.dmg + q2.dmg,
        avg: q1.avg + q2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}后强化${TalentName.aName}彩乐`,
    params: { BurstUse: 1, NormalUse: 3, EnergyUse: 1, Maestro_State: true },
    dmg: ({ talent, params }, dmg) => {
      let q1 = dmg(talent.q['强化攻击·彩乐·赫卡忒伤害2'][0] + Math.min((params.Lingering_Note || 0), 24) * 3, 'r')
      let q2 = dmg(talent.q['强化攻击·彩乐·赫卡忒伤害2'][1] + Math.min((params.Lingering_Note || 0), 24) * 3, 'r')
      return {
        dmg: q1.dmg + q2.dmg,
        avg: q1.avg + q2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}谢幕伤害`,
    params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['谢幕·赫卡忒伤害'], 'q')
  },
  {
    title: `致命组歌变奏伤害`,
    dmg: ({ talent }, dmg) => {
      let l1 = dmg(talent.l['致命组歌伤害2'][0], 'l')
      let l2 = dmg(talent.l['致命组歌伤害2'][1], 'l')
      return {
        dmg: l1.dmg + l2.dmg,
        avg: l1.avg + l2.avg
      }
    }
  },
  {
    title: `永生组歌变奏伤害`,
    params: { Maestro_State: true },
    dmg: ({ talent, cons }, dmg) => {
      let l1 = dmg(talent.l['永生组歌伤害'], 'e')
      let l2 = dmg(80, 'e')
      return {
        dmg: l1.dmg + (cons >= 3 ? l2.dmg : 0),
        avg: l1.avg + (cons >= 3 ? l2.avg : 0)
      }
    }
  },
  {
    title: `${TalentName.c6Name}重世幻象·赫卡忒`,
    params: { SkillsUse: 2, SkillsHit: 12, SkillsDmg: 12 },
    dmg: ({}, dmg) => dmg(304.8, 'r')
  }
]