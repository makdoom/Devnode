import { Blog } from "@/types/blog.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  blogList: Blog[];
};

const initialState: initialStateType = {
  blogList: [],
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    setBlogList: (state, action: PayloadAction<Blog[]>) => {
      state.blogList = action.payload;
    },
  },
});

export const { setBlogList } = blogSlice.actions;

export default blogSlice.reducer;
