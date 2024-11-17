import { useState, useEffect } from 'react'
import './App.css'



function CommentRow({ comment }) {
  return (
    <tr>
      <td>{comment.text}</td>
      <td>{comment.created_at.toUTCString()}</td>
      <td><button id={comment.id} onClick={() => deleteComment(comment.id)}>Delete</button></td>
    </tr>
  );
}

function deleteComment(id){
  alert("Delete comment id: " + id);
}

function CommentsTable() {
  var today = new Date();
  const [commentList, setCommentList] = useState([
    {id: 1, text: "My first comment", created_at: new Date(today.getTime() - (1000*60*60*24))},
    {id: 2, text: "My second comment", created_at: today},
  ])

  const rows = [];
  commentList.forEach((comment) => {
    rows.push(
      <CommentRow
        comment={comment}
        key={comment.id} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Comment</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function App() {
  const [url, setUrl] = useState('');
  useEffect(() => {
    // Request the current tab's URL from the background script
    chrome.runtime.sendMessage({ type: "get-url" }, (response) => {
      if (response?.url) {
        setUrl(response.url);
      }
    });
  }, []);

  return (
    <>
      <h1>Commently</h1>
      <div>
        <h4>Current Page URL</h4>
        <p>{url || "Loading..."}</p>
      </div>
      <CommentsTable />
    </>
  );
}

export default App
