function Loading() {
    return (
        
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm animate-fade-in">
            <div className="absolute flex justify-center items-center h-16 w-16 rounded-4xl border-6 border-white border-dashed animate-[spin_2s_linear_infinite] ">
                <div className="absolute h-14 w-14 rounded-4xl border-6 border-blue-950 border-dashed animate-[spin_1s_linear_infinite_reverse]"></div>
            </div>
        </div>

    )
}

export default Loading