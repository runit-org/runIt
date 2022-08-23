import { useSearchParams } from "react-router-dom";

export const SearchParam = (count) => {
  const [searchParams] = useSearchParams({});

  var page = searchParams.get("page");
  page = parseInt(page);

  if (count > 10) {
    if (count === page * 10 - 9) {
      page = page - 1;
    }
  }

  return page;
};
