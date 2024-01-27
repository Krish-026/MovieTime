import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api"
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
function App() {

  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {

    fetchDataFromApi('/configuration')
      .then((response) => {
        console.log(response);
        const sendUrl = {
          backdrop: response.images.secure_base_url + 'original',
          poster: response.images.secure_base_url + 'original',
          profile: response.images.secure_base_url + 'original',
        }
        dispatch(getApiConfiguration(sendUrl))
      })
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie']
    let allGenres = {}

    endPoints.forEach((endPoint) => {
      promises.push(fetchDataFromApi(`/genre/${endPoint}/list`))
    })

    const data = await Promise.all(promises)
    console.log('data', data)
    data.forEach(({ genres }) => {
      return genres.forEach((genre) => {
        allGenres[genre.id] = genre
      })
    });
    console.log('allGenres', allGenres)
    dispatch(getGenres(allGenres))
  }



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
