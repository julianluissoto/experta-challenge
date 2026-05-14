import { useState } from 'react';
import { useInvoice } from '../hooks/useInvoice';
import { AddItemForm } from './AddItemForm';
import { InvoiceTable } from './InvoiceTable'; // Supongamos que lo creas igual que el anterior

export const InvoiceForm = () => {
    const { customers, items, addItem, removeItem, submitInvoice } = useInvoice();
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | ''>('');

    const handleConfirm = async () => {
        const success = await submitInvoice(selectedCustomerId);
        if (success) setSelectedCustomerId('');
    };

    return (
        <div className="p-4 md:p-10 w-full max-w-6xl mx-auto font-sans text-gray-800">
            <header className="mb-10">
                <label className="block font-bold mb-1">Cliente</label>
                <select 
                    className="border-2 border-black p-1 w-64"
                    value={selectedCustomerId}
                    onChange={e => setSelectedCustomerId(Number(e.target.value))}
                >
                    <option value="">Seleccione Cliente</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </header>

            <main className="flex flex-col lg:flex-row gap-10">
                <InvoiceTable items={items} onRemove={removeItem} />
                <AddItemForm onAdd={addItem} />
            </main>

            <footer className="mt-12 text-center">
                <button 
                    onClick={handleConfirm}
                    className="border-2 border-black px-12 py-2 font-bold text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-all"
                >
                    Generar Factura
                </button>
            </footer>
        </div>
    );
};