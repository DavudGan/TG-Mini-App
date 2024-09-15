import { useEffect, useState } from 'react';
import { Container, TextField, Button, List, ListItem, Typography, Box } from '@mui/material';

const WebSocketScreen = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Создаем WebSocket-соединение
    const ws = new WebSocket('wss://echo.websocket.events');
    
    // Обработчик получения сообщений
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, `Получил: ${event.data}`]);
    };

    // Сохраняем сокет в состоянии
    setSocket(ws);

    // Закрываем соединение при размонтировании компонента
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setMessages((prev) => [...prev, `Отправил: ${input}`]);
      setInput('');
    } else {
      console.error('Нет соединения с WebSocket');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        WebSocket Echo Server
      </Typography>

      {/* Контейнер для сообщений*/}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              {msg}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Контейнер для инпута и кнопки */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="Сообщение:"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
            Отправить
        </Button>
      </Box>
    </Container>
  );
};

export default WebSocketScreen;