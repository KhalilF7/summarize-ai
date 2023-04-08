import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePoweroff } from 'react-icons/ai';
import './style.css';

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
      window.location.reload();
    };
  
    return (
      <button onClick={handleLogout} className="logout-btn">
        <AiOutlinePoweroff />
      </button>
    );
  }

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
    <div>
        <div className="header">
            <h2 className="title">My Summaries</h2>
            <LogoutButton />
        </div>
        {summaries.length ? (<table>
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
        </table>) : (<h2>You don't have any summaries yet</h2>)}
    </div>
    
  );
}

export default SummaryList;
