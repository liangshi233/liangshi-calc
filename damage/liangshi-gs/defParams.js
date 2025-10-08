import { LSconfig } from '#liangshi'
import { AnemoCharacter, GeoCharacter, ElectroCharacter, HealCharacter, FontaineCharacter, HydroCharacter, TeamHealCharacter, NatlanCharacter, ShieldCharacter, PyroCharacter, CryoCharacter, TruceHpCharacter, LiyueCharacter, DendroCharacter, CharacterParams, MoonsignCharacter } from './data/CharacterParams.js'
import { EnergyKey } from '../../resources/CalcBuff/EnergyKey.js'

function ParamsData(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let EchoesProbability = cfg.EchoesProbability || 1
  let BLPlusPath, BLPctPath, FreezeDetermine, BurningDetermine, EnergyTeammate, ShieldDetermine, BondOfLifeDetermine, PrimordialDetermine, Nightsoul, HealDetermine, HealTeamDetermine, TruceChangeHp
  let LiyueTeammate = 0, FontaineTeammate = 0, NatlanTeammate = 0, SkillsHit = 1, SkillsDmg = 1, SkillsKill = 1, ElementWindTeam = 0, ElementRockTeam = 0, ElementMineTeam = 0, ElementFireTeam = 0, ElementWaterTeam = 0, ElementIceTeam = 0, ElementGrassTeam = 0, SubjectedDmg = 1, ShieldTime = 0, Moonsign = 0, MoonsignDetermine = false
  if (['玛拉妮', '克洛琳德', '嘉明', '莱欧斯利', '宵宫', '丝柯克', '伊法', '旅行者/null'].includes(CharacterName)) {
    SkillsHit = 0
    SkillsDmg = 0
    SkillsKill = 0
  }
  if (true || ['阿蕾奇诺', '克洛琳德', '希格雯'].includes(CharacterName)) {
    BLPlusPath = cfg.bndOfLifePlus || 0
    BLPctPath = cfg.bndOfLifePct || 1
  }
  EnergyTeammate = EnergyKey[CharacterName]?.[0] ?? 60
  BondOfLifeDetermine = ['阿蕾奇诺', '克洛琳德', '希格雯'].includes(CharacterName)
  FreezeDetermine = ['甘雨', '神里绫华', '菲米尼', '爱可菲', '丝柯克'].includes(CharacterName)
  BurningDetermine = ['艾梅莉埃', '基尼奇'].includes(CharacterName)
  ShieldDetermine = ShieldCharacter.includes(CharacterName)
  HealDetermine = HealCharacter.includes(CharacterName)
  HealTeamDetermine = TeamHealCharacter.includes(CharacterName)
  TruceChangeHp = TruceHpCharacter.includes(CharacterName)
  PrimordialDetermine = ['芙宁娜'].includes(CharacterName)
  Nightsoul = CharacterName === '旅行者/pyro' || NatlanCharacter.includes(CharacterName)
  if (LiyueCharacter.includes(CharacterName)) LiyueTeammate = 1
  if (FontaineCharacter.includes(CharacterName)) FontaineTeammate = 1
  if (NatlanCharacter.includes(CharacterName)) NatlanTeammate = 1
  if (AnemoCharacter.includes(CharacterName)) ElementWindTeam = 1
  if (GeoCharacter.includes(CharacterName)) ElementRockTeam = 1
  if (ElectroCharacter.includes(CharacterName)) ElementMineTeam = 1
  if (DendroCharacter.includes(CharacterName)) ElementGrassTeam = 1
  if (HydroCharacter.includes(CharacterName)) ElementWaterTeam = 1
  if (PyroCharacter.includes(CharacterName)) ElementFireTeam = 1
  if (CryoCharacter.includes(CharacterName)) ElementIceTeam = 1
  if (ShieldCharacter.includes(CharacterName)) SubjectedDmg = 0
  if (ShieldCharacter.includes(CharacterName)) ShieldTime = 5
  if (MoonsignCharacter.includes(CharacterName)) {
    Moonsign = 1
    MoonsignDetermine = true
  }
  if (['艾梅莉埃', '夏洛蒂', '那维莱特', '菲米尼', '林尼', '旅行者/hydro'].includes(CharacterName)) PrimordialDetermine = "pneuma"
  if (['爱可菲', '希格雯', '克洛琳德', '夏沃蕾', '娜维娅', '莱欧斯利', '琳妮特'].includes(CharacterName)) PrimordialDetermine = "ousia"
  let data = {
    EchoesProbability: EchoesProbability,
    blPlus: BLPlusPath, blPct: BLPctPath, BondOfLifeDetermine: BondOfLifeDetermine, MoonsignDetermine: MoonsignDetermine,
    SkillsHit: SkillsHit, SkillsDmg: SkillsDmg, SkillsKill: SkillsKill,
    ShieldDetermine: ShieldDetermine, HealDetermine: HealDetermine, PrimordialDetermine: PrimordialDetermine, Nightsoul: Nightsoul, HealTeamDetermine: HealTeamDetermine, TruceChangeHp: TruceChangeHp,
    FreezeDetermine: FreezeDetermine, BurningDetermine: BurningDetermine,
    ElementSame: 1, ElementWindTeam: ElementWindTeam, ElementRockTeam: ElementRockTeam, ElementMineTeam: ElementMineTeam, ElementGrassTeam: ElementGrassTeam, ElementWaterTeam: ElementWaterTeam, ElementFireTeam: ElementFireTeam, ElementIceTeam: ElementIceTeam,
    EnergyTeammate: EnergyTeammate, SubjectedDmg: SubjectedDmg, ShieldTime: ShieldTime, Moonsign: Moonsign,
    LiyueTeammate: LiyueTeammate, FontaineTeammate: FontaineTeammate, NatlanTeammate: NatlanTeammate
  }
  return Object.assign(data, CharacterParams[CharacterName])
}

export { ParamsData }
