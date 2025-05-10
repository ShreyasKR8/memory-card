
function Card({ CardImage, onCardClick }) {
    return(
        <div className="Card" onClick={onCardClick}>
            <img src={CardImage} width={"250px"} height={"280px"}/>
        </div>
    )
}

export default Card;