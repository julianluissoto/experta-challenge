import { useState } from 'react';
import { type InvoiceItem } from '../Types';

interface AddItemFormProps { onAdd: (item: InvoiceItem) => void; }

export const AddItemForm = ({ onAdd }: AddItemFormProps) => {
    const [product, setProduct] = useState({ name: '', qty: '1', price: '' });
    const [errors, setErrors] = useState({ name: false, price: false });

    const handleAdd = () => {

        const nameError = !product.name.trim();
        const priceError = !product.price || Number(product.price) <= 0;

        if (nameError || priceError) {
            setErrors({ name: nameError, price: priceError });
            return;
        }

        onAdd({
            productName: product.name,
            quantity: Number(product.qty),
            unitPrice: Number(product.price)
        });

        setProduct({ name: '', qty: '1', price: '' });
        setErrors({ name: false, price: false });
    };

    return (
        <div className="border-2 border-black p-4 relative pt-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="absolute -top-3 left-2 bg-white px-1 font-bold border-x-2 border-black">Agregar</span>

            <div className="space-y-4">

                <div>
                    <input
                        placeholder="Producto"
                        className={`border-2 border-black w-full p-1 outline-none ${errors.name ? 'border-red-500' : ''}`}
                        value={product.name}
                        onChange={e => {
                            setProduct({ ...product, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: false });
                        }}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">Este campo es necesario</p>}
                </div>

                <div className="flex gap-2 items-start">

                    <div className="w-16">
                        <input
                            type="number"
                            className="border-2 border-black w-full p-1"
                            value={product.qty}
                            onChange={e => setProduct({ ...product, qty: e.target.value })}
                        />
                    </div>


                    <div className="flex-1">
                        <input
                            type="number"
                            placeholder="Precio"
                            className={`no-spinner border-2 border-black w-full p-1 outline-none ${errors.price ? 'border-red-500' : ''}`}
                            value={product.price}
                            onChange={e => {
                                setProduct({ ...product, price: e.target.value });
                                if (errors.price) setErrors({ ...errors, price: false });
                            }}
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1 font-bold">Precio requerido</p>}
                    </div>
                </div>

                <button
                    onClick={handleAdd}
                    className="w-full border-2 border-black py-1 font-bold hover:bg-black hover:text-white transition-colors active:translate-y-0.5"
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};