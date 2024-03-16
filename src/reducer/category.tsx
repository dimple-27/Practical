import {
    createSlice,
    configureStore,
    createAction,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  import {
    getCategory, getSubCategory,
  } from "../api/apis";
  
  interface CategorySliceType {
    apiLoader: boolean;
    apiError: string;
    userData:object;
  }
  
  const initialState: CategorySliceType = {
    apiLoader: false,
    apiError: "",
    categoryList:[],
    subCategoryList:[]
  };
  
  const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
  
      updateApiLoader: (state, action: PayloadAction<any>) => {
        // Utils.log("Auth Slice Update Api Payload Got : ", action?.payload);
        if (action?.payload?.apiLoader)
          state.apiLoader = action?.payload?.apiLoader;
        else {
          state.apiLoader = false;
        }
  
        if (action?.payload?.apiError) {
          state.apiError = action?.payload?.apiError;
        } else state.apiError = "";
      },
    },
    extraReducers: (builder) => {
      //Get categoryList--------------------------
      builder.addCase(getCategory.fulfilled, (state, action) => {
  
        state.apiLoader = false;
        state.apiError = "";
        state.categoryList = action?.payload;
      });
      //Get sub categoryList--------------------------
      builder.addCase(getSubCategory.fulfilled, (state, action) => {
  
        state.apiLoader = false;
        state.apiError = "";
        state.subCategoryList = [...state.subCategoryList,...action?.payload];
      });

    },
  });
  export const {} = categorySlice.actions;
  export default categorySlice;
  