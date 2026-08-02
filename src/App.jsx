import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import TopicPage from './pages/TopicPage.jsx'
import SearchResults from './pages/SearchResults.jsx'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topicId" element={<TopicPage />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Layout>
  )
}

export default App
