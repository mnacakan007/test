export function formatForPicker(daysFormat: string | undefined) {
	// Look react-datepicker format documentation
	return daysFormat && daysFormat
		.toLowerCase()
		.replace(/[m]{2,}/g, `${daysFormat
			.toLowerCase()
			.match(/[m]{2,}/g)?.join('')
			.toUpperCase()
		}`);
}
