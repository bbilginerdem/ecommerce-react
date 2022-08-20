import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();

// if exists in localStorage take it otherwise use empty array
const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
	// products in the basket
	const [items, setItems] = useState(defaultBasket);

	// when basketItems changed update defaultBasket
	useEffect(() => {
		localStorage.setItem("basket", JSON.stringify(items));
	}, [items]);

	// function to add product to the basket
	const addToBasket = (data, findBasketItem) => {
		if (!findBasketItem) {
			return setItems((items) => [data, ...items]);
		}

		// if inside basket it will be removed when clicked again
		const filtered = items.filter(
			(item) => item._id !== findBasketItem._id
		);
		setItems(filtered);
	};

	// function to remove product from the basket
	const removeFromBasket = (item_id) => {
		const filtered = items.filter((item) => item._id !== item_id);
		setItems(filtered);
	};

	const emptyBasket = () => setItems([]);

	const values = {
		items,
		setItems,
		addToBasket,
		removeFromBasket,
		emptyBasket,
	};

	return (
		<BasketContext.Provider value={values}>
			{children}
		</BasketContext.Provider>
	);
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
