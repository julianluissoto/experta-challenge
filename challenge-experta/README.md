# 📑 Sistema de Facturación - Frontend

Cliente web moderno para la gestión de facturas, desarrollado con **React**, **TypeScript** y **Tailwind CSS**. Este proyecto utiliza una arquitectura basada en Hooks para separar la lógica de negocio de la interfaz de usuario.

## 🚀 Características


*   **Gestión de Estados Inteligente**: Inputs de precio y cantidad optimizados para permitir el borrado total de valores.
*   **Arquitectura de Hooks**: Lógica de API centralizada en el custom hook `useInvoice` utilizando `async/await`.
*   **Generación de PDF**: Creación automática de facturas en PDF que se abren en una nueva pestaña tras un guardado exitoso.
*   **Notificaciones**: Integración de `SweetAlert2` con estilos personalizados que coinciden con la estética del sitio.
*   **Validaciones**: Prevención de productos duplicados y control de campos obligatorios antes del envío.

## 🛠️ Tecnologías

*   **React 18** (Vite)
*   **TypeScript**
*   **Tailwind CSS**
*   **Axios** 
*   **jsPDF & jsPDF-AutoTable** (Reportes)
*   **SweetAlert2** (Alertas)

## 📦 Instalación

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Librerías requeridas:**
    ```bash
    npm install jspdf jspdf-autotable sweetalert2 axios
    ```

3.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev