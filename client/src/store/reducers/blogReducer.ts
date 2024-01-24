import { Blog } from "@/types/blog.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isSidebarOpen: boolean;
  blogList: Blog[];
  selectedBlogId: string;
};

const initialState: initialStateType = {
  isSidebarOpen: true,
  blogList: [],
  selectedBlogId: "",
};

const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    setBlogList: (state, action: PayloadAction<Blog[]>) => {
      state.blogList = action.payload;
    },

    updateBlog: (state, action: PayloadAction<Blog>) => {
      let blogIndex = state.blogList.findIndex(
        (item) => item._id === action.payload._id
      );
      if (blogIndex > -1) {
        state.blogList[blogIndex] = { ...action.payload };
      }
    },

    updateSelectedBlogId: (state, action: PayloadAction<string>) => {
      state.selectedBlogId = action.payload;
    },
  },
});

export const { setBlogList, updateBlog, toggleSidebar, updateSelectedBlogId } =
  blogSlice.actions;

export default blogSlice.reducer;
