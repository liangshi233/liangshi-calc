import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技主目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '天赋附加伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['附加伤害'], 't')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '瓦尔特秘技：[画地为牢] 处于特殊领域内的敌人进入战斗后，有100%的基础概率使敌方目标陷入禁锢状态，敌方目标行动延后20%，速度降低[_enemySpeed]%。',
   data: {
    _enemySpeed: 10
   }
},
{
  title: '行迹-惩戒：施放终结技提高敌人受到伤害12%',
  tree: 1,
  data: {
    dmg: 12
  }
},
{
  title: '行迹-裁决：弱点击破的敌方目标造成的伤害提高20%',
  tree: 3,
  data: {
    dmg: 20
  }
},{title: '6.14最后修改：如有问题请输入 #伤害计算反馈'}]
