'use strict';

var lives = 5;

var spaceshipPosition = 0;

var ammo = 10;



var getKeyNumber = function(number) {
  return 'asdfghjkl;'[key];
}

var getNumberKey = function(key) {
  return 'asdfghjk;'.indexOf(key);
}

var howler = require('howler');

var laser = new howler.Howl({
  src: ['assets/laser.ogg'],
  sprite: {
    'L1': [0, 100],
    'L2': [0, 7],
    'alien': [7800, 200]
  }
});

var boom = new howler.Howl({
  src: ['assets/boom.ogg']
});

var spaceship = new howler.Howl({
  src: ['assets/spaceship.ogg']
});

var reload = new howler.Howl({
  src: ['assets/reload.ogg'],
  sprite: { 'READY': [0, 2100] }
});

var gameover = new howler.Howl({
  src: ['assets/gameover.ogg']
});

// 0 - 9
var r = function() {
  var nr = Math.floor(Math.random() * 10);
  console.log(nr);
  return nr;
};


var spawn = function() {
  var pos = (r()/5)-1;

  console.log(pos)

  spaceshipPosition = pos;
  spaceship.loop(true);

  spaceship.stereo(pos);
  spaceship.play();
}

var stop = function() {
  spaceship.stop();
  spaceshipPosition = undefined;
  boom.play();
  setTimeout(spawn, 1000)
}


laser.play('alien');

var alienShooting = function() {
  setTimeout(function() {
    laser.play('alien');
    lives -= 1;


    if (lives < 1) {
      spaceship.stop();
      gameover.play();
      return;
    }

    console.log('lives: ', lives)
    alienShooting();
  }, 2000);
}

alienShooting();




var foo = function(bla, blub) {
  if (spaceshipPosition > bla && spaceshipPosition <= blub) {
    stop();
  }
}

document.addEventListener('keydown', function(e){
  var k = e.key;
  console.log(k);


  if (k !== ' ') {
    ammo -= 1;
    if (ammo < 1) {

    }
    console.log('ammo ', ammo);
  }

  // SPACEW RELOAD!
  if (k === ' ') {
    reload.play('READY');
    setTimeout(function() {
      ammo = 10;
    }, 2000);
  }

  var laserSound = 'L1'

  if (ammo < 0) {
    laser.play('L2');
    return;
  }

  laser.volume(1.5);


  if (k === 'a') {
    laser.stereo(-0.9);
    laser.play(laserSound);
    foo(-1000, -0.9);
  } else if (k === 's') {
    laser.stereo(-0.7);
    laser.play(laserSound);
    foo(-0.9, -0.7);
  } else if (k === 'd') {
    laser.stereo(-0.5);
    laser.play(laserSound);
    foo(-0.7, -0.5);
  } else if (k === 'f') {
    laser.stereo(-0.3);
    laser.play(laserSound);
    foo(-0.5, -0.3);
  } else if (k === 'g') {
    laser.stereo(-0.1);
    laser.play(laserSound);
    foo(-0.3, -0.1);
  } else if (k === 'h') {
    laser.stereo(0.1);
    laser.play(laserSound);
    foo(-0.1, 0.1);
  } else if (k === 'j') {
    laser.stereo(0.3);
    laser.play(laserSound);
    foo(0, 0.3);
  } else if (k === 'k') {
    laser.stereo(0.5);
    laser.play(laserSound);
    foo(0.3, 0.5);
  } else if (k === 'l') {
    laser.stereo(0.7);
    laser.play(laserSound);
    foo(0.5, 0.7);
  } else if (k === ';') {
    laser.stereo(0.9);
    laser.play(laserSound);
    foo(0.7, 1000);
  }


  // MEGASPECIALTESTKEY
  else if (e.key === '-') {
    spawn();
  }
});

spawn()