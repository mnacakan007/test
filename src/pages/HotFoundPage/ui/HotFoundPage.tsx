import { Link } from 'react-router-dom';

const HotFoundPage = () => {
	return (
		<div className="inner-content clear-fix" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
			<div className="inner-content__left fl">
				<div className="error-box tc">
					<div className="error-box__gray-content">
						<img src="https://www.tert.am/img/404.jpg" alt="Page not found" />
					</div>
					<h3 className="error-box__text fb fs18">Նման էջ գոյություն չունի Go <Link to="/" style={{ color: 'blue' }}>Home</Link></h3>
				</div>
			</div>
		</div>
	);
};

export default HotFoundPage;
