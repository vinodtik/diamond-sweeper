$(document).ready(function(){

	/*-----------------------
	draw the table first
	-----------------------*/
	for(let row = 1; row<=8; row++){
		for(let col = 1; col<=8; col++){
			if(col == 1)
				$('.diamondsweeper-board tbody').append('<tr>');
			$('.diamondsweeper-board tbody').append('<td><div class="cell unknown"></div></td>');
		}
	}
	var remAttempt = 64;//total attempts
	var finalScore = 0;
	var diamondCount = 0;
	$('#attRemain').text(remAttempt);
	$('#finalScore').text(finalScore);
	var maxdiamond = 8;  // max number of diamonds
	var initialrow = 1;
	var initcol = 1;
	$('.cell').each(function(){
		 var cell = '#board tr:nth-child(' + initialrow + ') td:nth-child('+ initialrow +')';
		 // $(this).html(initcol);
		 $(this).attr("id", initcol);
        initcol++;

	});
	var diamondList = [];
	while(diamondList.length < 8){
		// random number from 0 to 64
		var randomNum = Math.floor(Math.random() * 64);
	    var actualNum = randomNum + 1;//to avoid zero
		if(diamondList.indexOf(actualNum) > -1)
			continue;//avoid duplicate numbers

	    diamondList.push(actualNum);
	}
	// console.log(diamondList);
	// prototype to check if contains clicked value in array
	Array.prototype.contains = function ( needle ) {
	   for (i in this) {
	       if (this[i] == needle) return true;
	   }
	   return false;
	}
	$('.cell').on('click',function(){
		let currentId = $(this).attr('id');
		// alert(currentId);
		if(remAttempt === 0){//out of attempts
			// alert('out of move');
			$('.overmsg').html('Out of move. Reset the Game')
			blink('.footer');
			return;
		}
		
		else if(diamondList.contains(currentId)){

			$(this).removeClass('unknown').fadeIn(1000);
		    $(this).addClass('diamond');
		    // rewrite final score
		    finalScore+=1;
		    remAttempt--;
		    diamondCount++;
		    if(diamondCount === 8){
		    	$('.overmsg').html('Congratulations!! You\'ve found all diamonds.')
				blink('.footer');
				return;
		    }
		    $('#finalScore').text(finalScore);
		    $('#attRemain').text(remAttempt);		  

		}
		else{
			remAttempt--;
		    $('#attRemain').text(remAttempt);
			$(this).css({'background-color':'#bc92ce', 'opacity':'0.3', 'cursor':'not-allowed'});
		}
	});
	$('.myBtn').on('click',function(){
		confirm('Do you really want to reload the game?');
		window.location.reload();
	});

	/*function to blink selector*/
	function blink(selector){
	$(selector).fadeOut('slow', function(){
	    $(this).fadeIn('slow', function(){
	        blink(this);
	    });
	});
	}
});