import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/app/AppShell";
import { HomePage } from "@/features/home/HomePage";
import { WorkoutPage } from "@/features/active-workout/WorkoutPage";
import { WorkoutSummaryPage } from "@/features/history/WorkoutSummaryPage";
import { ProgramPage } from "@/features/program/ProgramPage";
import { ExerciseDetailPage } from "@/features/exercise-guide/ExerciseDetailPage";
import { ProgressPage } from "@/features/progress/ProgressPage";
import { SettingsPage } from "@/features/settings/SettingsPage";
import { MealsPage } from "@/features/meals/MealsPage";
import { RecipeDetailPage } from "@/features/meals/RecipeDetailPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="program" element={<ProgramPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="meals" element={<MealsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="workout/:workoutId" element={<WorkoutPage />} />
      <Route path="workout-summary/:sessionId" element={<WorkoutSummaryPage />} />
      <Route path="exercise/:exerciseId" element={<ExerciseDetailPage />} />
      <Route path="meals/:recipeId" element={<RecipeDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
