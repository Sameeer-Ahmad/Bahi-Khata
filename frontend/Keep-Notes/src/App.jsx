
// import './App.css'
import AddNote from './components/AddNote'
import NotesList from './components/GetNotes'
import {Box} from '@chakra-ui/react'
function App() {

  return (
    <>
     {/* <AddNote/> */}
     <Box bg={"gray.50"}>
     <NotesList/>
      
     </Box>
    </>
  )
}

export default App
