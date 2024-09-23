import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useLoaderData } from "react-router-dom";
// import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Shop";
import ProductCardShop from "../components/ProductCardShop";
import ContactFormSection from "../components/shared/ContactFormSection";
import customFetch from "../utils/customFetch";
import { categories, types } from "../utils/clientConstants";
import { shouldUseMockData } from "../utils/environment";
import { mockProducts } from "../data/mockData.js";

export const loader = async ({ request }) => {
  try {
    if (shouldUseMockData) {
      return { data: { products: mockProducts } };
    }
    const { data } = await customFetch.get("/products");
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Shop = () => {
  const { data } = useLoaderData();
  const productsArray = data.products || [];

  const processedProducts = useMemo(() => {
    return productsArray.map((product) => {
      const variants = product.variants;
      const prices = variants.map((v) => v.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const colors = [...new Set(variants.map((v) => v.color))];
      const sizes = [...new Set(variants.map((v) => v.size))];

      return {
        ...product,
        minPrice,
        maxPrice,
        colors,
        sizes,
      };
    });
  }, [productsArray]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(processedProducts);

  useEffect(() => {
    const typeFilters = searchParams.getAll("type");
    const categoryFilters = searchParams.getAll("category");

    let result = processedProducts;

    if (typeFilters.length > 0) {
      result = result.filter((p) => typeFilters.includes(p.type));
    }
    if (categoryFilters.length > 0) {
      result = result.filter((p) => {
        if (p.category === "Adults") {
          return (
            categoryFilters.includes("Women") ||
            categoryFilters.includes("Men") ||
            categoryFilters.includes("Adults")
          );
        }
        if (p.category === "Girls" || p.category === "Boys") {
          return (
            categoryFilters.includes("Kids") ||
            categoryFilters.includes("Youth")
          );
        }
        return categoryFilters.includes(p.category);
      });
    }
    setFilteredProducts(result);
  }, [searchParams, processedProducts]);

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      const currentValues = prevParams.getAll(key);
      if (currentValues.includes(value)) {
        // Remove the value if it's already there
        const newValues = currentValues.filter((v) => v !== value);
        if (newValues.length === 0) {
          prevParams.delete(key);
        } else {
          prevParams.set(key, newValues);
        }
      } else {
        // Add the value if it's not there
        prevParams.append(key, value);
      }
      return prevParams;
    });
  }

  if (productsArray.length === 0) {
    return (
      <Wrapper>
        <h2>No products to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>Our Products</h1>
      <div className="product-section">
        <div className="product-category-filter">
          {categories.map((c) => (
            <h3
              key={c}
              onClick={() => handleFilterChange("category", c)}
              className={`category ${c} ${
                searchParams.getAll("category").includes(c) ||
                (searchParams.getAll("category").includes("Adults") &&
                  (c === "Women" || c === "Men")) ||
                (c === "Adults" &&
                  (searchParams.getAll("category").includes("Women") ||
                    searchParams.getAll("category").includes("Men"))) ||
                (searchParams.getAll("category").includes("Kids") &&
                  (c === "Girls" || c === "Boys")) ||
                (c === "Kids" &&
                  (searchParams.getAll("category").includes("Girls") ||
                    searchParams.getAll("category").includes("Boys")))
                  ? "selected"
                  : "b1"
              }`}
            >
              {c}
            </h3>
          ))}
        </div>

        <div className="product-section-right">
          <div className="product-type-filter">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleFilterChange("type", t)}
                className={`b2 btn-ocean type ${t} ${
                  searchParams.getAll("type").includes(t) ? "selected" : ""
                }`}
              >
                {t}
              </button>
            ))}

            {(searchParams.has("type") || searchParams.has("category")) && (
              <button
                onClick={() => {
                  setSearchParams({});
                }}
                className="b2 clear-filters"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="products-container">
            {filteredProducts.map((p) => (
              <ProductCardShop
                key={p.productId}
                id={p.productId}
                name={p.name}
                imageSrc={p.images[0]}
                category={p.category}
                type={p.type}
                minPrice={p.minPrice}
                maxPrice={p.maxPrice}
                description={p.description}
                sizes={p.sizes}
                colors={p.colors}
              />
            ))}
          </div>
        </div>
      </div>
      <ContactFormSection />
    </Wrapper>
  );
};

export default Shop;
