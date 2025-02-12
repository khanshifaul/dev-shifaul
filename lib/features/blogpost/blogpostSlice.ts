import { createAppSlice } from "@/lib/createAppSlice";
interface BlogPostState {
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  published: boolean;
}
const initialState: BlogPostState = {
  title: "",
  thumbnail: "",
  content: "",
  tags: [],
  published: false,
};

export const blogpostSlice = createAppSlice({
  name: "blogPost",
  initialState,
  reducers: (create) => ({
    setFormValues: create.reducer<Partial<BlogPostState>>((state, action) => {
      return { ...state, ...action.payload };
    }),
    resetForm: create.reducer(() => initialState),
  }),
  selectors: {
    selectBlogPost: (state) => state,
  },
});

// Export actions
export const { setFormValues, resetForm } = blogpostSlice.actions;

// Export selectors
export const { selectBlogPost } = blogpostSlice.selectors;

// Export reducer
export default blogpostSlice.reducer;
