# find-the-treatos
a mini platform game made with phaser.js with a focus on Camera implementation
## How to Play
Use your `up`, `down`, `left`, and `right` arrow keys to move around the pup. The window only shows a part of the map zoomed in on you—go around the map to help the dog sniff out treats! There will be one existing treat at a time on the page!
###### unfortunately, this does mean that this game is not available on mobile at this moment.
## Loading the Game
### Live Site
The game is live at http://find-the-treatos.herokuapp.com. No need for additional installations or downloads.
### Local Files
If you'd like to download this project and examine the files while playing the game on your local machine, `git clone` to your target directory and `npm run build` followed by `npm start` to start up your local server.
## About the Game
This game was build off of a project tutorial template provided by Photon Storm. Newly integrated elements consist of the Camera object, adjusted physics/world-dimensions, sprites, and point creating/incrementing logic.
### Known Issues
- sprite clipping: because the 'turn' and 'left/right' sprites are of different frame widths, the user may sometimes appear to clip through the edge of platforms because the player model does not update to reflect the change in frame width, as the directional keys only trigger an animation sequence, not an actual change of state.
- treat generation: treats will sometimes generate inside an existing collision space, causing it to not appear correctly. current workaround is using a random number generator, and splitting it between comparisons that will allow the y-index to only appear between certain heights. better, but still does not work 100%.
