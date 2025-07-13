'use client';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './page.module.css';

type ErrorProps = {
	error: Error;
};

function Error({ error }: ErrorProps) {
	return (
		<div className={css.errorDiv}>
			<p className={css.errorMessage}>Could not fetch note details. {error.message}</p>
			<ErrorMessage />
		</div>
	);
}

export default Error;
