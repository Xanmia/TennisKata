class Tennis 

	@FirstPlayerScore 
    @SecondPlayerScore

	def begin
		@FirstPlayerScore = 0
		@SecondPlayerScore = 0
		loop{
			pickRandomScorer
			puts translateScore
			break if !checkforGameStatus?
		}
		
	end

	def pickRandomScorer
		scorer = rand(2)
		if scorer == 0
			playerOnePoint
		end
		if scorer == 1
			playerTwoPoint
		end
	end

	def playerOnePoint
		@FirstPlayerScore = @FirstPlayerScore + 1
	end

	def playerTwoPoint
		@SecondPlayerScore = @SecondPlayerScore + 1
	end

	def translatePoint(score)
		case score
		when 0
			return 0
		when 1
			return 15
		when 2
			return 30
		when 3
			return 40
		end
	end

	def checkforGameStatus?
		if @FirstPlayerScore >= 4 || @SecondPlayerScore >= 4
            if @FirstPlayerScore >= @SecondPlayerScore + 2 || @SecondPlayerScore >= @FirstPlayerScore + 2 
                return false
            end
        end
        return true
	end

	def translateScore
        if @FirstPlayerScore >= 4 || @SecondPlayerScore >= 4
            if @FirstPlayerScore == @SecondPlayerScore
                return "Deuce"
            end

            if @FirstPlayerScore >= @SecondPlayerScore + 2
                return "First Player Wins"
            end

            if @SecondPlayerScore >= @FirstPlayerScore + 2
                return "Second Player Wins"
            end

            if @SecondPlayerScore > @FirstPlayerScore
                return "Advantage Second Player"
            end

            if @SecondPlayerScore < @FirstPlayerScore
                return "Advantage First Player"
            end
        elseif @FirstPlayerScore == 3 && @SecondPlayerScore == 3
                return "Deuce"
            
        end

        return "Player One Score: " + translatePoint(@FirstPlayerScore).to_s + " Player Two Score: " + translatePoint(@SecondPlayerScore).to_s
    end
	
end

if __FILE__ == $0

	game = Tennis.new
	game.begin

end