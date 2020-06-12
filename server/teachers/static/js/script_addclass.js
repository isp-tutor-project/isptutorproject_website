$(document).ready(function()
{   
    document.getElementById("editclass").disabled = true;
    document.getElementById("deleteclass").disabled = true;
    document.getElementById("viewclass").disabled = true;
    var clickBtn = document.getElementById("addclass");
    clickBtn.addEventListener('click', function(event){
        document.getElementById("editclass").disabled = false;
        document.getElementById("deleteclass").disabled = false;
        document.getElementById("viewclass").disabled = false;
        var classname = document.getElementById("class").value;
        document.getElementById("cardname").innerHTML = "Edit Class: " + classname;
        clearTextBox();
    });
    
});

function clearTextBox(){
    document.getElementById('class').value = "";
    document.getElementById('classcode').value = "";
    document.getElementById('school').value = "";
}