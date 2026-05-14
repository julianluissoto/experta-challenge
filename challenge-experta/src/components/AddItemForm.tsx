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
        <div className="border-2 border-black p-6 relative bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-sm">
            <span className="absolute -top-3 left-4 bg-yellow-300 px-2 py-0.5 font-bold border-2 border-black uppercase text-xs tracking-wider">
                Nuevo Producto
            </span>
            
            <div className="space-y-5">
                {/* // Input Producto  */}
                <div>
                    <label className="block text-xs font-black uppercase mb-1">Nombre del Producto</label>
                    <input 
                        placeholder="Ej. auto-500-premium" 
                        className={`border-2 border-black w-full p-2 outline-none transition-all ${
                            errors.name ? 'border-red-500 bg-red-50' : 'focus:bg-blue-50'
                        }`}
                        value={product.name} 
                        onChange={e => {
                            setProduct({...product, name: e.target.value});
                            if(errors.name) setErrors({...errors, name: false});
                        }}
                    />
                    {errors.name && (
                        <p className="text-red-600 text-xs mt-1 font-bold flex items-center gap-1">
                            <span>×</span> Este campo es necesario
                        </p>
                    )}
                </div>

                <div className="flex gap-4 items-start">
                 {/*    // Cantidad  */}
                    <div className="w-24">
                        <label className="block text-xs font-black uppercase mb-1">Cant.</label>
                        <input 
                            type="number" 
                            className="border-2 border-black w-full p-2 focus:bg-blue-50 outline-none"
                            value={product.qty} 
                            onChange={e => setProduct({...product, qty: e.target.value})}
                        />
                    </div>

          {/*       //Precio  */}
                    <div className="flex-1">
                        <label className="block text-xs font-black uppercase mb-1">Precio Unitario</label>
                        <div className="relative">
                            <span className="absolute left-2 top-2 font-bold">$</span>
                            <input 
                                type="number" 
                                placeholder="0.00" 
                                className={`no-spinner border-2 border-black w-full p-2 pl-6 outline-none transition-all ${
                                    errors.price ? 'border-red-500 bg-red-50' : 'focus:bg-blue-50'
                                }`}
                                value={product.price} 
                                onChange={e => {
                                    setProduct({...product, price: e.target.value});
                                    if(errors.price) setErrors({...errors, price: false});
                                }}
                            />
                        </div>
                        {errors.price && <p className="text-red-600 text-xs mt-1 font-bold italic">¡Ups! El precio es requerido</p>}
                    </div>
                </div>

                <button 
                    onClick={handleAdd} 
                    className="w-full bg-green-400 border-2 border-black py-2 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                    + Agregar a la lista
                </button>
            </div>
        </div>
    );
};