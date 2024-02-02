document.addEventListener('DOMContentLoaded', function() {
    var lives = 3;
    var score = 30;
    var viewedScore = document.getElementById('score');
    const plansza = document.getElementById('plansza');
    const dialog = document.getElementById('dialog');
    var btnYes = document.getElementById('btnYes');
    var btnNo = document.getElementById('btnNo');
    var interwal;

    function executeWithRandomInterval() {
        const zombie = document.createElement('div');
        zombie.classList.add('zombie');
        zombie.style.bottom = Math.random() * 100 + 'px';


        var min = 10;
        var max = 30;
        var walkSpeed = Math.floor(Math.random()*(max-min+1)+min);
        var animation = "0.5s,"+walkSpeed+"s"
        zombie.style.animationDuration = animation;


        var scale = 0.8 + Math.random() * 0.5;
        zombie.style.transform = "scale("+scale+")";

        plansza.appendChild(zombie);
        clearInterval(interwal);
        setRandomInterval();
    }

    function handlePlanszaClick(element) {
        if (score > 0 && lives > 0) {
            if (element.target.classList.contains('zombie')) {
                element.target.remove();
                score += 10;
            } else {
                score -= 3;
            }
            viewedScore.innerHTML = score;
        }
    }

    function handleZombieMovement() {
        var zombies = document.querySelectorAll('.zombie');
        zombies.forEach(function(zombie) {
            var zombieRect = zombie.getBoundingClientRect();
            if (zombieRect.left <= 0) {
                handleLivesDecrease();
                zombie.remove();
            }
        });

        executeWithRandomInterval();
    }

    function handleLivesDecrease() {
        if (lives > 0) {
            const heart = document.getElementById('serce' + lives);
            heart.style.backgroundImage = 'url("zad3images/empty_heart.png")';
            lives--;

            if (lives === 0) {
                const finalScore = document.getElementById('resultScore');
                finalScore.textContent = score;
                dialog.showModal();
                clearInterval(interwal);
            }
        }
    }

    function resetGame() {
        lives = 3;
        score = 33;

        for (let i = 1; i <= 3; i++) {
            const heart = document.getElementById('serce' + i);
            heart.style.backgroundImage = 'url("zad3images/full_heart.png")';
        }

        var zombies = document.querySelectorAll('.zombie');
        zombies.forEach(function(zombie) {
            zombie.remove();
        });

        setRandomInterval()
    }

    function setRandomInterval() {
        var randomTime = Math.random() * (1000 - 200) + 200;
        interwal = setInterval(handleZombieMovement, randomTime);
    }

    plansza.addEventListener('click', handlePlanszaClick);

    btnYes.addEventListener('click', function() {
        clearInterval(interwal);
        resetGame();
        dialog.close();
    });

    btnNo.addEventListener('click', function() {
        dialog.close();
        clearInterval(interwal);
    });

    setRandomInterval();
});