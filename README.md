# Tetris
Tetris theme music by Patrick de Arteaga (https://patrickdearteaga.com/arcade-music/)
Tetris (https://jins10.github.io/Profile/games.html)

#Dog Scanner
Dog scanner(https://jins10.github.io/Profile/dogScanner.html)

#Connect4
Connect4 (https://jins10.github.io/Profile/connect4.html)

Algorithm used to make AI.
Think() function will find the best moves corresponding to user's move. There are 7 Columns in a matrix, so Think() function will choose index that results the best outcome. Priority for the outcome is defined as:

1. Check if Computer has any 3 lines linked horizontally, diagonally, or vertically that has not been blocked by player yet. If yes, move to 1. a). If not, move to step 2.
   a) Check if it is stacked horizontally. If yes, put disk at x index of that column. If not, move to b).
   b) Check if Computer can connect it to make it 4, if yes, choose following column. If not, move to 2.
   
2. Check if Player has any 3 lines linked horizontally, diagonally, or vertically that has not been blocked by Computer yet. If yes, move to 2. a). If not, move to step 3.
  a) Check if it is stacked horizontally. If yes, put disk at x index of that column. If not, move to b).
  b) Define x and y value of the spot that can link 4 as target. Check if Computer can put at target. If yes, put disc at target. If No, move to c).
  b) Check if target's y value - 1 is equal to current height of that x index. For example, 1 = player's discs, t = target, h = height:
  in this case, if computer puts discs into x = 4, player can end. So define x = 4 as doNotPut and do not put disc to h unless that's the only option.
                                                    
                                                          [0][0][0][0][0]
                                                          [0][0][0][0][0]
                                                          [0][1][1][1][t]
                                                          [0][0][0][0][0]
                                                          [0][0][0][0][h]

3. Check if computer has any 2 lines linked horizontally, if yes, move to 3. a. If not, move to step 2.
  a) Check if it is in 2 + 1 condition. 2 + 1 condition is defined as:
                                                            
                                                          [0][0][0][0][0]
                                                          [0][0][0][0][0]
                                                          [0][0][0][0][0]
                                                          [1][1][t][1][0]
                                                          [0][0][h][0][h]
   
   If yes, put disc at target, if not, move to step b)
   
   b) Check if it is in 2-in-a-line condition. 2-in-a-line is defined as:
   
                                                          [0][0][0][0][0]
                                                          [0][0][0][0][0]
                                                          [0][t][1][1][0]
                                                          [0][h][0][0][h]
                                                          [0][0][0][0][0]
                                                          
   If yes, put disc at target, if not, move to step 4.
   
   
