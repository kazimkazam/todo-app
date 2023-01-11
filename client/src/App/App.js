import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { MemoryRouter } from 'react-router-dom'; // if testing replace BrowserRouter with MemoryRouter
import { Layout } from './Layout';
import { ContainerLogin } from '../Components/ContainerComponents/ContainerLogin/ContainerLogin';
import { ContainerSignUp } from '../Components/ContainerComponents/ContainerSignUp/ContainerSignUp';

function App() {
  return (
    <div className={ 'bg-neutral-900 h-min text-slate-50 font-myFonts' }>
      {/* <MemoryRouter> */}
      <Router>
        <Routes>
          <Route path={ '/' } element={ <ContainerLogin /> } ></Route>
          <Route path={ '/signup' } element={ <ContainerSignUp /> } ></Route>
          <Route path={ '*' } element={ <Layout /> } ></Route>
        </Routes>
      </Router>
      {/* </MemoryRouter> */}
    </div>
  );
}

export default App;
