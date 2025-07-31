import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  MasteryGs,
  {
    title: '菈乌玛天赋：[奉向霜夜的明光] 队伍中的角色触发的绽放、超绽放、烈绽放反应造成的伤害能够造成暴击，暴击率固定为[_bloomCpct]%，暴击伤害固定为[_bloomCdmg]%，处于满辉时月绽放反应暴击率提升[cpct]%,暴击伤害提升[cdmg]%',
    data: {
      _bloomCpct: ({ params }) => (params.Moonsign || 0) === 0 ? 0 : (3 - Math.min((params.Moonsign || 0), 3) * 7.5),
      _bloomCdmg: ({ params }) => (params.Moonsign || 0) === 0 ? 0 : (3 - Math.min((params.Moonsign || 0), 3) * 100),
      cpct: ({ params }) => Math.max((Math.min((params.Moonsign || 0), 3) - 1), 0) * (params.lunarBloom === true ? 5 : 0),
      cdmg: ({ params }) => Math.max((Math.min((params.Moonsign || 0), 3) - 1), 0) * (params.lunarBloom === true ? 10 : 0)
    }
  },
  {
    title: '菈乌玛天赋：[奉向甘泉的沐濯] 元素战技造成的伤害提升[eDmg]%,重击冷却时间缩短[_a2cdPct]%',
    sort: 9,
    data: {
      eDmg: ({ attr, calc, params }) => params.Linnunrata === true ? Math.min((calc(attr.mastery) * 0.04), 32) : 0,
      _a2cdPct: ({ attr, calc }) => Math.min((calc(attr.mastery) * 0.02), 20)
    }
  },
  {
    title: '菈乌玛天赋：[月兆祝赐 · 千籁恩宠] 队伍中的角色触发绽放反应时，将转为触发月绽放反应，反应的基础伤害提升[fypct]',
    sort: 9,
    data: {
      fypct: ({ attr, calc }) => Math.min((calc(attr.mastery) * 0.0175), 14)
    }
  },
  {
    title: '菈乌玛技能：[圣言述咏 • 终宵永眠] 元素战技命中敌人时该敌人的抗性降低[kx]%',
    data: {
      kx: ({ talent }) => talent.e['元素抗性降低']
    }
  },
  {
    check: ({ params }) => params.Pale_Hymn === true,
    title: '菈乌玛天赋：[圣言述咏 · 众心为月] 队伍中的角色造成绽放、超绽放、烈绽放、月绽放反应伤害时，提升造成的伤害[fybase]',
    sort: 9,
    data: {
      fybase: ({ attr, calc, talent, params }) => calc(attr.mastery) * (params.Lunar === true ? talent.q['月绽放反应伤害提升'] : talent.q['绽放、超绽放、烈绽放反应伤害提升']) / 100
    }
  },
  {
    title: '菈乌玛1命：[「唇啊，为我纺出歌与吟哦」] 灵使形态消耗的体力减少[_staminaPct]%',
    cons: 1,
    data: {
      _staminaPct: 40
    }
  },
  {
    title: '菈乌玛2命：[「纺出那终北的告诫与述说」] 队伍中的角色触发绽放、超绽放、烈绽放、月绽放反应时造成的伤害额外提升[fybase],处于满辉时月绽放反应伤害提升[lunarBloom]%',
    sort: 9,
    cons: 2,
    data: {
      fybase: ({ attr, calc, params }) => params.Pale_Hymn === true ? (calc(attr.mastery) * (params.Lunar === true ? 750 : 500) / 100) : 0,
      lunarBloom: ({ params }) => ((params.Moonsign || 0) >= 3 ? 40 : 0)
    }
  },
  {
    title: '菈乌玛4命：[「汝、切莫贪恋巨熊的权柄」] 元素战技中的霜林圣域的攻击命中敌人时，恢复[_energyevery]点元素能量',
    cons: 4,
    data: {
      _energyevery: 4
    }
  },
  {
    title: '菈乌玛6命：[「我愿将这血与泪奉予月明」] 处于满辉时月绽放反应伤害擢升[lunarBloomEle]%',
    cons: 6,
    data: {
      lunarBloomEle: ({ params }) => ((params.Moonsign || 0) >= 3 ? 25 : 0)
    }
  }
]
