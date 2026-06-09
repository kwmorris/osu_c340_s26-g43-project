// Citation: All work in this file is our own, AI tools were not used in the generation of this file. 

import axios from 'axios';

const HOST = 'classwork.engr.oregonstate.edu';
const PORT = 13331;

function ResetButton() {
  function handleClick() {
    axios.get(`http://${HOST}:${PORT}/reset`)
      .catch(err => console.log(err));
  }

  return (
    <button onClick={handleClick}>
      Reset
    </button>
  );
}

export default ResetButton;