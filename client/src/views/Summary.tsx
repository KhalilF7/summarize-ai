import { useState } from 'react';
import axios from 'axios';
import './style.css';

function Summary() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/summarize-ai/message',
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSummary(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-form">
      <form onSubmit={handleSubmit}>
        <div className="summary-text">
          <label htmlFor="text">Text:</label>
          <textarea id="text" value={text} onChange={handleTextChange} className="summary-textarea" />
        </div>
        <button type="submit" disabled={loading} className="summary-btn">
          Generate Summary
        </button>
      </form>
      {loading && <div className="summary-loading">Loading...</div>}
      {summary && <div className="summary-summary">Summary: {summary}</div>}
    </div>
  );
}

export default Summary;
