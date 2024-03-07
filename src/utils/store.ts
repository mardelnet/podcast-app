import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loadingSlice'

/**
 * Configures the Redux store with the provided reducers.
 * @returns {Store} The configured Redux store.
 */
export default configureStore({
  reducer: {
    /**
     * Reducer for managing the state related to loaders.
     */
    loading: loadingReducer
  }
})