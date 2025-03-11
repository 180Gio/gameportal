import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OldRegister from "../components/OldRegister.jsx"
import SiteHeader from '../components/SiteHeader'
import Register from "../components/Register.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <div>
        <SiteHeader/>
      </div>
      <div>
          <Register/>
      </div>
    <OldRegister />
  </StrictMode>,
)
