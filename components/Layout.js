import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/layout.module.css';
export default function Layout({ title, keywords, description, children }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='keywords' content={keywords} />
				<meta name='description' content={description} />
			</Head>
			<Header />
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
