import "@app/styles/index.pcss";
import { HomePage } from "./pages/home";
import {PopoverProvider} from "@ui/popover";
// @ts-ignore

const App = () => {
  return (
     <>
       <PopoverProvider>
         <HomePage />
       </PopoverProvider>
     </>
  );
};

export default App;
