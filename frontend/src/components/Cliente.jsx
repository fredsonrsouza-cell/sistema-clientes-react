function Cliente({ nome, email, telefone }) {
  const inicial = nome ? nome.charAt(0).toUpperCase() : '?'

  return (
    <article className="card cliente">
      <div className="cliente-avatar">{inicial}</div>
      <div>
        <h3>{nome}</h3>
        <p>📧 {email}</p>
        <p>📞 {telefone}</p>
      </div>
    </article>
  )
}

export default Cliente
