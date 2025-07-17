export default function (step, staticStep) {
  return {

// 1星

    无锋剑: false,

// 2星

    银剑: false,

// 3星

    旅行剑: false,
    吃虎鱼刀: false,
    冷刃: {
      check: ({ params }) => [params.FireAttachment, params.MineAttachment, params.WindAttachment].every(attachment => !attachment),
      title: '[止水融冰] 对处于水或冰元素影响的敌人造成伤害提高[dmg]%',
      refine: {
        dmg: step(12),
        phy: step(12)
      }
    },
    黎明神剑: {
      title: '[激励] 当前生命值[buff]%，暴击率提升[cpct]%',
      data: {
        buff: ({ params, weapon, artis }) => params.OwnHp || (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)),
        cpct: ({ params, weapon, refine, artis }) => (params.OwnHp || (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100))) >= 90 ? step(14)[refine] : 0
      }
    },
    暗铁剑: {
      check: ({ element, params }) => element === '雷' || params.MineAttachment === true,
      title: '[过载] 触发雷元素相关反应后攻击力提高[atkPct]%',
      refine: {
        atkPct: step(20)
      }
    },
    飞天御剑: {
      check: ({ params }) => (params.BurstUse || 0) > 0,
      title: '[决心] 施放元素爆发后，提高[atkPct]%攻击力和移动速度',
      refine: {
        atkPct: step(12),
        _jSpeed: step(8)
      }
    },

// 4星

    西风剑: false,
    笛剑: false,
    祭礼剑: false,
    天目影打刀: false,
    水仙十字剑: false,
    宗室长剑: { //超绽放类反应伤害似乎也能叠层，暂时不考虑
      title: '[专注] 攻击造成伤害时，暴击率提高[cpct]%',
      sort: 9,
      data: {
        cpct: ({ attr, calc, refine }) => {
          let order = 10000 // 默认循环1万次，实测100万次也不会影响出图速度，越高数值越接近实际效果
          let improve = step(8)[refine] / 100
          let cpct = calc(attr.cpct) / 100
          let CNumber = 0
          let buffCount = 0
          for (let i = 0; i < order; i++) {
            let Critical_hit = Math.random()
            if (Critical_hit < cpct) {
              CNumber++
              cpct = calc(attr.cpct) / 100
              buffCount = 0
            } else {
              if (buffCount < 5) {
                if (cpct + improve < 1) {
                  cpct += improve
                  buffCount++
                } else {
                  cpct = 1
                  buffCount++
                }
              }
            }
          }
          let CBuff = Math.max((CNumber / order * 100 - calc(attr.cpct)), 0)
          return CBuff
        }
      }
    },
    匣里龙吟: {
      check: ({ params }) => [params.IceAttachment, params.WindAttachment].every(attachment => !attachment),
      title: '[踏火息雷] 对处于火元素或雷元素影响下的敌人，造成的伤害提高[dmg]%',
      refine: {
        dmg: step(20, 4),
        phy: step(20, 4)
      }
    },
    试作斩岩: {
      title: '[碎石] 普通攻击与重击命中[buff]次，攻击力与防御力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 4) * step(4)[refine],
        defPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 4) * step(4)[refine]
      }
    },
    铁蜂刺: {
      title: '[注能之刺] 造成[buff]次元素伤害，角色造成的伤害提高[dmg]%',
      data: {
        buff: ({ params }) => params.ElementDmg || 2,
        dmg: ({ params, refine }) => Math.min((params.ElementDmg || 2), 2) * step(6)[refine],
        phy: ({ params, refine }) => Math.min((params.ElementDmg || 2), 2) * step(6)[refine]
      }
    },
    黑岩长剑: {
      title: '[乘胜追击] 击败[buff]个敌人，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1),
        atkPct: ({ params, refine }) => step(12)[refine] * Math.min(3, ((params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1)))
      }
    },
    黑剑: {
      title: '[「正义」] 普攻与重击的造成的伤害提升[aDmg]%',
      refine: {
        aDmg: step(20),
        a2Dmg: step(20)
      }
    },
    暗巷闪光: {
      check: ({ params }) => (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) === 0,
      title: '[街巷游侠] 角色造成的伤害提升[dmg]%',
      refine: {
        dmg: step(12),
        phy: step(12)
      }
    },
    降临之剑: {
      check: ({ characterName }) => ['空', '荧', '旅行者'].includes(characterName) && PlayStation_Network != false,
      title: '[降世] 攻击力提高[atkPlus]点',
      data: {
        atkPlus: 66
      }
    },
    腐殖之剑: {
      title: '[无尽的渴慕] 元素战技造成的伤害增加[eDmg]%，元素战技的暴击率提高[eCpct]%',
      refine: {
        eDmg: step(16),
        eCpct: step(6)
      }
    },
    辰砂之纺锤: {
      title: '[无垢之心] 元素战技造成的伤害值提高[ePlus]',
      sort: 9,
      data: {
        ePlus: ({ attr, refine }) => attr.def * step(40)[refine] / 100
      }
    },
    笼钓瓶一心: {
      title: '[澄澄一心传] 普通攻击重击或下落攻击命中敌人[buff]次，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.PlungingHit || 0) + (params.ChargedHit || 0) + (params.NormalHit || 1),
        atkPct: ({ params, refine }) => ((params.PlungingHit || 0) + (params.ChargedHit || 0) + (params.NormalHit || 1)) > 0 ? step(15)[refine] : 0
      }
    },
    原木刀: {
      check: ({ params, element }) => !['冰', '岩', '风'].includes(element) && !params.TruceTime,
      title: '[森林的瑞佑] 在场上拾取种识之叶，元素精通提升[mastery]',
      refine: {
        mastery: step(60)
      }
    },
    西福斯的月光: {
      title: '[镇灵的低语] 提升[recharge]%元素充能效率',
      sort: 6,
      data: {
        recharge: ({ attr, calc, refine }) => calc(attr.mastery) * step(0.036)[refine]
      }
    },
    东花坊时雨: {
      title: '[怪谭·时雨心地一本足] 攻击命中敌人后，造成的伤害提升[dmg]%',
      refine: {
        dmg: step(16)
      }
    },
    狼牙: [{
      title: '[苍狼北风] 元素战技与元素爆发造成的伤害提升[eDmg]%',
      refine: {
        eDmg: step(16),
        qDmg: step(16)
      }
    }, {
      title: '[苍狼北风] 元素战技命中敌人[buff]次,元素爆发命中敌人[buffC]次，元素战技暴击率提升[eCpct]%,元素爆发暴击率提升[qCpct]%',
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        buffC: ({ params }) => params.BurstHit || 0,
        eCpct: ({ params, refine }) => Math.min((params.SkillsHit || 1), 4) * step(2)[refine],
        qCpct: ({ params, refine }) => Math.min((params.BurstHit || 1), 4) * step(2)[refine]
      }
    }],
    海渊终曲: [staticStep('atkPct', 12),{
      check: ({ params }) => params.HealNumber > 0 || (params.DecreasedBondOfLife > 0 && params.HealDetermine === true),
      title: '[最终的崇高] 释放元素战技时赋予[buff]%生命之契，生命之契清除时提升[atkPlus]点攻击力',
      sort: 9,
      data: {
        buff: ({ params }) => (25 / 100) * params.blPct,
        atkPlus: ({ params, attr, calc, refine }) => Math.min(calc(attr.hp) * step(2.4)[refine] / 100 * (25 / 100 + params.blPlus) * params.blPct, step(150)[refine])
      }
    }],
    灰河渡手: {
      title: '[铁骨] 施放元素战技[buff]次，元素战技暴击率提升[eCpct]%，元素充能效率提升[rechargePlus]%',
      data: {
        buff: ({ params }) => params.SkillsUse || 1,
        eCpct: ({ refine }) => step(8)[refine],
        rechargePlus: ({ params, refine }) => (params.SkillsUse || 1) > 0 ? step(16)[refine] : 0
      }
    },
    船坞长剑: {
      title: '[船工号子] 进行或受到[buff]次治疗，提高[mastery]点元素精通并恢复[_energyevery]点元素能量',
      data: {
        buff: ({ params }) => params.HealNumber || 0,
        mastery: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * step(40)[refine],
        _energyevery: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * step(2)[refine]
      }
    },
    弥坚骨: {
      title: '[陷阵者的自矜] 冲刺或替代冲刺的能力后，普通攻击造成的伤害提高[aPlus]%',
      data: {
        aPlus: ({ attr, calc, refine }) => calc(attr.atk) * step(16)[refine] / 100
      }
    },
    息燧之笛: {
      title: '[镜与烟色的隐谜] 施放元素战技[buff]次，防御力提升[defPct]%',
      refine: {
        buff: ({ params }) => params.SkillsUse || 1,
        defPct: ({ params, refine }) => (params.SkillsUse || 1) > 0 ? step(16)[refine] : 0
      }
    },
    厄水之祸: {
      check: ({ params }) => params.ShieldTime > 0,
      title: '[弥漫的边界] 处于护盾庇护下,普攻和重击造成伤害提升[aDmg]%,普攻和重击暴击率提升[aCpct]%',
      refine: {
        aDmg: step(20),
        a2Dmg: step(20),
        aCpct: step(8),
        a2Cpct: step(8)
      }
    },

// 5星

    'n/a': false,
    '(test)竿测试': false,
    风鹰剑: staticStep('atkPct', 20),
    天空之刃: staticStep('cpct', 4),
    苍古自由之誓: [staticStep('dmg', 10), {
      title: '[抗争的践行之歌] 触发[buff]次元素反应，提高普攻重击与下落攻击[aDmg]%，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params.ElementDmg || 2,
        aDmg: ({ params }) => (params.ElementDmg || 2) === 2 ? step(16)[refine] : 0,
        a2Dmg: ({ params }) => (params.ElementDmg || 2) === 2 ? step(16)[refine] : 0,
        a3Dmg: ({ params }) => (params.ElementDmg || 2) === 2 ? step(16)[refine] : 0,
        atkPct: ({ params }) => (params.ElementDmg || 2) === 2 ? step(20)[refine] : 0
      }
    }],
    斫峰之刃: [staticStep('shield', 20), {
      title: '[金璋皇极] 攻击命中敌人[buff]次，攻击力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)), 5) * step(4)[refine] * (params.ShieldTime > 0 ? 2 : 1)
      }
    }],
    磐岩结绿: [staticStep('hpPct', 20), {
      title: '[护国的无垢之心] 获得[atkPlus]攻击力',
      sort: 9,
      data: {
        atkPlus: ({ attr, calc, refine }) => calc(attr.hp) * step(1.2)[refine] / 100
      }
    }],
    雾切之回光: [staticStep('dmg', 12), {
      title: '[雾切御腰物] 当前元素能量[buff]%，普通攻击造成[buffC]次元素伤害，释放[buffD]次元素爆发，获得[dmg]%伤害加成',
      data: {
        buff: ({ params }) => params.EnergyDetermine || 100,
        buffC: ({ params }) => params.NormalElement || 0,
        buffD: ({ params }) => params.BurstUse || 0,
        dmg: ({ params, refine }) => ((((params.EnergyDetermine || 100) < 100 ? 1 : 0) + ((params.NormalElement || 0) > 0 ? 1 : 0) + ((params.BurstUse || 0) > 0 ? 1 : 0)) * step(8)[refine]) + ((((params.EnergyDetermine || 100) < 100 ? 1 : 0) + ((params.NormalElement || 0) > 0 ? 1 : 0) + ((params.BurstUse || 0) > 0 ? 1 : 0)) === 3 ? step(4)[refine] : 0)
      }
    }],
    波乱月白经津: [staticStep('dmg', 12), {
      title: '[白刃流转] 队友释放[buff]次元素战技，提升[aDmg]%普通攻击伤害',
      data: {
        buff: ({ params }) => params.TeamSkills || 0,
        aDmg: ({ params, refine }) => Math.min((params.TeamSkills || 0), 2) * step(20)[refine]
      }
    }],
    圣显之钥: [staticStep('hpPct', 20), {
      title: '[沉入沙海的史诗] 元素战技命中[buff]次，元素精通提升[mastery]',
      sort: 5,
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        mastery: ({ attr, calc, refine, params }) => (step(0.12)[refine] * calc(attr.hp) / 100 * Math.min((params.SkillsHit || 1), 3)) + ((params.SkillsHit || 1) >= 3 ? (step(0.2)[refine] * calc(attr.hp) / 100) : 0)
      }
    }],
    裁叶萃光: [staticStep('cpct', 4), {
      title: '[白月枝芒] 普通攻击造成[buff]次元素伤害，普攻与元素战技造成的伤害值提高[aPlus]',
      sort: 9,
      data: {
        buff: ({ params }) => params.NormalElement || 0,
        aPlus: ({ attr, calc, refine, params }) => (params.NormalElement || 0) > 0 ? (calc(attr.mastery) * step(120)[refine] / 100) : 0,
        ePlus: ({ attr, calc, refine, params }) => (params.NormalElement || 0) > 0 ? (calc(attr.mastery) * step(120)[refine] / 100) : 0
      }
    }],
    静水流涌之辉: [{
      title: '[湖光的朝与暮] 生命值提升或降低[buff]次，元素战技伤害提高[eDmg]%',
      data: {
        buff: ({ params }) => (params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0),
        eDmg: ({ params, refine }) => Math.min(((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)), 3) * step(8)[refine]
      }
    }, {
      check: ({ params }) => params.TruceChangeHp === true,
      title: '[湖光的朝与暮] 队伍中其他角色的生命值提升或降低2.0次，生命值上限提高[hpPct]%',
      refine: {
        hpPct: step(14 * 2)
      }
    }],
    有乐御簾切: [staticStep('defPct', 20), {
      title: '[锦之花与龛中剑] 普通攻击造成的伤害提升[aDmg]%，元素战技造成的伤害提升[eDmg]%；',
      refine: {
        aDmg: step(16),
        eDmg: step(24)
      }
    }, {
      check: ({ params }) => params.TeamRockDmg > 0,
      title: '[锦之花与龛中剑] 附近的角色在场上造成岩元素伤害后，普通攻击伤害提升[aDmg]%，元素战技伤害提升[eDmg]%；',
      refine: {
        aDmg: step(16),
        eDmg: step(24)
      }
    }],
    赦罪: [staticStep('cdmg', 20), {
      title: '[赦罪] 生命之契的数值增加时，装备者造成的伤害提升[dmg]%',
      refine: {
        dmg: step(16 * 3)
      }
    }],
    岩峰巡歌: [{
      title: '[不凋的盛年] 普通攻击与下落攻击命中[buff]次，防御力提高[defPct]%并获得[dmg]%所有元素伤害加成',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.PlungingHit || 0),
        defPct: ({ params, refine }) => step(8)[refine] * Math.min(((params.NormalHit || 1) + (params.PlungingHit || 0)), 2),
        dmg: ({ params, refine }) => step(10)[refine] * Math.min(((params.NormalHit || 1) + (params.PlungingHit || 0)), 2)
      }
    }, {
      title: '[不凋的盛年] 普通攻击与下落攻击命中[buff]次，使队伍中附近所有角色的所有元素伤害加成提高[dmg]%',
      sort: 9,
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.PlungingHit || 0),
        dmg: ({ attr, calc, refine, params }) => ((params.NormalHit || 1) + (params.PlungingHit || 0)) >= 2 ? (Math.min(calc(attr.def) / 1000 * step(8)[refine], step(25.6)[refine])) : 0
      }
    }],
    苍耀: {
      check: ({ params }) => (params.params.SkillsUse || 1) > 0,
      title: '[苍耀] 释放元素战技后装备者的元素能量为[buff]%,攻击力提升[atkPct]%,暴击伤害提升[cdmg]%',
      data: {
        buff: ({ params }) => params.EnergyDetermine || 100,
        atkPct: ({ params, refine }) => step(24)[refine] * ((params.EnergyDetermine || 0) === 0 ? 2 : 1),
        cdmg: ({ params, refine }) => step(40)[refine] * ((params.EnergyDetermine || 0) === 0 ? 1 : 0)
      }
    }
  }
}
