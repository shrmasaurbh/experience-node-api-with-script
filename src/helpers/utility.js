const moment = require("moment");


exports.dateFormat = date => {
	return date ? moment(date).format('llll') : null;
};
exports.validateLeadCsvRow = row => {
	
	if (!row.number || !Number.isInteger(Number(row.number))) {
		return "invalid number";
	}
	else if (!row.lead_name ) {
		return "project field cant be empty";
	}
		return;
};
exports.capitalize = s => {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
};
