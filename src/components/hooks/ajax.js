import axios from 'axios';


const useAjax = (list,callback) => {

  const getElement = url => {
    axios.get(url)
      .then(res => {
          console.log(res);
        callback(res.data);
      })
  };

  const postElement = (url, data) => {
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    };

    axios.post(url, data, options).then(savedItem => {
        console.log('post  -->',savedItem)
        callback([...list, savedItem.data])
      }).catch(console.error);
  };

  const putElement = (url, data) => {
    axios.put(url, data)
      .then(savedItem => {
        callback(list.map(listItem => listItem._id === data._id ? savedItem.data : listItem));
      })
  };

  const deleteElement = (url, id) => {
    axios.delete(url)
      .then(savedItem => {
        callback([]);
        callback(list.filter(item => item._id != id));
      })
  };

  return [getElement, postElement, putElement, deleteElement];
}

export default useAjax;