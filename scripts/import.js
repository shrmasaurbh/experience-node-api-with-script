const xlsxFile = require('read-excel-file/node');
let mysql = require('mysql');

var con = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "root",  
database: "reimbursement"  
}); 

xlsxFile('./templateShedule.xlsx').then((rows) => {
	rows.shift(); 
	
	con.connect(function(err) {  
		if (err) throw err;  
		console.log("Connected!");  

		for(let data of rows){
				// let config = require('./config.js');
			if(data[0]!==null && data[1]!==null && data[3]!==null && data[4]!==null && data[5]!==null && data[6]!==null){
				data[0] = data[0].toString();
				let stmt = `INSERT INTO employee(date,employee_id, name, working_type, start, end, store_id, store_name)
				            VALUES(?,?,?,?,?,?,?,?)`;
				// execute the insert statment
				con.query(stmt, data, (err, results) => {
				  if (err) {
				    console.error(err.message);
				  }
				  // get inserted id
				  console.log('Row Id:' + results.insertId);
				});

			}

		}
	});

})
.catch((err) => {
 console.log(err);
 console.table(err);
})


  







