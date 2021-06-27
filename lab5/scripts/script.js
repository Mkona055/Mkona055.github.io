

var doctorChosen = "";

var dateSelected ="";
var timeSelected ="";
const setDateFormat = "dd/mm/yy";

function enableDate(dateform){
	var datefield = document.getElementsByName(dateform)[0];
	datefield.disabled = false;
}
function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() === 0 || date.getDay()===6){
        return [false];
    }
    if(doctorChosen == "Anny Joenas"){
    	if(date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5){
    		return [false];
    	}
    	return [true];
    }else if(doctorChosen == "Mary Easter"){
    	if(date.getDay() === 1 || date.getDay() === 3){
    		return [true];
    	}
    	return [false];
    }else{
    	if(date.getDay() === 5){
    		return [true];
    	}
    	return [false];
    }
    
}
$(document).ready(function(){

	$(document).on("scroll", function(){
	    if($(document).scrollTop() > 100){
	      $("#nav").addClass("fixed-top");
	      $("#navbarshort").prepend($("#img"));
	      $("#img").show()
	      
	    } else {
	      $("#nav").removeClass("fixed-top");
	      $("#img").hide();
	      
	    }
  	});

	$("#btnRoutine").on("click", function(){
		$(".modal-title").text("Prise de rendez-vous pour des soins de routine");
	});
	$("#btnTest").on("click", function(){
		$(".modal-title").text("Prise de rendez-vous pour des tests diagnostiques en clinique");
	});
	$("#btnChirurgie").on("click", function(){
		$(".modal-title").text("Prise de rendez-vous pour une chirurgie");
	});
	$("#btnDentisterie").on("click", function(){
		$(".modal-title").text("Prise de rendez-vous pour la dentisterie");
	});
	$("#btnVaccination").on("click", function(){
		$(".modal-title").text("Prise de rendez-vous pour la vaccination");
	});
	$(".invalid-feedback").hide();

	$(".learn_more").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    $("#bankCard").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    $("#confirmBtn").click(function(){
    	timeSelected = $("#time").val().toString();
    	
    	var dateOk = false;
    	if($("#date-form").prop("disabled") == true){
    		$(".alert").show();
    		$(".alertDate").hide();
    	}else{
    		var date = $("#date-form").datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
    		if(date == ""){
    			$(".alertDate").show();
    		}else{
    			dateSelected = $("#date-form").datepicker({ dateFormat: 'dd,MM,yyyy' }).val();
    			dateOk = true;
    		}
    		
    	}
    	if($("#form")[0].checkValidity() && dateOk){
    		$(".alertDate").hide();
    		$("#modal").modal('toggle');
    		$("#modalSuccess").modal('toggle');
    		$('#form').trigger("reset");
    		$(".mini").removeClass("active");
    		$("h6").removeClass("tle");
    		$('#docChosen').text(doctorChosen);
    		$('#dateReserv').text(dateSelected.toString());
    		$('#timeReserv').text(timeSelected.toString());
    	}else if (dateOk){
    		$(".modal-content").effect("shake");
    		$(".alertDate").hide();
    		$("#subBtn").click();
    	}else{
    		$(".modal-content").effect("shake");
    		$("#subBtn").click();
    	}
    	
    });

   

    $(".mini").click(function(){
    	$(".alert").hide();
    	$(".mini").removeClass("active");
    	$("h6").removeClass("tle");
    	$(this).toggleClass("active");
    	$(this).find("h6").addClass("tle");

    	var radio = $(this).find("input");
    	$(radio).prop("checked","true");

    	doctorChosen = $(radio).attr("id");
    	enableDate('date-form');

    	$('#date-form').datepicker('setDate', null);
    	$( "#date-form" ).datepicker(
	        {
	            // no calendar before June 1rst 2020
	            dateFormat:setDateFormat,
	            minDate: new Date(),
	            maxDate: '+4M',
	            // used to disable some dates
	            beforeShowDay: disableDates,
	            // used to disable some dates
	            
	        }
    	);

    	$('#modalSuccess').on('hidden.bs.modal', function () {
		     location.reload();
		});

    	
    });
    
});
