import axios from "axios";
import { setProducts, setLoading, setError } from "./productSlice";
import { SERVER_URL } from "../../config/config";

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.post(`${SERVER_URL}/get-products`);
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
