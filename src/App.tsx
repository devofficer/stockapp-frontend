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
  Text,
  useToast,
  Spinner,
  Heading,
  StackDivider,
  CardHeader, 
  CardBody, 
} from "@chakra-ui/react"
import { LOADING_STATUS } from './store/constants';
import { getStockInfo } from "./store/reducers/stock";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

export const App = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.main.status);
  const stockInfo = useAppSelector((state) => state.main.stockInfo);

  const toast = useToast();
  const [ticker, setTicker] = React.useState<string>('');
  const handleSubmit = () => {
    if(ticker === '') {
      toast({
        title: `Please input correct one`,
        status: 'error',
        isClosable: true,
      });
      return;
    }

    dispatch(getStockInfo(ticker));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value);
  }

  const getChangedTime = (delta: number) => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const changedDate = new Date(currentTime - delta);
    return changedDate.toString();
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
                  <Logo id="logo" h="5vmin" pointerEvents="none" />
                  <Heading id="title" size='md'>Stock App</Heading>
                </HStack>

                <Stack divider={<StackDivider />} spacing='2'>
                  <HStack>
                    <Input placeholder='e.g AAPL, TSLA, AMZN' type='text' value={ ticker } onChange={ handleChange } />
                    <Button onClick={ handleSubmit }>Submit</Button>
                  </HStack>
                  { status == LOADING_STATUS.LOADING && <Spinner mx="auto"/> }
                  { (status == LOADING_STATUS.REJECTED || status == LOADING_STATUS.FAILED) && <Text id="no-information" fontSize="sm">No Information</Text> }
                  { status == LOADING_STATUS.LOADED &&  <VStack>
                      <Text fontSize="sm">Current Price: ${ stockInfo.c }</Text>
                      <Text fontSize="sm">Percent Change: {stockInfo.dp}%</Text>
                      <Text fontSize="sm">Updated Time: { getChangedTime(stockInfo.t) }</Text>
                    </VStack>
                  }
                </Stack>
              </CardBody>
            </Card>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
