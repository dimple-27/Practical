import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiConstants, ApiBaseUrl, Api } from "../utils/ApiConstants";
import { useAxios } from "./apiClient";

export const getCategory = createAsyncThunk("getCategory", async (data: any) => {
  const apiURL = ApiBaseUrl + ApiConstants.category;
  const response = await useAxios({
    method: Api.POST,
    url: apiURL,
    data: data,
  });
  return response?.Result?.Category;
});

export const getSubCategory = createAsyncThunk("getSubCategory", async (data: any) => {
  const apiURL = ApiBaseUrl + ApiConstants.category;
  const response = await useAxios({
    method: Api.POST,
    url: apiURL,
    data: data,
  });
  return response?.Result?.Category[0]?.SubCategories;
});
