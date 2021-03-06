import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { RECIPES } from "../../graphql/queries";
import RecipeList from "../../components/Recipe/RecipeList";
import RecipeListSkeleton from "../../components/Recipe/RecipeListSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import Seo from "../../components/Seo";
import Pagination from "../../components/Pagination";
import styles from "./Recipes.module.scss";

const PAGE_LIMIT = 12;

export const Recipes = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let pageQuery = query.get("page");
  const keyword = query.get("search");
  pageQuery = Number(pageQuery) || 1;

  const [page, setPage] = useState(pageQuery);
  const { loading, data, error } = useQuery(RECIPES, {
    variables: { page, limit: PAGE_LIMIT, keyword },
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <RecipeListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Error in viewing recipes. Please try again" />
    );
  }

  const recipes = data.recipes.result;
  const total = data.recipes.total;

  const handlePageChange = (val) => {
    setPage(val);
    window.scrollTo(0, 0);
    history.push(`/recipes?page=${val}`);
  };

  return (
    <div className={styles.container}>
      <Seo
        title="Easy Recipe - All Recipes"
        description="Easy recipe login page"
      />
      {total === 0 ? (
        <div className={styles.empty}>
          <h2> No recipes found. Try to search for other recipes. </h2>
        </div>
      ) : (
        <>
          <h2> All Recipes </h2>
          <RecipeList recipes={recipes} />
          <Pagination
            onChange={handlePageChange}
            activePage={page}
            total={total}
            itemsPerPage={PAGE_LIMIT}
          />
        </>
      )}
    </div>
  );
};
