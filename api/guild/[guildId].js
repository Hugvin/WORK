import axios from 'axios';

export default async (req, res) => {
  const { guildId } = req.query;
  const token = req.query.token;

  if (!token) {
    return res.status(400).send('Missing access token');
  }

  try {
    // Fetch guild details
    const guildResponse = await axios.get(`https://discord.com/api/guilds/${guildId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json({ guild: guildResponse.data });
  } catch (error) {
    console.error('Error fetching guild:', error);
    res.status(500).send('Error fetching guild');
  }
};
