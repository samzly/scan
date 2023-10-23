import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articlesRequest: '',
    articlesDates: [],
    articlesIds: [],
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchRequest(state, action){
            state.articlesRequest = action.payload;
        },
        searchArticlesDates(state, action) {
            state.articlesDates = action.payload;
        },
        searchArticlesIds(state, action) {
            state.articlesIds = action.payload;
        }
    }
})

export const { searchArticlesDates, searchArticlesIds, searchRequest } = searchSlice.actions

export default searchSlice.reducer