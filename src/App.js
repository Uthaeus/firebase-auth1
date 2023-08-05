import { Container } from "react-bootstrap";

import AuthContextProvider from './store/auth-context';
import Signup from "./auth/signup";

function App() {
  return (
    <AuthContextProvider>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Signup />
        </div>
      </Container>
    </AuthContextProvider>
  );
}

export default App;
