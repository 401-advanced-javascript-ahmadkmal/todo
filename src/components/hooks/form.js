import { useState } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({});

  const handleInputChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    callback(values);
    setValues({});
  };

  return [handleSubmit, handleInputChange];
}

export default useForm;