import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p>Copywrite &copy; DJ Events {new Date().getFullYear()}</p>
			<p>
				<Link href='/about'>
					<a>About this project</a>
				</Link>
			</p>
		</footer>
	);
}
