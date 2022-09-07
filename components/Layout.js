import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css';
export default function Layout({ title, keywords, description, children }) {
	const router = useRouter();

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='keywords' content={keywords} />
				<meta name='description' content={description} />
			</Head>
			<Header />
			{router.pathname === '/' && <Showcase />}
			<div className={styles.container}>{children}</div>
			<Footer />
		</div>
	);
}

Layout.defaultProps = {
	title: 'Dj Events | Find the best events in the city',
	keywords: 'Find, events, in, the, city',
	description: 'Find the best events in the city',
};
