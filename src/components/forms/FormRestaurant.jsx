import React, { useState,useEffect } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import {useRestaurantContext} from '../../context/RestaurantContext'
import { InputForm } from '../specific/ComponentsForm'
import { Alert } from '@mui/material'
import CardAdmin from '../cards/CardAdmin'
import WarningModal from '../modals/WarningModal'
// Iconos
import { RiAdminFill } from 'react-icons/ri'
import menu from '../../imgs/icons/menu.svg'
import employees from '../../imgs/icons/employees.svg'
import food from '../../imgs/icons/food.svg'
import schedule from '../../imgs/icons/schedule.svg'
import { useAuth } from '../../context/AuthContext'
import img_default_profile_resturant from '../../imgs/img_default_profile_resturant.svg'
import img_loading_profile from '../../imgs/gifs/img_loading_profile.gif'
// Spiner
import SpinerComponent from '../../components/SpinerComponent'
// Image logo Controller 
import {uploadFileImage} from '../functions/ControllerImage'
import { Formik } from 'formik'
import { deleteImage2 } from '../../firebase/config'
export default function FormRestaurant() {
    const [loadingImage,setLoadingImage] = useState(false)//Loading
    const {messages,setMessages,getRestaurant,isLoading,setIsLoading,error,deleteRestaurant,createRestaurant,updateRestaurant} = useRestaurantContext()
    const { verifyPassword,errors } = useAuth()
    const navigateTo = useNavigate()
    const {restaurant_id} = useParams()
    const [restaurant,setRestaurant] = useState(null)
    const [imageUrl,setImageUrl] = useState(null)
    const [imageError,setImageError] = useState(null)
    const [clicksCount, setClicksCount] = useState(0)

    useEffect(() => {
      if (restaurant_id && !restaurant) {
        const loadRestaurant = async () => {
          try {
            setIsLoading(true);
            const restaurantData = await getRestaurant(restaurant_id);
            if (restaurantData.data) {
              setImageUrl(restaurantData.data.logo_url)
              setRestaurant(restaurantData.data);
            }
            setIsLoading(false);
          } catch (error) {
            console.error("Error al cargar el restaurante:", error);
            setIsLoading(false);
          }
        };
        loadRestaurant();
      } else {
        setIsLoading(false);
      }
    }, [restaurant_id, restaurant, getRestaurant,imageUrl]);
    

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
        updateRestaurant(restaurant.id,{logo_url:""})
        await deleteImage2(restaurant.logo_url)
        setMessages({text:"Imagen Eliminada correctamente",color:"success"})
        restaurant.logo_url=""
        setImageUrl(null)
      }
    }

  // Verify Password and delete restaurant
  const handleVerifyPassword = async (password,id) => {
    const res = await verifyPassword(password)
    if(res){
      try {
        const res_delete_restaurant = await deleteRestaurant(id)
        if(res_delete_restaurant.data){
          return navigateTo('/admin/restaurants')
        }
      } catch (error) {
        alert("Error al eliminar restaurante :c",error.data)
        return navigateTo(`/admin/restaurants/update/${id}`)
      }
      
    }
  }
  if (isLoading && !restaurant) return <SpinerComponent/>
    return (
      <div className = "m-2">
      <h2 className = "text-xl font-bold color-text-primary flex justify-center gap-1"><RiAdminFill />Administrar restaurante/ <span className='text-black'>{restaurant_id?"Editar":"Crear"}</span></h2>
      {imageError === null ? "" : <Alert className="mt-3" severity="error">{imageError}</Alert>}
      
      {messages === null ? "" : <Alert className="mt-3" severity={messages.color}>{messages.text}</Alert>}

      <Formik
        enableReinitialize ={true}
        initialValues={
          restaurant?
          {
            name: restaurant.name || "",
            address: restaurant.address || "",
            ruc: restaurant.ruc || "",
            is_open: restaurant.is_open || false,
            logo_url: imageUrl || restaurant.logo_url 
          }
          :
          {
          name: restaurant? restaurant.name: "",
          address: restaurant? restaurant.address:"",
          ruc: restaurant? restaurant.ruc : "",
          is_open: restaurant? restaurant.is_open: false,
          logo_url: restaurant? restaurant.logo_url :"" 

        }}
        onSubmit={async (values) => {
          values.logo_url=imageUrl?imageUrl:""
          if (restaurant_id) {
            console.log("Updated..")
            console.log(values)
            try {
              updateRestaurant(restaurant_id,values)
              setMessages({text:"Datos actualizados correctamente",color:"success"})
            } catch (error) {
              setMessages({text:"Error al actualizar datos",color:"error"})
            }
          } else {
            console.log("Created")
            console.log(values)
            const data =await createRestaurant(values)
            if(data){
              navigateTo("/admin/restaurants")
            }
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting}) => (
          <form onSubmit={handleSubmit}>
          <div className="my-3 flex justify-center">
            <label htmlFor="logo_url" style={{ width: "100px", height: "100px" }} className={`border flex rounded-full overflow-hidden  ${loadingImage?"bg-white":imageUrl?"bg-white":"bg-teal-600"} cursor-pointer`}>
              <img style={{ objectFit: "cover", width: "100%", height: "100%" }} 
              
              src={loadingImage ? img_loading_profile : imageUrl ? imageUrl : img_default_profile_resturant} 
              alt="imagen-logo" />
            </label>
          </div>
  
            <div className="my-3 ">
              <div className='color-text-primary font-medium flex justify-center gap-2'>
                <label htmlFor="logo_url" className='cursor-default'>{restaurant_id?"Editar logo":"Seleccionar logo"}</label>
                {imageUrl?<div onClick={deleteLogo} className='cursor-default'>Eliminar logo</div>:null}
              </div>
              <input 
              style={{ display: 'none' }}
              type="file"
              id="logo_url"
              onChange={handleChangeImage}/>
            </div>
  
            <div className="my-3">
              <label htmlFor="name">
                <b>Nombre del restaurante</b>
              </label>
              <InputForm
                name="name"
                placeholder="Escribe el nombre del restaurante"
                onChange={handleChange}
                value={values.name}
                required={true}
              />
            </div>
  
            <div className="my-3">
              <label htmlFor="address">
                <b>Dirección del restaurante</b>
              </label>
              <InputForm
                name="address"
                placeholder="Escribe la direccion del restaurante"
                onChange={handleChange}
                value={values.address}
                required={true}
              />
            </div>
  
            <div className="my-3">
              <label htmlFor="ruc">
                <b>RUC del restaurante</b>
              </label>
              <InputForm
                name="ruc"
                placeholder="Escribe el RUC del restaurante"
                onChange={handleChange}
                value={values.ruc}
                required={true}
              />
            </div>
  
            <div className="mb-3">
              <b>Estado del restaurante <span className='font-normal text-sm'>(Indica a los usuarios si el restaurante esta abierto o cerrado)</span></b>
              <br />
              <div className='mt-2 flex items-center'>
                <input
                  onChange={handleChange}
                  value={values.is_open}
                  checked={values.is_open ? values.is_open : false}
                  id="is_open" type="checkbox" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="is_open" className="cursor-pointer ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Abierto</label>
              </div>
            </div>
  
            <div className='flex gap-2  justify-center'>
              {restaurant_id?
              <button onClick={()=>navigateTo('/admin/restaurants')} type='button' className='border-2  bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded'>Cancelar</button>
            :null}
              <button disabled={loadingImage||isSubmitting} type='submit' className={`${ loadingImage?"bg-teal-400 cursor-not-allowed":"bg-teal-500 hover:bg-teal-600 "} px-3 py-2 rounded text-white`}>
                
                {restaurant_id? isSubmitting?
                  <p className='flex items-center'><SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-teal-500"/>Actualizando...</p>
                :"Actualizar":
                
                isSubmitting?loadingImage?
                <p className='flex items-center'><SpinerComponent sizeSpiner="w-5 h-5" colorSpiner="fill-teal-500"/>Creando...</p>
                :null:"Crear Restaurante"}          
        
              </button>
            </div>
          </form>
        )}
      </Formik>
      {/* Options */}
      {restaurant_id?
      <div className='flex gap-2  justify-center mt-3'>
          <div className="grid grid-cols-2 gap-4">
            <CardAdmin car_img={employees}    to_url="employees" card_title = "Mis empleados"/>
            <CardAdmin car_img={menu} card_title = "Mi menú"/>
            <CardAdmin car_img={schedule} card_title = "Horario de trabajo"/>
            <CardAdmin car_img={food} card_title = "Mi platos"/>
            
          </div>
      </div>
        :null}
      {/* Modal delete */}
      {restaurant_id?
      <div className='flex justify-center mt-5'>
              <WarningModal
              titleButtonModal="Eliminar Restaurante"
              navigateToModal={'/admin/restaurants'}
              textHeaderComponent={<p className='py-3 pl-3 font-semibold'><span className='text-red-500'>Eliminar/</span>{restaurant? restaurant.name : null}</p>}
              textModalComponent={
                <div>
                {errors.length <= 0 ? "" : <Alert className='mb-5' severity="error">{errors}</Alert>}
                <p className='mb-2'>Si eliminas el restaurante <span className='font-semibold'>{restaurant? restaurant.name : null}</span>, se eliminarán los empleados, los menús y los platos que tengan relación con este restaurante.</p>
                <p className='font-semibold'>Para continuar escribe la contraseña de la cuenta</p>
                <Formik initialValues={{ password:"" }}
                    onSubmit={async (values) => {
                      handleVerifyPassword(values.password,restaurant.id)
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
      </div>:null}
    </div>
  )
}
