import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  minPrice: 0,
  maxPrice: 0,
  priceRange: [0, 0],
  searchInput: "",
  searchQuery: "",
  selectedButton: "all",
  checkboxStates: [],
  minPriceInput: 0,
  maxPriceInput: 38000,
  filteredMinPrice: 0,
  filteredMaxPrice: 0,
};

export const filterSlice = createSlice({
  name: "filterProduct",
  initialState,
  reducers: {
    //To render whole products when page loads :
    renderAllProduct: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      //(To show filtered products based on price range)
      state.minPrice = Math.min(...action.payload.map((p) => p.price));
      state.maxPrice = Math.max(...action.payload.map((p) => p.price));
      state.priceRange = [state.minPrice, state.maxPrice];
      //(To show the value of price input based on min max price of whole products)
      state.minPriceInput = state.minPrice;
      state.maxPriceInput = state.maxPrice;
      //(To show min max price of filtered products on top of the page)
      state.filteredMinPrice = state.minPrice;
      state.filteredMaxPrice = state.maxPrice;
    },
    //To render products based on search input :
    renderSearchInput: (state, action) => {
      state.searchInput = action.payload;
      //(To erase category button filter)
      state.selectedButton = "all";
    },
    renderSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    //To render products based on all types of filter :
    renderFilteredProducts: (state) => {
      let products = state.products;
      //------------------------------------------------------------------------
      // Apply search filter :
      const searchTextLower = state.searchInput.toLowerCase();
      if (searchTextLower) {
        //To filter searched products based on header, brand, category, product
        products = products.filter((product) => {
          return (
            product.header.toLowerCase().includes(searchTextLower) ||
            product.brand.toLowerCase().includes(searchTextLower) ||
            product.category.toLowerCase().includes(searchTextLower) ||
            product.product.toLowerCase().includes(searchTextLower)
          );
        });
      }
      //------------------------------------------------------------------------
      // Apply category filter
      if (state.selectedButton !== "all") {
        products = products.filter((product) => {
          return product.category === state.selectedButton;
        });
      }
      //------------------------------------------------------------------------
      // Apply min-max input price range filter
      products = products.filter((product) => {
        return (
          product.price >= state.minPriceInput &&
          product.price <= state.maxPriceInput
        );
      });
      //------------------------------------------------------------------------
      // Apply checkbox price range filter
      if (state.checkboxStates.length > 0) {
        products = products.filter((product) => {
          return state.checkboxStates.some(
            (range) => product.price >= range[0] && product.price <= range[1]
          );
        });
      }

      if (
        state.priceRange[0] !== state.minPrice ||
        state.priceRange[1] !== state.maxPrice
      ) {
        products = products.filter((product) => {
          return (
            product.price >= state.priceRange[0] &&
            product.price <= state.priceRange[1]
          );
        });
      }
      //------------------------------------------------------------------------
      state.filteredProducts = products;
      state.filteredMinPrice = Math.min(...products.map((p) => p.price));
      state.filteredMaxPrice = Math.max(...products.map((p) => p.price));
    },
    //To render products based on category buttons :
    renderFilteredSelectedButton: (state, action) => {
      state.selectedButton = action.payload;
      filterSlice.caseReducers.resetFilters(state);
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
    //To render products based on input range
    renderFilteredPriceRange: (state, action) => {
      state.searchInput = "";
      state.searchQuery = "";
      state.selectedButton = "all";
      state.checkboxStates = [];
      state.minPriceInput = 0;
      state.maxPriceInput = 38000;
      state.priceRange = action.payload;
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
    resetPriceRange: (state) => {
      state.priceRange = [state.minPrice, state.maxPrice];
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
    //To render products based on checkboxes :
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
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
    resetCheckboxPriceRange: (state) => {
      state.checkboxStates = [];
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
    //To render products based on min max price input :
    setFilterMinPriceInput: (state, action) => {
      state.minPriceInput = action.payload;
    },
    setFilterMaxPriceInput: (state, action) => {
      state.maxPriceInput = action.payload;
    },
    renderFilterMinMaxPriceInput: (state) => {
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
    resetMinMaxPriceInput: (state) => {
      state.minPriceInput = 0;
      state.maxPriceInput = 38000;
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
    //To reset all filtered actions and back to default :
    resetFilters: (state) => {
      state.searchInput = "";
      state.searchQuery = "";
      state.priceRange = [state.minPrice, state.maxPrice];
      state.checkboxStates = [];
      state.minPriceInput = 0;
      state.maxPriceInput = 38000;
      filterSlice.caseReducers.renderFilteredProducts(state);
    },
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
  resetMinMaxPriceInput,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
