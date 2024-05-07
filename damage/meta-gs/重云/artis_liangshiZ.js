export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 25) {
    return rule('静态-物理', { hp: 0, atk: 85, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }

  let title = []
  let atk = 75
  let mastery = 75
  let cpct = 100
  let cdmg = 100
  let dmg = 75
  let recharge = 35
  let atkFS = 0.3 / ((((attr.atk) - 1341.6) / 40.97) + 25)
  let masteryFS = 0.156 / (((attr.mastery) / 19.8) + 13)
  let dmgFS = 0.3 / (((attr.dmg) / 4.93) + 20)

  if (atkFS >= masteryFS) {
    title.push('标准')
    atk = 75 + (atkFS - masteryFS) * 1000
    mastery = 75 - (atkFS - masteryFS) * 1000
  }
  if (masteryFS > atkFS) {
    title.push('标准')
    mastery = 75 + (masteryFS - atkFS) * 1000
    atk = 75 - (masteryFS - atkFS) * 1000
  }
  if (dmgFS >= masteryFS) {
    dmg = 75 + (dmgFS - masteryFS) * 1000
    mastery = 75 - (dmgFS - masteryFS) * 1000
  }
  if (masteryFS > dmgFS) {
    mastery = 75 + (masteryFS - dmgFS) * 1000
    dmg = 75 - (masteryFS - dmgFS) * 1000
  }
  if (dmgFS >= atkFS) {
    dmg = atk + (dmgFS - atkFS) * 2000
  }
  if (atkFS > dmgFS) {
    atk = dmg + (atkFS - dmgFS) * 2000
  }
  if (weapon.name === '玛海菈的水色') {
    title.push('玛海菈')
    mastery = mastery + 5
  }
  if (attr.cpct < 100) {
    if (attr.cpct * 2 + attr.cdmg < 247.2) {
      cpct = 100
      cdmg = 96
    }
    if (attr.cdmg > attr.cpct * 2) {
      cpct = 100
      cdmg = 100 - (attr.cdmg - attr.cpct * 2) / 21.47
    }
    if (attr.cpct * 2 > attr.cdmg) {
      cdmg = 100
      cpct = 100 - (attr.cpct * 2 - attr.cdmg) / 21.47
    }
    if (artis.is('冰套4')) {
      title.push('冰4')
      cpct = cpct - 5.12
    }
  }
  if (attr.cpct >= 100 && attr.cdmg < 200) {
    cpct = 92.6
    cdmg = 100
  }
  if (attr.cpct >= 100 && attr.cdmg >= 260) {
    cpct = 84.2
    cdmg = 84.2
  }
  if (attr.recharge >= 100) {
    if (weapon.name !== '西风大剑') {
      if (weapon.name !== '祭礼大剑') {
        if (attr.recharge >= 200) {
          recharge = 35 - (attr.recharge - 100) / 4.56
        }
        if (attr.recharge < 200) {
          recharge = 35
        }
      }
      if (weapon.name === '祭礼大剑') {
        title.push('祭礼')
        recharge = 8
      }
    }
    if (weapon.name === '西风大剑') {
      title.push('西风')
      recharge = 10
    }
    if (weapon.name === '便携动力锯') {
      title.push('动力锯')
      recharge = recharge - 22.8
    }
    if (weapon.name === '桂木斩长正') {
      title.push('桂木')
      recharge = recharge - 26.5
    }
  }
  cpct = Math.floor(cpct * 10) / 10
  cdmg = Math.floor(cdmg * 10) / 10
  atk = Math.floor(atk * 10) / 10
  dmg = Math.floor(dmg * 10) / 10
  recharge = Math.floor(recharge * 10) / 10
  mastery = Math.floor(mastery * 10) / 10
  if (title.length > 0) {
    return rule(`自适应-${title.join('')}`, { hp: 0, atk, def: 0, cpct, cdmg, mastery, dmg, recharge, heal: 0 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
}
