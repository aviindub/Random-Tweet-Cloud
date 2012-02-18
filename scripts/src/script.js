/**
 * This is the entry point for our JavaScript program
 */
function main() {

    //alert("hello world!");
	
	var i = 0;
	var textArray = new Array();
	var notFirst = false;
	
	var searchTerm = $(#"startButton").value;
	var s = new Spotter("twitter.search",
						{q:searchTerm, period:120},
						{buffer:true, bufferTimeout:750}
						);
	s.register(function(tweet) {
		var text = "<p id='theContent'>";
		var newTweet = new Array();
		newTweet = tweet.text.split(" ");
		textArray.concat(newTweet);
		textArray.sort(randomSort);
		for (int i=0 ; i<textArray.length ; i++)
			text.concat(newTweet[i] + " ");
		}
		text.concat(".</p>")
		if (notFirst) {
			$(#"theContent").remove();
			$(#"content").append(text);
		} else {
			$(#"removeMe").remove();
			$(#"content").append(text);
			notFirst = true;
		}

	});
	
	s.start();


}

function randomSort(a,b) {
    // Get a random number between 0 and 10
    var temp = parseInt( Math.random()*10 );

    // Get 1 or 0, whether temp is odd or even
    var isOddOrEven = temp%2;

    // Get +1 or -1, whether temp greater or smaller than 5
    var isPosOrNeg = temp>5 ? 1 : -1;

    // Return -1, 0, or +1
    return( isOddOrEven*isPosOrNeg );
}

/**
$(document).ready(function() {
	main();
});
**/