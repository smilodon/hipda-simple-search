let xhr_D = new XMLHttpRequest();
let db_D;

xhr_D.open("GET", "titles.db", true);
xhr_D.responseType = "arraybuffer";

xhr_D.onload = function(e) {
  let uInt8Array = new Uint8Array(this.response);
  db_D = new SQL.Database(uInt8Array);
  app.db_D_loaded = true;
  let contents = db_D.exec("SELECT * FROM 'titles' LIMIT 0,30");

  console.log(contents);
};
xhr_D.send();

/*xhr_BS.open("GET", "titles_BS.db", true);
xhr_BS.responseType = "arraybuffer";

xhr_BS.onload = function(e) {
  let uInt8Array = new Uint8Array(this.response);
  db_BS = new SQL.Database(uInt8Array);
  app.db_BS_loaded = true;
  let contents = db_BS.exec("SELECT * FROM 'titles' LIMIT 0,30");

  console.log(contents);
};
xhr_BS.send();*/

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
    keywords: "iphone",
    keywordslist: [],
    results: [],
    db_D_loaded: false,
    // db_BS_loaded: false,
    showd: false,
    has_result: true
  },
  methods: {
    changeColor(resultsList, keywordslist) {
      // for (let item of resultsList) {
      //   let title = item[0];
      //   for (let keyword of keywordslist) {
      //     let replaceReg = new RegExp(this.keyword, "g");
      //     let replaceString = `<span class="search-text">${keyword}</span>`;
      //     title.replace(replaceReg, replaceString);
      //     console.log(`change ${keyword}`);

      //   }

      // }
      // return resultsList;

      resultsList.map((item, index) => {
        let title = item[0];
        for (let keyword of keywordslist) {
          let replaceReg = new RegExp(keyword, "gi");
          let replaceString = `<span class="search-text">${keyword}</span>`;
          // console.log(title.replace(replaceReg, replaceString));
          title = title.replace(replaceReg, replaceString);
          resultsList[index][0] = title;
          // console.log(`change ${keyword}`);
        }
      });
      console.log(resultsList);
      return resultsList;
    },
    search(type) {
      this.results = [];
      console.log(type);
      console.log("search click!");

      let db = db_D;
      console.log(db);

      let sqlstr = "";
      let sqlsubstr = "";

      if (type == "d"){
        sqlsubstr = 'boards = 2 AND';
      }
      if (type == "bs"){
        sqlsubstr = 'boards = 6 AND';
      }      

      if (this.keywordslist.length == 1) {
        sqlstr = `SELECT * FROM 'titles' where ${sqlsubstr} title like '%${this.keywordslist[0]}%' ORDER BY tid DESC`;
      } else if (this.keywordslist.length == 2) {
        sqlstr = `SELECT * FROM 'titles' where ${sqlsubstr} title like '%${this.keywordslist[0]}%' and title like '%${this.keywordslist[1]}%' ORDER BY tid DESC`;
      } else {
        console.log("no result");
        this.has_result = false;
        return;
      }
      console.log(sqlstr);
      let sqlResult = db.exec(sqlstr);

      console.log(sqlResult);

      if (sqlResult.length > 0) {
        this.has_result = true;
        let tempresults = sqlResult[0].values;
        console.log(tempresults);
        this.results = this.changeColor(tempresults, this.keywordslist);
      } else {
        this.has_result = false;
      }
    }
  },
  created: function() {
    this.keywordslist =
      this.keywords.length == 0 ? [] : this.keywords.trim().split(" ");
  },
  computed: {
    db_D_load_status() {
      if (this.db_D_loaded) {
        return "索引已加载完成";
      } else {
        return "索引未加载,请稍候";
      }
    }
  },

  watch: {
    keywords() {
      this.has_result = true;
      this.keywordslist =
        this.keywords.length == 0 ? [] : this.keywords.trim().split(" ");
    }
  }
});

// make showd true after 1 minutes
setTimeout(() => {
  app.showd = true;
}, 60000);
