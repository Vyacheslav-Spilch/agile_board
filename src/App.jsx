import { toJS } from  'mobx'
import { observer } from 'mobx-react-lite'
import { useStore } from './context/useStore';

const App = observer( function App() {

  const { board } = useStore()

  console.log(toJS(board)); 

  return (
    <div>
      Start
    </div>
  )
})

export default App
