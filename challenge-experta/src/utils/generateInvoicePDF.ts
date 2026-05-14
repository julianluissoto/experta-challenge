import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { type InvoiceResponse } from '../Types';

export const generateInvoicePDF = (invoice: InvoiceResponse) => {
    const doc = new jsPDF();

    // Título y Encabezado
    doc.setFontSize(20);
    doc.text("FACTURA COMERCIAL", 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Número: ${invoice.invoiceNumber}`, 20, 40);
    doc.text(`Fecha: ${invoice.date}`, 20, 47);
    doc.text(`Cliente: ${invoice.customerName}`, 20, 54);

    // Tabla de productos
    const tableRows = invoice.items.map(item => [
        item.productName,
        item.quantity.toString(),
        `$${item.unitPrice.toLocaleString()}`,
        `$${item.subtotal?.toLocaleString()}`
    ]);

    autoTable(doc, {
        startY: 65,
        head: [['Producto', 'Cant.', 'Precio Unit.', 'Subtotal']],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] } // Un azul profesional
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL FINAL: $${invoice.total.toLocaleString()}`, 190, finalY, { align: 'right' });

    // Abrir en otra pestaña
    doc.output('dataurlnewwindow');
};