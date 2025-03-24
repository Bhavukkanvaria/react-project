import { Interests } from "./components/Interests";
import { Profile } from "./components/profile";
import { Settings } from "./components/Settings";


export const tabConfig = [
    { label: 'Profile', component: Profile, validation: (data, setErrors)=>{
        let error = {}
        if(!data?.name || data.name.length<2){
            error['name'] = 'name is not valid'
        }
        if(!data.age || data.age <18){
            error['age'] = 'age should be minimum 18'
        }
        if(!data.email || data.email.length<2){
            error['email'] = 'emial is not valid'
        }
        setErrors(error);
        return error.name || error.age || error.email ? false : true;
    } },
    { label: 'Interests', component: Interests,  validation: (data, setErrors)=>{
        const error = {}
        if(data.interests.length===0){
            error['interest'] = 'Select atleast one Interest'
        }
        setErrors(error);
        return error.interest ? false:true;
    } },
    { label: 'Settings', component: Settings, validation:(data, setErrors)=>{
        return true;
    } },
]