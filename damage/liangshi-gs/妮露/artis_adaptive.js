export default function ({ attr, artis, weapon, rule, def, cons }) {
  // 参考数据 妮露Lv90 圣显之钥Lv90 天赋LV9 LV9 LV9 命之座0层 圣遗物千岩牢固X2花海甘露之光X2任意X1
  // v1.5
  if (attr.phy > 25) {
    return rule('静态-物理', { hp: 0, atk: 85, def: 0, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  let title = []
  let hpS = ((attr.hp - 38714) / 885.2854952029871)
  let hpF = 0
  if (attr.hp >= 74445) {
    hpF = (-1.9844 * Math.pow(10, -11) * Math.pow(hpS, 6)) + (1.94763 * Math.pow(10, -9) * Math.pow(hpS, 5)) - (7.29203 * Math.pow(10, -8) * Math.pow(hpS, 4)) + (1.30835 * Math.pow(10, -6) * Math.pow(hpS, 3)) - (1.13418 * Math.pow(10, -5) * Math.pow(hpS, 2)) + (1.57471 * Math.pow(10, -5) * hpS) + 0.004336059
  } else {
    hpF = (-9.47964 * Math.pow(10, -14) * Math.pow(hpS, 6)) + (-5.03595 * Math.pow(10, -11) * Math.pow(hpS, 5)) + (7.32893 * Math.pow(10, -9) * Math.pow(hpS, 4)) - (4.40619 * Math.pow(10, -7) * Math.pow(hpS, 3)) + (1.80967 * Math.pow(10, -5) * Math.pow(hpS, 2)) - (0.000680538 * hpS) + 0.02553539
  }
  let masteryS = 0
  let masteryF = 0
  if (artis.is('乐园4')) {
    title.push('乐园4')
    masteryF = ((16 * attr.mastery) / (attr.mastery + 2000)) + 0.8
    masteryS = ((((-2000 * masteryF) / (masteryF - 16))) / 23.309999465942383)
  } else {
    masteryS = (attr.mastery / 23.309999465942383)
  }
  masteryF = (2.55616 * Math.pow(10, -12) * Math.pow(masteryS, 6)) - (4.3673 * Math.pow(10, -10) * Math.pow(masteryS, 5)) + (3.28089 * Math.pow(10, -8) * Math.pow(masteryS, 4)) - (1.49349 * Math.pow(10, -6) * Math.pow(masteryS, 3)) + (4.91354 * Math.pow(10, -5) * Math.pow(masteryS, 2)) - (0.00131602 * masteryS) + 0.027687061
  let DefS = 0
  let DefF = 0
  if (weapon.name === '辰砂之纺锤') {
    title.push('纺锤')
    DefS = ((attr.def - 1231.1) / 53.11493798494333)
    DefF = (-4.22708 * Math.pow(10, -11) * Math.pow(DefS, 6)) + (2.35585 * Math.pow(10, -9) * Math.pow(DefS, 5)) - (5.12064 * Math.pow(10, -8) * Math.pow(DefS, 4)) + (5.49274 * Math.pow(10, -6) * Math.pow(DefS, 3)) - (2.98912 * Math.pow(10, -6) * Math.pow(DefS, 2)) + (1.24592 * Math.pow(10, -6) * DefS) + 0.001969475
  }
  let dmgS = (attr.dmg / 5.82999996840953)
  let dmgF = (-3.71776 * Math.pow(10, -13) * Math.pow(dmgS, 6)) - (6.68318 * Math.pow(10, -11) * Math.pow(dmgS, 5)) - (4.49014 * Math.pow(10, -9) * Math.pow(dmgS, 4)) + (1.38571 * Math.pow(10, -7) * Math.pow(dmgS, 3)) - (1.36546 * Math.pow(10, -6) * Math.pow(dmgS, 2)) - (8.36632 * Math.pow(10, -5) * dmgS) + 0.009995303
  let rechargeS = ((attr.recharge - 100) / 6.480000168085098)
  if (artis.is('追忆4')) {
    title.push('追忆4')
    rechargeS = rechargeS - 22.04
  }
  if (weapon.name === '西福斯的月光') {
    title.push('西福斯')
    rechargeS = rechargeS + (attr.mastery * 0.036 / 6.480000168085098)
  }
  let rechargeF = (4.32548 * Math.pow(10, -13) * Math.pow(rechargeS, 6)) + (2.47882 * Math.pow(10, -11) * Math.pow(rechargeS, 5)) - (2.4848 * Math.pow(10, -9) * Math.pow(rechargeS, 4)) + (6.03672 * Math.pow(10, -7) * Math.pow(rechargeS, 3)) - (5.56497 * Math.pow(10, -7) * Math.pow(rechargeS, 2)) - (7.47025 * Math.pow(10, -6) * rechargeS) + 0.0027335
  if (weapon.name === '西风剑') {
    title.push('西风')
    rechargeF = rechargeF * 0.53846
  }
  if (weapon.name === '西福斯的月光') {
    masteryF = masteryF + (((attr.mastery * 0.00036) / attr.recharge) * rechargeF)
  }
  let atkF = 0
  let cpctS = ((attr.cpct - 5) / 3.88999991118907)
  let cdmgS = ((attr.cdmg - 50) / 7.76999965310096)
  let cpctF = (-4.32017 * Math.pow(10, -10) * Math.pow(cpctS, 6)) + (3.43465 * Math.pow(10, -8) * Math.pow(cpctS, 5)) - (9.94889 * Math.pow(10, -7) * Math.pow(cpctS, 4)) + (1.2514 * Math.pow(10, -5) * Math.pow(cpctS, 3)) - (3.23981 * Math.pow(10, -5) * Math.pow(cpctS, 2)) - (0.001446648 * cpctS) + 0.041703889
  let cdmgF = (4.72265 * Math.pow(10, -12) * Math.pow(cdmgS, 6)) - (6.53688 * Math.pow(10, -10) * Math.pow(cdmgS, 5)) + (3.49535 * Math.pow(10, -8) * Math.pow(cdmgS, 4)) - (9.19742 * Math.pow(10, -7) * Math.pow(cdmgS, 3)) + (1.38914 * Math.pow(10, -5) * Math.pow(cdmgS, 2)) - (0.00026404 * cdmgS) + 0.014390393
  let zf = 0
  let cpct = 100
  if (attr.cpct >= 100) {
    zf = hpF + DefF + masteryF + rechargeF + dmgF + cdmgF
    cpct = 80
  } else {
    zf = hpF + DefF + masteryF + rechargeF + dmgF + cpctF + cdmgF
    cpct = 80 + 20 * (cpctF / zf)
    cpct = Math.floor(cpct * 10) / 10
  }
  let hp = 60 + 40 * (hpF / zf)
  let atk = 0
  let Def = 40 * (DefF / zf)
  let mastery = 60 + 40 * (masteryF / zf)
  let dmg = 60 + 40 * (dmgF / zf)
  let cdmg = 80 + 20 * (cdmgF / zf)
  let recharge = 35 + 40 * (cdmgF / zf)
  hp = Math.floor(hp * 10) / 10
  Def = Math.floor(Def * 10) / 10
  mastery = Math.floor(mastery * 10) / 10
  dmg = Math.floor(dmg * 10) / 10
  cdmg = Math.floor(cdmg * 10) / 10
  recharge = Math.floor(recharge * 10) / 10
  if (weapon.name === '辰砂之纺锤') {
    Def = Def + 5
  }
  let wa = `${title.join('')}` || '混伤'
  if (!false) {
    return rule(`自适应-${wa}`, { hp, atk, def: Def, cpct, cdmg, mastery, dmg, recharge, heal: 0 })
  }
  return def({ hp: 100, atk: 0, def: 0, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
}
