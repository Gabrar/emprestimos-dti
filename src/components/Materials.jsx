import { Check, MarsStroke, TrashIcon } from "lucide-react"
import { v4 } from "uuid"

function Materials({ emprestados, onDeleteEmp }) {

    return (
        <ul className="space-y-4 p-6">
            {emprestados.map((emp) => (
                <li key={emp.id}
                    className=" bg-slate-300 p-2 rounded-md flex gap-2 justify-between border"
                >
                    <span>Professor(a): {emp.prof?.nome}</span>
                    <span>HDMI: {emp.cab?.hdmi}</span>
                    <span>Controle: {emp.contr?.controle}</span>
                    <span>Notebook: {emp.note?.notebook} - {emp.note?.marca}</span>
                    <span>Fonte: {emp.font?.fonte} - {emp.font?.marca}</span>
                    <span>Caixa de som:</span>

                    <button
                        className="bg-slate-400 text-white rounded-md cursor-pointer"
                        onClick={() => onDeleteEmp(emp.id)}
                    >
                        <Check />
                    </button>
                </li>
            ))}




        </ul>
    )
}

export default Materials

/* Professor: {emp.prof}
| Notebook: {emp.note}
| HDMI: {emp.cab}
| Controle: {emp.contr}
| Caixa de Som: {emp.cx}


    className="space-y-4 p-6"

'   className="className=' bg-slate-300 p-2 rounded-md flex gap-2"
*/