function TennisGame($scope) {

    $scope.output = [
        {text:'Game started'}
    ];

    var FirstPlayerScore = 0;
    var SecondPlayerScore = 0;

    Begin();

    function Begin() {
        while (CheckForGameStatus()) {
            pickRandomScorer() 
            $scope.output.push(TranslateScore());
        }
    }

    function pickRandomScorer() {
        var scorer = Math.round((Math.random() * 1) + 1);
        if (scorer == 1) {
            playerOnePoint();
        }
        else if (scorer == 2) {
            playerTwoPoint();
        }
    }

    function playerOnePoint() {
        FirstPlayerScore++;
    }

    function playerTwoPoint() {
        SecondPlayerScore++;
    }

    function TranslatePoint(score) {
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

    function TranslateScore() {
        if (FirstPlayerScore >= 4 || SecondPlayerScore >= 4)
        {
            if (FirstPlayerScore == SecondPlayerScore) {
                return { text: 'Deuce' }
            }

            if ((FirstPlayerScore >= SecondPlayerScore + 2)) {
                return { text: 'First Player Wins' }
            }

            if (SecondPlayerScore >= FirstPlayerScore + 2) {
                return { text: 'Second Player Wins' }
            }

            if (SecondPlayerScore > FirstPlayerScore) {
                return { text: 'Advantage Second Player' }
            }

            if (SecondPlayerScore < FirstPlayerScore) {
                return { text: 'Advantage First Player' }
            }
        }
        else if (FirstPlayerScore == 3 && SecondPlayerScore == 3) {
                return { text: 'Deuce' }
        }

        return { text: 'Player One Score:' + TranslatePoint(FirstPlayerScore) + ' Player Two Score: ' + TranslatePoint(SecondPlayerScore) }
    }

    function CheckForGameStatus() {
        if (FirstPlayerScore >= 4 || SecondPlayerScore >= 4) {
            if ((FirstPlayerScore >= SecondPlayerScore + 2) || (SecondPlayerScore >= FirstPlayerScore + 2)) {
                TranslateScore();
                return false;
            }
        }
        return true;
    }
}