import React, { useState, useEffect } from 'react';
import './App.css';

interface Recurso {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
}

function App() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recursos');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setRecursos(data);
      } catch (error:any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {isLoading ? (
            <p>Loading recursos...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {recursos.map((recurso) => (
                  <tr key={recurso.id}>
                    <td>{recurso.id}</td>
                    <td>{recurso.nome}</td>
                    <td>{recurso.descricao}</td>
                    <td>{recurso.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </p>
      </header>
    </div>
  );
}

export default App;
