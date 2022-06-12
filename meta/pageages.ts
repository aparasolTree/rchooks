import { PackageMetaInfo } from './types';

export const packages: PackageMetaInfo[] = [
    {
        name: 'core',
        display: 'RCHook',
        description: 'commection of react hook',
        globals: {
            react: 'React',
        },
    },
    {
        name: 'shared',
        display: 'Shared utils',
    },
];
