import { useState } from "react";

export default function usePagination(initValue = 1) {
  const [page, setPage] = useState(initValue);

  return [page, setPage];
}
