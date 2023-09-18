import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Nav from './components/Nav/Nav';
import { Outlet } from 'react-router-dom';

// draft
// fetch('https://jsonplaceholder.typicode.com/posts/1')
// .then((response) => response.json())
// .then((json) => console.log(json));

const App = () => {
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav />
      <>
        <CssBaseline />
        <main>
          <div className="data-wrapper">
            <Outlet />
          </div>
        </main>
      </>
    </ThemeProvider>
  )
}

export default App;

// steps:
// 1 - Usar um state pra salvar os dados
// 2 - Usar um effect para disparar o request pro back-end
// 3 - Usar async/await pra resolver o json do request
// 4 - Salvar o json do request no state do 1.
