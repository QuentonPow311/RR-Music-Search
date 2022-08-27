import {useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/Searchbar'
import { DataContext } from './context/DataContext'
import { createResource as fetchData } from './Helper'
import ArtistView from './components/ArtistView'
import AlbumView from './components/AlbumView'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
	let [searchTerm, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])

	const API_URL = 'https://itunes.apple.com/search?term='

	useEffect(() => {
		if(searchTerm) {
			const fetchData = async () => {
				document.title = `${searchTerm} Music`
				const response = await fetch(API_URL + searchTerm)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [searchTerm])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<div>
			<SearchBar handleSearch = {handleSearch}/>
			{message}
			<DataContext.Provider value={data}>
				<Gallery />
			</DataContext.Provider>
			<AlbumView />
			<ArtistView />
		
		</div>
  	);
}

export default App;
