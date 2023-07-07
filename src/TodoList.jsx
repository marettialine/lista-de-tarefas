import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icon from './assets/img/icon.webp';

function TodoList(){

    // fica armazenado como texto
    const listaStorage = localStorage.getItem('Lista');

    // JSON.parse: vai converter texto para objeto
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    // salva no localStorage do navegador
    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista]);

    function adicionaItem(form){
        // previne do form enviar sem fazer as verificações
        form.preventDefault();

        // se não tiver nenhum novoItem, não tem que acontecer nada, form não vai ser enviado
        if(!novoItem){
            return;
        }

        //...lista: copia a lista e adiciona mais dados
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaTudo(){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form action="" onSubmit={adicionaItem}>
                <input 
                    id="input-entrada"
                    type="text"
                    placeholder="Adicione uma tarefa"
                    value={novoItem}
                    onChange={(e) => {setNovoItem(e.target.value)}}
                />
                <button type="submit" className="add">Add</button>
            </form>
            <div className="listaTarefas">
                <div style={{textAlign: 'center'}}>
                    {
                        lista.length < 1
                        ?
                        <img className="icone-central" src={Icon} alt="" />
                        :
                        // vai repetir div item para cada item da lista
                        [...lista].reverse().map((item, index)=>(
                            <div 
                                key={index}
                                className={item.isCompleted ? "item completo" : "item"}
                            >
                                <span onClick={()=>(clicou(index))}>{item.text}</span>
                                <button onClick={()=>(deleta(index))} className="del">Deletar</button>
                            </div>
                        ))
                    }
                    {
                        lista.length > 0 &&
                        <button onClick={()=>(deletaTudo())} className="deleteAll">Deletar Todas</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default TodoList