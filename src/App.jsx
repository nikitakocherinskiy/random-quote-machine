import { useEffect, useState } from 'react'
import { getRandomColor } from './utils/functions'
import styles from './App.module.css'
import { fetchQuote } from './service/quoteService'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'

const App = () => {
	const [background, setBackground] = useState('purple')
	const [quote, setQuote] = useState('')
	const [author, setAuthor] = useState('')

	const { data, isLoading, isFetching, refetch } = useQuery(
		['quote'],
		() => fetchQuote(),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
	)

	useEffect(() => {
		if (data) {
			setQuote(data.quote)
			setAuthor(data.author)
		}
	}, [data])

	const handleClick = () => {
		const randomColor = getRandomColor()
		setBackground(randomColor)
		refetch()
	}

	return (
		<div style={{ background }} className={styles.container}>
			<h1 className={styles.header}>Random Quote Machine</h1>
			{isLoading || isFetching ? (
				<div className={styles.spinnerWrapper}>
					<h1 className={styles['spinner-header']}>Loading...</h1>
					<LoadingSpinner />
				</div>
			) : (
				<div>
					<p className={styles.quote}>{quote}</p>
					<p className={styles.author}>{author}</p>

					<button onClick={handleClick} className={styles.button}>
						New Quote
					</button>
				</div>
			)}
		</div>
	)
}

export default App
