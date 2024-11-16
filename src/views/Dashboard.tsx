import React, { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productSlice";
import Navbar from "../components/Navbar/Navbar";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductView from "../components/ProductView/ProductView";
import styles from "./Dashboard.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedProduct } from "../features/products/selectedProductSlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const searchResults = useAppSelector((state) => state.search.results);
  const searchQuery = useAppSelector((state) => state.search.query);
  const selectedProduct = useAppSelector(
    (state) => state.selectedProduct.product
  );
  const status = useAppSelector((state) => state.products.status);
  const skip = useAppSelector((state) => state.products.skip);
  const leftPannelRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts(0));
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (productId && products.length > 0) {
      const product = products.find((p) => p.id === Number(productId));
      if (product) {
        dispatch(setSelectedProduct(product));
      } else {
        dispatch(setSelectedProduct(null));
      }
    } else {
      dispatch(setSelectedProduct(null));
    }
  }, [productId, products, dispatch]);

  const handleScroll = useCallback(() => {
    if (leftPannelRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = leftPannelRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (status === "succeeded") {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            dispatch(fetchProducts(skip + 20));
          }, 1000);
        }
      }
    }
  }, [status, skip, dispatch]);

  useEffect(() => {
    const leftPannel = leftPannelRef.current;
    if (leftPannel) {
      leftPannel.addEventListener("scroll", handleScroll);
      return () => {
        leftPannel.removeEventListener("scroll", handleScroll);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [handleScroll]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const productsToDisplay = searchQuery ? searchResults : products;

  return (
    <div className={styles.layout}>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.parentContent}>
          <div className={styles.leftPannel} ref={leftPannelRef}>
            <ProductCard
              products={productsToDisplay}
              status={status}
              onProductClick={handleProductClick}
            />
          </div>
          <div className={styles.rightPannel}>
            <ProductView product={selectedProduct}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
