import { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import { ToastContainer, toast } from 'react-toastify';

export default function DashboardPage({ events, token }) {
	const [evts, setEvts] = useState(events);
	const deleteEvent = async (id) => {
		if (confirm('Are you sure?')) {
			const res = await fetch(`${API_URL}/api/events/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			if (!res.ok) {
				if (res.status === 403 || res.status === 401) {
					toast.error('No token included');
					return;
				}
				toast.error(data.message);
			} else {
				const newEvts = evts.filter((evt) => evt.id !== id);
				setEvts(newEvts);
			}
		} else {
			return;
		}
	};
	return (
		<Layout title='User Dashboard'>
			<div className={styles.dash}>
				<h1>Dashboard</h1>
				<h3>My Events</h3>
				<ToastContainer />
				{evts.map((evt) => (
					<DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ req }) {
	const { token } = parseCookies(req);

	const res = await fetch(`${API_URL}/api/events/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const events = await res.json();

	return {
		props: {
			events,
			token,
		},
	};
}
