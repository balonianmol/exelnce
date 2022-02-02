import React, { useState, useEffect } from 'react';
import axios from 'axios'
const url = '';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0)

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${page}`)
      .then((response) => {
        console.log(response.data.data)
        setPosts(response.data.data)
      })
      .catch((error) => setError(error.message));
  }, [page]);

  if (error) return <h1>{error}</h1>;

  return <div>
    <table>
      <thead>
        <th>
          Avatar
        </th>
        <th>
          First name
        </th>
        <th>
          Last Name
        </th>
        <th>
          Email
        </th>
      </thead>
      <tbody>
        {posts && posts.length && posts.map((post, index) => {
          return (

            <tr key={index}>
              <td>
                <img src={post.avatar} />
              </td>
              <td>
                {post.first_name}
              </td>
              <td>
                {post.last_name}
              </td>
              <td>
                {post.email}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <button disabled={page === 0} onClick={() => setPage(page - 1)}>
      prev
    </button>
    <button disabled={page === 2} onClick={() => setPage(page + 1)}>
      next
    </button>

  </div>;
}
