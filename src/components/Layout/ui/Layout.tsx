import { FC, ReactNode } from 'react';
import HeaderPage from '~/pages/HeaderPage/ui/HeaderPage.tsx';
import MainPage from '~/pages/MainPage/ui/MainPage.tsx';
import FooterPage from '~/pages/FooterPage/ui/FooterPage.tsx';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<HeaderPage />
			<MainPage>{children}</MainPage>
			<FooterPage />
		</>
	);
};

export default Layout;
