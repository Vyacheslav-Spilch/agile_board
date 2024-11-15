import { toJS } from  'mobx'
import { observer } from 'mobx-react-lite'
import { Dashboard } from './components/dashboard/Dashboard';
import { Header } from './components/header/Header';
import { useStore } from './context/useStore';

const App = observer( function App() {

  return (
    <>
      <Header />
      <main>
        <Dashboard />
      </main>
    </>
  )
})

export default App
