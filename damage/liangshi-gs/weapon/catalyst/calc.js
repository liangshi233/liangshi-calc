export default function (step, staticStep) {
  return {
// 1星

    学徒笔记: false,
    '(test)穿模测试': false,

// 2星

    口袋魔导书: false,

// 3星

    讨龙英杰谭: false,
    异世界行记: false,
    魔导绪论: {
      check: ({ params }) => [params.FireAttachment, params.IceAttachment, params.WindAttachment].every(attachment => !attachment),
      title: '[止水息雷] 对处于水元素或雷元素影响下的敌人，造成的伤害提高[dmg]%',
      refine: {
        dmg: step(12)
      }
    },
    翡玉法球: {
      check: ({ params }) => [params.FireAttachment, params.IceAttachment, params.MineAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment),
      title: '[激流] 触发蒸发、感电、冰冻或水元素扩散反应后的12.0秒内，攻击力提高[atkPct]%',
      refine: {
        atkPct: step(20)
      }
    },
    甲级宝珏: {
      title: '[奔袭战术] 击败敌人后，移动速度和攻击力提升[atkPct]%',
      refine: {
        atkPct: step(12, 2),
        _jSpeed: step(12, 2)
      }
    },
    琥珀玥: {
      title: '[元素熟练] 普通攻击命中[buff]次，获得[dmg]%素伤害加成',
      data: {
        buff: ({ params }) => params.NormalHit || 1,
        dmg: ({ params, refine }) => Math.min((params.NormalHit || 1), 2) * step(6)[refine]
      }
    },

// 4星

    西风秘典: false,
    祭礼残章: false,
    试作金珀: false,
    昭心: false,
    忍冬之果: false,
    苍纹角杯: false,
    流浪乐章: {
      title: '[登场乐] 角色登场时，攻击力提升[atkPct]%,全元素伤害提升[dmg]%,元素精通提升[mastery]',
      data: ({ refine }) => {  // 随机出一个，想看其他属性的反复凹面板即可，避免仅能计算单一buff
        let dcy = Math.floor(Math.random() * 3) + 1
        switch (dcy) {
          case 1:
            return { atkPct: step(60)[refine], dmg: 0, mastery: 0 }
          case 2:
            return { atkPct: 0, dmg: step(48)[refine], mastery: 0 }
          case 3:
            return { atkPct: 0, dmg: 0, mastery: step(240)[refine] }
          default:
            return { atkPct: 0, dmg: step(48)[refine], mastery: 0 }
        }
      }
    },
    宗室秘法录: { //超绽放类反应伤害似乎也能叠层，暂时不考虑
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
    匣里日月: {
      title: '[日月辉] 普通攻击命中[buff]次,元素战技与元素爆发命中[buffC]次，元素战技与爆发伤害提高[eDmg]%，普通攻击伤害提高[aDmg]%',
      refine: {
        buff: ({ params }) => params.NormalHit || 1,
        buffC: ({ params }) => (params.SkillsHit || 1) + (params.BurstHit || 0),
        aDmg: ({ params, refine }) => ((params.SkillsHit || 1) + (params.BurstHit || 0)) > 0 ? step(20)[refine] : 0,
        eDmg: ({ params, refine }) => (params.NormalHit || 1) > 0 ? step(20)[refine] : 0,
        qDmg: ({ params, refine }) => (params.NormalHit || 1) > 0 ? step(20)[refine] : 0
      }
    },
    万国诸海图谱: {
      title: '[注能之卷] 触发元素反应[buff]次，获得[dmg]%元素伤害加成',
      data: {
        buff: ({ params }) => params.ReactionDmg || 4,
        dmg: ({ params, refine }) => Math.min((params.ReactionDmg || 4), 2) * step(8)[refine]
      }
    },
    黑岩绯玉: {
      title: '[乘胜追击] 击败[buff]个敌人，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1),
        atkPct: ({ params, refine }) => step(12)[refine] * Math.min(3, ((params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1)))
      }
    },
    暗巷的酒与诗: {
      title: '[变化万端] 使用冲刺或替代冲刺的能力后，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(20)
      }
    },
    嘟嘟可故事集: {
      title: '[嘟嘟！大冒险] 普通攻击命中[buff]次,重击命中[buffC]次，重击伤害提升[a2Dmg]%，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params.NormalHit || 1,
        buffC: ({ params }) => params.ChargedHit || 0,
        a2Dmg: ({ params, refine }) => (params.NormalHit || 1) > 0 ? step(16)[refine] : 0,
        atkPct: ({ params, refine }) => (params.ChargedHit || 0) > 0 ? step(8)[refine] : 0
      }
    },
    白辰之环: {
      check: ({ params }) => [params.FireAttachment, params.IceAttachment, params.WindAttachment].every(attachment => !attachment),
      title: '[樱之斋宫] 与雷元素反应后,获得相关元素伤害加成[dmg]%',
      refine: {
        dmg: step(10)
      }
    },
    证誓之明瞳: {
      title: '[微光的海渊民] 施放[buff]次元素战技，元素充能效率提升[recharge]%',
      data: {
        buff: ({ params }) => params.SkillsUse || 1,
        recharge: ({ params, refine }) => (params.SkillsUse || 1) > 0 ? step(24)[refine] : 0
      }
    },
    流浪的晚星: {
      title: '[林野晚星] 提升[atkPlus]攻击力',
      sort: 6,
      data: {
        atkPlus: ({ attr, calc, refine }) => step(24)[refine] * calc(attr.mastery) / 100
      }
    },
    盈满之实: {
      title: '[圆满之相] 触发[buff]次元素反应，元素精通提升[mastery],攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params.ReactionDmg || 4,
        mastery: ({ params, refine }) => Math.min((params.ReactionDmg || 4), 5) * step(24, 3)[refine],
        atkPct: ({ params }) => Math.min((params.ReactionDmg || 4), 5) * (0 - 5)
      }
    },
    遗祀玉珑: {
      check: ({ params }) => ((params.FightTime || 6) < 10) || (params.TruceTime > 5),
      title: '[碧玉流转] 生命值上限提升[hpPct]%，元素精通提升[mastery]点',
      refine: {
        hpPct: step(32),
        mastery: step(40)
      }
    },
    纯水流华: [{
      title: '[未完的杰作] 释放元素战技全部元素伤害加成提升[dmg]%',
      refine: {
        dmg: step(8)
      }
    }, {
      check: ({ params }) => params.HealNumber > 0 || (params.DecreasedBondOfLife > 0 && params.HealDetermine === true),
      title: '[未完的杰作] 释放元素战技时赋予[buff]%生命之契，生命之契清除时提升[dmg]%所有元素伤害加成',
      sort: 9,
      data: {
        buff: ({ params }) => (24 / 100) * params.blPct,
        dmg: ({ attr, calc, refine }) => Math.min(Math.floor(calc(attr.hp) * 24 / 100 / 1000) * step(2)[refine], step(12)[refine])
      }
    }],
    无垠蔚蓝之歌: {
      title: '[蔚蓝深空] 普通攻击与重击命中[buff]次，普通攻击造成的伤害提升[aDmg]%，重击造成的伤害提升[a2Dmg]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0),
        aDmg: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 3) * step(8)[refine],
        a2Dmg: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 3) * step(6)[refine]
      }
    },
    乘浪的回旋: {
      title: '[长牙飞去来] 队伍中存在[buff]名水元素类型的角色,施放元素战技[buffC]次，生命值上限提升[hpPct]%',
      data: {
        buff: ({ params }) => params.ElementWaterTeam || 0,
        buffC: ({ params }) => params.SkillsUse || 1,
        hpPct: ({ params, refine }) => (params.SkillsUse || 1) > 0 ? (step(20)[refine] + Math.min((params.ElementWaterTeam || 0), 2) * step(12)[refine]) : 0
      }
    },
    木棉之环: {
      title: '[丰沃之陆的回声] 施放元素战技[buff]次，普通攻击造成的伤害提升[aDmg]%',
      sort: 9,
      data: {
        buff: ({ params }) => params.SkillsUse || 1,
        aDmg: ({ params, attr, calc, refine }) => (params.SkillsUse || 1) > 0 ? (Math.min(Math.floor(calc(attr.hp) / 1000) * step(0.6, 0.1)[refine], step(16)[refine])) : 0
      }
    },
    天光的纺琴: {
      check: ({ params }) => (params.SkillsUse || 1) > 0,
      title: '[最后的歌者] 施放元素战技后元素精通提升[mastery]',
      refine: {
        mastery: step(100)
      }
    },
    乌髓孑灯: {
      title: '[结契的凭证] 绽放反应造成的伤害提升[bloom]%，月绽放反应造成的伤害提升[lunarBloom]%',
      data: {
        bloom: ({ refine }) => step(48)[refine],
        lunarBloom: ({ params, refine }) => step(12)[refine] * ((params.Moonsign || 0) >= 2 ? 2 : 1)
      }
    },
    霜辰: {
      title: '[深宵的胎梦] 重击命中敌人[buff]次,元素战技命中敌人[buffC]次，元素精通提升[mastery]',
      sort: 9,
      data: {
        buff: ({ params }) => params.ChargedHit || 0,
        buffC: ({ params }) => params.SkillsHit || 1,
        mastery: ({ params, refine }) => ((params.ChargedHit || 0) > 0 ? step(72)[refine] : 0) + ((params.SkillsHit || 0) > 1 ? step(48)[refine] : 0)
      }
    },

// 5星

    'n/a': false,
    天空之卷: staticStep('dmg', 12),
    四风原典: {
      check: ({ params }) => !params.TruceTime,
      title: '[无边际的眷顾] 角色在场上[buff]秒，获得[dmg]%元素伤害加成',
      data: {
        buff: ({ params }) => params.FightTime || 6,
        dmg: ({ params, refine }) => Math.min((Math.floor((params.FightTime || 6) / 4)), 4) * step(8)[refine]
      }
    },
    尘世之锁: [staticStep('shield', 20), {
      title: '[金璋皇极] 攻击命中敌人[buff]次，攻击力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)), 5) * step(4)[refine] * (params.ShieldTime > 0 ? 2 : 1)
      }
    }],
    碧落之珑: {
      check: ({ params }) => (params.BurstUse > 0) || (params.ShieldDetermine === true),
      title: '[定土玉圭] 释放元素爆发或创造护盾后，对应的元素伤害提高[dmg]%',
      sort: 9,
      data: {
        dmg: ({ attr, calc, refine }) => Math.min(Math.floor(calc(attr.hp) / 1000) * step(0.3, 0.2)[refine], step(12, 8)[refine])
      }
    },
    不灭月华: [staticStep('heal', 10), {
      title: '[白夜皓月] 普通攻击造成的伤害增加[aPlus]，释放元素爆发后普通攻击命中恢复[buff]点元素能量',
      sort: 9,
      data: {
        aPlus: ({ attr, calc, refine }) => calc(attr.hp) * step(1, 0.5)[refine] / 100,
        buff: ({ params }) => params.BurstUse > 0 ? 0.6 : 0
      }
    }],
    神乐之真意: {
      title: '[神樱神游神乐舞] 施放元素战技[buff]次，元素战技造成的伤害提高[eDmg]%，获得[dmg]%所有元素伤害加成',
      data: {
        buff: ({ params }) => params.SkillsUse || 1,
        eDmg: ({ params, refine }) => Math.min((params.SkillsUse || 1), 3) * step(12)[refine],
        dmg: ({ params, refine }) => (params.SkillsUse || 1) >= 3 ? step(12)[refine] : 0
      }
    },
    千夜浮梦: {
      title: '[千夜的曙歌] 队伍中[buff]个与装备者元素相同的角色,[buffC]个不同的角色，元素伤害加成提高[dmg]%',
      data: {
        buff: ({ params }) => params.ElementSame || 0,
        buffC: ({ params }) => params.ElementDifferent || 0,
        mastery: ({ params, refine }) => Math.max(Math.min(((params.ElementSame || 0) - 1), 3), 0) * step(32)[refine],
        dmg: ({ params, refine }) => Math.min((params.ElementDifferent || 0), 3) * step(10, 4)[refine]
      }
    },
    图莱杜拉的回忆: [{
      title: '[堙没的蓝宝石泪滴] 普通攻击速度提升[_aSpeed]%',
      refine: {
        _aSpeed: step(10)
      }
    }, {
      title: '[堙没的蓝宝石泪滴] 元素战技使用后[buff]秒，普通攻击命中敌人[buffC]次，普通攻击伤害提升[aDmg]%',
      data: {
        buff: ({ params }) => params.SkillsAfter || 0,
        buffC: ({ params }) => params.NormalHit || 1,
        aDmg: ({ params, refine }) => Math.min((((params.SkillsAfter || 0) * step(4.8)[refine]) + ((params.NormalHit || 1) * step(9.6)[refine])), step(48)[refine])
      }
    }],
    金流监督: [staticStep('atkPct', 16), {
      title: '[黄金的血潮] 当前生命值提升或降低[buff]次，普通攻击造成的伤害提升[aDmg]%,重击造成的伤害提升[a2Dmg]%,攻击速度提升[_aSpeed]%',
      data: {
        buff: ({ params }) => (params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0),
        aDmg: ({ params, refine }) => Math.min(((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)), 3) * step(16)[refine],
        a2Dmg: ({ params, refine }) => Math.min(((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)), 3) * step(14)[refine],
        _aSpeed: ({ params, refine }) => ((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)) >= 3 ? step(8)[refine] : 0,
        _a2Speed: ({ params, refine }) => ((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)) >= 3 ? step(8)[refine] : 0
      }
    }],
    万世流涌大典: [staticStep('hpPct', 16), {
      title: '[万世的浪涛] 当前生命值提升或降低[buff]次，重击造成的伤害提升[a2Dmg]%,恢复[_energyevery]点元素能量',
      data: {
        buff: ({ params }) => (params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0),
        a2Dmg: ({ params, refine }) => Math.min(((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)), 3) * [14, 18, 22, 26, 30][refine],
        _energyevery: ({ params, refine }) => ((params.ChangeHp || 0) + (params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) + (params.HealNumber || 0)) >= 3 ? step(8, 1)[refine] : 0
      }
    }],
    鹤鸣余音: [{
      title: '[云笈降真要诀] 下落攻击命中敌人[buff]次，下落攻击造成的伤害提高[a3Dmg]%,恢复[_energyevery]点元素能量',
      data: {
        buff: ({ params }) => params.PlungingHit || 0,
        a3Dmg: ({ params, refine }) => (params.PlungingHit || 0) > 0 ? step(28, 13)[refine] : 0,
        _energyevery: ({ params, refine }) => (params.PlungingHit || 0) > 0 ? step(2.5, 0.25)[refine] : 0
      }
    }],
    冲浪时光: [staticStep('hpPct', 20), {
      check: ({ params }) => (params.SkillsUse || 1) > 0,
      title: '[水色回忆] 施放元素战技后，普通攻击造成的伤害提升[aDmg]%',
      refine: {
        aDmg: step(12 * 4)
      }
    }],
    祭星者之望: [staticStep('mastery', 100), {
      check: ({ params }) => params.ShieldDetermine === true && !params.TruceTime,
      title: '[奉予风阳的禋祀] 创造护盾后当前场上角色造成的伤害提升[dmg]%',
      refine: {
        dmg: step(28)
      }
    }],
    寝正月初晴: {
      title: '[一汤二鹰三鸣神] 元素战技命中[buff]次,元素爆发命中[buffC]次，元素精通提升[mastery]',
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        buffC: ({ params }) => params.BurstHit || 0,
        mastery: ({ params, refine, element }) => (((params.WindAttachment === true ? 1 : 0) + (element === '风' ? 1 : 0)) > 0 ? step(120)[refine] : 0) + ((params.SkillsHit || 1) > 0 ? step(96)[refine] : 0) + ((params.BurstHit || 0) > 0 ?step(32)[refine] : 0)
      }
    },
    溢彩心念: [staticStep('atkPct', 28), {
      title: '[落虹之愿] 施放元素战技或元素爆发[buff]次，下落攻击造成的暴击伤害提升[a3Cdmg]',
      data: {
        buff: ({ params }) => (params.SkillsUse || 1) + (params.BurstUse || 0),
        a3Cdmg: ({ params, refine }) => (((params.SkillsUse || 1) + (params.BurstUse || 0)) > 0 ? step(40)[refine] : 0) + step(28)[refine]
      }
    }],
    纺夜天镜: {
      title: '[千年的祷咏歌] 元素精通提升[mastery],绽放反应伤害提升[bloom]%,超绽放、烈绽放伤害提升[burgeon]%,月绽放伤害提升[lunarBloom]%',
      data: {
        mastery: ({ params, refine, element }) => ((params.Moonsign || 0) >= 1 ? step(60)[refine] : 0) + (['水', '草'].includes(element) ? step(60)[refine] : 0),
        bloom: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(120)[refine] : 0,
        burgeon: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(80)[refine] : 0,
        hyperBloom: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(80)[refine] : 0,
        lunarBloom: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(40)[refine] : 0
      }
    },
    真语秘匣: [staticStep('cpct', 8), {
      title: '[伪言的真意] 施放元素战技时元素精通提升[mastery]%, 暴击伤害提升[cdmg]%',
      data: {
        mastery: ({ params, refine }) => (params.SkillsUse || 1) >= 1 ? ((params.Moonsign || 0) >= 1 ? (step(80)[refine] * 1.5) : step(80)[refine]) : 0,
        cdmg: ({ params, refine }) => (params.Moonsign || 0) >= 1 ? ((params.SkillsUse || 1) >= 1 ? (step(24)[refine] * 1.5) : step(24)[refine]) : 0
      }
    }]
  }
}
