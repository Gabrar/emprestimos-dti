import { use, useState } from "react"
import { v4 } from 'uuid'

function Items({ professores, cabos, controles, notebooks, fontes, onAddEmpSubmit }) {

    const [prof, setProf] = useState("")
    const [cab, setCab] = useState("")
    const [contr, setContr] = useState("")
    const [note, setNote] = useState("")
    const [font, setFont] = useState("")

    return (

        <ul className="flex flex-col gap-3">
            <li>
                <select className='w-full bg-white p-2 rounded-md' id=""
                    value={prof?.id || ''}
                    onChange={(e) => {
                        const idSelecionado = e.target.value

                        const professorCompleto = professores.find(p => String(p.id) === idSelecionado)
                        setProf(professorCompleto)

                    }}
                >
                    <option value={null}>Professor</option>
                    {professores.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.nome}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'
                    value={cab?.id || ''}
                    onChange={(e) => {
                        const idSelecionado = e.target.value

                        const caboCompleto = cabos.find(p => String(p.id) === idSelecionado)
                        setCab(caboCompleto)
                    }}
                >
                    <option value={null}>HDMI</option>
                    {cabos.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.hdmi}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'
                    value={contr?.id || ''}
                    onChange={(e) => {
                        const idSelecionado = e.target.value

                        const controleCompleto = controles.find(p => String(p.id) === idSelecionado)
                        setContr(controleCompleto)
                    }}
                >
                    <option value={null}>Controle</option>
                    {controles.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.controle}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'
                    value={note?.id || ''}
                    onChange={(e) => {
                        const idSelecionado = e.target.value

                        const noteCompleto = notebooks.find(p => String(p.id) === idSelecionado)
                        setNote(noteCompleto)
                    }}
                >
                    <option value={null}>Notebook</option>
                    {notebooks.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.notebook} - {item.marca}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'
                    value={font?.id || ''}
                    onChange={(e) => {
                        const idSelecionado = e.target.value

                        const fonteCompleto = fontes.find(p => String(p.id) === idSelecionado)
                        setFont(fonteCompleto)
                    }}
                >
                    <option value={null}>Fonte Notebook</option>
                    {fontes.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.fonte} - {item.marca}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'>
                    <option value={1}>Caixa de som</option>
                </select>
            </li>
            <button className='w-32 bg-white p-2 rounded-md cursor-pointer hover:bg-slate-300 duration-100 ease-in self-center outline-1 outline-slate-400'
                onClick={() => {

                    if (!prof) {
                        return alert("INFORME O PROFESSOR")
                    }
                    onAddEmpSubmit(prof, cab, contr, note, font);
                    setProf('');
                    setCab('')
                    setContr('')
                    setNote('')
                    setFont('')
                }}
            >
                Confirmar
            </button>
        </ul>
    )
}

export default Items

/*
    if (!prof.trim() || !contr.trim() || !cab.trim() || !note.trim() || !font.trim()) {
                        return alert("PREENCHA TODOS OS CAMPOS!")
                    }
*/