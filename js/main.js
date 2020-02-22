let xhr = new XMLHttpRequest();
let uInt8Array;
xhr.open("GET", "titles_BS.db", true);
xhr.responseType = "arraybuffer";

let.onload = function(e) {
  uInt8Array = new Uint8Array(this.response);
  let db = new SQL.Database(uInt8Array);
  let contents = db.exec("SELECT * FROM 'titles' LIMIT 0,30");

  console.log(contents);
};
xhr.send();
