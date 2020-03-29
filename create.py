import sqlite3

conn = sqlite3.connect('titles.db')
c = conn.cursor()
c.execute('''CREATE TABLE titles
       (title         TEXT     NOT NULL,
       tid            integer  NOT NULL,
       boards         integer  NOT NULL,
       postdate       TEXT     NOT NULL,
       PRIMARY KEY(tid));''')
conn.commit()
conn.close()