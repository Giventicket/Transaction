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
		default:
			return process.nextTick(cb, res, null);
	}
}

function register(method, pathname, params, cb) {
	let response = {
		key: params.key,
		errorcode: 0,
		errormessage: 'success'
	};
	
	if(params.userid == null || params.goodsid == null) {
		response.errorcode = 1;
		response.errormessage = "Invalid Parameters";
		cb(response);
	} else {
		let connection = mysql.createConnection(conn);
		connection.connect();
		connection.query("INSERT INTO purchases(userid, goodsid) values(?, ?)", [params.userid, params.goodsid], (error, results, fields) => {
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
	
	if(params.userid == null) {
		response.errorcode = 1;
		response.errormessage = "Invalid Parameters";
		cb(response);
	} else {
		let connection = mysql.createConnection(conn);
		connection.connect();
		connection.query("SELECT id, goodsid, date FROM purchases WHERE userid = ?", [params.userid], (error, results, fields) => {
			if (error) {
				response.errorcode = 1;
				response.errormessage = error;
			} else {
				response.results = results;
			}
			cb(response);
		})
		connection.end();
	}
}
