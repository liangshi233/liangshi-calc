import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs94ranking = cfg.gs94ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '羽袖一触'
let eNameT = 'E'
let qName = '二刀之形·比翼'
let qNameT = 'Q'
let c2Name = '二命'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '心织刀流'
    c2Name = '二命座'
    eNameT = '羽袖一触'
    qNameT = '二刀之形·比翼'
  } else if (NamePath == 3) {
    eNameT = '羽袖一触'
    qNameT = '二刀之形·比翼'
  } else if (NamePath == 4) {
    eName = '元素战技'
    qName = '元素爆发'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 5) {
    aName = '普攻'
    a3Name = '下落'
    eName = 'E技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
    aName = 'A'
    a2Name = 'Z'
    a3Name = '戳'
    eName = 'E'
    qName = 'Q'
    c2Name = 'C2'
    eNameT = 'E'
    qNameT = 'Q'
  }
}

const miss = ['f', 'h', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs36ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'e2'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'e2'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'e2'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[千织] 排名规则均未命中，已选择默认排名规则')
        ranking = 'e2'
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
  ranking = `${gs94ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${eNameT}后${aName}一段`,
    dmgKey: 'undefined',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: `${eNameT}后${aName}四段`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
  }, {
    title: `${eNameT}后${a2Name}`,
    dmgKey: 'z',
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害'] / 2, 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  }, {
    title: `${eNameT}后高空${a3Name}伤害`,
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害2'][1], 'a3')
  }, {
    title: `${eName}释放伤害`,
    dmgKey: 'e',
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
  }, {
    title: `${eName}人偶伤害`,
    dmgKey: 'e2',
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
  }, {
    title: `${c2Name}人偶切斩伤害`,
    check: ({ cons }) => cons >= 2,
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100) * 1.7, 'e')
  }, {
    title: `${qName}伤害`,
    dmgKey: 'q',
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
  }, {
    title: '一五千钟 后台10斩2协',
    check: ({ cons }) => cons < 4,
    params: { teamA: true },
    dmg: ({ talent, calc, attr, cons }, { basic }) => {
      let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
      let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
      return {
        dmg: e1.dmg * 3 + e2.dmg * 10,
        avg: e1.avg * 3 + e2.avg * 10
      }
    }
  }, {
    title: '一五千钟 后台10斩2协3绢',
    check: ({ cons }) => cons >= 4,
    params: { teamA: true },
    dmg: ({ talent, calc, attr, cons }, { basic }) => {
      let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
      let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
      return {
        dmg: e1.dmg * 3 + e2.dmg * 10 + e2.dmg * 3 * 1.7,
        avg: e1.avg * 3 + e2.avg * 10 + e2.avg * 3 * 1.7
      }
    }
  }]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [
  {
    title: '千织天赋：[锦上添花] 队伍中附近的角色创造岩元素创造物时，获得[dmg]%岩元素伤害加成',
    data: {
      dmg: 20
    }
  }, {
    title: '千织2命：[落染五色] 施放二刀之形·比翼后，将在当前场上自己的角色身边唤出简易型自律人形 · 绢，对附近的敌人发起攻击，造成岩元素范围伤害',
    cons: 2
  }, {
    title: '千织6命：[万理一空] 触发固有天赋「量体裁衣」的裁锦后，羽袖一触的冷却时间减少[_eCdPlus]秒。此外，普通攻击造成的伤害提升[aPlus] ',
    cons: 6,
    data: {
      _eCdPlus: 12,
      aPlus: ({ attr, calc }) => calc(attr.def) * 235 / 100
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '五郎技能：[犬坂吠吠方圆阵] 领域内的当前场上角色防御力提升[defPlus]点,岩元素伤害加成提升[dmg]%,抗打断能力提升[_interruption]%',
    sort: 1,
    data: {
      defPlus: 438,
      dmg: 15,
      _interruption: 50
    }
  }, {
    check: ({ params, cons }) => params.teamA === true,
    title: '五郎6命：[犬勇•忠如山] 施放犬坂吠吠方圆阵或兽牙逐突形胜战法后提高附近的队伍中所有角色[eCdmg]%岩元素暴击伤害',
    data: {
      eCdmg: 40,
      qCdmg: 40
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
    data: {
      kx: 20
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '元素共鸣：[坚定之岩] 护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%岩元素抗性',
    data: {
      shield: 25,
      dmg: 15,
      kx: 20
    }
  },
  { title: `5.3最后修改：[1.30重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs94ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}` }
]
