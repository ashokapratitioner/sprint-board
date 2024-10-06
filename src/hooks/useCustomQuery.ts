import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequests } from "../http/axios";

const getPhotos = async () => {
  const endpoint = "/photos";
  const response = await getRequests(endpoint);
  return response;
};

const useCustomQuery = (key: string) => {
  const query = useQuery({
    queryKey: [key],
    queryFn: () => getPhotos(),
    placeholderData: keepPreviousData,
  });

  return query;
};

export { useCustomQuery };
