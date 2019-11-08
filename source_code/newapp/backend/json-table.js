const Json2Html = require('json2htable');
let data = [{ ab: "ab" }]
let table = Json2Html(data);
console.log(table);