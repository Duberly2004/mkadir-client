import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEmployeeContext } from '../../context/EmployeeContext'
import { InputForm } from '../specific/ComponentsForm'
import { Alert } from '@mui/material'
import WarningModal from '../modals/WarningModal'

// Iconos
import { useAuth } from '../../context/AuthContext'

// Spiner
import SpinerComponent from '../../components/SpinerComponent'

//Image logo Controller
import { uploadFileImage } from '../functions/ControllerImage'
import { Formik } from 'formik'
import { deleteImage2 } from '../../firebase/config'

export default function FormEmployee() {
    const [loadingImage,setLoadingImage] = useState(false)//Loading
    const { messages,setMessages,getEmployee, isLoading, setIsLoading,deleteEmployee, createEmployee, updateEmployee } = useEmployeeContext();
    const { verifyPassword,errors } = useAuth()
    const navigateTo = useNavigate()
    const {restaurant_id, employee_id } = useParams()
    const [employee, setEmployee] = useState(null)
    const [imageUrl,setImageUrl] = useState(null)
    const [imageError,setImageError] = useState(null)
    const [clicksCount, setClicksCount] = useState(0)

    useEffect(() => {
        console.log("restaurant_id:", restaurant_id);
        console.log("employee_id:", employee_id);

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
    }, [employee_id, employee, getEmployee]);

      // Verify Password and delete employee
  const handleVerifyPassword = async (password,id) => {
    const res = await verifyPassword(password)
    if(res){
      try {
        const res_delete_employee = await deleteEmployee(restaurant_id,employee_id)
        if(res_delete_employee.data){
          return navigateTo(`/admin/restaurants/${restaurant_id}/employees`)

        }
      } catch (error) {
        alert("Error al eliminar employee :c",error.data)
        return navigateTo(`/admin/restaurants/${restaurant_id}/employees/update/${employee_id}`)
      }
      
    }
  }
  if (isLoading && !employee) return <SpinerComponent/>
    return (
        <div className="m-2">
            <h2 className="text-xl font-bold color-text-primary flex justify-center gap-1"> Administrar empleado/ <span className="text-black">{employee_id ? "Editar" : "Crear"}</span></h2>
            {imageError === null ? "" : <Alert className="mt-3" severity="error">{imageError}</Alert>}
      
            {messages === null ? "" : <Alert className="mt-3" severity={messages.color}>{messages.text}</Alert>}

            <Formik
                enableReinitialize={true}
                initialValues={
                    employee?
                        {
                            user: employee.user ? employee.user.id : "", 
                            role: employee.user && employee.role ? employee.role.id : "", 
                            dni: employee.dni || "",
                            address: employee.address || "",
                            age: employee.age || "",
                            phone: employee.phone || "",
                        }
                        :
                        {
                            user: employee? employee.user.id:"",
                            role: employee? employee.role.id : "",
                            dni: employee? employee.dni:"",
                            address: employee? employee.address:"",
                            age: employee? employee.age:"",
                            phone: employee? employee.phone:"",
                        }
                        }
                onSubmit={async (values) => {
                    if (employee_id ) {
                        console.log("Updated..")
                        console.log(values)
                        try {
                            updateEmployee(restaurant_id, employee_id,values);
                            setMessages({ text: "Datos actualizados correctamente", color: "success" })
                        } catch (error) {
                            setMessages({ text: "Error al actualizar los datos", color: "error" })
                        }
                    } else {
                        console.log("Created")
                        console.log(values)
                        const data = await createEmployee( restaurant_id,values )
                        if (data && data.id) {
                            navigateTo(`/admin/restaurants/${restaurant_id}/employees`)
                        } else {
                            console.error("Error al crear el empleado:",data)
                        }
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>

                        <div className="my-3 flex justify-center">
                           <label htmlFor="user">
                              <b>Usuario </b>
                           </label>
                            <InputForm
                              name="user"
                              placeholder="Ingrese el id del usuario a emplear"
                              onChange={handleChange}
                              value={values.user}
                              required={true}
                             />
                        </div>
                        <div className="my-3 flex justify-center">
                           <label htmlFor="role">
                              <b>Rol</b>
                           </label>
                           <InputForm
                             name="role"
                             placeholder="Ingrese id del rol a designar"
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
                                <button onClick={() => navigateTo(`/admin/restaurants/${restaurant_id}/employees`)} type="button" className="border-2 bg-gray-100 hover-bg-gray-200 px-3 py-2 rounded">Cancelar</button>
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
          {/* Modal delete */}
    {employee_id ? 
        <div className="flex justify-center mt-5">
            <WarningModal
                titleButtonModal="Eliminar Empleado"
                navigateToModal={`/admin/restaurants/${restaurant_id}/employees`}
                textHeaderComponent={<p className="py-3 pl-3 font-semibold"><span className="text-red-500">Eliminar/</span> {employee ? employee.user : null}</p> }
                textModalComponent={
                    <div>
                        {errors.length <= 0 ? '' : <Alert className="mb-5" severity="error">{errors}</Alert>}
                        <p className="mb-2">Si eliminas al empleado <span className="font-semibold">{employee ? employee.user : null}</span>, se eliminará.</p>
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
