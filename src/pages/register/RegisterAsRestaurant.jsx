import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import { Alert } from "@mui/material";
import { Formik } from "formik";
import loading_picture from '../../imgs/gifs/loading_picture.gif'
import {
  ButtonPrimary,
  InputForm,
} from "../../components/specific/ComponentsForm";
import { useRegister } from "../../context/RegisterContext";

import {uploadImage,deleteImage} from '../../firebase/config.js'
import {v4} from 'uuid'

export default function RegisterAsRestaurant() {
  const [imageUrl,setImageUrl] = useState(null)
  const [loading,setLoading] = useState(false)//Loading
  const [clicksCount,setClicksCount] = useState(0)
  const [imageError,setImageError] = useState(null)
  const navigateTo  = useNavigate();
  const img_resturant_default = "https://firebasestorage.googleapis.com/v0/b/dimm-d6925.appspot.com/o/mkadir%2Flogo_default_restaurant.svg?alt=media&token=841af14a-f5e7-49e7-a4e8-6a3693c564f8&_gl=1*vhpsco*_ga*MTMyODQ5MjUzOC4xNjkzMDA0NjQ1*_ga_CW55HF8NVT*MTY5NjAwNDYzMy4xNS4xLjE2OTYwMDQ3MTQuNTYuMC4w"
  const {setRestaurantRegister,restaurantRegister} = useRegister();
  
  const handleChangeImage = async (e) => {
    setLoading(true)
    const img = e.target.files[0];
    if (img) {
      const fileExtension = img.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif','svg'];
      if (allowedExtensions.includes(fileExtension)) {
        setRestaurantRegister({...restaurantRegister,logo_url:imageUrl})
        setImageError(null);
        // IMAGE NAME
        if(clicksCount <=0){
          // Si el usuario recarga la pagina eliminamos la imagen
          if(window.localStorage.getItem('image_name')){
            try {
              deleteImage(window.localStorage.getItem('image_name'))
            } catch (error) {
              console.log(error)
            }
          }
          window.localStorage.setItem('image_name',v4())
        }
        const urlImageProfile = await uploadImage(img,window.localStorage.getItem('image_name'));
        setImageUrl(urlImageProfile)
        setLoading(false)
        setClicksCount(clicksCount+1)
      } else {
        setImageError('Por favor, selecciona una imagen válida (jpg, jpeg, png o gif).');
      }
    }
  };

  // useEffect(()=>{

  // },[clicksCount])
  return (
    <div className = "m-2 md:w-1/2 md:mx-auto md:mt-3">
      <h2 className = "text-xl font-bold color-text-primary mt-14">Datos del restaurante</h2>
      {imageError === null ? "" : <Alert className="mt-3" severity="error">{imageError}</Alert>}
      <Formik
        initialValues={{
          name: restaurantRegister.name,
          address: restaurantRegister.address,
          logo_url: imageUrl || img_resturant_default
        }}
        onSubmit={async (values) => {
          // Esto es para cuando el logo funcione
          values.logo_url = imageUrl
          setRestaurantRegister({...values,logo_url:imageUrl})
          // setRestaurantRegister({...values})
          window.localStorage.setItem('restaurantRegister',JSON.stringify(values));
          navigateTo('/auth/register/personal-data')
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="my-3 flex justify-center">
              
              <label htmlFor="logo_url" style={{ width: "100px", height:"100px" }} className="border flex  rounded-full overflow-hidden bg-gray-400 cursor-pointer">
                <img className="m-auto" src={loading ? loading_picture : imageUrl ? imageUrl:img_resturant_default} alt="imagen-logo" />
              </label>
            </div>

            <div className="my-3 ">
              <label htmlFor="logo_url">
                <b>Logo del restaurante</b>
              </label>
              <InputForm
                type="file"
                name="logo_url"
                onChange={handleChangeImage}
                required={true}
              />
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
            <ButtonPrimary
              disabled={loading? loading : isSubmitting}
              text={ loading? "Espere..." : isSubmitting ? "Siguiente..." : "Siguiente"}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}
