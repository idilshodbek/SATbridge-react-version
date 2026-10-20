import { Navigate } from "react-router";

import { paths } from "@/app/paths";
import { allLessons } from "@/data/course";

/** Desktop has no separate unit overview: open the lesson player at the first lesson. */
export function FirstLessonRedirect() {
  return <Navigate to={paths.lesson(allLessons[0].id)} replace />;
}
