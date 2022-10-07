const highScoreList = document.getElementById("highScoreList");
const highScore = JSON.parse(localStorage.getItem("highScore")) // [];
highScoreList.innerHTML = highScores 
.map(score => {
    return <li class="high-score"> - ${score.name}</li> ;
})
.join("");