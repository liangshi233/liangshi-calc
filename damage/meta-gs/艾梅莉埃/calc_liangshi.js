export const details = [
{
  title: '撷萃调香释放伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '柔灯之匣一阶伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e')
},
{
  title: '柔灯之匣二阶单枚伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·二阶攻击伤害2'][0], 'e')
},
{
  title: '柔灯之匣三阶伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
},
{
  title: '柔灯之匣三阶激化',
  params: { spre: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q', 'spread')
},
{
  title: '香氛演绎完整对单',
  dmg: ({ talent , cons }, dmg) => {
    let q1 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    let cons4 = cons >= 4 ? 12 : 4
    return {
      dmg: q1.dmg * cons4 ,
      avg: q1.avg * cons4
    }
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: 'Q后重击伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '天赋浸析伤害',
  params: { e: true },
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 500 / 100, '')
},
{
  title: '燃烧反应伤害',
  dmg: ({}, { reaction }) => reaction('burning')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '艾梅莉埃天赋：[余薰] 每萃集两枚香韵,柔灯之匣·二阶将消耗香韵,并浸析出「清露香氛」,对敌人造成草元素范围伤害。'
},
{
  title: '艾梅莉埃天赋：[精馏] 场上存在艾梅莉埃自己创造的柔灯之匣时,队伍中附近的所有角色对燃烧伤害的火元素抗性提升[_res]%',
  data: {
    _res: 85
  }
},
{
  title: '艾梅莉埃天赋：[] 敌人处于燃烧或原激化状态下，造成伤害提升[dmg]%',
  data: {
    dmg: ({ params }) => params.spre === true ? -90 : 36
  }
},
{
  check: ({ params }) => params.e === true,
  title: '艾梅莉埃1命：[淡香浸析] 撷萃调香与固有天赋「余薰」的清露香氛造成的伤害提升[dmg]%.',
  cons: 1,
  data: {
    dmg: 10
  }
},
{
  title: '艾梅莉埃2命：[湖光顶调] 创造的柔灯之匣萃集香韵时,获得一层「特调」效果,使攻击力提升[atkPct]%',
  cons: 2,
  data: {
    atkPct: 18 * 2
  }
},
{
  title: '艾梅莉埃4命：[柔灯心韵] 香氛演绎的持续时间延长[_qSustainedPlus]秒，且每名敌人被香露选为目标的间隔降低[_qSpeedPlus]秒。',
  cons: 4,
  data: {
    _qSustainedPlus: 2 ,
    _qSpeedPlus: 0.3
  }
},
{
  check: ({ params }) => params.q === true,
  title: '艾梅莉埃6命：[茉洁香迹] 施放撷萃调香或香氛演绎时﹐将获得「香迹留驻」使普通攻击与重击将转为无法被附魔覆盖的草元素伤害,并提升造成的伤害[aPlus]',
  cons: 6,
  data: {
    aPlus: ({ calc, attr }) => calc(attr.atk) * 250 / 100 ,
    a2Plus: ({ calc, attr }) => calc(attr.atk) * 250 / 100
  }
}, {title: '6.2最后修改：[6.2重置]'}]
