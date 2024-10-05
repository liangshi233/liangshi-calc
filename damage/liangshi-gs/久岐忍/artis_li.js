export default function ({ attr, artis, cons, weapon, rule, def }) {
  let heal = 0

  if (artis.is('heal', '5')) heal = 100

  let title = '久岐忍-通用'

  if (attr.mastery > 720 || artis.is('mastery', '3,4,5')) {
    title = '久岐忍-超绽放'
  }

  if (artis.is('hp', '3,4') && artis.is('heal', '5')) {
    title = '久岐忍-纯奶'
  }

  if (artis.is('hp', '3,4,5')) {
    title = '久岐忍-纯生'
  }

  return rule(title, { hp: 100, mastery: 100, heal })
}
