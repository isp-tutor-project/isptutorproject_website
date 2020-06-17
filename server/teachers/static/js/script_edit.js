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
	tbl +='<table class="table table-hover" id="tbl_posts">'

		//--->create table header > start
		tbl +='<thead>';
			tbl +='<tr>';
			tbl +='<th>Select</th>';
			tbl +='<th>User ID</th>';
      		tbl +='<th>Pathway</th>';
      		tbl +='<th>Options</th>';
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

					//--->edit options > start
					tbl +='<td>';
					
						tbl +='<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit </a> </span>';
						//only show this button if edit button is clicked
						tbl +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>';
						tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>';
                        tbl +='<span class="btn_delete"> <a href="#" class="btn btn-link" row_id="'+row_id+'" > Delete Row</a> </span>';

					tbl +='</td>';
					//--->edit options > end
					
				tbl +='</tr>';
			});
            //--->create table body rows > end

		tbl +='</tbody>';
		//--->create table body > end

	tbl +='</table>'	
	//--->create data table > end

	//out put table data
	$(document).find('.tbl_user_data').html(tbl);
	$(document).find('.btn_save').hide();
	$(document).find('.btn_cancel').hide();
    $(document).find('.btn_delete').hide();


	//--->make div editable > start
	$(document).on('click', '.row_data', function(event) 
	{
		event.preventDefault(); 

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		//make div editable
		$(this).closest('div').attr('contenteditable', 'true');
		//add bg css
		$(this).addClass('bg-warning').css('padding','5px');

		$(this).focus();
	})	
	//--->make div editable > end


	//--->save single field data > start
	$(document).on('focusout', '.row_data', function(event) 
	{
		event.preventDefault();

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		var row_id = $(this).closest('tr').attr('row_id'); 
		
		var row_div = $(this)				
		.removeClass('bg-warning') //add bg css
		.css('padding','')

		var col_name = row_div.attr('col_name'); 
		var col_val = row_div.html(); 

		var arr = {};
		arr[col_name] = col_val;

		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});

		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');
		
	})	
	//--->save single field data > end

 
	//--->button > edit > start	
	$(document).on('click', '.btn_edit', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		tbl_row.find('.btn_save').show();
		tbl_row.find('.btn_cancel').show();
    	tbl_row.find('.btn_delete').show();

		//hide edit button
		tbl_row.find('.btn_edit').hide(); 

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('contenteditable', 'true')
		.attr('edit_type', 'button')
		.addClass('bg-warning')
		.css('padding','3px')

		//--->add the original entry > start
		tbl_row.find('.row_data').each(function(index, val) 
		{  
			//this will help in case user decided to click on cancel button
			$(this).attr('original_entry', $(this).html());
		}); 		
		//--->add the original entry > end

	});
	//--->button > edit > end


	//--->button > cancel > start	
	$(document).on('click', '.btn_cancel', function(event) 
	{
		event.preventDefault();

		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		//hide save and cancel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();
    	tbl_row.find('.btn_delete').hide();
		//show edit button
		tbl_row.find('.btn_edit').show();

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		tbl_row.find('.row_data').each(function(index, val) 
		{   
			$(this).html( $(this).attr('original_entry') ); 
		});  
	});
	//--->button > cancel > end

	
	//--->save whole row entery > start	
	$(document).on('click', '.btn_save', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		
		//hide save and cacel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();
    	tbl_row.find('.btn_delete').hide();

		//show edit button
		tbl_row.find('.btn_edit').show();


		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		//--->get row data > start
		var arr = {}; 
		tbl_row.find('.row_data').each(function(index, val) 
		{   
			var col_name = $(this).attr('col_name');  
			var col_val  =  $(this).html();
			arr[col_name] = col_val;
		});
		//--->get row data > end

		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});

		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
		 

	});
    //--->save whole row entery > end


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
	 changeCheckboxID(element, size);
});

function changeSelectID(table, size){
	default_name = 'pathopts';
	table.find('select').each(function(){
		var ID = $(this).attr('id');
		$(document.getElementById(ID)).attr('id', default_name+size);
	});
}

function changeCheckboxID(table, size) {
	table.find(':checkbox').each(function() {
		var default_name = $(this).attr('class');
		var ID = $(this).attr('id');
		$(document.getElementById(ID)).attr('id', default_name+size);
	});
}

function clearSel(row_num) {
	var list = ['RQ-WE', 'RQ-GR', 'BRM-WE', 'BRM-GR', 'Hypothesis-WE', 'Hypothesis-GR',
	 'PEM-WE', 'PEM-GR', 'Materials-WE', 'Materials-GR', 'DI-WE', 'DI-GR', 'DC-WE', 'DC-GR'];
    for (var i = 0; i < list.length; i++) {
		var cbid = list[i] + row_num;
		document.getElementById(cbid).checked = false;
}
}

function changeSel(event) {
	var sel = event.target;
	var row_num = sel.id.charAt(8);
	var sel_index = sel.selectedIndex;
	var list, cbid; // LISTS acquired through django backend (HOW)
	if (sel_index == 1) { // stored pathway1
		list = ['RQ-WE', 'BRM-GR', 'Hypothesis-WE', 'PEM-WE', 'Materials-GR', 'DI-GR', 'DC-WE'];
	}
	else if (sel_index == 2) { // stored pathway2
		list = ['RQ-GR', 'BRM-GR', 'Hypothesis-WE', 'PEM-GR', 'Materials-WE', 'DI-WE', 'DC-GR'];
	}
	else list = [];
	clearSel(row_num);
	for (var i = 0; i < list.length; i++) {
			cbid = list[i] + row_num;
			document.getElementById(cbid).click();
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
