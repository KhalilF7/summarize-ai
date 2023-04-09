import React, { useState } from 'react';
import axios from 'axios';
import SummaryTooltip from './SummaryTooltip';
import { Link } from 'react-router-dom';

function Summary() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleHighlight = async (e: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      if (selectedText) {
        setLoading(true);
        try {
          const response = await axios.post(
            'http://localhost:8000/summarize-ai/message',
            {
              text: selectedText,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          setTooltipContent(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="summary-form">
      <div className="header">
        <Link to="/myhighlights" className="title">My Highlights</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="summary-text">
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            className="summary-textarea"
          />
        </div>
        <button type="submit" disabled={loading} className="summary-btn">
          Generate Summary
        </button>
      </form>
      {loading && <div className="summary-loading">Loading...</div>}
      {summary && <div className="summary-summary">Summary: {summary}</div>}
      <div className="summary-text" onMouseUp={handleHighlight}>
        <label htmlFor="highlight-text">Highlight text:</label>
        <p>A healthy diet is important for overall health and well-being. Eating a diet rich in fruits, vegetables, whole grains, lean protein, and healthy fats can help prevent chronic diseases such as heart disease, diabetes, and certain types of cancer.

            Fruits and vegetables are rich in vitamins, minerals, and fiber, which can help lower the risk of chronic diseases. Whole grains also provide fiber and other nutrients that are essential for good health. Lean protein sources such as chicken, fish, and legumes provide important nutrients while being lower in saturated fat than many other protein sources.

            Healthy fats, such as those found in nuts, seeds, and avocados, can help improve cholesterol levels and reduce the risk of heart disease. It's important to limit saturated and trans fats, which can raise cholesterol levels and increase the risk of heart disease.

            In addition to the physical health benefits, a healthy diet can also have a positive impact on mental health. Eating a balanced diet can help improve mood, increase energy levels, and reduce the risk of depression.

            To maintain a healthy diet, it's important to eat a variety of foods from all food groups and limit processed and high-fat foods. Making small changes such as incorporating more fruits and vegetables into meals or choosing whole-grain options can have a big impact on overall health.</p>
        <div id="highlight-text">
          <SummaryTooltip text={tooltipContent}>{text}</SummaryTooltip>
        </div>
      </div>
    </div>
  );
}

export default Summary;
