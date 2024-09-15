import { useEffect, useRef, useState } from "react";
import {
  Container,
  Button,
  List,
  ListItem,
  Typography,
  Box,
} from "@mui/material";

const InfiniteScrollScreen = () => {
  const [items, setItems] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const endOfListRef = useRef<HTMLLIElement | null>(null);

  const loadMore = () => {
    const newItems = Array.from(
      { length: 10 },
      (_, index) => page * 10 + index
    );
    setItems((prevItems) => [...prevItems, ...newItems]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    // Прокручиваем до последнего элемента
    if (endOfListRef.current) {
      endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [items]);

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", height: "90vh" }}
    >
      <Typography variant="h4" gutterBottom>
        Бесконечный Scroll
      </Typography>

      {/* Контейнер для сообщений*/}
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        <List>
          {items.map((msg, index) => (
            <ListItem key={index}>{msg}</ListItem>
          ))}
          <ListItem ref={endOfListRef} />
        </List>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          mb: 2,
          flexDirection: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" color="primary" onClick={loadMore}>
          Новые данные
        </Button>
      </Box>
    </Container>
  );
};

export default InfiniteScrollScreen;
