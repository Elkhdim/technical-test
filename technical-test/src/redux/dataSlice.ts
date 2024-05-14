import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Data {
  id: number;
}

interface DataState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  data: Data[] | null;
}

const initialState: DataState = {
  status: "idle",
  error: null,
  data: null,
};

export const fetchData = createAsyncThunk<Data[], string>(
  "data/fetchData",
  async (apiUrl: string) => {
    const response = await fetch(apiUrl);
    console.log("res: ", response);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: Data[] = await response.json();

    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong.";
      });
  },
});

export default dataSlice.reducer;
