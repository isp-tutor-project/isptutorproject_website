$(document).ready(function()
{   
	//ajax row data
	var ajax_data = []
	var random_id = function() 
	{
		var id_num = Math.random().toString(9).substr(2,3);
		var id_str = Math.random().toString(36).substr(2);
		
		return id_num + id_str;
	};
	//--->create data table > start
    var tbl = '';
    tbl +='<div class="table-wrapper">';
	tbl +='<table class="table table-hover" id="tbl_posts">';

		//--->create table header > start
		tbl +='<thead>';
			tbl +='<tr>';
			tbl +='<th></th>';
			tbl +='<th>User ID</th>';
      		tbl +='<th>Pathway</th>';
      		tbl +='<th></th>';
			tbl +='</tr>';
		tbl +='</thead>';
		//--->create table header > end

		//--->create table body > start
		tbl +='<tbody id="tbl_posts_body">';

			//--->create table body rows > start
			$.each(ajax_data, function(index, val) 
			{
				//you can replace with your database row id
				var row_id = random_id();

				//loop through ajax row data
				tbl +='<tr row_id="'+row_id+'">';
					tbl +='<td ><div class="row_data" col_name="selected">'+val['select']+'</div></td>';
					tbl +='<td ><div class="row_data" col_name="userid">'+val['userid']+'</div></td>';
          			tbl +='<td ><div class="row_data" col_name="pathway">'+val['pathway']+'</div></td>';
          			tbl +='<td ><div class="row_data" col_name="selections">'+val['selections']+'</div></td>';
					tbl +='<td ><div class="btn_delete"><a href="#" class="btn btn-link" row_id="'+row_id+'">Delete Row</a></div></td>';
				tbl +='</tr>';
			});
            //--->create table body rows > end

		tbl +='</tbody>';
		//--->create table body > end

	tbl +='</table>';
	//--->create data table > end
    tbl +='</div>';
	//out put table data
	$(document).find('.tbl_user_data').html(tbl);
});

jQuery(document).delegate('.btn_delete', 'click', function(e) {
     e.preventDefault();
     var didConfirm = confirm("Are you sure you want to delete");
     if (didConfirm == true) {
      var id = jQuery(this).attr('row_id');
      var row_div = jQuery(this).attr('row_div');
      jQuery('#rec-' + id).remove();
    $('#tbl_posts_body tr').each(function(index) {
      $(this).find('span.sn').html(index+1);
    });
    return true;
  } else {
    return false;
  }
});

jQuery(document).delegate('a.add-record', 'click', function(e) {
     e.preventDefault();
     var content = jQuery('#sample_table tr'),
	 size = jQuery('#tbl_posts >tbody >tr').length + 1;
     element = null;
	 element = content.clone();
	 element.attr('id', 'rec-'+size);
	 element.find('.btn_delete').attr('row_id', size);
     element.appendTo('#tbl_posts_body');
     element.find('.sn').html(size);
     changeSelectID(element, size);
});

function changeSelectID(table, size){
	default_name = 'selected';
	table.find('.selects').each(function(){
		var ID = $(this).attr('id');
        $(document.getElementById(ID)).attr('id', default_name+size);
        console.log(document.getElementById(default_name+size));
    });
    console.log('changed!');
}

function apply(event){
    var actions_sel = document.getElementById('actions');
    var sel_index = actions_sel.selectedIndex;
    var list = [];
    if (sel_index == 0) { // delete selected option
        var obj = document.getElementsByClassName('selects');
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked == true) {
                list.push(obj[i].id);
            }
        }
        for (var j = 0; j < list.length; j++) {
            var row_num = list[j].charAt(8);
            jQuery('#rec-' + row_num).remove();
        }
    }
}

//referenced from https://www.codexworld.com/export-html-table-data-to-excel-using-javascript/
function exportTableToExcel(table_ID, filename=''){
    var wb = XLSX.utils.table_to_book(document.getElementById(table_ID));
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type:'binary'});

    function s2ab(s){
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i<s.length; i++){
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
    
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), filename);
}
