import { Prop } from '@shared/types';
import { transformPropValue } from './transform-prop-value';

export const prepareProps = (props: Prop[]) =>
    props.reduce(
        (acc, obj) => ({ ...acc, [obj.key]: transformPropValue(obj) }),
        {},
    );
