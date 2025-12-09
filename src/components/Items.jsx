function Items({ professores, notebooks, fontes, cabos, controles }) {

    return (
        <ul className="flex flex-col gap-3">
            <li>
                <select className='w-full bg-white p-2 rounded-md' id="">
                    <option value={null}>Professor</option>
                    {professores.map((professores) => (
                        <option key={professores.id}>
                            {professores.nome}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'>
                    <option value={null}>HDMI</option>
                    {cabos.map((cabo) => (
                        <option key={cabo.id}>
                            {cabo.hdmi}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'>
                    <option value={null}>Controle</option>
                    {controles.map((controle) => (
                        <option key={controle.id}>
                            {controle.controle}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md' id="">
                    <option value={null}>Notebook</option>
                    {notebooks.map((notebooks) => (
                        <option key={notebooks.id}>
                            {notebooks.notebook} - {notebooks.marca}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <select className='w-full bg-white p-2 rounded-md'>
                    <option value={null}>Fonte Notebook</option>
                    {fontes.map((fontes) => (
                        <option key={fontes.id}>
                            {fontes.fonte} - {fontes.marca}
                        </option>
                    ))}
                </select>
            </li>
            
        </ul>
    )
}

export default Items