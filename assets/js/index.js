async function inviteOrDashboard(guildId) {
    const token = new URLSearchParams(window.location.search).get('token');

    // Check if bot is already in the guild (API endpoint for checking bot presence)
    const botPresenceResponse = await fetch(`/api/bot-in-guild/${guildId}?token=${token}`);
    const botPresence = await botPresenceResponse.json();

    if (botPresence.inGuild) {
        // Redirect to dashboard.html with guildId
        window.location.href = `/dashboard.html?guild_id=${guildId}&token=${token}`;
    } else {
        // Redirect to Discord bot invite page
        const botInviteUrl = `https://discord.com/oauth2/authorize?client_id=${yourBotClientId}&scope=bot&permissions=8&guild_id=${guildId}`;
        window.location.href = botInviteUrl;
    }
}
