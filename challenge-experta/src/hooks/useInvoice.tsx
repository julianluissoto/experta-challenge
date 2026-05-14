import { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { type Customer, type InvoiceItem, type InvoiceResponse } from '../Types';
import { generateInvoicePDF } from '../utils/generateInvoicePDF';
import Swal from 'sweetalert2';

export const useInvoice = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await api.get<Customer[]>('/customers');
                setCustomers(res.data);
            } catch (err) {
                Swal.fire('Error', 'No se pudieron cargar los clientes', 'error');
            }
        };

        fetchCustomers();
    }, []);

    const addItem = (item: InvoiceItem) => {
        setItems(prev => [...prev, item]);
    };

    const removeItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const submitInvoice = async (customerId: number | '') => {
        if (!customerId || items.length === 0) {
            await Swal.fire({ title: '¡Atención!', text: 'Datos incompletos', icon: 'warning', confirmButtonColor: '#000' });
            return false;
        }

        setIsLoading(true);
        Swal.showLoading();

        try {
            const payload = { customerId, items };
            
            const res = await api.post<InvoiceResponse>('/invoices', payload);

            Swal.close();
            generateInvoicePDF(res.data);

            await Swal.fire({
                title: 'Éxito',
                text: `Factura ${res.data.invoiceNumber} creada correctamente`,
                icon: 'success',
                confirmButtonColor: '#000'
            });

            setItems([]);
            return true;
        } catch (err: any) {
            Swal.close();
            const msg = err.response?.data?.message || 'Error al procesar la factura';
            await Swal.fire({ title: 'Error', text: msg, icon: 'error' });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { customers, items, addItem, removeItem, submitInvoice, isLoading };
};