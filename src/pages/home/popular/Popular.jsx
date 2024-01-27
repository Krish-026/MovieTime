import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import "./style.scss"
import useFetch from "../../../hooks/useFetch"
import { useState } from "react"
import Carousel from "../../../components/carousel/Carousel"
function Trending() {

    const [endpoint, setEndpoint] = useState('movie')

    const { data, loading } = useFetch(`/${endpoint}/popular`)

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movies' ? 'movie' : 'tv')
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">
                    Popular
                </span>
                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={ onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} endpoint={endpoint} loading={loading}/>
        </div>
    )
}

export default Trending
