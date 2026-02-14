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

const intelligenceData = {
    'netscan': {
        title: 'Network Reconnaissance Report',
        risk: 'MEDIUM',
        summary: 'Target network perimeter analyzed. Multiple services identified with legacy versioning.',
        findings: [
            'Port 80/tcp: nginx/1.14.0 - Vulnerable to HTTP Request Smuggling.',
            'Port 443/tcp: OpenSSL 1.1.1 - End of Life support reached.',
            'ICMP Echo: Target responds to pings, indicating permissive firewall rules.'
        ],
        compliance: 'DPA Section 31: Failure to implement technical measures against unauthorized access.',
        evidence: 'Nmap 7.80 scan performed. NSE script results: ssl-enum-ciphers [Weak Ciphers Detected].'
    },
    'vulnscan': {
        title: 'Web Vulnerability Audit',
        risk: 'HIGH',
        summary: 'Critical security headers and server-side configurations missing or misconfigured.',
        findings: [
            'Missing X-Frame-Options: Target is susceptible to Clickjacking attacks.',
            'SQL Injection: Potential entry point detected on /api/v1/search endpoint.',
            'Insecure Cookies: Session cookies missing "HttpOnly" and "Secure" flags.'
        ],
        compliance: 'DPA Section 25: Data Protection by Design and Default (Failed).',
        evidence: 'X-Frame-Options header check: FAILED\nSQLi Polyglot Test: ERROR detected in Boolean-based response.'
    },
    'handshake': {
        title: 'Portal Integrity Assurance',
        risk: 'LOW',
        summary: 'Peer-to-Peer encrypted tunnel established. Post-quantum signature verification successful.',
        findings: [
            'Peer Verified: Multi-factor key exchange confirmed.',
            'Encryption: AES-256-GCM utilized for payload.',
            'Latency: <15ms - High performance link maintained.'
        ],
        compliance: 'DPA Section 41: Implementation of appropriate technical and organizational measures for secure data transfer.',
        evidence: 'RSA-4096 ephemeral key generated.\nTunnel Status: STABLE\nPeer ID: SENTINEL-ALPHA-ONE'
    },
    'harvest': {
        title: 'Contact Intelligence Summary',
        risk: 'LOW',
        summary: 'Strategic points of contact captured across target domain buffers.',
        findings: [
            'Data Protection Officer (DPO) identified via public registry matching.',
            'IT Security Manager contact harvested from LinkedIn API shard.',
            '12 high-authority leads moved to Active Connection Pool.'
        ],
        compliance: 'DPA Section 29: Lawfulness of processing (Public Interest/Legitimate Interest baseline established).',
        evidence: 'Source: LinkedIn Shards + Website Metadata Crawler.\nTotal Leads: 12\nConfidence Score: 94%'
    }
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
            { text: '[*] Scan Complete. Intelligence report finalized.', type: 'log-cmd' }
        ],
        'vulnscan': [
            { text: `[*] Initiating web vulnerability scan on ${targetValue}...`, type: 'log-entry' },
            { text: '[-] Checking for SQL Injection...', type: 'log-entry' },
            { text: '[-] Checking for XSS vulnerabilities...', type: 'log-entry' },
            { text: `[!] Findings for ${targetValue}: Insecure Header: X-Frame-Options missing`, type: 'log-warning' },
            { text: '[-] Directory traversal check complete.', type: 'log-entry' },
            { text: '[*] Analysis complete. Critical findings identified.', type: 'log-cmd' }
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
            { text: '[*] Strategic contacts added to dispatch pool.', type: 'log-cmd' }
        ]
    };

    return templates[opId] || [
        { text: `[*] Initiating ${opId} protocol for ${targetValue}...`, type: 'log-entry' },
        { text: '[-] Scanning current workspace buffers...', type: 'log-entry' },
        { text: '[*] Process completed successfully.', type: 'log-cmd' }
    ];
};

let isTyping = false;

function launchTool(toolId) {
    if (isTyping) return;

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
    title.style.margin = '10px 0';
    menuContainer.appendChild(title);

    const menuItems = toolMenus[toolId] || [];
    menuItems.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'terminal-menu-item-btn';
        btn.textContent = item.label;
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            promptForInput(item);
        };
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
    input.autocomplete = 'off';

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

    promptLine.onclick = () => input.focus();
}

function runOperation(opId, targetValue) {
    const body = document.getElementById('terminal-body');

    const selectionLog = document.createElement('div');
    selectionLog.className = 'log-cmd';
    selectionLog.textContent = `> Launching: ${opId} --target ${targetValue}`;
    body.appendChild(selectionLog);

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
            showIntelligenceReport(opId, targetValue);
        }
    }, 400);
}

function showIntelligenceReport(opId, targetValue) {
    const body = document.getElementById('terminal-body');
    const data = intelligenceData[opId] || {
        title: 'Generic Operational Report',
        risk: 'LOW',
        summary: 'Operation executed successfully with standard parameters.',
        findings: ['No abnormal behaviors detected.', 'Buffer integrity verified.'],
        compliance: 'General compliance guidelines maintained.',
        evidence: 'Log checksums verified.'
    };

    const panel = document.createElement('div');
    panel.className = 'intel-panel';

    panel.innerHTML = `
        <div class="intel-header">
            <span class="intel-title">${data.title}</span>
            <span class="intel-tag risk-${data.risk.toLowerCase()}">RISK: ${data.risk}</span>
        </div>
        <div class="intel-section">
            <div class="intel-label">Target Assessment</div>
            <div class="intel-content">${targetValue}: ${data.summary}</div>
        </div>
        <div class="intel-section">
            <div class="intel-label">Core Findings</div>
            <div class="intel-content">
                <ul style="padding-left: 20px;">
                    ${data.findings.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="intel-section">
            <div class="intel-label">DPA Compliance Impact</div>
            <div class="intel-content">${data.compliance}</div>
        </div>
        <div class="intel-section">
            <div class="intel-label">Executive Evidence</div>
            <div class="intel-evidence">${data.evidence}</div>
        </div>
        <div style="margin-top: 20px; color: var(--accent); font-size: 0.8rem; text-align: center;">
            [ MWITHIGA LABS | DIGITAL RISK ASSURANCE | v2.0-SENTINEL ]
        </div>
    `;

    body.appendChild(panel);
    body.scrollTop = body.scrollHeight;

    const fin = document.createElement('div');
    fin.className = 'log-cmd';
    fin.style.marginTop = '20px';
    fin.textContent = 'Intelligence Dispatched. Press close (X) to exit.';
    body.appendChild(fin);
    body.scrollTop = body.scrollHeight;
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

// Global scope assignments
window.launchTool = launchTool;
window.closeModal = closeModal;

window.onclick = function (event) {
    const modal = document.getElementById('report-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Check for deep links
const urlParams = new URLSearchParams(window.location.search);
const tool = urlParams.get('tool');
if (tool) {
    window.addEventListener('load', () => launchTool(tool));
}

// Background effect
document.addEventListener('mousemove', (e) => {
    const bg = document.querySelector('.background-animation');
    if (!bg) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(51, 116, 24, 0.15) 0%, transparent 80%)`;
});
