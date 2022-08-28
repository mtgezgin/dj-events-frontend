import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';
export default function NotFound() {
	return (
		<Layout title='Page not found'>
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<h4>Sorry, there is nothing here.</h4>
				<Link href='/'>
					<a>Go back home</a>
				</Link>
			</div>
		</Layout>
	);
}
