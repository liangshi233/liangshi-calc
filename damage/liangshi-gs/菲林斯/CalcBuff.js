import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  MasteryGs,
  {
    check: ({ params }) => params.Lunar === true,
    title: '菲林斯天赋：[寒冬的交响] 处于满辉时月感电反应造成的伤害提升[lunarCharged]%',
    data: {
      lunarCharged: ({ params }) => ((params.Moonsign || 0) >= 2 ? 20 : 0)
    }
  },
  {
    title: '菲林斯天赋：[幽焰的呢喃] 元素精通提升[mastery]',
    sort: 9,
    data: {
      mastery: ({ attr, calc, cons }) => Math.min((calc(attr.atk) / 100 * (cons >= 4 ? 10 : 8)), (cons >= 4 ? 220 : 160))
    }
  },
  {
    check: ({ params }) => params.Lunar === true,
    title: '月兆祝赐：[旧世潜藏] 队伍中的角色触发感电反应时，将转为触发月感电反应,基础伤害提升[fypct]',
    sort: 9,
    data: {
      fypct: ({ attr, calc }) => Math.min((calc(attr.atk) / 100 * 0.7), 14)
    }
  },
  {
    title: '菲林斯1命：[拨开雪翳之幕] 特殊元素战技基础冷却时间缩短[_ecdPlus]秒，队伍中的角色触发月感电反应时恢复[_energyevery]点元素能量',
    cons: 1,
    data: {
      _ecdPlus: 2,
      _energyevery: 8
    }
  },
  {
    title: '菲林斯2命：[渡越魍魉之墙] 处于满辉时攻击命中敌人，该敌人的元素抗性降低[kx]%',
    cons: 2,
    data: {
      kx: ({ params }) => (params.Moonsign || 0) >= 2 ? 25 : 0
    }
  },
  {
    title: '菲林斯4命：[荒山嘶啭之夜] 攻击力提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ params }) => params.Lunar === true,
    title: '菲林斯6命：[歌与亡者之舞] 对敌人造成的月感电反应伤害擢升[lunarChargedEle]%',
    cons: 6,
    data: {
      lunarChargedEle: ({ params }) => (params.Moonsign || 0) >= 2 ? 45 : 35
    }
  }]
