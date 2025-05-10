
function Card({ CardImage, onCardClick, extraClassName }) {
    return(
        <div className={"card " + extraClassName} onClick={onCardClick}>
            <img src={CardImage} width={"280px"} height={"280px"} className="card-image"/>
        </div>
    )
}

export default Card;