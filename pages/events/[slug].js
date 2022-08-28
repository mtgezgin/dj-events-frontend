import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
export default function EventPage() {
	const router = useRouter();
	return (
		<Layout>
			<h1>Event</h1>
			<p>{router.query.slug}</p>
			<button onClick={() => router.push('/')}>Click</button>
		</Layout>
	);
}
