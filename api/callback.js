
import axios from 'axios';

export default async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  const data = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${process.env.BASE_URL}/api/callback`,
  });

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = tokenResponse.data;

    // Store the access token in the session (Vercel doesn't have state, so you could use cookies or JWTs)
    res.redirect(`/api/servers?token=${access_token}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Error exchanging code for token');
  }
};
