/**
 * 
 */
function main() {


	var i = 0;
	var textArray = new Array();
	var notFirst = false;
	var wordCounts = {};
	var wordCountsString;
	
	//get the search term from the input box
	var searchTerm = $("#search_term_input").val();
	
	//initialize spotter
	var s = new Spotter("twitter.search",
						{q:searchTerm, period:120},
						{buffer:true, bufferTimeout:750}
						);
	
	//define callback function that will run each time spotter polls
	s.register(function(tweet) {
		var text = "<p id='theContent' style='border-style:solid; border-width:5px; padding:10px'>";
		var newTweet = new Array();
		newTweet = tweet.text.split(" ");
		
		//add words in newTweet to the word counts
		for (var i=0 ; i<newTweet.length ; i++) {
			var word = newTweet[i].toLowerCase();
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

		//add the new tweet to the textArray and randomize
		//then randomize again for extra goodness
		textArray = textArray.concat(newTweet);
		textArray.sort(randomSort);
		textArray.sort(randomSort);

		//assemble the textArray in to a string and add font sizes to words that appear multiple times
		for (var i=0 ; i<textArray.length ; i++) {
			if (wordCounts[textArray[i].toLowerCase()] === 1) {
				text = text + textArray[i] + " ";
			}
			else if (wordCounts[textArray[i].toLowerCase()] > 5) {
				text = text + "<font size='5'>" + textArray[i] + " </font>" ;
			}
			else {
				text = text + "<font size='" + wordCounts[textArray[i]] + "'>" + textArray[i] + " </font>" ;
			}
		}
		text = text + ".</p>";

		
		if (notFirst) {
			//fade out previously added content and fade in new versions
			$("#theContent").fadeOut();
			$("#theContent").remove();
			var contentObject = $(text);
			contentObject.hide();
			$("#content").append(contentObject);
			contentObject.fadeIn();
			
			/** this code displays the word counts
			$("#theWordCounts").fadeOut();
			$("#theWordCounts").remove();
			var wordCountsObject = $(wordCountsString);
			wordCountsObject.hide();
			$("#wordCountsDiv").append(wordCountsObject);
			wordCountsObject.fadeIn();
			**/
		} 
		else {
			//first pass... remove the search input and add the results
			$("#removeMe").remove();
			$("#content").append(text);
			//$("#wordCountsDiv").append(wordCountsString);
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