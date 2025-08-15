import { ObTalentName } from '../index.js'

let CharacterName = "弗洛洛"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 },
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
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
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
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9, "共鸣技能命中次数": 3, "共鸣技能造成伤害次数": 3 },
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
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
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
    params: { "重击使用次数": 1, "共鸣技能命中次数": 11, "共鸣技能造成伤害次数": 11, Scarlet_Coda: true, "声骸技能使用次数": 2 },
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
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['闪避反击伤害'], 'a')
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2 },
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
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9, "共鸣技能使用次数": 1, "共鸣技能命中次数": 12, "共鸣技能造成伤害次数": 12 },
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
    params: { "共鸣解放使用次数": 1, Maestro_State: true, "声骸技能使用次数": 3, "声骸技能命中次数": 2, "声骸技能造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.q['普攻·赫卡忒第一段伤害'], 'r')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}二段伤害`,
    params: { "共鸣解放使用次数": 1, "常态攻击使用次数": 2, Maestro_State: true, "声骸技能使用次数": 4, "声骸技能命中次数": 4, "声骸技能造成伤害次数": 4 },
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
    params: { "共鸣解放使用次数": 1, "常态攻击使用次数": 3, Maestro_State: true, "声骸技能使用次数": 5, "声骸技能命中次数": 6, "声骸技能造成伤害次数": 6 },
    dmg: ({ talent, params, cons }, dmg) => {
      let q1 = dmg(talent.q['强化攻击·弦乐·赫卡忒伤害2'][0] + (cons >= 6 ? 24 : 0), 'r')
      let q2 = dmg(talent.q['强化攻击·弦乐·赫卡忒伤害2'][1] + (cons >= 6 ? 24 : 0), 'r')
      return {
        dmg: q1.dmg + q2.dmg,
        avg: q1.avg + q2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}后强化${TalentName.aName}管乐`,
    params: { "共鸣解放使用次数": 1, "常态攻击使用次数": 3, Maestro_State: true, "声骸技能使用次数": 5, "声骸技能命中次数": 6, "声骸技能造成伤害次数": 6 },
    dmg: ({ talent, params, cons }, dmg) => {
      let q1 = dmg(talent.q['强化攻击·管乐·赫卡忒伤害2'][0] + (cons >= 6 ? 24 : 0), 'r')
      let q2 = dmg(talent.q['强化攻击·管乐·赫卡忒伤害2'][1] + (cons >= 6 ? 24 : 0), 'r')
      return {
        dmg: q1.dmg + q2.dmg,
        avg: q1.avg + q2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}后强化${TalentName.aName}彩乐`,
    params: { "共鸣解放使用次数": 1, "常态攻击使用次数": 3, Maestro_State: true, "声骸技能使用次数": 5, "声骸技能命中次数": 6, "声骸技能造成伤害次数": 6 },
    dmg: ({ talent, params, cons }, dmg) => {
      let q1 = dmg(talent.q['强化攻击·彩乐·赫卡忒伤害2'][0] + (cons >= 6 ? 24 : 0), 'r')
      let q2 = dmg(talent.q['强化攻击·彩乐·赫卡忒伤害2'][1] + (cons >= 6 ? 24 : 0), 'r')
      return {
        dmg: q1.dmg + q2.dmg,
        avg: q1.avg + q2.avg
      }
    }
  },
  {
    title: `${TalentName.qName}谢幕伤害`, //不进入演奏长按共鸣解放直接打出谢幕
    params: { "共鸣解放使用次数": 1, "共鸣解放命中次数": 1, "共鸣解放造成伤害次数": 1, Maestro_State: true, "声骸技能使用次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.q['谢幕·赫卡忒伤害'], 'q')
  },
  {
    title: `致命组歌变奏伤害`,
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['致命组歌伤害2'][0], 'i')
      let i2 = dmg(talent.i['致命组歌伤害2'][1], 'i')
      return {
        dmg: i1.dmg + i2.dmg,
        avg: i1.avg + i2.avg
      }
    }
  },
  {
    title: `永生组歌变奏伤害`,
    params: { Maestro_State: true, "声骸技能使用次数": 2 },
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['永生组歌伤害'], 'e')
      return {
        dmg: i1.dmg,
        avg: i1.avg
      }
    }
  },
  {
    title: `${TalentName.c6Name}重世幻象·赫卡忒`,
    params: { "共鸣技能使用次数": 2, "共鸣技能命中次数": 12, "共鸣技能造成伤害次数": 12 },
    dmg: ({}, dmg) => dmg(216.42, 'r')
  }
]