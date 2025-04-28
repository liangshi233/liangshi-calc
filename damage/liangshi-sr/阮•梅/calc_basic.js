import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [
  {
    title: '普攻伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
  }, {
    title: '战技Buff加伤',
    dmg: ({ talent, cons, calc, attr }) => {
      return {
        avg: Format.percent(talent.e['伤害提高'] + ((calc(attr.stance) >= 120) ? (Math.min(36, (calc(attr.stance) - 120) / 10 * 6) / 100) : 0)),
        type: 'text'
      }
    }
  }, {
    title: '终结技击破伤害-普通敌人',
    params: { q: true, e: true, toughness: 2 },
    dmg: ({ talent, params }, { reaction }) => {
      return {
        avg: reaction('iceBreak').avg / 0.9 * (params.toughness + 2) / 4 * (talent.q['击破伤害比例'] + Math.min(20, ((params.technique || 0) * 1)))
      }
    }
  }, {
    title: '终结技击破伤害-精英敌人',
    params: { q: true, e: true, toughness: 10 },
    dmg: ({ talent, params }, { reaction }) => {
      return {
        avg: reaction('iceBreak').avg / 0.9 * (params.toughness + 2) / 4 * (talent.q['击破伤害比例'] + Math.min(20, ((params.technique || 0) * 1)))
      }
    }
  }, {
    title: '终结技击破伤害-普通boss',
    params: { q: true, e: true, toughness: 12 },
    dmg: ({ talent, params }, { reaction }) => {
      return {
        avg: reaction('iceBreak').avg / 0.9 * (params.toughness + 2) / 4 * (talent.q['击破伤害比例'] + Math.min(20, ((params.technique || 0) * 1)))
      }
    }
  }, {
    title: '天赋击破伤害-普通敌人',
    params: { q: true, e: true, toughness: 2 },
    dmg: ({ talent, cons, params }, { reaction }) => {
      let cons6 = cons * 1 >= 6 ? 3 : 1
      return {
        avg: reaction('iceBreak').avg / 1 * (params.toughness + 2) / 4 * (talent.t['击破伤害比例'] + Math.min(20, ((params.technique || 0) * 1))) * cons6
      }
    }
  }, {
    title: '天赋击破伤害-精英敌人',
    params: { q: true, e: true, toughness: 10 },
    dmg: ({ talent, cons, params }, { reaction }) => {
      let cons6 = cons * 1 >= 6 ? 3 : 1
      return {
        avg: reaction('iceBreak').avg / 1 * (params.toughness + 2) / 4 * (talent.t['击破伤害比例'] + Math.min(20, ((params.technique || 0) * 1))) * cons6
      }
    }
  }, {
    title: '天赋击破伤害-普通boss',
    params: { q: true, e: true, toughness: 12 },
    dmg: ({ talent, cons, params }, { reaction }) => {
      let cons6 = cons * 1 >= 6 ? 3 : 1
      return {
        avg: reaction('iceBreak').avg / 1 * (params.toughness + 2) / 4 * (talent.t['击破伤害比例'] + Math.min(20, ((params.technique || 0) * 1))) * cons6
      }
    }
  }, {
    title: '天赋击破伤害-可可利亚',
    params: { q: true, e: true, toughness: 18 },
    dmg: ({ talent, cons, params }, { reaction }) => {
      let cons6 = cons * 1 >= 6 ? 3 : 1
      return {
        avg: reaction('iceBreak').avg / 1 * (params.toughness + 2) / 4 * (talent.t['击破伤害比例'] + Math.min(20, (params.technique || 0))) * cons6
      }
    }
  }
]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg,stance'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    title: '敌人状态：[韧性] 具有[toughness]韧性',
    data: {
      toughness: ({ params }) => params.toughness == 0 ? 0 : (params.toughness || 0)
    }
  }, {
    check: ({ params }) => params.technique >= 1,
    title: '阮•梅秘技：[拭琴抚罗袂] 在模拟宇宙中，拥有[buffCount]个祝福，击破敌方目标弱点后对其额外造成[buff]%冰属性击破伤害的击破伤害。',
    data: {
      buffCount: ({ params }) => params.technique,
      buff: ({ params }) => Math.min(2000, params.technique * 100)
    }
  }, {
    check: ({ params }) => params.e === true,
    title: '阮•梅技能：[慢捻抹复挑] 当阮•梅拥有【弦外音】时，我方全体伤害提高[dmg]%',
    data: {
      dmg: ({ talent }) => talent.e['伤害提高'] * 100
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '阮•梅技能：[摇花缎水，沾衣不摘] 处于结界中时我方全体全属性抗性穿透提高[kx]%',
    data: {
      kx: ({ talent }) => talent.q['抗性穿透提高'] * 100
    }
  }, {
    title: '阮•梅行迹：[物体呼吸中] 我方全体击破特攻提高[stance]%',
    tree: 1,
    data: {
      stance: 20
    }
  }, {
    check: ({ calc, attr }) => calc(attr.stance) >= 120,
    title: '阮•梅行迹：[落烛照水燃] 我方全体伤害提高的效果额外提高[dmg]%',
    tree: 2,
    data: {
      dmg: ({ calc, attr }) => Math.min(36, (calc(attr.stance) - 120) / 10 * 6)
    }
  }, {
    title: '阮•梅行迹：[落烛照水燃] 阮•梅的回合开始时,恢复[_energyevery]点能量',
    tree: 3,
    data: {
      _energyevery: 5
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '阮•梅1魂：[****仿绣图] 终结技展开结界期间，我方全体造成伤害时无视目标[ignore]%的防御力',
    cons: 1,
    data: {
      ignore: 20
    }
  }, {
    title: '阮•梅2魂：[芦前漫步] 我方全体对处于弱点击破状态的敌方目标造成伤害时，攻击力提高[atkPct]%',
    cons: 2,
    data: {
      atkPct: 40
    }
  }, {
    title: '阮•梅4魂：[寻神铜镜前]当敌方目标的弱点被击破时，身击破特攻提高[stance]%',
    cons: 4,
    data: {
      stance: 100
    }
  }, {
    title: '阮•梅6魂：[半脱纱巾落团扇] 天赋造成的击破伤害倍率额外提高200%',
    cons: 6
  },
  { title: '1.4最后修改：[12.28重置] 修复天赋加成显示异常' }
]

/**
 * 以下是更新日志
 * {title: '1.4最后修改：[12.28重置] 增加排名规则'}
 */
