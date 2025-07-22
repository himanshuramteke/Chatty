import { useAIStore } from "../store/useAIStore";

export const AiPage = () => {
  const { query, response, loading, setQuery, askAI } = useAIStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    askAI();
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-6 bg-base-100 shadow-xl rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center">🤖 AI Assistant</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything..."
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Ask AI"
            )}
          </button>
        </form>

        {response && (
          <div className="bg-neutral text-neutral-content p-4 rounded-box whitespace-pre-wrap">
            <h2 className="text-lg font-semibold mb-2">💡 Response</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};
