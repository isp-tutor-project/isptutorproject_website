function DisplayExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {type: 'binary'});
    var firstSheet = workbook.SheetNames[0];
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    var table = document.createElement("table"); //Create a HTML Table element.
    table.border = "1";
    var row = table.insertRow(-1); //Add the header row.
    var headerCell = document.createElement("TH"); //Add the header cells.
    headerCell.innerHTML = "Student Id";
    row.appendChild(headerCell);

    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        var row = table.insertRow(-1);//Add the data row.
        var cell = row.insertCell(-1);//Add the data cells.
        cell.innerHTML = excelRows[i]['StudentID'];
    }
    var dvExcel = document.getElementById("Excel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
};

function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            if (reader.readAsBinaryString) { // For Browsers other than IE.
                reader.onload = function (e) {
                    DisplayExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else { // For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    DisplayExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};

function Transform(data) {
    // Read the Excel File data.
    var wb = XLSX.read(data, {type: 'binary'}); // open workbook
    var ws = wb.Sheets[wb.SheetNames[0]]; // open first worksheet
    var data = XLSX.utils.sheet_to_json(ws); // an array of json object
    
    var newData = data.map(function(record){
        record.Url = "website?student=<" + record.StudentID + ">";
        return record;
    });
    var newWB = XLSX.utils.book_new();
    var newWS = XLSX.utils.json_to_sheet(newData);

    XLSX.utils.book_append_sheet(newWB,newWS,"Urls");
    XLSX.writeFile(newWB,"Student Urls.xlsx");
}

function Generate() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");
    var reader = new FileReader();

    //For Browsers other than IE.
    if (reader.readAsBinaryString) {
        reader.onload = function (e) {
            Transform(e.target.result);
        };
        reader.readAsBinaryString(fileUpload.files[0]);
    } else {
        //For IE Browser.
        reader.onload = function (e) {
            var data = "";
            var bytes = new Uint8Array(e.target.result);
            for (var i = 0; i < bytes.byteLength; i++) {
                data += String.fromCharCode(bytes[i]);
            }
            Transform(data);
        };
        reader.readAsArrayBuffer(fileUpload.files[0]);
    }
}