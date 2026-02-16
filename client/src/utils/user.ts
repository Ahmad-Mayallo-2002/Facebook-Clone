import { ME } from "@/graphql/queries/me";
import type { Me } from "@/interface/response";
import { useQuery } from "@apollo/client/react";

export const useMeQuery = () => {
  const { data, loading, error } = useQuery<Me>(ME);

  return {
    user: data?.me ?? null,
    loading,
    error,
  };
};