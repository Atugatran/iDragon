let score = 0;
let cross = true;
dino = document.querySelector(".dino");
gameOver = document.querySelector(".gameOver");
obstacle = document.querySelector(".obstacle");
audio = new Audio("music.mp3");
audiogo = new Audio("gameover.mp3");
obstacle.classList.remove("obstacleAni");

// obstacle speed
aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
newDur = 1.8;
obstacle.style.animationDuration = newDur + 's';
// console.log('New animation duration: ', newDur)

// setTimeout(() => {
// }, 1000);
document.onkeydown = function (e) {
    audio.play();
    gameOver.style.display = 'none';
    obstacle.classList.add("obstacleAni");
  // console.log("Key code is: ", e.keyCode)
  if (e.keyCode == 38 || e.keyCode == 32) {
    dino = document.querySelector(".dino");
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }
  // if (e.keyCode == 39) {
  //     dino = document.querySelector('.dino');
  //     dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  //     dino.style.left = dinoX + 150 + "px";
  // }
  // if (e.keyCode == 37) {
  //     dino = document.querySelector('.dino');
  //     dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  //     dino.style.left = (dinoX - 150) + "px";
  // }
};

setInterval(() => {
  dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
  dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - oy);
  // console.log(offsetX, offsetY)
  if (offsetX < 100 && offsetY < 100) {
    audio.pause();
    gameOver.style.display = 'block';
    gameOver.innerHTML = `Game Over - Your Score ${score}`;
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    score = 0;
    setTimeout(() => {
      audiogo.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
        // aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.01;
        obstacle.style.animationDuration = newDur + 's';
        // console.log('New animation duration: ', newDur)
    }, 500);
  }
}, 10);

