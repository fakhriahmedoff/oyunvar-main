import React, { useState, useContext } from 'react';
import {StateListingContext} from '../components/StateListingProvide'
import '../assets/css/registrationPage.scss'
import Button1 from '../components/Button1'
import {Formik , Form , Field, ErrorMessage} from "formik"
import * as yup from 'yup';
import axios from 'axios'
import Modal from '@material-ui/core/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import ReactLoading from 'react-loading';
// import AuthSms from '../components/AuthSms';

toast.configure()


function Registration(props) {
    const notifyW = () => toast.error("Daxil etdiyiniz məlumatları yanlışdır!");
    const notify = () => toast.info("Hesabınız müvəfəqiyyətlə yaradıldı!");

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [loader, setloader] = useState(false)

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    const [Error, setError] = useState(false)
    const [userId, setuserId] = useState('')

    const onSubmit =  (values) => {
        let defualtValue = '994'
        if (phoneValue.length > 9) {
            defualtValue += phoneValue.slice(1,10)
        }
        else 
        {
            defualtValue += phoneValue
        }
        setloader(true)
        const dt = new FormData()
        dt.append('name' , values.name)
        dt.append('email' , values.email)
        dt.append('phone' ,   defualtValue)
        dt.append('password' , values.password)
        dt.append('birthdate' , selectedDate.toISOString().slice(0,10))
        if (profilePhoto !== null) {
            dt.append('profilePhoto' , profilePhoto)
        }
        dt.append('auth_type' , 1)
        // axios.post('https://nehra.az/public/api/login', dt , headers)
        // .then(res => (setloader(false) , res.status === 200 && (localStorage.setItem("LoginUserData" , JSON.stringify(res.data)) ,  notify() ,  handleOpen() ) ) ) 
        // .catch(err => (setloader(false) , setError(true)))
    }

    const [phoneValue, setphoneValue] = useState()
    const handleChange1 = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setphoneValue(value);
    }

    const initialValues = {
        name:'',
        email:'',
        // phone:'',
        password:'',
        confirmPassword:'',
    }


    const [profilePhoto, setprofilePhoto] = useState(null)
    
    const [{alt, src}, setImg] = useState({
        src: "",
        alt: 'Upload an Image'
    });
    
    const ppchanger = (e) => {
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }   
        setprofilePhoto(e.target.files[0])
        console.log(e.target.files[0]);
    }

    const [authT, setauthT] = useState(1)
    const [open, setOpen] = useState(false);

    const validationSchema = yup.object({
        name: yup.string().required( `Adınızı daxil edin`),
        email: yup.string().email(`Elektron poçtunuzu düzgün daxil edin`).required('Elektron poçt daxil edin'),
        // phone:  yup.string().required('Telefon nömrənizi daxil edin'),
        password: yup.string().matches(passRegex , (`Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir`) ).required(`Şifrənizi daxil edin`),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], ( `Şifrələr uyğun deyil` )).required(`Şifrənizi daxil edin`)
    })

    const authTypeHandler = (num) => {
        document.querySelector('.authType2').checked = false
        document.querySelector('.authType1').checked = false
        document.querySelector(`.authType${num}`).checked = true
        setauthT(num)
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <div  className="registrationPage">
            <div className="buttonCont"><button type='button' onClick={() => props.functionCloseReg()} className="removeModalBtn">×</button></div>
            <p className="title">Qeydiyyat</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form enctype='multipart/form-data' className="login" method="post" action="">
                    
                    <label  className="key" >Adınız Soyadınız</label>                       
                    <div className="errors">
                        <Field className="value" name="name" placeholder={"Adınız Soyadınız"}/>
                        <ErrorMessage name="name"/>
                    </div>

                    <label  className="key" >Elektron poçt ünvanı</label>                   
                    <div className="errors">
                        <Field className="value" name="email" placeholder={"nümunə@gmail.com"}/>
                        <ErrorMessage name="email"/>
                    </div>

                    <label  className="key" >{`Telefon Nömrəsi`}</label>            
                    <div className="errors">            
                        <div className='phoneCont'> <span>+994</span> <Field required value={phoneValue} onChange={handleChange1} className="value" maxlength='10' minlength='9' type='text' name="phone" placeholder="0555555555"/></div>
                        <ErrorMessage name="phone"/>
                    </div>
                    
                    <label  className="key" >{`Şifrə`}</label>                                  
                    <div className="errors">
                        <Field type="password" className="value" name="password" placeholder="Parol" type="password"/>
                        <ErrorMessage name="password"/>
                    </div>

                    <label  className="key" >{`Şifrəni Təsdiqlə`} </label>                        
                    <div className="errors">
                        <Field type="password" className="value" name="confirmPassword" placeholder={`Şifrəni Təsdiqlə`} type="password"/>
                        <ErrorMessage name="confirmPassword"/>
                    </div>



                    {/* <label  className="key" >Hesab təsdiqləmə növü</label> */}
                    {/* <div className="authType">
                        <div className="authTypeCh authTypeCh1"><input checked className="authType1" onClick={() => authTypeHandler(1)}  type="checkbox" name="sms" id=""/> <label htmlFor="">Telefon</label></div>
                        <div className="authTypeCh authTypeCh2"><input className="authType2" onClick={() => authTypeHandler(2)} type="checkbox" name="sms" id=""/> <label htmlFor="">Elektron poçt</label></div>
                    </div> */}

                    <button className="submitBtn"  type="submit" > { `Daxil edin`} {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={"30px"} width={"30px"} />}</button>
                    {Error && <p className="errors">{`Daxil etdiyiniz elektron poçt artıq mövcuddur  `}</p>}
                </Form>
            </Formik>
            {/* <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<AuthSms UserId={userId} functionClose={() => handleClose() }  functionCloseReg={() => props.functionCloseReg()} />}
            </Modal> */}
        </div>
    )
}

export default Registration