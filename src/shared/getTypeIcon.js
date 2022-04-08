import bug from '../images/type_icons/bug.svg'
import dark from '../images/type_icons/dark.svg';
import dragon from '../images/type_icons/dragon.svg';
import electric from '../images/type_icons/electric.svg';
import fairy from '../images/type_icons/fairy.svg';
import fighting from '../images/type_icons/fighting.svg';
import fire from '../images/type_icons/fire.svg';
import flying from '../images/type_icons/flying.svg';
import ghost from '../images/type_icons/ghost.svg';
import grass from '../images/type_icons/grass.svg';
import ground from '../images/type_icons/ground.svg';
import ice from '../images/type_icons/ice.svg';
import normal from '../images/type_icons/normal.svg';
import poison from '../images/type_icons/poison.svg';
import psychic from '../images/type_icons/psychic.svg';
import rock from '../images/type_icons/rock.svg';
import steel from '../images/type_icons/steel.svg';
import water from '../images/type_icons/water.svg';

export default function getTypeIcon(type) {
    const types = {
        bug,
        dark,
        dragon,
        electric,
        fairy,
        fighting,
        fire,
        flying,
        ghost,
        grass,
        ground,
        ice,
        normal,
        poison,
        psychic,
        rock,
        steel,
        water,
    };

    return types[type];
}
