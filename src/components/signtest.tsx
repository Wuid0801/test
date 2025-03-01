import { usePrivy } from "@privy-io/react-auth";

function TestTransactionprivy() {
  const { signMessage } = usePrivy();

  async function handleSign() {
    try {
      const message = "테스트 서명 요청";
      const signature = await signMessage({ message });
      console.log("서명 결과:", signature);
    } catch (error) {
      console.error("서명 오류:", error);
    }
  }

  return (
    <div>
      <button onClick={handleSign}>서명 테스트</button>
    </div>
  );
}

export default TestTransactionprivy;
