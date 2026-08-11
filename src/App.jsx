import { ThemeProvider, useTheme } from './theme.jsx'
import { useModel } from './useModel.js'
import GlobalStyles from './GlobalStyles.jsx'
import Sidebar from './components/Sidebar.jsx'
import ThemePicker from './components/ThemePicker.jsx'
import Celebration from './components/Celebration.jsx'

import Home from './screens/Home.jsx'
import LearningPath from './screens/LearningPath.jsx'
import MockExams from './screens/MockExams.jsx'
import MockResults from './screens/MockResults.jsx'
import ScoreReport from './screens/ScoreReport.jsx'
import Achievements from './screens/Achievements.jsx'
import Notes from './screens/Notes.jsx'
import Onboarding from './screens/Onboarding.jsx'
import LessonRunner from './screens/LessonRunner.jsx'
import Flashcards from './screens/Flashcards.jsx'
import Analytics from './screens/Analytics.jsx'
import QuestionBank from './screens/QuestionBank.jsx'
import StudyPlan from './screens/StudyPlan.jsx'
import Profile from './screens/Profile.jsx'
import Drills from './screens/Drills.jsx'
import Vocabulary from './screens/Vocabulary.jsx'
import AiTutor from './screens/AiTutor.jsx'
import Leaderboard from './screens/Leaderboard.jsx'
import Exam from './screens/Exam.jsx'

/**
 * Screens render in the order the design lays them out. Each entry is
 * [flag on the view-model, component] — exactly one flag is true at a time.
 */
const SCREENS = [
  ['isMain', Home],
  ['isPath', LearningPath],
  ['isMock', MockExams],
  ['isRes', MockResults],
  ['isReport', ScoreReport],
  ['isAchv', Achievements],
  ['isNotes', Notes],
  ['isOnb', Onboarding],
  ['isRun', LessonRunner],
  ['isCards', Flashcards],
  ['isAna', Analytics],
  ['isQb', QuestionBank],
  ['isPlan', StudyPlan],
  ['isProfile', Profile],
  ['isDrills', Drills],
  ['isVocab', Vocabulary],
  ['isTutor', AiTutor],
  ['isLb', Leaderboard],
  ['isExam', Exam],
]

/** Design-time knobs that were props on the source component. */
export const DEFAULT_SETTINGS = {
  primary: '#009ADA',
  darkMode: false,
  showThemePicker: true,
  showRightRail: true,
  showTimer: true,
}

function Shell({ m }) {
  const { sx } = useTheme()
  return (
    <>
      <GlobalStyles />
      <div style={sx({ display: 'flex', height: '100vh', overflow: 'hidden' })}>
        <Sidebar m={m} />
        <div style={sx({ flex: '1', minWidth: '0', height: '100%', overflow: 'auto' })}>
          {SCREENS.map(([flag, Screen]) => (m[flag] ? <Screen key={flag} m={m} /> : null))}
        </div>
        {m.showThemePicker && <ThemePicker m={m} />}
        {m.celeOpen && <Celebration m={m} />}
      </div>
    </>
  )
}

export default function App({ settings = DEFAULT_SETTINGS }) {
  const m = useModel(settings)
  return (
    <ThemeProvider primary={m.activeTheme} isDark={m.isDarkMode}>
      <Shell m={m} />
    </ThemeProvider>
  )
}
