function TennisGame($scope) {

    $scope.output = [
        {text:'Game started'}
    ];

    var gameEnabled = true;
    var FirstPlayerScore = 0;
    var SecondPlayerScore = 0;
    var gametext;

    Begin();

    function Begin() {

        while (gameEnabled == true) {
            CheckScoreToAdd(pickRandomScorer());
            if (validateScore()) {
                listScore();
            }
        }
    }

    function listScore() {
        $scope.output.push({ text: 'Player One Score:' + FirstPlayerScore + ' Player Two Score: ' + SecondPlayerScore });
    }

    function pickRandomScorer() {
        var scorer = Math.round((Math.random() * 1) + 1);
        if (scorer == 1) {
            return {PreviousScore: FirstPlayerScore, player: 1};
        }
        else if (scorer == 2) {
            return { PreviousScore: SecondPlayerScore, player: 2 };
        }
    }

    function CheckScoreToAdd(scoredBy)
    {
        if (scoredBy.PreviousScore == 0) {
            scoredBy.PreviousScore += 15;
        }
        else if (scoredBy.PreviousScore == 15) {
            scoredBy.PreviousScore += 15;
        }
        else if (scoredBy.PreviousScore == 30) {
            scoredBy.PreviousScore += 10;
        }
        else if (scoredBy.PreviousScore > 30) {
            scoredBy.PreviousScore += 10;
        }

        if (scoredBy.player == 1){
            FirstPlayerScore = scoredBy.PreviousScore;
        }
        else if (scoredBy.player == 2) {
            SecondPlayerScore = scoredBy.PreviousScore;
        }

    }

    function validateScore() {
        if (FirstPlayerScore == 40 && SecondPlayerScore == 40) {
            $scope.output.push({ text: ' Deuce ' });
            return false;
        }

        else if (FirstPlayerScore == 40 && SecondPlayerScore == 50) {
            $scope.output.push({text : ' advantage second player ' });
            return false;
        }

        else if (FirstPlayerScore == 50 && SecondPlayerScore == 40) {
            $scope.output.push({text : ' advantage first player ' });
            return false;
        }

        else if (FirstPlayerScore == 50 && SecondPlayerScore == 50) {
            $scope.output.push({text : ' Deuce ' });
            FirstPlayerScore = 40;
            SecondPlayerScore = 40;
            return false;
        }

        else if (FirstPlayerScore == 60 && SecondPlayerScore == 40) {
            $scope.output.push({text : ' Player One Wins ' });
            gameEnabled = false;
            return false;
        }

        else if (FirstPlayerScore == 40 && SecondPlayerScore == 60) {
            $scope.output.push({ text: ' Player Two Wins ' });
            gameEnabled = false;
            return false;
        }

        else if (SecondPlayerScore == 50) {
            $scope.output.push({ text: ' Player Two Wins ' });
            gameEnabled = false;
            return false;
        }
        else if (FirstPlayerScore == 50) {
            $scope.output.push({ text: ' Player One Wins ' });
            gameEnabled = false;
            return false;
        }

        return true;
    }

}