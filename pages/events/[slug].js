import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ event }) {
	const { attributes } = event;
	const { name, venue, address, date, time, performers, description, image } =
		attributes;
	const { data } = image || {};
	const { attributes: imageAttributes } = data || {};
	const { url } = imageAttributes || {};

	return (
		<Layout>
			<div className={styles.event}>
				<span>
					{new Date(date).toLocaleDateString('tr')} at {time}
				</span>
				<h1>{name}</h1>
				{url && (
					<div className={styles.image}>
						<Image src={url} width={960} height={600} />
					</div>
				)}

				<h3>Performers:</h3>
				<p>{performers}</p>
				<h3>Description:</h3>
				<p>{description}</p>
				<h3>Venue: {venue}</h3>
				<p>{address}</p>

				<Link href='/events'>
					<a className={styles.back}>{'<'} Go Back</a>
				</Link>
			</div>
		</Layout>
	);
}

// export async function getStaticPaths() {
// 	const res = await fetch(`${API_URL}/api/events`);
// 	const events = await res.json();

// 	const paths = events.map((event) => ({
// 		params: { slug: event.slug },
// 	}));

// 	return {
// 		paths,
// 		fallback: true,
// 	};
// }

// export async function getStaticProps({ params: { slug } }) {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`);
// 	const events = await res.json();

// 	return {
// 		props: {
// 			event: events[0],
// 		},
// 		revalidate: 1,
// 	};
// }

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`);
	const eventsData = await res.json();
	const events = eventsData.data;

	const paths = events.map((event) => ({
		params: { slug: event?.attributes?.slug },
	}));
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const res = await fetch(
		`${API_URL}/api/events?filters[slug][$eq]=${params?.slug}&populate=*`
	);

	const eventData = await res.json();
	const event = eventData.data[0];
	return { props: { event }, revalidate: 1 };
}
