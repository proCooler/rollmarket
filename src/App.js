import React from "react";
import './App.css';
import axios from "axios";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";


function App() {

    const [items, setItems] = React.useState([])
    const [searchInput, setSearchInput] = React.useState('')
    const [cartItems, setCartItems] = React.useState([])
    const [cardOpened, setCardOpened] = React.useState(false)
    const [liked, setLiked] = React.useState([])

    {/* Создаем хук который после первой отрисовки приложения передает с сервера
    Товары для начальной страницы и товары добавленные в корзину*/
    }

    React.useEffect(() => {
        axios.get('https://6309ee62f8a20183f778ef20.mockapi.io/items').then(res => {
            setItems(res.data)
        });
        axios.get('https://6309ee62f8a20183f778ef20.mockapi.io/cart').then(res => {
            setCartItems(res.data)
        });


    }, [])

    {/* При вводе букв в поле ПОИСК получаем событие и передаем через хук функцию текущее значение*/
    }

    const onSearchInput = (event) => {
        setSearchInput(event.target.value)
    }

    {/* Функция получает в себя объект который был выбран и добавлен в корзину
    после этого она добавляет объект в наш массив на сервере*/
    }

    const addToCart = (obj) => {
        setCartItems([...cartItems, obj])
        axios.post('https://6309ee62f8a20183f778ef20.mockapi.io/cart', obj)
    }

    {/* При удалении передаем id в setCartItems настраиваем фильтр,
    чтобы пришедший айди не попадал в фильтр для отображения товара в корзине,
     и удаляем объект из массива на сервере*/
    }

    const removeCartItem = (id) => {
        axios.delete(`https://6309ee62f8a20183f778ef20.mockapi.io/cart/${id}`)
        setCartItems((p) => p.filter((i) => i.id !== id));
    }

    const addFavorite = (obj) => {
        setCartItems([...liked, obj])
        axios.post('https://6309ee62f8a20183f778ef20.mockapi.io/liked', obj)
    }

    const deleteFavorite = (id) => {
        axios.delete(`https://6309ee62f8a20183f778ef20.mockapi.io/liked/${id}`)
        setLiked((p) => p.filter((i) => i.id !== id));
    }

    {/* Создаем переменную CardItem и присваиваем ей компоненту Card и мапим массив для передачи в пропс значений*/
    }

    const CardItem = items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase())).map(f =>
        <Card
            key={f.name}
            img={f.imageUrl}
            name={f.name}
            price={f.price}
            onPlus={(obj) => addToCart(f)}
            onFavorite={(obj) => addFavorite(f)}
            delFavorite={deleteFavorite}
            items={cartItems}/>)

    {/* Отрисовываем */
    }

    return (
        <div className="wrapper clear">
            {cardOpened &&
                <Drawer items={cartItems} removeCartItem={removeCartItem} onCloseMart={() => setCardOpened(false)}/>}
            <Header onClickCart={() => setCardOpened(true)}/>
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>{searchInput ? `Результат поиска по: "${searchInput}"` : 'Служба доставки роллов и суши'}</h1>
                    <div className="search-block d-flex p-10">
                        <img width={23} height={23}
                             src="search.svg" alt="Search"/>
                        <input onChange={onSearchInput} value={searchInput} placeholder="Поиск..."/>
                        {searchInput && (<img onClick={() => setSearchInput('')} searchInputclassName="removeBtn"
                                              src="btn-remove.svg" alt="remove"/>)}
                    </div>
                </div>
                <div className=" d-flex flex-wrap">
                    {CardItem}
                </div>
            </div>
        </div>
    );
}

export default App;
