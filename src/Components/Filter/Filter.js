import React, { useEffect } from "react";
import { db1 } from "../../db";
import { useSelector, useDispatch } from "react-redux";
import {
  renderAllProduct,
  renderSearchInput,
  renderSearchQuery,
  renderFilteredProducts,
  renderFilteredSelectedButton,
  renderFilteredPriceRange,
  resetPriceRange,
  renderFilteredCheckboxPriceRange,
  resetCheckboxPriceRange,
  setFilterMinPriceInput,
  setFilterMaxPriceInput,
  renderFilterMinMaxPriceInput,
  resetMinMaxPriceInput ,
} from "../../Redux/actions/filterSlice";

const Filter = () => {
  const searchQuery = useSelector((state) => state.filterProduct.searchQuery);
  const filteredProducts = useSelector((state) => state.filterProduct.filteredProducts);
  const priceRange = useSelector((state) => state.filterProduct.priceRange);
  const minPrice = useSelector((state) => state.filterProduct.minPrice);
  const maxPrice = useSelector((state) => state.filterProduct.maxPrice);
  const checkboxStates = useSelector((state) => state.filterProduct.checkboxStates);
  const minPriceInput = useSelector((state) => state.filterProduct.minPriceInput)
  const maxPriceInput = useSelector((state) => state.filterProduct.maxPriceInput)
  
  const dispatch = useDispatch();

  //Filter all products when the page loads and reloads : 
  useEffect(() => {
    dispatch(renderAllProduct(db1));
  }, [dispatch]);
  //Filter products based on input search : 
  const handleSearchChange = (event) => {
    dispatch(renderSearchQuery(event.target.value));
  };

  const handleSearchClick = () => {
    dispatch(renderSearchInput(searchQuery));
    dispatch(renderFilteredProducts());
    dispatch(resetPriceRange());
    dispatch(resetCheckboxPriceRange());
    dispatch(resetMinMaxPriceInput())
  };
  //Filter products based on category button : 
  const handleButtonClick = (category) => {
    dispatch(renderFilteredSelectedButton(category));
    dispatch(resetPriceRange());
    dispatch(resetCheckboxPriceRange());
    dispatch(resetMinMaxPriceInput())
  };
  //Filter products based on input range :
  const handleRangeChange = (event) => {
    const newPriceRange = [minPrice, Number(event.target.value)];
    dispatch(renderFilteredPriceRange(newPriceRange));
    dispatch(resetCheckboxPriceRange());
    dispatch(resetMinMaxPriceInput())
  };
  //Filter products based on checkbox range :
  const handleCheckboxChange = (event, range) => {
    const { checked } = event.target;
    dispatch(renderFilteredCheckboxPriceRange({ checked, range }));
    dispatch(resetPriceRange());
    dispatch(resetMinMaxPriceInput())
  };
  //Filter products based on min max input value : 
  const handleMinPriceInputChange = (event) => {
    const value = Number(event.target.value);
    dispatch(setFilterMinPriceInput(value));
  };

  const handleMaxPriceInputChange = (event) => {
    const value = Number(event.target.value);
    dispatch(setFilterMaxPriceInput(value));
  };

  const handleMinMaxPriceInputClick = () => {
    dispatch(renderFilterMinMaxPriceInput())
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearchChange}
        value={searchQuery}
      />
      <button onClick={handleSearchClick}>Search</button>
      <div>
        <button onClick={() => handleButtonClick("all")}>All</button>
        <button onClick={() => handleButtonClick("kitchen")}>Kitchen</button>
        <button onClick={() => handleButtonClick("electronic")}>
          Electronic
        </button>
        <button onClick={() => handleButtonClick("cloth")}>Cloth</button>
        <button onClick={() => handleButtonClick("stationary")}>
          Stationary
        </button>
      </div>
      <div>
        <label for="vol">
          Volume (between {minPrice} and {maxPrice}):
        </label>
        <input
          type="range"
          id="vol"
          name="vol"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={handleRangeChange}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            checked={checkboxStates.some(range => range[0] === 0 && range[1] === 1000)}
            onChange={(event) => handleCheckboxChange(event, [0, 1000])}
          />
          $0 - $1000
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            checked={checkboxStates.some(range => range[0] === 1001 && range[1] === 2000)}
            onChange={(event) => handleCheckboxChange(event, [1001, 2000])}
          />
          $1001 - $2000
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            checked={checkboxStates.some(range => range[0] === 2001 && range[1] === 4000)}
            onChange={(event) => handleCheckboxChange(event, [2001, 4000])}
          />
          $2001 - $4000
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            checked={checkboxStates.some(range => range[0] === 4001 && range[1] === 6000)}
            onChange={(event) => handleCheckboxChange(event, [4001, 6000])}
          />
          $4001 - $6000
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            checked={checkboxStates.some(range => range[0] === 6001 && range[1] === 18000)}
            onChange={(event) => handleCheckboxChange(event, [6001, 18000])}
          />
          $6001 - $18000
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            checked={checkboxStates.some(range => range[0] === 18001 && range[1] === 38000)}
            onChange={(event) => handleCheckboxChange(event, [18001, 38000])}
          />
          $18001 - $38000
        </label>
      </div>
      <div>
      <label>
          Min Price:
          <input
            type="number"
            value={minPriceInput}
            onChange={handleMinPriceInputChange}
            min={minPrice}
            max={maxPrice}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPriceInput}
            onChange={handleMaxPriceInputChange}
            min={minPrice}
            max={maxPrice}
          />
        </label>
        <button onClick={handleMinMaxPriceInputClick}>Apply Price Filter</button>
      </div>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <h2>{product.header}</h2>
          <p>{product.paragraph}</p>
          <p>Price: {product.price}</p>
          <p>Current Price: {product.currentPrice}</p>
          <p>Discount: {product.discount}</p>
          <p> {product.brand}</p>
          <p>{product.category}</p>
          <p>{product.product}</p>
        </div>
      ))}
    </>
  );
};

export default Filter;
