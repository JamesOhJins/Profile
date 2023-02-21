## [**Dog Scanner**](https://JamesOhJins.github.io/Profile/dogScanner.html)

- Set dog breed lists that I want to include
- Collect dog photos via Web Crawler
- Create model using Teachable Machine (https://teachablemachine.withgoogle.com/)
- Create model using own built Tensorflow code (https://medium.com/nanonets/how-to-easily-build-a-dog-breed-image-classification-model-2fd214419cde)
- Compare Accuracy and Loss per Epoch
- Improve dog model

## [**Tetris**](https://JamesOhJins.github.io/Profile/tetris.html) 
- Generate a playground that will store grid
- Generate grid with 25 px per square (GAME_COLS, GAME_ROWS), initialize GAME_COLS as 10, GAME_ROWS as 20.
- Each Rows should be prepended to the top of the grid. Using two for-loops, prepend lines. When all 20 Rows are generated add class top_line to the lastly added Row, prepend one extra Row and add class invisible. Invisible line will have value display:none, but will allow blocks to be able to be rotated right after it is rendered at the top line.
- When lines are deleted, new lines are prepended to the top. Add class invisible to lastly added line, and set  previous invisible to top_line.
- Make blocks.js that stores coordinate values of each block. Blocks will have different shape per rotatiob. Blocks will be render receiving block_type and direction as a parameter.
- make render block function that adds "moving" class. Blocks with "moving" class moves to y direction with down_interval that is pre-defined. Set initial x value of new block as 4, y as 1.
- make a seize function that removes down_interval, moving class and adds seized class.
- Add preview grid and make it render a block of random block_type. Whenever new block is seized(), render block with current block_type in preview. Preview is renewed and renders new random block of random block_type.
- Make a checkMatch() goes through each row and checks if entire row has block with seized class. It runs after each seized(). CheckMatch() removes line with full of seized class, adds score. If multi lines are removed at one seize, add bonus score. 
- Add more game features such as Stages, sound, multi_line removal display, etc.
- Tetris theme music by Patrick de Arteaga (https://patrickdearteaga.com/arcade-music/)

## [**Connect4**](https://JamesOhJins.github.io/Profile/connect4.html) 
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
                                                          [0][0][h][0][0]
   
   If yes, put disc at target, if not, move to step b)
   
   b) Check if it is in 2-in-a-line condition. 2-in-a-line is defined as:
   
                                                          [0][0][0][0][0]
                                                          [0][0][0][0][0]
                                                          [0][t][1][1][0]
                                                          [0][h][0][0][h]
                                                          [0][0][0][0][0]
                                                          
   If yes, put disc at target, if not, move to step 4.
   
   
