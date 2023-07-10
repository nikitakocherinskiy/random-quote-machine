import axios from 'axios'
import { API_KEY } from './data'

export const fetchQuote = async () => {
	const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
		headers: { 'X-Api-Key': API_KEY },
	})
	return response.data[0]
}
