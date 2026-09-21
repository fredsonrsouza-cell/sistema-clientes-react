function FormularioProduto({ nome, categoria, preco, onNomeChange, onCategoriaChange, onPrecoChange, onSubmit }) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <h2>Adicionar produto</h2>
      <p className="form-hint">Os produtos ficam salvos apenas no State do React.</p>

      <label>
        Nome do produto
        <input
          type="text"
          placeholder="Ex: Teclado mecânico"
          value={nome}
          onChange={(e) => onNomeChange(e.target.value)}
          required
        />
      </label>

      <label>
        Categoria
        <input
          type="text"
          placeholder="Ex: Informática"
          value={categoria}
          onChange={(e) => onCategoriaChange(e.target.value)}
          required
        />
      </label>

      <label>
        Preço (R$)
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Ex: 299.90"
          value={preco}
          onChange={(e) => onPrecoChange(e.target.value)}
          required
        />
      </label>

      <button type="submit">Cadastrar produto</button>
    </form>
  )
}

export default FormularioProduto
