/**
 * Lógica pura del componente Checkout.jsx
 * Todas las funciones están encapsuladas en window.CheckoutLogic
 * para evitar conflictos globales.
 */

window.CheckoutLogic = window.CheckoutLogic || {};

/**
 * 🧠 handleInputChange
 * Actualiza el estado formData al modificar un input y limpia errores asociados.
 */
window.CheckoutLogic.handleInputChange = function (e, setFormData, errors, setErrors) {
    if (!e || !setFormData) return;

    const { name, value } = e.target || {};
    if (!name) return;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors && errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
};

/**
 * ✅ validateForm
 * Valida los campos obligatorios del formulario.
 * Retorna true si todos los campos están correctos.
 */
window.CheckoutLogic.validateForm = function (formData, setErrors) {
    if (!formData) return false;

    const newErrors = {};

    if (!formData.nombre?.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido?.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email?.trim()) newErrors.email = 'El email es requerido';
    if (!formData.fono) newErrors.fono = 'El teléfono es requerido';
    if (!formData.direccion?.trim()) newErrors.direccion = 'La dirección es requerida';
    if (!formData.comuna?.trim()) newErrors.comuna = 'La comuna es requerida';

    setErrors && setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

/**
 * 🧾 handleSubmit
 * Maneja el envío del formulario. Valida, guarda datos y redirige.
 */
window.CheckoutLogic.handleSubmit = function (
    e,
    formData,
    isAuthenticated,
    saveAddress,
    updateUser,
    navigate,
    validateForm,
    setErrors
) {
    if (e && e.preventDefault) e.preventDefault();

    if (!validateForm(formData, setErrors)) return false;

    // Si el usuario está autenticado y quiere guardar dirección
    if (isAuthenticated && saveAddress && typeof updateUser === 'function') {
        updateUser({
            nombre: formData.nombre,
            apellido: formData.apellido,
            fono: formData.fono,
            direccion: formData.direccion,
            comuna: formData.comuna,
        });
    }

    try {
        localStorage.setItem('shippingData', JSON.stringify(formData));
    } catch (error) {
        console.error('❌ Error guardando shippingData:', error);
    }

    if (navigate && typeof navigate === 'function') {
        navigate('/resumen-pedido');
    }

    return true;
};
