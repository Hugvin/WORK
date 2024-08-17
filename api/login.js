
export default (req, res) => {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const REDIRECT_URI = `${process.env.BASE_URL}/api/callback`;
  const SCOPE = 'identify guilds';
  
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${SCOPE}`;
  res.redirect(discordAuthUrl);
};
