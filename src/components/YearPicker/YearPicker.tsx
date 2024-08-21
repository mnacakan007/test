import { FC, useState } from 'react';

import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';
import { IYearPicker } from '~/components/YearPicker/types.ts';
import { formatForPicker } from '~/components/YearPicker/utils.ts';
import { settingsSelector } from '~/store/settings/settings.selector.ts';
import 'react-datepicker/dist/react-datepicker.css';
import './YearPicker.scss';

const YearPicker: FC<IYearPicker> = ({
	date,
	id, showAllYears,
	onChangeDate,
	disabled = false,
}) => {
	const dateForStart = date ? new Date(date) : null;
	const [startDate, setStartDate] = useState<Date | null>(dateForStart);
	const { days_format } = useSelector(settingsSelector.initialSettings);
	const currentYear = new Date();
	const maxDate = showAllYears ? null : currentYear;

	const changeDateHandler = (date:Date) => {
		setStartDate(date);

		if (onChangeDate) {
			onChangeDate();
		}
	};

	return (
		<DatePicker
			disabled={disabled}
			locale="locale"
			selected={startDate}
			onChange={(date:Date) => changeDateHandler(date)}
			dateFormat={formatForPicker(days_format)}
			dateFormatCalendar="MMMM"
			showYearDropdown
			showMonthDropdown
			useShortMonthInDropdown
			name={id}
			id={id}
			autoComplete={'off'}
			yearDropdownItemNumber={100}
			maxDate={maxDate}
			minDate={new Date('01-01-2014')}
		/>
	);
};

export default YearPicker;
