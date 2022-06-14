import fs from 'fs-extra';
import path from 'path';
import { packages } from 'meta/pageages';

const packages_dir = path.resolve(__dirname, '../packages');

updatePackageJSON();

async function updatePackageJSON() {
    const { version, author: xl_author } = await fs.readJSON('package.json');

    for (const { name, description, author } of packages) {
        const package_dir = path.join(packages_dir, name);
        const packageJSON_path = path.join(package_dir, 'package.json');
        const packageJSON = await fs.readJSON(packageJSON_path);

        packageJSON.version = version;
        packageJSON.description = description || packageJSON.description;
        packageJSON.author = author || xl_author;
        packageJSON.bugs = {
            url: 'https://github.com/aparasolTree/rchooks/issues',
        };
        packageJSON.repository = {
            type: 'git',
            url: 'git+https://github.com/aparasolTree/rchooks.git',
            directory: `packages/${name}`,
        };
        packageJSON.main = './index.cjs.js';
        packageJSON.module = './index.esm.js';
        packageJSON.unpkg = './index.iife.min.js';
        packageJSON.types = './index.d.ts';
        packageJSON.exports = {
            '.': {
                types: './index.d.ts',
                import: './index.esm.js',
                require: './index.cjs.js',
            },
            './*': './*',
            ...packageJSON.exports,
        };
        if (packageJSON.dependencies) {
            for (let [dep, w] of Object.entries(packageJSON.dependencies)) {
                if (/^@rchooks\//.test(dep)) {
                    w = (w as string).replace('*', version);
                }
                packageJSON.dependencies[dep] = w;
            }
        }

        await fs.writeJSON(packageJSON_path, packageJSON, { spaces: 4 });
    }
}
