import "./App.css";

import { Button } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

function App() {
  return (
    <HStack>
      <Button colorPalette="teal" variant="solid">
        <RiMailLine /> Email
      </Button>
      <Button colorPalette="teal" variant="outline">
        Call us <RiArrowRightLine />
      </Button>
    </HStack>
  )
}

export default App;
