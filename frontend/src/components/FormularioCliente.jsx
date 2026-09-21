function FormularioCliente({ nome, email, telefone, onNomeChange, onEmailChange, onTelefoneChange, onSubmit, carregando }) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <h2>Cadastrar cliente</h2>
      <p className="form-hint">Os dados são enviados via fetch() para a API e salvos no banco.</p>

      <label>
        Nome
        <input
          type="text"
          placeholder="Ex: Maria Silva"
          value={nome}
          onChange={(e) => onNomeChange(e.target.value)}
          required
        />
      </label>

      <label>
        E-mail
        <input
          type="email"
          placeholder="Ex: maria@email.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
      </label>

      <label>
        Telefone
        <input
          type="tel"
          placeholder="Ex: (11) 99999-9999"
          value={telefone}
          onChange={(e) => onTelefoneChange(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={carregando}>
        {carregando ? 'Cadastrando...' : 'Cadastrar cliente'}
      </button>
    </form>
  )
}

export default FormularioCliente
