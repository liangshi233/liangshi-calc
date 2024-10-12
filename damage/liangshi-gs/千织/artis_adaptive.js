export default function ({ attr, artis, weapon, rule, def, cons }) {
  // 参考数据 千织Lv90 有乐御廉切Lv90 天赋LV9 LV9 LV9 命之座0层 圣遗物华馆梦醒形骸记X5
  if (attr.phy > 25) {
    if (cons >= 6) {
      return rule('静态-高命物理', { hp: 0, atk: 85, def: 100, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
    }
    if (cons < 6) {
      return rule('静态-物理', { hp: 0, atk: 85, def: 25, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
    }
  }
  if (attr.mastery > 320) {
    return rule('静态-盾辅', { atk: 0, def: 50, cpct: 90, cdmg: 90, mastery: 100, dmg: 50, recharge: 80 })
  }
  let atkS = ((attr.atk - 864.7) / 50.41)
  let defS = ((attr.def - 1238.9) / 69.47)
  let dmgS = ((attr.dmg - 24) / 5.82999996840953)
  let cpctS = ((attr.cpct - 24.2) / 3.88999991118907)
  let cdmgS = ((attr.cdmg - 138.2) / 7.76999965310096)
  let recharge = ((-0.000005630743525481403 * Math.pow(attr.recharge, 3)) + (0.004671595655806675 * Math.pow(attr.recharge, 2)) - (1.3104235588973185 * attr.recharge) + 124.95714285714648)
  let atkF = (-8.39901 * Math.pow(10, -13) * Math.pow(atkS, 6)) + (7.1615 * Math.pow(10, -11) * Math.pow(atkS, 5)) - (7.06211 * Math.pow(10, -10) * Math.pow(atkS, 4)) - (1.14798 * Math.pow(10, -7) * Math.pow(atkS, 3)) + (6.82885 * Math.pow(10, -6) * Math.pow(atkS, 2)) - (0.000322074 * atkS) + 0.017512117
  let defF = (2.3419 * Math.pow(10, -12) * Math.pow(defS, 6)) - (4.05487 * Math.pow(10, -10) * Math.pow(defS, 5)) + (2.88132 * Math.pow(10, -8) * Math.pow(defS, 4)) - (1.1582 * Math.pow(10, -6) * Math.pow(defS, 3)) + (3.38836 * Math.pow(10, -5) * Math.pow(defS, 2)) - (0.000968369 * defS) + 0.03054883
  let dmgF = (1.6946 * Math.pow(10, -12) * Math.pow(dmgS, 6)) - (3.15604 * Math.pow(10, -10) * Math.pow(dmgS, 5)) + (2.56257 * Math.pow(10, -8) * Math.pow(dmgS, 4)) - (1.24453 * Math.pow(10, -6) * Math.pow(dmgS, 3)) + (4.34616 * Math.pow(10, -5) * Math.pow(dmgS, 2)) - (0.001282807 * dmgS) + 0.035944704
  let cpctF = (-4.32017 * Math.pow(10, -10) * Math.pow(cpctS, 6)) + (3.43465 * Math.pow(10, -8) * Math.pow(cpctS, 5)) - (9.94889 * Math.pow(10, -7) * Math.pow(cpctS, 4)) + (1.2514 * Math.pow(10, -5) * Math.pow(cpctS, 3)) - (3.23981 * Math.pow(10, -5) * Math.pow(cpctS, 2)) - (0.001446648 * cpctS) + 0.041703889
  let cdmgF = (4.72265 * Math.pow(10, -12) * Math.pow(cdmgS, 6)) - (6.53688 * Math.pow(10, -10) * Math.pow(cdmgS, 5)) + (3.49535 * Math.pow(10, -8) * Math.pow(cdmgS, 4)) - (9.19742 * Math.pow(10, -7) * Math.pow(cdmgS, 3)) + (1.38914 * Math.pow(10, -5) * Math.pow(cdmgS, 2)) - (0.00026404 * cdmgS) + 0.014390393
  let zf = 0
  let cpct = 100
  if (attr.cpct >= 100) {
    zf = atkF + defF + dmgF + cdmgF
    cpct = 80
  } else {
    zf = atkF + defF + dmgF + cpctF + cdmgF
    cpct = 80 + 20 * (cpctF / zf)
    cpct = Math.floor(cpct * 10) / 10
  }
  let atk = 60 + 40 * (atkF / zf)
  let Def = 60 + 40 * (defF / zf)
  let dmg = 60 + 40 * (dmgF / zf)
  let cdmg = 80 + 20 * (cdmgF / zf)
  recharge = Math.max(0.1, ((Math.floor(recharge * 10) / 10) + 0.1))
  atk = Math.floor(atk * 10) / 10
  Def = Math.floor(Def * 10) / 10
  dmg = Math.floor(dmg * 10) / 10
  cdmg = Math.floor(cdmg * 10) / 10
  if (!false) {
    return rule('自适应-标准', { hp: 0, atk, def: Def, cpct, cdmg, mastery: 0, dmg, recharge, heal: 0 })
  }
  return def({ atk: 75, def: 100, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
}
