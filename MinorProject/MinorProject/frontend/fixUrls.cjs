const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const filesToUpdate = [
    'pages/AdminDashboard.jsx',
    'pages/Auth.jsx',
    'pages/Cart.jsx',
    'pages/ChefDashboard.jsx',
    'pages/CustomerProfile.jsx',
    'pages/Menu.jsx'
];

for (const file of filesToUpdate) {
    const fullPath = path.join(srcDir, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    let modified = false;

    // Check if we need API_BASE_URL or SOCKET_URL
    const needsApi = content.includes('http://localhost:5000/api');
    const needsSocket = content.includes("io('http://localhost:5000')") || content.includes('io("http://localhost:5000")');

    if (needsApi || needsSocket || content.includes('http://localhost:5000')) {
        // Add import
        if (!content.includes('import { API_BASE_URL')) {
            const importStmt = "import { API_BASE_URL" + (needsSocket ? ", SOCKET_URL" : "") + " } from '../config';\n";
            
            // Insert after React import or at start
            const reactImportMatch = content.match(/import .*from 'react';?\n/);
            if (reactImportMatch) {
                content = content.replace(reactImportMatch[0], reactImportMatch[0] + importStmt);
            } else {
                content = importStmt + content;
            }
        }

        // Replace io('http://localhost:5000') with io(SOCKET_URL)
        content = content.replace(/io\('http:\/\/localhost:5000'\)/g, 'io(SOCKET_URL)');
        content = content.replace(/io\("http:\/\/localhost:5000"\)/g, 'io(SOCKET_URL)');

        // Replace API strings in fetch or similar
        content = content.replace(/'http:\/\/localhost:5000\/api/g, '`${API_BASE_URL}/api');
        // that creates unclosed backtick if it was a single quote string.
        // Wait, safer replacement:
        
        // for `http://localhost...`
        content = content.replace(/`http:\/\/localhost:5000/g, '`${API_BASE_URL}');
        
        // for 'http://localhost.../some' -> `${API_BASE_URL}.../some`
        content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${API_BASE_URL}$1`');
        
        content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${API_BASE_URL}$1`');

        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
