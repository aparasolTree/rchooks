import { execSync } from 'child_process';
import path from 'path';
import { packages } from '../meta/pageages';
import fs from 'fs-extra';

(async function main() {
    execSync('npm run build:rollup', { stdio: 'inherit' });
    let command = 'npm publish --access public';
    for (const { name } of packages) {
        const packageJSON = await fs.readJSON(
            path.join(__dirname, '../packages', name!, 'package.json')
        );
        await fs.writeJSON(
            path.join(__dirname, '../packages', name!, 'dist', 'package.json'),
            packageJSON
        );
        execSync(command, { stdio: 'inherit', cwd: path.join('packages', name!, 'dist') });
        console.log(`Published @r-hook/${name}`);
    }
})();
