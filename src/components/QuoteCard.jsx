function QuoteCard({ quote, onEdit, onDelete }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <blockquote className="text-lg italic">“{quote.quote}”</blockquote>
        <p className="text-right font-semibold">— {quote.author}</p>
        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-sm btn-outline btn-info"
            onClick={() => onEdit(quote)}
          >
            Редактировать
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => onDelete(quote.id)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;