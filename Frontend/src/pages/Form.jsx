import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';

const Form = () => {
const [item, setItem] = useState({ title: '', image: '' });
const onSubmitHandler = async (e) => {
e.preventDefault();
console.log(item)
}

return (
<div className="wrapper">
<form action="" onSubmit={onSubmitHandler}>
<input type="text" className="input-field"
onChange={e => setItem({ ...item, title: e.target.value })}
/>
<FileBase64
type="file"
multiple={false}
onDone={({ base64 }) => setItem({ ...item, image: base64 })}
/>
<div className="right-align">
<button className="btn">submit</button>
</div>
    <label>
      <p>Enter Description</p>
      <input type = "textarea" name="description" />
    </label>
    <label>
      <p>Select Location</p>
      <select>
  <option selected value="gainesville">Gainesville</option>
  <option value="ocala">Ocala</option>
  <option value="hawthorne">Hawthorne</option>
  <option value="highsprings">High Springs</option>
  <option value="crosscreek">Cross Creek</option>
  <option value="melrose">Melrose</option>
</select>
    </label>
    <label>
      <p>Select Product Tags</p>
      <select>
  <option selected value="furniture">Furniture</option>
  <option value="stationary">Stationary</option>
  <option value="kitchen">Kitchen</option>
  <option value="electronics">Electronics</option>
  </select>
  </label>
</form>
</div>
);
}
export default Form;
