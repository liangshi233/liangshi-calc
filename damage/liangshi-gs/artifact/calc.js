const attr = function (key, val, elem = '', unit = '%') {
  const keyMap = {
    hp: '生命值',
    hpPlus: '生命值',
    atk: '攻击力',
    def: '防御力',
    cpct: '暴击率',
    dmg: '元素伤害',
    phy: '物理伤害',
    shield: '护盾强效',
    heal: '治疗',
    mastery: '元素精通'
  }
  let ret = {
    title: `${keyMap[key]}提高${val}${unit}`,
    isStatic: true,
    data: {}
  }
  ret.data[key] = val
  if (elem) {
    ret.elem = elem
  }
  return ret
}

const buffs = {

//1星

  初学者: {},

//3星

  冒险家: {
    2: attr('hpPlus', 1000, '', '点'),
    4: {
      title: '开启各类宝箱后,恢复[_restore]生命值',
      data: {
        _restore: ({ attr }) => (attr.hp.base + attr.hp.plus + attr.hp.pct * attr.hp.base) * 30 / 100
      }
    }
  },

  幸运儿: {
    2: attr('defPlus', 100, '', '点'),
    4: {
      title: '拾取摩拉时,恢复[_restore]生命值',
      data: {
        _restore: 300
      }
    }
  },

  游医: {
    2: {
      title: '角色受到的治疗效果提高[healInc]%',
      data: {
        healInc: 20
      }
    },
    4: {
      title: '施放元素爆发时,恢复[_restore]生命值',
      data: {
        _restore: ({ attr }) => (attr.hp.base + attr.hp.plus + attr.hp.pct * attr.hp.base) * 20 / 100
      }
    }
  },

//4星

  祭冰之人: {},

  祭水之人: {},

  祭火之人: {},

  祭雷之人: {},

  勇士之心: {
    2: attr('atkPct', 18),
    4: { // 这里在无设置情况下优先触发狼的末路，暂不考虑多敌人同时触发
      title: '敌人当前生命值[buff]%，造成的伤害增加[dmg]%',
      data: {
        buff: ({ params, weapon }) => params.TargetHp || (weapon.name === '狼的末路' ? 30 : 100),
        dmg: ({ params, weapon }) => (params.TargetHp || (weapon.name === '狼的末路' ? 30 : 100)) > 50 ? 30 : 0
      }
    }
  },

  奇迹: {
    2: {
      title: '所有元素抗性提高[_res]%',
      data: {
        _res: 20
      }
    },
    4: {
      title: '受到某个元素类型的伤害后,相应的抗性提升[_res]%',
      data: {
        _res: 30
      }
    }
  },

  学士: {
    2: attr('recharge', 20),
    4: {
      check: ({ weaponTypeName }) => ['弓', '法器'].includes(weaponTypeName),
      title: '获得元素微粒或元素晶球时,队伍中所有弓箭和法器角色额外恢复[_energyevery]点元素能量',
      data: {
        _energyevery: 3
      }
    }
  },

  守护之心: {
    2: attr('defPct', 30),
    4: {
      title: '根据队伍中不同[buff]种元素类型的自己的角色,提升[_res]%相应的元素抗性',
      data: {
        buff: ({ params }) => params.ElementDifferent || 3,
        _res: 30
      }
    }
  },

  战狂: {
    2: attr('cpct', 12),
    4: { // 这里在无设置情况下优先触发精5黎明神剑
      title: '自身生命值[buff]%，暴击率提升[cpct]%',
      data: {
        buff: ({ params, weapon }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : 50) : 50),
        cpct: ({ params, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : 50) : 50)) < 70 ? 24 : 0
      }
    }
  },

  教官: {
    2: attr('mastery', 80),
    4: {
      title: '触发元素反应后，队伍中所有角色的元素精通提高[mastery]点',
      data: {
        mastery: 120 ,
        masteryInc: 120
      }
    }
  },

  武人: {
    2: {
      title: '普攻与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 15,
        a2Dmg: 15
      }
    },
    4: {
      title: '施放元素战技后,普通攻击和重击造成的伤害提升[aDmg]%',
      data: {
        aDmg: 25,
        a2Dmg: 25
      }
    }
  },

  流放者: {
    2: attr('recharge', 20)
  },

  行者之心: {
    2: attr('atkPct', 18),
    4: {
      title: '重击的暴击率提高[a2Cpct]%',
      data: {
        a2Cpct: 30
      }
    }
  },

  赌徒: {
    2: {
      title: '元素战技造成的伤害提升[eDmg]%',
      data: {
        eDmg: 20
      }
    },
    4: {
      title: '击败敌人时,有100%概率清除元素战技的冷却时间',
      data: {
        _eCd: 100
      }
    }
  },

//5星

  如雷的盛怒: {
    2: attr('dmg', 15, '雷'),
    4: {
      title: '超载、感电、超导反应造成的伤害提升[overloaded]%，超激化反应带来的伤害提升提高[aggravate]%,触发上述元素反应或原激化反应时,元素战技冷却时间减少[_ecdPlus]秒',
      data: {
        overloaded: 40,
        electroCharged: 40,
        superConduct: 40,
        hyperBloom: 40,
        aggravate: 20,
        _ecdPlus: 1
      }
    }
  },

  平息鸣雷的尊者: {
    2: {
      title: '雷元素抗性提高[_electroRes]%',
      data: {
         _electroRes: 40
      }
    },
    4: {
      check: ({ params }) => params.FireAttachment != true && params.IceAttachment != true && params.WindAttachment != true,
      title: '对处于雷元素影响下的敌人造成的伤害提升[dmg]%', //目标不处于火冰风元素影响下，水岩草元素影响下雷可共存，激元素不触发此效果
      data: {
        dmg: 35
      }
    }
  },

  悠古的磐岩: {
    2: attr('dmg', 15, '岩'),
    4: {
      check: ({ element }) => !['岩', '风', '草'].includes(element),
      title: '获得结晶反应形成的晶片时，队伍中所有角色获得[dmg]%对应元素伤害加成',
      data: {
        dmg: 35
      }
    }
  },

  昔日宗室之仪: {
    2: {
      title: '元素爆发造成的伤害提升[qDmg]%',
      data: {
        qDmg: 20
      }
    },
    4: {
      title: '施放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
//      check: ({ currentTalent }) => !currentTalent || currentTalent === 'q',
      data: {
        atkPct: 20
      }
    }
  },

  染血的骑士道: {
    2: attr('phy', 25),
    4: {
      title: '击败[buff]名敌人后，重击不消耗体力且造成的伤害提升[a2Dmg]%',
      data: {
        buff: ({ params }) => params.Arbitrarilykill || 1,
        a2Dmg: ({ params }) => (params.Arbitrarilykill || 1) > 0 ? 50 : 0,
        _a2Stamina: 100
      }
    }
  },

  流浪大地的乐团: {
    2: attr('mastery', 80),
    4: {
      check: ({ weaponTypeName }) => ['法器', '弓'].includes(weaponTypeName),
      title: '角色重击造成的伤害提高[a2Dmg]%',
      data: {
        a2Dmg: 35
      }
    }
  },

  渡过烈火的贤人: {
    2: {
      title: '火元素抗性提高[_pyroRes]%',
      data: {
        _pyroRes: 40
      }
    },
    4: {
      check: ({ params }) => params.IceAttachment != true && params.WaterAttachment != true && params.MineAttachment != true && params.WindAttachment != true,
      title: '对处于火元素影响下的敌人造成的伤害提升[dmg]%' , //目标不处于冰水雷风元素影响下，岩草元素影响下火可共存，燃元素可触发此效果
      data: {
        dmg: 35
      }
    }
  },

  炽烈的炎之魔女: {
    2: attr('dmg', 15, '火'),
    4: {
      title: '超载、燃烧、烈绽放反应造成的伤害提升[overloaded]%，蒸发、融化反应的加成系数提高[vaporize]%，释放元素战技[buff]次提高[dmg]%元素伤害加成，',
      data: {
        vaporize: 15,
        melt: 15,
        overloaded: 40,
        burning: 40,
        burgeon: 40,
        dmg: ({ params, element }) => element === '火' ? (Math.min((params.SkillsUse || 1), 3) * 7.5) : 0,
        buff: ({ params }) => params.SkillsUse || 1
      }
    }
  },

  翠绿之影: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '扩散反应造成的伤害提升[swirl]%，根据扩散的元素类型，降低受到影响的敌人[fykx]%的对应元素抗性',
      data: {
        swirl: 60,
        fykx: 40
      }
    }
  },

  被怜爱的少女: {
    2: attr('heal', 15),
    4: {
      title: '施放元素战技或元素爆发后，队伍中所有角色受治疗效果加成提高[healInc]%',
      data: {
        healInc: 20
      }
    }
  },

  角斗士的终幕礼: {
    2: attr('atkPct', 18),
    4: {
      check: ({ weaponTypeName }) => ['单手剑', '双手剑', '长柄武器'].includes(weaponTypeName),
      title: '角色普通攻击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 35
      }
    }
  },

  逆飞的流星: {
    2: attr('shield', 35),
    4: {
      check: ({ params, element }) => params.ShieldDetermine == true || params.ShieldTime > 0 || element === '岩',
      title: '处于护盾庇护下时，额外获得[aDmg]%普通攻击和重击伤害加成',
      data: {
        aDmg: 40,
        a2Dmg: 40
      }
    }
  },

  冰风迷途的勇士: {
    2: attr('dmg', 15, '冰'),
    4: {
      check: ({ params }) => params.FireAttachment != true && params.MineAttachment != true && params.WindAttachment != true,
      title: '攻击处于冰元素影响下的敌人时，暴击率提高，若敌人处于冻结状态下，则暴击率额外提高，合计提高[cpct]%暴击率',//目标不处于火雷风元素影响下，水岩草元素影响下冰与冻可共存，冻元素可触发此效果
      data: {
        cpct: ({ params }) => (params.FreezeDetermine === true ? 2 : 1) * 20
      }
    }
  },

  沉沦之心: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '施放元素战技后，普通攻击与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 30,
        a2Dmg: 30
      }
    }
  },

  千岩牢固: {
    2: attr('hpPct', 20),
    4: {
      title: '元素战技命中敌人后，使队伍中附近的所有角色攻击力提升[atkPct]%，护盾强效提升[shield]%',
      data: {
        atkPct: 20 ,
        shield: 30
      }
    }
  },

  苍白之火: {
    2: attr('phy', 25),
    4: {
      title: '元素战技命中敌人[buff]次后,攻击力提升[atkPct]%,造成的物理伤害提高[phy]%',
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        atkPct: ({ params }) => Math.min((params.SkillsHit || 1), 2) * 9,
        phy: ({ params }) => Math.max(0, Math.min((params.SkillsHit || 1), 2) - 1) * 25
      }
    }
  },

  绝缘之旗印: {
    2: attr('recharge', 20),
    4: {
      title: '提高元素爆发造成的伤害[qDmg]%',
      sort: 4,
      data: {
        qDmg: ({ attr }) => Math.min(75, (attr.recharge.base + attr.recharge.plus) * 0.25)
      }
    }
  },

  追忆之注连: {
    2: attr('atkPct', 18),
    4: {
      title: '施放元素战技后,恢复[_energyevery]点元素能量,使接下来的普通攻击、重击、下落攻击造成的伤害提高[aDmg]%',
      data: {  //Q后普攻重击默认不触发
        _energyevery: ({ params }) => (params.EnergyDetermine || 100) >= 15 ? -15 : 0,
        aDmg: ({ params }) => (params.EnergyDetermine || 100) >= 15 ? 50 : 0,
        a2Dmg: ({ params }) => (params.EnergyDetermine || 100) >= 15 ? 50 : 0,
        a3Dmg: ({ params }) => (params.EnergyDetermine || 100) >= 15 ? 50 : 0
      }
    }
  },

  华馆梦醒形骸记: {
    2: attr('defPct', 30),
    4: {
      title: '[buff]层问答,提供[defPct]%防御与[dmg]%岩元素伤害加成',
      data: { // 6秒损失1层，暂时不计算损失，默认提供1层效果
        buff: ({ params }) => Math.min(((params.RockDmg || 0) + Math.floor((params.TruceTime || 0) / 3) + 1), 4),
        defPct: ({ params }) => Math.min(((params.RockDmg || 0) + Math.floor((params.TruceTime || 0) / 3) + 1), 4) * 6 ,
        dmg: ({ params, element }) => element === '岩' ? Math.min(((params.RockDmg || 0) + Math.floor((params.TruceTime || 0) / 3) + 1), 4) * 6 : 0
      }
    }
  },

  海染砗磲: {
    2: attr('heal', 15)
  },

  来歆余响: {
    2: attr('atkPct', 18),
    4: {
      title: '普通攻击命中敌人时,普通攻击造成的伤害提高[aPlus]，当前效果触发概率[buff]%',
      sort: 9,
      data: {
        buff: ({ params }) => (params.EchoesProbability || 1) * 100,
        aPlus: ({ params, attr }) => (attr.atk.base + attr.atk.plus + attr.atk.pct * attr.atk.base / 100) * 70 / 100 * (params.EchoesProbability || 1)
      }
    }
  },

  辰砂往生录: {
    2: attr('atkPct', 18),
    4: {
      title: '施放元素爆发后攻击力提升,生命值降低时攻击力进一步提升.[buff]层「潜光」提升合计[atkPct]%攻击力',
      data: { // 自身不处于护盾下默认额外提供1层，敌人处于燃烧状态下且自身不处于护盾下提供满层
        buff: ({ params }) => Math.min((params.BurningDetermine == true ? (!params.ShieldTime ? 4 : (params.ChangeHp || 0)) : ((params.SubjectedDmg || (!params.ShieldTime ? 1 : 0)) + (ChangeHp || 0))), 4),
        atkPct: ({ params }) => Math.min((params.BurningDetermine == true ? (!params.ShieldTime ? 4 : (params.ChangeHp || 0)) : ((params.SubjectedDmg || (!params.ShieldTime ? 1 : 0)) + (ChangeHp || 0))), 4) * 10 + 8
      }
    }
  },

  深林的记忆: {
    2: attr('dmg', 15, '草'),
    4: {
      title: '元素战技或元素爆发命中敌人后，使命中目标的元素抗性降低[kx]%',
      check: ({ element }) => element === '草',
      data: {
        kx: 30
      }
    }
  },

//做到这里

  饰金之梦: {
    2: attr('mastery', 80),
    4: {
      title: '触发元素反应后，队伍存在不同元素类型角色[buff]个，元素精通提升[mastery]点，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => Math.min((params.ElementDifferent || 3), 3),
        mastery: ({ params }) => Math.min((params.ElementDifferent || 3) , 3) * 50,
        atkPct: ({ params }) => (params.ElementSame || 1) * 14
      }
    }
  },

  乐园遗落之花: {
    2: attr('mastery', 80),
    4: {
      check: ({ element }) => !['冰', '岩'].includes(element),
      title: '装备者触发绽放、超绽放、烈绽放[buff]次，使上述反应伤害提高[bloom]%',
      data: { // 暂时不做适配，默认触发满层
        buff: ({ params }) => params.BloomNumber || 4,
        bloom: ({ params }) => 40 + (params.BloomNumber || 4) * 40 * 0.25,
        burgeon: ({ params }) => 40 + (params.BloomNumber || 4) * 40 * 0.25,
        hyperBloom: ({ params }) => 40 + (params.BloomNumber || 4) * 40 * 0.25
      }
    }
  },

  沙上楼阁史话: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '重击命中敌人后，普通攻击速度提升[_aSpeed]%，普通攻击、重击与下落攻击造成的伤害提升[aDmg]%',
      data: {
        _aSpeed: 10,
        aDmg: 40,
        a2Dmg: 40,
        a3Dmg: 40
      }
    }
  },

  水仙之梦: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '普通攻击、重击、下落攻击、元素战技与元素爆发合计命中敌人[buff]类,攻击力提高[atkPct]%,元素伤害加成提升[dmg]%',
      data: {
        buff: ({ params }) => Math.min((Math.min((params.NormalHit || 0), 1) + Math.min((params.ChargedHit || 0), 1) + Math.min((params.PlungingHit || 0), 1) + Math.min((params.SkillsHit || 1), 1) + Math.min((params.BurstHit || 0), 1)), 4),
        atkPct: ({ params }) => Math.min((9 * Math.min((Math.min((params.NormalHit || 0), 1) + Math.min((params.ChargedHit || 0), 1) + Math.min((params.PlungingHit || 0), 1) + Math.min((params.SkillsHit || 1), 1) + Math.min((params.BurstHit || 0), 1)), 4) - 2), 0),
        dmg: ({ params, element }) => element === '水' ? ((Math.min((Math.min((params.NormalHit || 0), 1) + Math.min((params.ChargedHit || 0), 1) + Math.min((params.PlungingHit || 0), 1) + Math.min((params.SkillsHit || 1), 1) + Math.min((params.BurstHit || 0), 1)), 4) == 1 ? 1 : 0) + (Math.min((6 * Math.min((Math.min((params.NormalHit || 0), 1) + Math.min((params.ChargedHit || 0), 1) + Math.min((params.PlungingHit || 0), 1) + Math.min((params.SkillsHit || 1), 1) + Math.min((params.BurstHit || 0), 1)), 4) - 3), 0))) : 0
      }
    }
  },

  花海甘露之光: {
    2: attr('hpPct', 20),
    4: {
      title: '装备者受到伤害后,元素战技与元素爆发造成的伤害提升[eDmg]%',
      data: { // 默认一层，不处于护盾下且敌人燃烧给满层,与暗巷闪光一同携带优先触发花海甘露之光
        eDmg: ({ params }) => 10 + 10 * 0.8 * (params.SubjectedDmg || (!params.ShieldTime ? (BurningDetermine == true ? 5 : 1) : 0)),
        qDmg: ({ params }) => 10 + 10 * 0.8 * (params.SubjectedDmg || (!params.ShieldTime ? (BurningDetermine == true ? 5 : 1) : 0))
      }
    }
  },

  逐影猎人: {
    2: {
      title: '普通攻击与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 15,
        a2Dmg: 15
      }
    },
    4: {
      title: '当前生命值提升或降低时，暴击率提升[cpct]%',
      data: { // 自身不处于护盾下默认额外提供1层，敌人处于燃烧状态下且自身不处于护盾下提供满层
        buff: ({ params }) => Math.min((params.BurningDetermine == true ? (!params.ShieldTime ? 3 : (params.ChangeHp || 0)) : ((params.ChangeHp || 0) + (!params.ShieldTime ? 1 : 0))), 3),
        cpct: ({ params }) => Math.min((params.BurningDetermine == true ? (!params.ShieldTime ? 3 : (params.ChangeHp || 0)) : ((params.ChangeHp || 0) + (!params.ShieldTime ? 1 : 0))), 3) * 12
      }
    }
  },

  黄金剧团: {
    2: {
      title: '元素战技造成的伤害提升[eDmg]%',
      data: {
        eDmg: 20
      }
    },
    4: {
      title: '元素战技造成的伤害提升，处于后台时还将进一步提升，合计提升[eDmg]%',
      data: {
        eDmg: ({ params }) => ((params.TruceTime || 0) > 0 ? 2 : 1) * 25
      }
    }
  },

  昔时之歌: {
    2: attr('heal', 15),
    4: {
      title: '装备者对队伍中的角色进行治疗时，记录治疗的生命值回复量，使队伍中自己的当前场上角色的普通攻击、重击、下落攻击、元素战技与元素爆发命中敌人时造成的伤害提高[aPlus]',
      data: {
        aPlus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : ((params.HealDetermine == true ? 1 : 0) * 1200),
        a2Plus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : ((params.HealDetermine == true ? 1 : 0) * 1200),
        a3Plus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : ((params.HealDetermine == true ? 1 : 0) * 1200),
        ePlus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : ((params.HealDetermine == true ? 1 : 0) * 1200),
        qPlus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : ((params.HealDetermine == true ? 1 : 0) * 1200)
      }
    }
  },

  回声之林夜话: {
    2: attr('atkPct', 18 ),
    4: {
      check: ({ element }) => element === '岩',
      title: '施放元素战技后，元素伤害加成提升；若处于结晶反应产生的护盾庇护下将进一步提高。合计提高[dmg]%',
      data: {
        dmg: ({ params }) => ((params.CrystallizeNumber || 0) > 0 ? 2.5 : 1) * 20
      }
    }
  },


  谐律异想断章: {
    2: attr('atkPct', 18 ),
    4: {
      title: '生命之契的数值提升或降低[buff]次，造成的伤害提升[dmg]%',
      data: {
        buff: ({ params }) => params.ChangeBondOfLife || 0,
        dmg: ({ params }) => Math.min((params.ChangeBondOfLife || 0), 3) * 18
      }
    }
  },

  未竟的遐思: {
    2: attr('atkPct', 18 ),
    4: {
      title: '存在处于燃烧状态下的敌人时，伤害提升[dmg]%',
      data: { // 暂时不做判断，默认触发
        dmg: 10 * 5
      }
    }
  },

  黑曜秘典: {
    2: {
      check: ({ params }) => params.Nightsoul === true && (params.TruceTime || 0) <= 0,
      title: '处于夜魂加持状态，且在场上时，造成的伤害提高[dmg]%。',
      data: {
        dmg: 20
      }
    },
    4: {
      check: ({ params }) => params.NightsoulUse >= 10,
      title: '装备者在场上消耗10点夜魂值后，暴击率提高[cpct]%',
      data: {
        cpct: 40
      }
    }
  },

  烬城勇者绘卷: {
    2: {
      check: ({ params }) => params.NatlanTeammate > 0,
      title: '附近的敌人触发夜魂迸发时，恢复[_energyevery]点元素能量。',
      data: {
        _energyevery: 6
      }
    },
    4: {
      title: '触发元素反应时，所有元素伤害加成与物理伤害加成提升[dmg]%',
      data: {
        dmg: ({ params }) => (params.Nightsoul === true ? 28 : 0) + 12
      }
    }
  },

//未实装

  长夜之誓: {
    2: {
      title: '下落攻击造成的伤害提升[a3Dmg]%',
      data: {
        a3Dmg: 25
      }
    },
    4: {
      title: '重击、下落攻击、元素战技合计命中敌人[buff]类,下落攻击造成的伤害提升[a3Dmg]%',
      data: { // 这里在无设置情况下仅触发1层
        buff: ({ params }) => Math.min((params.ChargedHit || 0), 1) + Math.min((params.PlungingHit || 0), 1) + Math.min((params.SkillsHit || 1), 1),
        a3Dmg: ({ params }) => Math.min((Math.min((params.ChargedHit || 0), 1) * 2 + Math.min((params.PlungingHit || 0), 1) + Math.min((params.SkillsHit || 1), 1) * 2), 5) * 15
      }
    }
  },

  深廊终曲: {
    2: attr('dmg', 15, '冰'),
    4: {
      title: '装备者元素能量为[buff]，普通攻击与元素爆发造成提高[aDmg]%',
      data: { // 这里暂时不考虑普通攻击掉层
        buff: ({ params }) => params.EnergyDetermine || 100,
        aDmg: ({ params }) => (params.EnergyDetermine || 100) == 0 ? 60 : 0,
        qDmg: ({ params }) => (params.EnergyDetermine || 100) == 0 ? 60 : 0
      }
    }
  },

//已废弃或已移除

  祭风之人: {},

  冰之川与雪之砂: {
    2: attr('dmg', 15, '冰'),
    4: {
      title: '超导反应造成的伤害提升[overloaded]%，融化反应的加成系数提高[melt]%。施放元素爆发后，获得[dmg]%元素伤害加成',
      data: {
        overloaded: 50,
        melt: 15,
        dmg: ({ element }) => element === '冰' ? 25 : 0
      }
    }
  },

  今日宗室之仪: {
    2: attr('cdmg', 30),
    4: {
      title: '攻击生命值百分比高于自身的敌人时，暴击率提高[cpct]%；攻击生命百分比低于自身的敌人时，暴击伤害提升[cdmg]%。',
      data: {
        cpct: ({ params, weapon }) => (params.TargetHp || (weapon.name === '狼的末路' ? 30 : 100)) > (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : 50) : 50)) ? 25 : 0,
        cdmg: ({ params, weapon }) => (params.TargetHp || (weapon.name === '狼的末路' ? 30 : 100)) > (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : 50) : 50)) ? 0 : 50
      }
    }
  }

}

export default buffs
