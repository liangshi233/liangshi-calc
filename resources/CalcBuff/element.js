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