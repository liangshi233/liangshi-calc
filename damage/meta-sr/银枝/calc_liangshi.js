import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [
{
  title: '0层普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: '满层普攻伤害',
  params: { sg: 10 },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: '0层战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '满层战技伤害',
  params: { sg: 10 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '0层终结技伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '满层终结技伤害',
  params: { q: true , sg: 10 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '0层满能终结技伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q2['技能伤害'], 'q')
},
{
  title: '满层满能终结技伤害',
  params: { q: true , sg: 10 },
  dmg: ({ talent }, dmg) => dmg(talent.q2['技能伤害'], 'q')
},
{
  title: '0层终结技单次弹射伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q2['额外随机伤害'], 'q')
},
{
  title: '满层终结技单次弹射伤害',
  params: { q: true , sg: 10 },
  dmg: ({ talent }, dmg) => dmg(talent.q2['额外随机伤害'], 'q')
}
]

export const defDmgIdx = 7
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '银枝秘技：[纯粹高洁宣言] 主动攻击陷入晕眩状态的敌人，对敌方全体造成物理属性伤害，并使银枝恢复[_energyevery]点能量。',
   data: {
    _energyevery: 15
   }
},
{
  check: ({ params }) => params.sg !== undefined,
  title: '银枝天赋：[崇高的客体] 施放普攻、战技、终结技时,每击中敌方目标,为银枝恢复[_energyevery]点能量并使银枝暴击率提高[cpct]%',
  data: {
    _energyevery: 3,
    cpct: ({ params , talent }) => params.sg * talent.t['暴击率提高'] * 100
  }
},
{
  title: '银枝行迹：[勇气] 对生命值小于等于50%的敌人造成的伤害提高[dmg]%',
  trees: 2,
  data: {
    dmg: 15
  }
},
{
  check: ({ params }) => params.sg !== undefined,
  title: '银枝1魂：[审美王国的缺口] 基于升格层数额外提升暴击伤害[cdmg]%',
  cons: 1,
  data: {
    cdmg: ({ params }) => params.sg * 4
  }
},
{
  check: ({ params }) => params.q === true,
  title: '银枝2魂：[玛瑙石的谦卑] 释放终结技时,若地方目标数量大于等于3,攻击力提高[atkPct]%',
  cons: 2,
  data: {
    atkPct: 40
  }
},
{
  check: ({ params }) => params.sg >= 1 ,
  title: '银枝4魂：[号角的奉献] 天赋的效果可叠加上限提高2层',
  cons: 4,
  data: {
    cpct: ({ talent }) => talent.t['暴击率提高'] * 100 * 2 ,
    cdmg: 8
  }
},
{
  check: ({ params }) => params.q === true,
  title: '银枝6魂：[「你」的光芒] 释放终结技时,无视敌方目标[ignore]%的防御力',
  cons: 6,
  data: {
    ignore: 30
  }
},
 {title: '11.26最后修改：[11.26重置]'}]

