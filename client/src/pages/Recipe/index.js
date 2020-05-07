import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { RECIPE } from "../../lib/graphql/queries";
import RecipeInfo from "./RecipeInfo/RecipeInfo";
import RecipeInfoList from "./RecipeInfoList/RecipeInfoList";
import RecipeSkeleton from "./RecipeSkeleton";

export const Recipe = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(RECIPE, { variables: { id } });

  if (error) return <h2>Something went wrong</h2>;

  if (loading) return <RecipeSkeleton />;

  const recipe = data.recipe;

  return (
    <div>
      <RecipeInfo recipe={recipe} />
      <RecipeInfoList lists={recipe.ingredients} title="Ingredients" />
      <RecipeInfoList lists={recipe.instructions} title="Directions" />
    </div>
  );
};