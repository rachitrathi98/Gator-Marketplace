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
</form>
</div>
);
}
export default Form;
