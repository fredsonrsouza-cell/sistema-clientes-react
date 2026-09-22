function Produto({ nome, categoria, preco }) {
  const precoFormatado = Number(preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <article className="card produto">
      <span className="chip">{categoria}</span>
      <h3>{nome}</h3>
      <p className="preco">{precoFormatado}</p>
    </article>
  )
}

export default Produto
