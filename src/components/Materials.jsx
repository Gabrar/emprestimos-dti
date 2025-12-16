import { Check, MarsStroke, TrashIcon } from "lucide-react"
import Swal from 'sweetalert2';

function Materials({ emprestados, onDeleteEmp, onDevolverSubmit }) {

    return (
        <ul className="space-y-4 p-6">
            {emprestados.map((emp) => (
                <li key={emp.id}
                    className="flex gap-3 justify-between"
                >
                    <div className="p-2 w-full justify-between rounded-md flex gap-1 shadow-md bg-slate-300 ">
                        <span><strong>Professor(a):</strong> <u>{emp.prof?.nome}</u></span>
                        <span><strong>HDMI:</strong> {emp.cab?.hdmi ? '' : '-----'} <u>{emp.cab?.hdmi}</u></span>
                        <span><strong>Controle:</strong> {emp.contr?.controle ? '' : '-----'} <u>{emp.contr?.controle}</u></span>
                        <span><strong>Notebook:</strong> {emp.note?.notebook ? <u>{emp.note.notebook} - {emp.note.marca}</u> : '-----'} </span>
                        <span><strong>Fonte:</strong> {emp.font?.fonte ? <u>{emp.font.fonte} - {emp.font.marca}</u> : '-----'} </span>
                        <span><strong>Caixa de som:</strong> {emp.cx?.caixa ? <u>{emp.cx.caixa}</u> : '-----'}</span>
                    </div>

                    <button
                        className="bg-slate-400 text-white rounded-md cursor-pointer p-2 h-full "
                        onClick={() => {
                            Swal.fire({
                                title: "Você tem certeza?",
                                text: "Não será possível revertar esta ação!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Sim!",
                                cancelButtonText: "Não.",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: "Confirmado!",
                                        text: "O empréstimo foi constado como devolvido.",
                                        icon: "success",
                                        input: "text",
                                        inputPlaceholder: "Alguma observação?",

                                        inputAttributes: {
                                            autocomplete: 'off'
                                        }
                                    }).then((inputResult) => {
                                        if (inputResult.isConfirmed) {
                                            const obs = inputResult.value || "Sem observação"
                                            onDevolverSubmit(emp, obs)
                                        }
                                    })
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