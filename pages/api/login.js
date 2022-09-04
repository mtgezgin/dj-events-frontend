import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
	if (req.method === 'POST') {
		const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: req.body,
		});

		const data = await strapiRes.json();
		// res.json(data);
		if (strapiRes.ok) {
			//set cookie
			res.setHeader(
				'Set-Cookie',
				cookie.serialize('token', data.jwt, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: 60 * 60 * 24 * 7, // 1 week
					sameSite: 'strict',
					path: '/',
				})
			);
			res.status(200).json({ user: data.user });
		} else {
			res
				.status(data.error.status)
				// .json({ message: data.message[0].messages[0].message });
				.json({ error: data.error.message });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({ message: `Method ${req.method} is not allowed` });
	}
};
