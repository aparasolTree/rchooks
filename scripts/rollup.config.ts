import type { RollupOptions, OutputOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import Json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import { packages } from '../meta/pageages';

const configs: RollupOptions[] = [];

for (const { globals, name, external, iife } of packages) {
    const iifeGlobals = {
        '@rchooks/shared': 'RCHooks',
        '@rchooks/core': 'RCHooks',
        ...(globals || {}),
    };

    const iifeName = 'RCHooks';
    const functionName = ['index'];

    for (const fn of functionName) {
        const input =
            fn === 'index' ? `packages/${name}/index.ts` : `packages/${name}/${fn}/index.ts`;
        const output: OutputOptions[] = [
            {
                file: `packages/${name}/dist/${fn}.cjs.js`,
                format: 'cjs',
            },
            {
                file: `packages/${name}/dist/${fn}.esm.js`,
                format: 'esm',
            },
        ];

        if (iife !== false) {
            output.push(
                {
                    file: `packages/${name}/dist/${fn}.iife.js`,
                    format: 'iife',
                    name: iifeName,
                    extend: true,
                    globals: iifeGlobals,
                },
                {
                    file: `packages/${name}/dist/${fn}.iife.min.js`,
                    format: 'iife',
                    name: iifeName,
                    extend: true,
                    globals: iifeGlobals,
                    plugins: [
                        terser({
                            format: {
                                comments: false,
                            },
                        }),
                    ],
                }
            );
        }

        configs.push({
            input,
            output,
            plugins: [
                typescript({
                    tsconfigOverride: {
                        compilerOptions: {
                            declaration: false,
                        },
                    },
                }),
                Json(),
            ],
            external: ['@rchooks/shared', ...(external || [])],
        });

        configs.push({
            input,
            output: {
                file: `packages/${name}/dist/${fn}.d.ts`,
                format: 'es',
            },
            plugins: [dts()],
            external: ['@rchooks/shared', ...(external || [])],
        });
    }
}

export default configs;
