// 登入頁面
import {useState,useEffect } from "react"
import axios from "axios";
const BASE_URL=import.meta.env.VITE_BASE_URL;

function LoginPage({getProducts,setIsAuth}){

  const [account,setAccount] = useState({
    username: "example@test.com",
    password: "example"
  })

  const handleInputChange =(e)=>{
    const {value,name} =e.target;
    setAccount({
      ...account,
      [name]:value
    })
  }

  const handleLogin =async(e) =>{
    e.preventDefault();
    try {
      // 1. 發送登入請求
      const res = await axios.post(`${BASE_URL}/admin/signin`,account)
      const {token,expired} = res.data;
        document.cookie = `Token=${token}; expires=${new Date(expired)}`;
        axios.defaults.headers.common['Authorization'] = token;
        // 取得產品資料
        // getProducts();
        // 3. 登入成功後，才設定 isAuth 為 true
        setIsAuth(true);
    } catch (error) {
      alert('登入失敗')
      console.dir(error);
    }
  }

//     const checkUserLogin=async()=>{
//     try {
//       await axios.post(`${BASE_URL}/api/user/check`);
//       getProducts();
//       setIsAuth(true);
//       alert ('使用者已登入')
//     } catch (error) {
//         console.error(error);
//     }
//   }
//   // ****登入驗證 AI版本
//   useEffect(() => {
//   const token = localStorage.getItem("token"); // 讀取 localStorage
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = token;
//     checkUserLogin();
//   }
// }, []);
  
  return(
    <>
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form className="d-flex flex-column gap-3" onSubmit={handleLogin}>
        <div className="form-floating mb-3">
          <input name="username" value={account.username} onChange={handleInputChange} type="email" className="form-control" id="username" placeholder="name@example.com" />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input name="password" value={account.password} onChange={handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary">登入</button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
    </>
  )
}

export default LoginPage