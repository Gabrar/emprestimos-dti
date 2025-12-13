import { Check, MarsStroke, TrashIcon } from "lucide-react"
import { v4 } from "uuid"
import Swal from 'sweetalert2';

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
                        onClick={() => {
                            Swal.fire({
                                title: "Você tem certeza?",
                                text: "Não será possível revertar esta ação!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Sim!",
                                cancelButtonText: "Não."
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: "Confirmado!",
                                        text: "O empréstimo foi constado como devolvido.",
                                        icon: "success"
                                    });
                                    onDeleteEmp(emp.id);
                                }
                            });
                        }}
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