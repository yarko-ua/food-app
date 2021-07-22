import { useRef } from 'react';
import { uploadFile } from './fileUploaderSlice';
import { useDispatch } from 'react-redux';

export const FileUploader = () => {

  const dispatch = useDispatch();
  const ref = useRef();

  const handleUpload = (e) => {
    console.dir(e);
    console.log(`e.target.files`, e.target.files);

    const file = e.target.files[0];

    console.log('type of file', typeof file);

    dispatch(uploadFile(file));
    // const reader = new FileReader();

    // reader.addEventListener('load', function(ev){
    //   console.dir(ev);
    //   console.log(`reader.result`, reader.result);
    //   ref.current.src = reader.result;
    // })

    // reader.readAsDataURL(target);

  }

  return (
    <>
      <input type="file" accept="image/jpg, image/jpeg, image/png" onChange={handleUpload} />

      <div>
        <img ref={ref} alt="void"/>
      </div>
    </>
  )
}