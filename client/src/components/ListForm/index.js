import React, { useState } from 'react';

const ListForm = () =>  {
  
  const [list, setlist] = useState('');

  const [inputData, setInputData] = useState('');

  const handleAddItem = () => {

      const newList = [...list, {title: inputData}]

      setlist(newList);

      setInputData('');

      console.log(list)
  //needed?
  }

const handleDeleteItem = (index) => {
  const newList = [];
  for(let i = 0; i < list.length; i++){
    if (index >= i) {
      newList.push(list[i]);
    }
  }
  setlist(newList);
}

return (
  <div className="App">
    <h1> Can you run to the store?</h1>
    <div className='input'>
      <input type='text' value={inputData} onChange={(event) => setInputData(event.target.value)}></input>
      <input type='button' value='ADD' onClick={()=> handleAddItem}></input>
    
    </div>
    <div className='list'>
      {list.map((item, index) => {
        return(
          <div>
           <p onClick={() => handleDeleteItem(index)}>{item.title}</p>
            </div>
        )
      })}

    </div>
</div>
);
}

export default ListForm;