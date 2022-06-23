import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  Box,
  Select,
  Container,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Flex
} from '@chakra-ui/react'

export default function Home() {
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("BTC");

  const units = {
    "BTC": [1, 2],
    "mBTC": [1e-3, 2],
    "µBTC": [1e-6, 4],
    "sats": [1e-8, 6]
  }

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    socket.onmessage = (e) => {
      setPrice(JSON.parse(e.data).p || price)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Bitcoin Price</title>
      </Head>
      <Flex direction="column" justify="center">
        <Container maxWidth="720px" height="calc(100vh)">
          <Box borderRadius="lg" padding="6" backgroundColor="teal" color="white">
            <Stat>
              <StatLabel>BTC-USDT</StatLabel>
              <StatNumber>
                { (price * units[unit][0]).toFixed(units[unit][1]) }$ per { unit }
              </StatNumber>
            </Stat>
          </Box>
          <Text>Unit</Text>
          <Select onChange={e => setUnit(e.target.value)}>
            <option value="BTC">BTC</option>
            <option value="mBTC">mBTC</option>
            <option value="µBTC">µBTC</option>
            <option value="sats">sats</option>
          </Select>
        </Container>
      </Flex>
    </>
  )
}
