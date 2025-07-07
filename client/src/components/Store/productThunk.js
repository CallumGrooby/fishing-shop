import axios from "axios";
import { setProducts, setLoading, setError } from "./productSlice";

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post("http://localhost:5000/get-products");
    if (response?.data?.products) {
      dispatch(setProducts(response.data.products));
    } else {
      dispatch(setProducts([]));
    }
  } catch (error) {
    dispatch(setError(error.message));
    console.error("Failed to fetch products:", error);
  }
};
