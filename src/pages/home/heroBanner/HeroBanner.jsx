import { useNavigate } from 'react-router-dom'
import './style.scss'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'

function HeroBanner() {

  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const { url } = useSelector((state) => state.home)
  const {data, loading} = useFetch('/movie/upcoming')
  const navigate = useNavigate()

  useEffect(() => {
    let index = Math.floor(Math.random() * 20)
    const bg = url.backdrop + data?.results?.[index]?.backdrop_path
    setBackground(bg)
  }, [data])

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      console.log('hi')
      navigate(`/search/${query}`)
    }
  }

  const executeSearch = () => {
    if (query.length > 0) {
      console.log('Search initiated');
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className='heroBanner'>
      {loading == false && <div className="backdrop-img">
        <Img src={background} />
      </div>}

      <div className="opacity-layer">
        
      </div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className='title'>Welcome</span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input
              type="text"
              placeholder='Search for a movie, tv show......'
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={()=>executeSearch()}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
