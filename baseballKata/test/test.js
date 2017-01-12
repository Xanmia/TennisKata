var expect = require('chai').expect;
var baseball = require('../baseball.js');

describe('Baseball', function () {
    beforeEach(function(){
        this.game = new baseball();
        this.game.init();
    });

    it('inits correctly', function () {
        expect(this.game.inning).to.equal(1);
        expect(this.game.teamAtBat).to.equal(0);
        expect(this.game.outs).to.equal(0);
        expect(this.game.bases).to.eql([0, 0, 0, 0]);
    });

    describe('next inning', function () {
        beforeEach(function () {
            this.atbat = this.game.teamAtBat;
            this.game.bases = [1, 1, 1, 0];
            this.game.inning = 1;
            this.game.outs = 3;
            this.game.nextInning();
        });

        it('inning should be +1', function () {
            expect(this.game.inning).to.equal(2);
        });
        it('at bat team should be the opposite', function () {
            expect(this.game.teamAtBat).to.equal(1);
            expect(this.game.teamAtBat).to.not.equal(this.atbat);
        });
        it('outs should reset to zero', function () {
            expect(this.game.outs).to.equal(0);
        });
        it('bases should be cleared out', function () {
            expect(this.game.bases).to.eql([0, 0, 0, 0]);
        });

    });

    describe('base running', function () {
        describe('bases empty', function () {
            beforeEach(function () {
                this.game.bases = [0, 0, 0, 0];
            });

            it('single', function () {
                this.game.moveBaseRunners(1);
                expect(this.game.bases).to.eql([1, 0, 0, 0]);
            });
            it('double', function () {
                this.game.moveBaseRunners(2);
                expect(this.game.bases).to.eql([0, 1, 0, 0]);
            });
            it('triple', function () {
                this.game.moveBaseRunners(3);
                expect(this.game.bases).to.eql([0, 0, 1, 0]);
            });
            it('homerun', function () {
                this.game.moveBaseRunners(4);
                expect(this.game.bases).to.eql([0, 0, 0, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(1);
            });
        });


        describe('bases loaded', function () {
            beforeEach(function () {
                this.game.bases = [1, 1, 1, 0];
                this.game.teams[this.game.teamAtBat].runs = 0;
            });

            it('single', function () {
                this.game.moveBaseRunners(1);
                expect(this.game.bases).to.eql([1, 1, 1, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(1);
            });
            it('double', function () {
                this.game.moveBaseRunners(2);
                expect(this.game.bases).to.eql([0, 1, 1, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(2);
            });
            it('triple', function () {
                this.game.moveBaseRunners(3);
                expect(this.game.bases).to.eql([0, 0, 1, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(3);
            });
            it('homerun', function () {
                this.game.moveBaseRunners(4);
                expect(this.game.bases).to.eql([0, 0, 0, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(4);
            });
        });

        describe('one on first', function () {
            beforeEach(function () {
                this.game.bases = [1, 0, 0, 0];
                this.game.teams[this.game.teamAtBat].runs = 0;
            });

            it('single', function () {
                this.game.moveBaseRunners(1);
                expect(this.game.bases).to.eql([1, 1, 0, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(0);
            });
            it('double', function () {
                this.game.moveBaseRunners(2);
                expect(this.game.bases).to.eql([0, 1, 1, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(0);
            });
            it('triple', function () {
                this.game.moveBaseRunners(3);
                expect(this.game.bases).to.eql([0, 0, 1, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(1);
            });
            it('homerun', function () {
                this.game.moveBaseRunners(4);
                expect(this.game.bases).to.eql([0, 0, 0, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(2);
            });
        });

        describe('one on second', function () {
            beforeEach(function () {
                this.game.bases = [0, 1, 0, 0];
                this.game.teams[this.game.teamAtBat].runs = 0;
            });

            it('single', function () {
                this.game.moveBaseRunners(1);
                expect(this.game.bases).to.eql([1, 0, 1, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(0);
            });
            it('double', function () {
                this.game.moveBaseRunners(2);
                expect(this.game.bases).to.eql([0, 1, 0, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(1);
            });
            it('triple', function () {
                this.game.moveBaseRunners(3);
                expect(this.game.bases).to.eql([0, 0, 1, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(1);
            });
            it('homerun', function () {
                this.game.moveBaseRunners(4);
                expect(this.game.bases).to.eql([0, 0, 0, 0]);
                expect(this.game.teams[this.game.teamAtBat].runs).to.equal(2);
            });
        });

    });


    describe('end game situtions', function () {
        it('bottom of the 9th, home team winning, game ends', function () {
            this.game.inning = 18; //18 is the bottom of the 9th
            this.game.teams[0].runs = 1;
            this.game.teams[1].runs = 2;
            expect(this.game.gameStatus()).to.equal(false);
        });
        it('bottom of the 9th, home team losing, game still plays', function () {
            this.game.inning = 18; //18 is the bottom of the 9th
            this.game.teams[0].runs = 5;
            this.game.teams[1].runs = 0;
            expect(this.game.gameStatus()).to.equal(true);
        });
        it('Top of the 10th inning, tie, game still plays', function () {
            this.game.inning = 19;//coming into this inning
            this.game.teams[0].runs = 5;
            this.game.teams[1].runs = 5;
            expect(this.game.gameStatus()).to.equal(true);
        });
        it('Bottom of the 10th inning, tie, game still plays', function () {
            this.game.inning = 20;//coming into this inning
            this.game.teams[0].runs = 5;
            this.game.teams[1].runs = 5;
            expect(this.game.gameStatus()).to.equal(true);
        });
        it('Bottom of the 11th inning, away leads, game still plays', function () {
            this.game.inning = 20;//coming into this inning, home team could not tie it up in the 20
            this.game.teams[0].runs = 6;
            this.game.teams[1].runs = 5;
            expect(this.game.gameStatus()).to.equal(true);
        });
        it('Bottom of the 11th inning, home leads, game over', function () {
            this.game.inning = 21;//coming into this inning, home team could not tie it up in the 20
            this.game.teams[0].runs = 5;
            this.game.teams[1].runs = 6;
            expect(this.game.gameStatus()).to.equal(false);
        });
    });

    describe('hit types', function(){
        it('should always return either 1,2,3, or 4', function() {
            var typeOfHit = this.game.typeOfHit(this.game.teams[0].lineup[0]);
            expect(typeOfHit).to.be.within(1,4);
        });
    });

    describe('at bat stats 10000 ab', function(){
        before(function () {
            this.batter = this.game.teams[0].lineup[2];
            while(this.batter.sim.ab<10000){
                this.game.OutOrHit(this.batter);
            }
        });
        it('ab = 10000', function() {
            expect(this.batter.sim.ab).to.equal(10000);
        });

        it('hr within 4%', function() {
            var hr = (this.batter.hr/this.batter.hits)*100;
            expect((this.batter.sim.hr/this.batter.sim.h) *100).to.be.within(hr-2,hr+2);//should be within 4% of center
        });

        it('double within 4%', function() {
            var db = (this.batter.double/this.batter.hits)*100;
            expect((this.batter.sim.db/this.batter.sim.h) *100).to.be.within(db-2,db+2);//should be within 4% of center
        });
        it('triple  within 4%', function() {
            var tr = (this.batter.triple/this.batter.hits)*100;
            expect((this.batter.sim.tr/this.batter.sim.h)*100).to.be.within(tr-2,tr+2);//should be within 4% of center
        });
        it('hits within 400 hits/40 points of average', function() {
            var hits = this.batter.avg*10;
            expect(this.batter.sim.h).to.be.within(hits-200,hits+200);
        });
        it('walks within 4%', function() {
            var walks = (this.batter.walks/this.batter.pa)*100;//keep within 4% of center
            expect((this.batter.sim.bb/(this.batter.sim.bb+this.batter.sim.ab)) * 100).to.be.within(walks-2,walks+2);//need pa
        });
    });

    describe('next batter', function(){
        it('should move to the next batter', function(){
            this.game.nextBatter(0);
            expect(this.game.teams[0].currBatter).to.equal(1);
        });
        it('last batter should move back to 0/top of lineup', function(){
            this.game.teams[0].currBatter = 9;
            this.game.nextBatter(0);
            expect(this.game.teams[0].currBatter).to.equal(0);
        });
    });

});