import type { RollupOptions, OutputOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { packages } from '../meta/pageages';

const configs: RollupOptions[] = [];

for (const { globals, name, external, iife } of packages) {
    const iifeGlobals = {
        '@rc-hook/shared': 'RCHook',
        '@rc-hook/core': 'RCHook',
        ...(globals || {}),
    };

    const iifeName = 'RCHook';
    const functionName = ['index'];

    for (const fn of functionName) {
        const input =
            fn === 'index' ? `packages/${name}/index.ts` : `packages/${name}/${fn}/idnex.ts`;
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
            ],
            external: ['@rc-hook/shared', ...(external || [])],
        });

        configs.push({
            input,
            output: {
                file: `packages/${name}/dist/${fn}.d.ts`,
                format: 'es',
            },
            plugins: [dts()],
            external: ['@rc-hook/shared', ...(external || [])],
        });
    }
}

export default configs;
