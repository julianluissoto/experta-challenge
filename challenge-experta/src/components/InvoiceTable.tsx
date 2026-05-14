import { type InvoiceItem } from "../Types";

interface Props {
    items: InvoiceItem[];
    onRemove: (index: number) => void;
}

export const InvoiceTable = ({ items, onRemove }: Props) => {
    const emptyRows = Math.max(0, 3 - items.length);

    return (
        <div className="flex-[3] w-full">
            <table className="w-full border-2 border-black border-collapse bg-white">
                <thead>
                    <tr className="bg-gray-300 border-b-2 border-black">
                        {/* Ajustamos anchos fijos para evitar el salto de línea de image_922385.png */}
                        <th className="border-r-2 border-black p-2 text-left">Producto</th>
                        <th className="border-r-2 border-black p-2 text-center w-24">Cant.</th>
                        <th className="border-r-2 border-black p-2 text-center w-32">Precio Unit.</th>
                        <th className="border-r-2 border-black p-2 text-center w-32">Subtotal</th>
                        <th className="p-2 text-center w-28">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className="border-b-2 border-black last:border-b-0 h-10">
                            <td className="border-r-2 border-black p-2 align-middle">{item.productName}</td>
                            <td className="border-r-2 border-black p-2 text-center align-middle">{item.quantity}</td>
                            <td className="border-r-2 border-black p-2 text-right align-middle px-4">
                                ${item.unitPrice.toLocaleString()}
                            </td>
                            <td className="border-r-2 border-black p-2 text-right align-middle px-4 font-bold">
                                ${(item.quantity * item.unitPrice).toLocaleString()}
                            </td>
                            <td className="p-2 text-center align-middle">
                                <button 
                                    onClick={() => onRemove(index)} 
                                    className="text-red-600 underline font-bold text-sm hover:text-red-800"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {/* Filas de relleno estéticas */}
                    {[...Array(emptyRows)].map((_, i) => (
                        <tr key={`empty-${i}`} className="h-10 border-b-2 border-black last:border-b-0 bg-gray-50">
                            <td className="border-r-2 border-black"></td>
                            <td className="border-r-2 border-black"></td>
                            <td className="border-r-2 border-black"></td>
                            <td className="border-r-2 border-black"></td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};