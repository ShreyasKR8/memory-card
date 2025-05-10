
function Card({ CardImage, onCardClick }) {
    return(
        <div className="card" onClick={onCardClick}>
            <img src={CardImage} width={"280px"} height={"280px"} className="card-image"/>
        </div>
    )
}

export default Card;