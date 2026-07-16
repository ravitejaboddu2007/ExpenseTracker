import { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
export function AIAnalysis({ expenseList }) {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [ques, setQues] = useState("");
  const AskAi = async () => {
    if (!ques.trim()) {
      return;
    }
    const requestBody = {
      model: "gemini-3.5-flash",
      input: `
      You are a personal finance assistant.Analyze the following expenses and answer the user's question.
            Expenses:${JSON.stringify(expenseList, null, 2)}
            Question:${ques}`,
    };

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/interactions",
        requestBody,
        {
          headers: {
            "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );
      const result = response.data.steps[1].content[0].text;
      setAiAnalysis(result);
    } catch (error) {
      if (error.response?.status === 500) {
        setAiAnalysis(
          "⚠️ Gemini AI is currently experiencing high demand. Please try again in a few moments.",
        );
      } else if (error.response?.status === 429) {
        setAiAnalysis(
          "⚠️ Too many requests. Please wait a few seconds and try again.",
        );
      } else {
        setAiAnalysis("Something went wrong.");
      }
    }
  };
  return (
    <div className="ai-analysis">
      <h4>🤖 AI Analysis</h4>
      <div className="ai-input-container">
        <textarea
          id="textarea"
          placeholder="Ask AI a question"
          value={ques}
          onChange={(e) => setQues(e.target.value)}
        ></textarea>
        <button onClick={AskAi} id="AskAI">
          Ask AI
        </button>
      </div>

      <div className="ai-response">
        {aiAnalysis ? (
          <>
            <h4>Q){ques}</h4>
            <h4>ans)</h4>
            <Markdown>{aiAnalysis}</Markdown>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
