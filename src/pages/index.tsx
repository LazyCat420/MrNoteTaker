import React from 'react'
import { useState } from 'react'

export default function index() {
    const [myList, setMyList] = useState([]);
    const [inputValue, setInputValue] = useState('test');


    function handleChange(event) {
        setInputValue(event.target.value);
    };

    function addItem(event){
       event.preventDefault();

        if (inputValue === '') {
            alert("You must write something!");   
        }
        else{
            const updatedList = [...myList, inputValue];
            setMyList(updatedList);
            setInputValue(''); 

        }
    };

    function removeItem(item) {
        const updatedList = myList.filter((listItem) => listItem !== item);
        setMyList(updatedList);
    }

    return (
    <div>
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <form onSubmit={(event) => addItem(event)}>
          <input type="text" id="myInput" value={inputValue} onChange={handleChange} placeholder="Title..." />
          <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">Add</button>
          <span className="counter">
        {myList.length}
      </span>
        </form>
      </div>
      <ul id="myUL">
        {myList.map((item,index) => (
            <li key={index}>
                {item}
                <button onClick={() => removeItem(item)} 
                className="bg-red-500 hover:bg-red-700 text-black font-semibold py-2 px-4 rounded">
                  Delete
                  </button>
            </li>
        ))}

      </ul>
    </div>
  );
}