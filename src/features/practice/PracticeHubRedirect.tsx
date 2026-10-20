import { Navigate } from "react-router";

import { paths } from "@/app/paths";

/** Desktop has no Practice hub (the sidebar lists every practice page): open the question bank. */
export function PracticeHubRedirect() {
  return <Navigate to={paths.questionBank} replace />;
}
