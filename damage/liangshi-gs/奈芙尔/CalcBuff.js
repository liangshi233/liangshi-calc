import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  MasteryGs,
  {
    title: '奈芙尔天赋：[月下的豪赌] 处于满辉时，将使当前场上的草原核与丰穰之核转化为「诳言之核」，[buff]层「伪秘之帷」使元素精通提升[mastery]',
    data: {
      buff: ({ params, cons }) => Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)),
      mastery: ({ params, cons }) => (params.Veil_of_Falsehood || 99) >= (cons >= 2 ? 5 : 3) ? 100 : 0
    }
  },
  {
    title: '奈芙尔天赋：[尘沙的女儿] 基于元素精通攻击力提升[atkPlus]',
    sort: 9,
    data: {
      atkPlus: ({ attr, calc }) => Math.max((Math.min((calc(attr.mastery) * 0.4), 200)), 0)
    }
  },
  {
    check: ({ params }) => params.Lunar === true,
    title: '奈芙尔天赋：[月兆祝赐 · 廊下暮影] 队伍中的角色触发绽放反应时，将转为触发月绽放反应，反应的基础伤害提升[fypct]',
    sort: 9,
    data: {
      fypct: ({ attr, calc }) => Math.min((calc(attr.mastery) * 0.0175), 14)
    }
  },
  {
    check: ({ params }) => params.Phantasm_Performance === true,
    title: '奈芙尔技能：[弈术 · 千夜一舞] [buff]层「伪秘之帷」使幻戏伤害提升为原本的1[_eDmg]%',
    data: {
      buff: ({ params, cons }) => Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)),
      _eDmg: ({ params, cons }) => Math.min(((params.Veil_of_Falsehood || 99) * 10), (cons >= 2 ? 50 : 30))
    }
  },
  {
    title: '奈芙尔技能：[圣约 · 真眸幻戏] [buff]层「伪秘之帷」使元素爆发伤害提升[qDmg]%',
    data: {
      buff: ({ params, cons }) => Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)),
      qDmg: ({ talent, params, cons }) => talent.q['伤害提升'] * Math.min(((params.Veil_of_Falsehood || 99)), (cons >= 2 ? 5 : 3))
    }
  },
  {
    check: ({ params }) => params.Lunar === true && params.Phantasm_Performance === true,
    title: '奈芙尔1命：[谋篇乃成败之始] [buff]层「伪秘之帷」, 幻戏造成的月绽放反应基础伤害提升[fyplus]',
    cons: 1,
    data: {
      buff: ({ params, cons }) => Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)),
      fyplus: ({ attr, calc, cons, params }) => (calc(attr.mastery) * 60 / 100) * Math.min((1 + (params.Veil_of_Falsehood || 99) / 10), (cons >= 2 ? 1.5 : 1.3))
    }
  },
  {
    title: '奈芙尔2命：[明察为筹算之先] 「伪秘之帷」上限提升至5.0层, [buff]层「伪秘之帷」使元素精通额外提升[mastery]',
    cons: 2,
    data: {
      buff: ({ params, cons }) => Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)),
      mastery: ({ params }) => (params.Veil_of_Falsehood || 99) >= 5 ? 100 : 0
    }
  },
  {
    title: '奈芙尔4命：[眩惑入谜局之网] 处于「影舞」状态下时，还会使附近敌人的元素抗性降低[kx]%',
    cons: 4,
    data: {
      kx: 20
    }
  },
  {
    check: ({ params }) => params.Lunar === true,
    title: '奈芙尔6命：[决胜于逆转之时] 处于满辉时月绽放反应伤害擢升[elevated]%',
    cons: 6,
    data: {
      elevated: ({ params }) => ((params.Moonsign || 0) >= 2 ? 15 : 0)
    }
  }
]
