import { Fn } from '@rchooks/shared';

export type Direction = 'r-html' | 'r-text' | 'r-show' | 'r-focus' | 'r-copy';
export interface DirectionBind<C = any> {
    value: C;
    oldValue: C;
    name: string;
}
export type DirectiveFn<D = any> = (el: Element, bind: DirectionBind<D>) => Fn | void;

export const directives: Partial<Record<Direction, DirectiveFn>> = {
    'r-html': (el: Element, bind: DirectionBind<string>) => {
        el.innerHTML = bind.value;
    },
    'r-text': (el: Element, bind: DirectionBind<string>) => {
        el.textContent = bind.value;
    },
    'r-show': (el: Element, bind: DirectionBind<boolean>) => {
        (el as HTMLElement).style.setProperty('display', bind.value ? 'block' : 'none');
    },
    'r-focus': (el: Element) => {
        (el as HTMLElement).focus();
    },
    'r-copy': (el: Element, bind: DirectionBind<string>) => {
        const clickHandler = async () => {
            if (navigator.clipboard && bind.value) {
                await navigator.clipboard.writeText(bind.value);
                alert('success');
            }
        };

        el.addEventListener('click', clickHandler);

        return () => {
            el.removeEventListener('click', clickHandler);
        };
    },
};
