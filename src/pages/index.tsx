import React from 'react'
import { useState } from 'react'

export default function index() {
    const [myList, setMyList] = useState([]);
    const [favList, setFavList] = useState([]);
    const [inputValue, setInputValue] = useState('test');
    const [editIndex, setEditIndex] = useState();


    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function addItem(event){
       event.preventDefault();

        if (inputValue === '') {
            alert("You must write something!");   
        }
        else{
          if (!myList.includes(inputValue)) {
            const updatedList = [...myList, inputValue];
            setMyList(updatedList);
            setInputValue(''); 
          }
        }
    }

    function removeItem(item) {
        const updatedList = myList.filter((listItem) => listItem !== item);
        setMyList(updatedList);
    }

    function saveEditItem(index, text) {
      const updatedList = [...myList];
      updatedList[index] = text;
      setMyList(updatedList);
      setEditIndex();
    }

    function addToFav(item) {
      if (!favList.includes(item)) {
        const updatedList = [...favList, item];
        setFavList(updatedList);
      }
    }

    function addFavToList(item) {
      if (!myList.includes(item)) {
        const updatedList = [...myList, item];
        setMyList(updatedList);
      }
    }

    function removeFavItem(item) {
      const updatedList = favList.filter((listItem) => listItem !== item);
      setFavList(updatedList);
  }
  


    return (
      <div>
      <div id="myDIV" className="header">
        <h2>My To Do List</h2>
        <form onSubmit={(event) => addItem(event)}>
          <input
            type="text"
            id="myInput"
            value={inputValue}
            onChange={handleChange}
            placeholder="Title..."
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Add
          </button>
          <span className="counter">{myList.length}</span>
        </form>
      </div>
      <ul id="myUL">
        {myList.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  saveEditItem(index, event.target.elements[0].value);
                }}
              >
                <input type="text" defaultValue={item} />
                <button
                  type="button"
                  onClick={() => setEditIndex()}
                  className="bg-gray-500 hover:bg-gray-700 text-black font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded"
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                {item}
                <button
                  onClick={() => setEditIndex(index)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeItem(item)}
                  className="bg-red-500 hover:bg-red-700 text-black font-semibold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => addToFav(item)}
                  className="bg-green-500 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded"
                >
                  fav
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>My Fav List</h2>
      <ul id="myUL">
        {favList.map((item, index) => (
          <li key={index}>
                {item}
                <button
                  onClick={() => removeFavItem(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => addFavToList(item)}
                  className="bg-green-500 hover:bg-green-700 text-black font-semibold py-2 px-4 rounded"
                >
                  add to list
                </button>
          </li>
        ))}
      </ul>
              
    </div>
  );
}