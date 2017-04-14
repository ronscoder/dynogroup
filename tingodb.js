var Engine = require('tingodb')();
var assert = require('assert');
var db = new Engine.Db('./tdb', {});
var col = db.collection("test");

// col.insert({name: 'ROnjan2'}, (err, result)=>{
//     assert.equal(null, err);
// });
// col.insert({name: 'ROnjan3'}, (err, result)=>{
//     assert.equal(null, err);
// });
col.update({contacts: {$push: {number: 1}}});
col.find({}).toArray((err, docs)=>{
    console.log(docs);
});
