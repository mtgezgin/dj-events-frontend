import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format, parseISO } from 'date-fns';
import { FaImage } from 'react-icons/fa';

export default function EditEventPage({ evt }) {
	const { id, attributes } = evt || {};
	const {
		name,
		slug,
		performers,
		venue,
		address,
		date,
		time,
		description,
		image,
	} = attributes || {};
	const { data } = image || {};
	const { attributes: imageAttributes } = data || {};
	const { url } = imageAttributes || {};
	const [values, setValues] = useState({
		name: name || '',
		performers: performers || '',
		venue: venue || '',
		address: address || '',
		date: format(parseISO(date), 'yyyy-MM-dd') || '',
		time: time || '',
		description: description || '',
	});
	const [imagePreview, setImagePreview] = useState(url || null);
	const [isShowModal, setIsShowModal] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		const hasEmptyFields = Object.values(values).some(
			(element) => element === ''
		);

		if (hasEmptyFields) {
			toast.error('Please fill in all fields');
		}

		const res = await fetch(`${API_URL}/api/events/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: values }),
		});

		if (!res.ok) {
			toast.error('Something went wrong');
		} else {
			const evt = await res.json();
			router.push(`/events/${slug}`);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const imageUploaded = async (e) => {
		const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
		const data = await res.json();
		setImagePreview(data.data.attributes.image.data.attributes.url);
		setIsShowModal(false);
	};

	return (
		<Layout title={'Edit Event'}>
			<Link href='/events'>Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event Name</label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='performers'>Performers</label>
						<input
							type='text'
							name='performers'
							id='performers'
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Venue</label>
						<input
							type='text'
							name='venue'
							id='venue'
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='date'>Date</label>
						<input
							type='date'
							name='date'
							id='date'
							value={values.date}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='time'>Time</label>
						<input
							type='text'
							name='time'
							id='time'
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='description'>Event Description</label>
					<textarea
						type='text'
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}></textarea>
				</div>
				<input type='submit' value='Update Event' className='btn' />
			</form>

			<h2>Event Image</h2>
			{imagePreview ? (
				<Image src={imagePreview} width={170} height={100} />
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}

			<button
				onClick={() => setIsShowModal(true)}
				className='btn-secondary btn-icon'>
				<FaImage /> Set Image
			</button>
			<Modal show={isShowModal} onClose={() => setIsShowModal(false)}>
				<ImageUpload evtId={id} imageUploaded={imageUploaded} />
			</Modal>
		</Layout>
	);
}

export async function getServerSideProps({ query: { id } }) {
	const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
	const data = await res.json();
	const event = data.data;

	return {
		props: {
			evt: event,
		},
	};
}
