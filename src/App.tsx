import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebSocketScreen from './components/WebSocketScreen';
import './App.css'

function App() {
  const NotFound = () => <h2>404: Page not found</h2>;
  return (
  <div>
    <Router>
      <Routes>
      <Route path="/" element={<WebSocketScreen />} />
        <Route path="/websocket" element={<WebSocketScreen />} />
        <Route path="*" element={<NotFound />} /> {/* Обработка 404 */}
      </Routes>
    </Router>
  </div>
)};

export default App
