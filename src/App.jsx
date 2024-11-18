import { useState, useEffect } from 'react'
import './App.css'
import './pure-min.css'

function CommentRow({ comment }) {
  return (
    <tr>
      <td>{comment.text}</td>
      <td>
        {comment.created_at.toUTCString()}
        <button id={comment.id} onClick={() => deleteComment(comment.id)}>Delete</button>
      </td>
    </tr>
  );
}

function deleteComment(id){
  alert("Delete comment id: " + id);
}

function CommentsTable({ commentList }) {
  const rows = [];
  commentList.forEach((comment) => {
    rows.push(
      <CommentRow
        comment={comment}
        key={comment.id} />
    );
  });

  return (
    <table class="pure-table-bordered">
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
  const [rendered, setRendered] = useState(false);

  var today = new Date();
  var commentsData = [
    {id: 1, text: "My first comment", created_at: new Date(today.getTime() - (1000*60*60*24))},
    {id: 2, text: "My second comment", created_at: today},
    {id: 3, text: "Another comment", created_at: today},
    {id: 4, text: "Yet another comment", created_at: today}
  ]
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    // Request the current tab's URL from the background script
    chrome.runtime.sendMessage({ type: "get-url" }, (response) => {
      if (response?.url) {
        setUrl(response.url);

        // TODO: Replace this to fetch from DB
        setCommentList(commentsData)

        setRendered(true);
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
      {/* Only once the url is fetched do we need to render the below components */}
      { rendered &&
        (
          <div>
            <CommentsTable commentList={commentList}/>
            <div class="pure-g">
              <div class="pure-u-5-6">
                <textarea name='comment-text'/>
              </div>
              <div class="pure-u-1-6">
                <button type="submit">Comment</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default App
