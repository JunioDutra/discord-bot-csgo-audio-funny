export const isWeaponActive = (weapons, weapon) => {
    var keys = Object.keys(weapons);

    for (var i = 0; i < keys.length; i++) {
        if (weapons[keys[i]].name === weapon && weapons[keys[i]].state === 'active') {
            return true;
        }
    }

    return false;
}