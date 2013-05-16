
describe('Tennis Game', function () {
    before(function(){
        this.game = new TennisGame();
    });
    
    describe('pickRandomScorer()', function () {
        it('Expects player one or player two have have a 1 as a score other should have a 0', function () {
            this.game.pickRandomScorer();
            var f1 = this.game.FirstPlayerScore;
            var f2 = this.game.SecondPlayerScore;
            expect(true).to.satisfy(function (status) {
                if (f2 == 1 && f1 == 0) {
                    return true;
                }
                else if (f2 == 0 && f1 == 1) {
                    return true;
                }
                else {
                    return false;
                }
            });
        });
    });


    describe('playerOnePoint()', function () {
        it('expects PlayerOneScore to equal 1', function () {
            this.game.FirstPlayerScore = 0;
            this.game.playerOnePoint();
            expect(this.game.FirstPlayerScore).to.equal(1);
        });
        it('expects PlayerTwoScore to equal 1', function () {
            this.game.SecondPlayerScore = 0;
            this.game.playerTwoPoint();
            expect(this.game.SecondPlayerScore).to.equal(1);
        });

    });



    describe('TranslatePoint()', function () {
        it('expects 0 to equal 0', function () {
            expect(this.game.TranslatePoint(0)).to.equal(0);
        });
        it('expects 1 to equal 15', function () {
            expect(this.game.TranslatePoint(1)).to.equal(15);
        });
        it('expects 2 to equal 30', function () {
            expect(this.game.TranslatePoint(2)).to.equal(30);
        });
        it('expects 3 to equal 40', function () {
            expect(this.game.TranslatePoint(3)).to.equal(40);
        });
        it('expects 6 to equal undefined', function () {
            expect(this.game.TranslatePoint(6)).to.equal(undefined);
        });
    });

    describe('TranslateScore()', function () {
        describe('Deuce Situations', function () {
            it('Game should be a Deuce, 3-3', function () {
                this.game.FirstPlayerScore = 3;
                this.game.SecondPlayerScore = 3;
                expect(this.game.TranslateScore()).to.equal('Deuce');
            });
            it('Game should be a Deuce, 4-4', function () {
                this.game.FirstPlayerScore = 4;
                this.game.SecondPlayerScore = 4;
                expect(this.game.TranslateScore()).to.equal('Deuce');
            });
            it('Game should be a Deuce, 5-5', function () {
                this.game.FirstPlayerScore = 5;
                this.game.SecondPlayerScore = 5;
                expect(this.game.TranslateScore()).to.equal('Deuce');
            });
            it('Game should be a Deuce, 6-6', function () {
                this.game.FirstPlayerScore = 6;
                this.game.SecondPlayerScore = 6;
                expect(this.game.TranslateScore()).to.equal('Deuce');
            });
            it('Game should be a Deuce, 7-7', function () {
                this.game.FirstPlayerScore = 7;
                this.game.SecondPlayerScore = 7;
                expect(this.game.TranslateScore()).to.equal('Deuce');
            });
            it('Game should NOT be Deuce, 2-2', function () {
                this.game.FirstPlayerScore = 2;
                this.game.SecondPlayerScore = 2;
                expect(this.game.TranslateScore()).to.not.equal('Deuce');
            });
            it('Game should NOT be Deuce, 1-1', function () {
                this.game.FirstPlayerScore = 1;
                this.game.SecondPlayerScore = 1;
                expect(this.game.TranslateScore()).to.not.equal('Deuce');
            });
        });
        describe('First Player Wins Situations', function () {
            it('First player should not win, 3-1', function () {
                this.game.FirstPlayerScore = 3;
                this.game.SecondPlayerScore = 1;
                expect(this.game.TranslateScore()).to.not.equal('First Player Wins');
            });
            it('First player should not win, 2-1', function () {
                this.game.FirstPlayerScore = 2;
                this.game.SecondPlayerScore = 1;
                expect(this.game.TranslateScore()).to.not.equal('First Player Wins');
            });
            it('First player should not win, 1-4', function () {
                this.game.FirstPlayerScore = 1;
                this.game.SecondPlayerScore = 4;
                expect(this.game.TranslateScore()).to.not.equal('First Player Wins');
            });
            it('First player should not win, 4-3', function () {
                this.game.FirstPlayerScore = 4;
                this.game.SecondPlayerScore = 3;
                expect(this.game.TranslateScore()).to.not.equal('First Player Wins');
            });
            it('First player should win, 4-1', function () {
                this.game.FirstPlayerScore = 4;
                this.game.SecondPlayerScore = 1;
                expect(this.game.TranslateScore()).to.equal('First Player Wins');
            });
            it('First player should win, 6-4', function () {
                this.game.FirstPlayerScore = 6;
                this.game.SecondPlayerScore = 4;
                expect(this.game.TranslateScore()).to.equal('First Player Wins');
            });
            it('First player should win, 4-2', function () {
                this.game.FirstPlayerScore = 4;
                this.game.SecondPlayerScore = 2;
                expect(this.game.TranslateScore()).to.equal('First Player Wins');
            });
            it('First player should win, 5-3', function () {
                this.game.FirstPlayerScore = 5;
                this.game.SecondPlayerScore = 3;
                expect(this.game.TranslateScore()).to.equal('First Player Wins');
            });
        });


        describe('Second Player Wins Situations', function () {
            it('Second player should not win, 3-1', function () {
                this.game.SecondPlayerScore = 3;
                this.game.FirstPlayerScore = 1;
                expect(this.game.TranslateScore()).to.not.equal('Second Player Wins');
            });
            it('Second player should not win, 2-1', function () {
                this.game.SecondPlayerScore = 2;
                this.game.FirstPlayerScore = 1;
                expect(this.game.TranslateScore()).to.not.equal('Second Player Wins');
            });
            it('Second player should not win, 1-4', function () {
                this.game.SecondPlayerScore = 1;
                this.game.FirstPlayerScore = 4;
                expect(this.game.TranslateScore()).to.not.equal('Second Player Wins');
            });
            it('Second player should not win, 4-3', function () {
                this.game.SecondPlayerScore = 4;
                this.game.FirstPlayerScore = 3;
                expect(this.game.TranslateScore()).to.not.equal('Second Player Wins');
            });
            it('Second player should win, 4-1', function () {
                this.game.SecondPlayerScore = 4;
                this.game.FirstPlayerScore = 1;
                expect(this.game.TranslateScore()).to.equal('Second Player Wins');
            });
            it('Second player should win, 6-4', function () {
                this.game.SecondPlayerScore = 6;
                this.game.FirstPlayerScore = 4;
                expect(this.game.TranslateScore()).to.equal('Second Player Wins');
            });
            it('Second player should win, 4-2', function () {
                this.game.SecondPlayerScore = 4;
                this.game.FirstPlayerScore = 2;
                expect(this.game.TranslateScore()).to.equal('Second Player Wins');
            });
            it('Second player should win, 5-3', function () {
                this.game.SecondPlayerScore = 5;
                this.game.FirstPlayerScore = 3;
                expect(this.game.TranslateScore()).to.equal('Second Player Wins');
            });
        });
        describe('First Player Advantage Situations', function () {
            it('First player advantage, 5-4', function () {
                this.game.FirstPlayerScore = 5;
                this.game.SecondPlayerScore = 4;
                expect(this.game.TranslateScore()).to.equal('Advantage First Player');
            });
            it('First player advantage, 4-5', function () {
                this.game.FirstPlayerScore = 4;
                this.game.SecondPlayerScore = 5;
                expect(this.game.TranslateScore()).to.not.equal('Advantage First Player');
            });
        });
        describe('Second Player Advantage Situations', function () {
            it('Second player advantage, 5-4', function () {
                this.game.SecondPlayerScore = 5;
                this.game.FirstPlayerScore = 4;
                expect(this.game.TranslateScore()).to.equal('Advantage Second Player');
            });
            it('Second player advantage, 4-5', function () {
                this.game.SecondPlayerScore = 4;
                this.game.FirstPlayerScore = 5;
                expect(this.game.TranslateScore()).to.not.equal('Advantage Second Player');
            });
        });
        describe('All others should just show a score', function () {
            it('Just show the score', function () {
                this.game.SecondPlayerScore = 1;
                this.game.FirstPlayerScore = 1;
                expect(this.game.TranslateScore()).to.not.equal('Advantage Second Player');
                expect(this.game.TranslateScore()).to.not.equal('Advantage First Player');
                expect(this.game.TranslateScore()).to.not.equal('Second Player Wins');
                expect(this.game.TranslateScore()).to.not.equal('First Player Wins');
                expect(this.game.TranslateScore()).to.not.equal('Deuce');
                expect(this.game.TranslateScore()).to.exist;
                expect(this.game.TranslateScore()).to.not.be.empty;
            });
        });
    });

    describe('CheckForGameStatus()', function () {
        it('game should be over, 4-0: should equal false', function() {
            this.game.FirstPlayerScore = 4;
            this.game.SecondPlayerScore = 0;
            expect(this.game.CheckForGameStatus()).to.equal(false);
        });
        it('game should be over, 0-4: should equal false', function () {
            this.game.FirstPlayerScore = 0;
            this.game.SecondPlayerScore = 4;
            expect(this.game.CheckForGameStatus()).to.equal(false);
        });
        it('game should be over, 6-4: should equal false', function () {
            this.game.FirstPlayerScore = 6;
            this.game.SecondPlayerScore = 4;
            expect(this.game.CheckForGameStatus()).to.equal(false);
        });
        it('game should be over, 4-6: should equal false', function () {
            this.game.FirstPlayerScore = 4;
            this.game.SecondPlayerScore = 6;
            expect(this.game.CheckForGameStatus()).to.equal(false);
        });
        it('game should continue, 0-0: should equal true', function () {
            this.game.FirstPlayerScore = 0;
            this.game.SecondPlayerScore = 0;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 3-0: should equal true', function () {
            this.game.FirstPlayerScore = 3;
            this.game.SecondPlayerScore = 0;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 2-0: should equal true', function () {
            this.game.FirstPlayerScore = 2;
            this.game.SecondPlayerScore = 0;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 1-0: should equal true', function () {
            this.game.FirstPlayerScore = 1;
            this.game.SecondPlayerScore = 0;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 0-1: should equal true', function () {
            this.game.FirstPlayerScore = 0;
            this.game.SecondPlayerScore = 1;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 0-2: should equal true', function () {
            this.game.FirstPlayerScore = 0;
            this.game.SecondPlayerScore = 2;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 0-3: should equal true', function () {
            this.game.FirstPlayerScore = 0;
            this.game.SecondPlayerScore = 3;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 4-4: should equal true', function () {
            this.game.FirstPlayerScore = 4;
            this.game.SecondPlayerScore = 4;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
        it('game should continue, 5-4: should equal true', function () {
            this.game.FirstPlayerScore = 5;
            this.game.SecondPlayerScore = 4;
            expect(this.game.CheckForGameStatus()).to.equal(true);
        });
    });
});