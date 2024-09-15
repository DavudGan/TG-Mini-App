import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebSocketScreen from './components/WebSocketScreen';
import ApiScreen from './components/ApiScreen';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import './App.css';
import CustomButtons from './components/CustomButtons';
import InfiniteScrollScreen from './components/InfiniteScrollScreen';

function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      const colorScheme = tg.colorScheme === 'dark' ? 'dark' : 'light';
      setThemeMode(colorScheme);

      tg.onEvent('themeChanged', () => {
        const colorScheme = tg.colorScheme === 'dark' ? 'dark' : 'light';
        setThemeMode(colorScheme);
      });
    }

    return () => {
      tg?.offEvent('themeChanged');
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      background: {
        default: themeMode === 'dark' ? '#121212' : '#ffffff',
      },
    },
  });

  const NotFound = () => <h2>404: Page not found</h2>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router> 
        <Box sx={{ minHeight: '100vh', paddingBottom: '80px' }}> 
          {/* Основные маршруты */}
          <Routes>
            <Route path="/" element={<WebSocketScreen />} />
            <Route path="/websocket" element={<WebSocketScreen />} />
            <Route path="/api" element={<ApiScreen />} />
            <Route path="/scroll" element={<InfiniteScrollScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <CustomButtons />
      </Router>
    </ThemeProvider>
  );
}

export default App;