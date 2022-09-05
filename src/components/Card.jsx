import React from "react";

const Card = ({onFavorite, delFavorite, onPlus, name, img, price, items = []}) => {

    const [isAdded, setIsAdded] = React.useState(false);
    const onClickAdd = () => {
        onPlus({name, img, price})
        setIsAdded(!isAdded);
    }
    const obj = items.map(i => i.id)
    debugger
    const [isLiked, setIsFavorite] = React.useState(false);
    const onClickFavorite = (obj) => {
        if (isLiked === true) {
            onFavorite({name, img, price})
            setIsFavorite(!isLiked)
        } else {
            delFavorite(obj)
            setIsFavorite(!isLiked);
        }
    }

    return (
        <div className="card">
            <div className="favorite">
                <img src={isLiked ? "liked.svg" : "unliked.svg"} alt="unliked"
                     onClick={onClickFavorite}/>
            </div>
            <img width={122} height={112}
                 src={img} alt="photosushi"/>

            <h5>{name}</h5>
            <div className=" d-flex justify-between align-center">
                <div className=" d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className="cu-p"
                     onClick={onClickAdd}
                     src={isAdded ? "btn-checked.svg" : "btn-plus.svg"} alt=" plus"/>
            </div>
        </div>
    )
}
export default Card