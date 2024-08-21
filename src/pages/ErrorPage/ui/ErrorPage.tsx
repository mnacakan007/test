import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

const ErrorPage = () => {
	const reloadPage = (): void => {
		location.reload();
	};

	return (
		<div className="errorPage">
			<h2>An unexpected error has occurred</h2>
			<Link to="/am">
				<Button onClick={reloadPage}>Reload page</Button>
			</Link>
		</div>
	);
};

export default ErrorPage;
