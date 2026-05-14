import { useState } from 'react';
import { type InvoiceItem } from '../Types';

interface AddItemFormProps { onAdd: (item: InvoiceItem) => void; }

export const AddItemForm = ({ onAdd }: AddItemFormProps) => {
    const [product, setProduct] = useState({ name: '', qty: '1', price: '' });

    const handleAdd = () => {
        if (!product.name || !product.price) return;
        onAdd({
            productName: product.name,
            quantity: Number(product.qty),
            unitPrice: Number(product.price)
        });
        setProduct({ name: '', qty: '1', price: '' });
    };

    return (
        <div className="border-2 border-black p-4 relative pt-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="absolute -top-3 left-2 bg-white px-1 font-bold border-x-2 border-black">Agregar</span>
            <div className="space-y-4">
                <input 
                    placeholder="Producto" 
                    className="border-2 border-black w-full p-1 outline-none"
                    value={product.name} 
                    onChange={e => setProduct({...product, name: e.target.value})}
                />
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        className="border-2 border-black w-16 p-1"
                        value={product.qty} 
                        onChange={e => setProduct({...product, qty: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Precio" 
                        className="no-spinner border-2 border-black flex-1 p-1"
                        value={product.price} 
                        onChange={e => setProduct({...product, price: e.target.value})}
                    />
                </div>
                <button onClick={handleAdd} className="w-full border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">
                    Agregar
                </button>
            </div>
        </div>
    );
};