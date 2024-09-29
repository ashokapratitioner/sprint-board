import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRequests } from "../http/axios";

const getPhotos = async () => {
  const endpoint = "/photos";
  await getRequests(endpoint);
};

const useQueryHook = (key: string) => {
  const query = useQuery({
    queryKey: [key],
    queryFn: () => getPhotos(),
    placeholderData: keepPreviousData,
  });

  return query;
};

export { useQueryHook };
