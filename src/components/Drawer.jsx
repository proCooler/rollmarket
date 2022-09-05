const Drawer = ({onCloseMart, removeCartItem, items = []}) => {

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Корзина
                    <img onClick={onCloseMart} className="removeBtn  cu-p" src="btn-remove.svg" alt="remove"/>
                </h2>

                {/* Условие, если в массиве корзины есть элементы то рендери блок с товарами, иначе рендери блок "ПУСТАЯ КОРЗИНА"*/}

                {items.length > 0 ? <div className="items">
                        {items.map((i) => (
                            <div className="cartItem d-flex align-center mb-20">
                                <div className="cartItemImg">
                                    <img width={80} height={80} src={i.imageUrl} alt="img"/>
                                </div>
                                <div className="m-10 flex">
                                    <p className="mb-5">{i.name}</p>
                                    <b>{i.price} руб.</b>
                                </div>
                                <img onClick={() => removeCartItem(i.id)} className="removeBtn" src="btn-remove.svg"
                                     alt="remove"/>
                            </div>
                        ))}
                        <div className="cardTotalBlock">
                            <ul>
                                <li><span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб.</b></li>
                                <li><span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб.</b></li>
                            </ul>
                            <button className="greenButton">Оформить заказ <img src="arrow.svg" alt="arrow"/></button>
                        </div>
                    </div> : <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20 width={120px} height={120px}" src="empty-cart.jpg" alt="emptycart"/>
                        <h2>Корзина пустая</h2>
                        <p className="opacity-6">Добавьте хотябы один товар, чтобы сделать заказ.</p>
                        <button onClick={onCloseMart} className="greenButton">
                            <img src="arrow.svg" alt="Arrow"/>
                            Вернуться назад
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Drawer