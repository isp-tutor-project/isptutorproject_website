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
    var tbl1 = '';
    tbl1 +='<div class="table-wrapper">';
	tbl1 +='<table class="table table-hover" id="tbl_posts">';

		//--->create table header > start
		tbl1 +='<thead>';
			tbl1 +='<tr>';
			tbl1 +='<th>Pathway</th>';
      		tbl1 +='<th>Description</th>';
      		tbl1 +='<th></th>';
			tbl1 +='</tr>';
		tbl1 +='</thead>';
		//--->create table header > end

		//--->create table body > start
		tbl1 +='<tbody id="tbl_posts_body_pathway">';

			//--->create table body rows > start
			$.each(ajax_data, function(index, val) 
			{
				//you can replace with your database row id
				var row_id = random_id();

				//loop through ajax row data
				tbl1 +='<tr row_id="'+row_id+'">';
					tbl1 +='<td><div class="row_data" col_name="classname">'+val['classname']+'</div></td>';
          			tbl1 +='<td><div class="row_data" col_name="classcode">'+val['classcode']+'</div></td>';
                    tbl1 +='<td><a href="http://127.0.0.1:8000/teachers/pathway/edit/">Edit</a> | <a href="#">Delete</a></td>';
				tbl1 +='</tr>';
			});
            //--->create table body rows > end

		tbl1 +='</tbody>';
		//--->create table body > end

	tbl1 +='</table>';
	//--->create data table > end
    tbl1 +='</div>';
    
	//--->create data table > start
    var tbl2 = '';
    tbl2 +='<div class="table-wrapper">';
	tbl2 +='<table class="table table-hover" id="tbl_posts">';

		//--->create table header > start
		tbl2 +='<thead>';
			tbl2 +='<tr>';
			tbl2 +='<th>Class Name</th>';
      		tbl2 +='<th>Class Code</th>';
      		tbl2 +='<th></th>';
			tbl2 +='</tr>';
		tbl2 +='</thead>';
		//--->create table header > end

		//--->create table body > start
		tbl2 +='<tbody id="tbl_posts_body_class">';

			//--->create table body rows > start
			$.each(ajax_data, function(index, val) 
			{
				//you can replace with your database row id
				var row_id = random_id();

				//loop through ajax row data
				tbl2 +='<tr row_id="'+row_id+'">';
					tbl2 +='<td ><div class="row_data" col_name="pathname">'+val['pathname']+'</div></td>';
          			tbl2 +='<td ><div class="row_data" col_name="description">'+val['description']+'</div></td>';
                    tbl2 +='<td ><a href="http://127.0.0.1:8000/teachers/class/edit/">Edit</a> | <a href="http://127.0.0.1:8000/teachers/class/view/">View</a> | <a href="#">Delete</a></td>';
				tbl2 +='</tr>';
			});
            //--->create table body rows > end

		tbl2 +='</tbody>';
		//--->create table body > end

	tbl2 +='</table>';
	//--->create data table > end
    tbl2 +='</div>';
	//out put table data
    $(document).find('.tbl_user_data_pathways').html(tbl1);
    $(document).find('.tbl_user_data_classes').html(tbl2);
});

jQuery(document).delegate('a.add-record-pathway', 'click', function(e) {
    e.preventDefault();
    var content = jQuery('#sample_pathway_table tr'),
    size = jQuery('#tbl_posts >tbody >tr').length + 1;
    element = null;
    element = content.clone();
    element.attr('id', 'rec-'+size);
    element.find('.btn_delete').attr('row_id', size);
    element.appendTo('#tbl_posts_body_pathway');
    element.find('.sn').html(size);
});
jQuery(document).delegate('a.add-record-class', 'click', function(e) {
     e.preventDefault();
     var content = jQuery('#sample_class_table tr'),
	 size = jQuery('#tbl_posts >tbody >tr').length + 1;
     element = null;
	 element = content.clone();
	 element.attr('id', 'rec-'+size);
	 element.find('.btn_delete').attr('row_id', size);
     element.appendTo('#tbl_posts_body_class');
     element.find('.sn').html(size);
});

// no delete button in this html page yet
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