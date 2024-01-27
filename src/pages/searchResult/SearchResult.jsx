import './style.scss'
import { fetchDataFromApi } from '../../utils/api'
import noResults from '../../assets/no-results.png'
// import {ContentWrapper} from '../../components/contentWrapper/ContentWrapper'
import { useEffect, useState } from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'
function SearchResult() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const { query } = useParams()



  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then(res => {
        setData(res)
        setLoading(false)
        setPageNum((prev) => prev + 1)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  // const fetchNextPageData = () => {
  //   setLoading(true)
  //   fetchDataFromApi(`search/multi?query=${query}&page=${pageNum}`)
  //     .then(res => {
  //       setData((prev) => [...prev, ...res])
  //       setLoading(false)
  //       setPageNum((prev) => prev + 1)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       setLoading(false)
  //     })
  // }


  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data &&
            data?.results?.length > 0
            ? (
              <>
                <div className="pageTitle">
                  {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                </div>
                <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={data?.total_pages >= pageNum}
                  loader={<Spinner />}
                >
                  {
                    data?.results?.map((item, index) => {
                      if (item?.media_type === "person") return;
                      return (
                        <MovieCard key={index} data={item} fromSearch={true} />
                      )
                    })
                  }
                </InfiniteScroll>
              </>
            )
            : (<span className="resultNotFound">
              Sorry, Result not found!
            </span>)
          }
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult
