import { LSconfig } from '#liangshi'
import { GlacioCharacter, FusionCharacter, AeroCharacter, ElectroCharacter, SpectrpCharacter, HavocCharacter, HealCharacter, TeamHealCharacter, ShieldCharacter, CharacterParams } from './data/CharacterParams.js'
import { EnergyKey } from '../../resources/CalcBuff/EnergyKey.js'

function ParamsData(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let EnergyTeammate, ShieldDetermine, HealDetermine, HealTeamDetermine
  let SkillsHit = 1, SkillsDmg = 1, SkillsKill = 1, ElementGlacioTeam = 0, ElementFusionTeam = 0, ElementAeroTeam = 0, ElementElectroTeam = 0, ElementSpectrpTeam = 0, ElementHavocTeam = 0, SubjectedDmg = 1
  let Glacio_Chafe_Determine = false, Fusion_Burst_Determine = false, Aero_Erosion_Determine = false, Electro_Flare_Determine = false, Spectro_Frazzle_Determine = false, Havoc_Bane_Determine = false
    if (['暂时没有此类角色'].includes(CharacterName)) {
    SkillsHit = 0
    SkillsDmg = 0
    SkillsKill = 0
  }
  EnergyTeammate = EnergyKey[CharacterName][0] || 125
  ShieldDetermine = ShieldCharacter.includes(CharacterName)
  HealDetermine = HealCharacter.includes(CharacterName)
  HealTeamDetermine = TeamHealCharacter.includes(CharacterName)
  if (GlacioCharacter.includes(CharacterName)) ElementGlacioTeam = 1
  if (FusionCharacter.includes(CharacterName)) ElementFusionTeam = 1
  if (AeroCharacter.includes(CharacterName)) ElementAeroTeam = 1
  if (ElectroCharacter.includes(CharacterName)) ElementElectroTeam = 1
  if (SpectrpCharacter.includes(CharacterName)) ElementSpectrpTeam = 1
  if (HavocCharacter.includes(CharacterName)) ElementHavocTeam = 1
  if (["菲比", "夏空", "赞妮", "漂泊者·衍射"].includes(CharacterName)) Spectro_Frazzle_Determine = true
  if (["夏空", "卡提希娅", "漂泊者·气动"].includes(CharacterName)) Aero_Erosion_Determine = true
  if (["千咲"].includes(CharacterName)) Havoc_Bane_Determine = true
  let data = {
    "共鸣能量": 100, "队伍共鸣能量总和": EnergyTeammate, "受到伤害次数": SubjectedDmg,
    "队伍冷凝角色数": ElementGlacioTeam, "队伍热熔角色数": ElementFusionTeam, "队伍气动角色数": ElementAeroTeam,
    "队伍导电角色数": ElementElectroTeam, "队伍衍射角色数": ElementSpectrpTeam, "队伍湮灭角色数": ElementHavocTeam,
    "霜渐效应能力": Glacio_Chafe_Determine, "聚爆效应能力": Fusion_Burst_Determine, "风蚀效应能力": Aero_Erosion_Determine,
    "电磁效应能力": Electro_Flare_Determine, "光噪效应能力": Spectro_Frazzle_Determine, "虚湮效应能力": Havoc_Bane_Determine,
    "共鸣技能命中次数": SkillsHit, "共鸣技能造成伤害次数": SkillsDmg, "共鸣技能击败敌人数": SkillsKill,
    "护盾能力": ShieldDetermine, "治疗能力": HealDetermine, "队伍治疗能力": HealTeamDetermine
  }
  return Object.assign(data, CharacterParams[CharacterName])
}

export { ParamsData }
