// IMPORTS
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// CREATE express app
const app = express();
app.use(cors());

app.use(express.json({ extended: false }));

// routes
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const authRouter = require('./routes/auth');
// REST routes
const customerRouter = require('./routes/api/customer');
const supplierRouter = require('./routes/api/supplier');
const materialRouter = require('./routes/api/material');
const quoteRouter = require('./routes/api/quote');
const lotRouter = require('./routes/api/lot');
const repairRouter = require('./routes/api/repair');
const weatherRouter = require('./routes/api/weather');
const requestRouter = require('./routes/api/request');
const progressRouter = require('./routes/api/progress');
const headerRouter = require('./routes/api/requestHeader');
const fullrequestRouter = require('./routes/api/fullRequest');

// app.use('/', authRouter);
// app.use('/', indexRouter);

// app.use('/api/users', usersRouter);
app.use('/api/customer', customerRouter);
app.use('/api/supplier', supplierRouter);
app.use('/api/material', materialRouter);
app.use('/api/quote', quoteRouter);
app.use('/api/lot', lotRouter);
app.use('/api/repair', repairRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/mrequest', requestRouter);
app.use('/api/header', headerRouter);
app.use('/api/fullrequest', fullrequestRouter);
app.use('/api/progress', progressRouter);

// app.use('/api/task', require('./routes/api/task'));
// app.use('/api/users', require('./routes/api/user'));
// app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

db.authenticate()
	.then(result => {
		console.log('server started');
		console.log(result);
		app.listen(PORT);
	})
	.catch(err => {
		console.log('There is an error');
		console.log(err);
	});
