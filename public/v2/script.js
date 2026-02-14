const banners = {
    'threatscope': `
  _______ _                     _    _____
 |__   __| |                   | |  / ____|
    | |  | |__  _ __ ___  __ _ | |_| (___   ___ ___  _ __   ___
    | |  | '_ \\| '__/ _ \\/ _' || __|\\___ \\ / __/ _ \\| '_ \\ / _ \\
    | |  | | | | | |  __/ (_| || |_ ____) | (_| (_) | |_) |  __/
    |_|  |_| |_|_|  \\___|\\__,_| \\__|_____/ \\___\\___/| .__/ \\___|
                                                    | |
                                                    |_|
    Threat Scope: Focused Network & Vulnerability Scanner`,
    'portal': `
    ____             _        _ 
   |  _ \ ___  _ __| |_ __ _| |
   | |_) / _ \| '__| __/ _' | |
   |  __/ (_) | |  | || (_| | |
   |_|   \___/|_|   \__\__,_|_|
    Secure P2P Channel: Data Transfer Assurance`,
    'dispatch': `
    ____  _     _patch 
   |  _ \(_)___| |__  
   | | | | / __| '_ \ 
   | |_| | \__ \ | | |
   |____/|_|___/_| |_|
    Connectivity Engine: Contact Intelligence`,
    'lede': `
    _      _          
   | | ___| | ___  ___ 
   | |/ _ \ |/ _ \/ __|
   | |  __/ |  __/\__ \\
   |_|\___|_|\___||___/
    Strategic Intelligence Analysis Engine`
};

const toolMenus = {
    'threatscope': [
        { id: 'netscan', label: '1. Network Scan (netscan)', prompt: 'Enter target IP or hostname: ' },
        { id: 'vulnscan', label: '2. Web Vulnerability Scan (vulnscan)', prompt: 'Enter target URL (e.g., http://example.com): ' },
        { id: 'depscan', label: '3. Dependency Scan (dep_scan)', prompt: 'Enter path to project directory: ' },
        { id: 'secretscan', label: '4. Secret Scan (secret_scan)', prompt: 'Enter path to scan for secrets: ' }
    ],
    'portal': [
        { id: 'handshake', label: '1. Initialize Handshake', prompt: 'Enter peer ID: ' },
        { id: 'transfer', label: '2. Secure File Transfer', prompt: 'Enter source file path: ' },
        { id: 'status', label: '3. Check Link Integrity', prompt: 'Enter link ID: ' }
    ],
    'dispatch': [
        { id: 'harvest', label: '1. Harvest Contacts', prompt: 'Enter target domain: ' },
        { id: 'campaign', label: '2. Deploy Connection Campaign', prompt: 'Enter campaign name: ' },
        { id: 'integrity', label: '3. Verify Lead Integrity', prompt: 'Enter lead ID: ' }
    ],
    'lede': [
        { id: 'analyze', label: '1. Analyze Press Release', prompt: 'Enter PR draft path or text: ' },
        { id: 'strategy', label: '2. Generate Strategic Roadmap', prompt: 'Enter project objective: ' },
        { id: 'crisis', label: '3. Crisis Response Simulation', prompt: 'Enter incident summary: ' }
    ]
};

const getLogs = (opId, targetValue) => {
    const templates = {
        'netscan': [
            { text: `[*] Initializing network scan on ${targetValue}...`, type: 'log-entry' },
            { text: '[-] Mapping open ports (1-1024)...', type: 'log-entry' },
            { text: '[+] Open Port Found: 80/tcp (http)', type: 'log-success' },
            { text: '[+] Open Port Found: 443/tcp (https)', type: 'log-success' },
            { text: '[-] Fingerprinting services...', type: 'log-entry' },
            { text: `[!] Target: ${targetValue} - nginx/1.14.0 (Ubuntu) detected.`, type: 'log-warning' },
            { text: '[*] Scan Complete. Executive report generated.', type: 'log-cmd' }
        ],
        'vulnscan': [
            { text: `[*] Initiating web vulnerability scan on ${targetValue}...`, type: 'log-entry' },
            { text: '[-] Checking for SQL Injection...', type: 'log-entry' },
            { text: '[-] Checking for XSS vulnerabilities...', type: 'log-entry' },
            { text: `[!] Findings for ${targetValue}: Insecure Header: X-Frame-Options missing`, type: 'log-warning' },
            { text: '[-] Directory traversal check complete.', type: 'log-entry' },
            { text: '[*] Analysis complete. 2 Findings identified.', type: 'log-cmd' }
        ],
        'handshake': [
            { text: `[*] Initializing Portal peer handshake with ${targetValue}...`, type: 'log-entry' },
            { text: '[-] Generating ephemeral RSA keys...', type: 'log-entry' },
            { text: '[-] Exchanging digital signatures...', type: 'log-entry' },
            { text: `[+] Peer Identity Verified: [SENTINEL-${targetValue}]`, type: 'log-success' },
            { text: '[*] Secure tunnel established.', type: 'log-cmd' }
        ],
        'harvest': [
            { text: `[*] Deploying Dispatch connection crawler to ${targetValue}...`, type: 'log-entry' },
            { text: '[-] Parsing domain metadata...', type: 'log-entry' },
            { text: '[+] Lead Identified: CRO @ ' + targetValue, type: 'log-success' },
            { text: '[+] Lead Identified: DPO @ ' + targetValue, type: 'log-success' },
            { text: '[*] 12 strategic contacts added to dispatch pool.', type: 'log-cmd' }
        ]
    };

    return templates[opId] || [
        { text: `[*] Initiating ${opId} protocol for ${targetValue}...`, type: 'log-entry' },
        { text: '[-] Scanning current workspace buffers...', type: 'log-entry' },
        { text: '[*] Process completed successfully.', type: 'log-cmd' }
    ];
};

let currentToolId = '';
let isTyping = false;

function launchTool(toolId) {
    if (isTyping) return;

    currentToolId = toolId;
    const body = document.getElementById('terminal-body');
    const modal = document.getElementById('report-modal');

    if (!body || !modal) return;

    body.innerHTML = '';
    modal.style.display = 'block';

    const banner = document.createElement('pre');
    banner.className = 'ascii-banner';
    banner.textContent = banners[toolId] || `Launching ${toolId}...`;
    body.appendChild(banner);

    isTyping = true;
    typeText(body, `\nWelcome to ${toolId.toUpperCase()}. Digital Risk & Compliance operative active.\n\n`, () => {
        isTyping = false;
        showMenu(toolId);
    });
}

function showMenu(toolId) {
    const body = document.getElementById('terminal-body');
    const menuContainer = document.createElement('div');
    menuContainer.className = 'terminal-menu';

    const title = document.createElement('div');
    title.textContent = '--- Choose an Operation ---';
    title.style.marginBottom = '10px';
    menuContainer.appendChild(title);

    const menuItems = toolMenus[toolId] || [];
    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'terminal-menu-item-btn';
        btn.textContent = item.label;
        btn.onclick = () => promptForInput(item);
        menuContainer.appendChild(btn);
    });

    body.appendChild(menuContainer);
    body.scrollTop = body.scrollHeight;
}

function promptForInput(menuItem) {
    const body = document.getElementById('terminal-body');
    const menu = body.querySelector('.terminal-menu');
    if (menu) menu.remove();

    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-input-line';
    promptLine.innerHTML = `<span>${menuItem.prompt}</span>`;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'terminal-input';
    input.autofocus = true;

    promptLine.appendChild(input);
    body.appendChild(promptLine);
    input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const value = input.value.trim() || 'target.local';
            input.disabled = true;
            runOperation(menuItem.id, value);
        }
    });
}

function runOperation(opId, targetValue) {
    const body = document.getElementById('terminal-body');

    const logs = getLogs(opId, targetValue);

    let logIndex = 0;
    const logInterval = setInterval(() => {
        if (logIndex < logs.length) {
            const entry = logs[logIndex];
            const div = document.createElement('div');
            div.className = entry.type;
            div.textContent = entry.text;
            body.appendChild(div);
            body.scrollTop = body.scrollHeight;
            logIndex++;
        } else {
            clearInterval(logInterval);
            const fin = document.createElement('div');
            fin.className = 'log-cmd';
            fin.style.marginTop = '20px';
            fin.textContent = 'Operation Finalized. Press close to exit.';
            body.appendChild(fin);
            body.scrollTop = body.scrollHeight;
        }
    }, 400);
}

function typeText(element, text, callback) {
    let i = 0;
    const typingSpan = document.createElement('span');
    element.appendChild(typingSpan);

    const interval = setInterval(() => {
        if (i < text.length) {
            typingSpan.textContent += text.charAt(i);
            i++;
            element.scrollTop = element.scrollHeight;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 15);
}

function closeModal() {
    document.getElementById('report-modal').style.display = 'none';
    isTyping = false;
}

window.launchTool = launchTool;
window.closeModal = closeModal;

window.onclick = function (event) {
    const modal = document.getElementById('report-modal');
    if (event.target == modal) {
        closeModal();
    }
}

document.addEventListener('mousemove', (e) => {
    const bg = document.querySelector('.background-animation');
    if (!bg) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(51, 116, 24, 0.15) 0%, transparent 80%)`;
});
