import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { InputForm } from '../specific/ComponentsForm';
import { Alert } from '@mui/material';
import CardAdmin from '../cards/CardAdmin';
import WarningModal from '../modals/WarningModal';
import SpinerComponent from '../../components/SpinerComponent';

// Iconos
import { RiAdminFill } from 'react-icons/ri'
import menu from '../../imgs/icons/menu.svg'
import employees from '../../imgs/icons/employees.svg'
import food from '../../imgs/icons/food.svg'
import schedule from '../../imgs/icons/schedule.svg'
import { useAuth } from '../../context/AuthContext'
import img_default_profile_employee from '../../imgs/img_default_profile_resturant.svg'
import img_loading_profile from '../../imgs/gifs/img_loading_profile.gif'

//Image logo Controller
import { uploadFileImage } from '../functions/ControllerImage'
import { Formik } from 'formik';
import { deleteImage2 } from '../../firebase/config'

export default function FormEmployee() {
    const { getEmployee, isLoading, setIsLoading, createEmployee, updateEmployee } = useEmployeeContext();
    const navigateTo = useNavigate();
    const { employee_id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        if (employee_id && !employee) {
            const loadEmployee = async () => {
                try {
                    setIsLoading(true);
                    const employeeData = await getEmployee(employee_id);
                    if (employeeData.data) {
                        setImageUrl(employeeData.data.logo_url)
                        setEmployee(employeeData.data);
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error al cargar el empleado:", error);
                    setIsLoading(false);
                }
            };
            loadEmployee();
        } else {
            setIsLoading(false);
        }
    }, [employee_id, employee, getEmployee,imageUrl]);

    const handleChangeImage = async (e) => {
        setLoadingImage(true)
        const img = e.target.files[0];
        if(img){
          const res =await uploadFileImage(img, clicksCount, setClicksCount);
          setLoadingImage(false)
          setImageUrl(res)
        }
        window.localStorage.removeItem('image_name')
      };

       // Delete logo
    const deleteLogo = async() => {
        if(restaurant && !isLoading){
          updateEmployee(employee.id,{logo_url:""})
          await deleteImage2(employee.logo_url)
          setMessages({text:"Imagen Eliminada correctamente",color:"success"})
          restaurant.logo_url=""
          setImageUrl(null)
        }
      }

      // Verify Password and delete employee
  const handleVerifyPassword = async (password,id) => {
    const res = await verifyPassword(password)
    if(res){
      try {
        const res_delete_employee = await deleteEmployee(id)
        if(res_delete_employee.data){
          return navigateTo('/admin/employees')
        }
      } catch (error) {
        alert("Error al eliminar employee :c",error.data)
        return navigateTo(`/admin/employees/update/${id}`)
      }
      
    }
  }
  if (isLoading && !employee) return <SpinerComponent/>
    return (
        <div className="m-2">
            <h2 className="text-xl font-bold color-text-primary flex justify-center gap-1"> Administra empleado/ <span className="text-black">{employee_id ? "Editar" : "Crear"}</span></h2>
            {imageError === null ? "" : <Alert className="mt-3" severity="error">{imageError}</Alert>}
      
            {messages === null ? "" : <Alert className="mt-3" severity={messages.color}>{messages.text}</Alert>}

            <Formik
                enableReinitialize={true}
                initialValues={
                    employee ?
                        {
                            name: employee.name || "",
                            role: employee.role || "",
                            dni: employee.dni || "",
                            address: employee.address || "",
                            age: employee.age || "",
                            phone: employee.phone || "",
                            logo_url: imageUrl || employee.logo_url
                        }
                        :
                        {
                            name: employee ? employee.name : "",
                            role: employee ? employee.role : "",
                            dni: employee ? employee.dni : "",
                            address: employee ? employee.address : "",
                            age: employee ? employee.age : "",
                            phone: employee ? employee.phone : "",
                            logo_url: employee ? employee.logo_url : ""
                        }
                        }
                onSubmit={async (values) => {
                    values.logo_url=imageUrl?imageUrl:""
                    if (employee_id) {
                        console.log("Updated..")
                        console.log(values)
                        try {
                            updateEmployee(employee_id, values);
                            setMessages({ text: "Datos actualizados correctamente", color: "success" })
                        } catch (error) {
                            setMessages({ text: "Error al actualizar los datos", color: "error" })
                        }
                    } else {
                        console.log("Created")
                        console.log(values)
                        const data = await createEmployee(values)
                        if (data) {
                            navigateTo("/admin/employees")
                        }
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="logo_url" style={{ width: "100px", height: "100px" }} className={`border flex rounded-full overflow-hidden  ${loadingImage ? "bg-white" : imageUrl ? "bg-white" : "bg-teal-600"} cursor-pointer`}>
                                <img style={{ objectFit: "cover", width: "100%", height: "100%" }}

                                    src={loadingImage ? img_loading_profile : imageUrl ? imageUrl : img_default_profile_employee}
                                    alt="imagen-logo" />
                            </label>
                        </div>

                        <div className="my-3 ">
                            <div className='color-text-primary font-medium flex justify-center gap-2'>
                                <label htmlFor="logo_url" className='cursor-default'>{restaurant_id ? "Editar logo" : "Seleccionar logo"}</label>
                                {imageUrl ? <div onClick={deleteLogo} className='cursor-default'>Eliminar logo</div> : null}
                            </div>
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                id="logo_url"
                                onChange={handleChangeImage} />
                        </div>

                        <div className="my-3 flex justify-center">
                            <label htmlFor="name">
                                <b>Nombre del empleado</b>
                            </label>
                            <InputForm
                                name="name"
                                placeholder="Escribe el nombre del empleado"
                                onChange={handleChange}
                                value={values.name}
                                required={true}
                            />
                        </div>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="role">
                                <b>Rol del empleado</b>
                            </label>
                            <InputForm
                                name="role"
                                placeholder="Escribe el rol del empleado"
                                onChange={handleChange}
                                value={values.role}
                                required={true}
                            />
                        </div>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="dni">
                                <b>DNI del empleado</b>
                            </label>
                            <InputForm
                                name="dni"
                                placeholder="Escribe el dni del empleado"
                                onChange={handleChange}
                                value={values.dni}
                                required={true}
                            />
                        </div>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="address">
                                <b>Direccion del empleado</b>
                            </label>
                            <InputForm
                                name="address"
                                placeholder="Escribe la dirección del empleado"
                                onChange={handleChange}
                                value={values.address}
                                required={true}
                            />
                        </div>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="age">
                                <b>Edad del empleado</b>
                            </label>
                            <InputForm
                                name="age"
                                placeholder="Escribe la edad del empleado"
                                onChange={handleChange}
                                value={values.age}
                                required={true}
                            />
                        </div>
                        <div className="my-3 flex justify-center">
                            <label htmlFor="phone">
                                <b>Numero del empleado</b>
                            </label>
                            <InputForm
                                name="phone"
                                placeholder="Escribe el telefono del empleado"
                                onChange={handleChange}
                                value={values.phone}
                                required={true}
                            />
                        </div>
                        <div className="flex gap-2 justify-center">
                            {employee_id ? 
                                <button onClick={() => navigateTo('/admin/employees')} type="button" className="border-2 bg-gray-100 hover-bg-gray-200 px-3 py-2 rounded">Cancelar</button>
                             : null}
                            <button disabled={loadingImage||isSubmitting} type="submit" className={`${loadingImage? 'cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'} px-3 py-2 rounded text-white`} >

                                {employee_id ? isSubmitting ? 
                                <p className='flex items-center'><SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-teal-500"/>Actualizando...</p>
                                    :"Actualizar":

                                     isSubmitting? loadingImage?
                                     <p className='flex items-center'><SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-teal-500"/>Creando...</p>
                                     :null:"Crear Empleado"}      
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
   {employee_id ? 
        <div className="flex gap-2 justify-center mt-3">
            <div className="grid grid-cols-2 gap-4">
                <CardAdmin car_img={employees} card_title="Mis empleados" />
                <CardAdmin car_img={menu} card_title="Mi menú" />
                <CardAdmin car_img={schedule} card_title="Horario de trabajo" />
                <CardAdmin car_img={food} card_title="Mis platos" />
            </div>
        </div>
    : null}
    {employee_id ? 
        <div className="flex justify-center mt-5">
            <WarningModal
                titleButtonModal="Eliminar Empleado"
                navigateToModal={'/admin/employees'}
                textHeaderComponent={<p className="py-3 pl-3 font-semibold"><span className="text-red-500">Eliminar/</span> {employee ? employee.name : null}</p> }
                textModalComponent={
                    <div>
                        {errors.length <= 0 ? '' : <Alert className="mb-5" severity="error">{errors}</Alert>}
                        <p className="mb-2">Si eliminas al empleado <span className="font-semibold">{employee ? employee.name : null}</span>, se eliminará.</p>
                        <p className="font-semibold">Para continuar, escribe la contraseña de la cuenta.</p>
                        <Formik initialValues={{ password: '' }} 
                        onSubmit={async (values) => {
                            handleVerifyPassword(values.password, employee.id)}}>
                            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={values.password}
                                        className="color-text p-4 w-full py-2 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-blue-800" required />
                                    <button type="submit" className="w-full mt-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 mr-2">
                                        Eliminar
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                }
            />
        </div>: null}
    </div>
    )
}
