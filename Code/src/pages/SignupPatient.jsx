import React,{ useState,useEffect } from 'react';
import { PinataSDK } from 'pinata-web3';
import { initialize,addPatient,upload_image } from '../backend/backend.jsx';


const JWT = import.meta.env.VITE_JWT;
const gateway = import.meta.env.VITE_GATEWAY;


export default function patientForm() {

    const [imgFile, setImgfile] = useState(null);
    const [name, setName] = useState(null);
    const [contact, setContact] = useState(null);
    const [isImg, setIsImg] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [address, setAddress] = useState(null);

    const profileSrc =
    "https://th.bing.com/th?id=OIP.XadmtOiEEI6Zv388n5l2dQHaHx&w=244&h=256&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2";


    useEffect(() => {
        initialize(setWeb3,setContract,setAddress);
    }, []);

    const pinata = new PinataSDK({
        pinataJwt: JWT,
        pinataGateway: gateway,
    });
    
    const interact_sdk = async (e) => {
        setIsImg(true);
        try {

            const imgHash = await upload_image(pinata,imgFile);
            const response = await pinata.upload.json({imgHash: imgHash,name: name,contact: contact});
            
            console.log(response.IpfsHash);
            addPatient(web3,address,contract,response.IpfsHash);
            
                    
        } catch (error) {
            console.error("Error uploading the data:", error);
            return;
        }
    }


    return (
        <>
            <img className="profile_img_signup" src={isImg?imgFile:profileSrc} alt="image"></img>
            <form onSubmit={(e) => {e.preventDefault();}}>
            <label htmlFor="imgfile">Upload Image:</label>
                <input
                    type="file"
                    id="imgfile"
                    required={true}
                    onChange={(e) => setImgfile(e.target.files[0])} />
                <br />
                <label>Name:-</label><br />
                <input
                    type="text"
                    id="_name"
                    required={true}
                    onChange={(e) => setName(e.target.value)} />
                <br />
                <label>Contact:-</label><br />
                <input
                    type="text"
                    id="_contact"
                    required={true}
                    onChange={(e) => setContact(e.target.value)} />
                <br />

                <button type="submit" onClick={interact_sdk}>Submit</button>
            </form>
        </>
    );


}