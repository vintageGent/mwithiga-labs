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
        { id: 'netscan', label: '1. Network Scan (netscan)' },
        { id: 'vulnscan', label: '2. Web Vulnerability Scan (vulnscan)' },
        { id: 'depscan', label: '3. Dependency Scan (dep_scan)' },
        { id: 'secretscan', label: '4. Secret Scan (secret_scan)' }
    ],
    'portal': [
        { id: 'handshake', label: '1. Initialize Handshake' },
        { id: 'transfer', label: '2. Secure File Transfer' },
        { id: 'status', label: '3. Check Link Integrity' }
    ],
    'dispatch': [
        { id: 'harvest', label: '1. Harvest Contacts' },
        { id: 'campaign', label: '2. Deploy Connection Campaign' },
        { id: 'integrity', label: '3. Verify Lead Integrity' }
    ],
    'lede': [
        { id: 'analyze', label: '1. Analyze Press Release' },
        { id: 'strategy', label: '2. Generate Strategic Roadmap' },
        { id: 'crisis', label: '3. Crisis Response Simulation' }
    ]
};

const scanLogs = {
    'netscan': [
        { text: '[*] Starting network scan on target...', type: 'log-entry' },
        { text: '[-] Mapping open ports (1-1024)...', type: 'log-entry' },
        { text: '[+] Open Port Found: 80/tcp (http)', type: 'log-success' },
        { text: '[+] Open Port Found: 443/tcp (https)', type: 'log-success' },
        { text: '[-] Fingerprinting services...', type: 'log-entry' },
        { text: '[!] Service: nginx/1.14.0 (Ubuntu)', type: 'log-warning' },
        { text: '[*] Scan Complete. Executive report generated.', type: 'log-cmd' }
    ],
    'vulnscan': [
        { text: '[*] Initiating web vulnerability scan...', type: 'log-entry' },
        { text: '[-] Checking for SQL Injection...', type: 'log-entry' },
        { text: '[-] Checking for XSS vulnerabilities...', type: 'log-entry' },
        { text: '[!] Insecure Header: X-Frame-Options missing', type: 'log-warning' },
        { text: '[-] Directory traversal check complete.', type: 'log-entry' },
        { text: '[*] Analysis complete. 2 Findings identified.', type: 'log-cmd' }
    ],
    'handshake': [
        { text: '[*] Initializing Portal peer handshake...', type: 'log-entry' },
        { text: '[-] Generating ephemeral RSA keys...', type: 'log-entry' },
        { text: '[-] Exchanging digital signatures...', type: 'log-entry' },
        { text: '[+] Peer Identity Verified: [SENTINEL-A1]', type: 'log-success' },
        { text: '[*] Secure tunnel established.', type: 'log-cmd' }
    ],
    'harvest': [
        { text: '[*] Deploying Dispatch connection crawler...', type: 'log-entry' },
        { text: '[-] Parsing target domain metadata...', type: 'log-entry' },
        { text: '[+] Lead Identified: Chief Risk Officer (Verified)', type: 'log-success' },
        { text: '[+] Lead Identified: Data Protection Officer', type: 'log-success' },
        { text: '[*] 12 strategic contacts added to dispatch pool.', type: 'log-cmd' }
    ]
};

let currentToolId = '';

function launchTool(toolId) {
    currentToolId = toolId;
    const body = document.getElementById('terminal-body');
    body.innerHTML = ''; // Clear terminal

    // Display Banner
    const banner = document.createElement('div');
    banner.className = 'ascii-banner';
    banner.textContent = banners[toolId] || `Launching ${toolId}...`;
    body.appendChild(banner);

    typeText(body, `\nWelcome to ${toolId.toUpperCase()}. Digital Risk & Compliance operative active.\n\n`, () => {
        showMenu(toolId);
    });

    document.getElementById('report-modal').style.display = 'block';
}

function showMenu(toolId) {
    const body = document.getElementById('terminal-body');
    const menuContainer = document.createElement('div');
    menuContainer.innerHTML = '--- Choose an Operation ---\n';

    const menuItems = toolMenus[toolId] || [];
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'terminal-menu-item';
        div.textContent = item.label;
        div.onclick = () => runOperation(item.id);
        menuContainer.appendChild(div);
    });

    body.appendChild(menuContainer);
}

function runOperation(opId) {
    const body = document.getElementById('terminal-body');
    body.innerHTML += `\n> Selected option: ${opId}\n`;

    const logs = scanLogs[opId] || [
        { text: `[*] Initiating ${opId} protocol...`, type: 'log-entry' },
        { text: '[-] Scanning current workspace buffers...', type: 'log-entry' },
        { text: '[*] Process completed successfully.', type: 'log-cmd' }
    ];

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
            body.innerHTML += `\n<div class="log-cmd">Operation Finalized. Press 'X' to close or click another tool.</div>`;
        }
    }, 400);
}

function typeText(element, text, callback, speed = 20) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

function closeModal() {
    document.getElementById('report-modal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('report-modal');
    if (event.target == modal) {
        closeModal();
    }
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tool = urlParams.get('tool');
    if (tool) {
        launchTool(tool);
    }
}

// Subtle background tracking for glow effect
document.addEventListener('mousemove', (e) => {
    const bg = document.querySelector('.background-animation');
    if (!bg) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(51, 116, 24, 0.15) 0%, transparent 80%)`;
});
