import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import NotFound from './components/NotFound'

const Home = lazy(() => import('./pages/Home'))
const Share = lazy(() => import('./pages/Share'))

const CustomSuspense = ({ element }) => <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CustomSuspense element={<Home />} />} />
          <Route path="/share" element={<CustomSuspense element={<Share />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
