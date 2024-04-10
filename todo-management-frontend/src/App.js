import './App.css';
import { ListTodoComponent } from './components/ListTodoComponent';
import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import { TodoComponent } from './components/TodoComponent';
import { RegisterComponent } from './components/RegisterComponent';
import { LoginComponent } from './components/LoginComponent';
import { isUserLoggedIn } from './service/AuthService';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  function AuthenticatedRoute({children}) {
    const isAuth = isUserLoggedIn();

    if(isAuth) {
      return children
    }

    return <Navigate to="/" />

  } 
  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path='/' element= { <LoginComponent /> } /> 
        <Route path='/todos' element= { 
          <AuthenticatedRoute>
            <ListTodoComponent /> 
          </AuthenticatedRoute>
        } />
        <Route path='/add-Todo' element= { 
          <AuthenticatedRoute>
            <TodoComponent />   
          </AuthenticatedRoute>
        } />
        <Route path='/update-Todo/:id' element= { 
          <AuthenticatedRoute>
            <TodoComponent /> 
          </AuthenticatedRoute>
        } />
        <Route path='/register' element={ <RegisterComponent /> } />
        <Route path='/login' element={ <LoginComponent /> } />
      </Routes>
      <FooterComponent />
    </BrowserRouter> 
    </>
  );
}

export default App;
