const reports = {
    'portal': {
        title: 'Secure P2P Channel: Portal v1.1',
        tag: 'Infrastructure Intelligence',
        summary: 'Encrypted peer-to-peer file transfer protocol verified for corporate data sovereignty.',
        sections: [
            {
                label: 'Technical Evidence',
                content: 'Zero-configuration handshake. No intermediary storage. End-to-end encryption verified via incident DISP-002.'
            },
            {
                label: 'Compliance Mapping',
                content: 'DPA 2019 [Part IV: Processing of Personal Data]: Ensures data remains within specified geographical jurisdictions during transfer.'
            }
        ]
    },
    'threatscope': {
        title: 'Vulnerability Lens: ThreatScope v2.0',
        tag: 'Perimeter Intelligence',
        summary: 'Automated network and vulnerability scanner findings for evaluated perimeters.',
        sections: [
            {
                label: 'Active Scans',
                content: 'Port mapping, service fingerprinting, and automated vulnerability cross-referencing completed.'
            },
            {
                label: 'Risk Assessment',
                content: '<span class="risk-high">High:</span> 0 | <span class="risk-med">Medium:</span> 2 | <span class="risk-low">Low:</span> 5'
            }
        ]
    },
    'lede': {
        title: 'Communication Strategy: The Lede v1.1',
        tag: 'Reputation Intelligence',
        summary: 'Analysis of corporate narrative and press release strategic alignment.',
        sections: [
            {
                label: 'Narrative Integrity',
                content: 'Ensures PR output matches the technical security posture of the organization.'
            },
            {
                label: 'Stakeholder Impact',
                content: 'Optimized for executive clarity and investor confidence during post-incident recovery.'
            }
        ]
    },
    'dispatch': {
        title: 'Connectivity Engine: Dispatch v1.2',
        tag: 'Operational Intelligence',
        summary: 'Point-of-contact harvesting and high-speed communication orchestration.',
        sections: [
            {
                label: 'Optimization',
                content: 'Contact harvesting efficiency improved by 40% via thread orchestration.'
            },
            {
                label: 'Operational Status',
                content: 'Verified for bulk connection management during high-stakes strategic outreaches.'
            }
        ]
    }
};

function launchTool(toolId) {
    const report = reports[toolId];
    if (!report) return;

    const output = document.getElementById('report-output');
    output.innerHTML = `
        <div class="report-header">
            <span class="report-tag">${report.tag}</span>
            <h2>${report.title}</h2>
            <p>${report.summary}</p>
        </div>
        ${report.sections.map(section => `
            <div class="report-section">
                <h3>${section.label}</h3>
                <div class="report-data">${section.content}</div>
            </div>
        `).join('')}
    `;

    document.getElementById('report-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('report-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('report-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Check for tool param in URL (for deep linking)
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
