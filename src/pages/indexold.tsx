import React from 'react'
import { useState, useEffect } from 'react'

export default function Index() {
    const [myList, setMyList] = useState([]);
    const [favList, setFavList] = useState([]);
    const [inputValue, setInputValue] = useState('test');
    const [editIndex, setEditIndex] = useState();
    const [doneList, setDoneList] = useState([]);
    const [customInput, setCustomInput] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setInputValue(event.target.value);
      setCustomInput(event.target.value); // Update the local state variable with the user input value
    }

    useEffect(() => {
      const storedList = localStorage.getItem('myList');
      if (storedList) {
        setMyList(JSON.parse(storedList));
      }
    
      const storedFavList = localStorage.getItem('fav-list');
      if (storedFavList) {
        setFavList(JSON.parse(storedFavList));
      }
    
      const storedDoneList = localStorage.getItem('done-list');
      if (storedDoneList) {
        setDoneList(JSON.parse(storedDoneList));
      }
    
      fetch('http://localhost:3000/url', { method: 'POST' })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            const updatedList = data.map(item => {
              return { name: item.name, date: item.date };
            });
            addAPIItems(updatedList); // Call the new function to update state with all the items from the API
          })
          .catch(error => console.error(error)); // Add error handling here
    
      getListFromLocalStorage(); // Call the new function to retrieve and update state with the items in local storage
    }, []);

    function addAPIItems(items) {
      const updatedList = [...myList];
      items.forEach(item => {
        if (!updatedList.some(listItem => listItem.name === item.name)) {
          updatedList.push(item);
        }
      });
      setMyList(updatedList);
      localStorage.setItem('myList', JSON.stringify(updatedList));
    }

    function getListFromLocalStorage() {
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        const list = localStorage.getItem('myList');
        if (list) {
          setMyList(JSON.parse(list));
        }
      }
    }

    function formatDate(date: Date): string {
      return new Date(date).toLocaleString();
    }

    function addItem(event){
      event.preventDefault();
      if (inputValue.trim().length === 0) {
        return;
      }
      const newItem = { name: inputValue.trim(), date: formatDate(new Date()) };
      const updatedList = [...myList, newItem];
      setMyList(updatedList);
      localStorage.setItem('myList', JSON.stringify(updatedList)); // Store the updated list to local storage
      setInputValue('');
    }

    function removeItem(item) {
        const updatedList = myList.filter((listItem) => listItem.name !== item.name);
        setMyList(updatedList);
        localStorage.setItem('myList', JSON.stringify(updatedList));
    }

    function saveEditItem(index, text) {
      const updatedList = [...myList];
      updatedList[index].name = text.name;
      updatedList[index].date = text.date;
      setMyList(updatedList);
      localStorage.setItem('myList', JSON.stringify(updatedList));
      setEditIndex();
    }

    function addToFav(item) {
      if (!favList.includes(item)) {
        const updatedList = [...favList, item];
        setFavList(updatedList);
        localStorage.setItem('fav-list', JSON.stringify(updatedList));
      }
    }

    function addFavToList(item) {
      if (!myList.includes(item)) {
        const updatedList = [...myList, item];
        setMyList(updatedList);
      }
    }

    function removeFavItem(item) {
      const updatedList = favList.filter((listItem) => listItem.name !== item.name);
      setFavList(updatedList);
      localStorage.setItem('fav-list', JSON.stringify(updatedList));
  }

    function setToDone(item) {
      console.log(item);
      if (!doneList.includes(item)) {
        const doneItem = { name: item.name, date: item.date, finishDate: new Date().toLocaleString() };
        const updatedList = [...doneList, doneItem ];
        setDoneList(updatedList);
        localStorage.setItem('done-list', JSON.stringify(updatedList));
      }
      removeItem(item);
    }

    function removeDoneItem(item) {
      const updatedList = doneList.filter((listItem) => listItem.name !== item.name);
      setDoneList(updatedList);
      localStorage.setItem('done-list', JSON.stringify(updatedList));
  }

    return (
      <div>
      <div id="myDIV" className="header">
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
        </form>
        <h2>My To Do List ({myList.length})</h2>
      </div>
      <ul>
        {myList.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  saveEditItem(index, event.target.elements[0].value);
                }}
              >
                <input type="text" defaultValue={item.name} />
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
                <span className="name">{item.name}</span>
                <span>{item.date}</span>
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
                <button
                  onClick={() => setToDone(item)}
                  className="bg-gray-500 hover:bg-gray-700 text-black font-semibold py-2 px-4 rounded"
                >
                  Done
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2>My Fav List ({favList.length})</h2>
      <ul>
        {favList.map((item, index) => (
          <li key={index}>
                {item.name}
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
      <h2>Done List ({doneList.length})</h2>
      <ul>
        {doneList.map((item, index) => (
          <li key={index}>
               <span className="name">{item.name}</span>
                <span>{item.finishDate}</span>
                <button
                  onClick={() => removeDoneItem(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => addToFav(item)}
                  className="bg-green-500 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded"
                >
                  fav
                </button>
          </li>
        ))}
      </ul>
    </div>
  );
}