window.CheckoutLogic = window.CheckoutLogic || {};

window.CheckoutLogic.handleInputChange = function (
  e,
  setFormData,
  errors,
  setErrors
) {
  if (!e || !setFormData) return;

  const { name, value } = e.target || {};
  if (!name) return;

  setFormData((prev) => ({ ...prev, [name]: value }));

  if (errors && errors[name]) {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
};

window.CheckoutLogic.validateForm = function (formData, setErrors) {
  if (!formData) return false;

  const newErrors = {};

  if (!formData.nombre?.trim()) newErrors.nombre = "El nombre es requerido";
  if (!formData.apellido?.trim())
    newErrors.apellido = "El apellido es requerido";
  if (!formData.email?.trim()) newErrors.email = "El email es requerido";
  if (!formData.fono) newErrors.fono = "El teléfono es requerido";
  if (!formData.direccion?.trim())
    newErrors.direccion = "La dirección es requerida";
  if (!formData.comuna?.trim()) newErrors.comuna = "La comuna es requerida";

  setErrors && setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

window.CheckoutLogic.handleSubmit = function (
  e,
  formData,
  isAuthenticated,
  saveAddress,
  user,
  updateUser,
  navigate,
  validateForm,
  setErrors
) {
  if (e && e.preventDefault) e.preventDefault();

  if (!validateForm(formData, setErrors)) return false;

  if (
    isAuthenticated &&
    saveAddress &&
    typeof updateUser === "function" &&
    user
  ) {
    const updatedUser = {
      ...user,
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      fono: formData.fono,
      direccion: formData.direccion,
      comuna: formData.comuna,
    };

    updateUser(updatedUser);
  }

  try {
    localStorage.setItem("shippingData", JSON.stringify(formData));
  } catch (error) {
    console.error("Error guardando shippingData:", error);
  }

  if (navigate && typeof navigate === "function") {
    navigate("/resumen-pedido");
  }

  return true;
};
