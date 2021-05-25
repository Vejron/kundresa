import axios from 'axios';

export async function getQuiz(nbr = 10) {
  
  return axios.get("https://opentdb.com/api.php?amount=" + nbr , {
    
  });
}