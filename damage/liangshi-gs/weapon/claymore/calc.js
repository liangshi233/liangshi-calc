export default function (step, staticStep) {
  return {

// 1星

    训练大剑: false,
    '(test)穿模测试': false,

// 2星

    佣兵重剑: false,

// 3星

    白铁大剑: false,
    以理服人: false,
    铁影阔剑: {
      title: '[不屈] 角色当前生命值[buff]%, 重击伤害提高[a2Dmg]%',
      data: {
        buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
        a2Dmg: ({ params, artis, refine }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100) >= 70 ? 0 : step(30, 5)[refine]
      }
    },
    沐浴龙血的剑: {
      check: ({ params }) => [params.IceAttachment, params.WindAttachment].every(attachment => !attachment),
      title: '[踏火息雷] 对处于火或雷元素影响的敌人造成伤害提高[dmg]%',
      refine: {
        dmg: step(12),
        phy: step(12)
      }
    },
    飞天大御剑: {
      title: '[勇气] 普通攻击和重击命中[buff]次，攻击力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 4) * step(6, 1)[refine]
      }
    },
    石英大剑: {
      check: ({ element }) => (params.FireAttachment == true) || ['火'].includes(element),
      title: '[余热] 触发火元素相关反应后攻击力提高[atkPct]%',
      refine: {
        atkPct: step(20)
      }
    },

// 4星

    西风大剑: false,
    祭礼大剑: false,
    试作古华: false,
    雪葬的星银: false,
    钟剑: {
      check: ({ params }) => params.ShieldDetermine === true || (params.ShieldTime || 0) > 0 || (params.SubjectedDmg || 1) > 0,
      title: '[叛逆的守护者] 角色处于护盾庇护下时，造成的伤害提升[dmg]%',
      refine: {
        dmg: step(12),
        phy: step(12)
      }
    },
    宗室大剑: { //超绽放类反应伤害似乎也能叠层，暂时不考虑
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
    雨裁: {
      check: ({ params }) => [params.FireAttachment, params.IceAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment),
      title: '[止水息雷] 对处于水或雷元素影响的敌人造成伤害提高[dmg]%',
      refine: {
        dmg: step(20, 4),
        phy: step(20, 4)
      }
    },
    白影剑: {
      title: '[注能之锋] 普通攻击和重击命中[buff]次，攻击力及防御力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 4) * step(6)[refine],
        defPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 4) * step(6)[refine]
      }
    },
    黑岩斩刀: {
      title: '[乘胜追击] 击败[buff]个敌人，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1),
        atkPct: ({ params, refine }) => step(12)[refine] * Math.min(3, ((params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1)))
      }
    },
    螭骨剑: {
      title: '[破浪] 角色累计在场上[buff]秒，受到[buffC]次伤害，提升[dmg]%造成伤害，降低[_reduction]%受到伤害',
      data: {
        buff: ({ params }) => params.FightTime || 12,
        buffC: ({ params }) => params.SubjectedDmg || 1,
        dmg: ({ params, refine }) => Math.min((Math.floor((params.FightTime || 12) / 4) - (params.SubjectedDmg || 1)), 5) * step(6, 1)[refine],
        phy: ({ params, refine }) => Math.min((Math.floor((params.FightTime || 12) / 4) - (params.SubjectedDmg || 1)), 5) * step(6, 1)[refine],
        _reduction: ({ params, refine }) => Math.min((Math.floor((params.FightTime || 12) / 4) - (params.SubjectedDmg || 1)), 5) * [-3, -2.7, -2.4, -2.2, -2][refine]
      }
    },
    千岩古剑: {
      title: '[千岩诀·同心] 队伍中[buffCount]名璃月角色，获得[atkPct]%攻击力提升与[cpct]%暴击率提升',
      data: {
        buffCount: ({ params }) => params.LiyueTeammate || 0,
        atkPct: ({ params, refine }) => Math.min((params.LiyueTeammate || 0), 4) * [7, 8, 9, 10, 11][refine],
        cpct: ({ params, refine }) => Math.min((params.LiyueTeammate || 0), 4) * [3, 4, 5, 6, 7][refine]
      }
    },
    衔珠海皇: {
      title: '[海洋的胜利] 元素爆发造成的伤害提升[qDmg]%',
      refine: {
        qDmg: step(12)
      }
    },
    桂木斩长正: {
      title: '[名士振舞] 元素战技造成的伤害提升[eDmg]%，元素战技命中后角色获得-3.0点元素能量，并恢复[_energyevery]点元素能量',
      refine: {
        eDmg: step(6),
        _energyevery: step(3 * 3)
      }
    },
    玛海菈的水色: {
      title: '[沙上楼阁] 攻击力提升[atkPlus]点',
      sort: 6,
      data: {
        atkPlus: ({ attr, calc, refine }) => step(24)[refine] * calc(attr.mastery) / 100
      }
    },
    恶王丸: {
      title: '[驭浪的海祇民] 队伍中所有角色的元素能量上限总和[buff]点，元素爆发伤害提高[qDmg]%',
      data: {
        buff: ({ params }) => params.EnergyTeammate || 80,
        qDmg: ({ params, refine }) => Math.min((params.EnergyTeammate || 80) * step(0.12)[refine], step(40)[refine])
      }
    },
    森林王器: {
      check: ({ params, element }) => !['冰', '岩', '风'].includes(element) && !params.TruceTime,
      title: '[森林的瑞佑] 当前在场上拾取种识之叶，元素精通提升[mastery]',
      refine: {
        mastery: step(60)
      }
    },
    饰铁之花: {
      title: '[风与花的密语] 元素战技命中或触发元素反应后攻击力提升[atkPct]%，元素精通提升[mastery]点',
      refine: {
        atkPct: step(12),
        mastery: step(48)
      }
    },
    聊聊棒: [{
      title: '[「伶牙俐齿」] 承受火元素附着，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(16)
      }
    }, {
      title: '[「伶牙俐齿」] 承受水、草或雷元素附着时，元素伤害加成提升[dmg]%',
      refine: {
        dmg: step(12)
      }
    }],
    浪影阔剑: {
      check: ({ params }) => (params.HealNumber || 0) > 0,
      title: '[巡航的白浪] 受到治疗时，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(24)
      }
    },
    '「究极霸王超级魔剑」': {  // 暂时没有途径获取世界任务的完成进度，默认全部完成。每完成一个任务可获得[2, 2.5, 3, 3.5, 4]%攻击力提升，直至额外提升到[12, 15, 18, 21, 24]%（完成其中任意6个任务即可获得最大值）
      title: '[加油！] 完成了世界任务「这可不是南瓜汤…」,古老的颜色,秘诲揭示之书,瑟琳生日宴,奇石历险记,日冕的三原色,柯莎的花,钓鱼游戏,孤帆幽影，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(12 * 2)
      }
    },
    便携动力锯: {
      title: '[船工号子] 进行或受到[buff]次治疗，提高[mastery]点元素精通并恢复[_energyevery]点元素能量',
      data: {
        buff: ({ params }) => params.HealNumber || 0,
        mastery: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * step(40)[refine],
        _energyevery: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * step(2)[refine]
      }
    },
    硕果钩: [{
      title: '[坠枝之重] 下落攻击的暴击率提升[a3Cpct]%',
      refine: {
        a3Cpct: step(16)
      }
    }, {
      title: '[坠枝之重] 下落攻击的命中[buff]次,普通攻击、重击、下落攻击造成的伤害提升[aDmg]%',
      data: {
        buff: ({ params }) => params.PlungingHit || 0,
        aDmg: ({ params, refine }) => (params.PlungingHit || 0) > 0 ? step(16)[refine] : 0,
        a2Dmg: ({ params, refine }) => (params.PlungingHit || 0) > 0 ? step(16)[refine] : 0,
        a3Dmg: ({ params, refine }) => (params.PlungingHit || 0) > 0 ? step(16)[refine] : 0
      }
    }],
    撼地者: {
      check: ({ element }) => (params.FireAttachment == true) || ['火'].includes(element),
      title: '[苍翠之路的誓言] 触发火元素相关反应，元素战技造成的伤害提升[eDmg]%',
      refine: {
        eDmg: step(16)
      }
    },
    拾慧铸熔: {
      check: ({ element, params }) => ['风', '水', '雷', '草'].includes(element),
      title: '触发感电、月感电或绽放反应时，元素精通提升[mastery]',
      refine: {
        mastery: step(60)
      }
    },
    万能钥匙: {
      title: '[迎刃而解] 触发元素反应后元素精通提升[mastery]',
      data: {
        mastery: ({ params, refine }) => step(60)[refine] * (params.Moonsign || 0) >= 2 ? 2 : 1
      }
    },

// 5星

    'n/a': false,
    天空之傲: {
      title: '[斩裂晴空的龙脊] 造成伤害提高[dmg]%',
      refine: {
        dmg: step(8),
        phy: step(8)
      }
    },
    狼的末路: [staticStep('atkPct', 20), {
      title: '[如狼般狩猎者] 攻击命中生命值[buff]%的敌人，队伍中所有成员攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params.TargetHp || 30,
        atkPct: ({ params, refine }) => (params.TargetHp || 30) > 30 ? 0 : step(40)[refine]
      }
    }],
    松籁响起之时: [staticStep('atkPct', 16), {
      title: '[揭旗的叛逆之歌] 普通攻击与重击命中[buff]次，使附近所有角色普通攻击速度提升[aSpeed]%,攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0),
        aSpeed: ({ params, refine }) => ((params.NormalHit || 1) + (params.ChargedHit || 0)) >= 4 ? step(12)[refine] : 0,
        atkPct: ({ params, refine }) => ((params.NormalHit || 1) + (params.ChargedHit || 0)) >= 4 ? step(20)[refine] : 0
      }
    }],
    无工之剑: [staticStep('shield', 20), {
      title: '[金璋皇极] 攻击命中敌人[buff]次，攻击力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)), 5) * step(4)[refine] * (params.ShieldTime > 0 ? 2 : 1)
      }
    }],
    赤角石溃杵: [staticStep('defPct', 28), {
      title: '[御伽大王御伽话] 普通攻击与重击造成的伤害值提高[aPlus]',
      sort: 9,
      data: {
        aPlus: ({ attr, calc, refine }) => calc(attr.def) * step(40)[refine] / 100,
        a2Plus: ({ attr, calc, refine }) => calc(attr.def) * step(40)[refine] / 100
      }
    }],
    苇海信标: [{
      title: '[沙海守望] 元素战技命中敌人[buff]次，受到伤害[buffC]次，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        buffC: ({ params }) => params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0),
        atkPct: ({ params, refine }) => ((params.SkillsHit || 1) > 0 ? step(20)[refine] : 0) + ((params.SubjectedDmg || (!params.ShieldDetermine ? (!params.ShieldTime ? (params.BurningDetermine == true ? 5 : 1) : 0) : 0)) > 0 ? step(20)[refine] : 0)
      }
    }, {
      check: ({ params }) => ((params.ShieldTime || 0) == 0) && ((CrystallizeNumber || 0) == 0),
      title: '[沙海守望] 不处于护盾庇护下生命值上限提高[hpPct]%',
      refine: {
        hpPct: step(32)
      }
    }],
    裁断: [staticStep('atkPct', 20), {
      title: '[诸多朝与暮的誓约] 队伍中角色获取[buff]枚结晶反应产生的晶片时，元素战技造成的伤害提升[eDmg]%',
      data: {
        buff: ({ params }) => params.CrystallizeNumber || 0,
        eDmg: ({ params, refine }) => Math.min((params.CrystallizeNumber || 0), 2) * step(18)[refine]
      }
    }],
    山王长牙: [{
      title: '[绿松石之狩] 元素战技命中敌人[buff]次，元素战技与元素爆发伤害提升[eDmg]%',
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        eDmg: ({ params, refine }) => Math.min(((params.SkillsHit || 1) + (params.BurningDetermine == true ? 3 : 0)), 6) * step(10)[refine],
        qDmg: ({ params, refine }) => Math.min(((params.SkillsHit || 1) + (params.BurningDetermine == true ? 3 : 0)), 6) * step(10)[refine]
      }
    }],
    焚曜千阳: {
      title: '[落日重燃的黎明] 施放元素战技或元素爆发时，暴击伤害提高[cdmg]%，攻击力提升[atkPct]%',
      data: {
        cdmg: ({ params, refine }) => (params.Nightsoul === true ? 1.75 : 1) * step(20)[refine] * (((params.SkillsUse || 1) + (params.BurstUse || 0)) > 0 ? 1 : 0),
        atkPct: ({ params, refine }) => (params.Nightsoul === true ? 1.75 : 1) * step(20)[refine] * (((params.SkillsUse || 1) + (params.BurstUse || 0)) > 0 ? 1 : 0)
      }
    }
  }
}
