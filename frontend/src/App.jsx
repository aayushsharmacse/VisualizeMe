import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import './App.css';
import NavLayout from "../Layouts/NavLayout.jsx"
import About from "../Pages/About/about.jsx"
import SigninOrSignup from "../Pages/SigninOrSignup/SigninOrSignup.jsx"
import Home from "../Pages/Home/Home.jsx"
import Dashboard from "../Pages/Dashboard/Dashboard.jsx"
import Profile from "../Pages/Profile/Profile.jsx"
import MainDashboard from "../Components/MainDashboard/MainDashboard.jsx"
import CreatePortfolioLayout from "../Layouts/CreatePortfolioLayout/CreatePortfolioLayout.jsx";
import CreatePortfolioByForm from '../Components/CreatePortfolioByForm/CreatePortfolioByForm.jsx';
import CreatePortfolioByResume from "../Components/CreatePortfolioByResume/CreatePortfolioByResume.jsx";
import View from "../Pages/View/View.jsx";
import ViewPortfolio from "../Pages/ViewPortfolio/ViewPortfolio.jsx";
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<NavLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='signin' element={<SigninOrSignup/>}/>
      <Route path='signup' element={<SigninOrSignup/>}/>
      <Route path="user/:id/profile" element={<Profile/>} />
      <Route path="user/:id/edit/:portfolioid" element={<CreatePortfolioByForm/>} />
      <Route path='user/:id' element={<Dashboard/>}>
        <Route index element={<MainDashboard/>}/>
        <Route path='createportfolio' element={<CreatePortfolioLayout/>}>
            <Route path='form' element={<CreatePortfolioByForm/>} />
            <Route path='resume' element={<CreatePortfolioByResume/>} />
        </Route>
      </Route>
      <Route path='view' element={<View/>}/>
      <Route path='view/:portfolio' element={<ViewPortfolio/>}/>
      {/* <Route path='help' element={<HelpLayout/>}>
        <Route path='faq' element={<FAQ/>}/>
        <Route path='contact' element={<ContactForm/>}/>
      </Route> */}
      <Route path='*' element={<Error/>} />
    </Route>
  )
)

function App() {
  
  return (
      <RouterProvider router={router}/>
  )
}

export default App;
