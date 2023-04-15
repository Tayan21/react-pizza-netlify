import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { TCartItem } from "./cartSlice";
import { TSort } from "./filterSlice";

export type TSearchPizzaPrarms = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type TPizza = {
  id: string;
  title: string;
  types: number[];
  price: number;
  sizes: number[];
  imageUrl: string;
};

interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async ({ sortBy, order, category, search, currentPage }: TSearchPizzaPrarms) => {
    const { data } = await axios.get<TPizza[]>(
      `https://640b60e381d8a32198e2a60f.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data as TPizza[];
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];  
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS; 
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];  
    });   

  }

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.items = [];
  //     state.status = "error";
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
