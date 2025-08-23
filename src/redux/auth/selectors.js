export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.user;
export const selectUserId = state => state.auth.user.uid;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsLoading = state => state.auth.isLoading;
