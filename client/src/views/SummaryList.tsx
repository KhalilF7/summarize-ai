import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';


function SummaryList() {
  const [summaries, setSummaries] = useState([{ text: '', summary: '', _id: '' }]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/summarize-ai/summaries',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSummaries(response.data);
      console.log(response.data);
    }
    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Text</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {summaries.map((summary) => (
          <tr key={summary._id}>
            <td>{summary.text}</td>
            <td>{summary.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SummaryList;
