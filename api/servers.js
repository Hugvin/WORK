
import axios from 'axios';

export default async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send('No access token provided');
  }

  try {
    // Fetch user's guilds
    const guildResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const guilds = guildResponse.data;

    // Filter guilds where the user has the MANAGE_GUILD permission (0x20)
    const manageableGuilds = guilds.filter(guild => (guild.permissions & 0x20) === 0x20);

    // Render server list
    res.status(200).json({ guilds: manageableGuilds });
  } catch (error) {
    console.error('Error fetching user guilds:', error);
    res.status(500).send('Error fetching user guilds');
  }
};
