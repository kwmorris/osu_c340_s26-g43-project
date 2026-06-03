import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function DeleteButton({ table, id }) {
  function handleClick() {
    console.log(`Delete button pressed for item ${id} in table ${table}`)
    let url = `http://${HOST}:${PORT}/remove/${table}/${id}`;
    console.log(url)
    axios.get(url)
      .catch(err => console.log(err));
  }

  return (
    <button onClick={handleClick}>
      Delete
    </button>
  );
}

export default DeleteButton;