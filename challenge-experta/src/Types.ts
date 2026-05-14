export interface Customer {
    id: number;
    name: string;
    email: string;
}

export interface InvoiceItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal?: number; // Calculado por el back, opcional al enviar
}

export interface InvoiceResponse {
    id: number;
    invoiceNumber: string;
    customerName: string;
    date: string;
    items: InvoiceItem[];
    total: number;
}