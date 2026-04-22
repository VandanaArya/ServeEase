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

    // Fix the syntax errors created by my previous regex:
    // Some lines have `${API_BASE_URL}/api/menu') or ähnliches
    // So if there's a backtick at start but single quote at end:
    content = content.replace(/`(\$\{API_BASE_URL\}[^'`"]*)['"]/g, '`$1`');
    content = content.replace(/`(\$\{SOCKET_URL\}[^'`"]*)['"]/g, '`$1`');

    // There was also a problem in Menu.jsx:
    // } catch(err)...
    // "http://localhost:5000/api/menu/seed" with double quotes?
    content = content.replace(/`\$\{API_BASE_URL\}([^`]*)\)/g, (match) => {
        // Just make sure it's valid if it ends wrongly
        return match;
    });

    // Let's do a more robust fix
    // Any `${API_BASE_URL}... and ending with ' or " needs to end in `
    content = content.replace(/`\$\{API_BASE_URL\}[^`'"]*['"]/g, match => match.slice(0, -1) + '`');
    content = content.replace(/`\$\{SOCKET_URL\}[^`'"]*['"]/g, match => match.slice(0, -1) + '`');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${file}`);
}
