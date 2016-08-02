var whatDate = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output = month + '/' + day +'/' + d.getFullYear();
	return output;
}
var whatTime = function(){
	return AMPM(rawTime());
}
var rawTime = function(){
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	if (minutes<10){minutes='0'+minutes}
	var output = hours + ':' + minutes;
	return output;
}
var AMPM = function(time){
	var time_split = time.split(":");
	var hours = time_split[0];
	var minutes = time_split[1];
	if (hours<12){
		var am_pm=' AM';
	}else if(hours>=12){
		var am_pm=' PM';
	}
	if (hours==0){
		hours=12
	}else if (hours>12){
		hours=hours-12;
	}
	var new_time=hours+':'+minutes+am_pm;
	return new_time;
}
var unAMPM=function(time){
	var time_split=time.split(":");
	var hours=time_split[0];
	var minutes_split=time_split[1].split(' ');
	var minutes=minutes_split[0];
	var am_pm=minutes_split[1];
	if (am_pm=='AM'){
		hours=hours;
	}else if(am_pm=='PM'&&hours!=12){
		hours=hours-12;
	}
	var parsed_hours=parseInt(hours, 10)
	var parsed_minutes=parseInt(minutes, 10)
	var new_time=parsed_hours+':'+parsed_minutes;
	return new_time;
}

var whatMeal = function(){
	var d = new Date();
	var hours = d.getHours();
	if (hours<=11){
		$('#meal_input').val('Breakfast');}
	else if (hours>11&&hours<=16){
		$('#meal_input').val('Lunch');}
	else if(hours>16){
		$('#meal_input').val('Dinner');}
}
var makePressure = function(){
	$('#add_pressure').click(function(){
		var date_text = whatDate();
		var time_text = whatTime();
		var systolic_text = $('#systolic_input').val();
		var diastolic_text = $('#diastolic_input').val();
		if (systolic_text !='' && diastolic_text !=''){
			$('#edit_pressure').show();
			$('#pressure_log').prepend('<tr><td class="date_pressure_col">'+date_text+'</td> <td class="pressure_col"><span class="static_pressure">'+systolic_text+' / '+diastolic_text+'</span><span><input class="edit_pressure" type="text" value="'+systolic_text+' / '+diastolic_text+'"/> </span></td><td class="time_pressure_col">'+time_text+'</td><td class="delete_pressure_col delete_col"><i class="icon-remove-sign icon-large"></i></td></tr>');

		//all this code is edit-button stuff. could it be simplified?
		//the edit pressure button just disappeared, but it looks better
			$('.edit_pressure').hide();
			$('.static_pressure').show();
			$('#edit_pressure').val('Edit');
			$('#edit_pressure').unbind('click').click(function(){
				if ($('#edit_pressure').val()=='Edit'){
					$('#edit_pressure').val('Done');
					$('.pressure_col').each(function(){
						$(this).find('.static_pressure').hide();
						$(this).find('.edit_pressure').show();
					});
				}
				else if($('#edit_pressure').val()=='Done'){
					$('#edit_pressure').val('Edit');
					$('.pressure_col').each(function(){
						$(this).find('.static_pressure').show();
						$(this).find('.edit_pressure').hide();
						$(this).find('.static_pressure').text( $(this).find('.edit_pressure').val());
					});
				 }
			});

			//is this redundant? should it just be in doc-ready text?...no but then the handler will be put on only existing ones
		$('.icon-remove-sign').unbind('click').click(function(){
			if(confirm('Are you sure you want to delete this row?')){
				$(this).parents('tr').remove();
				if($('#pressure_log tr').length<1){
					$('#edit_pressure').hide();
				}  //make a no-content message
			}
		});
		$('#systolic_input').val('');
		$('#diastolic_input').val('');
		}
	});
}
var makeSugar=function(){
$('#add_sugar').click(function(){
	var reading_text = $('#reading_input').val();
	if (reading_text !=''){
		$('#edit_sugar').show();
		var date_text = whatDate();
		var time_text = whatTime();
		if ($('#meal_input').val()!='None Selected'){
			var meal_text = $('#meal_input').val();}
		else {
			var meal_text = '';}
		if ($('#before_after_input').val()=='Before Eating'){
			var before_after_text = 'Before';
			$('#before_after_input').val('After Eating')}
		else if ($('#before_after_input').val()=='After Eating'){
			var before_after_text = 'After';}
		else{
			var before_after_text = '';}
		//setting before/after meal things
		if($('#sugar_log tr').first().find('.before_after_col').text()=='Before' &&
		$('#sugar_log tr').first().find('.date_sugar_col').text()==date_text &&
		$('#sugar_log tr').first().find('.meal_col').text()==meal_text &&
		before_after_text == 'After' &&
		$('#sugar_log tr').first().find('.date_sugar_col').attr('rowspan')!=2){
			$('#sugar_log tr').first().find('.date_sugar_col').attr('rowspan','2');
			$('#sugar_log tr').first().find('.meal_col').attr('rowspan','2');
			$('#sugar_log tr').first().after('<tr class="short_row"><td class="before_after_col">'+before_after_text+'</td><td class="reading_col"><span class="static_sugar">'+reading_text+'</span><input type="text" value="'+reading_text+'" class="editable_sugar"/></td><td class="time_sugar_col">'+time_text+'</td><td class="delete_sugar_col delete_col"><i class="icon-remove-sign icon-large"></i></td></tr>');

			}
		else{
			$('#sugar_log').prepend('<tr> <td class="date_sugar_col">'+ date_text+'</td> <td class="meal_col">'+meal_text+'</td><td class="before_after_col">'+before_after_text+'</td><td class="reading_col"><span class="static_sugar">'+reading_text+'</span><input type="text" value="'+reading_text+'" class="editable_sugar"/></td><td class="time_sugar_col">'+time_text+'</td><td class="delete_pressure_col delete_col"><i class="icon-remove-sign icon-large"></i></td></tr>');
		}
		$('.icon-remove-sign').unbind('click').click(function(){
			if(confirm('Are you sure you want to delete this row?')){

				$(this).parents('tr').prev().find('.date_sugar_col').attr('rowspan','1');
				$(this).parents('tr').prev().find('.meal_col').attr('rowspan','1');

				var date_text=$(this).parents('tr').find('.date_sugar_col').text();
				var meal_text=$(this).parents('tr').find('.meal_col').text();
				$(this).parents('tr').next('.short_row').prepend('<td class="date_sugar_col">'+ date_text+'</td> <td class="meal_col">'+meal_text+'</td>');
				$(this).parents('tr').next('.short_row').removeClass('short_row');

				$(this).parents('tr').remove();
				if($('#sugar_log tr').length<1){
					$('#edit_sugar').hide();
					//$('#no_sugar').show();
				}
			}
		});
		$('#edit_sugar').unbind('click').click(function(){
				if ($('#edit_sugar').val()=='Edit'){
					$('#edit_sugar').val('Done');
					$('.reading_col').each(function(){
						$(this).find('.static_sugar').hide();
						$(this).find('.editable_sugar').show();
					});
				}
				else if($('#edit_sugar').val()=='Done'){
					$('#edit_sugar').val('Edit');
					$('.reading_col').each(function(){
						$(this).find('.static_sugar').show();
						$(this).find('.editable_sugar').hide();
						$(this).find('.static_sugar').text( $(this).find('.editable_sugar').val());
					});
				 }
		});
		$('.editable_sugar').hide();
		$('#reading_input').val('');
	}
	});
}
var pillLog=function(name_text){
	$('#pill_log').prepend('<tr><td class="date_pill_col">'+whatDate()+'</td> <td class="name_pill_col">'+name_text+'</td> <td class="time_pill_col">'+whatTime()+'</td><td class="delete_pill_col delete_col"><i class="icon-remove-sign icon-large"></i></td></tr>')

	$('.icon-remove-sign').unbind('click').click(function(){
			if(confirm('Are you sure you want to delete this row?')){
				$(this).parents('tr').remove();
				//there is no edit button for pill log!
				//if($('#pill_log').length<1){
				//	$('#edit_pressure').hide();
				//}  make a no-content message
			}
	});
}
var makeMed=function(){
	$('#add_med').click(function(){
		//if ($(this).parents('.slide-panel').hasClass('left')){}
		var name_text=$('#name_input').val();
		var dosage_text=$('#dosage_input').val();
		var time_text=$('#time_input').val();
		if (time_text!=''){
			var time_ampm_text=AMPM(time_text);
		}else{
			var time_ampm_text="";
		}
		var color_text =$('#color_input').val();
		var alreadyPill=function(){
			var no_pill;
			$('.pill').each(function(){
				if ($(this).find('.name_class').text() == name_text){
					no_pill=false;
					return false;
				}else{
				 	no_pill=true;
					return true;
				}
			});
			return no_pill;
		}
		if(alreadyPill()==false){
			alert('You already have a medication called '+name_text+'!');
		}
		else if (name_text != ''){
				$("#no_tasks").hide();
				makePill(name_text,dosage_text,time_text,time_ampm_text);
				colorPill(color_text);
				$('#name_input').val('');
				$('#dosage_input').val('');
				$('#time_input').val('');
				$('#color_input').val('Gray');

				$('#more_options').hide();
		}
	});
}
var makePill=function(name_text,dosage_text,time_text,time_ampm_text){
		$('#list').append('<div class="med_class"><div class="btn med_small"><span class="name_class">'+name_text + '</span></br> Dosage: <span class="dosage_class">' + dosage_text + '</span></br>Time: <span class="time_class">'+ time_ampm_text+ '</span></div>         <div class="btn med_form"><div  class="input-group" action="todo.html"><label for="name">Name of drug:</label><input type="text" name="name" class="name_update" value="'+name_text+'" placeholder="e.g. Tylenol" /><label for="dosage">Dosage:</label><input type="text" name="dosage" class="dosage_update" value="'+dosage_text+'" placeholder="e.g. 200mg" /><label for="time">Time:</label><input type="time" name="time" class="time_update" value="'+time_text+'"/></br><input type="submit" value="Update" class="btn btn-primary update_button"/><input type="submit" value="Cancel" class="btn cancel_button"/><input type="submit" value="Delete" class="btn delete_button"/></div></div></div>');
		$('#pill_screen').append('<div class="btn-group pill"><button class="btn  when_taken"><span class= "name_class">'+name_text+'</span> </button><button type="button" class="btn dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu"><li><a>Dosage: <span class="dosage_class">'+ dosage_text+'</span></a></li> <li><a>Time: <span class="time_class">'+time_text+'</span></a></li></ul></div>');

	//fix so that it doesn't close all the forms when add is clicked
		$('.med_form').hide();
		$('.med_small').show();
		$('.med_small').click(function(){
			$(this).hide();
			$(this).siblings('.med_form').show();
			});
		$('.update_button').click(function(){
			var old_name = $(this).parents(".med_class").find('.name_class').text();
			var new_name = $(this).siblings('.name_update').val();
			var new_dosage = $(this).siblings('.dosage_update').val();
			var new_time = $(this).siblings('.time_update').val();
				if (new_time!=''){
					new_time=AMPM(new_time);
				}

			//check each pill and reset names
			$('.pill').each(function(){
				if ($(this).find('.name_class').text() == old_name){
					$(this).find('.name_class').text(new_name);
					$(this).find('.dosage_class').text(new_dosage)
					$(this).find('.time_class').text(new_time)
				};
			});
			//updates info button
			$(this).parents(".med_class").find('.name_class').text(new_name);
			$(this).parents(".med_class").find('.dosage_class').text(new_dosage);
			$(this).parents(".med_class").find('.time_class').text(new_time);

			//toggle big screen hiding
			$(this).parents('.med_form').hide();
			$(this).parents('.med_form').siblings('.med_small').show();
		});

		$('.delete_button').click(function(){
			var old_name = $(this).parents(".med_class").find('.name_class').text();
			if(confirm('Are you sure you want to delete '+old_name+'?')){
				$('.pill').each(function(){
					if ($(this).find('.name_class').text() == old_name){
						$(this).remove();
					};
				});
				$(this).parents(".med_class").remove();
				if($('#list div').length==0){
					$("#no_tasks").show();}
			}
		});
		$('.cancel_button').click(function(){
			 // when you click again the text inside changes back
			$(this).parents('.med_form').find('.name_update').val( $(this).parents('.med_class').find('.med_small').find('.name_class').text());
			$(this).parents('.med_form').find('.dosage_update').val( $(this).parents('.med_class').find('.med_small').find('.dosage_class').text());

			//this doesn't change back -un ampm doesn't work
			//$(this).parents('.med_form').find('.time_update').val(
			if ($(this).parents('.med_class'). find('.med_small').find('.time_class') .text()!=''){$(this).parents('.med_form').find('.time_update').val( unAMPM($(this).parents('.med_class').find('.med_small').find('.time_class').text()));}

			//toggle big screen hiding
			$(this).parents('.med_form').hide();
			$(this).parents('.med_form').siblings('.med_small').show();
		});

		$('.when_taken').unbind('click').click(function(){
			if ($(this).parents('.which_pill').attr('id') == 'pill_screen'){
				$(this).parents('.pill').appendTo($('#pill_bottle'));
				pillLog($(this).find('.name_class').text());
				}
			else if ($(this).parents('.which_pill').attr('id') == 'pill_bottle'){
				$('#pill_screen').append($(this).parents('.pill'));
				//take something away from pill log
			}
			return false;
		});

	};
var colorPill=function(color_text){
		$('.pill').each(function(){
			if ($(this).find('.name_class').text() == $('#name_input').val()){
				if (color_text == 'Blue'){
					$(this).find('.btn').addClass('btn-primary');}
				else if (color_text == 'Green'){
					$(this).find('.btn').addClass('btn-success');}
				else if (color_text == 'Teal'){
					$(this).find('.btn').addClass('btn-info');}
				else if (color_text == 'Orange'){
					$(this).find('.btn').addClass('btn-warning');}
				else if (color_text == 'Red'){
					$(this).find('.btn').addClass('btn-danger');}
				};
});

	};

	$(document).ready(function(){
		$('#more_options').hide();
		makeMed();
		$('.more_button').click(function(){
			$('#more_options').show();
		});
		$('#edit_pressure').hide();
		$('#edit_sugar').hide();
		whatMeal();
		$('#before_after_input').val('Before Eating');
		makePressure();
		makeSugar();
		$('.icon-plus-sign').hide();
		$('.icon-minus-sign').show();
		$('.size_toggle').unbind('click').click(function(){
			$(this).parents('.widget').find('.max_class').toggle();
			if ($(this).hasClass('icon-minus-sign') || $('#pressure_log tr').length<1){
				$('#edit_pressure').hide();
			}
			if ($(this).hasClass('icon-minus-sign') || $('#sugar_log tr').length<1){
				$('#edit_sugar').hide();
			}
			//min/max buttons
			$(this).toggle();
			$(this).siblings('.size_toggle').toggle();
		});
	})
