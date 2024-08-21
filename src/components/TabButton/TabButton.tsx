import { FC, memo } from 'react';
import './TabButton.scss';

type TabButtonProps = {
  title   : string;
  click   : () => void;
  selected: boolean;
};

const TabButton: FC<TabButtonProps> = ({ title, click, selected }) => {
	return (
		<button
			onClick={click}
			className={selected ? 'selected' : ''}
			aria-label="tab"
		>
			{title}
		</button>
	);
};

export default memo(TabButton);
