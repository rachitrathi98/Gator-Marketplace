import Google from "../img/google.png";


const Login = () => {
  const google = () => {
    window.location("http://localhost:5000/google/login", "_self");
  };


  return (
    <div className="login">
        
      <h1 className="loginTitle">Login using Google</h1>
      <div className="wrapper">
          
        <div className="left">
            
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
        </div>
        <div className="center">
          <div className="line" />
        </div>
      </div>
    </div>
  );
};

export default Login;