import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const ApiScreen = () => {
  const [data, setData] = useState<any>(null);
  const [selectData, setSelectData] = useState<string>("RUB");
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCurrency = event.target.value as string;
    setSelectData(selectedCurrency);
    setRate(data.rates[selectedCurrency]);
  };

  console.log(data);
  return (
    <Container>
      <Typography variant="h2">API Screen</Typography>
      {data ? (
        <Box>
          <Box
            sx={{ display: "flex", gap: 1, mb: 2, justifyContent: "center" }}
          >
            <Typography variant="h3">Букв. код: </Typography>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Букв. код</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectData}
                label="Букв. код"
                onChange={handleChange}
              >
                {Object.keys(data.rates).map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Typography variant="h3">
            USD to {selectData}: {rate||data.rates.RUB}
          </Typography>
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default ApiScreen;
