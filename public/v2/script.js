function launchTool(toolId) {
    console.log(`Commanding Lab to deploy: ${toolId}`);

    const tools = {
        'portal': 'https://github.com/vintageGent/portal',
        'threatscope': 'https://github.com/vintageGent/ThreatScopeV2',
        'dispatch': 'https://github.com/vintageGent/dispatch',
        'lede': 'https://github.com/vintageGent/the-lede'
    };

    const target = tools[toolId];

    alert(`Initializing ${toolId.toUpperCase()}... \nDocumentation and Source available at: ${target}`);
    window.open(target, '_blank');
}

// Subtle background tracking for glow effect
document.addEventListener('mousemove', (e) => {
    const bg = document.querySelector('.background-animation');
    if (!bg) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    bg.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(51, 116, 24, 0.15) 0%, transparent 80%)`;
});
