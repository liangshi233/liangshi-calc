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

/*
可用的buff调控

monv  炽烈的炎之魔女4层数 （ 0 ~ 3 ） 动作：释放元素战技      统计方法：释放次数 * 1   默认：1层
blst  冰风迷途的勇士4状态 （ 1 ~ 2 ） 动作：目标是否冻结      统计方法：冻结 === 2    默认：1（仅冰附着）
sebo  苍白之火4层数      （ 0 ~ 2 ） 动作：元素战技命中      统计方法：命中次数 * 1   默认：1层
caaw  华馆梦醒形骸记4层数 （ 0 ~ 4 ） 动作：岩元素命中或后台   统计方法：命中次数 * 1   默认：4层
ecof  来歆余响4期望      （ 0 ~ 1 ） 动作：普通攻击命中      统计方法：触发概率 * 100 默认：1（100%触发）
vehe  辰砂往生录4层数    （ 0 ~ 4 ） 动作：生命值降低        统计方法：降低次数 * 1   默认：4层
gidr  饰金之梦4状态     （ 0 ~ 3 ）  动作：队伍内同属性角色数 统计方法：角色数量 * 1   默认：0层 （3不同属性角色队友）
flpa  乐园遗落之花4层数  （ 0 ~ 4 ）  动作：触发绽放类反应    统计方法：触发次数 * 1   默认：4层
//nydr  水仙之梦4层数     （ 0 ~ 3 ）  动作：各类攻击命中      统计方法：命中次数 * 1   默认：1层
gotr  黄金剧团4状态     （ 1 ~ 2 ）  动作：处于队伍后台      统计方法：后台 === 2    默认：1（前台）
soda  昔时之歌4状态     （ 0 ~ 1 ）  动作：角色是否可以治疗   统计方法：可以 === 1    默认：0（不可以）

*/

const buffs = {
//1星

  初学者: {},

//3星

  冒险家: {
    2: attr('hpPlus', 1000, '', '点'),
    4: {
      title: '开启各类宝箱后,恢复[_restore]生命值',
      data: {
        _restore: ({ attr }) => ( attr.hp.base + attr.hp.plus + attr.hp.pct * attr.hp.base ) * 30 / 100
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
        _restore: ({ attr }) => ( attr.hp.base + attr.hp.plus + attr.hp.pct * attr.hp.base ) * 20 / 100
      }
    }
  },

//4星

  勇士之心: {
    2: attr('atkPct', 18),
    4: {
      title: '对生命值高于50%的敌人，造成的伤害增加[dmg]%',
      data: {
        dmg: 30
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
      title: '根据队伍中不同一种元素类型的自己的角色,至多提升[_res]%相应的元素抗性',
      data: {
  	    _res: 90
      }
    }
  },

  战狂: {
    2: attr('cpct', 12),
    4: {
      title: '生命值低于70%时，暴击率提升[cpct]%',
      data: {
        cpct: 24
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
        aDmg: 15 ,
        a2Dmg: 15
      }
    },
    4: {
      title: '施放元素战技后,普通攻击和重击造成的伤害提升[aDmg]%',
      data: {
        aDmg: 25 ,
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

  冰之川与雪之砂 : {
    2: attr('dmg', 15, '冰'),
    4: {
      check: ({ element }) => element === '冰',
      title: '超导反应造成的伤害提升[overloaded]%，融化反应的加成系数提高[vaporize]%,施放元素爆发后，获得[dmg]%冰元素伤害加成',
      data: {
        superConduct: 50 ,
        melt: 15,
        dmg: 25
      }
    }
  },

  如雷的盛怒: {
    2: attr('dmg', 15, '雷'),
    4: {
      title: '超载、感电、超导反应造成的伤害提升[overloaded]%，超激化反应带来的伤害提升提高[aggravate]%,触发上述元素反应或原激化反应时,元素战技冷却时间减少[_ecdPlus]秒',
      data: {
        overloaded: 40 ,
        electroCharged: 40 ,
        superConduct: 40 ,
        hyperBloom: 40 ,
        aggravate: 20 ,
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
      check: ({ element }) => element === '雷',
      title: '对处于雷元素影响下的敌人造成的伤害提升[dmg]%',
      data: {
        dmg: 35
      }
    }
  },

  悠古的磐岩: {
    2: attr('dmg', 15, '岩'),
    4: {
      check: ({ element }) => element !== '岩' && element !== '风' && element !== '草',
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
      check: ({ params }) => params.nobo !== true,
      data: {
        atkPct: 20
      }
    }
  },

  染血的骑士道: {
    2: attr('phy', 25),
    4: {
      title: '击败敌人后，重击不消耗体力且造成的伤害提升[a2Dmg]%',
      data: {
        a2Dmg: 50 ,
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
      check: ({ element }) => element === '火',
      title: '对处于火元素影响下的敌人造成的伤害提升[dmg]%' ,
      data: {
        dmg: 35
      }
    }
  },

  炽烈的炎之魔女: {
    2: attr('dmg', 15, '火'),
    4: {
      check: ({ element }) => element === '火',
      title: '超载、燃烧、烈绽放反应造成的伤害提升[overloaded]%，蒸发、融化反应的加成系数提高[vaporize]%，释放元素战技[buffCount]次提高[dmg]%火元素伤害加成，',
      data: {
        vaporize: 15,
        melt: 15,
        overloaded: 40,
        burning: 40,
        burgeon: 40,
        dmg: ({ params }) => ( params.monv || 1 ) * 7.5 ,
        buffCount: ({ params }) => params.monv || 1
      }
    }
  },

  翠绿之影: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '扩散反应造成的伤害提升[swirl]%，根据扩散的元素类型，降低受到影响的敌人[fykx]%的对应元素抗性',
      data: {
        swirl: 60 ,
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
      title: '处于护盾庇护下时，额外获得[aDmg]%普通攻击和重击伤害加成',
      data: {
        aDmg: 40 ,
        a2Dmg: 40
      }
    }
  },

  冰风迷途的勇士: {
    2: attr('dmg', 15, '冰'),
    4: {
      title: '攻击处于冰元素影响下的敌人时，暴击率提高，若敌人处于冻结状态下，则暴击率额外提高，合计提高[cpct]%暴击率',
      data: {
        cpct: ({ params }) => ( params.blst || 1 ) * 20
      }
    }
  },

  沉沦之心: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '施放元素战技后，普通攻击与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 30 ,
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
      title: '元素战技命中敌人[buffCount]次后,攻击力提升[atkPct]%,造成的物理伤害提高[phy]%',
      data: {
        buffCount: ({ params }) => params.sebo || 1 ,
        atkPct: ({ params }) => ( params.sebo || 1 ) * 9 ,
        phy: ({ params }) => Math.max( 0 , ( params.sebo || 0 ) - 1 ) * 25
      }
    }
  },

  绝缘之旗印: {
    2: attr('recharge', 20),
    4: {
      title: '提高元素爆发造成的伤害[qDmg]%',
      sort: 4,
      data: {
        qDmg: ({ attr }) => Math.min( 75, ( attr.recharge.base + attr.recharge.plus ) * 0.25 )
      }
    }
  },

  追忆之注连: {
    2: attr('atkPct', 18),
    4: {
      title: '施放元素战技后,如果角色的元素能量高于或等于15点,则会恢复[_energyevery]点元素能量,使接下来的普通攻击、重击、下落攻击造成的伤害提高[aDmg]%',
      data: {
        _energyevery: -15 ,
        aDmg: 50,
        a2Dmg: 50,
        a3Dmg: 50
      }
    }
  },

  华馆梦醒形骸记: {
    2: attr('defPct', 30),
    4: {
      title: '[buffCount]层问答,提供[defPct]%防御与[dmg]%岩元素伤害加成',
      data: {
        buffCount: ({ params }) => params.caaw || 4 ,
        defPct:  ({ params }) => ( params.caaw || 4 ) * 6 ,
        dmg:  ({ params }) => ( params.caaw || 4 ) * 6
      }
    }
  },

  海染砗磲: {
    2: attr('heal', 15)
  },

  来歆余响: {
    2: attr('atkPct', 18),
    4: {
      title: '普通攻击命中敌人时,普通攻击造成的伤害提高[aPlus]，当前效果触发概率[buffCount]%',
      sort: 9,
      data: {
        buffCount: ({ params }) => ( params.ecof || 1 ) * 100 ,
        aPlus: ({ params , attr }) => ( attr.atk.base + attr.atk.plus + attr.atk.pct * attr.atk.base / 100 ) * 0.7 * ( params.ecof || 1 )
      }
    }
  },

  辰砂往生录: {
    2: attr('atkPct', 18),
    4: {
      title: '施放元素爆发后攻击力提升,并在角色的生命值降低时,攻击力进一步提升.通过[buffCount]层「潜光」提升合计[atkPct]%攻击力',
      data: {
        buffCount: ({ params }) => params.vehe || 4 ,
        atkPct: ({ params }) => ( params.vehe || 4 ) * 10 + 8
      }
    }
  },

  深林的记忆: {
    2: attr('dmg', 15, '草'),
    4: {
      title: '元素战技或元素爆发命中敌人后，使命中目标的草元素抗性降低[kx]%',
      check: ({ element }) => element === '草',
      data: {
        kx: 30
      }
    }
  },

  饰金之梦: {
    2: attr('mastery', 80),
    4: {
      title: '触发元素反应后，队伍存在不同元素类型角色[buffCount]个，元素精通提升[mastery]点，攻击力提升[atkPct]%',
      data: {
        buffCount: ({ params }) => 3 - ( params.gidr || 0 ) ,
        mastery: ({ params }) => ( 3 - ( params.gidr || 0 ) ) * 50 ,
        atkPct: ({ params }) => ( params.gidr || 0 ) * 14
      }
    }
  },

  乐园遗落之花: {
    2: attr('mastery', 80),
    4: {
      title: '装备者触发绽放、超绽放、烈绽放[buffCount]次，使上述反应伤害提高[bloom]%',
      data: {
        buffCount: ({ params }) => params.flpa || 4 ,
        bloom: ({ params }) => 40 + ( params.flpa || 4 ) * 40 * 0.25 ,
        burgeon: ({ params }) => 40 + ( params.flpa || 4 ) * 40 * 0.25 ,
        hyperBloom: ({ params }) => 40 + ( params.flpa || 4 ) * 40 * 0.25
      }
    }
  },

  沙上楼阁史话: {
    2: attr('dmg', 15, '风'),
    4: {
      title: '重击命中敌人后，普通攻击速度提升[_aSpeed]%，普通攻击、重击与下落攻击造成的伤害提升[aDmg]%',
      data: {
        _aSpeed: 10 ,
        aDmg: 40 ,
        a2Dmg: 40 ,
        a3Dmg: 40
      }
    }
  },

  水仙之梦: {
    2: attr('dmg', 15, '水'),
    4: {
      title: '普通攻击、重击、下落攻击、元素战技或元素爆发命中敌人后,攻击力提高[atkPct]%,水元素伤害加成提升[dmg]%',
      data: {
        atkPct: 25 ,
        dmg: 15
      }
    }
  },

  花海甘露之光: {
    2: attr('hpPct', 20),
    4: {
      title: '装备者受到伤害后,元素战技与元素爆发造成的伤害提升[eDmg]%',
      data: {
        eDmg: 10 + 10 * 0.8 * 5 ,
        qDmg: 10 + 10 * 0.8 * 5
      }
    }
  },

  逐影猎人: {
    2: {
      title: '普通攻击与重击造成的伤害提高[aDmg]%',
      data: {
        aDmg: 15 ,
        a2Dmg: 15
      }
    },
    4: {
      title: '当前生命值提升或降低时，暴击率提升[cpct]%',
      data: {
        cpct: 12 * 3
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
      title: '元素战技造成的伤害提升，处于队伍后台时还将进一步提升，合计提升[eDmg]%',
      data: {
        eDmg: ({ params }) => ( params.gotr || 1 ) * 25
      }
    }
  },

  昔时之歌: {
    2: attr('heal', 15),
    4: {
      title: '装备者对队伍中的角色进行治疗时，记录治疗的生命值回复量，使队伍中自己的当前场上角色的普通攻击、重击、下落攻击、元素战技与元素爆发命中敌人时造成的伤害提高[aPlus]',
      sort: 9,
      data: {
        aPlus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        a2Plus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        a3Plus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        ePlus: ({ params }) => ( params.soda || 0 ) * 1200 ,
        qPlus: ({ params }) => ( params.soda || 0 ) * 1200
      }
    }
  },

  回声之林夜话: {
    2: attr('atkPct', 18 ),
    4: {
      check: ({ element }) => element === '岩',
      title: '施放元素战技后，岩元素伤害加成提升；若处于结晶反应产生的护盾庇护下将进一步提高。合计提高[dmg]%',
      data: {
        dmg: 50
      }
    }
  }

}

export default buffs
