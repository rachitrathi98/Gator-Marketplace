//get data from localstorage
 const isAuth = () => {
    if (window !== "undefined") {
      if (localStorage.getItem("user") !== "undefined") {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
    
  };
  export default isAuth;