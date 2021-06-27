
function enableDate(dateform){
	var datefield = document.getElementsByName(dateform)[0];
	datefield.disabled = false;
}

var doctorChosen = "";
const setDateFormat = "dd/mm/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() === 0 || date.getDay()===6){
        return [false];
    }
    if(doctorChosen == "Anny"){
    	if(date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 5){
    		return [false];
    	}
    	return [true];
    }else if(doctorChosen == "Mary"){
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

	$(".minicard-title").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    $("#confirmBtn").click(function(){
    	var dateOk = false;
    	if($("#date-form").prop("disabled") == true){
    		$(".alert").show();
    		$(".alertDate").hide();
    	}else{
    		var date = $("#date-form").datepicker('getDate');
    		if(date == null){
    			$(".alertDate").show();
    		}else{
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
    		$('.radioBtn').prop("checked","false");
    		$('.radioBtn').attr("checked","false");
    	}else if (dateOk){
    		$(".modal-content").effect("shake");
    		$(".alertDate").hide();
    	}else{
    		$(".modal-content").effect("shake");
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
