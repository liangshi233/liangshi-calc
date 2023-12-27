export const details = [
{
  title: '半血开E普攻一段',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: '半血开E重击',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '半血开E普攻一段蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: '半血开E重击蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: '血梅香伤害',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['血梅香伤害'], 'e')
},
{
  title: '半血开E后Q',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q')
},
{
  title: '胡行夜钟 重击蒸发',
  params: { teamA: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: '胡行夜钟 Q蒸发',
  params: { teamA: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
}]

export const defDmgIdx = 3
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '胡桃技能：[蝶引来生] 消耗一部分生命值,击退周围敌人,基于进入该状态时胡桃的生命值上限,提高胡桃[atkPlus]点攻击力',
  sort: 9,
  data: {
    atkPlus: ({ talent, attr, calc }) => {
      return Math.min( talent.e['攻击力提高'] * calc(attr.hp) / 100, attr.atk.base * 4 )
    }
  }
},
{
  title: '胡桃天赋：[血之灶火] 胡桃的生命值低于或等于50%时,获得[dmg]%火元素伤害加成',
  data: {
    dmg: 33
  }
},
{
  title: '胡桃1命：[赤团开时斜飞去] 处于蝶引来生施加的彼岸蝶舞状态下时,胡桃的重击体力消耗减少[_a2Stamina]% ',
  cons: 1,
  data: {
    _a2Stamina: 100
  }
},
{
  title: '胡桃2命：[最不安神晴又复雨] 血梅香造成的伤害提高[ePlus]点,安神秘法会为命中的敌人施加血梅香效果',
  cons: 2,
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.1
  }
},
{
  title: '胡桃6命：[幽蝶能留一缕芳] 胡桃的生命值降至25%以下,或承受足以使她倒下的伤害时胡桃的所有元素抗性和物理抗性提高[_res]%,暴击率提高[_cpct]%,并提高[_interruption]%抗打断能力',
  cons: 6,
  data: {
    _interruption: 100 ,
    _cpct: 100 ,
  	_res: 200
  }
},
{
  title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在期间，能使队伍中自己的当前场上角色造成的伤害提高至多[dmg]%',
  check: ({ params }) => params.teamA === true,
  data: {
    dmg: 50
  }
},
{
  title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  cons: 4,
  data: {
    hpPct: 40
  }
},
{
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
  check: ({ params }) => params.teamA === true,
  data: {
    kx: 20
  }
},
{
  title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
  check: ({ params }) => params.teamA === true,
  data: {
    hpPct: 25
  }
},
 'vaporize',
{title: '12.27最后修改：[11.6重置] 修复攻击力提升不正确的问题'}
]
