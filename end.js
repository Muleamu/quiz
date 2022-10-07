
function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

  function saveHighScore(score, highScores) {
    const name = prompt('You got a highscore! Enter name:');
    const newScore = { score, name };
  
  if (score > lowestScore) {
    saveHighScore(score, highScores); // TODO
    showHighScores(); // TODO
  }
}

  // 1. Add to list
  highScores.push(newScore);

  // 2. Sort the list
  highScores.sort((a, b) => b.score - a.score);
  
  // 3. Select new list
  highScores.splice(NO_OF_HIGH_SCORES);
  
  // 4. Save to local storage
  localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
};
