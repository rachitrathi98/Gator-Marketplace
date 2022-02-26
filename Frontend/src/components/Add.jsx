const openForms = ()=>{
    window.location.href = "http://localhost:3000/Form";
}

const Add = () => {
return(
    <div><button type = "button" className="roundedButton" onClick={openForms}>+</button></div>

)
}
export default Add;