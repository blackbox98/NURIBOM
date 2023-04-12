// 네이버 음성합성 Open API 예제
var express = require('express');
var app = express();
var client_id = "pr6vu93m30"
var client_secret = "obdR9N1cYguttim8KLTqkCnj3PKhuSU2IGTCN2qI";
var fs = require('fs');
app.get('/tts', function(req, res) {
  var api_url = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';
  var request = require('request');
  var options = {
    url: api_url,
    form: { speaker: 'nminseo', volume: '0', speed: '0', pitch: '0', text: '어르신', format: 'mp3' },
    headers: { 'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret },
  };
  var writeStream = fs.createWriteStream('./tts1.mp3');
  var _req = request.post(options).on('response', function(response) {
    console.log(response.statusCode); // 200
    console.log(response.headers['content-type']);
  });
  _req.pipe(writeStream); // file로 출력
  // _req.pipe(res); // 브라우저로 출력
});

app.listen(3000, function() {
  console.log('http://127.0.0.1:3000/tts app listening on port 3000!');
});
