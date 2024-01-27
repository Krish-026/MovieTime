import './style.scss'
import { useSelector } from 'react-redux'

export default function Genres({ data }) {
    
    const { genres } = useSelector((state) => state.home)

  return (
      <div className="genres">
          {data?.map((genre, index) => {
              if (!genres[genre]) return null;
              return (
                  <div className="genre" key={index}>
                      {genres[genre]?.name}
                  </div>
              )
          })}
    </div>
  )
}
