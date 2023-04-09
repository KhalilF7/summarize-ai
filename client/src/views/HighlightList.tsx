import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlinePoweroff } from 'react-icons/ai';
import './style.css';
import ExportButton from './ExportButton';

/**
 * Logout button component
 */
function LogoutButton() {
  const navigate = useNavigate();

  /**
   * Function to handle the logout action
   */
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

/**
 * Component to display the list of highlights
 */
function HighlightList() {
  const [highlights, setHighlights] = useState([{ text: '', summary: '', _id: '' }]);
  const [isEnabled, setIsEnabled] = useState(true);

  /**
   * Function to toggle the button state
   */
  const handleClick = () => {
    setIsEnabled(!isEnabled);
  };
  
  const buttonStyle = {
    backgroundColor: isEnabled ? 'green' : 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  /**
   * Function to handle the export action
   * @param type - type of export file (pdf/csv)
   */
  const handleExport = async (type: string) => {
    // Call the export API endpoint here
    const response = await axios.get(`http://localhost:8000/summarize-ai/export-${type}`,
    {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    // Download the exported file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `highlights.${type}`);
    document.body.appendChild(link);
    link.click();
  };

  /**
   * Fetch the list of highlights from the server
   */
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/summarize-ai/summaries',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setHighlights(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="header">
        <button style={buttonStyle} onClick={handleClick}>
          {isEnabled ? 'Enable' : 'Disable'}
        </button>
        <ExportButton onExport={handleExport} />
        <LogoutButton />
      </div>
      <div className="header">
        <h2 className="title">My Highlights</h2>
      </div>
      {highlights.length ? (
        <table>
          <thead>
            <tr>
              <th>Highlight</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {highlights.map((summary) => (
              <tr key={summary._id}>
                <td>{summary.text}</td>
                <td>{summary.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>You don't have any highlights yet</h2>
      )}
    </div>
  );
}  

export default HighlightList;
