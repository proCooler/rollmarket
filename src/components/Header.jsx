const Header = (props)=> {
    return (<header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
            <img src="logo.png" alt="logo"/>
            <div>
                <h3>REACT SUSHI</h3>
                <p className="opacity-5">Самые вкусные роллы - здесь!</p>
            </div>
        </div>
        <ul className="d-flex">
            <li onClick={props.onClickCart} className="mr-30 cu-p">
                <img width={18} height={18} src="shop.svg"/>
                <span>1205 руб.</span>
            </li>
            <li>
                <img width={20} height={20} src="profile.svg" alt=""/>
            </li>
        </ul>
    </header>)
}

export default Header