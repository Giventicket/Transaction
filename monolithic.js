const http = require('http');
const url = require('url');
const querystring = require('querystring');

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
	res.end('response!');
}