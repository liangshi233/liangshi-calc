import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '1层神君单体伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'] * 1, 'a3')
}, {
  title: '10层神君单体伤害',
  check: ({ cons }) => cons < 6,
  dmgKey: 't',
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'] * 10, 't')
}, {
  title: '10层神君单体伤害',
  check: ({ cons }) => cons >= 6,
  dmgKey: 't',
  dmg: ({ talent }, { dynamic }) => {
    const dynamicEnemydmg = 12
    let t1dmg = dynamic(talent.t['技能伤害'], 't')
    let t2dmg = dynamic(talent.t['技能伤害'], 't', { dynamicEnemydmg })
    let t3dmg = dynamic(talent.t['技能伤害'], 't', { dynamicEnemydmg: dynamicEnemydmg * 2 })
    let t4dmg = dynamic(talent.t['技能伤害'], 't', { dynamicEnemydmg: dynamicEnemydmg * 3 })
    return {
      dmg: t1dmg.dmg + t2dmg.dmg + t3dmg.dmg + t4dmg.dmg * 7,
      avg: t1dmg.avg + t2dmg.avg + t3dmg.avg + t4dmg.avg * 7
    }
  }
}]

export const defDmgKey = 't'
export const mainAttr = 'atk,cpct,cdmg,speed'
export const defParams = { technique: `${Technique}` }

export const buffs = [{
  title: '景元2命：神君行动后，普攻战技及终结技的伤害提高20%',
  cons: 2,
  data: {
    aDmg: 20,
    eDmg: 20,
    qDmg: 20
  }
}, {
  title: '景元6命：神君会使目标陷入易伤状态，使伤害提高12%，最多3层',
  cons: 6
}, {
  title: '行迹-破阵：攻击段数大于等于6段，则其下回合的暴击伤害提高25%',
  tree: 1,
  data: {
    tCdmg: 25
  }
}, {
  title: '行迹-遣将：施放战技后，暴击率提升10%',
  tree: 3,
  data: {
    cpct: 10
  }
},{title: '2.19最后修改：如有问题请输入 #伤害计算反馈'}]
