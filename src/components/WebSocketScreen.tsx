import { useEffect, useState, KeyboardEvent } from 'react';
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

    // Сохраняем сокет
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      sendMessage();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <Typography variant="h4" gutterBottom>
        WebSocket Echo Server
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              {msg}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexDirection: 'center' }}>
        <TextField
          label="Сообщение:"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Отправить
        </Button>
      </Box>
    </Container>
  );
};

export default WebSocketScreen;