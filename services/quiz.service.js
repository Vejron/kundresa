import axios from 'axios';

export async function getQuiz(nbr = 10, difficulty = 'easy') {
  
  return axios.get("https://opentdb.com/api.php", {
    params: {
      amount: nbr,
      difficulty: difficulty
    }
  });
}