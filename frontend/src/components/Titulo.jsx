function Titulo({ titulo, subtitulo }) {
  return (
    <header className="titulo">
      <span className="titulo-badge">Loja • Catálogo & Clientes</span>
      <h1>{titulo}</h1>
      <p>{subtitulo}</p>
    </header>
  )
}

export default Titulo
