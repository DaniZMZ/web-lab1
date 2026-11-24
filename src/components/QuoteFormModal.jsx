import { useEffect, useRef } from "react";

function QuoteFormModal({ isOpen, onClose, onSave, initialData }) {
  const dialogRef = useRef(null);
  const quoteInputRef = useRef(null);
  const authorInputRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isOpen) {
      dialogRef.current.showModal();
      if (initialData) {
        quoteInputRef.current.value = initialData.quote;
        authorInputRef.current.value = initialData.author;
      } else {
        quoteInputRef.current.value = "";
        authorInputRef.current.value = "";
      }
    } else {
      dialogRef.current.close();
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const quote = quoteInputRef.current.value.trim();
    const author = authorInputRef.current.value.trim();

    if (!quote || !author) {
      alert("Заполните оба поля");
      return;
    }

    onSave({ quote, author });
  };

  return (
    <dialog ref={dialogRef} className="modal" onCancel={onClose}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {initialData ? "Редактировать цитату" : "Новая цитата"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Текст цитаты</span>
            </label>
            <textarea
              ref={quoteInputRef}
              className="textarea textarea-bordered w-full"
              placeholder="Введите цитату..."
              rows={3}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Автор</span>
            </label>
            <input
              ref={authorInputRef}
              type="text"
              className="input input-bordered w-full"
              placeholder="Имя автора"
            />
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default QuoteFormModal;