// 登入
const Login = ({user,setUser,getProducts,setIsLogin}) => {
  // 登入 API
  async function handleLogin(e){
    e.preventDefault()      
    try {
      const res = await axios.post(
        `${api}/v2/admin/signin`, user)
      const {token,expired} = res.data
      document.cookie = `token=${token};expires=${new Date(expired)} `;
      axios.defaults.headers.common.Authorization = token
      setIsLogin(true)
      getProducts()
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message)
      
    }
  }

  // 監聽 input
  function handleInputChange(e){
    const {name,value} = e.target
    setUser({
      ...user,
      [name]:value
    })
  }

  return(
    <>
      <div className='container'>
        <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
          <div className="card p-5 mb-3">
            <h1 className='h3 text-center mb-3'>會員登入</h1>
            <form onSubmit={handleLogin}>
              <div className='form-floating mb-3'>
                <input type="email" id="email" className='form-control' name='username' onChange={handleInputChange} />
                <label htmlFor="email">email</label>
              </div>
              <div className='form-floating mb-3'>
                <input type="password" id="password" className='form-control' name='password' onChange={handleInputChange} />
                <label htmlFor="password">password</label>
              </div>
              <button type='submit' className='btn btn-primary w-100' >登入</button>
            </form>
          </div>
          <div className="text-secondary">@leilei 2025</div>
        </div>
      </div>
    </>
  )
}

export default Login