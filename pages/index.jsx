import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Kbd,
  Button,
  StatHelpText,
  SimpleGrid,
} from "@chakra-ui/react";

export default function Home() {
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("BTC");

  const units = {
    BTC: [1, 2],
    mBTC: [1e-3, 2],
    µBTC: [1e-6, 4],
    Sats: [1e-8, 6],
  };

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );
    socket.onmessage = (e) => {
      setPrice(JSON.parse(e.data).p || price);
    };

    document.addEventListener("keydown", (e) => {
      Object.keys(units).map((val, index) => {
        if (e.key === String(index + 1)) setUnit(val);
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Bitcoin Price</title>
      </Head>
      <Box>
        <Container height="calc(100vh)">
          <Flex
            gap="8"
            height="100%"
            align="center"
            justify="center"
            direction="column"
          >
            <Box
              padding="6"
              color="white"
              width="360px"
              boxShadow="lg"
              borderRadius="xl"
              backgroundColor="#1e2227"
            >
              <Stat>
                <StatLabel>Binance BTC-USDT</StatLabel>
                <StatNumber>
                  {(price * units[unit][0]).toFixed(units[unit][1])}$
                </StatNumber>
                <StatHelpText>Per {unit}</StatHelpText>
              </Stat>
            </Box>
            <SimpleGrid columns={[2, null, 4]} gap={8}>
              {Object.keys(units).map((elem, index) => (
                <Button
                  leftIcon={<Kbd borderColor="teal">{index + 1}</Kbd>}
                  colorScheme="teal"
                  borderRadius="xl"
                  variant={unit === elem ? "outline" : "ghost"}
                  key={index}
                  onClick={() => setUnit(elem)}
                >
                  {elem}
                </Button>
              ))}
            </SimpleGrid>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
