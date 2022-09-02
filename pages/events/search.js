import qs from 'qs';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';

export default function SearchPage({ events }) {
	const router = useRouter();
	return (
		<Layout title='Search Results'>
			<Link href='/'>
				<a>{`<`} Go Back</a>
			</Link>
			<h1>Search Results for "{router.query.term}"</h1>
			{events.length === 0 && <h2>No events to show</h2>}

			{events.map((evt) => (
				<EventItem evt={evt} key={evt.id} />
			))}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify(
		{
			filters: {
				$or: [
					{
						name: {
							$containsi: term,
						},
					},
					{
						performers: {
							$containsi: term,
						},
					},
					{
						description: {
							$containsi: term,
						},
					},
					{
						venue: {
							$containsi: term,
						},
					},
				],
			},
		},
		{ encode: false }
	);
	const res = await fetch(`${API_URL}/api/events?${query}&[populate]=*`);
	const eventsData = await res.json();
	const events = eventsData.data;
	return {
		props: { events },
	};
}
