---
layout: post
title: "tic-toe-tac: you only win if nobody wins"
date: 2021-01-17
tags: puzzles misc
refs:
---

I came across a <a href="http://davidbau.com/archives/2010/10/22/tic_toe_tac.html">neat little problem</a> the other day that proposes a variation on the classic tic-tac-toe game, which was named "tic-toe-tac" in the post. In this version, your goal is to prevent <i>anyone</i> from winning, i.e. force a draw. I tried playing against myself a few times and didn't have any luck doing so, and I began wondering if this was possible at all. After a bit of thinking, here's what I found.

<!--excerpt-->

<h3>the classic tic-tac-toe strategy</h3>

The <a href="https://playtictactoe.org/">classic tic-tac-toe game</a> is pretty simple, and there's a general consensus on how to play optimally. It's nontrivial but still pretty straightforward to figure out who has what advantage and where each player should move. Intuitively, the player going first has an advantage because they get to stake a claim to the most valuable positions. The tried-and-true strategy for the first player (say, X) is to take a corner square. No matter how the second player (then, O) moves, X is guaranteed to <i>not</i> lose. This is different from winning! Importantly, if O plays well on their first turn (takes the center square) then following optimal play on either side, the game ends in a draw.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-17-fig1.gif" alt="Classic tic-tac-toe strategies" title="tic-tac-toe strategy" style="width:100%">
  <figcaption>Figure 1. The classic tic-tac-toe strategy for Player 1 guarantees that Player 1 will not lose. It can, however, end in a draw.</figcaption>
</figure>

<i>Forcing</i> a draw, on the other hand, is very different. Now, you not only need to worry about preventing the other player from winning, but you also need to make sure you don't allow the other player to corner you into a win. Such a simple change to the rules, but quite the increase in complexity!

<h3>a preliminary analysis</h3>

I tried my hand at winning this variant a few times, and quickly began to feel like it wasn't possible. A good way of getting a better feel for this to actually compute the fraction of possible draw arrangements out of the total number of valid game arrangements (played to completion, i.e. the whole board is filled). I never quite had a penchant for combinatorics (I've miscounted, overcounted, undercounted, you name it), but sometimes you just have to sit down and do the casework. Fortunately, it's not too bad here, just a little tedious.

First, note that the total number of possible complete and valid game configurations is ${9 \choose 5} = 126$, as all we need to do is place $4$ O's down into $9$ squares and the X's are then fixed. Now, how many of these are draws, how many give O a win and how many give X a win? I suspect that there can't be too many draw scenarios, so let's start there. We can split this case into two subcases: (1) we have an O in the center square or (2) we don't. Figure 2 illustrates each case in detail.

If we are in case (1), then we have three remaining O's to allot. Consider how many of them are in corner squares. If we place all or none of the remaining O's in corner squares, then O wins. If we place exactly one O in a corner, say (without loss of generality) the top right. Then we have to prevent X from winning in the left column and bottom row, but without using the bottom-left corner. So we can only place the two O's in the middle squares of the open row and column. This gives us one way of achieving a draw. Alternatively, we could have excatly two O's placed in the corners. These O's must be in adjacent corners, or we get an O-win along a diagonal. Our remaining O then has to cover the leftover open row/column without any O's already in it, and the only square that we can put the final O in without winning is the middle square of that row/column. This gives us another template. 

Due to the symmetry of the board, there are other arrangments which can be derived by rotating or reflecting these configurations (though in this case, rotation suffices). So to address that, I'll denote a "template" to be an arrangement modulo any such symmetries.

Now, what about case (2)? Can we get a draw without placing an O in the center square? Let's take the corner subcases approach again. If we have all or none of the O's in corners, then X wins via a diagonal. If we have exactly one O in a corner, then we can't block X from winning on the other diagonal not covered by this O. The only remaining possibility is having two O's in the corner, and by the same logic in the previous statement these two O's cannot belong to the same diagonal. The remaining two non-corner O's only have one possible configuration, giving us our final template. 

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-17-fig2.png" alt="Templates representing a draw" title="tic-tac-toe draw template" style="width:100%">
  <figcaption>Figure 2. We have three possible templates which represent a draw.</figcaption>
</figure>

So, modulo any reflections and rotations, we have three unique templates that produce a draw. Now we need to add these reflections and rotations back into consideration to get the final total count. The first two templates each have one line of reflective symmetry, so we only need to count the number of unique rotated configurations, of which there are $4$. The third template has no symmetry, so it has a total of $8$ transformed configurations (it can be rotated four ways or reflected---but be careful, although we can perform a vertical or horizontal reflection, one of these can be formed by reflecting and then rotating).<a href="#footnote1"><sup>1</sup></a> So we get $4 + 4 + 8 = 16$ total draw configurations!

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-17-fig3.gif" alt="Generating all configurations of a draw from the three templates" title="generating tic-tac-toe draw configurations" style="width:100%">
  <figcaption>Figure 3. Templates 1 and 2 can be rotated to generate $4$ different configurations. Template 3 can be rotated and reflected along one axis of symmetry, resulting in $8$ different configurations. Blue circles represent O's and red circles represent X's.</figcaption>
</figure>

To double-check that these are the only possibilities, I've included a breakdown of how to count the other gameplay scenarios (X wins or O wins) at the end of this post. The goal is to make sure that the total configurations for all scenarios adds up to the correct number. Given that there are $126$ possible game endings in total, $16$ seems quite few. So it makes sense that this variant is harder than it seems...

<h3>is it possible to win?</h3>

Since this is only a $3 \times 3$ board, we <i>could</i> check every possible gameplay. In fact, this is essentially what I'm going to do, but with a few optimizations to speed everything up. I'll also assume that Player X always goes first and Player O second. So without further ado, let's begin the casework.

<b>You are Player O (go second).</b> Since Player O already has a disadvantage in winning, it's probably easier to start here. Actually, it's really easy---X can simply use the optimal strategy for classic tic-tac-toe discussed above, which is making the first move on a corner square. Unless O takes the center square next, X is guaranteed to win (per the classical strategy). After this point, X pretty much controls where O makes their next move, and can eventually force an O win.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-17-fig4.png" alt="Optimal gameplay when you are Player O" title="optimal tic-tac-toe O gameplay" style="width:100%">
  <figcaption>Figure 4. Player O can never successfully force a draw if Player X uses the optimal strategy for the classical game. </figcaption>
</figure>

<b>You are Player X (start first).</b> This is where it gets a little harder. It's not entirely clear whether Player X can or can't accomplish a draw. Let's break it down (see Figure 5 for a visualization):

- Suppose Player X makes their first move in the center square. Recall our templates from the analysis above. In this case, X has to pursue template 3. But notice that O simply needs to form an O \| ? \| O pattern along any diagonal, middle row or middle column (an O-sandwich, if you will) to foil X's plan. So O essentially controls where X makes their next move from here on out---no matter what square O plays, X has to play the square opposite of it on the board. Then for O's second turn, they can simply play a square adjacent to the one they just played. This gives O two possible subsequent moves: (1) completing the row/column to win, or (2) make an O-sandwich. X can't possibly cover both these options in its next move. Verdict: no draw!
- Now, suppose X doesn't play the middle square first, hence pursuing template 1 or template 2. In this case, O again has a simple goal: they only need to form an O \| O \| ? pattern along any of the outside rows/columns or make an O-sandwich in the middle row or middle column. This is easy if O plays an open middle square on the border of the board. Verdict: no draw again!

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-17-fig5.png" alt="Optimal gameplay when you are Player X" title="optimal tic-tac-toe X gameplay" style="width:100%">
  <figcaption>Figure 5. <b>Top.</b> If Player X plays the center square first, then either O wins or X extends gameplay to board completion (and X wins). <b>Bottom.</b> If Player X doesn't play the center square, then O can form an O-sandwich or force X to win. In this example, X plays a middle square on the border; the case where X plays a corner square is equivalent to this game rotated by 45 degrees.</figcaption>
</figure>

So it seems like a rational Player X won't try to go after template 3, because that's a dead end. Moreover, going after template 1 or template 2 still leaves open the option of pursuing template 3 down the road. For O, the name of the game is the O-sandwich---that's the configuration that invalidates all three templates. So the game starts out with X playing anywhere but the center square, and O playing a middle border square on the opposite half of the board. From there on out, X must prevent O from making any O-sandwiches, and the game is pretty much fixed at that point. There is a slight difference between eventual gameplay depending on whether X plays a middle square or corner square, but ultimately someone will win. In the case that X plays a corner square, the game might follow like so:

1. X plays the top-right corner.
2. O plays the leftmost column, middle row.
3. X has to play the rightmost column, middle row.
4. O plays the top-left corner.
3. X has to play the bottom-left corner.
4. O plays the bottom-right corner.
5. Either X prevents O from winning and wins themselves, or O wins on the next turn.

I'll leave the other case as a short exercise. Hence, it seems like our little game is rigged---winning is, quite literally, mandatory (but in this case, winning = losing). Perhaps that doesn't make for such a great game, but certainly an interesting mental exercise!

<h3>extensions</h3>

Now, this simple analysis was still a bit of brute-force, and only possible due to the small board size. If we were to play with a $5 \times 5$ board, would the same result still hold? What about an even sized board? And how about a $3 \times 3 \times 3$ game? I'm not entirely familiar with the literature on generalized tic-tac-toe strategies, although there is an interesting note on Wikipedia's entry for $m,n,k$-games:<a href="#footnote2"><sup>2</sup></a>

<blockquote>
<div class="long-quote">
    "A standard strategy stealing argument... shows that in no $m,n,k$-game can there be a strategy that assures that the second player will win... The strategy stealing argument assumes that the second player has a winning strategy... The first player makes an arbitrary move to begin with. After that, the player pretends that they are the second player and adopts the second player's winning strategy. They can do this as long as the strategy doesn't call for [using a turn] on the 'arbitrary' square that is already occupied. If this happens, though, they can again play an arbitrary move and continue as before with the second player's winning strategy... this is a winning strategy for the first player. The contradiction implies that the original assumption is false, and the second player cannot have a winning strategy.
    <br><br>
    This argument tells nothing about whether a particular game is a draw or a win for the first player. Also, it does not actually give a strategy for the first player."
</div>
</blockquote>

This wasn't anything groundbreaking, but it was still pretty fun to go through all the strategies. Hopefully I can do some more things like this in the future, since I like making visual explanations like this. I'm always happy to hear about new puzzles, even when I can't do them myself 😅.

<h3>appendix: verifying the templates for a draw</h3>

To verify the templates for a draw, we'll just count the number of configurations in which X or O win and add them up. The total number should equal the $126$ we computed earlier.

<b>O wins.</b> O only has four tokens, so any scenario in which O wins is just three O's along a row/column/diagonal and the fourth O placed in one of the remaining $6$ squares. There are $8$ possible rows/columns/diagonals, so there are $8 \cdot 6 = 48$ such configurations.

<b>X wins.</b> This is a little more complicated... time for some casework again (sorry). First, note that X has five tokens, so it's possible that it wins along multiple directions in the final configuration. We have the following cases:

- <b>X wins along exactly one direction, a row or column.</b> First, pick your favorite row or column as the winning one. We have two X's left to place, for a total of ${6 \choose 2} = 15$ possibilites. But $5$ of these result in X winning along two directions, so we only have $10$ possible configurations. There are $6$ rows and columns to choose from, giving a total of $60$ configurations.  
- <b>X wins along exactly one direction, a diagonal.</b> Again, we have $15$ possible configurations, but $7$ of them result in X winning along more than on direction. So our count is only $15 - 7 = 8$ configurations. With two diagonals, this gives us a total of $16$ configurations.
- <b>X wins along two directions.</b> There are ${8 \choose 2} = 28$ pairs of directions, but $6$ of them require six X's to achieve (two rows or two columns). So we get $22$ configurations this way.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-17-fig6.png" alt="Winning board configurations for X" title="tic-tac-toe X wins" style="width:100%">
  <figcaption>Figure 6. <b>Top.</b> X wins along exactly one direction, a row or column. Note the disallowed placement of the remaining two X's. <b>Middle.</b> X wins along exactly one direction, a diagonal. Note the disallowed placement of the remaining two X's. <b>Bottom.</b> X wins along two directions.</figcaption>
</figure>

Thus, our total number of configurations where X wins is $60 + 16 + 22 = 98$ possibilities.

At this point, if we add everything up we get $16 + 48 + 98 = 162$ total configurations. This is $36$ more than our target $126$, which is some cause for concern. Fortunately, this is only because we overcounted every configuration where <i>both</i> X <i>and</i> O win by one, so we just need to subtract the number of possible ways that can happen. The only way this occurs is if X and O both win along one row or column. There are $12$ possible row or column pairs, and $3$ remaining squares to put the last O.

<figure>
  <img src="https://github.com/sxzhang25/sxzhang25.github.io/raw/main/imgs/2021-01-17-fig7.png" alt="Examples of configurations where both O and X win" title="tic-tac-toe O and X win" style="width:100%">
  <figcaption>Figure 7. Some examples of configurations where both X and O win (this would be quite the disaster for our game variant).</figcaption>
</figure>

This gives us $36$ different configurations, and so our total turns out to be $16 + 48 + 98 - 36 = 126$, which is exactly the number we need!


<div class="footnotes">
<hr align="left" size="1">
<section id="footnote1"><sup>1</sup>Actually, the first two templates can also be considered as coming from one template---one is just on a diagonal line of symmetry whereas the other is on an orthogonal line of symmetry. This gives us $8$ total rotated configurations of this single template, yielding the same result as the discussion above. But I think looking at them as two separate templates is a little more natural to the square.</section>

<section id="footnote2"><sup>2</sup>On an $m \times n$ board, the first player to get $k$ squares in a row, column or diagonal wins. Along with tic-tac-toe, Connect 4 is another example of such a game.</section>
</div>
