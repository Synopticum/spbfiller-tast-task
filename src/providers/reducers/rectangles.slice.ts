import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type Rectangle = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  backgroundColor: string;
};

type State = Rectangle[];

export const asyncFetchRectangles = createAsyncThunk(
  'asyncFetchRectangles',
  async (id: number, { rejectWithValue }) => {
    try {
      const employees: Rectangle[] = await fetch('/api/rectangles').then(res => res.json());
      return employees;
    } catch (e) {
      rejectWithValue(e);
    }
  },
);

const initialState: State = [];

const rectanglesSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(asyncFetchRectangles.pending, (state, action) => {
      // nothing
    });

    builder.addCase(asyncFetchRectangles.fulfilled, (state, action) => {
      const payload: Rectangle[] = action.payload ? action.payload : initialState;

      return payload;
    });

    builder.addCase(asyncFetchRectangles.rejected, (state, action) => {
      // nothing
    });
  },
});

export default rectanglesSlice.reducer;
