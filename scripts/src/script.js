/**
 * help: fadeout not working -- how to save as jq object to fade in -- regex for word counts
 */
function main() {

    //alert("hello world!");
	
	var i = 0;
	var textArray = new Array();
	var notFirst = false;
	var wordCounts = {};
	var wordCountsString;
	
	var searchTerm = $("#search_term_input").val();
	//alert(searchTerm);
	var s = new Spotter("twitter.search",
						{q:searchTerm, period:120},
						{buffer:true, bufferTimeout:750}
						);
	s.register(function(tweet) {
		var text = "<p id='theContent'>";
		var newTweet = new Array();
		newTweet = tweet.text.split(" ");
		
		//add words in newTweet to the word counts
		for (var i=0 ; i<newTweet.length ; i++) {
			var word = newTweet[i];
			if (wordCounts[word] === undefined) {
				wordCounts[word] = 1;
			}
			else {
				wordCounts[word]++;
			}
		}
		//turn wordCounts object in to a String
		wordCountsString = "<p id='theWordCounts'>";
		for (var w in wordCounts) {
			wordCountsString += w + ": " + wordCounts[w] + " - ";
		}
		wordCountsString += "</p>";
		//alert(wordCountsString);
		
		textArray = textArray.concat(newTweet);
		textArray.sort(randomSort);
		textArray.sort(randomSort);
		//alert(newTweet.toString());
		for (var i=0 ; i<textArray.length ; i++) {
			text = text + textArray[i] + " ";
		}
		text = text + ".</p>";
		//alert(text);
		if (notFirst) {
			$("#theContent").fadeOut();
			$("#theContent").remove();
			var contentObject = $(text);
			contentObject.hide();
			$("#content").append(contentObject);
			contentObject.fadeIn();
			$("#theWordCounts").fadeOut();
			$("#theWordCounts").remove();
			var wordCountsObject = $(wordCountsString);
			wordCountsObject.hide();
			$("#wordCountsDiv").append(wordCountsObject);
			wordCountsObject.fadeIn();
			
		} 
		else {
			$("#removeMe").remove();
			$("#content").append(text);
			$("#wordCountsDiv").append(wordCountsString);
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


$(document).ready(function() {
	$("#startButton").click(function(){
		main();
	});
});