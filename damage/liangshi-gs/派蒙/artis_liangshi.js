export default function ({ rule, def }) {
  let Hp1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Atk1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Def1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Cpct1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Cdmg1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Mastery1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Dmg1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Phy1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Recharge1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  let Heal1 = Math.floor((Math.random() * (100 - 1) + 1) * 10) / 10
  return def({ hp: Hp1, atk: Atk1, def: Def1, cpct: Cpct1, cdmg: Cdmg1, mastery: Mastery1, dmg: Dmg1, phy: Phy1, recharge: Recharge1, heal: Heal1 })
}
