import random

class Tennis(object):
    FirstPlayerScore = 0
    SecondPlayerScore = 0
    
    def run(self):
        while self.CheckForGameStatus():
            self.pickRandomScorer()
            print(self.TranslateScore())
        
    def CheckForGameStatus(self):
        if self.FirstPlayerScore >= 4 or self.SecondPlayerScore >=4:
            if self.FirstPlayerScore >= self.SecondPlayerScore+2 or self.SecondPlayerScore >= self.FirstPlayerScore+2:
                return False;
        return True;


    def pickRandomScorer(self):
        scorer = random.randint(1, 2)
        if scorer == 1:
            self.playerOnePoint()
        elif scorer == 2:
            self.playerTwoPoint()
        

    def playerOnePoint(self):
        self.FirstPlayerScore = self.FirstPlayerScore + 1

    def playerTwoPoint(self):
        self.SecondPlayerScore = self.SecondPlayerScore + 1

    def TranslatePoint(self,score):
        if score == 0:
            return 0;
        elif score == 1:
            return 15;
        elif score == 2:
            return 30;
        elif score == 3:
            return 40;


    def TranslateScore(self):
        if self.FirstPlayerScore >= 4 or self.SecondPlayerScore >= 4:
            if self.FirstPlayerScore == self.SecondPlayerScore:
                return 'Deuce'
            if self.FirstPlayerScore >= self.SecondPlayerScore + 2:
                return 'First Player Wins'
            if self.SecondPlayerScore >= self.FirstPlayerScore + 2:
                return 'Second Player Wins'
            if self.SecondPlayerScore > self.FirstPlayerScore:
                return 'Advantage Second Player'
            if self.SecondPlayerScore < self.FirstPlayerScore:
                return 'Advantage First Player' 
        elif self.FirstPlayerScore == 3 and self.SecondPlayerScore == 3:
            return 'Deuce'
        return 'Player One Score:' + `self.TranslatePoint(self.FirstPlayerScore)` + ' Player Two Score: ' + `self.TranslatePoint(self.SecondPlayerScore)`

game = Tennis()
game.run()