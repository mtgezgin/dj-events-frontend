import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({ evt }) {
	const { attributes } = evt || {};
	const { name, slug, date, time, image } = attributes || {};
	const { data } = image || {};
	const { attributes: imageAttributes } = data || {};
	const { url } = imageAttributes || {};
	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={url || '/images/event-default.png'}
					width={170}
					height={100}
				/>
			</div>

			<div className={styles.info}>
				<span>
					{new Date(date).toLocaleDateString('en-US')} at {time}
				</span>
				<h3>{name}</h3>
			</div>

			<div className={styles.link}>
				<Link href={`/events/${slug}`}>
					<a className='btn'>Details</a>
				</Link>
			</div>
		</div>
	);
}
