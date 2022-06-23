import Head from 'next/head';
import { useEffect, useState } from 'react';
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
} from '@chakra-ui/react'

export default function Home() {
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("BTC");

  const units = {
    "BTC": [1, 2],
    "mBTC": [1e-3, 2],
    "µBTC": [1e-6, 4],
    "Sats": [1e-8, 6],
  }

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    socket.onmessage = (e) => {
      setPrice(JSON.parse(e.data).p || price)
    }

    document.addEventListener("keydown", e => {
      Object.keys(units).map((val, index) => {
        if (e.key === String(index+1)) setUnit(val);
      })
    })
  }, [])

  return (
    <>
      <Head>
        <title>Bitcoin Price</title>
      </Head>
      <Box backgroundColor="#f0f0f0">
        <Container maxWidth="720px" height="calc(100vh)">
          <Flex height="100%" direction="column" justify="center" align="center" gap="8">
            <Box borderRadius="xl" padding="6" backgroundColor="#1e2227" color="white" width="360px" boxShadow="lg">
              <Stat>
                <StatLabel>Binance BTC-USDT</StatLabel>
                <StatNumber>
                  { (price * units[unit][0]).toFixed(units[unit][1]) }$
                </StatNumber>
                <StatHelpText>Per { unit }</StatHelpText>
              </Stat>
            </Box>
            <Flex gap="8" justify="center">
              {
                Object.keys(units).map((elem, index) => (
                  <Button leftIcon={<Kbd borderColor="teal">{ index + 1 }</Kbd>} colorScheme='teal' borderRadius="xl" variant={unit === elem ? 'outline' : 'ghost'} key={index} onClick={() => setUnit(elem)}>{ elem }</Button>
                ))
              }
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
