import { deepCopy } from '.';

describe('deepCopy', () => {
    it('should be defined', () => {
        expect(deepCopy).toBeDefined();
    });

    it('should not be equal', () => {
        const obj = {
            name: 'xl',
            age: 19,
            like: ['javascript', 'css', 'html', 'react', 'vue', 'nextjs', 'react-native'],
            date: new Date(),
            map: new Map([[1, new Map()]]),
            set: new Set([{ a: 1, b: 2 }]),
            bool: true,
            reg: new RegExp('[a-z]+', 'gi'),
            r: {
                c: 123,
                d: {},
            },
        };

        const objCopy = deepCopy(obj);

        expect(objCopy.date).not.toBe(obj.date);
        expect(objCopy).not.toBe(obj);
        expect(objCopy.map).not.toBe(obj.map);
        expect(objCopy.map.get(1)).not.toBe(obj.map.get(1));
        expect(objCopy.set.keys().next().value).not.toBe(obj.set.keys().next().value);
        expect(objCopy.r.d).not.toBe(obj.r.d);
        expect(objCopy.like).not.toBe(obj.like);
        expect(objCopy.reg).not.toBe(obj.reg);
    });
});
