import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filterProduct",
  initialState: {
    products: [],
    searchInput: "",
    searchQuery: "",
    filteredProducts: [],
    selectedButton: "all",
    priceRange: [0, 38000],
    minPrice: 0,
    maxPrice: 38000,
    selectedPriceRange: [],
    checkboxStates: [],
    minPriceInput: 0,
    maxPriceInput: 38000,
  },
  reducers: {
    //when product page loads , it renders all products on the page.
    renderAllProduct: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      //To change the price range min max price based on filtered product's min max price (if you have price range filter in your project)
      state.minPrice = Math.min(...action.payload.map((p) => p.price));
      state.maxPricePrice = Math.max(...action.payload.map((p) => p.price));
      state.priceRange = [state.minPrice, state.maxPrice];
    },
    //Filter products based on input search.
    renderSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    renderSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    renderFilteredProducts: (state) => {
      const searchTextLower = state.searchInput.toLowerCase();
      state.selectedButton = "all";
      state.filteredProducts = state.products.filter((product) => {
        return (
          product.header.toLowerCase().includes(searchTextLower) ||
          product.paragraph.toLowerCase().includes(searchTextLower) ||
          product.brand.toLowerCase().includes(searchTextLower) ||
          product.category.toLowerCase().includes(searchTextLower) ||
          product.product.toLowerCase().includes(searchTextLower)
        );
      });
      //To change the price range min max price based on filtered product's min max price (if you have price range filter in your project)
      state.minPrice = Math.min(...state.filteredProducts.map((p) => p.price));
      state.maxPrice = Math.max(...state.filteredProducts.map((p) => p.price));
      state.priceRange = [state.minPrice, state.maxPrice];
    },
    //Filter products based on button click (category, brand and ...)
    renderFilteredSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
      if (state.selectedButton === "all") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) => {
          return product.category === state.selectedButton;
        });
      }
      //To change the price range min max price based on filtered product's min max price (if you have price range filter in your project)
      state.minPrice = Math.min(...state.filteredProducts.map((p) => p.price));
      state.maxPrice = Math.max(...state.filteredProducts.map((p) => p.price));
      state.priceRange = [state.minPrice, state.maxPrice];
    },
    //Filter products based on price range :
    renderFilteredPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        return (
          product.price >= state.priceRange[0] &&
          product.price <= state.priceRange[1]
        );
      });
    },
    resetPriceRange: (state) => {
      //To change the price range min max price based on filtered product's min max price (if you have price range filter in your project)
      state.priceRange = [state.minPrice, state.maxPrice];
    },
    //Filter products based on checkbox :
    renderFilteredCheckboxPriceRange: (state, action) => {
      const { checked, range } = action.payload;
      if (checked) {
        state.checkboxStates.push(range);
      } else {
        state.checkboxStates = state.checkboxStates.filter(
          (selectedRange) =>
            selectedRange[0] !== range[0] || selectedRange[1] !== range[1]
        );
      }
      if (state.checkboxStates.length === 0) {
        state.selectedPriceRange = [];
        state.filteredProducts = state.products;
      } else {
        state.selectedPriceRange = state.checkboxStates;
        state.filteredProducts = state.products.filter((product) =>
          state.selectedPriceRange.some(
            ([min, max]) => product.price >= min && product.price <= max
          )
        );
      }
    },
    resetCheckboxPriceRange: (state) => {
      state.checkboxStates = [];
    },
    //Filter based on maximum and minimum input price range :
    setFilterMinPriceInput: (state, action) => {
      state.minPriceInput = action.payload;
    },
    setFilterMaxPriceInput: (state, action) => {
      state.maxPriceInput = action.payload;
    },
    renderFilterMinMaxPriceInput: (state) => {
      state.filteredProducts = state.products.filter((product) => {
        return (
          product.price >= state.minPriceInput &&
          product.price <= state.maxPriceInput
        );
      });
    },
    resetMinMaxPriceInput : (state) => {
        state.minPriceInput = state.minPrice
        state.maxPriceInput = state.maxPrice
    }
  },
});

export const {
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
} = filterSlice.actions;

export default filterSlice.reducer;
