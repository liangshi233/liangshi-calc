export default function (step, staticStep) {
  return {

// 1星

    新手长枪: false,
    '(test)穿模测试': false,

// 2星

    铁钉枪: false,

// 3星

    钺矛: false,
    '「旗杆」': false,
    白缨枪: {
      title: '[锐利] 普通攻击造成的伤害提升[aDmg]%',
      refine: {
        aDmg: step(24)
      }
    },
    黑缨枪: {
      check: false,
      title: '[克柔] 对史莱姆类敌人造成的伤害增加[dmg]%',
      refine: {
        dmg: step(24)
      }
    },

// 4星

    流月针: false,
    西风长枪: false,
    龙脊长枪: false,
    公义的酬报: false,
    沙中伟贤的对答: false,
    匣里灭辰: { // 冻元素默认吃不到此效果,感电可以触发此效果
      check: ({ params }) => [params.IceAttachment, params.MineAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment),
      title: '[踏火止水] 对于水或火元素影响的敌人造成伤害提高[dmg]%',
      refine: {
        dmg: step(20, 4),
        phy: step(20, 4)
      }
    },
    试作星镰: {
      title: '[嗜魔] 释放[buff]次元素战技，普通攻击与重击造成的伤害提高[aDmg]%',
      data: {
        buff: ({ params }) => params.SkillsUse || 1,
        aDmg: ({ params, refine }) => step(8)[refine] * Math.min((params.SkillsUse || 1), 2),
        a2Dmg: ({ params, refine }) => step(8)[refine] * Math.min((params.SkillsUse || 1), 2)
      }
    },
    黑岩刺枪: {
      title: '[乘胜追击] 击败[buff]个敌人，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1),
        atkPct: ({ params, refine }) => step(12)[refine] * Math.min(3, ((params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1)))
      }
    },
    决斗之枪: {
      title: '[角斗士] 身边有[buff]个敌人，获得[atkPct]%的攻击力提升与[defPct]%防御力提升',
      data: {
        buff: ({ params }) => params.EnemiesNumber || 4,
        atkPct: ({ params, refine }) => (params.EnemiesNumber || 4) >= 2 ? step(16)[refine] : step(24)[refine],
        defPct: ({ params, refine }) => (params.EnemiesNumber || 4) >= 2 ? step(16)[refine] : 0
      }
    },
    千岩长枪: {
      title: '[千岩诀·同心] 队伍中[buffCount]名璃月角色，获得[atkPct]%攻击力提升与[cpct]%暴击率提升',
      data: {
        buffCount: ({ params }) => params.LiyueTeammate || 0,
        atkPct: ({ params, refine }) => Math.min((params.LiyueTeammate || 0), 4) * [7, 8, 9, 10, 11][refine],
        cpct: ({ params, refine }) => Math.min((params.LiyueTeammate || 0), 4) * [3, 4, 5, 6, 7][refine]
      }
    },
    宗室猎枪: { //超绽放类反应伤害似乎也能叠层，暂时不考虑
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
    喜多院十文字: {
      title: '[名士振舞] 元素战技造成的伤害提升[eDmg]%，元素战技命中后角色获得-3.0点元素能量，并恢复[_energyevery]点元素能量',
      refine: {
        eDmg: step(6),
        _energyevery: step(3 * 3)
      }
    },
    '「渔获」': {
      title: '[船歌] 元素爆发造成伤害提高[qDmg]%，元素爆发的暴击率提升[qCpct]%',
      refine: {
        qDmg: step(16),
        qCpct: step(6)
      }
    },
    断浪长鳍: {
      title: '[驭浪的海祇民] 队伍中所有角色的元素能量上限总和[buff]点，元素爆发伤害提高[qDmg]%',
      data: {
        buff: ({ params }) => params.EnergyTeammate || 80,
        qDmg: ({ params, refine }) => Math.min((params.EnergyTeammate || 80) * step(0.12)[refine], step(40)[refine])
      }
    },
    贯月矢: {
      check: ({ params, element }) => !['冰', '岩', '风'].includes(element) && !params.TruceTime,
      title: '[幽林月影] 当前在场上拾取苏生之叶，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(16)
      }
    },
    风信之锋: {
      check: ({ params }) => (params.ReactionDmg || 4) > 0,
      title: '[不至之风] 触发元素反应后攻击力提升[atkPct]%, 元素精通提升[mastery]点',
      refine: {
        atkPct: step(12),
        mastery: step(48)
      }
    },
    峡湾长歌: {
      title: '[冰原的诸多故事] 队伍中存在[buff]种不同元素类型的角色，元素精通提升[mastery]点',
      data: {
        buff: ({ params }) => [params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length,
        mastery: ({ params, refine }) => [params.ElementGrassTeam, params.ElementIceTeam, params.ElementWaterTeam, params.ElementFireTeam, params.ElementMineTeam, params.ElementRockTeam, params.ElementWindTeam].filter(element => element >= 1).length >= 3 ? step(120)[refine] : 0
      }
    },
    勘探钻机: {
      title: '[石匠号子] 进行或受到[buff]次治疗，提高[atkPct]%攻击力与[dmg]%所有元素伤害加成',
      data: {
        buff: ({ params }) => params.HealNumber || 0,
        atkPct: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * [3, 4, 5, 6, 7][refine],
        dmg: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * [7, 8.5, 10, 11.5, 13][refine]
      }
    },
    镇山之钉: {
      title: '[越峰之望] 元素战技造成的伤害提升[eDmg]%',
      refine: {
        eDmg: step(12 * 2)
      }
    },
    虹的行迹: {
      title: '[流水与泉的约定] 施放元素战技时，防御力提升[defPct]%',
      refine: {
        defPct: step(16)
      }
    },
    且住亭御咄: {
      title: '[好事者奔行灯] 释放元素战技时，提高攻击力[atkPct]%和[_jSpeed]%移动速度',
      refine: {
        atkPct: step(20),
        _jSpeed: 10
      }
    },
    掘金之锹: {
      title: '[当机立断] 感电反应造成的伤害提升[electroCharged]%，月感电反应造成的伤害提升[lunarCharged]%',
      data: {
        electroCharged: ({ refine }) => step(48)[refine],
        lunarCharged: ({ params, refine }) => step(12)[refine] * (params.Moonsign || 0) >= 2 ? 2 : 1
      }
    },
    圣祭者的辉杖: {
      title: '[未染的觖望] 元素战技命中敌人[buff]次，攻击力提升[atkPct]%，元素充能效率提升[recharge]%',
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        atkPct: ({ params, refine }) => Math.min((params.SkillsHit || 1), 3) * step(8)[refine],
        recharge: ({ params, refine }) => Math.min((params.SkillsHit || 1), 3) * step(12)[refine]
      }
    },

// 5星

    'n/a': false,
    护摩之杖: [staticStep('hpPct', 20), {
      title: '[无羁的朱赤之蝶] 角色当前生命值[buff]%, 获得[atkPlus]攻击力',
      sort: 9,
      data: {
        buff: ({ params, artis }) => params.OwnHp || (artis['战狂'] == 4 ? 50 : 100),
        atkPlus: ({ params, attr, refine, calc }) => calc(attr.hp) * ([0.8, 1, 1.2, 1.4, 1.6][refine] + ((params.OwnHp || (artis['战狂'] == 4 ? 50 : 100)) >= 50 ? 0 : [1, 1.2, 1.4, 1.6, 1.8][refine])) / 100
      }
    }],
    天空之脊: staticStep('cpct', 8),
    贯虹之槊: [staticStep('shield', 20), {
      title: '[金璋皇极] 攻击命中敌人[buff]次，攻击力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)), 5) * step(4)[refine] * (params.ShieldTime > 0 ? 2 : 1)
      }
    }],
    和璞鸢: {
      title: '[昭理的鸢之枪] 攻击命中敌人[buff]次，攻击力提高[atkPct]%，伤害提升[dmg]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)), 7) * [3.2, 3.9, 4.6, 5.3, 6][refine],
        dmg: ({ params, refine }) => ((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)) >= 7 ? step(12)[refine] : 0,
        phy: ({ params, refine }) => ((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)) >= 7 ? step(12)[refine] : 0
      }
    },
    息灾: [staticStep('dmg', 12), {
      title: '[灭却之戒法] 释放元素战技后[buff]秒，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params.SkillsAfter || 0,
        atkPct: ({ refine, params }) => Math.min((params.SkillsAfter || 0), 6) * step(3.2)[refine] * (params.TruceTime > 0 ? 2 : 1)
      }
    }],
    薙草之稻光: [{
      title: '[非时之梦·常世灶食] 攻击力提升[atkPct]%',
      sort: 4,
      data: {
        atkPct: ({ attr, refine }) => Math.min((attr.recharge.base + attr.recharge.plus - 100) * step(28)[refine] / 100, [80, 90, 100, 110, 120][refine])
      }
    }, {
      check: ({ params }) => (params.BurstUse || 0) > 0,
      title: '[非时之梦·常世灶食] 释放元素爆发后元素充能提高[rechargePlus]%',
      refine: {
        rechargePlus: [30, 35, 40, 45, 50]
      }
    }],
    赤沙之杖: {
      title: '[蜃气尽头的热梦] 元素战技命中[buff]次，攻击力提高[atkPlus]点',
      sort: 6,
      data: {
        buff: ({ params }) => params.SkillsHit || 1,
        atkPlus: ({ params, attr, calc, refine }) => (step(52)[refine] + (step(28)[refine] * (params.SkillsHit || 1))) * calc(attr.mastery) / 100
      }
    },
    赤月之形: {
      title: '[烬日之影] 生命之契大于等于生命上限30%，造成的伤害提升[dmg]%',
      refine: {
        dmg: step(36, 12)
      }
    },
    柔灯挽歌: [staticStep('atkPct', 15), {
      check: ({ element }) => ['草'].includes(element),
      title: '[白晓的序曲] 对处于燃烧状态的敌人造成草元素伤害后伤害提升[dmg]%',
      data: {
        dmg: ({ params, refine }) => params.FireAttachment === true ? (step(18, 5)[refine] * 2) : (params.BurningDetermine === true ? (step(18, 5)[refine] * 2) : 0)
      }
    }],
    香韵奏者: [staticStep('atkPct', 12), {
      title: '[百味交响] 进行治疗，攻击力提升[atkPct]%',
      data: {
        atkPct: ({ params, refine }) => step(32)[refine] * (params.HealDetermine == true ? 1 : 0) + step(12)[refine] * (params.TruceTime > 0 ? 1 : 0)
      }
    }],
    支离轮光: {
      title: '[洁霜的玉冕] 施放元素战技或元素爆发后攻击力提升[atkPct]%，创造护盾后月感电伤害提升[lunarCharged]%',
      data: {
        atkPct: ({ params, refine }) => ((params.SkillsUse || 1) + (params.BurstUse || 0)) > 0 ? step(24)[refine] : 0,
        lunarCharged: ({ params, refine }) => params.ShieldDetermine === true ? step(40)[refine] : 0
      }
    },
    血染荒城: {
      title: '[哀恸的赞礼] 施放元素爆发后月感电反应伤害提高[lunarCharged]%,触发月感电反应后暴击伤害提高[cdmg]%并为装备者恢复[_energyevery]点元素能量',
      data: {
        lunarCharged: ({ params, refine }) => (params.BurstUse || 0) > 0 ? step(36)[refine] : 0,
        cdmg: ({ element, refine }) => ['水', '雷', '风'].includes(element) ? step(28)[refine] : 0,
        _energyevery: ({ element, refine }) => ['水', '雷', '风'].includes(element) ? step(12, 1)[refine] : 0
      }
    }
  }
}
