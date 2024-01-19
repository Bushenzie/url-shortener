
import { BrowserRouter,Routes,Route } from "react-router-dom"
import {Homepage,NotFound,RedirectPage} from "./pages"
import './App.scss'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/:shortenedID" element={<RedirectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
