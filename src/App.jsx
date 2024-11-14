import { toJS } from  'mobx'
import { observer } from 'mobx-react-lite'
import { Dashboard } from './components/dashboard/Dashboard';
import { useStore } from './context/useStore';

const App = observer( function App() {

  return (
    <div>
      <Dashboard />
    </div>
  )
})

export default App
