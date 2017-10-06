var WhatTimeIsIt = (function(){
	NUMBERS_AT_12 = {
		1 : "one",
		2 : "two",
		3 : "three",
		4 : "four",
		5 : "five",
		6 : "six",
		7 : "seven",
		8 : "eight",
		9 : "nine",
		10 : "ten",
		11 : "eleven",
		12 : "twelve"
	};
	NUMBERS_DECISIONS = {
		00 : "o' clock",
		30 : "half past",
		45 : "quarter to"
	};
	NUMBERS_AT_20 = {
		13 : "threeth",
		14 : "fourteen",
		15 : "fiveteen",
		16 : "sixteen",
		17 : "seventeen",
		18 : "eighteen",
		19 : "nineteen",
		20 : "twenty"
	};

	var convert = function(time_string){
		array_time = time_string.split(":")
		hour = parseInt(array_time[0]);
		minutes = parseInt(array_time[1]);
		next_hour = ((hour < 12) ? hour + 1 : 1);

		switch (true) {
			case (minutes == 00):
				return time_string + ": " + convert_hour(hour) + " " + NUMBERS_DECISIONS[minutes];
			case (minutes > 0 && minutes <= 29):
				return time_string + ": " + convert_minutes_first_half(minutes) + " " + convert_hour(hour);
			case (minutes == 30):
				return time_string + ": " + NUMBERS_DECISIONS[minutes] + " " + convert_hour(hour);
			case (minutes == 45):
				return time_string + ": " + NUMBERS_DECISIONS[minutes] + " " + convert_hour(next_hour);
			case (minutes > 31 && minutes <= 59):
				return time_string + ": " + convert_minutes_last_half(minutes) + " " + convert_hour(next_hour);
			default:
				return "Error!";
		}
	};

	var convert_hour = function(hour){
		return NUMBERS_AT_12[hour];
	};

	var convert_minutes = function(minutes, word_key){
		switch (true){
			case (minutes == 01):
				return NUMBERS_AT_12[minutes] + " minute " + word_key;
			case (minutes > 01 && minutes <= 12):
				return NUMBERS_AT_12[minutes] + " minutes " + word_key;
			case (minutes > 12 && minutes <= 29):
				array_minutes = minutes.toString().split('');
				decision = parseInt(array_minutes[0]);
				variant = parseInt(array_minutes[1]);
				if (decision !== 2){
					return NUMBERS_AT_20[minutes] + " minutes " + word_key;
				}else{
					return NUMBERS_AT_20[20] + ((NUMBERS_AT_12[variant]) ? " " + NUMBERS_AT_12[variant] : "") + " minutes " + word_key;
				}
			default:
				return "Error!";
		}
	}

	var convert_minutes_first_half = function(minutes){
		return convert_minutes(minutes, "past");
	};

	var convert_minutes_last_half = function(minutes){
		minutes = 60 - minutes
		return convert_minutes(minutes, "to");
	};

	return {
	  convert : convert
	};

})();

var its_time = WhatTimeIsIt;

console.log(its_time.convert("5:00"));

console.log(its_time.convert("5:01"));

console.log(its_time.convert("5:08"));

console.log(its_time.convert("5:10"));

console.log(its_time.convert("5:18"));

console.log(its_time.convert("5:25"));

console.log(its_time.convert("5:30"));

console.log(its_time.convert("5:35"));

console.log(its_time.convert("5:40"));

console.log(its_time.convert("5:45"));

console.log(its_time.convert("5:59"));

console.log(its_time.convert("12:40"));

console.log(its_time.convert("12:59"));
