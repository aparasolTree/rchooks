import { Fn } from '@rchooks/shared';

export type Direction = 'r-html' | 'r-text' | 'r-show';
export interface DirectionBind<C = any> {
    content: C;
}

export const directives: Partial<Record<Direction, Fn>> = {
    'r-html': (el: Element, bind: DirectionBind<string>) => {
        el.innerHTML = bind.content;
    },
    'r-text': (el: Element, bind: DirectionBind<string>) => {
        el.textContent = bind.content;
    },
    'r-show': (el: Element, bind: DirectionBind<boolean>) => {
        (el as HTMLElement).style.setProperty('display', bind.content ? 'block' : 'none');
    },
};
