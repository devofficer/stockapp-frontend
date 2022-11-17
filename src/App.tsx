import React, { useState } from "react"
import {
  ChakraProvider,
  Box,
  Code,
  Grid,
  theme,
  Stack,
  VStack,
  HStack,
  Input,
  Button,
  Card,
  Spinner,
  Heading,
  StackDivider,
  CardHeader, 
  CardBody, 
} from "@chakra-ui/react"
import { getStockInfo } from "./store/reducers/stock";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

export const App = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.main.status);
  const stockInfo = useAppSelector((state) => state.main.stockInfo);

  const [ticker, setTicker] = React.useState<string>('');
  const handleSubmit = () => {
    dispatch(getStockInfo(ticker));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack direction="column" spacing={2}>
            <Card>
              <CardBody>
                <HStack alignItems="center" mb={5}>
                  <Logo h="5vmin" pointerEvents="none" />
                  <Heading size='md'>Stock App</Heading>
                </HStack>

                <Stack divider={<StackDivider />} spacing='2'>
                  <HStack>
                    <Input placeholder='e.g AAPL, TSLA, AMZN' type='text' value={ ticker } onChange={ handleChange } />
                    <Button onClick={ handleSubmit }>Submit</Button>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
