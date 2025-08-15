import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "卡提希娅"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `卡-${TalentName.aName}一段伤害`,
    params: { PlayName: "Cartethyia", "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['第一段伤害'] / 100, 'a')
  },
  {
    title: `卡-${TalentName.aName}二段伤害`,
    params: { PlayName: "Cartethyia", "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.a['第二段伤害2'][0] / 100, 'a')
      let a2 = basic(calc(attr.hp) * talent.a['第二段伤害2'][1] / 100, 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg,
      }
    }
  },
  {
    title: `卡-${TalentName.aName}三段伤害`,
    params: { PlayName: "Cartethyia", "常态攻击使用次数": 3, "常态攻击命中次数": 8, "常态攻击造成伤害次数": 8 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.a['第三段伤害2'][0] / 100, 'a')
      return {
        dmg: a1.dmg * 4,
        avg: a1.avg * 4,
      }
    }
  },
  {
    title: `卡-${TalentName.aName}四段伤害`,
    params: { PlayName: "Cartethyia", "常态攻击使用次数": 4, "常态攻击命中次数": 12, "常态攻击造成伤害次数": 12 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.a['第四段伤害2'][0] / 100, 'a')
      let a2 = basic(calc(attr.hp) * talent.a['第四段伤害2'][1] / 100, 'a')
      return {
        dmg: a1.dmg * 3 + a2.amg,
        avg: a1.avg * 3 + a2.avg,
      }
    }
  },
  {
    title: `芙-${TalentName.aName}一段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 }),
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.t['普攻第一段伤害'] / 100, 'a')
  },
  {
    title: `芙-${TalentName.aName}二段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "常态攻击使用次数": 2, "常态攻击命中次数": 5, "常态攻击造成伤害次数": 5 }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.t['普攻第二段伤害2'][0] / 100, 'a')
      let a2 = basic(calc(attr.hp) * talent.t['普攻第二段伤害2'][1] / 100, 'a')
      return {
        dmg: a1.dmg + a2.amg * 3,
        avg: a1.avg + a2.avg * 3
      }
    }
  },
  {
    title: `芙-${TalentName.aName}三段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.t['普攻第三段伤害2'][0] / 100, 'a')
      let a2 = basic(calc(attr.hp) * talent.t['普攻第三段伤害2'][1] / 100, 'a')
      return {
        dmg: a1.dmg * 3 + a2.amg,
        avg: a1.avg * 3 + a2.avg,
      }
    }
  },
  {
    title: `芙-${TalentName.aName}四段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "常态攻击使用次数": 4, "常态攻击命中次数": 14, "常态攻击造成伤害次数": 14 }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.t['普攻第四段伤害2'][0] / 100, 'a')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5,
      }
    }
  },
  {
    title: `芙-${TalentName.aName}五段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "常态攻击使用次数": 5, "常态攻击命中次数": 16, "常态攻击造成伤害次数": 16 }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.t['普攻第五段伤害2'][0] / 100, 'a')
      let a2 = basic(calc(attr.hp) * talent.t['普攻第五段伤害2'][1] / 100, 'a')
      return {
        dmg: a1.dmg + a2.amg,
        avg: a1.avg + a2.avg,
      }
    }
  },
  {
    title: `卡-${TalentName.a2Name}伤害`,
    params: { PlayName: "Cartethyia", "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.a['重击伤害2'][0] / 100, 'a2')
      let a2 = basic(calc(attr.hp) * talent.a['重击伤害2'][1] / 100, 'a2')
      return {
        dmg: a1.dmg * 3 + a2.dmg,
        avg: a1.avg * 3 + a2.avg
      }
    }
  },
  {
    title: `芙-${TalentName.a2Name}伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "重击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 }),
    dmg: ({ talent, attr, calc }, { basic }) => { //普攻伤害
      let a1 = basic(calc(attr.hp) * talent.t['重击伤害2'][0] / 100, 'a')
      let a2 = basic(calc(attr.hp) * talent.t['重击伤害2'][1] / 100, 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `芙-强化${TalentName.a2Name}伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "重击使用次数": 2, "常态攻击命中次数": 5, "常态攻击造成伤害次数": 5 }),
    dmg: ({ talent, attr, calc }, { basic }) => { //普攻伤害
      let a1 = basic(calc(attr.hp) * talent.t['强化重击伤害2'][0] / 100, 'a')
      let a2 = basic(calc(attr.hp) * talent.t['强化重击伤害2'][1] / 100, 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: '芙-上挑攻击伤害',
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "重击使用次数": 2, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.t['上挑攻击伤害2'][0] / 100, 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `卡-${TalentName.a3Name}伤害`,
    params: { PlayName: "Cartethyia", "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['空中攻击伤害'] / 100, 'a,a3,erosion')
  },
  {
    title: `卡-${TalentName.a3Name}回收一剑`,
    params: { PlayName: "Cartethyia", "空中攻击使用次数": 1, "空中攻击命中次数": 2, "空中攻击造成伤害次数": 2 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['空中攻击回收一剑'] / 100, 'a,a3,erosion')
  },
  {
    title: `卡-${TalentName.a3Name}回收二剑`,
    params: { PlayName: "Cartethyia", "空中攻击使用次数": 1, "空中攻击命中次数": 5, "空中攻击造成伤害次数": 5 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.a['空中攻击回收二剑2'][0] / 100, 'a,a3,erosion')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `卡-${TalentName.a3Name}回收三剑`,
    params: { PlayName: "Cartethyia", "空中攻击使用次数": 1, "空中攻击命中次数": 8, "空中攻击造成伤害次数": 8 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.a['空中攻击回收三剑2'][0] / 100, 'a,a3,erosion')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `芙-${TalentName.a3Name}一段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "空中攻击使用次数": 1, "空中攻击命中次数": 3, "空中攻击造成伤害次数": 3, "处于空中": true }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.t['空中攻击第一段伤害2'][0] / 100, 'a,a3')
      let a2 = basic(calc(attr.hp) * talent.t['空中攻击第一段伤害2'][1] / 100, 'a,a3')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `芙-${TalentName.a3Name}二段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "空中攻击使用次数": 2, "空中攻击命中次数": 6, "空中攻击造成伤害次数": 6, "处于空中": true }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let a1 = basic(calc(attr.hp) * talent.t['空中攻击第二段伤害2'][0] / 100, 'a,a3')
      let a2 = basic(calc(attr.hp) * talent.t['空中攻击第二段伤害2'][1] / 100, 'a,a3')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `芙-${TalentName.a3Name}三段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "空中攻击使用次数": 3, "空中攻击命中次数": 7, "空中攻击造成伤害次数": 7, "处于空中": true }),
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.t['空中攻击第三段伤害'] / 100, 'a,a3')
  },
  {
    title: `卡-${TalentName.eName}伤害`,
    params: { PlayName: "Cartethyia", "共鸣技能使用次数": 1, "共鸣技能命中次数": 4, "共鸣技能造成伤害次数": 4 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害2'][0] / 100, 'a')
      let e2 = basic(calc(attr.hp) * talent.e['技能伤害2'][1] / 100, 'a')
      return {
        dmg: e1.dmg * 3 + e2.dmg,
        avg: e1.avg * 3 + e2.avg
      }
    }
  },
  {
    title: `芙-${TalentName.eName}一段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "共鸣技能使用次数": 1, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "处于空中": true }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.t['共鸣技能·此剑为潮浪之意伤害2'][0] / 100, 'e')
      let e2 = basic(calc(attr.hp) * talent.t['共鸣技能·此剑为潮浪之意伤害2'][1] / 100, 'e')
      return {
        dmg: e1.dmg * 4 + e2.dmg,
        avg: e1.avg * 4 + e2.avg
      }
    }
  },
  {
    title: `芙-${TalentName.eName}二段伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "共鸣技能使用次数": 2, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "处于空中": true }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.t['共鸣技能·凭风斩浪破敌伤害2'][0] / 100, 'e')
      let e2 = basic(calc(attr.hp) * talent.t['共鸣技能·凭风斩浪破敌伤害2'][1] / 100, 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg * 3,
        avg: e1.avg * 2 + e2.avg * 3
      }
    }
  },
  {
    title: `芙-${TalentName.qName}伤害`,
    params: ({ cons }) => ({ "自身生命值": 50, Resolve: 120, PlayName: "Fleurdelys", "风蚀效应": cons >= 2 ? 6 : 3, "共鸣技能使用次数": 2, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "共鸣解放使用次数": 1, "共鸣解放命中次数": 7, "共鸣解放造成伤害次数": 7, "共鸣能量降低次数": 1, "处于空中": true }),
    dmg: ({ talent, attr, calc }, { basic }) => {
      let q1 = basic(calc(attr.hp) * talent.q['看潮怒风哮之刃伤害2'][0] / 100, 'q')
      return {
        dmg: q1.dmg * 7,
        avg: q1.avg * 7
      }
    }
  }
]