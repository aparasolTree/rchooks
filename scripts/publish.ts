import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { packages } from '../meta/pageages';
import { updatePackageJSON } from './update';

(async function main() {
    const { version } = await fs.readJSON('package.json');
    await updatePackageJSON();
    execSync('npm run build:rollup', { stdio: 'inherit' });
    let command = 'npm publish --access public';
    for (const { name } of packages) {
        const packageJSON = await fs.readJSON(
            path.join(__dirname, '../packages', name, 'package.json')
        );
        if (packageJSON.dependencies) {
            for (let [dep, w] of Object.entries(packageJSON.dependencies)) {
                if (/^@rchooks\//.test(dep)) {
                    w = version;
                }
                packageJSON.dependencies[dep] = w;
            }
        }
        await fs.writeJSON(
            path.join(__dirname, '../packages', name, 'dist', 'package.json'),
            packageJSON
        );
        execSync(command, { stdio: 'inherit', cwd: path.join('packages', name, 'dist') });
        console.log();
        console.log(`Published @rchooks/${name}`);
        console.log();
    }
})();
