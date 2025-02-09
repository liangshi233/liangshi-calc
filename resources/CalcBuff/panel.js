export const characterBuffGs = {
  title: '角色状态：[面板属性] 生命值[_hp]（[_hpBase] +[_hpPct]），当前攻击力[_atk]（[_atkBase] +[_atkPct]），防御力[_def]（[_defBase] +[_defPct]），元素精通[_mastery]，暴击率[_cpct]%，暴击伤害[_cdmg]%，充能效率[_recharge]%，治疗加成[_heal]%，伤害加成[_dmg]%',
  sort: 10,
  data: {
    _hp: ({ calc, attr }) => calc(attr.hp),
    _hpBase: ({ attr }) => attr.hp.base,
    _hpPct: ({ calc, attr }) => calc(attr.hp) - attr.hp.base,
    _atk: ({ calc, attr }) => calc(attr.atk),
    _atkBase: ({ attr }) => attr.atk.base,
    _atkPct: ({ calc, attr }) => calc(attr.atk) - attr.atk.base,
    _def: ({ calc, attr }) => calc(attr.def),
    _defBase: ({ attr }) => attr.def.base,
    _defPct: ({ calc, attr }) => calc(attr.def) - attr.def.base,
    _mastery: ({ calc, attr }) => calc(attr.mastery),
    _cpct: ({ calc, attr }) => calc(attr.cpct),
    _cdmg: ({ calc, attr }) => calc(attr.cdmg),
    _recharge: ({ calc, attr }) => calc(attr.recharge),
    _heal: ({ calc, attr }) => calc(attr.heal),
    _dmg: ({ calc, attr }) => calc(attr.dmg)
  }
}

export const characterBuffSr = {
  title: '角色状态：[面板属性] 生命值[_hp]（[_hpBase] +[_hpPct]），当前攻击力[_atk]（[_atkBase] +[_atkPct]），防御力[_def]（[_defBase] +[_defPct]），速度[_speed]，暴击率[_cpct]%，暴击伤害[_cdmg]%，充能效率[_recharge]%，击破特攻[_stance]%，效果命中[_effPct]%，效果抵抗[_effDef]%，治疗加成[_heal]%，伤害加成[_dmg]%',
  sort: 10,
  data: {
    _hp: ({ calc, attr }) => calc(attr.hp),
    _hpBase: ({ attr }) => attr.hp.base,
    _hpPct: ({ calc, attr }) => calc(attr.hp) - attr.hp.base,
    _atk: ({ calc, attr }) => calc(attr.atk),
    _atkBase: ({ attr }) => attr.atk.base,
    _atkPct: ({ calc, attr }) => calc(attr.atk) - attr.atk.base,
    _def: ({ calc, attr }) => calc(attr.def),
    _defBase: ({ attr }) => attr.def.base,
    _defPct: ({ calc, attr }) => calc(attr.def) - attr.def.base,
    _speed: ({ calc, attr }) => calc(attr.speed),
    _cpct: ({ calc, attr }) => calc(attr.cpct),
    _cdmg: ({ calc, attr }) => calc(attr.cdmg),
    _recharge: ({ calc, attr }) => calc(attr.recharge),
    _stance: ({ calc, attr }) => calc(attr.stance),
    _effPct: ({ calc, attr }) => calc(attr.effPct),
    _effDef: ({ calc, attr }) => calc(attr.effDef),
    _heal: ({ calc, attr }) => calc(attr.heal),
    _dmg: ({ calc, attr }) => calc(attr.dmg)
  }
}

export const enemyBuffGs = {
  title: '敌人状态：[面板属性] 当前生命值[TargetHp]%',
  data: {
    TargetHp: ({ params }) => ( params.TargetHp || 100 )
  }
}

export const enemyBuffSr = {
  title: '敌人状态：[面板属性] 具有[toughness]韧性上限',
  data: {
    toughness: ({ params }) => ( params.toughness || 10 )
  }
}

export const MasteryGs = {
  title: '角色状态：[元素精通] 蒸发、融化反应造成伤害时，伤害提升[_vaporize]%；超载、超导、感电、燃烧、碎冰、扩散、绽放、超绽放、烈绽放反应造成的伤害提升[_swirl]%；超激化、蔓激化反应代理的伤害提升提高[_aggravate]%；结晶反应形成的晶片护盾，提高的伤害吸收量提升[_shield]%。',
  sort: 10,
  data: {
    _vaporize: ({ calc, attr }) => ((25 / 9) * calc(attr.mastery) / (calc(attr.mastery) + 1400)) * 100,
    _swirl: ({ calc, attr }) => (16 * calc(attr.mastery) / (calc(attr.mastery) + 2000)) * 100,
    _aggravate: ({ calc, attr }) => (5 * calc(attr.mastery) / (calc(attr.mastery) + 1200)) * 100,
    _shield: ({ calc, attr }) => ((40 / 9) * calc(attr.mastery) / (calc(attr.mastery) + 1400)) * 100
  }
}

