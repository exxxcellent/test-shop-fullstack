import { Prop } from '@shared/types';

export const transformPropValue = (prop: Prop) => {
    if (prop.key.startsWith('_count')) return;

    switch (typeof prop.value) {
        case 'string':
            const parsedInt = +prop.value;
            if (isFinite(parsedInt)) return +parsedInt;
            return prop.value.toString();
        case 'number':
            return +prop.value;
        case 'boolean':
            return !!prop.value;
        default:
            break;
    }
};
