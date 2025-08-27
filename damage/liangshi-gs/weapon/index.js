import { WeaponTeamSword } from './sword/TeamCalc.js'
import { WeaponTeamClaymore } from './claymore/TeamCalc.js'
import { WeaponTeamPolearm } from './polearm/TeamCalc.js'
import { WeaponTeamBow } from './bow/TeamCalc.js'
import { WeaponTeamCatalyst } from './catalyst/TeamCalc.js'

function WeaponTeam(TeamData, CharacterName, Default, CharacterNameCN) {
    let WeaponTeam = {
        ...WeaponTeamSword,
        ...WeaponTeamClaymore,
        ...WeaponTeamPolearm,
        ...WeaponTeamBow,
        ...WeaponTeamCatalyst
    }
    let NewWeaponTeam = []
    for (const key in WeaponTeam) {
        if (WeaponTeam[key] === false) continue
        if (typeof WeaponTeam[key] !== "object") continue
        const weaponEntry = { ...WeaponTeam[key] }
        if (typeof weaponEntry.check === "function") {
            const old = weaponEntry.check
            weaponEntry.check = (args) => old(args) && args.params[CharacterName] === true && (!TeamData?.[args.uid] ? Default : TeamData[args.uid].base.weapon.name) === key
        }
        NewWeaponTeam.push(weaponEntry)
    }
    let TeamWeapon = NewWeaponTeam.map(item => {
        if (item.title && typeof item.title === "string") {
            return {
                ...item,
                title: item.title.replace(/队友武器/g, `${CharacterNameCN}武器`)
            }
        }
        return item
    })
    return TeamWeapon
}


export { WeaponTeam, WeaponTeamSword, WeaponTeamCatalyst, WeaponTeamPolearm, WeaponTeamBow, WeaponTeamClaymore }