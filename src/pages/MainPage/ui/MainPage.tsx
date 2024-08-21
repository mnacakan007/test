import React, { ReactNode } from 'react';
import './MainPage.scss';

interface MainProps {
  children: ReactNode;
}

const MainPage: React.FC<MainProps> = ({ children }) => {
	return (
		<div className="content">
			{children}
		</div>
	);
};

export default MainPage;
