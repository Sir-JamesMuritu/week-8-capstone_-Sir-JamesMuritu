import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApislice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import ContentWrapper from "../components/ContentWrapper";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <div className="bg-accent min-h-screen">
      <ContentWrapper>
        <div className="flex md:flex-row container mx-auto">
          <div className="hidden lg:block p-3 mb-4 border border-neutral h-full fixed top-[80px] z-20 overflow-y-scroll lg:w-[260px] pb-28 text-secondary bg-accent">
            <h2 className="text-center py-2 bg-primary text-secondary hover:shadow-md hover:bg-neutral mb-2 rounded-sm">
              Filter by Categories
            </h2>

            <div className="p-5 w-full">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center gap-1">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 rounded-[50%] accent-primary"
                    />
                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-secondary"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-center py-2 bg-primary text-secondary hover:shadow-md hover:bg-neutral mb-2 rounded-sm">
              Filter by Brands
            </h2>

            <div className="p-5 w-full">
              {uniqueBrands?.map((brand, i) => (
                <div key={i} className="mb-2">
                  <div className="flex items-enter gap-1">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 accent-primary"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-secondary"
                    >
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-center py-2 bg-primary text-secondary hover:shadow-md hover:bg-neutral mb-2 rounded-sm">
              Filer by Price
            </h2>

            <div className="w-full my-2">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 bg-transparent border border-neutral focus:border-primary outline-none text-secondary placeholder-secondary my-2"
              />
            </div>

            <div className="w-full">
              <button
                className="w-full py-2 text-center bg-primary text-secondary hover:shadow-md hover:bg-neutral rounded-sm"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="lg:ml-[280px] border border-neutral bg-secondary">
            <h2 className="mb-2 p-2 text-accent">Products ({products?.length})</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                <div className="flex flex-wrap gap-8 w-full mx-auto justify-center items-center">
                  {products?.map((p) => (
                    <div className="" key={p._id}>
                      <ProductCard p={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Shop;
