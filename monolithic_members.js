const mysql = require('mysql');
const conn = {
	host: "34.64.132.47",
	user: 'root',
	password: '',
	database: 'monolithic',
	port:'3306'
};

exports.onRequest = function (res, method, pathname, params, cb) {
	switch (method) {
		case "POST":
			return register(method, pathname, params, (response) => {
				process.nextTick(cb, res, response);
			});
		case "GET":
			return inquiry(method, pathname, params, (response) => {
				process.nextTick(cb, res, response);
			});
		case "DELETE":
			return unregister(method, pathname, params, (response) => {
				process.nextTick(cb, res, response);
			});
		default:
			return process.nextTick(cb, res, null);
	}
}

function register(method, pathname, params, cb) {
	let response = {
		errorcode: 0,
		errormessage: 'success'
	};
	
	if(params.username === null || params.password === null) {
		response.errorcode = 1;
		response.errormessage = "Invalid Parameters";
		cb(response);
	} else {
		let connection = mysql.createConnection(conn);
		connection.connect();
		connection.query("INSERT INTO members(username, password) values(?, ?)", [params.username, params.password], (error, results, fields) => {
			if (error) {
				response.errorcode = 1;
				response.errormessage = error;
			}
			cb(response);
		})
		connection.end();
	}
}

function inquiry(method, pathname, params, cb) {
	let response = {
		key: params.key,
		errorcode: 0,
		errormessage: 'success'
	};
	
	if(params.username === null || params.password === null) {
		response.errorcode = 1;
		response.errormessage = "Invalid Parameters";
		cb(response);
	} else {
		let connection = mysql.createConnection(conn);
		connection.connect();
		connection.query("SELECT id FROM members WHERE username = ? and password = ?", [params.username, params.password], (error, results, fields) => {
			if (error || results.length === 0) {
				response.errorcode = 1;
				response.errormessage = error ? error : "invalid password";
			} else {
				response.userid = results[0].id;
			}
			cb(response);
		})
		connection.end();
	}
}


function unregister(method, pathname, params, cb) {
	let response = {
		key: params.key,
		errorcode: 0,
		errormessage: 'success'
	};
	
	if(params.id === null) {
		response.errorcode = 1;
		response.errormessage = "Invalid Parameters";
		cb(response);
	} else {
		let connection = mysql.createConnection(conn);
		connection.connect();
		connection.query("DELETE FROM members WHERE username = ?", [params.username], (error, results, fields) => {
			if (error) {
				response.errorcode = 1;
				response.errormessage = error;
			}
			cb(response);
		})
		connection.end();
	}
}