$("body").on('click', function(event){
	$.ajax({
		url:'api/post',
		success: function(quote){
			console.log("mostly got it");
			console.log("text " + quote.text);
			$('.text').html(quote.text/*"Text"*/);
			$('.author').html(quote.author/*"Nourhan"*/);
		}
	});
	$.ajax({
		url:'api/posts',
		success: function(quotes){
			// console.log("mostly got it");
			console.log(quotes);
			// $('.text').html(quote.text/*"Text"*/);
			// $('.author').html(quote.author/*"Nourhan"*/);
		}
	});
});