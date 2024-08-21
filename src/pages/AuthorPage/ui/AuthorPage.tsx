import React, { useEffect } from 'react';
import Author from '~/components/Author';
import HeaderBlock from '~/components/CategoryHeader';
import { scrollToTop } from '~/helpers/utils.ts';
import './AuthorPage.scss';

const AuthorPage: React.FC = () => {
	useEffect(() => {
		scrollToTop('instant');
	}, []);
	
	return (
		<>
			<div className='main_screen'>
				<div className='page_container'>
					<div className="page_row">
						<HeaderBlock title='authors' />
						<Author />
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthorPage;
