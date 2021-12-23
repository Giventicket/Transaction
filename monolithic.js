const http = require('http');
const url = require('url');
const querystring = require('querystring');

const members = require('./monolithic_members.js');
const goods = require('./monolithic_goods.js');
const purchases = require('./monolithic_purchases.js');

let server = http.createServer((req, res,) => {
	let method = req.method;
	let uri = url.parse(req.url, true);
	let pathname = uri.pathname;
	
	if(method === "POST" || method === 'PUT'){
		let body = "";
		
		req.on('data', function(data){
			body += data;
		});
		
		req.on('end', function(){
			let params;
			if(req.headers['content-type'] === "application/json"){
				params = JSON.parse(body);
			}
			onRequest(res, method, pathname, uri.query);
		});
		
	} else {
		onRequest(res, method, pathname, uri.query);
	}
}).listen(8080);

function onRequest(res, method, pathname, params){
	switch(pathname){
		case "/members": 
			members.onRequest(res, method, pathname, params, response);
		case "/goods": 
			goods.onRequest(res, method, pathname, params, response);
		case "/purchases": 
			purchases.onRequest(res, method, pathname, params, response);
		default:
			res.writeHead(404);
			console.log("holy shit happened");
			return res.end();
	}
}

function response(res, packet){
	res.writeHead(200, { 'Content-Type': 'application/json'});
	res.end(JSON.stringify(packet));
}