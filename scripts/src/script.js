/**
 * This is the entry point for our JavaScript program
 */
function main() {

    //alert("hello world!");
	
	var i = 0;
	
	var s = new Spotter("twitter.search",
						{q:"bieber", period:120},
						{buffer:true, bufferTimeout:750}
						);
	s.register(function(tweet) {
		
		//stuff to do when spotter do

	});
	
	s.start();

    //your tasks

    //1. Create a spotter and get it to insert tweets into the DOM
    //2. Add profile images (tweet.profile_image_url)
    //3. Make the tweets occur so the most recent are at the top
    //4. Make the tweets slide down
    //5. Alternate the colors or the background of the tweets
    //6. Show a maximum of 10 tweets at a time (remove old tweets from the dom)


}

$(document).ready(function() {
	main();
});
