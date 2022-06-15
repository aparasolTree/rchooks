module.exports = {
    preset: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    env: {
        test: {
            plugins: ['dynamic-import-node'],
        },
        production: {
            plugins: ['@babel/plugin-syntax-dunamic-import'],
        },
    },
};
