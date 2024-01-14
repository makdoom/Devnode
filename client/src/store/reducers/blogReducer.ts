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

    updateBlogTitle: (state, action: PayloadAction<Blog>) => {
      let blogIndex = state.blogList.findIndex(
        (item) => item._id === action.payload._id
      );
      if (blogIndex > -1) {
        state.blogList[blogIndex] = { ...action.payload };
      }
    },
  },
});

export const { setBlogList, updateBlogTitle } = blogSlice.actions;

export default blogSlice.reducer;
