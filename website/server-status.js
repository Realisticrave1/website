// Real-time server status script for RavenMC
document.addEventListener('DOMContentLoaded', function() {
    // Query the Minecraft server status
    async function checkServerStatus() {
        try {
            // Using MCStatus API - with our server address
            const response = await fetch('https://api.mcsrvstat.us/2/play.ravenmc.com');
            const data = await response.json();
            
            const statusIndicator = document.getElementById('status-indicator');
            const statusText = document.getElementById('status-text');
            const playerCount = document.getElementById('player-count');
            const serverVersion = document.getElementById('server-version');
            
            if (data.online) {
                // Server is online
                statusIndicator.classList.remove('offline');
                statusIndicator.classList.add('online');
                statusText.textContent = 'Online';
                
                // Update player count
                playerCount.textContent = `${data.players.online}/${data.players.max}`;
                playerCount.classList.add('updated');
                
                // Update version
                serverVersion.textContent = data.version;
                serverVersion.classList.add('updated');
                
                // Remove animation classes after animation completes
                setTimeout(() => {
                    playerCount.classList.remove('updated');
                    serverVersion.classList.remove('updated');
                }, 1000);
            } else {
                // Server is offline
                statusIndicator.classList.remove('online');
                statusIndicator.classList.add('offline');
                statusText.textContent = 'Offline';
                playerCount.textContent = '0/0';
                serverVersion.textContent = 'Unknown';
            }
        } catch (error) {
            console.error('Error checking server status:', error);
            
            // Show error state
            const statusIndicator = document.getElementById('status-indicator');
            const statusText = document.getElementById('status-text');
            
            statusIndicator.classList.remove('online');
            statusIndicator.classList.add('offline');
            statusText.textContent = 'Error';
        }
    }
    
    // Handle copy button for server address
    document.querySelector('.copy-btn.small').addEventListener('click', function() {
        const serverAddress = document.querySelector('.server-address').textContent;
        navigator.clipboard.writeText(serverAddress).then(function() {
            const originalText = document.querySelector('.copy-btn.small').textContent;
            document.querySelector('.copy-btn.small').textContent = 'Copied!';
            setTimeout(function() {
                document.querySelector('.copy-btn.small').textContent = originalText;
            }, 2000);
        });
    });
    
    // Check server status immediately and then every 5 minutes
    checkServerStatus();
    setInterval(checkServerStatus, 300000);
});