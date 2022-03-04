const openForms = ()=>{
    window.location.href = "http://localhost:3000/Form";
}

const Add = () => {
return(
    <div><button type = "addButton" id = "add" class="btn btn-danger btn-floating" onClick={openForms}>+</button></div>

)
}
export default Add;