import { useEffect, useState } from 'react'
import Titulo from './components/Titulo.jsx'
import Produto from './components/Produto.jsx'
import FormularioProduto from './components/FormularioProduto.jsx'
import Cliente from './components/Cliente.jsx'
import FormularioCliente from './components/FormularioCliente.jsx'

const API_URL = 'http://localhost:3001'

function App() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Notebook Gamer', categoria: 'Informatica', preco: 3500 },
    { id: 2, nome: 'Smartphone', categoria: 'Eletronicos', preco: 1999.9 },
    { id: 3, nome: 'Cadeira Ergonomica', categoria: 'Moveis', preco: 899.9 },
  ])
  const [nomeProduto, setNomeProduto] = useState('')
  const [categoriaProduto, setCategoriaProduto] = useState('')
  const [precoProduto, setPrecoProduto] = useState('')
  const [clientes, setClientes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroApi, setErroApi] = useState('')
  const [nomeCliente, setNomeCliente] = useState('')
  const [emailCliente, setEmailCliente] = useState('')
  const [telefoneCliente, setTelefoneCliente] = useState('')
  const [cadastrando, setCadastrando] = useState(false)

  async function carregarClientes() {
    try {
      setCarregando(true)
      setErroApi('')
      const res = await fetch(`${API_URL}/clientes`)
      if (!res.ok) throw new Error('erro')
      setClientes(await res.json())
    } catch {
      setErroApi('API fora do ar. Rode o back-end na porta 3001.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregarClientes() }, [])

  function addProduto(e) {
    e.preventDefault()
    if (!nomeProduto.trim() || !categoriaProduto.trim() || !precoProduto) return
    setProdutos((p) => [...p, {
      id: Date.now(), nome: nomeProduto.trim(),
      categoria: categoriaProduto.trim(), preco: Number(precoProduto),
    }])
    setNomeProduto('')
    setCategoriaProduto('')
    setPrecoProduto('')
  }

  async function addCliente(e) {
    e.preventDefault()
    if (!nomeCliente.trim() || !emailCliente.trim() || !telefoneCliente.trim()) return
    try {
      setCadastrando(true)
      const res = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeCliente.trim(), email: emailCliente.trim(), telefone: telefoneCliente.trim() }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Erro ao cadastrar')
      }
      await carregarClientes()
      setNomeCliente('')
      setEmailCliente('')
      setTelefoneCliente('')
    } catch (err) {
      alert(err.message)
    } finally {
      setCadastrando(false)
    }
  }

  return (
    <div className="pagina">
      <Titulo titulo="Catalogo de Produtos" subtitulo="Produtos no State do React e clientes vindos da API." />
      <main className="conteudo">
        <section className="secao">
          <h2 className="secao-titulo">Produtos ({produtos.length})</h2>
          <div className="grade">
            {produtos.map((p) => (
              <Produto key={p.id} nome={p.nome} categoria={p.categoria} preco={p.preco} />
            ))}
          </div>
          <FormularioProduto nome={nomeProduto} categoria={categoriaProduto} preco={precoProduto} onNomeChange={setNomeProduto} onCategoriaChange={setCategoriaProduto} onPrecoChange={setPrecoProduto} onSubmit={addProduto} />
        </section>
        <section className="secao">
          <h2 className="secao-titulo">Clientes ({clientes.length})</h2>
          {carregando && <p className="aviso">Carregando clientes...</p>}
          {erroApi && <p className="erro">{erroApi} <button className="btn-link" onClick={carregarClientes} type="button">Tentar de novo</button></p>}
          <div className="grade">
            {clientes.map((c) => (
              <Cliente key={c.id} nome={c.nome} email={c.email} telefone={c.telefone} />
            ))}
          </div>
          {!carregando && !erroApi && clientes.length === 0 && <p className="aviso">Nenhum cliente ainda. Cadastre abaixo!</p>}
          <FormularioCliente nome={nomeCliente} email={emailCliente} telefone={telefoneCliente} onNomeChange={setNomeCliente} onEmailChange={setEmailCliente} onTelefoneChange={setTelefoneCliente} onSubmit={addCliente} carregando={cadastrando} />
        </section>
      </main>
      <footer className="rodape"><p>React - JSX - Props - State - map() - fetch() - API - Back-End - Banco</p></footer>
    </div>
  )
}

export default App
