window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const guildId = urlParams.get('guild_id');
    const token = urlParams.get('token');

    if (!guildId || !token) {
        alert("Missing guild ID or access token!");
        return;
    }

    // Fetch server details using API (assuming you have an API to get specific server details)
    const response = await fetch(`/api/guild/${guildId}?token=${token}`);
    const data = await response.json();

    document.getElementById('server-name').textContent = data.guild.name;
    document.getElementById('server-id').textContent = `Server ID: ${data.guild.id}`;
    document.getElementById('server-owner').textContent = `Server Owner: ${data.guild.owner}`;

    // Show server information when the button is clicked
    document.getElementById('server-info-btn').addEventListener('click', () => {
        document.getElementById('server-details').style.display = 'block';
    });

    // Handle kicking the bot
    document.getElementById('kick-bot-btn').addEventListener('click', async () => {
        const confirmKick = confirm("Are you sure you want to kick the bot?");
        if (confirmKick) {
            await fetch(`/api/kick-bot/${guildId}?token=${token}`, { method: 'POST' });
            alert("Bot has been kicked from the server.");
        }
    });
};
