import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomButtons = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "background.paper",
        padding: 2,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Button variant="contained" onClick={() => navigate("/websocket")}>
        WebSocket
      </Button>
      <Button variant="contained" onClick={() => navigate("/api")}>
        API
      </Button>
      <Button variant="contained" onClick={() => navigate("/scroll")}>
        InfiniteScroll
      </Button>
    </Box>
  );
};

export default CustomButtons;
