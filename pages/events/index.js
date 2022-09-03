import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';

const PER_PAGE = 2;

export default function EventsPage({ events, page, total }) {
	const lastPage = Math.ceil(total / PER_PAGE);

	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
			{/* Button to Previous Page */}
			{page < lastPage && (
				<Link href={`/events?page=${page + 1}`}>
					<a className='btn-secondary' style={{ float: 'right' }}>
						Next
					</a>
				</Link>
			)}
			{/* Button to Next Page */}
			{page > 1 && (
				<Link href={`/events?page=${page - 1}`}>
					<a className='btn-secondary'>Prev</a>
				</Link>
			)}
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	const start = parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * PER_PAGE;

	// Fetch Events
	const res = await fetch(
		`${API_URL}/api/events?sort=date%3Aasc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`
	);

	const events = await res.json();

	return {
		props: {
			events: events.data,
			page: parseInt(page),
			total: events.meta.pagination.total,
		},
	};
}
