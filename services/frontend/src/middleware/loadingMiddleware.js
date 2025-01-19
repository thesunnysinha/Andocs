import { startLoading, stopLoading } from '../features/loadingSlice'; // Import loading actions

const loadingMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('/pending')) {
    // Dispatch startLoading action when an API call starts
    store.dispatch(startLoading('Loading...'));
  } else if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
    // Dispatch stopLoading action when an API call is successful or failed
    store.dispatch(stopLoading());
  }

  return next(action);
};

export default loadingMiddleware;
