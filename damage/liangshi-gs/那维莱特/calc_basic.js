import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
    check: ({ cons }) => cons < 1,
    title: '重击单段伤害 零层',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100, 'a2')
  },
  {
    title: '重击单段伤害 一层',
    params: { qb: 2, bs: 1 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.1, 'a2')
  },
  {
    title: '重击单段伤害 二层',
    params: { qb: 5, bs: 2 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.25, 'a2')
  },
  {
    check: ({ cons }) => cons >= 1,
    title: '重击单段伤害 三层',
    params: { qb: 12, bs: 3 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.6, 'a2')
  },
  {
    title: '重击蓄力 3秒',
    dmgKey: 'zj',
    check: ({ cons }) => cons < 1,
    params: { qb: 5, bs: 2 },
    dmg: ({ talent, calc, attr, cons }, { basic }) => {
      return basic(1.25 * calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100 * 8, 'a2')
    }
  },
  {
    title: '重击蓄力 3秒',
    dmgKey: 'zj',
    check: ({ cons }) => cons >= 1,
    params: { qb: 12, bs: 3 },
    dmg: ({ talent, calc, attr, cons }, { basic }) => {
      return basic(1.6 * calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100 * 8, 'a2')
    }
  },
  {
    title: '泪水啊，我必偿还伤害',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  },
  {
    title: '潮水啊，我已归来伤害',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  },
  {
    title: '潮水啊，我已归来水爆伤害',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['水瀑伤害'] / 100, 'q')
  },
  {
    title: '潮水啊，我已归来总伤害',
    dmg: ({ talent, attr, calc }, { basic }) => {
      const td = talent.q['技能伤害'] + talent.q['水瀑伤害'] * 2
      return basic(td * calc(attr.hp) / 100, 'q')
    }
  },
  {
    check: ({ cons }) => cons < 1,
    title: '那万达白 二层重击',
    params: { teamA: true, qb: 5, bs: 2 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.25, 'a2')
  },
  {
    check: ({ cons }) => cons >= 1,
    title: '那万达白 三层重击',
    params: { teamA: true, qb: 12, bs: 3 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.6, 'a2')
  }]

export const defDmgKey = 'zj'
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    check: ({ params }) => params.qb !== undefined,
    title: '那维莱特天赋：[古海孑遗的权柄] [buffCount]层的「遗龙之荣」,将使重击·衡平推裁造成原本[_a2Dmg]%的伤害',
    data: {
      buffCount: ({ params }) => params.bs,
      _a2Dmg: ({ params }) => params.qb * 5 + 100
    }
  },
  {
    title: '那维莱特天赋：[至高仲裁的纪律] 基于当前生命值超出生命值上限30%的部分,使那维莱特获得至多[dmg]%水元素伤害加成',
    data: {
      dmg: 30
    }
  },
  {
    title: '那维莱特1命：[尊荣的创定] 那维莱特登场时获得一层「遗龙之荣」,进行重击蓄力·诉论心证与重击·衡平推裁时,那维莱特的抗打断能力提高[_interruption]%',
    cons: 1,
    data: {
      _interruption: 100
    }
  },
  {
    check: ({ params }) => params.bs !== undefined,
    title: '那维莱特2命：[律法的命诫] [buffCount]层的「遗龙之荣」,使重击·衡平推裁的暴击伤害提升[a2Cdmg]%',
    cons: 2,
    data: {
      buffCount: ({ params }) => params.bs,
      a2Cdmg: ({ params }) => params.bs * 14
    }
  },
  {
    title: '那维莱特6命：[忿怒的报偿] 重击·衡平推裁命中敌人时,每2秒,将额外释放两道洪流',
    cons: 6
  },
  {
    title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性',
    check: ({ params }) => params.teamA === true,
    data: {
      kx: 40
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升和[atkPct]%攻击力',
    check: ({ params, cons }) => (cons < 6 && cons > 1) && params.teamA === true,
    sort: 1,
    data: {
      atkPct: 20,
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升和[atkPct]%攻击力',
    check: ({ params, cons }) => cons >= 6 && params.teamA === true,
    sort: 1,
    data: {
      atkPct: 40,
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32
    }
  },
  {
    title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 2 && params.teamA === true,
    sort: 1,
    data: {
      mastery: 200
    }
  },
  {
    title: '达达利亚天赋：[诸武精通] 队伍中自己的角色普通攻击等级提高[_aLevel]级 (请手动提升1级)',
    check: ({ params }) => params.teamA === true,
    data: {
      _aLevel: 1
    }
  },
  {
    title: '白术天赋：[在地为化] 受到无郤气护盾治疗的角色触发的燃烧、绽放、超绽放、烈绽放反应造成的伤害提升[bloom]%',
    check: ({ params }) => params.teamA === true,
    data: {
      bloom: 100
    }
  },
  {
    title: '白术4命：[山岚残芯] 施放愈气全形论之后,队伍中附近的所有角色元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 4 && params.teamA === true,
    sort: 1,
    data: {
      mastery: 80
    }
  },
  {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamA === true,
    data: {
      hpPct: 25
    }
  },
  { title: '12.14最后修改：[11.4重置] 为天赋增加层数显示' }
]
