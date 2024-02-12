export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技主目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '战技相邻目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
}, {
  title: '天赋追加伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['追加伤害'], 't')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'e')
}, {
  title: '触电战技结算伤害',
  dmg: ({ talent , cons }, dmg ) => {
  let plusDot = cons >= 6 ? 1.56 : 0
  let cxsh1 = dmg((talent.q['回合持续伤害'] + plusDot) * talent.e['额外持续伤害'], '', 'skillDot')
  return {
     avg: cxsh1.avg
  }
 }
}, {
  title: '触电伤害',
  dmg: ({ talent , cons }, dmg) => {
  let plusDot = cons >= 6 ? 1.56 : 0
  let cx = dmg((talent.q['回合持续伤害'] + plusDot) * talent.q['额外持续伤害'], '', 'skillDot')
  return {
  avg: cx.avg
   }
 }
},{
  title: '触电持续伤害',
  dmg: ({ talent , cons }, dmg) => {
  let plusDot = cons >= 6 ? 1.56 : 0
  let cxsh = dmg((talent.q['回合持续伤害'] + plusDot) , '', 'skillDot')
  return {
  avg: cxsh.avg
  }
 }
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgIdx = 5

export const buffs = [
{
  title: '卡芙卡1命：目标受到的持续伤害提高30%',
  cons: 1,
  data: {
    dotEnemyDmg: 30
  }
}, {
  title: '卡芙卡2命：我方全体造成的持续伤害提高25%',
  cons: 2,
  data: {
    dotDmg: 25
  }
},{
  title: '卡芙卡6命：触电的天赋倍率提升156%',
  cons: 6,
},{title: '8.15最后修改：如有问题请输入 #伤害计算反馈'}]
