import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
    title: 'E点按伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
  }, {
    title: 'E长按伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
  }, {
    title: '「超量装药弹头」伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['「超量装药弹头」伤害'], 'e')
  }, {
    title: '2命额外伤害',
    check: ({ cons }) => cons >= 2,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.atk) * 120 / 100, 'e')
  }, {
    title: 'e持续治疗',
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.e['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.e['持续治疗量2'][1] * 1)
  }, {
    title: '圆阵掷弹爆轰术害',
    dmg: ({ talent }, dmg) => dmg(talent.q['爆轰榴弹伤害'], 'q')
  }, {
    title: 'Q分裂弹伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['二重毁伤弹伤害'], 'q')
  }
]

export const defParams = { soda: 1 }
export const defDmgIdx = 2
export const mainAttr = 'atk,hp,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '夏沃蕾天赋：[尖兵协同战法] 队伍中所有角色的元素类型均为火元素与雷元素，并且至少有一名火元素角色、一名雷元素角色时,角色触发超载反应后，受本次反应影响的敌人的火元素与雷元素抗性降低[kx]%',
    data: {
      kx: 40
    }
  }, {
    title: '夏沃蕾天赋：[纵阵武力统筹] 夏沃蕾发射近迫式急促拦射的「超量装药弹头」后将使队伍中附近的所有火元素与雷元素角色的攻击力提升[atkPct]%',
    data: {
      atkPct: ({ calc, attr }) => Math.min(40, calc(attr.hp) / 1000)
    }
  }, {
    title: '夏沃蕾2命：[诱导殉爆的狙击] 长按施放近迫式急促拦射的射击命中时，将在命中位置附近引发2次连锁殉爆',
    cons: 2
  }, {
    title: '夏沃蕾4命：[多重速射的秘诀] 施放圆阵掷弹爆轰术后，夏沃蕾长按施放近迫式急促拦射不会进入冷却',
    cons: 4,
    data: {
      _eCdpct: 100
    }
  }, {
    title: '夏沃蕾6命：[终结罪恶的追缉] 队伍中的角色受到「近迫式急促拦射」的治疗后，获得[dmg]%火元素伤害加成与雷元素伤害加成',
    cons: 6,
    data: {
      dmg: 60
    }
  },
  { title: '12.21最后修改：[11.8重置]' }
]
