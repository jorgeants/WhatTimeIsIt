class WhatTimeIsIt
	
	NUMBERS_AT_12 = {
		1 => "one",
		2 => "two",
		3 => "three",
		4 => "four",
		5 => "five",
		6 => "six",
		7 => "seven",
		8 => "eight",
		9 => "nine",
		10 => "ten",
		11 => "eleven",
		12 => "twelve"
	}
	NUMBERS_DECISIONS = {
		00 => "o' clock",
		30 => "half past",
		45 => "quarter to"
	}
	NUMBERS_AT_20 = {
		13 => "threeth",
		14 => "fourteen",
		15 => "fiveteen",
		16 => "sixteen",
		17 => "seventeen",
		18 => "eighteen",
		19 => "nineteen",
		20 => "twenty"
	}

	def initialize
	end

	def convert(time_string)
		array_time = time_string.split(":")
		hour = array_time.first.to_i
		minutes = array_time.last.to_i
		next_hour = hour < 12 ? hour + 1 : 1
		case minutes
		when 00
			"#{time_string}: #{convert_hour hour} #{NUMBERS_DECISIONS[minutes]}"
		when 01..29
			"#{time_string}: #{convert_minutes_first_half minutes} #{convert_hour hour}"
		when 30
			"#{time_string}: #{NUMBERS_DECISIONS[minutes]} #{convert_hour hour}"
		when 45
			"#{time_string}: #{NUMBERS_DECISIONS[minutes]} #{NUMBERS_AT_12[next_hour]}"
		when 31..59
			"#{time_string}: #{convert_minutes_last_half minutes} #{convert_hour next_hour}"
		else
			"Error!"
		end
	end

	def convert_hour(hour)
		NUMBERS_AT_12[hour]
	end

	def convert_minutes(minutes, key_word)
		case minutes
		when 01
			"#{NUMBERS_AT_12[minutes]} minute #{key_word}"
		when 02..12
			"#{NUMBERS_AT_12[minutes]} minutes #{key_word}"
		when 13..29
			array_minutes = minutes.to_s.split('')
			decision = array_minutes.first.to_i
			variant = array_minutes.last.to_i
			if decision != 2
				"#{NUMBERS_AT_20[minutes]} minutes #{key_word}"
			else
				"#{NUMBERS_AT_20[20]}#{" " + NUMBERS_AT_12[variant] if NUMBERS_AT_12[variant]} minutes #{key_word}"
			end
		else
			"Error!"
		end
	end

	def convert_minutes_first_half(minutes)
		convert_minutes(minutes, "past")
	end

	def convert_minutes_last_half(minutes)
		minutes = 60 - minutes
		convert_minutes(minutes, "to")
	end

end


its_time = WhatTimeIsIt.new

puts its_time.convert "5:00"

puts its_time.convert "5:01"

puts its_time.convert "5:08"

puts its_time.convert "5:10"

puts its_time.convert "5:18"

puts its_time.convert "5:25"

puts its_time.convert "5:30"

puts its_time.convert "5:35"

puts its_time.convert "5:40"

puts its_time.convert "5:45"

puts its_time.convert "5:59"

puts its_time.convert "12:40"

puts its_time.convert "12:59"
