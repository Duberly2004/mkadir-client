import React,{useEffect,useState} from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';
import { Formik } from 'formik';
import { InputForm } from '../../../components/specific/ComponentsForm';
import { RiAdminFill } from 'react-icons/ri'
import WarningModal from '../../../components/modals/WarningModal';
import { Alert } from "@mui/material";
import CardAdmin from '../../../components/cards/CardAdmin';
import SpinerComponent from '../../../components/SpinerComponent'
// images
import menu from '../../../imgs/icons/menu.svg'
import employees from '../../../imgs/icons/employees.svg'
import food from '../../../imgs/icons/food.svg'
import schedule from '../../../imgs/icons/schedule.svg'
import { useEmployeeContext } from '../../../context/EmployeeContext';

export default function GetEmployeeAdminPage() {
  const navigateTo = useNavigate()
  const { employee_id } = useParams();
  const [imageUrl,setImageUrl] = useState(null)
  const [loading,setLoading] = useState(false)//Loading
  const [ employeeData,setEmployeeData] = useState(null)
  const [imageError,setImageError] = useState(null)
  const { verifyPassword,errors } = useAuth()
  const {isLoading, setIsLoading,getEmployee,deleteEmployee} = useEmployeeContext()
  const getEmployeeData = async () => {
    try {
      const res = await getEmployee(employee_id);
      if(res.data){
        setEmployeeData(res.data);
          setIsLoading(false);
          console.log(employeeData)
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  const handleChangeImage = async (e) => {
    setLoading(true)
    const img = e.target.files[0];
    console.log(img)
  };
  if (isLoading || !employeeData) return <SpinerComponent/>
  
  // Delete logo
  const deleteLogo = () => {
    console.log("deleteLogo")
  }

  // Verify Password and delete restaurant
  const handleVerifyPassword = async (password,employee_id) => {
    const res = await verifyPassword(password)
    if(res){
      try {
        const res_delete_employee = await deleteEmployee(employee_id)
        if(res_delete_employee.data){
          return navigateTo('/admin/employees')
        }
      } catch (error) {
        alert("Error al eliminar empleado")
        return navigateTo(`/admin/employees/${employee_id}`)
      }
      
    }
  }

  return (
    <div className = "m-2">
    <h2 className = "text-xl font-bold color-text-primary flex justify-center gap-1"><RiAdminFill />Administrar Empleado</h2>
    {imageError === null ? "" : <Alert className="mt-3" severity="error">{imageError}</Alert>}
    <Formik
      initialValues={{
        name: employeeData.name,
        role: employeeData.role,
        dni: employeeData.dni,
        address: employeeData.address,
        age: employeeData.age,
        phone: employeeData.phone,
        logo_url: imageUrl || employeeData.logo_url
      }}
      onSubmit={async (values) => {
        console.log(values) 
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="my-3 flex justify-center">
            
            <label htmlFor="logo_url" style={{ width: "100px", height:"100px" }} className="border flex  rounded-full overflow-hidden bg-gray-400 cursor-pointer">
              <img className="m-auto" src={loading ? loading_picture : imageUrl ? imageUrl:employeeData.logo_url} alt="imagen-logo" />
            </label>
          </div>

          <div className="my-3 ">
            <div className='color-text-primary font-medium flex justify-center gap-2'>
              <label htmlFor="logo_url" className='cursor-default'>Editar logo</label>
              <div onClick={deleteLogo} className='cursor-default'>Eliminar logo</div>
            </div>
            <input 
            style={{ display: 'none' }}
            type="file"
            id="logo_url"
            onChange={handleChangeImage}/>
          </div>

          <div className="my-3">
            <label htmlFor="name">
              <b>Nombre del Empleado</b>
            </label>
            <InputForm
              name="name"
              placeholder="Escribe el nombre del empleado"
              onChange={handleChange}
              value={values.name}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="address">
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

          <div className="my-3">
            <label htmlFor="ruc">
              <b>DNI del empleado</b>
            </label>
            <InputForm
              name="dni"
              placeholder="Escribe el RUC del restaurante"
              onChange={handleChange}
              value={values.dni}
              required={true}
            />
          </div>

          <div className="my-3">
            <label htmlFor="address">
              <b>Direccion del empleado</b>
            </label>
            <InputForm
              name="address"
              placeholder="Escribe la direccion del empleado"
              onChange={handleChange}
              value={values.address}
              required={true}
            />
          </div>

          <div className="my-3">
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

          <div className="my-3">
            <label htmlFor="phone">
              <b>Telefono del empleado</b>
            </label>
            <InputForm
              name="phone"
              placeholder="Escribe el numero del empleado"
              onChange={handleChange}
              value={values.phone}
              required={true}
            />
          </div>

          <div className='flex gap-2  justify-center'>
            <button type='button' className='border-2  bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded'>Cancelar</button>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-white' >Guardar</button>
          </div>
        </form>
      )}
    </Formik>
    {/* Options */}
    <div className='flex gap-2  justify-center mt-3'>
        <div className="grid grid-cols-2 gap-4">
          <CardAdmin car_img={employees} card_title = "Mis empleados"/>
          <CardAdmin car_img={menu} card_title = "Mi menú"/>
          <CardAdmin car_img={schedule} card_title = "Horario de trabajo"/>
          <CardAdmin car_img={food} card_title = "Mi platos"/>
          
        </div>
    </div>
    {/* Modal delete */}
    <div className='flex justify-center mt-5'>
            <WarningModal 
            titleButtonModal="Eliminar Empleado"
            navigateToModal={'/admin/employees'}
            textHeaderComponent={<p className='py-3 pl-3 font-semibold'><span className='text-red-500'>Eliminar/</span> {employeeData.name}</p>}
            textModalComponent={
              <div>
              {errors.length <= 0 ? "" : <Alert className='mb-5' severity="error">{errors}</Alert>}
              <p className='mb-2'>Si eliminas el empleado <span className='font-semibold'>{employeeData.name}</span>, se eliminarán los empleados.</p>
              <p className='font-semibold'>Para continuar escribe la contraseña de la cuenta</p>
              <Formik initialValues={{ password:"" }}
                  onSubmit={async (values) => {
                    handleVerifyPassword(values.password,employeeData.id)
                  }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <input 
                    type="password"
                    name='password' 
                    onChange={handleChange}
                    value={values.password}
                    className='color-text p-4 w-full py-2 mt-2 px-3 border-2 rounded-md border-gray-400 outline-none focus:border-blue-800' required/>
                    <button type="submit" className="w-full mt-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm items-center px-5 py-2.5 mr-2">
                          Eliminar
                      </button>
                  </form>
                )}
              </Formik>
            </div>
            }
            />
    </div>
  </div>
  )
}
