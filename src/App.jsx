import { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import QuoteFormModal from "./components/QuoteFormModal";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null); 

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/quotes?limit=10");
        if (!res.ok) throw new Error("Ошибка загрузки цитат");
        const data = await res.json();
        setQuotes(data.quotes); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const handleAddClick = () => {
    setEditingQuote(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (quote) => {
    setEditingQuote(quote);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Удалить эту цитату?")) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingQuote) {
      setQuotes((prev) =>
        prev.map((q) =>
          q.id === editingQuote.id ? { ...q, ...formData } : q
        )
      );
    } else {
      const newQuote = {
        id: Date.now(), 
        quote: formData.quote,
        author: formData.author,
      };
      setQuotes((prev) => [newQuote, ...prev]);
    }
    setIsModalOpen(false);
    setEditingQuote(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error m-4">
        <span>Ошибка: {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Цитаты</h1>
        <button className="btn btn-primary" onClick={handleAddClick}>
          + Добавить цитату
        </button>
      </div>

      {quotes.length === 0 ? (
        <p className="text-center text-gray-500">Цитат пока нет.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <QuoteFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuote(null);
        }}
        onSave={handleSave}
        initialData={editingQuote}
      />
    </div>
  );
}

export default App;