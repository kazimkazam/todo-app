import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { ContainerLogin } from '../Components/ContainerComponents/ContainerLogin/ContainerLogin';
import { ContainerSignUp } from '../Components/ContainerComponents/ContainerSignUp/ContainerSignUp';

function App() {
  return (
    <div className={ 'bg-neutral-900 h-min text-slate-50 font-myFonts' }>
      <Router>
        <Routes>
          <Route path={ '/' } element={ <ContainerLogin /> } ></Route>
          <Route path={ '/signup' } element={ <ContainerSignUp /> } ></Route>
          <Route path={ '*' } element={ <Layout /> } ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
