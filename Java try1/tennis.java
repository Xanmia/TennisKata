import java.util.Random;

public class tennis {

	int FirstPlayerScore = 0;
	int SecondPlayerScore = 0;
	
	public tennis() {
		
	}
	
	public void run(){
	    while (CheckForGameStatus()) {
		       pickRandomScorer();
		       System.out.println(TranslateScore());
		    }
	}
	
	public void playerOnePoint() {
	    FirstPlayerScore++;
	}

	public void playerTwoPoint() {
	    SecondPlayerScore++;
	}
	
	public boolean CheckForGameStatus() {
	    if (FirstPlayerScore >= 4 || SecondPlayerScore >= 4) {
	        if ((FirstPlayerScore >= SecondPlayerScore + 2) || (SecondPlayerScore >= FirstPlayerScore + 2)) {
	            return false;
	        }
	    }
	    return true;
	}
	
	public void pickRandomScorer() {
		Random rand = new Random();
		int  scorer = rand.nextInt(2) + 1;
	   // int scorer = 1;//Math.round((Math.random() * 1) + 1);
	    if (scorer == 1) {
	        playerOnePoint();
	    }
	    else if (scorer == 2) {
	        playerTwoPoint();
	    }
	}

	

	public int TranslatePoint(int score) {
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
		return 0;
	}
	
	
    public String TranslateScore() {
        if (FirstPlayerScore >= 4 || SecondPlayerScore >= 4)
        {
            if (FirstPlayerScore == SecondPlayerScore) {
                return "Deuce";
            }

            if ((FirstPlayerScore >= SecondPlayerScore + 2)) {
                return "First Player Wins";
            }

            if (SecondPlayerScore >= FirstPlayerScore + 2) {
                return "Second Player Wins";
            }

            if (SecondPlayerScore > FirstPlayerScore) {
                return "Advantage Second Player";
            }

            if (SecondPlayerScore < FirstPlayerScore) {
                return "Advantage First Player";
            }
        }
        else if (FirstPlayerScore == 3 && SecondPlayerScore == 3) {
                return "Deuce";
        }

        return "Player One Score:" + TranslatePoint(FirstPlayerScore) + " Player Two Score: " + TranslatePoint(SecondPlayerScore);
    }

}
