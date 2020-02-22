let xhr = new XMLHttpRequest();
let uInt8Array;
let db;
xhr.open("GET", "titles_BS.db", true);
xhr.responseType = "arraybuffer";

xhr.onload = function(e) {
  uInt8Array = new Uint8Array(this.response);
  db = new SQL.Database(uInt8Array);
  let contents = db.exec("SELECT * FROM 'titles' LIMIT 0,30");

  console.log(contents);
};
xhr.send();

setTimeout(function() {
  let search = db.exec("SELECT * FROM 'titles' where title like '%iphone%'");
  console.log(search);
  let results = search[0].values;

  for (let value in results) {
    console.log(value);
    document.writeln(value[0]);
  }
}, 6000);
