
function TennisGame() {

    //$scope.output = [
    //    {text:'Game started'}
    //];

    this.FirstPlayerScore = 0;
    this.SecondPlayerScore = 0;

   // Begin();

    function Begin() {
        while (CheckForGameStatus()) {
            pickRandomScorer() 
            $scope.output.push(TranslateScore());
        }
    }

    this.pickRandomScorer = function () {
        var scorer = Math.round((Math.random() * 1) + 1);
        if (scorer == 1) {
            this.playerOnePoint();
        }
        else if (scorer == 2) {
            this.playerTwoPoint();
        }
    }

    this.playerOnePoint = function() {
        this.FirstPlayerScore++;
    }

    this.playerTwoPoint = function() {
        this.SecondPlayerScore++;
    }

    this.TranslatePoint = function(score) {
        switch (score) {
            case 0:
                return 0;
            case 1:
                return 15;
            case 2:
                return 30;
            case 3:
                return 40;
        }
    }

    this.TranslateScore = function () {
        if (this.FirstPlayerScore >= 4 || this.SecondPlayerScore >= 4)
        {
            if (this.FirstPlayerScore == this.SecondPlayerScore) {
                return 'Deuce'
            }

            if ((this.FirstPlayerScore >= this.SecondPlayerScore + 2)) {
                return 'First Player Wins'
            }

            if (this.SecondPlayerScore >= this.FirstPlayerScore + 2) {
                return 'Second Player Wins'
            }

            if (this.SecondPlayerScore > this.FirstPlayerScore) {
                return 'Advantage Second Player'
            }

            if (this.SecondPlayerScore < this.FirstPlayerScore) {
                return 'Advantage First Player' 
            }
        }
        else if (this.FirstPlayerScore == 3 && this.SecondPlayerScore == 3) {
                return 'Deuce'
        }

        return 'Player One Score:' + this.TranslatePoint(this.FirstPlayerScore) + ' Player Two Score: ' + this.TranslatePoint(this.SecondPlayerScore)
    }

    this.CheckForGameStatus = function () {
        if (this.FirstPlayerScore >= 4 || this.SecondPlayerScore >= 4) {
            if ((this.FirstPlayerScore >= this.SecondPlayerScore + 2) || (this.SecondPlayerScore >= this.FirstPlayerScore + 2)) {
                return false;
            }
        }
        return true;
    }
}