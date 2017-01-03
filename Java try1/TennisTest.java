import static org.junit.Assert.*;

import org.junit.Test;

public class TennisKataTest {

	
	@Test
	public void pickRandomScorer() {
		 tennis game = new tennis();
		 game.pickRandomScorer();
		 assertTrue((game.FirstPlayerScore == 1 && game.SecondPlayerScore == 0) || 
				 	(game.FirstPlayerScore == 0 && game.SecondPlayerScore == 1));
	}
	
	@Test
	public void TranslatePoint() {
		 tennis game = new tennis();
		 
		 assertEquals(game.TranslatePoint(0), 0);  
		 assertEquals(game.TranslatePoint(1), 15);  
		 assertEquals(game.TranslatePoint(2), 30);  
		 assertEquals(game.TranslatePoint(3), 40); 
	}

	
	@Test
	public void playerPoint(){
		tennis game = new tennis();
	     game.FirstPlayerScore = 0;
         game.playerOnePoint();
		 assertEquals(game.FirstPlayerScore, 1); 
		 
	     game.SecondPlayerScore = 0;
         game.playerTwoPoint();
		 assertEquals(game.SecondPlayerScore, 1); 
	}
	
	
	@Test
	public void deuceSituations(){
		tennis game = new tennis();
	     game.FirstPlayerScore = 0;
	     game.SecondPlayerScore = 0;
		 assertNotSame(game.TranslateScore(), "Deuce"); 
	     game.FirstPlayerScore = 1;
	     game.SecondPlayerScore = 1;
		 assertNotSame(game.TranslateScore(), "Deuce"); 
	     game.FirstPlayerScore = 2;
	     game.SecondPlayerScore = 1;
		 assertNotSame(game.TranslateScore(), "Deuce"); 
		 
	     game.FirstPlayerScore = 3;
	     game.SecondPlayerScore = 3;
		 assertEquals(game.TranslateScore(), "Deuce"); 
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 4;
		 assertEquals(game.TranslateScore(), "Deuce"); 
	     game.FirstPlayerScore = 5;
	     game.SecondPlayerScore = 5;
		 assertEquals(game.TranslateScore(), "Deuce"); 

	}
	
	@Test
	public void playerWinSituations(){
		tennis game = new tennis();
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 3;
		 assertNotSame(game.TranslateScore(), "First Player Wins"); 
	     game.FirstPlayerScore = 1;
	     game.SecondPlayerScore = 1;
		 assertNotSame(game.TranslateScore(), "First Player Wins"); 
	     game.FirstPlayerScore = 2;
	     game.SecondPlayerScore = 1;
		 assertNotSame(game.TranslateScore(), "First Player Wins"); 
		 
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 0;
		 assertEquals(game.TranslateScore(), "First Player Wins"); 
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 2;
		 assertEquals(game.TranslateScore(), "First Player Wins"); 
	     game.FirstPlayerScore = 5;
	     game.SecondPlayerScore = 3;
		 assertEquals(game.TranslateScore(), "First Player Wins");
		 
	     game.FirstPlayerScore = 3;
	     game.SecondPlayerScore = 4;
		 assertNotSame(game.TranslateScore(), "Second Player Wins"); 
	     game.FirstPlayerScore = 1;
	     game.SecondPlayerScore = 1;
		 assertNotSame(game.TranslateScore(), "Second Player Wins"); 
		 
	     game.FirstPlayerScore = 0;
	     game.SecondPlayerScore = 4;
		 assertEquals(game.TranslateScore(), "Second Player Wins"); 
	     game.FirstPlayerScore = 2;
	     game.SecondPlayerScore = 4;
		 assertEquals(game.TranslateScore(), "Second Player Wins"); 
	     game.FirstPlayerScore = 3;
	     game.SecondPlayerScore = 5;
		 assertEquals(game.TranslateScore(), "Second Player Wins"); 

	}
	
	@Test
	public void AdvantageSituations(){
		tennis game = new tennis();
	     game.FirstPlayerScore = 5;
	     game.SecondPlayerScore = 4;
		 assertEquals(game.TranslateScore(), "Advantage First Player"); 
		 
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 5;
	     assertNotSame(game.TranslateScore(), "Advantage First Player"); 
	     
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 5;
		 assertEquals(game.TranslateScore(), "Advantage Second Player"); 
		 
	     game.FirstPlayerScore = 5;
	     game.SecondPlayerScore = 4;
	     assertNotSame(game.TranslateScore(), "Advantage Second Player"); 
	}
	
	@Test
	public void justShowScore(){
		tennis game = new tennis();
	     game.FirstPlayerScore = 1;
	     game.SecondPlayerScore = 1;
	     assertNotSame(game.TranslateScore(), "Advantage First Player"); 
	     assertNotSame(game.TranslateScore(), "Advantage Second Player"); 
	     assertNotSame(game.TranslateScore(), "Second Player Wins"); 
	     assertNotSame(game.TranslateScore(), "First Player Wins");
	     assertNotSame(game.TranslateScore(), "Deuce"); 
	     assertNotSame(game.TranslateScore(), ""); 
	}
	
	@Test
	public void gameStatus(){
		tennis game = new tennis();
	     game.FirstPlayerScore = 1;
	     game.SecondPlayerScore = 1;
	     assertTrue(game.CheckForGameStatus());
	     
	     game.FirstPlayerScore = 5;
	     game.SecondPlayerScore = 4;
	     assertTrue(game.CheckForGameStatus());
	     
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 4;
	     assertTrue(game.CheckForGameStatus());
	     
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 0;
	     assertFalse(game.CheckForGameStatus());
	     
	     game.FirstPlayerScore = 0;
	     game.SecondPlayerScore = 4;
	     assertFalse(game.CheckForGameStatus());
	     
	     game.FirstPlayerScore = 4;
	     game.SecondPlayerScore = 6;
	     assertFalse(game.CheckForGameStatus());
	     
	     game.FirstPlayerScore = 6;
	     game.SecondPlayerScore = 4;
	     assertFalse(game.CheckForGameStatus());
	}
}

