let xhr_BS = new XMLHttpRequest();
let xhr_D = new XMLHttpRequest();
let db_BS;
let db_D;

xhr_D.open("GET", "titles_D.db", true);
xhr_D.responseType = "arraybuffer";

xhr_D.onload = function(e) {
  let uInt8Array = new Uint8Array(this.response);
  db_D = new SQL.Database(uInt8Array);
  let contents = db_D.exec("SELECT * FROM 'titles' LIMIT 0,30");

  console.log(contents);
};
xhr_D.send();

xhr_BS.open("GET", "titles_BS.db", true);
xhr_BS.responseType = "arraybuffer";

xhr_BS.onload = function(e) {
  let uInt8Array = new Uint8Array(this.response);
  db_BS = new SQL.Database(uInt8Array);
  let contents = db_BS.exec("SELECT * FROM 'titles' LIMIT 0,30");

  console.log(contents);
};
xhr_BS.send();

// setTimeout(function() {
//   let search = db.exec("SELECT * FROM 'titles' where title like '%iphone%'");
//   console.log(search);
//   let results = search[0].values;

//   for (let value of results) {
//     console.log(value);
//     document.write(`
//     <h3><a href="https://www.hi-pda.com/forum//viewthread.php?tid=${value[1]}">${value[0]}</a></h3>
//     <hr>
//     `);
//   }
// }, 5000);

const app = new Vue({
  el: "#app",
  data: {
    keyword: "iphone",
    results: []
  },
  methods: {
    search(type) {
      console.log(type);
      console.log("ckick!");

      let db = db_D;
      console.log(db);
      if (type == "bs") {
        db = db_BS;
      }
      this.results = db.exec(
        `SELECT * FROM 'titles' where title like '%${this.keyword}%'`
      )[0].values;
    }
  }
});
