import React, {useState, useEffect} from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userIdState, userLoginValidState } from '../../recoil/letterState';
import axios from 'axios';

import "./Login.css"

function Login() {
  const [ userId, setId ] = useRecoilState(userIdState);
  const [ password, setPassword ] = useState([]);
  const [ loginValid, setLoginValid ] = useRecoilState(userLoginValidState);
  const navigate=useNavigate();

    const isButtonDisabled = !userId || !password ;

    const token = window.location.href.split('?token=')[4];

    // useEffect(() => {
    //   const storedUserId = localStorage.getItem(id);
    //   if (storedUserId) {
    //     setId(storedUserId);
    //     handleSubmit(storedUserId, password);
    //   }
    // }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
          case 'userId':
            setId(value);
            break;
          case 'password':
            setPassword(value);
            break;
          default:
            break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
  
        try {
          const response = await axios.post('http://3.36.63.145:8080/api/login', {
             "userId": userId,
             "password": password,
          });

          localStorage.setItem('userId', response.data.userId);
          alert('로그인 성공!');
          navigate('/');
          setLoginValid(true);

          console.log('Sending data:', { userId, password });
          console.log('Server response:', response.data);
      }catch(error){
          console.log(error);
          alert('서버와의 통신 중 오류가 발생했습니다.');
          localStorage.removeItem('id');
          setId(null)
      }finally{

      }
  };

  return (
    <div className='login_page'>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label>
            <div className="id">아이디</div>
            <input className="box" type="text" name="userId" value={userId} onChange={handleInputChange} placeholder="아이디 입력" />
          </label>
          <label>
            <div className="password1">비밀번호</div>
            <input className="box" type="password" name="password" value={password} onChange={handleInputChange} placeholder="비밀번호" />
          </label>
        </div>
        <input className={`submit_${(isButtonDisabled)? "off" : "on"}`} type="submit" value={"가입하기"}/>
      </form>
    </div>
  )
}

export default Login