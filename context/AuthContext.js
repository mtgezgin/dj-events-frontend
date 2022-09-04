import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const router = useRouter();

	useEffect(() => {
		checkUserLoggedIn();
	}, []);

	// Register user
	const register = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
			router.push('/account/dashboard');
		} else {
			setError(data.message);
			setError(null);
		}
	};

	// Login user
	const login = async ({ email: identifier, password }) => {
		// Strapi uses 'identifier' as an user/email
		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'json/application',
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});

		const data = await res.json();
		console.log('data in authcontext', data);
		if (res.ok) {
			setUser(data.user);
			router.push('/account/dashboard');
		} else {
			setError(data.error);
			// setError(null);
		}
	};

	// Logout user
	const logout = async () => {
		const res = await fetch(`${NEXT_URL}/api/logout`, {
			method: 'POST',
		});

		if (res.ok) {
			setUser(null);
			router.push('/');
		}
	};

	// Check if user is logged in
	const checkUserLoggedIn = async (user) => {
		const res = await fetch(`${NEXT_URL}/api/user`);
		const data = await res.json();
		if (res.ok) {
			setUser(data.user);
		} else {
			setUser(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, error, register, login, logout, checkUserLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
}
