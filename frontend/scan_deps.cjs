
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const srcDir = path.join(__dirname, 'src');
const files = getAllFiles(srcDir);
const imports = new Set();

const importRegex = /import\s+(?:[\w\s{},*]+from\s+)?['"]([^'"]+)['"]/g;
const dynamicImportRegex = /import\(['"]([^'"]+)['"]\)/g;
const requireRegex = /require\(['"]([^'"]+)['"]\)/g;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        imports.add(match[1]);
    }
    while ((match = dynamicImportRegex.exec(content)) !== null) {
        imports.add(match[1]);
    }
    while ((match = requireRegex.exec(content)) !== null) {
        imports.add(match[1]);
    }
});

const packageJson = require('./package.json');
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

const missing = [];
const builtins = ['react', 'react-dom', 'fs', 'path', 'os', 'util', 'events', 'http', 'https', 'url', 'querystring', 'zlib', 'crypto', 'stream', 'buffer', 'child_process', 'cluster', 'dgram', 'dns', 'net', 'readline', 'repl', 'tls', 'tty', 'v8', 'vm', 'module', 'process', 'assert', 'console', 'constants', 'domain', 'punycode', 'string_decoder', 'sys', 'timers', 'tty', 'url', 'util', 'v8', 'vm', 'zlib'];

imports.forEach(imp => {
    if (imp.startsWith('.') || imp.startsWith('/')) return; // Local import

    const pkgName = imp.startsWith('@') ? imp.split('/').slice(0, 2).join('/') : imp.split('/')[0];

    if (builtins.includes(pkgName)) return;

    if (!dependencies[pkgName]) {
        missing.push(pkgName);
    }
});

if (missing.length > 0) {
    console.log('Missing dependencies found in code but not in package.json:');
    missing.forEach(m => console.log(m));
} else {
    console.log('No missing dependencies found in package.json.');
}

// Check if installed in node_modules
console.log('\nChecking if dependencies are actually installed in node_modules...');
const missingInNodeModules = [];
Object.keys(dependencies).forEach(dep => {
    try {
        require.resolve(dep, { paths: [process.cwd()] });
    } catch (e) {
        // Try to check if folder exists as fallback for some packages
        if (!fs.existsSync(path.join('node_modules', dep))) {
            missingInNodeModules.push(dep);
        }
    }
});

if (missingInNodeModules.length > 0) {
    console.log('Dependencies listed in package.json but missing from node_modules:');
    missingInNodeModules.forEach(m => console.log(m));
} else {
    console.log('All listed dependencies appear to be installed.');
}
