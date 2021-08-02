// First and simple game in JS using Kaboom
// Mario vs Nintendo 8-bits
// Author: Rocken2k

kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],})

// Speed identifiers
const MOVE_SPEED = 75
const ENEMY_SPEED1 = 0
const ENEMY_SPEED2 = 10
const ENEMY_SPEED3 = 50
const MOVISTAR_SPEED = 65
const BULLET_SPEED = 120

// Load images from Rocken2k i.imgur account
loadRoot('https://i.imgur.com/')
loadSprite('star', 'yZy8zED.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('coin', 'XTbML0w.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('browser', '6KWTQ69.png')
loadSprite('charizard', '2xFDcAa.png')
loadSprite('donkeyKong', 'KIGJQTl.png')
loadSprite('Link', 'Mgjjmuc.png')
loadSprite('megaMan', 'kRBeg8p.png')
loadSprite('pacMan', 'lWcjbr3.png')
loadSprite('puffy', 'zKdkdEo.png')
loadSprite('sonic', 'lGWmSON.png')
loadSprite('blackStar', '1v20dzE.png')
loadSprite('fire', 'RkcMdDP.png')

//Creat Map
scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      '======================================================================================================================',
      '=b                          1 1 1        1         5     3              2 2     8   6      3         7 7 7    1    61#',
      '=b                    4     rrrr          4   8         3 1   r  r   8               6       7     6     3  4  7 7 72#',
      '=b                          r  r        8 8            4      r r     8  1     4 rr    r  4  8       r  r    4     81#',
      '=b                     5    rrr         3  8   5   1    1   3 rr       6         r r   r     6 6    5r r       6 6 62#',
      '=b                          r  r          2             2     r r   2   7  2     r  r  r  7          rr   4   1    71#',
      '=b                      6   r   r       rrrrr                 r  r       8       r   r r     6 6 8   r r     2 8 8 82#',
      '=b              1                2 2 2  r   r      5 5      2    1   5    8   3  r    rr     1 2     r  r   3      61#',
      '=b                2        6            r   r         4    5    1                           9    3          3      72#',
      '=b                  3        6          r   r     3  rrrrr    2       rrrr     2   6 6 6    rrrrr   7 7 7 7        81#', 
      '=b                  2 2 2      6 4 5    rrrrr   2    r                r            6     4      r    1        16 6 62#',
      '=b               4        3            3    1        r        1   5   rrrr    2 1  6  2     rrrrr     2   4        71#',
      '=b            3           1 2 1        3          2  r                r            6 6 6    r     1    3       8 8 82#',
      '=b          2  4    6 6           4    3      3      rrrrr        2   rrrr    1 2          3rrrrr      1  3   2    61#',
      '======================================================================================================================',
    ], ]

//Creat images with their propreties
  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('block'), solid(), 'wall'],
	'#': [sprite('coin'), solid(), scale(0.3), 'wallwin'],
    'r': [sprite('star'), solid(), scale(0.3), 'star'],
    'b': [sprite('blackStar'), solid(), scale(0.3), 'movestar'],
    '1': [sprite('browser'), solid(), scale(0.3), 'dangerous1'],
    '2': [sprite('charizard'), solid(), scale(0.3), 'dangerous1'],
    '3': [sprite('donkeyKong'), solid(), scale(0.3), 'dangerous2'],
    '4': [sprite('Link'), solid(), scale(0.3), 'dangerous2'],
    '5': [sprite('puffy'), solid(), scale(0.3), 'dangerous2'],
    '6': [sprite('pacMan'), solid(), scale(0.3), 'dangerous2'],
    '7': [sprite('megaMan'), solid(), scale(0.3), 'dangerous3'],
    '8': [sprite('sonic'), solid(), scale(0.3), 'dangerous3'],}
  
//Create level
  const gameLevel = addLevel(maps[level], levelCfg)

//Creat score label
  const scoreLabel = add([
    text('score ' + score),
    pos(25, 40),
    layer('ui'),
    {value: score,}])
	
//Create initial instructions  
  const instruction = add([
    text('- Use the arrows to move\n- Use space to shoot\n- Do not touch anything'),
    pos(25, 80),
    layer('ui'),])
	
//Create logo  
  const creator = add([
    text('Rocken2k'),
    pos(25, 120),
    layer('ui'),])

//Create the player
  const player = add([
    sprite('mario'), solid(),
    pos(150, 150),
    origin('bot'),
    layer('obj'),])  

//The camera follow the player on the screen
  player.action(() => {
    camPos(player.pos)})

//Player movement (left, right, up, down and shoot) 
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)})

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)})

  keyDown('down', () => {
    player.move(0, MOVE_SPEED)})

  keyDown('up', () => {
    player.move(0, -MOVE_SPEED)})

  keyPress('space', () => {
    spawnBullet(player.pos.add(0, -10))})
      
//walls action
  player.collides('wall', (e) => {
    go('lose', { score: scoreLabel.value})})

//Rocken2k stars action
  player.collides('star', (y) => {
    go('lose', { score: scoreLabel.value})})

//winner wall action
  player.collides('wallwin', (e) => {
    go('win', { score: scoreLabel.value})})

//black star action
  action('movestar', (s) => {
    s.move(MOVISTAR_SPEED, 0)})
  player.collides('movestar', (s) => {
    go('lose', { score: scoreLabel.value})})

//Enimies speed1 action
  player.collides('dangerous1', (d) => {
      go('lose', { score: scoreLabel.value})})

//Enimies speed2 action
  action('dangerous2', (d) => {
    d.move(-ENEMY_SPEED2, 0)})
  player.collides('dangerous2', (d) => {
      go('lose', { score: scoreLabel.value})})

//Enimies speed3 action
  action('dangerous3', (d) => {
    d.move(-ENEMY_SPEED3, 0)})
  player.collides('dangerous3', (d) => {
      go('lose', { score: scoreLabel.value})})

// Shoot function 
 function spawnBullet(p) {
  add([
    rect(20,2), 
    pos(p), 
    origin('center'), 
    sprite('fire'), solid(), scale(0.5),
    'bullet' ]) }

//bullet action   
  action('bullet', (b) => {
  b.move(BULLET_SPEED, 0)
  if (b.pos.y < 0) {
    destroy(b)}})

// stars destroy bullet
  collides('bullet', 'star', (b,y) => {
    destroy(b)})


//bullet destroy enimies speed1
  collides('bullet', 'dangerous1', (b,d) => {
    destroy(b)
    destroy(d)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value })
  collides('movestar', 'dangerous1', (b,d) => {
    destroy(d)})

//bullet destroy enimies speed2
  collides('bullet', 'dangerous2', (b,e) => {
     destroy(b)
    destroy(e)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value})
  collides('movestar', 'dangerous2', (b,e) => {
    destroy(e)})

//bullet destroy enimies speed3
  collides('bullet', 'dangerous3', (b,f) => { 
    destroy(b)
    destroy(f)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value})
  collides('movestar', 'dangerous3', (b,f) => {
    destroy(f)})

})

//Loser message
scene('lose', ({ score }) => {
  add([text('YOU LOST' + '\n\nscore: ' + score, 32), origin('center'), pos(width()/2, height()/ 2)])})

//Winner message 
  scene('win', ({ score }) => {
  add([text('YOU WON' + '\n\nscore: ' + score, 32), origin('center'), pos(width()/2, height()/ 2)])})

start("game", { level: 0, score: 0})