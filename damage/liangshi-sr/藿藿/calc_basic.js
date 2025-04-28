import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [
  {
    title: '普通攻击伤害',
    dmg: ({ talent, attr }, { basic }) => basic(attr.hp * talent.a['技能伤害'], 'a')
  }, {
    title: '战技生命回复 主目标',
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.e['目标治疗·百分比生命'] + talent.e['目标治疗·固定值'])
  }, {
    title: '低生命战技回复 主目标',
    params: { cons4: true },
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.e['目标治疗·百分比生命'] + talent.e['目标治疗·固定值'])
  }, {
    title: '战技生命回复 相邻目标',
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.e['相邻目标治疗·百分比生命'] + talent.e['相邻目标治疗·固定值'])
  }, {
    title: '低生命战技回复 相邻目标',
    params: { cons4: true },
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.e['相邻目标治疗·百分比生命'] + talent.e['相邻目标治疗·固定值'])
  }, {
    title: '终结技攻击力提高',
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.q['攻击力提高百分比']),
        type: 'text'
      }
    }
  }, {
    title: '天赋生命回复',
    dmg: ({ talent, attr }, { heal }) => heal(attr.hp * talent.t['治疗·百分比生命'] + talent.t['治疗·百分比生命'])
  }
]

export const defDmgIdx = 3
export const mainAttr = 'hp,cpct,cdmg,heal'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    check: ({ params }) => params.technique >= 1,
    title: '霍霍秘技：[凶煞•劾压鬼物] 恐吓周围的敌人，使其攻击力降低[atkDef]%。',
    data: {
      atkDef: 25
    }
  }, {
    title: '霍霍行迹：[怯惧应激] 我方目标提供治疗时,霍霍恢复[_energyevery]点能量',
    tree: 3,
    data: {
      _energyevery: 1
    }
  }, {
    title: '霍霍1魂：[岁阳寄体,妖邪凭依] 当藿藿拥有【禳命】时我方全体提高[speedPct]%的速度',
    cons: 1,
    data: {
      speedPct: 12
    }
  }, {
    check: ({ params }) => params.cons4 === true,
    title: '霍霍4魂：[坐卧不离,争拗难宁] 施放战技或触发天赋为我方目标提供治疗时,提供的治疗量提高[heal]%',
    cons: 4,
    data: {
      heal: 80
    }
  }, {
    title: '霍霍6魂：[同休共戚,相须而行] 为我方目标提供治疗时，使目标造成的伤害提高[dmg]%',
    cons: 6,
    data: {
      dmg: 50
    }
  },
  { title: '11.25最后修改：[11.26重置]' }
]
