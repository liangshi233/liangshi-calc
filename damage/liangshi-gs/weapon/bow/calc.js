export default function (step, staticStep) {
  return {
    // 1星

    猎弓: false,
    '(test)穿模测试': false,

    // 2星

    历练的猎弓: false,

    // 3星

    反曲弓: false,
    信使: false,
    鸦羽弓: {
      check: ({ params }) => [params.IceAttachment, params.MineAttachment, params.WindAttachment, params.GrassAttachment].every(attachment => !attachment),
      title: '[踏火止水] 对处于水或火元素影响下的敌人，造成的伤害提高[dmg]%',
      refine: {
        dmg: step(12)
      }
    },
    神射手之誓: {
      title: '[精准] 针对要害造成的伤害提升[a2Dmg]%',
      refine: {
        a2Dmg: step(24)
      }
    },
    弹弓: {
      title: '[弹弓] 普攻与重击的箭矢[buff]秒内击中敌人，伤害增加[a2Dmg]%',
      data: {
        buff: ({ params }) => params.NormalAfter || params.ChargedAfter || 0,
        aDmg: ({ params, refine }) => (params.NormalAfter || 0) > 0.3 ? -10 : step(36, 6)[refine],
        a2Dmg: ({ params, refine }) => (params.ChargedAfter || 0) > 0.3 ? -10 : step(36, 6)[refine]
      }
    },
    黑檀弓: {
      check: false,
      title: '[摧坚] 对遗迹机关类敌人造成的伤害增加[dmg]%',
      refine: {
        dmg: step(40)
      }
    },

    // 4星

    西风猎弓: false,
    祭礼弓: false,
    苍翠猎弓: false,
    竭泽: false,
    冷寂迸音: false,
    绝弦: {
      title: '[无矢之歌] 元素战技与元素爆发的伤害提高[eDmg]%',
      refine: {
        eDmg: step(24),
        qDmg: step(24)
      }
    },
    宗室长弓: { //超绽放类反应伤害似乎也能叠层，暂时不考虑
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
    弓藏: {
      title: '[速射弓斗] 普攻造成的伤害提升[aDmg]%，重击造成的伤害提升[a2Dmg]%',
      refine: {
        aDmg: step(40),
        a2Dmg: -10
      }
    },
    试作澹月: {
      title: '[离簇不归] 重击命中要害，提升[_jSpeed]%移动速度与[atkPct]%攻击力',
      refine: {
        _jSpeed: 10,
        atkPct: step(36)
      }
    },
    钢轮弓: {
      title: '[注能之矢] 普通攻击与重击命中[buff]次，提升[atkPct]%攻击力与[_aSpeed]%普通攻击速度',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 4) * step(4)[refine],
        _aSpeed: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0)), 4) * step(1.2)[refine]
      }
    },
    黑岩战弓: {
      title: '[乘胜追击] 击败[buff]个敌人，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1),
        atkPct: ({ params, refine }) => step(12)[refine] * Math.min(3, ((params.BurstKill || 0) + (params.Skillskill || 1) + (params.Plungingkill || 0) + (params.ChargedKill || 0) + (params.Normalkill || 1)))
      }
    },
    暗巷猎手: {
      title: '[街巷伏击] 角色处于后台[buff]秒，在场上[buffC]秒，造成的伤害提高[dmg]%',
      data: {
        buff: ({ params }) => params.TruceTime || 0,
        buffC: ({ params }) => params.FightTime || ((params.TruceTime || 0) > 0 ? 0 : 6),
        dmg: ({ params, refine }) => Math.max((Math.min(((params.TruceTime || 0) * step(2)[refine]), 20) - (Math.max(((params.FightTime || ((params.TruceTime || 0) > 0 ? 0 : 6)) - 4), 0) * step(4)[refine])), 0)
      }
    },
    落霞: {
      title: '[渊中霞彩] 处于状态下使造成的伤害提高[dmg]%',
      data: {  // 随机出一个，想看其他的反复凹面板即可，避免仅能计算单一数值
        dmg: ({ refine }) => step(2)[refine] + (Math.floor(Math.random() * 3) + 1) * step(4)[refine]
      }
    },
    幽夜华尔兹: {
      title: '[极夜二重奏] 普通攻击命中[buff]次,元素战技命中[buffC]次，普通攻击造成的伤害提升[aDmg]%,元素战技造成的伤害提升[eDmg]%',
      data: {
        buff: ({ params }) => params.NormalHit || 1,
        buffC: ({ params }) => params.SkillsHit || 1,
        aDmg: ({ params, refine }) => (params.SkillsHit || 1) > 0 ? step(20)[refine] : 0,
        eDmg: ({ params, refine }) => (params.NormalHit || 1) > 0 ? step(20)[refine] : 0
      }
    },
    风花之颂: {
      check: ({ params }) => (params.SkillsUse || 1) > 0,
      title: '[风花之愿] 施放元素战技时,攻击力提升[atkPct]%',
      refine: {
        atkPct: step(16)
      }
    },
    破魔之弓: {
      title: '[浅濑之弭] 当前能量[buff]%，普攻伤害提高[aDmg]%，重击伤害提高[a2Dmg]%',
      data: {
        buff: ({ params }) => params.EnergyDetermine || 100,
        aDmg: ({ params }) => ((params.EnergyDetermine || 100) === 100 ? 2 : 1) * step(16),
        a2Dmg: ({ params }) => ((params.EnergyDetermine || 100) === 100 ? 2 : 1) * step(12)
      }
    },
    掠食者: [{
      check: ({ element, params }) => element === '冰' && params.PlayStation_Network != false,
      title: '[强力攻击] 对敌人造成冰元素伤害2.0次，普攻与重击伤害提高[aDmg]%',
      refine: {
        aDmg: 20
      }
    }, {
      check: ({ characterName, params }) => characterName === '埃洛伊' && params.PlayStation_Network != false,
      title: '[强力攻击] 攻击力提升[atkPlus]点',
      refine: {
        atkPlus: 66
      }
    }],
    曚云之月: {
      title: '[驭浪的海祇民] 队伍中所有角色的元素能量上限总和[buff]点，元素爆发伤害提高[qDmg]%',
      data: {
        buff: ({ params }) => params.EnergyTeammate || 80,
        qDmg: ({ params, refine }) => Math.min((params.EnergyTeammate || 80) * step(0.12)[refine], step(40)[refine])
      }
    },
    王下近侍: {
      check: ({ params }) => !params.TruceTime,
      title: '[迷宫之王的教导] 施放元素战技或元素爆发时精通提高[mastery]',
      refine: {
        mastery: step(60, 20)
      }
    },
    鹮穿之喙: {
      title: '[秘智之眸的青睐] 重击命中敌人[buff]次，提高元素精通[mastery]点',
      data: {
        buff: ({ params }) => params.ChargedHit || 0,
        mastery: ({ params, refine }) => Math.min((params.ChargedHit || 0), 2) * step(40)[refine]
      }
    },
    烈阳之嗣: {
      title: '[阳炎古道] 对于灼心状态下的敌人造成的重击伤害提升[a2Dmg]%',
      refine: {
        a2Dmg: step(28)
      }
    },
    静谧之曲: {
      check: ({ params }) => (params.HealNumber || 0) > 0,
      title: '[深海弦振] 受到治疗后，造成的伤害提升[dmg]%',
      refine: {
        dmg: step(16)
      }
    },
    筑云: {
      title: '[镌岩为坊] 元素能量减少[buff]次，装备者的元素精通提升[mastery]%',
      data: {
        buff: ({ params }) => params["元素能量减少次数占位"] || 0,
        mastery: ({ params, refine }) => Math.min((params["元素能量减少次数占位"] || 0), 2) * step(40)[refine]
      }
    },
    测距规: {
      title: '[石匠号子] 进行或受到[buff]次治疗，提高[atkPct]%攻击力与[dmg]%所有元素伤害加成',
      data: {
        buff: ({ params }) => params.HealNumber || 0,
        atkPct: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * [3, 4, 5, 6, 7][refine],
        dmg: ({ params, refine }) => Math.min((params.HealNumber || 0), 3) * [7, 8.5, 10, 11.5, 13][refine]
      }
    },
    缀花之翎: {
      title: '[未至的花序] 进行瞄准[buff]秒后射击，重击造成的伤害提升[a2Dmg]%',
      refine: {
        buff: ({ params }) => params.ChargedTime || 2,
        a2Dmg: ({ params }) => Math.min(((params.ChargedTime || 2) * 2), 6) * step(6)[refine]
      }
    },
    碎链: { //实际互斥，每个角色至多触发一个效果
      title: '[花与落羽的长歌] [buff]名与装备者元素类型不同的角色,[buffC]名纳塔角色，攻击力提升[atkPct]%,元素精通提升[mastery]点',
      data: {
        buff: ({ params }) => params.ElementDifferent || 0,
        buffC: ({ params }) => params.NatlanTeammate || 0,
        atkPct: ({ params, refine }) => Math.min(((params.ElementDifferent || 0) + (params.NatlanTeammate || 0)), 3) * step(4.8)[refine],
        mastery: ({ params, refine }) => Math.min(((params.ElementDifferent || 0) + (params.NatlanTeammate || 0)), 3) === 3 ? step(24)[refine] : 0
      }
    },

    // 5星

    'n/a': false,
    天空之翼: staticStep('cdmg', 20),
    阿莫斯之弓: [{
      title: '[矢志不忘] 普通攻击与重击造成的伤害提高[a2Dmg]%',
      refine: {
        aDmg: step(12),
        a2Dmg: step(12)
      }
    }, {
      title: '[矢志不忘] 普通攻击与重击的箭矢[buff]秒击中敌人，伤害提高[a2Dmg]%',
      refine: {
        buff: ({ params }) => params.NormalAfter || params.ChargedAfter || 0,
        aDmg: ({ params, refine }) => Math.min((params.NormalAfter || 0), 0.5) * step(80)[refine],
        a2Dmg: ({ params, refine }) => Math.min((params.ChargedAfter || 0), 0.5) * step(80)[refine],
      }
    }],
    终末嗟叹之诗: [staticStep('mastery', 60), {
      title: '[别离的思念之歌] 元素战技与元素爆发命中[buff]次敌人，元素精通提高[mastery],攻击力提升[atkPct]%',
      refine: {
        buff: ({ params }) => (params.SkillsHit || 1) + (params.BurstHit || 0),
        mastery: ({ params, refine }) => ((params.SkillsHit || 1) + (params.BurstHit || 0)) >= 4 ? step(100)[refine] : 0,
        atkPct: ({ params, refine }) => ((params.SkillsHit || 1) + (params.BurstHit || 0)) >= 4 ? step(20)[refine] : 0
      }
    }],
    冬极白星: [{
      title: '[极昼的先兆者] 元素战技与元素爆发伤害提高[eDmg]%',
      refine: {
        eDmg: step(12),
        qDmg: step(12)
      }
    }, {
      title: '[极昼的先兆者] 普通攻击,重击,元素战技与元素爆发命中[buff]类，攻击力将提高[atkPct]%',
      refine: {
        buff: ({ params }) => [(params.NormalHit || 1), params.ChargedHit, (params.SkillsHit || 1), params.BurstHit].filter(Hit => Hit > 0).length,
        atkPct: ({ params, refine }) => [(params.NormalHit || 1), params.ChargedHit, (params.SkillsHit || 1), params.BurstHit].filter(Hit => Hit > 0).length * step(10)[refine] + ([(params.NormalHit || 1), params.ChargedHit, (params.SkillsHit || 1), params.BurstHit].filter(Hit => Hit > 0).length) === 4 ? step(8)[refine] : 0
      }
    }],
    若水: [staticStep('hpPct', 16), {
      title: '[洗濯诸类之形] 周围存在[buff]个敌人，造成的伤害提高[dmg]%',
      data: {
        buff: ({ params }) => params.EnemiesNumber || 4,
        dmg: ({ params, refine }) => (params.EnemiesNumber || 4) > 0 ? step(20)[refine] : 0
      }
    }],
    飞雷之弦振: [staticStep('atkPct', 20), {
      title: '[飞雷御执] 当前元素能量[buff]%,普通攻击造成[buffC]次伤害,释放[buffD]次元素战技，普通攻击造成的伤害提高[aDmg]%',
      refine: {
        buff: ({ params }) => params.EnergyDetermine || 100,
        buffC: ({ params }) => params.NormalDmg || 1,
        buffD: ({ params }) => params.SkillsUse || 1,
        aDmg: ({ params, refine }) => ((((params.EnergyDetermine || 100) === 100 ? 0 : 1) + ((params.NormalDmg || 1) > 0 ? 1 : 0) + ((params.SkillsUse || 1) > 0 ? 1 : 0)) * step(12)[refine]) + ((((params.EnergyDetermine || 100) === 100 ? 0 : 1) + ((params.NormalDmg || 1) > 0 ? 1 : 0) + ((params.SkillsUse || 1) > 0 ? 1 : 0)) === 3 ? step(4)[refine] : 0)
      }
    }],
    猎人之径: [staticStep('dmg', 12),{
      title: '[兽径的终点] 重击造成的伤害值提高[a2Plus]',
      sort: 9,
      data: {
        a2Plus: ({ attr, calc, refine }) => calc(attr.mastery) * step(160)[refine] / 100
      }
    }],
    最初的大魔术: [{
      title: '[伟大者帕西法尔] 重击造成的伤害提升[a2Dmg]%',
      refine: {
        a2Dmg: step(16)
      }
    }, {
      title: '[伟大者帕西法尔] 队伍中存在[buff]名元素类型相同的角色,[buffC]名不同的角色，攻击力提升[atkPct]%,移动速度提升[_jSpeed]%',
      refine: {
        buff: ({ params }) => params.ElementSame || 0,
        buffC: ({ params }) => params.ElementDifferent || 0,
        atkPct: ({ params, refine }) => Math.min((params.ElementSame || 0), 3) * step(16)[refine],
        _jSpeed: ({ params, refine }) => (Math.min((params.ElementDifferent || 0), 3) * 3) + ((params.ElementDifferent || 0) === 0 ? 0 : [1, 3, 5, 7, 9][refine])
      }
    }],
    白雨心弦: {
      title: '[德吕阿的夜曲] 释放[buff]次元素战技,进行[buffC]次治疗，生命值上限提升[hpPct]%,元素爆发的暴击率提[qCpct]%',
      refine: {
        buff: ({ params }) => params.SkillsUse || 1,
        buffC: ({ params, characterName }) => characterName === '希格雯' ? ((params.SkillsHit || 1) > 0 ? (params.SkillsHit || 1) : 0) : (params.HealDetermine === true ? (params.HealNumber || 0) : 0), //希格雯元素战技弹跳治疗不包含自己，需独立处理
        hpPct: ({ params, characterName, refine }) => ((((params.SkillsUse || 1) > 0 ? 1 : 0) + ((characterName === '希格雯' ? ((params.SkillsHit || 1) > 0 ? (params.SkillsHit || 1) : 0) : (params.HealDetermine === true ? (params.HealNumber || 0) : 0)) > 0 ? 1 : 0) + (params.BondOfLifeDetermine === true ? 1 : 0)) * step(12)[refine]) + ((((params.SkillsUse || 1) > 0 ? 1 : 0) + ((characterName === '希格雯' ? ((params.SkillsHit || 1) > 0 ? (params.SkillsHit || 1) : 0) : (params.HealDetermine === true ? (params.HealNumber || 0) : 0)) > 0 ? 1 : 0) + (params.BondOfLifeDetermine === true ? 1 : 0)) === 3 ? step(4)[refine] : 0),
        qCpct: ({ params, characterName, refine }) => (((params.SkillsUse || 1) > 0 ? 1 : 0) + ((characterName === '希格雯' ? ((params.SkillsHit || 1) > 0 ? (params.SkillsHit || 1) : 0) : (params.HealDetermine === true ? (params.HealNumber || 0) : 0)) > 0 ? 1 : 0) + (params.BondOfLifeDetermine === true ? 1 : 0)) === 3 ? step(28)[refine] : 0
      }
    },
    星鹫赤羽: [{
      check: ({ params, element }) => ['风'].includes(element) || (params.WindAttachment === true),
      title: '[眸中的月珥] 触发扩散反应后，攻击力提高[atkPct]%',
      refine: {
        atkPct: step(24)
      }
    }, {
      title: '[眸中的月珥] 存在至少[buff]名元素类型不同的角色，重击造成的伤害提高[a2Dmg]%,元素爆发伤害提高[qDmg]%',
      data: {
        buff: ({ params }) => params.ElementDifferent || 0,
        a2Dmg: ({ params, refine }) => Math.min((params.ElementDifferent || 0), 2) * step(20)[refine] + (Math.min((params.ElementDifferent || 0), 2)) === 2 ? step(8)[refine] : 0,
        qDmg: ({ params, refine }) => Math.min((params.ElementDifferent || 0), 2) * step(10)[refine] + (Math.min((params.ElementDifferent || 0), 2)) === 2 ? step(4)[refine] : 0
      }
    }],
    陨龙之梦: [staticStep('shield', 20), {
      title: '[金璋皇极] 攻击命中敌人[buff]次，攻击力提高[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalHit || 1) + (params.ChargedHit || 0) + (params.PlungingHit || 0) + (params.SkillsHit || 1) + (params.BurstHit || 0)), 5) * step(4)[refine] * (params.ShieldTime > 0 ? 2 : 1)
      }
    }]
  }
}
