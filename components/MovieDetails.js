import React from 'react'
/* Left side checkbox component */
//const no_thumb = require('../styles/assets/no_thumb.jpg');
export const detailRow = (title, value) => <div className="title"><strong>{title}: </strong>{value}</div>


class MovieDetails extends React.Component {
    render() {
        const { data } = this.props
        const image = data.Poster !== "N/A"
        return (
            <div className="list-item">
                {detailRow('Title', data.Title)}
                {detailRow('Type', data.Type)}
                {detailRow('Year', data.Year)}
                {image ?
                    <img src={data.Poster} alt="/no_thumb.jpg" />
                    : <img src="/no_thumb.jpg" alt=" No Image " />}
            </div>
        )
    }
}

export default MovieDetails
