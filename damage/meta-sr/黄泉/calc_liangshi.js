export const details = [
{
  title: '普攻伤害',
  dmg: ({ talent , cons }, dmg) => {
     let talentConfig = cons >= 6 ? 'q' : 'a'
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let aDmg = dmg(talent.a['技能伤害'] * talentDmg , `${talentConfig}`)
     return aDmg
  }
},
{
  title: '战技主目标伤害',
  dmg: ({ talent , cons }, dmg) => {
     let talentConfig = cons >= 6 ? 'q' : 'a'
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let eDmg = dmg(talent.e['单体伤害'] * talentDmg , `${talentConfig}`)
     return eDmg
  }
},
{
  title: '战技相邻目标伤害',
  dmg: ({ talent , cons }, dmg) => {
     let talentConfig = cons >= 6 ? 'q' : 'a'
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let e2Dmg = dmg(talent.e['相邻目标伤害'] * talentDmg , `${talentConfig}`)
     return e2Dmg
  }
},
{
  title: '啼泽雨斩单次伤害',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let q1Dmg = dmg(talent.q['啼泽雨斩伤害'] * talentDmg , 'q')
     return q1Dmg
  }
},
{
  title: '黄泉返渡伤害',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let q2Dmg = dmg(talent.q['黄泉返渡伤害'] * talentDmg , 'q')
     return q2Dmg
  }
},
{
  title: '每层集真赤消除伤害',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let q3Dmg = dmg(talent.q['倍率提升'] * talentDmg , 'q')
     return q3Dmg
  }
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  check: ({ params }) => params.q === true,
  title: '黄泉天赋：[红叶时雨，万倾一空] 终结技期间可无视弱点属性削减敌方韧性，并使敌方全体全属性抗性降低[kx]%',
  data: {
    kx: ({ talent }) => talent.t['抗性降低']
  }
},
{
  title: '黄泉行迹：[奈落] 我方队伍中存在[buffCount]名「虚无」命途角色，使普攻、战技、终结技造成的伤害为原伤害的1[_dmg]%',
  tree: 2,
  data: {
    buffCount: ({ cons }) => cons >= 2 ? 2 : 1 ,
    _dmg: ({ cons }) => Math.max( 0 , ( cons >= 2 ? 2 : 1 ) * 45 - 30 )
  }
},
{
  title: '黄泉行迹：[雷心] 终结技的【啼泽雨斩】击中持有【集真赤】的敌方目标时，使黄泉造成的伤害提高[dmg]%',
  tree: 3,
  data: {
    dmg: 30 * 3
  }
},
{
  title: '黄泉1魂：[高天寥落真言始] 对处于负面效果的敌方目标造成伤害时暴击率提高[cpct]%',
  cons: 1,
  data: {
    cpct: 18
  }
},
{
  title: '黄泉2魂：[霆鼓俱寂，瑟风亦止] 行迹【奈落】最高数值所需求「虚无」命途角色的数量减少1名',
  cons: 2
},
{
  title: '黄泉4魂：[亘焰燎照镜中人] 施放终结技时，使敌方全体受到的终结技伤害提高[qEnemydmg]%',
  cons: 4,
  data: {
    qEnemydmg: 12
  }
},
{
  title: '黄泉6魂：[灾咎解桎梏] 终结技的暴击伤害提高[qCdmg]%，施放普攻、战技造成的伤害同时视为终结技伤害。',
  cons: 6,
  data: {
    qCdmg: 60
  }
}]
