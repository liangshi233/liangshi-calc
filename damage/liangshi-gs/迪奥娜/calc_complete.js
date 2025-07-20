import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js';
import { mainAttrData, ObTalentName, RankingKey } from '../index.js';

let CharacterName = "迪奥娜";
let TalentName = ObTalentName(CharacterName);
export const defDmgKey = RankingKey(CharacterName);
export const mainAttr = mainAttrData[CharacterName];
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 80, HealDetermine: true, HealTeamDetermine: true, ShieldDetermine: true };

export const details = [
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmgKey: 'z',
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  },
  {
    title: `${TalentName.a2Name}融化伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmgKey: 'z',
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: '冻冻猫猫爪伤害',
    params: { Icy_Paws: 1, SkillsHit: 2, SkillsDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.e['猫爪伤害'], 'e')
  },
  {
    title: `长按${TalentName.eNameT}总伤害`,
    params: { Icy_Paws: 5, SkillsHit: 3, SkillsDmg: 3 },
    dmgKey: 'e',
    dmg: ({ talent, params }, dmg) => {
      let e1 = dmg(talent.e['猫爪伤害'], 'e');
      return {
        dmg: e1.dmg * params.Icy_Paws,
        avg: e1.avg * params.Icy_Paws
      };
    }
  },
  {
    title: `短按${TalentName.eName}护盾量`,
    params: { Icy_Paws: 2, SkillsHit: 2, SkillsDmg: 2 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.e['护盾基础吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾基础吸收量2'][1] * 1)
  },
  {
    title: `长按${TalentName.qName}护盾量`,
    params: { Icy_Paws: 5, SkillsHit: 3, SkillsDmg: 3 },
    dmgKey: 'h',
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.e['护盾基础吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾基础吸收量2'][1] * 1)
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: '冰气酒雾领域伤害',
    params: { Drunken_Mist: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
    dmgKey: 'q',
    dmg: ({ talent }, dmg) => dmg(talent.q['领域持续伤害'], 'q')
  },
  {
    title: `${TalentName.qName}每跳治疗`,
    params: { Drunken_Mist: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
    dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗量2'][1] * 1)
  },
  {
    title: `猫鹤万班 ${TalentName.aNameT}`,
    params: { Shen_He: true, Kaedehara_Kazuha: true, Bennett: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  },
  {
    title: `猫鹤万班 ${TalentName.aNameT}融化`,
    params: { Shen_He: true, Kaedehara_Kazuha: true, Bennett: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `猫鹤万班半血 ${TalentName.aNameT}融化`,
    params: { Shen_He: true, hp: true, Kaedehara_Kazuha: true, Bennett: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `猫纳万班 ${TalentName.aNameT}`,
    params: { Nahida: true, Kaedehara_Kazuha: true, Bennett: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  },
  {
    title: `猫纳万班 ${TalentName.aNameT}融化`,
    params: { Nahida: true, Kaedehara_Kazuha: true, Bennett: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `猫纳万班半血 ${TalentName.aNameT}融化`,
    params: { Nahida: true, hp: true, Kaedehara_Kazuha: true, Bennett: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
  },
  {
    title: `猫鹤芙爱 ${TalentName.aNameT}`,
    params: { Shen_He: true, Furina: true, Escoffier: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
  }
];

export const buffs = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  {
    check: ({ params }) => params.Shen_He === true,
    title: '申鹤天赋：[缚灵通真法印] 施放仰灵威召将役咒后将使附近的队伍中所有角色根据技能释放形式对应伤害提高[dmg]%',
    data: {
      dmg: 15
    }
  },
  {
    check: ({ params }) => params.Shen_He === true && !params.TruceTime,
    title: '申鹤天赋：[大洞弥罗尊法] 处于神女遣灵真诀的领域中的当前场上角色,元素伤害加成提高[dmg]%',
    data: {
      dmg: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : 15) : 0
    }
  },
  {
    check: ({ params }) => params.Shen_He === true,
    title: '申鹤技能：[神女遣灵真诀] 使领域其中敌人的抗性降低[kx]%',
    data: {
      kx: ({ element, params }) => ['冰'].includes(element) ? 15 : (params.phy != true ? 0 : 15)
    }
  },
  {
    check: ({ params }) => params.phy != true && params.Shen_He === true && !params.TruceTime,
    title: '申鹤2命：[定蒙] 神女遣灵真诀的持续时间延长[_qSustainedPlus]秒,领域中的当前场上角色,暴击伤害提高[cdmg]%',
    cons: 2,
    data: {
      _qSustainedPlus: 6,
      cdmg: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : 15) : 0
    }
  },
  {
    title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性',
    check: ({ params }) => params.Kaedehara_Kazuha === true,
    data: {
      kx: 40
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => (cons < 6 && cons > 1) && params.Kaedehara_Kazuha === true,
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => (cons < 6 && cons > 1) && params.Kaedehara_Kazuha === true && weapon.name !== '终末嗟叹之诗',
    sort: 1,
    data: {
      atkPct: 20
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => cons >= 6 && params.Kaedehara_Kazuha === true,
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32
    }
  },
  {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => cons >= 6 && params.Kaedehara_Kazuha === true && weapon.name !== '终末嗟叹之诗',
    sort: 1,
    data: {
      atkPct: 40
    }
  },
  {
    title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 2 && params.Kaedehara_Kazuha === true,
    sort: 1,
    data: {
      mastery: 200
    }
  },
  {
    title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
    check: ({ params }) => params.Kaedehara_Kazuha === true,
    data: {
      dmg: 40
    }
  },
  {
    title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
    check: ({ params }) => params.Bennett === true,
    sort: 1,
    data: {
      atkPlus: 1202.35
    }
  },
  {
    title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
    check: ({ params, artis }) => params.Bennett === true && artis.昔日宗室之仪 !== 4,
    sort: 1,
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ params }) => params.hp === true,
    title: '迪奥娜6命：处在最烈特调领域内的角色生命值[buff]%，受治疗加成提升[healInc]%，元素精通提升[mastery]',
    cons: 6,
    data: {
      buff: ({ params, artis, weapon }) => params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100)),
      healInc: ({ params, artis, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 0 : 30,
      mastery: ({ params, artis, weapon }) => (params.OwnHp || (weapon.name == '黎明神剑' ? (weapon.affix_level >= 5 ? 100 : (artis['战狂'] == 4 ? 50 : 100)) : (artis['战狂'] == 4 ? 50 : 100))) > 50 ? 200 : 0
    }
  },
  {
    title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
    check: ({ params }) => params.Nahida === true,
    sort: 7,
    data: {
      mastery: 250
    }
  },
  {
    title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons < 6 && params.Nahida === true,
    sort: 1,
    data: {
      mastery: 40
    }
  },
  {
    title: '纳西妲武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 6 && params.Nahida === true,
    sort: 1,
    data: {
      mastery: 48
    }
  },
  {
    check: ({ cons, params }) => params.Furina === true,
    title: '芙宁娜技能：[万众狂欢] 基于芙宁娜持有的「气氛值」，附近的队伍中所有角色造成的伤害提升[dmg]%，受治疗加成提升[healInc]%',
    data: {
      dmg: 75,
      healInc: 30
    }
  },
  {
    check: ({ cons, params }) => cons >= 1 && params.Furina === true,
    title: '芙宁娜1命：[爱是难驯鸟，哀乞亦无用] 芙宁娜持有「气氛值」的上限提升100点',
    data: {
      dmg: 25,
      healInc: 10
    }
  },
  {
    check: ({ params }) => params.Escoffier === true,
    title: '可爱菲天赋：[灵感浸入调味] 队伍中存在[buff]位水冰元素角色, 敌人抗性降低[kx]%',
    data: {
      buff: ({ params }) => (params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0),
      kx: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : (((params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0)) * 5 + (((params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0)) >= 4 ? 35 : 0))) : 0
    }
  },
  {
    check: ({ params }) => params.Escoffier === true,
    title: '可爱菲1命：[味蕾绽放的餐前旋舞] 队伍中所有角色的元素类型均为冰元素与水元素时，冰元素暴击伤害提升[cdmg]%',
    cons: 1,
    data: {
      cdmg: ({ element, params }) => ['冰'].includes(element) ? (params.phy === true ? 0 : 15) : 0
    }
  },
  {
    check: ({ params }) => params.Escoffier === true && !params.TruceTime,
    title: '可爱菲2命：[鲜香味腴的炖煮艺术] 附近的当前场上角色造成冰元素伤害时，提升造成的伤害[aPlus]',
    cons: 2,
    data: {
      aPlus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
      a2Plus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
      a3Plus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
      ePlus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100,
      qPlus: ({ params }) => 240 * (params.phy === true ? 0 : 3200) / 100
    }
  }
];