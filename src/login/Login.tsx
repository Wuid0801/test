import { usePrivy } from '@privy-io/react-auth';

function Login() {
  const { authenticated, login, user} = usePrivy();
  // Disable login when Privy is not, ready or the user is already authenticated
  console.log("user", user);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!authenticated ? (
        <button
          onClick={login}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          로그인
        </button>
      ) : (
        <div>
          <p>로그인 완료!</p>
          <p>사용자 ID: {user?.id}</p>
          <p>Twitter: {user?.twitter?.username || '연결 안됨'}</p>
          <p>지갑 주소: {user?.wallet?.address || '생성 안됨'}</p>
        </div>
      )}
    </div>
  )
}

export default Login