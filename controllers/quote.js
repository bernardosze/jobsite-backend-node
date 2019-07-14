/**
 * Quote Controller.
 * @author: Bernardo Sze.
 */
const { logger } = require('../config/logger');
const Quote = require('../models/quote');

const quoteFieldList = [
	'id',
	'quoteNumber',
	'customerName',
	'projectAddress',
	'projectType',
	'quoteStage',
	'estimatedStartDate',
	'requestedQuoteDate',
	'userName',
	'userDate'
];

// Fetch all quotes
module.exports.getQuotes = async () => {
	let data;
	try {
		data = await Quote.findAll({
			attributes: [...quoteFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching Quotes ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Fetch a quote
module.exports.getQuote = async quoteNumber => {
	let data;
	try {
		data = await Quote.findOne({
			where: { quote_number: quoteNumber },
			attributes: [...quoteFieldList],
			raw: true
		});
	} catch (error) {
		logger.error(`Error fetching a quote ${error}`);
		data = { status: '200', type: 'Exception', message: error.message };
	}
	return data;
};

// Create a new quote
module.exports.insertQuote = async quote => {
	let data;
	try {
		await Quote.create(quote);
		logger.debug(`Quote successfully created: ${quote}`);
		data = { status: 200, message: 'Quote successfully created' };
	} catch (error) {
		logger.error(`${error.name} - ${error.message}`);
		logger.error(`Error trying to insert a Quote: ${JSON.stringify(quote)}`);
		logger.error(error);
		data = { status: 200, type: 'Exception', message: `${error.name} - ${error.message}` };
	}
	return data;
};

// Update an existing quote
/**
 * @param {Quote} - quote
 */
module.exports.updateQuote = async quote => {
	let data;
	logger.debug(quote);
	try {
		await Quote.update(
			{
				customerName: quote.customerName,
				projectAddress: quote.projectAddress,
				projectType: quote.projectType,
				quoteStage: quote.quoteStage,
				estimatedStartDate: quote.estimatedStartDate,
				requestedQuoteDate: quote.requestedQuoteDate,
				userName: quote.userName,
				userDate: quote.userDate
			},
			{
				where: { id: quote.id }
			}
		);
		logger.debug(`Quote successfully updated: ${JSON.stringify(quote)}`);
		data = { status: 200, message: 'Quote successfully updated.' };
	} catch (error) {
		logger.error(`Error trying to update a Quote: ${JSON.stringify(quote)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};

// Delete an existing quote
module.exports.deleteQuote = async quoteNumber => {
	let data;
	try {
		await Quote.destroy({
			where: { quote_number: quoteNumber }
		});
		logger.debug(`Quote successfully deleted: ${JSON.stringify(quoteNumber)}`);
		data = { status: 200, message: 'Quote successfully deleted.' };
	} catch (error) {
		logger.error(`Error trying to delete a Quote: ${JSON.stringify(quoteNumber)} -  ${error}`);
		data = { status: 200, type: 'Exception', message: error.message };
	}
	return data;
};
