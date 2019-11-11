const axios = require('axios');
const apiUrl = 'https://us-central1-build-react-web.cloudfunctions.net/api';

let signUp = async function(userDetails){
    try {
        let res = await axios.post(apiUrl+'/signup', userDetails);
        //console.log(res);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
        return res.data.uid;
    }
    catch (err){
        //console.error(err);
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let login = async function(email, password){
    try {
        let res = await axios.post(apiUrl+'/login', {
            "email": email,
            "password": password
        });
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.data);
    }catch (err){
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let getAuthUser = async function(email, password){
    try {
        let res = await axios.post(apiUrl+'/login', {
            "email": email,
            "password": password
        });
        const token = res.data.token;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
        let user = await axios.get(apiUrl+'/user', {headers: headers});
        console.log(user.status);
        console.log(user.statusText);
        console.log(user.data);


    } catch (err) {
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let getUser = async function(username){
    try {
        let user = await axios.get(apiUrl+'/user/'+username);
        console.log(user.status);
        console.log(user.statusText);
        console.log(user.data);


    } catch (err) {
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let deleteUser = async function(uid){
    try {
        let user = await axios.delete(apiUrl+'/user/'+uid);
        console.log(user.status);
        console.log(user.statusText);
        console.log(user.data);


    } catch (err) {
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let forgotPassword = async function(email){
    try {
        let resp = await axios.post(apiUrl+'/forgotpassword', {
            email: email
        });
        console.log(resp.status);
        console.log(resp.statusText);
        console.log(resp.data);
    }catch(err){
        console.error(err.response.status);
        console.error(err.response.statusText);
        console.error(err.response.data);
    }
}

let run = async function(){
    const userDetails = {
        "email":"keyin.jones@gmail.com",
        "password":"123456",
        "confirmPassword":"123456",
        "username":"keyin"
    };
    console.log("Sign Up Run");
    let uid = await signUp(userDetails);
    console.log("User: "+uid);
    console.log("Login Run");
    await login(userDetails.email, userDetails.password);
    console.log("Get Auth User Run");
    await getAuthUser(userDetails.email, userDetails.password);
    console.log("Get User Run");
    await getUser(userDetails.username);
    console.log("Forgot Password Run");
    await forgotPassword(userDetails.email);
    console.log("Delete user");
    await deleteUser(uid);
}

run();