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

export const fetchRectangles = createAsyncThunk('fetchRectangles', async (args: null, { rejectWithValue }) => {
  try {
    const rectangles: Rectangle[] = await fetch('/api/rectangles').then(res => res.json());
    return rectangles;
  } catch (e) {
    rejectWithValue(e);
  }
});

export const updateRectanglePosition = createAsyncThunk(
  'updateRectanglePosition',
  async (options: Pick<Rectangle, 'id' | 'x' | 'y'>, { rejectWithValue }) => {
    try {
      const initOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
      };
      const rectangles: Rectangle[] = await fetch('/api/rectangle', initOptions).then(res => res.json());
      return rectangles;
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
    builder.addCase(fetchRectangles.pending, (state, action) => {
      // nothing
    });

    builder.addCase(fetchRectangles.fulfilled, (state, action) => {
      const payload: Rectangle[] = action.payload ? action.payload : initialState;
      return payload;
    });

    builder.addCase(fetchRectangles.rejected, (state, action) => {
      // nothing
    });
  },
});

export default rectanglesSlice.reducer;
