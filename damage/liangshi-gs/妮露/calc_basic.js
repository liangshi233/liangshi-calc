import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs70ranking = cfg.gs70ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '七域舞步'
let e2Name = '旋舞步'
let e3Name = '剑舞步'
let eNameT = 'E'
let e2NameT = 'EE'
let e3NameT = 'EA'
let qName = '远梦聆泉'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '弦月舞步'
    eNameT = '七域舞步'
    e2NameT = '旋舞步'
    e3NameT = '剑舞步'
    qNameT = '远梦聆泉'
  } else if (NamePath == 3) {
    eNameT = '七域舞步'
    e2NameT = '旋舞步'
    e3NameT = '剑舞步'
    qNameT = '远梦聆泉'
  } else if (NamePath == 4) {
    eName = '元素战技'
    qName = '元素爆发'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 5) {
    aName = '普攻'
    a3Name = '下落'
    eName = 'E技能'
    e2Name = 'EE技能'
    e3Name = 'EA技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    e2NameT = 'EE技能'
    e3NameT = 'EA技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
    aName = 'A'
    a2Name = 'Z'
    a3Name = '戳'
    eName = 'E'
    e2Name = 'EE'
    e3Name = 'EA'
    qName = 'Q'
    eNameT = 'E'
    qNameT = 'Q'
  }
}

const miss = ['a', 'z', 'c', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'

if (!cfg.gs70ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'r'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'r'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'r'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[妮露] 排名规则均未命中，已选择默认排名规则')
        ranking = 'r'
      } else {
        ranking = `${rankingThreePath}`
      }
    } else {
      ranking = `${rankingTwoPath}`
    }
  } else {
    ranking = `${rankingOnePath}`
  }
} else {
  ranking = `${gs70ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${eName}启动伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  }, {
    title: `${e3Name}一段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
  }, {
    title: `${e3Name}二段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
  }, {
    title: '水月伤害',
    params: { sy: true },
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][0] / 100, 'e')
  }, {
    title: '水月蒸发伤害',
    dmgKey: 'e',
    params: { sy: true },
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][0] / 100, 'e', 'vaporize')
  }, {
    title: `${qName}命中伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  }, {
    title: `${qName}命中蒸发`,
    dmgKey: 'q',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
  }, {
    title: '永世流沔伤害',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q')
  }, {
    title: '丰穰之核伤害',
    dmgKey: 'r',
    params: { bloom: true },
    dmg: ({ calc, attr }, { reaction }) => {
      return reaction('bloom')
    }
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    check: ({ params }) => params.bloom === true,
    title: '妮露天赋：[折旋落英之庭] 触发绽放反应时,将取代草原核产生「丰穰之核」,角色受到草元素攻击会使元素精通提升[mastery]点 { 该效果单人不生效 }',
    data: {
      mastery: 100
    }
  }, {
    check: ({ params }) => params.bloom === true,
    title: '妮露天赋：[翩舞永世之梦] 处于「金杯的丰馈」状态下的角色触发的丰穰之核造成的伤害提升[bloom]% { 该效果单人不生效 }',
    sort: 9,
    data: {
      bloom: ({ calc, attr }) => Math.max(0, Math.min(400, (calc(attr.hp) - 30000) / 1000 * 9))
    }
  }, {
    check: ({ params }) => params.sy === true,
    title: '妮露1命：[却月的轻舞] 水月造成的伤害提升[eDmg]%,净天水环的持续时间延长[_eSustainedPlus]秒',
    cons: 1,
    data: {
      eDmg: 65,
      _eSustainedPlus: 6
    }
  }, {
    check: ({ params }) => params.bloom === true,
    title: '妮露2命：[星天的花雨] 对敌人造成水元素伤害后,该敌人的水元素抗性降低[kx]%,触发绽放反应对敌人造成伤害后,该敌人的草元素抗性降低[_kx]% { 该效果单人不生效 }',
    cons: 2,
    data: {
      kx: 35,
      _kx: 35
    }
  }, {
    title: '妮露4命：[挽漪的节音] 七域舞步的翩转状态下的第三段舞步命中敌人后,将恢复[_energyevery]点元素能量,并使浮莲舞步·远梦聆泉造成的伤害提升[qDmg]%',
    cons: 4,
    data: {
      _energyevery: 15,
      qDmg: 50
    }
  }, {
    title: '妮露6命：[断霜的弦歌] 暴击率提升[cpct]%,暴击伤害提升[cdmg]%',
    sort: 9,
    cons: 6,
    data: {
      cpct: ({ calc, attr }) => Math.min(30, calc(attr.hp) / 1000 * 0.6),
      cdmg: ({ calc, attr }) => Math.min(60, calc(attr.hp) / 1000 * 1.2)
    }
  },
  { title: `4.28最后修改：[12.25重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs70ranking} 更新日志:${renew} 其他信息:${information}` }
]
