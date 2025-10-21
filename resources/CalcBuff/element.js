//先不导出，和组队计算一并修改

export const reactionBuffGs = [{
  check: ({ params }) => params.ElementMineTeam >= 1 && params.ElementIceTeam >= 1,
  title: '元素反应：[超导] 冰元素触及雷元素时会造成冰元素的范围伤害,并降低受超导影响生物[phyKx]%的物理抗性',
  data: {
    phyKx: 25
  }
}]

//元素共鸣需要队伍满4人才可触发，由于队伍都是固定的所以不做判断，自行添加新队伍时需注意
export const resonanceBuffGs = [{
  check: ({ params }) => params.ElementWaterTeam >= 2,
  title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
  data: {
    hpPct: 25
  }
},
{
  check: ({ params }) => params.ElementFireTeam >= 2,
  title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
  data: {
    atkPct: 25
  }
},
{
  check: ({ params }) => params.FireAttachment != true && params.MineAttachment != true && params.WindAttachment != true && params.ElementIceTeam >= 2,
  title: '元素共鸣：[粉碎之冰] 攻击处于冰元素附着或冻结下的敌人时，暴击率提高[cpct]%',
  data: {
    cpct: 15
  }
},
{
  check: ({ params }) => params.ElementWindTeam >= 2,
  title: '元素共鸣：[迅捷之风] 体力消耗降低[_stamina]%，移动速度提升[_jSpeed]%，技能冷却时间缩短[_cd]%',
  data: {
    _stamina: 15,
    _jSpeed: 10,
    _cd: 5
  }
},
{
  check: ({ params }) => params.ElementRockTeam >= 2,
  title: '元素共鸣：[坚定之岩] 护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%元素抗性',
  data: {
    shield: 25,
    dmg: 15,
    kx: ({ element }) => element === '岩' ? 20 : 0
  }
},
{
  check: ({ params }) => params.ElementGrassTeam >= 2 && (params.ElementFireTeam >= 1 || params.ElementWaterTeam >= 1),
  title: '元素共鸣：[蔓生之草(燃烧/绽放队)] 触发燃烧、原激化、绽放反应后，提升元素精通[mastery]点,',
  data: {
    mastery: 80
  }
},
{
  check: ({ params }) => params.ElementGrassTeam >= 2 && (params.ElementMineTeam >= 1 || (params.ElementFireTeam >= 1 && params.ElementWaterTeam >= 1)),
  title: '元素共鸣：[蔓生之草(激化/激绽/烈绽队)] 触发超激化、蔓激化或超绽放、烈绽放反应后，提升元素精通[mastery]点',
  data: {
    mastery: 100
  }
},
{
  check: ({ params }) => ![params.ElementWindTeam, params.ElementRockTeam, params.ElementMineTeam, params.ElementFireTeam, params.ElementWaterTeam, params.ElementIceTeam, params.ElementGrassTeam].some(pas => pas !== undefined && pas >= 2),
  title: '元素共鸣：[交织之护] 全元素与物理抗性提升[_res]%',
  data: {
    _res: 15
  }
}]

export const MoonsignBuffGs = [{ //需要在角色处导入并设置Moonsign大于等于2才会激活
  check: ({ params }) => !params.MoonsignDetermine && (params.Moonsign || 0) >= 2 && ((params.SkillsUse || 1) + (params.BurstUse || 0)) > 0,
  title: '新月之拥：[满辉] 释放元素战技或元素爆发后，月曜反应伤害提升[lunarBloom]%',
  data: ({ attr, calc, element }) => {
    let base = 0
    if (element === '水') { // 60000
      base = calc(attr.hp) / 1000 * 0.6
    } else if (element === '岩') { // 3600
      base = calc(attr.def) / 100
    } else if (element === '风' ||  element === '草') { // 1600
      base = calc(attr.mastery) / 100 * 2.25
    } else { // 4000
      base = calc(attr.atk) / 100 * 0.9
    }
    base = Math.min(base, 36)
    return { lunarCharged: base, lunarBloom: base }
  }
}]

export const NegativeStatusMc = [{ // 有能给自己挂电磁效应的才用这个(这个是扣攻击)
  check: ({ params }) => params.De_Electro_Flare > 0,
  title: '异常效应：[电磁效应(旧)] 角色被附加[buff]层电磁效应，攻击力提升[atkPct]%',
  data: {
    buff: ({ params }) => params.De_Electro_Flare || 0,
    atkPct: ({ params }) => 0 - ((params.De_Electro_Flare || 0) > 0 ? 5 : 0) - ((params.De_Electro_Flare || 0) > 4 ? 2 : 0) - ((params.De_Electro_Flare || 0) > 9 ? 3 : 0)
  }
}]