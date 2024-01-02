export default function ({ attr, artis, rule, def, cons }) {
  if ( attr.heal < 1 ) {
    if ( cons < 6 ) {
    return rule('静态-输出', { hp: 0, atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 55 })
    }
   return rule('静态-输出', { hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  let title = []
  let atk = 75
  let mastery = 0
  let recharge = 55
  let heal = 75
  let atkFS =  1.032 / ( ( ( ( attr.atk ) - 19475 ) / 224.475 ) + 172 )
  let healFS = 1.5937 / ( ( ( attr.heal ) / 1.5 ) + 136.21621 )
  if ( healFS >= atkFS ) {
    title.push('治疗')
    heal = 75 + ( healFS - atkFS ) * 1000
    atk = 75 - ( healFS - atkFS ) * 1000
  }
  if ( atkFS > healFS ) {
    title.push('治疗')
    atk = 75 + ( atkFS - healFS ) * 1000
    heal = 75 - ( atkFS - healFS ) * 1000
  }
  if ( cons === 6 ) {
    if ( masteryFS >= healFS ) {
      mastery = 75 + ( masteryFS - healFS ) * 1000
      heal = 75 - ( masteryFS - healFS ) * 1000
    }
    if ( healFS >= masteryFS ) {
      heal = 75 + ( healFS - masteryFS ) * 1000
     mastery = 75 - ( healFS - masteryFS ) * 1000
    }
    if ( masteryFS >= atkFS ) {
      mastery = atk + ( masteryFS - atkFS ) * 1000
      atk = mastery - ( masteryFS - atkFS ) * 1000
    }
    if ( atkFS >= masteryFS ) {
      atk = mastery + ( atkFS - masteryFS ) * 1000
      mastery = atk - ( atkFS - masteryFS ) * 1000
    }
  }
  if ( attr.recharge >= 100 ) {
    if ( weapon.name !== '西风大剑' ) {
      if ( attr.recharge >= 200 ) {
       recharge = 35 - ( attr.recharge - 100 ) / 4.56
      }
      if ( attr.recharge < 200 ) {
       recharge = 35
      }
    }
    if ( weapon.name === '西风大剑' ) {
      title.push('西风')
      recharge = 10
    }
    if ( weapon.name === '桂木斩长正' ) {
      title.push('桂木')
      recharge = recharge - 26.5
    }
    if ( weapon.name === '便携动力锯' ) {
      title.push('动力锯')
      recharge = recharge - 22.8
    }
  }
  atk = Math.floor( atk * 10 ) / 10
  mastery = Math.floor( mastery * 10 ) / 10
  recharge = Math.floor( recharge * 10 ) / 10
  heal = Math.floor( heal * 10 ) / 10
  if (title.length > 0) {
    return rule(`自适应-${title.join('')}`, { hp: 0  , atk , def: 0 , cpct: 0 , cdmg: 0 , mastery , dmg: 0 , recharge , heal })
  }
  return def({ hp: 80, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 50, recharge: 55, heal: 0 })
}