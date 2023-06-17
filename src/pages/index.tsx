import React from 'react'
import { useState, useEffect } from 'react'


export default function Index() {
    const [myList, setMyList] = useState([]);
    const [favList, setFavList] = useState([]);
    const [inputValue, setInputValue] = useState('test');
    const [editIndex, setEditIndex] = useState();
    const [doneList, setDoneList] = useState([]);

    


    function handleChange(event) {
        setInputValue(event.target.value);
    }

   
    useEffect(() => {
      const list = localStorage.getItem('myList');
      if (list) {
        setMyList(JSON.parse(list));
      }
      const favList = localStorage.getItem('fav-list');
      if (favList) {
        setFavList(JSON.parse(favList));
      }
      const doneList = localStorage.getItem('done-list');
      if (doneList) {
        setDoneList(JSON.parse(doneList));
      }
    
      const formData = new FormData();
      fetch('http://localhost:3000/url', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMyList(data);   
      }) 
      var interval = setInterval(function(str1, str2) {
        const formData = new FormData();
        fetch('http://localhost:3000/url', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setMyList(data);   
        }) 
           }, 8640000, "Hello.", "How are you?");
    }, []);

    function addItem(event){
       event.preventDefault();

        if (inputValue === '') {
            alert("You must write something!");   
        }
        else{
          if (!myList.includes(inputValue)) {
            const updatedList = [...myList, {name:inputValue, date: new Date().toLocaleString()}];
            setMyList(updatedList);
            console.log(myList);
            localStorage.setItem('myList', JSON.stringify(updatedList));
            setInputValue(''); 
          }
        }
    }

    function removeItem(item) {
        const updatedList = myList.filter((listItem) => listItem.name !== item.name);
        setMyList(updatedList);
        localStorage.setItem('myList', JSON.stringify(updatedList));
    }

    function saveEditItem(index, text) {
      const updatedList = [...myList];
      updatedList[index] = text;
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
        item.finishDate = new Date().toLocaleString();
        const updatedList = [...doneList, item];
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