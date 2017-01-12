var baseball = function(){
    this.teamAtBat;//this.teams[0];
    this.inning;//having 19 innings, with translation for top and bottom of an inning
    this.outs;
    this.bases;
    this.teams = [{},{}];

    this.init = function(){
        this.teams[0] = {runs:0,hits:0,currBatter:0,lineup: baseball.lineups.reds};
        this.teams[1] = {runs:0,hits:0,currBatter:0,lineup: baseball.lineups.cubs};
        this.teamAtBat = 0;//this.teams[0];
        this.inning = 1;//having 19 innings, with translation for top and bottom of an inning
        this.outs = 0;
        this.bases = [0,0,0,0];
    }

    this.play = function(){
        this.init();
        while(this.gameStatus()){
            while(this.outs<3){
                var CurrentBatter = this.teams[this.teamAtBat].currBatter;
                this.OutOrHit(this.teams[this.teamAtBat].lineup[CurrentBatter]);
                this.nextBatter(this.teamAtBat);
            }
            console.log(this.inning + " --- " + this.teamAtBat + " - Reds: " + this.teams[0].runs + " - Cubs: " + this.teams[1].runs);
            this.nextInning();
        }
        return this.winner();
    }

    this.nextInning = function(){
        this.teamAtBat = this.teamAtBat!=0?0:1; //this.teams[];
        this.inning++;
        this.bases = [0,0,0,0];
        this.outs = 0;
    }

    this.winner = function(){
        if(this.teams[0].runs > this.teams[1].runs){
            return 1;
        }
        else if (this.teams[0].runs < this.teams[1].runs){
            return 2;
        }
        else{
            return 3;
        }
    }

    this.nextBatter = function(team){
        if (this.teams[team].currBatter < 8)
        {
            this.teams[team].currBatter += 1;
        }
        else{
            this.teams[team].currBatter = 0;
        }
    }

    this.gameStatus = function(){
        if (this.inning==18 && this.teams[1].runs>this.teams[0].runs){
            return false;
        }
        else if(this.inning>=19  && (this.inning%2) == 1 && this.teams[0].runs != this.teams[1].runs){
            return false
        }
        return true;
    }

    this.OutOrHit = function(batter){
        var walk = Math.round((Math.random() * 100));///batters average
        if (walk < (batter.walks/batter.pa)*100){
            batter.sim.bb +=1;
            this.moveBaseRunners(1);
            console.log(this.inning + " - walk: " + " -bases: " +  this.bases);
        }
        else{
            var type = Math.round((Math.random() * 1000));///batters average
            batter.sim.ab += 1;
            if(type>batter.avg){//out
                this.outs += 1;
                console.log(this.inning + " - out: "  + this.outs + " -bases: " +  this.bases);
            }
            else{//hit
                batter.sim.h += 1;
                this.moveBaseRunners(this.typeOfHit(batter));
            }
        }

    }

    this.typeOfHit = function(batter){  ///batters likelihood to hit a single, double, triple or homerun
        var type = Math.round((Math.random() * 100));///random number for percent out of 1000
        var hr = (batter.hr/batter.hits)*100;
        var double = (batter.double/batter.hits)*100;
        var triple = (batter.triple/batter.hits)*100;

        if (type>=0 && type <= hr){
            batter.sim.hr += 1;
            return 4;// home run
        }
        else if(type>hr && type<=(hr+double)){
            batter.sim.db += 1;
            return 2;
        }
        else if(type>(hr+double) && type<=(hr+double+triple)){
            batter.sim.tr += 1;
            return 3;
        }
        else{
            return 1;
        }
        //16% of time is a home run - hr/hits 0-16
        //19% of time is a double - double/hits 17-35
        //1% of time is a triple - triple/hits 36-37
        //rest is a single  - else
    }

    this.moveBaseRunners = function(hit){
  
        //this.bases[hit] += 1;
        if(this.bases[2]!=0){
            this.bases[3]+=1;
            this.bases[2] = 0;
        }
        if(this.bases[1]!=0){
            this.bases[Math.min(hit,2)+1] += 1;
            this.bases[1] = 0;
        }
        if(this.bases[0]!=0){
            this.bases[Math.min(hit,3)] += 1;
            this.bases[0] = 0;
        }
        this.bases[hit-1] += 1;
        this.teams[this.teamAtBat].runs += this.bases[3];
        console.log(this.inning + " - hit: " + hit + " - " + this.bases);
        this.bases[3] = 0;
 
    }
}



baseball.lineups = {
    reds:
                    [{avg:260,pa:460, ab:411, hits:107, hr:3, double:19, triple: 3, walks: 36,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}},
                    {avg:291,pa:584, ab:550, hits:160, hr:11, double:34, triple: 1, walks: 18,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}},
                    {avg:326,pa:677, ab:556, hits:181, hr:29, double:34, triple: 2, walks: 108,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}}, 
                    {avg:265,pa:402, ab:370, hits:98, hr:25, double:22, triple: 6, walks: 27,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}},
                    {avg:241,pa:608, ab:552, hits:133, hr:33, double:31, triple: 6, walks: 41,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}},
                    {avg:252,pa:508, ab:464, hits:117, hr:16, double:28, triple: 2, walks: 37,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}},
                    {avg:248,pa:627, ab:565, hits:140, hr:21, double:25, triple: 2, walks: 51,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}},
                    {avg:257,pa:420, ab:377, hits:97, hr:7, double:23, triple: 1, walks: 36,sim:{ab:0,bb:0,h:0,hr:0,db:0,tr:0}},
                    {avg:113,pa:61, ab:53, hits:6, hr:0, double:2, triple: 0, walks: 3,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}}]
    ,cardinals: 
                    [{avg:307,pa:581, ab:534, hits:164, hr:8, double:38, triple: 1, walks: 39,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:300,pa:460, ab:404, hits:121, hr:17, double:28, triple: 3, walks: 41,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:271,pa:566, ab:473, hits:128, hr:21, double:36, triple: 6, walks: 81,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:243,pa:438, ab:400, hits:97, hr:30, double:9, triple: 1, walks: 37,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}}, 
                    {avg:273,pa:649, ab:582, hits:159, hr:22, double:35, triple: 3, walks: 51,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:246,pa:426, ab:382, hits:94, hr:20, double:20, triple: 1, walks: 35,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:240,pa:478, ab:446, hits:107, hr:24, double:29, triple: 3, walks: 28,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:225,pa:464, ab:413, hits:93, hr:28, double:19, triple: 2, walks: 39,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:171,pa:51, ab:41, hits:7, hr:0, double:0, triple: 0, walks: 2,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}}]
    ,cubs: 
                   [{avg:276,pa:551, ab:456, hits:126, hr:13, double:25, triple: 7, walks: 79,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:292,pa:699, ab:603, hits:176, hr:39, double:35, triple: 3, walks: 75,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:292,pa:676, ab:583, hits:170, hr:32, double:43, triple: 4, walks: 74,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:272,pa:631, ab:523, hits:142, hr:18, double:31, triple: 3, walks: 96,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:238,pa:598, ab:525, hits:125, hr:21, double:25, triple: 3, walks: 55,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}}, 
                    {avg:230,pa:592, ab:530, hits:122, hr:7, double:27, triple: 1, walks: 54,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:259,pa:200, ab:185, hits:48, hr:5, double:9, triple: 1, walks: 13,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:282,pa:283, ab:252, hits:71, hr:12, double:14, triple: 1, walks: 26,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}},
                    {avg:113,pa:61, ab:53, hits:6, hr:0, double:2, triple: 0, walks: 3,sim:{ab:0,h:0,bb:0,hr:0,db:0,tr:0}}
                    ]
};

if(typeof module !== 'undefined') {
    module.exports = baseball;
}
